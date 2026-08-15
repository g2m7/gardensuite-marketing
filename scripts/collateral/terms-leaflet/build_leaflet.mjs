import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const dataPath = path.join(root, 'deliverables/terms-leaflet/terms-values.json');
const outputDir = path.join(root, 'deliverables/terms-leaflet');
const htmlPath = path.join(outputDir, 'GardenSuite_Terms_Conditions_Print.html');
const pdfPath = path.join(outputDir, 'GardenSuite_Terms_Conditions_Leaflet.pdf');

const rows = JSON.parse(await fs.readFile(dataPath, 'utf8'));
await fs.mkdir(outputDir, { recursive: true });

const clean = (value = '') => String(value ?? '').replace(/[\u2013\u2014]/g, '-').trim();
const esc = (value = '') => clean(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');
const v = (index, col = 0) => rows[index]?.[col] ?? '';

function table(rowIndexes, options = {}) {
  const emphasis = new Set(options.emphasis ?? []);
  const caution = new Set(options.caution ?? []);
  const positive = new Set(options.positive ?? []);
  return `<table class="terms-table"><tbody>${rowIndexes.map((index) => {
    const classes = [
      emphasis.has(index) ? 'emphasis' : '',
      caution.has(index) ? 'caution' : '',
      positive.has(index) ? 'positive' : ''
    ].filter(Boolean).join(' ');
    return `<tr class="${classes}"><th>${esc(v(index, 0))}</th><td>${esc(v(index, 1))}</td></tr>`;
  }).join('')}</tbody></table>`;
}

function note(index, type = '') {
  return `<p class="note ${type}">${esc(v(index))}</p>`;
}

function heading(index, level = 'section') {
  const tag = level === 'subsection' ? 'h3' : 'h2';
  return `<${tag} class="${level}-heading">${esc(v(index))}</${tag}>`;
}

function section(index, body, classes = '') {
  return `<section class="document-section ${classes}">${heading(index)}${body}</section>`;
}

const generalTerms = [52, 53, 54, 55, 56]
  .map((index) => `<li>${esc(clean(v(index)).replace(/^\d+\.\s*/, ''))}</li>`)
  .join('');

const content = `
  <div class="page-intro">
    <div class="brand-block">
      <p class="company">${esc(v(0))}</p>
      <p class="address">${esc(v(1))}</p>
    </div>
    <div class="title-block">
      <p class="document-type">Official terms document</p>
      <h1>${esc(v(3))}</h1>
      <p>${esc(v(4))}</p>
    </div>
  </div>

  ${section(6,
    table([7, 8], { caution: [8] }) + note(9),
    'compact keep'
  )}

  ${section(11,
    table([12, 13], { caution: [13] }) + note(14, 'critical'),
    'travel-section keep'
  )}

  <div class="two-column-block">
    ${section(16, table([17, 18, 19]) + note(20), 'compact keep')}
    ${section(22, table([23, 24]) + note(25), 'compact keep')}
  </div>

  ${section(27,
    table([28, 29, 30, 31, 32]),
    'page-start'
  )}

  ${section(34,
    table([35, 36], { emphasis: [35, 36] }) + note(37),
    'compact keep'
  )}

  ${section(39,
    table([40], { positive: [40] }) + note(41),
    'compact keep'
  )}

  ${section(43,
    table([44, 45, 46, 47, 48], { emphasis: [46], positive: [45, 47, 48] }) + note(49),
    'compact'
  )}

  ${section(51,
    `<ol class="numbered-terms">${generalTerms}</ol>`,
    'compact keep'
  )}

  ${section(58,
    table([59, 60, 61, 62, 63, 64], { positive: [59, 60, 61, 62, 63, 64] }),
    'bank-section compact keep'
  )}

  ${section(67,
    `<p class="section-intro">${esc(v(68))}</p>` +
    heading(70, 'subsection') +
    table([71, 72, 73, 74, 75, 76, 77, 78], { emphasis: [73, 76] }),
    'page-start requirements'
  )}

  <section class="document-section requirements continuation">
    ${heading(80, 'subsection')}
    ${table([81, 82, 83, 84, 85, 86, 87])}
  </section>

  <section class="document-section requirements security-section page-start">
    ${heading(89, 'subsection')}
    ${table([90, 91, 92, 93, 94, 95], { emphasis: [91, 93, 95], caution: [92, 94] })}
    ${note(96, 'warning')}
  </section>

  ${section(98,
    table([99, 100, 101, 102, 103, 104]),
    'support-section'
  )}

  <div class="closing-mark">
    <span></span>
    <p>GardenSuite ERP<br><strong>Sarbani Associates</strong></p>
  </div>
`;

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(v(3))}</title>
  <style>
    :root {
      --ink: #17212b;
      --muted: #5b6875;
      --blue: #2e75b6;
      --blue-dark: #1f4e78;
      --blue-soft: #eaf3fa;
      --blue-pale: #f4f8fc;
      --line: #c8d1d9;
      --green: #e2f0d9;
      --green-ink: #456b2d;
      --orange: #fce4d6;
      --orange-ink: #833c00;
      --red: #c00000;
      --red-soft: #fde9e9;
      --cream: #fff5cf;
    }

    * { box-sizing: border-box; }
    html { color: var(--ink); background: #e8edf1; }
    body {
      width: 210mm;
      margin: 18px auto;
      padding: 13mm 13mm 16mm;
      background: #fff;
      font-family: Aptos, "Segoe UI", Arial, sans-serif;
      font-size: 9.25pt;
      line-height: 1.36;
      box-shadow: 0 12px 38px rgba(22, 35, 48, .16);
    }

    .print-control {
      position: fixed;
      top: 18px;
      right: 20px;
      z-index: 5;
      border: 0;
      border-radius: 5px;
      padding: 10px 16px;
      color: #fff;
      background: var(--blue-dark);
      font: 600 10pt Aptos, "Segoe UI", sans-serif;
      cursor: pointer;
      box-shadow: 0 5px 16px rgba(0,0,0,.18);
    }

    .page-intro { margin-bottom: 5mm; }
    .brand-block {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      border-bottom: 1.3mm solid var(--blue-dark);
      padding-bottom: 3mm;
      margin-bottom: 4mm;
    }
    .company {
      margin: 0;
      color: var(--blue-dark);
      font-family: Georgia, "Times New Roman", serif;
      font-size: 19pt;
      font-weight: 700;
      letter-spacing: .015em;
    }
    .address { margin: 0 0 .8mm; color: var(--muted); font-size: 8.5pt; }
    .title-block {
      color: #fff;
      background: var(--blue-dark);
      padding: 6mm 7mm 5.5mm;
    }
    .document-type {
      margin: 0 0 1.5mm;
      font-size: 7.7pt;
      font-weight: 700;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: #d9e9f5;
    }
    h1 {
      margin: 0;
      max-width: 175mm;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 17.5pt;
      line-height: 1.14;
      font-weight: 700;
    }
    .title-block > p:last-child { margin: 2.7mm 0 0; color: #dcebf6; font-size: 8.5pt; }

    .document-section { margin: 0 0 4mm; }
    .section-heading {
      margin: 0;
      padding: 2.2mm 3.2mm;
      color: #fff;
      background: var(--blue);
      font-size: 10.4pt;
      line-height: 1.2;
      font-weight: 700;
      break-after: avoid;
    }
    .subsection-heading {
      margin: 0;
      padding: 2.1mm 3.2mm;
      color: var(--blue-dark);
      background: #d9eaf7;
      border: 1px solid var(--line);
      border-bottom: 0;
      font-size: 9.7pt;
      line-height: 1.2;
      break-after: avoid;
    }
    .section-intro {
      margin: 0;
      padding: 3mm 3.2mm;
      color: #365a75;
      background: var(--blue-soft);
      border: 1px solid var(--line);
      border-top: 0;
    }
    .requirements .section-intro + .subsection-heading { margin-top: 3mm; }

    .terms-table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
      break-inside: auto;
    }
    .terms-table tr { break-inside: avoid; break-after: auto; }
    .terms-table th,
    .terms-table td {
      border: 1px solid var(--line);
      padding: 2.15mm 3mm;
      vertical-align: top;
      text-align: left;
    }
    .terms-table th {
      width: 28%;
      color: var(--blue-dark);
      background: var(--blue-pale);
      font-weight: 700;
    }
    .terms-table tr:nth-child(even) td { background: #f8fafb; }
    .terms-table tr.emphasis td { color: var(--red); font-weight: 700; background: var(--red-soft); }
    .terms-table tr.caution th,
    .terms-table tr.caution td { color: var(--orange-ink); background: var(--orange); }
    .terms-table tr.caution td { font-weight: 700; }
    .terms-table tr.positive th,
    .terms-table tr.positive td { background: var(--green); }
    .terms-table tr.positive td { color: var(--green-ink); font-weight: 700; }

    .note {
      margin: 0;
      padding: 2.1mm 3.2mm;
      color: #68737d;
      background: #fafafa;
      border: 1px solid var(--line);
      border-top: 0;
      font-size: 8pt;
      font-style: italic;
    }
    .note.critical {
      padding: 3.3mm 3.4mm;
      color: var(--red);
      background: var(--red-soft);
      border-left: 1.3mm solid var(--red);
      font-weight: 800;
      font-style: normal;
      line-height: 1.42;
    }
    .note.warning { color: var(--orange-ink); background: var(--cream); font-weight: 600; }
    .travel-section .section-heading { background: var(--blue-dark); }

    .two-column-block {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4mm;
      break-inside: avoid;
    }
    .two-column-block .terms-table th { width: 39%; }

    .numbered-terms {
      margin: 0;
      padding: 2mm 3mm 2mm 10mm;
      border: 1px solid var(--line);
      background: #fff;
    }
    .numbered-terms li { padding: 1.15mm 1mm; }
    .numbered-terms li + li { border-top: 1px solid #e1e6ea; }

    .bank-section .section-heading { background: #527d3a; }
    .bank-section .terms-table th,
    .bank-section .terms-table td { background: var(--green); }

    .continuation { margin-top: 0; }
    .closing-mark {
      display: flex;
      align-items: center;
      gap: 4mm;
      margin-top: 9mm;
      color: var(--blue-dark);
      break-inside: avoid;
    }
    .closing-mark span { width: 16mm; height: 1.2mm; background: var(--blue); }
    .closing-mark p { margin: 0; font-size: 8.5pt; line-height: 1.3; }

    .keep { break-inside: avoid; }
    .page-start { break-before: page; }

    @page { size: A4 portrait; margin: 13mm 12mm 17mm; }
    @media print {
      html { background: #fff; }
      body {
        width: auto;
        margin: 0;
        padding: 0;
        box-shadow: none;
        font-size: 8.8pt;
      }
      .print-control { display: none !important; }
      .document-section { margin-bottom: 3.4mm; }
      .page-intro { margin-bottom: 4mm; }
    }

    @media screen and (max-width: 820px) {
      body { width: 100%; margin: 0; padding: 22px 16px 36px; box-shadow: none; }
      .brand-block { display: block; }
      .address { margin-top: 8px; }
      .two-column-block { grid-template-columns: 1fr; }
      .print-control { position: static; display: block; margin: 0 0 16px auto; }
    }
  </style>
</head>
<body>
  <button class="print-control" type="button" onclick="window.print()">Print / Save PDF</button>
  <main>${content}</main>
</body>
</html>`;

await fs.writeFile(htmlPath, html, 'utf8');

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1024 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle' });
await page.emulateMedia({ media: 'print' });
await page.pdf({
  path: pdfPath,
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
  displayHeaderFooter: true,
  headerTemplate: '<div></div>',
  footerTemplate: `<div style="width:100%;padding:0 12mm;color:#657381;font:8px 'Segoe UI',Arial,sans-serif;display:flex;justify-content:space-between;align-items:center;"><span>GardenSuite ERP by Sarbani Associates</span><span>Terms &amp; Conditions&nbsp;&nbsp;|&nbsp;&nbsp;Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>`,
  margin: { top: '13mm', right: '12mm', bottom: '17mm', left: '12mm' }
});
await browser.close();

console.log(JSON.stringify({ htmlPath, pdfPath }, null, 2));
