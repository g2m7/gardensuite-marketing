import fs from 'node:fs/promises';
import path from 'node:path';
import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool';

const sourcePath = 'C:/projects/biz/gardensuite.in/marketing/whatsapp-campaigns/face-attendance-weight/GS_Leads_Consolidated_20260802.xlsx';
const outputDir = 'C:/projects/biz/gardensuite.in/outputs/gardensuite_outreach_ready_20260802';
const previewDir = 'C:/projects/biz/gardensuite.in/tmp/gardensuite_outreach_review_20260802/final-previews';
const outputPath = path.join(outputDir, 'GardenSuite_Outreach_Ready_20260802.xlsx');

const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(sourcePath));
const source = workbook.worksheets.getItem('All Leads');
const sourceValues = source.getUsedRange(true).values;
const headers = sourceValues[0].map((value) => String(value ?? '').trim());
const rows = sourceValues.slice(1).map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ''])));

const normalizePhone = (value) => {
  const digits = String(value ?? '').replace(/\D/g, '');
  const local = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits;
  return /^[6-9]\d{9}$/.test(local) ? `91${local}` : '';
};
const splitEmails = (value) => String(value ?? '').split(/[;,\s]+/).map((item) => item.trim().toLowerCase()).filter(Boolean);
const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !/(example\.com|test@|name@)/i.test(value);
const displayPhone = (value) => value ? `+91 ${value.slice(2, 7)} ${value.slice(7)}` : '';
const firstValidPhone = (row) => ['Phone 1', 'Phone 2', 'Phone 3'].map((field) => normalizePhone(row[field])).find(Boolean) || '';
const firstValidEmail = (row) => ['Email 1', 'Email 2', 'Email 3'].flatMap((field) => splitEmails(row[field])).find(validEmail) || '';
const contactedStatuses = new Set(['Delivered', 'Sent', 'Read', 'Failed']);
const sourceLevel = (row) => {
  const sources = String(row.Sources ?? '');
  if (/CRM_Export/i.test(sources)) return 'Existing CRM record';
  if (/(verified_list|verified_emails_v2|midsize_verified|outreach_list)/i.test(sources)) return 'Verified source';
  if (/(unverified_list|email_assam_dooars)/i.test(sources)) return 'Unverified source';
  if (/(Tea_Estates_number_required|tea_estate_contacts|WA_Campaign_Tracker)/i.test(sources)) return 'Directory phone source';
  return 'Name or directory only';
};
const priorityScore = (row, phone, email) => {
  const crm = String(row['CRM Status'] ?? '');
  const sources = String(row.Sources ?? '');
  let score = 0;
  if (/Negotiation/i.test(crm)) score += 60;
  else if (/High/i.test(crm)) score += 50;
  else if (/verified:MEDIUM/i.test(crm)) score += 42;
  else if (/Medium/i.test(crm)) score += 34;
  else if (/email_verified:LOW/i.test(crm)) score += 16;
  else if (/Low/i.test(crm)) score += 8;
  else score += 5;
  if (/CRM_Export/i.test(sources)) score += 15;
  if (/verified_list/i.test(sources)) score += 15;
  if (/midsize_verified|outreach_list/i.test(sources)) score += 10;
  if (/tea_estate_contacts_v2/i.test(sources)) score += 5;
  if (phone) score += 5;
  if (email) score += 5;
  if (String(row.Website ?? '').trim()) score += 2;
  if (String(row.Address ?? '').trim()) score += 2;
  if (contactedStatuses.has(String(row['WA Status'] ?? '').trim())) score -= 30;
  if (/^\[DISCOVERED\]/i.test(String(row['Estate Name'] ?? ''))) score -= 10;
  return score;
};

const reviewed = rows.map((row, index) => {
  const phone = firstValidPhone(row);
  const email = firstValidEmail(row);
  const wa = String(row['WA Status'] ?? '').trim();
  const level = sourceLevel(row);
  const score = priorityScore(row, phone, email);
  const reason = !phone && !email
    ? 'No usable phone or email'
    : contactedStatuses.has(wa)
      ? `WhatsApp already ${wa.toLowerCase()}`
      : level === 'Unverified source'
        ? 'Contact exists, but source needs verification'
        : 'Contact exists; confirm relationship or permission before sending';
  return {
    leadNo: Number(row['No.']) || index + 1,
    estate: String(row['Estate Name'] ?? '').trim(),
    phone,
    email,
    wa,
    crm: String(row['CRM Status'] ?? '').trim(),
    location: String(row.Location ?? '').trim(),
    level,
    score,
    reason,
    sources: String(row.Sources ?? '').trim(),
    contacted: contactedStatuses.has(wa),
  };
});

