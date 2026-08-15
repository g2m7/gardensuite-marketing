# AGENTS.md - GardenSuite Project Context

## Product Overview

GardenSuite is a complete tea garden management ERP software, built and maintained by **Sarbani Associates** (Bagdogra, Siliguri). It handles everything from worker attendance to payroll, stores, factory production, daily MIS and more.

## Key Differentiators

- **Face recognition attendance** - Biometric, stops proxy/buddy punching, works offline
- **Smart wireless scale** - Links plucking weight to verified worker face in one step
- **Offline ERP + Cloud dashboard** - Best of both worlds: full offline reliability at the garden, cloud viewing from anywhere
- **MIS Web Dashboard** - Daily updates, viewable from any device (phone/tablet/laptop), cloud-based

## Target Audience

Tea garden managers, estate owners, and senior staff across:

- Assam, Dooars, Terai, Darjeeling, Coochbehar, Uttar Dinajpur, Jalpaiguri

Language must be **simple and accessible** - not all users are fluent in English. Professional but easy to understand.

## Company History

- **1998 (Apr)** - Infoworld founded, computer assembly and repair
- **2000 (Apr)** - Garden Suite software for tea gardens developed
- **2002 (Jun)** - Reached 15 employees
- **2003** - Version 1.1 launched
- **2018** - SARBANI ASSOCIATES formed, Version 2 launched with biometric attendance
- **2022** - Face attendance app launched
- **2026 (Jan)** - Version 3 with advanced face app and online dashboard

## Clients (20+ Tea Estates)

Darjeeling: Simulbarie T.E., Longview T.E.
Dooars: Rheabari T.E., Mogulkata T.E., Rahimpur T.E., Debpara T.E., Kurti T.E., Looksan T.E., Subhasini T.E.
Assam: Choibari T.E., Chapar T.E., Doolahat T.E.
Terai: Atal T.E., Thanjhora T.E., Naxalbari T.E., Pahargoomiah T.E., Kamalpur T.E.
Coochbehar: Tinbigha T.E.
Uttar Dinajpur: Chandan T.E.
Jalpaiguri: Himalayan Agro Plantation

## Writing & Style Rules

- **NO em dashes.** Always use regular hyphens.
- Simple, clear language. No jargon or big words.
- Always mention parent company Sarbani Associates in footer and key sections.

## Design Direction

- Apple-inspired landing page: clean, minimal, large typography, generous whitespace
- Sales funnel structure: Hook -> Problem -> Solution -> Proof -> Desire -> Differentiator -> Features -> Trust -> FAQ -> CTA
- Parent company branding: Sarbani Associates in copyright footer and trust-building sections
- NO background circles/boxes behind icons. Use color directly on the icon with a subtle drop-shadow only.
- NO pill-shaped badges or kickers (rounded-full colored background labels). Use plain uppercase text kickers only (`text-[13px] font-semibold tracking-[0.08em] uppercase`).
- NO glassmorphism (backdrop-blur, bg-white/opacity overlays, frosted glass effects). Use solid opaque backgrounds only.
- NO colored glow effects (ring-1 ring-[color]/opacity, shadow with color, gradient glow divs behind elements). Use neutral shadows only (rgba black).
- NO heavy shadows. Prefer borders and surface contrast first. Shadows may only provide subtle separation.
- Maximum shadow: `0 12px 30px rgba(0,0,0,0.10)`. Do not use `shadow-lg`, `shadow-xl`, `shadow-2xl`, blur radii above 30px, opacity above 0.10, or dramatic hover elevation.
- Use these shadow levels: small `0 1px 3px rgba(0,0,0,0.04)`, card `0 6px 18px rgba(0,0,0,0.06)`, elevated `0 10px 28px rgba(0,0,0,0.10)`.
- Icon drop-shadows must stay at or below `0 2px 4px rgba(0,0,0,0.10)`.

## Reference Docs (Read Before Making Changes)

Before auditing or improving copy, design, SEO, or UX, read the relevant docs in `gs_landing/docs/landing-page/`:

- `seo.md` - keyword map, title pattern, meta rules, schema rules, copy safety
- `all-pages-copy-guidelines.md` - brand voice, vocabulary, claim safety
- `product-page-copy-guidelines.md` - page formula, per-module vocabulary
- `trust-pivot-plan.md` - proof strategy, confidentiality positioning
- `styling.md` - visual direction, card usage, motion rules
- `typography.md` - locked type system (DO NOT deviate)
- `copy.md` - section-level copy direction and generic-copy test

