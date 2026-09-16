#!/usr/bin/env python3
import argparse
import asyncio
import sys
import os
import re
from urllib.request import Request, urlopen
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright
from pypdf import PdfReader, PdfWriter

def get_filename_from_redirect(doc_id):
    """
    Hits the standard document URL to follow redirects and extract the 
    slug title from the final URL structure.
    """
    target_url = f"https://www.scribd.com/document/{doc_id}"
    print(f"[*] Checking Scribd redirect metadata for ID {doc_id}...")
    try:
        req = Request(
            target_url, 
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        )
        with urlopen(req, timeout=7) as response:
            final_url = response.geturl()
            
        match = re.search(r"/document/\d+/(.+)$", final_url)
        if match:
            slug = match.group(1)
            clean_name = slug.replace("-", "_")
            from urllib.parse import unquote
            clean_name = unquote(clean_name)
            return f"{clean_name}.pdf"
            
    except Exception as e:
        print(f"[!] Warning: Could not resolve URL redirect metadata: {e}")
    
    return None

def sanitize_filename(name):
    """Removes characters that are illegal in file systems and strips whitespace."""
    name = re.sub(r'[\\/*?:"<>|]', "", name)
    name = name.strip().replace(" ", "_")
    return name if name else "compiled_document"

async def scrape_all_pages_to_pdf(doc_id, output_filename):
    url = f"https://www.scribd.com/embeds/{doc_id}/content"
    
    async with async_playwright() as p:
        print("[*] Launching headless browser...")
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        print(f"[*] Navigating to embedding target {url}...")
        try:
            await page.goto(url, wait_until="networkidle")
        except Exception as e:
            print(f"[-] Error navigating to URL: {e}", file=sys.stderr)
            await browser.close()
            return
        
        # Collect global styles upfront
        content = await page.content()
        soup = BeautifulSoup(content, 'html.parser')
        head_elements = soup.find_all(['style', 'link'])
        
        styles_html = ""
        for elem in head_elements:
            if elem.name == 'style':
                styles_html += str(elem)
            elif elem.name == 'link' and 'stylesheet' in elem.get('rel', []):
                href = elem.get('href')
                if href and not href.startswith(('http://', 'https://')):
                    base_url = "/".join(url.split("/")[:3])
                    href = f"{base_url}/{href.lstrip('/')}"
                styles_html += f'<link rel="stylesheet" href="{href}">'

        base_style = f"""
        <style>
            html, body {{ 
                margin: 0 !important; 
                padding: 0 !important; 
                background: #fff !important;
                -webkit-print-color-adjust: exact !important;
            }}
            .outer_page {{
                position: relative !important;
                margin: 0 auto !important;
            }}
            .watermark-overlay {{
                position: absolute !important;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(255, 0, 0, 0.12) !important;
                color: rgba(200, 0, 0, 0.6) !important;
                font-size: 52px !important;
                font-weight: bold !important;
                font-family: sans-serif !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                text-transform: uppercase !important;
                letter-spacing: 2px !important;
                z-index: 99999 !important;
                pointer-events: none !important;
                border: 5px dashed rgba(200, 0, 0, 0.4) !important;
                box-sizing: border-box !important;
            }}
        </style>
        """

        extracted_html_pages = []
        page_texts = []
        page_number = 1
        consecutive_missing = 0
        
        # Check if docManager has explicit page count
        doc_page_count = await page.evaluate("() => window.docManager ? window.docManager._pageCount : null")
        if doc_page_count:
            print(f"[*] Detected total document pages from docManager: {doc_page_count}")

        # --- PHASE 1: Scrape all structures from the original document DOM ---
        print("[*] Reading document pages structural data...")
        while True:
            target_id = f"outer_page_{page_number}"
            
            # Navigate using docManager internal API and scroll
            await page.evaluate(f"""() => {{
                if (window.docManager && typeof window.docManager.gotoPage === 'function') {{
                    window.docManager.gotoPage({page_number});
                }}
                const el = document.querySelector("#{target_id}");
                if (el) el.scrollIntoView({{block: 'center'}});
            }}""")

            locator = page.locator(f"#{target_id}")
            
            if await locator.count() > 0:
                consecutive_missing = 0 
                
                is_ready = False
                for _ in range(35):  
                    is_ready = await locator.evaluate("""el => {
                        const inner = el.querySelector('.inner_page, .newpage, .text_layer, .absimg');
                        return inner !== null && (inner.innerHTML.length > 50 || inner.children.length > 0);
                    }""")
                    if is_ready:
                        break
                    await page.wait_for_timeout(100)
                
                dims = await locator.evaluate("""el => ({
                    width: el.offsetWidth || 1000,
                    height: el.offsetHeight || 1294
                })""")
                
                page_text = await locator.evaluate("el => el.innerText.trim()")
                page_html = await locator.evaluate("el => el.outerHTML")
                
                if not is_ready:
                    print(f"[!] Page {page_number} failed to load state. Injecting watermark markup...")
                    soup_patch = BeautifulSoup(page_html, 'html.parser')
                    target_div = soup_patch.find(id=target_id)
                    if target_div:
                        watermark_div = soup_patch.new_tag("div", attrs={"class": "watermark-overlay"})
                        watermark_div.string = "FAILED TO EXTRACT"
                        target_div.insert(0, watermark_div)
                        page_html = str(soup_patch)
                
                extracted_html_pages.append((page_number, page_html, dims))
                page_texts.append({"page": page_number, "text": page_text, "dims": dims})
                
                if doc_page_count and page_number >= doc_page_count:
                    print(f"[*] Reached final page ({doc_page_count}) according to docManager.")
                    break
                    
                page_number += 1
            else:
                consecutive_missing += 1
                if consecutive_missing >= 2:
                    print(f"[*] Parsing loop stopped. Total structural pages captured: {len(extracted_html_pages)}")
                    break
                
                await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
                await page.wait_for_timeout(1000)

        # Save structured text as companion JSON
        json_filename = os.path.splitext(output_filename)[0] + ".json"
        try:
            import json
            with open(json_filename, "w", encoding="utf-8") as jf:
                json.dump({"doc_id": doc_id, "total_pages": len(extracted_html_pages), "pages": page_texts}, jf, indent=2, ensure_ascii=False)
            print(f"[+] Companion text JSON saved to: {json_filename}")
        except Exception as e:
            print(f"[!] Warning: Could not save companion JSON: {e}")

        # --- PHASE 2: Build individual PDF pages isolated from each other ---
        temp_pdfs = []
        pdf_writer = PdfWriter()
        
        if not extracted_html_pages:
            print("[-] Error: No pages were scraped from target structure.", file=sys.stderr)
            await browser.close()
            return

        print("[*] Beginning high-fidelity isolated page render and extraction...")
        for idx, (p_num, raw_html, dims) in enumerate(extracted_html_pages, start=1):
            single_page_html = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <base href="{url}">
                {styles_html}
                {base_style}
            </head>
            <body>
                {raw_html}
            </body>
            </html>
            """
            
            # Reset page context with isolated HTML data
            await page.set_content(single_page_html, wait_until="networkidle")
            
            # --- PATCH: Force browser to explicitly wait for all web fonts to load ---
            try:
                await page.evaluate("document.fonts.ready")
            except Exception:
                pass
                
            await page.wait_for_timeout(100)
            
            temp_filename = f"temp_page_{p_num}.pdf"
            await page.pdf(
                path=temp_filename,
                width=f"{dims['width']}px",
                height=f"{dims['height']}px",
                print_background=True,
                margin={"top": "0px", "bottom": "0px", "left": "0px", "right": "0px"} 
            )
            
            # Slice and capture printed sheet frames
            try:
                reader = PdfReader(temp_filename)
                if len(reader.pages) > 0:
                    for frame in reader.pages:
                        pdf_writer.add_page(frame)
                    print(f"[+] Page {p_num} successfully isolated.")
                    temp_pdfs.append(temp_filename)
                else:
                    print(f"[-] Error: Rendered PDF slice {p_num} has no frames.")
            except Exception as e:
                print(f"[-] Error parsing PDF file structural slice for page {p_num}: {e}")

        await browser.close()

        # --- PHASE 3: Merge frames together ---
        if len(pdf_writer.pages) > 0:
            print(f"[*] Stitching {len(pdf_writer.pages)} isolated views into final asset...")
            with open(output_filename, "wb") as out_file:
                pdf_writer.write(out_file)
            print(f"[+] Process finished successfully! Output saved to: {output_filename}")
        else:
            print("[-] Error: Output compilation completely empty.", file=sys.stderr)

        # File system cleaning
        print("[*] Cleaning up intermediate slice assets...")
        for temp_file in temp_pdfs:
            if os.path.exists(temp_file):
                try:
                    os.remove(temp_file)
                except Exception:
                    pass

def main():
    parser = argparse.ArgumentParser(
        description="Targeted Scribd page extractor optimized with clean post-processing page filtering."
    )
    parser.add_argument("id", help="Scribd document ID or full URL location string")
    parser.add_argument("-o", "--output", default=None, help="Output file designation (defaults to slug title if omitted)")
    
    args = parser.parse_args()
    doc_id = "".join(filter(str.isdigit, args.id))
    if not doc_id:
        print("[-] Error: Could not determine valid numerical identifier from input parameters.", file=sys.stderr)
        sys.exit(1)

    if args.output is None:
        resolved_filename = get_filename_from_redirect(doc_id)
        if resolved_filename:
            output_filename = sanitize_filename(resolved_filename)
            if not output_filename.lower().endswith(".pdf"):
                output_filename += ".pdf"
        else:
            print("[!] Fallback: Could not parse redirect string. Reverting to fallback name.")
            output_filename = "compiled_document.pdf"
    else:
        output_filename = args.output

    asyncio.run(scrape_all_pages_to_pdf(doc_id, output_filename))

if __name__ == "__main__":
    main()