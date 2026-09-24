# Paid media plan

Dated: 2026-09-24
Owner: Paid media owner, with campaign, web, sales, product and finance owners
Status: Planning only. No account, campaign, upload or spend action is authorized by this file.

## Workstream control

| Deliverable | Owner role | Due | Dependency | Acceptance evidence |
| --- | --- | --- | --- | --- |
| Economics and budget worksheet | GardenSuite owner with finance, product and implementation owners | Before any paid account write | Continuation pricing, margin, delivery cost, CAC and test-loss inputs | Signed worksheet with total and per-channel caps marked TBD until approved |
| Local campaign, keyword, negative and creative specifications | Paid media owner | 2026-10-02 17:00 IST | Approved assets and landing pages | Local specification files with no platform IDs or account writes |
| End-to-end tracking and spend-control QA | Web, CRM, sales and paid owners | 2026-10-04 17:00 IST | Non-production synthetic event test and account-control decision | QA and reconciliation report |
| Paid go/no-go | GardenSuite owner | Proposed earliest checkpoint 2026-10-05 | Economics approval, direct funnel QA, permission for live account writes and explicit activation approval | Campaign IDs created only after approval, approved caps and approval time |

## Paid objective

Use paid media to find tea estate owners and senior managers who need face attendance and a clearer hazira review path. Send each campaign to a relevant campaign landing page. Measure verified estates, completed demos, accepted trials and paid continuations, not cheap form fills.

The campaign is Puja 2026. Keep Meta prospecting, Google Search intent and GardenSuite-site retargeting in separate campaign groups so their spend, terms and outcomes remain clear.

## Activation prerequisites

The 2026-10-05 earliest date is a proposed planning checkpoint, not current owner authority. Paid setup or spend requires all of the following:

- continuation pricing, gross margin, implementation and support cost per trial, maximum acceptable CAC and maximum test loss are documented;
- GardenSuite owner approves geography, total cap and per-channel caps after reviewing that economics worksheet;
- owner separately approves live account writes before any platform campaign, ad set, audience or draft is created;
- billing owner and backup are named;
- ad account, Meta Business account, Google Ads account and required analytics properties are owned by Sarbani Associates or an approved agency;
- two-factor authentication and least-privilege access are active;
- current platform roles, billing, tax and payment method are verified;
- landing page, form, acknowledgement, failure path, CRM and UTM events pass end-to-end QA;
- conversion action is tested first in a non-production destination with a clearly synthetic request; any production-destination exception requires the written controls in the website plan;
- sales owner accepts the lead route and response SLA;
- approved creative, captions, landing copy and negative keywords are versioned;
- account spend limits or an equivalent owner-approved control are set;
- stop and rollback owner is named and can pause campaigns on the same day.

Do not claim access is ready because a login exists. Record the account ID, role, test result and date in the private launch checklist only after live-account inspection is approved.

## Budget decision: TBD

No total or per-channel paid cap is recommended by this plan. The owner must first document:

- paid continuation price and package scope;
- gross margin for the continuation package;
- implementation, setup, training and support cost per trial;
- sales and acquisition labour cost;
- maximum acceptable customer acquisition cost;
- maximum acceptable test loss;
- the resulting total and per-channel caps;
- billing owner and explicit approval.

| Budget field | Current value | Required evidence |
| --- | --- | --- |
| Paid continuation price | TBD | Approved price and package scope |
| Gross margin | TBD | Costed package worksheet |
| Implementation and support cost per trial | TBD | Delivery time and cost record |
| Maximum acceptable CAC | TBD | Owner-approved contribution and payback rule |
| Maximum test loss | TBD | Owner-approved risk limit |
| Meta cap | TBD | Owner allocation after economics review |
| Google Search cap | TBD | Owner allocation after economics review |
| Retargeting cap | TBD | Owner allocation after audience and economics review |
| Total cap | TBD | Owner-approved sum and hard account control |

Until these fields and the owner approval are documented, paid platform setup, activation and spend are blocked. Local specifications may continue without platform writes or IDs.

## Candidate geography

Prepare two separate cells. The owner selects or rejects each one:

| Cell | Candidate area | Audience assumption | Decision needed |
| --- | --- | --- | --- |
| `NB` | North Bengal supported tea areas, including Dooars, Terai, Darjeeling, Coochbehar, Uttar Dinajpur and Jalpaiguri as appropriate to the current product list | Estate owners and senior managers connected to tea operations in the region | Approve exact district or radius, exclusions and budget |
| `ASM` | Dibrugarh and Tinsukia districts | Existing pilot geography and likely owner interest | Approve exact cells, exclusions and budget |

The paid audience is a hypothesis. An owner's residence may differ from the estate location. Qualification asks for the estate location, and paid results are not a reason to add an estate to cold outreach.

Exclude current clients, active sales discussions, explicit rejections and suppressed accounts from any custom audience. A DNC decision overrides every channel. Do not use private phone lists or scraped contacts as an ad audience without the required permission and review.

