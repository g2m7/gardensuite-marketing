import fs from 'node:fs/promises';
import path from 'node:path';
import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool';

const sourcePath = 'C:/projects/biz/gardensuite.in/marketing/whatsapp-campaigns/face-attendance-weight/GS_Leads_Consolidated_20260802.xlsx';
const previewDir = 'C:/projects/biz/gardensuite.in/tmp/gardensuite_outreach_review_20260802/previews';

await fs.mkdir(previewDir, { recursive: true });
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(sourcePath));
const overview = await workbook.inspect({
  kind: 'workbook,sheet,table',
  maxChars: 12000,
  tableMaxRows: 8,
  tableMaxCols: 16,
  tableMaxCellChars: 120,
});
console.log('WORKBOOK_OVERVIEW');
console.log(overview.ndjson);

for (const sheet of workbook.worksheets.items) {
  const used = sheet.getUsedRange(true);
  console.log(`SHEET\t${sheet.name}\t${used?.address ?? 'EMPTY'}`);
  if (used) {
    const preview = await workbook.render({
      sheetName: sheet.name,
      autoCrop: 'all',
      scale: 1,
      format: 'png',
    });
    const safeName = sheet.name.replace(/[^a-z0-9_-]+/gi, '_');
    await fs.writeFile(
      path.join(previewDir, `${safeName}.png`),
      new Uint8Array(await preview.arrayBuffer()),
    );
  }
}
