# GardenSuite SEO Content Publishing Plan

**Created:** 2026-09-17
**Owner:** Sarbani Associates
**Scope:** All new guide articles, the guides hub, sitemap entries, and the staged release schedule.
**Related docs:** `seo.md`, `internal-site-map.md`, `attendance-content-plan.md`

## 1. What was created

### Template (one shared component)

All article pages now use `src/lib/components/article/ArticleLayout.svelte`.

It owns, once for every article:

- SeoHead with title, meta description, canonical, OG/Twitter tags, `ogType: article`
- Article schema + BreadcrumbList schema + FAQPage schema (FAQ only when the FAQ is visible on the page)
- Header: plain uppercase kicker, H1, lede, author, updated month, read time
- Quick answer box (AEO / featured snippet target)
- Article body slot (content written per page with the shared `guide-*` classes in `layout.css`)
- Optional mid-article CTA box
- Related reading links (internal links, descriptive anchors)
- FAQ section
- Bottom CTA with Sarbani Associates footer line and confidentiality note

Rule: new articles never copy-paste page shells. Create the page, fill the props, write the body.

### Pages shipped on 2026-09-17

| # | URL                                    | Article                                          | Primary keyword                          |
|---|----------------------------------------|--------------------------------------------------|------------------------------------------|
| 1 | `/guides`                              | Guides hub (all articles)                        | tea garden guides                        |
| 2 | `/guides/how-face-attendance-works-tea-garden` | How Face Attendance Works in a Tea Garden | face attendance tea garden               |
| 3 | `/guides/tea-garden-attendance-without-internet` | Tea Garden Attendance Without Internet   | offline tea garden attendance            |
| 4 | `/guides/mobile-attendance-to-estate-office` | How Mobile Attendance Reaches the Estate Office | attendance sync tea garden       |
| 5 | `/guides/worker-face-enrollment-tea-garden` | Worker Face Enrollment Guide for Tea Gardens | face enrollment tea garden       |
| 6 | `/guides/attendance-rollout-checklist-tea-garden` | Attendance and Weighing Rollout Checklist | tea garden attendance rollout    |
| 7 | `/guides/paper-register-to-face-attendance` | Paper Register to Face Attendance            | paper muster roll to biometric           |
| 8 | `/guides/punch-attendance-split-shifts-overtime` | Punch Attendance, Split Shifts and Overtime | punch attendance tea garden      |
| 9 | `/guides/rainfall-deduction-fine-leaf-plucking` | Rainfall Deductions and Fine Leaf Checks   | wet leaf deduction tea garden    |
| 10| `/guides/daily-plucking-task-assignment` | Daily Plucking Task Assignment                   | plucking task tea garden                 |

Migrated onto the template the same day (content kept, shells replaced):

- `/guides/stop-proxy-attendance-tea-garden`
- `/guides/smart-leaf-weighing-tea-garden`
- `/guides/how-tea-garden-hazira-is-calculated`

Existing pages that already covered the topic and were not duplicated:

- `/guides/stop-proxy-attendance-tea-garden` (covers "why proxy happens and what stops it")
- `/guides/smart-leaf-weighing-tea-garden` (covers Bluetooth weighing benefits and disputes)

## 2. Publishing schedule

The site is static and deploys whole, so "publishing" is staged in three levers:
deploy batches, Search Console submissions, and distribution. Every page below is
already live in the codebase once the batch deploys.

### Batch 1 - deploy 2026-09-21 (Mon)

Deploy the full build (all pages + hub + sitemap). This costs nothing extra because
the code is finished.

Then submit to Google Search Console, in this order:

1. `/guides` (hub first so crawlers find the cluster)
2. `/guides/how-face-attendance-works-tea-garden`
3. `/guides/tea-garden-attendance-without-internet`
4. `/guides/mobile-attendance-to-estate-office`

Verification same day:

- `bun run check` and `bun run build` pass
- `/sitemap.xml` shows all 21 routes (products, regions, ERP, guides, glossary, legal)
- Every guide has: one H1, canonical, article schema, breadcrumb schema, FAQ schema only where FAQ is visible
- Every guide links to at least 2 existing pages with descriptive anchors
- Footer "Guides & Resources" links to `/guides`
- WhatsApp/LinkedIn/X share previews render title and OG image

