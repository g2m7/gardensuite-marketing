# Live demo kit

Material for showing the GS Face app, the Bluetooth scale and the office and owner screens on a video call.

Open `deck/index.html` in Chrome and press F. Read `CALL_KIT.md` before the first call. The talk track is `DEMO_SCRIPT.md`.

## What is here

- `deck/index.html` - the presenter deck, 19 slides. Works offline. Fonts are in `deck/fonts/`.
- `DEMO_SCRIPT.md` - what to say on each slide and step, discovery questions, answers to common questions.
- `CALL_KIT.md` - keys, screen share setup, mirroring the real phone with scrcpy, showing the real scale, checklists.
- `SHOT_LIST.md` - recordings and screenshots that would make the kit stronger, in priority order.
- `copy/slides.json` - all deck text. Edit here, then rebuild.
- `copy/BRIEF.md`, `copy/TASK_*.md` - the brief used to draft the copy.
- `assets/phone/` - app screenshots (demo estate). `07_harvest_capture_ready.png` was edited to remove a "Fake scale" label left by test mode.
- `assets/office/` - desktop ERP and owner dashboard screenshots. Bank, account and PF numbers and client estate names are blurred. Keep them blurred.
- `video/build_videos.py` - builds the two WhatsApp walkthrough videos from the phone screenshots.

Built files go to `deliverables/demo-kit/` (not tracked in Git):

- `GardenSuite-Live-Demo.pdf` - leave-behind, one page per slide
- `walkthrough-weighing.mp4` and `walkthrough-attendance.mp4` - silent, captioned, portrait 1080 x 1920, about 40 seconds each

## Rebuild

Run from the repo root.

```
python3 collateral/demo-kit/deck/build.py
node collateral/demo-kit/deck/render.mjs --png scratch/demo-kit/png
python3 collateral/demo-kit/video/build_videos.py
```

`build.py` writes `deck/index.html` from `template.html` and `slides.json`. It stops if the copy contains an em or en dash. `render.mjs` needs Google Chrome and uses Playwright from `gs_landing/node_modules`. The video script needs Pillow and ffmpeg.

The PDF is not made with Chrome print-to-PDF, because that flattens the shadows. `render.mjs` screenshots each slide's print layout (1920 x 1280 pages) and `make_pdf.py` joins the images with Pillow.

## Swapping in new screenshots

Keep the same file name and drop the new file into `assets/phone/` or `assets/office/`, then rebuild. Phone screenshots should be 9:20 (412 x 915 or any multiple). Office and dashboard screens are set in `GALLERY_IMAGES` in `deck/build.py`. Captions for the phone steps live in `copy/slides.json` and are shared by the deck and the videos.
