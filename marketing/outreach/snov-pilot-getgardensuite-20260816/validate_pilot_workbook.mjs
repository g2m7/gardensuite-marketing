import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const inputPath = process.argv[2];
if (!inputPath) throw new Error("Usage: node validate_pilot_workbook.mjs <workbook.xlsx>");

const input = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(input);
const sheets = workbook.worksheets.items;

const errorPattern = /^#(?:REF!|DIV\/0!|VALUE!|NAME\?|N\/A|NUM!|NULL!)/;
const errors = [];

for (const sheet of sheets) {
  const used = sheet.getUsedRange(true);
  if (!used) continue;
  const values = used.values;
  for (let row = 0; row < values.length; row += 1) {
    for (let col = 0; col < values[row].length; col += 1) {
      const value = values[row][col];
      if (typeof value === "string" && errorPattern.test(value)) {
        errors.push({ sheet: sheet.name, row: row + 1, col: col + 1, value });
      }
    }
  }
}

const dashboard = workbook.worksheets.getItem("Pilot Dashboard");
const contacts = workbook.worksheets.getItem("Contacts");
const snov = workbook.worksheets.getItem("Snov Import");

const dashboardMetrics = dashboard.getRange("A5:B10").values;
const emails = contacts.getRange("H4:H23").values.flat().filter(Boolean);
const importEligibility = snov.getRange("K4:K23").values.flat();
const blockReasons = snov.getRange("L4:L23").values.flat();

const report = {
  sheetCount: sheets.length,
  dashboardMetrics,
  contactCount: emails.length,
  uniqueEmailCount: new Set(emails.map((email) => email.toLowerCase())).size,
  importEligibleYes: importEligibility.filter((value) => value === "Yes").length,
  importEligibleNo: importEligibility.filter((value) => value === "No").length,
  uniqueBlockReasons: [...new Set(blockReasons)],
  formulaErrors: errors
};

console.log(JSON.stringify(report, null, 2));

if (
  report.sheetCount !== 9 ||
  report.contactCount !== 20 ||
  report.uniqueEmailCount !== 20 ||
  report.importEligibleYes !== 0 ||
  report.importEligibleNo !== 20 ||
  report.formulaErrors.length > 0
) {
  process.exitCode = 1;
}
