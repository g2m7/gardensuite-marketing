# Design Analysis: Regpit.com

## 1. Typography
*   **Font Family:** Uses a clean, modern sans-serif typeface, identified as **Inter** (via Google Fonts).
*   **Headings:**
    *   **Main Hero Heading (H1):** Extremely bold (font-weight: 700+), large size (~48px-64px on desktop), with tight letter-spacing. Occasional use of the primary brand blue for emphasis on key words like "Geldwäsche-Compliance".
    *   **Secondary Headings (H2):** Bold, comfortably sized (~32px-40px), used with generous line height (~1.3).
*   **Body Text:** Regular weight (font-weight: 400), sized at ~16px-18px. It uses a high line-height (~1.6) for readability and is typically in a soft dark gray rather than pure black.
*   **CTAs:** Buttons use uppercase or title case with medium-bold weight to ensure prominence.

## 2. Color Palette
*   **Primary Brand Color:** A vibrant, professional blue (`#1b43d1`). Used for main CTA buttons, emphasized text, and active states.
*   **Background Colors:**
    *   Primary: Pure white (`#FFFFFF`).
    *   Secondary: A very light blue-gray (`#F8F9FB`) used to differentiate sections (e.g., logo clouds or specific feature modules).
*   **Text Colors:**
    *   Headings: Deep black/gray (`#000000` or `#1A1A1A`).
    *   Body: Medium gray (`#444444` to `#555555`) for softer contrast.
*   **Status Colors:** Uses semantic colors for risk levels:
    *   Green: Low risk.
    *   Amber: Medium risk.
    *   Red: High risk.

## 3. Layout & Spacing
*   **Container Width:** The maximum container width is approximately **1200px**, ensuring content remains readable on ultra-wide monitors.
*   **Section Padding:** Significant vertical breathing room between sections, typically **100px to 140px** on desktop.
*   **Module Design:** High reliance on card-based layouts with very subtle shadows (`box-shadow`) and rounded corners (~12px-16px).
*   **Grid System:** Flexible grid that switches from 3-4 columns on desktop to 1-2 columns on tablet/mobile.

## 4. Animations
*   **Scroll Reveals:** Elements (especially feature cards and the "Was ist Regpit?" section) use scroll-triggered fade-in and subtle slide-up animations to create a dynamic feel as the user scrolls.
*   **Hover Interactions:** 
    *   Buttons have a slight color shift or shadow deepening on hover.
    *   Navigation links feature subtle underlines or color changes.
*   **Transitions:** Smooth CSS transitions (likely `0.3s ease-in-out`) are used for all state changes, avoiding jarring shifts.

## 5. Mobile View (375px)
*   **Navigation:** Nav bar collapses into a clean **hamburger menu**. The primary CTA "Termin buchen" often remains visible as a reduced-size button in the header.
*   **Text Alignment:** Headings and body text often switch to center-alignment in the hero section to maintain balance.
*   **Stacking:** Side-by-side desktop elements (like the module cards or the "Risk" indicators) stack vertically into a single column.
*   **CTAs:** Large buttons like "Kostenlos testen" expand to **full-width** (minus container padding) to provide a larger touch target.
*   **Padding:** Horizontal padding is reduced to **20px-24px** to maximize screen real estate for content.
