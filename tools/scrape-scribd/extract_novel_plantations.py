import json, re

with open("marketing/outreach/north-bengal-intelligence/data/north_bengal_master_registry.json") as f:
    master_estates = json.load(f)

def clean(s):
    s = re.sub(r"[^A-Z0-9]", "", str(s).upper())
    s = s.replace("TEAGARDEN", "").replace("TEAESTATE", "").replace("TE", "")
    return s

master_names = {clean(g["gardenName"]) for g in master_estates}
master_regds = {clean(g["regNo"]) for g in master_estates if g.get("regNo")}

with open("marketing/outreach/north-bengal-intelligence/sources/scribd/Final_Notice_to_all_registered_tea_planters.json") as f:
    fn_data = json.load(f)

all_text = "\n".join(p["text"] for p in fn_data["pages"])
lines = [l.strip() for l in all_text.split("\n") if l.strip()]

novel_gardens = []
for i, l in enumerate(lines):
    if "WEST BENGAL" in l.upper():
        chunk = " ".join(lines[max(0, i-2):min(len(lines), i+3)])
        m = re.search(r"(\d{4})\s+([A-Z0-9\s\.\(\)\&\'\-\*\/]+?)\s+([A-Z0-9\-\&\s\/]+?|Not registered|Non registered)\s+WEST\s+BENGAL\s+([A-Z\s]+)", chunk)
        if m:
            sno, name, reg, dist = m.group(1), m.group(2).strip(), m.group(3).strip(), m.group(4).strip()
            name_clean = clean(name)
            reg_clean = clean(reg)
            
            if len(name) > 3 and name_clean not in master_names and reg_clean not in master_regds:
                if not any(k in name.upper() for k in ["WEST BENGAL", "S.NO", "STATE", "DISTRICT"]):
                    if name_clean not in [clean(x["name"]) for x in novel_gardens]:
                        novel_gardens.append({
                            "sno": sno,
                            "name": name,
                            "reg": reg,
                            "district": dist
                        })

print(f"Extracted {len(novel_gardens)} clean novel gardens:")
for g in novel_gardens[:20]:
    print(f"  * {g['name']} | Reg: {g['reg']} | Dist: {g['district']}")
