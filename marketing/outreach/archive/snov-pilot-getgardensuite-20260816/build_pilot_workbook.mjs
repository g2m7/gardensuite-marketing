import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputPath = process.argv[2];
const previewDir = process.argv[3];

if (!outputPath || !previewDir) {
  throw new Error("Usage: node build_pilot_workbook.mjs <output.xlsx> <preview-dir>");
}

const teaBoardWb = "https://www.teaboard.gov.in/pdf/notice/Tea%20Directory-West%20Bengal.pdf";
const governmentArea = "https://commerce.gov.in/wp-content/uploads/2021/03/LOK-SABHA-17.3.2021-1.pdf";

const leads = [
  {
    accountId: "GS-WB-001",
    estate: "Bhatkawa Tea Estate",
    company: "Bhatkawa Tea Industries Ltd.",
    ownership: "Bhatkawa Tea Industries Ltd. / Jalan",
    state: "West Bengal",
    region: "Alipurduar, Dooars",
    totalHa: 783.46,
    teaHa: 634.47,
    areaBasis: "Tea Board directory, 2010 estate return",
    first: "Sudarshan",
    last: "Jalan",
    title: "CEO",
    email: "contact@bhatkawa.com",
    website: "https://www.bhatkawatea.com/",
    source1: teaBoardWb,
    source2: "https://www.bhatkawatea.com/contact.html",
    fit: "Large Dooars estate with field attendance and payroll complexity.",
    notes: "Tea Board contact and area are historical. Confirm current CEO and route."
  },
  {
    accountId: "GS-WB-002",
    estate: "Gopaldhara Tea Estate",
    company: "Gopaldhara Tea Co. Pvt. Ltd.",
    ownership: "Saria family / Gopaldhara and Rohini group",
    state: "West Bengal",
    region: "Mirik, Darjeeling",
    totalHa: 335.08,
    teaHa: 168.17,
    areaBasis: "Tea Board directory, 2010 estate return",
    first: "S. K.",
    last: "Saria",
    title: "CEO in Tea Board directory",
    email: "gopaldhara@gmail.com",
    website: "https://www.gopaldhara.com/",
    source1: teaBoardWb,
    source2: "https://www.gopaldhara.com/contact/",
    fit: "Darjeeling estate above the size threshold with a public estate address.",
    notes: "Confirm current role and preferred management email."
  },
  {
    accountId: "GS-WB-003",
    estate: "Goomtee Tea Estate",
    company: "Mahanadi Tea Company Pvt. Ltd.",
    ownership: "Kanoria family / Balaji Agro International",
    state: "West Bengal",
    region: "Kurseong, Darjeeling",
    totalHa: 234.7,
    teaHa: 134,
    areaBasis: "Tea Board directory, 2010 estate return",
    first: "Vrinda",
    last: "Kanoria",
    title: "Partner",
    email: "akctta@gmail.com",
    website: "https://kanoriatea.com/goomtee-tea-estate/",
    source1: "https://kanoriatea.com/activities/",
    source2: teaBoardWb,
    fit: "Independent family-operated Darjeeling estate with field and factory staff.",
    notes: "Public email is a group contact. Confirm it reaches the partner or estate management."
  },
  {
    accountId: "GS-WB-004",
    estate: "Kishoribagh Tea Estate",
    company: "R. D. Tea Limited",
    ownership: "Dhandhania family",
    state: "West Bengal",
    region: "Bidhannagar, Terai",
    totalHa: 170,
    teaHa: 170,
    areaBasis: "Company website states almost 170 hectares",
    first: "Sushil",
    last: "Dhandhania",
    title: "Joint Managing Director",
    email: "dhandhania.sushil@gmail.com",
    website: "https://rdtealimited.com/",
    source1: "https://rdtealimited.com/",
    source2: "https://contemporarybrokers.com/uploads/tea_time/Tea-time-April-June17-compressed.pdf",
    fit: "Terai estate with high field attendance volume and a public management contact.",
    notes: "Confirm the management title is still current."
  },
  {
    accountId: "GS-WB-005",
    estate: "Sourenee Tea Estate",
    company: "Sourenee Tea Estate",
    ownership: "J. P. Chowdhary / family operated",
    state: "West Bengal",
    region: "Mirik, Darjeeling",
    totalHa: 136.78,
    teaHa: 95.55,
    areaBasis: "Tea Board directory, 2010 estate return",
    first: "J. P.",
    last: "Chowdhary",
    title: "Owner/CEO in Tea Board directory",
    email: "soureneetg@gmail.com",
    website: "",
    source1: teaBoardWb,
    source2: "https://teajourney.pub/tea-tourism-offers-panacea-for-darjeelings-woes/",
    fit: "Single Darjeeling estate above 50 hectares with public estate contact.",
    notes: "Confirm current ownership, role, and preferred email."
  },
  {
    accountId: "GS-WB-006",
    estate: "Okayti Tea Estate",
    company: "Okayti Tea Company Ltd.",
    ownership: "Kumbat family / Okayti Tea Company",
    state: "West Bengal",
    region: "Mirik, Darjeeling",
    totalHa: 422.34,
    teaHa: 213.32,
    areaBasis: "Tea Board directory, 2010 estate return",
    first: "Antriksh",
    last: "Kumbat",
    title: "CEO in Tea Board directory",
    email: "sales@okayti.com",
    website: "https://okaytitea.com/",
    source1: teaBoardWb,
    source2: "https://okaytitea.com/",
    fit: "Large Darjeeling estate with public company contact.",
    notes: "Sales inbox may not reach the CEO. Confirm route and current role."
  },
  {
    accountId: "GS-WB-007",
    estate: "Gidapahar Tea Estate",
    company: "Gidapahar Tea Estate",
    ownership: "H. K. Shaw / proprietorship",
    state: "West Bengal",
    region: "Kurseong, Darjeeling",
    totalHa: 119.57,
    teaHa: 94.34,
    areaBasis: "Tea Board directory, 2010 estate return",
    first: "H. K.",
    last: "Shaw",
    title: "Owner",
    email: "giddapahar@rediffmail.com",
    website: "",
    source1: teaBoardWb,
    source2: "",
    fit: "Owner-operated Darjeeling estate above 50 hectares.",
    notes: "Confirm spelling, active ownership, and mailbox deliverability."
  },
  {
    accountId: "GS-WB-008",
    estate: "Jogmaya Tea Estate",
    company: "Jogmaya Tea Estate Pvt. Ltd.",
    ownership: "Johar family",
    state: "West Bengal",
    region: "Gayabari, Kurseong",
    totalHa: 207.54,
    teaHa: 107.27,
    areaBasis: "Tea Board directory, 2010 estate return",
    first: "Naina",
    last: "Johar",
    title: "CEO in Tea Board directory",
    email: "jogmayatea@yahoo.in",
    website: "",
    source1: teaBoardWb,
    source2: "",
    fit: "Owner-managed Darjeeling estate with over 100 hectares under tea.",
    notes: "Confirm current role and mailbox before use."
  },
  {
    accountId: "GS-WB-009",
    estate: "Indong Tea Estate",
    company: "Indong Tea Company Limited",
    ownership: "Asian Group / Hariram Garg",
    state: "West Bengal",
    region: "Matelli, Dooars",
    totalHa: 740.38,
    teaHa: 483.84,
    areaBasis: "Current company prospectus and website",
    first: "Hariram",
    last: "Garg",
    title: "Managing Director",
    email: "indong@asiangroup.in",
    website: "https://www.indongteaco.com/",
    source1: "https://www.indongteaco.com/investor-information.html",
    source2: "https://www.indongteaco.com/investors/DP-INDONG-TEA-10052022.pdf",
    fit: "Large Dooars estate with a current public managing-director route.",
    notes: "Apply corporate-group definition before qualification."
  },
  {
    accountId: "GS-WB-010",
    estate: "Kailashpur Tea Estate",
    company: "The Friends Tea Company Ltd.",
    ownership: "The Friends Tea Company Ltd.",
    state: "West Bengal",
    region: "Oodlabari, Dooars",
    totalHa: 404.81,
    teaHa: 294.54,
    areaBasis: "Tea Board directory, 2010 estate return",
    first: "Ranjit",
    last: "Balow",
    title: "CEO in Tea Board directory",
    email: "friendst@rediffmail.com",
    website: "",
    source1: teaBoardWb,
    source2: "",
    fit: "Dooars estate with nearly 300 hectares under tea.",
    notes: "Confirm current role, ownership, and preferred address."
  },
  {
    accountId: "GS-AS-001",
    estate: "Halmari Tea Estate",
    company: "Amarawati Tea Co. Ltd.",
    ownership: "Daga family / Amarawati Tea",
    state: "Assam",
    region: "Khowang, Dibrugarh",
    totalHa: 534,
    teaHa: 374.29,
    areaBasis: "Government list for Halmari tea area; company total includes adjoining Duliabam",
    first: "D. K.",
    last: "Arora",
    title: "General Manager",
    email: "halmari47@gmail.com",
    website: "https://www.halmaritea.com/",
    source1: "https://www.halmaritea.com/contact-us/",
    source2: governmentArea,
    fit: "Large Upper Assam estate with a named general manager and public estate inbox.",
    notes: "Confirm current GM and clarify Halmari-only versus combined estate area."
  },
  {
    accountId: "GS-AS-002",
    estate: "Menoka Tea Estate",
    company: "Menoka Tea Estate Pvt. Ltd.",
    ownership: "Roy family",
    state: "Assam",
    region: "Tamulpur/Baksa",
    totalHa: 352.88,
    teaHa: 318,
    areaBasis: "Current company website",
    first: "Pradeep Kumar",
    last: "Singh",
    title: "Estate Manager",
    email: "garden@menokatea.in",
    website: "https://menokatea.in/",
    source1: "https://menokatea.in/profile.php",
    source2: "https://menokatea.in/garden.php",
    fit: "Family-managed Assam estate with current named garden management.",
    notes: "Strong research candidate. Still requires Snov and suppression checks."
  },
  {
    accountId: "GS-AS-003",
    estate: "Deha Tea Estate",
    company: "Deha Assam Tea Co. Pvt. Ltd.",
    ownership: "Agarwalla family",
    state: "Assam",
    region: "Ladoigarh, Jorhat",
    totalHa: 266,
    teaHa: 266,
    areaBasis: "Current company website",
    first: "Satyanarayan",
    last: "Agarwalla",
    title: "Managing Director",
    email: "dehadib@yahoo.com",
    website: "https://www.dehaorganic.com/",
    source1: "https://www.dehaorganic.com/aboutus.html",
    source2: "https://www.dehaorganic.com/contact.html",
    fit: "Family-managed Jorhat estate with over 1,000 workers stated by the company.",
    notes: "Generic public inbox. Confirm it reaches current management."
  },
  {
    accountId: "GS-AS-004",
    estate: "Mokalbari Tea Estate",
    company: "Mokalbari Kanoi Tea Estate Pvt. Ltd.",
    ownership: "Kanoi/Jalan promoters; three-estate group",
    state: "Assam",
    region: "Upper Assam, Dibrugarh",
    totalHa: 285.32,
    teaHa: 256.22,
    areaBasis: "Current company website estate table",
    first: "Ajay",
    last: "Jalan",
    title: "Director",
    email: "exports@mokalbaritea.in",
    website: "https://mokalbaritea.in/",
    source1: "https://mokalbaritea.in/about-us/",
    source2: "https://www.zaubacorp.com/MOKALBARI-KANOI-TEA-ESTATE-PRIVATE-LIMITED-U70109WB1981PTC034158",
    fit: "Large Upper Assam estate with a current public director and company domain.",
    notes: "Exports inbox may not reach director. Apply corporate-group definition."
  },
  {
    accountId: "GS-AS-005",
    estate: "Halmira Tea Estate",
    company: "Halmira Estate Tea Pvt. Ltd.",
    ownership: "Newar group; five tea estates",
    state: "Assam",
    region: "Golaghat",
    totalHa: 477.12,
    teaHa: 477.12,
    areaBasis: "Government list, current company identity",
    first: "Arvind Kumar",
    last: "Newar",
    title: "Managing Director",
    email: "info@halmiratea.com",
    website: "https://halmiratea.com/",
    source1: "https://halmiratea.com/about-us/",
    source2: governmentArea,
    fit: "Large Assam estate with current public management and company contact.",
    notes: "Apply corporate-group definition because the group states five estates."
  },
  {
    accountId: "GS-AS-006",
    estate: "Bazaloni Tea Estate",
    company: "Bazaloni Group Limited",
    ownership: "Bazaloni Group; proposed Grob Tea acquisition reported in 2025",
    state: "Assam",
    region: "Makum Junction, Tinsukia",
    totalHa: 1000,
    teaHa: 1000,
    areaBasis: "Company website, two divisions combined",
    first: "Prem Babu",
    last: "Pandey",
    title: "Director in public company profile",
    email: "ho@bazaloni.com",
    website: "https://www.bazaloni.com/",
    source1: "https://www.bazaloni.com/",
    source2: "https://nsearchives.nseindia.com/corporate/GROBTEA_25112025165602_Regulation_30_of_SEBI__lodr_.pdf",
    fit: "Very large Assam estate with two divisions and substantial attendance operations.",
    notes: "High-priority ownership review. Confirm whether acquisition completed and whether excluded."
  },
  {
    accountId: "GS-AS-007",
    estate: "Durrung Tea Estate",
    company: "Durrung Tea Estate Limited",
    ownership: "Jalan family / Jalan Industries",
    state: "Assam",
    region: "Bindukuri, Sonitpur",
    totalHa: 400,
    teaHa: 400,
    areaBasis: "Current company website says nearly 400 hectares under tea",
    first: "Mrityunjay",
    last: "Jalan",
    title: "Managing Director",
    email: "admin@jalanindustries.com",
    website: "https://durrung.com/",
    source1: "https://durrung.com/index.html",
    source2: "https://durrung.com/docs/delisting/Outcome-Extracts-of-1st-BM-13.09.2024.pdf",
    fit: "Large Sonitpur estate with named current managing director and public corporate inbox.",
    notes: "Confirm the admin inbox route and apply corporate-group definition."
  },
  {
    accountId: "GS-AS-008",
    estate: "Jamguri Tea Estate",
    company: "Patco Plantations Pvt. Ltd.",
    ownership: "Patco Plantations; two-estate group",
    state: "Assam",
    region: "Oating, Golaghat",
    totalHa: 875,
    teaHa: 875,
    areaBasis: "Published study; company website confirms 1,325 hectares combined for Jamguri and Woka",
    first: "Amarnath",
    last: "Maitreyan",
    title: "Founder / public company contact",
    email: "enquiry.jamguri@gmail.com",
    website: "https://www.patcoplantations.co.in/",
    source1: "https://www.patcoplantations.co.in/about-us.htm",
    source2: "https://academicjournal.ijraw.com/media/post/IJRAW-2-10-4.1.pdf",
    fit: "Large Golaghat estate with a public company contact and 2,500 workers across two estates.",
    notes: "Confirm current founder role and individual estate area from a current primary source."
  },
  {
    accountId: "GS-AS-009",
    estate: "Muktabari Tea Estate",
    company: "Muktabari Tea Estate Pvt. Ltd.",
    ownership: "Barooah family",
    state: "Assam",
    region: "Baruanagar, Charaideo",
    totalHa: 131.1,
    teaHa: 96.9,
    areaBasis: "Government list for tea area; older directory reports 131.1 hectares total",
    first: "Gautam",
    last: "Barooah",
    title: "Managing Director",
    email: "info@muktabari.com",
    website: "https://muktabari.com/",
    source1: "https://muktabari.com/about-us/",
    source2: governmentArea,
    fit: "Family-managed Upper Assam estate above the size threshold.",
    notes: "Confirm current MD and whether info inbox routes to management."
  },
  {
    accountId: "GS-AS-010",
    estate: "Teloijan Tea Estate",
    company: "The Teloijan Tea Company Limited",
    ownership: "Poddar family / Teloijan Group",
    state: "Assam",
    region: "Moranhat, Dibrugarh",
    totalHa: 360,
    teaHa: 360,
    areaBasis: "CRISIL rating rationale says about 360 hectares plantation",
    first: "Arvind",
    last: "Poddar",
    title: "Director",
    email: "accounts@teloijan.com",
    website: "https://teloijan.in/",
    source1: "https://teloijan.in/",
    source2: "https://www.crisil.com/mnt/winshare/Ratings/RatingList/RatingDocs/WestBengalMfgCoPrivateLimited_August%2027%2C%202021_RR_277001.html",
    fit: "Large Dibrugarh estate with a current public board and company-domain email.",
    notes: "Accounts inbox may not reach a director. Apply corporate-group definition."
  }
];

