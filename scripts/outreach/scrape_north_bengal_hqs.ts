#!/usr/bin/env bun
// Google Maps HQ Scraper for North Bengal Tea Estates & Owners
// Adapted from parent web_agency/app-lite/src/scraper/google-maps.ts

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

export interface ScrapedPlace {
  query: string;
  targetCompany: string;
  targetHqCity: string;
  associatedGardens: string[];
  foundName: string;
  formattedAddress: string;
  city: string;
  state: string;
  pincode: string;
  phone: string | null;
  website: string | null;
  latitude: number | null;
  longitude: number | null;
  rating: number | null;
  reviewCount: number | null;
  category: string | null;
  placeId: string | null;
  mapsUrl: string;
  matchStatus: "matched" | "partial" | "not_found";
  scrapedAt: string;
}

const USER_AGENTS = [
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.2 Safari/605.1.15",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0"
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function buildSearchUrl(query: string, lat = 26.7271, lon = 88.3953, zoom = 8): string {
  const params = new URLSearchParams({
    tbm: "map",
    authuser: "0",
    hl: "en",
    q: query,
    pb: `!4m12!1m3!1d3826.902183192154!2d${lon.toFixed(4)}!3d${lat.toFixed(4)}!2m3!1f0!2f0!3f0!3m2!1i600!2i800!4f${zoom.toFixed(1)}!7i20!8i0!10b1!12m22!1m3!18b1!30b1!34e1!2m3!5m1!6e2!20e3!4b0!10b1!12b1!13b1!16b1!17m1!3e1!20m3!5e2!6b1!14b1!46m1!1b0!96b1!19m4!2m3!1i360!2i120!4i8`,
  });
  return `https://maps.google.com/search?${params.toString()}`;
}

function extractPlaceFromBiz(biz: any): any | null {
  if (!Array.isArray(biz)) return null;

  const name = biz[11];
  if (!name || typeof name !== "string" || name.trim().length < 2) return null;

  const addrParts = biz[2];
  const formattedAddress = biz[18] || (Array.isArray(addrParts) ? addrParts.map(String).join(", ") : "");
  let website = biz[7] ? biz[7][0] : null;
  const lat = biz[9] ? biz[9][2] : null;
  const lon = biz[9] ? biz[9][3] : null;
  const rating = biz[4] ? biz[4][7] : null;
  const reviewCount = biz[4] ? biz[4][8] : null;
  const placeId = biz[78] || biz[10] || null;
  const mapsUrl = biz[42] || (placeId ? `https://www.google.com/maps/place/?q=place_id:${placeId}` : "");

  const categoriesArr = biz[13];
  const category = categoriesArr && categoriesArr.length > 0 ? String(categoriesArr[0]) : null;

  let phone: string | null = null;
  try {
    if (biz[178] && biz[178][0]) {
      const pRaw = biz[178][0][0] || biz[178][0][3];
      if (typeof pRaw === "string" && pRaw.trim()) {
        phone = pRaw.trim();
      }
    }
  } catch {}

  const pinMatch = formattedAddress.match(/\b\d{6}\b/);
  const pincode = pinMatch ? pinMatch[0] : "";

  let city = "";
  if (/siliguri/i.test(formattedAddress)) city = "Siliguri";
  else if (/kolkata|calcutta/i.test(formattedAddress)) city = "Kolkata";
  else if (/jalpaiguri/i.test(formattedAddress)) city = "Jalpaiguri";
  else if (/darjeeling/i.test(formattedAddress)) city = "Darjeeling";
  else if (/alipurduar/i.test(formattedAddress)) city = "Alipurduar";
  else if (/malbazar|mal bazar/i.test(formattedAddress)) city = "Malbazar";
  else if (/islampur/i.test(formattedAddress)) city = "Islampur";

  return {
    foundName: name.trim(),
    formattedAddress: formattedAddress.trim(),
    city,
    state: "West Bengal",
    pincode,
    phone,
    website,
    latitude: lat,
    longitude: lon,
    rating: rating != null && rating >= 1 && rating <= 5 ? rating : null,
    reviewCount: reviewCount != null ? Math.round(reviewCount) : null,
    category,
    placeId,
    mapsUrl,
  };
}

function parseMapsResponse(jsonStr: string): any[] {
  let data: any[];
  try {
    data = JSON.parse(jsonStr);
  } catch {
    return [];
  }
  if (!Array.isArray(data) || data.length === 0) return [];
  const container = data[0];
  if (!Array.isArray(container) || !Array.isArray(container[1])) return [];
  const items = container[1];

  const results: any[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (!Array.isArray(item)) continue;
    const biz = item[14];
    const place = extractPlaceFromBiz(biz);
    if (place) results.push(place);
  }
  return results;
}

async function searchGoogleMaps(query: string, retries = 2): Promise<any[]> {
  const url = buildSearchUrl(query);
  const ua = pickRandom(USER_AGENTS);

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": ua,
          "Accept-Language": "en-US,en;q=0.9",
          "Sec-Ch-Ua": '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          "Sec-Ch-Ua-Mobile": "?0",
          "Sec-Ch-Ua-Platform": '"macOS"',
        },
      });

      if (res.status === 429) {
        console.warn(`[Rate Limited] Waiting 8s before retry ${attempt + 1}...`);
        await sleep(8000);
        continue;
      }

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const text = await res.text();
      const firstNewline = text.indexOf("\n");
      if (firstNewline === -1) return [];
      const jsonStr = text.substring(firstNewline + 1);
      return parseMapsResponse(jsonStr);
    } catch (err: any) {
      if (attempt === retries) {
        console.error(`Query "${query}" failed after ${retries} retries:`, err.message);
        return [];
      }
      await sleep(3000 * (attempt + 1));
    }
  }
  return [];
}

