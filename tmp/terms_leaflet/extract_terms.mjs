import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const inputPath = "C:/projects/biz/gardensuite.in/outputs/gardensuite_terms_update_20260714/GardenSuite_Terms_Conditions_v8_Online_Service_Travel_Onsite_1000.xlsx";
const workDir = "C:/projects/biz/gardensuite.in/tmp/terms_leaflet";

const input = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(input);
const sheet = workbook.worksheets.getItem("Terms & Conditions");
const range = sheet.getRange("B1:D112");
const values = range.values;
await fs.writeFile(`${workDir}/terms-values.json`, JSON.stringify(values, null, 2), "utf8");

const inspect = await workbook.inspect({
  kind: "table",
  range: "'Terms & Conditions'!B1:D112",
  include: "values,formulas",
  tableMaxRows: 112,
  tableMaxCols: 3,
  tableMaxCellChars: 1000,
  maxChars: 50000,
});
await fs.writeFile(`${workDir}/terms-inspect.ndjson`, inspect.ndjson, "utf8");

const preview = await workbook.render({
  sheetName: "Terms & Conditions",
  autoCrop: "all",
  scale: 1.2,
  format: "png",
});
await fs.writeFile(`${workDir}/excel-current.png`, new Uint8Array(await preview.arrayBuffer()));
console.log(`Extracted ${values.length} rows from ${inputPath}`);