## Campaign separation

| Campaign group | Objective | Landing path | Audience | Budget control |
| --- | --- | --- | --- | --- |
| `META_PUJA26_OWNER_PROB` | Qualified site enquiry or approved lead form | Puja trial page | Broad tea-region interest and approved first-party signals; no group-member claim | Meta cap and daily review |
| `META_PUJA26_WORKFLOW` | Qualified site enquiry | Puja trial page | Approved video viewers, page visitors or engagement signals where eligible | Separate cap so weak creative is visible |
| `SEARCH_PUJA26_FACE_ATT` | Search enquiry | Face-attendance campaign page | Exact and phrase keyword groups | Google cap and search-term review |
| `SEARCH_PUJA26_TEA_GARDEN` | Search enquiry | Relevant existing or new attendance page | Tea garden attendance and field-system terms | Separate budget and landing copy |
| `RETARGET_PUJA26_SITE` | Return visit or trial request | Puja trial page | GardenSuite first-party site visitors and engagers, subject to consent and minimum audience checks | TBD cap, no custom contact upload by default |

Do not use a page-view event as the campaign goal. Test the selected qualified conversion action only after it fires correctly and joins to the CRM. A native Meta form may be tested later with the same qualification questions, but it is not required for launch.

## Audience rules

- Define the audience from current platform controls, not an old screenshot or a claim that a third-party group's members can be directly selected.
- Separate tea interest, tea-region location and GardenSuite first-party signals.
- Exclude recent trial-requesters, current clients, DNC records and unsupported locations.
- Do not upload a workbook, phone list or scraped contact file.
- Do not use sensitive worker or visitor categories.
- Record audience definition, platform source, size, eligibility, exclusions and review date.
- If retargeting audience size or consent is not suitable, keep the retargeting budget at zero and record the reason.

Organic group participation remains separate. Read group rules, contribute useful information and do not copy a paid ad into a group as if members were a selected audience.

## Creative matrix

Use the asset IDs in [the video and creative plan](03-video-and-creative.md). No matrix row is approved until its asset register checks pass.

| Segment | Problem or stage | Creative | Landing section | Primary text direction | Proof check |
| --- | --- | --- | --- | --- | --- |
| Owner | Hazira identity and office visibility | `VID15-01` | Hero and how-it-works | `GS Face helps stop proxy attendance.` | No absolute result |
| Owner | Field and office workflow | `VID15-02` | How it works | Capture in the field, sync later, review in the office | Current product build and device test |
| Owner | Support and local ownership | `VID15-03` | Trust and ownership | `Setup, training and support from Sarbani Associates.` | Company and service wording |
| Search visitor | Intent to compare face attendance | `VID60-01` or approved still | Relevant face-attendance page | Practical trial invitation with scope link | Keyword-to-page match |
| Site returner | Offer and trial boundary | `VID15-02` plus offer card | Trial section | `30 days from the agreed activation date.` | Offer version match |
| Optional module | Smart weighing | Approved still from repository | Optional module | Ask about weighing separately | Keep outside trial unless approved |
| Conditional module | Daily MIS | Approved still or verified report view | Package boundary | Include only after exact reports and inputs are technically confirmed | Do not imply current trial inclusion |

Test no more than two meaningful creative variants at first. Do not change the offer, audience, landing page and creative in one step without recording the change.

## Google Search plan

### Keyword groups

Use current keyword-planner evidence before activation. Candidate phrases are hypotheses, not claimed volume:

- `face attendance for tea gardens`
- `tea garden face attendance`
- `tea garden biometric attendance`
- `tea garden attendance software`
- `tea garden attendance system`
- `face attendance software for workers`
- `biometric attendance for tea estate`
- `tea garden hazira software`
- `hazira attendance app`
- `tea garden office attendance software`

Keep exact and phrase groups separate at first. Avoid broad generic attendance terms until query quality and economics support them. Do not add a keyword merely because the platform reports a high bid.

### Negative keyword starter list

Review search terms weekly. Initial negatives should include irrelevant or low-intent themes:

- `free download`
- `tutorial`
- `course`
- `jobs`
- `job vacancy`
- `tea powder`
- `tea shop`
- `buy tea`
- `tea tourism`
- `tea garden visit`
- `near me` unless a local service decision is made
- `open source`
- `source code`
- `github`
- `template`
- `excel`
- `school`
- `office attendance only` unless that is a confirmed campaign segment

Do not add a negative from one isolated query without reviewing the whole search-term report. Record each change and date.

### Ad copy guardrails

- Proposed campaign CTA: `Request Puja Trial`, pending approval.
- Preserve current actions: `Book Free Demo` and `Email Us`.
- Use `helps stop proxy attendance`.
- State the proposed trial boundary and 30-day start point.
- Do not show a price not approved for the trial.
- Do not use a generic ERP promise, fake rating, fixed saving, fixed result or unsupported offline claim.

## Meta plan

