# Pilot Measurement Plan

## Measurement principle

The pilot tests four things:

1. account qualification accuracy
2. contact and email quality
3. message relevance
4. operational control from send to demo handoff

It does not estimate a permanent conversion rate from a sample of 20 estates.

## Primary outcome

**Qualified positive response:** a reply from a suitable contact that shows relevant interest, asks a useful product question, agrees to continue, refers the right person, or requests a demo.

The main pilot success gate is:

- at least 2 qualified positive responses, or
- at least 1 qualified demo booked

Safety gates must also pass. A result is not successful if it includes a suppression failure.

## Metric definitions

| Metric | Formula | Notes |
|---|---|---|
| Accounts approved | Qualified pilot accounts | Should equal frozen batch size |
| Contacts attempted | Unique primary contacts sent Email 1 | One per account |
| Emails sent | All outbound pilot emails | Count by touch and version |
| Delivered | Sent minus confirmed bounces | Provider status where available |
| Delivery rate | Delivered / Emails sent | Diagnostic |
| Hard bounces | Unique hard-bounced addresses | Each triggers pause in pilot |
| Hard-bounce rate | Hard-bounced addresses / Contacts attempted | Report, but event rule controls pause |
| Total replies | Unique human replies / Contacts attempted | Exclude automatic replies from reply rate |
| Positive replies | Qualified positive responses / Contacts attempted | Primary relevance measure |
| Referral replies | Contacts who refer another person / Contacts attempted | Useful account access signal |
| Not-now replies | Contacts with timing-based response / Contacts attempted | Record agreed revisit date only |
| Negative replies | No-interest replies / Contacts attempted | Read for fit or message issues |
| Demo-booked rate | Qualified demos / Contacts attempted | Primary downstream measure |
| Opt-outs | Stop or unsubscribe requests | Safety and relevance signal |
| Spam complaints | Provider or recipient complaints | Immediate pause signal |
| Qualification failure rate | Accounts failing closeout QA / Accounts reviewed | Must be no more than 10% |
| SLA compliance | Relevant replies answered within SLA / Relevant replies | Operational measure |
| Activity completeness | Logged activities / expected activities | Must be 100% |

## Reply classification rules

Count once per contact at the first meaningful reply:

- positive interest
- demo request
- referral
- question or objection
- not now
- no interest
- stop request
- out of office
- wrong person

Do not count an out-of-office response as a human reply.

Do not count a polite acknowledgement as positive unless it includes a useful next step or clear interest.

## Required breakdowns

Report outcomes by:

- West Bengal vs Assam
- Executive vs Manager track
- touch number
- message version
- account source
- email source
- contact role
- qualification reviewer

Do not publish a percentage without the raw count beside it.

## Daily dashboard

| Item | Today | Cumulative | Action |
|---|---:|---:|---|
| Accounts scheduled | | | |
| Emails sent | | | |
| Delivered | | | |
| Hard bounces | | | |
| Human replies | | | |
| Positive replies | | | |
| Demos booked | | | |
| Stop requests | | | |
| Spam complaints | | | |
| Overdue next actions | | | |

## Closeout report

### 1. Batch summary

- batch ID
- dates
- approved account count
- state split
- role split
- sender and tool
- message versions

### 2. Safety and data results

- hard bounces
- complaints
- opt-outs
- suppression failures
- qualification failures
- incidents and deviations

### 3. Conversation results

- total human replies
- qualified positive replies
- referrals
- objections
- demos booked
- evaluation opportunities

### 4. What the replies said

Summarize repeated language around:

- proxy attendance
- offline work
- staff use
- office review
- setup and training
- smart weighing
- timing and budget
- current alternatives

Do not invent quotes. Use verbatim text only with internal handling rules and appropriate access.

### 5. Decision

Choose one:

- Stop
- Repair
- Repeat 20
- Scale

Record:

- evidence
- changed hypothesis
- single biggest next change
- next account cap
- owner
- review date

## Decision matrix

| Safety and data | Positive signal | Decision |
|---|---|---|
| Failed | Any | Stop or Repair |
| Passed | Below gate | Repair message, targeting, or contact quality, then Repeat 20 |
| Passed | Meets gate, but concentrated in one segment | Repeat 20 in that segment before broad scale |
| Passed | Meets gate across more than one segment | Consider controlled scale |
| Passed | Strong demos but weak delivery data | Fix measurement before scale |

## Scale acceptance

Scaling needs all of the following:

- G8 passed
- success gate met or owner records a reasoned exception
- zero suppression failures
- no unresolved complaint or deliverability incident
- qualification failure rate no more than 10%
- 100% activity completeness
- every positive reply has an outcome or next action
- a written next-batch cap
- no simultaneous addition of a new channel and major volume increase

## Review cadence

- Daily during sending: safety, replies, next actions
- After each touch: delivery and reply pattern
- End of pilot: full closeout
- Before next batch: decision review and strategy update

