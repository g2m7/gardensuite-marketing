# Handoff Documentation: Inspiration Extraction

## Overview
This document tracks the progression and findings of the Design Extraction Project from the 10 inspiration websites for the new GardenSuite Landing Page.

## Directory Structure
- `plan.md` - Execution plan and completion checklists
- `handoff.md` - Summary of findings, universal patterns, and context 
- `sites/*.md` - Detailed individual reports for each Inspiration Site.

## Current Status
- Project Initialized: Directory structure setup completed.
- Pending Browser Extractions:
  - [x] GitHub Codespaces
  - [x] Obvious.ai
  - [x] folk.app
  - [x] Fey.com
  - [x] Modeinspect.com
  - [x] Regpit.com
  - [x] Comma.to
  - [x] PayloadCMS
  - [x] Index.app
  - [x] Keytail.ai
- Status: **COMPLETED**

## Key Global Findings
- **Typography Trends**: Heavy reliance on clean, geometric sans-serifs (Inter, Geist, Satoshi) for a "tech-forward" aesthetic. High contrast between massive, tightly-kerned Hero H1 headings (72px-96px) and highly readable, medium-height body text (16px-18px). Occasional use of italicized serifs (folk.app) for elegant emphasis.
- **Color Strategies**: Sites typically lean extremely stark—either completely white/off-white (Modeinspect, Obvious, folk.app) or pitch black/dark mode (Fey, PayloadCMS, Index, Comma). Colors are reserved strictly for call-to-action buttons, hover states, and structural dividers to provide maximum contrast.
- **Spacing & Breakpoints**: A defining characteristic is "extreme whitespace." Vertical padding between sections frequently hits 120px to 200px. Standard container max-widths range from 1200px to 1440px. On mobile, strict vertical stacking occurs, side padding shrinks to ~20px, and large fonts scale down 30-40% to maintain readability without wrapping awkwardly.
- **Interactions & Animations**: Nearly universal use of "scroll-reveals" (fade-in, slide-up). Navigation bars frequently use glassmorphism (backdrop-blur) and sticky positioning. Hover states on buttons/cards replicate minimal physicality (slight scaling `scale(1.02)`, gentle shadow lifts, opacity shifts) rather than major color flips.
