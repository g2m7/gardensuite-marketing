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

	onMount(() => {
		return initScrollReveal();
	});

	const demoHref = '/#contact';

	const problems = [
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
	];

	const rollout = [
		{ step: '1', title: 'Site Visit', desc: 'Sarbani team visits your garden to understand your workflow.' },
		{ step: '2', title: 'On-site Setup', desc: 'Software installed and configured at the garden.' },
		{ step: '3', title: 'Staff Training', desc: 'Hands-on training for office and field staff.' },
		{ step: '4', title: 'Go-Live Support', desc: 'Support stays on-site until your team is confident.' }
	];
</script>

<SeoHead
	title="Tea Garden Payroll Software - Wages, PF & ESI | GardenSuite"
	description="Tea garden payroll software for wages, PF, ESI, bonus, hazira, and tikka. Calculate payroll from attendance and leaf weight records."
	canonical="https://gardensuite.in/products/payroll"
	schema={[
		softwareSchema({
			name: 'GardenSuite Automated Payroll',
			description: 'Automated payroll software for tea gardens. Calculates wages, PF, ESI, bonus, hazira, tikka, and doubling from face attendance and weighing data.',
			os: 'Windows'
		}),
		breadcrumbSchema([
			{ name: 'Home', path: '/' },
			{ name: 'Products', path: '/#products' },
			{ name: 'Automated Payroll', path: '/products/payroll' }
		])
	]}
/>

