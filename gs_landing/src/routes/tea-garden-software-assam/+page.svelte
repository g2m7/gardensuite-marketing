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

	const assamProblems = [
		{
			title: 'Large morning muster queues',
			desc: 'Hundreds of workers waiting in line for manual roll-call creates delays. Proxy punching leads to unverified hazira payments.'
		},
		{
			title: 'Unstable field internet',
			desc: 'Cloud-only software fails when mobile signals drop in remote garden divisions. Work stops when connectivity is lost.'
		},
		{
			title: 'Leaf weight disputes at weighment',
			desc: 'Handwritten plucking slips often cause arguments over weight entries and daily leaf deduction incentives.'
		}
	];

	const assamRollout = [
		{
			step: '1',
			title: 'Estate Assessment',
			desc: 'Sarbani team reviews your garden division layout, weighment points, and office workflow.'
		},
		{
			step: '2',
			title: 'Hardware & App Setup',
			desc: 'We configure rugged offline tablets, face recognition units, and Bluetooth plucking scales on-site.'
		},
		{
			step: '3',
			title: 'Staff Training',
			desc: 'Hands-on training for munshis, sirdars, factory babus, and garden office clerks.'
		},
		{
			step: '4',
			title: 'Go-Live & Support',
			desc: 'Technicians remain at the garden during initial roll-call and leaf weighment to ensure smooth adoption.'
		}
	];

	const assamFaqs = [
		{
			q: 'Does GardenSuite work during monsoon rain and network blackouts in Assam?',
			a: 'Yes. Attendance capture, leaf weighment, and factory records run fully offline on tablets and office computers. Data syncs automatically whenever an internet connection is available.'
		},
		{
			q: 'Which tea districts in Assam are covered by GardenSuite?',
			a: 'GardenSuite supports tea estates across Upper Assam (Dibrugarh, Tinsukia, Sibsagar, Jorhat, Golaghat), Central Assam (Sonitpur, Nagaon), and the Barak Valley (Cachar, Karimganj).'
		},
		{
			q: 'Does it calculate Assam tea garden wages and statutory PF?',
			a: 'Yes. The payroll module calculates daily hazira, overtime, Sunday plucking rates, incentive slabs, and statutory PF/ESI deductions in line with Assam tea industry wage agreements.'
		},
		{
			q: 'Can estate owners based in Guwahati or Kolkata monitor daily reports?',
			a: 'Yes. Once the garden office syncs at the end of the day, owners and directors can access the MIS dashboard securely from any mobile phone, tablet, or laptop.'
		}
	];
</script>

<SeoHead
	title="Tea Garden Software Assam - Attendance, Payroll & Scale | GardenSuite"
	description="Tea garden software for Assam tea estates in Dibrugarh, Tinsukia, Jorhat and Golaghat. Face attendance, wireless leaf weighing, and daily reports."
	canonical="https://gardensuite.in/tea-garden-software-assam"
	breadcrumbs={[
		{ name: 'Home', path: '/' },
		{ name: 'Tea Garden Software Assam', path: '/tea-garden-software-assam' }
	]}
	schema={[
		softwareSchema({
			name: 'GardenSuite Assam Tea Estate Management ERP',
			description:
				'Tea garden management ERP software configured for Assam tea estates. Handles biometric face hazira, Bluetooth plucking scales, statutory payroll, and mobile MIS reporting.',
			os: 'Windows, Android, Web'
		}),
		breadcrumbSchema([
			{ name: 'Home', path: '/' },
			{ name: 'Tea Garden Software Assam', path: '/tea-garden-software-assam' }
		]),
		faqSchema(assamFaqs)
	]}
/>

<!-- Hero Section -->
<ProductHero
	badgeText="Assam Tea Estates"
	headline="Complete Tea Garden Software for Assam"
	paragraph="Designed for large tea plantations across Dibrugarh, Tinsukia, Jorhat, and Golaghat. Works offline at the garden lines with face attendance, Bluetooth leaf scales, and mobile daily reports."
	{demoHref}
	workflowHref="#workflow"
>
	<div class="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-[#71717A]">
		<span>Serving Upper & Central Assam</span>
		<span>•</span>
		<span>Full Offline Operation</span>
		<span>•</span>
		<span>On-Site Setup by Sarbani Associates</span>
	</div>
</ProductHero>

<!-- Problem Strip -->
<ProductProblemStrip
	headline="Common operational challenges in Assam tea plantations"
	paragraph="Managing hundreds of workers across remote divisions requires software built for garden realities."
	problems={assamProblems}
/>

