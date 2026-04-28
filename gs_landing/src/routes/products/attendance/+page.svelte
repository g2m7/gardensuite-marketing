<script lang="ts">
	import { onMount } from 'svelte';
	import { initScrollReveal } from '$lib/scroll-reveal';

	onMount(() => {
		return initScrollReveal();
	});

	const demoHref = 'mailto:contact@gardensuite.in?subject=GardenSuite%20Demo%20Request';
</script>

<svelte:head>
	<title>Face Attendance &amp; Smart Scale - GardenSuite Products</title>
	<meta
		name="description"
		content="See how GardenSuite's face recognition attendance and Bluetooth smart scale work together. From field to cloud in real time."
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
					<span class="mb-4 inline-block rounded-full bg-[#1B5E3B] px-3 py-1 text-[11px] font-semibold tracking-[0.04em] text-white uppercase">Attendance &amp; Weighing</span>
					<h1 class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px] lg:text-[52px]" style="text-wrap: balance">
						Every worker verified. Every leaf weighed. Zero paper.
					</h1>
					<p class="mx-auto mt-6 max-w-[560px] text-[17px] leading-[1.6] text-[#52525B]">
						Face recognition catches proxy attendance. Bluetooth scales record exact weights. Both work offline. Data syncs when the internet comes back.
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
						Paper attendance leaks money every day.
					</h2>
				</div>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
					{#each [
						{
							title: 'Buddy punching',
							desc: 'Workers mark friends as present. You pay for people who never showed up. Adds up to lakhs per year.'
						},
						{
							title: 'Fake weight chits',
							desc: 'Paper chits get altered or duplicated. Inflated green leaf weights go undetected until stock reconciliation.'
						},
						{
							title: 'No real-time data',
							desc: 'Attendance registers take days to reach the office. Decisions wait for data that arrives too late.'
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
		<!-- STORY 01: Face Scan (Text Left, Visual Right)              -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="reveal-on-scroll relative w-full bg-[#FAFAF7] py-24 md:py-32">
			<div class="mx-auto grid max-w-[1344px] items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-12">
				<div>
					<span class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">Step 1 - Face Scan</span>
					<h2 class="text-[32px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[40px]" style="text-wrap: balance">
						A worker looks at the camera. That's it.
					</h2>
					<p class="mt-5 text-[17px] leading-[1.6] text-[#52525B]">
						No registers. No buddy punching. The app identifies workers in under 2 seconds using face recognition - even without internet.
					</p>
					<ul class="mt-6 flex flex-col gap-3" role="list">
						{#each ['Works fully offline - no internet needed', 'Identifies workers in under 2 seconds', 'Stops proxy punching completely'] as bullet}
							<li class="flex items-center gap-2.5">
								<div class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1B5E3B]/10">
									<svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 5l2 2 4-4" stroke="#1B5E3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
								</div>
								<span class="text-[14px] font-medium text-[#3F3F46]">{bullet}</span>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Phone Mockup -->
				<div class="relative flex justify-center">
					<div class="flex flex-col w-[280px] h-[560px] rounded-[36px] bg-[#1a1a1a] p-3.5 shadow-[0_30px_100px_rgba(0,0,0,0.18)] md:w-[300px] md:h-[600px]">
						<div class="flex justify-between px-4 pt-2 pb-1">
							<span class="text-[11px] text-white/50">9:41</span>
							<div class="w-4 h-2.5 rounded-[2px] border border-white/40"></div>
						</div>
						<div class="flex flex-1 flex-col items-center justify-center gap-5 rounded-[24px] bg-[#f5f5f5] mx-0 my-1">
							<div class="flex h-[140px] w-[140px] items-center justify-center rounded-full border-[3px] border-[#1B5E3B]">
								<div class="flex h-[110px] w-[110px] items-center justify-center rounded-full border-2 border-dashed border-[#1B5E3B]/30">
									<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#1B5E3B" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
								</div>
							</div>
							<span class="text-[14px] text-[#71717A]">Scanning face...</span>
							<div class="flex gap-1.5">
								<div class="h-2 w-2 rounded-full bg-[#1B5E3B]"></div>
								<div class="h-2 w-2 rounded-full bg-[#1B5E3B]/40"></div>
								<div class="h-2 w-2 rounded-full bg-[#1B5E3B]/20"></div>
							</div>
						</div>
					</div>
					<!-- Floating stat -->
					<div class="absolute -bottom-4 -left-2 hidden rounded-xl border border-[#E4E4E7] bg-white px-5 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] md:flex md:flex-col md:gap-1">
						<span class="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#71717A]">Response Time</span>
						<span class="text-[28px] font-bold tabular-nums text-[#111111]">&lt; 2s</span>
					</div>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- STORY 02: Verified (Visual Left, Text Right)               -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="reveal-on-scroll relative w-full bg-white py-24 md:py-32">
			<div class="mx-auto grid max-w-[1344px] items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-12">
				<!-- Phone Mockup -->
				<div class="relative flex justify-center md:order-1">
					<div class="flex flex-col w-[280px] h-[560px] rounded-[36px] bg-[#1a1a1a] p-3.5 shadow-[0_30px_100px_rgba(0,0,0,0.18)] md:w-[300px] md:h-[600px]">
						<div class="flex justify-between px-4 pt-2 pb-1">
							<span class="text-[11px] text-white/50">9:41</span>
							<div class="w-4 h-2.5 rounded-[2px] border border-white/40"></div>
						</div>
						<div class="flex flex-1 flex-col items-center justify-center gap-6 rounded-[24px] bg-[#f5f5f5] mx-0 my-1">
							<div class="flex h-20 w-20 items-center justify-center rounded-full bg-[#1B5E3B] shadow-[0_0_40px_rgba(27,94,59,0.3)]">
								<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2.5" aria-hidden="true"><path d="M5 13l4 4L19 7"/></svg>
							</div>
							<div class="flex flex-col items-center gap-1.5">
								<span class="text-[18px] font-semibold text-[#111111]">Ramesh Kumar</span>
								<span class="text-[13px] text-[#71717A]">Section A - Plucking</span>
							</div>
							<div class="flex flex-col items-center rounded-xl border border-[#1B5E3B]/20 bg-[#1B5E3B]/5 px-7 py-3.5 gap-1">
								<span class="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1B5E3B]">Attendance Logged</span>
								<span class="text-[20px] font-bold tabular-nums text-[#111111]">09:41 AM</span>
							</div>
						</div>
					</div>
					<!-- Floating chip -->
					<div class="absolute -right-2 top-20 hidden items-center gap-2.5 rounded-xl border border-[#E4E4E7] bg-white px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.06)] md:flex">
						<div class="h-2 w-2 rounded-full bg-[#1B5E3B]"></div>
						<span class="text-[13px] font-medium text-[#3F3F46]">Auto-synced to ERP</span>
					</div>
					<!-- Floating stat -->
					<div class="absolute -bottom-4 -right-2 hidden rounded-xl border border-[#E4E4E7] bg-white px-5 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] md:flex md:flex-col md:gap-1">
						<span class="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#71717A]">Accuracy</span>
						<span class="text-[24px] font-bold tabular-nums text-[#111111]">99.7%</span>
					</div>
				</div>

				<div class="md:order-2">
					<span class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">Step 2 - Verified</span>
					<h2 class="text-[32px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[40px]" style="text-wrap: balance">
						Identity verified. Attendance logged.
					</h2>
					<p class="mt-5 text-[17px] leading-[1.6] text-[#52525B]">
						Name, section, and time - all recorded automatically. No manual entry needed. Data syncs to the desktop ERP the moment it goes online.
					</p>
					<ul class="mt-6 flex flex-col gap-3" role="list">
						{#each ['Auto-records name, time, and section', 'Syncs to ERP automatically when connected', 'Zero manual data entry mistakes'] as bullet}
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
		<!-- STORY 03: Smart Weighing (Text Left, Visual Right)         -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="reveal-on-scroll relative w-full bg-[#FAFAF7] py-24 md:py-32">
			<div class="mx-auto grid max-w-[1344px] items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-12">
				<div>
					<span class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">Step 3 - Smart Weighing</span>
					<h2 class="text-[32px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[40px]" style="text-wrap: balance">
						Green leaf meets smart scale.
					</h2>
					<p class="mt-5 text-[17px] leading-[1.6] text-[#52525B]">
						The Bluetooth-connected wireless scale sends weight directly to the app. Each reading is linked to the verified worker - no paper chits, no confusion, no errors.
					</p>
					<ul class="mt-6 flex flex-col gap-3" role="list">
						{#each ['Wireless Bluetooth connection', 'Weight linked to verified face ID', 'Eliminates paper chit weighing'] as bullet}
							<li class="flex items-center gap-2.5">
								<div class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1B5E3B]/10">
									<svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 5l2 2 4-4" stroke="#1B5E3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
								</div>
								<span class="text-[14px] font-medium text-[#3F3F46]">{bullet}</span>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Scale Display -->
				<div class="relative flex justify-center">
					<div class="flex w-[280px] flex-col items-center rounded-2xl border-2 border-[#E4E4E7] bg-white py-8 px-6 gap-4 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
						<div class="flex items-center gap-1.5 rounded-full bg-[#1B5E3B]/10 py-1.5 px-3.5">
							<div class="h-1.5 w-1.5 animate-pulse rounded-full bg-[#1B5E3B]"></div>
							<span class="text-[11px] font-semibold text-[#1B5E3B]">CONNECTED</span>
						</div>
						<div class="mt-4 flex flex-col items-center gap-1">
							<span class="text-[64px] font-bold leading-none tracking-[-2px] tabular-nums text-[#111111]">4.23</span>
							<span class="text-[14px] text-[#71717A]">kg green leaf</span>
						</div>
						<div class="mt-4 flex flex-col items-center gap-0">
							<div class="h-7 w-px bg-[#E4E4E7]"></div>
							<svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1l4 4 4-4" stroke="#E4E4E7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
						</div>
					</div>
					<!-- Floating receipt -->
					<div class="absolute -bottom-6 -right-4 hidden items-center gap-3 rounded-xl border border-[#E4E4E7] bg-white px-5 py-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.08)] md:flex">
						<div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1B5E3B]/10">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1B5E3B" stroke-width="2" aria-hidden="true"><path d="M5 13l4 4L19 7"/></svg>
						</div>
						<div class="flex flex-col gap-0.5">
							<span class="text-[14px] font-semibold text-[#111111]">Ramesh Kumar</span>
							<span class="text-[12px] text-[#71717A]">4.23 kg recorded</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- FLOW: How It All Connects                                   -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="reveal-on-scroll relative w-full border-t border-[#F0F0F0] bg-white py-24 md:py-32">
			<div class="mx-auto max-w-[1344px] px-6 md:px-12">
				<div class="mb-14 text-center">
					<span class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">How it connects</span>
					<h2 class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px]" style="text-wrap: balance">
						From field to cloud in real time.
					</h2>
					<p class="mx-auto mt-5 max-w-[560px] text-[17px] leading-[1.6] text-[#52525B]">
						Every piece of data flows through the system automatically. No manual re-entry. No delays.
					</p>
				</div>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-8">
					{#each [
						{ step: '1', title: 'Face App', desc: 'Worker scans in. Attendance logged offline.', icon: 'phone' },
						{ step: '2', title: 'Smart Scale', desc: 'Bluetooth weight sent to app. Linked to face.', icon: 'scale' },
						{ step: '3', title: 'Desktop ERP', desc: 'Data syncs when online. Payroll calculated.', icon: 'erp' },
						{ step: '4', title: 'Cloud MIS', desc: 'Owner sees daily numbers from anywhere.', icon: 'cloud' }
					] as item}
						<div class="rounded-2xl border border-[#E4E4E7] bg-white p-6 transition-all duration-200 hover:border-[#D4D4D8] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] md:p-8">
							<div class="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1B5E3B]/8">
								{#if item.icon === 'phone'}
									<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B5E3B" stroke-width="1.5" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="18" r="1"/></svg>
								{:else if item.icon === 'scale'}
									<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B5E3B" stroke-width="1.5" aria-hidden="true"><path d="M6 2h12l2 8H4L6 2z"/><path d="M4 10v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10"/><line x1="12" y1="14" x2="12" y2="18"/></svg>
								{:else if item.icon === 'erp'}
									<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B5E3B" stroke-width="1.5" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
								{:else}
									<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1B5E3B" stroke-width="1.5" aria-hidden="true"><path d="M18 10a6 6 0 0 0-12 0 4 4 0 0 0 0 8h12a4 4 0 0 0 0-8z"/></svg>
								{/if}
							</div>
							<div class="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1B5E3B]">Step {item.step}</div>
							<h3 class="text-[17px] font-semibold tracking-[-0.01em] text-[#111111]">{item.title}</h3>
							<p class="mt-2 text-[14px] leading-[1.6] text-[#52525B]">{item.desc}</p>
						</div>
					{/each}
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
						<span class="text-[32px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[36px]">&lt; 2s</span>
						<span class="text-[13px] font-semibold uppercase tracking-[0.04em] text-[#71717A]">Face Match</span>
					</div>
					<div class="hidden h-8 w-px bg-[#E4E4E7] md:block"></div>
					<div class="flex flex-col items-center gap-1">
						<span class="text-[32px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[36px]">99.7%</span>
						<span class="text-[13px] font-semibold uppercase tracking-[0.04em] text-[#71717A]">Accuracy</span>
					</div>
					<div class="hidden h-8 w-px bg-[#E4E4E7] md:block"></div>
					<div class="flex flex-col items-center gap-1">
						<span class="text-[32px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[36px]">0</span>
						<span class="text-[13px] font-semibold uppercase tracking-[0.04em] text-[#71717A]">Paper Chits</span>
					</div>
				</div>
				<div class="flex flex-col items-center gap-1 md:items-end">
					<span class="text-[14px] font-semibold text-[#3F3F46]">Works fully offline at the garden</span>
					<span class="text-[13px] text-[#71717A]">Syncs when internet returns</span>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- CTA                                                         -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="reveal-on-scroll relative w-full bg-white px-6 py-24 md:px-12 md:py-32">
			<div class="mx-auto flex max-w-[640px] flex-col items-center text-center">
				<h2 class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px] lg:text-[52px]" style="text-wrap: balance">
					See face attendance at your garden.
				</h2>
				<p class="mt-6 max-w-[480px] text-[17px] leading-[1.6] text-[#52525B]">
					We will set up a live demo with your own workers and show you the weight capture flow. Free setup, free training.
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