Use the approved 9:16, 1:1 and 16:9 cuts with captions. Start with owner problem and field-to-office workflow. Keep trust and trial boundary visible in the first frame or landing page. Use broad and interest-based tests only where current platform controls are documented. Do not describe a Facebook group audience as directly selectable.

If a native Instant Form is tested, use the same estate, role, contact and privacy fields as the website. Do not collect worker faces or identity documents. The form must have a tested failure route, acknowledgement and CRM mapping before it receives spend.

## Retargeting plan

Retargeting is optional. Use only first-party signals from GardenSuite properties that are allowed by the approved privacy and consent process. Keep visitors, engagers and form-start signals separate. Do not retarget a person who has opted out or whose DNC status is known. Do not assume a small audience is targetable or upload contacts.

Retargeting starts only if the audience size, consent, event quality, frequency cap and economics pass review. Its cap remains TBD until the owner approves the budget worksheet.

## Daily checks during spend

Run on each active spending day, Monday to Saturday unless the owner approves another schedule:

1. Confirm account spend and budget caps against the owner-approved total and per-channel limits.
2. Check disapprovals, broken URLs, form errors, acknowledgement failures, duplicate account joins and platform warnings.
3. Review new search terms and reject irrelevant or sensitive queries.
4. Review spend, clicks, submissions, verified estates, demos and accepted trials by campaign and asset.
5. Check geography and audience delivery. An estate enquiry outside the paid cell is recorded for service fit but not used to widen targeting automatically.
6. Check comments and messages for privacy, claim, consent or stop requests. Apply suppression immediately.
7. Check the sales queue, response owner and acknowledgement delivery.
8. Record stop or continue decision in the [campaign scorecard](templates/campaign-scorecard.csv).

## Weekly checks

Every Monday or the next working day:

- compare spend, verified estates, qualified demos, trials and paid continuations by campaign and asset;
- review search terms, negative changes and landing-page path;
- review creative thumb-stop, completion and click quality using actual platform data;
- check the ten-submission lead-quality threshold below;
- check spend pacing against the approved cap and remaining weeks;
- check implementation capacity and the maximum active-trial count;
- review support hours, privacy events, DNC and duplicate leads;
- decide keep, reduce, pause, replace or test for each campaign group;
- update [DECISIONS.md](DECISIONS.md) when a decision changes.

## Lead-quality threshold

Use the existing owner-acquisition diagnostic, not an industry benchmark:

- Review the first ten submitted leads from a paid cell.
- A lead counts as genuine and in scope only when the estate can be identified, the contact has a relevant role or relationship, and the attendance need is plausible and serviceable.
- If fewer than three of the first ten are genuine and in scope, pause that cell and review the audience, query, creative, page and form.
- A small sample is inconclusive. Do not call a cell a winner or loser without showing the raw count and denominator.
- Keep paid form fills, verified estate enquiries, qualified demos, accepted trials and paid continuations separate.

## Pause and stop rules

Pause the affected campaign or ad set immediately for:

- spend above the owner-approved account cap or an unexplained delivery spike;
- a broken form, lost acknowledgement, missing CRM record or duplicate without an account join;
- a DNC, complaint, sensitive data, worker face or unapproved client record in an ad, form or analytics event;
- a misleading creative, unverified technical claim or product version mismatch;
- a platform policy, account, billing or security warning;
- a search term that reveals a materially irrelevant or unsafe audience;
- a sales or implementation owner unable to respond within the approved SLA;
- active trials exceeding the confirmed capacity;
- a request to broaden cold outreach or use a private list.

Pause the whole paid account for a data breach, unapproved spend, repeated suppression failure or an account-security warning. The paid owner records the campaign ID, time, reason, spend to date, action and restart evidence. Restart requires a fresh QA record and named approval.

## Acceptance criteria

- [ ] Owner selects or rejects `NB` and `ASM` cells in writing.
- [ ] Continuation pricing, gross margin, implementation and support cost per trial, maximum acceptable CAC and maximum test loss are documented.
- [ ] Owner sets and approves TBD total and per-channel caps after reviewing the economics worksheet.
- [ ] Billing owner, paid owner, backup and stop owner are named.
- [ ] Meta, Google and analytics account access, two-factor authentication and roles are tested.
- [ ] Campaigns remain separate by channel, audience, creative and landing path.
- [ ] Keyword and negative-keyword drafts are based on current account evidence.
- [ ] Tracking QA passes in a non-production destination before the proposed 2026-10-05 checkpoint and after any page or form change.
- [ ] Creative matrix links only approved asset IDs.
- [ ] Daily and weekly check owners and scorecard fields are assigned.
- [ ] The first-ten-submission lead-quality rule is ready.
- [ ] Owner separately approves live account writes before any platform campaign, ad set, audience or draft is created.
- [ ] Budget, stop, suppression and rollback controls are tested.
- [ ] No third-party group membership is described as a directly selected paid audience.

No external activation is accepted as complete until the launch checklist has a named owner, timestamp, campaign ID, actual settings, maximum spend and evidence path.