<!-- Regional Solution Detail Section -->
<section id="workflow" class="border-b border-[#E4E4E7] bg-white py-20 md:py-28">
	<div class="mx-auto max-w-[1200px] px-6 md:px-12">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="text-3xl font-semibold tracking-[-0.03em] text-[#111111] md:text-4xl">
				Built for Assam Field Operations
			</h2>
			<p class="mt-4 text-base text-[#52525B] md:text-lg">
				From morning muster in remote out-gardens to evening leaf dispatch at the factory gate,
				GardenSuite keeps data linked, verified, and accessible.
			</p>
		</div>

		<div class="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
			<!-- Pillar 1 -->
			<div class="rounded-2xl border border-[#E4E4E7] bg-[#FAFAFA] p-8">
				<div class="text-sm font-semibold tracking-wider text-[#1B5E3B] uppercase">01 / Attendance</div>
				<h3 class="mt-4 text-xl font-semibold text-[#111111]">Face Attendance at the Lines</h3>
				<p class="mt-3 text-sm leading-relaxed text-[#52525B]">
					Munshis take roll-call on rugged mobile tablets using facial recognition. Helps stop proxy
					hazira even when internet towers are miles away.
				</p>
				<a href="/products/attendance/face-attendance" class="mt-6 inline-flex text-sm font-medium text-[#1B5E3B] hover:underline">
					Read face attendance details →
				</a>
			</div>

			<!-- Pillar 2 -->
			<div class="rounded-2xl border border-[#E4E4E7] bg-[#FAFAFA] p-8">
				<div class="text-sm font-semibold tracking-wider text-[#1B5E3B] uppercase">02 / Weighing</div>
				<h3 class="mt-4 text-xl font-semibold text-[#111111]">Wireless Plucking Scales</h3>
				<p class="mt-3 text-sm leading-relaxed text-[#52525B]">
					Connects Bluetooth hanging scales directly to the attendance record. Plucking leaf weight is
					recorded instantly without handwritten errors.
				</p>
				<a href="/products/attendance/smart-weighing" class="mt-6 inline-flex text-sm font-medium text-[#1B5E3B] hover:underline">
					Read smart weighing details →
				</a>
			</div>

			<!-- Pillar 3 -->
			<div class="rounded-2xl border border-[#E4E4E7] bg-[#FAFAFA] p-8">
				<div class="text-sm font-semibold tracking-wider text-[#1B5E3B] uppercase">03 / Executive MIS</div>
				<h3 class="mt-4 text-xl font-semibold text-[#111111]">Daily Mobile Reports</h3>
				<p class="mt-3 text-sm leading-relaxed text-[#52525B]">
					Owners and directors receive daily green leaf intake, made tea production, and labor turnout
					summaries on phone or laptop every evening.
				</p>
				<a href="/products/mis" class="mt-6 inline-flex text-sm font-medium text-[#1B5E3B] hover:underline">
					View MIS dashboard preview →
				</a>
			</div>
		</div>

		<!-- Regional Internal Link Banner -->
		<div class="mt-16 rounded-2xl border border-[#E4E4E7] bg-white p-8 shadow-sm">
			<div class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
				<div>
					<h4 class="text-lg font-semibold text-[#111111]">Looking for complete estate modules?</h4>
					<p class="mt-1 text-sm text-[#52525B]">
						Explore our dedicated modules for <a href="/products/payroll" class="text-[#1B5E3B] underline">Worker Payroll</a>, <a href="/products/factory" class="text-[#1B5E3B] underline">Factory Production</a>, and <a href="/products/stores" class="text-[#1B5E3B] underline">Store Inventory</a>.
					</p>
				</div>
				<Button href={demoHref} label="Book Assam Demo" variant="primary" showIcon />
			</div>
		</div>
	</div>
</section>

<!-- Trust Row -->
<ProductTrustRow />

<!-- Rollout Steps -->
<ProductRollout
	headline="Sarbani Associates sets it up with your staff in Assam."
	paragraph="From initial division survey to hardware calibration and bilingual staff training, we ensure smooth adoption at your garden."
	steps={assamRollout}
/>

<!-- FAQs -->
<FaqSection faqs={assamFaqs} />

<!-- Bottom CTA -->
<section class="border-t border-[#E4E4E7] bg-white py-20 text-center">
	<div class="mx-auto max-w-2xl px-6">
		<h2 class="text-3xl font-semibold tracking-[-0.03em] text-[#111111]">
			Request an On-Site Demo in Assam
		</h2>
		<p class="mt-4 text-base text-[#52525B]">
			Sarbani Associates provides personal on-site setup and training across tea estates in Upper,
			Central, and South Assam.
		</p>
		<ButtonGroup class="mt-8 justify-center">
			<Button href={demoHref} label="Schedule Free On-Site Demo" variant="primary" showIcon />
			<Button href="mailto:sarbaniassociates@gmail.com" label="Email Sarbani Associates" variant="secondary" />
		</ButtonGroup>
	</div>
</section>
