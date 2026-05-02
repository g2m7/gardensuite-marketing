# GardenSuite Site Architecture Proposal

## Site Map

```
gardensuite.in/
├── / (Home) ← sales funnel, routes to product pages
├── /products/attendance ← Face attendance + smart weighing deep-dive
├── /products/payroll ← Automated payroll deep-dive
├── /products/factory ← Factory production deep-dive
├── /products/stores ← Store management deep-dive
└── /products/mis ← Daily MIS report deep-dive
```

No pricing page, no offer page, no how-it-works page for now. The home page IS the funnel. Separate offer/landing pages only make sense later for paid ad campaigns.

---

## Home Page: Section by Section

Below is every proposed section in scroll order. Each has:
- **Funnel stage** it serves
- **What it says** (content direction, not final copy)
- **What it shows** (visuals)
- **Why it's here** (reasoning)

---

### 1. Hero (KEEP - no changes)

| | |
|---|---|
| **Funnel** | Hook |
| **Says** | "Run your tea garden. Not your paperwork." + subtitle about offline software |
| **Shows** | Parallax landscape + dashboard mockup rising from behind hills |
| **Why** | Strong first impression. Already working well. |

---

### 2. Problem Strip (NEW)

| | |
|---|---|
| **Funnel** | Problem - make the pain real |
| **Says** | Three short pain points the audience immediately recognizes |
| **Shows** | 3 columns, each with icon + title + one-liner |
| **Why** | The hero promises a solution but doesn't name the problem. This bridges the gap. Visitors need to feel "yes, that's exactly my situation" before they care about the solution. |

**Proposed pain points:**
1. Registers get lost - Paper muster rolls, weight chits, and stock registers vanish or arrive late.
2. Buddy punching costs lakhs - Proxy attendance and inflated weights go undetected.
3. Payroll takes days - Manual calculation of hazira, PF, ESI, bonus across hundreds of workers, every month.

> [!IMPORTANT]
> Should this section exist? Or does the hero already do enough? The risk of skipping it is that we jump straight from "catchy headline" to "here's our product" without earning emotional buy-in.

---

### 3. Product Grid (NEW - replaces HowItWorks + FeaturesCarousel)

| | |
|---|---|
| **Funnel** | Solution / Features |
| **Says** | "5 modules. One connected system." + each module's one-liner |
| **Shows** | 5 cards, each with a mini UI preview (CSS-recreated from app screenshots later), title, description, and "Learn more" link to product page |
| **Why** | After naming the problem, show the solution immediately while attention is high. Currently HowItWorks (5 vertical steps) and FeaturesCarousel (4 horizontal cards) cover the same features twice. Replacing both with a single grid eliminates repetition and routes visitors to product pages. |

**The 5 modules:**
1. Face Attendance & Smart Weighing → `/products/attendance`
2. Automated Payroll → `/products/payroll`
3. Factory Production → `/products/factory`
4. Store Management → `/products/stores`
5. Daily MIS Report → `/products/mis`

**Layout options:**
- A) First card full-width (hero card for attendance, the flagship feature), rest 2x2
- B) All 5 cards same size in a 3+2 grid
- C) 2+3 with the top 2 being larger

> [!IMPORTANT]
> Which layout feels right? The first option (A) emphasizes attendance/weighing as the hero product.

---

### 4. Proof Strip (KEEP - repositioned)

| | |
|---|---|
| **Funnel** | Social proof / credibility floor |
| **Says** | 20+ Tea Estates, 7 Regions, 25+ Years, Built by Sarbani Associates |
| **Shows** | Horizontal stat row |
| **Why** | Comes after products. Visitor has seen the problem and the solution - now they ask "can I trust these people?" Proof answers that question at exactly the right moment. |

---

### 5. Differentiator (SIMPLIFY existing "Why GardenSuite")

| | |
|---|---|
| **Funnel** | Why us / overcome objections |
| **Says** | Three key differentiators |
| **Shows** | 3 cards in a row (keep current layout) |
| **Why** | After showing what we do, explain why we're different from generic ERPs. Currently this section has a stats row (25+ years, 7 regions, 20+ estates) that duplicates the proof strip above - remove it. Keep only the 3-card grid. |

