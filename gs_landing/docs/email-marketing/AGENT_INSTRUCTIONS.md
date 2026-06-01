# Agent Instructions - Email Marketing

## CRITICAL: Read This First

If you are an AI agent working on GardenSuite email marketing, you MUST read this file before making ANY changes. This document prevents deviation from the established strategy.

## What We Are Doing

GardenSuite is a tea garden management ERP by Sarbani Associates. We are running email marketing to sell our **Attendance + Smart Weighing solution** to tea garden managers across Assam, Dooars, Terai, and Darjeeling.

**Primary Goal**: Convert tea garden leads into demo bookings and installations.  
**Secondary Goal**: Build a contact database for future campaigns.

## Core Strategy (DO NOT CHANGE WITHOUT DISCUSSION)

### Product Focus

- **Main product**: Face attendance + wireless scale combo
- **Secondary**: Full GardenSuite ERP (only mention, don't push)
- **USP**: Price advantage over traditional biometric systems

### Target Audience

- Tea garden managers
- Tea estate owners
- General managers of tea estates
- **Regions**: Assam, Dooars, Terai, Darjeeling

### Key Messages (Never Deviate From These)

1. **Proxy punching stops** with face recognition
2. **Price is lower** than traditional biometric systems
3. **3-day installation** - no IT team needed
4. **20+ tea gardens** already using it
5. **Local support** from Sarbani Associates in Bagdogra/Siliguri
6. **Monthly billing** - no long contract
7. **30-day refund** guarantee

### What NOT to Say

- Do NOT use em dashes (always use hyphens)
- Do NOT use technical jargon
- Do NOT make GardenSuite sound complex
- Do NOT mention competitors by name negatively
- Do NOT promise features that don't exist
- Do NOT use overly formal language
- Do NOT forget to mention Sarbani Associates

## File Structure (DO NOT MOVE OR RENAME)

```
gs_landing/docs/email-marketing/
├── OVERVIEW.md                    # Master strategy document
├── CONTACT_DATABASE.md            # Contact sources and procedures
├── BREVO_SETUP.md                 # Brevo configuration guide
├── EMAIL_SEQUENCES.md             # Email copy and sequences
├── LANDING_PAGE_INTEGRATION.md    # Website integration details
└── AGENT_INSTRUCTIONS.md          # This file - rules for agents

gs_landing/src/lib/components/
└── LeadCapture.svelte             # Reusable lead capture form

gs_landing/src/routes/api/
└── subscribe/+server.ts           # API endpoint for Brevo

email-sequence-attendance-scale.md  # Root level email sequence (legacy backup)
```

## Website Integration

### Components You Can Modify

- `LeadCapture.svelte` - Form component
- `+server.ts` - API endpoint (be careful, don't break Brevo integration)

### Components You CANNOT Modify Without Approval

- Landing page structure (already works)
- Contact form API behavior
- Brevo tag names (breaks automation)

### Places to Add Lead Capture

1. `/products/attendance` - ALREADY DONE
2. Homepage (`/+page.svelte`) - APPROVED to add
3. `/w/face-weight-499` - APPROVED to add
4. Other product pages - Ask first

## Brevo Configuration

### Tag Names (NEVER CHANGE THESE)

- `gardensuite` - All GardenSuite contacts
- `brochure-download` - Downloaded brochure
- `attendance-page` - From attendance product page
- `import-2026` - Bulk imported contacts
- `tea-estate` - Tea estate contact
- `demo-booked` - Booked a demo
- `customer` - Active customer

### List Name (NEVER CHANGE)

- "Tea Garden Leads"

### API Variables (from `.env`)

- `BREVO_API_KEY` - API key
- `BREVO_LIST_ID` - List ID
- `BREVO_SENDER_EMAIL` - Sender email
- `BREVO_SENDER_NAME` - Sender name

## Email Sequence Rules

### The 7-Email Sequence (MUST STAY IN THIS ORDER)

1. Day 0: Welcome + product overview
2. Day 2: Problem deep-dive
3. Day 4: Price advantage
4. Day 6: Fast installation
5. Day 8: Social proof (Rheabari T.E.)
6. Day 10: No risk guarantee
7. Day 12: Final CTA

### Timing Rules

- 2-day gaps between emails
- Send Tuesday-Thursday, 10 AM
- Exit on demo booking or reply

### Copy Rules

- Simple language (garden managers, not tech people)
- Always sign off with "Sarbani Associates"
- Include region references (Assam, Dooars, Terai, Darjeeling)
- One CTA per email
- UTM parameters on all links

## Contact Database Rules

### Source Files Location

`/Users/g2m7/projects/scripts/extract_garden/data/`

### Main Files (in priority order)

1. `tea_estate_contacts_v2.xlsx` - Best data (222 rows)
2. `tea_estate_contacts.xlsx` - Phone numbers (173 rows)
3. `email assam.dooars teaestate.xlsx` - Emails (149 rows)
4. `Tea Estates.xlsx` - Names (174 rows)

### Upload Process

1. Clean data in Excel
2. Export as CSV with columns: email, name, phone, garden, location
3. Import to Brevo with tags
4. Document what was uploaded in CONTACT_DATABASE.md

## Before Making Changes

### Checklist

- [ ] Read OVERVIEW.md
- [ ] Read this file (AGENT_INSTRUCTIONS.md)
- [ ] Read relevant specialized doc (BREVO_SETUP, EMAIL_SEQUENCES, etc.)
- [ ] Run `bun run check` in gs_landing directory after code changes
- [ ] Test on local before pushing

### When in Doubt

If you are unsure about:

- Changing email copy -> Ask first
- Changing tags or list names -> Ask first
- Adding new sequences -> Ask first
- Modifying API endpoint -> Be very careful, test thoroughly
- Adding new lead capture locations -> Approved for homepage and WhatsApp page

## Tech Stack

- **Frontend**: SvelteKit + Svelte 5 + Tailwind CSS
- **Backend**: SvelteKit API routes
- **Email**: Brevo (Sendinblue)
- **Runtime**: Bun
- **Hosting**: Vercel

## Support

- **Company**: Sarbani Associates
- **Location**: Bagdogra, Siliguri
- **Contact**: sarbaniassociates@gmail.com

## Last Updated

2026-05-25

## DO NOT DELETE THIS FILE

This file is critical for maintaining consistency across agents. Always keep it updated.