<div class="flex min-h-screen w-full flex-col overflow-clip bg-white antialiased">
	<main>
		<ProductHero
			badgeText="Tea Garden Payroll Software"
			headline="Wages. PF. Bonus. Calculated, not handwritten."
			paragraph="Attendance and weighing data goes straight into payroll. Wages, PF, ESI, and bonus are calculated automatically. No spreadsheets."
			{demoHref}
		>
			<!-- Hero mockup element inside the slot -->
			<div class="relative mx-auto mt-16 w-full max-w-[960px] rounded-[28px] border border-white/60 bg-[#DDEFE4] p-5 shadow-[0_24px_62px_rgba(15,46,12,0.1)] md:p-8 lg:p-10">
				<div class="absolute inset-0 z-0 bg-gradient-to-b from-[#F8FAF8] to-[#E8F3ED] opacity-90 rounded-[28px]"></div>
				<div class="dot-grid-light absolute inset-0 z-0 opacity-40 rounded-[28px]"></div>
				
				<div class="relative z-10 grid items-center gap-8 md:grid-cols-2">
					<!-- Month Summary Card -->
					<div class="flex justify-center">
						<div class="flex w-full max-w-[380px] flex-col gap-4 rounded-[24px] border border-white/85 bg-white/95 p-6 shadow-[0_14px_34px_rgba(15,23,42,0.06)] md:p-8">
							<span class="text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
								>Month Summary</span
							>
							{#each [{ label: 'Working days', value: '26' }, { label: 'Green leaf (kg)', value: '4,280' }, { label: 'Gross wages', value: '₹2,48,500' }, { label: 'PF deducted', value: '₹29,820' }, { label: 'ESI deducted', value: '₹4,315' }] as row}
								<div class="flex items-center justify-between border-t border-[#F0F0F0] py-2.5">
									<span class="text-[14px] text-[#71717A]">{row.label}</span>
									<span class="text-[14px] font-semibold text-[#3F3F46] tabular-nums"
										>{row.value}</span
									>
								</div>
							{/each}
							<div class="flex items-center justify-between border-t-2 border-[#E4E4E7] pt-3">
								<span class="text-[15px] font-semibold text-[#111111]">Net payable</span>
								<span class="text-[15px] font-bold text-[#111111] tabular-nums">₹2,14,365</span>
							</div>
						</div>
					</div>
					
					<!-- Deduction Breakdown Card -->
					<div class="flex justify-center">
						<div class="flex w-full max-w-[380px] flex-col gap-3 rounded-[24px] border border-white/85 bg-white/95 p-6 shadow-[0_14px_34px_rgba(15,23,42,0.06)] md:p-8">
							<span class="mb-2 text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
								>Deduction Breakdown</span
							>
							{#each [{ label: 'Provident Fund (PF)', value: '12%', note: 'Employer + Employee' }, { label: 'ESI', value: '1.75%', note: 'Employee share' }, { label: 'Hazira / Tikka', value: 'Auto', note: 'Per local rate' }, { label: 'Bonus / Incentive', value: 'Auto', note: 'Extra leaf rates' }, { label: 'Advance / Loan', value: 'Tracked', note: 'Deducted monthly' }] as row}
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
			headline="Payroll takes days. Errors compound."
			paragraph="Manual calculations on paper registers increase transcription errors, compliance mistakes, and delay payouts to workers."
			{problems}
		/>

		<!-- Story 1: Auto Data Pull -->
		<section class="reveal-on-scroll relative w-full bg-[#FAFAF7] border-b border-[#E4E4E7] py-24 md:py-32">
			<div
				class="mx-auto grid max-w-[1344px] items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-12"
			>
				<div>
					<span
						class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
						>Step 1 - Data In</span
					>
					<h2
						class="text-[32px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[40px]"
						style="text-wrap: balance"
					>
						Attendance and weights flow in automatically.
					</h2>
					<p class="mt-5 text-[17px] leading-[1.6] text-[#52525B]">
						Every face scan and every Bluetooth weight reading is already in the system. Payroll
						starts with real data, not paper registers. No re-entry, no transcription errors.
					</p>
					<ul class="mt-6 flex flex-col gap-3" role="list">
						{#each ['Face attendance feeds directly into wage days', 'Smart scale weights calculate leaf bonuses', 'Zero manual data re-entry from registers'] as bullet}
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
							>Month Summary</span
						>
						{#each [{ label: 'Working days', value: '26' }, { label: 'Green leaf (kg)', value: '4,280' }, { label: 'Gross wages', value: '₹2,48,500' }, { label: 'PF deducted', value: '₹29,820' }, { label: 'ESI deducted', value: '₹4,315' }] as row}
							<div class="flex items-center justify-between border-t border-[#F0F0F0] py-2.5">
								<span class="text-[14px] text-[#71717A]">{row.label}</span>
								<span class="text-[14px] font-semibold text-[#3F3F46] tabular-nums"
									>{row.value}</span
								>
							</div>
						{/each}
						<div class="flex items-center justify-between border-t-2 border-[#E4E4E7] pt-3">
							<span class="text-[15px] font-semibold text-[#111111]">Net payable</span>
							<span class="text-[15px] font-bold text-[#111111] tabular-nums">₹2,14,365</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Story 2: Tea-Industry Deductions -->
		<section class="reveal-on-scroll relative w-full bg-white border-b border-[#E4E4E7] py-24 md:py-32">
			<div
				class="mx-auto grid max-w-[1344px] items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-12"
			>
				<div class="relative flex justify-center md:order-2">
					<div
						class="flex w-full max-w-[400px] flex-col gap-3 rounded-[24px] border border-[#E4E4E7] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
					>
						<span class="mb-2 text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
							>Deduction Breakdown</span
						>
						{#each [{ label: 'Provident Fund (PF)', value: '12%', note: 'Employer + Employee' }, { label: 'ESI', value: '1.75%', note: 'Employee share' }, { label: 'Hazira / Tikka', value: 'Auto', note: 'Per local rate' }, { label: 'Bonus / Incentive', value: 'Auto', note: 'Extra leaf rates' }, { label: 'Advance / Loan', value: 'Tracked', note: 'Deducted monthly' }] as row}
							<div class="flex items-start justify-between border-t border-[#F0F0F0] py-3">
								<div>
									<span class="text-[14px] font-medium text-[#111111]">{row.label}</span>
									<span class="block text-[12px] text-[#71717A]">{row.note}</span>
								</div>
								<span
									class="shrink-0 rounded-full bg-[#1B5E3B]/10 px-2.5 py-0.5 text-[12px] font-semibold text-[#1B5E3B]"
									>{row.value}</span
								>
							</div>
						{/each}
					</div>
				</div>

				<div class="md:order-1">
					<span
						class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
						>Step 2 - Calculate</span
					>
					<h2
						class="text-[32px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[40px]"
						style="text-wrap: balance"
					>
						Built for tea garden payroll. Not generic ERP.
					</h2>
					<p class="mt-5 text-[17px] leading-[1.6] text-[#52525B]">
						Generic software does not understand hazira, tikka, doubling, or plucking rates.
						GardenSuite handles every tea-industry-specific wage element automatically.
					</p>
					<ul class="mt-6 flex flex-col gap-3" role="list">
						{#each ['PF, ESI, and statutory compliance built in', 'Tea-specific rates: hazira, tikka, doubling', 'Advance and loan tracking with auto-deduction'] as bullet}
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

		<!-- Story 3: Payslip Generation -->
		<section class="reveal-on-scroll relative w-full bg-[#FAFAF7] border-b border-[#E4E4E7] py-24 md:py-32">
			<div
				class="mx-auto grid max-w-[1344px] items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-12"
			>
				<div>
					<span
						class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
						>Step 3 - Generate</span
					>
					<h2
						class="text-[32px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[40px]"
						style="text-wrap: balance"
					>
						Payslips, PF records, and bonus reports. Ready.
					</h2>
					<p class="mt-5 text-[17px] leading-[1.6] text-[#52525B]">
						Generate individual payslips, monthly PF statements, and bonus reports in seconds. Print
						them, export them, or file them - everything is ready when you need it.
					</p>
					<ul class="mt-6 flex flex-col gap-3" role="list">
						{#each ['Individual payslips with full breakdown', 'PF and ESI statements for compliance filing', 'Bonus and incentive reports by section'] as bullet}
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
						<div class="flex items-center justify-between">
							<span class="text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
								>Payslip</span
							>
							<span class="text-[12px] text-[#71717A]">March 2026</span>
						</div>
						<div class="border-t border-[#F0F0F0] pt-3">
							<span class="text-[18px] font-semibold text-[#111111]">Ramesh Kumar</span>
							<span class="block text-[13px] text-[#71717A]">Section A - Plucking</span>
						</div>
						{#each [{ label: 'Days worked', value: '26' }, { label: 'Extra leaf (kg)', value: '180' }, { label: 'Basic + Hazira', value: '₹6,500' }, { label: 'Leaf incentive', value: '₹2,700' }, { label: 'PF deducted', value: '-₹780' }] as row}
							<div class="flex items-center justify-between border-t border-[#F0F0F0] py-2">
								<span class="text-[13px] text-[#71717A]">{row.label}</span>
								<span class="text-[13px] font-semibold text-[#3F3F46] tabular-nums"
									>{row.value}</span
								>
							</div>
						{/each}
						<div class="flex items-center justify-between rounded-xl bg-[#1B5E3B]/5 px-4 py-3">
							<span class="text-[14px] font-semibold text-[#1B5E3B]">Take home</span>
							<span class="text-[18px] font-bold text-[#1B5E3B] tabular-nums">₹8,420</span>
						</div>
					</div>
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
							>Auto</span
						>
						<span class="text-[13px] font-semibold tracking-[0.04em] text-[#71717A] uppercase"
							>Calculated</span
						>
					</div>
					<div class="hidden h-8 w-px bg-[#E4E4E7] md:block"></div>
					<div class="flex flex-col items-center gap-1">
						<span class="text-[32px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[36px]"
							>0</span
						>
						<span class="text-[13px] font-semibold tracking-[0.04em] text-[#71717A] uppercase"
							>Spreadsheets</span
						>
					</div>
					<div class="hidden h-8 w-px bg-[#E4E4E7] md:block"></div>
					<div class="flex flex-col items-center gap-1">
						<span class="text-[32px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[36px]"
							>PF + ESI</span
						>
						<span class="text-[13px] font-semibold tracking-[0.04em] text-[#71717A] uppercase"
							>Compliance</span
						>
					</div>
				</div>
				<div class="flex flex-col items-center gap-1 md:items-end">
					<span class="text-[14px] font-semibold text-[#3F3F46]"
						>Built for tea industry wage structures</span
					>
					<span class="text-[13px] text-[#71717A]">Hazira, tikka, doubling, plucking rates</span>
				</div>
			</div>
		</section>

		<ProductRollout
			tagText="How rollout works"
			headline="From first call to running live."
			paragraph="Wages configurations are customized for your estate values. Sarbani Associates configures deduction percentages, ESI rates, and prints samples for validation."
			steps={rollout}
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