const workbook = Workbook.create();
const dashboard = workbook.worksheets.add("Pilot Dashboard");
const accounts = workbook.worksheets.add("Estate Accounts");
const contacts = workbook.worksheets.add("Contacts");
const snov = workbook.worksheets.add("Snov Import");
const suppression = workbook.worksheets.add("Suppression");
const activity = workbook.worksheets.add("Activity Log");
const setup = workbook.worksheets.add("Setup Checklist");
const warmup = workbook.worksheets.add("Manual Warmup");
const sources = workbook.worksheets.add("Sources & Notes");

const colors = {
  green: "#1F6B4F",
  greenDark: "#173F33",
  greenLight: "#E8F1EC",
  cream: "#F7F3EA",
  ink: "#1C2A25",
  muted: "#66736E",
  line: "#D7DED9",
  amber: "#F6E4B4",
  red: "#F9D7D4",
  white: "#FFFFFF"
};

function titleBand(sheet, title, subtitle, endCol) {
  sheet.showGridLines = false;
  sheet.getRange(`A1:${endCol}1`).merge();
  sheet.getRange("A1").values = [[title]];
  sheet.getRange(`A1:${endCol}1`).format = {
    fill: colors.greenDark,
    font: { bold: true, color: colors.white, size: 18 },
    verticalAlignment: "center"
  };
  sheet.getRange(`A1:${endCol}1`).format.rowHeight = 34;
  sheet.getRange(`A2:${endCol}2`).merge();
  sheet.getRange("A2").values = [[subtitle]];
  sheet.getRange(`A2:${endCol}2`).format = {
    fill: colors.cream,
    font: { color: colors.muted, italic: true },
    wrapText: true,
    verticalAlignment: "center"
  };
  sheet.getRange(`A2:${endCol}2`).format.rowHeight = 32;
}

