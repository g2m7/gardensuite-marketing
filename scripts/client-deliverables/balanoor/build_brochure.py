from pathlib import Path

import pypdfium2 as pdfium
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / "deliverables" / "brochures" / "GardenSuite_Face_Attendance_Smart_Weighing_Brochure.pdf"
PREVIEW = ROOT / ".artifacts" / "pdf-renders" / "balanoor-brochure"
OUT.parent.mkdir(parents=True, exist_ok=True)
PREVIEW.mkdir(parents=True, exist_ok=True)

PAGE_W, PAGE_H = A4
GREEN = colors.HexColor("#1B5E3B")
DARK = colors.HexColor("#13251B")
MUTED = colors.HexColor("#58645D")
PALE = colors.HexColor("#EEF5EF")
SOFT = colors.HexColor("#F7F9F7")
LINE = colors.HexColor("#DCE4DE")
WHITE = colors.white

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="KickerGS", fontName="Helvetica-Bold", fontSize=8.5, leading=11, textColor=GREEN, spaceAfter=5, tracking=1.1))
styles.add(ParagraphStyle(name="HeroGS", fontName="Helvetica-Bold", fontSize=29, leading=32, textColor=DARK, spaceAfter=10))
styles.add(ParagraphStyle(name="SubheroGS", fontName="Helvetica", fontSize=12, leading=17, textColor=MUTED, spaceAfter=11))
styles.add(ParagraphStyle(name="H1GS", fontName="Helvetica-Bold", fontSize=23, leading=27, textColor=DARK, spaceAfter=8))
styles.add(ParagraphStyle(name="H2GS", fontName="Helvetica-Bold", fontSize=14, leading=17, textColor=DARK, spaceAfter=5))
styles.add(ParagraphStyle(name="H3GS", fontName="Helvetica-Bold", fontSize=10.5, leading=13, textColor=DARK, spaceAfter=3))
styles.add(ParagraphStyle(name="BodyGS", fontName="Helvetica", fontSize=9.5, leading=13.5, textColor=MUTED))
styles.add(ParagraphStyle(name="BodyDarkGS", fontName="Helvetica", fontSize=9.5, leading=13.5, textColor=DARK))
styles.add(ParagraphStyle(name="SmallGS", fontName="Helvetica", fontSize=7.8, leading=10.5, textColor=MUTED))
styles.add(ParagraphStyle(name="WhiteTitleGS", fontName="Helvetica-Bold", fontSize=12, leading=15, textColor=WHITE, alignment=TA_CENTER))
styles.add(ParagraphStyle(name="WhiteBodyGS", fontName="Helvetica", fontSize=8.2, leading=11, textColor=WHITE, alignment=TA_CENTER))
styles.add(ParagraphStyle(name="CenterSmallGS", fontName="Helvetica", fontSize=8, leading=10.5, textColor=MUTED, alignment=TA_CENTER))


def p(text, style="BodyGS"):
    return Paragraph(text, styles[style])


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.line(17 * mm, 13 * mm, PAGE_W - 17 * mm, 13 * mm)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(17 * mm, 8.2 * mm, "GardenSuite by Sarbani Associates | Bagdogra, Siliguri")
    canvas.drawRightString(PAGE_W - 17 * mm, 8.2 * mm, f"Page {doc.page}")
    canvas.restoreState()


frame = Frame(17 * mm, 17 * mm, PAGE_W - 34 * mm, PAGE_H - 32 * mm, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
doc = BaseDocTemplate(
    str(OUT),
    pagesize=A4,
    leftMargin=17 * mm,
    rightMargin=17 * mm,
    topMargin=15 * mm,
    bottomMargin=17 * mm,
    title="GardenSuite Face Attendance and Smart Weighing",
    author="Sarbani Associates",
    subject="Tea garden face attendance and green leaf weighing brochure",
)
doc.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=footer)])

story = []

# Page 1
story += [
    p("ATTENDANCE + SMART WEIGHING", "KickerGS"),
    p("Verify the worker. Capture the leaf weight. Keep one clear record.", "HeroGS"),
    p(
        "GardenSuite helps tea estates record face-verified hazira and green leaf weight from one Android field app. "
        "The field work continues without internet and syncs when a connection is available.",
        "SubheroGS",
    ),
]

hero = Image(str(ROOT / "collateral" / "brochures" / "legacy-sales-flyer" / "hero-smart-scale.png"), width=176 * mm, height=78 * mm)
story += [hero, Spacer(1, 6 * mm)]

