"""Assemble rendered slide images into the leave-behind PDF.

Usage: python3 make_pdf.py <slides-dir> <out.pdf>
Called by render.mjs. Uses Pillow only.
"""
import re
import sys
from pathlib import Path

from PIL import Image

src = Path(sys.argv[1])
out = Path(sys.argv[2])
pages = sorted(src.glob("page-*.jpg"), key=lambda p: int(re.search(r"\d+", p.stem).group()))
if not pages:
    raise SystemExit(f"no page images in {src}")

imgs = [Image.open(p).convert("RGB") for p in pages]
imgs[0].save(
    out,
    "PDF",
    save_all=True,
    append_images=imgs[1:],
    resolution=200.0,
    quality=92,
    title="GardenSuite Live Demo",
    author="Sarbani Associates",
)
print(f"wrote {out} ({len(imgs)} pages)")
