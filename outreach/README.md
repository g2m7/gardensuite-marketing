# WhatsApp Outreach Workflow: Operator's Guide

This document is the operational manual for generating, reviewing, sending, and managing WhatsApp outreach for GardenSuite.

Follow this guide to run outreach that reads like it came from an experienced peer in the tea industry, not an automated marketing machine.

---

## System Overview

- **Purpose**: Initiate peer-to-peer conversations with tea estate owners, managing directors, and senior operators on WhatsApp that lead to live video demonstrations or on-site garden assessments.
- **Product Context**: GardenSuite by Sarbani Associates (Bagdogra, Siliguri). Offline Android face attendance app, Bluetooth smart wireless scale (Rs 7,000), web office review dashboard, and integrated payroll/ERP.
- **Target Audience (ICP)**: Independently managed tea estates (50 to 250 hectares, ~150 to ~400 workers) in Assam (Dibrugarh, Tinsukia) and North Bengal (Dooars, Terai, Darjeeling).
- **Core Rule**: Messages must be generated from verified prospect context. Never copy and paste raw templates without adapting them to the garden's actual situation.

---

## 1. Before Writing a Message

Before typing or generating an outreach message, collect this context:

```text
Prospect:                 [Estate name]
Decision maker:           [Name and title, e.g. Owner, Managing Director]
Industry:                 Tea Plantation / Manufacturing
Location:                 [Sub-district/town and District, e.g. Naharkatia, Dibrugarh]
Company size/type:        [Planted area in ha/Bigha, factory presence, independent vs group]
What we know:             [Facts verified from public registries]
Specific observation:     [Direct operational fact about this garden]
Likely pain:              [Ghost hazira, wet paper chits, evening office re-entry]
Current workaround:       [Paper registers, manual weight chits, Excel]
Relevant capability:      [Offline face app, wireless Bluetooth scale, Excel export]
Available proof:          [20+ commercial tea estates across Assam & Bengal]
Best outreach angle:      [Angle 1 (Attendance), 2 (Weighing), 3 (Office), or 4 (MIS)]
```

### Critical Epistemic Rule
- **Verified Facts**: Things documented in government registries, company MCA filings, or satellite records (e.g., *76.65 hectares planted area, unlisted private company, registered MD Pratap Kochar*).
- **Reasonable Hypotheses**: Operational realities typical for this size (e.g., *likely operates 2 to 4 field weighing points during second flush*).
- **Things We Must Never Claim Without Evidence**: Never claim we know their exact worker attendance count, never accuse their sirdars of theft, and never claim their current vendor is failing. State hypotheses as conversational questions, never as asserted facts.

---

## 2. Minimum Viable Research (< 5 Minutes)

When you only have a **Company Name + Phone Number**:

1. **Verify Location and Acreage**: Check Ministry of Commerce parliamentary annexures or ATEPFO garden lists (`atepfo.in`) for district and planted area.
2. **Check Operational Status**: Search Assam Pollution Control Board (`ocmms.nic.in`) to verify active tea cultivation and whether an estate factory exists.
3. **Identify Real Decision Maker**: Look up MCA company records (via ZaubaCorp or IndiaFilings) to get the registered Managing Director or Owner name.
4. **Check Internal History**: Reconcile against `Contacts Verified Golden List.xlsx` to ensure the account is not an existing client, large corporate group, or active sales discussion.
5. **Identify One Plausible Pain**:
   - Multiple sections + high acreage -> Kamjari plucking weight disputes (Angle 2).
   - Remote division / patchy connectivity -> Field face attendance offline (Angle 1).
   - Owner based in town -> Mobile owner crop summary (Angle 4).

> **Stopping Rule**: Stop research as soon as you have verified: (1) estate location, (2) independent private status, (3) decision-maker name, and (4) one operational angle. Do not spend over 5 minutes per prospect.

---

## 3. Choosing an Outreach Angle

Follow this decision tree:

```text
Do we have a specific operational observation (e.g., known factory, weighing points)?
    YES ──> Use Angle 2: Smart Kamjari Weighing (or Angle 1 Highly Personalized)
    NO  │
        ▼
Do we know the owner/director is based away from the garden?
    YES ──> Use Angle 4: Remote Owner Daily Visibility & MIS
    NO  │
        ▼
Do we understand their labor scale and section attendance challenge?
    YES ──> Use Angle 1: Field Face Attendance & Ghost Hazira
    NO  │
        ▼
Use Angle 3 (Evening Office Re-entry) or a direct problem question.
Never manufacture fake personalization.
```

