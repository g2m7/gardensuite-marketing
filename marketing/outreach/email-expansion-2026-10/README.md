# Email Expansion October 2026 - Candidate List

Goal: grow the cold email list from about 20 estates to 100 or more, split
between North Bengal and Assam. Research only. Nothing here has been sent,
imported into Snov, or contacted.

Private business data: these CSVs contain email addresses. Do not publish
this folder or commit it anywhere public.

## Files

- candidates.csv - 110 estates that passed all exclusion checks
- needs_validation.csv - the 110 emails that still need OrbiSearch or Snov
  validation
- excluded.csv - every estate dropped, with the reason
- already_contacted.csv - the Sept campaign estates, kept out of the new list
- unmapped_validated_emails.csv - 63 emails from the owner-provided golden
  list, all OrbiSearch safe/deliverable, but with no estate name in any repo
  file. The owner must map each email to an estate before use.

## Counts by segment

| Segment | Count | Send ready now |
| --- | --- | --- |
| nb_independent | 106 | 0 |
| nb_blf | 0 | 0 |
| nb_reopening | 4 | 0 |
| assam_independent | 0 | 0 |
| assam_blf | 0 | 0 |

Send ready is 0 because none of the 110 emails have been validated yet.
Validation status is `not_checked` for all of them.

## How the list was built

Merged emails from the WB and Assam send-ready and filtered candidate files,
both intelligence registries, the Sept pilot tracker, and the reopening
gardens file. Deduped by estate name plus email. Then dropped, in order:
current clients, estates already emailed in the Sept Snov campaign, estates
with open negotiations or rejections in the legacy CRM tracker and pilot
notes, invalid emails, public companies and large corporate groups, and rows
marked Disqualified or Uncertain in the source scoring.

Top exclusion counts: corporate 148, already_contacted 20, client 13,
not_qualified 11, negotiation 3, invalid_email 2.

BLF rows in the source files have no emails, so nb_blf is empty. The BLF
channel stays postal and phone.

## The Assam gap

Every usable Assam estate email already in the repo (about 20) was contacted
in the Sept campaign or is blocked by an open negotiation. So Assam has zero
new mapped candidates. The way to fill Assam is unmapped_validated_emails.csv:
63 ready emails, mostly Dibrugarh and Tinsukia area, waiting for the owner to
attach an estate name and contact to each. Two rows carry a possible estate
name hint; six are corporate group domains and are marked do-not-use.

## What the owner must do next

1. Run needs_validation.csv through OrbiSearch or Snov verification.
2. Map the emails in unmapped_validated_emails.csv to estates (Assam side).
3. Move rows that come back safe/deliverable into Snov in batches of 4 per
   day, using one named contact per estate.
4. Rebuild any time with `python3 marketing/outreach/email-expansion-2026-10/build_candidates.py`

## Sending pace

One mailbox, max 12 automated emails per day including follow-ups, means
about 4 new estates per day. 100 new estates takes about 5 weeks. To double
the pace, add a second warmed mailbox on getgardensuite.in before scaling up.

## Known data issues

- 12 candidate companies end in "Ltd" without "Pvt" in the name. They are
  flagged in notes; confirm they are not public companies before sending.
- 4 estates have more than one email on file. Use one contact only for the
  first sequence.
- The Assam master registry file has placeholder text in most email cells;
  only its 20 real emails were used.
