#!/usr/bin/env node
// Two-hop public contact crawler for confirmed Dooars tea company domains.
//
// Scope rules:
// - Crawl only domains listed in a prepared target CSV. Targets come from the
//   registry companies table or manual review. Never guess domains.
// - Two hops maximum: the homepage, then contact or about pages linked from it.
// - robots.txt is fetched first and respected for every host.
// - One identified user agent, a small page budget per domain, and a polite
//   delay between requests. No login, no form submission, no evasion.
// - Every output row is a contact hint. It requires reverification through the
//   normal pipeline before any outreach use.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { parseCsv, toCsv, importsDir } from "./dooars_lib.mjs";

export const USER_AGENT = "GardenSuite research collector/1.0 (public-source audit)";
const DEFAULT_DELAY_MS = 1500;
const MAX_PAGES_PER_DOMAIN = 5;
const MAX_CONTACT_LINKS = 4;
const MAX_BYTES = 1_500_000;

const CONTACT_LINK_PATTERN =
  /(contact|about|team|management|people|office|our[\s_-]*group|company|profile)/i;

const TITLE_PATTERN =
  /\b(director|manager|proprietor|partner|chairman|ceo|chief\s+executive|secretary|coordinator|in[\s-]?charge)\b/i;

function defaultFetch(url, options) {
  return fetch(url, options);
}

export function normalizeDomain(value) {
  let domain = String(value ?? "").trim().toLowerCase();
  if (!domain) return "";
  domain = domain.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  domain = domain.replace(/^www\./, "");
  return /^[a-z0-9.-]+\.[a-z]{2,}$/.test(domain) ? domain : "";
}

// Minimal robots.txt support for the common case: user-agent groups with
// allow and disallow path rules. The longest matching path wins, and an
// allow at the same length beats a disallow. No rule means allowed.
export function parseRobots(text) {
  const lines = String(text ?? "").split(/\r?\n/);
  const groups = [];
  let current = null;
  for (const rawLine of lines) {
    const line = rawLine.replace(/#.*$/, "").trim();
    if (!line) continue;
    const separator = line.indexOf(":");
    if (separator < 0) continue;
    const key = line.slice(0, separator).trim().toLowerCase();
    const value = line.slice(separator + 1).trim();
    if (key === "user-agent") {
      if (!current || current.rules.length) {
        current = { agents: [], rules: [] };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
    } else if (current && (key === "disallow" || key === "allow")) {
      current.rules.push({ type: key, path: value });
    }
  }
  const applicable = groups.filter((group) =>
    group.agents.some((agent) => agent === "*" || USER_AGENT.toLowerCase().includes(agent)),
  );
  return {
    isAllowed(path = "/") {
      const target = path || "/";
      let best = null;
      for (const group of applicable) {
        for (const rule of group.rules) {
        if (!rule.path) continue;
        if (!target.startsWith(rule.path)) continue;
          const length = rule.path.length;
          if (
            !best ||
            length > best.length ||
            (length === best.length && rule.type === "allow" && best.type === "disallow")
          ) {
            best = { type: rule.type, length };
          }
        }
      }
      if (!best) return true;
      return best.type === "allow";
    },
  };
}

export function selectContactLinks(html, baseUrl) {
  const links = [];
  const pattern =
    /<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = pattern.exec(html))) {
    const href = match[1].replaceAll("&amp;", "&").trim();
    const text = match[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (/^(mailto:|tel:|javascript:)/i.test(href) || href.startsWith("#")) continue;
    let resolved;
    try {
      resolved = new URL(href, baseUrl);
    } catch {
      continue;
    }
    if (!/^https?:$/.test(resolved.protocol)) continue;
    const base = new URL(baseUrl);
    const sameHost =
      normalizeDomain(resolved.host) === normalizeDomain(base.host);
    if (!sameHost) continue;
    const candidate = resolved.origin + resolved.pathname;
    if (`${candidate} ${text}`.match(CONTACT_LINK_PATTERN)) {
      links.push(candidate);
    }
  }
  return [...new Set(links)].slice(0, 8);
}

function stripToText(html, preserveLines) {
  let text = String(html ?? "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ");
  if (preserveLines) {
    text = text.replace(/<\s*(br|\/p|\/li|\/tr|\/div|\/h[1-6])\b[^>]*>/gi, "\n");
  }
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/[ \t]+/g, " ")
    .trim();
}

