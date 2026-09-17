#!/usr/bin/env node
/**
 * Design-rule ratchet check for gs_landing/src.
 *
 * Fails when a banned pattern appears in a file more often than the recorded
 * baseline, or appears at all in a file with no baseline entry. Existing
 * violations are held at their current count (see gs_landing/AGENTS.md,
 * "Known Debt"). Fixing a file lowers its count; the baseline can then be
 * tightened.
 *
 * Banned (per docs/website/DESIGN.md and AGENTS.md):
 *   - font-bold            (only font-semibold / font-medium)
 *   - shadow-lg|xl|2xl     (shadow cap 0 12px 30px rgba(0,0,0,0.10))
 *   - backdrop-blur        (no glassmorphism)
 *   - em dash character    (regular hyphens only)
 *
 * Usage: node scripts/check_design_rules.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const repoRoot = execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim();
const srcDir = path.join(repoRoot, 'gs_landing', 'src');

const BANNED = [
  { name: 'font-bold', regex: /font-bold/g },
  { name: 'shadow-lg/xl/2xl', regex: /shadow-(?:lg|xl|2xl)/g },
  { name: 'backdrop-blur', regex: /backdrop-blur/g },
  { name: 'em dash', regex: /\u2014/g },
];

// Baseline: known violations as of 2026-09-17. Do not increase. Decrease when
// a file is cleaned up. Files not listed here must have zero violations.
const BASELINE = {
  'lib/components/Footer.svelte': 1,
  'lib/components/GlobalNav.svelte': 2,
  'lib/components/product/ComparisonTable.svelte': 2,
  'lib/components/product/ProductCardFrame.svelte': 1,
  'lib/components/product/SolutionWorkflowSection.svelte': 1,
  'lib/components/product/WageLeakageCalculator.svelte': 2,
  'routes/+page.svelte': 3,
  'routes/ModulePreview.svelte': 4,
  'routes/products/factory/+page.svelte': 5,
  'routes/products/payroll/+page.svelte': 3,
  'routes/tea-estate-glossary/+page.svelte': 2,
};

function listFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(abs));
    else if (/\.(svelte|ts|js|css|html)$/.test(entry.name)) out.push(abs);
  }
  return out;
}

const failures = [];

for (const abs of listFiles(srcDir)) {
  const rel = path.relative(srcDir, abs);
  const content = fs.readFileSync(abs, 'utf8');

  const hits = [];
  for (const { name, regex } of BANNED) {
    const count = (content.match(regex) ?? []).length;
    if (count > 0) hits.push(`${name} x${count}`);
  }
  if (hits.length === 0) continue;

  const total = hits.reduce((sum, h) => sum + Number(h.split('x')[1]), 0);
  const allowed = BASELINE[rel] ?? 0;

  if (total > allowed) {
    failures.push(`  ${rel}: ${total} banned match(es) (allowed ${allowed}) -> ${hits.join(', ')}`);
  }
}

if (failures.length > 0) {
  console.error('check_design_rules: banned design patterns found:');
  console.error(failures.join('\n'));
  console.error('\nFix the violations. Do not raise the baseline.');
  process.exit(1);
}

console.log('check_design_rules: OK (no new banned design patterns)');
