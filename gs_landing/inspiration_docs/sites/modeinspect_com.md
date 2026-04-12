# Design Analysis: Modeinspect.com

## 1. Typography
*   **Primary Fonts:** A minimalist, premium geometric sans-serif (e.g., **Inter**, **Satoshi**, or **Outfit**) that projects an "Apple-like" clean aesthetic.
*   **Headings:**
    *   **Hero H1:** Massive (often 80px+), incredibly bold, and uses punctuation for impact (e.g., "Design in code.").
    *   **Sub-headings:** Large, but use a noticeably lighter weight (often standard or medium) to contrast against the bold main headings.
*   **Body Text:** Clean, ~16px-18px body size with high readability, utilizing a subdued gray to allow headings to pop.
*   **Style:** Minimalist use of capitalization.

## 2. Color Palette
*   **Backgrounds:** Strict adherence to white (#FFFFFF) for the vast majority of the site to emulate an untethered blank canvas.
*   **Primary Text:** Pure black (#000000) for maximum stark contrast.
*   **Secondary Text:** Medium gray (#888888 or similar) for descriptions.
*   **Accent/CTAs:** Primary call-to-action buttons are often solid black with white text, or rely on very subtle brand-specific accent colors used sparingly.

## 3. Layout & Spacing
*   **Max Container Width:** Centered container, typically ~1200px.
*   **Whitespace:** "Extreme" padding logic. Sections often feature 150px to 200px of vertical space between them. The design relies entirely on whitespace rather than borders or background colors to separate concepts.
*   **Alignment:** Hero content is strongly center-aligned. Feature deep-dives often use a 3-card horizontal layout with wide gaps.
*   **Visuals:** Full-width product visuals that extend beyond the text container to create a sense of scale and immersion.

## 4. Animations & Interactions
*   **Parallax & Scroll:** Subtle parallax on large product images.
*   **Scroll Reveal:** Extremely smooth, slightly delayed fade-ups for text blocks as they enter the viewport. The animation curves are heavily smoothed (cubic-bezier) to feel "heavy" and premium.
*   **Hover States:** Simple, tactile hover states on buttons (slight scale or shadow increase).

## 5. Mobile View Analysis (375px)
*   **Responsive Flow:** The massive whitespace is compressed but not eliminated. Single-column vertical stacking for all 3-card deep dives.
*   **Hero Typography:** H1 shrinks significantly (to ~48px) but retains its bold, left-aligned or center-aligned dominance.
*   **Navigation:** Minimalist header transitions smoothly to a mobile menu, removing all non-essential links.
*   **Images:** Full-width images scale down to fit the viewport width, maintaining their edge-to-edge bleed to save horizontal space.
