import { readdir } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const retiredRootDirectories = new Set([
  ".playwright-mcp",
  "brand_pack",
  "brochure",
  "design-system",
  "generated_offers",
  "output",
  "outputs",
  "sales_flyer",
  "screenshots",
  "scrnsht",
  "tailark-refs",
  "tmp",
]);

const looseArtifactExtensions = new Set([
  ".docx",
  ".jpg",
  ".mp4",
  ".pdf",
  ".png",
  ".webp",
  ".xls",
  ".xlsx",
  ".zip",
]);

const failures = [];
const entries = await readdir(repoRoot, { withFileTypes: true });

for (const entry of entries) {
  if (entry.isDirectory() && retiredRootDirectories.has(entry.name)) {
    failures.push(`Move root directory ${entry.name}/ to its documented location`);
  }

  if (entry.isFile() && looseArtifactExtensions.has(extname(entry.name).toLowerCase())) {
    failures.push(`Move loose root artifact ${entry.name} to assets/, deliverables/, or .artifacts/`);
  }
}

if (failures.length) {
  console.error("Repository layout check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Repository layout check passed.");
