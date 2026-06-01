# Email Marketing - Overview

## Purpose

This folder contains everything needed to run email marketing for GardenSuite's Attendance + Smart Weighing solution. The primary goal is to convert tea garden leads (managers, owners, GMs) into demo bookings and installations.

## What We Are Doing

We have a lead nurture email sequence that triggers when someone downloads the attendance brochure from our website. The sequence focuses on:

1. **Core Product**: Face attendance + wireless scale combo
2. **Main USP**: Price (cheaper than traditional biometric systems)
3. **Speed**: 3-day installation
4. **Trust**: 20+ existing tea garden clients across Assam, Dooars, Terai, Darjeeling
5. **Low Barrier**: Monthly billing, 30-day refund, local support

## How It Works

### Lead Flow

```
Tea Garden Manager visits gardensuite.in/products/attendance
    |
    v
Sees "Download Free Brochure" form
    |
    v
Enters: name, email, phone, garden name
    |
    v
POST /api/subscribe  -->  Brevo API
    |
    v
Contact added to Brevo list with tags: ["brochure-download", "gardensuite", "attendance-page"]
    |
    v
Brevo Automation triggers: 7-email nurture sequence
    |
    v
Sequence goal: Book demo call or request installation
```

### Website Components

- **Landing Page**: `/products/attendance` - Has lead capture form
- **API Endpoint**: `/api/subscribe` - Adds contacts to Brevo
- **Component**: `LeadCapture.svelte` - Reusable form component

### Email Sequence

7 emails over 12 days (every 2 days):

1. **Day 0** - Welcome + product overview
2. **Day 2** - Problem deep-dive (proxy punching, paper registers)
3. **Day 4** - Price advantage vs competitors
4. **Day 6** - Fast 3-day installation
5. **Day 8** - Social proof (Rheabari T.E. case study)
6. **Day 10** - No risk guarantee
7. **Day 12** - Final CTA

## Contact Database

We have 916+ tea estate contacts from multiple sources:

| Source                            | Count   | Key Data                                 |
| --------------------------------- | ------- | ---------------------------------------- |
| tea_estate_contacts_v2.xlsx       | 222     | Estate name, phone, email, address, maps |
| tea_estate_contacts.xlsx          | 173     | Estate name, phone, alternative numbers  |
| Tea Estates.xlsx                  | 174     | Estate names, areas                      |
| Tea Estates number required.xlsx  | 84      | Estate names + phone numbers             |
| email assam.dooars teaestate.xlsx | 149     | Email addresses                          |
| Grower_Details_Report_TINSUKIA    | 106     | Grower name, garden name, location       |
| test_gardens.csv                  | 8       | Estate name, phone, manager              |
| **TOTAL**                         | **916** |                                          |

**Location**: `/Users/g2m7/projects/scripts/extract_garden/data/`

## Metrics to Track

| Metric            | Target |
| ----------------- | ------ |
| Open Rate         | 25%+   |
| Click Rate        | 3%+    |
| Demo Booking Rate | 5%+    |
| Unsubscribe Rate  | <0.5%  |

## Key Files

| File                          | Purpose                                    |
| ----------------------------- | ------------------------------------------ |
| `OVERVIEW.md`                 | This file - master strategy document       |
| `CONTACT_DATABASE.md`         | Contact sources and upload procedures      |
| `BREVO_SETUP.md`              | How to configure Brevo automation          |
| `EMAIL_SEQUENCES.md`          | Full email copy for all sequences          |
| `LANDING_PAGE_INTEGRATION.md` | Website integration details                |
| `AGENT_INSTRUCTIONS.md`       | Rules for any future agent working on this |

## Tech Stack

- **Email Platform**: Brevo (formerly Sendinblue)
- **Website**: SvelteKit + TypeScript
- **Hosting**: Vercel (planned)
- **Contact Storage**: Brevo lists + local Excel backups

## Support Info

- **Company**: Sarbani Associates
- **Location**: Bagdogra, Siliguri
- **Phone**: [ADD PHONE]
- **WhatsApp**: [ADD WHATSAPP]
- **Email**: sarbaniassociates@gmail.com

## When to Update This Documentation

- Email sequence copy changes
- New contact sources added
- Brevo automation workflow changes
- Landing page form changes
- Pricing or offer changes
- New case studies or testimonials

---

**Last Updated**: 2026-05-25  
**Maintained by**: Sarbani Associates / GardenSuite Team