function styleHeader(range) {
  range.format = {
    fill: colors.green,
    font: { bold: true, color: colors.white },
    wrapText: true,
    verticalAlignment: "center",
    borders: { preset: "all", style: "thin", color: colors.line }
  };
  range.format.rowHeight = 30;
}

function styleBody(range) {
  range.format = {
    font: { color: colors.ink, size: 10 },
    wrapText: true,
    verticalAlignment: "top",
    borders: { preset: "all", style: "thin", color: colors.line }
  };
}

titleBand(
  dashboard,
  "GardenSuite Snov.io Pilot Control",
  "Research package for 20 estates. Status is review only. No contact is approved for sending.",
  "H"
);

dashboard.getRange("A4:B10").values = [
  ["Metric", "Value"],
  ["Estate accounts", null],
  ["West Bengal", null],
  ["Assam", null],
  ["Qualification = Ready", null],
  ["Snov import eligible", null],
  ["Do not contact", null]
];
dashboard.getRange("B5").formulas = [["=COUNTA('Estate Accounts'!A4:A23)"]];
dashboard.getRange("B6").formulas = [["=COUNTIF('Estate Accounts'!E4:E23,\"West Bengal\")"]];
dashboard.getRange("B7").formulas = [["=COUNTIF('Estate Accounts'!E4:E23,\"Assam\")"]];
dashboard.getRange("B8").formulas = [["=COUNTIF('Estate Accounts'!R4:R23,\"Ready\")"]];
dashboard.getRange("B9").formulas = [["=COUNTIF('Snov Import'!K4:K23,\"Yes\")"]];
dashboard.getRange("B10").formulas = [["=COUNTIF('Estate Accounts'!S4:S23,\"Yes\")"]];
styleHeader(dashboard.getRange("A4:B4"));
styleBody(dashboard.getRange("A5:B10"));
dashboard.getRange("B5:B10").format = { fill: colors.greenLight, font: { bold: true, color: colors.greenDark, size: 14 }, horizontalAlignment: "center" };

