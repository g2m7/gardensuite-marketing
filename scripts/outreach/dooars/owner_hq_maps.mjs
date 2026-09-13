#!/usr/bin/env node
// Owner and HQ map builder for the Dooars registry.
//
// This is the repeatable version of the research tactic:
//   1. Take every Dooars garden in the registry (Assam gardens are omitted).
//   2. Find the owner company from registry links and overrides.
//   3. Reject corporate owners: public companies and large multi-estate groups.
//   4. Split the survivors by HQ city. Siliguri HQ is the active target list.
//   5. Everything unresolved lands in a work queue for manual MCA lookups.
//
// Outputs, written to marketing/outreach/dooars-intelligence/imports/:
//   owner_hq_map_siliguri.csv  - non-corp owners with a Siliguri HQ (scraping map)
//   owner_hq_map_other.csv     - rejected corps and non-Siliguri HQ owners
//   owner_hq_work_queue.csv    - missing owner or missing HQ, prioritized
//
// HQ knowledge lives in manual/hq_overrides.csv so manual lookups survive rebuilds.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import {
  importsDir,
  LARGE_GROUP_PARENTS,
  normalizeCompanyName,
  parseCsv,
  toCsv,
} from "./dooars_lib.mjs";

const DATA_DIR = resolve(importsDir, "..", "data");
const MANUAL_DIR = resolve(importsDir, "..", "manual");

export function detectHqCity(address) {
  const text = String(address ?? "").toLowerCase();
  if (!text) return "";
  if (/siliguri/.test(text)) return "Siliguri";
  if (/kolkata|calcutta/.test(text)) return "Kolkata";
  if (/assam|dibrugarh|tinsukia|jorhat|guwahati/.test(text)) return "Assam";
  if (/darjeeling/.test(text)) return "Darjeeling";
  return "Other";
}

export function isCorporateOwner(company) {
  if (!company) return false;
  if (String(company.public_company ?? "").toLowerCase() === "yes") return true;
  const group = String(company.parent_group ?? "").toLowerCase();
  const name = String(company.normalized_name ?? normalizeCompanyName(company.legal_name ?? ""));
  if (group && LARGE_GROUP_PARENTS.has(group)) return true;
  if (name && LARGE_GROUP_PARENTS.has(name)) return true;
  return false;
}

function bestOwnerLink(gardenId, links) {
  const ownerLinks = links
    .filter(
      (link) =>
        link.garden_id === gardenId &&
        /owner/.test(link.relationship) &&
        (link.valid_to ?? "") === "",
    )
    .sort((left, right) => {
      const claim = Number(right.current_claim === "current_candidate") - Number(left.current_claim === "current_candidate");
      if (claim !== 0) return claim;
      return String(right.verified_date ?? "").localeCompare(String(left.verified_date ?? ""));
    });
  return ownerLinks[0] ?? null;
}

