# GardenSuite - Project Reference

## Project Structure

- `/gs_landing/` - SvelteKit + Tailwind v4 + TypeScript (bun)
- `/brand_pack/` - Brand guidelines, logos, design tokens, CSS reference
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

### Colors (from brand_pack tokens)

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-600` | `#3D7D2C` | Primary, CTAs, brand anchors |
| `brand-700` | `#2B6321` | Hover states |
| `brand-50` | `#F1F6EB` | Light accent bg |
| `charcoal` | `#111827` | Body text |
| `ink` | `#1F2937` | Secondary text |
| `surface` | `#F6F8F3` | Subtle backgrounds |
| `border` | `#DDE3D5` | Borders |

### Typography

- **Font:** Inter (400, 500, 600, 700) via Google Fonts
- **Feature settings:** `'cv02', 'cv03', 'cv04', 'cv11'`

### Radius

- sm: 6px / md: 10px / lg: 14px / xl: 20px

### Shadows

- `shadow-soft`: `0 12px 30px rgba(74,157,53,0.15)` - CTAs
- `shadow-card`: `0 8px 24px rgba(17,24,39,0.08)` - Cards

### Logo Assets (in gs_landing/static/)

- `favicon.png` - Light-mode favicon (64px)
- `app-icon-512.png` - Apple touch icon / PWA
- `gardensuite-icon-white.svg` - Dark backgrounds
- `gardensuite-icon-source.png` - Source 2048x2048

## Writing & Style Rules

- **NO em dashes (—).** Always use regular hyphens (-) instead. This applies to all content: UI copy, descriptions, comments, docs.
- **Simple language.** Not everyone in the target audience is fluent in English. Use clear, simple words. No big words just to sound sophisticated. Stay professional but accessible.
- **Parent company: Sarbani Associates.** Mention in copyright footer and appropriate places (hero badge, CTA section, about areas).

## Content Needed (See CONTENTS-NEEDED.md)

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
