# Design System - Extracted from Homepage

> Source of truth: `+page.svelte`, `GlobalNav.svelte`, `Footer.svelte`, `ModulePreview.svelte`, `layout.css`
>
> This document describes the design system **as it exists on the homepage only**. No other page influenced these specifications.

---

## 1. Theme & Philosophy

**Light, warm, grounded.** White canvas with warm-tinted neutrals and a single committed brand green. Apple-inspired restraint: generous whitespace, large typography, and subtle depth through borders, imagery, and restrained motion. No dark mode. The design feels like daylight on a tea garden.

---

## 2. Color Palette

### 2.1 Brand Green (Primary Accent)

| Token | Hex | Where Used |
|---|---|---|
| Brand Green | `#1B5E3B` | Primary CTA bg, nav CTA, section labels, step numbers, checkmarks, comparison column highlight, "Learn more" text, form focus ring, FAB bg, footer status dot |
| Brand Green Dark | `#144723` | Primary CTA hover state |
| Brand Green Hover Alt | `#237A4E` | Form submit button hover |
| Brand Green Light | `#DDEFE4` | Product card outer shell bg |
| Brand Green Subtle | `#F8FAF8` | Section gradient endpoint, FAQ open state bg, workflow step card bg, footer status pill bg |
| Brand Green Ultra-subtle | `#F8FAF8` → `white` | Section gradient backgrounds (from/to) |

### 2.2 Brand Green Scale (CSS @theme tokens, layout.css)

| Token | Hex |
|---|---|
| `--color-brand-50` | `#F1F6EB` |
| `--color-brand-100` | `#E1EED6` |
| `--color-brand-200` | `#C8DDB8` |
| `--color-brand-300` | `#9DB88F` |
| `--color-brand-400` | `#7BA86A` |
| `--color-brand-500` | `#5F8F4D` |
| `--color-brand-600` | `#3D7D2C` |
| `--color-brand-700` | `#2B6321` |
| `--color-brand-800` | `#1A4A15` |
| `--color-brand-900` | `#0F2E0C` |

### 2.3 Neutral Palette

| Token | Hex | Usage on Homepage |
|---|---|---|
| Near-black | `#0A0A0A` | Secondary CTA text, nav text color, body `color` |
| Primary text | `#111111` | Hero H1, all H2/H3 headings, stat numbers, FAQ question text, form field text |
| Ink | `#18181B` | Solution body large, nav link text, workflow steps |
| Dark body | `#111827` | Form field text color, contact form heading |
| Body text | `#374151` | Problem body, product descriptions, proof body |
| Muted body | `#4B5563` | Hero sub, step meta text, FAQ answers, feature descriptions |
| Secondary text | `#52525B` | Differentiator body, footer link text, offline runtime label |
| Gray | `#71717A` | Footer copyright, `--color-muted` |
| Subtle | `#A1A1AA` | Comparison feature column header, FAQ chevron |
| Light gray | `#9CA3AF` | Dark section body text, form placeholder, dark CTA body |
| Medium gray | `#6B7280` | Comparison header text, CTA fine print, contact form hint |
| Muted green | `#8B9590` | CTA audience description text |
| Green accent (dark bg) | `#6EA66B` | CTA section label, CTA audience checkmark stroke |
| Green bright | `#4ADE80` | Comparison section label (dark bg), GardenSuite column header |

### 2.4 Semantic / Accent Colors

| Token | Hex | Usage |
|---|---|---|
| Error Red | `#DC2626` | Problem section icons, problem cross badges |
| Error Red Light | `#B91C1C` | Problem section label text |
| Error Red Pale | `#FCA5A5` | Paper Way column header text, comparison X icon |
| Error bg light | `#DC2626/10` | Paper Way column header bg |
| Error bg indicator | `#DC2626/20` | Paper Way X circle bg |
| Success Green | `#10B981` | Offline runtime grid blocks, progress bar gradient start |
| Bright Green | `#22C55E` | Linked record status dot |
| WhatsApp Green | `#25D366` | WhatsApp CTA button bg |
| WhatsApp Green Hover | `#1EBE57` | WhatsApp CTA hover |
| Indigo | `#6366F1` | Proof section icon accents, progress bar gradient end |
| Indigo Light | `#C7D2FE` | Proof gradient start |
| Indigo Medium | `#818CF8` | Proof gradient middle |
| Indigo Deep | `#4F46E5` | Proof gradient end, support desk avatar |
| Purple | `#A78BFA` | Support desk avatar gradient end |
| Success bg | `#DCFCE7` | Form success message bg |
| Success text | `#166534` | Form success message text |
| Error bg | `#FEF2F2` | Form error message bg |
| Error text | `#991B1B` | Form error message text |

