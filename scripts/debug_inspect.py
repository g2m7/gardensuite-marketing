from playwright.sync_api import sync_playwright
from pathlib import Path

html_file = Path("collateral/brochures/2026-executive-brochure/index.html").resolve()
with sync_playwright() as p:
    browser = p.chromium.launch(
        executable_path="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        args=["--disable-web-security"]
    )
    page = browser.new_page(viewport={"width": 1240, "height": 1754}, device_scale_factor=2)
    page.goto(html_file.as_uri(), wait_until="networkidle")
    page.wait_for_timeout(1000)
    
    pages = page.query_selector_all(".page")
    for i, p_el in enumerate(pages):
        pb = p_el.query_selector(".page-body")
        if not pb:
            continue
        children = pb.evaluate("""el => {
            return Array.from(el.children).map(c => ({
                tag: c.tagName,
                cls: c.className,
                h: c.offsetHeight
            }));
        }""")
        pb_h = pb.evaluate("el => el.clientHeight")
        total_child_h = sum(c["h"] for c in children)
        print(f"=== PAGE {i+1} (pb height={pb_h}px) ===")
        for c in children:
            name = c.get('cls') or c.get('tag')
            print(f"  {name}: height={c.get('h')}px")
        print(f"  Sum of child heights: {total_child_h}px (Empty space distributed by flex: {pb_h - total_child_h}px)\n")
    browser.close()