**The 3 differentiators (keep current copy):**
1. Tea garden workflow built in - hazira, plucking, payroll, stores, factory
2. Runs offline at the garden - attendance, weighing, payroll continue without internet
3. Setup and support on site - Sarbani Associates installs, trains, supports

---

### 6. FAQ (KEEP - no changes)

| | |
|---|---|
| **Funnel** | Objection handling / trust |
| **Says** | 5 common questions |
| **Why** | Addresses offline capability, setup time, regions, remote access, cost. All solid. |

---

### 7. CTA (KEEP - no changes)

| | |
|---|---|
| **Funnel** | Conversion |
| **Says** | "See it on your own numbers." + Book Free Demo / Email Us |
| **Why** | Clean, direct, working. |

---

## What Gets Removed from Home

| Section | Lines | Reason |
|---------|-------|--------|
| HowItWorks component | ~600 lines | Tells the same 5-step story that the product grid + individual product pages will tell better |
| FeaturesCarousel component | ~244 lines | Shows the same 4 features that the product grid will show |
| Stats row in Why section | ~55 lines | Duplicates the Proof Strip numbers |

The HowItWorks and FeaturesCarousel components stay in the codebase (not deleted) - their content can be repurposed into product pages.

---

## Product Pages

Each product page gets a deep-dive with:
- Hero + tagline
- Story sections (alternating text/visual, like attendance already has)
- CSS-recreated UI snippets from actual app screenshots
- Feature bullets
- CTA at bottom (already handled by shared CtaBand in layout)

| Page | Current State | Needs |
|------|--------------|-------|
| `/products/attendance` | ✅ Strong (401 lines, 4-story narrative) | Polish + add real UI screenshots |
| `/products/payroll` | ⚠️ Stub (83 lines, hero + dark section) | Full build |
| `/products/factory` | ⚠️ Stub (~2.7KB) | Full build |
| `/products/stores` | ⚠️ Stub (~2.7KB) | Full build |
| `/products/mis` | ⚠️ Stub (77 lines, hero + screenshot) | Full build |

> [!IMPORTANT]
> Building out each product page requires your app screenshots as reference. Should we restructure the home page first (can be done now), then build product pages one by one as you provide screenshots?

---

## SEO Keyword Strategy

| Page | Primary Keywords | Intent |
|------|-----------------|--------|
| `/` | "tea garden software", "tea estate management system", "tea garden ERP" | Awareness |
| `/products/attendance` | "tea garden attendance system", "face recognition attendance tea estate", "smart weighing tea garden" | Solution |
| `/products/payroll` | "tea garden payroll software", "tea estate wage calculation", "hazira calculation software" | Solution |
| `/products/factory` | "tea factory production software", "tea manufacturing cost software" | Solution |
| `/products/stores` | "tea garden store management", "tea estate inventory" | Solution |
| `/products/mis` | "tea garden MIS dashboard", "tea estate daily report software" | Solution |

Multi-page wins for SEO: each product page can rank independently.

---

## CSS UI Snippets Approach

When you provide screenshots from the actual app, we will:
1. Build a CSS-only Svelte component that recreates the UI faithfully
2. Store these in `$lib/components/ui-previews/` (e.g. `AttendancePreview.svelte`)
3. Use them on both the home page product grid (as thumbnail) and the product page (full-size)

This creates unique, non-stock visual content that improves both trust and SEO.

---

## Open Questions

1. **Problem strip** - Do you want it? Or jump from Hero straight to Proof Strip?
2. **Product grid layout** - (A) hero card + 2x2, (B) all same 3+2, or (C) 2+3 top larger?
3. **Execution order** - Home page restructure first, then product pages as screenshots arrive?
4. **Pricing** - Keep "Contact us for pricing" (current FAQ answer)? Or add pricing info somewhere?
5. **Navigation** - The nav "Features" link currently points to `/#features`. Should it change to point to the product grid, or should we rename it to "Products" and keep the dropdown?
