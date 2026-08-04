<script lang="ts">
	import { onMount } from 'svelte';
	import { trackEvent } from '$lib/analytics';
	import { initScrollReveal } from '$lib/scroll-reveal';
	import Button from '$lib/components/Button.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup.svelte';
	import Breadcrumbs from '$lib/components/product/Breadcrumbs.svelte';
	import FaqSection from '$lib/components/product/FaqSection.svelte';
	import ProductCta from '$lib/components/product/ProductCta.svelte';
	import ProductRollout from '$lib/components/product/ProductRollout.svelte';
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { breadcrumbSchema, faqSchema, softwareSchema } from '$lib/seo/schemas';
	import PhoneScreenshot from './PhoneScreenshot.svelte';
	import type { AttendanceDetailConfig } from './attendance-detail-content';

	let { config }: { config: AttendanceDetailConfig } = $props();

	onMount(() => initScrollReveal());

	const emailHref = 'mailto:sarbaniassociates@gmail.com?subject=GardenSuite%20Attendance%20Demo';

	const rollout = [
		{
			step: '01',
			title: 'Process check',
			desc: 'Confirm the garden, worker, section and office workflow.'
		},
		{
			step: '02',
			title: 'Device and data setup',
			desc: 'Prepare phones, users, workers, work codes and field rules.'
		},
		{
			step: '03',
			title: 'Training and live support',
			desc: 'Train field and office staff, then support regular work.'
		}
	];

	const attendancePages = [
		{
			slug: 'attendance-hub',
			name: 'Attendance and smart weighing overview',
			href: '/products/attendance'
		},
		{
			slug: 'face-attendance',
			name: 'Face attendance for tea gardens',
			href: '/products/attendance/face-attendance'
		},
		{
			slug: 'smart-weighing',
			name: 'Smart weighing for tea gardens',
			href: '/products/attendance/smart-weighing'
		},
		{
			slug: 'offline-sync',
			name: 'Offline attendance and office sync',
			href: '/products/attendance/offline-sync'
		}
	];

	function trackCta(placement: 'hero' | 'rollout' | 'final', action: 'book_demo' | 'email') {
		trackEvent('attendance_detail_cta_click', {
			page: config.slug,
			placement,
			action
		});
	}

	function trackFaq(index: number) {
		trackEvent('attendance_detail_faq_open', { page: config.slug, question_index: index + 1 });
	}

	function trackRelated(destination: string) {
		trackEvent('attendance_detail_related_click', { page: config.slug, destination });
	}
</script>

<SeoHead
	title={config.title}
	description={config.description}
	canonical={config.canonical}
	ogImage="https://gardensuite.in/og/attendance-media-placeholder.webp"
	schema={[
		softwareSchema({
			name: `GardenSuite ${config.pageName}`,
			description: config.schemaDescription,
			os: 'Android, Windows, Web',
			featureList: config.featureList
		}),
		breadcrumbSchema([
			{ name: 'Home', path: '/' },
			{ name: 'Products', path: '/#products' },
			{ name: 'Face Attendance & Smart Weighing', path: '/products/attendance' },
			{ name: config.pageName, path: `/products/attendance/${config.slug}` }
		]),
		faqSchema(config.faqs)
	]}
/>

