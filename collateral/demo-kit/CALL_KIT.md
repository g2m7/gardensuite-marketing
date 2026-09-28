# Demo Call Kit - Setup Guide

This guide tells you how to set up and run a live demo call with the kit. Read it once before your first call, and use the pre-call checklist every time.

## 1. Kit contents

Everything lives in two folders.

In `collateral/demo-kit/`:

- `deck/index.html` - the presenter deck (HTML slides, one key press per step)
- `DEMO_SCRIPT.md` - the talk track, slide by slide
- `CALL_KIT.md` - this file
- `SHOT_LIST.md` - recordings to capture later to make the kit stronger
- `README.md` - how to rebuild the deck, PDF and videos after changing text or screenshots

In `deliverables/demo-kit/`:

- `GardenSuite-Live-Demo.pdf` - the leave-behind you send after the call
- `walkthrough-weighing.mp4` - short silent video with captions, for WhatsApp
- `walkthrough-attendance.mp4` - short silent video with captions, for WhatsApp

## 2. Open the deck

Open `collateral/demo-kit/deck/index.html` in Chrome. It works fully offline.

Keys:

- Right arrow or Space: next step
- Left arrow: go back one step
- Z: fill the screen with the current phone or office screen. Press Z or Esc to return. Arrow keys keep working while zoomed. You can also click the phone or monitor.
- F: full screen
- P: step through the current slide automatically, one step every 4 seconds. Press P again to stop.
- S or N: open the presenter notes in a separate window (allow pop-ups for the file the first time). Keep that window on your own screen. It is not shared if you share only the deck tab.
- Type a slide number, then Enter: jump to that slide
- Home or End: first or last slide

To start a call on a given step, add it to the address. For example `index.html#s08.2` opens slide 8 at step 2.

To show the estate name on the title slide, add it to the URL:

```
collateral/demo-kit/deck/index.html?estate=Estate%20Name
```

Replace `Estate%20Name` with the real name (use `%20` for spaces).

## 3. Screen share settings

- Share one Chrome tab, not the whole screen. This keeps notifications and the notes window private.
- The walkthrough videos have no sound, so tab audio is not needed.
- Close all other tabs before the call.
- Set the laptop to Do Not Disturb.
- Press F for full screen. The deck scales to any screen size and keeps the 16:9 shape.
- If the other person joins from a phone, press Z on every phone and office screen. Small text is hard to read on a phone.
- Do one test call on a second device (phone or another laptop) before your first real call.

## 4. Showing the real phone (optional, after the deck)

If the prospect wants to see the live app, mirror the Android phone to the laptop with scrcpy. It is free and open source. You need a USB cable and USB debugging turned on in the phone's developer options.

Install:

- Mac: `brew install scrcpy` and `brew install --cask android-platform-tools` (the second one gives you `adb`)
- Windows: download the release zip from the official GitHub page (Genymobile/scrcpy). `adb` is already inside the zip.

Connect the phone by USB, accept the "Allow USB debugging" prompt on the phone, then run:

```
scrcpy --max-size 1080 --stay-awake --window-title "GardenSuite app"
```

Share that window in the call. When you share a window instead of the tab, the call switches away from the deck, so switch back to the deck tab when you finish.

Use a demo estate with sample workers only. Never show real worker faces or wages without the estate's written permission.

## 5. Showing the real scale (optional)

Keep this short, under 2 minutes. The deck already carries the explanation.

- A second phone joins the call as a camera, fixed on a stand.
- Point it at the scale display and the demo phone in one frame.
- Hang a leaf bag or a known weight on the scale.
- Read the number on the scale display out loud, then point to the same number on the phone.
- Use the real Bluetooth scale. If the app has a fake scale or test mode, turn it off before the call. The status line must say "Scale connected" with no "Fake" label.

## 6. Pre-call checklist

- [ ] Deck opens in Chrome with no errors
- [ ] Estate name set in the deck URL
- [ ] Walkthrough videos ready on phone for WhatsApp
- [ ] Leave-behind PDF ready to send
- [ ] Discovery questions printed
- [ ] Charger connected
- [ ] Internet backup ready (phone hotspot)
- [ ] Calendar link sent and confirmed
- [ ] Notes of what the prospect said in earlier contact
- [ ] Notifications muted on laptop and phone
- [ ] Demo phone charged and on demo data
- [ ] Scale charged and paired with the demo phone
- [ ] Fake scale or test mode turned off in the app

## 7. Poor connection plan

If the prospect's video keeps breaking or the share is too slow:

1. Stop the screen share.
2. Send the PDF on WhatsApp.
3. Walk through it page by page on a voice call, using the slide numbers from the deck. The PDF follows the same order, so "page 4" means "slide 4".

The call still works on a plain phone call and WhatsApp. Do not cancel, switch to the PDF.

## 8. After the call

Within 1 hour, send on WhatsApp or email:

- A short thank-you message
- The PDF (`GardenSuite-Live-Demo.pdf`)
- The two walkthrough videos
- The proposed next step with two date options

Copy this message and edit the name:

> Thank you for your time today, [name]. As promised, here is the demo PDF and two short videos of the weighing and attendance steps in the field. If you want to see this on your own garden, we can visit, or start with a Tea Loss Audit on one month of your records. Would Tuesday or Thursday suit you? Sarbani Associates, +91 97341 01330.

No attachments other than those three files. Keep the tone plain, no pushy lines.

Then record the call outcome against the estate account in the tracker, at pipeline stage `Demo or visit`.

## 9. Privacy rules

- Never show real client names.
- Never show worker faces, wages or garden data from another estate.
- Demo data only, on every screen and every device.
- Get written permission before you show anything from a real estate, even a happy one.
- The office screenshots in the deck have bank, account and PF details blurred on purpose. Do not replace them with unblurred copies.
