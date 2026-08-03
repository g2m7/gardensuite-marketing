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
3. **Planned rollout** - timing depends on garden size, devices, records, and staff availability
4. **20+ tea gardens** already using it
5. **Local support** from Sarbani Associates in Bagdogra/Siliguri
6. **Annual software plan** - payable annually or quarterly, with a one-year minimum
7. **Clear written terms** - no blanket refund promise

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

- Landing page structure outside the approved lead capture areas
- Consent fields or contact storage behaviour
- Brevo attributes, list ID, or automation rules

### Places to Add Lead Capture

1. `/products/attendance` - ALREADY DONE
2. Homepage (`/+page.svelte`) - APPROVED to add
3. The legacy `/w/face-weight-499` route redirects to the attendance page. Do not advertise Rs. 499.
4. Other product pages - Ask first

## Brevo Configuration

### Contact attributes

Use `GARDENSUITE_TAGS` for labels and preserve the consent attributes listed in `BREVO_SETUP.md`. The Brevo contact API does not use a top-level `tags` field for this workflow.

### List Name (NEVER CHANGE)

- "Tea Garden Leads"

### API Variables (from `.env`)

- `BREVO_API_KEY` - API key
- `BREVO_LIST_ID` - List ID `17`
- `BREVO_SENDER_EMAIL` - Sender email
- `BREVO_SENDER_NAME` - Sender name

## Email Sequence Rules

### The 7-Email Sequence (MUST STAY IN THIS ORDER)

1. Day 0: Welcome + product overview
2. Day 2: Problem deep-dive
3. Day 4: Price advantage
4. Day 6: Rollout process
5. Day 8: Region-level proof and confidentiality
6. Day 10: Support and confirmed commercial terms
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

### Source of truth

`marketing/whatsapp-campaigns/face-attendance-weight/GS_Leads_Consolidated_20260802.xlsx`

### Upload Process

1. Work from the reviewed workbook named in `CONTACT_DATABASE.md`.
2. Record explicit consent evidence and owner approval.
3. Run the safe importer in dry-run mode.
4. Import only rows accepted by the script's safety checks.
5. Record what was uploaded in `CONTACT_DATABASE.md`.

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
