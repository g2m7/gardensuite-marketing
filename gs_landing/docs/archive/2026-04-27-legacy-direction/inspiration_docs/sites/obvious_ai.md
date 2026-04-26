# Design Analysis Report: Obvious.ai

## 1. Typography
Obvious.ai employs a clean, modern, and tech-forward typographic system characterized by a high-quality geometric sans-serif (resembling **Satoshi** or **Inter**).

- **Heading Styles**:
  - **Hero Heading**: Large, bold, and impactful (e.g., "Less Chat. More Work."). Uses a negative letter-spacing (approx. `-0.02em`) for a compact, modern feel.
  - **Section Headings**: Title Case, often paired with descriptive sub-paragraphs.
- **Body Text**:
  - **Readability**: High contrast with generous line-height for readability.
  - **Sizes**: Body text is approximately `16px`, while navigation and metadata use a smaller `text-sm` (approx. `14px`).
- **Font Weights**:
  - **Regular**: Used for body and descriptive paragraphs.
  - **Medium/Semi-bold**: Used for buttons (`Sign up`, `Log in`), navigation links, and sub-headings to create hierarchy.
- **Special Formatting**: Buttons use `tracking-[-0.21px]` to refine the look of smaller text.

## 2. Color Palette
The site uses a refined, Apple-inspired palette with high-contrast accent colors and soft backgrounds.

- **Primary Colors**:
  - **Standard Background**: `#FFFFFF` (White) for a clean, minimal look.
  - **Accent Green**: `#3D5638` (Forest Green). Used for primary CTAs (focus states), navigation hover states, and specific brand accents.
  - **Text Primary**: `#000000` (Pure Black or very dark charcoal) for maximum legibility.
- **Secondary Colors**:
  - **Subtle Background**: `#F7F6F2` (Off-white/Beige). Used for secondary buttons (`Sign up`) and section backgrounds to provide soft separation without hard borders.
  - **Text Secondary**: Black with `60-80%` opacity (or mid-grey) for sub-text and captions.
- **Dark Mode**: Supports a high-contrast dark theme with deep grey/black backgrounds and white text.

## 3. Layout & Spacing
The layout follows a "less is more" philosophy with significant whitespace and a clear vertical flow.

- **Grid & Containers**:
  - **Max Container Width**: Centered layout with a maximum width of approximately `1200px` to `1400px` on desktop.
  - **Section Padding**: Very generous vertical padding (approx. `80px` to `120px` between sections) to give content "room to breathe."
- **Component Patterns**:
  - **Hero Section**: Centered text with a prominent "Watch the trailer" button and large visual assets.
  - **Feature Cards**: A mix of grid layouts and horizontal carousels. Cards feature rounded corners (`rounded-2xl` or approx. `16px`) and subtle borders.
  - **Navigation**: Fixed or sticky top navigation bar with a minimal brand logo on the left and utility links/CTAs on the right.

## 4. Animations & Interactions
Micro-interactions are used to provide tactile feedback and a high-end feel.

- **Hover Interactions**:
  - **Scale Effect**: Buttons and cards subtly scale up (`scale-[1.02]`) on hover.
  - **Shadows**: Cards often gain a soft, deep shadow (`0 8px 32px rgba(28,29,27,0.10)`) on hover to indicate interactivity.
  - **Color Transitions**: Smooth transitions (`duration-150`) for text color and background color changes in the navigation.
- **Active/Press States**:
  - **Scale Down**: Interactive elements like buttons "shrink" slightly (`active:scale-[0.98]`) when clicked, simulating a physical press.
- **Micro-animations**: Smooth entry reveals and interruptible horizontal scrolling in the carousel sections.

## 5. Mobile View (375px)
The design adapts seamlessly to smaller screens with several key shifts:

- **Navigation**: The desktop menu collapses into a clean **hamburger menu** on the right.
- **Stacking**: Grid-based features and sections stack vertically. Horizontal carousels remain swipeable to preserve vertical space.
- **Padding Adjustments**: Side margins are reduced to approximately `16px` to `24px` to maximize screen real estate for content.
- **Typography Scaling**: Headings scale down to maintain balance, ensuring the large hero text doesn't overwhelm the mobile viewport.

---
*Recording Analysis File:* `file:///Users/g2m7/.gemini/antigravity/brain/688e120e-b959-424d-a7a0-1851549b8aee/analysis_obvious_ai_1775904039112.webp`
