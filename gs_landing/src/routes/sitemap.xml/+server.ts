import type { RequestHandler } from './$types';

export const prerender = true;

const SITE_URL = 'https://gardensuite.in';

const pages = [
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/products/attendance', priority: '0.9', changefreq: 'monthly' },
	{ path: '/products/mis', priority: '0.9', changefreq: 'monthly' },
	{ path: '/products/payroll', priority: '0.9', changefreq: 'monthly' },
	{ path: '/products/factory', priority: '0.9', changefreq: 'monthly' },
	{ path: '/products/stores', priority: '0.9', changefreq: 'monthly' }
];

export const GET: RequestHandler = () => {
	const lastmod = new Date().toISOString().split('T')[0];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(p) => `  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <lastmod>${lastmod}</lastmod>
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
