# Twenty-Estate Pilot Runbook

## Purpose

Provide the exact operating sequence for testing outreach with 20 qualified estate accounts.

## Pilot design

- 20 unique estate accounts
- target split: 10 West Bengal and 10 Assam
- one primary contact per account
- one attendance message sequence
- three automated email touches on days 0, 5, and 12 through Snov.io Campaigns
- WhatsApp only after the approved permission or relationship gate
- LinkedIn excluded
- no automatic scale after completion

## Roles required

- launch approver
- outreach owner
- outreach backup
- researcher
- second data reviewer
- tracker administrator
- technical sender owner
- compliance and suppression owner
- business and claim approver
- demo owner
- demo backup

One person may hold several roles, but each role must have a named person.

## T minus 5 business days

- [ ] G0 through G5 passed
- [ ] Pilot batch frozen and versioned
- [ ] One primary contact per account confirmed
- [ ] Sender and reply inbox confirmed
- [ ] Message versions locked
- [ ] New attendance campaign ready in Snov.io
- [ ] Daily send cap approved
- [ ] Sending window approved in India local time
- [ ] Suppression snapshot exported and checked
- [ ] Internal seed list ready
- [ ] Demo calendar and owner availability confirmed
- [ ] Pause authority confirmed

## T minus 2 business days - dry run

Run the full workflow using internal controlled addresses.

Test cases:

1. Standard Email 1 send and delivery
2. Positive reply and demo handoff
3. Not-now reply
4. Stop request and suppression
5. Hard bounce handling
6. Account-level DNC
7. Missing required Snov.io field or broken fallback
8. Pause before Email 2
9. Attempted re-import of a suppressed contact

For every test:

- expected result is written first
- actual result is recorded
- evidence is attached or linked
- defects have an owner and status

Any failed safety test blocks G6.

## T minus 1 business day - launch review

- [ ] G6 passed
- [ ] No unresolved critical defect
- [ ] Final 20-account list matches the frozen version
- [ ] Final suppression check time is recorded
- [ ] Message version IDs match the batch
- [ ] Schedule contains no duplicate estate contact
- [ ] Snov.io exit conditions and re-entry rules match approval
- [ ] Sender volume is within the approved cap
- [ ] Reply and demo owners are available
- [ ] Launch approver records `Approve` or `Do Not Approve`

Approval record:

```markdown
- Batch ID:
- Approved account count:
- Sender:
- Message versions:
- First send date and window:
- Daily cap:
- Suppression snapshot time:
- Outreach owner:
- Demo owner:
- Approved by:
- Approval time:
- Notes:
```

## Day 0 - Start Snov.io campaign and send Email 1

Before sending:

- [ ] No incident or provider warning is open
- [ ] Batch and schedule have not changed
- [ ] Suppression was checked after the last data change
- [ ] Sender inbox is monitored
- [ ] Internal seed test passed that day if required

After Snov.io sends:

- [ ] Each activity is logged
- [ ] Delivery and bounce events are reviewed
- [ ] Replies are classified
- [ ] Stop requests are suppressed
- [ ] Positive replies have a next action and owner
- [ ] Any pause condition is escalated

## Day 5 - Email 2

Eligibility for each account:

- no reply
- no suppression
- no bounce
- no manual hold
- account remains Qualified
- contact remains current
- Email 2 is the approved version

The approved automation handles the timing. Run the same eligibility and monitoring checks before the delay ends.

## Day 12 - Email 3 and final close

Use the setup, training, and support angle. Confirm again that no other person at the same account entered active outreach. This is the final outreach email for the pilot sequence.

- clearly close the loop
- do not imply urgency
- do not promise to keep contacting
- set `sequence_complete = yes` after send
- do not create another touch automatically

## Daily operating routine

### Start of day

- [ ] Review provider warnings, bounces, and complaints
- [ ] Review new stop requests and suppression
- [ ] Review replies and overdue next actions
- [ ] Confirm today's eligible accounts
- [ ] Confirm owner availability
- [ ] Confirm daily cap

### During the day

- [ ] Monitor reply inbox
- [ ] Confirm replies remove contacts from the Snov.io campaign
- [ ] Classify replies once
- [ ] Stop sequences after meaningful replies
- [ ] Respond within SLA
- [ ] Log activity before moving to the next account

### End of day

- [ ] Reconcile sent count with activity count
- [ ] Reconcile replies with outcomes
- [ ] Reconcile bounces with suppression
- [ ] Check for overdue next actions
- [ ] Record any incident or deviation
- [ ] Publish a short daily status to the accountable owner

## Reply handling

### Positive interest

1. Stop future touches.
2. Read the full account history.
3. Answer the question directly.
4. Ask for the smallest useful next step.
5. Assign the demo owner when appropriate.
6. Record need, timing, and next action.

### Referral to another person

1. Thank the sender.
2. Add or update the referred contact.
3. Verify role and contact point.
4. Record that the introduction came from the first contact.
5. Continue as a human conversation, not a fresh cold sequence.

### Not now

1. Ask no more than one useful timing question if appropriate.
2. Record the reason.
3. Record a revisit date only if the contact agrees.
4. Stop the sequence.

### No interest

1. Thank the contact.
2. Stop the sequence.
3. Record Closed with outcome Lost and the reason.
4. Do not move to another contact at the estate without owner review.

### Stop request

1. Do not argue or ask why.
2. Suppress immediately.
3. Apply the correct contact or account scope.
4. Confirm internally before another send can run.

## Pause authority

The technical owner, compliance owner, outreach owner, or Sarbani Associates owner may pause the pilot immediately.

Only the named strategy or launch approver may resume after a documented incident review.

## Pilot closeout

Complete after every account has exited or finished the sequence.

- [ ] Every account has one final outcome
- [ ] Every send has a matching activity
- [ ] Every reply has a category and summary
- [ ] Every open opportunity has a named next action
- [ ] Every stop, bounce, and complaint is suppressed
- [ ] Qualification QA is rerun on all 20 accounts
- [ ] Results are calculated using [`MEASUREMENT.md`](MEASUREMENT.md)
- [ ] Replies are reviewed for repeated objections and language
- [ ] Deviations and incidents are documented
- [ ] G8 evidence is complete
- [ ] G9 decision is recorded

## Allowed post-pilot decisions

- `Stop` - safety, data, relevance, or product-fit failure
- `Repair` - fix a defined issue, then repeat the dry run
- `Repeat 20` - run another small batch with one controlled change
- `Scale` - increase to a written account cap after approval

Do not add a new channel and increase volume in the same decision. That would make the result hard to interpret.
