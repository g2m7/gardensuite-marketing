# GardenSuite Landing Page Audit

Date: 2026-04-22

Reviewed:
- `http://127.0.0.1:5173`
- `https://obvious.ai/`
- `https://www.keytail.ai/`

Note:
- Playwright MCP is available in this environment, but its temp-dir init failed in this run.
- This audit is still based on the live rendered page using the repo Playwright runtime plus direct code inspection.

## Overall Read

The page is much better than a plain SaaS template, but it still does not reach the clarity, confidence, or premium feel of Obvious and Keytail.

The benchmark sites feel stronger because they do three things better:
- their first screen makes one strong promise immediately
- their visual system is more restrained and more distinctive
- their proof feels real, not decorative

GardenSuite currently feels like it is trying to look premium, but too much of that effort goes into effects, mock illustrations, and borrowed layout patterns instead of product clarity and trust.

## High-Impact Issues

### 1. The hero promise is too generic

Live page:
- H1: "Run your tea garden. Stop the paper chaos."

Benchmark contrast:
- Obvious opens with "Less Chat. More Work."
- Keytail opens with "Get found. Automatically."

Issue:
- The current H1 is clean, but not sharp enough.
- It does not surface the real differentiators above the fold: face attendance, smart wireless scale, offline ERP, cloud MIS dashboard.
- A tea garden manager should understand the unique value in 3 seconds. Right now they mainly understand "software for tea gardens."

Relevant code:
- [src/routes/+page.svelte](/Users/g2m7/projects/biz/gardensuite.in/gs_landing/src/routes/+page.svelte:420)

### 2. The hero visual spends too much energy on scenery and not enough on product

Issue:
- The layered sky, hills, glow, parallax, and dashboard stack is visually busy.
- It feels closer to a motion experiment than a confident product reveal.
- Keytail and Obvious use cleaner product framing. The product is the hero, not the background treatment.
- For GardenSuite, the strongest first-frame visual would be real product proof: face scan, weight capture, or MIS dashboard in a more believable context.

Relevant code:
- [src/routes/+page.svelte](/Users/g2m7/projects/biz/gardensuite.in/gs_landing/src/routes/+page.svelte:486)

### 3. Mobile navigation is missing

Issue:
- The primary nav is hidden below `md`, but there is no hamburger, sheet, or alternate mobile menu.
- On mobile, users are effectively left with logo plus CTA only.
- Benchmark sites collapse navigation cleanly on small screens. This page drops information architecture completely.

Relevant code:
- [src/routes/+page.svelte](/Users/g2m7/projects/biz/gardensuite.in/gs_landing/src/routes/+page.svelte:247)

### 4. The Products menu is hover-only and not touch-friendly

Issue:
- The mega menu opens through `group-hover` only.
- The button itself does not toggle anything on click.
- This is weak on desktop, inaccessible by keyboard, and unusable on touch devices.
- It also makes the navigation feel fragile instead of polished.

Relevant code:
- [src/routes/+page.svelte](/Users/g2m7/projects/biz/gardensuite.in/gs_landing/src/routes/+page.svelte:249)
- [src/routes/+page.svelte](/Users/g2m7/projects/biz/gardensuite.in/gs_landing/src/routes/+page.svelte:270)

### 5. The hero CTA row is not responsive enough

Issue:
- The hero CTA container stays as a single horizontal row on mobile.
- With `px-8` on both buttons and no wrap or stack behavior, it is likely to feel cramped.
- Keytail and Obvious keep the first action area cleaner and more intentional at small sizes.

Relevant code:
- [src/routes/+page.svelte](/Users/g2m7/projects/biz/gardensuite.in/gs_landing/src/routes/+page.svelte:434)

### 6. The site lacks real proof where it matters most

Issue:
- The page says `20+ tea estates`, but it does not name actual estates in the landing content.
- That is a major missed trust lever because the product is niche and region-specific.
- For GardenSuite, named estates, real dashboard screenshots, real face-app screens, and hardware-linked workflow proof would outperform decorative cards.

## Medium-Impact Issues

### 7. The visual system is too repetitive

Issue:
- Many sections reuse the same white or off-white card, soft border, and soft glow formula.
- After the hero, the page rhythm becomes predictable.
- Obvious and Keytail create stronger contrast between sections, which makes the scroll feel more premium and more memorable.

### 8. Too many illustrations feel synthetic instead of product-led

Issue:
- The fake ledger, fake spreadsheet, fake payroll bars, fake nodes, and fake smart-scale illustrations look designed, but not convincing.
- They reduce trust because GardenSuite is a real operational product for a serious workflow.
- Real screenshots and real operational moments would feel stronger than abstract component art.

Relevant code:
- [src/routes/+page.svelte](/Users/g2m7/projects/biz/gardensuite.in/gs_landing/src/routes/+page.svelte:614)
- [src/routes/+page.svelte](/Users/g2m7/projects/biz/gardensuite.in/gs_landing/src/routes/+page.svelte:771)

