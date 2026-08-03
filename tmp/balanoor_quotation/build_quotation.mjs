import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outDir = "C:/projects/biz/gardensuite.in/outputs/balanoor_demo_enquiry_20260714";
const outFile = `${outDir}/GardenSuite_Balanoor_Budgetary_Quotation.xlsx`;
await fs.mkdir(outDir, { recursive: true });

const wb = Workbook.create();
const summary = wb.worksheets.add("Quotation Summary");
const options = wb.worksheets.add("Commercial Options");
const technical = wb.worksheets.add("Technical Response");
const terms = wb.worksheets.add("Terms & Scope");

const green = "#1B5E3B";
const dark = "#173326";
const pale = "#EEF5EF";
const pale2 = "#F7FAF7";
const yellow = "#FFF4CC";
const gray = "#606B65";
const line = "#D9E2DB";
const white = "#FFFFFF";
const money = '"Rs. "#,##0';

function titleBand(sheet, range, text) {
  sheet.getRange(range).merge();
  sheet.getRange(range).values = [[text]];
  sheet.getRange(range).format = {
    fill: green,
    font: { bold: true, color: white, size: 20 },
    verticalAlignment: "center",
  };
}

function section(sheet, range, text) {
  sheet.getRange(range).merge();
  sheet.getRange(range).values = [[text]];
  sheet.getRange(range).format = {
    fill: pale,
    font: { bold: true, color: dark, size: 12 },
    verticalAlignment: "center",
    borders: { preset: "outside", style: "thin", color: line },
  };
}

function header(sheet, range) {
  sheet.getRange(range).format = {
    fill: dark,
    font: { bold: true, color: white },
    verticalAlignment: "center",
    wrapText: true,
  };
}

for (const sheet of [summary, options, technical, terms]) {
  sheet.showGridLines = false;
}

// Quotation Summary
titleBand(summary, "A1:E2", "GardenSuite - Budgetary Quotation");
summary.getRange("A3:E3").merge();
summary.getRange("A3:E3").values = [["Face Attendance + Smart Green Leaf Weighing | Sarbani Associates"]];
summary.getRange("A3:E3").format = { font: { bold: true, color: dark, size: 12 } };

summary.getRange("A5:B10").values = [
  ["Prepared for", "Balanoor Plantations and Industries Ltd."],
  ["Contact", "tea@balanoor.com | 9448999636"],
  ["Prepared by", "Sarbani Associates, Bagdogra, Siliguri"],
  ["Quotation date", new Date("2026-07-14T00:00:00")],
  ["Validity", "30 days from quotation date"],
  ["Status", "Budgetary - final quantity after demo/site workflow review"],
];
summary.getRange("A5:A10").format = { fill: pale2, font: { bold: true, color: dark } };
summary.getRange("B5:B10").format = { wrapText: true };
summary.getRange("B8").format.numberFormat = "dd mmm yyyy";

section(summary, "A12:E12", "Editable assumptions - yellow cells");
summary.getRange("A13:B19").values = [
  ["Number of 50 kg smart scales", 1],
  ["Number of Android field devices", 2],
  ["On-site installation/training days", 3],
  ["Return airfare for Sarbani team", 0],
  ["Accommodation/boarding", 0],
  ["Local travel at site", 0],
  ["Custom integration, if approved", 0],
];
summary.getRange("A13:A19").format = { font: { color: dark }, wrapText: true };
summary.getRange("B13:B19").format = { fill: yellow, font: { bold: true, color: dark } };
summary.getRange("B16:B19").format.numberFormat = money;
summary.getRange("D13:E16").values = [
  ["Selected software tier", null],
  ["Annual software fee", null],
  ["Field operation", "Works offline"],
  ["Sync requirement", "Internet needed only for sync, dashboard, updates and remote support"],
];
summary.getRange("E13").formulas = [["=IF(B14<=2,\"Nano\",IF(B14<=5,\"Small\",IF(B14<=10,\"Medium\",IF(B14<=20,\"Large\",\"Enterprise\"))))"]];
summary.getRange("E14").formulas = [["=IF(B14<=2,10000,IF(B14<=5,18000,IF(B14<=10,30000,IF(B14<=20,50000,75000))))"]];
summary.getRange("E14").format.numberFormat = money;
summary.getRange("D13:D16").format = { fill: pale2, font: { bold: true, color: dark }, wrapText: true };
summary.getRange("E13:E16").format.wrapText = true;