---

## 4. Standard Operator Prompt for Generating a Message

Copy and run this prompt to craft a message:

```text
Create a first-touch WhatsApp message for this prospect using the outreach workflow.

Prospect Information:
- Estate Name: [e.g. Kaliapani Tea Estate]
- Decision Maker: [e.g. Pratap Kochar, Managing Director]
- Location: [e.g. Naharkatia, Dibrugarh, Assam]
- Size: [e.g. 76.65 hectares, independent family estate with factory]
- Known Details: [e.g. Active OCMMS consent, unlisted private company]

Reference:
- outreach/outreach-strategy.md
- outreach/whatsapp-messages.md
- outreach/personalization.md

Requirements:
- WhatsApp-native (25 to 70 words, readable without "Read more")
- Natural Indian business English, addressing prospect with respectful "ji"
- Regular hyphens only; no em dashes
- One core operational problem (no feature dumps, no corporate bio)
- Low-friction question CTA (asking permission for a 2-minute video clip or 1-page sample)
- Zero AI slop words

Return:
1. Recommended primary message (with exact word count)
2. Outreach angle selected and rationale
3. One alternate message version
```

---

## 5. Fast Mode (Batch Processing)

For processing batches of 5 to 15 qualified leads:

```text
Prepare first-touch WhatsApp messages for these qualified tea estate leads:

[Paste table of: Estate Name, Decision Maker, Location, Size/Notes]

For each estate:
- Select the strongest matching angle from outreach/outreach-strategy.md
- Output a single, send-ready message (under 65 words)
- Flag any lead lacking a verified decision-maker name or clear acreage
- Strictly observe: no em dashes, no AI slop, no invented facts
```

---

## 6. Deep Personalization Mode (High-Value Accounts)

For flagship independent estates (> 150 hectares or high local reputation):

```text
Run deep personalization for this priority tea estate:

Estate: [Estate Name]
Known Contact: [Name and Title]
Location: [Tehsil, District]

Research Tasks:
- Review MCA filings for sister estates or registered trading marks.
- Check factory consent capacity (annual made tea output if public).
- Formulate a precise operational hypothesis regarding field weighment or muster roll delays.

Output:
1. Operational hypothesis
2. Recommended first-touch WhatsApp message (< 65 words)
3. Follow-up 1 (Day 4) message
4. Follow-up 2 (Day 8) message
```

---

## 7. Message Review Checklist

Before pressing "Send" on WhatsApp, verify every box:

```text
[ ] 1. Is the opening natural and relevant to their tea estate?
[ ] 2. Does it sound like it was typed individually on a phone?
[ ] 3. Is there only ONE core idea and ONE question?
[ ] 4. Are all claims supported by repo facts (20+ estates, offline, Rs 7k scale)?
[ ] 5. Is it under 70 words (no "Read more" link triggered)?
[ ] 6. Are there ZERO em dashes (only regular hyphens)?
[ ] 7. Is all AI slop stripped (no "seamless", "cutting-edge", "game changer")?
[ ] 8. Is the CTA low-friction (yes/no to a 2-minute clip or 1-page sheet)?
[ ] 9. Would an experienced tea garden owner take this seriously?
```

---

## 8. Things We Never Send (Anti-Patterns)

### Bad Example 1: The Generic Agency Introduction
```text
Dear Sir, Greetings of the day! We are pleased to introduce Sarbani Associates, a leading IT company providing cutting-edge, AI-powered ERP solutions that will seamlessly transform your tea garden operations...
```
*Why it fails*: Pure corporate slop. Generic buzzwords. Owner immediately recognizes it as an agency blast and blocks the sender.

### Bad Example 2: The Feature-Dumping Novel
```text
Hello Sir, GardenSuite offers face attendance, wireless scales, factory leaf tracking, stores inventory, muster rolls, PF/ESI compliance, GPS worker tracking, weather monitoring, and mobile cloud dashboards for your garden. Let us schedule a 45-minute Zoom call...
```
*Why it fails*: Overwhelms the reader with 10 modules at once, requires a "Read more" tap, and demands a 45-minute commitment before establishing relevance.

