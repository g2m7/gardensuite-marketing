# Performance Documentation

This directory tracks web performance audits, Core Web Vitals baselines, resource budgets, and optimization logs for GardenSuite web surfaces.

## Performance Budget Guardrails

Derived from the web-quality performance guidelines and calibrated for garden and regional network conditions:

| Resource | Budget | Rationale |
|---|---|---|
| Total page weight | < 1.5 MB | Keeps transfer time manageable on rural/semi-rural cellular networks |
| JavaScript (compressed) | < 300 KB | Limits CPU parsing and execution delay on low-end devices |
| CSS (compressed) | < 100 KB | Prevents render-blocking delay |
| Images (above-fold) | < 500 KB | Protects critical LCP bandwidth |
| Fonts | < 100 KB | Limits webfont layout shifts and FOIT |
| Third-party requests | < 200 KB | Keeps non-essential external code off critical path |

## Measurement Protocol

All lab audits follow the standard workflow from `.agents/skills/performance`:

1. **Target**: Tested against live production (`https://gardensuite.in`) and local preview builds.
2. **Environment**: Headless Chromium via Lighthouse CLI.
3. **Conditions**: Emulated mobile (Moto G Power profile, 4G Slow network, 4x CPU slowdown) with cold browser cache. Desktop audited separately for reference.
4. **Statistical Rigor**: Minimum 3 runs per audit cycle to record median and range.

## Audit Log

- [2026-09-16 Baseline Audit](2026-09-16-baseline-audit.md) - Initial mobile/desktop Core Web Vitals baseline and bottleneck analysis
