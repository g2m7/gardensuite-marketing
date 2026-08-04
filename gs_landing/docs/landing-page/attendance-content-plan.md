# Attendance Product Content Plan

**Status:** Planning document
**Date:** 2026-08-03
**Primary page:** `/products/attendance`
**Primary conversion:** Book Free Demo
**Secondary conversion:** Email Us

## 1. Direction

The attendance offer should be presented as one connected field-to-office system, not as a long list of app features.

The core story is:

1. Verify the worker.
2. Capture attendance or leaf weight in the field.
3. Keep working without reliable internet.
4. Review and control the records in the office.
5. Prepare trusted data for payroll and estate reports.

The main page should sell this operating loop. Detailed controls should support the story later on the page or during the demo.

## 2. Product Understanding

The complete offering combines two products.

### GS Face - field capture

- On-device face recognition.
- Liveness and face-quality checks.
- Normal attendance, punch attendance, overtime, and repeated time-in or time-out records.
- Harvest weight from a Bluetooth scale.
- Manual weight and manual attendance fallback.
- Section, work code, task, deduction, fine-leaf, GPS, weather, session, and device context.
- Local-first record saving.
- Pending, synced, and failed record states.
- Face enrollment, re-enrollment, backup, and restore.
- Reports, CSV export, sharing, and sync diagnostics.

### GardenSuite MIS - office control

- Worker, section, work-code, device-user, task, and configuration sync.
- Employee Summary, Raw Data, Map, and Sessions views.
- Attendance and harvest KPIs.
- Record detail, source, and status.
- Manual attendance correction.
- Sync status and recent activity.
- Face-template monitoring.
- Attendance finalization.
- Excel, CSV, PDF, and ERP-import export paths where supported.
- Master-data, roles, API keys, device limits, and audit controls.
- Daily plucking task assignment and mobile configuration.

### The category claim

Use:

`Tea garden attendance system with face verification and smart weighing.`

Do not reduce the product to generic biometric attendance. Its difference is the link between worker identity, field work, harvest weight, offline capture, and office review.

## 3. Buyer and Message Priority

### Primary buyer

Estate owner, director, or garden manager evaluating whether the system can produce more trusted field records without disturbing daily work.

### Supporting users

- Field supervisor who captures records.
- Office or payroll staff who review and use the records.
- Administrator or implementation staff who manage devices, access, masters, and sync.

### Jobs the page must answer

| Buyer question                                       | Page answer                                                                                                                                            |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Will it help with proxy attendance?                  | Face verification and liveness checks help confirm the worker before attendance is saved.                                                              |
| Can it link plucking weight to the correct worker?   | The Bluetooth scale reading and recognized worker are saved in the same harvest record.                                                                |
| Will it work in weak network areas?                  | Records are saved locally and synchronized when connectivity returns.                                                                                  |
| What happens when the camera or scale has a problem? | Retry, re-enrollment, manual weight, and manual attendance fallbacks keep work moving.                                                                 |
| Can the office see what came from the field?         | The web system shows summaries, raw records, sessions, locations, status, and sync activity.                                                           |
| Can the records be used for payroll?                 | Reviewed attendance and harvest data can move into the GardenSuite office and downstream estate workflow. Exact integration is confirmed during setup. |
| Who will install and train us?                       | Sarbani Associates handles on-site setup, staff training, and rollout support.                                                                         |

## 4. Messaging Hierarchy

### Level 1 - what every visitor should understand

- It is built for tea gardens.
- It checks worker identity by face.
- It records attendance and leaf weight.
- It works offline at the garden.
- It sends records to the office when internet is available.
- Sarbani Associates installs and supports it.

### Level 2 - why the workflow is useful

- Worker, work code, section, session, and weight stay linked.
- Supervisors can capture normal attendance, punch work, and harvest.
- Scale and manual fallbacks reduce field stoppage.
- Office staff can review records, exceptions, status, and totals.
- Records can be finalized and exported for the estate workflow.

### Level 3 - proof of fit for serious evaluation

- Bag or tare deductions.
- Rainfall-based deduction slabs.
- Pro-rata plucking tasks.
- Fine-leaf quality checks.
- Multiple punches and overtime.
- Start and end GPS coordinates.
- Weather logs.
- Face-template backup and restore.
- Master-data source modes.
- Role, API-key, and device controls.