## Tech Stack

- SvelteKit (Svelte 5) + Tailwind CSS v4 + TypeScript
- Bun runtime
- Hosted on Vercel (planned)

## Outreach and Lead Operations

**CRITICAL**: The only current authority for lead structure, outreach strategy, campaign status, or outreach blockers is:

`marketing/outreach/CURRENT_STRATEGY.md`

Read that file before auditing, planning, changing, or resuming any outreach work.

The following materials are retained as historical implementation records and are **not current strategy**:

- `marketing/archive/brevo-email-marketing/`
- `marketing/archive/whatsapp-face-attendance-weight/RESUME_SENDING.md`
- `marketing/archive/whatsapp-face-attendance-weight/messages.md`
- `marketing/archive/outreach-review-20260802/`
- `marketing/archive/email-sequence-attendance-scale.md`

Do not infer current blockers, campaign readiness, consent state, channel strategy, lead stages, or sending rules from those files. Do not reactivate their Brevo automation, WhatsApp queue, import scripts, or lead-capture funnel unless the user explicitly adopts that legacy workflow again.

The current lead model is estate-account based, not a flat list of independent contact rows. Snapshot counts are not strategy and must not be treated as current operating status.

If `CURRENT_STRATEGY.md` says a decision is not recorded, do not fill the gap from legacy files. State what is missing and ask for the current decision. When repository files disagree, the precedence is:

1. The user's latest explicit direction
2. `marketing/outreach/CURRENT_STRATEGY.md`
3. Current production code and current system state
4. Historical outreach files, for background only

## SEO Rules (Mandatory for Every Page)

1. Title: `Primary Keyword - Plain Benefit | GardenSuite` (50-65 chars)
2. Meta description: simple English, one primary keyword, mention actual workflow (max 155 chars)
3. Canonical URL: full absolute URL with `https://gardensuite.in` prefix
4. OG tags: title, description, image (1200x630), type, url, locale (`en_IN`)
5. Twitter card: `summary_large_image` with matching title/description/image
6. Schema.org JSON-LD: BreadcrumbList + page-specific type (only true facts, no fake ratings/prices)
7. Single `<h1>` containing the primary keyword naturally
8. Image `alt` text: descriptive, keyword-relevant (not empty or "image")
9. Internal links to/from at least 2 existing pages with descriptive anchor text
10. Entry added to `sitemap.xml/+server.ts` with correct priority and `changefreq`

## Performance Rules (Mandatory for Every Page)

1. No image in `static/` may exceed 200KB in its served format (WebP preferred)
2. All images must have `width` and `height` attributes
3. Only above-fold hero/LCP images may use `loading="eager"` - maximum 2 per page
4. Hero images must use `<picture>` with WebP `<source>` and responsive `srcset`
5. All below-fold images must use `loading="lazy"`
6. Third-party scripts (GSAP, Lenis) must be dynamically imported in `onMount()`
7. CSS animations must respect `prefers-reduced-motion`
8. No inline SVGs larger than 2KB - extract to component files

## Copy Safety Rules (Mandatory for All Content)

1. Use "helps stop proxy attendance" not "stops proxy attendance"
2. Avoid: "zero paper", "100% automated", "no errors", "guaranteed", "real-time" (unless actually live)
3. Avoid jargon: ecosystem, transformation, next-gen, frictionless, empower, seamless, optimize, cutting-edge, AI-powered, enterprise-grade, scalable platform
4. Prefer tea garden vocabulary: hazira, plucking, leaf weight, proxy attendance, PF, ESI, made tea, muster roll
5. Generic-copy test: "Could this sentence appear on a random HR/ERP software homepage? If yes, rewrite."
6. Reading level test: "Will a busy tea garden owner understand this in one reading?"

## New Page Checklist

Complete ALL items before any new page goes live:

1. SEO rules above - all 10 items verified
2. Performance rules above - all 8 items verified
3. Copy safety rules above - all 6 items verified
4. Page follows the product page formula: Hero - Problem - Workflow - Result - Rollout - CTA
5. Sarbani Associates mentioned in at least one trust-building context
6. Mobile-responsive layout tested at 375px and 768px
7. "Book Free Demo" and "Email Us" CTAs present
8. Breadcrumb navigation from homepage
9. Confidentiality note present if referencing clients: "Many estates keep software details private"
10. Page added to sitemap with correct priority
