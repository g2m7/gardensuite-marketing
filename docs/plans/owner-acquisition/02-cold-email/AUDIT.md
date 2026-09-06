# Email plan audit - 5 September 2026

## Verdict

The five-day first-send proposal is reasonable as a small test. The existing dated action plan already used five working days. The important corrections are contradictory setup instructions, excess procedural gates and a first email centred on references rather than the smaller owner offer.

Four initial emails per day is our planning choice. No source guarantees Inbox placement at this rate. The domain's registration was recorded as 9 August; the planned 10 September start is 32 days later, so an additional age wait does not solve the present readiness gaps.

## Evidence inspected

- CURRENT_STRATEGY.md and ACTION_PLAN_2026-09-08.md: authoritative decisions and dated schedule.
- The old Snov setup runbook and email sequence: contain stale instructions and draft copy.
- Local pipeline source and a read-only check at 2026-09-05 15:27 UTC: 25 records, zero eligible. All 25 lacked Snov Valid and final suppression/owner approval; 21 lacked a syntactically valid email. Research was being updated concurrently, so this is a dated snapshot.
- Live public DNS on 5 September: Spacemail MX, one SPF record, DKIM and DMARC present. DMARC is p=none. DNS presence does not prove a new message authenticates or lands in Inbox.
- Delivered SPF/DKIM/DMARC pass and the working Snov connection were owner-confirmed on 30 August. This audit did not log into Snov or send a new test, so current campaign status and reply detection are not newly verified.

## Findings and decisions

| Finding | Assessment | Plan change |
| --- | --- | --- |
| 3/3/4/5/5 first sends | Already five working days; not a long rollout | Simplify to four per day |
| Mandatory 30-day history | Age is a risk signal, not a universal receiving-server waiting rule | No extra waiting period after readiness; recorded launch is already day 32 |
| Tuesday-Thursday send schedule | Conflicts with Friday/Monday launch batches | Monday-Friday, India business hours |
| Old guide says DMARC missing | Stale after August setup; DNS rechecked today | Inspect rather than recreate DNS |
| Broken IMAP Host entry | Real setup defect | mail.spacemail.com, SSL 993 |
| Old guide reopens mailbox/alias uncertainty | Full mailbox confirmed on 30 August | Reuse recorded identity, inspect only if connection fails |
| Written provider permission required again | Superseded by owner's accepted risk decision | Do not reopen as a new approval gate |
| All 20 plus five backups needed before any first send | Unnecessary dependency for a small cleared batch | Start an authorized cleared subset, up to four new recipients daily |
| Exact worker-count proof treated as essential | Current rule permits a reliable scale proxy | Use credible fit evidence; do not infer size merely from fame or website absence |
| Twenty separate personalized opening lines | Not necessary for this test | One relevant sequence with verified name/estate |
| First email promises nearest permitted reference | Creates friction when names cannot be shared | Lead with attendance and daily report; references after interest |
| Third email lists detailed support channels/commitments | Longer than needed; documented scope is incomplete | Keep support wording short and subject to actual quote |
| Any hard bounce means an undefined whole-pilot halt | Inspection is useful; indefinite delay is not | Apply the explicit incident/resume procedure in Setup |
| Gmail bulk thresholds treated as a launch issue | This pilot is far below the bulk-sender threshold | Keep good authentication and easy opt-out without inventing bulk-scale work |
| Pipeline launchReady requires exactly 20 | Measures full-list readiness, not minimum batch readiness | Use eligible rows for an authorized batch; do not alter the research script in this planning task |
| Source-supported Partner title rejected by role matching | Possible implementation mismatch with owner-level partners | Verify buying role and deliberately extend matching in a future focused change; never relabel just to pass |

## What the external sources establish

Google distinguishes all-sender requirements from additional bulk-sender requirements around 5,000 daily Gmail messages. Authentication and accurate identity matter; delivery is not promised merely because a sender complies. Our existing SPF, DKIM and DMARC baseline is sensible at this volume. [Google sender guidance](https://support.google.com/a/answer/81126)

Spaceship recommends gradual genuine sending and discusses domain age. It also expressly prohibits automated warm-up networks and unsolicited commercial email. Twenty spaced emails do not create a policy exemption. The owner has already accepted this provider risk; this plan preserves that decision and does not represent it as provider approval. [Spaceship guidance](https://www.spaceship.com/knowledgebase/warm-up-domain-email-deliverability/), [AUP](https://www.spaceship.com/legal/hosting-aup/)

Snov supports campaign schedules, delays and reply-based sequence exits. Its scheduling documentation says the sending window takes precedence over a delay. The follow-up table therefore moves weekend due dates into the next sending window and bases the final delay on the actual second message. Verify the final scheduled times in Snov. [Schedules](https://snov.io/knowledgebase/how-to-schedule-your-drip-campaign/), [Delays](https://snov.io/knowledgebase/how-to-add-a-delay-between-follow-up-emails/)

Spacemail documents SMTP and IMAP on mail.spacemail.com, using SSL ports 465 and 993. [Client settings](https://www.spaceship.com/en-GB/knowledgebase/connect-spacemail-to-email-client/)

## Necessary safeguards versus unnecessary work

Keep recipient relevance, correct estate association, rejection/suppression checks, Snov Valid, a monitored reply path, truthful copy and response to real delivery failures.

Do not delay solely for a warm-up score, a populated Postmaster dashboard, a large backup list, perfect workforce research, a second provider-permission request, a new mailbox purchase or three different available test providers. One controlled receiver can verify the core path; a second provider is useful if available. Seed tests are indicative, not guarantees for every recipient.

At this sample size, a single complaint is material. Do not convert one out of twenty into a claimed Gmail Postmaster spam rate: the measurement population is different. Record raw incident counts and their causes.

## Completion

- [x] Read existing plan and identify conflicts.
- [x] Check public DNS and current local eligibility without changing lead data.
- [x] Verify primary provider/receiver sources.
- [x] Prepare replacement setup, message sequence and schedule.
- [ ] Verify actual Snov settings and a new end-to-end controlled test immediately before launch.
- [ ] Complete contact preparation and authorize the final sending packet.
