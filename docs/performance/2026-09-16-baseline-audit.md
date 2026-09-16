# Performance Baseline Audit (2026-09-16)

Audit conducted using the performance skill workflow against production (`https://gardensuite.in`). 

## Evidence Table

Audited under cold cache, emulated mobile conditions (Moto G Power, slow 4G, 4x CPU slowdown) using Lighthouse 13.4.1 across 3 consecutive navigations to establish median and variation.

| Signal | Scope and Conditions | Baseline (Median of 3) | Range (Min - Max) | Target / Good | Status | Source |
|---|---|---|---|---|---|---|
| **Performance Score** | Mobile lab, cold cache | **73** | 73 - 79 | ≥ 90 | Needs Improvement | Lighthouse |
| **LCP (Largest Contentful Paint)** | Mobile lab, cold cache | **4.89s** | 4.89s - 4.91s | ≤ 2.5s | **Poor** | Lighthouse |
| **FCP (First Contentful Paint)** | Mobile lab, cold cache | **3.22s** | 2.29s - 3.38s | ≤ 1.8s | Needs Improvement | Lighthouse |
| **TBT (Total Blocking Time)** | Mobile lab, cold cache | **0 ms** | 0 ms - 0 ms | ≤ 200 ms | **Good** | Lighthouse |
| **CLS (Cumulative Layout Shift)** | Mobile lab, cold cache | **0.000** | 0.000 - 0.015 | ≤ 0.10 | **Good** | Lighthouse |
| **Speed Index** | Mobile lab, cold cache | **4.88s** | 3.20s - 4.92s | ≤ 3.4s | Needs Improvement | Lighthouse |
| **Desktop Score** | Desktop (1350x940, unthrottled) | **90** | Single run | ≥ 90 | **Good** | Lighthouse |

Desktop reference metrics: LCP 1.9s, FCP 0.9s, TBT 0ms, CLS 0.006, Speed Index 1.2s.

## Resource Budget Evaluation

| Resource Category | Budget | Measured Transfer | Request Count | Status |
|---|---|---|---|---|
| Total page weight | < 1.5 MB | **469.2 KB** | 31 | Pass |
| JavaScript (compressed) | < 300 KB | **106.0 KB** | 18 | Pass |
| CSS (compressed) | < 100 KB | **16.4 KB** | 5 | Pass |
| Images (total transferred) | < 500 KB | **267.9 KB** | 5 | Pass |
| Fonts | < 100 KB | **47.3 KB** | 1 | Pass |
| Third-party | < 200 KB | **48.5 KB** | 2 | Pass |

Page weight and script payload are well within budget. The bottleneck is resource scheduling, critical path contention, and network protocol delivery.

## Measured Bottlenecks & Trace Analysis

### 1. Render-Blocking External Font (Estimated saving: ~810ms - 955ms)
- **Location**: `gs_landing/src/app.html` lines 22-25.
- **Problem**: Google Fonts (`https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap`) is linked as a synchronous blocking stylesheet. 
- **Impact**: The browser halts DOM construction and paint until DNS resolution, TLS handshake, and stylesheet download complete from Google's servers.

### 2. Hero Image Priority Contention (LCP Delay)
- **Location**: `gs_landing/src/routes/+page.svelte` lines 392-496.
- **Problem**: 4 separate images in the hero section are configured with `loading="eager"`, and 3 of them specify `fetchpriority="high"`:
  - `bg-960.webp` (69 KB) - actual LCP element
  - `fg-960.webp` (69 KB)
  - `mis-dashboard-900.webp` (23 KB)
  - `cloud-border.webp` (101.5 KB)
- **Impact**: All four images compete simultaneously for bandwidth on mobile network connections. This starves the background landscape (`bg-960.webp`), pushing LCP to 4.89s.

### 3. HTTP Protocol Delivery (Estimated saving: ~410ms)
- **Observation**: Assets from `gardensuite.in` are served over HTTP/1.1 without connection multiplexing.
- **Impact**: Each asset request incurs queueing and head-of-line delays on constrained connections. Upgrading to HTTP/2 or HTTP/3 multiplexes stylesheet, script, and image requests over a single connection.

### 4. Missing Static Asset Cache Lifetimes (Repeat visit saving: ~268 KiB)
- **Observation**: Static assets at the web root (`cloud-border.webp`, `fg-960.webp`, `bg-960.webp`, `mis-dashboard-900.webp`, `hero-sky.webp`) return without long-lived `Cache-Control` headers (`cacheLifetimeMs: 0`).
- **Impact**: Repeat visitors re-download the full asset payload on every navigation.

### 5. Image Size and Compression Violations
- `gs_landing/static/cloud-border.webp` is 101.5 KB (1800x411) for a decorative element displayed at 412x180 on mobile devices. Trace analysis flags ~91 KiB in avoidable transfer.
- `gs_landing/static/bg-1920.webp` (232 KB) and `gs_landing/static/fg-1920.webp` (237 KB) violate the repository rule: *"No image in static/ may exceed 200KB in its served format"*.

## Repository Rules Compliance (`AGENTS.md`)

- **Rule 1 (No image in static/ exceeding 200KB)**: Failed. `bg-1920.webp` (232 KB) and `fg-1920.webp` (237 KB) exceed 200KB.
- **Rule 2 (Explicit width and height on images)**: Passed.
- **Rule 3 (Maximum 2 eager hero images)**: Failed. 4 images currently load eagerly in the hero section.
- **Rule 4 (Picture with WebP and responsive srcset)**: Passed.
- **Rule 5 (Below-fold images use loading="lazy")**: Passed.
- **Rule 6 (Third-party scripts dynamically imported in onMount)**: Passed. GSAP and Lenis run client-side without main-thread blocking (TBT is 0ms).
- **Rule 7 (prefers-reduced-motion respected)**: Passed in stylesheet.
- **Rule 8 (No inline SVGs larger than 2KB)**: Passed.

## Corrective Plan

1. **Font Loading**:
   - Self-host Inter via `@fontsource/inter` or convert the Google Fonts link in `src/app.html` to an asynchronous non-blocking stylesheet with `media="print" onload="this.media='all'"`.
2. **Hero Scheduling**:
   - Retain `fetchpriority="high"` and `loading="eager"` strictly on the primary LCP visual (`bg-960.webp`).
   - Switch `fg-960.webp`, `cloud-border.webp`, and `mis-dashboard-900.webp` to default priority and lazy loading where appropriate.
3. **Asset Optimization**:
   - Recompress `bg-1920.webp` and `fg-1920.webp` to bring both below 200KB.
   - Compress `cloud-border.webp` or replace it with a lightweight SVG/CSS gradient.
4. **Server Configuration**:
   - Enable HTTP/2 or HTTP/3 on the production web server.
   - Configure `Cache-Control: public, max-age=31536000, immutable` for static assets.
