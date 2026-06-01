# GS Face — Unique Selling Proposition (USP)

> **One sentence:** GS Face is the only offline-first, face-recognition attendance system built specifically for agricultural field operations that pairs instantly with a Bluetooth weighing scale — so you can verify **who** picked the leaves and **how much** they picked, with zero internet, zero paper, and zero buddy-punching.

---

## The Problem We Solve

Tea estates and large farms operate in remote locations with no connectivity, massive daily workforces (500+ workers), and weight-based pay. Traditional attendance systems fail because they need internet, can be spoofed with photos, and cannot capture harvest weight at the moment of check-in. Paper logs are slow, error-prone, and impossible to audit.

**GS Face solves all three problems simultaneously.**

---

## Core USP: The Scale + Face Pairing

Every other attendance app answers **"Who is here?"**

**GS Face answers "Who is here, and exactly how much did they harvest?"** — in a single 3-second action.

### How the pairing works:
1. Worker hangs their bag of leaves on the **Bluetooth scale**
2. Scale broadcasts live weight to the Android device
3. Worker looks at the camera
4. App verifies the worker is a real person (liveness detection)
5. App recognizes the worker's face in under 3 seconds
6. Weight is automatically locked to that worker's record
7. Done — no typing, no paper, no connectivity needed

The scale and the face system are not two separate features. They are **one unified capture action**. That is the GS Face difference.

---

## Feature Matrix

### 1. Offline-First Face Recognition
- **What:** 512-dimension facial embedding matching using an ONNX deep-learning model (InsightFace w600k_r50)
- **Why it matters:** Works with 500+ enrolled workers. No internet. No cloud API calls. No latency. Recognition in < 3 seconds.
- **USP angle:** *"Your workforce data never leaves the device unless you choose to sync it."*

### 2. Liveness Detection (Anti-Spoofing)
- **What:** Real-time blink detection, head-movement tracking, and smile verification using Google ML Kit
- **Why it matters:** Prevents buddy-punching with photos, videos, or masks. The system requires a living person.
- **USP angle:** *"A photo of a face will not work. It has to blink, move, and smile."*

### 3. Bluetooth Scale Integration (The Pairing)
- **What:** Native HC-05 Bluetooth Classic (SPP) connection to industrial weighing scales
- **Why it matters:** Live weight streams into the app during face capture. Weight is frozen the moment a valid face is recognized. No manual re-entry. No typing errors.
- **USP angle:** *"The scale talks to the app in real time. The weight is captured automatically when the face is recognized."*

### 4. Dual Attendance Modes
- **Harvest Mode (Piece Rate):** Captures worker + weight + session. Used for green-leaf plucking and any quantity-based work.
- **Punch Mode (Time/Day Rate):** Captures worker + timestamp only. Used for pruning, weeding, and any time-based work.
- **Why it matters:** One app handles every type of field labor contract.

### 5. Session Management with GPS Audit Trail
- **What:** Supervisors start a session with a work code and section. The app records start/end timestamps and GPS coordinates. Sessions are immutable once closed.
- **Why it matters:** Creates a tamper-resistant audit trail for labor disputes and compliance.

### 6. AES-256 Encrypted Local Database (Isar)
- **What:** All worker data, face embeddings, and harvest records are stored in an AES-256 encrypted Isar database on the device.
- **Why it matters:** If the device is lost or stolen, the data is unreadable without the encryption key.

### 7. ERP Synchronization (When You Have Signal)
- **What:** Two-way sync pushes harvest/punch records to your ERP and pulls updated worker lists, work codes, and face templates.
- **Why it matters:** The field keeps working offline; the office gets clean data automatically when connectivity returns.
- **Bonus:** Face template sync means a worker enrolled on Device A is instantly recognizable on Device B.

### 8. ERP-Ready Excel Export
- **What:** One-tap export to `.xlsx` shaped exactly for ERP import — not raw CSV dumps.
- **Why it matters:** No data re-formatting. No copy-paste errors. The file goes straight from the field supervisor's phone into your payroll system.