### 2.5 Surface & Border Colors

| Token | Hex | Usage |
|---|---|---|
| Canvas | `#FFFFFF` | Page background, card backgrounds, section backgrounds |
| Warm surface | `#FAFAF7` | `--color-surface`, alternate section bg |
| Warm cream | `#F8F7F3` | Differentiator section bg, CTA form side bg |
| Border | `#E4E4E7` | Section dividers, trust row border, card borders, FAQ borders, bento grid borders |
| Border soft | `#F0F0F0` | FAQ divider between closed items |
| Light border | `#D4D4D8` | Secondary CTA border hover, bento icon container border, phone frame mockup inner |
| Dark bg | `#141A16` | Comparison section bg, CTA section bg, FAB button bg, contact panel bg |
| Dark surface | `#1A1F1C` | Comparison features column bg |
| Device chrome | `#1a1a1a` | Hero mockup bar, browser frame, phone frame |

### 2.6 Alpha / Opacity Patterns

The homepage uses `rgba()` and `/opacity` notation extensively:

- **White overlays**: `white/40`, `white/70`, `white/95`, `white/[0.04]`, `white/[0.06]`, `white/[0.08]`, `white/[0.12]`, `white/[0.16]`
- **Border overlays**: `white/10`, `white/15`, `white/30`, `white/65`, `white/80`
- **Text overlays (dark bg)**: `white/30`, `white/50`, `white/60`
- **Dark overlays**: `black/20` (mobile nav overlay)
- **Brand green overlays**: `#1B5E3B/10`, `#1B5E3B/20`, `#1B5E3B/30`

---

## 3. Typography

### 3.1 Font Stacks

```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-display: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
```

- **Body text**: `--font-sans` (Inter)
- **Headings (h1-h6)**: `--font-display` (Plus Jakarta Sans)
- **OpenType features**: `'cv02', 'cv03', 'cv04', 'cv11'`

### 3.2 Type Scale (as used on homepage)

| Element | Size | Weight | Tracking | Line Height | Notes |
|---|---|---|---|---|---|
| Hero H1 | `3rem` / `3.5rem` / `4.5rem` / `5.5rem` | 500 (medium) | `-0.05em` | `0.9` | Responsive: sm/md/lg breakpoints |
| H2 Section | `28px` / `36px` | 600 (semibold) | `-0.04em` | `1.08` | md: breakpoint bump |
| H3 Card title (large) | `22px` / `26px` | 600 | `normal` | - | Product featured card |
| H3 Card title (medium) | `24px` | 600 | `-0.02em` | `1.2` | Bento proof cards |
| H3 Card title (small) | `19px`-`20px` | 600 | `normal` | `1.3` | Problem items, feature items |
| H3 FAQ heading | `20px` | 600 | - | - | FAQ category title |
| H3 FAQ question | `17px` | 500 (medium) | - | - | Individual FAQ question |
| Body large (lede) | `20px` | 400 | `-0.01em` | `1.6` | Solution intro paragraph |
| Body | `16px` | 400 | - | `1.65` | Standard body paragraphs |
| Body small | `15px` | 400-600 | - | `1.6`-`1.65` | Card descriptions, FAQ answers |
| Hero subtitle | `18px` / `24px` (sm) | 400 | `-0.01em` | `1.25` | `text-wrap: balance` |
| Section label | `13px` | 600 (semibold) | `0.08em` | - | Uppercase. "THE PROBLEM", "THE SOLUTION", etc. |
| Stat number | `28px` / `34px` | 600 | `-0.03em` | - | Trust row numbers |
| Stat label | `12px` | 500 | `0.04em` | - | Uppercase. "TEA ESTATES", "REGIONS" |
| Badge text | `11px` | 600 | `0.05em` | - | Uppercase product badges |
| CTA text | `14px`-`15px` | 600 | - | - | Button labels |
| Nav link | `14px` | 600 | - | - | Desktop navigation links |
| Footer link | `13px` | 400 | - | - | Footer navigation items |
| Footer label | `13px` | 600 | - | - | Footer column headers |
| Fine print | `12px`-`13px` | 400-500 | - | `1.5`-`1.6` | Timestamps, disclaimers, legal |
| Workflow step label | `15px` | 600 | - | - | Solution card step labels |
| Workflow step meta | `13px` | 400 | - | - | Solution card step metadata |

