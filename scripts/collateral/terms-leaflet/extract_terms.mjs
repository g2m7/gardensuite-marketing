import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const inputPath = process.argv[2] || path.join(root, 'deliverables/dated-outputs/gardensuite_terms_update_20260714/GardenSuite_Terms_Conditions_v8_Online_Service_Travel_Onsite_1000.xlsx');
const workDir = path.join(root, 'deliverables/terms-leaflet');

await fs.mkdir(workDir, { recursive: true });

const input = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(input);
const sheet = workbook.worksheets.getItem("Terms & Conditions");
const range = sheet.getRange("B1:D112");
const values = range.values;
await fs.writeFile(path.join(workDir, 'terms-values.json'), JSON.stringify(values, null, 2), "utf8");

const inspect = await workbook.inspect({
  kind: "table",
  range: "'Terms & Conditions'!B1:D112",
  include: "values,formulas",
  tableMaxRows: 112,
  tableMaxCols: 3,
  tableMaxCellChars: 1000,
  maxChars: 50000,
});
await fs.writeFile(path.join(workDir, 'terms-inspect.ndjson'), inspect.ndjson, "utf8");

const preview = await workbook.render({
  sheetName: "Terms & Conditions",
  autoCrop: "all",
  scale: 1.2,
  format: "png",
});
await fs.writeFile(path.join(workDir, 'excel-current.png'), new Uint8Array(await preview.arrayBuffer()));
console.log(`Extracted ${values.length} rows from ${inputPath}`);
