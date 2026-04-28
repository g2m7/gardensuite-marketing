<script lang="ts">
	import { onMount } from 'svelte';
	import { initScrollReveal } from '$lib/scroll-reveal';

	onMount(() => {
		return initScrollReveal();
	});

	const demoHref = 'mailto:contact@gardensuite.in?subject=GardenSuite%20Demo%20Request';
</script>

<svelte:head>
	<title>MIS Dashboard - GardenSuite Products</title>
	<meta
		name="description"
		content="GardenSuite MIS Dashboard viewable from any device - monitor your tea estate from anywhere."
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
					<span class="mb-4 inline-block rounded-full bg-[#1B5E3B] px-3 py-1 text-[11px] font-semibold tracking-[0.04em] text-white uppercase">Daily Report</span>
					<h1 class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px] lg:text-[52px]" style="text-wrap: balance">
						Your tea garden, right in your pocket.
					</h1>
					<p class="mx-auto mt-6 max-w-[560px] text-[17px] leading-[1.6] text-[#52525B]">
						Owners and managers do not need to depend on phone calls and physical meetings. See daily plucking, production, labour, and factory numbers from anywhere.
					</p>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- DASHBOARD VISUAL                                            -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="reveal-on-scroll relative w-full bg-white pb-20 md:pb-28">
			<div class="mx-auto max-w-[1100px] px-6 md:px-12">
				<div class="overflow-hidden rounded-2xl border border-[#E4E4E7] bg-white shadow-[0_20px_80px_rgba(0,0,0,0.07)]">
					<img src="/mis-dashboard.png" alt="GardenSuite MIS Dashboard showing daily garden operations" class="h-auto w-full object-cover object-top" width="1920" height="1080" />
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- PROBLEM STRIP                                              -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="reveal-on-scroll relative w-full border-y border-[#F0F0F0] bg-white py-20 md:py-28">
			<div class="mx-auto max-w-[1344px] px-6 md:px-12">
				<div class="mb-12 max-w-[520px]">
					<span class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">The old way</span>
					<h2 class="text-[32px] leading-[1.1] font-semibold tracking-[-0.04em] text-[#111111] md:text-[40px]" style="text-wrap: balance">
						Decisions wait for phone calls and physical meetings.
					</h2>
				</div>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
					{#each [
						{
							title: 'Information arrives late',
							desc: 'Daily reports are compiled manually and sent via WhatsApp or email. By the time you see them, the day is over.'
						},
						{
							title: 'Data is scattered',
							desc: 'Plucking in one spreadsheet, factory in another, labour in a register. No single view of how the garden is doing today.'
						},
						{
							title: 'Cannot compare',
							desc: 'No easy way to compare this week vs last week, or this section vs that section. Trends stay hidden in piles of paper.'
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
		<!-- STORY: What You See                                         -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="reveal-on-scroll relative w-full bg-[#FAFAF7] py-24 md:py-32">
			<div class="mx-auto max-w-[1344px] px-6 md:px-12">
				<div class="mb-14 text-center">
					<span class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">What you see</span>
					<h2 class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px]" style="text-wrap: balance">
						Every number. One dashboard.
					</h2>
					<p class="mx-auto mt-5 max-w-[560px] text-[17px] leading-[1.6] text-[#52525B]">
						Data from attendance, weighing, payroll, factory, and stores flows into one cloud dashboard. Updated daily. Accessible from any device.
					</p>
				</div>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
					{#each [
						{
							title: 'Plucking & Leaf Intake',
							desc: 'Section-wise green leaf weights, worker count, and per-worker yield. Compare day over day and week over week.',
							icon: 'leaf'
						},
						{
							title: 'Factory Production',
							desc: 'Made tea output, grade-wise breakdown, manufacturing cost, and withering-to-drying status. Live batch tracking.',
							icon: 'factory'
						},
						{
							title: 'Labour & Payroll',
							desc: 'Attendance summary, wage breakdown, overtime, and advance positions. Know your daily and monthly labour cost.',
							icon: 'labour'
						}
					] as item}
						<div class="rounded-2xl border border-[#E4E4E7] bg-white p-6 transition-all duration-200 hover:border-[#D4D4D8] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] md:p-8">
							<div class="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1B5E3B]/8">
								{#if item.icon === 'leaf'}
									<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B5E3B" stroke-width="1.5" aria-hidden="true"><path d="M12 2a10 10 0 0 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 2c-2.8 2.8-4 6.5-4 10s1.2 7.2 4 10"/><path d="M12 2c2.8 2.8 4 6.5 4 10s-1.2 7.2-4 10"/></svg>
								{:else if item.icon === 'factory'}
									<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B5E3B" stroke-width="1.5" aria-hidden="true"><path d="M3 21h18M5 21V9l4 3V7l4 3V5l4 3v13" stroke-linejoin="round"/><path d="M9 14h1M13 14h1M9 17h1M13 17h1" stroke-linecap="round"/></svg>
								{:else}
									<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B5E3B" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
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
		<!-- ACCESS ANYWHERE                                             -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="reveal-on-scroll relative w-full bg-white py-24 md:py-32">
			<div class="mx-auto grid max-w-[1344px] items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-12">
				<div>
					<span class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">Access anywhere</span>
					<h2 class="text-[32px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[40px]" style="text-wrap: balance">
						Check your garden from Kolkata, Siliguri, or anywhere.
					</h2>
					<p class="mt-5 text-[17px] leading-[1.6] text-[#52525B]">
						The MIS dashboard runs in the cloud. Open it on your phone, tablet, or laptop. Morning coffee or evening flight - your garden numbers are always one tap away.
					</p>
					<ul class="mt-6 flex flex-col gap-3" role="list">
						{#each ['Works on phone, tablet, and laptop', 'Cloud-hosted - no software to install', 'Data syncs automatically from the garden'] as bullet}
							<li class="flex items-center gap-2.5">
								<div class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1B5E3B]/10">
									<svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 5l2 2 4-4" stroke="#1B5E3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
								</div>
								<span class="text-[14px] font-medium text-[#3F3F46]">{bullet}</span>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Visual: Device mockup with dashboard -->
				<div class="relative flex justify-center">
					<div class="w-full max-w-[500px] overflow-hidden rounded-xl border border-[#E4E4E7] bg-[#1a1a1a] shadow-[0_30px_100px_rgba(0,0,0,0.18)]">
						<div class="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
							<div class="flex gap-1.5">
								<div class="h-2.5 w-2.5 rounded-full bg-[#FF5F57]"></div>
								<div class="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]"></div>
								<div class="h-2.5 w-2.5 rounded-full bg-[#28C840]"></div>
							</div>
							<div class="flex flex-1 justify-center">
								<div class="flex min-w-[240px] items-center gap-1.5 rounded-md bg-white/[0.06] px-3 py-1">
									<svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 6h8M6 2v8" stroke="white" stroke-opacity="0.3" stroke-width="1.2" stroke-linecap="round"/></svg>
									<span class="text-[11px] text-white/30">gardensuite.in/dashboard</span>
								</div>
							</div>
						</div>
						<img src="/mis-dashboard.png" alt="GardenSuite dashboard showing daily report" class="h-auto w-full object-cover object-top" width="1400" height="900" />
					</div>
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
						<span class="text-[32px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[36px]">5</span>
						<span class="text-[13px] font-semibold uppercase tracking-[0.04em] text-[#71717A]">Data Sources</span>
					</div>
					<div class="hidden h-8 w-px bg-[#E4E4E7] md:block"></div>
					<div class="flex flex-col items-center gap-1">
						<span class="text-[32px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[36px]">Daily</span>
						<span class="text-[13px] font-semibold uppercase tracking-[0.04em] text-[#71717A]">Updated</span>
					</div>
					<div class="hidden h-8 w-px bg-[#E4E4E7] md:block"></div>
					<div class="flex flex-col items-center gap-1">
						<span class="text-[32px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[36px]">Any</span>
						<span class="text-[13px] font-semibold uppercase tracking-[0.04em] text-[#71717A]">Device</span>
					</div>
				</div>
				<div class="flex flex-col items-center gap-1 md:items-end">
					<span class="text-[14px] font-semibold text-[#3F3F46]">All modules feed into one dashboard</span>
					<span class="text-[13px] text-[#71717A]">Attendance, payroll, factory, stores</span>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- CTA                                                         -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="reveal-on-scroll relative w-full bg-white px-6 py-24 md:px-12 md:py-32">
			<div class="mx-auto flex max-w-[640px] flex-col items-center text-center">
				<h2 class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px] lg:text-[52px]" style="text-wrap: balance">
					See your garden from anywhere.
				</h2>
				<p class="mt-6 max-w-[480px] text-[17px] leading-[1.6] text-[#52525B]">
					Get a live demo of the MIS dashboard with your own garden data. Demo, setup, and training are free.
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
