# Snov.io Cold Email Pilot

**Status:** Selected  
**Date:** 2026-08-05  
**Owner:** Sarbani Associates

## Decision

Use Snov.io Campaigns for the 20-estate cold-email pilot.

Snov.io can connect to the existing GardenSuite or Sarbani Associates domain mailbox through SMTP and IMAP. Google Workspace is not required.

The renewable Trial plan includes:

- 100 campaign recipients
- unlimited follow-ups for those recipients
- 50 search or verification credits
- one mailbox warm-up slot
- automated campaigns
- a simple CRM

This is enough for the 20-estate pilot.

Official references:

- [Connect a custom SMTP/IMAP mailbox](https://snov.io/knowledgebase/connect-your-mailbox/)
- [Trial plan limits](https://snov.io/knowledgebase/pricing-plans-overview/)
- [Campaign and reply behavior](https://snov.io/knowledgebase/email-drip-campaigns/)

## Current domain finding

A public DNS check on 2026-08-05 found:

- `gardensuite.in` receives email at `mail.gardensuite.in`
- no SPF TXT record was found on `gardensuite.in`
- no DMARC TXT record was found at `_dmarc.gardensuite.in`
- DKIM selector and signing are not yet known
- SMTP, IMAP, TLS, username, and password access are not yet verified

Do not send external outreach until SPF, DKIM, DMARC, and mailbox access are tested.

## Recommended sender

Use a named domain mailbox, for example:

`kaushik@gardensuite.in`

Display name:

`Kaushik Majumder | Sarbani Associates`

The exact address must already exist or be created by the domain mail administrator. Do not use a fake name, `noreply`, or an unmonitored address.

## Information needed from the mail server

- SMTP hostname
- SMTP port
- SMTP encryption, normally TLS or SSL
- IMAP hostname
- IMAP port
- IMAP encryption
- full mailbox username
- app password or separate outreach password
- sending limit imposed by the mail server
- DKIM selector and DNS record

Use an app password if the server supports it. Do not put the mailbox password into repository files.

## Domain authentication

Before connection:

- [ ] Add one correct SPF record for the current sending server
- [ ] Enable DKIM signing and publish its DNS record
- [ ] Add DMARC in monitor mode
- [ ] Confirm the From domain aligns with SPF or DKIM
- [ ] Confirm the mail server has valid TLS
- [ ] Confirm the sending IP has correct reverse DNS
- [ ] Send an internal test and inspect the received headers
- [ ] Confirm SPF, DKIM, and DMARC pass

The exact SPF and DKIM values must come from the current mail host. Do not guess them.

## Snov.io connection

1. Create or verify the Sarbani Associates Snov.io account.
2. Open Email Accounts.
3. Select Add email account.
4. Choose Other or custom SMTP.
5. Enter the approved SMTP settings.
6. Enter the IMAP settings for reply tracking.
7. Send the Snov.io connection test.
8. Confirm sent mail appears in the normal domain mailbox.
9. Reply from an internal test inbox.
10. Confirm Snov.io detects the reply and stops the next step.

IMAP is required for reliable reply detection. Snov.io checks incoming replies through IMAP and normally stops the sequence after a reply.

Official reference: [Snov.io reply tracking](https://snov.io/knowledgebase/how-to-track-your-replies/)

## Campaign

Create one campaign:

`GS Attendance Pilot - 2026-01`

Use these steps:

| Step | Timing | Purpose |
|---|---:|---|
| Email 1 | Day 0 | Face-verified attendance for tea gardens |
| Email 2 | Day 5 | Offline field attendance and office review |
| Email 3 | Day 12 | Setup, training, support, and respectful final question |

Use plain text. Do not add attachments. Avoid tracking links. Turn off open and click tracking unless there is an approved test and a custom tracking domain.

## Sending limits

For the pilot:

- maximum 10 new contacts per business day
- maximum 20 pilot contacts total
- one primary contact per estate
- send only during approved Indian business hours
- keep at least several minutes between messages
- do not run another cold campaign from the same mailbox at the same time

Snov.io recommends low volume for SMTP sending. The 20-estate pilot is well below its suggested maximum.

Official reference: [Snov.io SMTP sending guidance](https://snov.io/knowledgebase/api-vs-smtp-when-to-choose-which-connection/)

## Required prospect fields

| Field | Required |
|---|---|
| Estate account ID | Yes |
| Estate name | Yes |
| Contact email | Yes |
| Contact name | Preferred |
| Contact role | Yes |
| West Bengal or Assam | Yes |
| Email source | Yes |
| Email verification date | Yes |
| Suppression clear | Yes |
| Approved message version | Yes |

Do not invent missing names or estate facts. Use an approved neutral greeting when needed.

## Stop rules

Stop later emails when:

- the recipient replies
- the recipient unsubscribes
- the recipient asks to stop
- the email bounces
- the estate or contact becomes suppressed
- the campaign is manually paused
- a complaint is received

Snov.io's Do-not-email list is useful, but the master GardenSuite suppression register remains the permanent record.

## Internal dry run

- [ ] Use team-controlled inboxes only
- [ ] Test the approved attendance sequence
- [ ] Test every contact field and fallback
- [ ] Confirm From, reply-to, and signature
- [ ] Confirm SPF, DKIM, and DMARC pass in received headers
- [ ] Confirm reply detection through IMAP
- [ ] Confirm a reply stops later steps
- [ ] Confirm unsubscribe stops later steps
- [ ] Confirm bounce handling
- [ ] Confirm Do-not-email handling
- [ ] Confirm manual pause works
- [ ] Confirm activity is recorded against the correct estate

## Acceptance criteria

The setup passes only when:

- the domain mailbox sends and receives through secure SMTP/IMAP
- SPF, DKIM, and DMARC pass
- the campaign uses approved copy
- no suppressed contact can enter
- replies, unsubscribes, and bounces stop later emails
- every send and outcome appears in the account tracker
- the 20-estate cap and daily limit are enforced
- no external contact is enrolled before written launch approval

## Cost

Start with the renewable Snov.io Trial. No Google Workspace subscription is needed.

Do not upgrade until the 20-estate pilot is complete or a required feature is unavailable on Trial.

No Snov.io account, mailbox connection, prospect, or live campaign was created by this document.
