# Assam Estate Intelligence

This is the canonical GardenSuite registry for tea estates and tea production units in Assam. It mirrors the multi-tier data architecture established in Dooars Intelligence (`marketing/outreach/dooars-intelligence/`) and compiles a unified master registry matching North Bengal (`North_Bengal_Tea_Master_Registry.csv`).

## What it produces

In `marketing/outreach/assam-intelligence/data/`:

- `Assam_Tea_Master_Registry.csv`: 736 compiled tea production units (669 organized estates + 67 standalone Bought Leaf Factories) matching the format of the West Bengal master registry (`sl,name,type,region,district,company,decision_maker,hq_city,hq_address,phone,email,scale,reg_no,marks,maps_url`).
- `Assam_Tea_Master_Registry.html`: Standalone interactive browser viewer with live instant search, type filters, and region filters.
- `Assam_Tea_Master_Registry.json`: Complete JSON dump of all 736 units.
- `gardens.csv`: Canonical relational identity records for all 669 Tea Board registered organized estates with stable IDs (`gs-as-dib-001`, `gs-as-tin-002`, etc.), status, confidence, district, region, marks, and eligibility flags.
- `garden_aliases.csv`: 700+ canonical and spelling variants (e.g. "Phukanbari" vs "Phukenbari", "Pipratoli" vs "Pipratoly") to prevent duplicate entries across government datasets.
- `companies.csv`: 605 registered corporate entities, partnerships, and proprietorships categorized by type (Private Limited, Proprietary Family Estate, Corporate Conglomerate, BLF Processor).
- `contacts.csv`: Verified decision-makers (owners, managing directors, partners) with verified business emails and deliverability status.
- `evidence.csv`: 669 audit records linking each estate to primary government sources (Tea Board Final Notice, Trustea certifications, pilot audits).
- `active_estates.csv`: 593 qualified independent/mid-tier target candidate estates, with 76 massive conglomerate gardens filtered out.
- `review_queue.csv`: 574 actionable verification tasks (MCA CIN lookups, ROC Shillong/Guwahati checks).
- `build_report.json`: Coverage statistics, regional breakdown, and conglomerate identification metrics.

## Pipeline Commands

```sh
# 1. Extract raw Tea Board registered estates (669 rows)
python3 scripts/outreach/assam/extract_teaboard_assam.py

# 2. Extract Assam Trustea / VC entities and BLFs (364 rows)
python3 scripts/outreach/assam/extract_vc_entities_assam.py

# 3. Build relational tables and master registry
python3 scripts/outreach/assam/build_assam_registry.py

# 4. Generate interactive HTML viewer
python3 scripts/outreach/assam/create_html_view.py
```

## Dataset Snapshot

- **Total Production Units**: 736 (669 Organized Estates, 67 Standalone BLFs)
- **Regional Distribution**:
  - Upper Assam: 510 units (Dibrugarh: 132, Tinsukia: 93, Jorhat: 82, Golaghat: 57, Charaideo: 52, Sivasagar: 27, etc.)
  - Central Assam: 96 units (Sonitpur: 43, Nagaon: 20, Biswanath: 15, Karbi Anglong: 15, etc.)
  - Barak Valley: 96 units (Cachar: 54, Karimganj: 24, Hailakandi: 18)
  - Lower Assam: 34 units (Lakhimpur: 11, Udalguri: 6, Kokrajhar: 4, Darrang: 3, Dhubri: 3, Kamrup: 3, Baksa: 2, Goalpara: 2, Morigaon: 1)
- **Target Candidates**: 593 independent mid-market estates (~100 to 500 ha)
- **Conglomerate Excluded**: 76 gardens operated by large multi-estate groups (McLeod Russel, APPL/Tata, Goodricke, Andrew Yule, Apeejay, Warren Tea, Rossell India, Dhunseri, Assam Company).

## Ongoing Enrichment Workflow

1. **MCA21 Company Linking**: Work through items in `data/review_queue.csv` by looking up the owning company on the MCA21 portal or licensed corporate data providers (Tofler/Instafinancials) to retrieve CIN, registered office, and active status.
2. **Google Maps HQ Scraping**: Run the adapted Google Maps scraper for regional headquarters in Guwahati (GS Road, Christian Basti), Kolkata, and Upper Assam district towns (Dibrugarh, Tinsukia, Jorhat).
3. **Contact Reverification**: Run novel emails through the bulk DNS MX and SMTP deliverability validator (`scripts/outreach/verify_golden_list.py`).