Level 3 belongs in a grouped capability section, FAQ, brochure, or demo. It should not compete with the main sales story.

## 5. Recommended Page Structure

Keep the existing GardenSuite product-page system: large typography, plain uppercase labels, white and warm off-white sections, deep green accents, thin borders, restrained neutral shadows, real product screenshots, direct CTAs, and generous space.

Do not introduce a new component language. Reuse the existing hero, trust row, problem strip, workflow, rollout, FAQ, CTA, and lead-capture patterns where they are still useful.

### Section 1 - Hero

**Job:** Explain the category, core outcome, and offline fit in five seconds.

**Recommended headline:**

`Verify the worker. Link the leaf weight. Keep the record.`

**Recommended support copy:**

`Face attendance checks the worker. The Bluetooth scale records leaf weight against the same worker and work session. The app works offline and syncs when internet returns.`

**Primary CTA:** `Book Free Demo`

**Secondary CTA:** `See How It Works`

**Trust line:**

`Built and supported by Sarbani Associates for tea garden field work.`

**Media:** Use one real product proof moment. Do not combine multiple invented mockups.

- Preferred existing proof: a sanitized real GS Face result screen paired with a real office attendance or sync screen.
- `[MEDIA PLACEHOLDER A: Sanitized field-to-office hero composition using real GS Face and GardenSuite MIS screenshots. No invented interface elements.]`
- If the current video remains, create a web-ready derivative below 200 KB only if this can be done without making it unclear. Otherwise use a static picture element.

### Section 2 - Trust row

**Job:** Reduce category and rollout doubt immediately after the hero.

Show only defensible proof:

- `20+` - Tea estates.
- `7` - Tea-growing regions.
- `Since 2000` - Tea garden software.
- `On-site` - Setup and training.

Add the confidentiality line near this section or later near the CTA:

`Many estates keep software details private. We respect confidentiality and share region-level experience.`

Do not use `100% offline` or a similar absolute badge.

### Section 3 - The old field problem

**Job:** Name the buyer’s known problems without blaming workers or staff.

Use three problems:

1. `Proxy attendance` - Identity is difficult to confirm from a paper register.
2. `Separate weight records` - A handwritten weight can be delayed or linked to the wrong worker.
3. `Weak field connectivity` - An internet-dependent app can stop work in remote sections.

The current `Payroll doubts` point is valid, but it is a result of the first two problems. Use it in the section close instead of making it a fourth card.

**Media:** No media required. Keep this section factual and compact.

### Section 4 - One field workflow

**Job:** Show how the system works from start to saved record.

Use a six-step sequence:

1. Select the section and work code.
2. Start the work session.
3. Check the worker’s face and liveness.
4. Capture attendance or freeze the scale weight.
5. Review deductions and save locally.
6. Continue with the next worker.

Keep the copy short. The repeated-use speed should be shown by the sequence, not by an unsupported time claim.

**Existing media candidates:**

- `/screenshots/workflow_avd/00_home_entry_points.png`
- `/screenshots/workflow_avd/01_harvest_start_session_ready.png`
- `/screenshots/13_attendance_result_matched.png`
- `/screenshots/10_harvest_result_scale_connected_save.png`
- `/screenshots/workflow_avd/05_harvest_active_records.png`

Before public use, replace names, employee IDs, dates, and numbers with approved demo data through a real product capture. Do not edit the UI into a fictional state.

### Section 5 - Three ways the field app is used

**Job:** Broaden the offer beyond one harvest flow without creating a feature wall.

Use three equal blocks:

#### Face attendance

Normal attendance with face quality and liveness checks. Section and work-code context are saved with the record.

#### Punch and overtime

Repeated time-in and time-out records support breaks, split shifts, and overtime work.

#### Plucking and smart weighing

The recognized worker, scale weight, deductions, task, quality check, and work session stay linked.

Add a short fallback note below the blocks:

`If the camera or scale is unavailable, the supervisor can use a recorded manual fallback.`

**Media:** Use existing real app screens where approved. Do not add decorative icons inside colored boxes.

### Section 6 - Field to office

**Job:** Make the second half of the product visible. This is the most important addition to the current page.

**Heading direction:**

`The office can see what was captured, what synced, and what needs attention.`

Show a simple four-part office workflow:

