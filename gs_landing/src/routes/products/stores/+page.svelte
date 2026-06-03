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
			title: 'No stock visibility',
			desc: 'You find out fertilizer is out of stock when someone needs it urgently. Reorder happens after the damage is done.'
		},
		{
			title: 'Untracked issues',
			desc: 'Who took what, when, and for which section? Paper registers do not add up. Items vanish without records.'
		},
		{
			title: 'Cost allocation missing',
			desc: 'Store costs sit in one lump. No way to see how much each section or activity actually consumed.'
		}
	];

	const rollout = [
		{ step: '1', title: 'Site Visit', desc: 'Sarbani team visits your garden to understand your workflow.' },
		{ step: '2', title: 'On-site Setup', desc: 'Software installed and configured at the garden.' },
		{ step: '3', title: 'Staff Training', desc: 'Hands-on training for office and field staff.' },
		{ step: '4', title: 'Go-Live Support', desc: 'Support stays on-site until your team is confident.' }
	];

	const buyers = [
		{ role: 'Manager', benefit: 'Know stock levels without calling the store.' },
		{ role: 'Office staff', benefit: 'Post issues and reconcile physical balances in seconds.' },
		{ role: 'Owner', benefit: 'Verify section-wise consumption and stock valuations from the dashboard.' }
	];
</script>

<SeoHead
	title="Tea Garden Store Management Software - Inventory | GardenSuite"
	description="Tea garden store management software for purchase, issue, stock balance, fertilizer, fuel, spare parts, and chemicals."
	canonical="https://gardensuite.in/products/stores"
	schema={[
		softwareSchema({
			name: 'GardenSuite Store Management',
			description: 'Store and inventory management software for tea gardens. Tracks purchase orders, issue to sections, stock levels, and cost allocation.',
			os: 'Windows'
		}),
		breadcrumbSchema([
			{ name: 'Home', path: '/' },
			{ name: 'Products', path: '/#products' },
			{ name: 'Store Management', path: '/products/stores' }
		])
	]}
/>

