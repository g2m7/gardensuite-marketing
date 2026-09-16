import json, re

# Load Master Registry (324)
with open("marketing/outreach/north-bengal-intelligence/data/north_bengal_master_registry.json") as f:
    master_estates = json.load(f)

# Load BLFs (72)
with open("marketing/outreach/north-bengal-intelligence/data/bought_leaf_factories_wb.json") as f:
    blf_units = json.load(f)

# Load Final Notice
with open("marketing/outreach/north-bengal-intelligence/sources/scribd/Final_Notice_to_all_registered_tea_planters.json") as f:
    fn_data = json.load(f)

print(f"Master Estates: {len(master_estates)}")
print(f"BLF Units: {len(blf_units)}")
