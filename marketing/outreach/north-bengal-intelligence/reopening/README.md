# North Bengal Closed and Reopening Tea Gardens

Research date: 2026-09-27. Public news sources only. Research only: nothing here is a send list.

File: `reopening_gardens.csv` (42 rows, one row per garden).

## Why this matters now

- 2026-09-25: Labour Minister Arjun Singh gave closed gardens a deadline to reopen. Millennium Post and TOI reported 7 days, Economic Times reported 10 days. The state counts 21 fully closed and 11 partly closed gardens.
- A task force (Tea Board, Labour, Land and Land Reforms, Commerce and Industry) will look for new operators if owners do not return.
- New operators must clear PF and worker dues first. The state says Rs 100 crore of PF has already been recovered.
- Every new or returning operator will have to prove clean payroll, PF deposits and wage records quickly. That is the GardenSuite pitch.

## Status values

- `closed` - shut, no confirmed reopening date.
- `reopening_announced` - reopening date or new investor announced, actual restart not confirmed.
- `reopened` - latest source says work restarted.
- `reopened_then_closed_again` - reopened after 2023, then shut again.
- `unclear` - sources conflict or are too old.

Row counts: reopened 23, unclear 9, closed 4, reopened_then_closed_again 4, reopening_announced 2.

## Confidence rules

- `high` - two independent sources agree, latest source within about 12 months.
- `medium` - one good source, or two sources with a small conflict.
- `low` - one old or indirect source. Recheck before any action.
- Blank cells mean the fact was not found. Nothing was guessed.
- Operating status goes stale after 30 days. Recheck status before contact.

## Excluded as leads

These are existing GardenSuite clients. They are in the CSV for context only:

- Debpara (Banarhat) - stalemate since Sep 2025.
- Longview (Kurseong) - owner arrested on EPFO complaint in July 2026.
- Chandan (Chopra) - work suspended June 2024.
- Subhasini - named in a 2026 EPFO FIR. Not added as a row.

## Top 10 shortlist

1. Raipur (Jalpaiguri Sadar, about 665 workers) - NCLT ruled for Sumit Khanna's revival proposal. A new operator starting from zero needs attendance, payroll and PF systems from the first day.
2. Kalchini and Raimatang (Alipurduar, about 3,260 workers) - Buxa Dooars Tea Company is under insolvency. Form G for bidders was published on 2026-08-11. The winning bidder must show lenders and the state clean records.
3. Redbank, Surendranagar and Dharanipur (Banarhat, about 2,500 workers) - reopened Nov 2025 under Ritwik Bhattacharya, who also runs Bamandanga-Tondu. There are four gardens under one operator.
4. Panighatta, Pandam and Kalej Valley (Darjeeling) - reopened in 2025 under the Bagaria Group. The group runs several gardens.
5. Dheklapara (Madarihat, 548 ha) - reopened April 2025 by Rajesh Agarwal. Starting at 250 workers and growing to 600+, with large replanting.
6. Bharnobari (Kalchini, about 1,854 workers) - reopened March 2026. It closed over PF that was deducted but not deposited. Leads with PF proof.
7. Ambari (Banarhat, about 1,200 workers) - shut again in Dec 2025. Workers do not trust the agreement. Transparent wage records could help any reopening deal.
8. Bandapani (Madarihat, about 1,140 workers) - closed March 2025. FAWLOI process started. A candidate for a task force handover.
9. Madhu, Lankapara and Ramjhora (Alipurduar) - long closed. Watch for task force investor announcements.
10. Toorsa, Turturi and Dalsingpara (Alipurduar) - fragile reopenings with a history of wage and bonus disputes.

## Who is the buyer

- The promoter or director of the new operating company. It is often a Siliguri or Kolkata business family.
- For insolvency cases, the Resolution Applicant, not the Resolution Professional.
- The garden manager hired at reopening, once named.
- Do not collect personal phone numbers or union leaders' contacts. Use company contacts found through the dooars-intelligence workflow.

## How to spot new reopenings

- Millennium Post search: `https://www.millenniumpost.in/search?search=tea+garden+reopen`
- Telegraph topic pages: `https://www.telegraphindia.com/topic/tea-garden` (blocks scripts, open in a browser)
- Siliguri Times API: `https://siliguritimes.com/wp-json/wp/v2/posts?search=tea+garden`
- Uttarbanga Sambad (Bengali) for early suspension-of-work notices.
- NCLT Form G notices for tea companies under insolvency.
- FAWLOI lists from the Labour Department. A garden on this list is closed.
- Tripartite meetings at Shramik Bhavan, Dagapur (Siliguri) and Uttarkanya.

## Key policy points

- 2026-09-25 deadline meeting: https://www.millenniumpost.in/bengal/bengal-sets-7-day-deadline-to-reopen-closed-tea-gardens-677413
- Same meeting, 10-day version: https://economictimes.indiatimes.com/news/india/west-bengal-orders-21-closed-tea-gardens-to-reopen-in-10-days/articleshow/134489865.cms
- Telegraph report: https://www.telegraphindia.com/west-bengal/one-week-deadline-for-tea-gardens-in-north-bengal-to-clear-dues-resume-work-arjun-singh-prnt/cid/2181747
- July 2026 FIR warning for PF and gratuity defaulters: https://www.millenniumpost.in/bengal/clear-unpaid-dues-or-face-firs-min-to-tea-gardens-667948
- August 2026: Labour Dept legal team for NCLT cases, no lease renewal for PF defaulters: https://www.millenniumpost.in/bengal/arjun-singh-orders-a-major-overhaul-of-tea-gardens-transport-infra-671008
- EPFO FIRs against 9 gardens: https://www.millenniumpost.in/bengal/centre-owned-tea-gardens-under-epfo-scanner-for-rs-3-cr-pf-dues-677133
- Tea tourism land (30%) under review, no resorts on closed garden land: https://www.millenniumpost.in/bengal/no-resorts-on-closed-tea-garden-land-says-mp-raju-bista-662612
- FAWLOI for Kalchini, Raimatang, Bandapani: https://www.millenniumpost.in/bengal/bengal-begins-fawloi-process-for-4400-tea-garden-workers-677253
- 2025 wave: 15 gardens reopened Jan-Jun 2025 under the earlier state SOP: https://timesofindia.indiatimes.com/city/kolkata/15-tea-gardens-reopen-in-darjeeling-alipurduar/articleshow/121838036.cms

## Known gaps

- The state's list of 21 closed and 11 partly closed gardens was not published by name.
- Most new operator company names are not in the news. Get them from MCA before any ownership decision.
- Hectares are missing for most rows.
- Some reopenings are from 2024-2025 news and need a fresh status check.
- Worker counts differ between sources. The CSV uses the most specific figure and notes conflicts.