### Batch 2 - distribution 2026-09-22 to 2026-09-25

One article promoted per day, in this order (highest buyer intent first):

| Day       | Article                                      | Channel                                                       |
|-----------|----------------------------------------------|---------------------------------------------------------------|
| Tue 09-22 | How Face Attendance Works in a Tea Garden     | WhatsApp status, Sarbani LinkedIn page, client WhatsApp lists |
| Wed 09-23 | Tea Garden Attendance Without Internet        | LinkedIn page post                                            |
| Thu 09-24 | Paper Register to Face Attendance             | LinkedIn page post + owner WhatsApp lists                     |
| Fri 09-25 | Attendance and Weighing Rollout Checklist     | LinkedIn page post                                            |

Distribution rules (from AGENTS.md outreach rules):

- One named human sender, plain text, no brochure attachments.
- Do not paste the same promotional text into multiple Facebook groups. Group activity stays useful and group-specific.
- No claims of "100%", "real-time", or "stops proxy attendance" in the social text. Use "helps stop proxy attendance".

### Batch 3 - distribution 2026-09-28 to 2026-10-02

| Day       | Article                                        | Channel                    |
|-----------|------------------------------------------------|----------------------------|
| Mon 09-28 | Worker Face Enrollment Guide                    | LinkedIn page post         |
| Tue 09-29 | Daily Plucking Task Assignment                  | LinkedIn page post         |
| Wed 09-30 | Rainfall Deductions and Fine Leaf Checks        | LinkedIn page post         |
| Thu 10-01 | Punch Attendance, Split Shifts and Overtime     | LinkedIn page post         |
| Fri 10-02 | How Tea Garden Hazira is Calculated (refresh)   | Reshare updated article    |

### Batch 4 - 2026-10-05 to 2026-10-09

- Resubmit any guide still absent from Google's index (site: query per URL).
- Check Search Console performance after two weeks: impressions, queries, average position per guide.
- Record which queries each guide actually ranks for in `docs/landing-page/seo-publishing-plan.md` (append a results log at the bottom of this file).
- If a guide gets impressions but no clicks, rewrite its title tag and meta description before writing any new article.

## 3. Recurring cadence (from month 2)

- Two new guide articles per month, chosen from real sales questions (the sales-team objection log is the source, not a keyword tool).
- Every new article: written on `ArticleLayout`, added to the `/guides` hub list, added to the sitemap with `lastmod`, given 2 internal links from existing pages, submitted in Search Console on publish day.
- Refresh rule: any guide not updated for 6 months gets a fact pass before it is reshared.

## 4. Candidate backlog (do not write until a real question demands it)

- How GardenSuite works with bought leaf factories
- Weekly vs monthly wage cycles in GardenSuite payroll
- Store issue and return workflow for estate ration
- Factory outturn tracking: green leaf to made tea
- Muster roll register: what the law expects and how records stay compliant (only with legal review)
- Devices, Bluetooth and GPS checks before the plucking season (support guide)

Backlog rule from `attendance-content-plan.md`: each guide must answer a real buyer question, link back to its product page, and use only verified screenshots or named media placeholders.

## 5. Publish-day checklist (every article)

1. Article uses `ArticleLayout` (no copied shells)
2. Title: `Primary Keyword - Plain Benefit | GardenSuite`, 50-65 chars
3. Meta description mentions one primary keyword and the actual workflow, max 155 chars
4. Single H1 containing the primary keyword naturally
5. Quick answer box written as a direct, quotable answer
6. 2+ internal links to existing pages with descriptive anchors
7. Added to `/guides` hub list
8. Added to `sitemap.xml/+server.ts` with correct lastmod
9. Submitted in Search Console on the day it is promoted
10. Copy safety pass: no em dashes, no banned jargon, "helps stop proxy attendance" phrasing, no invented numbers, Sarbani Associates present in trust context
11. Mobile check at 375px and 768px

## Results log

(Append monthly Search Console results here: URL, top queries, impressions, clicks, position.)
