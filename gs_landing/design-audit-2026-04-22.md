# GardenSuite Landing Page Audit

Date: 2026-04-22

Reviewed:
- `http://127.0.0.1:5173`
- `https://obvious.ai/`
- `https://www.keytail.ai/`

Method:
- live rendered review of the current landing page
- direct code inspection of the current Svelte files
- re-check of the original audit findings after fixes were applied

## Current Verdict

The page is clearly stronger than the earlier version.

The biggest structural issues are fixed:
- stronger hero message
- working mobile navigation
- click-based products menu
- responsive hero CTA layout
- real proof section with named tea estates
- cleaner, more brand-specific footer

The remaining weaknesses are mostly visual and brand-quality issues, not basic landing-page structure issues.

## Status Summary

### Resolved

1. The hero promise is no longer too generic.
   The new hero headline is much sharper and more differentiator-led:
   "Every worker verified. Every leaf weighed. Every number ready."

2. Mobile navigation is now present.
   The page now has a working mobile menu sheet and a clear hamburger trigger.

3. The products menu is no longer hover-only.
   It now opens on click and exposes `aria-expanded`.

4. The hero CTA row now behaves correctly on mobile.
   Both hero buttons stack full width in the rendered mobile layout.

5. The page now includes real proof.
   The named tea estates band is a meaningful trust improvement and directly addresses the niche buyer audience.

6. The footer is no longer a copied Obvious-style structure.
   It is now much more grounded in GardenSuite and Sarbani Associates.

7. The fake and broken footer links issue is largely fixed.
   The old `#` social links and legal-route clutter are gone.

8. The "All Services Are Online" footer message is gone.
   This removes a message that conflicted with the product's offline reliability story.

9. The accessibility gaps around missing `main` and skip link are fixed.
   There is now a skip link and a `main#main-content` wrapper.

10. The footer image dimension issue is fixed.

## Partially Resolved

### 1. The hero now says the right thing, but it still does not look as premium as the benchmark heroes

Status: Partial

What improved:
- The new headline is stronger.
- The supporting line now pushes the differentiators clearly:
  face recognition attendance, wireless smart scale, offline ERP, and cloud MIS dashboard.

What still holds:
- The visual impact is still below Obvious and Keytail.
- The hero composition still depends heavily on scenic treatment rather than a truly commanding product-first moment.

Relevant code:
- [src/routes/+page.svelte](/Users/g2m7/projects/biz/gardensuite.in/gs_landing/src/routes/+page.svelte:513)

### 2. The top nav is improved, but still not fully benchmark-level

Status: Partial

What improved:
- The nav no longer starts fully invisible.
- Mobile nav exists and works.

What still holds:
- The header still feels more utility-driven than premium.
- It is better, but it does not yet have the same calm confidence as the benchmark headers.

Relevant code:
- [src/routes/+page.svelte](/Users/g2m7/projects/biz/gardensuite.in/gs_landing/src/routes/+page.svelte:213)
- [src/routes/+page.svelte](/Users/g2m7/projects/biz/gardensuite.in/gs_landing/src/routes/+page.svelte:272)

### 3. The strongest differentiators are much clearer, but the page still does not fully build the whole brand around them

Status: Partial

What improved:
- Hero copy is now built around verification, weighing, and readiness.
- Hero support text calls out the exact differentiators.
- Proof band reinforces tea garden credibility.

What still holds:
- Those differentiators are clearer in copy than in the visual system.
- The page still spends too much visual energy on style treatments that do not deepen trust.

## Still Standing

### 1. The hero visual still spends too much energy on scenery and not enough on product

Status: Still stands

Issue:
- The sky, hills, glow, and parallax stack still lead the visual impression.
- The product is present, but the composition still feels designed around atmosphere first.
- Obvious and Keytail feel more decisive because their hero visuals are cleaner and more confident.

What would improve it:
- less scenic layering
- less decorative parallax weight
- a stronger real-product first frame
- more believable workflow proof in the hero itself

Relevant code:
- [src/routes/+page.svelte](/Users/g2m7/projects/biz/gardensuite.in/gs_landing/src/routes/+page.svelte:578)

### 2. Too many illustrations still feel synthetic instead of product-led

Status: Still stands

Issue:
- The page still uses fake operational graphics in multiple places:
  fake ledger cards, fake spreadsheet treatment, fake smart-scale module, fake payroll bars, fake node workflows.
- For a serious operational product, these weaken credibility compared with real screenshots, real device moments, and real workflow states.

What would improve it:
- replace decorative product metaphors with real interface proof
- use more real screenshots from the face app, dashboard, and MIS
- show a true attendance to weighing to payroll chain

Relevant code:
- [src/routes/+page.svelte](/Users/g2m7/projects/biz/gardensuite.in/gs_landing/src/routes/+page.svelte:614)
- [src/routes/+page.svelte](/Users/g2m7/projects/biz/gardensuite.in/gs_landing/src/routes/+page.svelte:1045)
- [src/routes/+page.svelte](/Users/g2m7/projects/biz/gardensuite.in/gs_landing/src/routes/+page.svelte:1096)

### 3. The visual system is still somewhat repetitive after the hero

Status: Still stands

Issue:
- Many sections still rely on the same rounded off-white card, soft border, and soft glow formula.
- The page scroll is improved, but still not as varied or intentional as the benchmark sites.

What would improve it:
- stronger section-to-section contrast
- fewer repeated card formulas
- one or two more distinctive section moods

### 4. The typography is still safe rather than ownable

Status: Still stands

Issue:
- `Plus Jakarta Sans` plus `Inter` is readable and modern, but it still feels like good default SaaS typography.
- The copy is stronger now, but the type system still does not create a unique brand feel on its own.

What would improve it:
- a clearer display-type point of view
- stronger hierarchy choices
- tighter relationship between typography and tea-garden industrial trust

Relevant code:
- [src/routes/layout.css](/Users/g2m7/projects/biz/gardensuite.in/gs_landing/src/routes/layout.css:36)

### 5. One footer link still looks questionable

Status: Resolved (2026-04-22)

Issue:
- `Smart Weighing` in the footer linked to `/products/attendance` as a separate link from `Face Attendance`.
- Both links went to the same page, which was misleading.

Fix applied:
- Merged the two links into a single "Face Attendance & Smart Weighing" link, matching the nav convention.

Relevant code:
- [src/lib/components/Footer.svelte](/Users/g2m7/projects/biz/gardensuite.in/gs_landing/src/lib/components/Footer.svelte:35)

## What Changed Most

The biggest shift is that the page is no longer failing on fundamentals.

Before, the page had serious issues in:
- mobile navigation
- interaction model
- trust proof
- footer credibility
- accessibility basics

Now the unresolved problems are mostly:
- premium visual quality
- originality
- stronger product-truthful art direction

That is a much better place to be.

## Next Best Moves

If the goal is to move materially closer to Obvious and Keytail, the next pass should focus on:

1. Rebuild the hero visual around a more product-truthful composition.
2. Replace the fake operational illustrations with real product proof.
3. Introduce stronger section contrast so the page does not repeat the same card language everywhere.
4. Tighten the typography so the brand feels more distinctive.
5. Clean up the remaining footer link ambiguity.

## Bottom Line

The audit findings do not fully stand anymore.

A large number of them are resolved, and the current page is meaningfully better.

What still stands is mainly the higher bar:
- more product truth
- more visual originality
- more premium restraint

That is now the real gap between GardenSuite and the benchmark sites.
