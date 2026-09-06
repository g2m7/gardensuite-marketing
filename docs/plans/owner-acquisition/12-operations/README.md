# Operations, tracking and review

Priority: P0 | Accountable owner: Kaushik | Review: weekly, with daily reply handling during campaigns

## Goal

Keep one estate history across referrals, research, email, the magnet, social conversations, calls and sales. Make each next action traceable and prevent an old list from restarting unwanted contact.

## System of record

The existing September prospects.csv remains the canonical research/qualification staging file for that pilot. Its generated Snov import is an allowlist export, not a CRM. The existing legacy Excel tracker is a historical evidence source for exclusions and active discussions, not the new operating strategy.

For the first multi-channel launch, use a restricted controlled workbook with Accounts, Contacts, Activity, Permissions, Suppression and Weekly Metrics tabs. The exact storage destination is D8 in [Decisions](../DECISIONS.md). A workbook is sufficient at this scale; buying a CRM is not required. Reuse a working private CRM if the owner selects one, preserving the same fields and IDs.

[Templates](templates/README.md) contains header-only CSV tab templates. They contain no prospect data. Do not populate personal contact details inside this public documentation tree. Establish access, storage and the responsible updater before a live capture form writes data.

## Data model

Accounts: account_id, canonical estate name, aliases, company/group, region/district, fit, source, stage, next action, assigned owner, do-not-contact status. Preserve September account IDs when bringing research rows into operations.

Contacts: contact_id, linked account_id, name, declared/verified role, email/phone/profile, estate relationship evidence, verification date, preferred channel. A self-declared owner stays unverified until checked.

Activity: event ID, account/contact, timestamp, channel, campaign/asset version, direction, outcome, owner, next action. Preserve first source and latest meaningful source rather than overwriting attribution.

Permissions: channel, purpose, exact notice/checkbox version, affirmative action, source, timestamp, withdrawal. A report request, optional sales follow-up, WhatsApp request and call request are separate purposes. A cold-business-email research basis is not recorded as opt-in consent.

Suppression: contact/account scope, normalized identifier, reason, source, timestamp, applied by, review note. Explicit estate do-not-contact overrides every channel. Invalid-address suppression stops that address without automatically labelling the estate uninterested. Do not reactivate either simply because another file contains it.

## Routing and stages

Use Research -> Ready -> Contacting -> Replied -> Demo -> Quote -> Won/Lost/No response. These are the proposed multi-channel operating stages; map the existing pilot's Emailing to Contacting and Closed outcome fields on import. Do not rewrite research files merely to rename stages.

Route current clients to support/account review and potential expansion, not the net-new cold campaign. Route active negotiations to the existing sales owner. A relevant inbound request from outside pilot geography needs a deliberate service-fit decision, not automatic entry into the Assam cold list.

Owner/director identified plus an estate relationship and relevant interest counts as a qualified owner lead. A role dropdown, ad click, valid number or generic tea interest alone does not.

## Daily routine

1. Review inbound replies, resource requests and stops before any new automated batch.
2. Apply suppression and reply exits; reconcile mailbox/Snov status with the tracker.
3. Verify new voluntary leads and route resource-only versus product-interest requests correctly.
4. Add only the day's cleared cold recipients, within the email plan.
5. Assign the next action and owner to each relevant conversation. Target a useful response within one working day as an internal standard.

Research automation may prepare records, find public sources and generate drafts/allowlists. It must not activate live campaigns, send social messages or publish content. Existing heartbeat scope is unchanged by this documentation. A future automation must be tested using controlled records and narrowly scoped actions.

## Weekly review

Use raw counts and clear denominators: distinct estates approached, accepted introductions, delivered/accepted email attempts, relevant positive replies, resource requests, verified owner leads, requested/completed demos, quotes, paid installations, adoption and ERP proposals.

A server accepting an email is not proof of Inbox delivery. An ad platform lead is not a qualified estate. One estate submitting twice is not two opportunities. Do not mix existing-customer validation interviews into acquisition results.

Cost per qualified estate = attributable channel cost / distinct qualified estate accounts.

Cost per completed demo = attributable channel cost / completed qualified demos.

Acquisition cost = media + allocated tools + content/contractor costs + partner fees + acquisition travel + founder/staff time, divided by new paid installations. Keep delivery costs separate in package contribution. Show both cash-only and fully loaded views if founder-hour costing is provisional.

If a denominator is zero, show not yet measurable rather than zero cost. Do not project lifetime value from an unknown retention rate or future ERP sale.

## Rules and working limits

- Account history precedes outreach. Check current client, active negotiation, rejection and do-not-contact before research selection and again before contact.
- The first cold pilot remains twenty estates, one active recipient per estate, the defined districts, at least fifty hectares and independent/mid-tier fit. A reliable scale proxy is acceptable.
- Never turn general uncertainty into an indefinite launch gate. Name the missing fact, the task to resolve it and the evidence needed.
- Never waive a real suppression, wrong-person or authentication failure to hit a calendar quota.
- New paid commitments need a chosen loss cap and action authorization. Existing accepted decisions are not repeatedly reopened.
- No raw contact fields in analytics, URLs, screenshots, public plans or log summaries. Do not collect worker biometric/payroll data in the magnet.
- Review inactive resource-only records after ninety days for deletion/minimization under the published privacy policy. Preserve only the minimal suppression evidence needed to honour stops. This is a proposed operating retention review, not a legal retention claim.

## Tooling and capability status

| Function | Available / planned | Operating approach |
| --- | --- | --- |
| Public research | Available through browser/web and repository tools | Sources, current relationships and exclusions |
| Pilot qualification/export | Existing scripts/outreach/pilot_pipeline.mjs | Read-only check and explicit export; no sending |
| Email validation/campaign | Snov selected; connection previously owner-confirmed | Use current Snov UI; do not pretend an API integration is installed |
| Sender | Spacemail full mailbox; public DNS checked | Current owner-accepted provider risk recorded in email audit |
| Micro magnet | Specification in this plan; not deployed | SvelteKit page, restricted capture, requested delivery |
| Organic social | Human profile/page work | No account connection or publishing claimed in this audit |
| Private CRM/workbook | Destination to select before live capture | Header-only templates ready |
| Paid ads and pixels | Future setup, no spending activated | Current account inspection and scoped test |
| Sales/rollout | Sarbani Associates | Named delivery lead required before implementation promise |

Relevant skill support: marketing-plan for coordination; lead-magnets/free-tools for the owner check; marketing-ideas for channel selection. Future email, social, analytics, pricing and website implementation work should read the applicable skill and current project guides. A skill's existence is not proof of a connected external service.

## Acceptance criteria

- [ ] Restricted tracker destination, access owner and backup practice recorded.
- [ ] One estate ID joins all contacts and touches; alias/duplicate merge preserves history.
- [ ] Imported research rows preserve exclusions, source evidence and IDs.
- [ ] Resource-only, sales email, WhatsApp and call permissions route correctly in controlled tests.
- [ ] An explicit stop prevents further queued outreach and survives re-import.
- [ ] Every relevant conversation has an owner and next action.
- [ ] Weekly report shows actual source-specific counts, cost and uncertainty.
- [ ] Setup status is recorded as planned, configured, tested or live with evidence; no unchecked task is reported as complete.
