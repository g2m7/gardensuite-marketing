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

## Design System (Single Authority)

The design system source of truth is **`docs/website/DESIGN.md`** (682 lines, extracted from the live homepage). It matches the actual tokens in `gs_landing/src/routes/layout.css`. Before creating or changing any page, route, or component, read:

1. `docs/website/DESIGN.md` - tokens, type scale, spacing, shadows, component patterns
2. `gs_landing/AGENTS.md` - component inventory and new-page workflow

Do NOT copy token values from this file or from `assets/brand/` - those tables are marketing-facing and drift. Read the values from DESIGN.md.

Key facts (verify against DESIGN.md before use):

- **Primary accent:** green-deep `#1B5E3B` (CTAs, kickers, links). `brand-600 #3D7D2C` exists as a token but is rarely used.
- **Fonts:** Inter for body, Plus Jakarta Sans for display headings (declared as `--font-display` in `layout.css`).
- **NEVER** use `font-bold` - only `font-semibold` and `font-medium`.
- **NEVER** use `backdrop-blur`, colored shadows, `shadow-lg`/`xl`/`2xl`, or pill-shaped kickers.
- Radius scale: sm 8 / md 12 / lg 16 / xl 24. Do not invent new radii.
- Shadow utilities (defined in `layout.css`): `shadow-card` `0 1px 3px rgba(0,0,0,0.04)`, `shadow-soft` `0 6px 18px rgba(0,0,0,0.06)`, `shadow-card-hover` `0 8px 24px rgba(0,0,0,0.08)`. Maximum: `0 12px 30px rgba(0,0,0,0.10)`.

**Global skill override:** Generic design skills (for example `frontend-design-ultimate`, `ui-ux-pro-max`, `landing-page`, `landing-page-design`) do not apply to this repository. They recommend fonts, glassmorphism, gradients, and shadows that this project bans. GardenSuite rules in `docs/website/DESIGN.md` and `AGENTS.md` always win.

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

## Reference Docs

Copy and SEO guidance lives in `gs_landing/docs/landing-page/` (see AGENTS.md for the full list and the SEO/performance/copy checklists). Design guidance lives in `docs/website/DESIGN.md`.

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
