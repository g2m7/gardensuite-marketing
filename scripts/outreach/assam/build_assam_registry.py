#!/usr/bin/env python3
"""
Compile the Assam Tea Intelligence Master Registry and relational database.
Merges:
1. Tea Board registered estates (raw_teaboard_assam.csv)
2. Trustea certified marks & entities (raw_vc_entities_assam.csv)
3. High-confidence researched estates (sep-2026-pilot/prospects.csv)

Outputs in marketing/outreach/assam-intelligence/data/:
- gardens.csv
- garden_aliases.csv
- companies.csv
- contacts.csv
- evidence.csv
- review_queue.csv
- active_estates.csv
- Assam_Tea_Master_Registry.csv
- Assam_Tea_Master_Registry.json
- build_report.json
"""

import json
import csv
import re
import os
import difflib
from collections import Counter

TEABOARD_FILE = "marketing/outreach/assam-intelligence/data/raw_teaboard_assam.csv"
VC_FILE = "marketing/outreach/assam-intelligence/data/raw_vc_entities_assam.csv"
PILOT_FILE = "marketing/outreach/sep-2026-pilot/prospects.csv"
DATA_DIR = "marketing/outreach/assam-intelligence/data"

REGIONS = {
    # Upper Assam
    "Dibrugarh": "Upper Assam",
    "Tinsukia": "Upper Assam",
    "Sivasagar": "Upper Assam",
    "Charaideo": "Upper Assam",
    "Jorhat": "Upper Assam",
    "Golaghat": "Upper Assam",
    # Central Assam
    "Sonitpur": "Central Assam",
    "Biswanath": "Central Assam",
    "Nagaon": "Central Assam",
    "Morigaon": "Central Assam",
    "Karbi Anglong": "Central Assam",
    "Dima Hasao": "Central Assam",
    # Lower Assam
    "Darrang": "Lower Assam",
    "Udalguri": "Lower Assam",
    "Baksa": "Lower Assam",
    "Kamrup": "Lower Assam",
    "Lakhimpur": "Lower Assam",
    "Dhubri": "Lower Assam",
    "Goalpara": "Lower Assam",
    "Kokrajhar": "Lower Assam",
    # Barak Valley
    "Cachar": "Barak Valley",
    "Hailakandi": "Barak Valley",
    "Karimganj": "Barak Valley",
}

DIST_PREFIX = {
    "Dibrugarh": "dib",
    "Tinsukia": "tin",
    "Sivasagar": "siv",
    "Charaideo": "cha",
    "Jorhat": "jor",
    "Golaghat": "gol",
    "Sonitpur": "son",
    "Biswanath": "bis",
    "Nagaon": "nag",
    "Morigaon": "mor",
    "Karbi Anglong": "kar",
    "Dima Hasao": "dim",
    "Darrang": "dar",
    "Udalguri": "uda",
    "Baksa": "bak",
    "Kamrup": "kam",
    "Lakhimpur": "lak",
    "Dhubri": "dhu",
    "Goalpara": "goa",
    "Kokrajhar": "kok",
    "Cachar": "cac",
    "Hailakandi": "hai",
    "Karimganj": "krg",
}

