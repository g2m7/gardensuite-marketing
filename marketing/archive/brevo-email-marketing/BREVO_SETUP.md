# DEPRECATED - Brevo Setup Guide

> [!CAUTION]
> Status: DEPRECATED. Do not create, activate, test, or import contacts into this retired automation unless the user explicitly re-adopts it. Read `marketing/outreach/CURRENT_STRATEGY.md`.

## Current status

The Brevo account has the following inactive campaign setup:

- Folder: `GardenSuite Marketing` - ID `16`
- List: `Tea Garden Leads` - ID `17`
- Verified sender: `Sarbani Associates <sarbani@sarbaa.com>`
- Draft templates: IDs `11` to `17`

Do not activate the sequence or import the consolidated lead file directly. The list is only for website opt-ins or contacts with explicit, recorded email consent.

## Environment settings

```env
BREVO_API_KEY=your-api-key
BREVO_LIST_ID=17
BREVO_SENDER_EMAIL=sarbani@sarbaa.com
BREVO_SENDER_NAME="Sarbani Associates"
```

## Contact attributes

The account contains these GardenSuite attributes:

- `GARDEN`
- `LOCATION`
- `CAMPAIGN`
- `CONTACT_CONSENT`
- `EMAIL_CONSENT`
- `WHATSAPP_CONSENT`
- `CONSENT_DATE`
- `CONSENT_SOURCE`
- `LEGAL_BASIS`
- `GARDENSUITE_TAGS`

## Automation workflow to create in Brevo

1. Create an automation triggered when a contact joins list `Tea Garden Leads`.
2. Add a filter requiring `EMAIL_CONSENT` to equal `true`.
3. Use the seven templates below with a two-day delay between emails.
4. Exit the contact after a reply, demo booking, unsubscribe, or hard bounce.
5. Test the complete workflow with an address owned by Sarbani Associates.
6. Verify mobile layout, links, reply handling, and unsubscribe handling.
7. Activate only after the test contact exits correctly.

| Day | Template ID | Template name                            |
| --- | ----------: | ---------------------------------------- |
| 0   |          11 | GardenSuite Nurture 01 - Guide           |
| 2   |          12 | GardenSuite Nurture 02 - Record Problem  |
| 4   |          13 | GardenSuite Nurture 03 - Clear Pricing   |
| 6   |          14 | GardenSuite Nurture 04 - Rollout         |
| 8   |          15 | GardenSuite Nurture 05 - Practical Proof |
| 10  |          16 | GardenSuite Nurture 06 - Support Terms   |
| 12  |          17 | GardenSuite Nurture 07 - Final Demo      |

The approved copy is in `EMAIL_SEQUENCES.md` and `templates/`.

## Contact import safety

Use the reviewed workbook. Set `Owner Approval` to `Approved`, add real consent evidence, and set `Brevo Action` to `Add`, `Import`, or `Subscribe`.

Run a dry check first:

```powershell
uv run gs_landing/docs/email-marketing/scripts/upload_contacts_to_brevo.py
```

The script performs no writes unless both safety flags are supplied:

```powershell
uv run gs_landing/docs/email-marketing/scripts/upload_contacts_to_brevo.py --execute --confirm I_HAVE_REVIEWED_PERMISSION
```

Do not use the importer for cold directory addresses. Send any justified one-to-one business email manually and record the outcome in the workbook.

## Tracking links

Use this pattern:

```text
https://gardensuite.in/products/attendance?utm_source=email&utm_medium=automation&utm_campaign=attendance_nurture&utm_content=email_1
```

## Monitoring

Check after each pilot batch:

- delivery and hard bounces
- replies and demo requests
- unsubscribe requests
- spam complaints
- correct suppression of contacts who opted out

Pause the campaign if a hard bounce, complaint, or unexpected automation behaviour appears during the first pilot.

## Support

- Brevo Help: https://help.brevo.com
- Brevo API: https://developers.brevo.com

Maintained by Sarbani Associates.