section(summary, "A21:E21", "Provisional commercial calculation");
summary.getRange("A22:E22").values = [["Item", "Qty", "Unit price", "Amount", "Basis / notes"]];
header(summary, "A22:E22");
summary.getRange("A23:C29").values = [
  ["GardenSuite Wireless Smart Hanging Scale - 50 kg", null, 7000],
  ["Face Attendance + Smart Weighing software tier", 1, null],
  ["On-site installation and training", null, 1000],
  ["Return airfare", 1, null],
  ["Accommodation/boarding", 1, null],
  ["Local travel at site", 1, null],
  ["Custom data mapping/integration, if needed", 1, null],
];
summary.getRange("B23").formulas = [["=B13"]];
summary.getRange("B25").formulas = [["=B15"]];
summary.getRange("C24").formulas = [["=E14"]];
summary.getRange("C26").formulas = [["=B16"]];
summary.getRange("C27").formulas = [["=B17"]];
summary.getRange("C28").formulas = [["=B18"]];
summary.getRange("C29").formulas = [["=B19"]];
summary.getRange("D23").formulas = [["=B23*C23"]];
summary.getRange("D24").formulas = [["=B24*C24"]];
summary.getRange("D25").formulas = [["=B25*C25"]];
summary.getRange("D26").formulas = [["=B26*C26"]];
summary.getRange("D27").formulas = [["=B27*C27"]];
summary.getRange("D28").formulas = [["=B28*C28"]];
summary.getRange("D29").formulas = [["=B29*C29"]];
summary.getRange("E23:E29").values = [
  ["One-time hardware; 1-year warranty for manufacturing defects"],
  ["Annual tier selected by Android device count; app, dashboard, support and updates included"],
  ["Charged per day; duration depends on points, staff and integration scope"],
  ["Actual cost; client-arranged tickets or reimbursement"],
  ["Actual cost; suitable lodging and meals to be arranged/provided"],
  ["Actual cost; airport and local site movement"],
  ["Only after review of the client's existing software and data format"],
];
summary.getRange("A23:E29").format = { wrapText: true, borders: { preset: "inside", style: "thin", color: line } };
summary.getRange("C23:D29").format.numberFormat = money;
summary.getRange("A31:C31").merge();
summary.getRange("A31:C31").values = [["Provisional total before GST"]];
summary.getRange("D31").formulas = [["=SUM(D23:D29)"]];
summary.getRange("A31:D31").format = { fill: pale, font: { bold: true, color: dark, size: 12 }, borders: { preset: "outside", style: "medium", color: green } };
summary.getRange("D31").format.numberFormat = money;
summary.getRange("A32:C32").merge();
summary.getRange("A32:C32").values = [["Year 2 onward - annual software only at current tier"]];
summary.getRange("D32").formulas = [["=E14"]];
summary.getRange("D32").format.numberFormat = money;
summary.getRange("A34:E35").merge();
summary.getRange("A34:E35").values = [["Important: The displayed total uses a 1-scale, 2-device, 3-day illustration. Airfare, accommodation, local travel, custom integration and GST are not included until confirmed. Update all yellow cells before issuing a final purchase quotation."]];
summary.getRange("A34:E35").format = { fill: yellow, font: { color: dark, italic: true }, wrapText: true, verticalAlignment: "center" };

