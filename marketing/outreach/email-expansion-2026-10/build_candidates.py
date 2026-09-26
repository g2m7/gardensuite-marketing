#!/usr/bin/env python3
"""Build the October 2026 email expansion list from local source files only.

Research only. This script never sends, imports or contacts anyone.
Run from the repo root: python3 marketing/outreach/email-expansion-2026-10/build_candidates.py
"""
import csv
import glob
import os
import re
from collections import Counter

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
OUT = os.path.dirname(os.path.abspath(__file__))
MO = os.path.join(ROOT, "marketing", "outreach")
PILOT = os.path.join(MO, "sep-2026-pilot")
CRM_XLSX = os.path.join(ROOT, "deliverables", "legacy-outreach-data", "GS_CRM_WhatsApp_Campaign_Tracker.xlsx")


def read(path):
    with open(path, newline="", encoding="utf-8-sig") as f:
        return list(csv.DictReader(f))


def clean_email(e):
    e = (e or "").strip().lower().strip(";,")
    return e if re.fullmatch(r"[^@\s]+@[^@\s]+\.[a-z]{2,}", e) else ""


SUFFIX_WORDS = {
    "tea", "estate", "estates", "garden", "gardens", "te", "tg", "t", "e", "co", "company", "pvt", "private",
    "ltd", "limited", "the", "and", "industries", "inds", "plantation", "plantations", "p", "v", "l", "md",
    "division", "div", "seed", "factory", "agro", "&", "of", "llp",
}


def norm(name):
    s = (name or "").lower().replace("&", " and ")
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    words = [w for w in s.split() if w not in SUFFIX_WORDS]
    return " ".join(words)


CLIENTS = [
    "harishpur", "bagrodia", "simulbarie", "simulbari", "longview", "rheabari", "mogulkata", "rahimpur",
    "debpara", "kurti", "looksan", "subhasini", "choibari", "chapar", "doolahat", "atal", "thanjhora",
    "naxalbari", "pahargoomiah", "pahargumia", "kamalpur", "tinbigha", "chandan", "himalayan agro",
]
CORPORATE = [
    "tata", "amalgamated", "goodricke", "mcleod", "apeejay", "jay shree", "jayshree", "duncan", "williamson",
    "warren", "andrew yule", "assam company", "rossell", "dhunseri", "jalan industries", "b&a", "b & a",
    "luxmi", "chamong", "halmari", "amarawati", "diana tea", "rydak", "gillanders", "octavius", "saharia group",
]
# From sep-2026-pilot/daily-status.md: legacy CRM negotiations and held buying centres.
PILOT_BLOCKED = {
    "amulguri": "negotiation", "mothola": "negotiation", "longboi": "negotiation", "ghooronia": "negotiation",
    "phukanbari": "negotiation", "phukenbari": "negotiation", "sarojini": "negotiation",
    "ghograjan": "negotiation", "ghorajan": "negotiation", "durgapur": "negotiation",
    "lankashi": "negotiation",
}
GENERIC_FIRST = {"new", "north", "south", "east", "west", "bara", "chota", "choto", "sri", "shree", "shri"}


def is_client(n, company):
    words = n.split()
    blob = f"{n} {norm(company)}"
    for c in CLIENTS:
        if " " in c:
            if c in blob:
                return True
        elif c in words or (words and words[0] == c):
            return True
    return "harishpur" in blob or "bagrodia" in blob


def corporate_hit(*texts):
    blob = " ".join(t or "" for t in texts).lower()
    for k in CORPORATE:
        if re.search(r"(^|[^a-z])" + re.escape(k) + r"([^a-z]|$)", blob):
            return k
    return ""


# ---------- validation lookup ----------
validation = {}  # email -> (status, date, note)


def set_val(email, status, date, note):
    rank = {"invalid": 5, "safe_deliverable": 4, "snov_valid": 4, "risky": 3, "unknown": 2, "not_checked": 1}
    old = validation.get(email)
    if old is None or rank[status] >= rank[old[0]]:
        validation[email] = (status, date, note)


