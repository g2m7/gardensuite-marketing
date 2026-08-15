# DEPRECATED - Retired Contact Review Workflow

> [!CAUTION]
> Status: DEPRECATED. The workbook, queues, approval fields, and snapshot totals below are historical. They are not the current lead pipeline or outreach operating state. Read `marketing/outreach/CURRENT_STRATEGY.md`.

## Historical lead snapshot

Use only this consolidated file for lead review:

`marketing/whatsapp-campaigns/face-attendance-weight/GS_Leads_Consolidated_20260802.xlsx`

The reviewed working copy is:

`outputs/gardensuite_outreach_ready_20260802/GardenSuite_Outreach_Ready_20260802.xlsx`

Do not import the older source files separately. Their records are already merged into the consolidated file.

## Confirmed review totals

| Measure                                      | Lead rows |
| -------------------------------------------- | --------: |
| Total rows                                   |       834 |
| Valid Indian phone                           |       118 |
| Valid email                                  |       134 |
| Both phone and email                         |         6 |
| No usable phone or email                     |       588 |
| Previously attempted or messaged on WhatsApp |        40 |
| WhatsApp pilot review queue                  |        30 |
| Email rows requiring review                  |       134 |
| Automatically approved for email             |         0 |

One normalised estate-name duplicate pair was found. Two rows contain placeholder email addresses. No row is approved automatically.

## Required review fields

The reviewed workbook contains two operational sheets:

- `WhatsApp Queue` - six pilot days with five contacts per day
- `Email Review` - all syntactically valid email addresses pending review

Before contact, the owner must record:

- whether the person or estate relationship is known
- where permission came from
- owner approval
- the intended action
- the send result, reply, opt-out, or next action

## WhatsApp rules

- Send no more than five first-contact messages per day.
- Confirm the person or estate relationship before sending.
- Use the permission-first text without a link for a new contact.
- Send a page or brochure link only after interest is shown.
- Do not follow up on an unanswered cold message.
- Record `STOP` or any negative reply immediately and do not contact that number again.

## Email rules

- Website opt-ins may enter the Brevo nurture list after explicit email consent.
- Do not bulk import directory email addresses.
- A one-to-one business email requires owner approval and a recorded relationship or permission basis.
- Every marketing email must have a working unsubscribe route.
- Suppress hard bounces, complaints, and opt-outs immediately.

## Brevo

- List: `Tea Garden Leads` - ID `17`
- Sender: `Sarbani Associates <sarbani@sarbaa.com>`
- The website stores source, campaign, and consent information in Brevo attributes.
- The safe importer is dry-run by default. See `BREVO_SETUP.md`.

## Data handling

- Keep the raw consolidated workbook unchanged.
- Use the reviewed workbook for campaign decisions and status updates.
- Do not share contact data outside Sarbani Associates.
- Remove invalid addresses and record all opt-outs.
- Review access to the files regularly.

Last reviewed: 2026-08-02
Maintained by Sarbani Associates.