### 9. The typography is competent but not ownable

Issue:
- `Plus Jakarta Sans` plus `Inter` is safe and readable, but it does not give the page a distinct identity.
- Keytail in particular feels more premium because the typography does more of the branding work.
- GardenSuite currently reads like well-executed template typography rather than a brand with a point of view.

Relevant code:
- [src/routes/layout.css](/Users/g2m7/projects/biz/gardensuite.in/gs_landing/src/routes/layout.css:36)

### 10. The footer feels copied from Obvious instead of designed for GardenSuite

Issue:
- The file literally labels it as a `1:1 Precision Replica of Obvious.ai`.
- That shows in the structure and legal or status patterns.
- Instead of closing the page with GardenSuite trust, support, geography, and parent company strength, it closes like a cloned SaaS footer.
- This hurts brand confidence.

Relevant code:
- [src/routes/+layout.svelte](/Users/g2m7/projects/biz/gardensuite.in/gs_landing/src/routes/+layout.svelte:8)

### 11. Several footer links look fake or broken

Issue:
- Social links use `href="#"`.
- Legal links point to routes that do not exist in the current routes tree.
- `All Services Are Online` points to `#status`, which does not exist.
- Dead links damage trust fast, especially on a product site selling reliability.

Relevant code:
- [src/routes/+layout.svelte](/Users/g2m7/projects/biz/gardensuite.in/gs_landing/src/routes/+layout.svelte:28)
- [src/routes/+layout.svelte](/Users/g2m7/projects/biz/gardensuite.in/gs_landing/src/routes/+layout.svelte:37)
- [src/routes/+layout.svelte](/Users/g2m7/projects/biz/gardensuite.in/gs_landing/src/routes/+layout.svelte:57)

### 12. The footer status message is off-brand for the product story

Issue:
- "All Services Are Online" is a strange closing line for a product whose core differentiator is offline reliability.
- It sounds borrowed from a generic SaaS status page pattern, not from GardenSuite's sales logic.

Relevant code:
- [src/routes/+layout.svelte](/Users/g2m7/projects/biz/gardensuite.in/gs_landing/src/routes/+layout.svelte:57)

### 13. The page still does not push the strongest differentiators hard enough

Issue:
- Face recognition attendance
- smart wireless scale
- offline ERP plus cloud dashboard
- MIS on any device

These are present, but they do not dominate the page the way they should.

The benchmark pages repeat their main value in different forms. GardenSuite spreads its strongest points too evenly.

## Lower-Impact but Still Worth Fixing

### 14. The nav opens too wide and too invisible at the top

Issue:
- The nav starts nearly full width and fully transparent.
- It feels less intentional than the tighter benchmark headers.
- The top of the page would feel more premium with a cleaner initial nav state.

Relevant code:
- [src/routes/+page.svelte](/Users/g2m7/projects/biz/gardensuite.in/gs_landing/src/routes/+page.svelte:170)
- [src/routes/+page.svelte](/Users/g2m7/projects/biz/gardensuite.in/gs_landing/src/routes/+page.svelte:235)

### 15. The page has accessibility and interaction polish gaps

Issue:
- no mobile nav alternative
- hover-only product menu
- no `main` landmark wrapping primary content
- no skip link

These are not only accessibility issues. They also reduce the feeling of completeness and engineering quality.

Relevant code:
- [src/routes/+page.svelte](/Users/g2m7/projects/biz/gardensuite.in/gs_landing/src/routes/+page.svelte:233)
- [src/routes/+layout.svelte](/Users/g2m7/projects/biz/gardensuite.in/gs_landing/src/routes/+layout.svelte:6)

### 16. The footer image is missing explicit dimensions

Issue:
- Small issue, but it is another sign of incomplete polish.

Relevant code:
- [src/routes/+layout.svelte](/Users/g2m7/projects/biz/gardensuite.in/gs_landing/src/routes/+layout.svelte:15)

## What To Change First

If the goal is to get much closer to Obvious and Keytail fast, the first pass should be:

1. Rewrite the hero around one hard differentiator-led promise.
2. Replace the scenic hero composition with a more product-truthful visual.
3. Build a proper mobile nav and click-based products menu.
4. Replace fake illustrations with real product screenshots and workflow proof.
5. Add a real proof band with named tea estates and regional credibility.
6. Rebuild the footer so it feels like Sarbani Associates plus GardenSuite, not Obvious.ai.

## Bottom Line

The current page is not bad. The main problem is that it looks like it is borrowing premium SaaS signals instead of expressing GardenSuite's own strength.

Obvious and Keytail feel better because they are more decisive.

GardenSuite needs less imitation, less decorative abstraction, and much more real product proof.
