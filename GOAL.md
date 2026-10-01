# GardenSuite: Performance & Motion Engineering Goal

**Branch:** `perf-motion-awwwards`  
**Focus:** Ultra-fast page loading and Awwwards-level motion engineering within GardenSuite design rules.

---

## 1. Executive Summary

This branch focuses on two parallel goals:

1. **Ultra-Fast Performance:** Deliver the fastest possible page load times across all target regions (Assam, Dooars, Terai, Darjeeling). Target under 0.8s LCP on real-world networks, perfect 100/100 Core Web Vitals, and 0ms perceived navigation latency.
2. **Awwwards-Level Motion & Craft:** Elevate GardenSuite into a world-class digital experience. Use fluid scroll storytelling, tactile hardware-to-software interactions, and responsive physics while strictly following the locked design system in `docs/website/DESIGN.md`.

---

## 2. Speed Architecture: How to Load the Site as Fast as Possible

Tea estate owners and managers often browse from gardens with fluctuating 3G/4G connectivity. Every kilobyte, render-blocking script, and extra network roundtrip slows down initial page load.

### 2.1 Kill the External Font Blocking Chain
- **Current problem:** Google Fonts loads through external HTTP links (`fonts.googleapis.com` and `fonts.gstatic.com`). This adds two DNS lookups, two TLS negotiations, and a render-blocking stylesheet request before text appears.
- **Solution:**
  - Self-host subsetted variable fonts in WOFF2 format locally in `static/fonts/` (`Inter-Variable.woff2` and `PlusJakartaSans-Variable.woff2`).
  - Latin glyph subsetting reduces font file weights from ~180KB down to ~30KB each.
  - Preload the primary font in `app.html` using `<link rel="preload" href="/fonts/Inter-Variable.woff2" as="font" type="font/woff2" crossorigin>`.
  - Result: Eliminates 400ms to 800ms of external network latency. Text renders immediately without layout shift (`font-display: swap`).

### 2.2 Optimize Critical CSS & SvelteKit Bundling
- **Current problem:** Tailwind v4 generates a single 85.5KB stylesheet (`0.BeWqn1WO.css`) linked as an external stylesheet, blocking initial paint.
- **Solution:**
  - Configure `inlineStyleThreshold: 50000` in `svelte.config.js` to inline critical CSS directly into the initial HTML document.
  - Ensure above-the-fold content paints on the very first TCP packet without waiting for an external CSS download.
  - Prune any unused utility classes and keyframe animations.

### 2.3 Hero Image Pipeline & LCP Prioritization
- **Current problem:** Four separate images in the hero currently declare `loading="eager"` and `fetchpriority="high"`. Parallel browser requests compete for network bandwidth, delaying the Largest Contentful Paint (LCP).
- **Solution:**
  - Designate exactly one primary LCP visual (the dashboard preview / hero landscape) with `fetchpriority="high"` and `<link rel="preload" as="image">`.
  - Load secondary ambient layers (sky, foreground foliage, cloud border) with standard priority.
  - Add AVIF format support with WebP fallbacks using `<picture>` tags. AVIF achieves 25% to 35% smaller file sizes than WebP for nature photos and gradients without visual loss.
  - Set explicit `width` and `height` on every single `<img>` tag to guarantee zero Cumulative Layout Shift (CLS = 0).

### 2.4 Preloader & Script Optimization
- **Current problem:** `CinematicPreloader` dynamic-imports GSAP on mount and runs a timed sequence up to 1.2s. On fresh visits or slow connections, this delays user interaction and penalizes lab performance scores.
- **Solution:**
  - Ensure the base server-rendered HTML and hero copy are immediately visible underneath.
  - Transition the preloader smoothly using lightweight CSS transitions or immediate dismissal on first user scroll/touch.
  - Keep the session bypass in `sessionStorage` active so repeat visits load instantly.
  - Defer heavy runtime libraries (Lenis, ScrollTrigger) until after initial DOM paint and requestIdleCallback.

### 2.5 Instant In-Session Navigation (Speculation Rules)
- **Solution:**
  - Implement HTML Speculation Rules for moderate prerendering of primary product links (`/products/attendance`, `/products/payroll`, `/products/mis`).
  - Paired with SvelteKit client-side routing, intra-site navigation becomes instantaneous (0ms perceived latency).