dashboard.getRange("D4:H4").values = [["Launch gate", "Status", "Owner", "Evidence", "Required action"]];
dashboard.getRange("D5:H12").values = [
  ["DMARC passes", "Open", "Kaushik", "DMARC missing on 2026-08-16", "Add monitoring record and test headers"],
  ["Mailbox identity confirmed", "Open", "Kaushik", "Alias vs full mailbox not recorded", "Record the primary login mailbox"],
  ["Spacemail permission", "Open", "Kaushik", "AUP conflicts with automated outreach", "Get written support confirmation"],
  ["30-day manual warm-up", "Open", "Kaushik", "Domain created 2026-08-09", "Complete legitimate mailbox use"],
  ["Corporate exclusion rule", "Open", "Owner", "Definition not recorded", "Approve a rule or named exclusion list"],
  ["All emails Snov Valid", "Open", "Outreach owner", "0 verified", "Verify all proposed contacts"],
  ["Suppression clear", "Open", "Outreach owner", "Not checked", "Check immediately before import"],
  ["Copy and cadence approved", "Open", "Owner", "Draft day 0/5/12 sequence", "Approve or edit"],
];
styleHeader(dashboard.getRange("D4:H4"));
styleBody(dashboard.getRange("D5:H12"));
dashboard.getRange("E5:E12").format = { fill: colors.amber, font: { bold: true, color: colors.ink }, horizontalAlignment: "center" };
dashboard.getRange("A14:H16").merge();
dashboard.getRange("A14").values = [["STOP: The workbook is a research tracker, not permission to send. Import eligibility remains No until every gate passes."]];
dashboard.getRange("A14:H16").format = { fill: colors.red, font: { bold: true, color: "#7A1F19", size: 12 }, wrapText: true, verticalAlignment: "center", horizontalAlignment: "center", borders: { preset: "outside", style: "medium", color: "#C65D55" } };
dashboard.getRange("A1:H16").format.rowHeight = 22;
dashboard.getRange("A1:H1").format.rowHeight = 34;
dashboard.getRange("A2:H2").format.rowHeight = 32;
dashboard.getRange("A14:H16").format.rowHeight = 28;
dashboard.getRange("A1:A16").format.columnWidth = 28;
dashboard.getRange("B1:B16").format.columnWidth = 16;
dashboard.getRange("C1:C16").format.columnWidth = 4;
dashboard.getRange("D1:D16").format.columnWidth = 28;
dashboard.getRange("E1:E16").format.columnWidth = 14;
dashboard.getRange("F1:F16").format.columnWidth = 18;
dashboard.getRange("G1:G16").format.columnWidth = 30;
dashboard.getRange("H1:H16").format.columnWidth = 34;
dashboard.freezePanes.freezeRows(3);

