<script lang="ts">
	import { onMount } from 'svelte';
	import { initScrollReveal } from '$lib/scroll-reveal';

	onMount(() => {
		return initScrollReveal();
	});

	const demoHref = 'mailto:contact@gardensuite.in?subject=GardenSuite%20Demo%20Request';
</script>

<svelte:head>
	<title>Factory Accounts - GardenSuite Products</title>
	<meta
		name="description"
		content="GardenSuite Factory Accounts module for processing, production, and manufacturing cost tracking."
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
					<span class="mb-4 inline-block rounded-full bg-[#1B5E3B] px-3 py-1 text-[11px] font-semibold tracking-[0.04em] text-white uppercase">Factory Accounts</span>
					<h1 class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px] lg:text-[52px]" style="text-wrap: balance">
						Know exactly what every kg of tea costs to make.
					</h1>
					<p class="mx-auto mt-6 max-w-[560px] text-[17px] leading-[1.6] text-[#52525B]">
						Track green leaf inflow, each manufacturing step, power use, and dispatch. Get clear factory cost data without manual ledgers.
					</p>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
tt<!-- TRUST ROW -->
tt<section class="relative z-30 w-full border-b border-[#F0F0F0] bg-white py-5 md:py-6" aria-label="Trust indicators">
ttt<div class="mx-auto flex max-w-[1344px] flex-wrap items-center justify-center gap-x-6 gap-y-3 px-6 md:gap-x-10 md:px-12">
tttt<div class="flex items-center gap-2"><span class="text-[20px] font-semibold tracking-[-0.02em] text-[#111111] md:text-[24px]">20+</span><span class="text-[13px] text-[#71717A]">Tea Estates</span></div>
tttt<div class="hidden h-5 w-px bg-[#E4E4E7] md:block"></div>
tttt<div class="flex items-center gap-2"><span class="text-[20px] font-semibold tracking-[-0.02em] text-[#111111] md:text-[24px]">7</span><span class="text-[13px] text-[#71717A]">Regions</span></div>
tttt<div class="hidden h-5 w-px bg-[#E4E4E7] md:block"></div>
tttt<div class="flex items-center gap-2"><span class="text-[13px] font-medium text-[#3F3F46]">Since 2000</span></div>
tttt<div class="hidden h-5 w-px bg-[#E4E4E7] md:block"></div>
tttt<div class="flex items-center gap-2"><div class="h-1.5 w-1.5 rounded-full bg-[#1B5E3B]"></div><span class="text-[13px] font-medium text-[#3F3F46]">Offline at the garden</span></div>
ttt</div>
tt</section>

		<!-- PROBLEM STRIP                                              -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="reveal-on-scroll relative w-full border-b border-[#F0F0F0] bg-white py-20 md:py-28">
			<div class="mx-auto max-w-[1344px] px-6 md:px-12">
				<div class="mb-12 max-w-[520px]">
					<span class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">The old way</span>
					<h2 class="text-[32px] leading-[1.1] font-semibold tracking-[-0.04em] text-[#111111] md:text-[40px]" style="text-wrap: balance">
						Factory costs stay hidden in ledgers.
					</h2>
				</div>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
					{#each [
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
		<!-- STORY 01: Green Leaf Tracking                               -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="reveal-on-scroll relative w-full bg-[#FAFAF7] py-24 md:py-32">
			<div class="mx-auto grid max-w-[1344px] items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-12">
				<div>
					<span class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">Step 1 - Leaf Intake</span>
					<h2 class="text-[32px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[40px]" style="text-wrap: balance">
						Every kg of green leaf accounted for.
					</h2>
					<p class="mt-5 text-[17px] leading-[1.6] text-[#52525B]">
						Weights from the smart scales flow directly into factory records. You know exactly how much green leaf arrived, from which section, and when. No manual entry.
					</p>
					<ul class="mt-6 flex flex-col gap-3" role="list">
						{#each ['Smart scale data syncs to factory automatically', 'Section-wise leaf intake tracked in real time', 'No manual weight logs or missing entries'] as bullet}
							<li class="flex items-center gap-2.5">
								<div class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1B5E3B]/10">
									<svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 5l2 2 4-4" stroke="#1B5E3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
								</div>
								<span class="text-[14px] font-medium text-[#3F3F46]">{bullet}</span>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Visual: Leaf intake summary -->
				<div class="relative flex justify-center">
					<div class="flex w-full max-w-[400px] flex-col gap-4 rounded-2xl border border-[#E4E4E7] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
						<span class="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#1B5E3B]">Today's Leaf Intake</span>
						{#each [
							{ label: 'Section A', value: '2,450 kg' },
							{ label: 'Section B', value: '1,890 kg' },
							{ label: 'Section C', value: '3,120 kg' },
							{ label: 'Division 7', value: '1,680 kg' }
						] as row}
							<div class="flex items-center justify-between border-t border-[#F0F0F0] py-2.5">
								<span class="text-[14px] text-[#71717A]">{row.label}</span>
								<span class="text-[14px] font-semibold tabular-nums text-[#3F3F46]">{row.value}</span>
							</div>
						{/each}
						<div class="flex items-center justify-between border-t-2 border-[#E4E4E7] pt-3">
							<span class="text-[15px] font-semibold text-[#111111]">Total green leaf</span>
							<span class="text-[18px] font-bold tabular-nums text-[#1B5E3B]">9,140 kg</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- STORY 02: Manufacturing Process                             -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="reveal-on-scroll relative w-full bg-white py-24 md:py-32">
			<div class="mx-auto max-w-[1344px] px-6 md:px-12">
				<div class="mb-14 text-center">
					<span class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">Step 2 - Manufacturing</span>
					<h2 class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px]" style="text-wrap: balance">
						Every step. Every batch. Tracked.
					</h2>
					<p class="mx-auto mt-5 max-w-[560px] text-[17px] leading-[1.6] text-[#52525B]">
						From withering trough to dispatch bay, each manufacturing step is recorded with batch numbers, quantities, and timestamps.
					</p>
				</div>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
					{#each [
						{
							title: 'Withering & Rolling',
							desc: 'Track withering duration, rolling batches, and leaf condition. Know what went in and what came out.',
							icon: 'wither'
						},
						{
							title: 'Fermentation & Drying',
							desc: 'Monitor fermentation time and drying temperature. Record made tea output per batch for yield tracking.',
							icon: 'ferment'
						},
						{
							title: 'Sorting & Grading',
							desc: 'Track grades produced - BP, BOP, OF, PD, Dust. Know your grade-wise yield for every batch processed.',
							icon: 'sort'
						}
					] as item}
						<div class="rounded-2xl border border-[#E4E4E7] bg-white p-6 transition-all duration-200 hover:border-[#D4D4D8] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] md:p-8">
							<div class="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1B5E3B]/8">
								{#if item.icon === 'wither'}
									<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B5E3B" stroke-width="1.5" aria-hidden="true"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
								{:else if item.icon === 'ferment'}
									<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B5E3B" stroke-width="1.5" aria-hidden="true"><path d="M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20z"/><path d="M12 6v6l4 2"/></svg>
								{:else}
									<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B5E3B" stroke-width="1.5" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/><path d="M9 6v12M15 6v12"/></svg>
								{/if}
							</div>
							<h3 class="text-[17px] font-semibold tracking-[-0.01em] text-[#111111]">{item.title}</h3>
							<p class="mt-2 text-[14px] leading-[1.6] text-[#52525B]">{item.desc}</p>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- STORY 03: Cost & Dispatch                                   -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="reveal-on-scroll relative w-full bg-[#FAFAF7] py-24 md:py-32">
			<div class="mx-auto grid max-w-[1344px] items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-12">
				<!-- Visual: Cost card -->
				<div class="relative flex justify-center md:order-1">
					<div class="flex w-full max-w-[400px] flex-col gap-4 rounded-2xl border border-[#E4E4E7] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
						<span class="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#1B5E3B]">Cost Per Kg - March</span>
						{#each [
							{ label: 'Green leaf cost', value: '₹32.50' },
							{ label: 'Manufacturing', value: '₹12.80' },
							{ label: 'Power & fuel', value: '₹5.40' },
							{ label: 'Labour', value: '₹8.20' },
							{ label: 'Packing & transport', value: '₹3.10' }
						] as row}
							<div class="flex items-center justify-between border-t border-[#F0F0F0] py-2.5">
								<span class="text-[14px] text-[#71717A]">{row.label}</span>
								<span class="text-[14px] font-semibold tabular-nums text-[#3F3F46]">{row.value}</span>
							</div>
						{/each}
						<div class="flex items-center justify-between border-t-2 border-[#E4E4E7] pt-3">
							<span class="text-[15px] font-semibold text-[#111111]">Total cost/kg</span>
							<span class="text-[18px] font-bold tabular-nums text-[#1B5E3B]">₹62.00</span>
						</div>
					</div>
				</div>

				<div class="md:order-2">
					<span class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">Step 3 - Cost & Dispatch</span>
					<h2 class="text-[32px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[40px]" style="text-wrap: balance">
						Factory cost per kg. At a glance.
					</h2>
					<p class="mt-5 text-[17px] leading-[1.6] text-[#52525B]">
						Know your manufacturing cost per kg broken down by leaf, labour, power, and packing. Track dispatch quantities and buyer-wise invoices. All from one place.
					</p>
					<ul class="mt-6 flex flex-col gap-3" role="list">
						{#each ['Real-time cost per kg breakdown', 'Power, fuel, and labour cost tracking', 'Dispatch records with buyer-wise invoicing'] as bullet}
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
						<span class="text-[32px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[36px]">6</span>
						<span class="text-[13px] font-semibold uppercase tracking-[0.04em] text-[#71717A]">Process Steps</span>
					</div>
					<div class="hidden h-8 w-px bg-[#E4E4E7] md:block"></div>
					<div class="flex flex-col items-center gap-1">
						<span class="text-[32px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[36px]">Per Kg</span>
						<span class="text-[13px] font-semibold uppercase tracking-[0.04em] text-[#71717A]">Cost Tracking</span>
					</div>
					<div class="hidden h-8 w-px bg-[#E4E4E7] md:block"></div>
					<div class="flex flex-col items-center gap-1">
						<span class="text-[32px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[36px]">Batch</span>
						<span class="text-[13px] font-semibold uppercase tracking-[0.04em] text-[#71717A]">Tracking</span>
					</div>
				</div>
				<div class="flex flex-col items-center gap-1 md:items-end">
					<span class="text-[14px] font-semibold text-[#3F3F46]">From green leaf to invoiced tea</span>
					<span class="text-[13px] text-[#71717A]">Automatic cloud reporting</span>
				</div>
			</div>
		</section>

		<!-- HOW ROLLOUT WORKS -->
		<section class="reveal-on-scroll relative w-full bg-[#FAFAF7] py-20 md:py-28" aria-labelledby="rollout-heading">
			<div class="mx-auto max-w-[1344px] px-6 md:px-12">
				<div class="mb-10 text-center">
					<span class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">How rollout works</span>
					<h2 id="rollout-heading" class="text-[32px] leading-[1.1] font-semibold tracking-[-0.04em] text-[#111111] md:text-[40px]" style="text-wrap: balance">From first call to running live.</h2>
				</div>
				<div class="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-8">
					{#each [{ step: '1', title: 'Site Visit', desc: 'Sarbani team visits your garden to understand your workflow.' }, { step: '2', title: 'On-site Setup', desc: 'Software installed and configured at the garden.' }, { step: '3', title: 'Staff Training', desc: 'Hands-on training for office and field staff.' }, { step: '4', title: 'Go-Live Support', desc: 'Support stays on-site until your team is confident.' }] as item}
						<div class="rounded-2xl border border-[#E4E4E7] bg-white p-6 md:p-8">
							<div class="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#1B5E3B]/10"><span class="text-[14px] font-bold text-[#1B5E3B]">{item.step}</span></div>
							<h3 class="text-[17px] font-semibold tracking-[-0.01em] text-[#111111]">{item.title}</h3>
							<p class="mt-2 text-[14px] leading-[1.6] text-[#52525B]">{item.desc}</p>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- CTA                                                         -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="reveal-on-scroll relative w-full bg-white px-6 py-24 md:px-12 md:py-32">
			<div class="mx-auto flex max-w-[640px] flex-col items-center text-center">
				<h2 class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px] lg:text-[52px]" style="text-wrap: balance">
					Know your factory numbers.
				</h2>
				<p class="mt-6 max-w-[480px] text-[17px] leading-[1.6] text-[#52525B]">
					See how GardenSuite tracks your production from green leaf to dispatch. Demo, on-site setup, and training are free.
				</p>
				<p class="mt-2 text-[14px] text-[#52525B]"><span class="font-semibold text-[#111111]">Owner:</span> See per-kg cost without asking anyone</p>
				<p class="mt-3 max-w-[520px] text-[14px] leading-[1.6] text-[#71717A]">Many estates keep software details private. We respect confidentiality and share region-level experience.</p>
				<div class="mt-10 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
					<a href={demoHref} class="flex items-center justify-center rounded-full bg-[#1B5E3B] px-8 py-3.5 shadow-[0_2px_12px_rgba(27,94,59,0.2)] transition duration-150 hover:bg-[#144723] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.97]"><span class="text-[15px] leading-none font-semibold text-white">Book Free Demo</span></a>
					<a href="mailto:contact@gardensuite.in" class="flex items-center justify-center rounded-full border border-[#E4E4E7] bg-white px-8 py-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition duration-150 hover:border-[#D4D4D8] hover:bg-[#FAFAF7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.97]"><span class="text-[15px] leading-none font-semibold text-[#111111]">Email Us</span></a>
				</div>
				<p class="mt-4 text-[13px] text-[#71717A]">Reply within 1 working day. Demo scheduling call by the Sarbani team.</p>
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
