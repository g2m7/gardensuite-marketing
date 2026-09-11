from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS_DIR = ROOT / "collateral" / "brochures" / "2026-executive-brochure" / "assets"

# 1. Zoom into Factory Despatch Screen (1152x720)
despatch_src = ROOT / "gs_landing" / "static" / "erp" / "factory" / "despatch-screen.webp"
if despatch_src.exists():
    im = Image.open(despatch_src)
    # Crop the ADD Items section: Lot No C-23, CTC, BOP Grade, PaperSack, Gross Wt 25.43, Net Wt 25
    crop_item = im.crop((410, 190, 840, 480))
    crop_item.save(ASSETS_DIR / "zoom_despatch_item.png")
    print("Saved zoom_despatch_item.png")

# 2. Zoom into Stores Stock Report (1152x720)
stock_src = ROOT / "gs_landing" / "static" / "erp" / "stores" / "stock-report.webp"
if stock_src.exists():
    im = Image.open(stock_src)
    # Crop the top lines: DAP, MOP, Urea, HSD Oil, Petrol, Rice
    crop_stock = im.crop((190, 200, 780, 520))
    crop_stock.save(ASSETS_DIR / "zoom_store_items.png")
    print("Saved zoom_store_items.png")

# 3. Create a clean cropped version of active harvest records (from 05_harvest_active_records.png: 412x915)
rec_src = ROOT / "gs_landing" / "static" / "screenshots" / "05_harvest_active_records.png"
if rec_src.exists():
    im = Image.open(rec_src)
    # Crop the session stats header and top record list
    crop_rec = im.crop((16, 120, 396, 750))
    crop_rec.save(ASSETS_DIR / "zoom_harvest_records.png")
    print("Saved zoom_harvest_records.png")

print("V2 assets ready!")
