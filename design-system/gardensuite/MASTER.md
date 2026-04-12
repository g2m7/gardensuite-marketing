# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/gardensuite/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** GardenSuite
**Generated:** 2026-04-10
**Updated:** 2026-04-10 - aligned with brand tokens and landing inspiration

---

## Global Rules

### Color Palette (Brand Tokens from brand_pack)

| Role | Token | Hex | CSS Variable |
|------|-------|-----|--------------|
| Primary | brand-600 | `#3D7D2C` | `--color-brand-600` |
| Primary Hover | brand-700 | `#2B6321` | `--color-brand-700` |
| Light Accent BG | brand-50 | `#F1F6EB` | `--color-brand-50` |
| Body Text | charcoal | `#111827` | `--color-charcoal` |
| Secondary Text | ink | `#1F2937` | `--color-ink` |
| Subtle BG | surface | `#F6F8F3` | `--color-surface` |
| Borders | border | `#DDE3D5` | `--color-border` |
| Text Secondary | gray-600 | `#4B5563` | standard TW |
| Canvas | white | `#FFFFFF` | default |

**Color Notes:** Dark-mode hero/sections with black BG. Light-mode content sections on white/surface. Brand green (#3D7D2C) for CTAs and accents.

### Typography

- **Font:** Inter (400, 500, 600, 700) via Google Fonts
- **Feature settings:** `'cv02', 'cv03', 'cv04', 'cv11'`
- **Headings:** 700 weight, tracking-tight (-0.03em)
- **Body:** 400 weight, line-height 1.5-1.75
- **Line length:** 65-75 chars max

### Radius

| Token | Value |
|-------|-------|
| sm | 6px |
| md | 10px |
| lg | 14px |
| xl | 20px |

### Shadows

| Name | Value | Usage |
|------|-------|-------|
| shadow-soft | `0 12px 30px rgba(74,157,53,0.15)` | CTAs |
| shadow-card | `0 8px 24px rgba(17,24,39,0.08)` | Cards |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Tight gaps |
| sm | 8px | Icon gaps |
| md | 16px | Standard padding |
| lg | 24px | Section padding |
| xl | 32px | Large gaps |
| 2xl | 48px | Section margins |
| 3xl | 64px | Hero padding |

---

## Landing Page Structure (from Inspiration Analysis)

### Section Order (Top to Bottom)

1. **Navigation** - Sticky, minimal, transparent on hero, solid on scroll
2. **Hero** - Bold headline + subtext + dual CTAs + product visual
3. **Trust Bar** - Stats strip (20+ gardens, 25+ years, etc.)
4. **Problem Statement** - 4 pain point cards (fake attendance, wrong weights, slow kamjari, data trapped)
5. **Solution Overview** - Face attendance + smart scale features (alternating layout)
6. **Numbered Workflow** - 001-004 steps (Attendance > Weighing > Payroll > Dashboard)
7. **Bento Module Grid** - Varying-size cards for the 4 ERP modules
8. **Dashboard Preview** - MIS dashboard feature with live-looking visual
9. **Offline + Online** - 3-card differentiator section
10. **Clients Grid** - Tea estate names in grid
11. **Company Timeline** - History from 1998 to 2026
12. **FAQ Accordion** - 7-8 common questions
13. **Final CTA** - Bold headline + dual CTAs
14. **Footer** - Company info, links, copyright

### Key Patterns (from Inspiration Sites)

- **Alternating text+visual** (GitHub Codespaces, Fey) - for face attendance and smart scale
- **Numbered walkthrough** (folk 001-004) - for the workflow flow
- **Bento card grid** (Obvious, PayloadCMS) - for module showcase
- **Trust stats bar** (Index.app, Modeinspect) - for metrics
- **FAQ accordion** (GitHub, Keytail) - for common questions
- **3-card deep-dive** (Modeinspect) - for differentiators

---

## Component Specs

### Buttons

```css
/* Primary CTA */
.btn-primary {
  background: #FFFFFF;
  color: #000000;
  padding: 14px 32px;
  border-radius: 9999px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
.btn-primary:hover { background: #f3f4f6; }

/* Secondary CTA */
.btn-secondary {
  background: transparent;
  color: #FFFFFF;
  border: 1px solid rgba(255,255,255,0.25);
  padding: 14px 32px;
  border-radius: 9999px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
.btn-secondary:hover { background: rgba(255,255,255,0.1); }
```

### Cards

```css
/* Feature card - dark sections */
.card-dark {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 24px;
  transition: all 200ms ease;
  cursor: pointer;
}

/* Feature card - light sections */
.card-light {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 24px;
  transition: all 200ms ease;
}

/* Bento card - varies by size */
.card-bento {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 24px;
}
```

---

## Animation Rules

- Scroll-triggered fade-in/slide-up using IntersectionObserver
- Duration: 200-300ms for micro-interactions
- Use `transform` and `opacity` only (GPU-accelerated)
- Honor `prefers-reduced-motion` - disable all animations
- Logo bar: CSS auto-scroll animation
- Smooth scroll: `scroll-behavior: smooth` on html

---

## Style Guidelines

**Style:** Minimalism & Swiss Style (Apple-inspired)

**Keywords:** Clean, spacious, functional, high contrast, generous whitespace, editorial

**Best For:** Enterprise SaaS, professional tools, product showcases

---

## Anti-Patterns (Do NOT Use)

- No emojis as icons (use SVG: Heroicons/Lucide)
- No em dashes (use regular hyphens)
- No layout-shifting hover effects
- No low contrast text (4.5:1 minimum)
- No infinite animations on decorative elements
- No horizontal scroll on mobile
- No big/sophisticated words - keep language simple

---

## Pre-Delivery Checklist

- [ ] No emojis used as icons (use SVG)
- [ ] cursor-pointer on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard nav
- [ ] prefers-reduced-motion respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No em dashes in any content
- [ ] Simple language throughout
