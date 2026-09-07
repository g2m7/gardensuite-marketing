# September 2026 Pilot Daily Status

Last material run: 2026-09-07 at 20:41 IST

Last live campaign check: 2026-09-07 at 20:30 IST

## Counts

- Candidates checked: 25
- Fully eligible: 3
- Blocked: 22 because one or more account, contact, verification, suppression or approval gates remain open
- Snov export rows: 3
- Live Snov recipients: 3
- First emails sent and delivered on 5 September: 3
- Immediate hard bounces: 0

## Live campaign

- Campaign: `GardenSuite Assam attendance pilot - Sep 2026`
- Snov campaign ID: `3135559`
- Status: Paused
- Sender: `kaushik@getgardensuite.in`
- Warm-up: Paused, Protection off
- Mailbox cap: 12 emails per day
- Sender delay: random 600 to 900 seconds
- Schedule: Monday to Friday, 09:00 to 18:00, Asia/Kolkata
- Sequence: initial email, five-day delay, follow-up, seven-day delay, final follow-up
- Reply stop, Valid-only checks, DNC list and one-click unsubscribe are active

The exact launch evidence and copy are in [LAUNCH_2026-09-05.md](LAUNCH_2026-09-05.md).

Snov showed 3 sent, 0 replies and 0 bounces at the 7 September check. No campaign setting was changed during the check. The pause prevents the scheduled follow-ups from running until the campaign is resumed.

## Recorded progress

- The owner explicitly authorized Snov campaign creation, activation and real prospect sending from 5 September 2026.
- Paused Snov warm-up before the campaign was activated.
- Verified Baghbari, Sadasiva and Satispur addresses as Valid in Snov. Each is publicly associated with the estate or operating company and has a named owner or director.
- Held Ghooronia out because Snov returned `Unverifiable (Risky)`.
- Created the cleared Snov list and added the three eligible contacts with verified first-name and estate variables.
- Created and activated a three-email plain-text sequence with no attachments, open tracking or click tracking.
- Confirmed the rendered first email for Baghbari and Sadasiva used the correct contact and estate names.
- Confirmed all three live first emails sent and delivered on 5 September, with correct rendered name and estate variables and zero immediate bounces.
- Removed the launch-only Saturday window and verified that campaign `3135559` now lists only Monday to Friday, 09:00 to 18:00, Asia/Calcutta.
- Updated current strategy, the cold-email plan, the sequence and the dated launch record to match live state.
- Pipeline check completed with 25 checked, 3 eligible and 22 blocked. The Snov import contains exactly those 3 eligible rows.
- Rechecked the live campaign on 7 September. It is paused with 3 sent, 0 replies and 0 bounces.
- Verified the published Prabhat Tea Estate address in Snov. Snov returned `Valid`, but the account remains blocked by corporate-fit review, suppression review and owner approval.
- Reconciled six research candidates against the legacy Excel tracker before public research. Bijlibari was excluded because the tracker records an active negotiation. Mahabirbari and Hatimara were screened out for group fit. Helenbari, Mulchan Bag and Sadhna remain deferred because a current qualifying decision-maker or ownership link is missing.
- Rechecked the live campaign at 20:30 IST. It remains paused with 3 sent, 0 replies and 0 bounces.
- Found a published Sookerating business address linked to its Tinsukia office and current managing director. Snov returned `Valid` on 7 September, so the address is recorded in `prospects.csv`; the account remains blocked by suppression review and owner approval.
- Rechecked the published Gangabari address in Snov on 7 September. It returned yellow `Unverifiable (Risky)`, so it remains ineligible for the Valid-only pilot.
- Rechecked the published Satyanarayan address in Snov on 7 September. It returned `Valid`, but the address is from a 2021 job listing and current estate association still needs confirmation; corporate-fit, suppression and owner approval also remain open.
- Rechecked old published addresses for Sankar and Padumani in Snov on 7 September. The two estate addresses returned `Invalid`; Sankar's alternate `tinsukiaoffice@chamong.com` address also returned `Invalid`. None can be used, and the rows now record the failed checks.
- Found a published Goneshbari address linked to the tea company. Its Snov check remained `In progress` after repeated polling, so it was not added to `prospects.csv` or the campaign.
- Latest pipeline check passed structurally with 25 rows checked, 3 eligible and 22 blocked. No new contact was added to the live Snov campaign.
- Repaired four saved notes fields that had unquoted commas. The CSV now has exactly 26 columns on every row, all pipeline tests pass, and the Snov export still contains only the 3 eligible accounts.

## Remaining work

- Watch Unibox for replies and stop or suppress immediately when requested.
- Continue research and validation for the remaining pilot accounts. Add no more than four newly cleared estates per working day.
- Do not add an account until every row-level gate passes. A complete 20-account list is not required before another cleared subset is added.

## Current blocked-account pattern

Most blocked accounts still need a Valid estate-associated email, suppression result and owner approval. Several also need corporate group review, a usable operating-scale proxy, or a named qualifying contact. Longboi remains excluded from this pilot because it has an active sales discussion. Ghooronia remains held because its email is Risky.

## Next operating action

The CSV now passes the structural check. Keep the campaign paused until the owner confirms that this is intentional. If the campaign is resumed, Email 2 for the first three recipients is expected in the next allowed window on Friday, 11 September, because the five-day timer matures after Thursday's business-hours window. Email 3 is expected on Friday, 18 September unless a reply stops the sequence. Review replies and bounces before adding another cleared subset. Continue account research without relaxing the current-client, active-discussion, public-company, large-group, rejection, identity, estate-association, suppression or Snov Valid rules.