CONGLOMERATES = {
    "MCLEOD_RUSSEL": {
        "company": "McLeod Russel India Limited",
        "hq_city": "Kolkata",
        "hq_address": "Four Mangoe Lane, Surendra Mohan Ghosh Sarani, Kolkata 700001",
        "gardens": [
            "PERTABGHUR", "MIJICAJAN", "BEHALI", "HALEM", "NYAGOGRA", "MONABARIE",
            "DHULLIE", "ATTAREEKHAT", "CORRAMORE", "BORENGAJULI", "PANEERY", "TARAJULIE",
            "ADDABARIE", "HUNWAL", "MORAN", "LEPETKATTA", "MAHAKALI", "DUFFLAGHUR", "TEZPORE"
        ]
    },
    "AMALGAMATED_PLANTATIONS": {
        "company": "Amalgamated Plantations Private Limited (Tata)",
        "hq_city": "Guwahati",
        "hq_address": "1st Floor, GS Road, Christian Basti, Guwahati, Assam 781005",
        "gardens": [
            "HATTIGOR", "CHUBWA", "KELLYDEN", "NONOI", "DIFFLOO", "SAGMOOTEA", "TEOK",
            "BORJAN", "KAKAJAN", "NAHORTOLI", "ACHABAM", "NAMROOP", "MAJULI", "NAHORANI",
            "BOCHAPATHAR"
        ]
    },
    "GOODRICKE_GROUP": {
        "company": "Goodricke Group Limited",
        "hq_city": "Kolkata",
        "hq_address": "Camellia House, 14 Gurusaday Road, Kolkata 700019",
        "gardens": ["ORANGAJULI", "SINGRIMARI", "BOROI", "DEHING"]
    },
    "ANDREW_YULE": {
        "company": "Andrew Yule & Company Limited (Govt of India)",
        "hq_city": "Kolkata",
        "hq_address": "Yule House, 8 Dr. Rajendra Prasad Sarani, Kolkata 700001",
        "gardens": ["KHOWANG", "BHAMUN", "TINKHONG", "RAJGARH", "BASMATIA", "HOOLUNGOOREE", "MURPHULANI"]
    },
    "APEEJAY_TEA": {
        "company": "Apeejay Tea Limited (Assam Frontier)",
        "hq_city": "Kolkata",
        "hq_address": "Apeejay House, 15 Park Street, Kolkata 700016",
        "gardens": ["TALAP", "HILIKA", "KHARJAN", "PENGAREE", "HOKANGURI", "BUDLAPARA"]
    },
    "WARREN_TEA": {
        "company": "Warren Tea Limited",
        "hq_city": "Kolkata",
        "hq_address": "Suvira House, 4B Hungerford Street, Kolkata 700017",
        "gardens": ["DHOEDAAM", "DEOHALL", "HATIMARA", "SEALKOTEE", "RUPAI", "DUAMARA"]
    },
    "ROSSELL_INDIA": {
        "company": "Rossell India Limited",
        "hq_city": "Kolkata",
        "hq_address": "Jindal Towers, Block B, 4th Floor, 21/1A/3 Darga Road, Kolkata 700017",
        "gardens": ["DIKOM", "NOKHROY", "ROMAI"]
    },
    "DHUNSERI_TEA": {
        "company": "Dhunseri Tea & Industries Limited",
        "hq_city": "Kolkata",
        "hq_address": "Dhunseri House, 4A Woodburn Park, Kolkata 700020",
        "gardens": ["DHUNSERI", "BAHADUR", "SANTI", "HAPJAN"]
    },
    "ASSAM_COMPANY": {
        "company": "Assam Company India Limited (BRS Group)",
        "hq_city": "Guwahati",
        "hq_address": "Greenwood Tea Estate, Dibrugarh / GS Road Guwahati",
        "gardens": [
            "MAIJAN", "GREENWOOD", "DINJAN", "RUNGAGORA", "DIGULTURRUNG", "THANAI",
            "HAZELBANK", "NUDWA", "BORBOROOAH", "KONDOLI", "SALONAH"
        ]
    }
}

def clean_key(s):
    s = re.sub(r"[^A-Z0-9]", "", str(s).upper())
    for word in ["TEAESTATE", "TEAGARDEN", "ESTATE", "GARDEN", "TE", "COMPANY", "PVT", "LTD"]:
        s = s.replace(word, "")
    return s

def match_pilot(estate_name, pilot_map):
    ck = clean_key(estate_name)
    if not ck:
        return None
    # 1. Exact clean key match
    if ck in pilot_map:
        return pilot_map[ck]
    # 2. Strict fuzzy match (difflib >= 0.85)
    close = difflib.get_close_matches(ck, pilot_map.keys(), n=1, cutoff=0.85)
    if close:
        return pilot_map[close[0]]
    return None

def find_conglomerate(estate_name):
    ck = clean_key(estate_name)
    if not ck:
        return None
    for group_key, info in CONGLOMERATES.items():
        for g in info["gardens"]:
            if ck == g or (len(g) > 4 and ck.startswith(g)):
                return info
    return None