### 3.3 Type Rules

- `text-wrap: balance` on all H2 headings and hero subtitle
- `font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11'` on body
- `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale`
- `::selection` uses `--color-brand-200` bg with `--color-brand-900` text

---

## 4. Spacing & Layout

### 4.1 Container

- **Max width**: `1344px` (used as `max-w-[1344px]`)
- **Horizontal padding**: `px-6` (mobile) → `md:px-12`
- **Section padding**: `py-20 md:py-28` (standard) or `py-24 md:py-32` (generous)

### 4.2 Grid Patterns

| Section | Grid | Gap |
|---|---|---|
| Problem | `md:grid-cols-2` | `gap-12 md:gap-16` |
| Solution | `lg:grid-cols-[0.95fr_1.05fr]` | `gap-12 lg:gap-20` |
| Solution points | `sm:grid-cols-2 lg:grid-cols-4` | `gap-8` |
| Products featured | Full width (stacked) | `mb-6 md:mb-8` between |
| Products grid | `sm:grid-cols-2 lg:grid-cols-2` | `gap-6 md:gap-8` |
| Comparison | `lg:grid-cols-2 lg:gap-16` | `gap-10` |
| Comparison table | `grid-cols-[1.4fr_1fr_1fr]` | - |
| Proof bento | `md:grid-cols-3` | borders instead of gap |
| Differentiator | `md:grid-cols-2 lg:grid-cols-3` | `gap-x-12 gap-y-16` |
| FAQ | `md:grid-cols-5 md:divide-x` | Left 2 cols, right 3 cols |
| CTA | `md:grid-cols-2` | `min-h-[90vh]` |
| Footer | `md:grid-cols-5` | `gap-12` |
| Footer links | `sm:grid-cols-3` | `gap-6` |

### 4.3 Spacing Values (recurring)

| Value | Where |
|---|---|
| `mt-5` / `mt-6` | Between heading and body text |
| `mt-8` | Between body and CTA / between blocks |
| `mt-14` / `mt-20` | Major block separation within sections |
| `mb-4` | Section label to heading |
| `mb-10` / `mb-14` | Section intro to content |
| `p-4` / `p-5` / `p-6` / `p-7` / `p-8` | Card internal padding |
| `gap-3` / `gap-3.5` | Form field spacing |
| `gap-5` | Icon-text layouts |
| `space-y-3` | Stacked workflow steps |
| `space-y-10` | Problem item vertical spacing |

---

## 5. Border Radius Scale

| Token | Value | Usage |
|---|---|---|
| `rounded-sm` | `2px` | Offline grid blocks |
| `rounded-md` | `6px` | Nav address bar |
| `rounded-lg` | `8px` | Form inputs, FAQ open card, comparison table corners |
| `rounded-xl` | `12px` | Hero mockup (mobile), secondary CTA, solution inner card, bento sub-cards |
| `rounded-2xl` | `16px` | Hero mockup (desktop), solution visual container, comparison table wrapper, bento cards, differentiator hover |
| `rounded-3xl` | `24px` | Solution phone card, bento outer grid, contact panel, product badge pill |
| `rounded-[18px]` | - | Product card inner preview area |
| `rounded-[20px]` | - | Product card white content area |
| `rounded-[22px]` | - | Product card inner frame |
| `rounded-[28px]` | - | Product card outer shell |
| `rounded-full` | `9999px` | Pills, nav links, CTAs, status dots, step number circles, FAB button |

---

## 6. Shadow System

Heavy shadows are prohibited. Prefer borders and surface contrast before adding elevation. All shadows use neutral black and must stay at or below `0 12px 30px rgba(0,0,0,0.10)`.