const whatsappQueue = reviewed
  .filter((row) => row.phone && !row.contacted && row.level !== 'Unverified source' && /[A-Za-z]{3}/.test(row.estate) && !/(hotel|retreat)/i.test(row.estate))
  .sort((a, b) => b.score - a.score || a.estate.localeCompare(b.estate))
  .slice(0, 30);
const emailReview = reviewed
  .filter((row) => row.email)
  .sort((a, b) => b.score - a.score || a.estate.localeCompare(b.estate));

const dashboard = workbook.worksheets.add('Dashboard');
const reviewSheet = workbook.worksheets.add('Lead Review');
const waSheet = workbook.worksheets.add('WhatsApp Queue');
const emailSheet = workbook.worksheets.add('Email Review');
const rulesSheet = workbook.worksheets.add('Rules');

source.freezePanes.freezeRows(1);

const reviewHeaders = [['Lead No.', 'Estate Name', 'Primary Phone', 'Primary Email', 'WA Status', 'CRM Status', 'Location', 'Valid Phone', 'Valid Email', 'Previously Messaged', 'Source Level', 'WA Candidate', 'Email Candidate', 'Priority Score', 'Review Reason', 'Sources', 'Consent / Relationship', 'Owner Approval']];
reviewSheet.getRange('A1:R1').values = reviewHeaders;
reviewSheet.getRange(`A2:R${reviewed.length + 1}`).values = reviewed.map((row) => [
  row.leadNo, row.estate, displayPhone(row.phone), row.email, row.wa, row.crm, row.location,
  row.phone ? 'Yes' : 'No', row.email ? 'Yes' : 'No', row.contacted ? 'Yes' : 'No', row.level, null, null, row.score, row.reason, row.sources,
  'Not recorded', 'Needs review'
]);
reviewSheet.getRange('L2').formulas = [['=IF(AND(H2="Yes",J2="No"),"Review","No")']];
reviewSheet.getRange(`L2:L${reviewed.length + 1}`).fillDown();
reviewSheet.getRange('M2').formulas = [['=IF(I2="Yes","Review","No")']];
reviewSheet.getRange(`M2:M${reviewed.length + 1}`).fillDown();
reviewSheet.getRange(`R2:R${reviewed.length + 1}`).dataValidation = { rule: { type: 'list', values: ['Needs review', 'Approved', 'Do not contact'] } };
reviewSheet.tables.add(`A1:R${reviewed.length + 1}`, true, 'LeadReviewTable');
reviewSheet.freezePanes.freezeRows(1);
reviewSheet.showGridLines = false;

waSheet.getRange('A1:L1').values = [['Pilot Day', 'Daily Order', 'Lead No.', 'Estate Name', 'Phone', 'CRM Status', 'Relationship Check', 'Owner Approval', 'Message Type', 'Send Status', 'Sent Date', 'Reply / Next Action']];
waSheet.getRange(`A2:L${whatsappQueue.length + 1}`).values = whatsappQueue.map((row, index) => [
  `Day ${Math.floor(index / 5) + 1}`,
  (index % 5) + 1,
  row.leadNo,
  row.estate,
  displayPhone(row.phone),
  row.crm,
  'Confirm before send',
  'Needs review',
  /Negotiation/i.test(row.crm) ? 'Warm contact message' : 'Permission-first message',
  'Not sent',
  null,
  ''
]);
waSheet.getRange(`H2:H${whatsappQueue.length + 1}`).dataValidation = { rule: { type: 'list', values: ['Needs review', 'Approved', 'Do not contact'] } };
waSheet.getRange(`J2:J${whatsappQueue.length + 1}`).dataValidation = { rule: { type: 'list', values: ['Not sent', 'Sent', 'Replied', 'STOP', 'Invalid number'] } };
waSheet.tables.add(`A1:L${whatsappQueue.length + 1}`, true, 'WhatsAppQueueTable');
waSheet.freezePanes.freezeRows(1);
waSheet.showGridLines = false;