for fname, date in [("EXTERNAL_VALIDATION_2026-09-08.csv", "2026-09-08"),
                    ("EXTERNAL_VALIDATION_NOVEL_EMAILS_2026-09-12.csv", "2026-09-12")]:
    for r in read(os.path.join(PILOT, fname)):
        e = clean_email(r["Email"])
        st, sub = r["Status"].strip().lower(), r["Substatus"].strip().lower()
        if st == "safe" and sub == "deliverable":
            set_val(e, "safe_deliverable", date, "OrbiSearch safe/deliverable")
        elif st == "invalid":
            set_val(e, "invalid", date, f"OrbiSearch invalid ({sub})")
        else:
            set_val(e, "risky", date, f"OrbiSearch {st}/{sub}")

prospects = read(os.path.join(PILOT, "prospects.csv"))
for r in prospects:
    e = clean_email(r["contact_email"])
    if not e:
        continue
    s = r["snov_status"].strip().lower()
    if s == "valid":
        set_val(e, "snov_valid", r["contact_verified_date"], "Snov Valid")
    elif s == "invalid":
        set_val(e, "invalid", r["contact_verified_date"], "Snov Invalid")
    elif "risky" in s or "unverifiable" in s:
        set_val(e, "risky", r["contact_verified_date"], "Snov Unverifiable (Risky)")
    ev = r["external_validation_status"].strip().lower()
    if ev == "invalid":
        set_val(e, "invalid", r["external_validation_date"], "OrbiSearch invalid")


def registry_status(e, raw):
    raw = (raw or "").strip().lower()
    if raw in ("mailbox_not_found", "no_mx_records", "invalid"):
        set_val(e, "invalid", "", f"registry email_status {raw}")


# ---------- contacted and blocked sets ----------
contacted_emails, contacted_ids, contacted_names = set(), set(), set()
for f in glob.glob(os.path.join(PILOT, "snov-import*.csv")) + glob.glob(os.path.join(MO, "snov_campaign_batches", "*.csv")):
    for r in read(f):
        e = clean_email(r.get("email"))
        if e:
            contacted_emails.add(e)
        if r.get("account_id"):
            contacted_ids.add(r["account_id"].strip())
        nm = r.get("estate_name") or r.get("company_name")
        if nm:
            contacted_names.add(norm(nm))

crm_blocked = {}  # norm name -> reason text
crm_note = "legacy CRM xlsx read with openpyxl"
try:
    import openpyxl

    wb = openpyxl.load_workbook(CRM_XLSX, read_only=True, data_only=True)
    rows = list(wb["WhatsApp Tracker"].iter_rows(values_only=True))
    h = rows[0]
    for row in rows[1:]:
        d = dict(zip(h, row))
        status = str(d.get("Original CRM Status") or "")
        remarks = str(d.get("Original Remarks") or "").lower()
        demo = str(d.get("Demo Call Status") or "").lower()
        reply = str(d.get("Reply Status") or "").lower()
        reason = ""
        if "not interested" in remarks or "do not" in remarks:
            reason = "rejected"
        elif status == "Negotiation" or "demo booked" in reply or "booked" in demo:
            reason = "negotiation"
        if reason:
            for nm in (d.get("Client Name"), d.get("Tea Garden")):
                n = norm(str(nm or ""))
                if len(n) >= 4:
                    crm_blocked[n] = f"{reason} (legacy CRM: {status} / {remarks[:30]})"
except Exception as exc:  # recorded in README if the workbook cannot be read
    crm_note = f"legacy CRM xlsx unreadable: {exc}"

prospect_flags = {}
for r in prospects:
    n = norm(r["estate_name"])
    if r["active_sales_discussion"].strip().lower() == "yes":
        prospect_flags[n] = "negotiation"
    elif r["previously_rejected"].strip().lower() == "yes" and not r["rejection_override"].strip():
        prospect_flags[n] = "rejected"
    elif r["corporate_review"].strip().lower() == "fail":
        prospect_flags[n] = "corporate"
    elif r["current_client"].strip().lower() == "yes":
        prospect_flags[n] = "client"