<div class="flex min-h-screen w-full flex-col overflow-clip bg-white antialiased">
	<main>
		<ProductHero
			badgeText="Store Management"
			headline="Every bag. Every part. Every drop. Tracked."
			paragraph="Track fertilizer, spare parts, fuel, and chemicals from purchase to issue - with a live running balance."
			{demoHref}
		>
			<!-- Hero mockup element inside the slot -->
			<div class="relative mx-auto mt-16 w-full max-w-[960px] rounded-[28px] border border-white/60 bg-[#DDEFE4] p-5 shadow-[0_24px_62px_rgba(15,46,12,0.1)] md:p-8 lg:p-10">
				<div class="absolute inset-0 z-0 bg-gradient-to-b from-[#F8FAF8] to-[#E8F3ED] opacity-90 rounded-[28px]"></div>
				<div class="dot-grid-light absolute inset-0 z-0 opacity-40 rounded-[28px]"></div>
				
				<div class="relative z-10 grid items-center gap-8 md:grid-cols-2">
					<!-- Stock Levels Card -->
					<div class="flex justify-center">
						<div class="flex w-full max-w-[380px] flex-col gap-4 rounded-[24px] border border-white/85 bg-white/95 p-6 shadow-[0_14px_34px_rgba(15,23,42,0.06)] md:p-8">
							<span class="text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
								>Stock Levels</span
							>
							{#each [{ label: 'NPK Fertilizer', value: '2,450 kg', status: 'ok' }, { label: 'Diesel', value: '1,200 L', status: 'ok' }, { label: 'Pruning Shears', value: '18 pcs', status: 'low' }, { label: 'Tea Chests', value: '340 pcs', status: 'ok' }] as row}
								<div class="flex items-center justify-between border-t border-[#F0F0F0] py-2.5">
									<div class="flex items-center gap-2.5">
										<div class="h-2.5 w-2.5 rounded-full {row.status === 'low' ? 'bg-[#D97706]' : 'bg-[#1B5E3B]'}"></div>
										<span class="text-[14px] text-[#71717A]">{row.label}</span>
									</div>
									<span class="text-[14px] font-semibold text-[#3F3F46] tabular-nums">{row.value}</span>
								</div>
							{/each}
							<div class="flex items-center gap-2 rounded-xl border border-[#D97706]/20 bg-[#D97706]/5 px-4 py-2.5">
								<div class="h-2 w-2 rounded-full bg-[#D97706]"></div>
								<span class="text-[13px] font-medium text-[#92400E]">1 item below reorder level</span>
							</div>
						</div>
					</div>
					
					<!-- Recent Issues Card -->
					<div class="flex justify-center">
						<div class="flex w-full max-w-[380px] flex-col gap-4 rounded-[24px] border border-white/85 bg-white/95 p-6 shadow-[0_14px_34px_rgba(15,23,42,0.06)] md:p-8">
							<span class="text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
								>Recent Issues</span
							>
							{#each [{ item: 'NPK Fertilizer', qty: '200 kg', section: 'Section A', date: 'Mar 28' }, { item: 'Diesel', qty: '500 L', section: 'Factory', date: 'Mar 27' }, { item: 'Spray Chemical', qty: '25 L', section: 'Division 3', date: 'Mar 26' }, { item: 'Engine Oil', qty: '10 L', section: 'Workshop', date: 'Mar 25' }] as row}
								<div class="flex items-center justify-between border-t border-[#F0F0F0] py-2.5">
									<div>
										<span class="text-[14px] font-medium text-[#111111]">{row.item}</span>
										<span class="block text-[12px] text-[#71717A]">{row.qty} - {row.section}</span>
									</div>
									<span class="text-[12px] text-[#71717A] tabular-nums">{row.date}</span>
								</div>
							{/each}
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
			headline="Store registers are always out of date."
			paragraph="Paper registers do not record stock balances dynamically, leading to surprise stock-outs, untracked issues, and missing cost allocations."
			{problems}
		/>

		<!-- Story 1: Purchase Orders -->
		<section class="reveal-on-scroll relative w-full bg-[#FAFAF7] border-b border-[#E4E4E7] py-24 md:py-32">
			<div
				class="mx-auto grid max-w-[1344px] items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-12"
			>
				<div>
					<span
						class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
						>Step 1 - Purchase Orders</span
					>
					<h2
						class="text-[32px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[40px]"
						style="text-wrap: balance"
					>
						What comes in gets recorded. Automatically.
					</h2>
					<p class="mt-5 text-[17px] leading-[1.6] text-[#52525B]">
						Create purchase orders, record receipts, and update stock levels in one flow. Every
						incoming item is logged with supplier, quantity, rate, and date.
					</p>
					<ul class="mt-6 flex flex-col gap-3" role="list">
						{#each ['Purchase orders with supplier details', 'Goods receipt updates stock instantly', 'Rate and quantity tracking per item'] as bullet}
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
							>Stock Levels</span
						>
						{#each [{ label: 'NPK Fertilizer', value: '2,450 kg', status: 'ok' }, { label: 'Diesel', value: '1,200 L', status: 'ok' }, { label: 'Pruning Shears', value: '18 pcs', status: 'low' }, { label: 'Tea Chests', value: '340 pcs', status: 'ok' }] as row}
							<div class="flex items-center justify-between border-t border-[#F0F0F0] py-2.5">
								<div class="flex items-center gap-2.5">
									<div
										class="h-2.5 w-2.5 rounded-full {row.status === 'low'
											? 'bg-[#D97706]'
											: 'bg-[#1B5E3B]'}"
									></div>
									<span class="text-[14px] text-[#71717A]">{row.label}</span>
								</div>
								<span class="text-[14px] font-semibold text-[#3F3F46] tabular-nums"
									>{row.value}</span
								>
							</div>
						{/each}
						<div
							class="flex items-center gap-2 rounded-xl border border-[#D97706]/20 bg-[#D97706]/5 px-4 py-2.5"
						>
							<div class="h-2 w-2 rounded-full bg-[#D97706]"></div>
							<span class="text-[13px] font-medium text-[#92400E]">1 item below reorder level</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Story 2: Issue & Allocation -->
		<section class="reveal-on-scroll relative w-full bg-white border-b border-[#E4E4E7] py-24 md:py-32">
			<div
				class="mx-auto grid max-w-[1344px] items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-12"
			>
				<div class="relative flex justify-center md:order-2">
					<div
						class="flex w-full max-w-[400px] flex-col gap-4 rounded-[24px] border border-[#E4E4E7] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
					>
						<span class="text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
							>Recent Issues</span
						>
						{#each [{ item: 'NPK Fertilizer', qty: '200 kg', section: 'Section A', date: 'Mar 28' }, { item: 'Diesel', qty: '500 L', section: 'Factory', date: 'Mar 27' }, { item: 'Spray Chemical', qty: '25 L', section: 'Division 3', date: 'Mar 26' }, { item: 'Engine Oil', qty: '10 L', section: 'Workshop', date: 'Mar 25' }] as row}
							<div class="flex items-center justify-between border-t border-[#F0F0F0] py-2.5">
								<div>
									<span class="text-[14px] font-medium text-[#111111]">{row.item}</span>
									<span class="block text-[12px] text-[#71717A]">{row.qty} - {row.section}</span>
								</div>
								<span class="text-[12px] text-[#71717A] tabular-nums">{row.date}</span>
							</div>
						{/each}
					</div>
				</div>

				<div class="md:order-1">
					<span
						class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
						>Step 2 - Issue & Allocate</span
					>
					<h2
						class="text-[32px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[40px]"
						style="text-wrap: balance"
					>
						Who took what. For which section. Clear.
					</h2>
					<p class="mt-5 text-[17px] leading-[1.6] text-[#52525B]">
						Issue items to specific sections with full tracking. Every issue reduces stock, records
						the recipient, and links to the activity cost. Nothing goes unaccounted.
					</p>
					<ul class="mt-6 flex flex-col gap-3" role="list">
						{#each ['Issue items to sections with full audit trail', 'Running balance updates after every transaction', 'Cost allocation to field and factory activities'] as bullet}
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
							>Real-time</span
						>
						<span class="text-[13px] font-semibold tracking-[0.04em] text-[#71717A] uppercase"
							>Stock Levels</span
						>
					</div>
					<div class="hidden h-8 w-px bg-[#E4E4E7] md:block"></div>
					<div class="flex flex-col items-center gap-1">
						<span class="text-[32px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[36px]"
							>Section-wise</span
						>
						<span class="text-[13px] font-semibold tracking-[0.04em] text-[#71717A] uppercase"
							>Cost Allocation</span
						>
					</div>
					<div class="hidden h-8 w-px bg-[#E4E4E7] md:block"></div>
					<div class="flex flex-col items-center gap-1">
						<span class="text-[32px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[36px]"
							>Auto</span
						>
						<span class="text-[13px] font-semibold tracking-[0.04em] text-[#71717A] uppercase"
							>Reorder Alerts</span
						>
					</div>
				</div>
				<div class="flex flex-col items-center gap-1 md:items-end">
					<span class="text-[14px] font-semibold text-[#3F3F46]"
						>Fertilizer, fuel, parts, chemicals</span
					>
					<span class="text-[13px] text-[#71717A]">Everything in one place</span>
				</div>
			</div>
		</section>

		<ProductRollout
			tagText="How rollout works"
			headline="From first call to running live."
			paragraph="Store modules are pre-populated with default tea garden category profiles. Sarbani Associates helps input opening balances and reorder levels."
			steps={rollout}
		/>

		<ProductCta
			headline="Never lose track of a single item."
			paragraph="See how GardenSuite tracks every item from purchase to issue at your estate store. Demo, on-site setup, and training are free."
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
