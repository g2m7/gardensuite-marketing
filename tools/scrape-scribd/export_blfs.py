import json, csv, re

with open("marketing/outreach/north-bengal-intelligence/sources/scribd/VC_entities_list_180723.json") as f:
    vc_data = json.load(f)

with open("marketing/outreach/north-bengal-intelligence/data/north_bengal_gardens.json") as f:
    master = json.load(f)

def clean(s):
    s = re.sub(r"[^A-Z0-9]", "", str(s).upper())
    s = s.replace("TEAGARDEN", "").replace("TEAESTATE", "").replace("TE", "")
    return s

wb_entities = []
for p in vc_data["pages"]:
    p_num = p["page"]
    lines = [l.strip() for l in p["text"].split("\n") if l.strip()]
    for i, line in enumerate(lines):
        if line.upper() == "WEST BENGAL" or (line.upper() == "BENGAL" and i > 0 and lines[i-1].upper() == "WEST"):
            state_idx = i - 1 if line.upper() == "BENGAL" else i
            entity_cand = lines[max(0, state_idx-3):state_idx]
            marks_cand = lines[i+1:min(len(lines), i+4)]
            
            wb_entities.append({
                "page": p_num,
                "entity": " ".join(entity_cand),
                "marks": " ".join(marks_cand)
            })

blfs = []
for e in wb_entities:
    c_ent = clean(e["entity"])
    c_marks = clean(e["marks"])
    
    is_estate = False
    for g in master:
        g_clean = clean(g["name"])
        if len(g_clean) > 4 and (g_clean in c_ent or g_clean in c_marks):
            is_estate = True
            break
            
    if not is_estate:
        # Clean entity name
        name = e["entity"]
        name = re.sub(r"^(WEST\s+BENGAL|BENGAL|StateName of Marks|Name of Marks)\s*", "", name, flags=re.I).strip()
        marks = re.sub(r"\s+", " ", e["marks"]).strip()
        if len(name) > 3 and name not in [b["unit_name"] for b in blfs]:
            blfs.append({
                "unit_name": name,
                "marks": marks,
                "state": "West Bengal",
                "source": "Tea Board Trusttea VC Entities List (Doc 848378799)",
                "source_page": e["page"]
            })

print(f"Exporting {len(blfs)} unique Standalone Bought Leaf Factories / Processing Units.")

with open("marketing/outreach/north-bengal-intelligence/data/bought_leaf_factories_wb.json", "w", encoding="utf-8") as f:
    json.dump(blfs, f, indent=2, ensure_ascii=False)

with open("marketing/outreach/north-bengal-intelligence/data/bought_leaf_factories_wb.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["unit_name", "marks", "state", "source", "source_page"])
    writer.writeheader()
    writer.writerows(blfs)

print("Export completed successfully!")
