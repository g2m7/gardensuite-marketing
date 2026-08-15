# Outreach Restart Progress

**Plan version:** v1 draft  
**Last updated:** 2026-08-05  
**Planning status:** Complete  
**Operational status:** Blocked before G0  
**Current gate:** G0 - Strategy decisions approved

## Plan documents

- [x] README created
- [x] Master plan created
- [x] Decision register created
- [x] Data and qualification specification created
- [x] Pipeline and ownership specification created
- [x] Messaging and channel plan created
- [x] Deliverability and compliance plan created
- [x] Snov.io Campaigns plan created
- [x] Pilot runbook created
- [x] Measurement plan created
- [x] Working checklists created
- [x] Acceptance criteria created
- [x] Current-strategy link added

## Gate status

- [ ] G0 - Strategy decisions approved
- [ ] G1 - System of record ready
- [ ] G2 - Suppression and compliance controls ready
- [ ] G3 - Pilot accounts and contacts verified
- [ ] G4 - Message pack approved
- [ ] G5 - Sender and deliverability ready
- [ ] G6 - Internal dry run passed
- [ ] G7 - Pilot launch approved
- [ ] G8 - Pilot completed and reviewed
- [ ] G9 - Scale decision approved

## Immediate next actions

1. Approve or change the proposed defaults in [`DECISIONS.md`](DECISIONS.md).
2. Provide the big-corporate exclusion list or exact review rule.
3. Name the outreach and demo owners.
4. Select the system of record.
5. Confirm the domain mailbox SMTP/IMAP details, add missing email authentication records, connect Snov.io, and run internal tests.

## Blockers

| Blocker | Gate affected | Owner | Status |
|---|---|---|---|
| Big-corporate rule is not operational | G0, G3 | Sarbani Associates | Open |
| Outreach owner not named | G0 | Sarbani Associates | Open |
| Demo owner not named | G0 | Sarbani Associates | Open |
| Proposed cadence and pipeline not approved | G0 | Sarbani Associates | Open |
| Canonical tracker not selected | G1 | Sarbani Associates | Open |
| Suppression implementation not built | G2 | Compliance owner | Open |
| Estates lack current hectares and ownership fields | G3 | Research owner | Open |
| Message pack not written or approved | G4 | Copy owner | Open |
| Contact-source and cold-email eligibility review is not complete | G2 | Compliance owner | Open |
| Domain mailbox SMTP/IMAP access is not verified | G5 | Technical owner | Open |
| SPF, DKIM, and DMARC are not fully verified | G5 | Technical owner | Open |
| Snov.io account and campaign are not verified | G5 | Technical owner | Open |

## Update log

| Date | Update | By |
|---|---|---|
| 2026-08-05 | Full plan set created. No operational campaign action taken. | Codex |
| 2026-08-05 | Hunter Sequences selected for the cold-email pilot. Brevo moved to opt-in marketing only. | Codex |
| 2026-08-05 | Snov.io replaced Hunter because the sender must use custom domain SMTP/IMAP without Google Workspace. | Codex |
