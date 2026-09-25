# ComfyUI promotional video production on the Windows LAN PC

Status: evergreen technical production plan. Preparation and local testing only.
Owner: video engineer, with the creative owner as the approver for anything that leaves the machine.
Machine: the Windows LAN PC with an RTX 3060 12GB and 16GB system RAM.

## What this plan authorizes

- Installing and configuring ComfyUI, Manager, FFmpeg, VideoHelperSuite and Frame-Interpolation on that PC.
- Rendering AI B-roll and still animations locally at 480p.
- Recording and editing the 30-second face-attendance and smart-weighing promo plus its landscape, vertical and captioned cuts.
- Capturing benchmark numbers for every render so later work is comparable.

## What this plan does not authorize

- Publishing any video to a website, YouTube, Meta, LinkedIn or any other public channel.
- Sending any asset to a prospect, agency or platform.
- Claiming a launch date or a campaign schedule. Campaign timing belongs to the campaign owner, not to this file.
- Using AI to draw a product screen, a logo, a word on screen, a client name, a testimonial or any number.

Nothing in this plan is publication approval. Publication needs the creative owner, the product owner and the campaign owner to sign off on the finished cut, the claim sheet and the permission record, following the review workflow in the [Puja video and creative plan](../puja-2026/03-video-and-creative.md).

## Machine baseline

| Item | Requirement | Notes |
| --- | --- | --- |
| GPU | RTX 3060, 12GB VRAM | Enough for Wan2.2 TI2V-5B at 480p with 81 frames or fewer per shot |
| System RAM | 16GB today, 32GB strongly recommended | Test gate in Phase 1 decides when the upgrade is required, not before |
| Disk | SSD with at least 150GB free, 300GB preferred | Models, frame sequences and rejected takes accumulate quickly. A spinning disk will make every load slow |
| GPU driver | Current NVIDIA Studio driver | Install the current Studio branch and reboot before testing |
| Pagefile | System managed on the SSD with at least 32GB available | If Windows does not grow it reliably, use a fixed 32 to 48GB pagefile for the first benchmark |
| Network | Wired LAN, fixed DHCP reservation for the PC | Needed for the direct LAN firewall rule in the security section |

Do not pin exact version numbers for ComfyUI, Manager or the custom nodes in this file. Those projects ship fixes quickly. Before each phase, read the current upstream release notes and security advisories and install the current release that carries the fixes you need.

## Required software

| Package | Why | Install when |
| --- | --- | --- |
| ComfyUI desktop or manual clone | Render host | Phase 1 |
| ComfyUI-Manager | Node install and update from the UI | Phase 1 |
| ComfyUI-VideoHelperSuite | Load, combine, save and preview video clips | Phase 1 |
| ComfyUI-Frame-Interpolation | Extend frame count and raise apparent smoothness | Phase 1, only if the 16GB test gate needs it |
| FFmpeg on PATH | Frame extraction, muxing, audio, final cut and all H.264 output | Phase 1 |
| ffmpeg PATH check | `ffmpeg -version` must work in a plain terminal | Phase 1 acceptance |

Optional, later, only after the first promo is approved: ComfyUI-GGUF for an experimental quantized-model test, and MuseTalk for lip sync if a recorded human voice track needs a matching mouth. GGUF suitability for this video workload is unverified on this machine. Neither package is a Phase 1 dependency. Do not install either until the first cut is approved.

## Model choice

| Model | Use | Notes |
| --- | --- | --- |
| Wan2.2 TI2V-5B | Primary. All B-roll and still animation | Image plus text to video. 480p first. 3 to 5 second shots |
| Wan2.1 1.3B | Prompt testing only | Cheap and fast. Use it to lock wording and composition before spending 5B time |

Rules for every generation:

- Start at 480p. Compare one approved shot at 480p and 720p before choosing the final B-roll resolution. Do not assume a 480p shot will survive a vertical crop and upscale.
- 81 frames at 16fps is 5 seconds. 49 frames at 16fps is 3 seconds. Do not exceed 81 frames per shot.
- Hold one camera idea per shot. A shot that cuts between two subjects mid-generation will not hold together.
- Generate 3 to 5 candidates per shot and pick one. Record which one and why in the shot log.
- Anything with a person, a hand, a face, a screen or readable text is out of scope for AI. Use a real recording instead. See the production method section.
- Never prompt for a GardenSuite logo, wordmark, button label, or estate name. The AI cannot reproduce them correctly and a wrong logo is a rejection.

