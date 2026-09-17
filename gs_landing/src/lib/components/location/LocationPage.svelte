<script lang="ts">
	import { onMount } from 'svelte';
	import { initScrollReveal } from '$lib/scroll-reveal';
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { softwareSchema, breadcrumbSchema, faqSchema } from '$lib/seo/schemas';

	// Shared layout components
	import ProductHero from '$lib/components/product/ProductHero.svelte';
	import ProductTrustRow from '$lib/components/product/ProductTrustRow.svelte';
	import ProductProblemStrip from '$lib/components/product/ProductProblemStrip.svelte';
	import ProductRollout from '$lib/components/product/ProductRollout.svelte';
	import FaqSection from '$lib/components/product/FaqSection.svelte';
	import Button from '$lib/components/Button.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup.svelte';
	import Kicker from '$lib/components/Kicker.svelte';
	import Card from '$lib/components/Card.svelte';
	import Section from '$lib/components/Section.svelte';

	interface Problem {
		title: string;
		desc: string;
	}

	interface RolloutStep {
		step: string;
		title: string;
		desc: string;
	}

	interface Faq {
		q: string;
		a: string;
	}

	interface Pillar {
		label: string;
		title: string;
		desc: string;
		href: string;
		linkLabel: string;
	}

	interface BannerLink {
		label: string;
		href: string;
	}

	/**
	 * Config-driven shell for the three location pages (Assam, Darjeeling,
	 * Dooars & Terai). All markup lives here so the pages stay in sync.
	 */
	interface Props {
		seo: {
			title: string;
			description: string;
			canonical: string;
			path: string;
			breadcrumbName: string;
			schemaName: string;
			schemaDescription: string;
		};
		hero: {
			badgeText: string;
			headline: string;
			paragraph: string;
			points: string[];
		};
		problem: {
			headline: string;
			paragraph: string;
			problems: Problem[];
		};
		workflow: {
			title: string;
			intro: string;
			pillars: Pillar[];
			banner: {
				title: string;
				intro: string;
				links: BannerLink[];
				ctaLabel: string;
			};
		};
		rollout: {
			headline: string;
			paragraph: string;
			steps: RolloutStep[];
		};
		faqs: Faq[];
		cta: {
			title: string;
			paragraph: string;
			buttonLabel: string;
		};
	}

	let { seo, hero, problem, workflow, rollout, faqs, cta }: Props = $props();

	const demoHref = '/#contact';

	onMount(() => {
		return initScrollReveal();
	});

	// Turns the banner intro and its links into one sentence with inline
	// links: "intro A, B, and C." for three links, "intro A and B." for two.
	let bannerParts = $derived.by(() => {
		const links = workflow.banner.links;
		const parts: Array<{ text: string; href?: string }> = [{ text: workflow.banner.intro }];
		links.forEach((link, i) => {
			const left = links.length - i;
			if (left > 2) parts.push({ text: ', ' });
			else if (left === 2) parts.push({ text: links.length > 2 ? ', and ' : ' and ' });
			parts.push({ text: link.label, href: link.href });
		});
		parts.push({ text: '.' });
		return parts;
	});
</script>

<SeoHead
	title={seo.title}
	description={seo.description}
	canonical={seo.canonical}
	breadcrumbs={[
		{ name: 'Home', path: '/' },
		{ name: seo.breadcrumbName, path: seo.path }
	]}
	schema={[
		softwareSchema({
			name: seo.schemaName,
			description: seo.schemaDescription,
			os: 'Windows, Android, Web'
		}),
		breadcrumbSchema([
			{ name: 'Home', path: '/' },
			{ name: seo.breadcrumbName, path: seo.path }
		]),
		faqSchema(faqs)
	]}
/>

<!-- Hero Section -->
<ProductHero
	badgeText={hero.badgeText}
	headline={hero.headline}
	paragraph={hero.paragraph}
	{demoHref}
	workflowHref="#workflow"
>
	<div class="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-muted">
		{#each hero.points as point, i (point)}
			<span>{point}</span>
			{#if i < hero.points.length - 1}
				<span>•</span>
			{/if}
		{/each}
	</div>
</ProductHero>

<!-- Problem Strip -->
<ProductProblemStrip
	headline={problem.headline}
	paragraph={problem.paragraph}
	problems={problem.problems}
/>

<!-- Regional Solution Detail Section -->
<Section id="workflow" class="border-b border-border bg-white">
	<div class="mx-auto max-w-3xl text-center">
		<h2
			class="font-display text-[28px] leading-[1.08] font-semibold tracking-[-0.04em] text-heading md:text-[36px]"
		>
			{workflow.title}
		</h2>
		<p class="mt-4 text-base text-text-secondary md:text-lg">
			{workflow.intro}
		</p>
	</div>

	<div class="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
		{#each workflow.pillars as pillar (pillar.label)}
			<Card padding="lg">
				<Kicker>{pillar.label}</Kicker>
				<h3 class="mt-4 text-xl font-semibold text-heading">{pillar.title}</h3>
				<p class="mt-3 text-sm leading-relaxed text-text-secondary">
					{pillar.desc}
				</p>
				<!-- Content-driven internal links; resolve() does not apply to config paths -->
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve --><a
					href={pillar.href}
					class="mt-6 inline-flex text-sm font-medium text-green-deep hover:underline"
				>
					{pillar.linkLabel}
				</a>
			</Card>
		{/each}
	</div>

	<!-- Regional Internal Link Banner -->
	<Card padding="lg" class="mt-16">
		<div class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
			<div>
				<h4 class="text-lg font-semibold text-heading">{workflow.banner.title}</h4>
				<p class="mt-1 text-sm text-text-secondary">
					{#each bannerParts as part, i (i)}
						{#if part.href}
							<!-- eslint-disable-next-line svelte/no-navigation-without-resolve --><a
								href={part.href}
								class="text-green-deep underline">{part.text}</a
							>
						{:else}{part.text}{/if}
					{/each}
				</p>
			</div>
			<Button href={demoHref} label={workflow.banner.ctaLabel} variant="primary" showIcon />
		</div>
	</Card>
</Section>

<!-- Trust Row -->
<ProductTrustRow />

<!-- Rollout Steps -->
<ProductRollout headline={rollout.headline} paragraph={rollout.paragraph} steps={rollout.steps} />

<!-- FAQs -->
<FaqSection {faqs} />

<!-- Bottom CTA -->
<Section class="border-t border-border text-center">
	<div class="mx-auto max-w-2xl">
		<h2
			class="font-display text-[28px] leading-[1.08] font-semibold tracking-[-0.04em] text-heading md:text-[36px]"
		>
			{cta.title}
		</h2>
		<p class="mt-4 text-base text-text-secondary">
			{cta.paragraph}
		</p>
		<ButtonGroup class="mt-8 justify-center">
			<Button href={demoHref} label={cta.buttonLabel} variant="primary" showIcon />
			<Button
				href="mailto:sarbaniassociates@gmail.com"
				label="Email Sarbani Associates"
				variant="secondary"
			/>
		</ButtonGroup>
	</div>
</Section>
