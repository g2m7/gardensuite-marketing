# Attendance Content Distribution

**Status:** Implemented for the hub and three detail routes
**Hub:** `/products/attendance`
**Rule:** The hub explains the buying decision. Detailed product behavior moves to focused pages, guides, support material, and the demo.

**Implementation plan:** `attendance-build-plan.md`

## 1. What the main page shows

The main attendance page should answer only six questions:

1. What is the product?
2. How does the field-to-office flow work?
3. What does the field app look like?
4. What does the office system show?
5. Who installs and supports it?
6. How can the buyer see a demo?

Keep the page to these Tailark-led sections:

| Page section           | Existing pattern to use                                              | Content limit                                                           |
| ---------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Hero and product proof | `ProductHeroShowcase` + Tailark `features/five`                      | One headline, one short paragraph, two CTAs, two real product captures  |
| Proof strip            | `ProductTrustRow` + Tailark `stats/one`                              | 20+ estates, 7 regions, since 2000, on-site setup, and one privacy note |
| Three-step workflow    | `SolutionWorkflowSection` + Tailark `how-it-works/six`               | Verify worker, capture work, review in office                           |
| Field and office proof | `ProductCardFrame` + Tailark `carousel/four`                         | Two panels, one sentence each, real captures only                       |
| Capability routes      | Tailark `features/four`                                              | Four entry points, one sentence each                                    |
| Rollout and support    | `ProductRollout` + Tailark `contact`                                 | Homepage Day 1 to Day 3 rollout and local Sarbani Associates support    |
| FAQ and CTA            | `FaqSection`, `ProductCta`, Tailark `faqs/one`, `call-to-action/two` | Four objections, then demo CTA                                          |

## 2. What the main page does not show

Do not put these on the hub as full sections or long accordions:

- Every attendance mode and punch rule.
- Every harvest field, deduction and fine-leaf control.
- Detailed sync states, retry logic and diagnostics.
- Every office report, filter, map and export.
- Face enrollment, re-enrollment, backup and restore instructions.
- Role, API key, device limit and master-data administration.
- Technical schema, database or implementation detail.

The hub may name these capabilities briefly, but it should not explain them.

## 3. Published product pages

These routes are published with media requirement placeholders. Replace each placeholder only with an approved product capture using sanitized demo data.

### Face attendance for tea gardens

**Purpose:** Explain worker verification and attendance modes.
**Include:** face quality, liveness checks, normal hazira, punch attendance, overtime, repeated punches, GPS context, manual correction, enrollment and re-enrollment.
**Media:** real enrollment, match result and punch-history captures.

### Smart weighing for tea gardens

**Purpose:** Explain how worker identity and plucking weight stay linked.
**Include:** Bluetooth scale, weight freeze, manual fallback, task, bag or tare deductions, rainfall slabs, fine-leaf checks and active harvest records.
**Media:** real connected-scale result and harvest-session captures.

### Offline attendance and office sync

**Purpose:** Answer reliability and control questions.
**Include:** local save, pending or failed records, retry, sync status, employee summary, raw data, map, sessions, finalization and supported exports.
**Media:** real offline state, sync-status and office-review captures.

## 4. Guides and support content

Use non-sales content for setup and operational depth:

| Content                               | Best format                     | Feature material assigned here                                     |
| ------------------------------------- | ------------------------------- | ------------------------------------------------------------------ |
| Running punch attendance and overtime | Short guide                     | time-in, time-out, breaks, repeated punches, overtime              |
| Setting plucking tasks and deductions | Short guide                     | pro-rata task, bag or tare, rainfall slab, fine leaf               |
| Preparing devices for field use       | Support guide                   | device users, permissions, Bluetooth, GPS, camera checks           |
| Handling offline and failed records   | Support guide                   | local queue, status, retry, diagnostics                            |
| Face enrollment and backup            | Support guide                   | quality checks, re-enrollment, backup and restore                  |
| Attendance review for office staff    | Demo guide or one-pager         | summary, raw data, sessions, map, correction, finalization, export |
| Administration and controls           | Demo or implementation document | roles, masters, device limits, API keys and audit controls         |

## 5. Media rules

- Use only real GS Face and GardenSuite MIS captures with approved demo data.
- Keep placeholders until the matching real capture is ready.
- Do not draw product screens or create fictional product states.
- Use one media proof per idea. Do not make screenshot collages that are hard to read.
- Client, worker and estate information must be sanitized before publication.
- On-site photographs require written approval.

## 6. Release status

1. Attendance hub: built.
2. Smart weighing detail: built.
3. Face attendance detail: built.
4. Offline and office sync detail: built.
5. Guides from support and sales questions: future work after approved media is ready.

The comprehensive feature inventory remains the source of truth. It should feed these focused pieces instead of appearing on one page.
