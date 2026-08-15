# Deliverability, Suppression, and Compliance Plan

## Purpose

Protect recipients, Sarbani Associates, and the sending identity before, during, and after the pilot.

This is an operating plan, not legal advice. The assigned compliance owner must check the final setup against current law, provider terms, and recipient-preference rules before launch.

## Current known state

- Snov.io Campaigns is selected for the cold-email pilot.
- Snov.io can connect the existing domain mailbox through SMTP/IMAP and send through the current provider's server.
- The renewable Trial plan supports 100 recipients, unlimited follow-ups for those recipients, and one warm-up slot. This is enough for 20 prospects.
- Snov.io can stop follow-ups after a reply, unsubscribe, or bounce. These exits still need a seed-list test.
- The final named sender, mailbox login, SMTP/IMAP settings, and TLS mode are not verified.
- A 2026-08-05 DNS check found an MX record for `mail.gardensuite.in`, but no SPF or DMARC record. DKIM still needs verification.
- Brevo remains only for website enquiries and contacts who have opted in to marketing. Legacy Brevo lists, templates, and automations are not current outreach authority.

Official references: [Snov.io SMTP/IMAP connection](https://snov.io/knowledgebase/connect-your-mailbox/), [Snov.io Trial limits](https://snov.io/knowledgebase/pricing-plans-overview/), [Snov.io reply tracking](https://snov.io/knowledgebase/how-to-track-your-replies/), and [Brevo anti-spam policy](https://help.brevo.com/hc/en-us/articles/209405205-What-is-the-anti-spam-policy-of-Brevo)

## Sender decision

Before technical work begins, record:

- named sender
- sending email address
- sending domain
- mailbox provider
- sending platform: Snov.io Campaigns
- reply inbox owner
- backup reply owner
- daily send cap
- existing mailbox age and history
- whether the domain has carried other business email

Recommended approach:

- use a real named person, not a generic sales identity
- prefer a dedicated, clearly related outbound domain or subdomain so primary business mail is protected
- keep the reply path direct and monitored
- keep the pilot volume low
- do not use several new mailboxes to manufacture volume

## Authentication checklist

- [ ] SPF authorizes every current sender and has no duplicate policy record
- [ ] DKIM signing is active for the selected platform
- [ ] DMARC exists and alignment is verified
- [ ] TLS is used for delivery
- [ ] From, reply-to, SPF, and DKIM domains align as intended
- [ ] Forward and reverse DNS are valid when the sending setup requires them
- [ ] Old sender includes and keys are removed only after verifying they are no longer used
- [ ] A test message shows pass results in received headers
- [ ] DMARC reports have an assigned reader

Google's current sender guidance requires authentication and sets additional requirements for bulk senders, including SPF, DKIM, DMARC, alignment, low spam rates, and one-click unsubscribe for relevant marketing mail. The pilot is far below bulk volume, but the plan adopts SPF, DKIM, and DMARC as the readiness standard.

Official reference: [Google email sender guidelines](https://support.google.com/mail/answer/81126)

## Mailbox readiness

### Existing active mailbox

Verify:

- normal two-way use exists
- recent sends are not bouncing or landing in spam
- mailbox is not restricted by the provider
- reply monitoring is active
- sending volume can remain within normal history

### New or inactive mailbox

- establish normal human use before cold outreach
- ramp slowly over several weeks
- send first to known, engaged, internal, or business contacts
- monitor replies, placement, bounces, and provider warnings
- do not force the pilot date if readiness is uncertain

The pilot has one primary contact per account. There is no need to approach high daily volume.

## Contact verification

Before a contact is send-ready:

- [ ] Email source is recorded
- [ ] Role is verified
- [ ] Email verification is recent
- [ ] Invalid addresses are removed
- [ ] Catch-all addresses are separately reviewed
- [ ] Generic addresses are not represented as a named decision-maker
- [ ] Account and contact suppression are clear
- [ ] Final pre-send check happened after the last data update
- [ ] Email source and reason for business relevance are recorded
- [ ] Any required consent or legal basis is recorded after compliance review

Do not use purchased bulk lists or addresses with unknown provenance.

## Suppression policy

### Suppression triggers

Suppress immediately for:

- explicit stop request
- unsubscribe
- spam complaint
- hard bounce
- invalid address
- account-level do-not-contact instruction
- corporate exclusion
- current evidence that the person has left the role
- a reviewed historical DNC record

### Suppression scope

| Event | Minimum scope |
|---|---|
| Email unsubscribe | That email and matching contact for email |
| WhatsApp stop | That phone and matching contact for WhatsApp |
| General `do not contact me` | Contact across outreach channels |
| Estate asks for no contact | Entire estate account |
| Spam complaint | Contact and sending review; pause campaign |
| Hard bounce | Email address permanently suppressed |
| Corporate exclusion | Every estate account owned by the excluded group |

When a request is ambiguous, apply the safer wider scope and ask the compliance owner to review.

### Suppression controls

- one master register
- normalized email and phone keys
- account-level and contact-level scope
- append-only history
- reason, source, effective time, and operator
- pre-send join that removes suppressed records
- manual-send checklist using the same register
- test case proving a later import cannot reactivate suppression
- Snov.io unsubscribe, bounce, reply, and sequence-exit tests

## Opt-out handling

- Use clear, simple wording.
- Do not hide the stop option in legal language.
- Apply the stop before the next scheduled touch.
- Confirm internally that the record is suppressed.
- Do not ask the recipient to complete several steps.
- Keep proof of when and how the request was handled.

## WhatsApp and telecom communication gate

The first pilot is email-first. WhatsApp is allowed only under the approved permission or relationship condition in [`MESSAGING_AND_CHANNELS.md`](MESSAGING_AND_CHANNELS.md).

TRAI's TCCCPR framework focuses commercial communication on the right recipient and recipient preference. The 2025 amendment and later directions make current verification important. The compliance owner must confirm the actual intended WhatsApp or telecom setup before use.

Official references:

- [TRAI TCCCPR overview](https://www.trai.gov.in/tcccpr)
- [TRAI TCCCPR Second Amendment, 2025](https://trai.gov.in/sites/default/files/2025-02/Regulation_12022025_0.pdf)

Do not treat this plan as a legal conclusion about every type of WhatsApp communication.

## Personal-data handling gate

The tracker will contain names, business contact points, job titles, sources, replies, and suppression history.

Minimum controls:

- collect only fields needed for qualification and outreach
- record the source and purpose
- restrict access to assigned team members
- keep contact and suppression data accurate
- protect exports and backups
- define retention and deletion rules
- preserve suppression data needed to honor stop requests
- document any third-party enrichment or sending processor
- complete current data-protection review before operational use

Official reference: [MeitY Digital Personal Data Protection Rules, 2025](https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa)

## Preflight placement tests

- [ ] Send to internal Gmail, Outlook, and other available test inboxes
- [ ] Confirm inbox or expected tab placement
- [ ] Inspect authentication headers
- [ ] Reply from each seed inbox and confirm routing
- [ ] Test unsubscribe or stop handling
- [ ] Test suppression before a scheduled second touch
- [ ] Test a hard-bounce simulation using provider-safe methods
- [ ] Check domain and IP reputation or blocklist status
- [ ] Record screenshots or exported results as evidence

## Pilot monitoring thresholds

Because the first wave has only 20 primary contacts, one event is material.

| Signal | Action |
|---|---|
| Any hard bounce | Pause new sends, suppress the address, verify all remaining unsent addresses |
| Any spam complaint | Pause the entire pilot and investigate |
| Any suppression failure | Stop the pilot immediately |
| Any wrong-corporate account | Stop the affected account and recheck the batch |
| More than 2 of 20 accounts fail qualification QA | Stop and rebuild the batch |
| Provider warning or rate restriction | Pause and follow provider instructions |
| Repeated spam placement in seed tests | Do not launch or resume |

Open and click rates are diagnostic only. They do not override safety thresholds.

## Incident response

### Immediate actions

1. Pause every remaining send in the pilot.
2. Record the incident time, affected accounts, and operator.
3. Preserve provider logs and message versions.
4. Apply suppression where required.
5. Notify the accountable owner.

### Root-cause review

Check:

- data source and verification date
- suppression join
- platform schedule and automation
- sender authentication
- message content and recipient relevance
- operator action
- whether a legacy asset was used

### Resume criteria

Sending can resume only when:

- root cause is documented
- affected records are corrected
- the control that failed is retested
- unsent accounts are rechecked
- compliance and strategy owners approve resume in writing
- the system of record contains the resume decision

## Gate acceptance

G2 and G5 pass only when the evidence requirements in [`ACCEPTANCE_CRITERIA.md`](ACCEPTANCE_CRITERIA.md) are complete.