def blocked_reason(n):
    words = n.split()
    first = words[0] if words else ""
    for key, why in PILOT_BLOCKED.items():
        if key in words:
            return why, f"pilot daily-status block ({key})"
    if n in prospect_flags:
        return prospect_flags[n], "pilot prospects.csv flag"
    if n in crm_blocked:
        return crm_blocked[n].split(" ")[0], crm_blocked[n]
    if len(first) >= 5 and first not in GENERIC_FIRST:
        for k, v in crm_blocked.items():
            kw = k.split()
            if kw and kw[0] == first:
                return v.split(" ")[0], v + " [first-word match, check]"
    return "", ""


# ---------- region helpers ----------
NB_DISTRICT_REGION = {
    "jalpaiguri": "Dooars", "alipurduar": "Dooars", "darjeeling": "Darjeeling/Terai", "cooch behar": "Cooch Behar",
    "coochbehar": "Cooch Behar", "uttar dinajpur": "Uttar Dinajpur", "kalimpong": "Darjeeling",
}


def slug(s):
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", s.lower())).strip("-")


# ---------- collect raw candidate rows ----------
raw = []


def add(**kw):
    kw["email"] = clean_email(kw.get("email"))
    raw.append(kw)


def is_public_ltd(company):
    c = (company or "").lower()
    return bool(re.search(r"\b(ltd|limited)\b", c)) and not re.search(r"\b(pvt|private|p\.?\s?ltd|llp)\b", c)


def from_scored(path, state):
    for r in read(path):
        if not r["email"].strip():
            continue
        yield r


wb_seen = set()
for f in ["filtered/wb_filtered_candidates.csv", "send_ready/wb_final_send_ready.csv",
          "send_ready/wb_siliguri_local_outreach.csv", "send_ready/wb_blf_grower_outreach.csv"]:
    for r in from_scored(os.path.join(MO, f), "West Bengal"):
        dist = r["district"].strip()
        add(estate_name=r["name"].strip(), state="West Bengal",
            region=NB_DISTRICT_REGION.get(dist.lower(), dist), district=dist, company=r["company"].strip(),
            scale=r["scale_hectares"], contact_name=r["decision_maker"].strip(), contact_role="",
            email=r["email"], src=f, tier=f"{r['tier']} / score {r['tech_score']}".strip(" /"),
            blf=r["is_blf"].strip().lower() == "yes", status=r["status"], disq=r["disqualification_reason"],
            account_id="", notes="")

for f in ["filtered/assam_filtered_candidates.csv", "send_ready/assam_final_send_ready.csv"]:
    for r in from_scored(os.path.join(MO, f), "Assam"):
        add(estate_name=r["name"].strip(), state="Assam", region="Assam", district=r["district"].strip(),
            company=r["company"].strip(), scale=r["scale_hectares"], contact_name=r["decision_maker"].strip(),
            contact_role="", email=r["email"], src=f, tier=f"{r['tier']} / score {r['tech_score']}",
            blf=r["is_blf"].strip().lower() == "yes", status=r["status"], disq=r["disqualification_reason"],
            account_id="", notes="")

for r in read(os.path.join(MO, "assam-intelligence/data/Assam_Tea_Master_Registry.csv")):
    if clean_email(r["email"]):
        add(estate_name=r["name"].strip(), state="Assam", region="Assam", district=r["district"].strip(),
            company=r["company"].strip(), scale=r["scale"], contact_name=r["decision_maker"].strip(),
            contact_role="", email=r["email"], src="assam-intelligence/data/Assam_Tea_Master_Registry.csv",
            tier="", blf="blf" in r["type"].lower() or "bought" in r["type"].lower(), status="registry",
            disq="", account_id="", notes="")