## Security: do not expose port 8188 to the internet

ComfyUI on port 8188 can execute arbitrary model and node code and can read local files through crafted workflows. Never port forward it, never place it behind a public tunnel, and never leave it open on a router.

Preferred path, SSH tunnel only:

1. Bind ComfyUI to loopback only. In `ComfyUI/user/default/ComfyUI-Extra-Config.yaml` set `listen: 127.0.0.1` or start the host with `--listen 127.0.0.1`. Do not set `--listen 0.0.0.0`.
2. Install and enable Windows OpenSSH Server if it is not already running.
3. Restrict the Windows Firewall inbound rule for TCP 22 to the developer machine's IP on the Private profile.
4. From the developer machine run `ssh -L 8188:127.0.0.1:8188 <user>@<pc-ip>`.
5. Open `http://127.0.0.1:8188` on the developer machine. Port 8188 needs no inbound firewall exception.

Only if the team wants a second machine on the LAN to reach the ComfyUI UI directly:

1. Give the PC a fixed IP through a DHCP reservation on the router.
2. Change ComfyUI from loopback to that specific LAN address with `--listen <pc-lan-ip>`. Do not bind it to every interface.
3. Add a Windows Firewall inbound rule for TCP 8188 with the remote address set to that single client machine's IP, and keep the rule on the Private profile.
4. Confirm a different LAN machine cannot connect, then confirm the approved client can connect.
5. Leave router port forwarding off.

Record which mode is active. Repeat the firewall and router checks after every listen-address change.

Install custom nodes only from their known upstream repositories. Do not install a missing node from a shared workflow prompt or an unknown fork. Record the repository and commit used, review updates before applying them, and do not update ComfyUI or nodes during a render batch.

Any other setup is rejected. If someone asks for a public URL, point them at a hosted queue or a remote desktop session, not an open ComfyUI port.

## Production method

The split is the rule that keeps these videos honest.

| Shot type | Source | Notes |
| --- | --- | --- |
| Garden, field, tea bushes, leaf baskets, empty paths | AI, from `Wan2.2 TI2V-5B` | No identifiable estate, person, company signboard or readable text |
| Scale, weighing station, empty device close-ups | AI, or a real recording if the device must be identified | AI versions of a specific product device are not allowed |
| App screen, attendance screen, sync status, MIS dashboard, payroll report | Real screen recording or existing screenshot | Never AI. Every frame must match the current build |
| Voiceover | Human voice | One person, recorded in a quiet room. A human voice carries more trust than a synthetic one for a first estate conversation |
| Music and sound bed | Licensed or commissioned | Record the license. No random web tracks |
| On-screen text, captions, brand card | Added in the editor | Added after generation, never prompted |

Assembly is deterministic. Render every AI shot separately with a fixed seed, save each approved take as a discrete file, and build the final cut in the editor from approved files only. That way a re-render never silently changes the published cut, and any reviewer can name the exact take in every frame.

## Existing assets to reuse

Check each file and the current product build before use. These are starting points, not permissions.

| Asset | Use |
| --- | --- |
| `assets/source/videos/enroll-face-silent.mp4` | Enrolment source only if it matches the current build and shows a fictional face or a person with written permission |
| `assets/source/videos/start-session-silent.mp4` | Start-session source only if it matches the current build and passes the privacy review |
| `gs_landing/static/screenshots/` | Attendance result, active session, sync status and related UI frames |
| `gs_landing/static/erp/` | Dashboard, factory, mobile, payroll and stores modules |
| `collateral/brochures/2026-executive-brochure/assets/` | Clean module captures such as `clean_scale_weighing.png`, `clean_face_attendance.png` |
| `assets/brand/gardensuite/` | Logos, tokens, guidelines and web assets for the closing brand card |
| `assets/brand/gardensuite/guidelines/quick-start.md` | Primary brand guidance for typography, logo use and the closing card |
| `docs/website/DESIGN.md` | Colour, type and motion tokens to adapt for video. It does not define video caption safe areas |

Both silent videos need an audio decision before they can be used. Either keep them silent and lay the voice track over them, or record room tone. Do not leave a silent clip with a hard cut and no audio bed in the master.

## First deliverable: 30-second face-attendance and smart-weighing promo

