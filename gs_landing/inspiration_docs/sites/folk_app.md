# Design Analysis: folk.app

## 1. Typography
folk.app uses a sophisticated typographic pairing that balances modern utility with editorial elegance.

*   **Principal Sans-Serif**: A clean, geometric sans-serif (likely **Inter** or a custom variant) used for the majority of the UI, including navigation, sub-headings, and body text.
*   **Emphasis Serif**: A high-contrast, elegant serif (likely **Newsreader** or **Instrument Serif**) used in *italics* for specific words within headings to add character (e.g., "the CRM that *works* for your team").
*   **Heading Hierarchy**:
    *   **H1 (Hero)**: Approximately `64px`–`80px`, Bold, tight letter-spacing.
    *   **H2 (Sections)**: Approximately `48px`, Bold.
    *   **Body**: `16px`–`18px`, Regular weight, generous line-height for readability.
*   **Styling**: Labels and meta-text often use all-caps with increased letter-spacing for a "pro" feel.

## 2. Color Palette
The palette is "organic premium," avoiding stark whites in favor of warmer, textured tones.

*   **Background**: A warm, off-white or cream tint (`#F9F8F4`).
*   **Primary Text**: A very dark grey, almost black (`#1A1A1A`), providing high contrast without the harshness of pure black.
*   **Accents**: 
    *   **Primary Button**: Solid black with white text.
    *   **Secondary/Illustrations**: Soft pastels (sage green, pale yellow, light blue) used in feature graphics and category tags.
*   **Texture**: The background features a subtle grain or paper-like texture, which is a signature element of their design.

## 3. Layout & Spacing
The layout follows a "clean room" philosophy with massive amounts of white space.

*   **Max Container Width**: Centered layout with a max-width of approximately **1200px**.
*   **Section Spacing**: Very large vertical padding between sections (approx. `120px` to `160px`), allowing each feature to "breathe."
*   **Hero Section**: Center-aligned, focusing entirely on the value proposition and a simple two-field signup form.
*   **Feature Grid**: Alternates between single-column center-aligned content and multi-column grids for feature lists or social proof.

## 4. Animations & Micro-interactions
The site uses subtle motion to guide the eye without being distracting.

*   **Scroll Reveals**: Elements (text blocks, images) use a gentle "fade-and-slide" entrance animation as they enter the viewport.
*   **Sticky Navigation**: The navbar remains at the top, often with a slight blur effect or color shift on scroll.
*   **Hover States**: 
    *   Navigation links use a subtle opacity shift or color change.
    *   Buttons have a solid-to-slight-lift effect or color transition.
*   **Micro-animations**: Small Lottie-style animations or CSS transitions in feature cards to demonstrate product functionality.

## 5. Mobile View (375px)
The mobile transition is seamless, maintaining the "premium" feel through typography.

*   **Stacking Logic**: All multi-column feature grids stack into a single column.
*   **Navigation**: Collapses into a clean hamburger menu (typically top right).
*   **Typography Scaling**: Headings scale down roughly 20-30% while maintaining their bold presence. The serif emphasis is preserved.
*   **Padding**: Horizontal safe-area padding of approx. **24px** on each side.
*   **Interactions**: Large, thumb-friendly tap targets for CTAs.