// Commercial options
titleBand(options, "A1:F2", "Commercial Options");
options.getRange("A3:F3").merge();
options.getRange("A3:F3").values = [["One standard scale model. Software plan changes only by number of Android field devices."]];
options.getRange("A5:F5").values = [["Plan", "Android devices", "Annual fee", "Includes", "Example use", "Notes"]];
header(options, "A5:F5");
options.getRange("A6:F10").values = [
  ["Nano", "1-2", 10000, "Face app, scale linking, dashboard, support, updates", "Pilot or one weighing point", "Remote onboarding may be used"],
  ["Small", "3-5", 18000, "Face app, scale linking, dashboard, support, updates", "Small multi-point rollout", "Remote onboarding may be used"],
  ["Medium", "6-10", 30000, "Face app, scale linking, dashboard, support, updates", "Multiple sections", "On-site training advised"],
  ["Large", "11-20", 50000, "Face app, scale linking, dashboard, support, updates", "Large estate rollout", "On-site training advised"],
  ["Enterprise", "21+", 75000, "Face app, scale linking, dashboard, support, updates", "Group or high device count", "Scope review required"],
];
options.getRange("C6:C10").format.numberFormat = money;
options.getRange("A6:F10").format = { wrapText: true, borders: { preset: "inside", style: "thin", color: line } };
section(options, "A12:F12", "Hardware and services");
options.getRange("A13:E13").values = [["Item", "Specification", "Price", "Frequency", "Notes"]];
header(options, "A13:E13");
options.getRange("A14:E17").values = [
  ["Wireless Smart Hanging Scale", "50 kg, Bluetooth connection to Android app", 7000, "One-time per weighing point", "One scale required per kamjari/weighing point"],
  ["On-site installation/training", "At estate with supervisors and office team", 1000, "Per day", "Travel, local transport and stay extra"],
  ["Remote onboarding", "Phone/WhatsApp/remote desktop as applicable", 0, "Included where suitable", "Does not replace an on-site visit where physical setup is required"],
  ["Custom integration", "Data mapping/export/API or changes to other software", 0, "To be quoted after review", "No commitment until existing software and format are studied"],
];
options.getRange("C14:C17").format.numberFormat = money;
options.getRange("A14:E17").format = { wrapText: true, borders: { preset: "inside", style: "thin", color: line } };
section(options, "A19:F19", "Illustrative configurations - excluding airfare, stay, local travel, custom work and GST");
options.getRange("A20:F20").values = [["Configuration", "Scales", "Devices", "Training days", "Software tier", "Illustrative first-year total"]];
header(options, "A20:F20");
options.getRange("A21:E24").values = [
  ["Pilot", 1, 2, 3, "Nano"],
  ["Small rollout", 3, 5, 3, "Small"],
  ["Medium rollout", 8, 10, 3, "Medium"],
  ["Large rollout", 15, 20, 5, "Large"],
];
options.getRange("F21").formulas = [["=B21*7000+D21*1000+10000"]];
options.getRange("F22").formulas = [["=B22*7000+D22*1000+18000"]];
options.getRange("F23").formulas = [["=B23*7000+D23*1000+30000"]];
options.getRange("F24").formulas = [["=B24*7000+D24*1000+50000"]];
options.getRange("F21:F24").format.numberFormat = money;
options.getRange("A21:F24").format = { borders: { preset: "inside", style: "thin", color: line } };

