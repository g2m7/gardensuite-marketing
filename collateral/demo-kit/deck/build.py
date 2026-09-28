#!/usr/bin/env python3
"""Build the GardenSuite live demo deck.

Reads copy/slides.json and writes deck/index.html (a single self-contained
presentation that references ../assets). Run: python3 build.py
"""

import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
KIT = ROOT.parent
COPY = json.loads((KIT / "copy" / "slides.json").read_text())

PHONE = "../assets/phone/"
OFFICE = "../assets/office/"
IMG = "../assets/img/"

GALLERY_IMAGES = {
    "s15": ["entry-screen.jpg", "wages-register-redacted.jpg", "labour-deployment-redacted.jpg", "payslips-redacted.jpg"],
    "s16": ["owner-dashboard.jpg", "owner-kamjari.jpg", "owner-wages-summary.jpg"],
}
PROBLEM_IMAGES = ["problem-proxy-attendance.jpg", "problem-loose-chits.jpg", "problem-payroll-doubts.jpg"]

# Highlight boxes drawn over phone screenshots, in native 412x915 pixel space.
FOCUS = {
    "01_harvest_start_session_ready.png": (16, 220, 380, 420),
    "07_harvest_capture_ready.png": (14, 168, 384, 58),
    "08_scale_connection_from_harvest.png": (14, 280, 384, 80),
    "04_harvest_active_empty.png": (120, 94, 172, 46),
    "09_harvest_result_matched_weight.png": (20, 350, 372, 200),
    "10_harvest_result_scale_connected_save.png": (16, 818, 380, 60),
    "05_harvest_active_records.png": (18, 740, 376, 160),
    "13_attendance_result_matched.png": (20, 250, 372, 280),
    "16_punch_result_clock_in.png": (20, 296, 372, 72),
    "17_punch_result_clock_out.png": (20, 296, 372, 72),
    "26_register_review.png": (14, 110, 384, 480),
    "27_sync_status.png": (14, 60, 384, 300),
    "19_reports_worker_search.png": (16, 290, 380, 190),
}

ICON_PATHS = {
    "face": '<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><circle cx="9.5" cy="10" r=".6" fill="currentColor"/><circle cx="14.5" cy="10" r=".6" fill="currentColor"/><path d="M9 14.5a4 4 0 0 0 6 0"/>',
    "scale": '<path d="M12 3v3M8 6h8l1 3H7l1-3Z"/><rect x="6" y="9" width="12" height="7" rx="1.5"/><path d="M10 12.5h4M12 16v2M9.5 21h5a2.5 2.5 0 0 0-5 0Z"/>',
    "phone": '<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18.5h2"/>',
    "sync": '<path d="M20 12a8 8 0 0 1-14 5.3M4 12a8 8 0 0 1 14-5.3"/><path d="M18 3v4h-4M6 21v-4h4"/>',
    "review": '<rect x="5" y="3.5" width="14" height="17" rx="1.5"/><path d="M9 3.5h6v2.5H9zM8.5 11l2 2 4-4M8.5 16.5h7"/>',
    "wages": '<rect x="3" y="6" width="18" height="12" rx="1.5"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9v.01M18 15v.01"/>',
    "chart": '<path d="M4 20h16M6 16v-4M10 16V8M14 16v-6M18 16V5"/>',
    "user": '<circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/>',
    "wifi-off": '<path d="M3 3l18 18M8.5 12.5a5 5 0 0 1 3.5-1.5M5 9a10 10 0 0 1 4-2.3M19 9a10 10 0 0 0-5.6-2.9M12 18.5v.01"/>',
    "warn": '<path d="M12 4 2.8 19.5h18.4L12 4Z"/><path d="M12 10v4.5M12 17v.01"/>',
    "check": '<circle cx="12" cy="12" r="8.5"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
    "calendar": '<rect x="3.5" y="5" width="17" height="15" rx="1.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4M9 14.5l2 2 4-4"/>',
    "files": '<path d="M8 3.5h7l4 4V17a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"/><path d="M15 3.5v4h4M4 7.5V20a1 1 0 0 0 1 1h9"/>',
    "call": '<path d="M5 4h3.5l1.5 4-2 1.5a10 10 0 0 0 6.5 6.5l1.5-2 4 1.5V19a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z"/>',
    "map": '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/>',
    "leaf": '<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14"/><path d="M5 19 13 11"/>',
    "arrow": '<path d="M4 12h15M14 7l5 5-5 5"/>',
}

