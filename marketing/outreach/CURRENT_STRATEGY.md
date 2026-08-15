# GardenSuite Current Outreach Authority

Status: CURRENT
Strategy version: 2026-08-05-snov-smtp-pilot
Owner: Sarbani Associates
Last updated: 2026-08-05

## Purpose

This is the only repository authority for GardenSuite lead structure, outreach strategy, campaign readiness, and outreach blockers.

If another file conflicts with this one, this file wins unless the user gives a newer explicit direction.

## Current lead structure

The current lead entity is a **tea estate account**. It is not one row per phone number, email address, or source record.

The V2 consolidation introduced these structural rules:

- Records referring to the same estate are clustered through shared estate name, phone, or email.
- One estate account may preserve up to three phone numbers and three email addresses.
- Source provenance, address, location, CRM status, and prior WhatsApp status may be merged into the estate account.
- Raw-source rows, contact points, and snapshot counts are inputs to an estate account. They are not separate pipeline leads by default.
- A generated workbook is a dated snapshot, not permanent campaign truth.

The August 2 V2 snapshot consolidated 2,167 raw rows into 834 estate accounts. Those numbers describe that snapshot only. They must not be repeated as current counts without rechecking the latest data.

## Current outreach strategy

The replacement outreach playbook is **partially recorded** below from the owner's 2026-08-05 direction. Confirmed decisions are current. Proposed operating defaults are not approved for sending until the owner accepts or changes them.

The current implementation plan is [`docs/plans/outreach-restart/README.md`](../../docs/plans/outreach-restart/README.md). That plan is subordinate to this strategy file and does not authorize sending.

### Confirmed decisions

- **Geography:** West Bengal and Assam only.
- **Estate size:** 50 hectares or more.
- **Exclusions:** Exclude big corporate groups. The operational definition or named exclusion list is still required.
- **Target roles:** Founders and owners through directors, general managers, estate managers, and garden managers.
- **Channel order:** Email first, then WhatsApp. LinkedIn may be tested later but is not required for the first pilot.
- **Pilot sending tool:** Use Snov.io Campaigns for the 20-estate cold-email pilot. Its renewable Trial plan supports 100 recipients, one warm-up slot, automated follow-ups, and custom SMTP/IMAP connections. It can send through the existing domain mailbox without Google Workspace. Keep Brevo only for contacts who have opted in to marketing. Hunter is not selected because its free plan does not support the required custom SMTP/IMAP mailbox.
- **Sender requirement:** Send from a GardenSuite or Sarbani Associates domain mailbox. Do not require or purchase Google Workspace for this pilot.
- **Personalization:** A separately written email for every estate is not required. Use one approved tea-garden attendance sequence. Insert the verified name and estate only when available. Do not research or invent a special opening line for each contact.
- **Marketing material:** Do not attach brochures, images, videos, or long product documents to the first cold email. The website may appear in the sender signature. Send the relevant brochure, page, or demo material after the person replies or asks for more information.
- **Primary offer:** GardenSuite's attendance offering. Lead with face-verified attendance, offline field use, office review, setup, training, and support by Sarbani Associates. Smart weighing may be mentioned only when it fits the estate's workflow.
- **Live-system verification:** Full access is required. This records the access scope needed, not the presence of working credentials or permission to send.

### Proposed operating defaults - approval required

These choices fill the areas where no current decision was provided. They are intentionally simple for a first account-based pilot.

#### Pipeline and ownership

Use account-level pipeline stages. Keep channel activity as fields, not separate pipeline stages.

1. `Research` - estate details are still being checked.
2. `Ready` - estate and one contact meet the pilot rules.
3. `Emailing` - the approved Snov.io sequence has started.
4. `Replied` - the contact has replied and needs a human response.
5. `Demo` - a demo is being arranged or completed.
6. `Closed` - the work is finished. Record Won, Lost, or No Response as the outcome.

Keep `Do Not Contact` as a Yes or No field that overrides every stage.

Proposed ownership:

- One named Sarbani Associates outreach owner handles `Research` through `Replied` and records every touch.
- The Sarbani Associates sales or product owner takes responsibility from `Demo` onward.
- A person's name is still required for each owner role before launch.

#### Sending cadence

- Email 1 on day 0: tea-garden attendance problem and one easy reply question.
- Email 2 on day 5: offline field attendance and office review.
- Email 3 on day 12: setup, training, and a respectful final question. Do not continue after this.
- Each email must stand alone, stay short, and add one new point. Do not send identical messages to multiple people at the same estate at the same time.
- Snov.io will control the day 0, 5, and 12 timing. Contacts must exit the sequence when they reply, unsubscribe, bounce, or are manually stopped.
- WhatsApp follow-up is allowed only after a positive email reply, documented permission, an inbound enquiry, or an existing business relationship that permits it. A cold WhatsApp message is not an automatic next step after email silence.
- LinkedIn remains a later test and needs its own message and activity rules before use.

#### System of record

For the pilot, use one new account-based CRM tracker as the canonical record. Do not use the dated August 2 workbook as permanent campaign truth.

The tracker must have:

- one estate account record
- separate verified contact records linked to the estate
- account fit fields for state, hectares, ownership group, corporate exclusion review, and qualification result
- contact fields for name, title, email, phone, verification source, and verification date
- activity records for channel, date, message version, sender, outcome, and next action
- pipeline stage, stage owner, next-action date, loss reason, and suppression status

The exact tool is still undecided. A controlled workbook is sufficient for the first pilot if one person owns updates. A CRM should replace it before multi-user or larger-volume sending.

#### Suppression, opt-out, and do-not-contact rules