One 30-second master in 16:9 at 1920x1080 or 1280x720 depending on what the real screen recordings support. Do not upscale a low resolution screen capture. Derived from the master: a 9:16 vertical cut at 1080x1920, and a captioned version with burned-in captions plus an SRT file.

Storyboard, 0 to 30 seconds:

| Time | Visual | Source | Voice line, draft | Proof needed |
| --- | --- | --- | --- | --- |
| 0-04s | Morning in a tea garden, wide shot, no faces | AI | `Plucking starts early. Recording it should not stop the day.` | No identifiable estate |
| 04-10s | Real face-check workflow using a fictional person or a person with written permission | Real recording | `Face attendance checks the worker before recording hazira. It helps stop proxy attendance.` | Product owner confirms the wording and current build |
| 10-16s | Real screen capture, enrolment then attendance result | Real recording | `The phone records the worker, the section and the work.` | Fictional or permitted worker record |
| 16-22s | Weighing station with a leaf basket on the scale | Real recording or AI of a generic station | `The smart scale links leaf weight to the same verified worker.` | Product owner confirms the current weighing flow |
| 22-27s | Office screen, daily view, then sync status | Real recording | `The office sees the day's record. If the network was down, it syncs later.` | Do not claim live dashboards |
| 27-30s | Sarbani Associates brand card and CTA | Editor | `GardenSuite by Sarbani Associates. Book Free Demo.` | Brand card from `assets/brand/gardensuite/` |

Claim rules for this master, and for every cut taken from it:

- Say `helps stop proxy attendance`. Never `stops proxy attendance`.
- Do not claim a percentage saving, a time saving, a rupee figure, a match accuracy rate or a live dashboard.
- Do not show a real worker face, a real payroll figure, a client name, a client dashboard or a testimonial.
- Keep the Sarbani Associates name in the brand card and in the caption file.
- Simple English. No em dashes anywhere in the script, the captions or this plan.

## Automation: ComfyUI API

The render host is scriptable so shots are reproducible. Use the built-in HTTP and WebSocket API on 8188, reached through the SSH tunnel or the restricted LAN address, never the open internet.

| Endpoint | Use |
| --- | --- |
| `POST /prompt` | Submit an exported API-format workflow |
| `GET /ws?clientId=...` | Stream execution progress and node status |
| `GET /history/{prompt_id}` | Read the finished job, its outputs and its recorded parameters |
| `GET /view` | Fetch generated images and video previews |
| `POST /interrupt` | Stop the running job |
| `GET /queue` and `POST /queue` | Inspect and clear the pending queue |

How it is used:

1. Build the workflow in the ComfyUI UI, confirm it runs, then use `Save (API Format)` to export it as JSON into `video-production/comfy/workflows/`.
2. The render script in `video-production/scripts/` submits that JSON, streams progress over the WebSocket, then pulls the output through `/view` and writes a sidecar JSON with the same fields as the benchmark record.
3. Every render writes a sidecar next to the video: `render.json`. That file is the benchmark record and the reproduction recipe.
4. Each workflow JSON file name carries the model, dimensions and frame count, for example `wan22_ti2v_5b_480p_81f_16fps.json`.

Do not build a scheduler, a web UI or a multi-tenant queue. One machine, one engineer, a JSON file and a script is the whole system.

## Working repository layout under `video-production/`

Create this working structure in Phase 1 before exporting a workflow or recording a gate. Large media and model files stay outside Git.

```text
video-production/
  README.md                     # how to run a render, how to read a benchmark
  requirements.txt              # python deps for the render script
  comfy/
    workflows/                  # API-format workflow exports, named by model and frame count
    benchmarks/                 # one CSV or JSONL row per render
  scripts/
    render.py                   # submit, stream, fetch, write render.json
    bench.py                    # aggregate benchmarks into the table format
    assemble.sh                 # ffmpeg build of the master from approved takes
  assets/
    ai-broll/                   # generated takes, named by shot id
    recordings/                 # real screen and device recordings
    audio/                      # voiceover, music, room tone
  output/
    master/ vertical/ captioned/ exported/
  shot-log.csv                  # shot id, prompt, seed, workflow file, selected take, review notes
```

The repository holds the workflows, the scripts, the shot log and the benchmark data. Large video files and model checkpoints stay on the PC's SSD. Push the repository folder, not the renders.

## Phases

Each phase has an owner, an entry gate, exit criteria and a stop rule. A phase starts only after its listed dependency gate is recorded in `video-production/shot-log.csv`, the benchmark data or the decision log. Phases that list only Phase 0 may run in parallel.