// Technical response
titleBand(technical, "A1:D2", "Technical Response to Enquiry");
technical.getRange("A3:D3").merge();
technical.getRange("A3:D3").values = [["GardenSuite Face Attendance + Smart Green Leaf Weighing"]];
technical.getRange("A5:D5").values = [["No.", "Customer question", "GardenSuite response", "Confirmation before order"]];
header(technical, "A5:D5");
technical.getRange("A6:D14").values = [
  [1, "Quotation for different types/models of devices", "Current supported offer is one standard 50 kg Bluetooth smart hanging scale. Quantity is based on weighing points. Software plans are based on Android device count.", "Confirm number of weighing points and supervisors/devices."],
  [2, "Detailed technical specifications", "50 kg digital hanging scale with Bluetooth link to the GardenSuite Android app. Weight is captured against the face-verified worker. Manual entry is available if the scale is unavailable. Gross weight, deduction and net weight can be recorded.", "Final make/model, graduation/accuracy, battery specification and any calibration certificate must be confirmed against the selected supply batch before PO."],
  [3, "Thumb/fingerprint or facial attendance", "Facial recognition is supported. Fingerprint/thumb attendance is not part of the current GardenSuite field solution.", "Confirm whether face-only attendance is acceptable."],
  [4, "How face attendance works", "Workers are enrolled with face images. During work, the supervisor uses an Android phone camera. The app checks the worker, records the local time and saves attendance offline. For plucking, the Bluetooth scale reading is linked to the same verified worker record.", "Worker master data and enrollment plan are required."],
  [5, "Changes to existing software", "No change is needed for a standalone GardenSuite deployment. Existing GardenSuite installations are configured with the Face + Weighing module. Integration with any other ERP/payroll system needs data-format review and may require separately quoted mapping or custom work.", "Share the existing software name, vendor, version, database/export format and sample attendance/weight files."],
  [6, "Network/internet requirement", "Attendance and weighing work offline in the field. Bluetooth communication between scale and phone does not need internet. Internet is required later for office/cloud sync, dashboard access, updates and remote support.", "Confirm internet availability at the office or another regular sync point."],
  [7, "Maintenance, support and warranty", "Phone and WhatsApp support and software updates are included in the active software plan. Remote desktop support is used where possible. Scale warranty is 1 year for manufacturing defects. On-site support is chargeable outside the local service area.", "Final warranty exclusions, turnaround and spare/replacement procedure to be stated on the supply invoice/PO."],
  [8, "Starting and closing working times", "Yes. General garden work supports face-verified clock-in and clock-out with local timestamps. Work sessions also record start and end time. Plucking entries retain their individual capture time.", "Confirm whether reporting is required by worker, section, work code, session or shift."],
  [9, "Additional hardware/software/accessories", "Client provides compatible Android phones with front camera and Bluetooth, charging/electricity and internet for sync. Hanging stand/frame, SIM/data, router, UPS, printer and other site accessories are not included unless separately listed.", "A site survey/demo should confirm phone compatibility, hanging arrangement, charging and office sync setup."],
];
technical.getRange("A6:D14").format = { wrapText: true, verticalAlignment: "top", borders: { preset: "inside", style: "thin", color: line } };
technical.getRange("A6:A14").format = { font: { bold: true, color: green }, horizontalAlignment: "center" };
technical.getRange("A16:D17").merge();
technical.getRange("A16:D17").values = [["Product information: https://gardensuite.in/products/attendance | GardenSuite is built and supported by Sarbani Associates, Bagdogra, Siliguri."]];
technical.getRange("A16:D17").format = { fill: pale, font: { color: dark }, wrapText: true, verticalAlignment: "center" };

// Terms and scope
titleBand(terms, "A1:C2", "Terms, Scope and Information Required");
section(terms, "A4:C4", "Commercial terms");
terms.getRange("A5:C13").values = [
  ["1", "Quotation validity", "30 days from the quotation date."],
  ["2", "Hardware payment", "100% advance. Dispatch/installation schedule is confirmed after payment and stock check."],
  ["3", "Software payment", "Annual subscription paid upfront, or quarterly where approved. Minimum initial term is 1 year."],
  ["4", "Training", "Rs. 1,000 per day. Training days and team size are confirmed after the demo/workflow review."],
  ["5", "Taxes", "GST and statutory levies are extra as applicable."],
  ["6", "Warranty", "Scale warranty is 1 year for manufacturing defects. Final make/model and detailed warranty procedure must appear on the final quotation/invoice."],
  ["7", "Renewal/cancellation", "Software renews annually. Cancellation notice is required at least 30 days before renewal."],
  ["8", "Data", "Client owns its operational data. Standard Excel export is available."],
  ["9", "Final scope", "Final pricing depends on weighing points, Android devices, training days, software integration and travel arrangements."],
];
terms.getRange("A5:C13").format = { wrapText: true, verticalAlignment: "top", borders: { preset: "inside", style: "thin", color: line } };
terms.getRange("A5:A13").format = { font: { bold: true, color: green }, horizontalAlignment: "center" };
section(terms, "A15:C15", "South India on-site support term");
terms.getRange("A16:C19").merge();
terms.getRange("A16:C19").values = [["Sarbani Associates does not currently maintain a local on-site support team in South India. For installation, training, commissioning or any later on-site support visit, Sarbani Associates personnel will need to travel to the estate. The client must arrange or reimburse actual return airfare, local transport, suitable accommodation/boarding and meals for the visiting team. Visit dates depend on staff availability and travel schedules. Remote phone, WhatsApp and remote desktop support remains the first line of support during business hours."]];
terms.getRange("A16:C19").format = { fill: yellow, font: { bold: true, color: dark }, wrapText: true, verticalAlignment: "center", borders: { preset: "outside", style: "medium", color: green } };
section(terms, "A21:C21", "Information required from Balanoor before final quotation");
terms.getRange("A22:C30").values = [
  ["1", "Number of estates/divisions", ""],
  ["2", "Number of kamjari/weighing points", ""],
  ["3", "Number of supervisors and Android phones", ""],
  ["4", "Expected workers per day and peak weighing volume", ""],
  ["5", "Need face attendance only, weighing only, or both", ""],
  ["6", "Existing payroll/ERP software, version and vendor", ""],
  ["7", "Sample attendance, worker master and weight export files", ""],
  ["8", "Required reports and clock-in/clock-out rules", ""],
  ["9", "Preferred demo date and site location/nearest airport", ""],
];
terms.getRange("A22:C30").format = { wrapText: true, borders: { preset: "inside", style: "thin", color: line } };
terms.getRange("C22:C30").format = { fill: yellow };

