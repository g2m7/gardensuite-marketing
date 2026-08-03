# GardenSuite Outreach Restart Plan

Status: Pilot-ready after owner review. Not approved for mass outreach.

## Source files

- Raw source: `GS_Leads_Consolidated_20260802.xlsx`
- Reviewed workbook: `../../../outputs/gardensuite_outreach_ready_20260802/GardenSuite_Outreach_Ready_20260802.xlsx`
- WhatsApp copy: `messages.md`
- Email copy: `../../../gs_landing/docs/email-marketing/EMAIL_SEQUENCES.md`

## Confirmed lead totals

- 834 lead rows
- 118 valid Indian phone numbers
- 134 valid email addresses
- 6 rows with both
- 588 rows with no usable phone or email
- 40 rows previously attempted or messaged on WhatsApp
- 30 WhatsApp review candidates across six days
- 0 email rows approved automatically

## Day 0: Prepare

1. Open the reviewed workbook.
2. Review the five `Day 1` rows in `WhatsApp Queue`.
3. Confirm that the number belongs to the estate or a known contact.
4. Change `Owner Approval` to `Approved` only when the relationship or reason for contact is clear.
5. Leave every unconfirmed row as `Needs review` and do not send it.
6. Keep all 134 email rows out of Brevo until explicit email consent is recorded.

## WhatsApp pilot: Days 1 to 6

1. Send no more than five first-contact messages per day.
2. Send each message manually.
3. Use the warm message only for a known or earlier contact.
4. Use the permission-first message for a new contact. Do not include a link.
5. Send the attendance page or brochure only after a positive reply.
6. Do not follow up when a cold message is unanswered.
7. Record the sent date, reply, opt-out, and next action in the workbook.
8. Stop immediately if WhatsApp shows an account warning or restriction.

## Email pilot

Website leads can enter the Brevo nurture list after checking the email consent box. For existing records:

1. Review the `Email Review` sheet.
2. Confirm explicit email permission and record the evidence.
3. Set `Owner Approval` to `Approved`.
4. Set `Brevo Action` to `Add` only for contacts who may receive the automated sequence.
5. Run the importer without `--execute`. Confirm the eligible count.
6. Test the seven-email Brevo automation with one Sarbani Associates address.
7. Activate the automation only after reply, unsubscribe, demo, and hard-bounce exit rules work.
8. Import a small approved pilot, then check delivery and responses before adding more.

Dry run:

```powershell
uv run gs_landing/docs/email-marketing/scripts/upload_contacts_to_brevo.py
```

Approved import:

```powershell
uv run gs_landing/docs/email-marketing/scripts/upload_contacts_to_brevo.py --execute --confirm I_HAVE_REVIEWED_PERMISSION
```

## Daily stop rules

Pause sending if any of these occurs:

- a WhatsApp account warning or restriction
- an email spam complaint
- a hard bounce in the first pilot
- a contact says stop or asks not to be contacted
- the Brevo workflow sends after an exit condition
- the landing page or unsubscribe route fails

## Logging

Record every message and result in the reviewed workbook. Never remove an opt-out. Keep the raw consolidated workbook unchanged.

Maintained by Sarbani Associates. Last reviewed: 2026-08-02.