### Phase 0. Facts and decisions

Owner: video engineer, with the creative owner.

Entry: this plan accepted.

Work: collect the answers in the decision and input checklist at the end of this file. Record each answer in `docs/plans/comfyui-promo-video/DECISIONS.md` with the date and the person who answered.

Exit criteria:
- Every blocking question in the checklist is answered, or explicitly deferred with a named owner.
- The creative owner confirms the 30-second storyboard in the first deliverable section, or replaces it.
- The campaign owner confirms in writing that this file is not publication authority.

Stop rule: if the creative owner cannot approve the storyboard, do not install anything.

### Phase 1. Machine and software setup, including the 16GB gate

Owner: video engineer.
Depends on: Phase 0.

Work:
1. Install the current NVIDIA Studio driver and reboot.
2. Set a system managed pagefile on the SSD with at least 32GB available. If Windows does not grow it reliably, use a fixed 32 to 48GB pagefile for the benchmark.
3. Create the `video-production/` working tree, `shot-log.csv` and benchmark JSONL or CSV before the first workflow export.
4. Install ComfyUI and ComfyUI-Manager. Install custom nodes only from the recorded upstream repositories.
5. Choose and record one access mode. For the preferred mode, bind ComfyUI to `127.0.0.1`, enable Windows OpenSSH Server, restrict TCP 22 to the developer machine's IP and confirm the UI loads through the SSH tunnel. For direct LAN mode, follow the specific-address and source-IP firewall procedure above.
6. Install FFmpeg and confirm `ffmpeg -version` works in a plain terminal.
7. Install ComfyUI-VideoHelperSuite and ComfyUI-Frame-Interpolation.
8. Add the 32GB RAM upgrade decision gate below.
9. Download the Wan2.2 TI2V-5B and Wan2.1 1.3B checkpoints to a fixed model folder.
10. Confirm the router has no port forward for 8188. Confirm the Windows Firewall has no broad 8188 rule. Re-test reachability according to the chosen access mode.

RAM test gate. Run one 5B benchmark render on the current 16GB machine before ordering RAM:
- Run Wan2.2 TI2V-5B at 480p, 81 frames, 24 steps, seed fixed, on the 16GB configuration.
- If it completes twice, physical RAM stays below 90%, the SSD is not pinned by paging for most of the run and the desktop remains responsive, hold off on the upgrade and record the numbers.
- If it fails, crashes the process, drives physical RAM to 90% or more, keeps the SSD busy with paging, or makes the desktop unresponsive, the 32GB upgrade becomes required before the next phase. The upgrade is still the better buy, because it also protects against a second ComfyUI process during editing.

Exit criteria:
- The chosen access mode is recorded and its firewall tests pass. Tunnel mode exposes no LAN listener on 8188. Direct LAN mode accepts only the approved client IP.
- The working tree, shot log and benchmark store exist.
- A 49 frame 1.3B render completes and saves a playable file.
- A 81 frame 5B render completes, or the RAM gate is formally recorded as blocking.
- Benchmark rows exist for both.

Stop rule: in tunnel mode, any direct LAN or internet reachability on 8188 stops the work. In direct LAN mode, reachability from any address except the approved client stops the work.

### Phase 2. B-roll look development and benchmark baseline

Owner: video engineer, reviewed by the creative owner.
Depends on: Phase 1 exit.

Work: render a fixed benchmark pack of 6 shots with `Wan2.2 TI2V-5B` at 480p:
1. Tea garden wide, early light, no people.
2. Plucked leaf in a basket, close, no hands with identifiable features.
3. Path between bushes, slow camera move.
4. Section boundary marker with no readable sign.
5. Dew on leaves, static camera.
6. Leaf tipping into a generic weighing pan, no branded device.

Then repeat the same 6 prompts on `Wan2.1 1.3B` to check whether the prompt wording holds. Use the 1.3B result to fix the prompt, then render the final set on 5B.

For one approved 5B shot, render a 49-frame 480p and 49-frame 720p A-B using the same prompt, seed and settings where supported. Compare render time, memory, crop quality and visible detail in both landscape and vertical layouts. If 720p does not fit or does not improve the final crop, keep 480p for that shot. If a 480p vertical crop looks soft, replace the shot with real or licensed footage rather than hiding it with sharpening.

