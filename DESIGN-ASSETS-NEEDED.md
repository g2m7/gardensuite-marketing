# GardenSuite Landing Page - Design Assets Needed

Every asset required to complete the `.pen` design file. Check off items as you provide them.

---

## 1. Product App Screenshots (CRITICAL - blocks Product Grid)

Needed for the 5 product module cards on the home page and individual product pages.

| # | Module | Screenshot Of | Used In |
|---|--------|---------------|---------|
| 1 | Face Attendance & Smart Weighing | Face scan screen + weighing scale input screen | Product Grid card + `/products/attendance` page |
| 2 | Automated Payroll | Payroll summary/dashboard + hazira calculation view | Product Grid card + `/products/payroll` page |
| 3 | Factory Accounts | Factory dashboard + manufacturing cost breakdown | Product Grid card + `/products/factory` page |
| 4 | Store Management | Inventory list + stock entry/dispatch view | Product Grid card + `/products/stores` page |
| 5 | Daily MIS Report | MIS dashboard + daily summary report | Product Grid card + `/products/mis` page |

**Format:** PNG or JPG, at least 1400px wide. Desktop view preferred. Can be:
- Actual app screenshots
- Screen recordings paused and captured
- Staged demos with realistic data

---

## 2. Hero Section Assets (NEEDED - blocks final polish)

| # | Asset | Description | Current Status |
|---|-------|-------------|----------------|
| 1 | Hero background image | Tea garden landscape photo (rolling hills, tea bushes, sky) | Currently using gradient placeholder. Need high-res photo, 1920x1080+ |
| 2 | Dashboard screenshot | Full MIS dashboard screenshot for the mockup in hero | Currently using CSS recreation. Replace with real screenshot |
| 3 | Foreground hills image | PNG with transparent sky, green hills at bottom (like `fg.png`) | Currently using ellipses. Need organic hill silhouette |
| 4 | Cloud/mist border image | Soft white/cloud PNG for transition between hero and content below | Currently using gradient. Need soft misty edge |
| 5 | Logo SVG | GardenSuite logo mark (the green icon, not just the text) | Currently using green square placeholder |

---

## 3. Social Proof Assets (blocks Proof Strip)

| # | Asset | Description |
|---|-------|-------------|
| 1 | Client logos (5-10) | Tea estate/company logos in SVG or PNG. White or dark versions. Displayed in a horizontal logo strip |
| 2 | Verified stats | Exact numbers for: tea estates served, regions covered, years in business, workers managed |
| 3 | Testimonials (3-5) | Client name, designation, estate name, photo (optional), 1-2 sentence quote about GardenSuite |

---

## 4. Product Page Content (blocks individual product pages)

### Per module, provide:

| Item | Description |
|------|-------------|
| Tagline | One-line description for the product grid card |
| 3-5 key features | Bullet points with short descriptions |
| Story/narrative | 2-3 paragraphs explaining the workflow (e.g. "Worker arrives, face is scanned, weight is recorded, payroll updates automatically") |
| Screenshots (2-4) | Different views/screens of this module in the actual app |
| Benefit stats | Any measurable improvement (e.g. "40% faster payroll", "zero proxy attendance") |

### Specific copy needed per module:

**Attendance & Weighing:**
- How does face recognition work at the garden? (outdoor? indoor? device?)
- What weighing hardware is used?
- What reports does it generate?

**Payroll:**
- Which components does it calculate? (hazira, PF, ESI, bonus, overtime?)
- How does it handle different worker types? (permanent, casual, seasonal?)
- Pay slip format?

**Factory Accounts:**
- What does it track? (green leaf, made tea, manufacturing cost?)
- How does it integrate with weighing data?
- What reports for management?

**Store Management:**
- What items are tracked? (rations, tools, chemicals?)
- Does it handle issue/return workflows?
- Stock alert features?

**Daily MIS:**
- What metrics appear on the dashboard?
- Can it be accessed from phone?
- Auto-generated reports? Email/WhatsApp?

---

## 5. Brand & Company Assets

| # | Asset | Description |
|---|-------|-------------|
| 1 | Founder photo | For About section or trust building. Professional headshot. |
| 2 | Company story | 2-3 paragraphs about Sarbani Associates - history, mission, tea garden expertise |
| 3 | Brand guidelines doc | If exists - color variations, logo usage rules, typography details |
| 4 | Contact details | Phone number, email, office address, Google Maps location |
| 5 | Team info | Names and roles of key team members (optional) |

---

## 6. UI Reference Screenshots (helpful, not blocking)

If you have any of these, share URLs or screenshots:

| # | Reference | What It Helps |
|---|-----------|---------------|
| 1 | Competitor landing pages you like | Overall style direction |
| 2 | SaaS product pages you admire | Card layouts, section transitions |
| 3 | Specific component examples | FAQ accordion style, stats strip, CTA band style |
| 4 | Color/typography preferences | If you want to deviate from the current brand tokens |
| 5 | Mobile app screenshots | For responsive/mobile variant of the design |

---

## Priority Order

Build what we can now vs. what needs your assets:

| Priority | Section | Status |
|----------|---------|--------|
| 1 | Hero + Nav | DONE in `.pen` - needs real images to replace placeholders |
| 2 | Problem Strip | Can build now with the 3 pain points from architecture doc |
| 3 | Proof Strip (stats row) | Can build layout now - needs exact numbers from you |
| 4 | Differentiator (3 cards) | Can build now - copy exists in current site |
| 5 | Product Grid (5 cards) | BLOCKED - needs app screenshots for UI previews |
| 6 | FAQ | Can build now - copy exists in current site |
| 7 | CTA Band | Can build now - copy exists in current site |
| 8 | Footer | Can build now - needs contact details |
| 9 | Product pages | BLOCKED - needs app screenshots + narrative copy |

---

## How to Share Assets

- **Screenshots:** Drop files in `gs_landing/static/screenshots/` or share via screenshot directly
- **Logos:** Drop SVGs/PNGs in `brand_pack/logos/` or share directly
- **Copy/text:** Type it in chat or drop a `.md`/`.txt` file
- **Reference URLs:** Paste links in chat, I'll fetch and analyze them
