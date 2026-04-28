# GardenSuite Landing Page - Typography Direction

## Locked Type System

The following values are extracted from the current home page implementation. These are the source of truth. Do not deviate without explicit approval.

### Fonts

| Variable | Value | Usage |
|----------|-------|-------|
| `--font-sans` | `'Inter', system-ui, -apple-system, sans-serif` | Body text, descriptions, labels |
| `--font-display` | `'Plus Jakarta Sans', 'Inter', system-ui, sans-serif` | Hero H1, section H2s |

### Size Scale

| Token | Size | Weight | Tracking | Leading | Used for |
|-------|------|--------|----------|---------|----------|
| Hero H1 | `3rem` → `3.5rem` → `4.5rem` → `5.5rem` | `font-medium` | `-0.05em` | `0.9` | Main headline (responsive) |
| Hero subtitle | `text-lg` → `sm:text-2xl` | `font-normal` | `-0.01em` | `1.25` | Hero paragraph |
| Section H2 (large) | `36px` → `44px` → `52px` | `font-semibold` | `-0.04em` | `1.08` | Products, Differentiator, CTA |
| Section H2 (small) | `32px` → `40px` | `font-semibold` | `-0.04em` | `1.1` | Problem strip |
| Card H3 | `17px` | `font-semibold` | `-0.01em` | default | Problem cards, product cards, differentiator cards |
| Featured card H3 | `22px` → `26px` | `font-semibold` | `-0.02em` | default | Featured product card only |
| FAQ H3 | `17px` → `18px` | `font-semibold` | default | `1.4` | FAQ questions |
| Body | `14px`-`16px` | `font-normal` | default | `1.6` | Card descriptions, FAQ answers |
| Body (larger) | `17px` | `font-normal` | default | `1.6` | Section subtitles |
| Uppercase label | `13px` | `font-semibold` | `0.08em` | default | Section labels ("The problem", "The solution") |
| Badge | `11px` | `font-semibold` | `0.04em` | default | Product badges, stat labels |
| Stat number | `32px` → `36px` | `font-semibold` | `-0.03em` | default | Proof strip numbers |
| Stat label | `13px` | `font-semibold` | `0.04em` | default | Proof strip labels |
| Overlay card text | `12px` | varies | default | default | Mini UI preview cards |

### Color Palette (Text Only)

| Token | Hex | Usage |
|-------|-----|-------|
| Primary text | `#111111` / `#111` | Headings, card titles, stat numbers |
| Secondary text | `#52525B` | Body paragraphs, descriptions |
| Muted text | `#71717A` | Labels, stat labels, overlay labels |
| Subtle text | `#3F3F46` | Overlay values, secondary info |
| Accent text | `#1B5E3B` | Section labels, "Learn more" links, badges |
| Hero subtitle | `#666666` | Hero paragraph only |
| Button text dark | `#0A0A0A` | Secondary button label |
| Quiet muted | `#A1A1AA` | FAQ chevron icon |

### Hierarchy Rules

1. **Hero H1 is the top of the system.** Nothing else on the page approaches its size.
2. **Section H2s use one consistent treatment:** `font-semibold`, `tracking-[-0.04em]`, `leading-[1.08]`, responsive from `36px` to `52px`.
3. **Card H3s are calm and factual at `17px`.** They do not compete with section headings.
4. **Featured product card** is the one exception - its H3 runs at `22px`/`26px` to anchor the product grid.
5. **Body text stays in a narrow `14px`-`17px` range** with consistent `leading-[1.6]`.
6. **Uppercase labels are always `13px`, `font-semibold`, `tracking-[0.08em]`** in accent green.
7. **One font family across the page** (Inter for body, Plus Jakarta Sans for display headings).

### What Not To Do

- Do not add new intermediate heading sizes
- Do not use `font-bold` (the page uses `font-semibold` and `font-medium` only)
- Do not change tracking on body text
- Do not use hero-level tracking (`-0.05em`) on anything other than the hero H1
- Do not mix uppercase label sizes (stick to `13px` for section labels, `11px` for badges)
