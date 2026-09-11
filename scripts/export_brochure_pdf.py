import os
import subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
HTML_FILE = ROOT / "collateral" / "brochures" / "2026-executive-brochure" / "index.html"
OUT_PDF = ROOT / "deliverables" / "brochures" / "GardenSuite_Executive_Brochure_2026.pdf"
STATIC_PDF = ROOT / "gs_landing" / "static" / "brochures" / "GardenSuite_Executive_Brochure_2026.pdf"
PREVIEW_DIR = ROOT / "scratch" / "brochure_preview"

OUT_PDF.parent.mkdir(parents=True, exist_ok=True)
STATIC_PDF.parent.mkdir(parents=True, exist_ok=True)
PREVIEW_DIR.mkdir(parents=True, exist_ok=True)

print("Exporting brochure from:", HTML_FILE)
print("Target PDF:", OUT_PDF)

with sync_playwright() as p:
    browser = p.chromium.launch(
        executable_path="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        args=["--disable-web-security", "--allow-file-access-from-files"]
    )
    # A4 standard at 96 DPI: 794x1123, at 150 DPI: 1240x1754
    page = browser.new_page(viewport={"width": 1240, "height": 1754}, device_scale_factor=2)
    
    file_url = HTML_FILE.as_uri()
    print("Navigating to:", file_url)
    page.goto(file_url, wait_until="networkidle")
    page.wait_for_timeout(1000)
    page.evaluate("document.fonts.ready")
    page.wait_for_timeout(1000)
    
    page.pdf(
        path=str(OUT_PDF),
        format="A4",
        print_background=True,
        margin={"top": "0", "bottom": "0", "left": "0", "right": "0"},
        prefer_css_page_size=True
    )
    browser.close()

# Also copy to static
import shutil
shutil.copyfile(OUT_PDF, STATIC_PDF)
print(f"PDF successfully exported ({OUT_PDF.stat().st_size / 1024:.1f} KB)")

# Render pages to PNG using pdftoppm
for f in PREVIEW_DIR.glob("*.png"):
    f.unlink()

cmd = ["pdftoppm", "-png", "-r", "150", str(OUT_PDF), str(PREVIEW_DIR / "page")]
print("Rendering preview images with pdftoppm...")
subprocess.run(cmd, check=True)

rendered = sorted(PREVIEW_DIR.glob("*.png"))
print(f"Rendered {len(rendered)} page preview images:")
for r in rendered:
    print("  ", r.name)