CHAIN_ICONS = ["face", "scale", "phone", "sync", "review", "wages", "chart"]
KIT_ICONS = ["phone", "scale", "user", "leaf"]
OFFLINE_ICONS = ["phone", "sync", "review"]
ISSUE_ICONS = ["face", "scale", "wifi-off", "user"]
START_ICONS = ["map", "leaf", "user", "chart"]
CLOSE_ICONS = ["calendar", "files", "call"]
AGENDA_ICONS = ["scale", "review", "chart", "leaf"]


def e(text):
    return html.escape(text or "", quote=True)


def icon(name, cls="ic"):
    return (
        f'<svg class="{cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
        f'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
        f"{ICON_PATHS[name]}</svg>"
    )


def head(s, cls=""):
    parts = [f'<div class="head {cls}">']
    if s.get("kicker"):
        parts.append(f'<p class="kicker">{e(s["kicker"])}</p>')
    parts.append(f'<h2 class="title">{e(s.get("title"))}</h2>')
    if s.get("sub"):
        parts.append(f'<p class="sub">{e(s["sub"])}</p>')
    parts.append("</div>")
    return "".join(parts)


def phone(screen, active=False, idx=0):
    focus = ""
    if screen in FOCUS:
        x, y, w, h = FOCUS[screen]
        focus = (
            f'<span class="focus" style="left:{x / 412 * 100:.2f}%;top:{y / 915 * 100:.2f}%;'
            f'width:{w / 412 * 100:.2f}%;height:{h / 915 * 100:.2f}%"></span>'
        )
    return (
        f'<div class="screen{" on" if active else ""}" data-i="{idx}">'
        f'<img src="{PHONE}{e(screen)}" width="412" height="915" alt="GardenSuite field app screen: {e(screen[3:-4].replace("_", " "))}" '
        f'loading="{"eager" if active else "lazy"}">{focus}</div>'
    )


def steps_list(steps):
    out = ['<ol class="steps">']
    for i, st in enumerate(steps):
        out.append(
            f'<li class="step{" on" if i == 0 else ""}" data-i="{i}"><span class="num">{i + 1}</span>'
            f'<div><h3>{e(st.get("title"))}</h3><p>{e(st.get("text"))}</p></div></li>'
        )
    out.append("</ol>")
    return "".join(out)


def print_row(steps, image_for, cls):
    out = [f'<div class="print-row {cls}">']
    for i, st in enumerate(steps):
        out.append(
            f'<figure><div class="pframe">{image_for(st, i)}</div>'
            f'<figcaption><b>{i + 1}. {e(st.get("title"))}</b> {e(st.get("text"))}</figcaption></figure>'
        )
    out.append("</div>")
    return "".join(out)


def r_title(s):
    return (
        '<div class="title-wrap">'
        f'<img class="app-icon" src="{IMG}app-icon-512.png" width="512" height="512" alt="GardenSuite app icon">'
        f'<p class="kicker">{e(s.get("kicker"))}</p>'
        f'<h1 class="hero">{e(s.get("title"))}</h1>'
        f'<p class="sub big">{e(s.get("sub"))}</p>'
        '<p class="estate" id="estate"></p>'
        "</div>"
        '<div class="title-phones">'
        + "".join(
            f'<div class="mini"><img src="{PHONE}{f}" width="412" height="915" alt="" loading="eager"></div>'
            for f in ["13_attendance_result_matched.png", "10_harvest_result_scale_connected_save.png"]
        )
        + "</div>"
    )