- Maintain one master suppression register keyed by normalized email address and phone number, linked to the estate account.
- Immediately suppress explicit stop requests, unsubscribes, spam complaints, hard bounces, invalid contacts, and estates marked do not contact.
- Record the reason, source, date, and person who applied the suppression.
- Check suppression before every send and every import. A later source file must never reactivate a suppressed contact automatically.
- Include a clear email opt-out. Honor a WhatsApp stop request across WhatsApp and any matching phone record.
- Verify the final sending setup against current Indian commercial communication requirements before using WhatsApp or telecom promotional messaging.

#### Pilot and decision criteria

- Pilot size: 20 qualified estate accounts, aiming for 10 in West Bengal and 10 in Assam when enough verified accounts are available.
- Start with one primary contact per estate. Add a second suitable contact only after the first sequence ends without a reply and the account is not suppressed.
- Pilot success gate: at least 2 positive, relevant replies or at least 1 qualified demo from the 20 accounts, with no suppression failure.
- Pause and fix data or sending setup on any hard bounce in the 20-account pilot, if more than 10% of sampled accounts fail the size/ownership/role checks, if any suppressed contact is messaged, or if a spam complaint is received.
- Review results after all 20 accounts finish or exit the sequence. Do not expand volume automatically.

### Current data-readiness finding

The August 2 V2 snapshot cannot apply the confirmed targeting rules by itself. Its estate-account sheet contains estate name, up to three phones and emails, address, website, broad location, prior WhatsApp status, prior CRM status, and sources. It does not contain hectares, ownership group, corporate-exclusion review, contact-person name, or job title.

Before a pilot list can be approved, candidate estates need current enrichment and manual verification for:

1. West Bengal or Assam location
2. 50-hectare minimum
3. ownership group and corporate exclusion
4. named contact and qualifying role
5. current contact point and source
6. suppression status

The phrase "big corporate groups" also needs either a precise rule or a named exclusion list so that qualification is consistent.

The `gardensuite.in` domain points email to `mail.gardensuite.in`. A DNS check on 2026-08-05 found no SPF record and no DMARC record at the domain. Mailbox login, SMTP/IMAP ports, TLS, DKIM, and live Snov.io connection are not yet verified. These sender checks block external sending. Website enquiry email may continue using Brevo because that is separate from cold outreach.

For any decision not confirmed or approved above, agents must not infer or reconstruct the current strategy from retired campaign materials. In particular, do not assume any of the following are current:

- a five-contacts-per-day WhatsApp pilot
- a permission-first WhatsApp sequence
- the reviewed `WhatsApp Queue` or `Email Review` workbook sheets
- the seven-email Brevo nurture sequence
- list ID `17` or templates `11` through `17`
- bulk or reviewed imports into Brevo
- brochure download as the lead-entry event
- `LeadCapture.svelte` as part of the current attendance-page funnel
- the 222-contact, 834-account, or 916+ contact counts as the active pipeline

The August 4 attendance hub rebuild intentionally removed `LeadCapture.svelte` from the route composition. Its absence is not an outreach blocker by itself. The component and API remain dormant infrastructure unless the current strategy explicitly reactivates them.

## What agents may do now

Agents may:

- inspect and explain the estate-account consolidation model
- audit data quality, provenance, duplicates, and contact coverage
- inspect current code and current external systems without changing them
- identify contradictions between repository artifacts
- prepare a strategy decision document for user approval

Agents must not:

- declare outreach ready or blocked from a legacy workbook
- recommend resuming the retired WhatsApp or Brevo workflows
- upload, message, enrol, or activate contacts from legacy instructions
- describe removed lead capture as a defect without a current strategy requirement
- treat old status checklists as evidence of present campaign state

## Required information before operational outreach work

Current status:

1. Target estate segments and exclusions - **partially confirmed**; the big-corporate exclusion rule or named list is missing.
2. Account and contact qualification rules - **confirmed in principle**; current estate size, ownership, contact name, and role still need verification.
3. Pipeline stages and stage owner - **proposed**; named owners and owner approval are missing.
4. Outreach channels and their order - **confirmed**; the proposed WhatsApp permission gate still needs approval and LinkedIn remains optional.
5. Message or offer by segment - **confirmed at offer level**; the actual approved email copy is missing.
6. Sending cadence and follow-up rules - **proposed**; owner approval is missing.
7. System of record for activity and outcomes - **proposed**; the exact account tracker or CRM is missing. Snov.io is selected for the pilot automation, but the SMTP/IMAP mailbox and activity-sync process still need verification.
8. Suppression, opt-out, and do-not-contact handling - **proposed**; implementation and pre-send verification are missing.
9. Pilot size and success or stop criteria - **proposed**; owner approval is missing.
10. Current live-system access - **full access required**; systems, credentials, and working access still need verification.

Operational sending remains blocked until proposed items are approved, the data is enriched and verified, a canonical tracker exists, suppression checks are implemented, message copy is approved, and live sending access is tested without activating a campaign.

## Historical materials

These locations are deprecated and preserved only for implementation history:

- `marketing/archive/brevo-email-marketing/`
- `marketing/archive/whatsapp-face-attendance-weight/RESUME_SENDING.md`
- `marketing/archive/whatsapp-face-attendance-weight/messages.md`
- `marketing/archive/outreach-review-20260802/`
- `marketing/archive/email-sequence-attendance-scale.md`

Historical code and files may remain because other pages, tests, or records still reference them. Their presence does not make their strategy current.

## Freshness protocol

Before answering any outreach-status question:

1. Read this file.
2. Check whether the user supplied a newer decision in the current task.
3. Check recent commits and current live-system state relevant to the question.
4. Separate verified facts from missing decisions.
5. Never resolve a conflict by choosing a historical file because it is more detailed.
