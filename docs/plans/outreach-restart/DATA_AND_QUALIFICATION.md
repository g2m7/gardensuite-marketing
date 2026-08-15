# Data and Qualification Specification

## Purpose

Define the minimum data needed to decide whether a tea estate and contact can enter the outreach pilot.

The current dated consolidation workbook is a source, not the permanent system of record. It cannot qualify the new audience by itself because it lacks hectares, ownership, contact names, and job titles.

## Core rule

The campaign is account-based.

- One tea estate has one account record.
- One account can have several contacts.
- Contacts do not receive independent pipeline stages.
- A stop or exclusion at account level can block every contact at that estate.

## Required entities

### 1. Estate Accounts

| Field | Required | Example or rule |
|---|---|---|
| `account_id` | Yes | Permanent ID such as `GS-A-0001` |
| `estate_name_canonical` | Yes | Current official or commonly used name |
| `estate_name_aliases` | No | Prior spelling and source variants |
| `state` | Yes | West Bengal or Assam |
| `district` | Yes | Current district |
| `address` | Yes | Best current business address |
| `hectares` | Yes | Numeric value or approved range proving at least 50 |
| `hectares_source` | Yes | URL or document reference |
| `hectares_verified_on` | Yes | ISO date |
| `ownership_group` | Yes | Current owner or controlling group |
| `ownership_source` | Yes | URL or document reference |
| `ownership_verified_on` | Yes | ISO date |
| `corporate_review` | Yes | Clear, Excluded, or Manual Review |
| `corporate_review_reason` | Yes | Named-list result or review note |
| `qualification_status` | Yes | Research, Qualified, Rejected, Manual Review |
| `qualification_reason` | Yes | Short, factual reason |
| `pipeline_stage` | Yes | From the approved stage list |
| `account_owner` | Yes | Named person |
| `next_action` | No | Required after Qualified |
| `next_action_date` | No | Required after Qualified |
| `created_on` | Yes | ISO date |
| `updated_on` | Yes | ISO date |

### 2. Contacts

| Field | Required | Example or rule |
|---|---|---|
| `contact_id` | Yes | Permanent ID such as `GS-C-0001` |
| `account_id` | Yes | Links to one estate account |
| `full_name` | Yes | Person's current name |
| `job_title_raw` | Yes | Title as found at source |
| `role_category` | Yes | Owner, Founder, Director, General Manager, Estate Manager, Garden Manager |
| `role_source` | Yes | URL or document reference |
| `role_verified_on` | Yes | ISO date |
| `email` | Yes for email pilot | Normalized lowercase address |
| `email_type` | Yes | Person, role inbox, or generic estate inbox |
| `email_source` | Yes | Public business source or approved provider |
| `email_verified_on` | Yes | Verification date |
| `email_verification_result` | Yes | Valid, Catch-all, Invalid, Unknown |
| `email_permission` | Yes | Yes, No, or Unknown |
| `email_permission_source` | Required when Yes | Form, written opt-in, or other recorded permission |
| `email_permission_date` | Required when Yes | ISO date |
| `phone` | Optional | Normalized with country code |
| `phone_source` | Required if phone present | Source reference |
| `whatsapp_permission` | Yes | Yes, No, Unknown, Existing Relationship |
| `whatsapp_permission_source` | Required when Yes | Enquiry, reply, form, or relationship note |
| `primary_for_account` | Yes | Yes or No |
| `contact_status` | Yes | Ready, Hold, Invalid, Suppressed, Left Role |
| `last_verified_on` | Yes | ISO date |

Generic estate inboxes can support research or routing. They do not prove that a target-role person has been reached.

### 3. Activities

| Field | Required | Rule |
|---|---|---|
| `activity_id` | Yes | Permanent unique ID |
| `account_id` | Yes | Estate account |
| `contact_id` | When person-specific | Contact record |
| `activity_type` | Yes | Research, Email Sent, Reply, WhatsApp, Call, Demo, Note, Suppression |
| `activity_time` | Yes | Timestamp with timezone |
| `channel` | Yes | Email, WhatsApp, LinkedIn, Phone, Internal |
| `message_version` | For outbound | Approved version ID |
| `sender` | For outbound | Named sender |
| `outcome` | Yes | Delivered, Bounced, Positive Reply, Referral, Not Now, No Interest, Stop, Complaint, Demo Booked |
| `notes` | Yes | Factual summary only |
| `next_action` | When open | One clear next step |
| `next_action_owner` | When open | Named person |
| `next_action_date` | When open | ISO date |

### 4. Suppression

