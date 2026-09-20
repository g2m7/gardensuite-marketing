#!/usr/bin/env python3
"""
Extract Assam certified entities and Bought Leaf Factories (BLFs) from Trustea VC Entities List.
Source: marketing/outreach/north-bengal-intelligence/sources/scribd/VC_entities_list_180723.json
Outputs: marketing/outreach/assam-intelligence/data/raw_vc_entities_assam.csv
"""

import json
import re
import csv
import os

SOURCE_FILE = "marketing/outreach/north-bengal-intelligence/sources/scribd/VC_entities_list_180723.json"
OUTPUT_FILE = "marketing/outreach/assam-intelligence/data/raw_vc_entities_assam.csv"

def clean_text(s):
    s = re.sub(r"\s+", " ", str(s)).strip()
    return s

def classify_entity(entity_name):
    u = entity_name.upper()
    if any(k in u for k in ["BLF", "BOUGHT LEAF", "UDYOG", "INDUSTRIES", "FACTORY & STG", "CHA UDYOG"]) and not any(k in u for k in ["TEA ESTATE", "T.E.", "TEAGARDEN"]):
        return "Bought Leaf Factory (BLF)"
    elif any(k in u for k in ["AGRO", "ENTERPRISE", "TRADING"]):
        return "Tea Processor / Unit"
    else:
        return "Organized Estate / Factory"

def main():
    if not os.path.exists(SOURCE_FILE):
        print(f"Error: Source file {SOURCE_FILE} not found.")
        return

    with open(SOURCE_FILE, "r", encoding="utf-8") as f:
        vc_data = json.load(f)

    extracted = []
    seen = set()

    for p in vc_data["pages"]:
        p_num = p["page"]
        lines = [l.strip() for l in p["text"].split("\n") if l.strip()]
        for i, line in enumerate(lines):
            # Match lines containing ASSAM (not inside parentheses like (ASSAM))
            if re.search(r"(?<!\()ASSAM", line):
                parts = re.split(r"(?<!\()ASSAM", line, maxsplit=1)
                left = parts[0].strip()
                right = parts[1].strip() if len(parts) > 1 else ""

                entity_parts = []
                k = i - 1
                while k >= 0 and not re.search(r"(?<!\()ASSAM", lines[k]):
                    entity_parts.insert(0, lines[k])
                    if len(entity_parts) >= 2:
                        break
                    k -= 1
                if left:
                    entity_parts.append(left)

                full_entity = clean_text(" ".join(entity_parts))
                full_entity = re.sub(r"^\d+\s*", "", full_entity)
                marks = clean_text(right)

                # Skip if too short or header artifacts
                if len(full_entity) < 4 or "VERIFIED" in full_entity.upper():
                    continue

                entity_type = classify_entity(full_entity)
                clean_key = re.sub(r"[^A-Z0-9]", "", full_entity.upper())

                if clean_key and clean_key not in seen:
                    seen.add(clean_key)
                    extracted.append({
                        "entity_name": full_entity,
                        "type": entity_type,
                        "state": "Assam",
                        "marks": marks,
                        "source_page": p_num
                    })

    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["entity_name", "type", "state", "marks", "source_page"])
        writer.writeheader()
        writer.writerows(extracted)

    print(f"Extracted {len(extracted)} unique Assam certified entities/BLFs to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