1. `Review` - Employee Summary, Raw Data, Map, and Sessions.
2. `Check` - Worker, section, work code, weight, time, location, source, and status.
3. `Correct and finalize` - Add permitted manual attendance and finalize reviewed records.
4. `Export` - Prepare Excel, CSV, PDF, or ERP-import output where supported.

**Media:**

- Existing candidate: `/Users/g2m7/projects/web/gs_web/docs/webapp-testing-audit-assets/desktop-attendance.png`. The current capture is Sync Status and uses test-like data. It needs a confidentiality and current-build check.
- `[MEDIA PLACEHOLDER B: Anonymized desktop Attendance Data workspace showing Employee Summary or Raw Data.]`
- `[MEDIA PLACEHOLDER C: Anonymized Sync Status screen showing accepted, failed, and recent activity without client or worker information.]`

Do not use the login screen as product proof.

### Section 7 - Rules already used in tea garden work

**Job:** Demonstrate tea garden depth without listing every setting.

Use four short groups:

- `Weight rules` - Gross, bag or tare deduction, rainfall deduction, and net weight.
- `Daily task` - Section and plucking activity target sent from office to field devices.
- `Quality check` - Fine-leaf count and sample size when the estate requires it.
- `Session control` - Section, activity, task, start and end time, GPS, and vehicle details.

This section proves the product is not a generic attendance app.

**Media:** No new image is required if the screen captures in Sections 4 and 6 already show the details. Use text and real UI crops only when readable.

### Section 8 - Reliability and fallback

**Job:** Address status-quo fear and show that switching will not stop field work.

Use a clear before, during, and after structure:

- `Before the day` - Workers, sections, work codes, tasks, and rules are refreshed on the device.
- `During field work` - Records save locally. Scale and manual modes are available.
- `When internet returns` - The supervisor reviews uploaded, rejected, or failed records and retries where needed.

Include one security sentence only:

`Face-template backups can be exported in a password-protected encrypted file for authorized restore.`

Do not claim that the local database is encrypted unless separately verified and released.

### Section 9 - Complete capability index

**Job:** Give serious buyers completeness without making every visitor read every feature.

Use an accordion or plain grouped list. Keep all groups collapsed by default except the first. Do not use a dense bento grid.

Groups:

1. `Identity and enrollment`
   - On-device recognition, liveness, face quality, ambiguous-match rejection, retry, enrollment, re-enrollment, delete, backup, and restore.
2. `Attendance and punch`
   - Normal attendance, standalone or session-linked punch, overtime, repeated punches, time-in only, manual attendance, remarks, and punch GPS.
3. `Harvest and weighing`
   - Bluetooth scale, frozen weight, manual entry, gross and net weight, deductions, rainfall slabs, task, fine leaf, and invalid-weight protection.
4. `Sessions and field context`
   - Section, work code, activity, task, session limit, sequence, time, GPS, vehicle, weather, switching, recent records, summary, end, and discard.
5. `Office review and reports`
   - Employee Summary, Raw Data, Map, Sessions, KPIs, filters, record detail, correction, finalization, sync status, reports, and exports.
6. `Administration and rollout`
   - Master data, roles, device users, configuration, device limits, API keys, face-template monitoring, audit activity, setup, training, and support.

Do not include engineering implementation terms in this index.

### Section 10 - Paper vs GardenSuite

**Job:** Help the buyer compare the current process with the new workflow.

Use text comparisons, not only ticks and crosses. Paper has one real strength: it does not need power or connectivity. A fair comparison is more trustworthy.

Recommended rows:

| Work step           | Paper register                               | GardenSuite                                            |
| ------------------- | -------------------------------------------- | ------------------------------------------------------ |
| Worker identity     | Supervisor checks manually                   | Face and liveness checks help confirm the worker       |
| Leaf weight         | Written on a separate chit                   | Scale reading is linked to the recognized worker       |
| Weak internet       | Paper continues                              | App saves locally and syncs later                      |
| Office entry        | Staff re-enter or reconcile records          | Field records arrive with work and device context      |
| Exceptions          | Difficult to trace                           | Status, remarks, source, and retry details are visible |
| Payroll preparation | Attendance and weight are checked separately | Reviewed records are prepared for the estate workflow  |

Do not imply that GardenSuite removes all errors or all proxy attendance.

### Section 11 - Rollout by Sarbani Associates

**Job:** Reduce implementation fear.

Use the established rollout pattern:

