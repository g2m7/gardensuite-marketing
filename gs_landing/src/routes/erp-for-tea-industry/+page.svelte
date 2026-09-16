<script lang="ts">
	import { onMount } from 'svelte';
	import { initScrollReveal } from '$lib/scroll-reveal';
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { softwareSchema, breadcrumbSchema, faqSchema } from '$lib/seo/schemas';

	// Shared layout components
	import ProductHero from '$lib/components/product/ProductHero.svelte';
	import ProductTrustRow from '$lib/components/product/ProductTrustRow.svelte';
	import ProductProblemStrip from '$lib/components/product/ProductProblemStrip.svelte';
	import ProductRollout from '$lib/components/product/ProductRollout.svelte';
	import FaqSection from '$lib/components/product/FaqSection.svelte';
	import Button from '$lib/components/Button.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup.svelte';

	onMount(() => {
		return initScrollReveal();
	});

	const demoHref = '/#contact';

	const erpProblems = [
		{
			title: 'Cloud-only ERPs stop when internet drops',
			desc: 'Standard enterprise software requires persistent internet connectivity. In remote plucking divisions and valleys, network dead zones freeze operations and force staff back to paper.'
		},
		{
			title: 'Generic payroll ignores tea garden wage pacts',
			desc: 'Standard HR tools cannot calculate task hazira, double hazira, tikka, over-kilo plucking incentives, wet leaf deductions, or plantation-specific PF and ESI rules.'
		},
		{
			title: 'Disconnected plucking weighment creates leaf fraud',
			desc: 'When leaf weighment happens on manual mechanical scales with handwritten register slips, leaf weight alterations and muster roll disputes eat into estate operating margins.'
		}
	];

	const erpRollout = [
		{
			step: '1',
			title: 'Garden Workflow Assessment',
			desc: 'Sarbani Associates team inspects division muster points, leaf collection sheds, factory intake, and estate office ledger practices.'
		},
		{
			step: '2',
			title: 'Hardware & Network Configuration',
			desc: 'We configure rugged offline tablets, biometric face recognition cameras, and Bluetooth hanging scales tailored to garden conditions.'
		},
		{
			step: '3',
			title: 'Staff & Babu Training',
			desc: 'Direct, hands-on training for munshis, sirdars, weighment clerks, factory supervisors, and head accountants in simple, accessible language.'
		},
		{
			step: '4',
			title: 'On-Site Go-Live & Handholding',
			desc: 'Our technicians stand beside your staff during morning muster and plucking weighment to ensure smooth daily adoption.'
		}
	];

	const erpFaqs = [
		{
			q: 'Why should a tea estate choose GardenSuite over generic ERPs like SAP, Tally, or Odoo?',
			a: 'Generic ERP systems are built for urban offices and climate-controlled factories. They require continuous high-speed internet and expensive custom coding to understand tea concepts like hazira, plucking tasks, wet leaf deductions, and green leaf to made tea outturn. GardenSuite was built from the ground up for Indian tea estates in 2000, works 100% offline at remote garden divisions, and includes dedicated hardware integrations for facial recognition and Bluetooth leaf scales.'
		},
		{
			q: 'Can GardenSuite run completely offline in remote estate out-divisions?',
			a: 'Yes. Tablets and field laptops store biometric face verification models and leaf weighment logs locally on device memory. Supervisors can record attendance and weigh hundreds of plucking baskets in areas with zero mobile network. All records sync automatically when devices reach office Wi-Fi or cellular coverage.'
		},
		{
			q: 'How does the ERP handle tea estate wage agreements in Assam and West Bengal?',
			a: 'GardenSuite supports regional industry wage structures across Assam, Dooars, Terai, and Darjeeling. It automatically calculates daily task hazira, extra kilo incentives, Sunday plucking rates, PF, ESI, labour welfare fund deductions, and annual bonus schedules without manual spreadsheet formulas.'
		},
		{
			q: 'Can estate owners and managing directors view reports away from the garden?',
			a: 'Yes. Once the estate office syncs daily numbers at shift end, owners and directors can log into the secure cloud MIS dashboard from any smartphone, tablet, or laptop to review daily leaf intake, plucking averages, factory outturn, and labor turnout.'
		},
		{
			q: 'What hardware is required to deploy GardenSuite across the estate?',
			a: 'Field operations run on standard Android tablets for face attendance and wireless Bluetooth hanging scales for plucking weighment. The estate office uses standard Windows computers (Windows 10 or 11) for payroll, factory registers, store accounting, and local database management.'
		}
	];
</script>

