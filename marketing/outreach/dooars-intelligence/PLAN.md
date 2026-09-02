# Active Dooars Estate Intelligence Plan

Status: VERSION 1 BUILT - CURRENT COVERAGE EXPANSION IN PROGRESS
Owner: Sarbani Associates
Scope: Active established tea estates in the Dooars region

## Objective

Build a dated, evidence-backed registry that connects:

`garden and aliases -> active status -> current owner or operator -> company -> decision-maker -> verified business contact`

The registry supports research. It does not send messages or approve contacts for outreach.

## Definition of coverage

The working population is established Dooars tea estates, not every small tea grower plot. The geographic seed is the union of the Tea GIS atlas, Tea Board directory, registered-planter notice and reviewed newer evidence. Every record keeps its source spelling and source date. Directory-only records stay in identity review because some may be spelling duplicates.

An estate is included in the active-prospect export only when recent evidence makes it `likely_active` or a direct current source or contact makes it `active_confirmed`. Historical directory presence alone never proves current operation.

## Confidence target

The system is designed to produce a useful research pool, not a false promise of complete certainty. Contact with the estate or current company remains the final confirmation. The expected operating target is a high-quality majority with uncertain records clearly separated for review.

## Phases

### 1. Official-source seed - built

- Extract the 128 garden names in the 2015 Tea Garden Atlas.
- Extract Tea Board directory rows for Dooars subdivisions.
- Cross-check registration numbers against the registered-planter notice.
- Preserve all source spellings as aliases.

### 2. Entity resolution - built, manual review continues

- Normalize case, punctuation and tea-estate suffixes.
- Generate safe search aliases such as `Tea Estate`, `Tea Garden`, `T.E.` and `T.G.` variants.
- Compare names with token and edit similarity.
- Use registration number, subdivision, address and company as stronger match evidence.
- Put ambiguous matches in a review queue. Never merge on fuzzy name alone.

### 3. Activity and ownership evidence - pipeline built, coverage expanding

- Ingest public news URLs and current company or government pages.
- Classify events such as acquisition, lease, reopening, closure, restart and management change.
- Keep ownership as a dated relationship, not a single permanent field.
- Require a current source before marking an historical owner as current.

### 4. Company and contact enrichment - pipeline built, coverage expanding

- Resolve the legal company and parent group.
- Record CIN, company status, registered office, website and domain where publicly verified.
- Mark public companies and large multi-estate groups as research-only, not target accounts.
- Target owner, director, managing director, general manager, estate manager and garden manager roles.
- Keep only public business contacts with source URL and verification date.
- Treat Snov `Valid`, suppression clearance and owner approval as separate downstream gates.

### 5. Quality control - built

- Generate active, unresolved, ownership-review and duplicate-review exports.
- Keep every material claim traceable to a source.
- Re-run collection without destroying manual decisions.
- Contact remains the final active-status and relationship confirmation.

## Source priority

1. Current Tea Board, government or company evidence
2. Two independent recent news or industry sources
3. One credible recent news source
4. Historical Tea Board and atlas evidence
5. Search snippets, maps and unverified directories as discovery clues only

## Guardrails

- No CAPTCHA, login, paywall or bot-protection bypass.
- No bulk scraping of Google Maps or LinkedIn.
- Collect public government pages slowly and retain retrieval dates and hashes.
- Do not promote an email to send-ready without external verification and suppression checks.
- Do not infer that a closed garden, historical owner or old phone number is current.
- Do not treat a current active garden as an outreach target when it is an existing client or belongs to an excluded large group.

## Version 1 snapshot

Built on 2 September 2026:

- 163 garden identity records from the union of official and reviewed sources
- 880 aliases and spelling variants
- 139 company records and 223 dated garden-company links
- 11 outreach-eligible active estates after client and large-group exclusions
- 38 confirmed-active and 8 likely-active records before eligibility filtering
- 6 estates held out as temporarily closed pending a newer check
- 151 historical contact hints preserved for reverification
- 147 open review items, mainly identity matching and missing current evidence

These are working research counts, not a claim that Dooars has exactly 163 distinct active estates. Duplicate resolution and current-status research remain deliberate parts of the process.
