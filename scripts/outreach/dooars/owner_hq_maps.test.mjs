import assert from "node:assert/strict";
import test from "node:test";

import { buildOwnerHqMaps, detectHqCity, isCorporateOwner } from "./owner_hq_maps.mjs";

const garden = (id, name, extra = {}) => ({
  garden_id: id,
  canonical_name: name,
  current_status: "likely_active",
  prospect_eligibility: "target_candidate",
  current_company_id: "",
  district_current: "Jalpaiguri",
  ...extra,
});
const company = (id, name, extra = {}) => ({
  company_id: id,
  legal_name: name,
  normalized_name: name.toLowerCase(),
  public_company: "no",
  parent_group: "",
  registered_office: "",
  ...extra,
});

test("HQ detection reads the common address forms", () => {
  assert.equal(detectHqCity("Om Place Ashrampara Siliguri 734401"), "Siliguri");
  assert.equal(detectHqCity("4 Mangoe Lane Kolkata 700001"), "Kolkata");
  assert.equal(detectHqCity("Dibrugarh Assam"), "Assam");
  assert.equal(detectHqCity("12 Bistupur Main Road Jamshedpur"), "Other");
  assert.equal(detectHqCity(""), "");
});

test("corp rejection catches public companies and known groups", () => {
  assert.equal(isCorporateOwner(company("c1", "Goodricke Group Ltd", { public_company: "yes" })), true);
  assert.equal(
    isCorporateOwner(company("c2", "Some Gardens Ltd", { parent_group: "camellia plc" })),
    true,
  );
  assert.equal(isCorporateOwner(company("c3", "Buxa Dooars Tea Company (India) Ltd")), false);
  assert.equal(isCorporateOwner(null), false);
});

test("maps split Siliguri HQ, non-Siliguri and the work queue", () => {
  const gardens = [
    garden("gs-dooars-a", "A Estate"),
    garden("gs-dooars-b", "B Estate"),
    garden("gs-dooars-c", "C Estate"),
    garden("gs-dooars-d", "D Estate"),
    garden("gs-dooars-e", "E Estate", { district_current: "Assam" }),
  ];
  const companies = [
    company("co-sil", "Siliguri Tea Co", { registered_office: "Sevoke Road, Siliguri" }),
    company("co-kol", "Kolkata Gardens Ltd", { registered_office: "Mangoe Lane, Kolkata" }),
    company("co-corp", "Big Group Ltd", { public_company: "yes" }),
  ];
  const links = [
    { garden_id: "gs-dooars-b", company_id: "co-kol", relationship: "owner_reported_in_directory", current_claim: "current_candidate", valid_to: "", verified_date: "2026-01-01" },
    { garden_id: "gs-dooars-c", company_id: "co-corp", relationship: "owner_reported_in_directory", current_claim: "current_candidate", valid_to: "", verified_date: "2026-01-01" },
  ];
  const overrides = [
    { legal_name: "Terai Tea Company Limited", hq_city: "Siliguri", hq_address: "Siliguri", company_id: "" },
  ];
  const { siliguriMap, otherMap, workQueue } = buildOwnerHqMaps({
    gardens,
    companies,
    links,
    overrides,
    siliguriRows: [
      { garden_id: "gs-dooars-a", office_address: "Hill Cart Road, Siliguri", company_name: "-" },
    ],
  });

  assert.equal(siliguriMap.length, 1);
  assert.equal(siliguriMap[0].garden, "A Estate");
  assert.equal(siliguriMap[0].hq_source, "tea_board_directory_office");

  // B has a Kolkata registered office, C is a corp, D has no owner at all.
  assert.equal(otherMap.length, 2);
  assert.equal(workQueue.length, 1);
  assert.equal(workQueue[0].garden, "D Estate");
  // Assam garden is omitted everywhere.
  const all = [...siliguriMap, ...otherMap, ...workQueue].map((row) => row.garden);
  assert.ok(!all.includes("E Estate"));
});

test("a manual override can move a company between maps", () => {
  const gardens = [garden("gs-dooars-x", "X Estate")];
  const companies = [company("co-t", "Terai Tea Company Limited", { registered_office: "" })];
  const links = [
    { garden_id: "gs-dooars-x", company_id: "co-t", relationship: "owner_or_operator", current_claim: "current_candidate", valid_to: "", verified_date: "2026-01-01" },
  ];
  const overrides = [{ legal_name: "Terai Tea Company Limited", hq_city: "Siliguri", hq_address: "Siliguri", company_id: "" }];
  const { siliguriMap, otherMap } = buildOwnerHqMaps({ gardens, companies, links, overrides, siliguriRows: [] });
  assert.equal(siliguriMap.length, 1);
  assert.equal(otherMap.length, 0);
  assert.equal(siliguriMap[0].hq_source, "manual_override");
});
