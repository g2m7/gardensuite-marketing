import os
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS_DIR = ROOT / "collateral" / "brochures" / "2026-executive-brochure" / "assets"
ASSETS_DIR.mkdir(parents=True, exist_ok=True)

print("Processing brochure assets into:", ASSETS_DIR)

# 1. Clean Face Attendance Screen (1080x2400)
liveness_src = ROOT / "assets" / "source" / "product-screenshots" / "face-attendance_liveness-check_passed.png"
if liveness_src.exists():
    im = Image.open(liveness_src)
    w, h = im.size
    cropped = im.crop((0, 80, w, h - 100))
    cropped.save(ASSETS_DIR / "clean_face_attendance.png", optimize=True)
    print("Saved clean_face_attendance.png")

# 2. Zoomed-in Face Match Card (from 13_attendance_result_matched.png: 412x915)
att_match_src = ROOT / "gs_landing" / "static" / "screenshots" / "13_attendance_result_matched.png"
if att_match_src.exists():
    im = Image.open(att_match_src)
    card = im.crop((16, 218, 396, 560))
    card_2x = card.resize((card.width * 2, card.height * 2), Image.Resampling.LANCZOS)
    card_2x.save(ASSETS_DIR / "zoom_face_match.png", optimize=True)
    
    full_clean = im.crop((0, 48, 412, 915 - 48))
    full_clean.save(ASSETS_DIR / "clean_attendance_result.png", optimize=True)
    print("Saved zoom_face_match.png and clean_attendance_result.png")

# 3. Clean Weighing Screen & Zoomed Scale Reading (from 10_harvest_result_scale_connected_save.png)
harvest_match_src = ROOT / "gs_landing" / "static" / "screenshots" / "10_harvest_result_scale_connected_save.png"
if harvest_match_src.exists():
    im = Image.open(harvest_match_src)
    card = im.crop((16, 178, 396, 615))
    card_2x = card.resize((card.width * 2, card.height * 2), Image.Resampling.LANCZOS)
    card_2x.save(ASSETS_DIR / "zoom_scale_reading.png", optimize=True)
    
    full_clean = im.crop((0, 48, 412, 915 - 48))
    full_clean.save(ASSETS_DIR / "clean_scale_weighing.png", optimize=True)
    print("Saved zoom_scale_reading.png and clean_scale_weighing.png")

# 4. Active plucking session screen
active_harvest_src = ROOT / "gs_landing" / "static" / "screenshots" / "05_harvest_active_records.png"
if active_harvest_src.exists():
    im = Image.open(active_harvest_src)
    full_clean = im.crop((0, 48, 412, 915 - 48))
    full_clean.save(ASSETS_DIR / "clean_active_harvest_records.png", optimize=True)
    print("Saved clean_active_harvest_records.png")

# 5. Smart Scale Hardware Image
scale_hw_src = ROOT / "collateral" / "brochures" / "legacy-sales-flyer" / "hero-smart-scale.png"
if scale_hw_src.exists():
    im = Image.open(scale_hw_src)
    im.save(ASSETS_DIR / "scale_hardware.png", optimize=True)
    print("Saved scale_hardware.png")

# 6. Kamjari (2880x1556)
kamjari_src = ROOT / "assets" / "source" / "product-screenshots" / "kamjari.png"
if kamjari_src.exists():
    im = Image.open(kamjari_src)
    cropped = im.crop((0, 40, 2880, 1556))
    cropped.save(ASSETS_DIR / "clean_kamjari_overview.png", optimize=True)
    
    kpi_crop = im.crop((230, 460, 2800, 1080))
    kpi_crop.save(ASSETS_DIR / "zoom_kamjari_kpis.png", optimize=True)
    print("Saved clean_kamjari_overview.png and zoom_kamjari_kpis.png")

# 7. Wages Summary (2880x3668)
wages_src = ROOT / "assets" / "source" / "product-screenshots" / "wages_summary.png"
if wages_src.exists():
    im = Image.open(wages_src)
    cropped = im.crop((0, 40, 2880, 2600))
    cropped.save(ASSETS_DIR / "clean_wages_overview.png", optimize=True)
    
    kpi_crop = im.crop((230, 380, 2800, 1100))
    kpi_crop.save(ASSETS_DIR / "zoom_wages_kpis.png", optimize=True)
    print("Saved clean_wages_overview.png and zoom_wages_kpis.png")

# 8. Dashboard (2880x5104)
dash_src = ROOT / "assets" / "source" / "product-screenshots" / "dashboard.png"
if dash_src.exists():
    im = Image.open(dash_src)
    cropped = im.crop((0, 40, 2880, 2200))
    cropped.save(ASSETS_DIR / "clean_dashboard_overview.png", optimize=True)
    
    kpi_crop = im.crop((225, 480, 2800, 1160))
    kpi_crop.save(ASSETS_DIR / "zoom_dashboard_kpis.png", optimize=True)
    print("Saved clean_dashboard_overview.png and zoom_dashboard_kpis.png")

# 9. Factory Despatch & Stores
despatch_src = ROOT / "gs_landing" / "static" / "erp" / "factory" / "despatch-screen.webp"
if despatch_src.exists():
    im = Image.open(despatch_src)
    im.save(ASSETS_DIR / "clean_factory_despatch.png")
    print("Saved clean_factory_despatch.png")

stock_src = ROOT / "gs_landing" / "static" / "erp" / "stores" / "stock-report.webp"
if stock_src.exists():
    im = Image.open(stock_src)
    im.save(ASSETS_DIR / "clean_store_stock.png")
    print("Saved clean_store_stock.png")

# 10. Copy brand logos and icons
logos = [
    (ROOT / "assets" / "brand" / "gardensuite" / "logos" / "favicon-64.png", "favicon.png"),
    (ROOT / "assets" / "brand" / "gardensuite" / "logos" / "app-icon-512.png", "app-icon.png"),
    (ROOT / "assets" / "brand" / "gardensuite" / "logos" / "gardensuite-icon-white.svg", "gardensuite-icon-white.svg"),
]
for src, name in logos:
    if src.exists():
        im_data = src.read_bytes()
        (ASSETS_DIR / name).write_bytes(im_data)
        print(f"Copied {name}")

print("All brochure assets ready!")
