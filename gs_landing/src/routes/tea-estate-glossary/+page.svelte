<script lang="ts">
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { breadcrumbSchema, faqSchema } from '$lib/seo/schemas';
	import Button from '$lib/components/Button.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup.svelte';

	interface GlossaryTerm {
		term: string;
		category: string;
		definition: string;
		relatedModule?: { name: string; href: string };
	}

	const terms: GlossaryTerm[] = [
		{
			term: 'Hazira',
			category: 'Attendance & Payroll',
			definition:
				'The standard daily attendance unit in tea plantations representing a completed daily work task. A worker who marks full hazira is entitled to the agreed base daily wage under regional industry settlements.',
			relatedModule: { name: 'Face Attendance System', href: '/products/attendance/face-attendance' }
		},
		{
			term: 'Tikka / Thika',
			category: 'Attendance & Payroll',
			definition:
				'Piece-rate or task-based work assigned in tea gardens for specific field operations like weeding, pruning, or drainage, where payment is tied to completing a set area or measurement rather than hours.',
			relatedModule: { name: 'Tea Garden Payroll', href: '/products/payroll' }
		},
		{
			term: 'Kamdari',
			category: 'Field Management',
			definition:
				'The administrative supervision of field labor in tea gardens. A Kamdar oversees sirdars, monitors plucking quality in designated sections, and coordinates morning muster.',
			relatedModule: { name: 'Field Attendance', href: '/products/attendance' }
		},
		{
			term: 'Plucking Task (Base Target)',
			category: 'Plucking Operations',
			definition:
				'The minimum weight of green leaf (usually 20kg to 24kg depending on season and region) a plucker must harvest to qualify for their standard daily hazira wage.',
			relatedModule: { name: 'Smart Weighing Scale', href: '/products/attendance/smart-weighing' }
		},
		{
			term: 'Over-Kilo Plucking Incentive',
			category: 'Attendance & Payroll',
			definition:
				'Additional wage paid per kilogram of green leaf harvested beyond the standard plucking task. Essential for maximizing harvest yields during peak flush flushes.',
			relatedModule: { name: 'Automated Payroll', href: '/products/payroll' }
		},
		{
			term: 'Doubling (Double Hazira)',
			category: 'Attendance & Payroll',
			definition:
				'A double daily wage credit granted when a worker completes an exceptional double shift or performs strenuous emergency work such as factory night shifts or drainage repair.',
			relatedModule: { name: 'Automated Payroll', href: '/products/payroll' }
		},
		{
			term: 'Plucking Sirdar / Sardar',
			category: 'Field Management',
			definition:
				'The frontline supervisor who leads a plucking gang across garden lines, ensuring proper two-leaves-and-a-bud selection, line discipline, and section coverage.'
		},
		{
			term: 'Fine Leaf Count',
			category: 'Quality Control',
			definition:
				'The percentage of tender two-leaves-and-a-bud shoots found in a representative 100g sample of harvested green leaf. High fine leaf counts correlate directly with premium made tea auction prices.',
			relatedModule: { name: 'Factory Production System', href: '/products/factory' }
		},
		{
			term: 'Green Leaf Tare Weight',
			category: 'Weighing Operations',
			definition:
				'The empty weight of the plucking basket, jute bag, or nylon sheet used to hold harvested leaf. It must be subtracted from gross scale weight to determine accurate net plucking weight.',
			relatedModule: { name: 'Smart Weighing Scale', href: '/products/attendance/smart-weighing' }
		},
		{
			term: 'Dhal Leaf / Wet Leaf Deduction',
			category: 'Weighing Operations',
			definition:
				'A percentage reduction applied to harvested green leaf weight during heavy rains to compensate for surface rainwater clinging to leaves, preventing water weight from being paid as tea leaf.',
			relatedModule: { name: 'Smart Weighing Scale', href: '/products/attendance/smart-weighing' }
		},
		{
			term: 'Leaf Weighment Challan',
			category: 'Supply Chain',
			definition:
				'The official transfer document generated at division weighing sheds summarizing total bags and net green leaf dispatched to the tea manufacturing factory.',
			relatedModule: { name: 'Factory Production System', href: '/products/factory' }
		},
		{
			term: 'Made Tea Outturn Percentage',
			category: 'Factory Manufacturing',
			definition:
				'The ratio of finished made tea produced relative to raw green leaf intake, typically ranging between 21% and 23.5% for CTC and Orthodox tea manufacturing.',
			relatedModule: { name: 'Factory Production System', href: '/products/factory' }
		},
		{
			term: 'Withering Loss',
			category: 'Factory Manufacturing',
			definition:
				'The controlled reduction in leaf moisture achieved on withering troughs before mechanical rolling or CTC cutting, critical for enzymatic biochemical development.',
			relatedModule: { name: 'Factory Production System', href: '/products/factory' }
		},
		{
			term: 'Muster Roll Register',
			category: 'Attendance & Compliance',
			definition:
				'The statutory record of daily worker attendance, task completion, and wage entitlement required under the Plantations Labour Act and state rules.',
			relatedModule: { name: 'Face Attendance System', href: '/products/attendance/face-attendance' }
		},
		{
			term: 'Daily MIS Report',
			category: 'Executive Management',
			definition:
				'The executive summary compiled every evening showing total green leaf plucked, labor turnout percentage, factory production, cost per kg, and closing store stocks.',
			relatedModule: { name: 'Daily MIS Dashboard', href: '/products/mis' }
		},
		{
			term: 'Out-Garden / Division',
			category: 'Field Management',
			definition:
				'A physically separated section or satellite division of a large tea plantation that operates its own weighing sheds and lines while reporting to the main estate factory and office.'
		},
		{
			term: 'Tea Garden Stores Ration Issue',
			category: 'Stores & Inventory',
			definition:
				'The scheduled inventory disbursement of statutory subsidized food grains (rice, wheat, atta) and protective gear (boots, aprons, umbrellas) to permanent estate workers.',
			relatedModule: { name: 'Store Management', href: '/products/stores' }
		},
		{
			term: 'Provident Fund (PF) Statutory Calculation',
			category: 'Attendance & Payroll',
			definition:
				'Statutory retirement benefit contribution calculated as a percentage of basic cash wages and Dearness Allowance (DA) under plantation labor agreements.',
			relatedModule: { name: 'Tea Garden Payroll', href: '/products/payroll' }
		}
	];

	// Schema generation
	const glossaryFaqs = terms.map((t) => ({
		q: `What is ${t.term} in tea garden operations?`,
		a: t.definition
	}));