| Name | Value | Usage |
|---|---|---|
| Small | `0_1px_3px_rgba(0,0,0,0.04)` | Secondary buttons and tiny controls |
| Card | `0_6px_18px_rgba(0,0,0,0.06)` | Cards and quiet overlays |
| Elevated | `0_10px_28px_rgba(0,0,0,0.10)` | Device frames, dialogs, and large screenshots |

Do not use `shadow-lg`, `shadow-xl`, `shadow-2xl`, colored shadows, glow shadows, blur radii above 30px, or opacity above 0.10.

### 6.1 CSS Utility Shadows (layout.css)

```css
shadow-soft:       0 6px 18px rgba(0,0,0,0.06)
shadow-card:       0 1px 3px rgba(0,0,0,0.04)
shadow-card-hover: 0 8px 24px rgba(0,0,0,0.08)
```

---

## 7. Component Patterns

### 7.1 Navigation (GlobalNav)

- **Position**: `fixed top-0 z-[60]`
- **Height**: Auto, with `py-4` padding
- **Background**: Scroll-animated from `rgba(255,255,255,0)` to `rgba(255,255,255,1)` over 100px scroll
- **Backdrop blur**: `0px` → `24px` (scrub with scroll)
- **Border bottom**: `rgba(0,0,0,0)` → `rgba(0,0,0,0.05)`
- **Logo**: `GsLogoAnimation` + "GardenSuite" text at `18px` medium weight
- **Desktop links**: `h-10` pill buttons, `14px` semibold, hover `bg-[#0000000A]`
- **Desktop CTA**: Pill `h-10`, `bg-[#1B5E3B]`, `rounded-full`
- **Mobile hamburger**: `h-10 w-10` circle, 3-line icon / X icon
- **Mobile sheet**: `bg-white/95 backdrop-blur-xl`, slides from top, `z-[58]`
- **Products dropdown**: `w-[620px]`, 2-column with green sidebar, `rounded-xl`, scale+fade animation

### 7.2 Buttons

**Primary CTA (Hero)**:
```
rounded-full bg-[#1B5E3B] px-6 py-4
shadow-[0_4px_12px_rgba(0,0,0,0.10)]
hover:bg-[#144723]
active:scale-[0.97]
focus-visible:ring-2 ring-[#1B5E3B]/30
```
Text: `14px` medium white, with chevron icon.

**Secondary CTA (Hero)**:
```
rounded-full border border-[#E4E4E7] bg-white px-6 py-4
shadow-[0_1px_3px_rgba(0,0,0,0.04)]
hover:border-[#D4D4D8] hover:bg-[#FAFAF7]
active:scale-[0.97]
```
Text: `14px` medium `#0A0A0A`.

**Tertiary CTA (Solution)**:
```
h-12 rounded-xl border border-[#D4D4D8] bg-white px-5
shadow-[0_2px_10px_rgba(0,0,0,0.05)]
hover:border-[#1B5E3B]/30 hover:bg-[#F8FAF8]
active:scale-[0.98]
```
Text: `15px` semibold `#111111`, with chevron.

**Form Submit**:
```
rounded-lg bg-[#1B5E3B] px-6 py-3.5
hover:bg-[#237A4E]
active:scale-[0.97]
disabled:cursor-wait disabled:opacity-70
```

**WhatsApp CTA**:
```
rounded-lg bg-[#25D366] px-6 py-3.5
hover:bg-[#1EBE57]
```

### 7.3 Form Inputs

```
rounded-lg border border-[#D1D5DB] bg-white px-4 py-3
text-[14px] text-[#111827] placeholder-[#9CA3AF]
focus:border-[#1B5E3B] focus:ring-2 focus:ring-[#1B5E3B]/15
```
Textarea: same styling, `resize-none`, `rows="3"`.

### 7.4 Section Labels

```
text-[13px] font-semibold tracking-[0.08em] uppercase
```
Color varies by context:
- Green sections: `text-[#1B5E3B]`
- Problem section: `text-[#B91C1C]`
- Dark bg sections: `text-[#4ADE80]` or `text-[#6EA66B]`

### 7.5 Product Cards

**Featured (full-width)**:
- Outer: `rounded-[28px] border-white/70 bg-[#DDEFE4] p-4 md:p-5`
- Layered backgrounds: sky image + landscape image with gradient masks
- Inner frame: `rounded-[22px] border-white/65 bg-white/[0.08]`
- 2-column grid: preview + white content card
- Content card: `rounded-[20px] bg-white/96 px-7 py-8 shadow ring-1 ring-white/70`
- "Learn more" link: `text-[#1B5E3B]` with gap animation on group hover

