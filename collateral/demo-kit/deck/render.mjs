// Render the demo deck to PDF and PNG previews.
// Usage (from repo root): node collateral/demo-kit/deck/render.mjs [--png <dir>]
import { createRequire } from 'node:module';
import { mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, '../../..');
const require = createRequire(resolve(repo, 'gs_landing/package.json'));
const { chromium } = require('playwright');

const deck = pathToFileURL(resolve(here, 'index.html')).href;
const outDir = resolve(repo, 'deliverables/demo-kit');
mkdirSync(outDir, { recursive: true });

const pngIdx = process.argv.indexOf('--png');
const pngDir = pngIdx > -1 ? resolve(process.argv[pngIdx + 1]) : null;

// Prefer installed Google Chrome so the script works without `playwright install`.
const browser = await chromium.launch({ channel: 'chrome' }).catch(() => chromium.launch());
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(deck, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

if (pngDir) {
  mkdirSync(pngDir, { recursive: true });
  const slides = await page.$$eval('.slide', (els) => els.map((e) => ({ id: e.id, steps: +e.dataset.steps || 0 })));
  for (const s of slides) {
    const shots = s.steps ? [...Array(s.steps).keys()] : [0];
    for (const st of shots) {
      await page.goto(`${deck}#${s.id}.${st + 1}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(700);
      await page.screenshot({ path: resolve(pngDir, `${s.id}_${st + 1}.png`) });
    }
  }
}

await page.goto(deck, { waitUntil: 'networkidle' });
await page.evaluate(async () => {
  document.querySelectorAll('img[loading="lazy"]').forEach((i) => (i.loading = 'eager'));
  await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => (i.onload = i.onerror = r)))));
});
await browser.close();

// PDF: Chrome's print-to-PDF flattens box-shadows, so render each slide's print
// layout as a screenshot instead and assemble the pages with make_pdf.py.
await page2pdf();

async function page2pdf() {
  const b2 = await chromium.launch({ channel: 'chrome' }).catch(() => chromium.launch());
  const p2 = await b2.newPage({ viewport: { width: 1920, height: 1280 }, deviceScaleFactor: 1.5 });
  await p2.emulateMedia({ media: 'print' });
  await p2.goto(deck, { waitUntil: 'networkidle' });
  await p2.evaluate(() => document.fonts.ready);
  await p2.waitForTimeout(400);
  const slidesDir = mkdtempSync(join(tmpdir(), 'gs-slides-'));
  const slides = await p2.$$('.slide');
  let i = 0;
  for (const el of slides) {
    i++;
    await el.screenshot({ path: join(slidesDir, `page-${String(i).padStart(2, '0')}.jpg`), type: 'jpeg', quality: 88 });
  }
  await b2.close();
  const pdf = resolve(outDir, 'GardenSuite-Live-Demo.pdf');
  execFileSync('python3', [resolve(here, 'make_pdf.py'), slidesDir, pdf], { stdio: 'inherit' });
  rmSync(slidesDir, { recursive: true, force: true });
  console.log('wrote', pdf);
}
