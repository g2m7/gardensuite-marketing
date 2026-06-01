# GardenSuite MIS — Unique Selling Proposition

> **The only plantation reporting system built from the ground up for tea estate operations.**

---

## Product Positioning

GardenSuite MIS is a **specialized Plantation ERP Reporting Hub** that transforms raw field data into executive-grade operational intelligence. Unlike generic ERP add-ons or spreadsheet-based workflows, GardenSuite MIS is architected specifically for tea estate operations — from field plucking to statutory compliance.

**Target Market:**

- Tea estates and plantations managing 500+ workers
- Operations requiring real-time attendance, production, and wage visibility
- Estates transitioning from legacy Access-based systems to modern web infrastructure

---

## Core Differentiators

### 1. Three-Database Architecture (Zero Schema Conflict)

**What it is:** The system isolates sync-agent business data, authentication/RBAC, and mobile field data into three separate PostgreSQL databases.

**Why it matters:**

- Sync-agent schema changes never break the reporting app
- Field mobile data never corrupts legacy ERP records
- Each layer can scale, backup, and migrate independently
- Estates can deploy mobile attendance without touching their existing ERP

**Competitor gap:** Generic ERPs force all data into a single schema. One schema change breaks everything.

---

### 2. Real-Time Field-to-System Weight Pipeline

**What it is:** Mobile devices in the field capture harvest weights directly from weighing scales, transmit them via API, and the system applies configurable weight formatting before any report aggregation.

**Why it matters:**

- Eliminates manual data entry between field and office
- Weight values flow from scale → mobile → cloud → report in seconds
- Configurable display modes (raw decimal, rounded, integer) ensure office staff and field supervisors see numbers in the format they expect
- Deduction logic (percentage vs. fixed kg) adapts to each estate's policy

**Key capabilities:**

- Gross weight, net weight, and deduction tracking per harvest record
- Tare weight configured per session (container weight auto-subtracted)
- Rainfall-based deduction slabs (no rain / low / medium / high)
- Fine leaf count enforcement at configurable intervals

**Competitor gap:** Competitors require manual transcription or generic forms. GardenSuite MIS understands that 12.75 kg vs. 13 kg matters for worker incentives.

---

### 3. 31+ Specialized Reports (Not Generic Dashboards)

**What it is:** Purpose-built reports across 7 operational domains, each with domain-specific filters, KPIs, and export formats.

**Domains:**
| Domain | Report Examples |
|--------|-----------------|
| **Attendance & Labour** | Kamjari Daily, Hazree Check, Mandays Period, Long Absentee, Discrepancy & Audit |
| **Plucking Operations** | Per-Plucker Performance, Below/Above/Equal Threshold, Session-wise Plucking, Cash Plucking, Weather Correlation |
| **Salaried Staff** | Monthly Summary, Staff Attendance |
| **Wages & Payroll** | Wages Summary, Bonus, Annual Leave, Salary Payment, PF, Ration & Tea, RTGS |
| **Statutory** | Bonus Bookwise Summary |
| **Garden** | Sections Summary, Rounds (Plucking / Irrigation / Spraying / All Jobs), Rainfall, Irrigation |
| **Master Data** | Employee Master |

**Why it matters:**

- Estate managers don't build reports — they read them
- Each report understands tea estate semantics ("kamjari", "hazree", "mandays")
- One-click export to CSV, Excel, or PDF
- Drill-down from summary KPIs to individual worker records

**Competitor gap:** Generic BI tools require weeks of report configuration. GardenSuite MIS ships with estate-specific reports on day one.

---

### 4. Streaming Dashboard Architecture

**What it is:** The dashboard renders above-the-fold KPIs instantly while below-the-fold sections stream in asynchronously.

**Why it matters:**

- Managers see critical numbers (green leaf kg, attendance count) within 200ms
- Heavy aggregations (yield per hectare, cost analysis) load without blocking
- Perceived performance feels instant even on large estates

**Competitor gap:** Most dashboards wait for all queries to complete before rendering anything.

---

### 5. Offline-First Mobile Attendance with Face Recognition

**What it is:** A production-ready REST API for mobile field devices that supports:

- Punch in/out for hourly workers
- Harvest weight capture with GPS coordinates
- Face enrollment and biometric recognition (face template storage)
- Offline queue with idempotent sync
- Multi-device session support

**Why it matters:**

- Tea gardens have poor connectivity. Mobile apps queue data locally and sync when available.
- Face recognition prevents buddy punching without expensive hardware
- GPS coordinates validate that workers are actually in the field
- API key authentication is simple to implement on Android/iOS field tablets