**Grid (non-featured)**:
- Same outer shell at `min-h-[520px] md:min-h-[560px]`
- Inner: `backdrop-blur-[6px]`
- Bottom panel: white `rounded-b-[22px]` with upward shadow
- Badge: pill at `top-4 left-4`

**Hover effects**: Background image `scale-[1.03]`-`[1.04]` on 700ms, "Learn more" gap widens

### 7.6 Product Badge

```
rounded-full border border-white/80 bg-white/95 px-3.5 py-1.5
text-[11px] font-semibold tracking-[0.05em] text-[#1B5E3B] uppercase
shadow-[0_4px_12px_rgba(0,0,0,0.06)] backdrop-blur
```

### 7.7 FAQ Accordion

- Container: `border border-[#E4E4E7] bg-white md:grid-cols-5 md:divide-x`
- Left panel (2 cols): heading + "contact our team" link
- Right panel (3 cols): accordion items
- Closed item: `border-b border-[#F0F0F0] px-6 py-1`
- Open item: `rounded-lg bg-[#F8FAF8] shadow-[0_2px_12px_rgba(0,0,0,0.04)] ring-1 ring-[#E4E4E7]`
- Chevron: `16px` icon, `text-[#A1A1AA]`, `rotate-180` on open with `duration-200`
- Answer reveal: `grid-rows-[0fr]` → `grid-rows-[1fr]` + opacity, `duration-200 ease-out`

### 7.8 Trust Row (Stats Bar)

- Full-width, `border-b border-[#E4E4E7] bg-white py-8 md:py-10`
- Flex row with centered items, `gap-x-10 md:gap-x-14`
- Dividers: `h-8 w-px bg-[#E4E4E7]`, hidden on mobile
- Number: `28px`/`34px` semibold `-0.03em` `#111111`
- Label: `12px` medium `0.04em` uppercase `#4B5563`
- Accent number (100%): `text-[#1B5E3B]`

### 7.9 Comparison Table

- Dark bg section: `bg-[#141A16]`
- Table: `grid-cols-[1.4fr_1fr_1fr] rounded-2xl ring-1 ring-white/10`
- Feature column: `bg-[#1A1F1C]`, text `13px medium #D1D5DB`
- Paper Way header: `bg-[#DC2626]/10`, text `#FCA5A5`
- GardenSuite header: `bg-[#1B5E3B]/30`, text `#4ADE80`
- GardenSuite column bg: `bg-[#1B5E3B]/20`
- Row height: `h-12`, border `white/[0.06]`
- X icon: `h-5 w-5 rounded-full bg-[#DC2626]/20 text-[#FCA5A5]`
- Check icon: `h-5 w-5 rounded-full bg-[#1B5E3B] text-white`

### 7.10 Bento Grid (Proof Section)

- Container: `rounded-3xl border border-[#E4E4E7] bg-white md:grid-cols-3`
- Cell padding: `p-7`
- Internal borders: `border-b border-[#E4E4E7] md:border-r`
- Icon container: `h-14 w-14 rounded-2xl border border-[#D4D4D8] bg-[#F8FAF8]`
- Nested cards: `rounded-2xl border border-[#E4E4E7] bg-[#FAFAF7] p-5`
- Progress bar: `h-2 rounded-full bg-[#F4F4F5]` with fill `bg-gradient-to-r from-[#10B981] to-[#6366F1]`

### 7.11 Differentiator Cards

- Hover lift: `hover:-translate-y-1 hover:bg-white/60`
- Transition: `duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]`
- Icon: `28px` stroke icons, `text-[#1B5E3B] drop-shadow-[0_1px_2px_rgba(0,0,0,0.10)]`
- Layout: `flex gap-5 rounded-2xl p-4`

### 7.12 Contact / CTA Section

- Dark bg: `bg-[#141A16]`, `min-h-[90vh]`, 2-column
- Left: dark content with audience cards
- Right: `bg-[#F8F7F3]` with form
- Audience cards: `flex gap-3.5`, green checkmark in `bg-[#1B5E3B]/20` circle
- Form side border: `border-l border-[#E4E4E7]`

