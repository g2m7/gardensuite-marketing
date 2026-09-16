# September 2026 Pilot Daily Status

Last material run: 2026-09-14 at 16:57 IST

Last live campaign check: 2026-09-14 at 16:57 IST

## Counts

- Candidates checked: 34
- Fully eligible: 9
- Blocked: 25
- Snov export rows: 9
- External validation import: 20 matched addresses, 17 safe/deliverable and 3 invalid. The 17 safe/deliverable results are accepted for this pilot under the owner's 8 September decision.
- Existing live Snov recipients: 9
- Staged Snov draft recipients: 0
- First emails sent and delivered: 9
- Second emails sent and delivered: 3
- Total sent emails: 12
- Recorded bounces: 0

## Live campaign

- Campaign: `GardenSuite Assam attendance pilot - Sep 2026`
- Snov campaign ID: `3135559`
- Status: Paused by the readiness loop on 14 September after Snov reported an IMAP authentication failure
- Sender: `kaushik@getgardensuite.in`
- Warm-up: Paused, Protection off
- Mailbox cap: 12 emails per day
- Sender delay: random 600 to 900 seconds
- Schedule: Monday to Friday, 09:00 to 18:00, Asia/Kolkata
- Sequence: initial email, five-day delay, follow-up, seven-day delay, final follow-up
- Reply stop, Valid-only checks, DNC list and one-click unsubscribe are active

The exact launch evidence and copy are in [LAUNCH_2026-09-05.md](LAUNCH_2026-09-05.md).

Snov showed 9 recipients contacted, 12 emails delivered and 0 bounces at the 14 September check. Snov also reported that reply detection is off because IMAP authentication failed. The displayed reply count is not reliable while IMAP is disconnected. The readiness loop paused the campaign so no further follow-ups run until the mailbox connection is repaired and checked.

Snov's warm-up page separately shows the mailbox warm-up as Paused with Protection off and 0 of 3 messages sent today.

A second campaign draft now exists for the external-valid list:

- Draft campaign ID: `3137800`
- Prospect list ID: `40982250`
- Draft status: Draft
- List status: Empty, 0 prospects