for r in prospects:
    if not r["contact_email"].strip():
        continue
    add(estate_name=r["estate_name"].strip(), state="Assam", region="Assam", district=r["district"].strip(),
        company=r["ownership"].strip(), scale=r["hectares"] or r["scale_proxy"][:60],
        contact_name=f"{r['contact_first_name']} {r['contact_last_name']}".strip(), contact_role=r["contact_title"],
        email=r["contact_email"], src="sep-2026-pilot/prospects.csv", tier="", blf=False, status="pilot",
        disq="", account_id=r["account_id"], notes="")

a_gardens = {g["garden_id"]: g for g in read(os.path.join(MO, "assam-intelligence/data/gardens.csv"))}
for r in read(os.path.join(MO, "assam-intelligence/data/contacts.csv")):
    e = clean_email(r["email"])
    if not e:
        continue
    registry_status(e, r["email_status"])
    g = a_gardens.get(r["garden_id"], {})
    add(estate_name=g.get("canonical_name", r["company_name"]), state="Assam", region="Assam",
        district=g.get("district", ""), company=r["company_name"], scale=g.get("scale", ""),
        contact_name=r["contact_name"], contact_role=r["title"], email=e,
        src="assam-intelligence/data/contacts.csv", tier="", blf=False, status="registry",
        disq=g.get("exclusion_reason", ""), account_id=r["garden_id"],
        notes=f"registry email_status {r['email_status']}")

d_gardens = {g["garden_id"]: g for g in read(os.path.join(MO, "dooars-intelligence/data/gardens.csv"))}
d_companies = {c["company_id"]: c for c in read(os.path.join(MO, "dooars-intelligence/data/companies.csv"))}
dooars_contacts = {}
for f in ["dooars-intelligence/data/contacts.csv", "dooars-intelligence/manual/contacts.csv"]:
    for r in read(os.path.join(MO, f)):
        dooars_contacts[r["contact_id"]] = (f, r)
for f, r in dooars_contacts.values():
    e = clean_email(r["business_email"])
    if not e:
        continue
    g = d_gardens.get(r["garden_id"], {})
    c = d_companies.get(r["company_id"], {})
    cname = c.get("company_name") or c.get("name") or r["company_id"]
    excl = " ".join(str(v) for k, v in c.items() if "exclu" in k or "public" in k or "listed" in k)
    add(estate_name=g.get("canonical_name") or r["name"], state="West Bengal", region="Dooars",
        district=g.get("district_current", ""), company=cname, scale=g.get("tea_area_ha") or g.get("historical_area_ha", ""),
        contact_name=r["name"], contact_role=r["title"], email=e, src=f, tier="", blf=False, status="registry",
        disq=f"{g.get('exclusion_reason', '')} {excl} {r['notes']}", account_id=r["garden_id"] or r["contact_id"],
        notes=f"suppressed={r['suppressed']}" if r["suppressed"].strip().lower() == "yes" else "")

for r in read(os.path.join(MO, "dooars-intelligence/data/siliguri_dooars_estates.csv")):
    if r["contact_email"].strip():
        dist = r["district_current"].strip()
        add(estate_name=r["canonical_name"], state="West Bengal", region=NB_DISTRICT_REGION.get(dist.lower(), "Dooars"),
            district=dist, company=r["company_name"], scale=r["tea_area_ha"], contact_name=r["contact_person"],
            contact_role="", email=r["contact_email"], src="dooars-intelligence/data/siliguri_dooars_estates.csv",
            tier="", blf=False, status="registry", disq=f"{r['exclusion_reason']} {r['prospect_eligibility']}",
            account_id=r["garden_id"], notes="")

# ---------- reopening gardens ----------
reopening = {}
for r in read(os.path.join(MO, "north-bengal-intelligence/reopening/reopening_gardens.csv")):
    if r["status"].strip() in ("reopened", "reopening_announced"):
        reopening[norm(r["garden_name"])] = r