titleBand(accounts, "Estate Accounts", "One record per estate. All ownership decisions remain Manual Review until the exclusion rule is approved.", "T");
const accountHeaders = ["Account ID", "Estate name", "Operating company", "Ownership group", "State", "Region / district", "Total ha", "Tea ha", "Area basis", "Area verified", "Corporate review", "Existing client check", "Fit note", "Website", "Source 1", "Source 2", "Research date", "Qualification", "Do not contact", "Notes"];
accounts.getRange("A3:T3").values = [accountHeaders];
const accountRows = leads.map((lead) => [
  lead.accountId, lead.estate, lead.company, lead.ownership, lead.state, lead.region,
  lead.totalHa, lead.teaHa, lead.areaBasis, "Yes - source recorded", "Manual Review",
  "Clear - not in named client list", lead.fit, lead.website, lead.source1, lead.source2,
  new Date("2026-08-16T00:00:00+05:30"), "Research", "No", lead.notes
]);
accounts.getRange("A4:T23").values = accountRows;
styleHeader(accounts.getRange("A3:T3"));
styleBody(accounts.getRange("A4:T23"));
accounts.getRange("G4:H23").format.numberFormat = "0.00";
accounts.getRange("Q4:Q23").format.numberFormat = "yyyy-mm-dd";
accounts.getRange("K4:K23").format.fill = colors.amber;
accounts.getRange("R4:R23").format.fill = colors.cream;
accounts.getRange("K4:K23").dataValidation = { rule: { type: "list", values: ["Manual Review", "Approved - include", "Excluded - corporate", "Excluded - other"] } };
accounts.getRange("R4:R23").dataValidation = { rule: { type: "list", values: ["Research", "Ready", "Emailing", "Replied", "Demo", "Closed"] } };
accounts.getRange("S4:S23").dataValidation = { rule: { type: "list", values: ["No", "Yes"] } };
accounts.tables.add("A3:T23", true, "EstateAccountsTable");
accounts.freezePanes.freezeRows(3);
accounts.freezePanes.freezeColumns(2);

const accountWidths = [14, 26, 28, 32, 16, 24, 11, 11, 34, 18, 20, 24, 38, 28, 46, 46, 14, 16, 15, 42];
accountWidths.forEach((width, index) => accounts.getRangeByIndexes(0, index, 24, 1).format.columnWidth = width);