### Bad Example 3: The Fake Compliment / Pseudo-Personalization
```text
Hi Pratap, I came across your impressive profile on LinkedIn and was really inspired by your leadership in the tea industry! I hope you are having an amazing week...
```
*Why it fails*: Tea planters do not live on LinkedIn; sounds like a canned US tech SDR email. Completely destroys local credibility.

---

## 9. What to Do When They Reply

Refer to `outreach/reply-playbook.md` for full scripts. Follow this natural progression:

$$\text{Prospect Reply} \longrightarrow \text{Direct Answer} \longrightarrow \text{Context Question} \longrightarrow \text{Send 2-min Video / Sheet} \longrightarrow \text{Demo Call}$$

### Quick Response Cheatsheet
- **"Send details"**: Send the 3-point summary and ask: *"Would you prefer a 2-minute video clip or a 1-page PDF summary?"*
- **"How much?"**: Give transparent flat software pricing (Nano Rs 10k, Small Rs 18k) + Rs 7k scale cost. Ask: *"How many field weighing points or sections do you operate?"*
- **"We already have software / ERP"**: Acknowledge politely. Ask: *"Does it capture offline face attendance and link wireless scales in the field, or do clerks re-type paper sheets?"*
- **"Not interested"**: Sign off gracefully. Mark account as `Suppressed / Do Not Contact`. Never argue.
- **"Call later"**: Confirm specific time: *"Would later today at 4:30 PM work, or tomorrow morning after field rounds?"*

---

## 10. Follow-Up Cadence

Refer to `outreach/followups.md` for full sequences.

- **Day 0**: Initial message sent.
- **Day 3–4**: Follow-up 1 (Add technical value, e.g., offline functionality).
- **Day 7–8**: Follow-up 2 (Address supervisor training or hardware simplicity).
- **Day 14**: Follow-up 3 (Respectful soft breakup / door left open).
- **After Day 14**: Stop. Mark as `No Response`. Never send repeated "just checking in" pings.

---

## 11. Using Templates Correctly

- `outreach/whatsapp-messages.md` provides **patterns and proven rhythms**, not blind mail-merge scripts.
- Always check if the specific garden operates an on-site factory before using factory-related hooks.
- **Rule of thumb**: A 45-word plain message with real estate details beats a 75-word template packed with forced variables.

---

## 12. Minimal Feedback Loop and Outcome Logging

Log every outreach touch in the campaign tracker:

```text
Estate Account:           [e.g. Kaliapani Tea Estate]
Decision Maker:           [e.g. Pratap Kochar]
Date Sent:                [YYYY-MM-DD]
Outreach Angle:           [Angle 1, 2, 3, or 4]
Message Version:          [A, B, C, D, or E]
Outcome Category:         [Delivered / Read / Replied / No Reply]
Reply Classification:     [Positive / Curious / Send Details / Price / Competitor / Not Interested]
Next Action:              [e.g. Send 2-minute video / Call at 4:30 PM / Suppress]
Notes:                    [Any specific operational clue revealed by prospect]
```

---

## 13. System Improvement & Experiments

Review campaign metrics every 20 completed conversations:
- If **Read Rate < 70%**: Recheck phone number sources (ensure numbers are WhatsApp-active mobile numbers).
- If **Reply Rate < 15%**: Review message length and CTA clarity using `outreach/experiments.md`.
- If **Price Objections > 40%**: Emphasize the Rs 10,000/year Nano tier and Rs 7,000 hardware cost earlier in the dialogue.

---

## 14. Agent Command Shortcuts

Use these prompt shortcuts in conversation with coding or outreach agents:

### Shortcut 1: Craft Single Message
```text
Use the WhatsApp outreach workflow in /outreach.
Craft a first-touch message for:
[Paste Prospect Info]
Do the necessary prospect analysis, select the strongest angle, and return the best message plus one alternative.
```

### Shortcut 2: Review a Draft
```text
Review this WhatsApp outreach message using /outreach/README.md checklist.
Draft:
[Paste Draft]
Check: relevance, brevity (< 70 words), regular hyphens only, no AI slop, easy CTA. Rewrite if necessary.
```

### Shortcut 3: Handle a Reply
```text
Use /outreach/reply-playbook.md to answer this prospect reply:
Prospect: [Estate and Contact]
Their Reply: "[Paste reply]"
Provide the recommended WhatsApp response (< 50 words) that progresses the conversation.
```