| Field | Required | Rule |
|---|---|---|
| `suppression_id` | Yes | Permanent unique ID |
| `account_id` | When known | Estate link |
| `contact_id` | When known | Contact link |
| `email_normalized` | When email-based | Lowercase, trimmed |
| `phone_normalized` | When phone-based | Digits with country code |
| `scope` | Yes | Contact, Channel, or Account |
| `reason` | Yes | Stop Request, Unsubscribe, Complaint, Hard Bounce, Invalid, Corporate Exclusion, Existing DNC, Other |
| `source` | Yes | Reply, provider event, manual review, historical record |
| `effective_on` | Yes | Timestamp |
| `applied_by` | Yes | Person or system |
| `notes` | No | Short factual explanation |

Suppression records are append-only. Correct errors with a reviewed reversal record. Do not silently delete history.

### 5. Message Versions

| Field | Required | Rule |
|---|---|---|
| `message_version_id` | Yes | Example `ATT-EXEC-E1-v1` |
| `audience_role` | Yes | Approved contact role |
| `channel` | Yes | Email, WhatsApp, LinkedIn |
| `touch_number` | Yes | 1 to 3 for pilot email |
| `subject` | Email only | Approved subject |
| `body` | Yes | Exact approved copy |
| `approved_by` | Yes | Named approver |
| `approved_on` | Yes | ISO date |
| `status` | Yes | Draft, Approved, Retired |

### 6. Pilot Batches

| Field | Required | Rule |
|---|---|---|
| `batch_id` | Yes | Example `ATT-PILOT-2026-01` |
| `account_id` | Yes | Qualified estate |
| `contact_id` | Yes | One primary contact |
| `state_split` | Yes | West Bengal or Assam |
| `approved_message_track` | Yes | Attendance Core |
| `planned_start` | Yes | Date |
| `launch_approved_by` | Yes | Named person |
| `launch_approved_on` | Yes | Timestamp |
| `final_outcome` | At close | Required before G8 |

## Qualification decision tree

An account can enter `Qualified` only if all answers are Yes:

1. Is it a tea garden or tea estate?
2. Is it in West Bengal or Assam?
3. Is it at least 50 hectares?
4. Is current ownership verified?
5. Is it clear under the approved corporate exclusion rule?
6. Is there at least one verified target-role contact?
7. Is the email current and verified for the pilot?
8. Is neither the account nor contact suppressed?
9. Has a second reviewer approved the record?
10. Is the contact source allowed under the approved cold-email and compliance rules?

If any answer is Unknown, use `Manual Review`, not `Qualified`.

## Contact priority

Use this order unless account context suggests a better path:

1. Founder, owner, managing partner, or equivalent
2. Director or senior decision-maker responsible for the estate
3. General manager
4. Estate manager
5. Garden manager

For executive contacts, lead with trusted daily attendance, rollout confidence, and office control.

For managers, lead with face attendance, field use, offline work, review, and staff adoption.

## Source standards

Preferred account sources:

- official estate or ownership-group website
- government, board, association, or registry information
- current company filing or official report
- current business directory with a visible update date
- verified direct confirmation

Preferred contact sources:

- official company or estate page
- current professional profile
- current association directory
- direct business correspondence
- reputable data provider, followed by independent verification

Every source entry must include:

- exact URL or document name
- access date
- fact supported
- reviewer note if the source is ambiguous

Do not use an unsourced search-result snippet as final proof.

## Deduplication rules

Check candidate accounts using:

- canonical estate name and aliases
- shared website domain
- shared email address
- shared phone number
- current address
- ownership group

Merge only when evidence supports the same estate. Keep aliases and provenance. Do not collapse two estates only because they have the same corporate office.

Contact matching uses:

- exact normalized email
- exact normalized phone
- full name plus estate
- role history plus source date

## Data QA checklist

- [ ] Every required account field is present
- [ ] Every required contact field is present
- [ ] State is proven, not inferred from a broad regional label
- [ ] Hectares are at least 50 and have a dated source
- [ ] Ownership is current and has a dated source
- [ ] Corporate review is Clear, not Manual Review
- [ ] Contact name and role are verified
- [ ] Email verification result is Valid, or Catch-all is explicitly approved
- [ ] Suppression check is recorded after the final contact update
- [ ] Contact source and outreach eligibility evidence are recorded
- [ ] No other contact at the account is scheduled in the same pilot wave
- [ ] Second reviewer name and date are recorded

## Pilot-batch acceptance criteria

- Exactly 20 unique estate accounts are approved, unless the owner records a smaller number.
- The target is 10 West Bengal and 10 Assam. A different split needs a written reason.
- Every account passes all nine qualification questions.
- Every account has one primary contact.
- Every contact has a current role source and email verification result.
- Zero pilot contacts appear in suppression.
- Zero accounts are in Manual Review.
- A second reviewer signs every row.
- The batch is versioned and frozen before launch approval.