benefit_data = [
    [p("FACE CHECK", "WhiteTitleGS"), p("SMART SCALE", "WhiteTitleGS"), p("OFFLINE FIELD WORK", "WhiteTitleGS"), p("OFFICE REPORTS", "WhiteTitleGS")],
    [
        p("Worker identity is checked before hazira is saved. This helps stop proxy attendance.", "WhiteBodyGS"),
        p("Bluetooth sends the kg reading to the same verified worker record.", "WhiteBodyGS"),
        p("Attendance and weighing continue even when mobile internet is not available.", "WhiteBodyGS"),
        p("Synced data is ready for daily review, Excel export and payroll workflow.", "WhiteBodyGS"),
    ],
]
benefits = Table(benefit_data, colWidths=[44 * mm] * 4, rowHeights=[11 * mm, 29 * mm])
benefits.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), GREEN),
    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("LEFTPADDING", (0, 0), (-1, -1), 5),
    ("RIGHTPADDING", (0, 0), (-1, -1), 5),
    ("TOPPADDING", (0, 0), (-1, -1), 5),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ("LINEBEFORE", (1, 0), (-1, -1), 0.6, colors.HexColor("#5B8A6C")),
]))
story += [benefits, Spacer(1, 5 * mm), p("Built and supported by Sarbani Associates for tea garden work.", "CenterSmallGS"), PageBreak()]

# Page 2
story += [
    p("HOW THE DAILY WORKFLOW RUNS", "KickerGS"),
    p("One field flow for attendance and weighing", "H1GS"),
    p("The supervisor uses the same Android app for worker enrollment, attendance, work punches and plucking weight.", "SubheroGS"),
]

steps = Table(
    [
        [p("1. Enroll", "H3GS"), p("2. Verify", "H3GS"), p("3. Weigh", "H3GS"), p("4. Save and sync", "H3GS")],
        [
            p("Capture worker face images and link them to the employee code.", "SmallGS"),
            p("Use the phone camera to check the worker before attendance.", "SmallGS"),
            p("Bluetooth sends kg from the scale. Manual entry is available as a fallback.", "SmallGS"),
            p("Save locally without internet. Sync later to the office and dashboard.", "SmallGS"),
        ],
    ],
    colWidths=[44 * mm] * 4,
    rowHeights=[10 * mm, 30 * mm],
)
steps.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), SOFT),
    ("BOX", (0, 0), (-1, -1), 0.8, LINE),
    ("INNERGRID", (0, 0), (-1, -1), 0.6, LINE),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 7),
    ("RIGHTPADDING", (0, 0), (-1, -1), 7),
    ("TOPPADDING", (0, 0), (-1, -1), 7),
]))
story += [steps, Spacer(1, 7 * mm)]

screen1 = Image(str(ROOT / "gs_landing" / "static" / "screenshots" / "13_attendance_result_matched.png"), width=39 * mm, height=87 * mm)
screen2 = Image(str(ROOT / "gs_landing" / "static" / "screenshots" / "10_harvest_result_scale_connected_save.png"), width=39 * mm, height=87 * mm)
screen3 = Image(str(ROOT / "gs_landing" / "static" / "screenshots" / "16_punch_result_clock_in.png"), width=39 * mm, height=87 * mm)

screens = Table(
    [
        [screen1, screen2, screen3],
        [p("Face attendance result", "H3GS"), p("Leaf weight linked to worker", "H3GS"), p("Clock-in and clock-out", "H3GS")],
        [
            p("Shows worker, employee ID, local time and match result before saving.", "CenterSmallGS"),
            p("Shows scale weight, deduction, net weight and day total for the worker.", "CenterSmallGS"),
            p("Records work code, section and local timestamp for general garden work.", "CenterSmallGS"),
        ],
    ],
    colWidths=[58.5 * mm] * 3,
    rowHeights=[89 * mm, 8 * mm, 18 * mm],
)
screens.setStyle(TableStyle([
    ("ALIGN", (0, 0), (-1, -1), "CENTER"),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 5),
    ("RIGHTPADDING", (0, 0), (-1, -1), 5),
]))
story += [screens, PageBreak()]

# Page 3
story += [
    p("TECHNICAL AND ROLLOUT SUMMARY", "KickerGS"),
    p("Made for practical tea garden conditions", "H1GS"),
]