Exit criteria:
- 6 approved 5B takes, each 3 to 5 seconds, 480p, playable.
- A benchmark row for every render.
- The creative owner approves the look on a phone screen, not only on the monitor.

Stop rule: if the look fails review after two prompt revisions, change the model or the shot idea, not the review standard.

### Phase 3. Real product recordings

Owner: video engineer and product owner together, on a test device with a fictional account.
Depends on: Phase 0 exit only. Run it in parallel with Phase 2.
This phase is not AI work. It is the most important phase for credibility.

Work: record the real screens the promo will show.
- Face check and attendance result.
- Enrolment, from `enroll-face-silent.mp4` only if it matches the current build and shows a fictional face or a person with written permission, otherwise a fresh recording.
- Start session, from `start-session-silent.mp4` on the same condition.
- Section and work context.
- Smart scale weighing link.
- Sync status after a deliberate offline capture.
- Office daily view.

Recording rules:
- Use a fictional worker master. No real worker name, muster roll number, face or wage figure anywhere in frame.
- Clear notifications, disable personal accounts, use a clean device wallpaper, check the recent-apps switcher and the taskbar before every take.
- Record at the highest resolution and frame rate the device supports, with no upscaling in post.
- Capture audio room tone even if the take is planned as silent, so an edit can bridge cuts.

Exit criteria:
- Every screen shown in the storyboard exists as a recorded take, matched to the current product build.
- A product owner sign-off per screen, recorded in the shot log.
- No private data in any frame, confirmed by a second reviewer.

Stop rule: a screen that cannot be shown without private data is cut from the video, not blurred into ambiguity.

### Phase 4. Voiceover and audio

Owner: creative owner, with the video engineer recording.
Depends on: Phase 0 script approval, can run in parallel with Phases 2 and 3.

Work: record the 30-second voiceover with a human voice. Two takes per line. Keep the room quiet, keep the mic close, and keep the speaker's natural pace. Tea garden workers are not always fluent in English, so every line must be understandable in one reading.

Exit criteria:
- A clean voice track with no clipping, no background hum and no music bleed.
- A written script matching the track word for word, checked for the claim rules.
- A licensed or commissioned music bed, with the license filed.

Stop rule: if a line cannot be said without an unsupported claim, the line changes, not the claim standard.

### Phase 5. Edit and assemble the master

Owner: video engineer.
Depends on: Phases 2, 3 and 4 exit.

Work:
1. Lay the 30-second master against the storyboard, one approved take per shot.
2. Add the real screen recordings over the AI b-roll at the right beats.
3. Add the voice track, then music at a level that does not fight the voice.
4. Build the brand card from `assets/brand/gardensuite/`, following its quick-start guidance and adapting colour, type and motion tokens from `docs/website/DESIGN.md`. No AI logo. No AI text.
5. Export the 16:9 master, the 9:16 vertical cut and the captioned cut with an SRT file.
6. Preview the 1080x1920 file in 375 CSS-pixel and 768 CSS-pixel viewports. Keep captions inside the platform safe area and use at least 48 output pixels for the main caption text at 1080x1920, increasing it when phone review shows strain.

Exit criteria:
- Master, vertical and captioned cuts exist and play end to end.
- Captions cover every spoken line and are readable without sound.
- Voice, music and captions are in sync at the end card.
- The cut contains no em dash, no unsupported number and no word the simple English test would fail.

Stop rule: if the cut cannot be explained by naming an approved file for every frame, it is not ready.

### Phase 6. Package and hand off for review

Owner: video engineer, hands to the creative owner.
Depends on: Phase 5 exit.

Work: package each deliverable in the Phase 1 `video-production/` tree with its claim sheet, permission record, transcript, caption file, thumbnail and the list of approved source takes. Do not upload, post or send anything. Treat the 30-second cut as a non-campaign working master until the campaign owner assigns an asset ID. It cannot enter a campaign register or campaign file-naming scheme without that ID.

Exit criteria:
- A review packet exists per deliverable, following the asset register fields in the Puja video plan.
- The packet names every approval still missing.
- Status is set to `Blocked` or `Ready`, never `Approved`, by the video engineer.

Stop rule: publication authority is not created by packaging. The packet goes to the creative owner, the product owner, the privacy owner and the campaign owner.

## Benchmark record

Capture one row per render. Without these numbers, later tuning is guesswork.

