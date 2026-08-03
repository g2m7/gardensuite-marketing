# Email Marketing - Quick Start Checklist

## Phase 1: Setup (Do This First)

### 1. Brevo Account Setup

- [ ] Sign up at brevo.com (free tier: 300 emails/day)
- [ ] Verify your sender email (noreply@gardensuite.in or sarbaniassociates@gmail.com)
- [ ] Get API key from Brevo Dashboard > API Keys

### 2. Environment Variables

Add to your `.env` file:

```
BREVO_API_KEY=xkeysib-your-key-here
BREVO_SENDER_EMAIL=noreply@gardensuite.in
BREVO_SENDER_NAME="GardenSuite"
```

### 3. Create Contact List

- [ ] Go to Brevo Dashboard > Contacts > Lists
- [ ] Create list named "Tea Garden Leads"
- [ ] Copy the List ID from the URL or list details
- [ ] Add to `.env`: `BREVO_LIST_ID=your-list-id`

## Phase 2: Build Automation (1 Hour)

### 4. Create Automation Workflow

- [ ] Go to Brevo Dashboard > Automations > Create an automation
- [ ] Select trigger: "A contact is added to a list"
- [ ] Choose list: "Tea Garden Leads"

### 5. Add 7 Emails

Copy each email from `docs/email-marketing/EMAIL_SEQUENCES.md`:

**Email 1** (immediate after trigger):

- Subject: "Your attendance problem is solved - here is how"
- Paste Email 1 copy
- Add CTA button linking to: `https://gardensuite.in/#contact?utm_source=email&utm_medium=automation&utm_campaign=attendance_nurture&utm_content=email_1`

**Email 2** (+2 days):

- Subject: "The hidden cost of manual attendance"
- Paste Email 2 copy
- Add CTA button

**Email 3** (+2 days):

- Subject: "Why pay more for less?"
- Paste Email 3 copy

**Email 4** (+2 days):

- Subject: "How GardenSuite is set up"
- Paste Email 4 copy

**Email 5** (+2 days):

- Subject: "Built for tea garden field work"
- Paste Email 5 copy

**Email 6** (+2 days):

- Subject: "No risk. No long contract. Cancel anytime."
- Paste Email 6 copy

**Email 7** (+2 days):

- Subject: "Ready to fix attendance and weighing?"
- Paste Email 7 copy

### 6. Configure Settings

- [ ] Set "From" name: "GardenSuite"
- [ ] Set reply-to: sarbaniassociates@gmail.com
- [ ] Enable tracking on all links
- [ ] Add unsubscribe link to every email

### 7. Test Automation

- [ ] Add your own test email to the list
- [ ] Wait for first email to arrive
- [ ] Check formatting on mobile
- [ ] Click all links to verify they work
- [ ] Test unsubscribe link

## Phase 3: Upload Contacts (30 Minutes)

### 8. Prepare Contact Data

The best file is `tea_estate_contacts_v2.xlsx` with 222 contacts.

Option A - Use the script:

```bash
cd gs_landing/docs/email-marketing/scripts
pip install pandas openpyxl
export BREVO_API_KEY=your-key
export BREVO_LIST_ID=your-list-id
python3 upload_contacts_to_brevo.py
```

Option B - Manual upload:

- [ ] Open `tea_estate_contacts_v2.xlsx`
- [ ] Export as CSV
- [ ] Go to Brevo > Contacts > Import Contacts
- [ ] Upload CSV, map fields, add tags: ["gardensuite", "tea-estate", "import-2026"]

### 9. Tag Contacts Properly

All uploaded contacts should have tags:

- `gardensuite`
- `tea-estate`
- `import-2026`

## Phase 4: Website Integration (Already Done)

### 10. Verify Website Forms

- [ ] Visit `https://gardensuite.in/products/attendance`
- [ ] Scroll to "Get the attendance + scale brochure" section
- [ ] Fill form with test email
- [ ] Check Brevo Dashboard to confirm contact was added
- [ ] Verify contact has tags: `brochure-download`, `attendance-page`

### 11. Test API Endpoint

```bash
curl -X POST https://gardensuite.in/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test","tag":"test","source":"test"}'
```

## Phase 5: Go Live

### 12. Final Checks

- [ ] Automation is active (not paused)
- [ ] Contact list has at least 50 contacts
- [ ] Test email received all 7 emails correctly
- [ ] All CTA links work
- [ ] Unsubscribe link works
- [ ] Mobile rendering looks good

### 13. Launch

- [ ] Activate automation in Brevo
- [ ] Contacts will start receiving emails
- [ ] Monitor open rates and clicks daily for first week

### 14. Monitor Metrics

Check weekly:

- Open rate (target: 25%+)
- Click rate (target: 3%+)
- Demo bookings from email
- Unsubscribe rate (keep under 0.5%)

## Phase 6: Optimize (Ongoing)

### 15. Improve Over Time

- [ ] A/B test subject lines after 2 weeks
- [ ] Add more contacts monthly
- [ ] Remove bounced emails quarterly
- [ ] Add new case studies to Email 5
- [ ] Update pricing in Email 3 if needed

## Emergency Contacts

- **Brevo Support**: help.brevo.com
- **API Issues**: Check `.env` variables and API key
- **Website Issues**: Check Vercel logs
- **Script Issues**: Run `check_brevo_setup.sh`

## Files Reference

| File                                       | Purpose              |
| ------------------------------------------ | -------------------- |
| `docs/email-marketing/OVERVIEW.md`         | Strategy document    |
| `docs/email-marketing/BREVO_SETUP.md`      | Detailed Brevo guide |
| `docs/email-marketing/EMAIL_SEQUENCES.md`  | Email copy           |
| `docs/email-marketing/CONTACT_DATABASE.md` | Contact sources      |
| `scripts/upload_contacts_to_brevo.py`      | Bulk upload script   |
| `scripts/check_brevo_setup.sh`             | Connection test      |

## Time Estimate

- Phase 1: 30 minutes
- Phase 2: 1 hour
- Phase 3: 30 minutes
- Phase 4: Already done
- Phase 5: 15 minutes
- **Total: ~2.5 hours to go live**