titleBand(contacts, "Primary Contacts", "Public business contacts only. Every address still needs Snov verification and a suppression check.", "Q");
const contactHeaders = ["Contact ID", "Account ID", "Estate", "First name", "Last name", "Full name", "Title", "Email", "Email source", "Email verification", "Verification date", "Public business contact", "Suppression clear", "Suppression checked", "Primary contact", "Contact status", "Notes"];
contacts.getRange("A3:Q3").values = [contactHeaders];
const contactRows = leads.map((lead, index) => [
  `GS-C-${String(index + 1).padStart(3, "0")}`, lead.accountId, lead.estate, lead.first, lead.last,
  `${lead.first} ${lead.last}`, lead.title, lead.email, lead.source1, "Needs Snov verification", null,
  "Yes - publicly listed", "Not checked", null, "Yes", "Research", lead.notes
]);
contacts.getRange("A4:Q23").values = contactRows;
styleHeader(contacts.getRange("A3:Q3"));
styleBody(contacts.getRange("A4:Q23"));
contacts.getRange("J4:J23").format.fill = colors.amber;
contacts.getRange("M4:M23").format.fill = colors.amber;
contacts.getRange("K4:K23").format.numberFormat = "yyyy-mm-dd";
contacts.getRange("N4:N23").format.numberFormat = "yyyy-mm-dd";
contacts.getRange("J4:J23").dataValidation = { rule: { type: "list", values: ["Needs Snov verification", "Valid", "Invalid", "Unknown", "Catch-all", "Unverifiable"] } };
contacts.getRange("M4:M23").dataValidation = { rule: { type: "list", values: ["Not checked", "Yes", "No"] } };
contacts.getRange("P4:P23").dataValidation = { rule: { type: "list", values: ["Research", "Ready", "Suppressed", "Invalid"] } };
contacts.tables.add("A3:Q23", true, "ContactsTable");
contacts.freezePanes.freezeRows(3);
contacts.freezePanes.freezeColumns(3);
const contactWidths = [14, 14, 26, 18, 18, 26, 30, 32, 46, 24, 16, 22, 20, 18, 16, 16, 42];
contactWidths.forEach((width, index) => contacts.getRangeByIndexes(0, index, 24, 1).format.columnWidth = width);

titleBand(snov, "Snov Import Staging", "Do not export or import until Import eligible is Yes. The current expected count is zero.", "L");
const snovHeaders = ["email", "first_name", "last_name", "company_name", "position", "estate_name", "estate_account_id", "region", "hectares", "ownership_review", "import_eligible", "block_reason"];
snov.getRange("A3:L3").values = [snovHeaders];
const snovRows = leads.map((lead) => [lead.email, lead.first, lead.last, lead.estate, lead.title, lead.estate, lead.accountId, lead.region, lead.teaHa, "Manual Review", null, null]);
snov.getRange("A4:J23").values = snovRows.map((row) => row.slice(0, 10));
for (let row = 4; row <= 23; row += 1) {
  snov.getRange(`K${row}`).formulas = [[`=IF(AND('Contacts'!J${row}=\"Valid\",'Contacts'!M${row}=\"Yes\",'Estate Accounts'!K${row}=\"Approved - include\",'Estate Accounts'!R${row}=\"Ready\",'Estate Accounts'!S${row}=\"No\"),\"Yes\",\"No\")`]];
  snov.getRange(`L${row}`).formulas = [[`=IF(K${row}=\"Yes\",\"\",IF('Contacts'!J${row}<>\"Valid\",\"Email not Snov Valid\",IF('Contacts'!M${row}<>\"Yes\",\"Suppression not clear\",IF('Estate Accounts'!K${row}<>\"Approved - include\",\"Ownership not approved\",IF('Estate Accounts'!R${row}<>\"Ready\",\"Estate not Ready\",\"Do Not Contact\")))))`]];
}
styleHeader(snov.getRange("A3:L3"));
styleBody(snov.getRange("A4:L23"));
snov.getRange("K4:K23").format = { fill: colors.red, font: { bold: true, color: "#7A1F19" }, horizontalAlignment: "center", borders: { preset: "all", style: "thin", color: colors.line } };
snov.tables.add("A3:L23", true, "SnovImportTable");
snov.freezePanes.freezeRows(3);
snov.freezePanes.freezeColumns(1);
const snovWidths = [32, 18, 18, 28, 30, 28, 18, 24, 12, 22, 18, 30];
snovWidths.forEach((width, index) => snov.getRangeByIndexes(0, index, 24, 1).format.columnWidth = width);

titleBand(suppression, "Master Suppression Register", "A Yes here overrides every campaign stage. Never delete a suppression record.", "K");
const suppressionHeaders = ["Suppression ID", "Email", "Phone", "Account ID", "Estate", "Reason", "Source", "Applied date", "Applied by", "Permanent", "Notes"];
suppression.getRange("A3:K3").values = [suppressionHeaders];
suppression.getRange("A4:K53").values = Array.from({ length: 50 }, () => Array(11).fill(null));
styleHeader(suppression.getRange("A3:K3"));
styleBody(suppression.getRange("A4:K53"));
suppression.getRange("H4:H53").format.numberFormat = "yyyy-mm-dd";
suppression.getRange("J4:J53").dataValidation = { rule: { type: "list", values: ["Yes", "No"] } };
suppression.tables.add("A3:K53", true, "SuppressionTable");
suppression.freezePanes.freezeRows(3);
const suppressionWidths = [18, 32, 18, 16, 28, 24, 22, 16, 18, 14, 40];
suppressionWidths.forEach((width, index) => suppression.getRangeByIndexes(0, index, 54, 1).format.columnWidth = width);