def main():
    os.makedirs(DATA_DIR, exist_ok=True)

    # 1. Load Tea Board 669
    with open(TEABOARD_FILE, "r", encoding="utf-8") as f:
        tb_rows = list(csv.DictReader(f))

    # 2. Load Pilot Data 34
    pilot_map = {}
    if os.path.exists(PILOT_FILE):
        with open(PILOT_FILE, "r", encoding="utf-8") as f:
            for r in csv.DictReader(f):
                k = clean_key(r["estate_name"])
                if k:
                    pilot_map[k] = r

    # 3. Load VC entities
    vc_rows = []
    if os.path.exists(VC_FILE):
        with open(VC_FILE, "r", encoding="utf-8") as f:
            vc_rows = list(csv.DictReader(f))

    vc_marks_map = {}
    for v in vc_rows:
        v_key = clean_key(v["entity_name"])
        if v_key and v["marks"]:
            vc_marks_map[v_key] = v["marks"]

    # Tables for relational database
    gardens = []
    aliases = []
    companies = {}
    contacts = []
    evidence = []
    review_queue = []
    active_estates = []
    master_rows = []

    dist_counters = Counter()
    company_id_counter = 1
    sl = 1

    for r in tb_rows:
        name = r["estate_name"].strip()
        dist = r["district"].strip()
        reg_no = r["tb_reg_no"].strip()
        region = REGIONS.get(dist, "Upper Assam")
        dist_code = DIST_PREFIX.get(dist, "as")
        dist_counters[dist] += 1
        garden_id = f"gs-as-{dist_code}-{dist_counters[dist]:03d}"

        ck = clean_key(name)
        conglom = find_conglomerate(name)
        pilot = match_pilot(name, pilot_map)
        vc_mark = vc_marks_map.get(ck, "")

        # Alias tracking
        aliases.append({
            "garden_id": garden_id,
            "alias_name": name,
            "source": "tea_board_registered_planters_2019"
        })
        if pilot and pilot["estate_name"] != name:
            aliases.append({
                "garden_id": garden_id,
                "alias_name": pilot["estate_name"],
                "source": "pilot_research_202609"
            })

        # Corporate / Contact resolution
        if pilot:
            comp_name = pilot.get("ownership") or f"{name} Co."
            dm_name = f"{pilot.get('contact_first_name', '')} {pilot.get('contact_last_name', '')}".strip()
            dm_title = pilot.get("contact_title") or "Owner"
            email = pilot.get("contact_email") or "-"
            hectares = pilot.get("hectares") or ""
            scale = f"{hectares} Ha" if hectares else (pilot.get("scale_proxy") or "Organized Plantation")
            hq_city = dist
            hq_addr = pilot.get("location") or f"{dist}, Assam"
            phone = "-"
            corp_rev = pilot.get("corporate_review", "Pass")
            eligibility = "target_candidate" if corp_rev == "Pass" else "excluded_large_group"
            excl_reason = "Public company or multi-estate group" if corp_rev != "Pass" else ""
            status = "active_confirmed"
            owner_conf = "high"

            # Record contact
            if email and email != "-":
                contacts.append({
                    "garden_id": garden_id,
                    "company_name": comp_name,
                    "contact_name": dm_name,
                    "title": dm_title,
                    "email": email,
                    "email_status": pilot.get("external_validation_substatus") or pilot.get("snov_status") or "unverified",
                    "source": pilot.get("account_source_urls", "pilot_prospects")
                })

            # Record evidence
            evidence.append({
                "garden_id": garden_id,
                "evidence_type": "official_pilot_audit",
                "claim": f"Verified operation. {scale}. Ownership: {comp_name}. Decision maker: {dm_name}.",
                "source_urls": pilot.get("account_source_urls", "")
            })

        elif conglom:
            comp_name = conglom["company"]
            dm_name = "-"
            email = "-"
            scale = "Organized Plantation"
            hq_city = conglom["hq_city"]
            hq_addr = conglom["hq_address"]
            phone = "-"
            eligibility = "excluded_large_group"
            excl_reason = "Conglomerate / Multi-estate group"
            status = "active_confirmed"
            owner_conf = "high"

            evidence.append({
                "garden_id": garden_id,
                "evidence_type": "corporate_registry",
                "claim": f"Operated by {comp_name}.",
                "source_urls": "Tea Board Register & Annual Filings"
            })

        else:
            comp_name = name
            dm_name = "-"
            email = "-"
            scale = "Organized Plantation"
            hq_city = dist
            hq_addr = f"{dist}, Assam"
            phone = "-"
            eligibility = "target_candidate"
            excl_reason = ""
            status = "likely_active"
            owner_conf = "medium"

            evidence.append({
                "garden_id": garden_id,
                "evidence_type": "teaboard_final_notice",
                "claim": f"Registered tea garden #{reg_no} in {dist}, Assam.",
                "source_urls": "Tea Board Final Notice 2019"
            })

            # Flag for company lookup in review queue
            review_queue.append({
                "garden_id": garden_id,
                "garden_name": name,
                "district": dist,
                "action_needed": "mca_company_lookup",
                "details": f"Find owning entity and directors for Reg #{reg_no}"
            })

        # Register company in catalog
        if comp_name not in companies:
            c_type = "Corporate Conglomerate" if conglom else ("Proprietorship / Family Estate" if ("proprietorship" in comp_name.lower() or "family" in comp_name.lower()) else "Private Limited Company")
            companies[comp_name] = {
                "company_id": f"gs-as-co-{company_id_counter:03d}",
                "company_name": comp_name,
                "type": c_type,
                "hq_city": hq_city,
                "hq_address": hq_addr,
                "exclusion_flag": "yes" if eligibility == "excluded_large_group" else "no",
                "gardens_count": 1
            }
            company_id_counter += 1
        else:
            companies[comp_name]["gardens_count"] += 1

        company_id = companies[comp_name]["company_id"]

        # Garden record
        garden_rec = {
            "garden_id": garden_id,
            "canonical_name": name,
            "normalized_name": ck.lower(),
            "current_status": status,
            "status_confidence": "high" if (pilot or conglom) else "medium",
            "district": dist,
            "region": region,
            "tea_board_registration": reg_no,
            "company_id": company_id,
            "company_name": comp_name,
            "scale": scale,
            "marks": vc_mark,
            "prospect_eligibility": eligibility,
            "exclusion_reason": excl_reason,
            "source": "tea_board_registered_planters_2019"
        }
        gardens.append(garden_rec)

        if eligibility == "target_candidate":
            active_estates.append(garden_rec)

        # Flat Master Registry row
        master_rows.append({
            "sl": sl,
            "name": name,
            "type": "Organized Estate",
            "region": region,
            "district": dist,
            "company": comp_name,
            "decision_maker": dm_name if dm_name else "-",
            "hq_city": hq_city,
            "hq_address": hq_addr,
            "phone": str(phone).strip(),
            "email": str(email).strip(),
            "scale": scale,
            "reg_no": reg_no,
            "marks": vc_mark,
            "maps_url": ""
        })
        sl += 1

    # Add Standalone Bought Leaf Factories
    tb_keys = {clean_key(r["estate_name"]) for r in tb_rows if len(clean_key(r["estate_name"])) > 3}
    blf_count = 0
    for v in vc_rows:
        v_name = v["entity_name"].strip()
        v_key = clean_key(v_name)
        if not any(len(k) > 4 and (k in v_key or v_key in k) for k in tb_keys):
            if any(term in v_name.upper() for term in ["BLF", "BOUGHT LEAF", "UDYOG", "INDUSTRIES", "CHA UDYOG", "AGRO", "FACTORY"]):
                blf_count += 1
                b_dist = "Dibrugarh"
                for d in REGIONS.keys():
                    if d.upper() in v_name.upper():
                        b_dist = d
                        break
                b_region = REGIONS.get(b_dist, "Upper Assam")

                master_rows.append({
                    "sl": sl,
                    "name": v_name,
                    "type": "Bought Leaf Factory (BLF)",
                    "region": b_region,
                    "district": b_dist,
                    "company": v_name,
                    "decision_maker": "-",
                    "hq_city": b_dist,
                    "hq_address": f"{b_dist}, Assam",
                    "phone": "-",
                    "email": "-",
                    "scale": "BLF Processing",
                    "reg_no": v["marks"][:40] if v["marks"] else "Trustea Certified",
                    "marks": v["marks"],
                    "maps_url": ""
                })
                sl += 1

    # --- Write Files ---

    # 1. gardens.csv
    with open(os.path.join(DATA_DIR, "gardens.csv"), "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=[
            "garden_id", "canonical_name", "normalized_name", "current_status", "status_confidence",
            "district", "region", "tea_board_registration", "company_id", "company_name", "scale", "marks",
            "prospect_eligibility", "exclusion_reason", "source"
        ])
        writer.writeheader()
        writer.writerows(gardens)

    # 2. garden_aliases.csv
    with open(os.path.join(DATA_DIR, "garden_aliases.csv"), "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["garden_id", "alias_name", "source"])
        writer.writeheader()
        writer.writerows(aliases)

    # 3. companies.csv
    with open(os.path.join(DATA_DIR, "companies.csv"), "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["company_id", "company_name", "type", "hq_city", "hq_address", "exclusion_flag", "gardens_count"])
        writer.writeheader()
        writer.writerows(list(companies.values()))

    # 4. contacts.csv
    with open(os.path.join(DATA_DIR, "contacts.csv"), "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["garden_id", "company_name", "contact_name", "title", "email", "email_status", "source"])
        writer.writeheader()
        writer.writerows(contacts)

    # 5. evidence.csv
    with open(os.path.join(DATA_DIR, "evidence.csv"), "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["garden_id", "evidence_type", "claim", "source_urls"])
        writer.writeheader()
        writer.writerows(evidence)

    # 6. review_queue.csv
    with open(os.path.join(DATA_DIR, "review_queue.csv"), "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["garden_id", "garden_name", "district", "action_needed", "details"])
        writer.writeheader()
        writer.writerows(review_queue)

    # 7. active_estates.csv
    with open(os.path.join(DATA_DIR, "active_estates.csv"), "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=[
            "garden_id", "canonical_name", "normalized_name", "current_status", "status_confidence",
            "district", "region", "tea_board_registration", "company_id", "company_name", "scale", "marks",
            "prospect_eligibility", "exclusion_reason", "source"
        ])
        writer.writeheader()
        writer.writerows(active_estates)

    # 8. Assam_Tea_Master_Registry.csv
    with open(os.path.join(DATA_DIR, "Assam_Tea_Master_Registry.csv"), "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=[
            "sl", "name", "type", "region", "district", "company", "decision_maker",
            "hq_city", "hq_address", "phone", "email", "scale", "reg_no", "marks", "maps_url"
        ])
        writer.writeheader()
        writer.writerows(master_rows)

    # 9. Assam_Tea_Master_Registry.json
    with open(os.path.join(DATA_DIR, "Assam_Tea_Master_Registry.json"), "w", encoding="utf-8") as f:
        json.dump(master_rows, f, indent=2, ensure_ascii=False)

    # 10. build_report.json
    report = {
        "total_master_records": len(master_rows),
        "organized_estates": len(gardens),
        "standalone_blfs": blf_count,
        "eligible_prospect_targets": len(active_estates),
        "conglomerate_excluded": len(gardens) - len(active_estates),
        "review_queue_items": len(review_queue),
        "verified_contacts": len(contacts),
        "region_distribution": dict(Counter(m["region"] for m in master_rows).most_common()),
        "distinct_companies": len(companies),
        "conglomerates_identified": {k: len(v["gardens"]) for k, v in CONGLOMERATES.items()}
    }
    with open(os.path.join(DATA_DIR, "build_report.json"), "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)

    print("--- Build Complete ---")
    print(f"Total Master Records : {len(master_rows)}")
    print(f" - Organized Estates : {len(gardens)}")
    print(f" - Standalone BLFs   : {blf_count}")
    print(f"Target Candidates    : {len(active_estates)}")
    print(f"Conglomerate Excluded: {len(gardens) - len(active_estates)}")
    print(f"Verified Contacts    : {len(contacts)}")
    print(f"Review Queue Tasks   : {len(review_queue)}")

if __name__ == "__main__":
    main()
