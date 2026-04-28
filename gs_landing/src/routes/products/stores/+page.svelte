<script lang="ts">
	import { onMount } from 'svelte';
	import { initScrollReveal } from '$lib/scroll-reveal';

	onMount(() => {
		return initScrollReveal();
	});

	const demoHref = 'mailto:contact@gardensuite.in?subject=GardenSuite%20Demo%20Request';
</script>

<svelte:head>
	<title>Store Management - GardenSuite Products</title>
	<meta
		name="description"
		content="GardenSuite Store Management module for inventory tracking, purchase orders, and issue management."
	/>
</svelte:head>

<div class="flex min-h-screen w-full flex-col overflow-clip bg-[#FAFAF7] antialiased">
	<main>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- HERO                                                       -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="relative w-full bg-white pt-28 pb-20 md:pt-36 md:pb-28">
			<div class="mx-auto max-w-[1344px] px-6 md:px-12">
				<div class="mx-auto max-w-[800px] text-center">
					<span class="mb-4 inline-block rounded-full bg-[#1B5E3B] px-3 py-1 text-[11px] font-semibold tracking-[0.04em] text-white uppercase">Store Management</span>
					<h1 class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px] lg:text-[52px]" style="text-wrap: balance">
						Every bag. Every part. Every drop. Tracked.
					</h1>
					<p class="mx-auto mt-6 max-w-[560px] text-[17px] leading-[1.6] text-[#52525B]">
						Fertilizer, spare parts, fuel, chemicals - everything that comes in and goes out of your estate store is tracked with purchase orders, issues, and running balances.
					</p>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- PROBLEM STRIP                                              -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="reveal-on-scroll relative w-full border-b border-[#F0F0F0] bg-white py-20 md:py-28">
			<div class="mx-auto max-w-[1344px] px-6 md:px-12">
				<div class="mb-12 max-w-[520px]">
					<span class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">The old way</span>
					<h2 class="text-[32px] leading-[1.1] font-semibold tracking-[-0.04em] text-[#111111] md:text-[40px]" style="text-wrap: balance">
						Store registers are always out of date.
					</h2>
				</div>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
					{#each [
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
					] as item}
						<div class="rounded-2xl border border-[#E4E4E7] bg-white p-6 transition-all duration-200 hover:border-[#D4D4D8] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] md:p-8">
							<div class="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#DC2626]/8">
								<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
									<path d="M10 4v8M10 15v1" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round" />
								</svg>
							</div>
							<h3 class="mb-2 text-[17px] font-semibold tracking-[-0.01em] text-[#111111]">{item.title}</h3>
							<p class="text-[14px] leading-[1.6] text-[#52525B]">{item.desc}</p>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- STORY 01: Purchase Orders                                   -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="reveal-on-scroll relative w-full bg-[#FAFAF7] py-24 md:py-32">
			<div class="mx-auto grid max-w-[1344px] items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-12">
				<div>
					<span class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">Step 1 - Purchase Orders</span>
					<h2 class="text-[32px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[40px]" style="text-wrap: balance">
						What comes in gets recorded. Automatically.
					</h2>
					<p class="mt-5 text-[17px] leading-[1.6] text-[#52525B]">
						Create purchase orders, record receipts, and update stock levels in one flow. Every incoming item is logged with supplier, quantity, rate, and date.
					</p>
					<ul class="mt-6 flex flex-col gap-3" role="list">
						{#each ['Purchase orders with supplier details', 'Goods receipt updates stock instantly', 'Rate and quantity tracking per item'] as bullet}
							<li class="flex items-center gap-2.5">
								<div class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1B5E3B]/10">
									<svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 5l2 2 4-4" stroke="#1B5E3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
								</div>
								<span class="text-[14px] font-medium text-[#3F3F46]">{bullet}</span>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Visual: Stock card -->
				<div class="relative flex justify-center">
					<div class="flex w-full max-w-[400px] flex-col gap-4 rounded-2xl border border-[#E4E4E7] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
						<span class="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#1B5E3B]">Stock Levels</span>
						{#each [
							{ label: 'NPK Fertilizer', value: '2,450 kg', status: 'ok' },
							{ label: 'Diesel', value: '1,200 L', status: 'ok' },
							{ label: 'Pruning Shears', value: '18 pcs', status: 'low' },
							{ label: 'Tea Chests', value: '340 pcs', status: 'ok' }
						] as row}
							<div class="flex items-center justify-between border-t border-[#F0F0F0] py-2.5">
								<div class="flex items-center gap-2.5">
									<div class="h-2 w-2 rounded-full {row.status === 'low' ? 'bg-[#D97706]' : 'bg-[#1B5E3B]'}"></div>
									<span class="text-[14px] text-[#71717A]">{row.label}</span>
								</div>
								<span class="text-[14px] font-semibold tabular-nums text-[#3F3F46]">{row.value}</span>
							</div>
						{/each}
						<div class="flex items-center gap-2 rounded-xl border border-[#D97706]/20 bg-[#D97706]/5 px-4 py-2.5">
							<div class="h-2 w-2 rounded-full bg-[#D97706]"></div>
							<span class="text-[13px] font-medium text-[#92400E]">1 item below reorder level</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- STORY 02: Issue & Allocation                                -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="reveal-on-scroll relative w-full bg-white py-24 md:py-32">
			<div class="mx-auto grid max-w-[1344px] items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-12">
				<!-- Visual: Issue log -->
				<div class="relative flex justify-center md:order-1">
					<div class="flex w-full max-w-[400px] flex-col gap-4 rounded-2xl border border-[#E4E4E7] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
						<span class="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#1B5E3B]">Recent Issues</span>
						{#each [
							{ item: 'NPK Fertilizer', qty: '200 kg', section: 'Section A', date: 'Mar 28' },
							{ item: 'Diesel', qty: '500 L', section: 'Factory', date: 'Mar 27' },
							{ item: 'Spray Chemical', qty: '25 L', section: 'Division 3', date: 'Mar 26' },
							{ item: 'Engine Oil', qty: '10 L', section: 'Workshop', date: 'Mar 25' }
						] as row}
							<div class="flex items-center justify-between border-t border-[#F0F0F0] py-2.5">
								<div>
									<span class="text-[14px] font-medium text-[#111111]">{row.item}</span>
									<span class="block text-[12px] text-[#71717A]">{row.qty} - {row.section}</span>
								</div>
								<span class="text-[12px] tabular-nums text-[#71717A]">{row.date}</span>
							</div>
						{/each}
					</div>
				</div>

				<div class="md:order-2">
					<span class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">Step 2 - Issue & Allocate</span>
					<h2 class="text-[32px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[40px]" style="text-wrap: balance">
						Who took what. For which section. Clear.
					</h2>
					<p class="mt-5 text-[17px] leading-[1.6] text-[#52525B]">
						Issue items to specific sections with full tracking. Every issue reduces stock, records the recipient, and links to the activity cost. Nothing goes unaccounted.
					</p>
					<ul class="mt-6 flex flex-col gap-3" role="list">
						{#each ['Issue items to sections with full audit trail', 'Running balance updates after every transaction', 'Cost allocation to field and factory activities'] as bullet}
							<li class="flex items-center gap-2.5">
								<div class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1B5E3B]/10">
									<svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 5l2 2 4-4" stroke="#1B5E3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
								</div>
								<span class="text-[14px] font-medium text-[#3F3F46]">{bullet}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- KEY METRICS                                                 -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="reveal-on-scroll relative w-full border-y border-[#F0F0F0] bg-white py-12 md:py-16">
			<div class="mx-auto flex max-w-[1344px] flex-col items-center gap-8 px-6 md:flex-row md:justify-between md:gap-12 md:px-12">
				<div class="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-14">
					<div class="flex flex-col items-center gap-1">
						<span class="text-[32px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[36px]">Real-time</span>
						<span class="text-[13px] font-semibold uppercase tracking-[0.04em] text-[#71717A]">Stock Levels</span>
					</div>
					<div class="hidden h-8 w-px bg-[#E4E4E7] md:block"></div>
					<div class="flex flex-col items-center gap-1">
						<span class="text-[32px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[36px]">Section-wise</span>
						<span class="text-[13px] font-semibold uppercase tracking-[0.04em] text-[#71717A]">Cost Allocation</span>
					</div>
					<div class="hidden h-8 w-px bg-[#E4E4E7] md:block"></div>
					<div class="flex flex-col items-center gap-1">
						<span class="text-[32px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[36px]">Auto</span>
						<span class="text-[13px] font-semibold uppercase tracking-[0.04em] text-[#71717A]">Reorder Alerts</span>
					</div>
				</div>
				<div class="flex flex-col items-center gap-1 md:items-end">
					<span class="text-[14px] font-semibold text-[#3F3F46]">Fertilizer, fuel, parts, chemicals</span>
					<span class="text-[13px] text-[#71717A]">Everything in one place</span>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- CTA                                                         -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="reveal-on-scroll relative w-full bg-white px-6 py-24 md:px-12 md:py-32">
			<div class="mx-auto flex max-w-[640px] flex-col items-center text-center">
				<h2 class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px] lg:text-[52px]" style="text-wrap: balance">
					Never lose track of a single item.
				</h2>
				<p class="mt-6 max-w-[480px] text-[17px] leading-[1.6] text-[#52525B]">
					See how GardenSuite tracks every item from purchase to issue at your estate store. Demo, setup, and training are free.
				</p>
				<div class="mt-10 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
					<a
						href={demoHref}
						class="flex items-center justify-center rounded-full bg-[#1B5E3B] px-8 py-3.5 shadow-[0_2px_12px_rgba(27,94,59,0.2)] transition duration-150 hover:bg-[#144723] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.97]"
					>
						<span class="text-[15px] leading-none font-semibold text-white">Book Free Demo</span>
					</a>
					<a
						href="mailto:contact@gardensuite.in"
						class="flex items-center justify-center rounded-full border border-[#E4E4E7] bg-white px-8 py-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition duration-150 hover:border-[#D4D4D8] hover:bg-[#FAFAF7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.97]"
					>
						<span class="text-[15px] leading-none font-semibold text-[#111111]">Email Us</span>
					</a>
				</div>
			</div>
		</section>

	</main>
</div>

<style>
	:global(.reveal-on-scroll) {
		opacity: 0;
		transform: translateY(24px);
		transition: opacity 0.7s ease-out, transform 0.7s ease-out;
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
