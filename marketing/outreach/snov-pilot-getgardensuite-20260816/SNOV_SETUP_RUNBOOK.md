# Spacemail to Snov.io Setup Runbook

Status: CONFIGURE AND TEST ONLY - DO NOT START CAMPAIGN

## 1. Resolve the sender identity first

Open Spacemail Manager and inspect the account behind `kaushik@getgardensuite.in`.

### If it is a full mailbox

Use `kaushik@getgardensuite.in` as both the From address and the SMTP/IMAP username.

### If it is an alias

Record the full primary mailbox address that owns the alias. An alias can send and receive, but it cannot be used to log in. In Snov.io:

- From email: `kaushik@getgardensuite.in`
- SMTP/IMAP username: the full primary Spacemail mailbox address
- Password: the primary mailbox password
- Enable `Use different account name`

Never save the mailbox password, Snov.io password, API key, recovery code, or session token in this repository or workbook.

Before Snov.io, send one normal email from Spacemail webmail as Kaushik, reply to it from a trusted external inbox, and confirm that the reply reaches the primary mailbox.

## 2. Finish DNS authentication

The 2026-08-16 live check found:

| Check | Live result |
|---|---|
| MX | `mx1.spacemail.com` and `mx2.spacemail.com` |
| SPF | `v=spf1 include:spf.spacemail.com ~all` |
| DKIM | Present at `spacemail._domainkey.getgardensuite.in` |
| DMARC | Missing |
| Website redirect | `getgardensuite.in` redirects to `https://gardensuite.in` |

Do not add another SPF record. A domain must have only one SPF TXT record.

### Add DMARC in Spaceship DNS

1. In Spacemail Manager, create `dmarc@getgardensuite.in` as an alias or monitored mailbox.
2. Open Spaceship Domain List.
3. Select `getgardensuite.in` and open DNS records.
4. Add this record:

| Field | Value |
|---|---|
| Type | `TXT` |
| Host | `_dmarc` |
| Value | `v=DMARC1; p=none; rua=mailto:dmarc@getgardensuite.in; adkim=r; aspf=r; pct=100` |
| TTL | `3600` or the provider default |

5. Save and wait for DNS propagation.
6. Verify with `dig +short TXT _dmarc.getgardensuite.in` or a recognised DMARC checker.
7. Keep `p=none` during the pilot. Do not change to `quarantine` or `reject` until reports have been reviewed and every legitimate sender is aligned.

DNS presence is not enough. After connecting Snov.io, inspect an actual test message and confirm `SPF=pass`, `DKIM=pass`, and `DMARC=pass` in the received message headers.

## 3. Ask Spacemail for written permission

Spacemail's current policy allows only controlled warm-up with legitimate or opt-in recipients and prohibits automated warm-up networks. It also prohibits unsolicited mass email. Because Snov.io sends through Spacemail's servers, Spacemail rules still apply.

Send the text in `SPACEMAIL_PERMISSION_REQUEST.txt` to Spacemail support. Save their reply outside this public project or record only the approval date and ticket number in the workbook.

Until permission is received:

- Snov.io automated warm-up: OFF
- Snov.io campaign: OFF
- Internal test emails to controlled inboxes: allowed
- Legitimate manual business email to known contacts: allowed

## 4. Connect the mailbox in Snov.io

In Snov.io:

1. Go to `Email Accounts`.
2. Click `Add email account`.
3. Choose `Other (SMTP)`.
4. Enter the sender details.

### SMTP settings

| Snov.io field | Value |
|---|---|
| From name | `Kaushik Majumder | GardenSuite` |
| From email | `kaushik@getgardensuite.in` |
| Use different account name | Turn on only when Kaushik is an alias |
| Username | Full primary mailbox address |
| Password | Primary mailbox password |
| Host | `mail.spacemail.com` |
| Port | `465` |
| Encryption | `SSL` |

### IMAP settings

| Snov.io field | Value |
|---|---|
| Username | Full primary mailbox address |
| Password | Primary mailbox password |
| Host | `
` |
| Port | `993` |
| Encryption | `SSL` |

If replies are delivered to another mailbox, enable `I receive replies to an email account that's not my From email` and enter the receiving mailbox's IMAP details.

5. Click `Check connection`.
6. Confirm that Snov.io's test arrives.
7. Confirm that the sent test appears in the Spacemail Sent folder.
8. Reply from the test inbox and confirm Snov.io detects the reply.
9. If reply detection fails, stop. Check the alias destination and IMAP login before continuing.

## 5. Set conservative account controls

In the connected email account settings:

| Setting | Pilot value |
|---|---|
| Messages per day | `15` total, including follow-ups |
| Delay between emails | `300-600 seconds` |
| Open tracking | Off |
| Click tracking | Off |
| Automated warm-up | Off for Spacemail unless written permission is received |

