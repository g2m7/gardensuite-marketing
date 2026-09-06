# Snov and mailbox setup

Implementation specification, not a record that these settings are already applied. Owner: Kaushik.

## Sender and authentication

Use the full mailbox kaushik@getgardensuite.in. SMTP and IMAP username are that full address. SMTP: mail.spacemail.com, SSL, 465. IMAP: mail.spacemail.com, SSL, 993. Keep credentials in the provider/approved password store, never in this repository.

Public DNS was present on 5 September. Do not add a second SPF record or reset working DKIM. Check one actual controlled message for SPF, DKIM and DMARC pass and the correct From/Reply-To. The existing p=none DMARC policy can remain during this pilot; changing it is not a prerequisite.

## Sending configuration

| Control | Setting |
| --- | --- |
| Campaign | GS Attendance Owner Pilot - 2026-09 |
| From name | Kaushik Majumder, GardenSuite |
| Sender | kaushik@getgardensuite.in |
| Timezone | Asia/Calcutta or equivalent Asia/Kolkata |
| Days | Monday-Friday |
| Window | 09:30-16:30 India time |
| New estates | Up to four per sending day; twenty total |
| Automated messages | Snov sender cap 12 per day, including follow-ups and campaign tests |
| Total mailbox traffic | Planning ceiling 15 per day including manual replies; reserve three slots for replies |
| Interval | 600 seconds minimum between automated emails |
| Open/click tracking | Off for this pilot |
| Follow-ups | Wait five days after email 1; wait seven days after actual email 2 |
| Exit | Any reply, opt-out, hard bounce, manual stop or account suppression |
| Warm-up | Pause on 9 September before prospect sending; do not resume during this pilot |

The three reply slots are a reserve, not a limit on useful customer service. If more replies need sending, reduce or pause that day's automated allowance. Do not ignore a buyer to preserve an arbitrary total. Check all traffic; a campaign cap may not include messages sent directly in webmail or other systems.

Do not assume a total message cap limits new prospects. If the current Snov UI cannot enforce a separate new-prospect maximum, add only that day's cleared contacts to the active sequence. Keep the rest in an approved holding list outside the active campaign. Never activate all twenty with a twelve-message cap and assume only four first emails will go out.

## Calendar

Dates below assume each cohort sends in its intended window, no replies/bounces and delay timing as described. Actual delays/queues can push a step later; never pull it forward to catch up.

| Cohort | Initial messages | First send | Second message | Final message |
| --- | --- | --- | --- | --- |
| A | 4 | Thu 10 Sep | Tue 15 Sep | Tue 22 Sep |
| B | 4 | Fri 11 Sep | Wed 16 Sep | Wed 23 Sep |
| C | 4 | Mon 14 Sep | Mon 21 Sep | Mon 28 Sep |
| D | 4 | Tue 15 Sep | Mon 21 Sep | Mon 28 Sep |
| E | 4 | Wed 16 Sep | Mon 21 Sep | Mon 28 Sep |

Potential automated totals: 4 on 10 Sep, 4 on 11 Sep, 4 on 14 Sep, 8 on 15 Sep, 8 on 16 Sep, 12 on 21 Sep, 4 on 22 Sep, 4 on 23 Sep, 12 on 28 Sep. Maximum 60 across the full sequence, usually fewer because replies and stops exit it. The first 20 messages take five working days; the whole sequence does not finish in five days.

If readiness slips, shift the first-send dates to the next five working days and recalculate overlap. Do not start a second cohort of twenty automatically. Review by 30 September if these dates hold.

## Data and import

Current research source: marketing/outreach/sep-2026-pilot/prospects.csv. The pipeline's check command is read-only. Export generates an allowlist and does not send.

1. Complete estate fit, named buyer, public association, Snov Valid and current suppression checks for each intended recipient.
2. Accept a supported scale proxy where exact workforce is unavailable. Retain the minimum area and independent-estate rules.
3. Review the final account history and record approval. Every recipient must have their own evidence, even when a single packet approves a batch.
4. Export only approved rows. Keep research-only rows out of Snov campaigns.
5. Preview every message variable. Map estate_name explicitly; do not let a wrong company name appear.
6. Recheck responses/suppression before adding each day's group.

The local full-list launchReady flag requires twenty eligible rows. It does not prevent export of a smaller eligible subset. It must not be used to justify sending a row that failed a check.

## One controlled end-to-end test

Use a clearly separated test campaign with a controlled inbox. Check authentication, sender identity, mobile readability and links. Send a reply and verify no later step remains scheduled. Check the opt-out/stop path and duplicate suppression with test records. If available, check a second provider; unavailable extra inboxes are not a blocker. Keep test contacts out of prospect counts.

Inspect campaign schedule, timezone, current recipient count, message previews and the distinction between holding and active lists. Present the final packet once. Do not activate while merely preparing or inspecting it.

## Incident and resume rules

| Signal | Action | Resume condition |
| --- | --- | --- |
| Positive, neutral or negative reply | Stop that sequence immediately; handle manually | Only an agreed next action |
| Explicit stop / spam complaint / do-not-contact breach | Suppress the relevant contact/account; stop automated pilot for investigation | Root cause fixed, pending recipients checked; owner reviews any serious complaint before further sending |
| One hard bounce | Suppress the address; inspect code and remaining recipient checks before the next batch | Isolated invalid mailbox addressed and remaining batch checks pass; no mandatory extra multi-week pause |
| Second hard bounce in twenty or evidence of widespread bad data | Pause pilot and reverify the remaining list/source | Data problem fixed and documented |
| Authentication failure or provider enforcement warning | Pause affected sending immediately | Configuration/provider issue resolved; no bypass through another domain |
| Temporary deferral / mailbox full | Let the provider handle normal retry; do not add manual duplicates | Normal delivery resumes, or investigate a recurring pattern |
| Seed message in Spam | Inspect headers, content and provider response; repeat one controlled test after correction | Cause addressed or explained; repeated Spam placement pauses expansion |
| No replies | Check audience, address association, delivery evidence and offer | Finish/review the experiment; do not add unsolicited channels automatically |

All hard bounces remain suppressed. A bounce is not permission to guess another address. An account-level refusal applies across its linked contacts. Preserve accepted provider-risk decisions without ignoring new enforcement evidence.

## Acceptance criteria

- [ ] Actual settings match the table, including separate control of new contacts.
- [ ] Core end-to-end test passes once; failures are fixed and retested only where relevant.
- [ ] No secrets are stored in code or plans.
- [ ] Each batch has eligible recipients and recorded authorization.
- [ ] Warm-up is paused before first prospect mail.
- [ ] Follow-up dates and busiest days fit the sender allowance.
- [ ] Operator knows how to stop the sequence and records incident resolution.
