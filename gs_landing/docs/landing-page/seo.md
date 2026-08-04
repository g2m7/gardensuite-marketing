# GardenSuite SEO Direction

This is the current SEO source of truth for the GardenSuite website.

Use it with:

- `all-pages-copy-guidelines.md`
- `product-page-copy-guidelines.md`
- `README.md`

## Current Site Structure

The current public site has 11 indexable pages:

- `/` - homepage
- `/products/attendance` - Face Attendance & Smart Weighing
- `/products/attendance/face-attendance` - Face Attendance for Tea Gardens
- `/products/attendance/smart-weighing` - Smart Weighing for Tea Gardens
- `/products/attendance/offline-sync` - Offline Attendance and Office Sync
- `/products/payroll` - Automated Payroll
- `/products/factory` - Factory Production
- `/products/stores` - Store Management
- `/products/mis` - Daily Report (MIS Dashboard)
- `/privacy` - Privacy Policy
- `/terms` - Website Terms

Do not plan SEO around old 20+ page maps unless those pages are actually built.

## Current Technical SEO Status

Implemented:

- title tags on homepage and product pages
- meta descriptions on homepage and product pages
- canonical URLs
- Open Graph tags
- Twitter card tags
- `robots.txt` with sitemap reference
- dynamic `sitemap.xml`
- Organization, SoftwareApplication, WebSite, FAQPage, and BreadcrumbList schema where relevant

Still to verify before launch:

- rendered metadata in production build
- sitemap output after deployment
- rich result validation
- Search Console property and sitemap submission
- OG image preview on WhatsApp, LinkedIn, and X

## Keyword Map

Use keywords naturally. Clarity is more important than stuffing.

| Page                                   | Primary Keyword                      | Support Keywords                                                                       |
| -------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------- |
| `/`                                    | tea garden ERP software              | tea garden software, tea estate management system, tea garden management software      |
| `/products/attendance`                 | tea garden attendance system         | face attendance tea garden, smart weighing tea garden, biometric attendance tea estate |
| `/products/attendance/face-attendance` | face attendance for tea gardens      | tea garden biometric attendance, hazira face attendance, punch attendance tea garden   |
| `/products/attendance/smart-weighing`  | smart weighing for tea gardens       | Bluetooth leaf weighing, tea garden wireless scale, linked plucking weight             |
| `/products/attendance/offline-sync`    | offline tea garden attendance        | attendance sync tea garden, office attendance review, offline field attendance         |
| `/products/payroll`                    | tea garden payroll software          | tea estate wage calculation, hazira calculation software, PF ESI payroll tea garden    |
| `/products/factory`                    | tea factory production software      | made tea production tracking, manufacturing cost per kg tea                            |
| `/products/stores`                     | tea garden store management software | tea estate inventory software, fertilizer stock tracking                               |
| `/products/mis`                        | tea garden MIS dashboard             | tea estate daily report, tea garden online dashboard                                   |

## Title Rules

Use this pattern:

`Primary Keyword - Plain Benefit | GardenSuite`

Rules:

- keep titles near 50-65 characters when possible
- include the page's primary keyword
- avoid hype
- avoid keyword lists that read badly

Good:

`Tea Garden Payroll Software - Wages, PF, ESI | GardenSuite`

Avoid:

`Best #1 Advanced Tea ERP Software India Assam Darjeeling`

## Meta Description Rules

Meta descriptions should:

- explain the page in simple English
- include one primary keyword naturally
- mention the actual workflow
- avoid unsupported absolutes
- avoid exclamation-heavy CTAs

Good:

`Tea garden payroll software for wages, PF, ESI, bonus, hazira, and tikka. Calculate payroll from attendance and leaf weight records.`

Avoid:

`Transform operations with the ultimate next-gen platform. Guaranteed zero errors. Book now!`

## Schema Rules

Use schema to describe true facts only.

Allowed:

- Organization for Sarbani Associates
- SoftwareApplication for GardenSuite and product modules
- WebSite for the homepage
- FAQPage only when matching visible page FAQ content
- BreadcrumbList on indexable pages

Do not:

- set product `price` to `0` unless the actual software is free
- invent ratings, review counts, worker counts, or results
- mark private client names unless approved
- claim offers or guarantees not visible in sales copy

Offer schema should use description-only pricing language:

`Free demo, on-site setup, and staff training. Contact Sarbani Associates for module pricing.`

## Copy Safety Rules

Use:

- `helps stop proxy attendance`
- `works offline at the garden`
- `daily report dashboard`
- `online dashboard you can open from phone, tablet, or laptop`
- `records leaf weight linked to the worker`

Avoid or soften:

- `stops proxy attendance` unless qualified
- `zero paper`
- `100% automated`
- `no errors`
- `guaranteed`
- `real-time` unless the data is actually live
- `cloud MIS` without plain explanation

## OG Image Rules

Current default OG image:

`https://gardensuite.in/mis-dashboard-1400.webp`

Before launch, confirm it:

- loads publicly
- looks clear in a 1200x630 crop
- is readable on mobile share previews
- represents GardenSuite, not a generic dashboard

Future improvement:

- create a dedicated 1200x630 OG image with GardenSuite name, dashboard preview, and Sarbani Associates trust cue

## Launch Checklist

- run `bun run check`
- run `bun run build`
- inspect `/sitemap.xml`
- inspect `/robots.txt`
- validate schema with Google's Rich Results Test
- submit sitemap in Google Search Console
- check page titles and descriptions in production HTML
- check all product page canonical URLs
- check that Sarbani Associates appears in footer and trust sections
