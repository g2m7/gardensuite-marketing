from pathlib import Path
import pypdfium2 as pdfium

pdf_path = Path(r"C:\projects\biz\gardensuite.in\output\terms_leaflet\GardenSuite_Terms_Conditions_Leaflet.pdf")
out_dir = Path(r"C:\projects\biz\gardensuite.in\tmp\pdfs\terms-leaflet")
out_dir.mkdir(parents=True, exist_ok=True)

document = pdfium.PdfDocument(str(pdf_path))
for index in range(len(document)):
    page = document[index]
    bitmap = page.render(scale=1.65)
    image = bitmap.to_pil()
    image.save(out_dir / f"page-{index + 1}.png")
    page.close()

print(f"Rendered {len(document)} pages to {out_dir}")
