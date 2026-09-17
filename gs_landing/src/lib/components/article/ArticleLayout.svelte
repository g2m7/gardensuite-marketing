<script lang="ts">
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { articleSchema, breadcrumbSchema, faqSchema } from '$lib/seo/schemas';
	import Breadcrumbs from '$lib/components/product/Breadcrumbs.svelte';
	import FaqSection from '$lib/components/product/FaqSection.svelte';
	import Button from '$lib/components/Button.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup.svelte';
	import { onMount, type Snippet } from 'svelte';

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

	let headings = $state<Array<{ id: string; text: string }>>([]);
	let articleElement = $state<HTMLElement | null>(null);

	onMount(() => {
		if (!articleElement) return;
		const foundHeadings = articleElement.querySelectorAll<HTMLHeadingElement>('.guide-h2, h2');
		const list: Array<{ id: string; text: string }> = [];
		foundHeadings.forEach((h2, idx) => {
			if (!h2.id) {
				const slug = h2.innerText
					.toLowerCase()
					.replace(/^[0-9]+[\.\s]*/, '')
					.trim()
					.replace(/[^\w\s-]/g, '')
					.replace(/\s+/g, '-');
				h2.id = slug || `section-${idx + 1}`;
			}
			h2.classList.add('scroll-mt-28');
			list.push({ id: h2.id, text: h2.innerText });
		});
		headings = list;
	});
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