<SeoHead
	title="ERP for Tea Industry - Complete Estate Software | GardenSuite"
	description="Complete ERP software for the tea industry. Unites offline face attendance, Bluetooth leaf scales, worker wages, factory production, and daily MIS reports."
	canonical="https://gardensuite.in/erp-for-tea-industry"
	breadcrumbs={[
		{ name: 'Home', path: '/' },
		{ name: 'ERP for Tea Industry', path: '/erp-for-tea-industry' }
	]}
	schema={[
		softwareSchema({
			name: 'GardenSuite - Complete ERP for Tea Industry',
			description:
				'Specialized tea garden management ERP software for tea plantations and processing factories. Combines offline mobile face attendance, wireless Bluetooth leaf scales, wage and statutory payroll, factory outturn tracking, and daily executive MIS dashboards.',
			os: 'Android, Windows, Web',
			featureList: [
				'Offline biometric face attendance at remote garden lines',
				'Bluetooth wireless plucking scale integration with tare deduction',
				'Automated tea estate payroll with hazira, tikka, PF, and ESI calculation',
				'Factory made tea production and green leaf outturn tracking',
				'Store chemical, fertilizer, and fuel inventory management',
				'Daily executive cloud MIS reports for owners and directors'
			]
		}),
		breadcrumbSchema([
			{ name: 'Home', path: '/' },
			{ name: 'ERP for Tea Industry', path: '/erp-for-tea-industry' }
		]),
		faqSchema(erpFaqs)
	]}
/>

<!-- Hero Section -->
<ProductHero
	badgeText="Tea Industry ERP"
	headline="Complete ERP Software for the Tea Industry"
	paragraph="Built specifically for tea plantations and processing factories across Assam, Dooars, Terai, and Darjeeling. Works offline in remote garden lines with face attendance, Bluetooth scales, automated payroll, factory outturn, and daily mobile MIS."
	{demoHref}
	workflowHref="#modules"
>
	<div class="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-[#71717A]">
		<span>Built for Indian Tea Estates Since 2000</span>
		<span>•</span>
		<span>100% Offline Field Reliability</span>
		<span>•</span>
		<span>On-Site Setup by Sarbani Associates</span>
	</div>
</ProductHero>

<!-- Problem Strip -->
<ProductProblemStrip
	tagText="The operational challenge"
	headline="Why standard enterprise ERPs fail on tea plantations"
	paragraph="Generic accounting and enterprise software struggle in the rugged conditions of tea gardens. Managing labor lines, variable leaf weighment, and statutory wage pacts requires purpose-built engineering."
	problems={erpProblems}
/>

