# Design Analysis: GitHub Codespaces

## 1. Typography
*   **Font Family:** A mix of system sans-serif (`-apple-system, BlinkMacSystemFont, "Segoe UI", ...`) and specific GitHub monospaced fonts for code blocks (`SFMono-Regular, Consolas, ...`).
*   **Headings:**
    *   **Hero Heading:** Extremely large, bold (~64px-72px), utilizing standard GitHub heading styles (Mona sans styled).
    *   **Section Headings:** Large (~48px), bold, often centered or left-aligned depending on the section flow.
*   **Body Text:**
    *   Legible ~16px for general descriptions, ~14px for meta-information or small labels.
    *   Font weight is regular, with semi-bold used for links and UI labels.

## 2. Color Palette
*   **Backgrounds:** 
    *   Light Mode: White (#FFFFFF) and very light gray (#F6F8FA).
    *   Dark Mode: Deep dark grays and near-black (#0D1117).
*   **Primary Brand:** GitHub blue (`#0969DA` in light mode, `#58A6FF` in dark mode) for links and primary call-to-action buttons.
*   **Accents:**
    *   Green (`#238636` / `#2EA043`) is heavily used for the primary "Get Started" buttons indicating positive creation flow.
    *   Subtle structural borders in light gray (`#D0D7DE`) or dark gray (`#30363D`).

## 3. Layout & Spacing
*   **Container Width:** Max-width of 1280px, strictly centered.
*   **Section Rhythm:** Alternates between text-left + visual-right, then text-right + visual-left.
*   **Padding Patterns:**
    *   Generous vertical padding (approx. 100px) creates breathing room between alternating sections.
    *   Sub-feature grids use CSS Grid with 3-columns and ~32px gaps.
*   **Structural elements:** Frequently uses a "card" style layout with a subtle 1px border (`border-color: var(--color-border-default)`) and `border-radius: 6px`.

## 4. Animations
*   **Scroll-Triggered Reveals:** Sections gently slide up and fade in on scroll. Features often have nested animations within the product visual that play continuously to demonstrate functionality.
*   **Hover states:**
    *   Buttons darken slightly on hover.
    *   Nav menus use drop-down fade-ins.
    *   Cards subtlely elevate or their border color changes (`hover:border-blue-500` equivalent).

## 5. Mobile View Analysis (375px)
*   **Navigation:** Top navigation collapses into an off-canvas menu hidden behind a hamburger icon. Sign-in and Sign-up persist.
*   **Stacking:** 
    *   Alternating Zig-Zag sections lose their horizontal nature and strictly stack: Image first, Text underneath (or vice versa).
    *   3-column grids collapse to 1 column.
*   **Typography:** Headings reduce in size dramatically to prevent excessive text wrapping. Hero heading reduces to ~40px.
*   **Padding:** Section padding is reduced, and horizontal padding drops to ~16px.
