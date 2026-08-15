import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const inputPath = "E:/Downloads/GardenSuite_Terms_Conditions_v6_StyleMatched.xlsx";
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const outputDir = path.join(repoRoot, "deliverables", "terms-update-20260714");
const outputPath = path.join(outputDir, "GardenSuite_Terms_Conditions_v8_Online_Service_Travel_Onsite_1000.xlsx");
const mode = process.argv[2] || "inspect";

await fs.mkdir(outputDir, { recursive: true });
const input = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(input);

const overview = await workbook.inspect({
  kind: "workbook,sheet,table",
  maxChars: 18000,
  tableMaxRows: 80,
  tableMaxCols: 12,
  tableMaxCellChars: 500,
});
console.log(overview.ndjson);

if (mode === "inspect") {
  for (const range of ["B7:C15", "B35:C38", "B44:C50", "B91:C96", "B98:C106"]) {
    const styles = await workbook.inspect({
      kind: "computedStyle",
      sheetId: "Terms & Conditions",
      range,
      maxChars: 8000,
    });
    console.log(`STYLE ${range}`);
    console.log(styles.ndjson);
  }
}

for (let i = 0; i < workbook.worksheets.items.length; i++) {
  const sheet = workbook.worksheets.getItemAt(i);
  const preview = await workbook.render({
    sheetName: sheet.name,
    autoCrop: "all",
    scale: 1.3,
    format: "png",
  });
  const safeName = sheet.name.replace(/[^a-z0-9]+/gi, "_").toLowerCase();
  await fs.writeFile(`${outputDir}/${mode}_${i + 1}_${safeName}.png`, new Uint8Array(await preview.arrayBuffer()));
}

if (mode === "inspect") {
  console.log("INSPECTION COMPLETE");
  process.exit(0);
}

// Targeted content edits are inserted here after the original workbook is inspected.
const sheet = workbook.worksheets.getItem("Terms & Conditions");

// Section 1: make online/off-site delivery the default while preserving the existing section.
sheet.getRange("B8").values = [["Online Training & Implementation"]];
sheet.getRange("C8").values = [["Included in the active subscription and delivered by video call, phone, WhatsApp, email or remote desktop access."]];
sheet.getRange("B9").values = [["Exceptional On-Site Service"]];
sheet.getRange("C9").values = [["₹1,000 per day. Not included in standard service. Prior written approval is required, and all travel and stay costs are extra."]];
sheet.getRange("B10").values = [["* All regular training, implementation, support, updates and service are provided online and off-site."]];
sheet.getRange("B8:D10").format.wrapText = true;
sheet.getRange("8:8").format.rowHeight = 32;
sheet.getRange("9:9").format.rowHeight = 32;
sheet.getRange("10:10").format.rowHeight = 26;

// Section 2: prominent travel and accommodation clause for any exceptional physical visit.
sheet.getRange("B12").values = [["2.  IMPORTANT - Exceptional On-Site Visit: Air Travel & Accommodation"]];
sheet.getRange("B13").values = [["Standard Service Mode"]];
sheet.getRange("C13").values = [["All regular service is delivered online and off-site. No routine garden visit or local on-site support is included."]];
sheet.getRange("B14").values = [["Exceptional On-Site Service"]];
sheet.getRange("C14").values = [["₹1,000 per day, excluding travel and stay. A physical visit will be considered only when mutually agreed in writing, subject to staff availability and advance payment."]];
sheet.getRange("B15").values = [["IMPORTANT - CLIENT-BORNE AIR TRAVEL & ACCOMMODATION: The customer must arrange or reimburse 100% of actual return airfare, airport and local transport, suitable hotel accommodation, boarding and meals for the visiting Sarbani Associates team. These expenses are separate from all software, subscription, training, implementation and service charges."]];

// Apply the document's existing orange/red warning language without changing the merged layout.
sheet.getRange("B14:D14").format = {
  fill: "#FCE4D6",
  font: { bold: true, color: "#833C00" },
  borders: { preset: "all", style: "thin", color: "#BFBFBF" },
  wrapText: true,
  verticalAlignment: "center",
};
sheet.getRange("B15:D15").format = {
  fill: "#FFE7E7",
  font: { bold: true, color: "#C00000" },
  borders: { preset: "all", style: "thin", color: "#BFBFBF" },
  wrapText: true,
  verticalAlignment: "center",
};
sheet.getRange("B13:D15").format.wrapText = true;
sheet.getRange("13:13").format.rowHeight = 34;
sheet.getRange("14:14").format.rowHeight = 44;
sheet.getRange("15:15").format.rowHeight = 64;

// Section 8: remove any suggestion that normal service includes physical attendance.
sheet.getRange("C45").values = [["Completely online and off-site. Support is provided through phone, WhatsApp, email, video call and remote desktop access. No routine on-site service is included."]];
sheet.getRange("B45:D45").format.wrapText = true;
sheet.getRange("45:45").format.rowHeight = 38;

// Section 13: align the support and implementation language with the service model.
sheet.getRange("B100").values = [["13. Online Support Process"]];
sheet.getRange("C100").values = [["All support is delivered online and off-site. Requests may be raised by phone, WhatsApp, email or designated remote support channels and will be addressed according to severity and business impact."]];
sheet.getRange("C102").values = [["Critical failures affecting payroll, attendance, data access or core operations will receive highest priority for remote diagnosis and escalation."]];
sheet.getRange("C105").values = [["Implementation, configuration, data review and user training are carried out online and off-site. Timelines depend on module count, data migration, infrastructure readiness and customer availability. A remote project schedule will be shared before commencement."]];
sheet.getRange("B100:D105").format.wrapText = true;
sheet.getRange("100:100").format.rowHeight = 38;
sheet.getRange("102:102").format.rowHeight = 30;
sheet.getRange("105:105").format.rowHeight = 44;

const changed = await workbook.inspect({
  kind: "table",
  range: "'Terms & Conditions'!B7:C15",
  include: "values,formulas",
  tableMaxRows: 20,
  tableMaxCols: 3,
  maxChars: 8000,
});
console.log(changed.ndjson);
for (const range of ["'Terms & Conditions'!B44:C45", "'Terms & Conditions'!B99:C106"]) {
  const check = await workbook.inspect({
    kind: "table",
    range,
    include: "values,formulas",
    tableMaxRows: 12,
    tableMaxCols: 3,
    maxChars: 6000,
  });
  console.log(check.ndjson);
}

const finalPreview = await workbook.render({
  sheetName: "Terms & Conditions",
  autoCrop: "all",
  scale: 1.3,
  format: "png",
});
await fs.writeFile(`${outputDir}/final_terms_conditions.png`, new Uint8Array(await finalPreview.arrayBuffer()));

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "final formula error scan",
});
console.log(errors.ndjson);

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(`SAVED ${outputPath}`);