### 2.6 Edge Caching & Asset Compression
- **Solution:**
  - Pre-compress all static assets with Brotli (`.br`) and Gzip (`.gz`).
  - Set immutable caching headers for hashed assets: `Cache-Control: public, max-age=31536000, immutable`.
  - Serve HTML with edge caching and `stale-while-revalidate`.

---

## 3. Motion Design Architecture: Awwwards-Level Polish

Awwwards Site of the Day craft does not come from chaotic 3D effects or heavy animations that distract from the product. It comes from **spatial continuity, believable physics, and invisible micro-interactions**.

### 3.1 Strict Design System Alignment
All motion and visual updates must strictly obey `docs/website/DESIGN.md` and `gs_landing/AGENTS.md`:
- **Allowed & Encouraged:** Clean white canvas, warm neutrals (`#FAFAF7`, `#F8F7F3`), single brand green (`#1B5E3B`), hairline borders (`#E4E4E7`), Plus Jakarta Sans display typography, tactile hardware graphics, restrained Apple-style motion.
- **Strictly Banned:**
  - NO `font-bold` (use `font-semibold` or `font-medium`).
  - NO glassmorphism / `backdrop-blur`.
  - NO pill-shaped kickers or badges.
  - NO background colored boxes/circles behind icons.
  - NO colored glow effects or neon borders.
  - NO heavy shadows (maximum shadow: `0 12px 30px rgba(0,0,0,0.10)`).
  - NO em dashes (use regular hyphens `-`).
  - NO AI jargon or marketing buzzwords (`no-ai-slop`).

### 3.2 Choreographed Scroll Storytelling (Lenis + GSAP ScrollTrigger)
- **Smooth Scrolling Baseline:**
  - Configure Lenis with `lerp: 0.075`, `wheelMultiplier: 0.85`, and `touchMultiplier: 1.5`.
  - Sync Lenis directly with GSAP's ticker using `lagSmoothing(0)` for zero frame drops on 60Hz and 120Hz ProMotion displays.
- **Multi-Plane Hero Parallax:**
  - Coordinate the hero landscape with depth planes:
    - Sky: Fixed calm horizon.
    - Mountain landscape: Slow upward counter-drift (`y: 30`, scrubbed).
    - Dashboard interface: Fast focused lift (`y: -150`).
    - Foreground tea leaves: Grounded settling (`y: -35`).
    - Fog/cover expansion: Smooth white wash transitioning cleanly into the stats row.
- **Sticky Loss-Prevention Stack:**
  - In key operational control sections, implement sticky stacked cards that gently scale down to `0.94` and fade slightly as the next card arrives, creating tactile physical depth without heavy shadows.
- **Parallax Footer Reveal:**
  - The main page content slides up to uncurtain the white footer with its deep green aurora glow.

### 3.3 Kinetic Typography (Masked Split-Text)
- Move away from generic block fade-ins.
- Split key section titles into word-level masks (`.split-word-mask` with `overflow: hidden`).
- Animate words from `translateY(110%)` with a subtle blur dissipation (`filter: blur(4px) -> blur(0px)`) to `translateY(0%)`.
- Use expo easing `cubic-bezier(0.19, 1, 0.22, 1)` with a tight `0.04s` stagger.
- Preserve full accessibility by maintaining `aria-label` on the parent container.

### 3.4 Hardware-to-Software Tactile Pairing
GardenSuite is unique because it connects physical estate hardware (face terminals, Bluetooth hanging scales) with software records.
- **Interactive Scale Simulation:**
  - Show the live stabilization sequence on the wireless scale graphic: tare -> live plucking weight (`18.4 kg`) -> stable lock LED pulse (amber to green).
  - Animate the linked data packet streaming into the worker's digital hazira ledger.
- **Offline Sync Indicator:**
  - An interactive pulse showing the offline estate server buffering records locally, then smoothly syncing to the cloud MIS dashboard once internet reconnects.

### 3.5 Micro-Interactions & Physical Easing Tokens
Adopt the Emil Kowalski design engineering principles:
- **Button Press Physics:**
  - Every button presses down with `active:scale-[0.97]` on a 150ms press curve (`cubic-bezier(0.25, 0.46, 0.45, 0.94)`).
  - Explicit transition properties only (`transition: transform 160ms ease-out, background-color 160ms ease-out, border-color 160ms ease-out`).
  - Add `touch-action: manipulation` to eliminate double-tap zoom lag on mobile.
