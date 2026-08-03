from pathlib import Path
import pypdfium2 as pdfium

pdf_path = Path(r"C:\projects\biz\gardensuite.in\tmp\docx_qa\balanoor_response\GardenSuite_Response_to_Balanoor.pdf")
out_dir = pdf_path.parent

document = pdfium.PdfDocument(str(pdf_path))
for index in range(len(document)):
    page = document[index]
    bitmap = page.render(scale=1.7)
    bitmap.to_pil().save(out_dir / f"page-{index + 1}.png")
    page.close()

print(f"Rendered {len(document)} pages")