The draft cannot send until its list is populated. The preparation loop did not import contacts or activate either campaign.

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
- Verified Sookerating Tea Estate against all pilot gates: 189.28 ha in Tinsukia, active ATEPFO garden (code E-138) and BCP member. Independently managed unlisted private company (CIN U01132AS1998PTC005376) under MD Kanhaiya Agarwalla. Published contact@sookerating.com verified Valid in Snov. Snov DNC and legacy WhatsApp tracker checked on 7 September with zero entries (clear). Account approved for Snov import (campaign 3135559, list 40962869).
- Completed corporate group review for Prabhat Tea Estate: Directors Prabhudayal Beriwal, Rajesh Beriwal and Jay Beriwal Prakash link this estate to Lengrai Tea Ltd (CIN U01132WB1988PLC044013, a public limited company) and Singlo tea LLPs. Multi-estate group with public-company linkage fails the independent estate rule. Corporate review set to Fail. Legacy WhatsApp tracker row 35 confirmed Delivered/Open with no negative outcome.
- Completed corporate group review for Satyanarayan Tea Estate: Directors Vijay Kumar Kedia and Mohit Mittal share common directorship with Limtex Limited (CIN U01400WB2011PLC171471, a public company) and other group entities; contact email from a 2021 job ad lacks recent estate confirmation. Corporate review set to Fail. Legacy WhatsApp tracker row 41 confirmed Delivered/Open with no negative outcome.
- Rechecked old published addresses for Sankar and Padumani in Snov on 7 September. The two estate addresses returned Invalid; Sankar's alternate tinsukiaoffice@chamong.com address also returned Invalid. Both remain blocked needing a valid published business email.
- Rechecked published addresses for Gangabari, Rumaigabhoru and Ghooronia in Snov on 7 September. All three returned yellow Unverifiable (Risky); all three remain held out of the Valid-only pilot.
- Found a published Goneshbari address linked to the tea company. Its Snov check remained In progress after repeated polling, so it was not added to prospects.csv or the campaign.
- Gillapukhri, Segunbari and Ananda Bag confirmed excluded for public-company status. Amulguri, Mothola and Longboi confirmed excluded for active sales discussions.
- Ran pipeline check: 25 rows checked, 4 eligible (Baghbari, Satispur, Sadasiva, Sookerating) and 21 blocked. Exported eligible list to snov-import.csv (4 contacts).
- Sourced and analyzed 63 mid-tier tea estates in Dibrugarh district (373 to 2000 Bigha / 50 to 260 ha) from the official revenue directory, cross-referenced with ATEPFO registries and legacy CRM records.
- Discovered official MCA-registered business emails and passed corporate reviews for three near-ready accounts: Devendra (bhagat_tsk@rediffmail.com), Kaliapani (svyas.jainex@gmail.com), and Chandmari (aakashassociates22@gmail.com).
- Confirmed single-proprietor and family partnership independence for Amulyabari (Pratul Kumar Phukan) and Pipratoli (Bishmile Industry / Aditya Vikram Agarwal), advancing both corporate reviews to Pass.
- Researched, qualified, and added seven new candidate estates: Phukanbari (phukenbari@gmail.com, 154.23 ha), L. K. Tea (realassamteaindustries@gmail.com, 72.24 ha), Udalguri (theutegarden@rediffmail.com, 213.50 ha), Sarojini (sarojiniteaestate@yahoo.com, 133.87 ha), Ghograjan (info@ghograjan.com, 148.87 ha), Durgapur (durgapurtea@mail.com, 80.91 ha), and Brindaban (Kishore Agarwal, E-258).
- Screened out six estates: Bipinbag (duplicate buying centre under Sudip Chandra Bagchi, already contacted via Satispur), Anandabari (Saharia Group), Duliabam (Amarawati Tea Co. / Halmari group), Santi (Dhunseri Tea conglomerate), Moud (Lohia / Chamong group), and Rukong (amalgamated / merged).
- Ran pipeline check: 32 rows checked, 4 eligible and 28 blocked. 9 candidate accounts have passed corporate review and have valid official business emails, standing ready for Snov email verification. Exported snov-import.csv with exactly 4 cleared rows.
- Imported the owner-provided OrbiSearch validation file on 2026-09-08. All 20 addresses matched prospect records: 17 were marked safe/deliverable and 3 invalid. Recorded the external result, substatus, confidence, date and source in `prospects.csv`; no `snov_status` value was changed.
- Applied the owner's 8 September validation decision. The pipeline now accepts a dated OrbiSearch `safe` and `deliverable` result while keeping Snov and external validation as separate fields.
- Ran the pipeline tests, check and export. All five tests passed. The tracker has 32 accounts, 13 eligible accounts and 19 blocked accounts. The Snov import contains exactly the 13 eligible rows.
- Checked Snov at 17:31 IST. Campaign `3135559` remains paused with 3 sent, 0 replies and 0 bounces. Draft campaign `3137800` exists, but list `40982250` is empty.
- Reconciled all candidate accounts against the legacy Excel tracker again, including spelling variants. Ghooronia, Phukanbari, Sarojini and Ghograjan each have an open `Negotiation` record. Durgapur has an open negotiation with a call pending. These five accounts are now marked as active sales discussions and cannot enter the cold-email allowlist.
- Regenerated the pipeline after the correction. The tracker has 32 accounts, 9 eligible accounts and 23 blocked accounts. The Snov import contains exactly the 9 eligible rows. No contact was imported and no campaign setting was changed.
- Screened additional replacement candidates from public records. Helenbari needs current company-class confirmation. Bochapathar, Nandanban and Kailashpur share one buying centre with ownership complications. Khemani-linked estates overlap an active sales buying centre. Kayanibari is below the 50-hectare floor. Romai and Tarajan fail the public-company or large-group rule. Mankhowa remains a research candidate but has no verified published business email yet.
- Recorded owner's 11 September Snov.io individual email verification results: Devendra (`bhagat_tsk@rediffmail.com`), Kaliapani (`svyas.jainex@gmail.com`), Chandmari (`aakashassociates22@gmail.com`), L. K. Tea (`realassamteaindustries@gmail.com`), and Udalguri (`theutegarden@rediffmail.com`) confirmed Valid (Green); Phukanbari and Ghograjan confirmed Valid (Green) in Snov but remain safely blocked by active CRM negotiations; Sarojini confirmed Unverifiable (Risky); Durgapur confirmed Invalid.
- Updated `prospects.csv` with the Snov results. Ran test suite, pipeline check, and export. All 5 unit tests passed. Cleanly exported 9 eligible leads to `snov-import.csv` with verified personal names and estate variables.
- Checked Khatangpani and Lankashi against the legacy Excel tracker. Exact-name searches returned no rejection or active-sales record for either account.
- Added Khatangpani as a research account with a current named co-owner and 195.65-hectare scale evidence. It remains blocked because no published business email was found and buying authority is unclear among the HUF heirs.
- Added Lankashi as a research account with a named director, a published company inbox and 182.64-hectare scale evidence. It remains blocked until the buying centre is cleared because a director also serves Longboi, which has an open sales negotiation.
- Ran the five pipeline tests, check and export. The tracker now has 34 accounts, 9 eligible accounts and 25 blocked accounts. The Snov import still contains exactly 9 eligible rows. No contact was imported and no campaign setting was changed.
- Reconciled all 34 candidate accounts against the legacy Excel tracker on 14 September. The recorded active negotiations and previous-delivery evidence remain carried forward. No new explicit rejection was found.
- Checked live Snov status. Campaign `3135559` is connected to the 9 eligible accounts and has sent 12 emails: 9 first emails and 3 second emails. Snov reports 0 bounces.
- Snov reported `AUTHENTICATIONFAILED` for IMAP. Reply detection and automatic stop-on-reply are off. The readiness loop paused campaign `3135559` at 16:57 IST. No recipient was added and no email was sent by the loop.
- Confirmed that Snov warm-up remains paused with Protection off.
- Deleted the scheduled readiness heartbeat after its final 14 September run. The campaign remains paused for manual IMAP repair and reply review.

## Remaining work

- Reconnect IMAP for the GardenSuite sender mailbox, run Snov's connection check, and confirm reply detection is active.
- Check the mailbox directly for replies received while Snov could not sync them. Apply reply stops and suppressions before resuming.
- Do not resume campaign `3135559` until both checks pass.

## Current blocked-account pattern

Most blocked accounts still need an accepted estate-associated email, suppression result and owner approval. Several also need corporate group review, a usable operating-scale proxy, or a named qualifying contact. Amulguri, Mothola, Longboi, Ghooronia, Phukanbari, Sarojini, Ghograjan and Durgapur are excluded because the legacy tracker records active sales work. Lankashi is held for a possible overlap with Longboi's buying centre. The three externally invalid addresses remain blocked.

## Next operating action

Do not import the current 9-row export. All 9 accounts are already recipients in campaign `3135559`. Repair the IMAP login, check the mailbox for replies, and confirm Snov reply detection before resuming the campaign. Keep both draft campaigns inactive.
