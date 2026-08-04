# Attendance Pages - Impeccable Fix List

## Scope

This audit covers:

- `/products/attendance`
- `/products/attendance/face-attendance`
- `/products/attendance/smart-weighing`
- `/products/attendance/offline-sync`

The review used the GardenSuite landing-page rules, the Impeccable brand and audit guidance, source inspection, and rendered checks at 375px, 768px, and 1440px.

No fictional product visuals are recommended. Keep marked placeholders during development. Replace them only with approved, sanitized GardenSuite captures.

## Implementation Status - 4 August 2026

- F02 to F14 are implemented across the attendance hub, all three detail pages, and the shared navigation, FAQ, footer, breadcrumb, trust, CTA, and reveal components.
- The visible F01 placeholders are replaced with existing GardenSuite screenshots already present in the repository. No replacement artwork was invented. The placeholder 1200x630 OG image remains a release dependency until a final approved social image is supplied.
- The hub now measures 7,614px at 375px, down 18% from the audited version. Detail pages measure 8,464px to 8,712px, down 15% to 19%.
- All four routes return 200 at 375px, 768px, and 1440px, with one H1, no horizontal overflow, and both required CTAs.
- The final Impeccable detector reports no remaining findings in the attendance routes or shared product components.

## Verdict

The pages are clean, readable, consistent with the existing GardenSuite style, and technically stable. They do not look broken. They do look unfinished because media-production instructions are visible as customer content and the three detail pages repeat the same layout too closely.

At 375px, the attendance hub is 9,274px tall. The detail pages are 10,195px to 10,471px tall. This is too much scrolling for the amount of buyer-facing information on the pages.

### Audit Health Score

| Dimension         |     Score | Main finding                                                                                             |
| ----------------- | --------: | -------------------------------------------------------------------------------------------------------- |
| Accessibility     |       3/4 | Good structure and focus styles, but mobile navigation and FAQ semantics need work.                      |
| Performance       |       3/4 | Lean while placeholders are present, but scroll reveals depend on JavaScript.                            |
| Responsive design |       3/4 | No horizontal overflow at tested widths, but mobile pages are too long and breadcrumbs are crowded.      |
| Theming           |       2/4 | Light mode is intentional, but page colors are repeated as hard-coded values instead of shared tokens.   |
| Anti-patterns     |       2/4 | Repeated uppercase kickers, bordered grids, and identical detail layouts make the system feel templated. |
| **Total**         | **13/20** | **Acceptable, with significant work needed before release.**                                             |

## Fix Order

### P1 - Release fixes

#### F01. Keep media placeholders internal to development

**Pages:** All four attendance pages
**Locations:** `AttendanceProductHero.svelte`, `AttendanceProductProof.svelte`, `AttendanceDetailPage.svelte`, `attendance-detail-content.ts`

The placeholder boxes are correct for development, but the current labels read like instructions to the design team. Examples include `FACE MATCH RESULT REQUIRED` and `OFFICE ATTENDANCE WORKSPACE REQUIRED`.

**Fix:**

- Keep `MediaRequirement` while approved captures are pending.
- Do not publish pages or social previews with placeholder artwork.
- Replace each placeholder only with a real, sanitized GardenSuite capture.
- Use demo workers and remove worker names, IDs, estate names, exact locations, phone numbers, and other private data.
- Prepare a real 1200x630 attendance OG image from approved captures. Do not use the current placeholder as the public OG image.
- Follow the existing image performance rules: WebP, under 200KB, explicit dimensions, responsive sources, and lazy loading below the fold.

**Acceptance:** No invented UI, no private records, no visible media-production brief in the released page, and no placeholder OG preview.

#### F02. Separate buyer copy from production instructions

**Pages:** Face Attendance, Smart Weighing, Offline Sync
**Locations:** `attendance-detail-content.ts:115`, `attendance-detail-content.ts:230`, `attendance-detail-content.ts:351`

The proof sections currently speak to the site team instead of the buyer. `Show the match, not a marketing illustration` is a useful internal rule, but it is not product marketing copy.

