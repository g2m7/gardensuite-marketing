import type { RequestHandler } from './$types';

export const prerender = true;

const SITE_URL = 'https://gardensuite.in';

const pages = [
	{ path: '/', priority: '1.0', changefreq: 'weekly', lastmod: '2026-06-03' },
	{ path: '/products/attendance', priority: '0.9', changefreq: 'monthly', lastmod: '2026-06-03' },
	{ path: '/products/mis', priority: '0.9', changefreq: 'monthly', lastmod: '2026-06-03' },
	{ path: '/products/payroll', priority: '0.9', changefreq: 'monthly', lastmod: '2026-06-03' },
	{ path: '/products/factory', priority: '0.9', changefreq: 'monthly', lastmod: '2026-06-03' },
	{ path: '/products/stores', priority: '0.9', changefreq: 'monthly', lastmod: '2026-06-03' },
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