1. Site visit and workflow review.
2. Worker, section, work-code, device, and scale setup.
3. Face enrollment and staff training.
4. Trial capture and office review.
5. Go-live support.

Add this trust line:

`GardenSuite is not handed over as a self-service app. Sarbani Associates configures it around the garden’s work and supports the rollout.`

### Section 12 - Role-specific result

**Job:** Let each buyer see the part that matters to them.

- `Manager` - Check who worked, where they worked, and what was captured.
- `Supervisor` - Use one field app with offline saving and practical fallback.
- `Office staff` - Review worker-wise records, status, corrections, and exports.
- `Owner` - See attendance and plucking numbers through the GardenSuite office and daily report system.
- `Administrator` - Control masters, users, devices, rules, backups, and sync.

Do not turn these into testimonials. They are benefit statements, not customer quotations.

### Section 13 - FAQ

Keep answers short and based on documented behavior.

Recommended questions:

1. Does face attendance work without internet?
2. How does the Bluetooth scale connect to a worker record?
3. What happens if the face is not recognized?
4. What happens if the scale or camera is unavailable?
5. Can the app record punch work and overtime?
6. Can workers be enrolled or re-enrolled in the garden?
7. What can the office review after sync?
8. How do attendance records reach payroll?
9. Can different sections use different task or deduction rules?
10. Who installs the system and trains staff?
11. Can client names be shared?
12. What does it cost?

Correct the current FAQ risks:

- Do not say `any Android phone` without a published compatibility requirement.
- Do not say the app always shows the closest match for manual confirmation. The documented behavior includes ambiguous-match rejection, retry, re-enrollment, and manual attendance fallback.
- Do not say data flows directly into payroll in every deployment. Say the records sync to the GardenSuite office workflow and the exact downstream connection is confirmed during setup.

### Section 14 - Final CTA

**Heading:**

`See the attendance and weighing workflow with your garden setup.`

**Support copy:**

`Sarbani Associates will show the field app, smart scale, office review, and rollout process. Demo, on-site setup, and staff training are free.`

**Primary CTA:** `Book Free Demo`

**Secondary CTA:** `Email Us`

**Confidentiality note:**

`Many estates keep software details private. We respect confidentiality and share region-level experience.`

## 6. What to Show, What to Hold Back

### Show on the main page

- Face verification and liveness in plain language.
- Attendance, punch, and plucking workflows.
- Bluetooth weight linked to worker and session.
- Offline saving and later sync.
- Manual fallback.
- Office review, status, finalization, and export.
- Tea garden rules such as section, work code, deductions, task, and fine leaf.
- Sarbani Associates setup, training, and support.
- Region-level and history proof.

### Show only in the complete capability index or FAQ

- Multiple punch numbers and time-in-only handling.
- Exact GPS capture points.
- Weather fields and units.
- Session duration, sequence, and discard rules.
- Recognition threshold controls.
- Face source-image deletion.
- Weight display modes.
- Device entitlements.
- API-key administration.
- Master-data source modes and reset safeguards.
- Detailed export filtering and filenames.

### Reserve for demo, implementation, or technical documentation

- API endpoints and headers.
- Request IDs and response parsing.
- Idempotent upserts and conflict semantics.
- Face embedding size, normalization, model version, and internal matching detail.
- Database-opening and cache-loading controls.
- AES-GCM implementation detail beyond the safe backup claim.
- Full permission matrix.
- Exact device-limit enforcement modes.
- Weight rounding architecture and calculation internals.
- ERP and reporting database boundaries.
- Full 34-report catalog.

### Do not market as current capability

- Military-grade anti-spoofing.
- Perfect recognition or an invented accuracy percentage.
- Automatic five-minute background sync.
- Fully encrypted local database unless separately verified.
- Primary Excel export from the mobile app.
- Connected scheduled email delivery.
- Any report catalog entry that is not verified as live in the target deployment.
- Future weight-mode enhancements.

## 7. Claim Rules

Use:

- `helps stop proxy attendance`
- `on-device face recognition`
- `liveness checks help prevent spoofing`
- `Bluetooth scale support`
- `works offline and syncs when connectivity returns`
- `records leaf weight linked to the worker and work session`
- `ERP-compatible CSV export`
- `password-protected encrypted face-template backup`

Avoid:

- `stops proxy attendance`
- `100% accurate`
- `zero errors`
- `zero paper`
- `fully automated`
- `real-time` unless the exact data path is live
- `AI-powered`
- `military-grade`
- `any Android phone`
- `instant` or exact recognition speed without tested evidence

Every claim should be demonstrable in the current product or clearly marked as deployment-dependent.

## 8. Media Plan

### Existing media that may be reused after review

| Existing asset                           | Best use                | Required check                                                                                         |
| ---------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------ |
| GS Face matched attendance screen        | Face attendance proof   | Replace or approve worker name, employee ID, date, and confidence value                                |
| GS Face matched harvest and scale screen | Smart weighing proof    | Replace or approve worker data and confirm the numbers represent a real demo flow                      |
| GS Face workflow captures                | Six-step field workflow | Confirm current build and use WebP versions under 200 KB                                               |
| GS Face sync status screen               | Offline-to-sync proof   | Confirm current wording and record state                                                               |
| GardenSuite MIS Sync Status capture      | Office control proof    | Confirm no client data and remove unimplemented scheduling implication from the visible crop if needed |

### New media requirements - placeholders only

- `[MEDIA PLACEHOLDER A: Sanitized field-to-office hero composition made only from approved real screenshots.]`
- `[MEDIA PLACEHOLDER B: Anonymized desktop Attendance Data workspace in Employee Summary or Raw Data view.]`
- `[MEDIA PLACEHOLDER C: Anonymized Sync Status screen with accepted, failed, and retry states.]`
- `[MEDIA PLACEHOLDER D: Real field photo showing the approved Android device and actual Bluetooth scale in use, only if Sarbani Associates can supply it with permission.]`
- `[MEDIA PLACEHOLDER E: Dedicated 1200 x 630 attendance OG image using approved product screenshots and GardenSuite branding.]`

Do not generate or draw a replacement scale, dashboard, field scene, customer, or app screen.

### Media production rules

- No served image over 200 KB.
- Use WebP where practical.
- Add width and height attributes.
- Only the hero image may load eagerly.
- Use picture and responsive srcset for the hero.
- Load all lower-page media lazily.
- Use approved demo data and remove personally identifiable worker information.
- Keep screenshots faithful to the current product. Do not build fictional states in a design tool.
- Do not use the current 15 MB `timeline.mp4` as served hero media without a separate performance decision and optimized derivative.

## 9. Design Guardrails

- Keep the existing Plus Jakarta Sans and Inter type system.
- Keep the locked heading sizes, weights, tracking, and line heights.
- Use plain uppercase labels at 13 px. No pill-shaped kickers.
- Use white as the base, warm off-white as support, and deep green as the accent.
- Use cards only where content needs grouping.
- Use thin neutral borders and neutral shadows.
- Do not add glassmorphism, backdrop blur, colored glow, or decorative gradient glow.
- Do not add circles or boxes behind icons. Use icon color and a subtle neutral shadow only.
- Prefer open editorial sections and full-width product proof over nested card grids.
- Use real product screenshots. Do not create fake dashboard illustrations.
- Keep motion subtle and respect reduced motion.
- Preserve the existing navigation, footer, CTA, rollout, and product-page rhythm.

## 10. SEO and Internal Linking

### Required metadata

**Primary keyword:** `tea garden attendance system`

**Support keywords:**

- `face attendance tea garden`
- `smart weighing tea garden`
- `biometric attendance tea estate`

**Title:**

`Tea Garden Attendance System - Face & Weighing | GardenSuite`

The current title is within the approved pattern and can remain.

**Meta description:**

`Tea garden attendance system with face checks and Bluetooth weighing. Save field records offline, then sync them for office review and payroll.`

**Canonical:**

`https://gardensuite.in/products/attendance`

**H1 requirement:** One H1 containing the primary keyword naturally. If the chosen emotional headline does not contain the phrase, use:

`Tea garden attendance that links every worker to the right record.`

### Schema

- BreadcrumbList.
- SoftwareApplication using true product facts only.
- FAQPage only when all questions and answers are visible on the page.
- No price, rating, review count, or customer schema without approved data.

### Internal links

Required links from the attendance page:

- `tea garden payroll software` to `/products/payroll`
- `tea garden MIS dashboard` or `daily report dashboard` to `/products/mis`
- `GardenSuite tea garden ERP software` to `/`

Required links into the attendance page:

- Homepage product grid.
- Payroll page where attendance and weight inputs are explained.
- MIS page where mobile attendance and field activity are shown.

Keep the existing `/products/attendance` URL as the hub. The three published detail routes provide enough focused content for face attendance, smart weighing, and offline office sync.

## 11. Content Expansion After the Main Page

Do not create the following guide pages now. They are future content candidates after the four attendance product routes are stable and real media is ready.

### Priority 1 - decision support

- `How face attendance works in a tea garden`
- `How Bluetooth leaf weighing links kg to a worker`
- `How GardenSuite works when internet is unavailable`
- `How mobile attendance reaches the estate office`

### Priority 2 - implementation support

- `Worker enrollment and re-enrollment guide`
- `Attendance and weighing rollout checklist for tea gardens`
- `Paper register to face attendance migration guide`

### Priority 3 - detailed field operations

- `Punch attendance, split shifts, and overtime`
- `Rainfall deductions and fine-leaf checks in plucking records`
- `Daily plucking task assignment from office to field`

Each future guide must be searchable, answer a real buyer question, link back to `/products/attendance`, and use only verified screenshots or named media placeholders.

## 12. Lead Capture Role

The free demo is the primary page action.

The current attendance guide can remain as a supporting lead capture only if the downloadable guide already exists and matches the page claims. It should appear after the product argument, not before office proof or rollout.

If the guide does not exist, use:

`[CONTENT PLACEHOLDER: Face Attendance and Smart Weighing Guide PDF. Must be written from verified product behavior and reviewed before the form is promoted.]`

Do not promise an asset that is not ready for immediate delivery.

## 13. Implementation Order

### Phase 1 - claim and structure correction

- Lock the message hierarchy.
- Correct unsupported FAQ and integration claims.
- Add the field-to-office section.
- Replace the feature dump with grouped progressive disclosure.
- Keep one primary CTA.

### Phase 2 - real product proof

- Review existing mobile screenshots for current build and personal data.
- Capture the missing office Attendance Data and Sync Status views with approved demo data.
- Convert served media to WebP and keep each file below 200 KB.
- Decide whether the 15 MB hero video is removed or replaced with an optimized approved derivative.

### Phase 3 - trust and rollout

- Move region, history, and on-site support proof closer to the hero.
- Add Sarbani Associates to the hero trust line, rollout section, CTA, and footer.
- Add the confidentiality note.

### Phase 4 - SEO and QA

- Finalize one H1 with the primary keyword.
- Add internal links to payroll, MIS, and the homepage.
- Verify metadata, schema, canonical, sitemap, and OG media.
- Test at 375 px, 768 px, and desktop.
- Run copy safety, performance, accessibility, and reduced-motion checks.

## 14. Acceptance Checklist

- A visitor can explain the product after the first screen.
- The page shows both the field app and the office system.
- The product is not described as generic biometric attendance.
- Proxy attendance claims use `helps stop` or equivalent safe language.
- No accuracy, speed, ROI, or customer result is invented.
- No unverified report or scheduled email feature is shown as live.
- Detailed technical controls do not crowd the main narrative.
- Every screenshot is real, current, approved, anonymized, and below 200 KB in the served format.
- Any missing media is shown in planning as a placeholder, not replaced by invented artwork.
- The type, color, spacing, cards, icons, motion, and section rhythm follow the existing GardenSuite rules.
- Sarbani Associates appears in a trust context and the footer.
- Book Free Demo and Email Us are present.
- Confidentiality is handled honestly.
- The page links to payroll and MIS with descriptive anchor text.

## 15. Open Decisions Before Implementation

These questions should be answered before final copy is written. They do not block the content plan.

1. Which Android versions and device requirements are officially supported?
2. Is direct GardenSuite payroll integration available in every target deployment, or is ERP export and downstream pull the safer default claim?
3. Which existing screenshots are approved for public use after anonymization?
4. Is the current attendance guide PDF ready and automatically delivered after form submission?
5. Can Sarbani Associates supply an approved real field photo of the phone and Bluetooth scale in use?
6. Which named clients, if any, have approved public website use?
7. Are face-recognition confidence values suitable for public screenshots, or should they be hidden to avoid implying an accuracy guarantee?
8. Should the current dark video hero remain, or should the attendance page move to the established light product-proof treatment?

Until these are decided, use the safe wording and media placeholders in this document.