<div class="flex min-h-screen w-full flex-col overflow-clip bg-white antialiased">
	<main>
		<section
			class="border-b border-border bg-white pt-28 pb-16 md:pt-36 md:pb-24"
			aria-labelledby="detail-hero-heading"
		>
			<div class="mx-auto max-w-[1344px] px-6 md:px-12">
				<Breadcrumbs
					items={[
						{ name: 'Home', path: '/' },
						{ name: 'Products', path: '/#products' },
						{ name: 'Attendance & Weighing', path: '/products/attendance' },
						{ name: config.pageName, path: `/products/attendance/${config.slug}` }
					]}
				/>

				<div class="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
					<div class="max-w-[650px]">
						<span
							class="mb-5 inline-block text-[13px] font-semibold tracking-[0.08em] text-green-deep uppercase"
						>
							{config.kicker}
						</span>
						<h1
							id="detail-hero-heading"
							class="text-[2.75rem] leading-[0.98] font-medium tracking-[-0.05em] text-heading sm:text-[3.5rem] md:text-[4rem] lg:text-[4.25rem]"
							style="text-wrap: balance"
						>
							{config.headline}
						</h1>
						<p
							class="mt-7 max-w-[620px] text-[18px] leading-[1.55] text-text-secondary sm:text-[20px]"
						>
							{config.lede}
						</p>
						<div class="mt-8">
							<ButtonGroup>
								<Button
									href="/#contact"
									label="Book Free Demo"
									variant="primary"
									showIcon
									onclick={() => trackCta('hero', 'book_demo')}
								/>
								<Button href="#how-it-works" label="See how it works" variant="secondary" />
							</ButtonGroup>
						</div>
						<p class="mt-5 max-w-[620px] text-[13px] leading-[1.6] text-muted">
							Built, installed and supported by Sarbani Associates, Bagdogra, Siliguri. Serving 20+
							tea estates across 7 tea-growing regions since 2000, with on-site setup and training.
						</p>
					</div>

					<div
						class="relative mx-auto flex h-[470px] w-full max-w-[560px] items-start justify-center overflow-hidden rounded-3xl border border-brand-100 bg-brand-50 pt-10 md:h-[560px] md:pt-12"
					>
						<PhoneScreenshot
							png={config.heroImagePng}
							webp={config.heroImageWebp}
							alt={config.heroImageAlt}
							eager
							class="w-[220px] shadow-[0_28px_72px_rgba(0,0,0,0.2)] md:w-[270px]"
						/>
						<p
							class="absolute right-5 bottom-5 text-[11px] font-semibold tracking-[0.08em] text-green-deep uppercase"
						>
							Actual GS Face screen
						</p>
					</div>
				</div>
			</div>
		</section>

		<section class="reveal-on-scroll border-b border-border bg-white py-16 md:py-24">
			<div
				class="mx-auto grid max-w-[1344px] gap-12 px-6 md:px-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-20"
			>
				<div class="max-w-[560px]">
					<h2
						class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-heading md:text-[44px] lg:text-[52px]"
						style="text-wrap: balance"
					>
						{config.problemHeading}
					</h2>
					<p class="mt-5 text-[16px] leading-[1.65] text-text-secondary md:text-[17px]">
						{config.problemBody}
					</p>
				</div>
				<ol class="border-t border-border">
					{#each config.problemPoints as point, i}
						<li class="grid grid-cols-[42px_1fr] gap-4 border-b border-border py-6">
							<span class="text-[14px] font-semibold text-green-deep">0{i + 1}</span>
							<p class="text-[16px] leading-[1.6] text-text-tertiary">{point}</p>
						</li>
					{/each}
				</ol>
			</div>
		</section>

		<section
			id="how-it-works"
			class="reveal-on-scroll scroll-mt-20 border-b border-border bg-surface py-16 md:py-24"
		>
			<div class="mx-auto max-w-[1344px] px-6 md:px-12">
				<div class="mb-10 max-w-[720px] md:mb-14">
					<h2
						class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-heading md:text-[44px] lg:text-[52px]"
						style="text-wrap: balance"
					>
						{config.workflowHeading}
					</h2>
					<p
						class="mt-5 max-w-[650px] text-[16px] leading-[1.65] text-text-secondary md:text-[17px]"
					>
						{config.workflowBody}
					</p>
				</div>

				<div class="grid border-t border-l border-border-strong sm:grid-cols-2 lg:grid-cols-4">
					{#each config.steps as step}
						<article
							class="min-h-[210px] border-r border-b border-border-strong bg-white p-6 md:min-h-[250px] md:p-7"
						>
							<span class="text-[14px] font-semibold text-green-deep">{step.number}</span>
							<h3 class="mt-10 text-[17px] font-semibold tracking-[-0.01em] text-heading md:mt-14">
								{step.title}
							</h3>
							<p class="mt-3 text-[14px] leading-[1.6] text-text-secondary">{step.description}</p>
						</article>
					{/each}
				</div>
			</div>
		</section>

		<section class="reveal-on-scroll border-b border-border bg-white py-16 md:py-24">
			<div class="mx-auto max-w-[1344px] px-6 md:px-12">
				<div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
					<div class={config.slug === 'offline-sync' ? 'lg:order-2' : ''}>
						{#if config.proofImageType === 'browser'}
							<div
								class="overflow-hidden rounded-2xl border border-border bg-surface p-4 shadow-[0_18px_50px_rgba(0,0,0,0.07)] md:p-6"
							>
								<div
									class="overflow-hidden rounded-xl border border-border bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
								>
									<div
										class="flex h-8 items-center gap-1.5 border-b border-border bg-[#F4F4F5] px-3"
										aria-hidden="true"
									>
										<span class="h-2.5 w-2.5 rounded-full bg-[#FF5F57]"></span>
										<span class="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]"></span>
										<span class="h-2.5 w-2.5 rounded-full bg-[#28C840]"></span>
									</div>
									<picture>
										<source srcset={config.proofImageWebp} type="image/webp" />
										<img
											src={config.proofImagePng}
											alt={config.proofImageAlt}
											width="1400"
											height="757"
											loading="lazy"
											class="h-auto w-full"
										/>
									</picture>
								</div>
							</div>
						{:else}
							<div
								class="relative mx-auto flex h-[430px] w-full max-w-[540px] items-start justify-center overflow-hidden rounded-3xl border border-brand-100 bg-brand-50 pt-9 md:h-[510px] md:pt-11"
							>
								<PhoneScreenshot
									png={config.proofImagePng}
									webp={config.proofImageWebp}
									alt={config.proofImageAlt}
									class="w-[210px] shadow-[0_26px_68px_rgba(0,0,0,0.2)] md:w-[250px]"
								/>
							</div>
						{/if}
					</div>
					<div class="max-w-[600px] {config.slug === 'offline-sync' ? 'lg:order-1' : ''}">
						<span
							class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-green-deep uppercase"
						>
							{config.proofKicker}
						</span>
						<h2
							class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-heading md:text-[44px] lg:text-[52px]"
							style="text-wrap: balance"
						>
							{config.proofHeading}
						</h2>
						<p class="mt-5 text-[16px] leading-[1.65] text-text-secondary md:text-[17px]">
							{config.proofBody}
						</p>
					</div>
				</div>

				<div
					id={config.slug === 'offline-sync' ? 'office-review' : undefined}
					class="mt-14 scroll-mt-20 md:mt-20"
				>
					<h2
						class="max-w-[760px] text-[30px] leading-[1.12] font-semibold tracking-[-0.035em] text-heading md:text-[38px]"
						style="text-wrap: balance"
					>
						{config.capabilitiesHeading}
					</h2>
					<div class="mt-8 grid border-t border-border sm:grid-cols-2">
						{#each config.capabilities as capability}
							<article class="border-b border-border py-5 sm:px-7 sm:first:pl-0 sm:odd:border-r">
								<h3 class="text-[17px] font-semibold tracking-[-0.01em] text-heading">
									{capability.title}
								</h3>
								<p class="mt-2 text-[14px] leading-[1.6] text-text-secondary">
									{capability.description}
								</p>
							</article>
						{/each}
					</div>
				</div>
			</div>
		</section>

		<ProductRollout
			tagText="Supported rollout"
			headline="Sarbani Associates sets it up at your garden."
			paragraph="The system is mapped to your attendance, plucking and office process. Field and office staff receive on-site training and rollout support."
			steps={rollout}
			actionHref={emailHref}
			actionLabel="Email Us"
			onAction={() => trackCta('rollout', 'email')}
		/>

		<FaqSection
			heading="Common questions"
			subheading={`About ${config.pageName.toLowerCase()}.`}
			contactHref="/#contact"
			categoryLabel={config.pageName}
			faqs={config.faqs}
			onOpen={trackFaq}
		/>

		<section class="border-b border-border bg-surface py-10 md:py-14">
			<div class="mx-auto max-w-[1344px] px-6 md:px-12">
				<p class="text-[13px] font-semibold tracking-[0.08em] text-green-deep uppercase">
					Attendance product pages
				</p>
				<nav
					aria-label="Related attendance pages"
					class="mt-4 flex flex-col border-t border-border text-[14px] font-semibold text-heading sm:flex-row sm:flex-wrap sm:gap-x-8"
				>
					{#each attendancePages as page}
						{#if page.slug === config.slug}
							<span class="inline-flex min-h-11 items-center text-muted" aria-current="page">
								{page.name}
							</span>
						{:else}
							<a
								href={page.href}
								class="inline-flex min-h-11 items-center underline-offset-4 hover:text-green-deep hover:underline"
								onclick={() => trackRelated(page.slug)}>{page.name}</a
							>
						{/if}
					{/each}
				</nav>
			</div>
		</section>

		<ProductCta
			tagText="See the working flow"
			headline={config.ctaHeading}
			paragraph={config.ctaBody}
			demoHref="/#contact"
			secondaryHref={emailHref}
			supportNote="Many estates keep software details private. We respect confidentiality and share region-level experience."
			expectationLine="Reply within 1 working day. Demo scheduling comes from the Sarbani team."
			buyers={[]}
			onPrimaryClick={() => trackCta('final', 'book_demo')}
			onSecondaryClick={() => trackCta('final', 'email')}
		/>
	</main>
</div>

<style>
	:global(.reveal-on-scroll.reveal-ready) {
		opacity: 0;
		transform: translateY(24px);
		transition:
			opacity 0.7s ease-out,
			transform 0.7s ease-out;
	}

	:global(.reveal-on-scroll.reveal-ready.is-visible) {
		opacity: 1;
		transform: translateY(0);
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.reveal-on-scroll.reveal-ready) {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
</style>
