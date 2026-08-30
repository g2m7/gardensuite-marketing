# Personalization and Sending Rules

Status: DRAFT FOR OWNER APPROVAL - DO NOT SEND

## Required fields

| Field | Requirement | Rule |
|---|---|---|
| `estate_account_id` | Required | One account ID for the tea estate |
| `estate_name` | Required | Use the current verified estate name |
| `first_name` | Preferred | Use only when verified |
| `contact_role` | Required | Owner, director, general manager, estate manager, or garden manager |
| `contact_email` | Required | Verify before campaign entry |
| `state` | Required | West Bengal or Assam only |
| `region` | Required | Verified operating location |
| `hectares` | Required | Must be 50 hectares or more |
| `ownership_group` | Required | Used for corporate exclusion review |
| `email_source` | Required | Record where the address came from |
| `email_verified_on` | Required | Record the verification date |
| `suppression_clear` | Required | Must be Yes immediately before import |
| `message_version` | Required | Use the approved version identifier |

Recommended message version after approval: `GS-ATT-TRUST-V1`.

## Greeting fallback

If the first name is verified:

```text
Hello {{first_name}},
```

If the first name is not verified:

```text
Hello,
```

Do not use `Sir/Madam`, invent a name, or guess gender from an email address.

## Regional proof

Use region-level proof by default:

```text
GardenSuite is used by 20+ tea estates across Assam and North Bengal.
```

Do not automatically insert a client name from a historical list. A reference estate may be named only when all of these are true:

1. The estate has permitted Sarbani Associates to use its name in this type of one-to-one sales discussion.
2. The reference is relevant to the prospect's location or workflow.
3. The sender has checked the permission immediately before replying.
4. Only approved facts are shared.

If a named reference cannot be used, say:

```text
Many estates keep their software details private. I can share the nearest permitted reference or explain the relevant regional implementation during a one-to-one discussion.
```

## Role adjustments

Keep the main sequence unchanged for the pilot. Do not create a different campaign for every job title.

When replying manually, emphasise the point most relevant to the reader:

| Role | Emphasis |
|---|---|
| Owner or director | Trusted daily records, nearby proof, rollout responsibility |
| General manager | Attendance control, section visibility, support process |
| Estate or garden manager | Field usability, offline operation, exception handling |

## Contact and website rules

- Use a real named sender at Sarbani Associates.
- Use a monitored GardenSuite or Sarbani Associates domain mailbox.
- Keep one website link in the signature: `https://gardensuite.in`.
- Include `Phone/WhatsApp: +91 97341 01330` only after the number owner approves sales replies.
- Include `Bagdogra, Siliguri, West Bengal` to answer the location question.
- Do not list a second office unless its exact address and operating status are confirmed.
- Do not include the Gmail contact address in the signature when the message already comes from a monitored domain mailbox.
- Do not add URL tracking parameters, click tracking, open tracking, images, or attachments to the pilot sequence.

## Sending rules

- Send to one primary contact per estate.
- Do not email several people at the same estate at the same time.
- Use day 0, day 5, and day 12 only after the cadence is approved.
- Keep emails in the same thread when possible.
- Stop the sequence immediately after any reply, unsubscribe, hard bounce, spam complaint, suppression, or manual stop.
- Do not use cold WhatsApp as the next automatic step after email silence.
- Use WhatsApp only after a positive reply, documented permission, an inbound enquiry, or a suitable existing business relationship, if that policy is approved.
- Do not send more than 10 new pilot contacts in one business day.
- Do not enrol more than 20 estates in the pilot.
- Do not expand the campaign automatically after the pilot.

## Pre-send copy check

- [ ] The estate name is correct.
- [ ] The contact name and role are verified, or the neutral greeting is used.
- [ ] There is one main reply question.
- [ ] The email contains no invented result, saving, accuracy figure, or client quotation.
- [ ] No confidential estate name appears in the cold sequence.
- [ ] The website appears only once.
- [ ] There is no brochure, image, or attachment.
- [ ] There is a clear stop instruction.
- [ ] The signature contains the real sender name.
- [ ] The sender mailbox and Phone/WhatsApp number are monitored.
- [ ] The contact is clear in the master suppression register.
- [ ] SPF, DKIM, DMARC, SMTP, IMAP, and reply detection have passed testing.

## Reply handling

- Positive or practical reply: assign to the named outreach owner and respond within the internally approved reply target.
- Reference request: check permission before naming an estate.
- Support question: use the approved support policy, not an improvised promise.
- Pricing question: provide the current quotation process. Do not invent a price or discount.
- Stop request: suppress the email and linked contact points immediately.
- Wrong person: ask for the correct role only if the reply remains open to it. Otherwise stop.
- Complaint: pause the pilot and review all unsent contacts and copy.