| Field | Example or format | Note |
| --- | --- | --- |
| `run_id` | `20260910-001` | Unique per render |
| `date_time` | ISO 8601 local | |
| `machine` | Windows LAN PC | Name the machine, not just the GPU |
| `comfyui_version` | tag or commit | Do not guess, read it from the install |
| `manager_version` | tag or commit | |
| `node_versions` | VHS and Frame-Interpolation tags | |
| `workflow_file` | `wan22_ti2v_5b_480p_81f_16fps.json` | The exported API workflow |
| `model` | `Wan2.2 TI2V-5B` | Include the checkpoint file name |
| `vae` and `text_encoder` | file names | These change results, record them |
| `scheduler` | name and any non-default settings | |
| `width` x `height` | `832 x 480` | |
| `frames` | `81` | |
| `fps` | `16` | |
| `steps` | `24` | |
| `cfg` | number | |
| `shift` | number if used | |
| `seed` | integer | Required for reproduction |
| `batch_size` | `1` | |
| `precision` | fp16, fp8 or bf16 | |
| `vram_offload` | on or off | |
| `render_time_sec` | seconds, model load to file written | |
| `peak_vram_mb` | from `nvidia-smi` sampling | |
| `peak_committed_ram_gb` | from Task Manager, commit peak | The number that decides the RAM upgrade |
| `pagefile_used` | yes or no, peak if yes | |
| `output_file` | path relative to the output folder | |
| `output_size_mb` | megabytes | |
| `result` | `pass` or `fail` | Pass means it played, matched the shot intent and passed the privacy check |
| `review_notes` | short text | Why it passed or failed |
| `reviewer` | person role | |

`fail` rows are kept, not deleted. A failed render with full numbers is worth more than a passing render with none.

## Tests

| Test | Method | Pass condition |
| --- | --- | --- |
| Tunnel mode exposure | From another LAN machine, try `http://<pc-lan-ip>:8188`; inspect router forwarding | Connection refused and no 8188 port-forward rule. Mark not applicable when direct LAN mode is approved |
| Direct LAN restriction | From both the approved and a non-allowed LAN machine, try the direct IP | Approved client connects, other client is blocked. Mark not applicable in tunnel mode |
| Driver and VRAM | `nvidia-smi` before and during a render | 12GB reported, no driver warning |
| 1.3B smoke test | 49 frames, 24 steps, seed 1 | Plays, correct length |
| 5B benchmark | 81 frames, 24 steps, seed 1 | Plays, correct length, benchmark row filled |
| Determinism | Rerun the 5B benchmark with the same seed and settings | Same or near-identical output |
| Frame interpolation | Double the frame count of an approved take | No visible artefact, no doubled subject |
| FFmpeg assembly | Build the master from takes with `assemble.sh` | Master length 30s plus or minus 0.3s, audio and video in sync |
| Caption sync | Play muted on a phone | Every spoken line is readable and in time |
| Vertical safe area | Check the 9:16 cut on a 375px phone | No text under the platform UI, nothing cropped |
| Privacy sweep | Second reviewer scans every frame at full speed, then frame by frame | No face, name, muster roll number, wage, client dashboard or notification |
| Claims sweep | Read the script and captions against the claim rules | No unsupported number, no `stops proxy attendance`, no em dash |
| Rights sweep | Check music, font and stock licenses | Every license recorded |

## Risks

| Risk | Effect | Response |
| --- | --- | --- |
| 16GB RAM causes a failed first render or heavy paging | Lost time at the first real run | Phase 1 gate decides the upgrade with numbers, not guesswork |
| Model fits at 480p but not at 720p | A vertical crop looks soft | Use the measured 480p result only if it passes phone review. Otherwise replace the shot with real or licensed footage |
| AI b-roll drifts into showing a real estate or a logo | Legal and trust problem | No readable signage, no brand names in prompts, review every take frame by frame |
| AI artifacts in hands or faces | Viewers stop trusting the whole video | Keep hands and faces out of AI shots, use real footage for people |
| ComfyUI exposed on the network | Remote code execution on the LAN PC | Loopback bind plus SSH tunnel, firewall source-IP restriction, no port forwarding |
| Node update breaks a working workflow | Renders stop mid-campaign | One tested workflow JSON per shot type, keep the last known good version pinned locally, re-verify after every update |
| Silent source videos do not match the current build | The promo shows a retired screen | Re-record instead of cutting around it, per the Phase 3 rule |
| Voiceover sounds like a machine or a native English ad | Tea garden owners do not trust it | Human voice, local reviewer for pronunciation of `hazira` and `GS Face` |
| 30-second cut gets stretched into a longer promise | Unsupported claim at the end card | The end card says only what the product does today |
| Benchmark data not captured | Later tuning is blind | `render.json` is written by the script, not by hand |