<!-- Article header (full site container width 1344px) -->
<header class="border-b border-border bg-white pt-28 pb-16 md:pt-36 md:pb-20">
	<div class="mx-auto max-w-[1344px] px-6 md:px-12">
		<Breadcrumbs items={breadcrumbs} />

		<div class="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
			<div class="max-w-[660px]">
				<span class="mb-5 inline-block text-[13px] font-semibold tracking-[0.08em] text-green-deep uppercase">
					{kicker}
				</span>
				<h1
					class="font-display text-[2.5rem] leading-[1.0] font-medium tracking-[-0.05em] text-heading sm:text-[3.25rem] md:text-[3.75rem] lg:text-[4.25rem]"
					style="text-wrap: balance"
				>
					{headline}
				</h1>
				<p class="mt-6 text-[18px] leading-[1.55] font-normal tracking-[-0.01em] text-text-secondary sm:text-[20px]">
					{lede}
				</p>
				<div class="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] text-muted">
					<span>By {author}</span>
					<span aria-hidden="true">·</span>
					<span>Updated {updatedLabel}</span>
					<span class="hidden sm:inline" aria-hidden="true">·</span>
					<span class="inline-block">{readTime} min read</span>
				</div>
			</div>

			{#if answer}
				<aside
					aria-label="Quick answer"
					class="rounded-md border border-border bg-surface p-6 shadow-card md:p-7"
				>
					<div class="flex items-center gap-2">
						<span class="inline-block h-2 w-2 rounded-full bg-green-deep" aria-hidden="true"></span>
						<p class="text-[13px] font-semibold tracking-[0.08em] text-green-deep uppercase">
							Quick answer
						</p>
					</div>
					<p class="mt-3 text-[15px] leading-[1.6] text-text-secondary md:text-[16px]">{answer}</p>
					<div
						class="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs text-muted"
					>
						<span>Estate operations summary</span>
						<a
							href="/#contact"
							class="rounded-sm font-semibold text-green-deep hover:underline focus-visible:ring-1 focus-visible:ring-green-deep focus-visible:outline-none"
							>Book Free Demo →</a
						>
					</div>
				</aside>
			{:else if media}
				<div>
					{@render media()}
				</div>
			{/if}
		</div>
	</div>
</header>

<!-- Article body & Sidebar (full site container width 1344px) -->
<div class="border-b border-border bg-white py-16 md:py-24">
	<div class="mx-auto max-w-[1344px] px-6 md:px-12">
		<div class="grid items-start gap-12 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_380px] lg:gap-16">
			<!-- Main reading column -->
			<main class="min-w-0 max-w-[800px]">
				{#if media && answer}
					<div class="mb-12">
						{@render media()}
					</div>
				{/if}

				<article bind:this={articleElement}>
					{@render children()}
				</article>

				{#if ctaHeadline}
					<aside
						aria-label="Schedule a demonstration"
						class="mt-14 rounded-md border border-border bg-surface p-6 shadow-card md:p-8"
					>
						<p class="font-display text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-heading">
							{ctaHeadline}
						</p>
						<p class="mt-2 text-[16px] leading-[1.6] text-text-secondary">{ctaParagraph}</p>
						<ButtonGroup class="mt-6 justify-start">
							<Button href="/#contact" label="Book Free Demo" variant="primary" showIcon />
							<Button
								href="mailto:sarbaniassociates@gmail.com"
								label="Email Us"
								variant="secondary"
							/>
						</ButtonGroup>
					</aside>
				{/if}
			</main>

			<!-- Sticky Sidebar Rail -->
			<aside class="hidden lg:block">
				<div class="sticky top-28 space-y-6">
					{#if headings.length > 0}
						<!-- Table of Contents -->
						<nav
							aria-label="Table of contents"
							class="rounded-md border border-border bg-surface p-6 shadow-card"
						>
							<p class="text-[13px] font-semibold tracking-[0.08em] text-muted uppercase">
								In this guide
							</p>
							<ul class="mt-4 space-y-2.5 text-[14px]">
								{#each headings as item}
									<li>
										<a
											href="#{item.id}"
											class="line-clamp-1 block text-[14px] leading-[1.6] text-text-secondary transition-colors hover:text-green-deep focus-visible:ring-1 focus-visible:ring-green-deep focus-visible:outline-none"
										>
											{item.text}
										</a>
									</li>
								{/each}
							</ul>
						</nav>
					{/if}

					<!-- On-site Demo CTA Card -->
					<div class="rounded-md border border-border bg-white p-6 shadow-card">
						<div class="flex items-center gap-2">
							<span class="inline-block h-2 w-2 rounded-full bg-green-deep" aria-hidden="true"></span>
							<p class="text-[13px] font-semibold tracking-[0.08em] text-green-deep uppercase">
								Free On-Site Demo
							</p>
						</div>
						<p class="mt-2.5 font-display text-[17px] font-semibold tracking-[-0.01em] text-heading">
							Test this in your garden
						</p>
						<p class="mt-2 text-[14px] leading-[1.6] text-text-secondary">
							Sarbani Associates configures field tablets with your sections and work codes, then trains your supervisors on site.
						</p>
						<div class="mt-5 space-y-2.5">
							<Button href="/#contact" label="Book Free Demo" variant="primary" showIcon class="w-full justify-center" />
							<Button href="mailto:sarbaniassociates@gmail.com" label="Email Us" variant="secondary" class="w-full justify-center" />
						</div>
						<p class="mt-4 text-center text-[11px] font-semibold tracking-[0.04em] text-muted uppercase">
							Bagdogra, Siliguri · 20+ Tea Estates
						</p>
					</div>

					<!-- Related reading in sidebar -->
					{#if related.length}
						<div class="rounded-md border border-border bg-surface p-6 shadow-card">
							<p class="text-[13px] font-semibold tracking-[0.08em] text-muted uppercase">
								Related guides
							</p>
							<ul class="mt-3 divide-y divide-border">
								{#each related as link (link.href)}
									<li class="py-3 first:pt-1 last:pb-0">
										<a
											href={link.href}
											class="group block rounded-sm transition-colors focus-visible:ring-1 focus-visible:ring-green-deep focus-visible:outline-none"
										>
											<p class="text-[15px] font-semibold tracking-[-0.01em] text-heading group-hover:text-green-deep">
												{link.label}
											</p>
											{#if link.note}
												<p class="mt-1 text-[13px] leading-[1.6] text-text-secondary line-clamp-2">
													{link.note}
												</p>
											{/if}
										</a>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
				</div>
			</aside>
		</div>

		<!-- Mobile Related Reading (shown on screens < lg where sidebar is hidden) -->
		{#if related.length}
			<nav aria-label="Related reading" class="mt-12 border-t border-border pt-10 lg:hidden">
				<p class="text-[13px] font-semibold tracking-[0.08em] text-muted uppercase">
					Related reading
				</p>
				<ul class="mt-4 grid gap-3">
					{#each related as link (link.href)}
						<li>
							<a
								href={link.href}
								class="group block rounded-md border border-border bg-white p-5 shadow-card transition-colors hover:border-border-strong focus-visible:ring-2 focus-visible:ring-green-deep focus-visible:outline-none"
							>
								<span class="text-[15px] font-semibold tracking-[-0.01em] text-heading group-hover:text-green-deep"
									>{link.label}</span
								>
								{#if link.note}
									<span class="mt-1 block text-[13px] leading-[1.6] text-text-secondary"
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
</div>

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
		<h2 class="font-display text-3xl font-semibold leading-[1.1] tracking-[-0.04em] text-heading sm:text-4xl">{bottomCtaHeadline}</h2>
		<p class="mt-4 text-[16px] leading-[1.6] text-text-secondary">{bottomCtaParagraph}</p>
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
