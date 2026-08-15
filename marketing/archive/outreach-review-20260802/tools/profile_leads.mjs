import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool';

const sourcePath = 'C:/projects/biz/gardensuite.in/marketing/whatsapp-campaigns/face-attendance-weight/GS_Leads_Consolidated_20260802.xlsx';
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(sourcePath));
const sheet = workbook.worksheets.getItem('All Leads');
const values = sheet.getUsedRange(true).values;
const headers = values[0].map((value) => String(value ?? '').trim());
const rows = values.slice(1).map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ''])));

const countBy = (field) => {
  const counts = new Map();
  for (const row of rows) {
    const key = String(row[field] ?? '').trim() || '(blank)';
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
};

const normalizePhone = (value) => String(value ?? '').replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');
const phoneOk = (value) => /^[6-9]\d{9}$/.test(normalizePhone(value));
const splitEmails = (value) => String(value ?? '').split(/[;,\s]+/).map((v) => v.trim().toLowerCase()).filter(Boolean);
const emailOk = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !/(example\.com|test@|name@)/.test(value);
const normalizeEstate = (value) => String(value ?? '')
  .toLowerCase()
  .replace(/^\[discovered\]\s*/, '')
  .replace(/\b(tea estate|t\.e\.|te)\b/g, '')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

const seenPhones = new Map();
const seenEmails = new Map();
const seenEstates = new Map();
let noValidContact = 0;
let validPhoneRows = 0;
let validEmailRows = 0;
let bothRows = 0;
let placeholderEmailRows = 0;
let suspiciousEstateRows = 0;

for (let index = 0; index < rows.length; index += 1) {
  const row = rows[index];
  const phones = ['Phone 1', 'Phone 2', 'Phone 3'].map((field) => normalizePhone(row[field])).filter(phoneOk);
  const emails = ['Email 1', 'Email 2', 'Email 3'].flatMap((field) => splitEmails(row[field]));
  const validEmails = emails.filter(emailOk);
  const hasPlaceholder = emails.some((email) => !emailOk(email));
  const estate = normalizeEstate(row['Estate Name']);
  if (phones.length) validPhoneRows += 1;
  if (validEmails.length) validEmailRows += 1;
  if (phones.length && validEmails.length) bothRows += 1;
  if (!phones.length && !validEmails.length) noValidContact += 1;
  if (hasPlaceholder) placeholderEmailRows += 1;
  if (!estate || /^(unknown|n a|na|nil|test)$/.test(estate)) suspiciousEstateRows += 1;
  for (const phone of new Set(phones)) {
    const list = seenPhones.get(phone) ?? [];
    list.push(index + 2);
    seenPhones.set(phone, list);
  }
  for (const email of new Set(validEmails)) {
    const list = seenEmails.get(email) ?? [];
    list.push(index + 2);
    seenEmails.set(email, list);
  }
  if (estate) {
    const list = seenEstates.get(estate) ?? [];
    list.push(index + 2);
    seenEstates.set(estate, list);
  }
}

const duplicateGroups = (map) => [...map.entries()].filter(([, indexes]) => indexes.length > 1);
const duplicateRows = (groups) => new Set(groups.flatMap(([, indexes]) => indexes)).size;

const profile = {
  totalRows: rows.length,
  validPhoneRows,
  validEmailRows,
  bothRows,
  noValidContact,
  placeholderEmailRows,
  suspiciousEstateRows,
  duplicatePhoneGroups: duplicateGroups(seenPhones).length,
  rowsSharingPhone: duplicateRows(duplicateGroups(seenPhones)),
  duplicateEmailGroups: duplicateGroups(seenEmails).length,
  rowsSharingEmail: duplicateRows(duplicateGroups(seenEmails)),
  duplicateEstateGroups: duplicateGroups(seenEstates).length,
  rowsSharingEstateName: duplicateRows(duplicateGroups(seenEstates)),
};

console.log(JSON.stringify(profile, null, 2));
for (const field of ['WA Status', 'CRM Status', 'Location']) {
  console.log(`\n${field}`);
  for (const [value, count] of countBy(field).slice(0, 40)) console.log(`${count}\t${value}`);
}

console.log('\nSource token counts');
const sourceCounts = new Map();
for (const row of rows) {
  for (const source of String(row.Sources ?? '').split(',').map((v) => v.trim()).filter(Boolean)) {
    sourceCounts.set(source, (sourceCounts.get(source) ?? 0) + 1);
  }
}
for (const [source, count] of [...sourceCounts.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`${count}\t${source}`);
}

console.log('\nPotential warm/pilot rows');
for (const row of rows.filter((row) => /Negotiation|Demo|Interested|Replied|Customer/i.test(String(row['CRM Status']))).slice(0, 50)) {
  console.log(JSON.stringify({ estate: row['Estate Name'], wa: row['WA Status'], crm: row['CRM Status'], location: row.Location, sources: row.Sources }));
}

console.log('\nChannel intersections');
const intersectionCounts = {
  validPhoneNotContacted: 0,
  validPhoneNotContactedNegotiation: 0,
  validPhoneNotContactedHigh: 0,
  validPhoneAlreadyContacted: 0,
  validEmailNegotiationOrHigh: 0,
  validEmailFromVerifiedSource: 0,
};
for (const row of rows) {
  const phones = ['Phone 1', 'Phone 2', 'Phone 3'].map((field) => normalizePhone(row[field])).filter(phoneOk);
  const validEmails = ['Email 1', 'Email 2', 'Email 3'].flatMap((field) => splitEmails(row[field])).filter(emailOk);
  const wa = String(row['WA Status'] ?? '').trim();
  const crm = String(row['CRM Status'] ?? '').trim();
  const sources = String(row.Sources ?? '');
  const notContacted = !wa || wa === 'Not sent';
  if (phones.length && notContacted) intersectionCounts.validPhoneNotContacted += 1;
  if (phones.length && notContacted && /Negotiation/i.test(crm)) intersectionCounts.validPhoneNotContactedNegotiation += 1;
  if (phones.length && notContacted && /High/i.test(crm)) intersectionCounts.validPhoneNotContactedHigh += 1;
  if (phones.length && !notContacted) intersectionCounts.validPhoneAlreadyContacted += 1;
  if (validEmails.length && /(Negotiation|High)/i.test(crm)) intersectionCounts.validEmailNegotiationOrHigh += 1;
  if (validEmails.length && /(verified_list|verified_emails_v2|midsize_verified|outreach_list)/i.test(sources)) intersectionCounts.validEmailFromVerifiedSource += 1;
}
console.log(JSON.stringify(intersectionCounts, null, 2));