titleBand(activity, "Activity Log", "Record every external touch, reply, outcome, and next action at estate-account level.", "L");
const activityHeaders = ["Activity ID", "Account ID", "Contact ID", "Estate", "Date/time", "Channel", "Message version", "Sender", "Outcome", "Next action", "Next action date", "Notes"];
activity.getRange("A3:L3").values = [activityHeaders];
activity.getRange("A4:L103").values = Array.from({ length: 100 }, () => Array(12).fill(null));
styleHeader(activity.getRange("A3:L3"));
styleBody(activity.getRange("A4:L103"));
activity.getRange("E4:E103").format.numberFormat = "yyyy-mm-dd hh:mm";
activity.getRange("K4:K103").format.numberFormat = "yyyy-mm-dd";
activity.getRange("F4:F103").dataValidation = { rule: { type: "list", values: ["Email", "Reply", "Phone", "WhatsApp", "Demo", "Internal"] } };
activity.tables.add("A3:L103", true, "ActivityTable");
activity.freezePanes.freezeRows(3);
const activityWidths = [18, 16, 16, 28, 20, 14, 20, 24, 24, 34, 18, 44];
activityWidths.forEach((width, index) => activity.getRangeByIndexes(0, index, 104, 1).format.columnWidth = width);

titleBand(setup, "Setup and Launch Checklist", "Keep the Snov.io campaign in draft until every required item is Verified or Approved.", "G");
const setupHeaders = ["Category", "Check", "Status", "Owner", "Due date", "Evidence / result", "Next action"];
const setupRows = [
  ["Domain", "Domain registration age", "Verified", "Kaushik", new Date("2026-09-09T00:00:00+05:30"), "Created 2026-08-09", "Review after day 30"],
  ["DNS", "MX points to Spacemail", "Verified", "Kaushik", null, "mx1 and mx2.spacemail.com", "No change"],
  ["DNS", "SPF present", "Verified", "Kaushik", null, "include:spf.spacemail.com", "Do not create a second SPF record"],
  ["DNS", "DKIM record present", "Verified", "Kaushik", null, "spacemail selector present", "Confirm DKIM pass on a sent test"],
  ["DNS", "DMARC present and passing", "Open", "Kaushik", null, "Missing on 2026-08-16", "Add p=none record and inspect headers"],
  ["Brand", "New domain redirects to gardensuite.in", "Verified", "Kaushik", null, "HTTP and HTTPS redirect", "No change"],
  ["Mailbox", "Kaushik address type confirmed", "Open", "Kaushik", null, "Alias vs full mailbox unknown", "Record primary mailbox login"],
  ["Provider", "Spacemail permission received", "Open", "Kaushik", null, "Not requested/recorded", "Send permission request"],
  ["Warm-up", "30-day legitimate manual use complete", "Open", "Kaushik", new Date("2026-09-08T00:00:00+05:30"), "Not complete", "Use Manual Warmup sheet"],
  ["Snov.io", "SMTP test passes", "Open", "Kaushik", null, "Not connected", "Connect with port 465 SSL"],
  ["Snov.io", "IMAP reply detection passes", "Open", "Kaushik", null, "Not tested", "Reply from controlled inbox"],
  ["Targeting", "Corporate exclusion rule approved", "Open", "Owner", null, "Definition missing", "Approve rule or named list"],
  ["Data", "All contacts Snov Valid", "Open", "Outreach owner", null, "0 of 20", "Verify every email"],
  ["Data", "Suppression clear immediately before import", "Open", "Outreach owner", null, "Not checked", "Check master register"],
  ["Campaign", "Day 0, 5, 12 cadence approved", "Open", "Owner", null, "Proposed only", "Approve or edit"],
  ["Campaign", "Message copy approved", "Open", "Owner", null, "Draft only", "Approve version GS-ATT-TRUST-V1"],
  ["Support", "Response targets approved", "Open", "Owner", null, "No customer SLA approved", "Approve support policy before promise"],
  ["Ownership", "Outreach and demo owners named", "Open", "Owner", null, "Names not recorded", "Assign owners"],
  ["Test", "SPF/DKIM/DMARC pass in headers", "Open", "Kaushik", null, "Not tested", "Run three-provider internal test"],
  ["Test", "Variables and stop condition pass", "Open", "Kaushik", null, "Not tested", "Preview and reply test"],
];
setup.getRange("A3:G3").values = [setupHeaders];
setup.getRange("A4:G23").values = setupRows;
styleHeader(setup.getRange("A3:G3"));
styleBody(setup.getRange("A4:G23"));
setup.getRange("C4:C23").dataValidation = { rule: { type: "list", values: ["Open", "In progress", "Verified", "Approved", "Blocked"] } };
setup.getRange("E4:E23").format.numberFormat = "yyyy-mm-dd";
setup.getRange("C4:C23").format.fill = colors.amber;
setup.tables.add("A3:G23", true, "SetupChecklistTable");
setup.freezePanes.freezeRows(3);
const setupWidths = [18, 36, 16, 20, 16, 42, 40];
setupWidths.forEach((width, index) => setup.getRangeByIndexes(0, index, 24, 1).format.columnWidth = width);