### 9. Fine Leaf Quality Checks
- **What:** Configurable quality sampling — require a fine-leaf count every N harvests or on specific dates.
- **Why it matters:** Ensures harvest quality standards are enforced at the point of collection, not days later.

### 10. Harvest Session Sequence Enforcement
- **What:** Cloud-configurable rule that blocks a worker from harvesting in Session N unless they have attendance in Session N-1.
- **Why it matters:** Prevents ghost harvesting and ensures workers are actually present before their weight is recorded.

### 11. Encrypted Face Template Backup
- **What:** Export all face embeddings to a password-encrypted file. Import onto another device.
- **Why it matters:** Protects your biometric investment. If a device fails, you do not re-enroll 500 workers from scratch.

### 12. Weather Logging
- **What:** Supervisors can log weather conditions that may affect harvest productivity.
- **Why it matters:** Correlates yield data with weather for operational planning.

### 13. Low-Literacy UI Design
- **What:** Large touch targets, icon-first actions, minimal text, color-coded states (green = harvest, amber = punch), and clear visual hierarchy.
- **Why it matters:** Field supervisors and workers may not read fluently. The app communicates through color, size, and position.

### 14. Reports & Daily Totals
- **What:** Searchable session reports with daily worker totals, date-range filtering, and work-code breakdowns.
- **Why it matters:** Supervisors can resolve disputes and verify totals on the spot — no waiting for the office.

---

## Competitive Positioning

| Competitor Approach | GS Face Approach |
|---|---|
| Fingerprint scanners fail with dirty/wet hands | Face recognition works regardless of field conditions |
| RFID cards are lost, shared, or forged | Your face is the only credential you cannot lose or lend |
| Cloud APIs need 4G/5G | 100% on-device — works in zero-connectivity estates |
| Separate weighing + separate attendance = double data entry | Scale + face captured in one 3-second action |
| Paper logs = days of data entry and disputes | Digital records = instant export and audit trail |
| Generic attendance apps don't understand harvest weight | Built for agricultural piece-rate labor from day one |

---

## Target Buyer Pain Points

1. **"I am paying workers for harvest I suspect was never picked."** → Session sequence + liveness detection = real people, real attendance.
2. **"My supervisors spend an hour every evening doing data entry from paper."** → One-tap Excel export goes straight to ERP.
3. **"We lost a device and had to re-enroll 400 workers."** → Encrypted face template export/import = instant recovery.
4. **"Buddy punching costs us thousands every month."** → Liveness detection + face embeddings = no photo, no video, no mask will work.
5. **"Our estate has no signal."** → Full offline operation for up to one week. Sync when you reach the office WiFi.

---

## The Scale Pairing in Detail

**The Scale:** HC-05 Bluetooth Classic module (default target: GWS2303 industrial scale)
**The Protocol:** SPP (Serial Port Profile) — ASCII decimal weight broadcast
**The Integration:**
- Scale pairs once via standard Android Bluetooth bonding
- App maintains persistent connection state with auto-reconnect
- Live weight updates stream every second into the camera overlay
- When a face is recognized, the current stable weight is **frozen** as the pending weight for that worker
- Manual weight input is always available as a fallback
- Weight deduction percentage is applied automatically; net weight is calculated instantly

**Result:** The supervisor does not type a single digit. The worker does not wait. The weight is captured exactly when the face is confirmed.

---

## Success Metrics

| Metric | Target | Why It Matters |
|---|---|---|
| Recognition speed | < 3 sec for 500+ workers | Keeps harvest queues moving |
| Recognition accuracy | > 98% | Prevents misidentified payouts |
| Liveness spoof prevention | > 95% | Stops photo/video buddy-punching |
| Offline duration | Up to 7 days | Covers remote estates with no connectivity |
| Scale weight accuracy | Matches scale precision | No revenue loss from rounding errors |
| ERP export time | < 5 seconds | Supervisor exports and goes home |

---

*Document version: 1.0 | Created for marketing and sales enablement*
