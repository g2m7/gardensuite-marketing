<script lang="ts">
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { articleSchema, breadcrumbSchema, faqSchema } from '$lib/seo/schemas';
	import Breadcrumbs from '$lib/components/product/Breadcrumbs.svelte';
	import FaqSection from '$lib/components/product/FaqSection.svelte';
	import Button from '$lib/components/Button.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup.svelte';
	import type { Snippet } from 'svelte';

	interface Crumb {
		name: string;
		path: string;
	}
	interface Faq {
		q: string;
		a: string;
	}
	interface RelatedLink {
		label: string;
		href: string;
		note?: string;
	}

	let {
		title,
		metaDescription,
		kicker,
		headline,
		lede,
		datePublished,
		dateModified = datePublished,
		readTime,
		author = 'Sarbani Associates',
		answer = '',
		ctaHeadline = '',
		ctaParagraph = '',
		related = [],
		faqs = [],
		faqHeading = 'Common questions',
		bottomCtaHeadline,
		bottomCtaParagraph,
		breadcrumbs,
		media,
		children
	}: {
		title: string;
		metaDescription: string;
		kicker: string;
		headline: string;
		lede: string;
		datePublished: string;
		dateModified?: string;
		readTime: number;
		author?: string;
		answer?: string;
		ctaHeadline?: string;
		ctaParagraph?: string;
		related?: RelatedLink[];
		faqs?: Faq[];
		faqHeading?: string;
		bottomCtaHeadline: string;
		bottomCtaParagraph: string;
		breadcrumbs: Crumb[];
		media?: Snippet;
		children: Snippet;
	} = $props();

	const path = $derived(breadcrumbs[breadcrumbs.length - 1].path);
	const updatedLabel = $derived(
		new Date(dateModified).toLocaleDateString('en-IN', {
			month: 'long',
			year: 'numeric'
		})
	);
</script>

<SeoHead
	{title}
	description={metaDescription}
	canonical={`https://gardensuite.in${path}`}
	ogType="article"
	{breadcrumbs}
	schema={[
		articleSchema({
			title: headline,
			description: metaDescription,
			path,
			datePublished,
			dateModified
		}),
		breadcrumbSchema(breadcrumbs),
		...(faqs.length ? [faqSchema(faqs)] : [])
	]}
/>

<!-- Article header -->
<header class="border-b border-border bg-white pt-28 pb-14 md:pt-36 md:pb-16">
	<div class="mx-auto max-w-3xl px-6 md:px-8">
		<Breadcrumbs items={breadcrumbs} />
		<p class="text-[13px] font-semibold tracking-[0.08em] text-green-deep uppercase">{kicker}</p>
		<h1
			class="mt-4 text-3xl leading-[1.08] font-semibold tracking-[-0.03em] text-heading sm:text-4xl md:text-[44px]"
			style="text-wrap: balance"
		>
			{headline}
		</h1>
		<p class="mt-5 text-[17px] leading-[1.6] text-text-secondary">{lede}</p>
		<div class="mt-6 flex flex-wrap items-center gap-3 text-xs text-muted">
			<span>By {author}</span>
			<span aria-hidden="true">·</span>
			<span>Updated {updatedLabel}</span>
			<span aria-hidden="true">·</span>
			<span>{readTime} min read</span>
		</div>
	</div>
</header>

<!-- Full-width media band (main-site section rhythm: full bleed, bordered, surface) -->
{#if media}
	<section class="border-b border-border bg-surface py-12 md:py-16" aria-label="Article media">
		<div class="mx-auto max-w-[1344px] px-6 md:px-12">
			{@render media()}
		</div>
	</section>
{/if}

<!-- Article body -->
<article class="bg-white py-12 md:py-16">
	<div class="mx-auto max-w-3xl px-6 md:px-8">
		{#if answer}
			<div class="rounded-2xl border-l-4 border-green-deep bg-brand-50 p-6">
				<p class="text-[15px] font-semibold text-heading">Quick answer</p>
				<p class="mt-1 text-[16px] leading-[1.7] text-text-tertiary">{answer}</p>
			</div>
		{/if}

		<div class="mt-8">
			{@render children()}
		</div>

		{#if ctaHeadline}
			<div class="mt-12 rounded-2xl border border-border bg-surface p-8">
				<h2 class="text-xl font-semibold tracking-[-0.02em] text-heading">{ctaHeadline}</h2>
				<p class="mt-2 text-[16px] leading-[1.65] text-text-secondary">{ctaParagraph}</p>
				<ButtonGroup class="mt-6 justify-start">
					<Button href="/#contact" label="Book Free Demo" variant="primary" showIcon />
					<Button href="mailto:sarbaniassociates@gmail.com" label="Email Us" variant="secondary" />
				</ButtonGroup>
			</div>
		{/if}

		{#if related.length}
			<nav aria-label="Related reading" class="mt-12 border-t border-border pt-10">
				<p class="text-[13px] font-semibold tracking-[0.08em] text-muted uppercase">
					Related reading
				</p>
				<ul class="mt-4 grid gap-3">
					{#each related as link (link.href)}
						<li>
							<a
								href={link.href}
								class="group block rounded-xl border border-border bg-white p-5 transition-colors hover:border-border-strong"
							>
								<span class="text-[16px] font-semibold text-heading group-hover:text-green-deep"
									>{link.label}</span
								>
								{#if link.note}
									<span class="mt-1 block text-[14px] leading-[1.6] text-text-secondary"
										>{link.note}</span
									>
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		{/if}
	</div>
</article>

<!-- FAQs -->
{#if faqs.length}
	<FaqSection
		heading={faqHeading}
		subheading="Short answers to what estate owners and managers ask most"
		contactHref="/#contact"
		{faqs}
	/>
{/if}

<!-- Bottom CTA -->
<section class="border-t border-border bg-white py-20 text-center">
	<div class="mx-auto max-w-2xl px-6">
		<h2 class="text-3xl font-semibold tracking-[-0.03em] text-heading">{bottomCtaHeadline}</h2>
		<p class="mt-4 text-base leading-[1.65] text-text-secondary">{bottomCtaParagraph}</p>
		<ButtonGroup class="mt-8 justify-center">
			<Button href="/#contact" label="Book Free Demo" variant="primary" showIcon />
			<Button href="mailto:sarbaniassociates@gmail.com" label="Email Us" variant="secondary" />
		</ButtonGroup>
		<p class="mt-6 text-[13px] leading-[1.6] text-muted">
			Built and supported by Sarbani Associates, Bagdogra, Siliguri. Many estates keep software
			details private. We respect confidentiality and share region-level experience.
		</p>
	</div>
</section>