titleBand(warmup, "Manual Warm-up Log", "Legitimate person-to-person email only. Do not use the 20 cold pilot leads and do not enable automated warm-up.", "H");
const warmupHeaders = ["Date", "Age day", "Daily ceiling", "Actual sent", "Replies received", "Test placement", "Auth result", "Notes"];
const warmupRows = [];
const start = new Date("2026-08-17T00:00:00+05:30");
for (let index = 0; index < 23; index += 1) {
  const date = new Date(start.getTime() + index * 86400000);
  const ageDay = index + 8;
  let ceiling = 5;
  if (ageDay >= 15 && ageDay <= 21) ceiling = 8;
  if (ageDay >= 22 && ageDay <= 28) ceiling = 12;
  if (ageDay >= 29) ceiling = 15;
  warmupRows.push([date, ageDay, ceiling, null, null, "Not checked", "Not checked", ""]);
}
warmup.getRange("A3:H3").values = [warmupHeaders];
warmup.getRange("A4:H26").values = warmupRows;
styleHeader(warmup.getRange("A3:H3"));
styleBody(warmup.getRange("A4:H26"));
warmup.getRange("A4:A26").format.numberFormat = "yyyy-mm-dd";
warmup.getRange("F4:F26").dataValidation = { rule: { type: "list", values: ["Not checked", "Inbox", "Promotions", "Spam", "Mixed"] } };
warmup.getRange("G4:G26").dataValidation = { rule: { type: "list", values: ["Not checked", "SPF/DKIM/DMARC pass", "Fail"] } };
warmup.tables.add("A3:H26", true, "ManualWarmupTable");
warmup.freezePanes.freezeRows(3);
const warmupWidths = [16, 12, 16, 14, 18, 18, 26, 44];
warmupWidths.forEach((width, index) => warmup.getRangeByIndexes(0, index, 27, 1).format.columnWidth = width);

titleBand(sources, "Sources and Operating Notes", "Source URLs are evidence for research, not proof that an email is currently deliverable.", "D");
sources.getRange("A3:D3").values = [["Topic", "Source", "Checked", "Note"]];
const sourceRows = [
  ["Current outreach strategy", "marketing/outreach/CURRENT_STRATEGY.md", new Date("2026-08-16T00:00:00+05:30"), "Highest repository authority after latest user direction"],
  ["Spacemail SMTP/IMAP", "https://www.spaceship.com/knowledgebase/connect-spacemail-to-email-client/", new Date("2026-08-16T00:00:00+05:30"), "mail.spacemail.com, SMTP 465 SSL, IMAP 993 SSL"],
  ["Spacemail aliases", "https://www.spaceship.com/en-GB/knowledgebase/setup-email-aliases-spacemail/", new Date("2026-08-16T00:00:00+05:30"), "Alias can send/receive but cannot log in"],
  ["Spacemail AUP", "https://www.spaceship.com/legal/hosting-aup/", new Date("2026-08-16T00:00:00+05:30"), "Automated warm-up and unsolicited mass email restrictions"],
  ["Snov SMTP setup", "https://snov.io/knowledgebase/setup-an-smtp-account/", new Date("2026-08-16T00:00:00+05:30"), "Custom SMTP and alias setup"],
  ["Snov variables", "https://snov.io/knowledgebase/how-to-add-variables-to-emails/", new Date("2026-08-16T00:00:00+05:30"), "Double curly variables are supported"],
  ["Snov warm-up", "https://snov.io/knowledgebase/snov-io-email-warm-up-tool/", new Date("2026-08-16T00:00:00+05:30"), "Snov recommends four weeks, but do not enable against provider policy"],
  ["Snov sending", "https://snov.io/knowledgebase/how-email-sending-works/", new Date("2026-08-16T00:00:00+05:30"), "Snov uses provider servers, so provider rules apply"],
  ["Snov tracking", "https://snov.io/knowledgebase/how-to-track-open-rates-in-email-campaigns/", new Date("2026-08-16T00:00:00+05:30"), "Tracking can reduce deliverability; keep it off"],
  ["West Bengal area/contact directory", teaBoardWb, new Date("2026-08-16T00:00:00+05:30"), "Many records are based on 2010 estate returns and require current checks"],
  ["Assam area list", governmentArea, new Date("2026-08-16T00:00:00+05:30"), "Government source used for selected estate area checks"],
  ["Existing-client exclusion", "AGENTS.md product context", new Date("2026-08-16T00:00:00+05:30"), "No named current GardenSuite client is included"],
  ["Corporate exclusion", "Decision missing", new Date("2026-08-16T00:00:00+05:30"), "All ownership decisions remain Manual Review"],
  ["Import policy", "This workbook", new Date("2026-08-16T00:00:00+05:30"), "Only rows with Import eligible = Yes may be exported"],
];
sources.getRange(`A4:D${sourceRows.length + 3}`).values = sourceRows;
styleHeader(sources.getRange("A3:D3"));
styleBody(sources.getRange(`A4:D${sourceRows.length + 3}`));
sources.getRange(`C4:C${sourceRows.length + 3}`).format.numberFormat = "yyyy-mm-dd";
sources.tables.add(`A3:D${sourceRows.length + 3}`, true, "SourcesTable");
sources.freezePanes.freezeRows(3);
[26, 70, 16, 62].forEach((width, index) => sources.getRangeByIndexes(0, index, sourceRows.length + 4, 1).format.columnWidth = width);

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.mkdir(previewDir, { recursive: true });

const inspection = await workbook.inspect({
  kind: "workbook,sheet",
  maxChars: 4000
});
console.log(inspection.ndjson);

for (const sheetName of ["Pilot Dashboard", "Estate Accounts", "Contacts", "Snov Import", "Setup Checklist", "Manual Warmup"]) {
  const preview = await workbook.render({ sheetName, autoCrop: "all", scale: 0.8, format: "png" });
  const safeName = sheetName.toLowerCase().replaceAll(" ", "-");
  await fs.writeFile(path.join(previewDir, `${safeName}.png`), new Uint8Array(await preview.arrayBuffer()));
}

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(outputPath);
await fs.rm(`${outputPath}.inspect.ndjson`, { force: true });
console.log(`Saved ${outputPath}`);