### 7.13 Floating Action Button (FAB)

- Position: `fixed right-5 bottom-5 z-[80] md:right-7 md:bottom-7`
- Button: `h-16 w-16 rounded-full bg-[#141A16]`
- Show/hide: scroll-triggered via GSAP ScrollTrigger (appears after hero)
- Animation: `translate-x-0/translate-x-24` with `duration-500` cubic-bezier
- Panel: `w-[min(calc(100vw-2.5rem),360px)] rounded-3xl bg-[#141A16]`
- Panel animation: Svelte `fly` transition `y:16 duration:220`
- Icon swap: chat bubble ↔ X with scale+rotate `duration-300` spring easing

### 7.14 Footer

- `bg-white pt-8 sm:pt-20`
- 5-column grid: 2 for brand + description, 3 for link columns
- Dashed divider: `bg-[length:6px_1px] bg-repeat-x` linear-gradient pattern
- Status pill: `rounded-full border border-[#E4E4E7] bg-[#FAFAF7]` with animated ping dot
- Large typography: `text-[24vw] sm:text-[20vw]` white text "sarbaa"
- Aurora gradient: `bg-gradient-to-t from-[#1B5E3B] from-30% via-[#1B5E3B]/60 to-transparent blur-2xl`

### 7.15 Browser Frame Mockup

```
rounded-2xl border border-white/70 bg-white
shadow-[0_8px_24px_rgba(0,0,0,0.08)]
```
- Title bar: `h-7 bg-[#F4F4F5] border-b border-[#E4E4E7]`
- Traffic lights: `h-2.5 w-2.5 rounded-full` in `#FF5F57`, `#FEBC2E`, `#28C840`
- URL placeholder: `h-2 w-28 rounded-full bg-[#D4D4D8]`

### 7.16 Phone Frame Mockup

```
rounded-[1.55rem] border-[5px] border-[#111111] bg-[#111111]
shadow-[0_10px_28px_rgba(0,0,0,0.10)]
```
- Notch: `h-3 w-16 rounded-b-xl bg-[#111111]`
- Screen: `aspect-[9/19] rounded-[1.2rem]`

### 7.17 Hero Dashboard Mockup

```
rounded-xl md:rounded-2xl border border-white/40 bg-[#1a1a1a]
shadow-[0_10px_28px_rgba(0,0,0,0.10)]
```
- Chrome bar: `gap-2 border-b border-white/[0.06] bg-[#1a1a1a] px-4 py-2.5`
- Traffic lights: `h-2.5 w-2.5` in `#FF5F57`, `#FEBC2E`, `#28C840`
- Address bar: `bg-white/[0.06] rounded-md px-3 py-1`, text `11px white/30`

---

## 8. Icons

All icons are **inline SVGs** - no icon library used.

### 8.1 Icon Specs

| Context | Size | Stroke Width | Style |
|---|---|---|---|
| Problem items | `28x28` | `1.5` | Stroke, `currentColor` |
| Differentiator items | `28x28` | `1.5` | Stroke, `currentColor` |
| Comparison X/check | `10x10` | `2` | Stroke |
| CTA chevron | `14x14` | `2` | Stroke, `round` caps |
| FAQ chevron | `16x16` (viewBox `24`) | `2` | Stroke |
| Nav chevron | `12x12` | `1.5` | Stroke |
| FAB chat/close | `27x27` / `24x24` | `1.8` / `2.5` | Stroke |
| WhatsApp | `18x18` | - | Filled path |
| Email | `16x16` (viewBox `24`) | `2` | Stroke |

### 8.2 Icon Colors

- Problem icons: `text-[#DC2626]` with `drop-shadow-[0_1px_2px_rgba(0,0,0,0.10)]`
- Differentiator icons: `text-[#1B5E3B]` with `drop-shadow-[0_1px_2px_rgba(0,0,0,0.10)]`
- Proof bento icons: `stroke="#A1A1AA"` and `stroke="#6366F1"` (dual tone)

### 8.3 Icon Treatment

- **NO background circles/boxes behind icons** - color applied directly to the icon with a subtle drop-shadow only
- Problem items have a small `12x12` red X overlaid at `-top-1 -right-1.5`

---

## 9. Motion & Animation

