# Task: write the call kit and the recording shot list

Read `collateral/demo-kit/copy/BRIEF.md` first and follow every rule in it. Also read `collateral/demo-kit/copy/TASK_slides.md` to see what the deck covers.

Write TWO files. Do not create or edit any other file.

## File 1: `collateral/demo-kit/CALL_KIT.md`

Practical setup guide for the presenter. Sections:

1. **Kit contents** - list of files in `collateral/demo-kit/`: `deck/index.html` (presenter deck), `DEMO_SCRIPT.md` (talk track), `CALL_KIT.md` (this file), `SHOT_LIST.md` (recordings to add), and the generated outputs in `deliverables/demo-kit/`: `GardenSuite-Live-Demo.pdf` (leave-behind), `walkthrough-weighing.mp4` and `walkthrough-attendance.mp4` (short silent videos with captions for WhatsApp).
2. **Open the deck** - open `collateral/demo-kit/deck/index.html` in Chrome. Keys: Right arrow or Space = next step, Left arrow = back, F = full screen, P = play the current walkthrough automatically, N = show presenter notes, Home = first slide. Add `?estate=Estate%20Name` to the URL to show the estate name on the title slide.
3. **Screen share settings** - share one Chrome tab (not the whole screen) so notifications stay private; tick "share tab audio" only when playing a video; close other tabs; set laptop to Do Not Disturb; 1920x1080 window; test on a second device before the first real call.
4. **Showing the real phone (optional, after the deck)** - mirror the Android phone to the laptop with scrcpy (free, open source, USB cable, USB debugging on). Install on Mac with `brew install scrcpy`, on Windows download the release zip from the official GitHub page (Genymobile/scrcpy). Run `scrcpy --max-size 1080 --stay-awake`. Share that window. Use a demo estate with sample workers only, never real worker faces or wages without the estate's permission.
5. **Showing the real scale (optional)** - a second phone joins the call as a camera, fixed on a stand, pointing at the scale display and the mirrored phone. Hang a known test weight. Say the number before the app shows it so the viewer sees them match. Keep this under 2 minutes; the deck carries the explanation.
6. **Pre-call checklist** - 10 to 12 checkboxes (`- [ ]`): deck opens, estate name set, walkthrough videos ready on phone for WhatsApp, PDF ready, discovery questions printed, charger connected, internet backup (phone hotspot), calendar link, notes of what the prospect said in earlier contact, mute notifications, demo phone charged and on demo data, scale charged.
7. **Poor connection plan** - if the prospect's video is weak: stop screen share, send the PDF on WhatsApp and walk through it page by page on a voice call using slide numbers.
8. **After the call** - within 1 hour send on WhatsApp or email: short thank-you message, the PDF, the two videos, and the proposed next step with two date options. Include a ready-to-copy message template in simple English (max 80 words), no attachments other than those three, no pushy language. Record the call outcome against the estate account in the tracker (pipeline stage `Demo or visit`).
9. **Privacy rules** - never show real client names, worker faces, wages or garden data from another estate. Demo data only.

## File 2: `collateral/demo-kit/SHOT_LIST.md`

The owner can record real screenshots and videos. List the recordings that would make the kit stronger, in priority order, as a table: #, what to record, where / device, length, how it will be used in the kit, tips. Include at least:

1. Real hands-on video of weighing at a weighing point: bag on the Bluetooth scale, scale display, phone showing the same weight, face check, save. Phone camera, landscape, steady on a tripod, 30-45 sec, daylight. Get worker consent.
2. Screen recording of the same weighing flow on the phone (Android built-in screen recorder), demo data.
3. Close-up photo of the scale hardware and the phone together (for slide s05, replacing the illustration).
4. Screen recording of sync going from pending to synced after turning mobile data back on.
5. Screen recording of the office desktop: opening the day's field records, correcting one record, and running the wages register.
6. Screen recording of the online dashboard on a phone browser and on a laptop.
7. Screen recording of a face not matched, then Retry, then matched (demo worker).
8. Photo of the Sarbani Associates team at a garden training session (with permission).

Then a short "Recording rules" section: demo estate data only, 1080p, no notifications visible (Do Not Disturb), clean status bar, battery above 50 percent, no real worker names or wages without written permission, save originals in `assets/source/videos/` or `assets/source/product-screenshots/` with descriptive file names like `weighing_handson_2026-10.mp4`.

When done, run `grep -n "—\|–" collateral/demo-kit/CALL_KIT.md collateral/demo-kit/SHOT_LIST.md` and fix anything it finds.
