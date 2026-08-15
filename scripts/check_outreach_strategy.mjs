import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const currentPath = "marketing/outreach/CURRENT_STRATEGY.md";

const requiredDeprecatedFiles = [
  "marketing/archive/brevo-email-marketing/AGENT_INSTRUCTIONS.md",
  "marketing/archive/brevo-email-marketing/OVERVIEW.md",
  "marketing/archive/brevo-email-marketing/CONTACT_DATABASE.md",
  "marketing/archive/brevo-email-marketing/BREVO_SETUP.md",
  "marketing/archive/brevo-email-marketing/EMAIL_SEQUENCES.md",
  "marketing/archive/brevo-email-marketing/LANDING_PAGE_INTEGRATION.md",
  "marketing/archive/brevo-email-marketing/INDEX.md",
  "marketing/archive/brevo-email-marketing/QUICKSTART.md",
  "marketing/archive/whatsapp-face-attendance-weight/RESUME_SENDING.md",
  "marketing/archive/whatsapp-face-attendance-weight/README.md",
  "marketing/archive/whatsapp-face-attendance-weight/messages.md",
  "marketing/archive/email-sequence-attendance-scale.md",
];

async function text(path) {
  return readFile(resolve(repoRoot, path), "utf8");
}

const failures = [];
const agents = await text("AGENTS.md");
const claude = await text("CLAUDE.md");
const current = await text(currentPath);

if (!agents.includes(currentPath)) {
  failures.push(`AGENTS.md must point to ${currentPath}`);
}

if (
  agents.includes(
    "MUST read `marketing/archive/brevo-email-marketing/AGENT_INSTRUCTIONS.md`",
  )
) {
  failures.push(
    "AGENTS.md still makes the retired email instructions mandatory",
  );
}

if (!claude.includes(currentPath)) {
  failures.push(`CLAUDE.md must point to ${currentPath}`);
}

if (!current.slice(0, 500).includes("Status: CURRENT")) {
  failures.push(`${currentPath} must declare Status: CURRENT near the top`);
}

for (const path of requiredDeprecatedFiles) {
  const content = await text(path);
  if (!content.slice(0, 700).includes("Status: DEPRECATED")) {
    failures.push(`${path} must declare Status: DEPRECATED near the top`);
  }
  if (!content.slice(0, 700).includes(currentPath)) {
    failures.push(`${path} must point to ${currentPath} near the top`);
  }
}

if (failures.length) {
  console.error("Outreach strategy guard failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Outreach strategy guard passed.");
