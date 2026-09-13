# Dooars Estate Intelligence

This is the long-term GardenSuite registry for established tea estates in the Dooars region. It is separate from the September 2026 Dibrugarh and Tinsukia pilot.

## What it produces

- `data/gardens.csv` - canonical and provisional garden identity records
- `data/garden_aliases.csv` - source and generated spelling variants
- `data/companies.csv` - legal and historical company clues
- `data/garden_company_links.csv` - dated owner and operator relationships
- `data/evidence.csv` - activity, ownership and contact evidence
- `data/contacts.csv` - public business contacts and verification state
- `data/review_queue.csv` - unresolved matches and missing checks
- `data/active_estates.csv` - only likely-active or confirmed-active estates
- `data/active_estates.csv` also excludes current clients and large public or multi-estate groups
- `data/siliguri_dooars_estates.csv` - Dooars estates mapped to verified Siliguri offices (address, city, phones, emails, contact persons)
- `data/search_queries.csv` - garden and ownership-news query plan
- `data/build_report.json` - coverage and quality counts
- `imports/historical_contact_hints.csv` - old Tea Board contact clues that require reverification


Generated files may be rebuilt. Manual decisions belong in `manual/` and are applied during every build.

## Commands

```sh
node scripts/outreach/dooars/dooars_intelligence.mjs collect
node scripts/outreach/dooars/dooars_intelligence.mjs build
node scripts/outreach/dooars/dooars_intelligence.mjs ingest-news
node scripts/outreach/dooars/dooars_intelligence.mjs check
node scripts/outreach/dooars/contact_crawler.mjs crawl
node --test scripts/outreach/dooars/dooars_lib.test.mjs
node --test scripts/outreach/dooars/contact_crawler.test.mjs
```

`collect` downloads public sources into `.artifacts/dooars-intelligence/`, records hashes, and converts PDFs to text. Direct HTTP is used first. Playwright with the locally installed Chrome is a fallback for JavaScript-rendered public pages. A broken optional source is recorded as failed in the manifest and does not stop the other sources. Sources with `kind: "manual"` are not fetched. Their import file is read from `imports/` and recorded as `awaiting_import` until it is present.

`build` parses official sources, generates aliases, links historical company clues, applies reviewed manual evidence and writes the CSV outputs.

`ingest-news` reads `imports/news_urls.csv`, downloads each public article, extracts metadata and matching garden aliases, and writes `imports/news_candidates.csv`. Review candidates before moving facts into `manual/evidence.csv`.

`check` validates identifiers, relationships, source lineage and active-status rules.

## Current snapshot

The registry contains 163 garden identity records, 880 aliases, 142 companies and 223 garden-company links. There are 38 confirmed-active and 8 likely-active records before exclusions. Six estates are held out as temporarily closed. After eligibility filtering (excluding current clients and large conglomerates), `active_estates.csv` contains 8 target candidates. Furthermore, 26 Dooars estates have been mapped to physical offices in Siliguri (`data/siliguri_dooars_estates.csv`), capturing office address, local contact phone, and email.

The number 163 is a coverage pool, not a final count of distinct active estates. It combines the 128-name atlas with unmatched Dooars records from the Tea Board directory and newer reviewed records. Possible spelling duplicates stay visible in the review queue until resolved.

## Prospect eligibility filter

The registry and the prospect list are intentionally different. Every garden can remain in `gardens.csv` for coverage and ownership research, while `active_estates.csv` is limited to `target_candidate` records. A garden is excluded when it is a current GardenSuite client, or when its current company is marked public or belongs to a configured large group such as Amalgamated Plantations (APPL / Tata), Camellia Plc, Government of India, or Williamson Magor Group. The exclusion reason is written into `gardens.csv` so the decision is visible and reversible.


## Status meaning

- `active_confirmed` - directly confirmed by a current official/company source or recorded contact
- `likely_active` - supported by recent reliable operating evidence
- `temporarily_closed` - recent evidence says operations are paused
- `closed` - recent reliable evidence says the estate is closed
- `unknown` - historical evidence only or conflicting evidence

Historical Tea Board records do not make an estate active and do not make an old company the current owner.

## Review loop