# ---------- classify ----------
candidates, excluded, seen = [], [], {}


def exclude(name, email, reason, detail, src):
    excluded.append({"estate_name": name, "email_present": "yes" if email else "no", "reason": reason,
                     "detail": detail.strip()[:160], "source_file": src})


for r in raw:
    name, email, n = r["estate_name"], r["email"], norm(r["estate_name"])
    src = r["src"]
    key = (n, email)
    if key in seen:
        prev = seen[key]
        if src not in prev["email_source_file"]:
            prev["email_source_file"] += "|" + src
        if not prev["contact_role"] and r["contact_role"]:
            prev["contact_role"] = r["contact_role"]
        if not prev["account_id"] and r["account_id"]:
            prev["account_id"] = r["account_id"]
        continue
    if not email:
        exclude(name, email, "no_email", "no usable email in source", src)
        continue
    if is_client(n, r["company"]):
        exclude(name, email, "client", "matches current client list", src)
        seen[key] = {"email_source_file": src, "contact_role": "", "account_id": ""}
        continue
    if email in contacted_emails or r["account_id"] in contacted_ids or n in contacted_names:
        exclude(name, email, "already_contacted", "in Sept Snov import or campaign batch", src)
        seen[key] = {"email_source_file": src, "contact_role": "", "account_id": ""}
        continue
    why, detail = blocked_reason(n)
    if why in ("negotiation", "rejected", "client"):
        exclude(name, email, why, detail, src)
        seen[key] = {"email_source_file": src, "contact_role": "", "account_id": ""}
        continue
    v = validation.get(email, ("not_checked", "", ""))
    if v[0] == "invalid":
        exclude(name, email, "invalid_email", v[2], src)
        seen[key] = {"email_source_file": src, "contact_role": "", "account_id": ""}
        continue
    corp = corporate_hit(r["company"], r["disq"], name)
    disq = (r["disq"] or "").lower()
    if (why == "corporate" or corp or "public limited" in disq or "conglomerate" in disq
            or "multi-garden" in disq or "acreage too large" in disq or "public company" in disq):
        exclude(name, email, "corporate", detail or corp or r["disq"], src)
        seen[key] = {"email_source_file": src, "contact_role": "", "account_id": ""}
        continue
    if r["status"] in ("Disqualified", "Uncertain / Backlog"):
        exclude(name, email, "not_qualified", f"{r['status']}: {r['disq']}", src)
        seen[key] = {"email_source_file": src, "contact_role": "", "account_id": ""}
        continue
    if "suppressed=yes" in r["notes"]:
        exclude(name, email, "rejected", "suppressed in registry", src)
        seen[key] = {"email_source_file": src, "contact_role": "", "account_id": ""}
        continue

    notes = [r["notes"]] if r["notes"] else []
    if v[2]:
        notes.append(v[2])
    public_flag = is_public_ltd(r["company"])
    if public_flag:
        notes.append("company name ends Ltd without Pvt - confirm not a public company")
    if detail and why:
        notes.append(detail)
    if r["state"] == "West Bengal":
        if n in reopening:
            seg = "nb_reopening"
            notes.append(f"reopening garden ({reopening[n]['status']} as of {reopening[n]['status_as_of']})")
        else:
            seg = "nb_blf" if r["blf"] else "nb_independent"
    else:
        seg = "assam_blf" if r["blf"] else "assam_independent"
    has_person = bool(r["contact_name"].strip() or r["contact_role"].strip())
    send_ready = "yes" if (v[0] in ("safe_deliverable", "snov_valid") and has_person and not public_flag) else "no"
    row = {
        "account_id": r["account_id"] or f"gs-exp26-{slug(name)}",
        "estate_name": name, "state": r["state"], "region": r["region"], "district": r["district"],
        "company": r["company"], "hectares_or_scale": r["scale"], "contact_name": r["contact_name"],
        "contact_role": r["contact_role"], "email": email, "email_source_file": src,
        "validation_status": v[0], "validation_date": v[1], "segment": seg,
        "tier_or_score_if_present": r["tier"], "send_ready": send_ready, "notes": "; ".join(notes),
    }
    seen[key] = row
    candidates.append(row)

