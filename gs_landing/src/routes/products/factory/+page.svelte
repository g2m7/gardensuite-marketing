<script lang="ts">
	import { onMount } from 'svelte';
	import { initScrollReveal } from '$lib/scroll-reveal';
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { softwareSchema, breadcrumbSchema } from '$lib/seo/schemas';

	// Shared layout components
	import ProductHero from '$lib/components/product/ProductHero.svelte';
	import ProductTrustRow from '$lib/components/product/ProductTrustRow.svelte';
	import ProductProblemStrip from '$lib/components/product/ProductProblemStrip.svelte';
	import ProductRollout from '$lib/components/product/ProductRollout.svelte';
	import ProductCta from '$lib/components/product/ProductCta.svelte';

	onMount(() => {
		return initScrollReveal();
	});

	const demoHref = '/#contact';

	const problems = [
		{
			title: 'No per-kg cost tracking',
			desc: 'Green leaf arrives, gets processed, and gets shipped - but nobody knows the actual cost per kg of made tea until month-end reconciliation.'
		},
		{
			title: 'Disjointed production logs',
			desc: 'Withering, rolling, fermentation, drying - each step logged in separate registers. No single view of the full manufacturing chain.'
		},
		{
			title: 'Power and fuel untracked',
			desc: 'Electricity, coal, and firewood costs are lumped together. No way to see which batch or which day consumed what.'
		}
	];

	const rollout = [
		{ step: '1', title: 'Site Visit', desc: 'Sarbani team visits your garden to understand your workflow.' },
		{ step: '2', title: 'On-site Setup', desc: 'Software installed and configured at the garden.' },
		{ step: '3', title: 'Staff Training', desc: 'Hands-on training for office and field staff.' },
		{ step: '4', title: 'Go-Live Support', desc: 'Support stays on-site until your team is confident.' }
	];

	const buyers = [
		{ role: 'Owner', benefit: 'See per-kg cost without asking anyone.' },
		{ role: 'Manager', benefit: 'Track green leaf intake, daily yield, and sorting grades.' },
		{ role: 'Factory staff', benefit: 'Record batches and manufacturing steps directly.' }
	];
</script>

<SeoHead
	title="Tea Factory Production Software - Cost Per Kg | GardenSuite"
	description="Tea factory production software for green leaf intake, made tea, batch tracking, grade-wise output, and manufacturing cost per kg."
	canonical="https://gardensuite.in/products/factory"
	schema={[
		softwareSchema({
			name: 'GardenSuite Factory Production',
			description: 'Factory production management software for tea gardens. Tracks green leaf intake, manufacturing steps, cost per kg, grade-wise output, and dispatch.',
			os: 'Windows'
		}),
		breadcrumbSchema([
			{ name: 'Home', path: '/' },
			{ name: 'Products', path: '/#products' },
			{ name: 'Factory Production', path: '/products/factory' }
		])
	]}
/>