- **Asymmetric Timing:**
  - Entrances are deliberate and smooth (200ms - 280ms, `cubic-bezier(0.22, 1, 0.36, 1)`).
  - Exits are snappy and clean (120ms - 160ms).
- **Tabular Numerals:**
  - Apply `tabular-nums` on all stats, kilogram weights, rupee amounts, and date stamps to prevent horizontal jitter.

### 3.6 Accessibility & Reduced Motion
- When `prefers-reduced-motion: reduce` is enabled:
  - GSAP timelines and Lenis smooth scrolling immediately disable.
  - Parallax transforms collapse to clean zero-offsets.
  - Transitions switch to gentle instant opacity changes.
  - All interactive elements retain immediate keyboard focus rings (`focus-visible:ring-2 ring-[#1B5E3B]/30`).

---

## 4. Quantitative Target Metrics

| Metric | Current State | Target on this Branch |
|---|---|---|
| First Contentful Paint (FCP) | ~1.2s - 1.8s (rural/mobile) | **< 0.6s** |
| Largest Contentful Paint (LCP) | ~2.0s - 2.8s | **< 0.8s** |
| Cumulative Layout Shift (CLS) | 0.02 - 0.05 | **0.000** |
| Interaction to Next Paint (INP) | ~80ms | **< 50ms** |
| Initial Page Weight (HTML+CSS+Critical JS) | ~320 KB | **< 180 KB** |
| Third-party Network Roundtrips (Fonts/Scripts) | 2 external domains | **0 external domains (100% self-hosted)** |
| Animation Frame Rate | Occasional 45fps dip on scroll | **Solid 60fps / 120fps ProMotion** |
| Design Rule Violations | Ratchet baseline held | **Zero new violations, existing debt reduced** |

---

## 5. Phased Implementation Roadmap

### Phase 1: Performance Engine
- [ ] Download and self-host Latin-subsetted Inter and Plus Jakarta Sans variable fonts in WOFF2 format.
- [ ] Remove Google Fonts external links from `app.html` and wire local `@font-face` in `layout.css`.
- [ ] Configure critical CSS inlining and style threshold in `svelte.config.js`.
- [ ] Audit all above-fold hero images: designate single high-priority LCP image, convert photography to AVIF + WebP.
- [ ] Audit all `<img>` tags across `ModulePreview.svelte` and product components for explicit `width` and `height`.
- [ ] Add Speculation Rules API for instant product page navigation.

### Phase 2: Motion Tokens & Interaction Physics
- [ ] Define standardized easing variables in `layout.css` (`--ease-enter`, `--ease-out`, `--ease-press`, `--ease-expo`).
- [ ] Update `Button.svelte` with explicit transition properties, press physics, and `touch-action: manipulation`.
- [ ] Optimize `GlobalNav.svelte` scroll handler: replace per-pixel backdrop blur calculation with GPU-composited opacity layer to eliminate scroll jank.
- [ ] Apply `tabular-nums` across all statistics, prices, weights, and table metrics.

### Phase 3: Editorial Scrollytelling & Visual Choreography
- [ ] Refine Lenis + GSAP ticker synchronization with `lagSmoothing(0)`.
- [ ] Upgrade hero multi-plane parallax choreography with balanced scrub rates.
- [ ] Implement masked split-text reveal for major section headings.
- [ ] Implement sticky card stack in the loss-control / proof section.
- [ ] Add smooth unmasking parallax transition to the footer.

### Phase 4: Hardware & Operational Showcases
- [ ] Build interactive Smart Weighing Scale demonstration component with live weight stabilization.
- [ ] Build interactive Face Attendance to Hazira ledger synchronization sequence.
- [ ] Refine `ModulePreview.svelte` device frames with crisp border contrast and zero layout shift.

### Phase 5: Testing, Audits & Ratchet Verification
- [ ] Run `bun run check` (TypeScript + Svelte checks).
- [ ] Run `node scripts/check_design_rules.mjs` (verify 0 new violations and reduced baseline).
- [ ] Run `node scripts/check_repository_layout.mjs`.
- [ ] Run `node scripts/check_seo.mjs`.
- [ ] Profile performance traces with Chrome DevTools (LCP, CLS, long tasks).