spec_rows = [
    ["Capability", "GardenSuite response"],
    [p("Attendance method", "BodyDarkGS"), p("Facial recognition through an Android phone. Fingerprint/thumb attendance is not included in the current field solution.")],
    [p("Weighing hardware", "BodyDarkGS"), p("One standard 50 kg Bluetooth smart hanging scale per weighing point. Final make, accuracy/graduation and battery details are confirmed before order.")],
    [p("Working times", "BodyDarkGS"), p("Face-verified clock-in and clock-out for general work. Sessions record start and end time. Plucking entries keep their individual capture time.")],
    [p("Internet", "BodyDarkGS"), p("Not required for field attendance or scale-to-phone Bluetooth. Required later for sync, dashboard access, updates and remote support.")],
    [p("Existing software", "BodyDarkGS"), p("Standalone use needs no other ERP. GardenSuite ERP can receive the records directly. Other payroll or ERP integration needs a format review and may require separately quoted work.")],
    [p("Client-provided items", "BodyDarkGS"), p("Compatible Android phones, charging/electricity, internet at a sync point, and the hanging frame or stand unless separately listed.")],
    [p("Warranty and support", "BodyDarkGS"), p("One-year scale warranty for manufacturing defects. Phone, WhatsApp and remote support are included with the active software plan.")],
]
specs = Table(spec_rows, colWidths=[45 * mm, 131 * mm])
specs.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, 0), DARK),
    ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
    ("FONTSIZE", (0, 0), (-1, 0), 10.5),
    ("BACKGROUND", (0, 1), (0, -1), PALE),
    ("BOX", (0, 0), (-1, -1), 0.8, LINE),
    ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 7),
    ("RIGHTPADDING", (0, 0), (-1, -1), 7),
    ("TOPPADDING", (0, 0), (-1, -1), 5),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
]))
story += [specs, Spacer(1, 6 * mm)]

rollout = Table(
    [
        [p("DEMO AND WORKFLOW REVIEW", "KickerGS"), p("SETUP AND TRAINING", "KickerGS"), p("ONGOING SUPPORT", "KickerGS")],
        [
            p("Confirm weighing points, supervisors, phones, worker master data, existing software and required reports.", "BodyGS"),
            p("Configure the app and scales, enroll workers, test field capture and train supervisors and office staff.", "BodyGS"),
            p("Use phone, WhatsApp and remote desktop support first. On-site visits are scheduled when physical work is required.", "BodyGS"),
        ],
    ],
    colWidths=[58.5 * mm] * 3,
    rowHeights=[10 * mm, 34 * mm],
)
rollout.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), SOFT),
    ("BOX", (0, 0), (-1, -1), 0.8, LINE),
    ("INNERGRID", (0, 0), (-1, -1), 0.6, LINE),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 7),
    ("RIGHTPADDING", (0, 0), (-1, -1), 7),
    ("TOPPADDING", (0, 0), (-1, -1), 7),
]))
story += [rollout, Spacer(1, 6 * mm)]

contact = Table(
    [[
        [
            p("BOOK A DEMO", "KickerGS"),
            p("See the workflow with your own field team.", "H2GS"),
            p("Kaushik Majumder | 9734101330<br/>sarbaniassociates@gmail.com<br/>https://gardensuite.in", "BodyDarkGS"),
        ],
        [
            p("SUPPORT AREA", "KickerGS"),
            p("Sarbani Associates, Bagdogra, Siliguri", "H2GS"),
            p("For on-site work outside the local service area, actual airfare, local travel and suitable stay are arranged or reimbursed by the client.", "BodyGS"),
        ],
    ]],
    colWidths=[88 * mm, 88 * mm],
)
contact.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), PALE),
    ("BOX", (0, 0), (-1, -1), 0.8, GREEN),
    ("LINEBEFORE", (1, 0), (1, 0), 0.8, GREEN),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 10),
    ("RIGHTPADDING", (0, 0), (-1, -1), 10),
    ("TOPPADDING", (0, 0), (-1, -1), 9),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
]))
story += [contact, Spacer(1, 4 * mm), p("GardenSuite has served 20+ tea estates. Many estates keep software details private.", "CenterSmallGS")]

doc.build(story)

# Render every page for visual QA.
pdf = pdfium.PdfDocument(str(OUT))
for i in range(len(pdf)):
    page = pdf[i]
    bitmap = page.render(scale=1.5)
    bitmap.to_pil().save(PREVIEW / f"page-{i + 1}.png")
print(f"SAVED {OUT} ({len(pdf)} pages)")
