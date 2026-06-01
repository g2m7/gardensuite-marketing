# GardenSuite MIS — Technical Deep Dive for Marketing

> **A comprehensive explanation of how GardenSuite MIS works and why every architectural decision was made.**

**Audience:** Sales engineers, solution architects, technical buyers, and implementation teams who need to explain the system's internals to prospects.

---

## Table of Contents

1. [Architecture Philosophy](#1-architecture-philosophy)
2. [The Three-Database System](#2-the-three-database-system)
3. [Streaming Dashboard](#3-streaming-dashboard)
4. [Mobile Field Data Capture](#4-mobile-field-data-capture)
5. [The Weight Pipeline](#5-the-weight-pipeline)
6. [Report Generation Engine](#6-report-generation-engine)
7. [Security & Access Control](#7-security--access-control)
8. [Export System](#8-export-system)
9. [Pre-Aggregation & Performance](#9-pre-aggregation--performance)
10. [Why These Decisions Matter](#10-why-these-decisions-matter)

---

## 1. Architecture Philosophy

### The Core Principle: Separation of Concerns

GardenSuite MIS is built on one non-negotiable principle: **data that moves at different speeds should live in different places.**

A tea estate generates three categories of data:

| Category             | Velocity    | Source                  | Example                                         |
| -------------------- | ----------- | ----------------------- | ----------------------------------------------- |
| **Business Data**    | Daily batch | Legacy ERP / Sync-agent | Wages, attendance history, employee master      |
| **Operational Data** | Real-time   | Mobile field devices    | Punch records, harvest weights, GPS coordinates |
| **Auth Data**        | On-demand   | User actions            | Logins, role assignments, API keys              |

**Why this matters:** If a field supervisor submits 50 harvest records while the payroll clerk runs a wages report, neither operation should interfere with the other. A single-database architecture creates lock contention and performance degradation under load. By isolating these three data categories into separate PostgreSQL databases, each can be optimized, scaled, and maintained independently.

### Technology Stack

| Layer         | Technology                                   | Rationale                                                                                                                                                                                       |
| ------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework** | SvelteKit 2 (Svelte 5 Runes)                 | Compile-time reactivity means the dashboard updates without virtual DOM overhead. For a data-heavy application, this translates to faster renders and lower memory usage compared to React/Vue. |
| **Database**  | PostgreSQL                                   | ACID compliance for financial data (wages, PF, bonuses), robust JSONB support for mobile metadata, and mature tooling for estates already running PostgreSQL.                                   |
| **ORM**       | Drizzle ORM (MIS/Reporting) + Raw SQL (Data) | Type-safe ORM for app-managed schemas; raw parameterized SQL for sync-agent schemas we don't control.                                                                                           |
| **Runtime**   | Bun                                          | 3x faster cold starts than Node.js, native TypeScript support, and built-in bundling reduces deployment complexity.                                                                             |
| **Charts**    | Layerchart + D3                              | Declarative Svelte-native chart components with explicit D3 scale control. No wrapper hell.                                                                                                     |
| **PDF**       | Puppeteer                                    | Headless Chrome generates pixel-perfect PDFs from the same HTML components users see on screen.                                                                                                 |
| **Excel**     | ExcelJS                                      | Streaming Excel generation for large reports without loading entire datasets into memory.                                                                                                       |

---

## 2. The Three-Database System

### DATA_DB — The Read-Only Business Archive

**Connection:** `DATABASE_URL`  
**Access Pattern:** Read-only via raw parameterized SQL  
**Schema Owner:** External sync-agent (typically syncing from Microsoft Access or a legacy ERP)

**Tables:** `empmaster`, `wagesgenerated`, `attendance`, `pluckingincentivecalc`, `loans`, `sections`, `mes`, `books`, `labourworkdetails`, `units`

**How it works:**

```
Sync-agent (Access DB) → PostgreSQL (DATA_DB) → GardenSuite MIS (read-only)
```

The sync-agent owns the schema. It can add columns, rename tables, or change data types. GardenSuite MIS reads this data through a thin abstraction layer (`dataDb.query<T>()`) that is **schema-agnostic**. If the sync-agent adds a new column, the reporting app doesn't break — it simply doesn't read that column until explicitly updated.

**Why raw SQL instead of an ORM?**

An ORM requires a schema definition. If the sync-agent changes a column name, the ORM schema breaks and the app crashes. Raw SQL with explicit column selection is resilient to upstream changes. The trade-off is less type safety, which we mitigate by maintaining TypeScript interfaces (`data-types.ts`) that are updated manually when schema changes are intentional.

**Key design decision:** The reporting app **never writes** to DATA_DB. This is a hard rule. All writes go through the sync-agent or through the reporting-specific databases. This prevents race conditions where the reporting app and the sync-agent overwrite each other's data.

### MIS_DB — Identity and Access Control

**Connection:** `MIS_DATABASE_URL`  
**Access Pattern:** Full CRUD via Drizzle ORM  
**Schema Owner:** GardenSuite MIS

**Tables:** `user`, `session`, `account`, `verification`, `role`, `permission`, `role_permission`, `user_role`

**How it works:**

This database is managed by `better-auth`, an authentication library built for SvelteKit. It handles:

- Email/password authentication with bcrypt hashing
- Session management with rotating tokens
- Role-based access control (RBAC) with granular permissions
- Password change enforcement (`mustChangePassword` flag)

**Why a separate database for auth?**

Auth tables are small, high-frequency, and security-critical. Isolating them allows:

- Separate backup policies (auth data backs up more frequently than report data)
- Separate replication (auth can be geo-replicated for low-latency logins)
- Security hardening (MIS_DB can have stricter network access rules)
- Independent scaling (10,000 login attempts don't affect report query performance)

**RBAC Architecture:**

```
User → UserRole → Role → RolePermission → Permission
```

A user has one or more roles. Each role has one or more permissions. Permissions are checked at the API route level and the UI component level. For example:

- `reports:read` — Can view reports
- `reports:export` — Can export to CSV/Excel/PDF
- `admin:users` — Can manage web users
- `admin:device_users` — Can manage mobile device login accounts

This granularity means an estate can give section supervisors read-only access to their own section's data without exposing payroll or other sections.

### REPORTING_DB — Operational Intelligence

**Connection:** `REPORTING_DATABASE_URL`  
**Access Pattern:** Full CRUD via Drizzle ORM  
**Schema Owner:** GardenSuite MIS

**Tables:** `attendance_raw`, `punch_records`, `harvest_records`, `sessions`, `work_codes`, `workers`, `face_templates`, `worker_daily_summary`, `session_summary`, `sections`, `device_users`, `site_settings`, `local_empmaster`, `local_mes`, `local_sections`, `import_audit_log`, `weather_logs`, `api_keys`

**How it works:**

This is where the "intelligence" lives. Raw mobile data is ingested here, pre-aggregated via database triggers, and served to dashboards and reports.

**Key tables:**

| Table                  | Purpose                                                         |
| ---------------------- | --------------------------------------------------------------- |
| `harvest_records`      | Individual weighment events from mobile devices                 |
| `punch_records`        | Clock in/out events with multi-punch support                    |
| `sessions`             | Session metadata (GPS, tare weight, section, vehicle)           |
| `worker_daily_summary` | Pre-aggregated daily totals per worker (updated by trigger)     |
| `session_summary`      | Pre-aggregated session totals (updated by trigger)              |
| `face_templates`       | Face embedding arrays (JSONB) for biometric recognition         |
| `site_settings`        | Key-value configuration store (weight mode, max sessions, etc.) |

**Why pre-aggregation?**

A report querying 1,000 workers × 30 days × 8 sessions = 240,000 rows. With pre-aggregation, the same report reads from `worker_daily_summary` — 1,000 rows. That's a **240x reduction** in query complexity.

---

## 3. Streaming Dashboard

### The Problem

Traditional dashboards execute all queries, wait for all results, then render the entire page. For a tea estate dashboard, this means:

1. Attendance count (fast — indexed query)
2. Green leaf kg (medium — aggregate query)
3. Yield per hectare (slow — join + aggregate + division)
4. Cost analysis (slow — multi-table join)
5. Section-wise status (medium — group by query)

If query #4 takes 3 seconds, the user sees a blank page for 3 seconds even though query #1 was ready in 50ms.

### The Solution: Streaming SSR

GardenSuite MIS uses SvelteKit's streaming server-side rendering (SSR). The page renders in three phases:

**Phase 1: Critical KPIs (Above the Fold)**

- Attendance count, green leaf kg, active sections
- Rendered in the initial HTML response
- Available to the user within 200ms

**Phase 2: Analytics (Below the Fold)**

- Yield per hectare, productivity metrics, mandays analysis
- Streamed via `ReadableStream` after initial render
- Fills in as data arrives without blocking Phase 1

**Phase 3: Operational Status**

- Section-wise work status, rounds tracking
- Streamed last
- Often arrives within 1 second of initial render

**Why this matters for estates:**

Estate managers check the dashboard multiple times per day. If the dashboard takes 3 seconds to load, that's 3 seconds × 20 checks = 1 minute of waiting per day. For 50 managers across an estate group, that's nearly an hour of lost productivity daily. Streaming cuts perceived load time by 80%.

---

## 4. Mobile Field Data Capture

### The API Contract

Mobile devices communicate with GardenSuite MIS via a REST API authenticated with API keys (`x-api-key` header). The API is designed for **idempotent operations** — the same request can be sent multiple times without creating duplicates.

**Sync flow:**

```
Mobile App                        Cloud Backend
──────────                        ─────────────
GET /api/health           →       Verify API key, return status
GET /api/attendance/workers →     Return worker master for face enrollment
GET /api/attendance/sections →    Return section list
GET /api/attendance/work-codes →  Return work type definitions

POST /api/attendance/sessions →   Create session (GPS, tare, section)
POST /api/attendance/harvest-records → Upsert weighment records
POST /api/attendance/punch-records →   Upsert clock in/out records
```

**Why idempotent upserts?**

Tea gardens have unreliable connectivity. A mobile device might:

- Submit a record, lose connectivity before receiving the response, and retry
- Queue 50 records offline, then sync them all at once
- Have multiple supervisors submitting data for the same worker

Upsert operations (insert if not exists, update if exists) guarantee that retries don't create duplicates. The unique constraint is typically `(date, worker_id, time)` for attendance or `punch_id` for punch records.

### Face Recognition Architecture

**Enrollment flow:**

```
Supervisor opens mobile app → Selects worker → Captures face photo
→ Mobile extracts face embedding (128-dimensional vector)
→ POST /api/attendance/face-templates { workerId, template: [...] }
→ Stored in reporting_db.face_templates as JSONB array
```

**Recognition flow:**

```
Worker stands in front of tablet → Mobile captures face → Extracts embedding
→ POST /api/attendance/face-lookup { template: [...], threshold: 0.6 }
→ Backend computes cosine similarity against all stored templates
→ Returns best match workerId + confidence score
```

**Why cosine similarity?**

Face embeddings are high-dimensional vectors. Cosine similarity measures the angle between two vectors, which is robust to lighting and pose variations. A threshold of 0.6 means the vectors are 60% aligned — high enough to prevent false positives, low enough to handle real-world field conditions.

**Why JSONB for face templates?**

PostgreSQL's JSONB type stores arrays efficiently and supports GIN indexing for fast containment queries. Each face template is a 128-float array (~512 bytes). For 1,000 workers, that's ~500KB — trivial for PostgreSQL but fast to query.

### Multi-Device Session Handling

A tea estate might have 5 mobile tablets in the field. All 5 devices can submit data for the same session:

- Device A: Punch records for workers 1-20
- Device B: Harvest records for workers 21-40
- Device C: Session metadata and GPS

The backend reconciles these by `session_id`. Session summary tables aggregate data from all devices automatically via triggers.

**Conflict resolution:**

| Scenario                     | Resolution                                       |
| ---------------------------- | ------------------------------------------------ |
| Same recordId from 2 devices | First wins (unique constraint)                   |
| Punch split across devices   | Stored as-is; reports combine by punchNumber     |
| Out-of-order sync            | Timestamps (not arrival time) determine ordering |

---

## 5. The Weight Pipeline

This is the system's most differentiated feature. Here's how a kilogram of tea leaves travels from the field scale to the executive dashboard.

### Step 1: Physical Scale → Mobile Device

A plucker places their leaf bag on a digital scale in the field. The scale displays the weight (e.g., 15.2 kg). A supervisor reads this value and enters it into the mobile app.

**Note:** Some estates use Bluetooth-enabled scales that transmit weight directly to the mobile device. The mobile app handles the Bluetooth pairing; the backend receives the weight value via API regardless of how it was captured.

### Step 2: Mobile → Cloud API

```json
POST /api/attendance/harvest-records
{
  "deviceId": "tablet-001",
  "records": [
    {
      "recordId": "uuid-123",
      "sessionId": "session-456",
      "workerId": "W-789",
      "weightKg": 15.2,
      "timestamp": "2026-05-28T08:30:00Z"
    }
  ]
}
```

### Step 3: Pre-Aggregation on INSERT

When the record hits PostgreSQL, a trigger fires:

```sql
CREATE TRIGGER update_worker_summary
AFTER INSERT ON harvest_records
FOR EACH ROW EXECUTE FUNCTION update_worker_daily_summary();
```

This function updates `worker_daily_summary`:

- `total_weight_kg += 15.2`
- `net_weight_kg = total_weight_kg - tare_kg`
- `session_count += 1`
- `last_updated = now()`

**Why triggers instead of application code?**

1. **Atomicity:** The update happens in the same transaction as the INSERT. If the INSERT succeeds, the summary is guaranteed to be updated.
2. **Performance:** No additional network round-trip from app server to database.
3. **Correctness:** Even if someone manually inserts a row via SQL, the summary stays consistent.

### Step 4: Weight Mode Application

Before the weight appears in any report, it passes through the weight mode system:

```typescript
// Server-side
const mode = await getWeightDisplayMode(); // 'raw' | 'rounded' | 'integer'
const displayWeight = applyWeightMode(15.2, mode);
// mode='raw' → 15.2
// mode='rounded' → 15
// mode='integer' → 15
```

**Critical design decision: Data-level vs. display-level rounding**

Most systems apply rounding at the display layer:

```
Row 1: 12.75 → display "13"
Row 2: 13.25 → display "13"
Total: 26.00 → display "26"
```

But 13 + 13 = 26, which is correct. However:

```
Row 1: 12.4 → display "12"
Row 2: 12.4 → display "12"
Total: 24.8 → display "25"
```

12 + 12 = 24, but the total shows 25. This inconsistency destroys trust in reports.

GardenSuite MIS applies rounding **before aggregation**:

```
Row 1: 12.4 → round to 12
Row 2: 12.4 → round to 12
Total: 12 + 12 = 24 → display "24"
```

The numbers are consistent. The trade-off is a small loss of precision in totals, but users prefer consistency over precision.

### Step 5: Deduction Application

If the site setting configures percentage deduction:

```
Gross weight: 15.2 kg
Deduction: 5%
Net weight: 15.2 × 0.95 = 14.44 kg
```

If fixed kg deduction:

```
Gross weight: 15.2 kg
Deduction: 0.5 kg
Net weight: 14.7 kg
```

The deduction mode is also stored in `site_settings` and applied at the data level.

### Step 6: Report Rendering

The final weight flows into:

- **Kamjari Report:** Individual worker totals per day
- **Plucking Performance:** Above/below/equal threshold analysis
- **Dashboard KPIs:** Green leaf kg, productivity, yield per hectare
- **Export:** CSV, Excel, or PDF with formatted numbers

**Why this pipeline matters:**

A generic system captures "15.2" and stores "15.2". GardenSuite MIS captures "15.2", understands that it came from a scale in session "S-001" at GPS coordinates (26.5, 88.2), subtracts tare, applies deduction, rounds per estate policy, and pre-aggregates it into daily summaries — all before a user opens a report.

---

## 6. Report Generation Engine

### Report Structure

Each report follows a consistent architecture:

```
FilterBar → API Request → Service Layer → Data Query → Response → Table + Dashboard + Export
```

**FilterBar:** Universal filtering component supporting date ranges, period selectors (Day / MTD / YTD), search, and drilldown filters.

**Service Layer:** Business logic separated from API routes. For example, `kamjari.ts` contains all Kamjari report logic — query construction, weight mode application, KPI computation, and formatting. This separation means:

- The same logic serves the web UI and the export system
- Unit tests target the service layer, not the API layer
- Changes to report logic don't require API route changes

**Data Query:**

For DATA_DB tables, queries are raw SQL with parameterized values:

```typescript
const rows = await dataDb.query<KamjariRow>(
	`
  SELECT 
    e.empcode, e.empname, e.bookid,
    a.totalkgs, a.todaywages, a.hours,
    s.sectioncode
  FROM attendance a
  JOIN empmaster e ON a.ecode = e.empcode
  LEFT JOIN sections s ON e.sectionid = s.id
  WHERE a.transdate = $1
    AND a._deleted_at IS NULL
`,
	[date]
);
```

For REPORTING_DB tables, queries use Drizzle ORM for type safety:

```typescript
const records = await reportingDb
	.select()
	.from(harvestRecords)
	.where(eq(harvestRecords.sessionId, sessionId));
```

### Dashboard Compositions

Reports include a dashboard section above the data table with KPI cards and charts. These are composed from reusable Svelte components:

- `KamjariDashboard` — Green leaf kg, productivity, yield efficiency
- `RoundsOverviewDashboard` — Section-wise round counts, job type distribution
- `WagesSummaryDashboard` — Total wages, deductions, net pay distribution
- `RainfallDashboard` — Monthly rainfall bars, cumulative trends

**Why charts use D3 scales explicitly:**

Chart libraries often auto-calculate scales, which leads to inconsistent Y-axis ranges across reports. By using `d3-scale` directly, each chart defines its domain and range explicitly. A rainfall chart always starts at 0. A productivity chart might auto-domain to highlight variance. This control ensures charts are honest and readable.

### Export System

Reports support three export formats:

**CSV:** Streaming text generation. Fastest, smallest file size, universally compatible.

**Excel:** ExcelJS streaming workbook. Supports formatting (bold headers, number formats, column widths), multiple sheets, and formulas. A 10,000-row report generates in under 2 seconds.

**PDF:** Puppeteer renders an HTML version of the report and prints to PDF. Uses the same CSS as the web UI, so the PDF looks identical to the screen. Supports page headers, footers, and automatic page breaks.

**Export modal:** Users select fields, format, and filename before downloading. Field selection means a payroll clerk can export only employee code, name, and net pay — while a manager exports all fields.

---

## 7. Security & Access Control

### Authentication

- **Web users:** Email/password via better-auth. Sessions expire after configurable timeout.
- **Device users:** Separate table (`device_users`) with usernames and hashed passwords. Used by mobile apps for supervisor login.
- **API keys:** Random 32-byte strings stored hashed in `api_keys` table. Used by mobile apps for machine-to-machine authentication.

### Authorization

Every API route checks permissions before executing:

```typescript
// Example: Kamjari report API
export const GET: RequestHandler = async ({ locals, url }) => {
	const user = locals.user;
	if (!hasPermission(user, 'reports:attendance:read')) {
		return json({ error: 'Forbidden' }, { status: 403 });
	}
	// ... report logic
};
```

UI components also check permissions:

```svelte
{#if hasPermission(user, 'reports:export')}
	<ExportButton />
{/if}
```

This defense-in-depth means even if a user crafts an API request manually, they can't access data without the correct permission.

### Data Isolation

- **Schema isolation:** Mobile data lives in `reporting` schema. Business data lives in default schema. No cross-schema writes.
- **Row-level isolation:** Section supervisors see only their sections via `WHERE sectionid IN (...)` filters derived from their role assignments.
- **Audit trails:** Import operations log to `import_audit_log` with user ID, timestamp, and row counts.

---

## 8. Export System

### CSV Export

```typescript
// Streaming — memory usage is constant regardless of row count
const csvStream = new ReadableStream({
	start(controller) {
		controller.enqueue('Date,Employee,Weight,Section\n');
		for (const row of rows) {
			controller.enqueue(`${row.date},${row.empname},${row.weight},${row.section}\n`);
		}
		controller.close();
	}
});
```

**Why streaming?** A 50,000-row export at 100 bytes/row = 5MB. Loading this into memory before sending would crash under concurrent exports. Streaming keeps memory usage under 1MB per export.

### Excel Export

ExcelJS creates a workbook with:

- Formatted headers (bold, background color)
- Number formats (`0.00` for weights, `#,##0` for counts)
- Auto-filter on header row
- Freeze panes (header stays visible while scrolling)
- Column widths auto-fitted to content

### PDF Export

Puppeteer launches a headless Chrome instance, renders the report HTML with Tailwind CSS, and prints to PDF. The process:

1. Generate HTML string with report data inlined
2. Launch Puppeteer with `--no-sandbox` (Docker-compatible)
3. Set page size to A4, margins to 1cm
4. Print to PDF buffer
5. Return as `application/pdf` response

**Why Puppeteer instead of a PDF library?**

PDF libraries (like jsPDF) require manual layout calculations. Puppeteer uses the same HTML/CSS that the web app uses, so the PDF automatically matches the screen layout. If the web report looks good, the PDF looks good.

---

## 9. Pre-Aggregation & Performance

### The Performance Problem

A mid-sized estate has:

- 1,000 workers
- 2 plucking sessions per day
- 30 days in a month

That's 1,000 × 2 × 30 = 60,000 harvest records per month.

A report querying "total kg per worker per day for the last month" would scan 60,000 rows, group by worker and date, and sum weights. With joins to `empmaster` and `sections`, this query might take 2-3 seconds.

### The Solution: Trigger-Based Pre-Aggregation

When a harvest record is inserted, a PostgreSQL trigger updates summary tables in the same transaction:

```sql
-- worker_daily_summary
INSERT INTO worker_daily_summary (worker_id, date, total_weight_kg, session_count)
VALUES ('W-123', '2026-05-28', 15.2, 1)
ON CONFLICT (worker_id, date)
DO UPDATE SET
  total_weight_kg = worker_daily_summary.total_weight_kg + EXCLUDED.total_weight_kg,
  session_count = worker_daily_summary.session_count + 1;
```

The report then queries:

```sql
SELECT * FROM worker_daily_summary
WHERE date BETWEEN $1 AND $2;
```

**Result:** 1,000 rows instead of 60,000. Query time drops from 2-3 seconds to under 50ms.

### Trade-offs

**Advantages:**

- Read queries are extremely fast
- Summary data is always consistent with raw data
- No batch jobs or cron jobs required

**Disadvantages:**

- Write queries are slightly slower (trigger execution time)
- Storage usage increases (raw + summary tables)
- Complex aggregation logic lives in SQL, not application code

**Why triggers over batch jobs?**

Batch jobs (e.g., "recompute summaries every hour") create windows of inconsistency. A supervisor might submit data at 2:05 PM, but the summary won't reflect it until 3:00 PM. Triggers guarantee immediate consistency.

---

## 10. Why These Decisions Matter

### For the Estate Manager

**Decision:** Three-database architecture  
**Benefit:** The reporting system never goes down because the sync-agent is offline. Field data keeps flowing even if the legacy ERP is under maintenance.

### For the Field Supervisor

**Decision:** Offline-first mobile API with idempotent sync  
**Benefit:** Supervisors can collect attendance and weights all day in areas with no cellular coverage. When they return to the office, data syncs automatically without duplicates.

### For the Payroll Clerk

**Decision:** Data-level weight rounding  
**Benefit:** The kamjari report shows whole numbers that add up correctly. No more "this column doesn't sum to the total" complaints from workers.

### For the IT Administrator

**Decision:** Schema-agnostic raw SQL for DATA_DB  
**Benefit:** Upgrading the sync-agent doesn't require a reporting app deployment. Schema changes are absorbed, not breaking changes.

### For the Auditor

**Decision:** Raw mode + audit logs  
**Benefit:** Auditors can switch to raw decimal mode to verify that 12.75 kg was recorded accurately. The import audit log shows who imported what data and when.

### For the Executive

**Decision:** Streaming dashboard + pre-aggregation  
**Benefit:** The CEO checks the dashboard on their phone and sees attendance and production numbers instantly. No loading spinners. No "refresh and wait."

---

## Summary

GardenSuite MIS is not a generic reporting tool adapted for tea estates. It is a system **architected from first principles** for the unique challenges of plantation operations:

1. **Data isolation** prevents upstream changes from breaking downstream reports
2. **Offline-first mobile APIs** handle real-world connectivity constraints
3. **Trigger-based pre-aggregation** delivers sub-50ms report performance
4. **Data-level weight formatting** ensures mathematical consistency in financial records
5. **Streaming dashboards** provide instant visibility into operations
6. **Face recognition** eliminates expensive hardware while preventing fraud
7. **Granular RBAC** ensures the right people see the right data

Every technical decision traces back to one question: **"What does a tea estate actually need?"** The answer is GardenSuite MIS.

---

_Proprietary — All rights reserved._