emailSheet.getRange('A1:J1').values = [['Lead No.', 'Estate Name', 'Email', 'CRM Status', 'Source Level', 'Consent Evidence', 'Relationship Basis', 'Owner Approval', 'Brevo Action', 'Sources']];
emailSheet.getRange(`A2:J${emailReview.length + 1}`).values = emailReview.map((row) => [
  row.leadNo,
  row.estate,
  row.email,
  row.crm,
  row.level,
  'Not recorded',
  'Needs review',
  'Needs review',
  'Do not import until approved',
  row.sources
]);
emailSheet.getRange(`H2:H${emailReview.length + 1}`).dataValidation = { rule: { type: 'list', values: ['Needs review', 'Approved', 'Do not contact'] } };
emailSheet.tables.add(`A1:J${emailReview.length + 1}`, true, 'EmailReviewTable');
emailSheet.freezePanes.freezeRows(1);
emailSheet.showGridLines = false;

dashboard.showGridLines = false;
dashboard.mergeCells('A1:H1');
dashboard.getRange('A1').values = [['GardenSuite Outreach Readiness']];
dashboard.getRange('A2:H2').merge();
dashboard.getRange('A2').values = [['Source: GS_Leads_Consolidated_20260802.xlsx. No lead is approved automatically.']];
dashboard.getRange('A4:B4').values = [['Metric', 'Count']];
dashboard.getRange('A5:A12').values = [
  ['Total lead rows'], ['Valid phone'], ['Valid email'], ['Phone only'], ['Email only'], ['Both phone and email'], ['No usable contact'], ['Previously messaged on WhatsApp']
];
dashboard.getRange('B5:B12').formulas = [
  [`=COUNTA('Lead Review'!$A$2:$A$${reviewed.length + 1})`],
  [`=COUNTIF('Lead Review'!$H$2:$H$${reviewed.length + 1},"Yes")`],
  [`=COUNTIF('Lead Review'!$I$2:$I$${reviewed.length + 1},"Yes")`],
  [`=COUNTIFS('Lead Review'!$H$2:$H$${reviewed.length + 1},"Yes",'Lead Review'!$I$2:$I$${reviewed.length + 1},"No")`],
  [`=COUNTIFS('Lead Review'!$H$2:$H$${reviewed.length + 1},"No",'Lead Review'!$I$2:$I$${reviewed.length + 1},"Yes")`],
  [`=COUNTIFS('Lead Review'!$H$2:$H$${reviewed.length + 1},"Yes",'Lead Review'!$I$2:$I$${reviewed.length + 1},"Yes")`],
  [`=COUNTIFS('Lead Review'!$H$2:$H$${reviewed.length + 1},"No",'Lead Review'!$I$2:$I$${reviewed.length + 1},"No")`],
  [`=COUNTIF('Lead Review'!$J$2:$J$${reviewed.length + 1},"Yes")`]
];
dashboard.getRange('D4:E4').values = [['Pilot control', 'Value']];
dashboard.getRange('D5:D9').values = [['WhatsApp queue rows'], ['Daily WhatsApp cap'], ['Email rows needing review'], ['Email rows approved'], ['Current status']];
dashboard.getRange('E5').formulas = [[`=COUNTA('WhatsApp Queue'!$C$2:$C$${whatsappQueue.length + 1})`]];
dashboard.getRange('E6').values = [[5]];
dashboard.getRange('E7').formulas = [[`=COUNTA('Email Review'!$A$2:$A$${emailReview.length + 1})`]];
dashboard.getRange('E8').formulas = [[`=COUNTIF('Email Review'!$H$2:$H$${emailReview.length + 1},"Approved")`]];
dashboard.getRange('E9').values = [['Pilot only - approval required']];

dashboard.getRange('A15:C15').values = [['Pilot Day', 'Planned Contacts', 'Cap Check']];
dashboard.getRange('A16:A21').values = Array.from({ length: 6 }, (_, index) => [`Day ${index + 1}`]);
dashboard.getRange('B16').formulas = [[`=COUNTIF('WhatsApp Queue'!$A$2:$A$${whatsappQueue.length + 1},A16)`]];
dashboard.getRange('B16:B21').fillDown();
dashboard.getRange('C16').formulas = [['=IF(B16<=$E$6,"Within cap","Over cap")']];
dashboard.getRange('C16:C21').fillDown();

dashboard.getRange('A24:B24').values = [['Contact availability', 'Lead rows']];
dashboard.getRange('A25:A28').values = [['Phone only'], ['Email only'], ['Both'], ['Neither']];
dashboard.getRange('B25:B28').formulas = [['=B8'], ['=B9'], ['=B10'], ['=B11']];
const chart = dashboard.charts.add('bar', dashboard.getRange('A24:B28'));
chart.title = 'Contact availability across 834 lead rows';
chart.hasLegend = false;
chart.yAxis = { numberFormatCode: '0' };
chart.setPosition('D12', 'J28');