### Shortcut 4: Write a Follow-up
```text
Use /outreach/followups.md and the conversation below.
Conversation:
[Paste conversation history]
Write the most appropriate next WhatsApp message.
Do not repeat information already communicated. Under 55 words.
```

### Shortcut 5: Batch Outreach
```text
Use the /outreach workflow to prepare first-touch WhatsApp messages for these leads:
[Paste lead list / table]
Return a table containing:
- Prospect
- Strongest angle
- Personalization signal
- Send-ready message (< 65 words)
- Confidence
- Missing information
Never invent missing details.
```

### Shortcut 6: High-Value Prospect
```text
Use deep personalization mode for this prospect:
[Paste prospect details]
Research and reason before writing.
Produce:
- Prospect hypothesis
- Strongest pain/trigger
- Best outreach angle
- First-touch message (< 65 words)
- Alternate message
- Recommended follow-up if there is no reply
```

---

## 15. Repository Outreach File Map

```text
outreach/
├── README.md
│   └── Operator entry point. Complete operational how-to and standards.
│
├── outreach-strategy.md
│   └── Sales brief, ICP, buyer psychology, 12 scored angles, winning angles.
│
├── whatsapp-messages.md
│   └── Send-ready first touches across Angles 1 to 5 and Approaches A to E.
│
├── followups.md
│   └── 3-touch follow-up sequences with timing, new value points, and soft breakups.
│
├── reply-playbook.md
│   └── Live scripts for 18 common prospect replies and objection handling.
│
├── personalization.md
│   └── Research hierarchy, approved public registries, checklist, omission rules.
│
└── experiments.md
    └── A/B testing hypotheses, 8-point quality audit, and 7 buyer persona simulations.
```

---

## 16. Usability Walkthrough: 3 Real ICP Prospects

To test this system from scratch, we ran 3 verified estates from `Contacts Verified Golden List.xlsx` and `prospects.csv` through the workflow:

### Prospect 1: Satispur Tea Estate
- **Context**: 93.18 hectares in Dibrugarh; single proprietorship of Sudip Chandra Bagchi; active GST registration; no internal conflicts.
- **Angle Chosen**: Angle 1 (Field Face Attendance & Ghost Hazira).
- **Resulting Message**:
  > *Namaskar Sudip ji. Reaching out regarding labor attendance at Satispur Tea Estate.*
  > 
  > *During busy plucking rounds, paper registers often let ghost hazira slip in when verification is manual. We built an offline Android app that verifies workers by face right in the tea section, with zero internet needed.*
  > 
  > *Could I share a 2-minute video showing how it works in the field?*
  *(62 words | Pass)*

### Prospect 2: Kaliapani Tea Estate
- **Context**: 76.65 hectares in Naharkatia, Dibrugarh; independent private family group (Jainex Tea Company Pvt Ltd); on-site factory; MD Pratap Kochar.
- **Angle Chosen**: Angle 2 (Smart Kamjari Weighing & Factory Dispatch).
- **Resulting Message**:
  > *Namaskar Pratap ji. Reaching out regarding Kaliapani Tea Estate in Naharkatia.*
  > 
  > *At afternoon kamjari, handwriting leaf chits in the section often creates weight disputes and slows down factory leaf receipt. We connect a wireless scale to the supervisor's phone so plucking weight logs under the verified worker instantly, 100% offline.*
  > 
  > *Would you be open to seeing a 2-minute demo video?*
  *(62 words | Pass)*

### Prospect 3: Sookerating Tea Estate
- **Context**: 189.28 hectares in Doomdooma, Tinsukia; unlisted private company; MD Kanhaiya Agarwalla; active ATEPFO code E-138 (~250 workers).
- **Angle Chosen**: Angle 3 (Evening Muster Roll & Office Re-entry Bottleneck).
- **Resulting Message**:
  > *Namaskar Kanhaiya ji. Quick operational question regarding Sookerating Tea Estate.*
  > 
  > *With around 250 workers, do your estate clerks spend hours every evening re-entering handwritten field registers into Excel before payroll? GardenSuite syncs attendance directly from supervisor phones so your office muster roll is ready without re-typing.*
  > 
  > *Worth taking a 2-minute look at the daily summary format?*
  *(58 words | Pass)*
