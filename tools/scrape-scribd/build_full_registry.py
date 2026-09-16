import json, csv, os
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

# Load datasets
with open("marketing/outreach/north-bengal-intelligence/data/north_bengal_master_registry.json") as f:
    master_estates = json.load(f)

with open("marketing/outreach/north-bengal-intelligence/data/bought_leaf_factories_wb.json") as f:
    blf_units = json.load(f)

print(f"Loaded {len(master_estates)} estates and {len(blf_units)} BLFs.")

# Compile master records
master_rows = []
sl = 1

# 1. Organized Estates (324)
for e in master_estates:
    # Priority contact info
    phone = e.get("scrapedHqPhone") or e.get("ownerPhone") or e.get("estatePhone") or e.get("ceoPhone") or "-"
    email = e.get("ownerEmail") or e.get("estateEmail") or e.get("ceoEmail") or "-"
    hq_addr = e.get("scrapedHqAddress") or e.get("directoryOwnerAddress") or e.get("ceoAddress") or "-"
    hq_city = e.get("hqCity") or "Kolkata"
    
    tea_area = e.get("teaAreaHa")
    grant_area = e.get("grantAreaHa")
    scale_val = f"{tea_area:,.1f} Ha" if tea_area else (f"{grant_area:,.1f} Ha" if grant_area else "-")

    master_rows.append({
        "sl": sl,
        "name": e.get("gardenName", "").strip(),
        "type": "Organized Estate",
        "region": e.get("region", "Dooars").strip(),
        "district": e.get("district", "JALPAIGURI").strip().title(),
        "company": e.get("ownerEntity", "").strip(),
        "decision_maker": e.get("ceoName", "").strip() or "-",
        "hq_city": hq_city.strip(),
        "hq_address": hq_addr.strip(),
        "phone": str(phone).strip(),
        "email": str(email).strip(),
        "scale": scale_val,
        "reg_no": e.get("regNo", "-").strip(),
        "maps_url": e.get("scrapedHqMapsUrl") or ""
    })
    sl += 1

# 2. Standalone Bought Leaf Factories (72)
for b in blf_units:
    unit_name = b["unit_name"].strip()
    marks = b["marks"].strip()
    u_upper = (unit_name + " " + marks).upper()
    
    region = "Dooars"
    district = "Jalpaiguri"
    if any(k in u_upper for k in ["SILIGURI", "DARJEELING", "MATIGARA", "PHANSIDEWA", "NAXALBARI", "BALASON", "SUKNA"]):
        region = "Terai"
        district = "Darjeeling"
    elif any(k in u_upper for k in ["ISLAMPUR", "CHOPRA", "DINAJPUR", "SOLODIGHI", "DEBIJHORA"]):
        region = "Terai"
        district = "Uttar Dinajpur"
    elif any(k in u_upper for k in ["COOCHBEHAR", "COOCH BEHAR", "TINBIGHA", "MATHABHANGA", "MEKHLIGANJ"]):
        region = "Cooch Behar"
        district = "Cooch Behar"
    elif any(k in u_upper for k in ["ALIPURDUAR", "KALCHINI", "MADARIHAT", "JAIGAON", "HASIMARA"]):
        region = "Dooars"
        district = "Alipurduar"

    hq_city = "Siliguri"
    if "KOLKATA" in u_upper or "CALCUTTA" in u_upper:
        hq_city = "Kolkata"
    elif "JALPAIGURI" in u_upper:
        hq_city = "Jalpaiguri"

    master_rows.append({
        "sl": sl,
        "name": unit_name,
        "type": "Bought Leaf Factory (BLF)",
        "region": region,
        "district": district,
        "company": unit_name,
        "decision_maker": "-",
        "hq_city": hq_city,
        "hq_address": f"{district}, West Bengal",
        "phone": "-",
        "email": "-",
        "scale": "BLF Processing",
        "reg_no": marks[:50] if marks else "Trusttea Certified",
        "maps_url": ""
    })
    sl += 1

print(f"Compiled {len(master_rows)} total master records.")

# Save JSON
out_dir = "marketing/outreach/north-bengal-intelligence/data"
os.makedirs(out_dir, exist_ok=True)

with open(f"{out_dir}/North_Bengal_Tea_Master_Registry.json", "w", encoding="utf-8") as f:
    json.dump(master_rows, f, indent=2, ensure_ascii=False)

# Save CSV
fieldnames = ["sl", "name", "type", "region", "district", "company", "decision_maker", "hq_city", "hq_address", "phone", "email", "scale", "reg_no"]
with open(f"{out_dir}/North_Bengal_Tea_Master_Registry.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
    writer.writeheader()
    writer.writerows(master_rows)

print("Saved CSV and JSON successfully.")
