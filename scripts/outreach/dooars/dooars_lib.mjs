import { createHash } from "node:crypto";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const repoRoot = resolve(fileURLToPath(new URL("../../..", import.meta.url)));
export const projectDir = resolve(
  repoRoot,
  "marketing/outreach/dooars-intelligence",
);
export const cacheDir = resolve(repoRoot, ".artifacts/dooars-intelligence");
export const dataDir = resolve(projectDir, "data");
export const manualDir = resolve(projectDir, "manual");
export const importsDir = resolve(projectDir, "imports");

const ACTIVE_STATUSES = new Set(["active_confirmed", "likely_active"]);
const STATUS_VALUES = new Set([
  "active_confirmed",
  "likely_active",
  "temporarily_closed",
  "closed",
  "unknown",
]);
const CONFIDENCE_VALUES = new Set(["high", "medium", "low", "unknown"]);
const DOOARS_SUBDIVISIONS = new Set([
  "MATELLI",
  "JALPAIGURI",
  "NAGRAKATA",
  "KALCHINI",
  "MAINAGURI",
  "MADARIHAT",
  "FALAKATA",
  "KUMARGRAM",
  "DHUPGURI",
  "ALIPURDUAR",
]);

export const HEADERS = {
  gardens: [
    "garden_id",
    "canonical_name",
    "normalized_name",
    "current_status",
    "status_confidence",
    "status_checked_date",
    "district_current",
    "subdivision_or_block",
    "tea_board_registration",
    "atlas_index",
    "historical_area_ha",
    "tea_area_ha",
    "current_company_id",
    "current_owner_confidence",
    "last_material_event_date",
    "contact_confirmed_active",
    "research_state",
    "source_ids",
    "notes",
  ],
  aliases: [
    "garden_id",
    "alias",
    "normalized_alias",
    "alias_type",
    "source_id",
    "confidence",
    "reviewed",
    "notes",
  ],
  companies: [
    "company_id",
    "legal_name",
    "normalized_name",
    "cin",
    "company_status",
    "website",
    "domain",
    "registered_office",
    "parent_group",
    "public_company",
    "source_ids",
    "verified_date",
    "notes",
  ],
  links: [
    "garden_id",
    "company_id",
    "relationship",
    "valid_from",
    "valid_to",
    "current_claim",
    "confidence",
    "source_id",
    "verified_date",
    "notes",
  ],
  evidence: [
    "evidence_id",
    "garden_id",
    "company_id",
    "contact_id",
    "evidence_type",
    "event_type",
    "title",
    "url",
    "publisher",
    "published_date",
    "retrieved_date",
    "language",
    "supports_active",
    "supports_inactive",
    "ownership_from",
    "ownership_to",
    "relationship",
    "excerpt",
    "confidence",
    "manual_review",
    "notes",
  ],
  contacts: [
    "contact_id",
    "company_id",
    "garden_id",
    "name",
    "title",
    "business_email",
    "email_status",
    "business_phone",
    "source_url",
    "verified_date",
    "estate_relationship_confirmed",
    "public_business_contact",
    "suppressed",
    "owner_approved",
    "notes",
  ],
  review: [
    "review_id",
    "review_type",
    "garden_id",
    "candidate_id",
    "source_id",
    "source_name",
    "candidate_name",
    "match_score",
    "reason",
    "source_url",
    "created_date",
    "status",
  ],
};

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function toCsv(headers, rows) {
  return `${headers.join(",")}\n${rows
    .map((row) => headers.map((header) => csvCell(row[header])).join(","))
    .join("\n")}${rows.length ? "\n" : ""}`;
}

export function parseCsv(text) {
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
      } else if (char === '"') quoted = false;
      else field += char;
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
        headers.map((header, index) => [
          header.trim(),
          values[index]?.trim() ?? "",
        ]),
      ),
    );
}

export function normalizeGardenName(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/teagarden/g, "tea garden")
    .replace(/dooars/g, "duars")
    .replace(/\btea\s*(estate|garden)\b/g, " ")
    .replace(/\b(t\s*\.?\s*e|t\s*\.?\s*g)\b/g, " ")
    .replace(/\b(garden|estate)\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function normalizeCompanyName(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/dooars/g, "duars")
    .replace(/^the\s+/g, "")
    .replace(/\bco\b/g, " company ")
    .replace(/\b(private|pvt)\b/g, " private ")
    .replace(/\b(limited|ltd)\b/g, " limited ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function titleCase(value) {
  const keepUpper = new Set(["TE", "TG", "PVT", "LTD"]);
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase())
    .split(" ")
    .map((word) => (keepUpper.has(word.toUpperCase()) ? word.toUpperCase() : word))
    .join(" ");
}

function slug(value) {
  return normalizeGardenName(value).replaceAll(" ", "-") || "unknown";
}

function uniqueId(prefix, value, occupied) {
  const base = `${prefix}-${slug(value)}`;
  if (!occupied.has(base)) {
    occupied.add(base);
    return base;
  }
  let suffix = 2;
  while (occupied.has(`${base}-${suffix}`)) suffix += 1;
  const result = `${base}-${suffix}`;
  occupied.add(result);
  return result;
}

export function generateSafeAliases(name) {
  const clean = titleCase(
    String(name ?? "")
      .replace(/\*+$/g, "")
      .replace(/\bT\s*\.?\s*E\s*\.?$/i, "")
      .replace(/\bT\s*\.?\s*G\s*\.?$/i, "")
      .replace(/\bTea\s+(Estate|Garden)$/i, "")
      .trim(),
  );
  if (!clean) return [];
  const values = new Set([
    clean,
    `${clean} Tea Estate`,
    `${clean} Tea Garden`,
    `${clean} T.E.`,
    `${clean} T.G.`,
  ]);
  if (/dooars/i.test(clean)) {
    values.add(clean.replace(/dooars/gi, "Duars"));
    values.add(`${clean.replace(/dooars/gi, "Duars")} Tea Estate`);
  }
  if (/duars/i.test(clean)) {
    values.add(clean.replace(/duars/gi, "Dooars"));
    values.add(`${clean.replace(/duars/gi, "Dooars")} Tea Estate`);
  }
  return [...values];
}

function levenshtein(left, right) {
  if (left === right) return 0;
  if (!left.length) return right.length;
  if (!right.length) return left.length;
  let previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let i = 1; i <= left.length; i += 1) {
    const current = [i];
    for (let j = 1; j <= right.length; j += 1) {
      current[j] = Math.min(
        current[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + (left[i - 1] === right[j - 1] ? 0 : 1),
      );
    }
    previous = current;
  }
  return previous[right.length];
}

function bigrams(value) {
  const compact = value.replaceAll(" ", "");
  if (compact.length < 2) return new Set([compact]);
  const result = new Set();
  for (let index = 0; index < compact.length - 1; index += 1) {
    result.add(compact.slice(index, index + 2));
  }
  return result;
}