### 9.1 Libraries

- **GSAP** + **ScrollTrigger** - dynamically imported in `onMount()`
- **Lenis** - smooth scroll (`lerp: 0.06`, `wheelMultiplier: 0.9`, `touchMultiplier: 1.6`)

### 9.2 Hero Entrance Timeline

```
1. H1:       opacity 0→1, y 50→0, duration 0.9s, delay 0.2s
2. Subtitle: opacity 0→1, y 30→0, duration 0.7s, overlap 0.5s
3. CTA:      opacity 0→1, y 24→0, duration 0.6s, overlap 0.4s
4. Mockup:   y 60→0, scale 0.97→1, opacity 0→1, duration 1.2s, delay 0.6s
```
Easing: `power3.out` (timeline), `power2.out` (mockup)

### 9.3 Hero Parallax Scrub

Trigger: `.hero-parallax`, scrub `1.5`, start `top top`, end `bottom top`, ease `power4.inOut`

| Element | Effect |
|---|---|
| `.hero-text-content` | `y: -98` |
| `.hero-mockup` | `y: -150` (ease: `power1.inOut`) |
| `.hero-fg-group` | `y: -35` |
| `.hero-bg-landscape` | `y: 30` |
| `.hero-bottom-cover` | `height: 0→65` |

### 9.4 Scroll Reveal

```css
.reveal-on-scroll {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}
.reveal-on-scroll.is-visible {
    opacity: 1;
    transform: translateY(0);
}
```
Triggered by `IntersectionObserver` at `threshold: 0.15`, one-shot (unobserves after first intersection).

### 9.5 Micro-interactions

| Element | Effect | Duration |
|---|---|---|
| Primary CTA | `active:scale-[0.97]` | `duration-150` |
| Tertiary CTA | `active:scale-[0.98]` | - |
| Product card bg images | `group-hover:scale-[1.03]` | `duration-700` |
| "Learn more" gap | `gap-1.5 → gap-2.5` on hover | `duration-200` |
| Product card preview | `group-hover:-translate-y-1` or `-translate-y-2` | `duration-500` |
| Phone frames in preview | Rotation shift on hover (`-rotate-4 → -rotate-6`) | `duration-500` |
| Differentiator cards | `hover:-translate-y-1` | `duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]` |
| FAQ chevron | `rotate-180` | `duration-200` |
| FAQ answer | `grid-rows-[0fr] → [1fr]` + opacity | `duration-200 ease-out` |
| FAB icon swap | Scale + rotate `50↔100`, rotate `±90` | `duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]` |
| FAB show/hide | `translate-x-0 ↔ translate-x-24` | `duration-500 cubic-bezier` |
| Nav dropdown | `scale-[0.97] → 1`, `translate-y-1 → 0`, opacity | `duration-200 ease-out` |
| Footer status dot | `animate-ping` | CSS keyframe |