def r_cards(s, icons, cols, cls=""):
    items = s.get("items", [])
    out = [head(s), f'<div class="cards cols-{cols} {cls}">']
    for i, it in enumerate(items):
        ic = icon(icons[i % len(icons)]) if icons else ""
        out.append(
            f'<div class="card"><div class="card-top">{ic}<span class="cnum">{i + 1:02d}</span></div>'
            f'<h3>{e(it.get("title"))}</h3><p>{e(it.get("text"))}</p></div>'
        )
    out.append("</div>")
    return "".join(out)


def r_problem(s):
    out = [head(s), '<div class="cards cols-3 problem">']
    for i, it in enumerate(s.get("items", [])):
        out.append(
            f'<div class="card pcard"><img src="{IMG}{PROBLEM_IMAGES[i % 3]}" width="800" height="800" alt="{e(it.get("title"))}" loading="lazy">'
            f'<div class="pbody"><h3>{e(it.get("title"))}</h3><p>{e(it.get("text"))}</p></div></div>'
        )
    out.append("</div>")
    return "".join(out)


def r_chain(s):
    items = s.get("items", [])
    groups = [("In the field", 0, 3), ("", 3, 4), ("At the office", 4, 6), ("Owner", 6, 7)]
    out = [head(s), '<div class="chain">']
    for i, it in enumerate(items):
        out.append(
            f'<div class="link" data-i="{i}">{icon(CHAIN_ICONS[i % 7], "ic big")}'
            f'<h3>{e(it.get("title"))}</h3><p>{e(it.get("text"))}</p></div>'
        )
        if i < len(items) - 1:
            out.append(f'<div class="arrow">{icon("arrow")}</div>')
    out.append("</div><div class=\"chain-groups\">")
    for label, a, b in groups:
        out.append(f'<span style="grid-column:{a * 2 + 1} / {b * 2}">{e(label)}</span>')
    out.append("</div>")
    return "".join(out)


def r_kit(s):
    out = [
        '<div class="split">',
        f'<div class="kit-img"><img src="{IMG}scale_hardware.jpg" width="1024" height="1024" alt="Bluetooth hanging scale sending leaf weight to the GS Face app on an Android phone" loading="lazy"></div>',
        '<div class="kit-body">',
        head(s),
        '<ul class="kit-list">',
    ]
    for i, it in enumerate(s.get("items", [])):
        out.append(f'<li>{icon(KIT_ICONS[i % 4], "ic")}<div><h3>{e(it.get("title"))}</h3><p>{e(it.get("text"))}</p></div></li>')
    out.append("</ul></div></div>")
    return "".join(out)


def r_flow(s):
    steps = s.get("steps", [])
    screens = "".join(phone(st["screen"], i == 0, i) for i, st in enumerate(steps))
    dots = "".join(f'<i class="{"on" if i == 0 else ""}"></i>' for i in range(len(steps)))
    live = (
        '<div class="flow screen-only">'
        f'<div class="flow-left">{head(s)}{steps_list(steps)}</div>'
        f'<div class="flow-right"><div class="device">{screens}</div><div class="dots">{dots}</div></div>'
        "</div>"
    )
    printed = (
        f'<div class="print-only">{head(s, "compact")}'
        + print_row(steps, lambda st, i: phone(st["screen"], True, i), f"n{len(steps)}")
        + "</div>"
    )
    return live + printed


def r_gallery(s):
    items = s.get("items", [])
    imgs = GALLERY_IMAGES[s["id"]]

    def shot(i, active):
        return (
            f'<div class="shot{" on" if active else ""}" data-i="{i}"><img src="{OFFICE}{imgs[i]}" '
            f'alt="{e(items[i].get("title"))}" loading="{"eager" if active else "lazy"}"></div>'
        )

    steps = [{"title": it.get("title"), "text": it.get("text")} for it in items]
    live = (
        '<div class="flow gallery screen-only">'
        f'<div class="flow-left">{head(s)}{steps_list(steps)}</div>'
        f'<div class="flow-right"><div class="monitor">{"".join(shot(i, i == 0) for i in range(len(items)))}</div></div>'
        "</div>"
    )
    printed = (
        f'<div class="print-only">{head(s, "compact")}'
        + print_row(steps, lambda st, i: shot(i, True), f"g{len(items)}")
        + "</div>"
    )
    return live + printed


