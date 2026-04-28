# Tailark References → GardenSuite Section Mapping

All 20 components captured (desktop + mobile) in `/tailark-refs/`. Below is the mapping of each reference to a GardenSuite landing page section, with reasoning.

---

## GardenSuite Page Sections (in scroll order)

1. **Nav** - KEEP AS-IS
2. **Hero** - KEEP AS-IS (parallax, scroll physics unchanged)
3. **Problem Strip** - NEW, 3 pain points
4. **Product Grid** - NEW, 5 module cards replacing HowItWorks + FeaturesCarousel
5. **Proof Strip** - Stats row (repositioned)
6. **Differentiator** - Simplified, 3 cards only
7. **FAQ** - KEEP layout, restyle
8. **CTA Band** - KEEP, restyle
9. **Contact** - NEW section
10. **Footer** - KEEP AS-IS

---

## Component Mapping

### Section 3: Problem Strip (3 pain points)
**Primary:** `features/nine` - 3 stacked feature cards with icons + embedded mini-UI widgets
**Why:** Clean vertical card layout. Each card can hold an icon, pain point title, description, and a mini illustration (e.g. torn paper register, buddy punching icon, calculator). Adapts well to mobile (single column).
**Fallback:** `description-list/six` - 3-column grid with icons if horizontal layout preferred

### Section 4: Product Grid (5 module cards)
**Primary:** `content/four` - 3x2 grid (6 cards), icon + title + description
**Why:** Clean uniform grid. Perfect for 5 product modules + 1 "and more" or CTA card. Icons above each card, consistent sizing. Mobile stacks to single column.
**Alternative layout:** `features/five` - offset dashboard mockup with text, for the hero/flagship product card (Attendance)
**Secondary ref:** `features-carousel/two` - carousel pattern if we want horizontal scroll between products

### Section 5: Proof Strip (stats row)
**Primary:** `stats/one` - 4-column compact stats bar with primary-colored numbers
**Why:** Matches the existing proof strip perfectly: 2 stat numbers + descriptive text. Very compact, doesn't eat vertical space. "20+ Estates | 7 Regions | 25+ Years | Sarbani Associates" maps directly.
**Secondary:** `features/fourteen` - similar 3-column stat layout if we want dividers

### Section 6: Differentiator (3 cards)
**Primary:** `features/four` - 2-column split with illustrations + bottom mini-feature row
**Why:** The 2-column layout with decorative illustrations on each side mirrors the current "Why GardenSuite" layout. Bottom mini-feature row can hold the 3 differentiators as icon + title + description cards.
**Alternative:** `how-it-works/seven` - 3-column with divide-x and step numbers, for a more structured look

### Section 7: How It Works (workflow section)
**Primary:** `how-it-works/six` - 3-step workflow with connectors between steps
**Why:** Best suited for showing the connected workflow: Face Scan → Auto-Calculate → Daily Report. Connectors (plus/equals icons) visually link steps. Each step has its own illustration card.
**Secondary:** `how-it-works/three` - offset mockup layout if we want a single narrative with dashboard preview

### Section 8: Deep-Dive Feature Showcase
**Primary:** `features/five` - heading left, large dashboard mockup right, offset positioning
**Why:** For showcasing a specific product feature in detail (e.g. the MIS dashboard or attendance screen). Text on left, real app screenshot on right. Creates visual depth.
**Secondary:** `features/two` - chat bubble + integrations panel style, for showing the product ecosystem

### Section 9: FAQ
**Primary:** `faqs/one` - 2-column grouped accordion with category headers
**Why:** Matches current FAQ content structure. Groups questions by topic (General, Technical). Chevron expand/collapse. Footer with "Can't find what you're looking for?" link. Mobile stacks to single column.

### Section 10: CTA Band
**Primary:** `call-to-action/two` - full-width centered text + CTA button
**Why:** Clean, minimal. "See it on your own numbers" + Book Free Demo + Email Us. Low visual complexity. Matches current CTA section intent.

### Section 11: Contact
**Primary:** `contact` (from /contact page) - 2-column with heading left + contact cards right
**Why:** Professional contact section. Left side: "Get in touch" heading. Right side: Sales contact, support email, phone. Maps to GardenSuite's contact needs.

### Section 12: Footer
**KEEP AS-IS** - Current footer design stays unchanged.

---

## Unused References (available for product pages or future use)

| Ref | Notes |
|-----|-------|
| `stats/three` | 2-column with bordered stats list - could work for a product page hero |
| `features-carousel/four` | Step-based carousel - could work for product page walkthroughs |
| `how-it-works/one` | 3-column with mock UI widgets - similar to features-nine, slightly different |
| `team/fifteen` | Team grid with photos - could add to About page later |
| `comparator/five` | Comparison table - useful if we add pricing tiers or competitor comparison |

---

## Files Captured

All screenshots in `/tailark-refs/`:

```
stats-three-desktop.png / stats-three-mobile.png
stats-one-desktop.png / stats-one-mobile.png
features-two-desktop.png / features-two-mobile.png
features-four-desktop.png / features-four-mobile.png
features-five-desktop.png / features-five-mobile.png
features-nine-desktop.png / features-nine-mobile.png
features-fourteen-desktop.png / features-fourteen-mobile.png
content-four-desktop.png / content-four-mobile.png
carousel-two-desktop.png / carousel-two-mobile.png
carousel-four-desktop.png / carousel-four-mobile.png
team-fifteen-desktop.png / team-fifteen-mobile.png
comparator-five-desktop.png / comparator-five-mobile.png
how-three-desktop.png / how-three-mobile.png
how-six-desktop.png / how-six-mobile.png
how-seven-desktop.png / how-seven-mobile.png
how-one-desktop.png / how-one-mobile.png
cta-two-desktop.png / cta-two-mobile.png
faqs-one-desktop.png / faqs-one-mobile.png
desc-list-six-desktop.png / desc-list-six-mobile.png
contact-desktop.png / contact-mobile.png
```
