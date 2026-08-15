# GardenSuite - Project Reference

## Project Structure

- `/gs_landing/` - SvelteKit + Tailwind v4 + TypeScript (bun)
- `/assets/brand/` - Brand guidelines, logos, design tokens, CSS reference
- `/` - Strategy docs (SEO, requirements, content briefs)

## Quick Start

```bash
cd gs_landing
bun install
bun run dev        # http://localhost:5173
bun run build
```

## Tech Stack

- SvelteKit (latest, Svelte 5)
- Tailwind CSS v4
- shadcn-svelte (add via `npx sv add`)
- Phosphor Icons (`@iconify-json/ph`)
- TypeScript
- Bun

## Brand Design Tokens

### Colors (from assets/brand tokens)

| Token       | Hex       | Usage                        |
| ----------- | --------- | ---------------------------- |
| `brand-600` | `#3D7D2C` | Primary, CTAs, brand anchors |
| `brand-700` | `#2B6321` | Hover states                 |
| `brand-50`  | `#F1F6EB` | Light accent bg              |
| `charcoal`  | `#0A0A0A` | Body text                    |
| `ink`       | `#18181B` | Secondary text               |
| `surface`   | `#FAFAF7` | Subtle backgrounds           |
| `border`    | `#E4E4E7` | Borders                      |

### Typography

- **Font:** Inter (400, 500, 600, 700) via Google Fonts
- **Feature settings:** `'cv02', 'cv03', 'cv04', 'cv11'`
- **DO NOT** use `font-bold` - only `font-semibold` and `font-medium`
- **DO NOT** add new heading sizes or change tracking values
- Display headings: `-0.04em` to `-0.05em` tracking

### Radius

- sm: 8px / md: 12px / lg: 16px / xl: 24px

### Shadows

- `shadow-soft`: `0 12px 30px rgba(74,157,53,0.15)` - CTAs
- `shadow-card`: `0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)` - Cards

### Logo Assets (in gs_landing/static/)

- `favicon.png` - Light-mode favicon (64px)
- `app-icon-512.png` - Apple touch icon / PWA
- `gardensuite-icon-white.svg` - Dark backgrounds
- `gardensuite-icon-source.png` - Source 2048x2048

## Writing & Style Rules

- **NO em dashes (—).** Always use regular hyphens (-) instead. This applies to all content: UI copy, descriptions, comments, docs.
- **Simple language.** Not everyone in the target audience is fluent in English. Use clear, simple words. No big words just to sound sophisticated. Stay professional but accessible.
- **Parent company: Sarbani Associates.** Mention in copyright footer and appropriate places (hero badge, CTA section, about areas).
- **NO background circles/boxes behind icons.** Use color directly on the icon with a subtle drop-shadow only.

## Reference Docs (Source of Truth)

Before making changes, read the relevant docs in `gs_landing/docs/landing-page/`:

- `seo.md` - keyword map, title/meta rules, schema rules, copy safety
- `all-pages-copy-guidelines.md` - brand voice, vocabulary, claim safety
- `product-page-copy-guidelines.md` - page formula, per-module vocabulary
- `styling.md` - visual direction, card usage, motion rules
- `typography.md` - locked type system (DO NOT deviate)

See AGENTS.md for the full SEO checklist, performance rules, copy safety rules, and new page checklist.

## Outreach and Lead Operations

For any lead structure, outreach strategy, campaign-status, or outreach-blocker work, read:

`marketing/outreach/CURRENT_STRATEGY.md`

That is the only current outreach authority. The files under `marketing/archive/` are deprecated history. Do not revive or diagnose the current operation from them.

If the current strategy file says a decision is not recorded, ask for the current decision. Do not substitute a more detailed historical workflow.

## Content Needed (See docs/website/CONTENTS-NEEDED.md)

- Product information (all modules)
- Client testimonials (5-10)
- Case studies (2-3)
- Company story
- Team info
- Contact details

## High-Impact Assets (Get These Quick)

1. Hero image (tea garden photo or dashboard screenshot)
2. 5-10 client logos
3. 3-5 product screenshots
4. Founder photo
