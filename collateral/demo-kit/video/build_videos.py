"""Build the captioned walkthrough videos from the phone screenshots.

Usage (from repo root): python3 collateral/demo-kit/video/build_videos.py
Output: deliverables/demo-kit/walkthrough-weighing.mp4 and walkthrough-attendance.mp4
Captions come from copy/slides.json so the videos and the deck say the same thing.
"""
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = Path(__file__).resolve().parent
KIT = HERE.parent
REPO = KIT.parent.parent
OUT = REPO / "deliverables" / "demo-kit"
PHONE = KIT / "assets" / "phone"
FONTS = HERE / "fonts"

W, H = 1080, 1920
SURFACE = (250, 250, 247)
GREEN = (27, 94, 59)
GREEN_LIGHT = (221, 239, 228)
INK = (17, 17, 17)
BODY = (63, 63, 70)
MUTED = (107, 114, 128)
BORDER = (228, 228, 231)
BEZEL = (29, 29, 31)

STEP_SECONDS = 3.8
CARD_SECONDS = 3.2
END_SECONDS = 5.0
FADE = 0.4

VIDEOS = {
    "walkthrough-weighing": {
        "kicker": "SMART WEIGHING",
        "title": "How leaf weight reaches the right worker",
        "text": "Face check and Bluetooth scale, one step at the weighing point.",
        "screens": [
            "01_harvest_start_session_ready.png",
            "02_harvest_section_picker.png",
            "03_harvest_activity_picker.png",
            "08_scale_connection_from_harvest.png",
            "04_harvest_active_empty.png",
            "07_harvest_capture_ready.png",
            "09_harvest_result_matched_weight.png",
            "10_harvest_result_scale_connected_save.png",
            "05_harvest_active_records.png",
            "27_sync_status.png",
        ],
    },
    "walkthrough-attendance": {
        "kicker": "FACE ATTENDANCE",
        "title": "How hazira is marked with a face check",
        "text": "Enrol each worker once, then a face check marks attendance.",
        "screens": [
            "23_register_select_worker.png",
            "25_register_capture_ready.png",
            "26_register_review.png",
            "11_attendance_active_session.png",
            "12_attendance_capture_capturing.png",
            "13_attendance_result_matched.png",
            "16_punch_result_clock_in.png",
            "17_punch_result_clock_out.png",
            "27_sync_status.png",
        ],
    },
}

EXTRA_CAPTIONS = {
    "27_sync_status.png": ("Works without internet", "Records stay on the phone and sync when the signal returns."),
}


def font(name, size):
    return ImageFont.truetype(str(FONTS / name), size)


F_KICKER = font("Inter-600.ttf", 30)
F_TITLE = font("PlusJakartaSans-600.ttf", 64)
F_TEXT = font("Inter-400.ttf", 40)
F_SMALL = font("Inter-500.ttf", 30)
F_BRAND = font("Inter-600.ttf", 32)
F_HERO = font("PlusJakartaSans-600.ttf", 84)


def captions():
    data = json.loads((KIT / "copy" / "slides.json").read_text())
    slides = data["slides"] if isinstance(data, dict) else data
    caps = dict(EXTRA_CAPTIONS)
    for s in slides:
        for st in s.get("steps") or []:
            caps.setdefault(st["screen"], (st["title"], st["text"]))
    return caps


def wrap(draw, text, fnt, width):
    lines, line = [], ""
    for word in text.split():
        trial = f"{line} {word}".strip()
        if draw.textlength(trial, font=fnt) <= width:
            line = trial
        else:
            lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def draw_lines(draw, xy, lines, fnt, fill, gap):
    x, y = xy
    for ln in lines:
        draw.text((x, y), ln, font=fnt, fill=fill)
        y += fnt.size + gap
    return y


def kicker(draw, x, y, text):
    # Plain uppercase kicker with letter spacing, no pill background.
    for ch in text:
        draw.text((x, y), ch, font=F_KICKER, fill=GREEN)
        x += draw.textlength(ch, font=F_KICKER) + 3


def footer(img, draw, dark=False):
    icon = Image.open(KIT / "assets" / "img" / "app-icon-512.png").convert("RGBA").resize((56, 56), Image.LANCZOS)
    mask = Image.new("L", icon.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, 55, 55), radius=12, fill=255)
    y = H - 110
    img.paste(icon, (80, y), mask)
    draw.text((152, y + 10), "GardenSuite", font=F_BRAND, fill=(255, 255, 255) if dark else INK)
    bx = 152 + draw.textlength("GardenSuite", font=F_BRAND) + 12
    draw.text((bx, y + 12), "by Sarbani Associates", font=F_SMALL, fill=GREEN_LIGHT if dark else MUTED)


