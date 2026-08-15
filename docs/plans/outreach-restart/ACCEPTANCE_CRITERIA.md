# Outreach Acceptance Criteria

## Purpose

Define the evidence required to move from planning to pilot and from pilot to scale.

Checking a task is not enough. Each gate needs evidence, reviewer, and approval time.

## Gate record format

```markdown
## Gx - Gate name

- Status: Not Started | In Review | Passed | Failed
- Evidence location:
- Reviewed by:
- Reviewed on:
- Exceptions:
- Decision:
```

## G0 - Strategy decisions approved

Acceptance criteria:

- [ ] Corporate exclusion list or exact process is approved
- [ ] Named outreach owner and backup are recorded
- [ ] Named demo owner and backup are recorded
- [ ] Pipeline is approved
- [ ] Email cadence is approved
- [ ] WhatsApp gate is approved
- [ ] System-of-record decision has an owner and deadline
- [ ] Pilot size, state split, success, and pause rules are approved
- [ ] Launch, pause, resume, and scale authorities are named
- [ ] `CURRENT_STRATEGY.md` matches the approved decisions

Evidence:

- approved [`DECISIONS.md`](DECISIONS.md)
- updated current strategy
- named-owner list

## G1 - System of record ready

Acceptance criteria:

- [ ] One canonical tool is named
- [ ] Six required entities exist
- [ ] IDs, validation values, and required fields work
- [ ] Account-level contact lock works
- [ ] Suppression removes records from send-ready views
- [ ] Three sample accounts complete the full workflow
- [ ] Activity and next-action records are auditable
- [ ] Access, backup, and editor ownership are documented

Test:

Given a sample estate with two contacts, when one contact enters Emailing, then the second cannot enter the same pilot sequence without reviewed override.

Given a suppressed email, when a send-ready view is generated, then the email is absent and the suppression reason remains visible.

## G2 - Suppression and compliance controls ready

Acceptance criteria:

- [ ] Compliance owner is named
- [ ] Master suppression register exists
- [ ] Contact, channel, account, and corporate scopes work
- [ ] Stop, unsubscribe, hard-bounce, complaint, and DNC procedures are documented
- [ ] WhatsApp cannot be used without the approved gate
- [ ] Data access, source, retention, and processor decisions are documented
- [ ] Current law, provider terms, and recipient-preference requirements are reviewed
- [ ] Every imported contact has an approved source and documented outreach eligibility
- [ ] Later imports cannot silently reactivate suppressed records

Test:

Given an active contact who says stop, when the request is logged, then every later send attempt covered by that request is blocked.

## G3 - Pilot accounts and contacts verified

Acceptance criteria:

- [ ] Batch contains 20 unique accounts or approved smaller count
- [ ] Target state split is met or exception is approved
- [ ] Every estate is at least 50 hectares
- [ ] Every estate has current ownership evidence
- [ ] Every estate passes corporate review
- [ ] Every contact has a verified target role
- [ ] Every primary email has a current verification result
- [ ] Zero accounts or contacts are suppressed
- [ ] Every account has second-review evidence
- [ ] Batch version and freeze time are recorded

Test:

Given any row selected at random, when the reviewer opens its evidence, then state, hectares, ownership, corporate result, contact role, email result, and suppression check can be verified without referring to an old campaign status.

## G4 - Message pack approved

Acceptance criteria:

- [ ] One attendance sequence exists
- [ ] Three email touches exist
- [ ] Every touch has one distinct job
- [ ] Copy uses simple tea-garden language
- [ ] Every claim is approved and defensible
- [ ] No client name or testimonial is used without approval
- [ ] One CTA appears per message
- [ ] Opt-out wording is approved
- [ ] Personalization fields and fallbacks are tested
- [ ] Business approver and claim reviewer sign every version

Test:

Given the same approved message is sent to several qualified contacts, when the reviewer reads it, then it remains specific to tea-garden attendance and every inserted field is correct.

## G5 - Sender and deliverability ready

Acceptance criteria:

- [ ] Named sender, domain, mailbox, and tool are recorded
- [ ] The current Snov.io account and Trial plan are verified
- [ ] SMTP/IMAP sending and reply tracking work with the domain mailbox
- [ ] The new attendance sequence is separate from legacy assets
- [ ] SPF passes
- [ ] DKIM passes
- [ ] DMARC and alignment pass
- [ ] TLS and reply routing pass
- [ ] Mailbox history or warmup is accepted
- [ ] Seed tests reach expected inboxes
- [ ] Provider warnings and reputation checks are clear
- [ ] Daily cap is recorded
- [ ] Legacy campaign assets are not active
- [ ] Reply, unsubscribe, blocklist, bounce, and manual-stop exits pass
- [ ] Re-entry is disabled

Test:

Given a seed message received in each test inbox, when its headers are inspected, then the expected authentication results pass and a reply returns to the monitored owner.

## G6 - Internal dry run passed

Acceptance criteria:

- [ ] Standard send works
- [ ] Positive reply handoff works
- [ ] Not-now handling works
- [ ] Stop and unsubscribe handling works
- [ ] Hard-bounce handling works
- [ ] Account DNC works
- [ ] Missing required Snov.io fields block the send or use an approved safe fallback
- [ ] Reply removes the contact from later Snov.io steps
- [ ] Only approved contacts enter the attendance campaign
- [ ] Pause blocks later touches
- [ ] Re-import cannot reactivate suppression
- [ ] Activity records reconcile 100%
- [ ] Zero critical defects remain open

## G7 - Pilot launch approved

Acceptance criteria:

- [ ] G0 through G6 are Passed
- [ ] Final batch matches the frozen version
- [ ] Final suppression check is recorded
- [ ] Sender and message versions match approval
- [ ] Outreach and demo owners are available
- [ ] Date, window, and daily cap are approved
- [ ] Launch approver records written approval

No external pilot email may be sent before G7 passes.

## G8 - Pilot completed and reviewed

Acceptance criteria:

- [ ] Every pilot account has a final outcome
- [ ] Every send and reply is logged
- [ ] All suppression events are complete
- [ ] Qualification QA is complete
- [ ] Metric calculations reconcile to raw records
- [ ] Safety incidents and deviations are documented
- [ ] Reply themes and objections are summarized
- [ ] Open opportunities have owners and next actions
- [ ] Closeout reviewer signs the report

## G9 - Scale decision approved

Acceptance criteria:

- [ ] G8 passed
- [ ] Decision is Stop, Repair, Repeat 20, or Scale
- [ ] Reason and evidence are written
- [ ] Any changed targeting or message rule is recorded
- [ ] New batch cap is recorded
- [ ] Safety limits remain active
- [ ] No unresolved deliverability or suppression incident exists
- [ ] New channel and large volume increase are not introduced together
- [ ] Current strategy is updated before execution

## Global failure conditions

Any of these automatically fails the current launch or resume gate:

- suppressed contact scheduled or messaged
- corporate-excluded account scheduled
- pilot account without hectares or ownership evidence
- unapproved message version
- unverified sender configuration
- critical dry-run defect
- missing launch approver
- use of a retired queue, import, list, or automation