Spacemail's published 20-per-hour trial and 500-per-hour paid limits are technical caps, not safe targets for a new domain. Do not use them as campaign volume goals.

## 6. Create the Snov.io fields

Snov.io does support double-curly variables. Insert them from the Variable menu so Snov.io validates them.

Default fields used:

- `{{first_name}}`
- `{{last_name}}`
- `{{company_name}}`
- `{{position}}`

Create these custom prospect fields before import:

- `estate_name` -> `{{estate_name}}`
- `estate_account_id` -> `{{estate_account_id}}`
- `region` -> `{{region}}`
- `hectares` -> `{{hectares}}`
- `ownership_review` -> `{{ownership_review}}`

Use `Preview and test` on every email. A red variable label or blank preview is a stop condition.

## 7. Verify and approve the pilot list

Use the workbook as the canonical tracker.

For every contact:

1. Confirm the estate is in West Bengal or Assam.
2. Confirm the estate is at least 50 hectares using the recorded source.
3. Decide whether the owner is excluded under the approved corporate-group rule.
4. Confirm the person and target role are current.
5. Run the address through Snov.io Email Verifier.
6. For this first pilot, keep only `Valid` addresses. Do not send to Invalid, Unknown, Unverifiable, or Catch-all addresses.
7. Check the master suppression register.
8. Record the verification date, suppression check date, and reviewer.
9. Change `Qualification` to `Ready` only after every check passes.

The supplied Snov staging sheet intentionally marks every row `Import eligible = No`. Do not override this until the checks above are recorded.

## 8. Import into Snov.io

1. Filter the workbook's `Snov Import` sheet to `Import eligible = Yes`.
2. Copy only those rows into a new CSV export.
3. In Snov.io, create a list named `GS Pilot 2026-09 - Approved Only`.
4. Import the CSV.
5. Map each column carefully. Map the estate to both `company_name` and `estate_name`.
6. Select update existing records, not create duplicates, if Snov.io identifies an existing email.
7. Confirm the imported count equals the approved count. It must never exceed 20 for this pilot.
8. Spot-check the first five records and preview all variables.

Do not upload the 20 research rows as campaign recipients merely to “prepare” the campaign. Import only approved rows.

## 9. Build the campaign

Create a campaign named `GS Attendance Trust Pilot - 2026-09`.

Sequence:

1. Email 1 on day 0
2. Delay 5 days
3. Email 2 in the same thread
4. Delay 7 days
5. Email 3 in the same thread
6. End

Use the exact approved copy in `PILOT_EMAIL_SEQUENCE.md`.

Campaign settings:

- Sender: `Kaushik Majumder | GardenSuite <kaushik@getgardensuite.in>`
- Schedule: Tuesday to Thursday, 9:30 AM to 11:30 AM and 2:00 PM to 4:00 PM, India time
- New prospects: maximum 5 per day
- Total sender messages: maximum 15 per day, including follow-ups and manual replies
- Stop all later steps after any reply
- No open tracking
- No click tracking
- No attachments
- No images or logo
- One website link in the signature
- Reply-to monitored through IMAP
- Do not automatically start WhatsApp after email silence

Keep the campaign in draft.

## 10. Test before any external contact

Use at least three controlled test inboxes from different providers when available.

For each test:

- Check From name and From address.
- Check that the reply goes to the monitored mailbox.
- Check Snov.io reply detection and sequence stop.
- Check SPF, DKIM, and DMARC in full headers.
- Check Inbox, Promotions, and Spam placement.
- Check mobile and desktop plain-text layout.
- Check that `{{first_name}}` and `{{estate_name}}` resolve correctly.
- Check that the website link opens `https://gardensuite.in`.
- Check that “Reply stop” is visible.

If any test fails, keep the campaign off and fix the cause.

## 11. Launch gate

Do not press Start until all are Yes:

- [ ] Spacemail confirms the intended Snov.io use is permitted.
- [ ] Sender is confirmed as a real mailbox or correctly configured alias.
- [ ] SPF, DKIM, and DMARC pass on test messages.
- [ ] The domain has at least 30 days of legitimate history.
- [ ] Manual warm-up is complete with no deliverability problem.
- [ ] Corporate exclusion rule is approved.
- [ ] Cadence and message copy are approved.
- [ ] Support wording and response commitments are approved.
- [ ] Named outreach owner and demo owner are recorded.
- [ ] Every email is Snov Valid.
- [ ] Every estate and role is current.
- [ ] Suppression is clear immediately before import.
- [ ] Internal test replies stop the sequence.
- [ ] Approved recipient count is 20 or fewer.

Any hard bounce, complaint, or suppression failure pauses the entire pilot for review.
