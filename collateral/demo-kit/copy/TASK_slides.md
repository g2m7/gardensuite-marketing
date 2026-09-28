# Task: write the slide copy as JSON

Read `collateral/demo-kit/copy/BRIEF.md` first and follow every rule in it. Also skim `product.md` at the repo root for tone. You may look at the screenshots in `collateral/demo-kit/assets/phone/` (file names describe each screen).

Write ONE file: `collateral/demo-kit/copy/slides.json`. Valid JSON only (no comments, no trailing commas). Do not create or edit any other file.

## Schema

```
{
  "slides": [
    {
      "id": "s01",                 // keep the ids and order below exactly
      "type": "title|agenda|problem|chain|kit|flow|offline|gallery|issues|start|close",
      "kicker": "SHORT UPPERCASE LABEL, max 4 words",
      "title": "Headline, max 9 words",
      "sub": "One sentence, max 22 words",
      "items": [ { "title": "max 6 words", "text": "max 18 words" } ],
      "steps": [ { "screen": "file name from the list below", "title": "max 6 words", "text": "max 18 words", "say": "what the presenter says, 1-2 sentences, max 35 words" } ],
      "notes": "presenter note for this slide, max 40 words"
    }
  ]
}
```

- `items` is used by agenda, problem, chain, kit, offline, gallery, issues, start, close slides.
- `steps` is used only by flow slides. Use exactly the screens listed, in that order.
- Omit keys a slide does not use.

## Slides (keep ids, types, screens and item counts exactly)

- s01 title. Title about seeing the field-to-office flow of GardenSuite. Sub mentions Sarbani Associates, Bagdogra, since 2000.
- s02 agenda. 4 items: In the field (face check and weighing), At the office (review and payroll), For the owner (daily dashboard), Getting started (small first step). About 20 minutes total.
- s03 problem. 3 items: proxy attendance, loose weight chits reaching the office late, payroll doubts and disputes.
- s04 chain. 7 items in order: Face check, Scale weight, Saved on phone, Sync, Office review, Payroll, Owner dashboard. Each item text max 10 words.
- s05 kit. What is at the weighing point. 4 items: Android phone with GS Face app, Bluetooth hanging scale, the supervisor, the worker. Say what each one does.
- s06 flow "Start the day's session". screens: 00_home_entry_points.png, 01_harvest_start_session_ready.png, 02_harvest_section_picker.png, 03_harvest_activity_picker.png
- s07 flow "Connect the scale". screens: 08_scale_connection_from_harvest.png, 04_harvest_active_empty.png
- s08 flow "Weigh and check the face in one step" (the most important slide). screens: 07_harvest_capture_ready.png, 09_harvest_result_matched_weight.png, 10_harvest_result_scale_connected_save.png. Explain: gross weight from scale, bag deduction taken off, net weight and day total shown against the matched worker, supervisor taps Confirm and Save.
- s09 flow "Records build up through the day". screens: 05_harvest_active_records.png, 06_harvest_switch_activity_sheet.png
- s10 flow "Hazira for other work". screens: 11_attendance_active_session.png, 12_attendance_capture_capturing.png, 13_attendance_result_matched.png (pruning and other non-weighing work, face check marks attendance)
- s11 flow "Clock in and clock out". screens: 14_punch_select_context.png, 15_punch_capture_ready.png, 16_punch_result_clock_in.png, 17_punch_result_clock_out.png
- s12 flow "Enrol each worker once". screens: 23_register_select_worker.png, 24_register_worker_ready.png, 25_register_capture_ready.png, 26_register_review.png
- s13 offline "Works without internet". 3 items: saved on the phone, syncs when signal returns, sync screen shows what is pending. Screen shown by the deck: 27_sync_status.png.
- s14 flow "Supervisor checks totals on the phone". screens: 18_reports_harvest_list.png, 19_reports_worker_search.png, 20_reports_session_detail.png
- s15 gallery "Office review and payroll". 4 items, one per image in this order: entry-screen (daily entry and review), wages-register, pf-statement, payslips.
- s16 gallery "Owner dashboard". 3 items, one per image in this order: main dashboard (green leaf, mandays, kg per plucker), kamjari (labour deployment), wages summary. Mention phone, tablet or laptop. Do not say real-time.
- s17 issues "When something goes wrong". 4 items: face not matched (retry, fallback confirmed at setup), scale not connected (reconnect, fallback confirmed at setup), no internet (records stay on phone), new or returning worker (enrol or re-enrol).
- s18 start "How we start". 4 items in order: Visit and look at your current records, Start on one division, Train your staff, Expand when you are ready. Mention Sarbani Associates handles setup, training and support.
- s19 close "Next step". 3 items: Book a field visit, Send us one month of records for a Tea Loss Audit, Call or WhatsApp. Include contact details from the brief in the item texts.

When done, validate the file with: `python3 -m json.tool collateral/demo-kit/copy/slides.json > /dev/null && echo VALID`. Fix it until it prints VALID. Then check it has no em dash or en dash characters.
