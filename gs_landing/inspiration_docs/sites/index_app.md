# Design Analysis: Index.app

## 1. Typography
*   **Primary Font:** **Geist Sans** (or a very similar clean, geometric sans-serif like **Inter**).
*   **Heading Styles:**
    *   **H1 (Hero):** Massive (~80–96px on desktop) with a very tight letter-spacing (negative tracking, around `-0.04em`). Font weight is **Semi-bold** to **Bold**.
    *   **Section Headings:** Medium-large (~40–48px), also with tight tracking.
    *   **Sub-headings:** ~20–24px, medium weight, often in a muted gray color for contrast.
*   **Body Text:** ~16px, regular weight. High legibility.
*   **Tracking/Kerning:** Notable use of negative tracking on all large headings to create a "compact" and premium look.
*   **Type Hierarchy:** High contrast between primary headings (white) and secondary/metadata text (muted gray).

## 2. Color Palette
*   **Core Background:** Absolute black (`#000000`).
*   **Primary Text:** Pure white (`#FFFFFF`).
*   **Secondary Text:** Muted gray (approximately `#A1A1AA` or `#71717A`).
*   **Accent Colors:**
    *   **Glow Effects:** Subtle blue and purple radial gradients (`rgba` fades) used in the background of major sections and along the screen edges to provide depth.
    *   **Grid Lines:** Dark gray dashed lines (approx `#222222`) that form a technical-looking grid across the entire site.
*   **Buttons:**
    *   **Primary (Book Demo):** Solid white background with black text.
    *   **Secondary (Login):** Ghost button with a thin dark gray border and light gray hover state.

## 3. Layout & Spacing
*   **Maximum Container Width:** Approximately **1200px**, though the background grid and glow effects often extend to the full viewport width.
*   **Grid System:** The page is structured on a strict grid identified by **dashed borders**. These borders create "cells" for content, giving it a blueprint/technical feel.
*   **Vertical Spacing:** Very generous vertical padding between sections (typically **120px to 160px**), allowing elements to breathe.
*   **Alignment:** Primarily center-aligned hero content, transitioning to a multi-column (usually 2-column) grid for features and details.

## 4. Animations & Interactions
*   **Scroll Reveals:** Sections utilize subtle "fade-in and slide-up" transitions as the user scrolls down.
*   **Hover States:**
    *   **Nav Links:** Muted gray to white color transition.
    *   **CTA Buttons:** Subtle scale-up (e.g., `scale(1.02)`) and background color brightness shifts.
*   **Background Activity:** Subtle animated radial glows or "rays" that shift slowly, creating a dynamic but non-distracting depth.
*   **Custom Cursor:** (If active) Sometimes includes a subtle glow or trailing element, though the standard cursor is used for primary interactions.

## 5. Mobile View (375px)
*   **Responsive Scaling:**
    *   **H1 Size:** Significantly reduced (to ~40–48px) but remains the dominant element.
    *   **Grid Stacking:** Multi-column layouts (2-column desktop) stack into a **single vertical column**.
*   **Navigation:** Descriptive desktop links (Features, Blog, etc.) are hidden behind a **hamburger menu** icon in the top right.
*   **Margins:** Side margins are reduced to approximately **20px**.
*   **CTA Prominence:** The "Book demo" button often moves from the header into a more prominent centered position effectively acting as the main focus of the mobile hero.