### 9.6 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
    .reveal-on-scroll {
        opacity: 1;
        transform: none;
        transition: none;
    }
}
```
GSAP animations also abort early when `prefers-reduced-motion: reduce` is detected.

---

## 10. Image Strategy

### 10.1 Hero Layer Stack (5 layers, back to front)

1. **Sky**: `/hero-sky.webp` - full cover, `opacity-80 brightness-[1.4] saturate-[0.6]`
2. **Landscape**: `/bg-960.webp` / `/bg-1920.webp` - gradient mask top, parallax `y: 30`
3. **Fog glow**: CSS `div`, `400x600 rounded-full bg-white/40 blur-[100px]`
4. **Dashboard mockup**: Responsive WebP with browser chrome
5. **Foreground foliage**: `/fg-960.webp` / `/fg-1920.webp` - `min-w-[120%]`, parallax `y: -35`
6. **Cloud border**: `/cloud-border.webp` - `brightness-[1.15] saturate-0`
7. **White cover strip**: CSS `div`, grows on scroll

### 10.2 Image Loading Strategy

| Image | Loading | Priority |
|---|---|---|
| Hero sky | `eager` | `fetchpriority="high"` |
| Hero landscape | `eager` | `fetchpriority="high"` |
| Hero dashboard | `eager` | `fetchpriority="high"` |
| Hero foreground | `eager` | `fetchpriority="high"` |
| Cloud border | `eager` | - |
| All below-fold | `lazy` | - |

### 10.3 Image Format

- All images use `<picture>` with WebP `<source>` and PNG fallback
- Responsive `srcset` with `sizes` attribute for appropriate resolution
- All images have explicit `width` and `height` attributes

### 10.4 Gradient Masks on Images

```css
mask-image: linear-gradient(to bottom, transparent 0%, black 40%);
-webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 40%);
```
Used to fade landscape images at the top for seamless blending with sky.

---

## 11. Responsive Breakpoints

| Breakpoint | Prefix | Key Changes |
|---|---|---|
| < 640px | (base) | Single column, `px-6`, smaller type sizes |
| 640px | `sm:` | 2-column grids start, hero text bumps |
| 768px | `md:` | Full grids, `px-12`, larger padding, nav desktop mode |
| 1024px | `lg:` | 3-4 column grids, full layout widths |

### 11.1 Key Responsive Behaviors

- **Nav**: Hamburger → full links at `md:`
- **Hero H1**: `3rem` → `3.5rem` → `4.5rem` → `5.5rem`
- **Hero visuals**: `h-[540px]` → `h-[720px]` → `h-[840px]`
- **Section padding**: `py-20` → `py-28` or `py-24` → `py-32`
- **Stat numbers**: `28px` → `34px` at `md:`
- **H2 headings**: `28px` → `36px` at `md:`
- **Grids**: Collapse to single column on mobile, expand at breakpoints
- **Trust row dividers**: Hidden on mobile (`hidden md:block`)
- **FAQ "contact" link**: Hidden on desktop, shown on mobile (separate instance)
- **CTA section**: Stacks vertically on mobile, side-by-side at `md:`

---

## 12. Z-Index Scale

| Z-Index | Element |
|---|---|
| `z-0` | Background images |
| `z-[1]` | Landscape bg, foreground mask |
| `z-[2]` | Hero bottom cover, card white overlays |
| `z-[9]` | Foreground white strip |
| `z-10` | Hero mockup, card inner frames |
| `z-20` | Hero text content, foreground group, card bottom panels |
| `z-30` | Trust row section, product badges, badge overlays |
| `z-[55]` | Mobile nav backdrop |
| `z-[58]` | Mobile nav sheet |
| `z-[60]` | Desktop navigation |
| `z-[80]` | FAB + contact panel |

---

## 13. CSS Custom Utilities (layout.css)

```css
/* Gradients */
text-gradient:       linear-gradient(135deg, #7BA86A, #3D7D2C)
text-gradient-light: linear-gradient(135deg, #C8DDB8, #7BA86A)

/* Patterns */
dot-grid:       radial-gradient(circle, #D4D4D8 0.7px, transparent 0.7px) / 28px 28px
dot-grid-light: radial-gradient(circle, #E4E4E7 0.6px, transparent 0.6px) / 32px 32px

/* Noise */
grain-overlay::before: SVG noise texture, opacity 0.08, mix-blend-mode multiply

/* Device Frames */
device-frame-phone:  bg #1a1a1a, rounded 28px, padding 8px
device-frame-tablet: bg #1a1a1a, rounded 20px, padding 10px

/* Placeholder */
img-placeholder: gradient from #F0FDF4 via #DCFCE7 to #C8DDB8, text #1A5C2E
```

> **Note**: `dot-grid`, `grain-overlay`, and `device-frame-*` are defined in `layout.css` but not used on the homepage. They exist as available utilities.

---

## 14. Section Backgrounds Summary

| Section | Background |
|---|---|
| Hero | Sky image + landscape layers over white |
| Trust row | `bg-white` + `border-b` |
| Problem | `bg-white` + `border-b` |
| Solution | `bg-white` + `border-b` |
| Products | `bg-gradient-to-b from-[#F8FAF8] to-white` |
| Comparison | `bg-[#141A16]` (dark) |
| Proof | `bg-gradient-to-b from-[#F8FAF8] to-white` |
| Differentiator | `bg-[#F8F7F3]` (warm cream) |
| FAQ | `bg-gradient-to-b from-white to-[#F8FAF8]` |
| CTA | `bg-[#141A16]` (dark) + `bg-[#F8F7F3]` (form side) |
| Footer | `bg-white` + green aurora gradient at bottom |