**Fix:**

- Move capture requirements into the placeholder only or into internal documentation.
- Make the visible heading explain what the buyer can verify in the product.
- Face Attendance should explain the saved identity and work context.
- Smart Weighing should explain the linked worker, scale reading, deductions, and net weight.
- Offline Sync should explain pending, failed, synced, reviewed, and finalized records.

**Acceptance:** Every heading answers a buyer question. No public heading tells the design team what media to create.

#### F03. Make all content visible when JavaScript fails

**Pages:** All four attendance pages
**Locations:** `+page.svelte:156`, `AttendanceDetailPage.svelte:354`, `scroll-reveal.ts`

Sections with `reveal-on-scroll` start at `opacity: 0`. If JavaScript does not load or hydration fails, most of the page remains invisible.

**Fix:**

- Render sections visible by default.
- Add the hidden starting state only after JavaScript confirms that reveal motion is available.
- Keep the current reduced-motion behavior.

**Acceptance:** The full page remains readable with JavaScript disabled, with reduced motion enabled, and after a hydration error.

#### F04. Cut mobile page length and remove repeated section weight

**Pages:** All four attendance pages
**Locations:** `AttendanceDetailPage.svelte`, `AttendanceWorkflow.svelte`, `AttendanceProductProof.svelte`, `AttendanceCapabilityRoutes.svelte`

The detail pages use eight major content bands plus the global footer. The repeated 80px to 128px section padding, large placeholders, workflow grids, capability grids, rollout, FAQ, related links, and final CTA create a 10,000px mobile page.

**Fix:**

- Merge the three product facts into the problem or workflow introduction.
- Combine the proof and capability sections where the same capture can explain both.
- Reduce mobile section padding while preserving desktop whitespace.
- Keep one complete workflow, one proof moment, one capability summary, rollout, FAQ, and CTA.
- Target a 20% to 25% reduction in mobile page height without removing important product facts.

**Acceptance:** A buyer can scan the problem, workflow, proof, rollout, and CTA without passing through repeated empty space or repeated grids.

#### F05. Add established trust proof to each detail page

**Pages:** Face Attendance, Smart Weighing, Offline Sync
**Locations:** `AttendanceDetailPage.svelte:124`, `AttendanceDetailPage.svelte:140`

The hub reuses the homepage trust factors. The detail pages only show a small Sarbani Associates line and product facts. This is not enough reassurance after a buyer lands directly from search.

**Fix:**

- Add a compact trust row near the hero using the established proof: serving tea gardens since 2000, 20+ tea estates, 7 tea-growing regions, and on-site setup and training.
- Avoid a large hero-metric template. Use one quiet proof line or a compact three-item row.
- Keep Sarbani Associates, Bagdogra, Siliguri visible.
- Keep the confidentiality message, but do not promise that client names will always be shared during demos.

**Acceptance:** A search visitor sees product relevance and company credibility before the first long scroll.

#### F06. Fix mobile menu keyboard behavior inherited by these pages

**Pages:** All four attendance pages through the shared navigation
**Location:** `GlobalNav.svelte:96`

The menu opens from the keyboard, but Escape does not close it. Focus is not contained in the open navigation sheet, and the 40px menu control is smaller than the preferred 44px touch target.

**Fix:**

- Close the mobile menu on Escape.
- Move focus into the menu when it opens and restore focus to the trigger when it closes.
- Prevent keyboard focus from moving into the covered page while the sheet is open.
- Increase the menu trigger to at least 44px by 44px.
- Add `aria-controls` and a stable ID for the mobile navigation panel.

**Acceptance:** The menu can be opened, used, and closed with keyboard only, without focus reaching covered content.

#### F07. Correct inherited copy-safety and trust claims

**Pages:** All four attendance pages through shared components
**Locations:** `GlobalNav.svelte:263`, attendance hub trust footnote, global footer status

