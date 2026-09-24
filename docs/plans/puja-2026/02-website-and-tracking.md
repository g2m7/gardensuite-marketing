# Website and tracking specification

Dated: 2026-09-24
Owner: Web and tracking owner, with sales, privacy and product review
Status: Specification only. Do not implement or publish from this plan alone.

## Workstream control

| Deliverable | Owner role | Due | Dependency | Acceptance evidence |
| --- | --- | --- | --- | --- |
| Page and form specification | Web owner | 2026-09-27 17:00 IST | Offer, product truth and privacy draft | Reviewed specification |
| CRM and event mapping | Web, CRM and privacy owners | 2026-09-27 17:00 IST | Selected non-production test destination | Mapping and restricted access test |
| End-to-end QA | Web owner | 2026-09-29 17:00 IST | Implementation, privacy and creative inputs | QA report and failure-path log |
| Direct launch decision | Campaign owner | 2026-09-30 17:00 IST | All minimum gates | Signed launch checklist |

## Purpose

Give an estate owner a clear path to understand GS Face and request a proposed trial. `Request Puja Trial` is a campaign CTA proposal pending approval. Keep the current `Book Free Demo` action and `Email Us` where repository rules require them. The page must separate a proposed trial from a paid full-ERP purchase.

Primary audience: tea estate owners, directors and senior managers. Secondary audience: field supervisors and office users who will operate the agreed workflow.

## Proposed page and section order

The page is a product conversion page, not a full ERP brochure. The final route, keyword and page authority follow the new-page checklist and the [SEO domination plan](../seo-pr-domination/README.md).

1. **Plain H1:** `Face attendance for tea gardens` or a technically approved variant. The H1 names the primary intent once.
2. **Hero and CTA:** Explain face-verified hazira, field capture, later sync and office review. Proposed campaign button: `Request Puja Trial`. Preserve current `Book Free Demo` and `Email Us` actions.
3. **Proposed offer window and boundary:** 1 October to 30 November 2026, with a proposed 30-day trial from the agreed activation date. Do not publish these terms until approved.
4. **How it works:** Worker face check, hazira record, field capture when connectivity is weak, later sync, office review. Mark each behavior only after product verification.
5. **What the proposed trial includes:** One division or worker group, up to 100 workers, one approved Android device, up to two users, remote setup, enrolment help, one training session, office review, one standard export and weekly review. List exclusions next to it.
6. **Who it fits:** Tea estate, division or worker group with an attendance problem and an owner or manager who can approve the workflow.
7. **Privacy and trial data:** No production face data in the marketing form. Explain the written data agreement, trial end choice, export, deletion and retention process after privacy approval.
8. **Package boundary:** The proposed core is GS Face plus office review. Include daily MIS only after its exact reports and inputs are technically confirmed. Smart weighing is optional. Full ERP is later expansion.
9. **Trust and ownership:** GardenSuite is built and supported by Sarbani Associates in Bagdogra, Siliguri. Use `Many estates keep software details private.` Show approved product history and local setup, training and support.
10. **FAQ:** Who can request, when the 30 days starts, what is free, what is excluded, offline/later sync, device and data needs, existing software, proof permission, support, data at day 30, no auto-renewal and no full ERP commitment.
11. **Final CTA and footer:** If approved, repeat `Request Puja Trial`; preserve `Book Free Demo` and `Email Us`; include Sarbani Associates.

## CTA and form fields

Use one primary form for the trial request. Keep the form short. Ask only what sales and implementation need to qualify and schedule a safe next step.

| Field | Type | Required | Use and privacy note |
| --- | --- | --- | --- |
| Estate or garden name | Text | Yes | Match to one estate account; do not infer a contact |
| Your name | Text | Yes | Sales reply owner; do not put in URL |
| Role | Select | Yes | Owner, director, general manager, estate/garden manager, supervisor, office or other |
| Work email or phone | Text | At least one | Separate permission choices; do not guess or pattern-fill |
| Region or district | Text | Yes | Helps service-fit review; it does not prove estate location |
| Worker group size | Select | Yes | Ranges or exact value agreed with implementation; no production worker list |
| Current attendance method | Select | No | Registers, card, other software, mixed or unknown; do not label a competitor |
| Android device available | Yes / No / Unknown | Yes | Implementation fit check |
| Best contact method | Email / WhatsApp / Phone | Yes | Does not itself grant promotional contact permission |
| Trial request message | Long text | No | Ask for the attendance problem and preferred next step; no sensitive data |
| Privacy notice acknowledgement | Checkbox | Yes | Links to the approved notice and records the notice version |
| Optional sales follow-up permission | Checkbox | No | Separate from the form submission; affirmative request only |

Do not ask for worker names, worker IDs, face images, identity documents, payroll or health data. Do not use a free-trial checkbox as permission for unrelated marketing. Keep separate records for email, WhatsApp and phone follow-up requests.