1. Run `collect`, then inspect `.artifacts/dooars-intelligence/manifest.json` for failed or changed sources.
2. Run `build` to refresh the registry without losing anything under `manual/`.
3. Add useful local-news URLs to `imports/news_urls.csv` and run `ingest-news`.
4. Review `imports/news_candidates.csv`. Copy only checked facts into `manual/evidence.csv`.
5. Work the `identity_resolution`, `activity_evidence` and ownership items in `data/review_queue.csv`.
6. Reverify useful rows from `imports/historical_contact_hints.csv`. Put only current public business contacts in `manual/contacts.csv`.
7. Run `check`. Contact the estate or company to make the final confirmation before outreach approval.

## News workflow

Add public article URLs to `imports/news_urls.csv`, run `ingest-news`, and review the matches. Ownership-change reporting is valuable, but the named person in an article is not automatically the buyer. Confirm their present company role before adding a contact.

## MCA master data workflow

The MCA21 master data portal holds the legal record for every Indian company: CIN, legal status, registered office and directors. For a Dooars garden, the owning company's MCA record is the strongest evidence for ownership, Siliguri office address and whether the company is still active.

The portal is form-based and must not be scripted. The workflow is manual or provider-based:

1. Look up each Dooars tea company on the MCA master data portal, or buy the same fields from a licensed provider such as Tofler or Instafinancials.
2. Save the result as `imports/mca-company-master.csv`. Use `imports/mca-company-master.template.csv` as the format guide. Column spellings from common MCA and provider exports are accepted, and tab separated files also work.
3. Run `collect` and then `build`. A near-exact name match fills `cin`, `registered_office` and `company_status` in `data/companies.csv`. An MCA status that is not active raises a review queue item. Unmatched tea-company names land in the review queue as `mca_unmatched_company` for manual research.
4. Never guess a company or garden link from MCA data. The review queue exists for that decision.

## Contact page crawler

The crawler (`scripts/outreach/dooars/contact_crawler.mjs`) visits the public homepage of a confirmed company domain and up to four contact or about pages linked from it. It is not a general web scraper:

- Targets come from a prepared `imports/contact_crawl_targets.csv` with `company_id`, `company_name` and `domain`. Only domains already tied to a registry company or reviewed manually belong in the file.
- `robots.txt` is fetched first and respected. The user agent identifies itself. There is a small page budget per domain and a 1.5 second delay between requests.
- No logins, forms or paywall content. Public business contact pages only.
- Output is `imports/contact_crawl_hints.csv`. Every row is marked `do_not_use_without_reverification: yes` and enters the same verification pipeline as any other contact clue. Copy only confirmed public business contacts into `manual/contacts.csv`.

## Owner and HQ workflow (the repeatable tactic)

The standing tactic for building the Siliguri prospect pool. Run it in this order:

1. **Garden to owner.** Run `node scripts/outreach/dooars/owner_hq_maps.mjs`. It reads the registry, resolves each garden's owner company from reviewed evidence, and rejects corporate owners (public companies and large groups). Assam gardens are omitted. Current clients are skipped.
2. **HQ split.** The script writes three lists: `imports/owner_hq_map_siliguri.csv` (non-corp owners with a Siliguri HQ - the working prospect pool and scraping map), `imports/owner_hq_map_other.csv` (Kolkata and other HQ, plus corp rejections, kept for reference), and `imports/owner_hq_work_queue.csv` (missing owner or missing HQ).
3. **Resolve the work queue.** For each queue item, confirm the owner on the MCA master data portal or a licensed provider. Record the HQ in `manual/hq_overrides.csv` with a source URL. Owner leads found through search go into `imports/mca_lookup_checklist.csv` first and move to overrides only after MCA confirmation.
4. **Re-run the script.** Overrides flow into the maps. Siliguri-HQ owners with domains join `imports/contact_crawl_targets.csv` for the contact crawler.
5. **Find more gardens.** New Dooars gardens enter through the existing evidence pipeline (`collect`, `build`, news ingestion, RTI). Then repeat from step 1. A garden is only a prospect after it passes the corp rejection and lands in the Siliguri map.

Never send to a garden or owner directly from these maps. Contacts still pass the manual contacts review, email validation and every outreach gate.

## Outreach boundary

This project performs research only. It does not send email, import contacts into Snov.io or activate a campaign. All current-client, active-sales, suppression, email-verification and owner-approval gates still apply.