export function buildOwnerHqMaps({ gardens, companies, links, overrides = [], siliguriRows = [] }) {
  const companiesById = new Map(companies.map((c) => [c.company_id, c]));
  const overridesByKey = new Map();
  for (const item of overrides) {
    const key = item.company_id || normalizeCompanyName(item.legal_name);
    if (key) overridesByKey.set(key, item);
  }
  const siliguriByGarden = new Map(siliguriRows.map((row) => [row.garden_id, row]));

  const siliguriMap = [];
  const otherMap = [];
  const workQueue = [];

  for (const garden of gardens) {
    const district = String(garden.district_current ?? "");
    if (/assam/i.test(district)) continue; // Assam is omitted from this workflow
    const isDooars = garden.garden_id.startsWith("gs-dooars-");
    if (!isDooars) continue;
    if (garden.prospect_eligibility === "excluded_current_client") continue; // tracked elsewhere, not a prospect

    // The registry only sets current_company_id from reviewed current evidence,
    // so it wins over a historical owner link. An operator link still implies
    // the operating company when nothing stronger exists.
    const link = bestOwnerLink(garden.garden_id, links);
    const company =
      companiesById.get(garden.current_company_id) ||
      (link ? companiesById.get(link.company_id) : null);
    const override = company
      ? overridesByKey.get(company.company_id) || overridesByKey.get(normalizeCompanyName(company.legal_name))
      : null;

    const row = (extra) => ({
      garden_id: garden.garden_id,
      garden: garden.canonical_name,
      status: garden.current_status,
      eligibility: garden.prospect_eligibility,
      owner_company: company?.legal_name ?? "",
      company_id: company?.company_id ?? "",
      hq_city: "",
      hq_source: "",
      hq_address: "",
      owner_evidence: link ? `${link.relationship} (${link.current_claim})` : garden.current_company_id ? "current_company_id" : "",
      notes: "",
      ...extra,
    });

    if (company && isCorporateOwner(company)) {
      otherMap.push(
        row({
          hq_city: override?.hq_city || detectHqCity(company.registered_office),
          hq_source: override?.hq_city ? "manual_override" : company.registered_office ? "registered_office" : "",
          hq_address: company.registered_office ?? "",
          notes: "Rejected: public company or large multi-estate group.",
        }),
      );
      continue;
    }

    if (override) {
      siliguriMap.push(
        row({
          hq_city: override.hq_city,
          hq_source: "manual_override",
          hq_address: override.hq_address || company?.registered_office || "",
          notes: override.notes || "",
        }),
      );
      if (override.hq_city !== "Siliguri") {
        // Move non-Siliguri overrides to the other map.
        const moved = siliguriMap.pop();
        otherMap.push(moved);
      }
      continue;
    }

    if (company?.registered_office) {
      const city = detectHqCity(company.registered_office);
      const entry = row({
        hq_city: city,
        hq_source: "registered_office",
        hq_address: company.registered_office,
        notes: "HQ from company registered office. Confirm on MCA for high confidence.",
      });
      if (city === "Siliguri") siliguriMap.push(entry);
      else otherMap.push(entry);
      continue;
    }

    // No company or no HQ evidence. Fall back to a Siliguri office row for
    // this garden if the directory recorded one, else the work queue.
    const siliguriRow = siliguriByGarden.get(garden.garden_id);
    if (siliguriRow?.office_address && /siliguri/i.test(siliguriRow.office_address)) {
      siliguriMap.push(
        row({
          hq_city: "Siliguri",
          hq_source: "tea_board_directory_office",
          hq_address: siliguriRow.office_address,
          owner_company: siliguriRow.company_name && siliguriRow.company_name !== "-" ? siliguriRow.company_name : "",
          notes: "Siliguri office from the Tea Board directory. Owner company still needs MCA confirmation.",
        }),
      );
      continue;
    }

    workQueue.push(
      row({
        hq_city: "",
        hq_source: "",
        notes: link
          ? "Historical owner only. Confirm the current owner company on MCA."
          : "No owner company known. Start from historical owner names or the Siliguri office route.",
      }),
    );
  }

  const statusRank = { active_confirmed: 0, likely_active: 1, temporarily_closed: 2, unknown: 3 };
  const sortKey = (row) => (statusRank[row.status] ?? 9) + (row.eligibility === "target_candidate" ? -0.5 : 0);
  for (const list of [siliguriMap, otherMap, workQueue]) list.sort((a, b) => sortKey(a) - sortKey(b) || a.garden.localeCompare(b.garden));

  return { siliguriMap, otherMap, workQueue };
}

const HEADERS = [
  "garden_id",
  "garden",
  "status",
  "eligibility",
  "owner_company",
  "company_id",
  "hq_city",
  "hq_source",
  "hq_address",
  "owner_evidence",
  "notes",
];

export async function writeOwnerHqMaps({ siliguriMap, otherMap, workQueue }) {
  await mkdir(importsDir, { recursive: true });
  await Promise.all([
    writeFile(resolve(importsDir, "owner_hq_map_siliguri.csv"), toCsv(HEADERS, siliguriMap)),
    writeFile(resolve(importsDir, "owner_hq_map_other.csv"), toCsv(HEADERS, otherMap)),
    writeFile(resolve(importsDir, "owner_hq_work_queue.csv"), toCsv(HEADERS, workQueue)),
  ]);
  return { siliguri: siliguriMap.length, other: otherMap.length, workQueue: workQueue.length };
}

async function readCsv(path) {
  try {
    return parseCsv(await readFile(path, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function main() {
  const [gardens, companies, links, overrides, siliguriRows] = await Promise.all([
    readCsv(resolve(DATA_DIR, "gardens.csv")),
    readCsv(resolve(DATA_DIR, "companies.csv")),
    readCsv(resolve(DATA_DIR, "garden_company_links.csv")),
    readCsv(resolve(MANUAL_DIR, "hq_overrides.csv")),
    readCsv(resolve(DATA_DIR, "siliguri_dooars_estates.csv")),
  ]);
  const maps = buildOwnerHqMaps({ gardens, companies, links, overrides, siliguriRows });
  const counts = await writeOwnerHqMaps(maps);
  console.log(JSON.stringify(counts, null, 2));
}

if (process.argv[1] && resolve(process.argv[1]) === new URL(import.meta.url).pathname) {
  await main();
}