## Acknowledgement and failure path

### Pre-launch test boundary

All pre-launch form, acknowledgement, event and CRM tests must use a non-production destination with restricted access and clearly synthetic records. Do not create a prospect, contact the acknowledgement recipient or write a synthetic record into the production campaign tracker.

If a production destination is technically unavoidable, the campaign owner, web owner and privacy owner must approve the test in writing before it runs. The approval must name the destination, synthetic record, fields, start and deletion time, access list, rollback action and deletion evidence. The synthetic record must be excluded from campaign metrics and removed after the test. Without that approval and evidence, the test is blocked.

### Successful submission

The visitor sees a short confirmation with:

- the estate name entered, without exposing it in a shared URL;
- `We received your Puja trial request. A GardenSuite sales owner will contact you within the approved response time.`;
- what happens next: account-fit check, demo or technical conversation, written scope;
- links to `Book Free Demo`, `Email Us` and the privacy notice;
- a plain note that submitting a form does not start a trial or create a paid commitment.

Send an internal notification to the named sales owner and create or update the estate account in the approved CRM. A server acceptance is not proof of a delivered email. Check the acknowledgement path separately.

### Failure path

If storage, validation, acknowledgement or CRM routing fails:

- show a clear retry message and a safe `Email Us` fallback;
- do not claim that the request was received;
- log the failure category and timestamp in the private operations log;
- alert the web and sales owners;
- suppress duplicate form resubmission by a request ID, not by storing extra personal data;
- pause the affected CTA if failures continue or a lead could be lost.

A failed public form blocks paid traffic to that page. Do not send traffic to a form that cannot be reconciled to one estate account.

## UTM convention

Use lowercase ASCII values. Keep the convention stable across page, ads, email and organic posts.

```text
utm_source=meta|google|retargeting|referral|organic|direct
utm_medium=paid_social|paid_search|retargeting|referral|social|email|website
utm_campaign=puja2026_oct_nov
utm_content={asset_id}_{format}_{variant}
utm_term={approved_keyword_or_empty}
```

Examples:

```text
?utm_source=meta&utm_medium=paid_social&utm_campaign=puja2026_oct_nov&utm_content=vid15a_problem
?utm_source=google&utm_medium=paid_search&utm_campaign=puja2026_oct_nov&utm_term=tea_garden_face_attendance
```

Do not put names, phone numbers, worker IDs, face data, email addresses or free-text form values in UTMs. Preserve first source and later meaningful source in the private account record.

## Event taxonomy

Every event has an event time in IST or UTC with timezone, event ID, source parameters, anonymous or approved account join key, page path without PII and event version. Do not send form text or personal data to analytics.

| Event | Trigger | Required properties | Conversion use |
| --- | --- | --- | --- |
| `puja_page_view` | Campaign page loads | `page_path`, `offer_version`, `source` parameters | Reach and path check |
| `cta_click` | Any primary or secondary CTA | `cta_name`, `page_path`, `offer_version` | Intent, not a qualified lead |
| `trial_form_start` | First form interaction | `form_id`, `offer_version`, `source` | Funnel diagnosis |
| `trial_form_error` | Validation or technical error | `form_id`, `error_type`, no field values | Reliability and stop rule |
| `trial_form_submit` | Valid submission accepted by server | `request_id`, `form_id`, `offer_version`, no form values | Enquiry count before verification |
| `trial_ack_sent` | Acknowledgement provider accepts message | `request_id`, `ack_channel` | Acknowledgement QA |
| `demo_request` | Demo request accepted | `request_id`, `demo_type` | Qualified scheduling path |
| `referral_intro` | Permissioned introduction recorded | `referral_id`, `source` | Referral handover, no contact details in event |
| `organic_asset_view` | Approved content or video view | `asset_id`, `property`, `format` | Organic engagement |
| `paid_asset_click` | Paid ad click | `asset_id`, `campaign_id`, `cell_id` | Paid path check |
| `search_term_report` | Approved weekly report | `term`, `campaign_id`, `source` | Negative-keyword review, restricted access |
| `trial_activated` | Activation record signed | `trial_id`, `activation_date`, `offer_version` | Trial denominator |
| `trial_weekly_review` | Weekly review recorded | `trial_id`, `week`, `status` | Trial operations |
| `trial_closed` | Exit or paid decision | `trial_id`, `outcome`, `reason_code` | Campaign result |

Do not treat `cta_click`, `puja_page_view` or a paid form submit as a verified estate. The CRM owner verifies the account, role, source and fit.

## Account and CRM mapping

The private CRM or controlled workbook must contain:

