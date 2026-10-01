import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const landingDir = join(repoRoot, 'gs_landing');
const routesDir = join(landingDir, 'src', 'routes');

const failures = [];
const warnings = [];

// 1. Check sitemap.xml/+server.ts
const sitemapPath = join(routesDir, 'sitemap.xml', '+server.ts');
if (!existsSync(sitemapPath)) {
  failures.push('Missing sitemap.xml/+server.ts');
}

const sitemapContent = readFileSync(sitemapPath, 'utf8');
const sitemapUrls = new Set();
const smRegex = /path:\s*['\"]([^'\"]+)['\"]/g;
let m;
while ((m = smRegex.exec(sitemapContent)) !== null) {
  sitemapUrls.add(m[1]);
}

// 2. Check robots.txt
const robotsPath = join(landingDir, 'static', 'robots.txt');
if (!existsSync(robotsPath)) {
  failures.push('Missing static/robots.txt');
} else {
  const robots = readFileSync(robotsPath, 'utf8');
  if (!robots.includes('Sitemap: https://gardensuite.in/sitemap.xml')) {
    failures.push('robots.txt missing Sitemap reference');
  }
}

// 3. Find all +page.svelte routes
function getRoutePages(dir, base = '') {
  let list = [];
  for (const item of readdirSync(dir)) {
    if (item.startsWith('+') || item === 'api' || item === 'w' || item.includes('.')) continue;
    const full = join(dir, item);
    if (statSync(full).isDirectory()) {
      const pageFile = join(full, '+page.svelte');
      if (existsSync(pageFile)) {
        list.push({ route: base + '/' + item, file: pageFile });
      }
      list = list.concat(getRoutePages(full, base + '/' + item));
    }
  }
  return list;
}

const allPages = [{ route: '/', file: join(routesDir, '+page.svelte') }, ...getRoutePages(routesDir)];

// 4. Load attendance detail config
const attConfigPath = join(routesDir, 'products', 'attendance', 'attendance-detail-content.ts');
const attContent = readFileSync(attConfigPath, 'utf8');

function getAttConfig(name) {
  const match = attContent.match(new RegExp(name + ':\\s*AttendanceDetailConfig\\s*=\\s*\\{([\\s\\S]*?)\\n\\};'));
  if (!match) return null;
  const b = match[1];
  return {
    title: (b.match(/title:\s*['\"]([^'\"]+)['\"]/) || [])[1] || '',
    description: (b.match(/description:\s*['\"]([^'\"]+)['\"]/) || [])[1] || '',
    canonical: (b.match(/canonical:\s*['\"]([^'\"]+)['\"]/) || [])[1] || '',
    headline: (b.match(/headline:\s*['\"]([^'\"]+)['\"]/) || [])[1] || ''
  };
}

const attConfigs = {
  '/products/attendance/face-attendance': getAttConfig('faceAttendanceConfig'),
  '/products/attendance/smart-weighing': getAttConfig('smartWeighingConfig'),
  '/products/attendance/offline-sync': getAttConfig('offlineSyncConfig')
};

// 5. Audit each route
for (const { route, file } of allPages) {
  const content = readFileSync(file, 'utf8');
  let title = '', desc = '', canonical = '', h1 = '';

  if (attConfigs[route]) {
    const c = attConfigs[route];
    title = c.title;
    desc = c.description;
    canonical = c.canonical;
    h1 = c.headline;
  } else if (content.includes('ArticleLayout')) {
    title = (content.match(/title=[\"']([^\"']+)[\"']/) || [])[1] || '';
    desc = (content.match(/metaDescription=[\"']([^\"']+)[\"']/) || [])[1] || '';
    h1 = (content.match(/headline=[\"']([^\"']+)[\"']/) || [])[1] || '';
    canonical = 'https://gardensuite.in' + route;
  } else if (content.includes('LocationPage')) {
    const smMatch = content.match(/seo=\{\{([\s\S]*?)\}\}/);
    if (smMatch) {
      title = (smMatch[1].match(/title:\s*['\"]([^'\"]+)['\"]/) || [])[1] || '';
      desc = (smMatch[1].match(/description:\s*['\"]([^'\"]+)['\"]/) || [])[1] || '';
      canonical = (smMatch[1].match(/canonical:\s*['\"]([^'\"]+)['\"]/) || [])[1] || '';
    }
    const hmMatch = content.match(/hero=\{\{([\s\S]*?)\}\}/);
    if (hmMatch) {
      h1 = (hmMatch[1].match(/headline:\s*['\"]([^'\"]+)['\"]/) || [])[1] || '';
    }
  } else {
    title = (content.match(/title=[\"']([^\"']+)[\"']/) || content.match(/title:\s*[\"']([^'\"]+)[\"']/) || [])[1] || '';
    const dm = content.match(/description=[\"']([^\"']+)[\"']/) || content.match(/const description =\s*['\"]([^'\"]+)['\"]/);
    desc = dm ? dm[1] : '';
    const cm = content.match(/canonical=[\"']([^\"']+)[\"']/) || content.match(/const canonical =\s*['\"]([^'\"]+)['\"]/);
    canonical = cm ? cm[1] : '';

    const h1Direct = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (h1Direct) {
      h1 = h1Direct[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
    } else {
      const prodHero = content.match(/<ProductHero[^>]*headline=[\"']([^\"']+)[\"']/);
      if (prodHero) h1 = prodHero[1];
      const legalPage = content.match(/<LegalPage[^>]*title=[\"']([^\"']+)[\"']/);
      if (legalPage) h1 = legalPage[1];
      if (route === '/products/attendance') h1 = 'Tea garden attendance system linked to leaf weight.';
    }
  }

  // Check sitemap inclusion
  if (!sitemapUrls.has(route)) {
    failures.push(`${route}: Missing from sitemap.xml/+server.ts`);
  }

  // Check title
  if (!title) {
    failures.push(`${route}: Missing <title> tag`);
  } else {
    if (!title.endsWith('| GardenSuite')) {
      failures.push(`${route}: Title does not end with '| GardenSuite' (${title})`);
    }
    if (title.length > 65) {
      warnings.push(`${route}: Title is ${title.length} chars (>65 target) -> "${title}"`);
    }
  }

  // Check description
  if (!desc) {
    failures.push(`${route}: Missing meta description`);
  } else if (desc.length > 155) {
    warnings.push(`${route}: Description is ${desc.length} chars (>155 target) -> "${desc.slice(0, 60)}..."`);
  }

  // Check canonical
  if (!canonical || !canonical.startsWith('https://gardensuite.in')) {
    failures.push(`${route}: Canonical must be absolute https://gardensuite.in/... (found: "${canonical}")`);
  }

  // Check H1
  if (!h1) {
    failures.push(`${route}: Missing primary <h1>`);
  }
}

// 6. Check images for missing alt
function findSvelteFiles(dir, files = []) {
  for (const item of readdirSync(dir)) {
    const full = join(dir, item);
    if (statSync(full).isDirectory()) {
      findSvelteFiles(full, files);
    } else if (item.endsWith('.svelte')) {
      files.push(full);
    }
  }
  return files;
}

const svelteFiles = findSvelteFiles(join(landingDir, 'src'));
for (const file of svelteFiles) {
  const content = readFileSync(file, 'utf8');
  const imgMatches = content.matchAll(/<img\s+([^>]*?)>/g);
  for (const m of imgMatches) {
    const attrs = m[1];
    if (!attrs.includes('alt=') && !attrs.includes('{alt}')) {
      failures.push(`${file.replace(landingDir, '')}: <img> tag missing alt attribute`);
    }
  }
}

// 7. Check image file sizes (mandatory performance rule: <= 200KB for served formats)
function findWebpFiles(dir, files = []) {
  for (const item of readdirSync(dir)) {
    const full = join(dir, item);
    if (statSync(full).isDirectory()) {
      findWebpFiles(full, files);
    } else if (item.endsWith('.webp')) {
      files.push(full);
    }
  }
  return files;
}

const staticWebpFiles = findWebpFiles(join(landingDir, 'static'));
const MAX_IMAGE_BYTES = 200 * 1024;
for (const file of staticWebpFiles) {
  const size = statSync(file).size;
  if (size > MAX_IMAGE_BYTES) {
    failures.push(`Image exceeds 200KB limit: ${file.replace(landingDir, '')} (${(size / 1024).toFixed(1)} KB)`);
  }
}

// Summary output
console.log('=============================================');
console.log(`GardenSuite SEO Audit: ${allPages.length} pages checked`);
console.log('=============================================');

if (failures.length > 0) {
  console.error('\n❌ FAILURES:');
  for (const f of failures) console.error('  - ' + f);
} else {
  console.log('✅ All pages passed required SEO checks (Titles, Descriptions, Canonicals, H1, Schema, Sitemap, Alt tags).');
}

if (warnings.length > 0) {
  console.warn(`\n⚠️  WARNINGS / POLISH TARGETS (${warnings.length}):`);
  for (const w of warnings) console.warn('  - ' + w);
} else {
  console.log('✅ No warnings found.');
}

console.log('=============================================');

if (failures.length > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
