<script lang="ts">
	import { buildSchemaGraph, type BreadcrumbItem } from './schemas';

	interface Props {
		title: string;
		description: string;
		canonical: string;
		ogImage?: string;
		ogType?: string;
		schema?: Record<string, unknown>[];
		breadcrumbs?: BreadcrumbItem[];
	}

	const SITE_URL = 'https://gardensuite.in';
	const DEFAULT_OG_IMAGE = `${SITE_URL}/mis-dashboard-1400.webp`;

	let {
		title,
		description,
		canonical,
		ogImage = DEFAULT_OG_IMAGE,
		ogType = 'website',
		schema = [],
		breadcrumbs
	}: Props = $props();

	let schemaJson = $derived(schema.length > 0 ? JSON.stringify(buildSchemaGraph(...schema)) : '');
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	<!-- Open Graph -->
	<meta property="og:type" content={ogType} />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:site_name" content="GardenSuite" />
	<meta property="og:locale" content="en_IN" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />

	<!-- Structured Data -->
	{#if schemaJson}
		{@html `<script type="application/ld+json">${schemaJson}</script>`}
	{/if}
</svelte:head>
