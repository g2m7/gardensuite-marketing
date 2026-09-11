# GardenSuite Personalization Framework and Templates

This document defines the research methodology, variable tiers, data sources, and variable omission rules for crafting authentic WhatsApp messages to tea estate owners.

---

## 1. The Core Personalization Principle

> **A message with less personalization is always better than a message with fake personalization.**

If you know the estate name and the director's name, that is sufficient. Never manufacture familiarity, pretend you visited the estate, or claim you noticed an operational issue you did not actually verify.

---

## 2. Research Variable Hierarchy

### High-Value Variables (Materially Improves Relevance)
These variables show the owner that you understand their exact estate context:
- `{{estate_name}}`: The trading name of the tea estate (e.g., *Kaliapani Tea Estate*, *Chandmari Tea Estate*).
- `{{first_name}}`: First name of the owner, MD, or partner, appended with respectful honorific "ji" (e.g., *Pratap ji*, *Dindayal ji*, *Kanhaiya ji*).
- `{{location}}` / `{{district}}`: Tehsil, town, or district where the garden is situated (e.g., *Naharkatia*, *Doomdooma*, *Panitola*, *Dibrugarh*).
- `{{acreage}}`: Planted tea area in hectares or Bigha (e.g., *180 hectares*, *1150 Bigha*). Establishes scale.
- `{{factory_presence}}`: Whether the estate has its own factory (e.g., *estate factory*) or sells green leaf to bought-leaf factories.

### Medium-Value Variables (Useful Context, Do Not Force)
- `{{operating_entity}}`: The legal entity name (e.g., *Jainex Tea Company Pvt Ltd*, *Sookerating Tea Estate Pvt Ltd*). Useful when addressing the MD.
- `{{atepfo_code}}`: Official Assam Tea Employees Provident Fund code (e.g., *E-138*, *E-67*). Proves active registered garden status.
- `{{approx_labor_count}}`: Estimated labor workforce (~150 to ~300 workers). Useful for scale benchmarking.

### Fake / Pseudo-Personalization (STRICTLY BANNED)
Never include these elements in any outreach message:
- *"I came across your profile on LinkedIn"* (Tea estate owners rarely use LinkedIn for garden operations; sounds like an automated SDR bot).
- *"Hope you are having a wonderful day"* / *"Greetings of the day"* (Corporate throat-clearing).
- *"Congratulations on your recent achievements"* without naming an actual, verifiable event.
- *"I noticed your passion for tea cultivation"* (Sycophantic and visibly fake).
- Pretending to have spoken to their garden manager when no conversation occurred.

---

## 3. Approved Research Sources (Assam & Bengal Tea Belt)

When researching a candidate estate, rely exclusively on these public regulatory and business registries:

1. **Ministry of Commerce / Parliamentary Question Annexures**:
   - URL patterns: `commerce.gov.in`, `sansad.in/getFile/loksabhaquestions/...`
   - Data available: Verified planted area in hectares, district location, official ownership category.
2. **Pollution Control Board Consent Orders (OCMMS Assam / WB)**:
   - URL patterns: `ocmms.nic.in`
   - Data available: Operating status, recent consent renewal date (proves active processing), factory presence, physical garden coordinates.
3. **ATEPFO Garden Directory (Assam Tea Employees Provident Fund Organization)**:
   - URL pattern: `atepfo.in/pages/Garden_List`
   - Data available: Garden code (e.g., E-108), registered district, primary management name, Bigha area.
4. **Ministry of Corporate Affairs (MCA) / ZaubaCorp / Tofler / IndiaFilings**:
   - Data available: Company status (active unlisted private company vs public company), registered directors (Managing Director, Director), date of incorporation, corporate email.
5. **Tea Board of India Planter Registers & Auction Marks**:
   - URL pattern: `teaboard.gov.in`, `assamteaxchange.com`
   - Data available: Estate registration number, tea mark name.
6. **Commercial Registries (KnowYourGST, ClearTax, Jamku)**:
   - Data available: Proprietorship / partnership firm names, active GST status, registered business town.

---

## 4. Lightweight Prospect Research Checklist (< 5 Minutes)

Before drafting or approving a first-touch WhatsApp message, verify:

```text
[ ] 1. Estate Name confirmed from official registry?
[ ] 2. Located in target district (e.g., Dibrugarh or Tinsukia)?
[ ] 3. Planted area >= 50 hectares?
[ ] 4. Ownership is independent private company or family firm (NOT a public company or large group)?
[ ] 5. Named decision-maker identified (Owner, MD, Director, Partner)?
[ ] 6. Checked against suppression list, current clients, and active sales records?
[ ] 7. Best operational angle identified based on estate size and factory presence?
```

**Stopping Rule**: As soon as you have verified items 1 through 7 and have one clear operational angle (attendance, weighing, or office bottleneck), stop researching and craft the message. Do not spend 30 minutes reading historical articles.

---

## 5. Reusable Message Template Syntax and Omission Rules

### Variable Schema
```text
{{first_name}}          -> Decision maker's first name (e.g. Pratap)
{{estate_name}}         -> Full name of estate (e.g. Kaliapani Tea Estate)
{{location}}            -> Sub-district town or tehsil (e.g. Naharkatia)
{{district}}            -> District (e.g. Dibrugarh)
{{suspected_problem}}   -> Operational friction (e.g. ghost hazira, wet leaf chits)
{{product_capability}}  -> Exact feature (e.g. offline face app, wireless Bluetooth scale)
{{proof}}               -> Relevant credibility (e.g. 20+ tea estates across Assam & Bengal)
{{cta}}                 -> Low-friction ask (e.g. 2-minute video clip)
```

### Strict Omission Rules
1. **If `{{first_name}}` is unverified or ambiguous**:
   - *Do NOT guess.*
   - Replace `"Namaskar {{first_name}} ji"` with `"Namaskar Sir"` or `"Hello, reaching out regarding operations at {{estate_name}}"`.
2. **If `{{location}}` is vague**:
   - Use `{{district}}` instead of guessing the specific post office or village.
   - Example: *"regarding {{estate_name}} in Dibrugarh"* rather than an unverified village name.
3. **If `{{factory_presence}}` is unknown**:
   - Default to Angle 1 (Field Face Attendance) or Angle 2 (Kamjari Weighing).
   - Do not mention factory leaf receipt unless the pollution board consent or tea mark explicitly confirms an on-site factory.
4. **If worker count is unknown**:
   - Speak about supervisors and section plucking in general terms.
   - Do not fabricate worker counts (e.g., never say *"for your 350 workers"* without verified evidence).
