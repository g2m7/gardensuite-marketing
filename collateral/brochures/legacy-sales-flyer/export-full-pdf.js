const { chromium } = require("playwright");
const http = require("http");
const fs = require("fs");
const path = require("path");

const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

async function exportPdf() {
  const dir = __dirname;
  const outFile = path.resolve(dir, "../../../deliverables/brochures/GardenSuite-Full-Operations-Brochure-2026.pdf");
  fs.mkdirSync(path.dirname(outFile), { recursive: true });

  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    const filePath = path.join(dir, urlPath === "/" ? "full-brochure.html" : urlPath);
    const ext = path.extname(filePath);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end();
        return;
      }
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      res.end(data);
    });
  });

  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  console.log(`Static server on http://localhost:${port}`);

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1240, height: 1754 } });

  await page.goto(`http://localhost:${port}/full-brochure.html`, {
    waitUntil: "load",
    timeout: 60000,
  });
  await page.addStyleTag({
    content: `
      .toolbar { display: none !important; }
      body { padding-top: 0 !important; background: #fff !important; }
      .page { margin: 0 !important; box-shadow: none !important; border-radius: 0 !important; }
    `,
  });
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForTimeout(1200);

  await page.pdf({
    path: outFile,
    format: "A4",
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: true,
  });

  await browser.close();
  server.close();
  const size = (fs.statSync(outFile).size / 1024).toFixed(0);
  console.log(`Done: ${size} KB -> ${outFile}`);
}

exportPdf().catch((err) => {
  console.error("PDF export failed:", err);
  process.exit(1);
});
