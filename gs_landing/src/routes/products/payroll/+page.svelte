<script lang="ts">
	import { onMount } from 'svelte';
	import { initScrollReveal } from '$lib/scroll-reveal';

	onMount(() => {
		return initScrollReveal();
	});

	const demoHref = 'mailto:contact@gardensuite.in?subject=GardenSuite%20Demo%20Request';
</script>

<svelte:head>
	<title>Automated Payroll - GardenSuite Products</title>
	<meta
		name="description"
		content="GardenSuite's automated payroll system. Auto-calculates wages, deductions, PF, ESI, and bonus elements seamlessly."
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
					<span class="mb-4 inline-block rounded-full bg-[#1B5E3B] px-3 py-1 text-[11px] font-semibold tracking-[0.04em] text-white uppercase">Automated Payroll</span>
					<h1 class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px] lg:text-[52px]" style="text-wrap: balance">
						Say goodbye to manual wage calculations.
					</h1>
					<p class="mx-auto mt-6 max-w-[560px] text-[17px] leading-[1.6] text-[#52525B]">
						Attendance and weighing data flows straight into payroll. Wages, PF, ESI, bonus - all calculated automatically. No spreadsheets. No disputes.
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
						Payroll takes days. Errors compound.
					</h2>
				</div>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
					{#each [
						{
							title: 'Manual wage calculation',
							desc: 'Someone sits with a calculator for days - hazira, tikka, doubling, plucking rates, overtime. One typo and the whole sheet is wrong.'
						},
						{
							title: 'PF and ESI mistakes',
							desc: 'Statutory deductions calculated by hand across hundreds of workers. Compliance errors lead to penalties and disputes.'
						},
						{
							title: 'Delayed payouts',
							desc: 'By the time payroll is ready, workers have waited weeks. Trust drops. Disputes increase. Accounting stays behind.'
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
		<!-- STORY 01: Auto Data Pull                                    -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="reveal-on-scroll relative w-full bg-[#FAFAF7] py-24 md:py-32">
			<div class="mx-auto grid max-w-[1344px] items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-12">
				<div>
					<span class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">Step 1 - Data In</span>
					<h2 class="text-[32px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[40px]" style="text-wrap: balance">
						Attendance and weights flow in automatically.
					</h2>
					<p class="mt-5 text-[17px] leading-[1.6] text-[#52525B]">
						Every face scan and every Bluetooth weight reading is already in the system. Payroll starts with real data, not paper registers. No re-entry, no transcription errors.
					</p>
					<ul class="mt-6 flex flex-col gap-3" role="list">
						{#each ['Face attendance feeds directly into wage days', 'Smart scale weights calculate leaf bonuses', 'Zero manual data re-entry from registers'] as bullet}
							<li class="flex items-center gap-2.5">
								<div class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1B5E3B]/10">
									<svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 5l2 2 4-4" stroke="#1B5E3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
								</div>
								<span class="text-[14px] font-medium text-[#3F3F46]">{bullet}</span>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Visual: Data flow card -->
				<div class="relative flex justify-center">
					<div class="flex w-full max-w-[400px] flex-col gap-4 rounded-2xl border border-[#E4E4E7] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
						<span class="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#1B5E3B]">Month Summary</span>
						{#each [
							{ label: 'Working days', value: '26' },
							{ label: 'Green leaf (kg)', value: '4,280' },
							{ label: 'Gross wages', value: '₹2,48,500' },
							{ label: 'PF deducted', value: '₹29,820' },
							{ label: 'ESI deducted', value: '₹4,315' }
						] as row}
							<div class="flex items-center justify-between border-t border-[#F0F0F0] py-2.5">
								<span class="text-[14px] text-[#71717A]">{row.label}</span>
								<span class="text-[14px] font-semibold tabular-nums text-[#3F3F46]">{row.value}</span>
							</div>
						{/each}
						<div class="flex items-center justify-between border-t-2 border-[#E4E4E7] pt-3">
							<span class="text-[15px] font-semibold text-[#111111]">Net payable</span>
							<span class="text-[15px] font-bold tabular-nums text-[#111111]">₹2,14,365</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- STORY 02: Tea-Industry Deductions                           -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="reveal-on-scroll relative w-full bg-white py-24 md:py-32">
			<div class="mx-auto grid max-w-[1344px] items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-12">
				<!-- Visual: Deduction breakdown -->
				<div class="relative flex justify-center md:order-1">
					<div class="flex w-full max-w-[400px] flex-col gap-3 rounded-2xl border border-[#E4E4E7] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
						<span class="mb-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#1B5E3B]">Deduction Breakdown</span>
						{#each [
							{ label: 'Provident Fund (PF)', value: '12%', note: 'Employer + Employee' },
							{ label: 'ESI', value: '1.75%', note: 'Employee share' },
							{ label: 'Hazira / Tikka', value: 'Auto', note: 'Per local rate' },
							{ label: 'Bonus / Incentive', value: 'Auto', note: 'Extra leaf rates' },
							{ label: 'Advance / Loan', value: 'Tracked', note: 'Deducted monthly' }
						] as row}
							<div class="flex items-start justify-between border-t border-[#F0F0F0] py-3">
								<div>
									<span class="text-[14px] font-medium text-[#111111]">{row.label}</span>
									<span class="block text-[12px] text-[#71717A]">{row.note}</span>
								</div>
								<span class="shrink-0 rounded-full bg-[#1B5E3B]/10 px-2.5 py-0.5 text-[12px] font-semibold text-[#1B5E3B]">{row.value}</span>
							</div>
						{/each}
					</div>
				</div>

				<div class="md:order-2">
					<span class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">Step 2 - Calculate</span>
					<h2 class="text-[32px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[40px]" style="text-wrap: balance">
						Built for tea garden payroll. Not generic ERP.
					</h2>
					<p class="mt-5 text-[17px] leading-[1.6] text-[#52525B]">
						Generic software does not understand hazira, tikka, doubling, or plucking rates. GardenSuite handles every tea-industry-specific wage element automatically.
					</p>
					<ul class="mt-6 flex flex-col gap-3" role="list">
						{#each ['PF, ESI, and statutory compliance built in', 'Tea-specific rates: hazira, tikka, doubling', 'Advance and loan tracking with auto-deduction'] as bullet}
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
		<!-- STORY 03: Payslip Generation                                -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="reveal-on-scroll relative w-full bg-[#FAFAF7] py-24 md:py-32">
			<div class="mx-auto grid max-w-[1344px] items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-12">
				<div>
					<span class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">Step 3 - Generate</span>
					<h2 class="text-[32px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[40px]" style="text-wrap: balance">
						Payslips, PF records, and bonus reports. Ready.
					</h2>
					<p class="mt-5 text-[17px] leading-[1.6] text-[#52525B]">
						Generate individual payslips, monthly PF statements, and bonus reports in seconds. Print them, export them, or file them - everything is ready when you need it.
					</p>
					<ul class="mt-6 flex flex-col gap-3" role="list">
						{#each ['Individual payslips with full breakdown', 'PF and ESI statements for compliance filing', 'Bonus and incentive reports by section'] as bullet}
							<li class="flex items-center gap-2.5">
								<div class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1B5E3B]/10">
									<svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 5l2 2 4-4" stroke="#1B5E3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
								</div>
								<span class="text-[14px] font-medium text-[#3F3F46]">{bullet}</span>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Visual: Payslip card -->
				<div class="relative flex justify-center">
					<div class="flex w-full max-w-[400px] flex-col gap-4 rounded-2xl border border-[#E4E4E7] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
						<div class="flex items-center justify-between">
							<span class="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#1B5E3B]">Payslip</span>
							<span class="text-[12px] text-[#71717A]">March 2026</span>
						</div>
						<div class="border-t border-[#F0F0F0] pt-3">
							<span class="text-[18px] font-semibold text-[#111111]">Ramesh Kumar</span>
							<span class="block text-[13px] text-[#71717A]">Section A - Plucking</span>
						</div>
						{#each [
							{ label: 'Days worked', value: '26' },
							{ label: 'Extra leaf (kg)', value: '180' },
							{ label: 'Basic + Hazira', value: '₹6,500' },
							{ label: 'Leaf incentive', value: '₹2,700' },
							{ label: 'PF deducted', value: '-₹780' }
						] as row}
							<div class="flex items-center justify-between border-t border-[#F0F0F0] py-2">
								<span class="text-[13px] text-[#71717A]">{row.label}</span>
								<span class="text-[13px] font-semibold tabular-nums text-[#3F3F46]">{row.value}</span>
							</div>
						{/each}
						<div class="flex items-center justify-between rounded-xl bg-[#1B5E3B]/5 px-4 py-3">
							<span class="text-[14px] font-semibold text-[#1B5E3B]">Take home</span>
							<span class="text-[18px] font-bold tabular-nums text-[#1B5E3B]">₹8,420</span>
						</div>
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
						<span class="text-[32px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[36px]">100%</span>
						<span class="text-[13px] font-semibold uppercase tracking-[0.04em] text-[#71717A]">Automated</span>
					</div>
					<div class="hidden h-8 w-px bg-[#E4E4E7] md:block"></div>
					<div class="flex flex-col items-center gap-1">
						<span class="text-[32px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[36px]">0</span>
						<span class="text-[13px] font-semibold uppercase tracking-[0.04em] text-[#71717A]">Spreadsheets</span>
					</div>
					<div class="hidden h-8 w-px bg-[#E4E4E7] md:block"></div>
					<div class="flex flex-col items-center gap-1">
						<span class="text-[32px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[36px]">PF + ESI</span>
						<span class="text-[13px] font-semibold uppercase tracking-[0.04em] text-[#71717A]">Compliance</span>
					</div>
				</div>
				<div class="flex flex-col items-center gap-1 md:items-end">
					<span class="text-[14px] font-semibold text-[#3F3F46]">Built for tea industry wage structures</span>
					<span class="text-[13px] text-[#71717A]">Hazira, tikka, doubling, plucking rates</span>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- CTA                                                         -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="reveal-on-scroll relative w-full bg-white px-6 py-24 md:px-12 md:py-32">
			<div class="mx-auto flex max-w-[640px] flex-col items-center text-center">
				<h2 class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px] lg:text-[52px]" style="text-wrap: balance">
					Stop calculating payroll by hand.
				</h2>
				<p class="mt-6 max-w-[480px] text-[17px] leading-[1.6] text-[#52525B]">
					See how GardenSuite calculates wages, deductions, and generates payslips for your estate. Demo, setup, and training are free.
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