export function nameSimilarity(leftValue, rightValue) {
  const left = normalizeGardenName(leftValue);
  const right = normalizeGardenName(rightValue);
  if (!left || !right) return 0;
  if (left === right) return 1;
  if (left.replaceAll(" ", "") === right.replaceAll(" ", "")) return 1;
  const edit = 1 - levenshtein(left, right) / Math.max(left.length, right.length);
  const leftBigrams = bigrams(left);
  const rightBigrams = bigrams(right);
  let overlap = 0;
  for (const item of leftBigrams) if (rightBigrams.has(item)) overlap += 1;
  const dice = (2 * overlap) / (leftBigrams.size + rightBigrams.size);
  const leftTokens = new Set(left.split(" "));
  const rightTokens = new Set(right.split(" "));
  const tokenOverlap = [...leftTokens].filter((item) => rightTokens.has(item)).length;
  const tokenScore = tokenOverlap / new Set([...leftTokens, ...rightTokens]).size;
  const score = left.includes(" ") || right.includes(" ")
    ? edit * 0.5 + dice * 0.4 + tokenScore * 0.1
    : edit * 0.55 + dice * 0.45;
  return Number(score.toFixed(4));
}

export function extractAtlasGardenNames(text) {
  const start = text.indexOf("Table 11: Garden-wise Overall Shade Tree Density");
  const end = text.indexOf("P1: Tea Growing Areas", start);
  if (start < 0 || end < 0) throw new Error("Atlas garden-name table not found");
  const section = text.slice(start, end);
  const rows = [];
  for (const line of section.split(/\r?\n/)) {
    const match = line.match(
      /^\s*(\d{1,3})\s+(.+?)\s+(\d+(?:\.\d+)?)\s+(\d{1,3})\s+(.+?)\s+(\d+(?:\.\d+)?)\s*$/,
    );
    if (!match) continue;
    rows.push({ atlas_index: match[1], name: match[2].trim() });
    rows.push({ atlas_index: match[4], name: match[5].trim() });
  }
  rows.sort((left, right) => Number(left.atlas_index) - Number(right.atlas_index));
  return rows;
}

function leftColumn(line, width = 48) {
  return line.slice(0, width).trim();
}

function extractProfileField(lines, labelParts, nextLabels = [], width = 48) {
  const index = lines.findIndex((line) => labelParts.every((part) => line.includes(part)));
  if (index < 0) return "";
  const pieces = [];
  for (let cursor = index; cursor < Math.min(lines.length, index + 4); cursor += 1) {
    const left = leftColumn(lines[cursor], width);
    if (cursor > index && nextLabels.some((label) => left.startsWith(label))) break;
    let value = left;
    for (const part of labelParts) value = value.replace(part, " ");
    value = value.replace(/^company\b/i, " ").trim();
    if (value) pieces.push(value);
  }
  return pieces.join(" ").replace(/\s+/g, " ").trim();
}

function extractProfileNumber(lines, label, width) {
  const index = lines.findIndex((line) => line.includes(label));
  if (index < 0) return "";
  for (let cursor = index; cursor < Math.min(lines.length, index + 4); cursor += 1) {
    const left = leftColumn(lines[cursor], width).replace(label, " ");
    const match = left.match(/\b\d+(?:\.\d+)?\b/);
    if (match) return match[0];
  }
  return "";
}

