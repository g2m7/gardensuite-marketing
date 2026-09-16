import json, re

with open("marketing/outreach/north-bengal-intelligence/data/north_bengal_gardens.json") as f:
    master = json.load(f)

def clean(s):
    s = re.sub(r"[^A-Z0-9]", "", str(s).upper())
    s = s.replace("TEAGARDEN", "").replace("TEAESTATE", "").replace("TE", "")
    return s

master_set = {clean(g["name"]) for g in master}
master_reg_set = {clean(g["regNo"]) for g in master if g.get("regNo")}

with open("marketing/outreach/north-bengal-intelligence/sources/scribd/Final_Notice_to_all_registered_tea_planters.json") as f:
    fn = json.load(f)

fn_rows = []
for p in fn["pages"]:
    lines = [l.strip() for l in p["text"].split("\n") if l.strip()]
    for i, line in enumerate(lines):
        if "WEST BENGAL" in line.upper():
            block = " ".join(lines[max(0, i-2):min(len(lines), i+3)])
            fn_rows.append(block)

extracted = []
for b in fn_rows:
    m = re.search(r"(\d{4})\s+([A-Z0-9\s\.\(\)\&\'\-\*\/]+?)\s+([A-Z0-9\-\&\s\/]+?|Not registered|Non registered)\s+WEST\s+BENGAL\s+([A-Z\s]+)", b)
    if m:
        sno = m.group(1)
        gname = m.group(2).strip()
        reg = m.group(3).strip()
        dist = m.group(4).strip()
        extracted.append({"sno": sno, "name": gname, "reg": reg, "dist": dist})

seen = set()
unique_fn = []
for e in extracted:
    if e["sno"] not in seen:
        seen.add(e["sno"])
        unique_fn.append(e)

print(f"Total parsed unique WB entries in Final Notice: {len(unique_fn)}")

not_in_master = []
in_master = []
for e in unique_fn:
    c_name = clean(e["name"])
    c_reg = clean(e["reg"])
    if c_name in master_set or c_reg in master_reg_set:
        in_master.append(e)
    else:
        not_in_master.append(e)

print(f"Matched in 324 Master List: {len(in_master)}")
print(f"Novel / Not in 324 Master List: {len(not_in_master)}")
print("\nSample novel entities from Final Notice:")
for e in not_in_master[:25]:
    print(f"  S.No {e['sno']}: {e['name']} (Reg: {e['reg']}) - {e['dist']}")