The Products menu says `Stop proxy attendance and stolen weights.` This violates the project rule to use `helps stop proxy attendance` and sounds accusatory. The hub also promises that estate names are shared during demos. The footer shows `All Systems Online` without a visible status source.

**Fix:**

- Change the menu description to a safe, factual line such as `Helps reduce proxy attendance and links leaf weight to the worker.`
- Change the hub footnote to a confidentiality statement that does not promise client disclosure.
- Remove `All Systems Online` unless it is backed by a real status service. If it is real, link it to the status source.

**Acceptance:** No absolute, accusatory, unsupported, or unverified trust claim appears on the attendance routes.

### P2 - Conversion and clarity fixes

#### F08. Give each detail page a product-specific composition

**Pages:** Face Attendance, Smart Weighing, Offline Sync
**Location:** `AttendanceDetailPage.svelte`

All three pages currently use the same hero split, facts strip, problem split, four-card workflow, proof split, six-card grid, rollout, FAQ, related links, and CTA. The shared component system is good, but the pages feel cloned.

**Fix:** Add a small set of layout variants inside the shared renderer, not three unrelated page designs.

- **Face Attendance:** Phone-first proof with face match, work code, hazira or punch state, and fallback reason.
- **Smart Weighing:** Scale and phone shown as one field pair, followed by a compact deductions and net-weight record.
- **Offline Sync:** Field phone and office review shown as a two-stage flow with pending, failed, synced, and finalized states.

**Acceptance:** The pages remain clearly related, but a buyer can identify the product from the layout before reading the heading.

#### F09. Reduce repeated kickers and identical bordered grids

**Pages:** All four attendance pages
**Locations:** Attendance route components and `AttendanceDetailPage.svelte`

Nearly every section uses a small green uppercase kicker above a large heading. Workflow and capability content repeatedly use equal bordered rectangles. This is the strongest Impeccable templating signal in the rendered pages.

**Fix:**

- Keep uppercase kickers for the hero, one major proof section, rollout, and final CTA.
- Remove kickers where the heading already gives enough context.
- Keep the bordered workflow grid where sequence matters.
- Present capabilities as grouped rows or a compact checklist instead of another equal-card grid.
- Do not add new decorative cards, icon boxes, glows, or gradients.

**Acceptance:** Each section has a distinct job and visual rhythm without leaving the established Tailark language.

#### F10. Simplify mobile breadcrumbs

**Pages:** All detail pages
**Locations:** `Breadcrumbs.svelte`, `AttendanceDetailPage.svelte:86`

The four-level breadcrumb wraps into a crowded block at 375px. The current page title competes with the hero kicker directly below it.

**Fix:**

- Keep the full breadcrumb and schema on tablet and desktop.
- On mobile, show `Back to Attendance & Weighing` or truncate intermediate levels visually.
- Preserve the current page in accessible text or `aria-current` if it remains visible.

**Acceptance:** The mobile breadcrumb fits in one or two clean lines and remains easy to tap.

#### F11. Improve FAQ semantics and related-page navigation

**Pages:** All four attendance pages
**Locations:** `FaqSection.svelte:69`, `AttendanceDetailPage.svelte:302`

FAQ questions use an `h3` inside a `button`, which is invalid HTML structure. Related attendance links are useful for SEO but visually weak and have small tap areas.

**Fix:**

- Wrap each FAQ button in its heading, or keep the button text in a `span` and preserve a valid heading hierarchy.
- Give each accordion panel an ID and connect it with `aria-controls` and `aria-labelledby`.
- Turn related pages into a compact route row with at least 44px vertical tap areas and a clear current-page state.

**Acceptance:** FAQ markup validates, accordion relationships are announced correctly, and sibling pages are easy to select on mobile.

#### F12. Shorten the longest detail hero headings

**Pages:** Especially Offline Sync and Face Attendance
**Locations:** `attendance-detail-content.ts:70`, `attendance-detail-content.ts:306`

The large desktop type is consistent with the site, but the narrow hero column forces long headings into four to six lines. Offline Sync becomes the most visually dominant example.