**Competitor gap:** Competitors sell expensive biometric terminals. GardenSuite MIS turns any Android tablet into an attendance terminal.

---

### 6. Weight Display Mode System

**What it is:** A site-level configuration that controls how harvest weights are rounded and displayed across all reports and calculations.

**Modes:**

- **Raw (12.75 kg)** — Full precision for auditing and data verification
- **Rounded (13 kg)** — Standard rounding for official kamjari records
- **Integer (12 kg)** — Floor rounding for conservative dashboards

**Why it matters:**

- Different stakeholders need different precision: auditors want decimals, workers want whole numbers, management wants quick reads
- Rounding is applied at the **data level before aggregation**, ensuring rows and totals are always visually consistent
- Changing the mode retroactively updates all reports without re-importing data

**Competitor gap:** Generic systems apply display formatting only. GardenSuite MIS applies rounding before computing productivity, yield, and incentive metrics.

---

### 7. Configurable Deduction Engine

**What it is:** Site-level control over how leaf weight deductions are calculated.

**Modes:**

- **Percentage of gross weight** — Deduct 5% from 15.2 kg = 14.44 kg net
- **Fixed kg** — Deduct 0.5 kg from 15.2 kg = 14.7 kg net

**Additional controls:**

- Rainfall-based deduction slabs (no rain / low / medium / high)
- Fine leaf count enforcement every N weighments
- Configurable tare weight per session

**Why it matters:**

- Different estates use different deduction policies
- Hard-coded deduction logic forces estates to adapt their process to the software
- GardenSuite MIS adapts to the estate

---

### 8. Role-Based Access Control (RBAC)

**What it is:** Granular permission system with users, roles, and permissions.

**Why it matters:**

- Estate managers see all reports
- Section supervisors see only their sections
- Payroll staff see wages but not garden operations
- Mobile device users are managed separately from web users

**Competitor gap:** Many plantation systems have all-or-nothing access. GardenSuite MIS enforces least-privilege by default.

---

### 9. Local Master Data Mode (No ERP Required)

**What it is:** Estates without a live ERP connection can import employee master, work codes (MES), and sections via Excel/CSV.

**Why it matters:**

- Smaller estates or pilot deployments can start immediately
- No dependency on upstream ERP availability
- Import audit log tracks who imported what and when

---

### 10. Automated Tutorial Video Production

**What it is:** Built-in infrastructure for generating feature tutorial videos using Remotion, Playwright, and AI text-to-speech.

**Why it matters:**

- Training new users at scale without live demonstrations
- Consistent, professional onboarding videos
- Multi-language support (English, Hindi, regional languages)

---

## The Scale Pairing Advantage

While competitors treat weight capture as an afterthought, GardenSuite MIS treats it as a first-class workflow:

| Step          | Competitor Approach                         | GardenSuite MIS Approach                            |
| ------------- | ------------------------------------------- | --------------------------------------------------- |
| **Capture**   | Manual transcription on paper               | Mobile device reads scale directly                  |
| **Transmit**  | End-of-day data entry clerk                 | Real-time API sync from field                       |
| **Validate**  | None                                        | GPS coordinates, session metadata, face recognition |
| **Display**   | One-size-fits-all formatting                | Configurable raw / rounded / integer per estate     |
| **Calculate** | Display-only rounding (inconsistent totals) | Data-level rounding (consistent totals)             |
| **Deduct**    | Hard-coded rules                            | Configurable percentage, fixed kg, rainfall slabs   |

**Result:** Field weights become trustworthy, auditable, and immediately actionable.

---

## Who Should Buy

✅ **Large tea estates** (500+ workers) needing centralized operational visibility  
✅ **Estate groups** managing multiple gardens requiring consolidated reporting  
✅ **Operations transitioning from legacy Access/Excel systems** to modern web infrastructure  
✅ **Estates with field mobility needs** (plucking weighment, attendance tracking)  
✅ **Compliance-focused estates** requiring statutory reports (PF, Bonus, Leave)

---

## Why Now

- **Labor costs are rising.** Real-time productivity visibility (kg per plucker per day) is no longer optional.
- **Regulatory scrutiny is increasing.** Statutory reports must be accurate and instantly available.
- **Workforce digitization is accelerating.** Estates that don't capture field data digitally are flying blind.
- **Legacy systems are failing.** Access databases and Excel sheets don't scale to 1000+ workers.

**GardenSuite MIS is the only system designed specifically for this transition.**

---

_Proprietary — All rights reserved._
