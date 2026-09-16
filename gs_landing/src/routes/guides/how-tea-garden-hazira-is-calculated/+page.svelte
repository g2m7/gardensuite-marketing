<script lang="ts">
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { articleSchema, breadcrumbSchema, faqSchema } from '$lib/seo/schemas';
	import Button from '$lib/components/Button.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup.svelte';
	import FaqSection from '$lib/components/product/FaqSection.svelte';

	const guideFaqs = [
		{
			q: 'What is the difference between hazira and tikka in a tea estate?',
			a: 'Hazira is the standard daily wage earned by a tea worker for completing a set daily task (such as a standard plucking quota or field weeding task). Tikka refers to piece-rate or extra contract work assigned beyond the base hazira task, paid at specific agreed rates.'
		},
		{
			q: 'How are over-kilo plucking incentives calculated in tea gardens?',
			a: 'Each garden sets a base daily plucking norm (e.g., 20 kg to 24 kg depending on season and flushing cycle). Any leaf harvested above this base quota is weighed and paid as an incentive rate per kilogram (e.g., ₹2 to ₹4 per extra kg depending on regional bipartite or tripartite agreements).'
		},
		{
			q: 'How does wet leaf deduction affect net plucking weight?',
			a: 'During heavy monsoon showers or early morning dew, plucked green leaves hold excess surface moisture. Estates apply a standardized wet leaf deduction percentage (typically 10% to 25% based on weather conditions) to compute net leaf intake before calculating incentives and factory made tea outturn.'
		},
		{
			q: 'Which statutory deductions apply to tea garden payroll in India?',
			a: 'Tea estate wage sheets must incorporate Provident Fund (PF at 12%), Employees State Insurance (ESI where implemented), Labour Welfare Fund (LWF), and company store or subsidized ration advances in compliance with the Plantations Labour Act.'
		}
	];
</script>

<SeoHead
	title="How Tea Garden Hazira is Calculated - Estate Guide | GardenSuite"
	description="Complete field guide for estate managers and accountants on tea garden hazira, base plucking tasks, over-kilo incentives, and PF deductions in Assam and Bengal."
	canonical="https://gardensuite.in/guides/how-tea-garden-hazira-is-calculated"
	breadcrumbs={[
		{ name: 'Home', path: '/' },
		{ name: 'Guides', path: '/#guides' },
		{ name: 'How Tea Garden Hazira is Calculated', path: '/guides/how-tea-garden-hazira-is-calculated' }
	]}
	schema={[
		articleSchema({
			title: 'How Tea Garden Hazira is Calculated: Complete Field & Payroll Guide',
			description:
				'A practical operational guide explaining how daily task hazira, extra plucking incentives, wet leaf tare deductions, and statutory PF/ESI are computed on Indian tea plantations.',
			path: '/guides/how-tea-garden-hazira-is-calculated',
			datePublished: '2026-09-17',
			dateModified: '2026-09-17'
		}),
		breadcrumbSchema([
			{ name: 'Home', path: '/' },
			{ name: 'Guides', path: '/#guides' },
			{ name: 'How Tea Garden Hazira is Calculated', path: '/guides/how-tea-garden-hazira-is-calculated' }
		]),
		faqSchema(guideFaqs)
	]}
/>

<!-- Guide Header -->
<header class="border-b border-[#E4E4E7] bg-white pt-28 pb-16 md:pt-36 md:pb-20">
	<div class="mx-auto max-w-3xl px-6 md:px-8">
		<div class="inline-block rounded-full bg-[#1B5E3B]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#1B5E3B]">
			Estate Payroll & Operations Guide
		</div>
		<h1 class="mt-6 text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl md:text-5xl">
			How Tea Garden Hazira is Calculated
		</h1>
		<p class="mt-4 text-base leading-relaxed text-[#52525B] sm:text-lg">
			A practical breakdown of daily task norms, over-kilo plucking incentives, tare deductions, and statutory compliance for tea estates across Assam, Dooars, Terai, and Darjeeling.
		</p>
		<div class="mt-6 flex items-center gap-3 text-xs text-[#71717A]">
			<span>By Sarbani Associates</span>
			<span>•</span>
			<span>Updated September 2026</span>
			<span>•</span>
			<span>8 min read</span>
		</div>
	</div>
