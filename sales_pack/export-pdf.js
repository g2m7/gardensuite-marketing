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
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

async function exportPdf() {
  const dir = __dirname;
  const outFile = path.join(dir, "GardenSuite-Attendance-Sales-Pack-2026.pdf");

  // Spin up a tiny static server so fonts/images load correctly
  const server = http.createServer((req, res) => {
    const filePath = path.join(dir, req.url === "/" ? "index.html" : req.url);
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

  console.log(`  Static server on http://localhost:${port}`);
  console.log("  Launching Chromium...");

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(`http://localhost:${port}/index.html`, {
    waitUntil: "networkidle",
  });

  // Hide the toolbar for PDF
  await page.addStyleTag({
    content: `
      .toolbar { display: none !important; }
      body { padding-top: 0 !important; background: #fff !important; }
      .page { margin: 0 !important; box-shadow: none !important; border-radius: 0 !important; }
    `,
  });

  // Wait for fonts and icons to load
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForTimeout(1500);

  console.log("  Rendering PDF...");

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
  console.log(`\n  Done! ${size} KB -> ${outFile}\n`);
}

exportPdf().catch((err) => {
  console.error("PDF export failed:", err);
  process.exit(1);
});