export function extractAtlasProfiles(text) {
  const profiles = [];
  for (const page of text.split("\f")) {
    if (!page.includes("e. General Information")) continue;
    const lines = page.split(/\r?\n/);
    const firstLines = lines.map((line) => line.trim()).filter(Boolean).slice(0, 8);
    const heading = firstLines.find((line) => /^[A-Z][A-Z0-9 .&()'/-]+\s+TE$/.test(line));
    if (!heading) continue;
    const name = heading.replace(/\s+TE$/, "").trim();
    const generalHeader = lines.find((line) => line.includes("5. Natural resources constraints"));
    const rightColumnStart = generalHeader?.indexOf("5. Natural resources constraints") ?? 49;
    const width = Math.max(42, rightColumnStart - 1);
    const company = extractProfileField(
      lines,
      ["Name of the"],
      ["Name of the village"],
      width,
    ).replace(/\s+Ma?$/i, "");
    const phone = extractProfileField(lines, ["Contact phone"], ["Name of the"], width);
    profiles.push({
      name,
      company: company.replace(/\s{2,}/g, " "),
      phone: (phone.match(/[+\d][\d, /()-]{6,}/) ?? [""])[0].trim(),
      historical_area_ha: extractProfileNumber(lines, "Leased area of the", width),
      tea_area_ha: extractProfileNumber(lines, "Tea grown area of", width),
    });
  }
  return profiles;
}

function parseDirectoryNameAndRegistration(prefix) {
  const clean = prefix.trim().replace(/^\d{1,3}\s+/, "").trim();
  const parts = clean.split(/\s{2,}/).filter(Boolean);
  if (parts.length >= 2) {
    return {
      name: parts.slice(0, -1).join(" ").replace(/\*+$/, "").trim(),
      registration: parts.at(-1).trim(),
    };
  }
  const match = clean.match(
    /^(.*?)(?:\s+)((?:[A-Z]{0,3}[-/()]?\d[\w&/().\\ -]*|\d+(?:\/\d+)*))$/,
  );
  if (!match) return { name: clean.replace(/\*+$/, ""), registration: "" };
  return {
    name: match[1].replace(/\*+$/, "").trim(),
    registration: match[2].trim(),
  };
}

export function extractTeaBoardDirectoryRows(text) {
  const rows = [];
  const statusPattern = /(Public Ltd Co|Proprietorship|Partnership|Public Sector(?:\s+undertaking)?)/;
  for (const [pageIndex, page] of text.split("\f").entries()) {
    const district = (page.match(/REVENUE DISTRICT\s*:\s*([^\n]+)/) ?? [])[1]?.trim() ?? "";
    const subdivision =
      (page.match(/REVENUE SUB-DIVISION\s*:\s*([^\n]+)/) ?? [])[1]?.trim() ?? "";
    if (district !== "JALPAIGURI") continue;
    const lines = page.split(/\r?\n/);
    const starts = [];
    for (let index = 0; index < lines.length; index += 1) {
      if (/^\s*\d{1,3}\s+[A-Z]/.test(lines[index]) && statusPattern.test(lines[index])) {
        starts.push(index);
      }
    }
    for (let position = 0; position < starts.length; position += 1) {
      const start = starts[position];
      const end = starts[position + 1] ?? lines.length;
      const block = lines.slice(start, end);
      const header = block[0];
      const serial = (header.match(/^\s*(\d{1,3})/) ?? [])[1] ?? "";
      const statusMatch = header.match(statusPattern);
      if (!serial || !statusMatch || statusMatch.index === undefined) continue;
      const beforeStatus = header.slice(0, statusMatch.index);
      const { name, registration } = parseDirectoryNameAndRegistration(beforeStatus);
      const afterStatus = header.slice(statusMatch.index + statusMatch[0].length);
      const numbers = afterStatus.match(/\d+(?:\.\d+)?/g) ?? [];
      const associationMatch = afterStatus.match(/\b(ITA|TRA|TAI|ITPA|DTA|None)\b/);
      let ownerAndCeo = "";
      if (associationMatch?.index !== undefined) {
        ownerAndCeo = afterStatus.slice(associationMatch.index + associationMatch[0].length).trim();
      } else if (numbers.length >= 4) {
        const lastNumber = numbers[3];
        const lastIndex = afterStatus.indexOf(lastNumber) + lastNumber.length;
        ownerAndCeo = afterStatus.slice(lastIndex).trim();
      }
      const ownerParts = ownerAndCeo.split(/\s{2,}/).filter(Boolean);
      const gardenColumn = block.map((line) => line.slice(0, 46)).join("\n");
      const email = (gardenColumn.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i) ?? [""])[0];
      const phoneLine = gardenColumn.split("\n").find((line) => /Tel\s*:/i.test(line)) ?? "";
      const phone = phoneLine.replace(/^.*?Tel\s*:/i, "").trim();
      rows.push({
        serial,
        page: String(pageIndex + 1),
        district,
        subdivision,
        in_dooars_scope: DOOARS_SUBDIVISIONS.has(subdivision) ? "yes" : "review",
        name,
        registration,
        company_status: statusMatch[0].replace(/\s+/g, " "),
        historical_area_ha: numbers[0] ?? "",
        tea_area_ha: numbers[1] ?? "",
        association: associationMatch?.[1] ?? "",
        historical_owner: ownerParts[0] ?? "",
        historical_ceo: ownerParts[1] ?? "",
        garden_email: email,
        garden_phone: phone,
      });
    }
  }
  return rows;
}

export function extractRegisteredPlanterRows(text) {
  const rows = [];
  const lines = text.split(/\r?\n/);
  let pending = "";
  for (const line of lines) {
    const clean = line.trim();
    const match = line.match(
      /^\s*(\d{3,4})\s+(.+?)\s{2,}(.+?)?\s{2,}WEST BENGAL\s+(ALIPURDUAR|JALPAIGURI)\s*$/,
    );
    if (match) {
      const name = `${pending} ${match[2]}`.trim().replace(/\s+/g, " ");
      rows.push({
        notice_index: match[1],
        name,
        registration: match[3]?.trim() ?? "",
        district: match[4],
      });
      pending = "";
      continue;
    }
    if (
      clean &&
      !/^\d/.test(clean) &&
      !/^(Sl\.|Name of|Page|WEST BENGAL|State|District)/i.test(clean) &&
      /^[A-Z0-9][A-Z0-9 .,&()'/-]+$/.test(clean) &&
      clean.length < 70
    ) {
      pending = clean;
    } else if (clean) pending = "";
  }
  return rows;
}

function bool(value) {
  return /^(yes|true|1)$/i.test(String(value ?? "").trim());
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function recencyMonths(dateValue) {
  const timestamp = Date.parse(dateValue);
  if (!Number.isFinite(timestamp)) return Infinity;
  return (Date.now() - timestamp) / (1000 * 60 * 60 * 24 * 30.4375);
}

function classifyStatus(garden, evidence) {
  if (bool(garden.contact_confirmed_active)) {
    return { status: "active_confirmed", confidence: "high" };
  }
  const related = evidence
    .filter((item) => item.garden_id === garden.garden_id && item.published_date)
    .sort((left, right) => right.published_date.localeCompare(left.published_date));
  const latestInactive = related.find(
    (item) => bool(item.supports_inactive) && recencyMonths(item.published_date) <= 24,
  );
  const latestActive = related.find(
    (item) => bool(item.supports_active) && recencyMonths(item.published_date) <= 24,
  );
  if (latestInactive && (!latestActive || latestInactive.published_date >= latestActive.published_date)) {
    return {
      status: latestInactive.event_type === "temporary_closure" ? "temporarily_closed" : "closed",
      confidence: latestInactive.confidence || "medium",
    };
  }
  if (latestActive) {
    const direct = ["official", "company", "contact_confirmation"].includes(
      latestActive.evidence_type,
    );
    return {
      status: direct ? "active_confirmed" : "likely_active",
      confidence: latestActive.confidence || (direct ? "high" : "medium"),
    };
  }
  return { status: garden.current_status || "unknown", confidence: garden.status_confidence || "unknown" };
}

function addUniqueSource(row, sourceId) {
  const values = new Set(String(row.source_ids ?? "").split("|").filter(Boolean));
  if (sourceId) values.add(sourceId);
  row.source_ids = [...values].join("|");
}

function matchGarden(sourceName, gardens, aliases = []) {
  let best = null;
  for (const garden of gardens) {
    const gardenAliases = aliases.filter((alias) => alias.garden_id === garden.garden_id);
    const score = Math.max(
      nameSimilarity(sourceName, garden.canonical_name),
      ...gardenAliases.map((alias) => nameSimilarity(sourceName, alias.alias)),
    );
    if (!best || score > best.score) best = { garden, score };
  }
  return best;
}

function currentDistrictForSubdivision(subdivision) {
  return ["KALCHINI", "MADARIHAT", "FALAKATA", "KUMARGRAM", "ALIPURDUAR"].includes(
    String(subdivision ?? "").toUpperCase(),
  )
    ? "Alipurduar"
    : "Jalpaiguri";
}

function companyIdFor(name, companyIds) {
  return uniqueId("gs-company", name, companyIds);
}

function evidenceIdFor(prefix, gardenId, index) {
  return `${prefix}-${gardenId.replace(/^gs-dooars-/, "")}-${index}`;
}

async function readCsvIfPresent(path) {
  try {
    return parseCsv(await readFile(path, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

export async function buildRegistry({ sourceTexts }) {
  const atlasSource = "tea-gis-jalpaiguri-atlas-2015";
  const directorySource = "tea-board-wb-directory-2013";
  const planterSource = "tea-board-registered-planters-2019";
  const atlasRows = extractAtlasGardenNames(sourceTexts[atlasSource]);
  const profiles = extractAtlasProfiles(sourceTexts[atlasSource]);
  const directoryRows = extractTeaBoardDirectoryRows(sourceTexts[directorySource]);
  const planterRows = extractRegisteredPlanterRows(sourceTexts[planterSource]);
  const gardenIds = new Set();
  const companyIds = new Set();
  const companiesByKey = new Map();
  const gardens = atlasRows.map((row) => {
    const canonicalName = titleCase(row.name);
    return {
      garden_id: uniqueId("gs-dooars", canonicalName, gardenIds),
      canonical_name: canonicalName,
      normalized_name: normalizeGardenName(canonicalName),
      current_status: "unknown",
      status_confidence: "unknown",
      status_checked_date: "",
      district_current: "",
      subdivision_or_block: "",
      tea_board_registration: "",
      atlas_index: row.atlas_index,
      historical_area_ha: "",
      tea_area_ha: "",
      current_company_id: "",
      current_owner_confidence: "unknown",
      last_material_event_date: "",
      contact_confirmed_active: "no",
      research_state: "needs_current_evidence",
      source_ids: atlasSource,
      notes: "Official atlas seed. Historical presence does not prove current operation.",
    };
  });
  const aliases = [];
  const aliasKeys = new Set();
  const evidence = [];
  const review = [];
  const contactHints = [];
  const addAlias = (gardenId, alias, aliasType, sourceId, confidence, reviewed = "no", notes = "") => {
    const key = `${gardenId}|${String(alias).toLowerCase()}`;
    if (!alias || aliasKeys.has(key)) return;
    aliasKeys.add(key);
    aliases.push({
      garden_id: gardenId,
      alias,
      normalized_alias: normalizeGardenName(alias),
      alias_type: aliasType,
      source_id: sourceId,
      confidence,
      reviewed,
      notes,
    });
  };
  for (const garden of gardens) {
    addAlias(garden.garden_id, garden.canonical_name, "source", atlasSource, "high", "yes");
    for (const alias of generateSafeAliases(garden.canonical_name)) {
      addAlias(garden.garden_id, alias, "generated_search", "generated", "medium", "no");
    }
  }

  const manualAliases = await readCsvIfPresent(resolve(manualDir, "alias_overrides.csv"));
  for (const item of manualAliases) {
    if (item.action.toLowerCase() === "remove") {
      const index = aliases.findIndex(
        (alias) => alias.garden_id === item.garden_id && alias.alias === item.alias,
      );
      if (index >= 0) aliases.splice(index, 1);
      continue;
    }
    addAlias(
      item.garden_id,
      item.alias,
      item.alias_type || "manual",
      item.source_url || "manual",
      item.confidence || "medium",
      "yes",
      item.notes,
    );
  }

  // The 2015 atlas is a strong seed, but it is not a complete Dooars wordlist.
  // Preserve every Dooars-scoped Tea Board directory record that cannot be linked
  // safely. Later evidence can merge a duplicate through a reviewed alias override.
  for (const row of directoryRows.filter((item) => item.in_dooars_scope === "yes")) {
    const matched = matchGarden(row.name, gardens, aliases);
    if (matched && matched.score >= 0.82) continue;
    const canonicalName = titleCase(row.name);
    const garden = {
      garden_id: uniqueId("gs-dooars", canonicalName, gardenIds),
      canonical_name: canonicalName,
      normalized_name: normalizeGardenName(canonicalName),
      current_status: "unknown",
      status_confidence: "unknown",
      status_checked_date: "",
      district_current: currentDistrictForSubdivision(row.subdivision),
      subdivision_or_block: titleCase(row.subdivision),
      tea_board_registration: row.registration,
      atlas_index: "",
      historical_area_ha: row.historical_area_ha,
      tea_area_ha: row.tea_area_ha,
      current_company_id: "",
      current_owner_confidence: "unknown",
      last_material_event_date: "",
      contact_confirmed_active: "no",
      research_state: "needs_identity_review",
      source_ids: directorySource,
      notes:
        "Tea Board directory seed absent from or not safely matched to the atlas. Review identity before merging.",
    };
    gardens.push(garden);
    addAlias(garden.garden_id, canonicalName, "source", directorySource, "high", "yes");
    for (const alias of generateSafeAliases(canonicalName)) {
      addAlias(garden.garden_id, alias, "generated_search", "generated", "medium", "no");
    }
    review.push({
      review_id: `identity-${garden.garden_id}`,
      review_type: "identity_resolution",
      garden_id: garden.garden_id,
      candidate_id: `directory-${row.serial}`,
      source_id: directorySource,
      source_name: row.name,
      candidate_name: matched?.garden.canonical_name ?? "",
      match_score: matched?.score ?? 0,
      reason: "Directory record was retained for coverage but still needs duplicate and identity review.",
      source_url:
        "https://www.teaboard.gov.in/pdf/notice/Tea%20Directory-West%20Bengal.pdf",
      created_date: today(),
      status: "open",
    });
  }

  const companies = [];
  const links = [];
  const linkKeys = new Set();
  const ensureCompany = (name, sourceId, verifiedDate = "") => {
    const clean = String(name ?? "").replace(/\s+/g, " ").trim();
    if (!clean) return null;
    const key = normalizeCompanyName(clean);
    if (!key || key.length < 4) return null;
    if (companiesByKey.has(key)) {
      const existing = companiesByKey.get(key);
      addUniqueSource(existing, sourceId);
      return existing;
    }
    const company = {
      company_id: companyIdFor(clean, companyIds),
      legal_name: titleCase(clean),
      normalized_name: key,
      cin: "",
      company_status: "unverified",
      website: "",
      domain: "",
      registered_office: "",
      parent_group: "",
      public_company: "unknown",
      source_ids: sourceId,
      verified_date: verifiedDate,
      notes: "Historical company clue. Current ownership requires newer evidence.",
    };
    companies.push(company);
    companiesByKey.set(key, company);
    return company;
  };
  const addLink = (garden, company, relationship, sourceId, verifiedDate, confidence, notes) => {
    if (!garden || !company) return;
    const key = `${garden.garden_id}|${company.company_id}|${relationship}|${sourceId}`;
    if (linkKeys.has(key)) return;
    linkKeys.add(key);
    links.push({
      garden_id: garden.garden_id,
      company_id: company.company_id,
      relationship,
      valid_from: "",
      valid_to: "",
      current_claim: "historical_only",
      confidence,
      source_id: sourceId,
      verified_date: verifiedDate,
      notes,
    });
  };

  for (const profile of profiles) {
    const matched = matchGarden(profile.name, gardens, aliases);
    if (!matched || matched.score < 0.72) {
      review.push({
        review_id: `atlas-profile-${slug(profile.name)}`,
        review_type: "profile_match",
        garden_id: matched?.garden.garden_id ?? "",
        candidate_id: "",
        source_id: atlasSource,
        source_name: profile.name,
        candidate_name: matched?.garden.canonical_name ?? "",
        match_score: matched?.score ?? 0,
        reason: "Atlas profile name could not be linked safely.",
        source_url: "",
        created_date: today(),
        status: "open",
      });
      continue;
    }
    const garden = matched.garden;
    if (profile.historical_area_ha) garden.historical_area_ha = profile.historical_area_ha;
    if (profile.tea_area_ha) garden.tea_area_ha = profile.tea_area_ha;
    if (profile.company) {
      const company = ensureCompany(profile.company, atlasSource, "2015-10-01");
      addLink(
        garden,
        company,
        "company_reported_in_atlas",
        atlasSource,
        "2015-10-01",
        matched.score >= 0.9 ? "high" : "medium",
        "Atlas-era company relationship. Do not treat as current without newer evidence.",
      );
    }
  }

  for (const row of directoryRows) {
    const matched = matchGarden(row.name, gardens, aliases);
    if (matched && matched.score >= 0.82) {
      const garden = matched.garden;
      addAlias(garden.garden_id, titleCase(row.name), "source", directorySource, "high", "yes");
      addUniqueSource(garden, directorySource);
      if (!garden.tea_board_registration && row.registration) {
        garden.tea_board_registration = row.registration;
      }
      if (!garden.subdivision_or_block) garden.subdivision_or_block = titleCase(row.subdivision);
      if (!garden.historical_area_ha) garden.historical_area_ha = row.historical_area_ha;
      if (!garden.tea_area_ha) garden.tea_area_ha = row.tea_area_ha;
      if (row.historical_owner) {
        const company = ensureCompany(row.historical_owner, directorySource, "2013-03-18");
        addLink(
          garden,
          company,
          "owner_reported_in_directory",
          directorySource,
          "2013-03-18",
          matched.score >= 0.9 ? "high" : "medium",
          `Tea Board directory row ${row.serial}. Historical owner only.`,
        );
      }
      if (row.garden_email || row.garden_phone || row.historical_ceo) {
        contactHints.push({
          hint_id: `tea-board-directory-${row.serial}`,
          garden_id: garden.garden_id,
          canonical_name: garden.canonical_name,
          historical_contact_name: row.historical_ceo,
          historical_email: row.garden_email,
          historical_phone: row.garden_phone,
          source_date: "2013-03-18",
          source_url:
            "https://www.teaboard.gov.in/pdf/notice/Tea%20Directory-West%20Bengal.pdf",
          match_score: matched.score,
          do_not_use_without_reverification: "yes",
          notes: "Historical Tea Board directory clue. Confirm current role and validate contact before use.",
        });
      }
    } else {
      review.push({
        review_id: `directory-${row.serial}-${slug(row.name)}`,
        review_type: row.in_dooars_scope === "yes" ? "unmatched_dooars_directory" : "scope_and_match",
        garden_id: matched?.garden.garden_id ?? "",
        candidate_id: `directory-${row.serial}`,
        source_id: directorySource,
        source_name: row.name,
        candidate_name: matched?.garden.canonical_name ?? "",
        match_score: matched?.score ?? 0,
        reason:
          row.in_dooars_scope === "yes"
            ? "Dooars directory record is absent from or ambiguous against the 128-garden atlas seed."
            : "Directory record needs geographic scope review.",
        source_url: "",
        created_date: today(),
        status: "open",
      });
    }
  }

  for (const row of planterRows) {
    const matched = matchGarden(row.name, gardens, aliases);
    if (!matched || matched.score < 0.82) continue;
    const garden = matched.garden;
    addAlias(garden.garden_id, titleCase(row.name), "source", planterSource, "high", "yes");
    addUniqueSource(garden, planterSource);
    if (!garden.tea_board_registration && row.registration) {
      garden.tea_board_registration = row.registration;
    } else if (
      row.registration &&
      garden.tea_board_registration &&
      normalizeGardenName(row.registration) !== normalizeGardenName(garden.tea_board_registration)
    ) {
      review.push({
        review_id: `registration-${garden.garden_id}`,
        review_type: "registration_conflict",
        garden_id: garden.garden_id,
        candidate_id: row.notice_index,
        source_id: planterSource,
        source_name: row.registration,
        candidate_name: garden.tea_board_registration,
        match_score: matched.score,
        reason: "Tea Board sources show different registration values.",
        source_url: "",
        created_date: today(),
        status: "open",
      });
    }
    if (!garden.district_current) garden.district_current = titleCase(row.district);
  }

  const manualCompanies = await readCsvIfPresent(resolve(manualDir, "company_overrides.csv"));
  for (const item of manualCompanies) {
    const key = normalizeCompanyName(item.legal_name);
    let company = companiesByKey.get(key);
    if (!company) {
      company = ensureCompany(item.legal_name, item.source_url || "manual", item.verified_date);
    }
    if (!company) continue;
    for (const field of [
      "company_id",
      "legal_name",
      "cin",
      "company_status",
      "website",
      "domain",
      "registered_office",
      "parent_group",
      "public_company",
      "verified_date",
      "notes",
    ]) {
      if (item[field]) company[field] = item[field];
    }
    addUniqueSource(company, item.source_url || "manual");
  }

  const manualEvidence = await readCsvIfPresent(resolve(manualDir, "evidence.csv"));
  for (const item of manualEvidence) {
    evidence.push({ contact_id: "", ...item });
    if (item.ownership_to && item.garden_id) {
      const company = ensureCompany(item.ownership_to, item.url || "manual", item.published_date);
      const garden = gardens.find((candidate) => candidate.garden_id === item.garden_id);
      if (company && garden) {
        const key = `${garden.garden_id}|${company.company_id}|${item.relationship || "owner_or_operator"}|${item.evidence_id}`;
        if (!linkKeys.has(key)) {
          linkKeys.add(key);
          links.push({
            garden_id: garden.garden_id,
            company_id: company.company_id,
            relationship: item.relationship || "owner_or_operator",
            valid_from: item.published_date,
            valid_to: "",
            current_claim: "current_candidate",
            confidence: item.confidence || "medium",
            source_id: item.evidence_id,
            verified_date: item.retrieved_date || item.published_date,
            notes: "Current ownership candidate from reviewed evidence.",
          });
        }
      }
    }
  }

  const gardenOverrides = await readCsvIfPresent(resolve(manualDir, "garden_overrides.csv"));
  for (const item of gardenOverrides) {
    let garden = gardens.find((candidate) => candidate.garden_id === item.garden_id);
    if (!garden && item.garden_id && item.canonical_name) {
      gardenIds.add(item.garden_id);
      garden = {
        garden_id: item.garden_id,
        canonical_name: item.canonical_name,
        normalized_name: normalizeGardenName(item.canonical_name),
        current_status: "unknown",
        status_confidence: "unknown",
        status_checked_date: "",
        district_current: "",
        subdivision_or_block: "",
        tea_board_registration: "",
        atlas_index: "",
        historical_area_ha: "",
        tea_area_ha: "",
        current_company_id: "",
        current_owner_confidence: "unknown",
        last_material_event_date: "",
        contact_confirmed_active: "no",
        research_state: "needs_current_evidence",
        source_ids: "manual",
        notes: "Reviewed manual seed.",
      };
      gardens.push(garden);
      addAlias(garden.garden_id, garden.canonical_name, "manual", "manual", "high", "yes");
      for (const alias of generateSafeAliases(garden.canonical_name)) {
        addAlias(garden.garden_id, alias, "generated_search", "generated", "medium", "no");
      }
    }
    if (!garden) continue;
    for (const field of [
      "canonical_name",
      "current_status",
      "status_confidence",
      "status_checked_date",
      "district_current",
      "subdivision_or_block",
      "tea_board_registration",
      "current_owner_confidence",
      "contact_confirmed_active",
      "notes",
    ]) {
      if (item[field]) garden[field] = item[field];
    }
    garden.normalized_name = normalizeGardenName(garden.canonical_name);
    if (item.current_company_legal_name) {
      const company = ensureCompany(item.current_company_legal_name, "manual", item.status_checked_date);
      if (company) garden.current_company_id = company.company_id;
    }
  }

  for (const garden of gardens) {
    const status = classifyStatus(garden, evidence);
    garden.current_status = status.status;
    garden.status_confidence = status.confidence;
    const related = evidence
      .filter((item) => item.garden_id === garden.garden_id && item.published_date)
      .sort((left, right) => right.published_date.localeCompare(left.published_date));
    if (related[0]) {
      garden.last_material_event_date = related[0].published_date;
      garden.status_checked_date = related[0].retrieved_date || related[0].published_date;
    }
    const currentLinks = links
      .filter(
        (link) =>
          link.garden_id === garden.garden_id && link.current_claim === "current_candidate",
      )
      .sort((left, right) => right.verified_date.localeCompare(left.verified_date));
    if (!garden.current_company_id && currentLinks[0]) {
      garden.current_company_id = currentLinks[0].company_id;
      garden.current_owner_confidence = currentLinks[0].confidence;
    }
    garden.research_state = ACTIVE_STATUSES.has(garden.current_status)
      ? garden.current_company_id
        ? "needs_contact"
        : "needs_current_owner"
      : !garden.atlas_index && garden.current_status === "unknown"
        ? "needs_identity_review"
        : "needs_current_evidence";
  }

  const contacts = await readCsvIfPresent(resolve(manualDir, "contacts.csv"));
  for (const garden of gardens) {
    if (garden.current_status === "unknown") {
      review.push({
        review_id: `activity-${garden.garden_id}`,
        review_type: "activity_evidence",
        garden_id: garden.garden_id,
        candidate_id: "",
        source_id: "",
        source_name: garden.canonical_name,
        candidate_name: "",
        match_score: "",
        reason: "No recent evidence supports active or inactive status.",
        source_url: "",
        created_date: today(),
        status: "open",
      });
    }
  }

  const sourceMetadata = JSON.parse(
    await readFile(resolve(projectDir, "SOURCES.json"), "utf8"),
  ).sources;
  for (const source of sourceMetadata) {
    evidence.push({
      evidence_id: `source-${source.source_id}`,
      garden_id: "",
      company_id: "",
      contact_id: "",
      evidence_type: source.authority,
      event_type: "source_register",
      title: source.name,
      url: source.url,
      publisher: source.authority === "official" ? "Government source" : "",
      published_date: source.published_date,
      retrieved_date: today(),
      language: "English",
      supports_active: "no",
      supports_inactive: "no",
      ownership_from: "",
      ownership_to: "",
      relationship: "",
      excerpt: source.use,
      confidence: source.authority === "official" ? "high" : "medium",
      manual_review: "no",
      notes: "Source-level provenance record.",
    });
  }

  const activeEstates = gardens.filter((garden) => ACTIVE_STATUSES.has(garden.current_status));
  const searchQueries = [];
  for (const garden of gardens) {
    const sourceAliases = aliases
      .filter((alias) => alias.garden_id === garden.garden_id && alias.alias_type !== "generated_search")
      .slice(0, 4);
    const names = sourceAliases.length ? sourceAliases.map((alias) => alias.alias) : [garden.canonical_name];
    const terms = [
      "owner company acquisition sale lease",
      "reopened production factory active",
      "new management director manager",
      "closed suspended workers",
    ];
    for (const name of names) {
      for (const term of terms) {
        searchQueries.push({
          garden_id: garden.garden_id,
          canonical_name: garden.canonical_name,
          alias: name,
          query: `\"${name}\" ${term} Dooars`,
          priority: garden.current_status === "unknown" ? "high" : "normal",
        });
      }
    }
  }

  return {
    gardens,
    aliases,
    companies,
    links,
    evidence,
    contacts,
    contactHints,
    review,
    activeEstates,
    searchQueries,
    parserCounts: {
      atlas_names: atlasRows.length,
      atlas_profiles: profiles.length,
      directory_rows: directoryRows.length,
      registered_planter_rows: planterRows.length,
    },
  };
}

export async function writeRegistry(registry) {
  await mkdir(dataDir, { recursive: true });
  await Promise.all([
    writeFile(resolve(dataDir, "gardens.csv"), toCsv(HEADERS.gardens, registry.gardens)),
    writeFile(resolve(dataDir, "garden_aliases.csv"), toCsv(HEADERS.aliases, registry.aliases)),
    writeFile(resolve(dataDir, "companies.csv"), toCsv(HEADERS.companies, registry.companies)),
    writeFile(
      resolve(dataDir, "garden_company_links.csv"),
      toCsv(HEADERS.links, registry.links),
    ),
    writeFile(resolve(dataDir, "evidence.csv"), toCsv(HEADERS.evidence, registry.evidence)),
    writeFile(resolve(dataDir, "contacts.csv"), toCsv(HEADERS.contacts, registry.contacts)),
    writeFile(
      resolve(importsDir, "historical_contact_hints.csv"),
      toCsv(
        [
          "hint_id",
          "garden_id",
          "canonical_name",
          "historical_contact_name",
          "historical_email",
          "historical_phone",
          "source_date",
          "source_url",
          "match_score",
          "do_not_use_without_reverification",
          "notes",
        ],
        registry.contactHints,
      ),
    ),
    writeFile(resolve(dataDir, "review_queue.csv"), toCsv(HEADERS.review, registry.review)),
    writeFile(
      resolve(dataDir, "active_estates.csv"),
      toCsv(HEADERS.gardens, registry.activeEstates),
    ),
    writeFile(
      resolve(dataDir, "search_queries.csv"),
      toCsv(
        ["garden_id", "canonical_name", "alias", "query", "priority"],
        registry.searchQueries,
      ),
    ),
  ]);
  const report = buildReport(registry);
  await writeFile(
    resolve(dataDir, "build_report.json"),
    `${JSON.stringify(report, null, 2)}\n`,
  );
  return report;
}

export function buildReport(registry) {
  const statuses = {};
  for (const garden of registry.gardens) {
    statuses[garden.current_status] = (statuses[garden.current_status] ?? 0) + 1;
  }
  return {
    generated_at: new Date().toISOString(),
    ...registry.parserCounts,
    canonical_gardens: registry.gardens.length,
    aliases: registry.aliases.length,
    companies: registry.companies.length,
    company_links: registry.links.length,
    evidence_rows: registry.evidence.length,
    contacts: registry.contacts.length,
    historical_contact_hints: registry.contactHints.length,
    active_export_rows: registry.activeEstates.length,
    review_queue_rows: registry.review.length,
    statuses,
    warning:
      "Historical sources do not prove current operation or ownership. Contact remains the final confirmation.",
  };
}

export function validateRegistry(registry) {
  const errors = [];
  const warnings = [];
  const gardenIds = new Set();
  const companyIds = new Set();
  const contactIds = new Set();
  for (const garden of registry.gardens) {
    if (!garden.garden_id) errors.push("Garden missing garden_id");
    else if (gardenIds.has(garden.garden_id)) errors.push(`Duplicate garden_id: ${garden.garden_id}`);
    else gardenIds.add(garden.garden_id);
    if (!garden.canonical_name) errors.push(`${garden.garden_id}: missing canonical_name`);
    if (!STATUS_VALUES.has(garden.current_status)) {
      errors.push(`${garden.garden_id}: invalid current_status ${garden.current_status}`);
    }
    if (!CONFIDENCE_VALUES.has(garden.status_confidence)) {
      errors.push(`${garden.garden_id}: invalid status_confidence ${garden.status_confidence}`);
    }
    if (ACTIVE_STATUSES.has(garden.current_status) && !garden.status_checked_date) {
      errors.push(`${garden.garden_id}: active status has no checked date`);
    }
    if (garden.current_company_id && garden.current_owner_confidence === "unknown") {
      warnings.push(`${garden.garden_id}: current company has unknown ownership confidence`);
    }
  }
  for (const company of registry.companies) {
    if (!company.company_id) errors.push("Company missing company_id");
    else if (companyIds.has(company.company_id)) errors.push(`Duplicate company_id: ${company.company_id}`);
    else companyIds.add(company.company_id);
  }
  for (const alias of registry.aliases) {
    if (!gardenIds.has(alias.garden_id)) errors.push(`Alias points to missing garden: ${alias.garden_id}`);
    if (!alias.alias) errors.push(`${alias.garden_id}: empty alias`);
  }
  for (const link of registry.links) {
    if (!gardenIds.has(link.garden_id)) errors.push(`Link points to missing garden: ${link.garden_id}`);
    if (!companyIds.has(link.company_id)) errors.push(`Link points to missing company: ${link.company_id}`);
    if (link.current_claim === "current_candidate" && !link.source_id) {
      errors.push(`${link.garden_id}: current ownership candidate has no source`);
    }
  }
  for (const contact of registry.contacts) {
    if (!contact.contact_id) errors.push("Contact missing contact_id");
    else if (contactIds.has(contact.contact_id)) errors.push(`Duplicate contact_id: ${contact.contact_id}`);
    else contactIds.add(contact.contact_id);
    if (contact.garden_id && !gardenIds.has(contact.garden_id)) {
      errors.push(`${contact.contact_id}: missing garden ${contact.garden_id}`);
    }
    if (contact.company_id && !companyIds.has(contact.company_id)) {
      errors.push(`${contact.contact_id}: missing company ${contact.company_id}`);
    }
    if (contact.owner_approved === "yes" && contact.email_status.toLowerCase() !== "valid") {
      errors.push(`${contact.contact_id}: approved contact email is not Valid`);
    }
  }
  return { valid: errors.length === 0, errors, warnings };
}

async function sha256(path) {
  const buffer = await readFile(path);
  return createHash("sha256").update(buffer).digest("hex");
}

async function fileExists(path) {
  try {
    await stat(path);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

function run(command, args) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command, args, { stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => (stdout += chunk));
    child.stderr.on("data", (chunk) => (stderr += chunk));
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolvePromise({ stdout, stderr });
      else reject(new Error(`${command} exited ${code}: ${stderr}`));
    });
  });
}

async function fetchBuffer(url, timeoutMs = 90000) {
  const response = await fetch(url, {
    headers: { "user-agent": "GardenSuite research collector/1.0 (public-source audit)" },
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`);
  return { buffer: Buffer.from(await response.arrayBuffer()), contentType: response.headers.get("content-type") ?? "" };
}

async function downloadToPath(url, path) {
  await run("curl", [
    "--location",
    "--fail",
    "--silent",
    "--show-error",
    "--retry",
    "2",
    "--retry-delay",
    "2",
    "--connect-timeout",
    "20",
    "--max-time",
    "300",
    "--user-agent",
    "GardenSuite research collector/1.0 (public-source audit)",
    "--output",
    path,
    url,
  ]);
}

async function loadPlaywright() {
  const path = resolve(repoRoot, "gs_landing/node_modules/playwright/index.js");
  const imported = await import(pathToFileURL(path).href);
  return imported.default ?? imported;
}

async function browserCollect(url) {
  const { chromium } = await loadPlaywright();
  const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  const launch = (await fileExists(chromePath))
    ? { headless: true, executablePath: chromePath }
    : { headless: true };
  const browser = await chromium.launch(launch);
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(1500);
    return Buffer.from(await page.content());
  } finally {
    await browser.close();
  }
}

export async function collectSources({ force = false } = {}) {
  const config = JSON.parse(await readFile(resolve(projectDir, "SOURCES.json"), "utf8"));
  const rawDir = resolve(cacheDir, "raw");
  const textDir = resolve(cacheDir, "text");
  await mkdir(rawDir, { recursive: true });
  await mkdir(textDir, { recursive: true });
  const manifest = [];
  for (const source of config.sources) {
    const extension = source.kind === "pdf" ? "pdf" : "html";
    const rawPath = resolve(rawDir, `${source.source_id}.${extension}`);
    const textPath = resolve(textDir, `${source.source_id}.txt`);
    let collectionMethod = "cache";
    if (force || !(await fileExists(rawPath))) {
      try {
        if (source.kind === "pdf") {
          await downloadToPath(source.url, rawPath);
          collectionMethod = "curl";
        } else {
          const result = await fetchBuffer(source.url);
          await writeFile(rawPath, result.buffer);
          collectionMethod = "http";
        }
      } catch (error) {
        try {
          if (!source.browser_fallback) throw error;
          await writeFile(rawPath, await browserCollect(source.url));
          collectionMethod = "playwright";
        } catch (fallbackError) {
          if (source.parser !== "metadata-only") throw fallbackError;
          manifest.push({
            source_id: source.source_id,
            url: source.url,
            retrieved_at: new Date().toISOString(),
            collection_method: "failed",
            raw_path: rawPath,
            text_path: textPath,
            sha256: "",
            error: fallbackError.message,
          });
          await new Promise((resolvePromise) =>
            setTimeout(resolvePromise, config.default_request_delay_ms ?? 1500),
          );
          continue;
        }
      }
    }
    if (source.kind === "pdf") {
      await run("pdftotext", ["-layout", rawPath, textPath]);
    } else {
      const html = await readFile(rawPath, "utf8");
      await writeFile(
        textPath,
        html
          .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
          .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
          .replace(/<[^>]+>/g, " ")
          .replace(/&nbsp;/g, " ")
          .replace(/&amp;/g, "&")
          .replace(/\s+/g, " ")
          .trim(),
      );
    }
    manifest.push({
      source_id: source.source_id,
      url: source.url,
      retrieved_at: new Date().toISOString(),
      collection_method: collectionMethod,
      raw_path: rawPath,
      text_path: textPath,
      sha256: await sha256(rawPath),
    });
    await new Promise((resolvePromise) =>
      setTimeout(resolvePromise, config.default_request_delay_ms ?? 1500),
    );
  }
  await writeFile(
    resolve(cacheDir, "manifest.json"),
    `${JSON.stringify({ generated_at: new Date().toISOString(), sources: manifest }, null, 2)}\n`,
  );
  return manifest;
}

export async function loadCollectedSourceTexts() {
  const config = JSON.parse(await readFile(resolve(projectDir, "SOURCES.json"), "utf8"));
  const texts = {};
  for (const source of config.sources) {
    if (source.parser === "metadata-only") continue;
    const path = resolve(cacheDir, "text", `${source.source_id}.txt`);
    texts[source.source_id] = await readFile(path, "utf8");
  }
  return texts;
}

function decodeHtml(value) {
  return String(value ?? "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function meta(html, property) {
  const patterns = [
    new RegExp(`<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${property}["']`, "i"),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return decodeHtml(match[1]).trim();
  }
  return "";
}

function stripHtml(html) {
  return decodeHtml(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " "),
  ).trim();
}

const EVENT_PATTERNS = [
  ["acquisition", /\b(acquir(?:e|ed|es|ing)|takeover|taken over|purchased|bought)\b/i],
  ["sale", /\b(sold|sale|buyer|new owner)\b/i],
  ["lease_change", /\b(lease|leased|lessee)\b/i],
  ["reopening", /\b(reopen(?:ed|ing|s)?|restart(?:ed|ing|s)?|resum(?:e|ed|ing|es))\b/i],
  ["temporary_closure", /\btemporar(?:y|ily)\s+clos/i],
  ["closure", /\b(closed|closure|shut down|abandoned)\b/i],
  ["management_change", /\b(new management|management change|new operator)\b/i],
  ["operating", /\b(production|plucking|factory|workers|tea auction|made tea)\b/i],
];

function regexEscape(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function ingestNewsUrls() {
  const urlRows = await readCsvIfPresent(resolve(importsDir, "news_urls.csv"));
  const gardens = await readCsvIfPresent(resolve(dataDir, "gardens.csv"));
  const aliases = await readCsvIfPresent(resolve(dataDir, "garden_aliases.csv"));
  const candidates = [];
  for (const [index, row] of urlRows.entries()) {
    if (!/^https?:\/\//i.test(row.url)) continue;
    let buffer;
    let method = "http";
    try {
      buffer = (await fetchBuffer(row.url, 45000)).buffer;
    } catch (error) {
      try {
        buffer = await browserCollect(row.url);
        method = "playwright";
      } catch (browserError) {
        candidates.push({
          candidate_id: `news-${index + 1}`,
          url: row.url,
          title: "",
          publisher: row.publisher,
          published_date: row.published_date,
          retrieved_date: today(),
          language: row.language,
          garden_id: "",
          canonical_name: "",
          matched_alias: "",
          event_types: "",
          supports_active_candidate: "no",
          supports_inactive_candidate: "no",
          collection_method: "failed",
          confidence: "low",
          excerpt: "",
          notes: `HTTP and browser collection failed: ${browserError.message}`,
        });
        continue;
      }
    }
    const html = buffer.toString("utf8");
    const body = stripHtml(html);
    const lower = body.toLowerCase();
    const matches = [];
    for (const alias of aliases.filter((item) => item.alias_type !== "generated_search")) {
      if (alias.alias.length < 4) continue;
      const pattern = new RegExp(
        `(?:^|[^a-z0-9])${regexEscape(alias.alias.toLowerCase()).replace(/\\\s+/g, "\\s+")}(?=$|[^a-z0-9])`,
      );
      const mention = lower.search(pattern);
      if (mention >= 0) matches.push({ ...alias, mention });
    }
    const bestByGarden = new Map();
    for (const match of matches) {
      const current = bestByGarden.get(match.garden_id);
      if (!current || match.alias.length > current.alias.length) bestByGarden.set(match.garden_id, match);
    }
    const title = meta(html, "og:title") || decodeHtml((html.match(/<title[^>]*>([^<]+)<\/title>/i) ?? [])[1] ?? "");
    const publishedDate = row.published_date || meta(html, "article:published_time").slice(0, 10);
    const publisher = row.publisher || meta(html, "og:site_name");
    const targetMatches = bestByGarden.size ? [...bestByGarden.values()] : [null];
    for (const match of targetMatches) {
      const garden = gardens.find((item) => item.garden_id === match?.garden_id);
      const mention = match?.mention ?? -1;
      const excerpt = mention >= 0 ? body.slice(Math.max(0, mention - 180), mention + 420) : body.slice(0, 600);
      const eventTypes = EVENT_PATTERNS.filter(([, pattern]) => pattern.test(excerpt)).map(
        ([type]) => type,
      );
      const active = eventTypes.some((type) =>
        ["reopening", "operating", "acquisition", "management_change"].includes(type),
      );
      const inactive = eventTypes.some((type) => ["temporary_closure", "closure"].includes(type));
      candidates.push({
        candidate_id: `news-${index + 1}${match ? `-${match.garden_id.replace(/^gs-dooars-/, "")}` : ""}`,
        url: row.url,
        title,
        publisher,
        published_date: publishedDate,
        retrieved_date: today(),
        language: row.language || "unknown",
        garden_id: match?.garden_id ?? "",
        canonical_name: garden?.canonical_name ?? "",
        matched_alias: match?.alias ?? "",
        event_types: eventTypes.join("|"),
        supports_active_candidate: active ? "yes" : "no",
        supports_inactive_candidate: inactive ? "yes" : "no",
        collection_method: method,
        confidence: match && publishedDate ? "medium" : "low",
        excerpt,
        notes: row.notes || "Review before copying to manual/evidence.csv.",
      });
    }
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 1500));
  }
  const headers = [
    "candidate_id",
    "url",
    "title",
    "publisher",
    "published_date",
    "retrieved_date",
    "language",
    "garden_id",
    "canonical_name",
    "matched_alias",
    "event_types",
    "supports_active_candidate",
    "supports_inactive_candidate",
    "collection_method",
    "confidence",
    "excerpt",
    "notes",
  ];
  await writeFile(resolve(importsDir, "news_candidates.csv"), toCsv(headers, candidates));
  return { input_urls: urlRows.length, candidates: candidates.length };
}

export async function loadGeneratedRegistry() {
  return {
    gardens: await readCsvIfPresent(resolve(dataDir, "gardens.csv")),
    aliases: await readCsvIfPresent(resolve(dataDir, "garden_aliases.csv")),
    companies: await readCsvIfPresent(resolve(dataDir, "companies.csv")),
    links: await readCsvIfPresent(resolve(dataDir, "garden_company_links.csv")),
    evidence: await readCsvIfPresent(resolve(dataDir, "evidence.csv")),
    contacts: await readCsvIfPresent(resolve(dataDir, "contacts.csv")),
  };
}