</header>

<!-- Article Content -->
<article class="bg-white py-16">
	<div class="mx-auto max-w-3xl px-6 text-[#27272A] md:px-8">
		<!-- Direct Answer Box (AEO & Featured Snippet Target) -->
		<div class="rounded-2xl border-l-4 border-[#1B5E3B] bg-[#F4FBF7] p-6 text-base leading-relaxed text-[#1B5E3B]">
			<p class="font-semibold text-[#111111]">Direct Summary:</p>
			<p class="mt-1 text-[#27272A]">
				In Indian tea plantations, <strong>hazira</strong> is the base daily wage earned by a laborer for completing a defined operational task—such as reaching the daily base green leaf plucking quota (nirikh/thika) or finishing an allocated cultivation task. Total daily earnings consist of the base hazira plus over-kilo incentives for leaf plucked above the base norm, minus statutory deductions like Provident Fund (12%) and ration advances. Modern estates calculate this automatically by linking offline face attendance with digital Bluetooth plucking scales.
			</p>
		</div>

		<!-- Section 1 -->
		<h2 class="mt-12 text-2xl font-bold text-[#111111]">1. The Building Blocks of Tea Garden Wages</h2>
		<p class="mt-4 text-base leading-relaxed">
			Unlike urban factories with simple 8-hour shift punch systems, tea garden compensation balances statutory minimum wage agreements with agricultural productivity incentives. A plucker's daily pay packet typically incorporates four elements:
		</p>
		<ul class="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed">
			<li><strong>Base Task Hazira:</strong> The standard daily wage credited when a plucker meets the morning roll-call and completes the designated leaf target (often 20 kg to 24 kg depending on regional wage pacts and season).</li>
			<li><strong>Over-Kilo (Extra Leaf) Incentive:</strong> An incentive paid per kilogram for all green leaf plucked beyond the base task threshold.</li>
			<li><strong>Tikka / Double Hazira:</strong> Compensation paid for secondary afternoon field tasks, spraying, draining, or weekend plucking shifts.</li>
			<li><strong>Statutory Deductions:</strong> Mandatory contributions for employee Provident Fund (12% of cash wage), ESI (where applicable), and welfare recoveries.</li>
		</ul>

		<!-- Section 2 -->
		<h2 class="mt-12 text-2xl font-bold text-[#111111]">2. Step-by-Step Plucking Hazira Formula</h2>
		<p class="mt-4 text-base leading-relaxed">
			During the active harvesting season (March through November), plucking accounts for over 60% of an estate's total labor outlay. The standard calculation follows this sequence:
		</p>

		<div class="mt-6 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-6 font-mono text-sm leading-relaxed text-[#111111]">
			<div class="text-[#71717A]">// Step 1: Net Plucked Leaf</div>
			<div>Gross Scale Weight - Tare Weight (Basket/Bag) - Wet Leaf Moisture Deduction = <span class="font-bold text-[#1B5E3B]">Net Leaf (kg)</span></div>
			<div class="mt-4 text-[#71717A]">// Step 2: Over-Kilo Yield</div>
			<div>Net Leaf (kg) - Base Task Norm (kg) = <span class="font-bold text-[#1B5E3B]">Incentive Kilograms</span></div>
			<div class="mt-4 text-[#71717A]">// Step 3: Gross Daily Wage</div>
			<div>Base Hazira Rate + (Incentive Kilograms × Extra Kilo Rate) + Allowances = <span class="font-bold text-[#1B5E3B]">Gross Daily Pay</span></div>
		</div>

		<p class="mt-6 text-base leading-relaxed">
			For instance, if an Assam garden operates on a 24 kg base task at a ₹250 hazira rate and pays ₹3 per extra kilogram: a worker harvesting 38 kg of clean leaf earns ₹250 (base hazira) + (14 kg × ₹3 = ₹42 extra leaf pay) = ₹292 gross earnings for that day.
		</p>

		<!-- Section 3 -->
		<h2 class="mt-12 text-2xl font-bold text-[#111111]">3. Handling Wet Leaf Deductions and Tare</h2>
		<p class="mt-4 text-base leading-relaxed">
			Green leaves picked in morning fog or monsoon downpours carry significant surface water. If counted as pure tea leaf, estates end up overpaying incentives on water weight while factory outturn drops precipitously.
		</p>
		<p class="mt-4 text-base leading-relaxed">
			Estates establish daily wet leaf deduction protocols (e.g. 10% to 20% moisture deduction). However, on manual scales where weights and deductions are written by hand on paper tokens, arithmetic discrepancies between the field weighment munshi and the factory reception clerk frequently trigger worker disputes.
		</p>

		<!-- Section 4 -->
		<h2 class="mt-12 text-2xl font-bold text-[#111111]">4. Where Manual Hazira Calculations Break Down</h2>
		<p class="mt-4 text-base leading-relaxed">
			Historically, gardens track this with physical muster books and kamdari registers. This causes three critical issues during monthly payroll preparation:
		</p>
		<div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
			<div class="rounded-xl border border-[#E4E4E7] bg-white p-5 shadow-sm">
				<h3 class="font-semibold text-[#111111]">Clerical Bottlenecks</h3>
				<p class="mt-2 text-sm text-[#52525B]">
					Estate accountants spend 5 to 7 days every month manually typing handwritten weighment slips into spreadsheets, delaying wage payments and creating calculation errors.
				</p>
			</div>
			<div class="rounded-xl border border-[#E4E4E7] bg-white p-5 shadow-sm">
				<h3 class="font-semibold text-[#111111]">Proxy Hazira Leaks</h3>
				<p class="mt-2 text-sm text-[#52525B]">
					Colleagues answering roll-call for absent laborers or transferring leaf between baskets leads to unearned base hazira payouts.
				</p>
			</div>
		</div>

		<!-- Section 5: Solution Integration -->
		<h2 class="mt-12 text-2xl font-bold text-[#111111]">5. Automating Hazira with GardenSuite</h2>
		<p class="mt-4 text-base leading-relaxed">
			GardenSuite eliminates manual calculation bottlenecks by connecting field capture directly to office payroll:
		</p>
		<ul class="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed">
			<li><strong>Offline Face Verification:</strong> Munshis verify workers at morning muster on mobile tablets in under 1 second, stopping proxy roll-call.</li>
			<li><strong>Wireless Bluetooth Scales:</strong> Plucking bags are hung on Bluetooth digital scales, instantly logging net leaf weight with automatic tare deduction directly to the worker's record.</li>
			<li><strong>Instant Payroll Compilation:</strong> At the end of the day, office sync calculates daily hazira, extra kilo incentives, and PF/ESI deductions in minutes without spreadsheet formulas.</li>
		</ul>

		<!-- CTA Box inside Guide -->
		<div class="mt-12 rounded-2xl border border-[#E4E4E7] bg-[#FAFAFA] p-8 text-center">
			<h3 class="text-xl font-bold text-[#111111]">Automate Your Estate Hazira & Payroll</h3>
			<p class="mx-auto mt-2 max-w-lg text-sm text-[#52525B]">
				See how GardenSuite calculates hazira, over-kilos, and statutory wage compliance across 20+ tea estates in Assam and Bengal.
			</p>
			<ButtonGroup class="mt-6 justify-center">
				<Button href="/#contact" label="Book Free On-Site Demo" variant="primary" showIcon />
				<Button href="/products/payroll" label="View Payroll Module" variant="secondary" />
			</ButtonGroup>
		</div>
	</div>
</article>

<!-- FAQs -->
<FaqSection faqs={guideFaqs} />

<!-- Bottom CTA -->
<section class="border-t border-[#E4E4E7] bg-white py-20 text-center">
	<div class="mx-auto max-w-2xl px-6">
		<h2 class="text-3xl font-semibold tracking-[-0.03em] text-[#111111]">
			Streamline Your Tea Garden Operations
		</h2>
		<p class="mt-4 text-base text-[#52525B]">
			Sarbani Associates provides turnkey on-site deployment, hardware calibration, and bilingual staff training across Assam, Dooars, Terai, and Darjeeling.
		</p>
		<ButtonGroup class="mt-8 justify-center">
			<Button href="/#contact" label="Schedule Free On-Site Demo" variant="primary" showIcon />
			<Button href="mailto:sarbaniassociates@gmail.com?subject=Tea%20Garden%20Hazira%20Inquiry" label="Email Sarbani Associates" variant="secondary" />
		</ButtonGroup>
	</div>
</section>
