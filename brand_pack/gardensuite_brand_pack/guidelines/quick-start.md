# GardenSuite Brand Pack

## Typography

- **Primary font:** Inter (400, 500, 600, 700) via Google Fonts
- **Feature settings:** `'cv02', 'cv03', 'cv04', 'cv11'` (alternate glyphs for cleaner numerals)
- **Font stack:** `'Inter', system-ui, -apple-system, sans-serif`
- **Load via:** `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap`

## Color Palette

| Token               | Hex       | Usage                        |
|---------------------|-----------|------------------------------|
| green.deep          | `#234B1D` | Primary, CTAs, brand anchors |
| green.forest        | `#385E30` | Hover states, ring/focus     |
| green.mid           | `#5F7D48` | Muted foreground (light)     |
| green.olive         | `#719456` | Warning (light), chart-4     |
| green.sage          | `#97B07C` | Chart-5, muted fg (dark)     |
| green.light         | `#A8BC8E` | Primary (dark mode)          |
| neutral.charcoal    | `#111827` | Body text (light), bg (dark) |
| neutral.ink         | `#1F2937` | Cards (dark), secondary      |
| neutral.surface     | `#F6F8F3` | Subtle backgrounds           |
| neutral.border      | `#DDE3D5` | Borders, input borders       |

## Logo Assets (in `logos/`)

| File                              | Usage                                     |
|-----------------------------------|-------------------------------------------|
| `gardensuite-icon-source.png`     | **Source of truth** — HQ 2048×2048 leaf   |
| `gardensuite-icon-white.svg`      | Dark backgrounds, dark-mode sidebar/login |
| `favicon-32.png`, `favicon-64.png`| Light-mode favicons (from source PNG)     |
| `favicon-white-32.png`, `favicon-white-64.png` | Dark-mode favicons        |
| `app-icon-512.png`                | Apple touch icon, PWA                     |

### Not used in app (brand-pack only)
| File                              | Purpose                                   |
|-----------------------------------|-------------------------------------------|
| `gardensuite-icon-gradient.svg/png` | Marketing, splash screens               |
| `gardensuite-icon-flat-green.svg/png` | Print, PDFs                            |
| `gardensuite-lockup-horizontal.svg/png` | External/marketing horizontal lockup |
| `gardensuite-lockup-stacked.svg/png` | External/marketing stacked lockup      |

## App Usage

- **Sidebar:** Leaf icon only (`gardensuite-icon-source.png` light / `gardensuite-icon-white.svg` dark) + estate name as CSS text.
- **Login page:** Leaf icon + "GardenSuite" / "Plantation ERP" as CSS text (not SVG lockup).
- **Favicon:** PNG favicons with dynamic light/dark switching via `prefers-color-scheme`.
- **Typography:** Rendered by the browser using Inter. Never baked into logo SVGs.