</script>

<SeoHead
	title="Tea Estate Operations Glossary - Plantation Terms | GardenSuite"
	description="Comprehensive glossary of tea garden operations, hazira attendance, leaf plucking, payroll, and factory manufacturing terms. By Sarbani Associates."
	canonical="https://gardensuite.in/tea-estate-glossary"
	breadcrumbs={[
		{ name: 'Home', path: '/' },
		{ name: 'Tea Estate Glossary', path: '/tea-estate-glossary' }
	]}
	schema={[
		breadcrumbSchema([
			{ name: 'Home', path: '/' },
			{ name: 'Tea Estate Glossary', path: '/tea-estate-glossary' }
		]),
		faqSchema(glossaryFaqs)
	]}
/>

<!-- Header -->
<header class="border-b border-[#E4E4E7] bg-white pt-28 pb-16 md:pt-36 md:pb-20">
	<div class="mx-auto max-w-4xl px-6 md:px-8">
		<div class="inline-block rounded-full bg-[#1B5E3B]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#1B5E3B]">
			Knowledge Engine
		</div>
		<h1 class="mt-6 text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl md:text-5xl">
			Tea Garden & Plantation Operations Glossary
		</h1>
		<p class="mt-4 text-base leading-relaxed text-[#52525B] sm:text-lg">
			A complete reference guide to tea estate terminology, field management concepts, plucking rules,
			and factory manufacturing metrics across Assam, Dooars, Terai, and Darjeeling.
		</p>
	</div>
</header>

<!-- Glossary List -->
<section class="bg-white py-16">
	<div class="mx-auto max-w-4xl px-6 md:px-8">
		<div class="grid grid-cols-1 gap-8">
			{#each terms as item}
				<div class="rounded-2xl border border-[#E4E4E7] bg-[#FAFAFA] p-6 transition-all hover:border-[#1B5E3B]/30 hover:bg-white">
					<div class="flex flex-wrap items-center justify-between gap-2">
						<h2 class="text-xl font-bold text-[#111111]">{item.term}</h2>
						<span class="rounded-md bg-[#E4E4E7] px-2.5 py-0.5 text-xs font-medium text-[#52525B]">
							{item.category}
						</span>
					</div>
					<p class="mt-3 text-base leading-relaxed text-[#3F3F46]">
						{item.definition}
					</p>
					{#if item.relatedModule}
						<div class="mt-4 pt-3 border-t border-[#E4E4E7]/60">
							<span class="text-xs text-[#71717A]">GardenSuite Module:</span>
							<a
								href={item.relatedModule.href}
								class="ml-1.5 text-xs font-semibold text-[#1B5E3B] hover:underline"
							>
								{item.relatedModule.name} →
							</a>
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<!-- Bottom Box -->
		<div class="mt-16 rounded-2xl border border-[#1B5E3B]/20 bg-[#F4FBF7] p-8 text-center">
			<h3 class="text-2xl font-semibold text-[#111111]">
				Manage Every Aspect of Your Estate with GardenSuite
			</h3>
			<p class="mx-auto mt-2 max-w-xl text-base text-[#52525B]">
				From biometric face attendance to automated leaf weighing, statutory payroll, and mobile daily
				MIS reports, GardenSuite is the complete operating system for tea gardens.
			</p>
			<ButtonGroup class="mt-6 justify-center">
				<Button href="/#contact" label="Book Free On-Site Demo" variant="primary" showIcon />
				<Button href="mailto:sarbaniassociates@gmail.com" label="Contact Sarbani Associates" variant="secondary" />
			</ButtonGroup>
		</div>
	</div>
</section>