// ── Main Runner ──────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const force = args.includes("--force");
  const limit = args.find((a) => a.startsWith("--limit=")) ? parseInt(args.find((a) => a.startsWith("--limit="))!.split("=")[1], 10) : 0;
  const filterCity = args.find((a) => a.startsWith("--city=")) ? args.find((a) => a.startsWith("--city="))!.split("=")[1].toLowerCase() : null;

  const gardensPath = resolve("marketing/outreach/north-bengal-intelligence/data/north_bengal_gardens.json");
  if (!existsSync(gardensPath)) {
    console.error("Baseline gardens.json not found at:", gardensPath);
    process.exit(1);
  }

  const gardens = JSON.parse(readFileSync(gardensPath, "utf8"));
  console.log(`Loaded ${gardens.length} total North Bengal tea gardens.`);

  // Group by unique Owner / Company and Target City
  const companyMap = new Map<string, { company: string; hqCity: string; address: string; gardens: string[] }>();

  for (const g of gardens) {
    if (!g.ownerEntity || g.ownerEntity.length < 2) continue;
    const cleanComp = g.ownerEntity.trim().replace(/\s+/g, " ");
    const key = `${cleanComp.toUpperCase()}||${(g.hqCity || "Other").toUpperCase()}`;

    if (!companyMap.has(key)) {
      companyMap.set(key, {
        company: cleanComp,
        hqCity: g.hqCity || "Other",
        address: g.ownerAddress || "",
        gardens: [g.name],
      });
    } else {
      companyMap.get(key)!.gardens.push(g.name);
    }
  }

  console.log(`Identified ${companyMap.size} unique company/owner target units.`);

  let targets = Array.from(companyMap.values());

  if (filterCity) {
    targets = targets.filter((t) => t.hqCity.toLowerCase() === filterCity);
    console.log(`Filtered to ${targets.length} targets in "${filterCity}".`);
  } else {
    targets.sort((a, b) => {
      const score = (city: string) => (city === "Siliguri" ? 4 : city === "Jalpaiguri" ? 3 : city === "Islampur" ? 2 : city === "Kolkata" ? 1 : 0);
      return score(b.hqCity) - score(a.hqCity);
    });
  }

  if (dryRun) {
    console.log(`\n[DRY RUN] Will scrape first ${limit || 10} targets:`);
    for (const t of targets.slice(0, limit || 10)) {
      console.log(`- "${t.company}" (${t.hqCity}) -> ${t.gardens.length} gardens (${t.gardens.slice(0, 2).join(", ")})`);
    }
    return;
  }

  const outJsonPath = resolve("marketing/outreach/north-bengal-intelligence/data/north_bengal_hqs_scraped.json");
  const outCsvPath = resolve("marketing/outreach/north-bengal-intelligence/data/north_bengal_hqs_scraped.csv");

  const existingResults: ScrapedPlace[] = (!force && existsSync(outJsonPath)) ? JSON.parse(readFileSync(outJsonPath, "utf8")) : [];
  const completedKeys = new Set(existingResults.map((r) => `${r.targetCompany.toUpperCase()}||${r.targetHqCity.toUpperCase()}`));
  console.log(`Found ${existingResults.length} previously scraped results. Skipping already-scraped entities.`);

  const pending = targets.filter((t) => !completedKeys.has(`${t.company.toUpperCase()}||${t.hqCity.toUpperCase()}`));
  const toProcess = limit > 0 ? pending.slice(0, limit) : pending;
  console.log(`Processing ${toProcess.length} pending target companies...\n`);

  const results: ScrapedPlace[] = [...existingResults];

  function saveCheckpoint() {
    writeFileSync(outJsonPath, JSON.stringify(results, null, 2));

    const csvHeaders = [
      "Target Company", "Target HQ City", "Associated Gardens", "Match Status",
      "Found Place Name", "Formatted Address", "City", "PIN Code", "Phone",
      "Website", "Latitude", "Longitude", "Rating", "Reviews", "Category",
      "Place ID", "Google Maps URL", "Scraped At"
    ];

    function escapeCsv(val: any) {
      if (val == null) return "";
      const s = String(val).replace(/"/g, '""');
      return `"${s}"`;
    }

    const rows = [csvHeaders.join(",")];
    for (const r of results) {
      rows.push([
        escapeCsv(r.targetCompany),
        escapeCsv(r.targetHqCity),
        escapeCsv(r.associatedGardens.join("; ")),
        escapeCsv(r.matchStatus),
        escapeCsv(r.foundName),
        escapeCsv(r.formattedAddress),
        escapeCsv(r.city),
        escapeCsv(r.pincode),
        escapeCsv(r.phone),
        escapeCsv(r.website),
        r.latitude ?? "",
        r.longitude ?? "",
        r.rating ?? "",
        r.reviewCount ?? "",
        escapeCsv(r.category),
        escapeCsv(r.placeId),
        escapeCsv(r.mapsUrl),
        escapeCsv(r.scrapedAt)
      ].join(","));
    }
    writeFileSync(outCsvPath, rows.join("\n") + "\n");
  }

  let count = 0;
  for (const item of toProcess) {
    count++;
    const query = item.hqCity && item.hqCity !== "Other" ? `${item.company} ${item.hqCity}` : `${item.company} West Bengal`;
    console.log(`[${count}/${toProcess.length}] Searching Maps: "${query}"...`);

    const places = await searchGoogleMaps(query);
    const topMatch = places[0];

    let matchStatus: "matched" | "partial" | "not_found" = "not_found";
    if (topMatch) {
      const qNorm = item.company.toLowerCase().replace(/[^a-z0-9]/g, "");
      const fNorm = topMatch.foundName.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (fNorm.includes(qNorm) || qNorm.includes(fNorm) || fNorm.includes("tea") || topMatch.category?.toLowerCase().includes("tea")) {
        matchStatus = "matched";
      } else {
        matchStatus = "partial";
      }
    }

    const entry: ScrapedPlace = {
      query,
      targetCompany: item.company,
      targetHqCity: item.hqCity,
      associatedGardens: item.gardens,
      foundName: topMatch?.foundName || "",
      formattedAddress: topMatch?.formattedAddress || "",
      city: topMatch?.city || item.hqCity,
      state: "West Bengal",
      pincode: topMatch?.pincode || "",
      phone: topMatch?.phone || null,
      website: topMatch?.website || null,
      latitude: topMatch?.latitude || null,
      longitude: topMatch?.longitude || null,
      rating: topMatch?.rating || null,
      reviewCount: topMatch?.reviewCount || null,
      category: topMatch?.category || null,
      placeId: topMatch?.placeId || null,
      mapsUrl: topMatch?.mapsUrl || "",
      matchStatus,
      scrapedAt: new Date().toISOString(),
    };

    results.push(entry);

    if (topMatch) {
      console.log(`  ✓ Found: ${topMatch.foundName} (${topMatch.formattedAddress.slice(0, 60)}...)`);
      if (topMatch.phone) console.log(`    Phone: ${topMatch.phone}`);
      if (topMatch.website) console.log(`    Web: ${topMatch.website}`);
    } else {
      console.log(`  - No direct Google Maps match.`);
    }

    if (count % 5 === 0) {
      saveCheckpoint();
      console.log(`  [Checkpoint saved: ${results.length} records]`);
    }

    const delayMs = 2000 + Math.random() * 1500;
    await sleep(delayMs);
  }

  saveCheckpoint();
  console.log(`\nAll done! Total scraped records: ${results.length}`);
  console.log(`Saved JSON: ${outJsonPath}`);
  console.log(`Saved CSV: ${outCsvPath}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