# Same estate with several emails: keep all rows but note it so only one is used for the first sequence.
by_estate = Counter(norm(c["estate_name"]) for c in candidates)
for c in candidates:
    if by_estate[norm(c["estate_name"])] > 1:
        c["notes"] = (c["notes"] + "; " if c["notes"] else "") + "estate has more than one email - use one contact only"

# Collapse duplicate exclusion rows per estate+reason.
ex_seen, ex_out = set(), []
for e in excluded:
    k = (norm(e["estate_name"]), e["reason"])
    if k not in ex_seen:
        ex_seen.add(k)
        ex_out.append(e)

# Validated emails with no estate association in any source file. Try a name
# hint from the Assam garden registry and the locked golden list, but the
# owner must confirm the estate before any use.
estate_names = set()
for g in read(os.path.join(MO, "assam-intelligence/data/gardens.csv")):
    estate_names.add(g["canonical_name"])
try:
    import openpyxl

    gwb = openpyxl.load_workbook(os.path.join(PILOT, "locked", "Contacts Verified Golden List.xlsx"),
                                 read_only=True, data_only=True)
    for row in list(gwb["Sheet1"].iter_rows(values_only=True))[2:]:
        if row and row[1]:
            estate_names.add(str(row[1]))
except Exception:
    pass
cores = {}
for nm in estate_names:
    words = norm(nm).split()
    if words and len(words[0]) >= 5:
        cores.setdefault(words[0], nm)

mapped = {c["email"] for c in candidates} | contacted_emails
unmapped = []
for r in read(os.path.join(PILOT, "novel_golden_list_emails.csv")):
    e = clean_email(r["email"])
    if not e or e in mapped:
        continue
    v = validation.get(e, ("not_checked", "", ""))
    blob = re.sub(r"[^a-z]", "", e)
    corp = corporate_hit(e)
    hint = next((nm for c0, nm in cores.items() if len(c0) >= 6 and c0 in blob), "")
    note = "no estate association found in repo sources - map to an estate before use"
    if hint:
        note = f"possible estate match by email text: {hint} - confirm before use"
    if corp:
        note = f"corporate domain ({corp}) - do not use; kept for record only"
    unmapped.append({"email": e, "validation_status": v[0], "validation_date": v[1], "note": note})

seg_order = ["nb_independent", "nb_blf", "nb_reopening", "assam_independent", "assam_blf"]
candidates.sort(key=lambda c: (seg_order.index(c["segment"]), c["send_ready"] != "yes", c["estate_name"]))


def write(name, rows, fields):
    with open(os.path.join(OUT, name), "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        w.writerows(rows)


write("candidates.csv", candidates, list(candidates[0].keys()))
write("needs_validation.csv",
      [{"estate_name": c["estate_name"], "email": c["email"], "account_id": c["account_id"]}
       for c in candidates if c["validation_status"] in ("not_checked", "unknown", "risky")],
      ["estate_name", "email", "account_id"])
write("excluded.csv", ex_out, ["estate_name", "email_present", "reason", "detail", "source_file"])
write("already_contacted.csv", [e for e in ex_out if e["reason"] == "already_contacted"],
      ["estate_name", "email_present", "reason", "detail", "source_file"])
write("unmapped_validated_emails.csv", unmapped, ["email", "validation_status", "validation_date", "note"])

print("candidates", len(candidates), Counter(c["segment"] for c in candidates))
print("send_ready", Counter((c["segment"], c["send_ready"]) for c in candidates))
print("validation", Counter(c["validation_status"] for c in candidates))
print("excluded", Counter(e["reason"] for e in ex_out))
print("unmapped", len(unmapped), Counter(u["validation_status"] for u in unmapped))
print(crm_note, "crm blocked names", len(crm_blocked))