rulesSheet.showGridLines = false;
rulesSheet.getRange('A1:B1').merge();
rulesSheet.getRange('A1').values = [['Outreach Rules and Review Method']];
rulesSheet.getRange('A3:B3').values = [['Rule', 'Requirement']];
rulesSheet.getRange('A4:B11').values = [
  ['WhatsApp daily cap', 'Maximum 5 first-contact messages per day.'],
  ['WhatsApp new contact', 'Use the permission-first message without a link.'],
  ['WhatsApp follow-up', 'Do not follow up an unanswered cold message. Send the link after interest or where a relationship is recorded.'],
  ['WhatsApp opt-out', 'Record STOP or a negative reply immediately and do not contact again.'],
  ['Email automation', 'Use only for website opt-ins or contacts with an approved business basis.'],
  ['Consolidated list', 'No row is approved automatically. Owner review is required.'],
  ['Pricing', 'Annual software starts at Rs. 10,000. Smart scale, on-site training, and travel are separate.'],
  ['Sequence', 'Seven inactive Brevo templates were created. Do not activate until sender, exit rules, and test contact are verified.']
];
rulesSheet.getRange('A14:B14').values = [['Source', 'URL']];
rulesSheet.getRange('A15:B18').values = [
  ['Brevo legitimate contact rules', 'https://help.brevo.com/hc/en-us/articles/213405965-Build-a-legitimate-contacts-database-for-optimal-deliverability-and-compliance'],
  ['Brevo contact API', 'https://developers.brevo.com/docs/synchronise-contact-lists'],
  ['WhatsApp Business Policy', 'https://whatsappbusiness.com/policy/'],
  ['TRAI UCC amendment', 'https://www.trai.gov.in/sites/default/files/2025-02/Regulation_12022025_0.pdf']
];
rulesSheet.getRange('A21:B21').values = [['Priority factor', 'Score used for queue order']];
rulesSheet.getRange('A22:B29').values = [
  ['Negotiation status', 60], ['High status', 50], ['Verified medium status', 42], ['Medium status', 34],
  ['Existing CRM source', 15], ['Verified source', 15], ['Valid phone', 5], ['Previously messaged', -30]
];

const headerFill = '#1B5E3B';
const headerFormat = { fill: headerFill, font: { bold: true, color: '#FFFFFF' }, wrapText: true, verticalAlignment: 'center' };
for (const [sheet, range] of [
  [reviewSheet, 'A1:R1'], [waSheet, 'A1:L1'], [emailSheet, 'A1:J1'],
  [dashboard, 'A4:B4'], [dashboard, 'D4:E4'], [dashboard, 'A15:C15'], [dashboard, 'A24:B24'],
  [rulesSheet, 'A3:B3'], [rulesSheet, 'A14:B14'], [rulesSheet, 'A21:B21']
]) sheet.getRange(range).format = headerFormat;
dashboard.getRange('A1:H1').format = { fill: '#102A1E', font: { bold: true, color: '#FFFFFF', size: 20 }, verticalAlignment: 'center' };
dashboard.getRange('A2:H2').format = { fill: '#EEF5EC', font: { color: '#3F3F46', italic: true }, wrapText: true };
rulesSheet.getRange('A1:D1').format = { fill: '#102A1E', font: { bold: true, color: '#FFFFFF', size: 18 } };

for (const sheet of [reviewSheet, waSheet, emailSheet]) {
  const used = sheet.getUsedRange(true);
  used.format.font = { name: 'Aptos', size: 10 };
  used.format.verticalAlignment = 'top';
}
reviewSheet.getRange(`C2:C${reviewed.length + 1}`).format.numberFormat = '@';
waSheet.getRange(`E2:E${whatsappQueue.length + 1}`).format.numberFormat = '@';
waSheet.getRange(`K2:K${whatsappQueue.length + 1}`).format.numberFormat = 'yyyy-mm-dd';

