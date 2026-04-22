# Keytail.ai - Typography & Spacing Reference

Extracted from https://www.keytail.ai/

## Font Family

**Primary:** `abcDiatype` (ABCD Diatype by ABC Dinamon - premium geometric sans-serif)
- Stack: `abcDiatype, "abcDiatype Fallback", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`
- Only one font family used across the entire site

## Typography Scale

| Role | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|--------|-------------|----------------|-------|
| H1 (Hero) | 120px | 400 (Regular) | 108px (0.9x) | -6px | Tight, display-style |
| H2 (Section) | 72px | 500 (Medium) | 75.6px (1.05x) | -3.6px | |
| H3 (Large) | 60px | 500 | 60px (1x) | -3px | |
| H3 (Small/Card) | 18px | 500 | 28px (1.55x) | -0.18px | |
| Body/Large P | 24px | 400 | 30px (1.25x) | -0.24px | Hero subtitle |
| P (Standard) | 16px | 400 | 24px (1.5x) | normal | |
| Small/Label | 14px | 500 | 20px (1.43x) | normal | |
| Caption/Tiny | 11-12px | 400-500 | 16.5-18px | 0.55px | Uppercase labels, positive tracking |
| Button | 14px | 500 | 20px | normal | |

**Key pattern:** Negative letter-spacing on all headings and large text (tighter = more refined). Positive tracking only on tiny uppercase labels.

## Font Weights

Only 3 weights: 400 (Regular), 500 (Medium), 600 (Semibold)

## Color Palette

| Usage | Value |
|-------|-------|
| Primary text | `#141414` |
| Heading text | `#111111` |
| Secondary text | `#666666` |
| Muted text | `#999999`, `#BDBDBD` |
| White text | `#FFFFFF` |
| White/80 opacity | `rgba(255,255,255,0.8)` |
| Background (white) | `#FFFFFF` |
| Background (warm off-white) | `#F4F5F0` |
| Link/Accent | `#1A73E8` |

## Spacing System

### Section Padding (vertical)

| Size | Value |
|------|-------|
| Hero | pt 160px, pb 128px |
| Large section | pt/pb 96px |
| Standard section | pt/pb 64px |
| Compact section | pt/pb 56px |
| Small section | pt/pb 32px |

### Container Widths

| Name | Max Width |
|------|-----------|
| Full | 1440px |
| Content | 1024px (max-w-5xl) |
| Narrow text | 600px, 576px |
| Input bar | 700px |

### Gaps

4px, 6px, 8px, 10px, 12px, 16px, 20px, 24px, 64px

### Horizontal Padding

- Standard: 24px
- Tight: 16px

## Border Radius

| Token | Value |
|-------|-------|
| Pill/full | 999999px |
| Large | 24px |
| Medium | 16px |
| Standard | 12px |
| Small | 8px |

## Design Pattern Summary

- One premium geometric sans-serif (ABCD Diatype)
- Aggressive negative letter-spacing on display text (-3px to -6px)
- Very large hero sizes (120px H1) with tight line heights (0.9x)
- Generous section padding (64-160px vertical)
- Restrained color palette: near-black text on white/off-white backgrounds
- Max content width 1440px with 24px horizontal gutters
