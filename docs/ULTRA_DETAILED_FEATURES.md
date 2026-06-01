# GS Face — Ultra-Detailed Feature Deep-Dive

> **Purpose:** This document explains how every major feature works under the hood, and — critically — **why** each architectural decision was made. Use this for technical sales calls, RFP responses, security audits, and integration planning.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Face Recognition Engine](#2-face-recognition-engine)
3. [Liveness Detection (Anti-Spoofing)](#3-liveness-detection-anti-spoofing)
4. [BLE Scale Integration](#4-ble-scale-integration)
5. [Attendance Flows: Harvest vs Punch](#5-attendance-flows-harvest-vs-punch)
6. [Session Management & Audit Trail](#6-session-management--audit-trail)
7. [Database & Encryption](#7-database--encryption)
8. [Cloud Sync & ERP Integration](#8-cloud-sync--erp-integration)
9. [Export & Backup Systems](#9-export--backup-systems)
10. [Quality Controls](#10-quality-controls)
11. [UI/UX Design Philosophy](#11-uiux-design-philosophy)
12. [Performance & Optimizations](#12-performance--optimizations)

---

## 1. Architecture Overview

### Tech Stack
| Layer | Technology | Rationale |
|---|---|---|
| Framework | Flutter (Dart) | Single codebase for Android. Fast UI iteration. Large ecosystem. |
| State Management | Riverpod + Provider (migration in progress) | Riverpod gives compile-safe dependency injection; Provider legacy is being migrated for consistency. |
| Local DB | Isar (NoSQL) | Faster than SQLite for object graphs. Native Dart. AES-256 encryption support. |
| Navigation | go_router | Deep-linking friendly. Matches web-style route paths for mental model clarity. |
| Camera | camerawesome | Lower-level control than `camera` plugin. Needed for custom overlays and ML Kit integration. |
| Face Detection | Google ML Kit (on-device) | Free. No quota. Runs on-device. Good landmark detection for alignment. |
| Face Recognition | ONNX Runtime + InsightFace w600k_r50 | State-of-the-art accuracy on diverse faces. 512D embeddings. Runs entirely offline. |
| Bluetooth | flutter_blue_classic | HC-05 modules use Bluetooth Classic (SPP), not BLE. This is the only plugin that supports SPP reliably. |
| Excel Export | excel package | Generates `.xlsx` binary files natively in Dart. No external dependencies. |

### Why Clean Architecture?
The app uses a simplified Clean Architecture with Repository pattern:
- **Presentation** → UI screens + state notifiers
- **Domain** → Entity definitions + repository interfaces
- **Data** → Isar models, repository implementations, API DTOs
- **Infrastructure** → Device services (camera, location, Bluetooth, sync)

**Why:** Field apps have a long lifespan. The architecture makes it possible to swap the database (Isar → something else), swap the face model (ONNX → TFLite), or swap the sync backend without rewriting the business logic.

---

## 2. Face Recognition Engine

### The Model: InsightFace w600k_r50
- **Architecture:** ResNet-50 backbone trained on WebFace600K
- **Input:** 112×112 RGB face crop
- **Output:** 512-dimension embedding vector
- **Why this model:** It is specifically optimized for **diverse ethnicities and skin tones** — critical for agricultural workforces in South Asia and Africa where many commercial models underperform.

### The Pipeline

```
Camera Frame
    ↓
Google ML Kit Face Detection (bounding box + 468 landmarks)
    ↓
Face Preprocessing Service
    - 5-point alignment (eyes, nose, mouth corners)
    - Crop to 112×112
    - Normalize pixel values
    ↓
ONNX Runtime Inference
    - Input: Float32 tensor [1, 3, 112, 112]
    - Output: Float32 tensor [1, 512]
    ↓
L2 Normalization (CRITICAL)
    - Embedding magnitude scaled to exactly 1.0
    - Without this, cosine similarity comparisons are meaningless
    ↓
Embedding Cache (in-memory)
    - All 512D vectors loaded into a Dart List
    - Cosine similarity search against every enrolled worker
    ↓
Match Decision
```

### Why L2 Normalization is Mandatory
The face model outputs raw vectors whose magnitudes vary with image quality (lighting, blur, angle). If we compared raw vectors with Euclidean distance, a bright photo would artificially appear "closer" to everyone.

**L2 normalization fixes this:** every vector is scaled to unit length. After normalization, **cosine similarity** and **dot product** become mathematically equivalent. We use cosine similarity because it is computationally cheaper (no square roots during comparison).

### Recognition Thresholds
The app uses a tiered threshold system calibrated for field conditions:

| Threshold | Value | Meaning |
|---|---|---|
| `faceRecognitionThreshold` | 0.32 | Minimum similarity to consider a match at all |
| `highConfidenceThreshold` | 0.55 | Auto-accept with no ambiguity |
| `mediumConfidenceThreshold` | 0.40 | Acceptable but may trigger retry suggestion |
| `minAutoAcceptSimilarity` | 0.65 | Override: even if margin passes, low absolute similarity is rejected |
| `faceRecognitionMarginThreshold` | 0.025 | Gap required between best match and second-best match to avoid ambiguous twins/lookalikes |

**Why these values:** Lower thresholds increase false positives (wrong person accepted). Higher thresholds increase false negatives (right person rejected). The 0.32 base threshold was field-tuned to balance the two for outdoor lighting where face quality is variable.

### The Embedding Cache
- **What:** All enrolled face embeddings are loaded into a single Dart `List<List<double>>` at app startup (after splash screen)
- **Why not query Isar every time:** Isar queries have millisecond overhead. With 500 workers × 5 angles = 2,500 embeddings, a naive Isar query per recognition would add 50–100ms. The in-memory cache reduces this to < 5ms.
- **Thread safety:** The cache load is guarded by a shared `Future` so concurrent attendance captures cannot trigger parallel reloads.

### Fast First-Pass Recognition
**Old behavior:** Capture 5 images, run liveness on all 5, average embeddings, then compare.
**Current behavior:** Capture 1 image, run quick liveness, compare immediately. If match is clear → done. If unclear → show retry.

**Why the change:** In field testing, the 5-image flow took 8–12 seconds. Workers in a harvest queue will not stand still for 12 seconds. The 1-image fast path averages 2–3 seconds. The retry button is placed at the bottom of the screen for one-tap retry.

---

## 3. Liveness Detection (Anti-Spoofing)

### Why Liveness is Non-Negotiable
Without liveness detection, a malicious worker could:
- Hold up a printed photo of another worker
- Play a video of another worker on a phone
- Wear a 3D mask

All three attacks would fool pure face recognition. Liveness detection requires **time-varying biological signals** that cannot be static.

### The Three Checks

#### Check 1: Blink Detection (Eye Aspect Ratio)
- **How:** ML Kit reports `leftEyeOpenProbability` and `rightEyeOpenProbability` per frame (0.0 = closed, 1.0 = open)
- **Algorithm:** Track the average eye openness across frames. A blink is detected when openness drops below `eyeClosedThreshold` (0.2) and then rises above `eyeOpenThreshold` (0.6)
- **Why this works:** A photo has constant eye openness. A video loop may blink at wrong timing. Only a real person blinks naturally during the capture window.

#### Check 2: Head Movement (Euler Angles)
- **How:** ML Kit reports head rotation in 3 axes: X (pitch), Y (yaw), Z (roll) in degrees
- **Algorithm:** Calculate the range (max − min) of each angle across the frame sequence. If any axis moves more than `minHeadMovementDegrees` (5°), the check passes.
- **Why this works:** A printed photo held in front of the camera has zero head movement. A video may have movement, but it is typically planar (only Z rotation) rather than natural 3D head turns.

#### Check 3: Smile Detection
- **How:** ML Kit reports `smilingProbability` per frame
- **Algorithm:** Count frames where smile probability > 0.5. If > 10% of frames show a smile, pass.
- **Why this works:** Adds a third independent biological signal. Also makes the UX friendlier — workers are prompted to smile, which reduces tension.

### Frame Skipping & Early Exit Optimizations
- **Frame skipping:** Instead of processing every camera frame (30 FPS = 30 frames/sec), the system processes every Nth frame. For a 2-second capture window, this reduces 60 frames to ~15 frames with no accuracy loss.
- **Early exit:** If blink and movement both pass, the smile check is skipped. This reduces average liveness time from 2 seconds to ~1.2 seconds.
- **Background isolate:** Heavy frame analysis runs in a Dart `compute()` isolate so the camera preview does not stutter.

### Why Not Use Depth/IR Cameras?
Depth cameras (Face ID-style) are more spoof-resistant but:
- They are not available on budget Android devices used in field deployments
- They fail in direct sunlight (common in tea estates)
- They increase device cost by 3–4×

**Our approach:** Software-based liveness on standard RGB cameras is "good enough" for agricultural threat models (opportunistic buddy-punching, not state-sponsored attacks) and works on any Android phone.

---

## 4. BLE Scale Integration

### The Hardware: HC-05 + GWS2303
- **HC-05:** A Bluetooth Classic module that exposes a UART serial port over Bluetooth SPP (Serial Port Profile)
- **GWS2303:** An industrial weighing scale commonly used in tea estates. It broadcasts weight readings continuously over the HC-05 module.
- **Why Bluetooth Classic, not BLE:** Industrial scales predate BLE adoption. HC-05 modules are ubiquitous, cheap, and reliable. BLE GATT services are not available on legacy scale hardware.

### The Protocol
```
Scale → HC-05 → ASCII bytes → "12.50\r\n" → App
```
- **Data format:** Plain ASCII decimal (e.g., `12.5`, `12.50`, `0.00`)
- **Frequency:** Continuous broadcast while the scale has power
- **Stability:** The scale does not tell us if weight is stable. The app treats the last received positive weight as "current weight" and freezes it at recognition time.

### The Integration Flow

```
Active Harvest Session
    ↓
Open Attendance Capture (camera)
    ↓
Top UI Strip shows:
    - If scale connected: live weight (updates every second)
    - If scale disconnected: manual weight input field
    ↓
Face recognized + liveness passed
    ↓
IF scale is connected AND weight > 0 AND no manual weight pending:
    → Freeze current scale weight as "pending weight"
    ↓
Result Screen shows:
    - Worker name & photo
    - Gross weight (frozen scale reading)
    - Deduction % (from session config)
    - Net weight (auto-calculated)
    - Weight source: "Scale" or "Manual"
    ↓
Save blocked if weight missing/invalid
    ↓
Save creates HarvestRecordModel
```

### Why Weight is Frozen at Recognition Time
The scale reading changes constantly as workers hang bags, remove bags, or bump the scale. If we saved the "current" scale weight at save-button-tap time, a different worker's bag might be on the scale by then.

**Freezing at recognition time** ensures the weight belongs to the recognized worker, even if the supervisor takes 10 seconds to tap Save.

### Manual Weight Fallback
If the scale battery dies, the supervisor can type weight manually. Manual weight takes precedence over scale weight (to prevent the scale from overwriting a carefully typed value).

### Weight Deduction
Many estates deduct a percentage for moisture, debris, or stems. The app applies the deduction percentage configured in the session:
- **Gross weight:** Raw scale reading
- **Deduction:** Configured % (e.g., 5%)
- **Net weight:** Gross × (1 − deduction/100)

Only net weight is stored in the harvest record. This matches standard tea estate payroll practice.

---

## 5. Attendance Flows: Harvest vs Punch

### The Work Code Decision Point
Every session is tied to a **Work Code**. The work code has a boolean flag `requiresWeight`:
- **`true`** → Harvest flow (piece rate)
- **`false`** → Punch flow (time/day rate)

This single flag drives the entire UX difference between the two flows.

### Harvest Flow (Piece Rate)

**Data captured:**
- `workerId` (from face recognition)
- `weightKg` (from scale or manual input)
- `sessionId` (current active session)
- `timestamp` (exact capture time)
- `date` (YYYY-MM-DD for daily totals)
- `sessionNumber` (1st, 2nd, 3rd session of the day)
- `syncStatus` (pending → synced/failed)

**Why session number matters:** A worker may pluck in the morning (Session 1), take a break, and pluck again in the afternoon (Session 2). The session number lets the ERP calculate daily totals while preserving per-session granularity.

**No punch record is created:** For harvest work codes, only `HarvestRecordModel` is written. Creating a parallel punch record would duplicate attendance data and confuse payroll.

### Punch Flow (Time/Day Rate)

**Data captured:**
- `workerId`
- `workCodeId` (e.g., "Pruning", "Weeding")
- `timestamp` (clock-in time)
- `date`
- `sessionNumber`
- `sessionId` (optional — standalone punches may have null session)

**Why standalone punch exists:** Not all attendance is session-based. A worker might show up for a one-off pruning task with no formal session. The standalone punch flow lets supervisors mark attendance without starting a harvest session.

**Attendance count logic:** The Home screen shows "Today's Attendance" as the count of **unique workers** who have punched today. If a worker punches twice (morning and afternoon), they count as 1, not 2.

---

## 6. Session Management & Audit Trail

### Session Lifecycle
```
Start Session
    ↓
Select Section (geographic area)
    ↓
Select Work Code (determines harvest vs punch)
    ↓
Select Activity (optional sub-task)
    ↓
Session Active
    - GPS start location recorded
    - Start timestamp recorded
    - Supervisor ID recorded
    ↓
Harvest/Punch captures accumulate
    ↓
End Session
    - GPS end location recorded
    - End timestamp recorded
    - Session marked immutable
```

### Why Sessions are Immutable
Once ended, a session cannot be edited or deleted locally. This is a **compliance feature**:
- Prevents supervisors from retroactively adding ghost workers
- Creates a tamper-evident audit trail
- Matches labor law requirements in many jurisdictions

### Session Switching
A supervisor can switch the active session's work code or activity mid-session. However, the **capture flow snapshots the work code at the moment capture starts**. This prevents a race condition where:
1. Supervisor starts capture for Worker A
2. Supervisor switches work code
3. Worker A's record is accidentally saved with the new work code

---

## 7. Database & Encryption

### Isar Database
- **Type:** NoSQL object database (similar to Hive, but faster)
- **Storage:** Single file (`gsface.isar`) plus companion lock file
- **Why Isar:**
  - Native Dart (no JNI bridging overhead)
  - Query performance 2–5× faster than SQLite for object graphs
  - Built-in encryption support
  - Type-safe code generation from `@collection` classes

### AES-256 Encryption
- **Key generation:** A 256-bit key is generated on first app launch and stored in Android Keystore (hardware-backed when available)
- **Encryption scope:** The entire `.isar` file is encrypted at rest
- **Why AES-256:** Matches enterprise security standards. Compliant with GDPR, HIPAA, and most data protection regulations.

### Database Safety Decisions
Several hardening measures were added after field incidents:

1. **No automatic DB deletion:** Older code deleted `gsface.isar` if open failed. This destroyed all data. Current code preserves the file and surfaces the error.
2. **Shared open Future:** Multiple screens calling `DatabaseService.database` simultaneously could trigger two `Isar.open()` calls, causing MDBX lock errors. A shared `Future` ensures only one open runs at a time.
3. **No preload from main():** Preloading the embedding cache from `main()` created a race condition with splash-screen DB initialization. Cache loading now happens lazily on first attendance capture.

---

## 8. Cloud Sync & ERP Integration

### Two-Way Sync Architecture
```
Device → API
    - POST harvest records
    - POST punch records
    - POST face templates (embedding backup)

API → Device
    - GET sections
    - GET workers
    - GET work codes
    - GET face templates (restore to new device)
```

### Sync Trigger
- **Automatic:** Every 5 minutes (if configured)
- **Manual:** "Sync Now" button in Settings
- **Why manual is primary:** Field supervisors prefer control. Auto-sync in low-connectivity areas can drain battery with failed retries.

### Sync Resilience
- **Failed records are retried:** Records marked `failed` (4xx/5xx server error) are included in the next sync attempt. They are never orphaned.
- **Missing endpoints are non-fatal:** If the backend does not yet support face template sync (`/api/attendance/face-templates`), the app logs a warning and continues with business sync.
- **Auth token preservation:** A temporary DB error during session restore no longer deletes the saved login token. This prevents unnecessary logouts.

### Face Template Sync (Multi-Device)
**The problem:** Worker enrolled on Device A is unknown to Device B.
**The solution:**
1. During sync, Device A uploads all face embeddings to `POST /api/attendance/face-templates`
2. Device B downloads them via `GET /api/attendance/face-templates`
3. Device B imports them into local Isar and reloads the embedding cache

**Security note:** Face templates are 512D float vectors — not reversible images. They are biometric data and should be stored encrypted on the server.

### ERP Excel Export
**Why `.xlsx` instead of CSV:**
- Excel files preserve data types (dates stay dates, numbers stay numbers)
- Excel files are less likely to be corrupted by users opening in text editors
- The ERP sample format had specific column ordering that CSV struggled with

**Column structure:**
```
TRANSDATE | ECODE | EMPNAME | JCODE | KJDESC | USERID | DEDUCT1 | NETTWT1 | TIME1 | SECTION1 ... SECTION4 | [app diagnostic fields]
```

The first columns match the ERP CSV sample exactly. App-specific fields (sync status, GPS coordinates, fine leaf data, created-at timestamps) are appended after `SECTION4` so they do not interfere with ERP import.

---

## 9. Export & Backup Systems

### Encrypted Face Template Export
**Use case:** Device replacement, disaster recovery, multi-device fleet setup.

**Process:**
1. Supervisor enters a password
2. App exports all face embeddings + worker IDs to JSON
3. JSON is encrypted with AES-256-GCM using a key derived from the password (PBKDF2)
4. Encrypted file is saved to device storage
5. File can be transferred via USB, Bluetooth, or cloud storage

**Import process:**
1. Supervisor selects the `.enc` file and enters the password
2. App decrypts, validates embedding dimensions (must be 512D), normalizes if needed
3. Embeddings are matched to local workers by `userId` or `employeeId`
4. Unmatched embeddings are skipped (worker may not exist on target device yet)
5. Import counts are logged for audit

**Why password-based instead of key-based:** Passwords are human-memorable. A random 256-bit key would need to be written down or stored insecurely. PBKDF2 + AES-GCM provides sufficient security for this threat model.

### CSV Export (Legacy / Diagnostic)
The app still supports CSV export for:
- Individual session data
- Selected-day reports
- Date-range reports
- Daily worker totals

CSV is useful for quick inspection in text editors or for integration with legacy systems that do not support Excel.

---

## 10. Quality Controls

### Fine Leaf Checks
**The problem:** Estates need to ensure workers are not mixing stems and debris with green leaves.
**The solution:** Configurable quality sampling:
- **Date-based:** Require a fine-leaf count on specific dates (e.g., first day of each month)
- **Frequency-based:** Require a check every N harvest records (e.g., every 10th weighment)
- **Data captured:** Fine leaf count + sample size
- **UX:** A modal appears after face recognition but before save. The supervisor enters the count and sample size.

### Harvest Session Sequence Enforcement
**The problem:** A worker might skip attendance in Session 1 but show up to harvest in Session 2, creating a "ghost harvest" with no attendance record.
**The solution:** A cloud-configurable boolean `enforceHarvestSessionSequence`:
- If enabled, the app checks whether the worker has an `AttendanceRecordModel` in the previous session of the same day
- If not, save is blocked with a clear message: "Worker did not attend previous session"
- This is enforced in both the result screen and the attendance save path

**Why this matters:** It closes a payroll fraud vector where supervisors record harvest weights for absent workers.

---

## 11. UI/UX Design Philosophy

### Low-Literacy Design
Many field supervisors and workers are not fluent readers. The UI communicates through:
- **Color coding:** Green = harvest/money/primary action. Amber = punch/secondary action. Red = error.
- **Size hierarchy:** Primary actions (Harvest Attendance) are 2× larger than secondary actions (Reports, Settings).
- **Icon-first:** Every action has a distinct icon. Labels are short (1–3 words).
- **No-session state:** When no harvest session is active, the Punch card becomes the full-width primary action — because it is the only thing you can do.

### iOS-Inspired Patterns (Not iOS-Dependent)
- **Grouped lists:** Related settings are grouped with rounded corners and background cards
- **Large touch targets:** All tappable areas are ≥ 44pt (Apple HIG standard)
- **Safe area aware:** Bottom actions sit above the system navigation bar
- **Semantic colors:** Status colors match real-world meaning (green = go, amber = caution)

### Why Not Material Design Defaults?
Material Design's default color palette (purple primary, gray surfaces) does not communicate agricultural meaning. A tea estate supervisor sees green and thinks "harvest." They see amber and thinks "caution/punch." The custom palette (`#3D7D2C` harvest green, `#234B1D` deep green, `#F1F6EB` light surface) was chosen for **semantic resonance** with the domain.

---

## 12. Performance & Optimizations

### Recognition Performance
| Stage | Before Optimization | After Optimization |
|---|---|---|
| Face detection | 200–400ms | 150–250ms |
| Liveness check | 3–4s (5-image) | 1–2s (1-image + early exit) |
| Embedding generation | 800–1100ms | 600–800ms |
| Cache search (500 workers) | 50–100ms | < 5ms |
| **Total** | **5–8s** | **2–3s** |

### Key Optimizations
1. **Frame skipping in liveness:** Process every 3rd frame instead of every frame
2. **Early exit liveness:** Stop checking once 2 of 3 checks pass
3. **Background isolate:** Liveness computation runs in `compute()` so UI stays at 60 FPS
4. **In-memory embedding cache:** Eliminates Isar query overhead
5. **Shared initialization futures:** Prevents parallel ONNX session creation and DB opens
6. **Camera auto-zoom:** Reduces need for workers to move closer, saving time per capture
7. **ONNX native resource cleanup:** Explicit `release()` calls on tensors, run options, and session options prevent native memory leaks that caused crashes on long sessions

### Database Performance
- Isar handles 10,000+ harvest records with sub-10ms query times
- The shared DB open future prevents lock contention
- No preloading from `main()` reduces app startup time by ~200ms

---

## Appendix: Threat Model & Security

### What We Protect Against
| Threat | Mitigation |
|---|---|
| Photo spoofing | Liveness detection (blink + movement) |
| Video spoofing | Liveness timing checks + smile requirement |
| Buddy punching | Face recognition + liveness + session sequence |
| Device theft | AES-256 encryption at rest |
| Data tampering | Immutable sessions + UUID primary keys |
| Network interception | HTTPS for sync + no sensitive data in logs |
| Unauthorized export | Password-protected encrypted export files |

### What We Do Not Claim
- **Not military-grade anti-spoofing:** A hyper-realistic 3D animatronic mask might fool the system. This is acceptable for agricultural threat models.
- **Not cloud AI:** Recognition accuracy is slightly lower than cloud APIs (AWS Rekognition, Azure Face). The tradeoff is offline operation and zero data sovereignty risk.
- **Not medical-grade liveness:** We detect natural movement, not pulse or blood flow. This is sufficient for preventing casual fraud.

---

*Document version: 1.0 | For technical sales, RFPs, security reviews, and integration planning*
