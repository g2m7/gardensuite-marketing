import json, re

with open("marketing/outreach/north-bengal-intelligence/data/north_bengal_master_registry.json") as f:
    master_estates = json.load(f)

with open("marketing/outreach/north-bengal-intelligence/data/bought_leaf_factories_wb.json") as f:
    blf_units = json.load(f)

print(f"Loaded {len(master_estates)} master estates and {len(blf_units)} BLFs.")

# Standardize fields for Master Estates
unified_rows = []
sl = 1

for e in master_estates:
    # Prioritize Google Maps phone/website/address if verified
    best_phone = e.get("mapsPhone") or e.get("ownerPhone") or e.get("estatePhone") or e.get("ceoPhone") or ""
    best_email = e.get("ownerEmail") or e.get("estateEmail") or e.get("ceoEmail") or ""
    best_hq_addr = e.get("mapsAddress") or e.get("ownerAddress") or e.get("ceoAddress") or ""
    
    scale_str = f"{e.get('teaAreaHa', '')} Ha" if e.get('teaAreaHa') else (f"{e.get('grantAreaHa', '')} Ha (Grant)" if e.get('grantAreaHa') else "-")

    unified_rows.append({
        "sl": sl,
        "name": e.get("name", "").strip(),
        "type": "Organized Estate",
        "region": e.get("region", "").strip(),
        "district": e.get("district", "").strip(),
        "company": e.get("ownerEntity", "").strip(),
        "decision_maker": e.get("ceoName", "").strip(),
        "hq_city": e.get("hqCity", "").strip() or "Kolkata",
        "hq_address": best_hq_addr,
        "phone": best_phone,
        "email": best_email,
        "scale": scale_str,
        "notes": f"Reg No: {e.get('regNo', '-')}"
    })
    sl += 1

# Standardize fields for BLFs
for b in blf_units:
    unit_name = b["unit_name"].strip()
    marks = b["marks"].strip()
    
    # Infer district or region if mentioned in name or marks
    region = "Dooars"
    district = "Jalpaiguri"
    u_upper = (unit_name + " " + marks).upper()
    if any(k in u_upper for k in ["SILIGURI", "DARJEELING", "MATIGARA", "PHANSIDEWA", "NAXALBARI", "BALASON"]):
        region = "Terai"
        district = "Darjeeling"
    elif any(k in u_upper for k in ["ISLAMPUR", "CHOPRA", "DINAJPUR", "SOLODIGHI"]):
        region = "Terai"
        district = "Uttar Dinajpur"
    elif any(k in u_upper for k in ["COOCHBEHAR", "COOCH BEHAR", "TINBIGHA", "MATHABHANGA"]):
        region = "Cooch Behar"
        district = "Cooch Behar"
    elif any(k in u_upper for k in ["ALIPURDUAR", "KALCHINI", "MADARIHAT", "JAIGAON"]):
        region = "Dooars"
        district = "Alipurduar"

    # Infer HQ city
    hq_city = "Siliguri"
    if "KOLKATA" in u_upper or "CALCUTTA" in u_upper:
        hq_city = "Kolkata"
    elif "JALPAIGURI" in u_upper:
        hq_city = "Jalpaiguri"

    unified_rows.append({
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
        "notes": f"Marks: {marks[:60]}" if marks else "Trusttea Certified"
    })
    sl += 1

print(f"Total unified rows: {len(unified_rows)}")
print(f"Estates: {sum(1 for r in unified_rows if r['type'] == 'Organized Estate')}")
print(f"BLFs: {sum(1 for r in unified_rows if r['type'] == 'Bought Leaf Factory (BLF)')}")
