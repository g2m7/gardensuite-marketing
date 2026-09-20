#!/usr/bin/env python3
"""
Extract registered Assam tea estates from Tea Board of India Final Notice.
Source: marketing/outreach/north-bengal-intelligence/sources/scribd/Final_Notice_to_all_registered_tea_planters.json
Outputs: marketing/outreach/assam-intelligence/data/raw_teaboard_assam.csv
"""

import json
import re
import csv
import os
from collections import Counter

SOURCE_FILE = "marketing/outreach/north-bengal-intelligence/sources/scribd/Final_Notice_to_all_registered_tea_planters.json"
OUTPUT_FILE = "marketing/outreach/assam-intelligence/data/raw_teaboard_assam.csv"

# Normalize district spelling to title case standard
DISTRICT_MAP = {
    "BAKSA": "Baksa",
    "BISWANATH": "Biswanath",
    "CACHAR": "Cachar",
    "CHARAIDEO": "Charaideo",
    "DARRANG": "Darrang",
    "DHUBRI": "Dhubri",
    "DIBRUGARH": "Dibrugarh",
    "DIMA HASAO": "Dima Hasao",
    "GOALPARA": "Goalpara",
    "GOLAGHAT": "Golaghat",
    "HAILAKANDI": "Hailakandi",
    "JORHAT": "Jorhat",
    "KAMRUP": "Kamrup",
    "KARBI ANGLONG": "Karbi Anglong",
    "KARIMGANJ": "Karimganj",
    "KOKRAJHAR": "Kokrajhar",
    "LAKHIMPUR": "Lakhimpur",
    "NORTH LAKHIMPUR": "Lakhimpur",
    "MORIGAON": "Morigaon",
    "NAGAON": "Nagaon",
    "SIVASAGAR": "Sivasagar",
    "SIVSAGAR": "Sivasagar",
    "SONITPUR": "Sonitpur",
    "TINSUKIA": "Tinsukia",
    "UDALGURI": "Udalguri",
}

def clean_estate_name(name):
    # Strip unnecessary punctuation while keeping designations
    name = re.sub(r"\s+", " ", name).strip()
    return name

def main():
    if not os.path.exists(SOURCE_FILE):
        print(f"Error: Source file {SOURCE_FILE} not found.")
        return

    with open(SOURCE_FILE, "r", encoding="utf-8") as f:
        fn_data = json.load(f)

    # Collect all non-header lines
    all_lines = []
    for p in fn_data["pages"]:
        lines = [l.strip() for l in p["text"].split("\n") if l.strip()]
        for l in lines:
            if l.startswith("LIST OF TEA GARDENS") or l.startswith("S.No."):
                continue
            all_lines.append(l)

    # Reconstruct multi-line rows based on sequential S.No tracking
    combined = []
    expected_sno = 1
    for l in all_lines:
        m = re.match(r"^(\d+)\b(.*)", l)
        if m and int(m.group(1)) == expected_sno:
            combined.append(l)
            expected_sno += 1
        elif m and int(m.group(1)) == expected_sno - 1 and "ARUNACHAL" in l:
            # Duplicate 38 in Arunachal Pradesh
            pass
        else:
            if combined:
                combined[-1] += " " + l

    assam_records = []
    district_counts = Counter()

    for c in combined:
        m = re.match(r"^(\d+)\s+(.*)", c)
        if m:
            sno = int(m.group(1))
            if 28 <= sno <= 696:
                text = m.group(2).strip()
                m_dist = re.search(r"^(.*?)\s+ASSAM\s+([A-Z\s\-]+)$", text)
                if m_dist:
                    middle = m_dist.group(1).strip()
                    raw_dist = m_dist.group(2).strip()
                    norm_dist = DISTRICT_MAP.get(raw_dist, raw_dist.title())

                    # Match registration number at the end
                    m_reg = re.search(
                        r"^(.*?)\s+([A-Z]{1,2}[-\/]\s*\d+.*|\d+.*|\b(?:Not Available|NOT REGISTERED|Not registered|NA)\b)$",
                        middle,
                        re.IGNORECASE,
                    )
                    if m_reg:
                        estate_name = clean_estate_name(m_reg.group(1))
                        tb_reg_no = m_reg.group(2).strip()
                    else:
                        estate_name = clean_estate_name(middle)
                        tb_reg_no = "Not Available"

                    assam_records.append({
                        "tb_sno": sno,
                        "estate_name": estate_name,
                        "tb_reg_no": tb_reg_no,
                        "state": "Assam",
                        "district": norm_dist,
                        "raw_entry": text,
                    })
                    district_counts[norm_dist] += 1

    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["tb_sno", "estate_name", "tb_reg_no", "state", "district", "raw_entry"])
        writer.writeheader()
        writer.writerows(assam_records)

    print(f"Successfully extracted {len(assam_records)} official Assam tea estates to {OUTPUT_FILE}")
    print("\nDistrict breakdown:")
    for dist, count in district_counts.most_common():
        print(f"  {dist:20s}: {count} estates")

if __name__ == "__main__":
    main()
