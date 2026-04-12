# Design Analysis: Fey.com

## 1. Typography
Fey.com features a premium, "Apple-inspired" dark aesthetic with high-contrast typography and immersive, scroll-driven storytelling.

*   **Font Family**: A clean, geometric sans-serif is used throughout. It closely resembles **Inter** or **Mona Sans**, featuring tight tracking and a modern feel.
*   **Headings**:
    *   **Hero Heading**: Extremely large (approx. 72px–96px on desktop), bold, and high-contrast white.
    *   **Section Headings**: Large (approx. 48px–64px), bold, often centered to anchor the section.
*   **Body Text**:
    *   Clean sans-serif (approx. 16px–18px) with generous line-height (approx. 1.5–1.6) for readability against the dark background.
    *   Secondary text uses a medium-gray color to establish hierarchy.
*   **Weights**: Bold (headings), Semi-bold (subheadings/buttons), and Regular (body).

## 2. Color Palette
*   **Background**: True black (`#000000`) for the main canvas, creating a "limitless" feel.
*   **Primary Text**: Pure white (`#FFFFFF`) for maximum legibility.
*   **Secondary Text**: A muted gray (approx. `#888888` or `#A1A1A1`) to differentiate less critical information.
*   **Accent/Functional Colors**: 
    *   **Green**: Used for positive financial data and growth indicators (approx. `#30D158`).
    *   **Overlays**: Subtle translucent dark grays for card backgrounds and sticky elements.

## 3. Layout & Spacing
*   **Max Container Width**: Content is generally contained within a `1200px` to `1400px` width, though hero imagery often bleeds or uses absolute positioning for an expansive feel.
*   **Vertical Spacing**: Extremely generous whitespace (padding/margins) between sections, often ranging from `120px` to `240px`, allowing each feature to breathe.
*   **Structure**:
    *   **Central Alignment**: Most text content is centered, creating a focused, editorial layout.
    *   **Grid/Flex**: Frequent use of Flexbox for aligning feature cards and navigation items. Grid is used for more complex dashboard-like mockups.

## 4. Animations & Interactions
*   **Scroll Reveals**: As users scroll, text and images fade in with a slight vertical translation (move up).
*   **Floating CTA**: A persistent, translucent capsule-shaped bar at the bottom center provides a constant call-to-action without obstructing content.
*   **Immersive Hero**: The initial view features a high-quality dashboard mockup that feels "embedded" into the dark background, often accompanied by subtle parallax elements.
*   **Hover States**: Buttons and interactive cards feature subtle scale-ups or background luminosity increases.

## 5. Mobile View (375px)
*   **Responsiveness**: The layout transitions seamlessly from a multi-column desktop view to a single-column stack.
*   **Typography Scaling**: Headings scale down significantly (to approx. 32px–40px) to fit the narrow viewport while maintaining impact.
*   **Navigation**: A minimalist hamburger menu replaces the desktop navigation links.
*   **Feature Carousels**: Horizontal scrolling is utilized for some feature cards to save vertical space.
*   **Touch Targets**: Buttons maintain a large hit area, and the floating CTA remains prominently centered at the bottom.
