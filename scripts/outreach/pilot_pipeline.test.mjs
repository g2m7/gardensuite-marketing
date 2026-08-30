import assert from "node:assert/strict";
import test from "node:test";
import { buildReport, evaluateProspects } from "./pilot_pipeline.mjs";

const validRow = {
  account_id: "GS-AS-001",
  estate_name: "Example Tea Estate",
  district: "Dibrugarh",
  hectares: "100",
  worker_count: "250",
  scale_proxy: "",
  corporate_review: "Pass",
  previously_rejected: "No",
  rejection_override: "",
  current_client: "No",
  active_sales_discussion: "No",
  account_source_urls: "https://example.com/account",
  account_verified_date: "2026-08-30",
  contact_first_name: "Asha",
  contact_last_name: "Sharma",
  contact_title: "Estate Manager",
  contact_email: "asha@example.com",
  contact_source_url: "https://example.com/contact",
  contact_verified_date: "2026-08-30",
  estate_relationship_confirmed: "Yes",
  snov_status: "Valid",
  suppressed: "No",
  owner_approved: "Yes",
};

test("accepts a fully qualified prospect", () => {
  const [result] = evaluateProspects([validRow]);
  assert.equal(result.eligible, true);
  assert.deepEqual(result.blockers, []);
});

test("blocks wrong geography, invalid email and missing approval", () => {
  const [result] = evaluateProspects([
    {
      ...validRow,
      district: "Jorhat",
      contact_email: "not-an-email",
      owner_approved: "No",
    },
  ]);
  assert.equal(result.eligible, false);
  assert.match(result.blockers.join(" | "), /district/);
  assert.match(result.blockers.join(" | "), /contact_email/);
  assert.match(result.blockers.join(" | "), /owner_approved/);
});

test("reports launch ready only at twenty eligible accounts", () => {
  const rows = Array.from({ length: 20 }, (_, index) => ({
    ...validRow,
    account_id: `GS-AS-${String(index + 1).padStart(3, "0")}`,
    estate_name: `Example Tea Estate ${index + 1}`,
    contact_email: `asha${index + 1}@example.com`,
  }));
  const report = buildReport(evaluateProspects(rows));
  assert.equal(report.launchReady, true);
  assert.equal(report.eligible, 20);
});
