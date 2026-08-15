# Outreach Decision Register

**Plan version:** v1 draft  
**Last updated:** 2026-08-05

## Decision rules

- Confirmed decisions can be implemented after their dependent gates pass.
- Proposed decisions are recommendations only.
- Open decisions block only the work shown in the `Blocks` column.
- Every changed decision needs a date, decision owner, and short reason.

## Confirmed decisions

| ID | Decision | Current direction | Source |
|---|---|---|---|
| D-001 | Geography | West Bengal and Assam only | Owner direction, 2026-08-05 |
| D-002 | Minimum estate size | 50 hectares or more | Owner direction, 2026-08-05 |
| D-003 | Corporate exclusion | Exclude big corporate groups | Owner direction, 2026-08-05 |
| D-004 | Contact seniority | Founders and owners through managers | Owner direction, 2026-08-05 |
| D-005 | Channel order | Email first, then WhatsApp | Owner direction, 2026-08-05 |
| D-006 | Optional channel | LinkedIn may be tested later | Owner direction, 2026-08-05 |
| D-007 | Primary offer | GardenSuite attendance offering | Owner direction, 2026-08-05 |
| D-008 | Live-system access scope | Full access is required for verification | Owner direction, 2026-08-05 |
| D-009 | Lead structure | Tea estate account, not one independent lead per contact point | Current strategy authority |
| D-010 | Cold-email sending tool | Snov.io Campaigns on its renewable Trial plan; Brevo remains opt-in only | Owner direction, 2026-08-05 |
| D-011 | Pilot send method | Automate the 20-contact email sequence when the selected provider permits it | Owner direction, 2026-08-05 |
| D-012 | Per-estate copy | A separately handcrafted email for every estate is not required | Owner clarification, 2026-08-05 |
| D-013 | Sender mailbox | Use the existing domain email through SMTP/IMAP; do not require or purchase Google Workspace | Owner direction, 2026-08-05 |

## Proposed defaults awaiting approval

| ID | Area | Proposed default | Why |
|---|---|---|---|
| P-001 | Pipeline | Research, Ready, Emailing, Replied, Demo, Closed; keep Do Not Contact as a separate field | Simple account-based lifecycle |
| P-002 | Cadence | Email on days 0, 5, and 12 | Three useful touches are simpler for the small pilot |
| P-003 | WhatsApp gate | Use only after positive reply, documented permission, inbound enquiry, or suitable existing relationship | Respects recipient preference and reduces complaint risk |
| P-004 | Pilot size | 20 qualified estate accounts, aiming for 10 West Bengal and 10 Assam | Small enough for full manual QA |
| P-005 | Contact order | Start with one primary contact per estate | Prevents several people at one estate receiving the same pitch together |
| P-006 | Second contact | Use only after the first sequence ends without reply and the account is not suppressed | Keeps outreach account-aware |
| P-007 | Pilot success | At least 2 relevant positive replies or 1 qualified demo, with zero suppression failures | Clear minimum signal without claiming statistical certainty |
| P-008 | System of record | One new account-based tracker for the pilot | Prevents legacy snapshot conflicts |
| P-009 | Reply SLA | Positive and practical replies handled within 4 business hours | Keeps momentum and makes ownership clear |
| P-010 | Bounce pause | Pause on any hard bounce in the first 20-account pilot, then verify all unsent addresses | One hard bounce already equals at least 5% of a 20-contact first wave |
| P-011 | Spam pause | Pause immediately on any spam complaint | Protects sender reputation and forces review |
| P-012 | Tracking | Do not use opens as the main success measure | Opens can be unreliable and do not show buying intent |
| P-013 | Message variation | Use one tea-garden attendance sequence for all approved roles | Keeps the pilot simple without one-by-one writing |
| P-014 | Snov.io entry | Add only the frozen, verified pilot contacts to the approved Snov.io campaign | Gives control without manual sending |
| P-015 | Snov.io exit | Exit on reply, unsubscribe, bounce, or manual stop | Prevents later follow-ups after engagement or suppression |

## Open decisions

| ID | Decision needed | Recommended path | Blocks | Owner | Due |
|---|---|---|---|---|---|
| O-001 | What exactly counts as a big corporate group? | Approve a named exclusion list. Put uncertain ownership into `Manual Review`. | Account qualification | Sarbani Associates | Before G0 |
| O-002 | Who owns Research through Replied? | Name one outreach owner and one backup. | Routing and reply SLA | Sarbani Associates | Before G0 |
| O-003 | Who owns Demo onward? | Name the product or sales owner and one backup. | Demo handoff | Sarbani Associates | Before G0 |
| O-004 | Are proposed pipeline stages approved? | Approve P-001 or record changes. | CRM setup | Sarbani Associates | Before G0 |
| O-005 | Is the three-email cadence approved? | Approve P-002 or record changes. | Message production | Sarbani Associates | Before G0 |
| O-006 | Is WhatsApp permission-gated? | Approve P-003 before any WhatsApp work. | WhatsApp use | Sarbani Associates | Before G0 |
| O-007 | What is the canonical system of record? | Use a controlled account-based workbook for the 20-account pilot if there is one editor. Choose a CRM before multi-user scale. | Data import and activity logging | Sarbani Associates | Before G1 |
| O-008 | What sender identity will be used? | Use a real named person at Sarbani Associates. Do not use a generic `sales@` sender. | Sender setup | Sarbani Associates | Before G5 |
| O-009 | Which domain and mailbox will send? | Prefer a dedicated, clearly related outbound domain or subdomain, with an inbox that is actively monitored. | Authentication and warmup | Sarbani Associates | Before G5 |
| O-010 | Which domain mailbox will connect to Snov.io? | Use a real person's mailbox on the approved GardenSuite or Sarbani Associates domain. | Sender setup | Sarbani Associates | Before G5 |
| O-014 | What are the SMTP and IMAP settings? | Obtain the host, port, TLS mode, username, and app password from the current mail administrator. | Technical setup | Sarbani Associates | Before G5 |
| O-011 | What is the monthly tool and research budget? | Record a hard pilot cap for enrichment, verification, mailbox, and sending tools. | Purchase decisions | Sarbani Associates | Before G1 |
| O-012 | Who approves the final message pack? | One business approver plus one copy and claim reviewer. | G4 | Sarbani Associates | Before G4 |
| O-013 | Who performs compliance review? | Assign an internal owner and obtain professional advice if required. | G2 and WhatsApp | Sarbani Associates | Before G2 |

## Proposed corporate-exclusion workflow

Until O-001 is closed:

1. Research the estate's current owner or controlling group.
2. If the owner appears to be a large corporate group, set `Corporate Review = Manual Review`.
3. Do not qualify or send to that estate.
4. Add the group to the proposed named exclusion list.
5. The owner approves or rejects the addition.
6. Apply the approved result to every estate owned by that group.

This avoids inventing a size threshold for the word `big`.

## Decision record template

Copy this block for each new decision:

```markdown
### D-XXX - Decision title

- Date:
- Decision owner:
- Status: Confirmed | Rejected | Replaced
- Decision:
- Reason:
- Documents affected:
- Replaces:
```

## Change log

| Date | Change | Owner |
|---|---|---|
| 2026-08-05 | Initial register created from the current strategy and owner answers | Sarbani Associates |
