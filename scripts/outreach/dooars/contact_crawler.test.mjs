import assert from "node:assert/strict";
import test from "node:test";

import {
  extractContactSignals,
  normalizeDomain,
  parseRobots,
  selectContactLinks,
} from "./contact_crawler.mjs";
import { extractMcaCompanyRows } from "./dooars_lib.mjs";

test("domain normalization strips scheme, path and www", () => {
  assert.equal(normalizeDomain("https://www.example.com/about"), "example.com");
  assert.equal(normalizeDomain("HTTP://Example.com/"), "example.com");
  assert.equal(normalizeDomain("example.com"), "example.com");
  assert.equal(normalizeDomain("not a domain"), "");
  assert.equal(normalizeDomain(""), "");
});

test("robots parser allows when no rule matches and honors longest match", () => {
  const robots = parseRobots(
    [
      "User-agent: *",
      "Disallow: /admin",
      "Disallow: /private/",
      "Allow: /private/public",
      "",
      "User-agent: Googlebot",
      "Disallow: /",
    ].join("\n"),
  );
  assert.equal(robots.isAllowed("/"), true);
  assert.equal(robots.isAllowed("/contact-us"), true);
  assert.equal(robots.isAllowed("/admin/panel"), false);
  assert.equal(robots.isAllowed("/private/secret"), false);
  assert.equal(robots.isAllowed("/private/public/page"), true);
});

test("robots parser ignores groups for other agents and empty disallow means allow", () => {
  const robots = parseRobots(
    ["User-agent: AhrefsBot", "Disallow: /", "", "User-agent: *", "Disallow:"].join("\n"),
  );
  assert.equal(robots.isAllowed("/anything"), true);
});

test("contact link selection is same-host only and resolves relative paths", () => {
  const html = `
    <a href="/contact-us">Contact us</a>
    <a href="about.html">About the company</a>
    <a href="https://facebook.com/example">Facebook</a>
    <a href="mailto:info@example.com">Email</a>
    <a href="/careers">Careers</a>
  `;
  const links = selectContactLinks(html, "https://example.com/index.html");
  assert.deepEqual(links, ["https://example.com/contact-us", "https://example.com/about.html"]);
});

test("contact signal extraction finds emails, phones and title contexts", () => {
  const html = `
    <script>tracker("bot@example.com")</script>
    <a href="mailto:office@gardentea.com">Email us</a>
    <p>Mr R. Sharma, Estate Manager</p>
    <p>Phone: +91 98320 12345, Office: 0353 254 1234</p>
    <img alt="logo.png" src="x"> logo@gardentea.com.png</img>
  `;
  const signals = extractContactSignals(html);
  assert.ok(signals.emails.includes("office@gardentea.com"));
  assert.ok(!signals.emails.some((email) => email.endsWith(".png")));
  assert.ok(signals.emails.some((email) => !email.includes("bot@")));
  assert.ok(signals.phones.some((phone) => phone.replace(/\D/g, "").includes("9832012345")));
  assert.ok(signals.person_contexts.some((line) => /Estate Manager/i.test(line)));
});

test("MCA parser reads common column spellings and validates CIN", () => {
  const csv = [
    "CIN,CompanyName,CompanyStatus,RegisteredOfficeAddress,RocCode,DateofRegistration",
    "U01112WB1995PTC007538,Sungreen Tea & Industries Ltd,Active,\"Station Road, Siliguri, Darjeeling, WB 734001\",Kolkata,1995-05-12",
    "BAD-CIN,Tea Traders,Active,Siliguri,Kolkata,2020-01-01",
  ].join("\n");
  const rows = extractMcaCompanyRows(csv);
  assert.equal(rows.length, 2);
  assert.equal(rows[0].cin, "U01112WB1995PTC007538");
  assert.equal(rows[0].cin_valid, "yes");
  assert.equal(rows[0].company_status, "Active");
  assert.match(rows[0].registered_office, /Siliguri/);
  assert.equal(rows[1].cin_valid, "no");
});

test("MCA parser handles tab separated exports and empty input", () => {
  const tsv = "CIN\tCompany Name\tCompany Status\nU01112WB2001PTC006123\tHill Tea Co\tActive";
  const rows = extractMcaCompanyRows(tsv);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].legal_name, "Hill Tea Co");
  assert.deepEqual(extractMcaCompanyRows(""), []);
  assert.deepEqual(extractMcaCompanyRows(undefined), []);
});