export function extractContactSignals(html) {
  const emails = new Set();
  const phones = new Set();
  const contexts = [];

  const mailtoPattern = /mailto:([^\s'"?>]+)/gi;
  let match;
  while ((match = mailtoPattern.exec(html))) {
    emails.add(match[1].trim().toLowerCase().replace(/[.,;\\]+$/, ""));
  }
  const text = stripToText(html, true);
  const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
  while ((match = emailPattern.exec(text))) {
    emails.add(match[0].trim().toLowerCase().replace(/[.,;\\]+$/, ""));
  }
  // Indian mobiles start with 6 to 9. A leading +91 may be separated.
  const phonePattern = /(?:\+91[\s-]?)?\b[6-9]\d{4}[\s-]?\d{5}\b/g;
  while ((match = phonePattern.exec(text))) {
    phones.add(match[0].trim());
  }
  const landlinePattern = /\b0\d{2,4}[\s-]?\d{6,8}\b/g;
  while ((match = landlinePattern.exec(text))) {
    phones.add(match[0].trim());
  }
  for (const line of text.split(/\n+/)) {
    const clean = line.trim();
    if (clean.length < 8 || clean.length > 160) continue;
    if (TITLE_PATTERN.test(clean) && /[A-Za-z]/.test(clean)) {
      contexts.push(clean);
    }
  }
  const emailList = [...emails]
    .filter((email) => !/\.(png|jpe?g|gif|webp|svg|css|js)$/i.test(email))
    .slice(0, 5);
  const phoneList = [...phones].slice(0, 5);
  return { emails: emailList, phones: phoneList, person_contexts: contexts.slice(0, 6) };
}

async function fetchPage(url, fetchImpl) {
  const response = await fetchImpl(url, {
    headers: { "user-agent": USER_AGENT },
    signal: AbortSignal.timeout(60000),
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length > MAX_BYTES) throw new Error(`Response too large for ${url}`);
  return buffer.toString("utf8");
}

export async function crawlTarget({ domain, fetchImpl = defaultFetch, delayMs = DEFAULT_DELAY_MS }) {
  const clean = normalizeDomain(domain);
  if (!clean) throw new Error(`Invalid domain: ${domain}`);
  const baseUrl = `https://${clean}/`;
  const pages = [];
  const errors = [];
  const signals = { emails: new Set(), phones: new Set(), person_contexts: [] };

  const sleep = (ms) => new Promise((resolvePromise) => setTimeout(resolvePromise, ms));

  const robotsUrl = new URL("/robots.txt", baseUrl).toString();
  let robots = { isAllowed: () => true };
  try {
    const robotsText = await fetchPage(robotsUrl, fetchImpl);
    robots = parseRobots(robotsText);
    pages.push({ url: robotsUrl, status: "robots" });
  } catch {
    pages.push({ url: robotsUrl, status: "robots_missing" });
  }
  await sleep(delayMs);

  if (!robots.isAllowed("/")) {
    return { base_url: baseUrl, pages, errors: ["robots.txt disallows the homepage"], signals: { emails: [], phones: [], person_contexts: [] } };
  }

  let homepageHtml = "";
  try {
    homepageHtml = await fetchPage(baseUrl, fetchImpl);
    pages.push({ url: baseUrl, status: "ok" });
  } catch (error) {
    errors.push(error.message);
  }

  if (homepageHtml) {
    const homeSignals = extractContactSignals(homepageHtml);
    signals.emails = new Set([...signals.emails, ...homeSignals.emails]);
    signals.phones = new Set([...signals.phones, ...homeSignals.phones]);
    signals.person_contexts.push(...homeSignals.person_contexts);

    const links = selectContactLinks(homepageHtml, baseUrl).slice(0, MAX_CONTACT_LINKS);
    let pageBudget = MAX_PAGES_PER_DOMAIN - 1;
    for (const link of links) {
      if (pageBudget <= 0) break;
      await sleep(delayMs);
      const path = new URL(link).pathname + new URL(link).search;
      if (!robots.isAllowed(path)) {
        pages.push({ url: link, status: "robots_blocked" });
        continue;
      }
      try {
        const pageHtml = await fetchPage(link, fetchImpl);
        pages.push({ url: link, status: "ok" });
        const pageSignals = extractContactSignals(pageHtml);
        for (const email of pageSignals.emails) signals.emails.add(email);
        for (const phone of pageSignals.phones) signals.phones.add(phone);
        signals.person_contexts.push(...pageSignals.person_contexts);
        pageBudget -= 1;
      } catch (error) {
        pages.push({ url: link, status: "error" });
        errors.push(error.message);
      }
    }
  }

  return {
    base_url: baseUrl,
    pages,
    errors,
    signals: {
      emails: [...signals.emails].slice(0, 5),
      phones: [...signals.phones].slice(0, 5),
      person_contexts: signals.person_contexts.slice(0, 6),
    },
  };
}

async function main() {
  const command = process.argv[2] ?? "crawl";
  if (command !== "crawl") {
    throw new Error(
      "Usage: node scripts/outreach/dooars/contact_crawler.mjs crawl [targets.csv] [output.csv]",
    );
  }
  const targetsPath = resolve(
    process.argv[3] ?? resolve(importsDir, "contact_crawl_targets.csv"),
  );
  const outputPath = resolve(
    process.argv[4] ?? resolve(importsDir, "contact_crawl_hints.csv"),
  );
  const targets = parseCsv(await readFile(targetsPath, "utf8"));
  const delayMs = Number(process.env.CONTACT_CRAWL_DELAY_MS ?? DEFAULT_DELAY_MS);
  const rows = [];
  for (const target of targets) {
    const domain = normalizeDomain(target.domain || target.website);
    if (!domain) continue;
    console.error(`Crawling ${target.company_id ?? target.company_name ?? domain} (${domain})`);
    let result;
    try {
      result = await crawlTarget({ domain, delayMs });
    } catch (error) {
      result = { base_url: `https://${domain}/`, pages: [], errors: [error.message], signals: { emails: [], phones: [], person_contexts: [] } };
    }
    rows.push({
      company_id: target.company_id ?? "",
      company_name: target.company_name ?? "",
      domain,
      homepage_url: result.base_url,
      pages_crawled: result.pages.filter((page) => page.status === "ok").length,
      emails: result.signals.emails.join("; "),
      phones: result.signals.phones.join("; "),
      person_contexts: result.signals.person_contexts.join(" | "),
      crawl_date: new Date().toISOString().slice(0, 10),
      do_not_use_without_reverification: "yes",
      notes: result.errors.length ? `Errors: ${result.errors.join("; ")}` : "",
    });
    await new Promise((resolvePromise) => setTimeout(resolvePromise, delayMs));
  }
  await mkdir(importsDir, { recursive: true });
  await writeFile(outputPath, toCsv(Object.keys(rows[0] ?? { company_id: "" }), rows), "utf8");
  console.log(JSON.stringify({ crawled: rows.length, outputPath }, null, 2));
}

if (process.argv[1] && resolve(process.argv[1]) === new URL(import.meta.url).pathname) {
  await main();
}