- `estate_account_id`, canonical estate name, aliases, region and fit fields;
- `contact_id`, name, role, relationship evidence, contact point and verification date;
- `first_source`, latest meaningful source, campaign and asset ID;
- `request_id`, form status, acknowledgement status, stage, owner and next action;
- `offer_version`, trial ID, activation date, end date, scope, capacity status and close-out status;
- `permission_id`, purpose, notice version, affirmative action, source, timestamp and withdrawal;
- `suppression` status and reason;
- `support_hours`, open issue count and last weekly review;
- campaign scorecard fields from [campaign-scorecard.csv](templates/campaign-scorecard.csv).

A form submission creates or updates an account record. A duplicate submission joins to the same estate and is not counted twice. A role dropdown, ad click, valid number or generic tea interest does not verify an in-scope owner.

## Privacy and consent handling

- Link the form to the approved privacy notice and record its version.
- Separate the request to be contacted about this trial from optional future marketing permission.
- Do not pre-tick optional marketing, WhatsApp or phone permission.
- Explain retention and deletion in plain language, subject to the privacy owner's approved text.
- Do not collect worker biometric or identity data in the marketing path.
- Use a private CRM destination with role-based access, backup and deletion procedure.
- Keep prospect PII out of docs, URLs, screenshots, analytics, event payloads and support threads.
- Apply DNC and suppression before every send, including a re-import.

## SEO requirements for any new page

Before implementation, follow the full [AGENTS.md new-page checklist](../../../AGENTS.md) and the design authority [docs/website/DESIGN.md](../../../docs/website/DESIGN.md).

Required checks:

- one H1 with the primary keyword naturally;
- title following `Primary Keyword - Plain Benefit | GardenSuite` within 50-65 characters;
- meta description in simple English, one primary keyword and an actual workflow, 155 characters or fewer;
- absolute canonical, OG title/description/image/type/url/locale and matching Twitter card;
- true BreadcrumbList and page-specific JSON-LD only;
- descriptive image alt text;
- internal links to and from at least two relevant existing pages;
- sitemap entry with correct priority and change frequency;
- no fake ratings, prices, testimonials or unsupported schema;
- Sarbani Associates in a trust or ownership section.

Do not build a doorway page for every district. Use one campaign page plus useful regional content only where the existing SEO plan supports it.

## Performance and accessibility requirements

- No new image in `static/` may exceed 200KB in its served format. Prefer WebP and verify the final served file.
- Every image has `width` and `height`.
- At most two above-fold eager images; all below-fold images use `loading="lazy"`.
- Hero image uses a `<picture>` source, responsive `srcset` and a stable fallback.
- Third-party scripts stay dynamically imported where the site rules require it.
- Animation follows `prefers-reduced-motion`.
- Inline SVG stays under 2KB or moves to a component.
- Keyboard users can reach, label, submit and recover from every form control.
- Error text is adjacent to the field, readable and announced without relying on color.
- Contrast, focus state, touch target size, zoom and screen-reader labels pass the existing QA standard.
- No field or error state exposes worker or prospect personal data in the URL.

## QA and acceptance evidence

Use a controlled test account and fictional data. Evidence should be filed with the launch checklist, not with prospect PII.

- [ ] Product owner checks every technical statement on the page.
- [ ] Offer version and exclusions match the agreement and sales script.
- [ ] Primary and required repository CTAs exist and are distinguishable.
- [ ] Form validation accepts a valid fictional request and rejects missing required fields.
- [ ] Successful submission in the non-production destination creates one synthetic account, one request, source and owner, and sends a test acknowledgement.
- [ ] Any approved production-destination exception names the synthetic record, restricted access, deletion time and rollback evidence.
- [ ] Failure, retry, duplicate and safe email fallback paths are tested.
- [ ] DNC and suppression survive a test re-import and block a queued touch.
- [ ] UTM values and events arrive without PII and reconcile to the CRM.
- [ ] Mobile widths 375px and 768px, keyboard flow, reduced motion, contrast and error announcements pass.
- [ ] SEO title, description, canonical, OG, Twitter, schema, H1, alt text, internal links and sitemap pass.
- [ ] Image size, dimensions, loading, picture sources and performance budget pass.
- [ ] Privacy notice, consent versions, access, backup and retention tests pass.
- [ ] Stop owner can disable the CTA and preserve the evidence log.

## Stop rules

Pause the page, form or paid traffic when:

- a request is lost, duplicated without an account join, or routed to no owner;
- a privacy notice, consent record or data deletion path fails;
- a worker face, identity document or sensitive personal detail enters the form or analytics;
- a product claim or offer term differs from the approved agreement;
- the acknowledgement path claims receipt when delivery failed;
- spend or traffic reaches an unapproved geography, page or cap;
- accessibility, SEO, performance or page rules fail after a public release;
- a platform, hosting or security warning appears.

Record the asset ID, timestamp, issue, stop owner, corrective action and restart evidence. Do not restart by deleting the error log.