## Rollback and stop rules

Stop immediately and record the asset ID, the reason, the owner and the restart evidence when any of these happen:

- Port 8188 is reachable by any address that the selected tunnel or direct-LAN mode does not allow.
- A real worker face, worker name, muster roll number, wage figure, client name, client dashboard or personal notification appears in any frame.
- A client, worker or third party has not given written permission for what is shown.
- A spoken line or caption makes a claim that the product owner cannot verify.
- A custom node update or a ComfyUI update breaks a previously working workflow and the cause is not identified.
- A render needs more VRAM than the card has and cannot be made to fit by lowering frames, steps or resolution.
- Pagefile use makes a render fail twice in a row. Stop and do the RAM upgrade.
- The creative owner, product owner or privacy owner rejects the cut.

Rollback actions, in order:
1. Stop the running job through `/interrupt` and clear the queue.
2. Move the rejected output out of the master folder so it cannot be picked up by the next assembly.
3. Keep the rejected file and its `render.json` for the record.
4. Return the cut to the phase that failed, not to the start of the plan.

Model and node changes are reversible by keeping the last known good checkpoint files and a known good workflow export. Nothing in this plan modifies GardenSuite product code or any customer data.

## Decision and input checklist

Facts still needed before Phase 1 can be called done. Mark each with an answer, an owner and a date in `docs/plans/comfyui-promo-video/DECISIONS.md`.

Machine questions:
- [ ] Exact CPU model and core count, and whether the PSU and case have headroom for a 32GB kit.
- [ ] SSD free space and whether any model will sit on a spinning disk.
- [ ] Windows edition, and whether the LAN profile is set to Private.
- [ ] Router model, and whether a DHCP reservation can be created for the PC.
- [ ] Whether a wired LAN connection exists, or only Wi-Fi.
- [ ] Current driver branch and version, read from the machine.
- [ ] Current RAM speed and slot layout, to pick a compatible 32GB kit.
- [ ] Whether Windows OpenSSH Server is installed and running, and which developer-machine IP may reach TCP 22.
- [ ] Whether a second person on the LAN needs the ComfyUI UI, which decides tunnel only versus the restricted firewall rule.

Campaign and creative questions:
- [ ] Who records the voiceover, and whether the voice is a real person the prospect could meet.
- [ ] Which regional language captions are needed, and who reviews them.
- [ ] Whether the 30-second storyboard above is approved as written.
- [ ] Whether the 9:16 vertical cut is needed before the 16:9 master is approved.
- [ ] Whether the demo account may show a section name, or must show a generic one.
- [ ] Which product build the screen recordings must match, and where that build number is recorded.
- [ ] Whether any existing client has agreed in writing to appear or be named. Default is no.
- [ ] Where the finished files are stored after review, and who may download them.
- [ ] What the CTA is for this cut. Default is `Book Free Demo` until the campaign owner says otherwise.
- [ ] Whether `GS Face` is an approved public product name for this cut. If not, use `GardenSuite face attendance`.

Technical questions:
- [ ] Whether ComfyUI runs desktop or manual, and where checkpoints live.
- [ ] Whether ModelScope or Hugging Face is reachable from the PC for checkpoint download, and the download size.
- [ ] Whether the pagefile is on the SSD and system managed.
- [ ] Which ffmpeg build is installed, and whether it has libx264 and AAC.
- [ ] Whether the render script runs on the PC or on a developer machine that tunnels in. This decides where the output files land.
- [ ] Whether the creative owner accepts 480p b-roll, or whether specific shots must reach 720p.

## Related documents

- [Puja 2026 video and creative plan](../puja-2026/03-video-and-creative.md) is the campaign-specific guidance for asset IDs, storyboards, captions, permissions, review workflow, stop rules and file naming. Use it for anything dated or campaign-bound.
- [Puja 2026 README](../puja-2026/README.md) for the campaign overlay and its decision log.
- [GardenSuite brand quick start](../../../assets/brand/gardensuite/guidelines/quick-start.md) for logo and typography guidance, with [website design tokens](../../website/DESIGN.md) as the colour, type and motion reference to adapt for video.
- [Product and messaging](../../../product.md) for approved wording and proof.
