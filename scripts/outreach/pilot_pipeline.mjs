import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const repoRoot = resolve(new URL("../..", import.meta.url).pathname);
const defaultInput = resolve(
  repoRoot,
  "marketing/outreach/sep-2026-pilot/prospects.csv",
);
const defaultExport = resolve(
  repoRoot,
  "marketing/outreach/sep-2026-pilot/snov-import.csv",
);
const allowedDistricts = new Set(["dibrugarh", "tinsukia"]);
const allowedRoleTerms = [
  "owner",
  "founder",
  "director",
  "managing director",
  "general manager",
  "estate manager",
  "garden manager",
];

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (quoted) {
      if (char === '"' && next === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') quoted = true;
    else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") field += char;
  }

  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }

  const [headers = [], ...data] = rows;
  return data
    .filter((values) => values.some((value) => value.trim()))
    .map((values) =>
      Object.fromEntries(
        headers.map((header, index) => [header.trim(), values[index]?.trim() ?? ""]),
      ),
    );
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function toCsv(headers, rows) {
  return `${headers.join(",")}\n${rows
    .map((row) => headers.map((header) => csvCell(row[header])).join(","))
    .join("\n")}${rows.length ? "\n" : ""}`;
}

function normalized(value) {
  return String(value ?? "").trim().toLowerCase();
}

function isYes(value) {
  return normalized(value) === "yes";
}

function isNo(value) {
  return normalized(value) === "no";
}

function isUrl(value) {
  return /^https?:\/\/\S+$/i.test(value);
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function evaluateProspects(rows) {
  const seenAccounts = new Set();
  const seenEstates = new Set();
  const seenEmails = new Set();
  const evaluated = [];

  for (const row of rows) {
    const blockers = [];
    const accountKey = normalized(row.account_id);
    const estateKey = normalized(row.estate_name);
    const emailKey = normalized(row.contact_email);
    const hectares = Number(row.hectares);
    const title = normalized(row.contact_title);

    if (!accountKey) blockers.push("missing account_id");
    else if (seenAccounts.has(accountKey)) blockers.push("duplicate account_id");
    else seenAccounts.add(accountKey);

    if (!estateKey) blockers.push("missing estate_name");
    else if (seenEstates.has(estateKey)) blockers.push("duplicate estate_name");
    else seenEstates.add(estateKey);

    if (!allowedDistricts.has(normalized(row.district))) {
      blockers.push("district must be Dibrugarh or Tinsukia");
    }
    if (!Number.isFinite(hectares) || hectares < 50) {
      blockers.push("hectares must be at least 50");
    }
    if (!row.worker_count && !row.scale_proxy) {
      blockers.push("worker_count or scale_proxy is required");
    }
    if (normalized(row.corporate_review) !== "pass") {
      blockers.push("corporate_review must be Pass");
    }
    if (isYes(row.previously_rejected) && !row.rejection_override) {
      blockers.push("rejected account needs a documented override");
    }
    if (!isNo(row.current_client)) blockers.push("current_client must be No");
    if (!isNo(row.active_sales_discussion)) {
      blockers.push("active_sales_discussion must be No");
    }
    if (!row.account_source_urls?.split("|").some(isUrl)) {
      blockers.push("at least one account source URL is required");
    }
    if (!row.account_verified_date) blockers.push("account_verified_date is required");
    if (!row.contact_first_name) blockers.push("contact_first_name is required");
    if (!allowedRoleTerms.some((term) => title.includes(term))) {
      blockers.push("contact_title is not an approved decision-maker role");
    }
    if (!validEmail(row.contact_email)) blockers.push("contact_email is invalid");
    else if (seenEmails.has(emailKey)) blockers.push("duplicate contact_email");
    else seenEmails.add(emailKey);
    if (!isUrl(row.contact_source_url)) blockers.push("contact_source_url is required");
    if (!row.contact_verified_date) blockers.push("contact_verified_date is required");
    if (!isYes(row.estate_relationship_confirmed)) {
      blockers.push("estate_relationship_confirmed must be Yes");
    }
    if (normalized(row.snov_status) !== "valid") {
      blockers.push("snov_status must be Valid");
    }
    if (!isNo(row.suppressed)) blockers.push("suppressed must be No");
    if (!isYes(row.owner_approved)) blockers.push("owner_approved must be Yes");

    evaluated.push({ row, eligible: blockers.length === 0, blockers });
  }

  return evaluated;
}

export function buildReport(evaluated) {
  const eligible = evaluated.filter((item) => item.eligible);
  const blocked = evaluated.filter((item) => !item.eligible);
  const blockerCounts = {};

  for (const item of blocked) {
    for (const blocker of item.blockers) {
      blockerCounts[blocker] = (blockerCounts[blocker] ?? 0) + 1;
    }
  }

  return {
    checked: evaluated.length,
    eligible: eligible.length,
    blocked: blocked.length,
    launchReady: eligible.length === 20 && evaluated.length >= 20,
    blockerCounts,
    rows: evaluated.map((item) => ({
      account_id: item.row.account_id,
      estate_name: item.row.estate_name,
      eligible: item.eligible,
      blockers: item.blockers,
    })),
  };
}

async function main() {
  const command = process.argv[2] ?? "check";
  const inputPath = resolve(process.argv[3] ?? defaultInput);
  const outputPath = resolve(process.argv[4] ?? defaultExport);
  const rows = parseCsv(await readFile(inputPath, "utf8"));
  const evaluated = evaluateProspects(rows);
  const report = buildReport(evaluated);

  if (command === "check") {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  if (command !== "export") {
    throw new Error("Usage: node pilot_pipeline.mjs [check|export] [input.csv] [output.csv]");
  }

  const eligible = evaluated.filter((item) => item.eligible);
  if (eligible.length > 20) {
    throw new Error(`Refusing to export ${eligible.length} rows. Pilot cap is 20.`);
  }

  const headers = ["first_name", "last_name", "email", "estate_name", "account_id"];
  const exportRows = eligible.map(({ row }) => ({
    first_name: row.contact_first_name,
    last_name: row.contact_last_name,
    email: row.contact_email,
    estate_name: row.estate_name,
    account_id: row.account_id,
  }));

  await writeFile(outputPath, toCsv(headers, exportRows), "utf8");
  console.log(JSON.stringify({ ...report, outputPath, exported: exportRows.length }, null, 2));
}

if (process.argv[1] && resolve(process.argv[1]) === new URL(import.meta.url).pathname) {
  await main();
}
