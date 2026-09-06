const SITE_URL = 'https://gardensuite.in';
const ORG_NAME = 'Sarbani Associates';
const ORG_EMAIL = 'sarbaniassociates@gmail.com';

export interface BreadcrumbItem {
	name: string;
	path: string;
}

export function organizationSchema() {
	return {
		'@type': 'Organization',
		'@id': `${SITE_URL}/#organization`,
		name: ORG_NAME,
		url: SITE_URL,
		logo: {
			'@type': 'ImageObject',
			url: `${SITE_URL}/gardensuite-icon-white.svg`
		},
		description:
			'Sarbani Associates builds GardenSuite, a complete ERP software for tea gardens in India. Serving the tea industry since 2000.',
		foundingDate: '2000',
		sameAs: [
			'https://www.linkedin.com/company/sarbani-associates',
			'https://www.youtube.com/@gardensuite'
		],
		knowsAbout: [
			'Tea Garden ERP',
			'Tea Estate Management Software',
			'Face Recognition Attendance for Tea Gardens',
			'Smart Weighing Scales for Tea Pluckers',
			'Tea Factory Production Tracking',
			'Tea Estate Labor Payroll and PF Calculation'
		],
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Bagdogra, Siliguri',
			addressRegion: 'West Bengal',
			addressCountry: 'IN'
		},
		areaServed: [
			'Assam',
			'Darjeeling',
			'Dooars',
			'Terai',
			'Coochbehar',
			'Uttar Dinajpur',
			'Jalpaiguri'
		],
		contactPoint: {
			'@type': 'ContactPoint',
			email: ORG_EMAIL,
			contactType: 'sales'
		}
	};
}

export function websiteSchema() {
	return {
		'@type': 'WebSite',
		'@id': `${SITE_URL}/#website`,
		url: SITE_URL,
		name: 'GardenSuite',
		publisher: { '@id': `${SITE_URL}/#organization` },
		inLanguage: 'en-IN'
	};
}

export function softwareSchema(opts: {
	name: string;
	description: string;
	os?: string;
	featureList?: string[];
}) {
	return {
		'@type': 'SoftwareApplication',
		name: opts.name,
		applicationCategory: 'BusinessApplication',
		operatingSystem: opts.os || 'Windows, Web, Android',
		description: opts.description,
		...(opts.featureList ? { featureList: opts.featureList } : {}),
		provider: { '@id': `${SITE_URL}/#organization` },
		offers: {
			'@type': 'Offer',
			availability: 'https://schema.org/InStock',
			description:
				'Free demo, on-site setup, and staff training. Contact Sarbani Associates for module pricing.'
		}
	};
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.name,
			item: `${SITE_URL}${item.path}`
		}))
	};
}

export function faqSchema(faqs: { q: string; a: string }[]) {
	return {
		'@type': 'FAQPage',
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.q,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.a
			}
		}))
	};
}

export function articleSchema(opts: {
	title: string;
	description: string;
	path: string;
	datePublished: string;
	dateModified?: string;
	image?: string;
}) {
	return {
		'@type': 'Article',
		headline: opts.title,
		description: opts.description,
		url: `${SITE_URL}${opts.path}`,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `${SITE_URL}${opts.path}`
		},
		datePublished: opts.datePublished,
		dateModified: opts.dateModified || opts.datePublished,
		author: {
			'@type': 'Organization',
			name: ORG_NAME,
			url: SITE_URL
		},
		publisher: {
			'@id': `${SITE_URL}/#organization`
		},
		...(opts.image
			? {
					image: {
						'@type': 'ImageObject',
						url: opts.image.startsWith('http') ? opts.image : `${SITE_URL}${opts.image}`
					}
				}
			: {})
	};
}

export function siteNavigationElementSchema(items: { name: string; path: string }[]) {
	return {
		'@type': 'ItemList',
		itemListElement: items.map((item, i) => ({
			'@type': 'SiteNavigationElement',
			position: i + 1,
			name: item.name,
			url: `${SITE_URL}${item.path}`
		}))
	};
}

export function buildSchemaGraph(...schemas: Record<string, unknown>[]) {
	return {
		'@context': 'https://schema.org',
		'@graph': schemas
	};
}
