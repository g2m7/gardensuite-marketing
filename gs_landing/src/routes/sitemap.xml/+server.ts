import type { RequestHandler } from './$types';

export const prerender = true;

const SITE_URL = 'https://gardensuite.in';

const pages = [
	{ path: '/', priority: '1.0', changefreq: 'weekly', lastmod: '2026-06-03' },
	{ path: '/products/attendance', priority: '0.9', changefreq: 'monthly', lastmod: '2026-08-04' },
	{
		path: '/products/attendance/face-attendance',
		priority: '0.8',
		changefreq: 'monthly',
		lastmod: '2026-08-04'
	},
	{
		path: '/products/attendance/smart-weighing',
		priority: '0.8',
		changefreq: 'monthly',
		lastmod: '2026-08-04'
	},
	{
		path: '/products/attendance/offline-sync',
		priority: '0.8',
		changefreq: 'monthly',
		lastmod: '2026-08-04'
	},
	{ path: '/products/mis', priority: '0.9', changefreq: 'monthly', lastmod: '2026-06-03' },
	{ path: '/products/payroll', priority: '0.9', changefreq: 'monthly', lastmod: '2026-06-03' },
	{ path: '/products/factory', priority: '0.9', changefreq: 'monthly', lastmod: '2026-06-03' },
	{ path: '/products/stores', priority: '0.9', changefreq: 'monthly', lastmod: '2026-06-03' },
	{
		path: '/tea-garden-software-assam',
		priority: '0.85',
		changefreq: 'weekly',
		lastmod: '2026-09-06'
	},
	{
		path: '/tea-garden-software-dooars-terai',
		priority: '0.85',
		changefreq: 'weekly',
		lastmod: '2026-09-06'
	},
	{
		path: '/tea-garden-software-darjeeling',
		priority: '0.85',
		changefreq: 'weekly',
		lastmod: '2026-09-06'
	},
	{
		path: '/guides/stop-proxy-attendance-tea-garden',
		priority: '0.8',
		changefreq: 'monthly',
		lastmod: '2026-09-06'
	},
	{
		path: '/guides/smart-leaf-weighing-tea-garden',
		priority: '0.8',
		changefreq: 'monthly',
		lastmod: '2026-09-06'
	},
	{
		path: '/tea-estate-glossary',
		priority: '0.8',
		changefreq: 'monthly',
		lastmod: '2026-09-06'
	},
	{ path: '/privacy', priority: '0.3', changefreq: 'yearly', lastmod: '2026-08-02' },
	{ path: '/terms', priority: '0.3', changefreq: 'yearly', lastmod: '2026-08-02' }
];

export const GET: RequestHandler = () => {
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(p) => `  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};