<div class="flex min-h-screen w-full flex-col overflow-clip bg-white antialiased">
	<main>
		<ProductHero
			badgeText="Factory Production"
			headline="Know exactly what every kg of tea costs to make."
			paragraph="Track green leaf inflow, each manufacturing step, power use, and dispatch. Get clear factory production and cost data without manual registers."
			{demoHref}
		>
			<!-- Hero mockup element inside the slot -->
			<div class="relative mx-auto mt-16 w-full max-w-[960px] rounded-[28px] border border-white/60 bg-[#DDEFE4] p-5 shadow-[0_24px_62px_rgba(15,46,12,0.1)] md:p-8 lg:p-10">
				<div class="absolute inset-0 z-0 bg-gradient-to-b from-[#F8FAF8] to-[#E8F3ED] opacity-90 rounded-[28px]"></div>
				<div class="dot-grid-light absolute inset-0 z-0 opacity-40 rounded-[28px]"></div>
				
				<div class="relative z-10 grid items-center gap-8 md:grid-cols-2">
					<!-- Intake table mockup -->
					<div class="flex justify-center">
						<div class="flex w-full max-w-[380px] flex-col gap-4 rounded-[24px] border border-white/85 bg-white/95 p-6 shadow-[0_14px_34px_rgba(15,23,42,0.06)] md:p-8">
							<span class="text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
								>Today's Leaf Intake</span
							>
							{#each [{ label: 'Section A', value: '2,450 kg' }, { label: 'Section B', value: '1,890 kg' }, { label: 'Section C', value: '3,120 kg' }, { label: 'Division 7', value: '1,680 kg' }] as row}
								<div class="flex items-center justify-between border-t border-[#F0F0F0] py-2.5">
									<span class="text-[14px] text-[#71717A]">{row.label}</span>
									<span class="text-[14px] font-semibold text-[#3F3F46] tabular-nums"
										>{row.value}</span
									>
								</div>
							{/each}
							<div class="flex items-center justify-between border-t-2 border-[#E4E4E7] pt-3">
								<span class="text-[15px] font-semibold text-[#111111]">Total green leaf</span>
								<span class="text-[18px] font-bold text-[#1B5E3B] tabular-nums">9,140 kg</span>
							</div>
						</div>
					</div>
					
					<!-- Cost summary mockup -->
					<div class="flex justify-center">
						<div class="flex w-full max-w-[380px] flex-col gap-4 rounded-[24px] border border-white/85 bg-white/95 p-6 shadow-[0_14px_34px_rgba(15,23,42,0.06)] md:p-8">
							<span class="text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
								>Cost Per Kg - March</span
							>
							{#each [{ label: 'Green leaf cost', value: '₹32.50' }, { label: 'Manufacturing', value: '₹12.80' }, { label: 'Power & fuel', value: '₹5.40' }, { label: 'Labour', value: '₹8.20' }, { label: 'Packing & transport', value: '₹3.10' }] as row}
								<div class="flex items-center justify-between border-t border-[#F0F0F0] py-2.5">
									<span class="text-[14px] text-[#71717A]">{row.label}</span>
									<span class="text-[14px] font-semibold text-[#3F3F46] tabular-nums"
										>{row.value}</span
									>
								</div>
							{/each}
							<div class="flex items-center justify-between border-t-2 border-[#E4E4E7] pt-3">
								<span class="text-[15px] font-semibold text-[#111111]">Total cost/kg</span>
								<span class="text-[18px] font-bold text-[#1B5E3B] tabular-nums">₹62.00</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ProductHero>

		<ProductTrustRow 
			stats={[
				{ value: '20+', label: 'Tea Estates' },
				{ value: '7', label: 'Regions' },
				{ value: 'Since 2000', label: 'In Tea Gardens' }
			]}
			showOfflineBadge={true}
		/>

		<ProductProblemStrip
			tagText="The old way"
			headline="Factory production costs stay hidden in registers."
			paragraph="Green leaf arrives, manufacturing begins, and tea is shipped—but without integrated tracking, the actual cost per kg is calculated weeks after closing."
			{problems}
		/>

		<!-- Story 1: Leaf Intake -->
		<section class="reveal-on-scroll relative w-full bg-[#FAFAF7] border-b border-[#E4E4E7] py-24 md:py-32">
			<div
				class="mx-auto grid max-w-[1344px] items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-12"
			>
				<div>
					<span
						class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
						>Step 1 - Leaf Intake</span
					>
					<h2
						class="text-[32px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[40px]"
						style="text-wrap: balance"
					>
						Every kg of green leaf accounted for.
					</h2>
					<p class="mt-5 text-[17px] leading-[1.6] text-[#52525B]">
						Weights from the smart scales flow directly into factory records. You know exactly how
						much green leaf arrived, from which section, and when. No manual entry.
					</p>
					<ul class="mt-6 flex flex-col gap-3" role="list">
						{#each ['Smart scale data syncs to factory automatically', 'Section-wise leaf intake tracked in real time', 'No manual weight logs or missing entries'] as bullet}
							<li class="flex items-center gap-2.5">
								<div
									class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1B5E3B]/10 text-[#1B5E3B]"
								>
									<svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
										><path
											d="M2 5l2 2 4-4"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/></svg
									>
								</div>
								<span class="text-[14px] font-medium text-[#3F3F46]">{bullet}</span>
							</li>
						{/each}
					</ul>
				</div>

				<div class="relative flex justify-center">
					<div
						class="flex w-full max-w-[400px] flex-col gap-4 rounded-[24px] border border-[#E4E4E7] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
					>
						<span class="text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
							>Today's Leaf Intake</span
						>
						{#each [{ label: 'Section A', value: '2,450 kg' }, { label: 'Section B', value: '1,890 kg' }, { label: 'Section C', value: '3,120 kg' }, { label: 'Division 7', value: '1,680 kg' }] as row}
							<div class="flex items-center justify-between border-t border-[#F0F0F0] py-2.5">
								<span class="text-[14px] text-[#71717A]">{row.label}</span>
								<span class="text-[14px] font-semibold text-[#3F3F46] tabular-nums"
									>{row.value}</span
								>
							</div>
						{/each}
						<div class="flex items-center justify-between border-t-2 border-[#E4E4E7] pt-3">
							<span class="text-[15px] font-semibold text-[#111111]">Total green leaf</span>
							<span class="text-[18px] font-bold text-[#1B5E3B] tabular-nums">9,140 kg</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Story 2: Manufacturing Process -->
		<section class="reveal-on-scroll relative w-full bg-white border-b border-[#E4E4E7] py-24 md:py-32">
			<div class="mx-auto max-w-[1344px] px-6 md:px-12">
				<div class="mb-14 text-center">
					<span
						class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
						>Step 2 - Manufacturing</span
					>
					<h2
						class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px]"
						style="text-wrap: balance"
					>
						Every step. Every batch. Tracked.
					</h2>
					<p class="mx-auto mt-5 max-w-[560px] text-[17px] leading-[1.6] text-[#52525B]">
						From withering trough to dispatch bay, each manufacturing step is recorded with batch
						numbers, quantities, and timestamps.
					</p>
				</div>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
					{#each [{ title: 'Withering & Rolling', desc: 'Track withering duration, rolling batches, and leaf condition. Know what went in and what came out.', icon: 'wither' }, { title: 'Fermentation & Drying', desc: 'Monitor fermentation time and drying temperature. Record made tea output per batch for yield tracking.', icon: 'ferment' }, { title: 'Sorting & Grading', desc: 'Track grades produced - BP, BOP, OF, PD, Dust. Know your grade-wise yield for every batch processed.', icon: 'sort' }] as item}
						<div
							class="rounded-[24px] border border-white/70 bg-white p-6 shadow-[0_12px_36px_rgba(0,0,0,0.04)] hover:shadow-card-hover hover:border-[#E4E4E7] transition-all duration-300 md:p-8"
						>
							<div
								class="mb-5 flex h-12 w-12 items-center justify-center rounded-[18px] bg-[#1B5E3B]/10 text-[#1B5E3B]"
							>
								{#if item.icon === 'wither'}
									<svg
										width="22"
										height="22"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="1.5"
										aria-hidden="true"
										><path
											d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
										/></svg
									>
								{:else if item.icon === 'ferment'}
									<svg
										width="22"
										height="22"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="1.5"
										aria-hidden="true"
										><path d="M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20z" /><path
											d="M12 6v6l4 2"
										/></svg
									>
								{:else}
									<svg
										width="22"
										height="22"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="1.5"
										aria-hidden="true"
										><path d="M3 6h18M3 12h18M3 18h18" /><path d="M9 6v12M15 6v12" /></svg
									>
								{/if}
							</div>
							<h3 class="text-[17px] font-semibold tracking-[-0.01em] text-[#111111]">
								{item.title}
							</h3>
							<p class="mt-2 text-[14px] leading-[1.65] text-[#52525B]">{item.desc}</p>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- Story 3: Cost & Dispatch -->
		<section class="reveal-on-scroll relative w-full bg-[#FAFAF7] border-b border-[#E4E4E7] py-24 md:py-32">
			<div
				class="mx-auto grid max-w-[1344px] items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-12"
			>
				<div class="relative flex justify-center md:order-2">
					<div
						class="flex w-full max-w-[400px] flex-col gap-4 rounded-[24px] border border-[#E4E4E7] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
					>
						<span class="text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
							>Cost Per Kg - March</span
						>
						{#each [{ label: 'Green leaf cost', value: '₹32.50' }, { label: 'Manufacturing', value: '₹12.80' }, { label: 'Power & fuel', value: '₹5.40' }, { label: 'Labour', value: '₹8.20' }, { label: 'Packing & transport', value: '₹3.10' }] as row}
							<div class="flex items-center justify-between border-t border-[#F0F0F0] py-2.5">
								<span class="text-[14px] text-[#71717A]">{row.label}</span>
								<span class="text-[14px] font-semibold text-[#3F3F46] tabular-nums"
									>{row.value}</span
								>
							</div>
						{/each}
						<div class="flex items-center justify-between border-t-2 border-[#E4E4E7] pt-3">
							<span class="text-[15px] font-semibold text-[#111111]">Total cost/kg</span>
							<span class="text-[18px] font-bold text-[#1B5E3B] tabular-nums">₹62.00</span>
						</div>
					</div>
				</div>

				<div class="md:order-1">
					<span
						class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
						>Step 3 - Cost & Dispatch</span
					>
					<h2
						class="text-[32px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[40px]"
						style="text-wrap: balance"
					>
						Factory cost per kg. At a glance.
					</h2>
					<p class="mt-5 text-[17px] leading-[1.6] text-[#52525B]">
						Know your manufacturing cost per kg broken down by leaf, labour, power, and packing.
						Track dispatch quantities and buyer-wise invoices. All from one place.
					</p>
					<ul class="mt-6 flex flex-col gap-3" role="list">
						{#each ['Real-time cost per kg breakdown', 'Power, fuel, and labour cost tracking', 'Dispatch records with buyer-wise invoicing'] as bullet}
							<li class="flex items-center gap-2.5">
								<div
									class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1B5E3B]/10 text-[#1B5E3B]"
								>
									<svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
										><path
											d="M2 5l2 2 4-4"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/></svg
									>
								</div>
								<span class="text-[14px] font-medium text-[#3F3F46]">{bullet}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</section>

		<!-- Key Metrics Row -->
		<section class="reveal-on-scroll relative w-full border-b border-[#E4E4E7] bg-white py-16">
			<div
				class="mx-auto flex max-w-[1344px] flex-col items-center gap-8 px-6 md:flex-row md:justify-between md:gap-12 md:px-12"
			>
				<div class="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-14">
					<div class="flex flex-col items-center gap-1">
						<span class="text-[32px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[36px]"
							>6</span
						>
						<span class="text-[13px] font-semibold tracking-[0.04em] text-[#71717A] uppercase"
							>Process Steps</span
						>
					</div>
					<div class="hidden h-8 w-px bg-[#E4E4E7] md:block"></div>
					<div class="flex flex-col items-center gap-1">
						<span class="text-[32px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[36px]"
							>Per Kg</span
						>
						<span class="text-[13px] font-semibold tracking-[0.04em] text-[#71717A] uppercase"
							>Cost Tracking</span
						>
					</div>
					<div class="hidden h-8 w-px bg-[#E4E4E7] md:block"></div>
					<div class="flex flex-col items-center gap-1">
						<span class="text-[32px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[36px]"
							>Batch</span
						>
						<span class="text-[13px] font-semibold tracking-[0.04em] text-[#71717A] uppercase"
							>Tracking</span
						>
					</div>
				</div>
				<div class="flex flex-col items-center gap-1 md:items-end">
					<span class="text-[14px] font-semibold text-[#3F3F46]"
						>From green leaf to invoiced tea</span
					>
					<span class="text-[13px] text-[#71717A]">Automatic office sync</span>
				</div>
			</div>
		</section>

		<ProductRollout
			tagText="How rollout works"
			headline="From first call to running live."
			paragraph="GardenSuite factory setup is structured directly on site. Sarbani Associates visits, configures parameters, and trains your team."
			steps={rollout}
		/>

		<ProductCta
			headline="Know your factory numbers."
			paragraph="See how GardenSuite tracks your production from green leaf to dispatch. Demo, on-site setup, and training are free."
			{demoHref}
			{buyers}
		/>
	</main>
</div>

<style>
	:global(.reveal-on-scroll) {
		opacity: 0;
		transform: translateY(24px);
		transition:
			opacity 0.7s ease-out,
			transform 0.7s ease-out;
	}
	:global(.reveal-on-scroll.is-visible) {
		opacity: 1;
		transform: translateY(0);
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.reveal-on-scroll) {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
</style>