reviewSheet.getRange(`A1:R${reviewed.length + 1}`).format.autofitColumns();
reviewSheet.getRange(`B1:B${reviewed.length + 1}`).format.columnWidth = 28;
reviewSheet.getRange(`D1:D${reviewed.length + 1}`).format.columnWidth = 30;
reviewSheet.getRange(`O1:O${reviewed.length + 1}`).format.columnWidth = 42;
reviewSheet.getRange(`P1:P${reviewed.length + 1}`).format.columnWidth = 55;
reviewSheet.getRange(`O1:P${reviewed.length + 1}`).format.wrapText = true;
waSheet.getRange(`A1:L${whatsappQueue.length + 1}`).format.autofitColumns();
waSheet.getRange(`D1:D${whatsappQueue.length + 1}`).format.columnWidth = 32;
waSheet.getRange(`G1:G${whatsappQueue.length + 1}`).format.columnWidth = 24;
waSheet.getRange(`I1:I${whatsappQueue.length + 1}`).format.columnWidth = 24;
waSheet.getRange(`L1:L${whatsappQueue.length + 1}`).format.columnWidth = 32;
emailSheet.getRange(`A1:J${emailReview.length + 1}`).format.autofitColumns();
emailSheet.getRange(`B1:B${emailReview.length + 1}`).format.columnWidth = 30;
emailSheet.getRange(`C1:C${emailReview.length + 1}`).format.columnWidth = 34;
emailSheet.getRange(`I1:I${emailReview.length + 1}`).format.columnWidth = 29;
emailSheet.getRange(`J1:J${emailReview.length + 1}`).format.columnWidth = 55;
emailSheet.getRange(`J1:J${emailReview.length + 1}`).format.wrapText = true;
dashboard.getRange('A1:J28').format.columnWidth = 16;
dashboard.getRange('A1:A28').format.columnWidth = 29;
dashboard.getRange('D1:D28').format.columnWidth = 28;
dashboard.getRange('E1:E28').format.columnWidth = 25;
dashboard.getRange('A1:A1').format.rowHeight = 34;
dashboard.getRange('A2:A2').format.rowHeight = 30;
rulesSheet.getRange('A1:A29').format.columnWidth = 30;
rulesSheet.getRange('B1:B29').format.columnWidth = 95;
rulesSheet.getRange('B1:B29').format.wrapText = true;

reviewSheet.getRange(`R2:R${reviewed.length + 1}`).conditionalFormats.add('containsText', { text: 'Approved', format: { fill: '#DCFCE7', font: { color: '#166534', bold: true } } });
reviewSheet.getRange(`R2:R${reviewed.length + 1}`).conditionalFormats.add('containsText', { text: 'Do not contact', format: { fill: '#FEE2E2', font: { color: '#991B1B', bold: true } } });
waSheet.getRange(`H2:H${whatsappQueue.length + 1}`).conditionalFormats.add('containsText', { text: 'Approved', format: { fill: '#DCFCE7', font: { color: '#166534', bold: true } } });
waSheet.getRange(`J2:J${whatsappQueue.length + 1}`).conditionalFormats.add('containsText', { text: 'STOP', format: { fill: '#FEE2E2', font: { color: '#991B1B', bold: true } } });
emailSheet.getRange(`H2:H${emailReview.length + 1}`).conditionalFormats.add('containsText', { text: 'Approved', format: { fill: '#DCFCE7', font: { color: '#166534', bold: true } } });

await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(previewDir, { recursive: true });

const checks = await workbook.inspect({ kind: 'table', range: 'Dashboard!A1:J28', include: 'values,formulas', tableMaxRows: 30, tableMaxCols: 12, maxChars: 12000 });
console.log('DASHBOARD_CHECK');
console.log(checks.ndjson);
const queueCheck = await workbook.inspect({ kind: 'table', range: 'WhatsApp Queue!A1:L31', include: 'values,formulas', tableMaxRows: 35, tableMaxCols: 12, maxChars: 12000 });
console.log('QUEUE_CHECK');
console.log(queueCheck.ndjson);
const errors = await workbook.inspect({ kind: 'match', searchTerm: '#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A', options: { useRegex: true, maxResults: 300 }, summary: 'final formula error scan' });
console.log('FORMULA_ERRORS');
console.log(errors.ndjson);

const renderRanges = [
  ['All Leads', 'A1:N40'], ['Dashboard', 'A1:J28'], ['Lead Review', 'A1:R40'],
  ['WhatsApp Queue', 'A1:L31'], ['Email Review', 'A1:J35'], ['Rules', 'A1:B29']
];
for (const [sheetName, range] of renderRanges) {
  const preview = await workbook.render({ sheetName, range, scale: 1.2, format: 'png' });
  const safeName = sheetName.replace(/[^a-z0-9_-]+/gi, '_');
  await fs.writeFile(path.join(previewDir, `${safeName}.png`), new Uint8Array(await preview.arrayBuffer()));
}

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(JSON.stringify({ outputPath, sourceRows: rows.length, whatsappQueue: whatsappQueue.length, emailReview: emailReview.length }, null, 2));
