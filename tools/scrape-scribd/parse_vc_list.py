import json, re

with open("marketing/outreach/north-bengal-intelligence/sources/scribd/VC_entities_list_180723.json") as f:
    vc_data = json.load(f)

with open("marketing/outreach/north-bengal-intelligence/data/north_bengal_gardens.json") as f:
    master = json.load(f)

def clean(s):
    s = re.sub(r"[^A-Z0-9]", "", str(s).upper())
    s = s.replace("TEAGARDEN", "").replace("TEAESTATE", "").replace("TE", "")
    return s

master_set = {clean(g["name"]) for g in master}

wb_entities = []
for p in vc_data["pages"]:
    p_num = p["page"]
    lines = [l.strip() for l in p["text"].split("\n") if l.strip()]
    for i, line in enumerate(lines):
        if line.upper() == "WEST BENGAL" or (line.upper() == "BENGAL" and i > 0 and lines[i-1].upper() == "WEST"):
            # Entity name is right before state
            # If line is "BENGAL", state started at i-1
            state_idx = i - 1 if line.upper() == "BENGAL" else i
            
            # The lines above state_idx contain VC holder and certified entity name
            entity_cand = lines[max(0, state_idx-3):state_idx]
            marks_cand = lines[i+1:min(len(lines), i+4)]
            
            wb_entities.append({
                "page": p_num,
                "entity": " ".join(entity_cand),
                "marks": " ".join(marks_cand)
            })

print(f"Total WB VC entities captured: {len(wb_entities)}")

# Categorize: Existing 324 Estates vs Bought Leaf Factories / STG Processors
estate_matches = []
blf_units = []

for e in wb_entities:
    c_ent = clean(e["entity"])
    c_marks = clean(e["marks"])
    
    # check if matches master
    matched_estate = None
    for g in master:
        g_clean = clean(g["name"])
        if len(g_clean) > 4 and (g_clean in c_ent or g_clean in c_marks):
            matched_estate = g["name"]
            break
            
    if matched_estate:
        estate_matches.append((e["entity"], matched_estate))
    else:
        blf_units.append(e)

print(f"Entities matching registered 324 Estates: {len(estate_matches)}")
print(f"Entities that are Standalone BLFs / Processors / Independent Units: {len(blf_units)}")

print("\nSample Standalone BLF / Tea Factory Units:")
for u in blf_units[:25]:
    print(f"  * {u['entity']} | Marks: {u['marks'][:40]}")