**Fix:**

- Keep the primary keyword naturally in the single H1.
- Aim for 10 to 13 words where possible.
- Move the second benefit into the lede if the keyword phrase makes the heading too long.
- Do not reduce the type so far that the detail hero loses hierarchy.

**Acceptance:** H1s remain search-clear and product-specific without becoming dense text blocks.

### P3 - System polish

#### F13. Consolidate repeated color values into approved tokens

**Pages:** Attendance components and shared product components
**Locations:** Repeated `#111111`, `#52525B`, `#71717A`, `#1B5E3B`, `#E4E4E7`, and `#FAFAF7` values

Move the existing approved colors into shared semantic variables for text, muted text, accent, border, white, and warm surface. This is a maintainability improvement, not a redesign.

#### F14. Remove the dormant side-stripe card pattern

**Pages:** Not currently rendered because attendance pages pass `buyers={[]}`
**Location:** `ProductCta.svelte:87`

The Impeccable detector found one `border-l-4` side-tab pattern. It is not visible on the current attendance routes, so it is not a release blocker for these pages. Replace it before buyer cards are used again.

## Page-by-Page Treatment

### Attendance hub

Keep:

- centered hero and two clear CTAs
- early trust strip
- three-step field workflow
- product routing to the three detail pages
- rollout, FAQ, and final CTA

Fix:

- replace four development placeholders with approved captures before release
- make the hero capture the strongest proof moment
- reduce the second equal-card grid or turn it into a simpler route row
- rewrite the confidentiality footnote without promising client names

### Face Attendance

Show:

- approved face match result with demo worker data
- section and work code context
- normal hazira or punch state
- one practical fallback state with a recorded reason

Do not show:

- real worker details
- invented face confidence scores
- internal capture instructions as buyer copy

### Smart Weighing

Show:

- scale connection and current weight
- verified worker and harvest session
- gross weight, allowed deduction, and net weight where present in the actual product
- one clear fallback path when the supported scale is unavailable

Do not show:

- a generic weighing illustration in place of the product
- unsupported scale brands or fabricated numbers
- accusatory phrases such as stolen weights

### Offline Sync

Show:

- local save state on the field phone
- pending, failed, retried, and synced states that exist in the product
- the office record or summary behind the total
- final review or export state where it exists

Do not show:

- a generic cloud diagram
- a fake live-sync animation
- the word `real-time`

## What Must Not Change

- Inter and Plus Jakarta Sans typography
- white and warm off-white base with restrained GardenSuite green
- existing primary and secondary CTA language
- simple tea garden vocabulary
- Sarbani Associates trust context
- light-mode direction
- no fictional product imagery
- no glassmorphism, colored glow, icon background shapes, or new pill kickers
- SEO routes, canonicals, schema, sitemap entries, and internal linking

## Verification After Fixes

- Recheck all four routes at 375px, 768px, and 1440px.
- Confirm no horizontal overflow.
- Confirm all page content is visible with JavaScript disabled.
- Confirm reduced-motion mode removes reveal movement.
- Test mobile navigation and FAQ with keyboard only.
- Confirm interactive controls have visible focus and practical touch targets.
- Confirm contrast remains at least WCAG AA.
- Confirm every released media file is approved, sanitized, correctly sized, and under 200KB.
- Confirm no placeholder or internal production instruction appears in metadata or public screenshots.
- Run `bun run check`, `bun run build`, and `git diff --check`.

## Positive Findings To Preserve

- All four routes return successfully and have no horizontal overflow at the tested widths.
- Each page has one H1 and a logical H1 to H2 to H3 structure.
- Main text colors pass WCAG AA contrast in the rendered detail pages.
- FAQ controls work with Enter and show a visible focus ring.
- The pages respect reduced-motion preferences.
- Copy uses tea garden vocabulary and avoids most banned marketing jargon.
- Book Free Demo and Email Us remain visible at the final decision point.
- The shared detail renderer makes future fixes efficient when variants are added carefully.
