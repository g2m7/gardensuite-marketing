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
node --test scripts/outreach/dooars/dooars_lib.test.mjs
```

`collect` downloads public sources into `.artifacts/dooars-intelligence/`, records hashes, and converts PDFs to text. Direct HTTP is used first. Playwright with the locally installed Chrome is a fallback for JavaScript-rendered public pages. A broken optional source is recorded as failed in the manifest and does not stop the other sources.

`build` parses official sources, generates aliases, links historical company clues, applies reviewed manual evidence and writes the CSV outputs.

`ingest-news` reads `imports/news_urls.csv`, downloads each public article, extracts metadata and matching garden aliases, and writes `imports/news_candidates.csv`. Review candidates before moving facts into `manual/evidence.csv`.

`check` validates identifiers, relationships, source lineage and active-status rules.

## Current snapshot

The first build contains 168 garden identity records, 893 aliases, 135 companies and 211 garden-company links. The active research export currently contains 19 confirmed-active and 7 likely-active estates. Six estates are held out as temporarily closed. There are five current public company contacts and 152 historical contact hints, but old hints are not promoted to current contacts without a new check.

The number 168 is a coverage pool, not a final count of distinct active estates. It combines the 128-name atlas with unmatched Dooars records from the Tea Board directory and one newer official record. Possible spelling duplicates stay visible in the review queue until resolved.

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

## Outreach boundary

This project performs research only. It does not send email, import contacts into Snov.io or activate a campaign. All current-client, active-sales, suppression, email-verification and owner-approval gates still apply.