<!-- Core ERP Modules Grid -->
<section id="modules" class="border-b border-[#E4E4E7] bg-white py-20 md:py-28">
	<div class="mx-auto max-w-[1200px] px-6 md:px-12">
		<div class="mx-auto max-w-3xl text-center">
			<span class="text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">
				Five Integrated Modules
			</span>
			<h2 class="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#111111] md:text-4xl">
				The Complete Operating System for Tea Estates
			</h2>
			<p class="mt-4 text-base text-[#52525B] md:text-lg">
				GardenSuite connects every stage of tea production, eliminating disjointed spreadsheets, paper muster rolls, and manual calculation delays.
			</p>
		</div>

		<div class="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			<!-- Module 1: Attendance & Smart Scale -->
			<div class="flex flex-col justify-between rounded-2xl border border-[#E4E4E7] bg-[#FAFAFA] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
				<div>
					<div class="text-xs font-semibold tracking-wider text-[#1B5E3B] uppercase">Module 01 / Field Operations</div>
					<h3 class="mt-3 text-xl font-semibold text-[#111111]">Face Attendance & Smart Scale</h3>
					<p class="mt-3 text-sm leading-relaxed text-[#52525B]">
						Munshis scan pluckers via offline mobile tablets in under 1 second. Digital Bluetooth hanging scales capture net leaf weight directly to the verified worker record with automatic tare deduction.
					</p>
				</div>
				<div class="mt-6 pt-4 border-t border-[#E4E4E7]">
					<a href="/products/attendance" class="inline-flex items-center text-sm font-medium text-[#1B5E3B] hover:underline">
						Explore attendance & scales →
					</a>
				</div>
			</div>

			<!-- Module 2: Worker Payroll & Statutory Wages -->
			<div class="flex flex-col justify-between rounded-2xl border border-[#E4E4E7] bg-[#FAFAFA] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
				<div>
					<div class="text-xs font-semibold tracking-wider text-[#1B5E3B] uppercase">Module 02 / Office & Payroll</div>
					<h3 class="mt-3 text-xl font-semibold text-[#111111]">Labor Payroll & Compliance</h3>
					<p class="mt-3 text-sm leading-relaxed text-[#52525B]">
						Directly converts verified attendance and plucking kilograms into comprehensive wage sheets. Automatically calculates task hazira, double hazira, tikka, plucking incentives, PF, and ESI deductions.
					</p>
				</div>
				<div class="mt-6 pt-4 border-t border-[#E4E4E7]">
					<a href="/products/payroll" class="inline-flex items-center text-sm font-medium text-[#1B5E3B] hover:underline">
						Explore payroll automation →
					</a>
				</div>
			</div>

			<!-- Module 3: Factory Production & Made Tea -->
			<div class="flex flex-col justify-between rounded-2xl border border-[#E4E4E7] bg-[#FAFAFA] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
				<div>
					<div class="text-xs font-semibold tracking-wider text-[#1B5E3B] uppercase">Module 03 / Tea Manufacturing</div>
					<h3 class="mt-3 text-xl font-semibold text-[#111111]">Factory Production & Outturn</h3>
					<p class="mt-3 text-sm leading-relaxed text-[#52525B]">
						Tracks green leaf intake from estate divisions and bought leaf suppliers. Monitors withering, rolling, fermentation, drying, grading, packing, and dispatch challans with exact outturn percentages.
					</p>
				</div>
				<div class="mt-6 pt-4 border-t border-[#E4E4E7]">
					<a href="/products/factory" class="inline-flex items-center text-sm font-medium text-[#1B5E3B] hover:underline">
						Explore factory production →
					</a>
				</div>
			</div>

			<!-- Module 4: Stores & Chemical Inventory -->
			<div class="flex flex-col justify-between rounded-2xl border border-[#E4E4E7] bg-[#FAFAFA] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
				<div>
					<div class="text-xs font-semibold tracking-wider text-[#1B5E3B] uppercase">Module 04 / Materials & Stock</div>
					<h3 class="mt-3 text-xl font-semibold text-[#111111]">Store & Inventory Management</h3>
					<p class="mt-3 text-sm leading-relaxed text-[#52525B]">
						Controls stock intake, division issue, and reorder levels for agricultural inputs: fertilizers, pesticides, diesel for generators and tractors, spare parts, and plucking baskets.
					</p>
				</div>
				<div class="mt-6 pt-4 border-t border-[#E4E4E7]">
					<a href="/products/stores" class="inline-flex items-center text-sm font-medium text-[#1B5E3B] hover:underline">
						Explore store inventory →
					</a>
				</div>
			</div>

			<!-- Module 5: Executive Cloud MIS Dashboard -->
			<div class="flex flex-col justify-between rounded-2xl border border-[#E4E4E7] bg-[#FAFAFA] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] lg:col-span-2">
				<div>
					<div class="text-xs font-semibold tracking-wider text-[#1B5E3B] uppercase">Module 05 / Executive Oversight</div>
					<h3 class="mt-3 text-xl font-semibold text-[#111111]">Daily Executive MIS Dashboard</h3>
					<p class="mt-3 text-sm leading-relaxed text-[#52525B]">
						Estate owners, directors, and visiting agents do not need to wait for weekly physical dispatches or telephone briefings. Access daily plucking totals, cost per kg, factory made tea outturn, and labor turnout percentages on your phone, tablet, or laptop every evening.
					</p>
				</div>
				<div class="mt-6 pt-4 border-t border-[#E4E4E7] flex flex-wrap items-center justify-between gap-4">
					<a href="/products/mis" class="inline-flex items-center text-sm font-medium text-[#1B5E3B] hover:underline">
						Preview executive dashboard →
					</a>
					<span class="text-xs text-[#71717A]">Accessible on iOS, Android, macOS & Windows</span>
				</div>
			</div>
		</div>

		<!-- Regional Callout Banner -->
		<div class="mt-16 rounded-2xl border border-[#E4E4E7] bg-white p-8 shadow-sm">
			<div class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
				<div>
					<h4 class="text-lg font-semibold text-[#111111]">Regional Tea Garden Operations</h4>
					<p class="mt-1 text-sm text-[#52525B]">
						Read about our tailored deployments in <a href="/tea-garden-software-assam" class="text-[#1B5E3B] underline font-medium">Assam</a>, <a href="/tea-garden-software-dooars-terai" class="text-[#1B5E3B] underline font-medium">Dooars & Terai</a>, and <a href="/tea-garden-software-darjeeling" class="text-[#1B5E3B] underline font-medium">Darjeeling</a>.
					</p>
				</div>
				<Button href={demoHref} label="Book Regional Demo" variant="primary" showIcon />
			</div>
		</div>
	</div>
</section>

<!-- Trust Row -->
<ProductTrustRow />

<!-- Rollout Steps -->
<ProductRollout
	headline="Turnkey On-Site Deployment by Sarbani Associates"
	paragraph="We do not just hand over software and leave. Our engineering team conducts full on-site hardware setup, network calibration, and staff training at your estate."
	steps={erpRollout}
/>

<!-- FAQs -->
<FaqSection faqs={erpFaqs} />

<!-- Bottom CTA -->
<section class="border-t border-[#E4E4E7] bg-white py-20 text-center">
	<div class="mx-auto max-w-2xl px-6">
		<h2 class="text-3xl font-semibold tracking-[-0.03em] text-[#111111]">
			Request an On-Site ERP Demonstration
		</h2>
		<p class="mt-4 text-base text-[#52525B]">
			See how GardenSuite streamlines field attendance, plucking weighment, factory tracking, and owner reports for your tea estate.
		</p>
		<ButtonGroup class="mt-8 justify-center">
			<Button href={demoHref} label="Schedule Free On-Site Demo" variant="primary" showIcon />
			<Button href="mailto:sarbaniassociates@gmail.com?subject=GardenSuite%20Tea%20ERP%20Inquiry" label="Email Sarbani Associates" variant="secondary" />
		</ButtonGroup>
	</div>
</section>
