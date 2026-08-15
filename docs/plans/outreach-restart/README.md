# GardenSuite Outreach Restart Plan

**Version:** v1 draft  
**Date:** 2026-08-05  
**Owner:** Sarbani Associates  
**Status:** Planning complete, operational launch blocked

## Purpose

This folder is the implementation plan for restarting GardenSuite outbound outreach safely.

**Start here:** [`SIMPLE_PLAN.md`](SIMPLE_PLAN.md) is the short working plan. The remaining files are reference material for setup, checks, and troubleshooting.

The plan covers:

- estate qualification
- contact research
- account-based pipeline stages
- sender and email setup
- suppression and do-not-contact controls
- attendance-offering messages
- email, WhatsApp, and possible LinkedIn use
- a 20-estate pilot
- measurement, pause rules, and scale decisions

No document in this folder authorizes a send by itself.

## Authority and precedence

The current strategy authority is [`marketing/outreach/CURRENT_STRATEGY.md`](../../../marketing/outreach/CURRENT_STRATEGY.md).

If documents disagree, use this order:

1. The user's latest explicit direction
2. `marketing/outreach/CURRENT_STRATEGY.md`
3. Current production code and verified live-system state
4. This plan
5. Historical campaign material

The retired WhatsApp queue, Brevo sequence, old reviewed sheets, and old contact counts are not restart instructions.

## Confirmed campaign scope

- Geography: West Bengal and Assam only
- Estate size: 50 hectares or more
- Exclusion: big corporate groups
- Target roles: founders and owners through directors, general managers, estate managers, and garden managers
- Channel order: email first, then permission-gated WhatsApp
- Cold-email tool: Snov.io Campaigns using the existing domain mailbox through SMTP/IMAP
- Tool plan: renewable Snov.io Trial, enough for 100 recipients
- Sender rule: no Gmail or Google Workspace requirement
- Brevo use: opted-in marketing only, not first-touch cold outreach
- Optional later channel: LinkedIn
- Primary offer: GardenSuite attendance, led by face-verified attendance and offline field use
- Trust anchor: Sarbani Associates, Bagdogra, Siliguri
- Primary action: reply or book a free demo

## Current launch blockers

- [ ] Approve a named big-corporate exclusion list or exact review rule
- [ ] Name the pre-demo outreach owner
- [ ] Name the demo and sales owner
- [ ] Approve the proposed pipeline and cadence
- [ ] Select the system of record
- [ ] Enrich 20 estate accounts with hectares, ownership, contact name, and role
- [ ] Build and test the master suppression register
- [ ] Approve all message versions
- [ ] Confirm the domain mailbox, named sender, SMTP, and IMAP details
- [ ] Add SPF, DKIM, and DMARC before external sending
- [ ] Connect Snov.io, configure the sequence, and test reply, unsubscribe, and bounce exits
- [ ] Verify current live-system access without activating a campaign
- [ ] Complete the dry run
- [ ] Record written pilot launch approval

## Document map

| Document | Use |
|---|---|
| [`SIMPLE_PLAN.md`](SIMPLE_PLAN.md) | One-page working plan for the team |
| [`MASTER_PLAN.md`](MASTER_PLAN.md) | Full phased implementation plan and risk controls |
| [`DECISIONS.md`](DECISIONS.md) | Confirmed, proposed, and open decisions |
| [`DATA_AND_QUALIFICATION.md`](DATA_AND_QUALIFICATION.md) | Estate-account data model, contact rules, enrichment, and QA |
| [`PIPELINE_AND_OWNERSHIP.md`](PIPELINE_AND_OWNERSHIP.md) | Pipeline stages, entry and exit rules, SLAs, and RACI |
| [`MESSAGING_AND_CHANNELS.md`](MESSAGING_AND_CHANNELS.md) | Offer, role-based angles, email sequence, WhatsApp gate, LinkedIn test |
| [`DELIVERABILITY_AND_COMPLIANCE.md`](DELIVERABILITY_AND_COMPLIANCE.md) | Sender setup, authentication, suppression, consent, and safety checks |
| [`SNOV_IO_CAMPAIGNS.md`](SNOV_IO_CAMPAIGNS.md) | Snov.io SMTP/IMAP setup, sequence steps, exits, tests, and launch controls |
| [`HUNTER_SEQUENCES.md`](HUNTER_SEQUENCES.md) | Rejected free-plan option because custom SMTP/IMAP needs a paid plan |
| [`BREVO_AUTOMATION.md`](BREVO_AUTOMATION.md) | Retired cold-outreach plan and current opt-in-only boundary |
| [`PILOT_RUNBOOK.md`](PILOT_RUNBOOK.md) | Dry run, launch, daily operation, reply handling, pause, and recovery |
| [`MEASUREMENT.md`](MEASUREMENT.md) | Metric definitions, success criteria, reports, and scale decision |
| [`CHECKLISTS.md`](CHECKLISTS.md) | Working checklists for research, approval, sending, and closeout |
| [`ACCEPTANCE_CRITERIA.md`](ACCEPTANCE_CRITERIA.md) | Evidence required to pass each launch gate |
| [`PROGRESS.md`](PROGRESS.md) | Current execution state and gate tracker |

## Stage gates

| Gate | Meaning | Sending allowed? |
|---|---|---|
| G0 | Strategy decisions approved | No |
| G1 | System of record and data model ready | No |
| G2 | Suppression and compliance controls ready | No |
| G3 | Pilot accounts and contacts verified | No |
| G4 | Message pack approved | No |
| G5 | Sender and deliverability checks passed | No |
| G6 | Internal dry run passed | No |
| G7 | Pilot launch approved | Yes, pilot only |
| G8 | Pilot completed and reviewed | No new volume until decision |
| G9 | Scale decision approved | Yes, within the approved limit |

## How to use this folder

1. Open [`DECISIONS.md`](DECISIONS.md) and close the blocking decisions.
2. Assign a named owner to every action in [`PIPELINE_AND_OWNERSHIP.md`](PIPELINE_AND_OWNERSHIP.md).
3. Work through [`MASTER_PLAN.md`](MASTER_PLAN.md) in phase order.
4. Use [`CHECKLISTS.md`](CHECKLISTS.md) during execution.
5. Pass each gate in [`ACCEPTANCE_CRITERIA.md`](ACCEPTANCE_CRITERIA.md) with recorded evidence.
6. Update [`PROGRESS.md`](PROGRESS.md) after each review.
7. Do not increase volume until G9 is approved.

## Status language

- **Confirmed:** explicitly decided by the owner
- **Proposed:** recommended default, not active until approved
- **Blocked:** required input or evidence is missing
- **Passed:** acceptance evidence is recorded
- **Failed:** acceptance evidence shows a defect that must be fixed
- **Not applicable:** approved as outside the current pilot

## Non-goals

This plan does not:

- reactivate the retired Brevo nurture sequence
- use the retired WhatsApp queue
- assume the August 2 workbook is the active pipeline
- upload, enrol, message, or activate any contact
- make LinkedIn part of the first pilot
- reuse legacy Brevo lists, templates, or workflows
- promise attendance accuracy, ROI, time savings, or guaranteed results
- publish client names without approval

## Definition of ready

Outreach is ready to resume only when G0 through G7 have passed and the approval record names:

- the pilot batch
- the sender
- the outreach owner
- the approved message versions
- the sending dates
- the system of record
- the suppression snapshot checked before launch
- the person authorizing the pilot