def phone(img, screen_path, top, height):
    shot = Image.open(screen_path).convert("RGB")
    bezel = 18
    sh = height - 2 * bezel
    sw = round(shot.width * sh / shot.height)
    shot = shot.resize((sw, sh), Image.LANCZOS)
    fw, fh = sw + 2 * bezel, height
    x = (W - fw) // 2
    shadow = Image.new("RGBA", (fw + 80, fh + 80), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle((40, 50, fw + 40, fh + 40), radius=56, fill=(0, 0, 0, 22))
    shadow = shadow.filter(ImageFilter.GaussianBlur(14))
    img.paste(shadow, (x - 40, top - 40), shadow)
    frame = Image.new("RGBA", (fw, fh), (0, 0, 0, 0))
    fd = ImageDraw.Draw(frame)
    fd.rounded_rectangle((0, 0, fw - 1, fh - 1), radius=56, fill=BEZEL)
    smask = Image.new("L", (sw, sh), 0)
    ImageDraw.Draw(smask).rounded_rectangle((0, 0, sw - 1, sh - 1), radius=40, fill=255)
    frame.paste(shot, (bezel, bezel), smask)
    img.paste(frame, (x, top), frame)


def step_frame(cfg, i, n, screen, cap):
    img = Image.new("RGB", (W, H), SURFACE)
    d = ImageDraw.Draw(img)
    kicker(d, 80, 96, cfg["kicker"])
    label = f"Step {i} of {n}"
    d.text((W - 80 - d.textlength(label, font=F_SMALL), 94), label, font=F_SMALL, fill=MUTED)
    # Progress bar under the kicker row.
    d.rounded_rectangle((80, 150, W - 80, 156), radius=3, fill=BORDER)
    d.rounded_rectangle((80, 150, 80 + round((W - 160) * i / n), 156), radius=3, fill=GREEN)
    y = draw_lines(d, (80, 196), wrap(d, cap[0], F_TITLE, W - 160), F_TITLE, INK, 10)
    draw_lines(d, (80, y + 14), wrap(d, cap[1], F_TEXT, W - 160), F_TEXT, BODY, 14)
    phone(img, PHONE / screen, 520, 1250)
    footer(img, d)
    return img


def intro_frame(cfg):
    img = Image.new("RGB", (W, H), SURFACE)
    d = ImageDraw.Draw(img)
    kicker(d, 80, 520, cfg["kicker"])
    y = draw_lines(d, (80, 580), wrap(d, cfg["title"], F_HERO, W - 160), F_HERO, INK, 12)
    draw_lines(d, (80, y + 30), wrap(d, cfg["text"], F_TEXT, W - 160), F_TEXT, BODY, 14)
    d.text((80, 1500), "GS Face app on an Android phone.", font=F_SMALL, fill=MUTED)
    d.text((80, 1545), "Screens show a demo estate with sample workers.", font=F_SMALL, fill=MUTED)
    footer(img, d)
    return img


def end_frame():
    img = Image.new("RGB", (W, H), GREEN)
    d = ImageDraw.Draw(img)
    x = 80
    for ch in "NEXT STEP":
        d.text((x, 520), ch, font=F_KICKER, fill=GREEN_LIGHT)
        x += d.textlength(ch, font=F_KICKER) + 3
    y = draw_lines(d, (80, 580), wrap(d, "See it on your own garden", F_HERO, W - 160), F_HERO, (255, 255, 255), 12)
    lines = [
        "Book a field visit, or send one month of records for a Tea Loss Audit.",
    ]
    y = draw_lines(d, (80, y + 30), wrap(d, lines[0], F_TEXT, W - 160), F_TEXT, GREEN_LIGHT, 14)
    y += 60
    for ln in ["Call or WhatsApp +91 97341 01330", "sarbaniassociates@gmail.com", "gardensuite.in"]:
        d.text((80, y), ln, font=F_TEXT, fill=(255, 255, 255))
        y += 64
    footer(img, d, dark=True)
    return img


def encode(frames, out):
    """frames: list of (png_path, seconds). Joins with crossfades."""
    args = ["ffmpeg", "-y", "-loglevel", "error"]
    for p, sec in frames:
        args += ["-loop", "1", "-framerate", "30", "-t", f"{sec:.2f}", "-i", str(p)]
    chains, last, offset = [], "[0:v]", 0.0
    for k in range(1, len(frames)):
        offset += frames[k - 1][1] - FADE
        tag = f"[v{k}]"
        chains.append(f"{last}[{k}:v]xfade=transition=fade:duration={FADE}:offset={offset:.2f}{tag}")
        last = tag
    chains.append(f"{last}format=yuv420p[out]")
    args += ["-filter_complex", ";".join(chains), "-map", "[out]", "-c:v", "libx264", "-preset", "slow",
             "-crf", "22", "-tune", "stillimage", "-movflags", "+faststart", "-r", "30", str(out)]
    subprocess.run(args, check=True)


def main():
    caps = captions()
    OUT.mkdir(parents=True, exist_ok=True)
    tmp = Path(tempfile.mkdtemp(prefix="gs-video-"))
    try:
        end = tmp / "end.png"
        end_frame().save(end)
        for name, cfg in VIDEOS.items():
            frames = []
            intro = tmp / f"{name}-00.png"
            intro_frame(cfg).save(intro)
            frames.append((intro, CARD_SECONDS))
            n = len(cfg["screens"])
            for i, screen in enumerate(cfg["screens"], 1):
                p = tmp / f"{name}-{i:02d}.png"
                step_frame(cfg, i, n, screen, caps[screen]).save(p)
                frames.append((p, STEP_SECONDS))
            frames.append((end, END_SECONDS))
            out = OUT / f"{name}.mp4"
            encode(frames, out)
            if "--frames" in sys.argv:
                keep = REPO / "scratch" / "demo-kit" / "video-frames"
                keep.mkdir(parents=True, exist_ok=True)
                for p, _ in frames:
                    shutil.copy(p, keep / p.name)
            print("wrote", out)
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    main()