// Layout sizing
summary.getRange("A1:E35").format.verticalAlignment = "center";
summary.getRange("A:A").format.columnWidth = 38;
summary.getRange("B:B").format.columnWidth = 17;
summary.getRange("C:C").format.columnWidth = 16;
summary.getRange("D:D").format.columnWidth = 20;
summary.getRange("E:E").format.columnWidth = 48;
summary.getRange("1:2").format.rowHeight = 26;
summary.getRange("34:35").format.rowHeight = 34;
summary.freezePanes.freezeRows(3);

options.getRange("A:A").format.columnWidth = 24;
options.getRange("B:B").format.columnWidth = 20;
options.getRange("C:C").format.columnWidth = 16;
options.getRange("D:D").format.columnWidth = 46;
options.getRange("E:E").format.columnWidth = 32;
options.getRange("F:F").format.columnWidth = 30;
options.getRange("6:10").format.rowHeight = 46;
options.getRange("14:17").format.rowHeight = 48;
options.freezePanes.freezeRows(5);

technical.getRange("A:A").format.columnWidth = 7;
technical.getRange("B:B").format.columnWidth = 30;
technical.getRange("C:C").format.columnWidth = 72;
technical.getRange("D:D").format.columnWidth = 46;
technical.getRange("6:14").format.rowHeight = 78;
technical.freezePanes.freezeRows(5);

terms.getRange("A:A").format.columnWidth = 7;
terms.getRange("B:B").format.columnWidth = 36;
terms.getRange("C:C").format.columnWidth = 88;
terms.getRange("5:13").format.rowHeight = 42;
terms.getRange("16:19").format.rowHeight = 34;
terms.getRange("22:30").format.rowHeight = 32;
terms.freezePanes.freezeRows(4);

// Compact verification
const check = await wb.inspect({
  kind: "table",
  range: "Quotation Summary!A1:E35",
  include: "values,formulas",
  tableMaxRows: 35,
  tableMaxCols: 5,
  maxChars: 9000,
});
console.log(check.ndjson);
const errors = await wb.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "final formula error scan",
});
console.log(errors.ndjson);

for (const [sheetName, range, fileName] of [
  ["Quotation Summary", "A1:E35", "preview_summary.png"],
  ["Commercial Options", "A1:F24", "preview_options.png"],
  ["Technical Response", "A1:D17", "preview_technical.png"],
  ["Terms & Scope", "A1:C30", "preview_terms.png"],
]) {
  const image = await wb.render({ sheetName, range, scale: 1, format: "png" });
  await fs.writeFile(`${outDir}/${fileName}`, new Uint8Array(await image.arrayBuffer()));
}

const xlsx = await SpreadsheetFile.exportXlsx(wb);
await xlsx.save(outFile);
console.log(`SAVED ${outFile}`);
