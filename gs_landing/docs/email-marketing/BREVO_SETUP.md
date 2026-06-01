# Brevo Setup Guide

## Overview

We use Brevo (formerly Sendinblue) for email marketing automation. This guide explains how to configure the automation workflow.

## Prerequisites

1. Brevo account (free tier: 300 emails/day)
2. API key configured in `.env` file
3. Contact list created

## Step 1: Create Contact List

1. Go to Brevo Dashboard > Contacts > Lists
2. Click "Create a list"
3. Name: "Tea Garden Leads"
4. Save and note the **List ID** (shown in URL or list details)

## Step 2: Configure API Key

Add to your `.env` file:

```
BREVO_API_KEY=your-api-key-here
BREVO_LIST_ID=your-list-id-here
BREVO_SENDER_EMAIL=noreply@gardensuite.in
BREVO_SENDER_NAME="GardenSuite"
```

## Step 3: Create Automation Workflow

### Setup

1. Go to Brevo Dashboard > Automations > Create an automation
2. Choose: "A contact is added to a list" (or "Contact details updated")
3. Select list: "Tea Garden Leads"

### Add Filter (Optional but Recommended)

Add condition: Contact has tag "brochure-download" OR "gardensuite"

## Step 4: Build the Email Sequence

Add these emails with 2-day delays between each:

### Email 1: Welcome (Immediate)

**Subject**: Your attendance problem is solved - here is how  
**From**: GardenSuite <noreply@gardensuite.in>  
**Reply-to**: sarbaniassociates@gmail.com

Copy from `../EMAIL_SEQUENCES.md` - Email 1

### Email 2: The Problem (Day 2)

**Subject**: The hidden cost of manual attendance

Copy from `../EMAIL_SEQUENCES.md` - Email 2

### Email 3: Price Advantage (Day 4)

**Subject**: Why pay more for less?

Copy from `../EMAIL_SEQUENCES.md` - Email 3

### Email 4: Fast Implementation (Day 6)

**Subject**: Up and running in 3 days

Copy from `../EMAIL_SEQUENCES.md` - Email 4

### Email 5: Social Proof (Day 8)

**Subject**: How Rheabari T.E. saved 20 hours every week

Copy from `../EMAIL_SEQUENCES.md` - Email 5

### Email 6: No Risk (Day 10)

**Subject**: No risk. No long contract. Cancel anytime.

Copy from `../EMAIL_SEQUENCES.md` - Email 6

### Email 7: Final CTA (Day 12)

**Subject**: Ready to fix attendance and weighing?

Copy from `../EMAIL_SEQUENCES.md` - Email 7

## Step 5: Set Exit Conditions

Contacts exit the sequence when they:

- Click "Book Demo" link
- Reply to any email
- Are added to "Demo Booked" list

## Step 6: Test the Workflow

1. Add a test email to the list
2. Check if emails send correctly
3. Verify unsubscribe links work
4. Check mobile rendering

## Step 7: Upload Contacts

1. Import contacts from Excel (see CONTACT_DATABASE.md)
2. Tag them appropriately
3. Add to "Tea Garden Leads" list
4. Automation will start immediately

## Tracking Links

Use these UTM parameters in all email links:

```
?utm_source=email&utm_medium=automation&utm_campaign=attendance_nurture&utm_content=email_[NUMBER]
```

Example for Email 3:

```
https://gardensuite.in/products/attendance?utm_source=email&utm_medium=automation&utm_campaign=attendance_nurture&utm_content=email_3
```

## Brevo Templates

Create these templates in Brevo for reuse:

1. **GardenSuite Welcome** - Email 1
2. **Problem Deep Dive** - Email 2
3. **Price Advantage** - Email 3
4. **Fast Setup** - Email 4
5. **Social Proof** - Email 5
6. **Risk Reversal** - Email 6
7. **Final CTA** - Email 7

## Monitoring

Check weekly:

- Open rates per email
- Click rates per email
- Unsubscribe rate
- Demo bookings from email
- Bounce rate

## Troubleshooting

| Problem                 | Solution                                             |
| ----------------------- | ---------------------------------------------------- |
| Emails not sending      | Check API key, list ID, sender email verification    |
| Low open rates          | Test subject lines, check spam folder, verify sender |
| High bounce rate        | Clean email list, remove invalid addresses           |
| Contacts not triggering | Check tag filters, list assignment                   |

## Cost

Brevo free tier:

- 300 emails/day
- Unlimited contacts
- Basic automation

Upgrade if you need:

- More than 300 emails/day
- Advanced segmentation
- A/B testing

## Support

Brevo Help: https://help.brevo.com  
API Docs: https://developers.brevo.com