def r_offline(s):
    items = s.get("items", [])
    out = ['<div class="flow">', f'<div class="flow-left">{head(s)}<ul class="kit-list">']
    for i, it in enumerate(items):
        out.append(f'<li>{icon(OFFLINE_ICONS[i % 3], "ic")}<div><h3>{e(it.get("title"))}</h3><p>{e(it.get("text"))}</p></div></li>')
    out.append(f'</ul></div><div class="flow-right"><div class="device">{phone("27_sync_status.png", True)}</div></div></div>')
    return "".join(out)


def r_start(s):
    items = s.get("items", [])
    out = [head(s), '<div class="timeline">']
    for i, it in enumerate(items):
        out.append(
            f'<div class="tl"><span class="num">{i + 1}</span>{icon(START_ICONS[i % 4], "ic big")}'
            f'<h3>{e(it.get("title"))}</h3><p>{e(it.get("text"))}</p></div>'
        )
    out.append("</div>")
    return "".join(out)


def r_close(s):
    items = s.get("items", [])
    out = [head(s), '<div class="cards cols-3 close-cards">']
    for i, it in enumerate(items):
        out.append(f'<div class="card">{icon(CLOSE_ICONS[i % 3], "ic big")}<h3>{e(it.get("title"))}</h3><p>{e(it.get("text"))}</p></div>')
    out.append(
        '</div><div class="close-foot">'
        '<span>sarbaniassociates@gmail.com</span><span>+91 97341 01330 (phone and WhatsApp)</span><span>gardensuite.in</span>'
        "</div>"
    )
    return "".join(out)


RENDER = {
    "title": r_title,
    "agenda": lambda s: r_cards(s, AGENDA_ICONS, 4, "agenda"),
    "problem": r_problem,
    "chain": r_chain,
    "kit": r_kit,
    "flow": r_flow,
    "offline": r_offline,
    "gallery": r_gallery,
    "issues": lambda s: r_cards(s, ISSUE_ICONS, 2, "issues"),
    "start": r_start,
    "close": r_close,
}


def slide_html(s, n, total):
    body = RENDER[s["type"]](s)
    step_count = len(s.get("steps") or []) or (len(s.get("items") or []) if s["type"] == "gallery" else 0)
    notes = {
        "notes": s.get("notes", ""),
        "say": [st.get("say", "") for st in s.get("steps") or []],
        "title": s.get("title", ""),
    }
    foot = (
        '<footer class="foot"><span class="brand"><img src="../assets/img/app-icon-512.png" width="512" height="512" alt="">'
        'GardenSuite <em>by Sarbani Associates</em></span>'
        f'<span class="pg">{n} / {total}</span></footer>'
    )
    return (
        f'<section class="slide t-{s["type"]}" id="{s["id"]}" data-steps="{step_count}" '
        f"data-notes='{e(json.dumps(notes))}'>"
        f'<div class="inner">{body}</div>{foot}</section>'
    )


def main():
    slides = COPY["slides"]
    total = len(slides)
    body = "\n".join(slide_html(s, i + 1, total) for i, s in enumerate(slides))
    template = (ROOT / "template.html").read_text()
    out = template.replace("<!--SLIDES-->", body)
    (ROOT / "index.html").write_text(out)
    for ch in ("\u2014", "\u2013"):
        if ch in out:
            raise SystemExit(f"dash character {ch!r} found in output")
    print(f"wrote {ROOT / 'index.html'} with {total} slides")


if __name__ == "__main__":
    main()
