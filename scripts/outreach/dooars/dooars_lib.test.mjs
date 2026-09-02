import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";

import {
  buildRegistry,
  cacheDir,
  cleanGardenCanonicalName,
  extractAtlasGardenNames,
  loadCollectedSourceTexts,
  nameSimilarity,
  normalizeCompanyName,
  normalizeGardenName,
  normalizeRegistration,
  parseCsv,
  toCsv,
  validateRegistry,
} from "./dooars_lib.mjs";

test("garden normalization removes common suffixes and spacing variants", () => {
  assert.equal(normalizeGardenName("Leesh River Tea Garden"), "leesh river");
  assert.equal(normalizeGardenName("MEENGLAS T.E."), "meenglas");
  assert.equal(normalizeGardenName("New Dooars Estate"), "new duars");
  assert.equal(normalizeGardenName("Washabarietea Estate"), "washabarie");
  assert.equal(normalizeGardenName("Zurrantee Tea"), "zurrantee");
  assert.equal(normalizeGardenName("Garganda Tae Estate"), "garganda");
});

test("canonical garden name cleaning removes corporate and estate suffixes", () => {
  assert.equal(cleanGardenCanonicalName("CHULSA TEA ESTATE"), "Chulsa");
  assert.equal(cleanGardenCanonicalName("KALCHINI T E"), "Kalchini");
  assert.equal(cleanGardenCanonicalName("SONAR BANGLA TEA CO (P) LTD"), "Sonar Bangla");
  assert.equal(cleanGardenCanonicalName("KONPAKRI AGRO INDUSTRIES (P)"), "Konpakri");
});

test("registration normalization strips formatting prefixes and leading zeros", () => {
  assert.equal(normalizeRegistration("P-2404"), "2404");
  assert.equal(normalizeRegistration("RC-2531"), "2531");
  assert.equal(normalizeRegistration("B-2631"), "2631");
  assert.equal(normalizeRegistration("05"), "5");
  assert.equal(normalizeRegistration("A-2"), "2");
});

test("company normalization joins common legal-name variants", () => {
  assert.equal(
    normalizeCompanyName("The Goodricke Group Ltd."),
    normalizeCompanyName("Goodricke Group Limited"),
  );
  assert.equal(
    normalizeCompanyName("Indong Tea Co. Pvt. Ltd."),
    "indong tea company private limited",
  );
});

test("name similarity handles compact and minor spelling variants", () => {
  assert.equal(nameSimilarity("New Lands", "Newlands"), 1);
  assert.ok(nameSimilarity("Bhatkawa", "Bhatkowa") >= 0.8);
  assert.ok(nameSimilarity("Dalsingpara", "Tulsipara") < 0.7);
});

test("CSV serializer round-trips commas and quotes", () => {
  const csv = toCsv(["name", "notes"], [{ name: "Aibheel", notes: 'Owner said "call", later' }]);
  assert.deepEqual(parseCsv(csv), [{ name: "Aibheel", notes: 'Owner said "call", later' }]);
});

test(
  "collected official sources build a broad registry with guarded current status",
  { skip: !existsSync(`${cacheDir}/text/tea-gis-jalpaiguri-atlas-2015.txt`) },
  async () => {
    const sourceTexts = await loadCollectedSourceTexts();
    assert.equal(extractAtlasGardenNames(sourceTexts["tea-gis-jalpaiguri-atlas-2015"]).length, 128);

    const registry = await buildRegistry({ sourceTexts });
    assert.ok(registry.gardens.length >= 160);
    assert.equal(
      registry.gardens.find((garden) => garden.garden_id === "gs-dooars-aibheel")?.current_status,
      "active_confirmed",
    );
    assert.equal(
      registry.gardens.find((garden) => garden.garden_id === "gs-dooars-sonali")?.current_status,
      "temporarily_closed",
    );
    assert.equal(
      registry.gardens.find((garden) => garden.garden_id === "gs-dooars-aibheel")
        ?.prospect_eligibility,
      "excluded_large_group",
    );
    assert.equal(
      registry.activeEstates.some((garden) => garden.garden_id === "gs-dooars-aibheel"),
      false,
    );
    assert.equal(
      registry.activeEstates.some((garden) => garden.garden_id === "gs-dooars-bamandanga-tondoo"),
      true,
    );
    assert.ok(registry.contactHints.length >= 100);
    assert.equal(validateRegistry(registry).valid, true);
  },
);

test("validator rejects an active record without a checked date", () => {
  const validation = validateRegistry({
    gardens: [
      {
        garden_id: "gs-dooars-test",
        canonical_name: "Test",
        current_status: "active_confirmed",
        status_confidence: "high",
        status_checked_date: "",
        current_company_id: "",
      },
    ],
    aliases: [],
    companies: [],
    links: [],
    contacts: [],
  });
  assert.equal(validation.valid, false);
  assert.match(validation.errors.join("\n"), /active status has no checked date/);
});
