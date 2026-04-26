# Design Analysis: Comma.to

## 1. Typography
*   **Fonts:** The site uses a clean, modern sans-serif stack, primarily **Inter**. It relies on high-quality variable weights to create hierarchy.
*   **Headings:**
    *   **Hero Heading:** Approximately `64px` on desktop, scaling down to `36px` on mobile. Uses `font-semibold` or `font-bold`.
    *   **Sub-headings:** Range from `32px` to `40px`.
    *   **Casing:** Sentence case for headlines ("Create a personal website...") and Title Case for interactive elements (Buttons, Menu items).
*   **Body Text:**
    *   **Standard Body:** `14px` to `16px` with generous line-height (`leading-relaxed`).
    *   **Meta/Labels:** `12px` for smaller UI details and descriptors.
    *   **Comparison:** High contrast between huge headings and relatively small body text creates a "pro" and "minimal" feel.

## 2. Color Palette
*   **Background:** Solid deep black (`#0a0a0a`).
*   **Primary Text:** Pure white (`#ffffff`) for active/important content.
*   **Secondary Text:** Muted Grays (`#9ca3af` / `#4b5563`) for inactive or supplementary text.
*   **Accent/Buttons:**
    *   **Primary Action:** White background with black text.
    *   **Secondary Action:** Dark translucent gray background with white text or subtle borders.
*   **Accents:** Occasionally uses small status indicators (green/blue dots for "online" or "new") but remains strictly monochromatic overall.

## 3. Layout & Spacing
*   **Max Container Width:** 
    *   Content-heavy sections (copy): Narrow container (~`800px`) centered to improve readability.
    *   Grid sections (Explore/Profiles): Wider container (~`1200px`) to accommodate cards.
*   **Section Spacing:** Very generous vertical padding (`120px` to `160px`) between sections, allowing each feature to "breathe."
*   **Border Radius:** Consistent use of `rounded-xl` (~`12px`) for buttons, cards, and input fields, giving it a soft, modern Apple-like feel.

## 4. Animations
*   **Scrollytelling:** The most prominent feature. As users scroll, text segments transition from low opacity (~`0.3`) to full opacity (`1.0`) when they reach the viewport center. This guides the user's focus through the value proposition.
*   **Hover States:** 
    *   **Cards:** Subtle background color shifts (moving from black to a slightly lighter gray).
    *   **Buttons:** Slight opacity changes or scale-ups.
    *   **Links:** Smooth color transitions from gray to white.
*   **Transitions:** All interactive states use `transition-all duration-200` for a snappy yet smooth feel.

## 5. Mobile View (375px)
*   **Structural Changes:**
    *   **Navigation:** Secondary links (like "Log in") are hidden or moved into a menu to prioritize the "Sign up" CTA.
    *   **Grids:** All multi-column grids (2 or 3 columns) stack into a single vertical column.
    *   **Headings:** Font sizes are aggressively reduced to ensure headlines don't wrap awkwardly.
*   **Interaction:** The scrollytelling effect is preserved and feels natural for thumb-scrolling on mobile devices.
