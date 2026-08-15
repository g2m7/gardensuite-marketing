#!/bin/bash

# DEPRECATED: This checks the retired GardenSuite Brevo workflow.
# Do not run it for current outreach. Read marketing/outreach/CURRENT_STRATEGY.md.

# GardenSuite Email Marketing - Quick Setup Script
# Run this after setting up Brevo account

set -e

echo "========================================"
echo "GardenSuite Email Marketing Setup"
echo "========================================"
echo ""

# Check if BREVO_API_KEY is set
if [ -z "$BREVO_API_KEY" ]; then
    echo "ERROR: BREVO_API_KEY environment variable is not set"
    echo "Please set it first: export BREVO_API_KEY=your_key_here"
    exit 1
fi

echo "1. Checking Brevo API connection..."

# Test API key
curl -s -X GET "https://api.brevo.com/v3/account" \
  -H "accept: application/json" \
  -H "api-key: $BREVO_API_KEY" | grep -q "email"

if [ $? -eq 0 ]; then
    echo "   OK - API key is valid"
else
    echo "   ERROR - API key is invalid or connection failed"
    exit 1
fi

echo ""
echo "2. Checking contact lists..."

# Get lists
curl -s -X GET "https://api.brevo.com/v3/contacts/lists?limit=10&offset=0" \
  -H "accept: application/json" \
  -H "api-key: $BREVO_API_KEY" | python3 -m json.tool 2>/dev/null || true

echo ""
echo "========================================"
echo "Setup Checklist:"
echo "========================================"
echo ""
echo "[ ] Create 'Tea Garden Leads' list in Brevo"
echo "[ ] Get List ID and add to .env as BREVO_LIST_ID"
echo "[ ] Set BREVO_SENDER_EMAIL in .env"
echo "[ ] Verify sender email domain"
echo "[ ] Create automation workflow in Brevo"
echo "[ ] Add 7 emails to automation"
echo "[ ] Upload contacts using upload_contacts_to_brevo.py"
echo "[ ] Test automation with test email"
echo "[ ] Monitor first campaign results"
echo ""
echo "Next steps:"
echo "1. Read docs/email-marketing/BREVO_SETUP.md"
echo "2. Read docs/email-marketing/EMAIL_SEQUENCES.md"
echo "3. Import contacts"
echo "4. Start automation"
echo ""
