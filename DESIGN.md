# Design

## Overview

GardenSuite landing page design system. Clean, warm-green aesthetic with Apple-inspired restraint. Light theme only. Built for trust and clarity in the tea garden industry.

## Theme

**Light, warm, grounded.** A garden manager or estate owner checks the website on a laptop in an office or on a phone in the field. Bright daylight context. The design should feel open, breathable, and natural - like the gardens themselves. No dark mode; gardens are daylight places.

## Colors

### Strategy: Committed

One saturated brand color (deep green) carries ~30-40% of accent surfaces. Neutrals are warm-tinted, not pure gray. The green must feel organic, not corporate.

### Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Brand Green | `#1B5E3B` | Primary CTAs, active states, key highlights |
| Brand Green Dark | `#144723` | Hover states, emphasis |
| Brand Green Light | `#DDEFE4` | Card backgrounds, subtle tints |
| Brand Green Subtle | `#F8FAF8` | Section backgrounds, alternating rows |
| Charcoal | `#0A0A0A` | Primary text |
| Ink | `#18181B` | Secondary headings |
| Muted | `#71717A` | Body text, descriptions |
| Subtle | `#A1A1AA` | Placeholders, disabled |
| Surface | `#FAFAF7` | Page background (warm white) |
| Canvas | `#FFFFFF` | Cards, panels |
| Border | `#E4E4E7` | Dividers, card borders |
| Error | `#DC2626` | Problem section accents |
| Error Light | `#FCA5A5` | Error backgrounds |
| Success | `#10B981` | Positive indicators |

## Typography

### Fonts

- **Primary**: `Inter` (system-ui fallback) - Clean, highly legible, warm neutral
- **Display**: Same as primary. Inter works at display sizes with tight tracking.

### Scale

| Level | Size | Weight | Tracking | Line Height |
|-------|------|--------|----------|-------------|
| Hero H1 | clamp(3rem, 6vw, 5.5rem) | 500 | -0.05em | 0.9 |
| H2 | clamp(1.75rem, 3vw, 2.25rem) | 600 | -0.04em | 1.08 |
| H3 | 1.25rem - 1.5rem | 600 | -0.02em | 1.2 |
| Body Large | 1.125rem - 1.25rem | 400 | -0.01em | 1.6 |
| Body | 0.9375rem - 1rem | 400 | 0 | 1.65 |
| Label | 0.8125rem | 600 | 0.08em | 1.4 |
| Caption | 0.75rem | 500 | 0.04em | 1.5 |

## Components

### Buttons

- **Primary**: Full pill, bg `#1B5E3B`, white text, shadow-green, hover `#144723`, active scale 0.97
- **Secondary**: Full pill, white bg, border `#E4E4E7`, charcoal text, hover `#FAFAF7`

### Cards

- Vary by section type. Problem cards use subtle red tint. Proof cards use green tint. Result cards use clean white.
- **No side-stripe borders** as accents
- No glassmorphism

## Motion

- Smooth, confident, not flashy
- Respect `prefers-reduced-motion`
- Ease out with exponential curves

## Layout Patterns

- Hero: Full-width, centered text, layered visuals
- Sections: Full-width alternating white/subtle-green
- Vary card treatments by section type for visual rhythm

## Responsive

- Mobile-first with `sm:`, `md:`, `lg:` breakpoints
- Touch targets minimum 44px
