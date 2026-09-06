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

	const dooarsProblems = [
		{
			title: 'Slow technician support',
			desc: 'Software vendors based in Kolkata or Bangalore take days to send support staff to North Bengal gardens when hardware needs calibration.'
		},
		{
			title: 'Monsoon weighment bottlenecks',
			desc: 'Heavy monsoon rains across Dooars and Terai slow down afternoon leaf weighment, leading to soggy leaf disputes and paper damage.'
		},
		{
			title: 'Fragmented division records',
			desc: 'Out-gardens and distant divisions struggle to send daily plucking weights to the main estate office on time.'
		}
	];

	const dooarsRollout = [
		{
			step: '1',
			title: 'Same-Day Garden Visit',
			desc: 'Based in Bagdogra and Siliguri, our engineering team visits your estate within hours.'
		},
		{
			step: '2',
			title: 'Line Calibration',
			desc: 'Hardware scales, Bluetooth links, and face recognition tablets configured for your specific weighing sheds.'
		},
		{
			step: '3',
			title: 'Bilingual Training',
			desc: 'Practical, hands-on training for sirdars, munshis, and clerks in Bengali, Hindi, and Nepali.'
		},
		{
			step: '4',
			title: 'Continuous Local Support',
			desc: 'Fast on-site visits whenever your estate adds new divisions or requires staff retraining.'
		}
	];

	const dooarsFaqs = [
		{
			q: 'Where is the GardenSuite support team located?',
			a: 'Sarbani Associates is headquartered in Bagdogra, Siliguri. Our proximity allows us to reach tea gardens across Terai and Dooars within 1-3 hours for setup, servicing, or urgent assistance.'
		},
		{
			q: 'Can GardenSuite handle leaf weighment in rain and field mud?',
			a: 'Yes. The system uses rugged Bluetooth scales and weather-resistant tablet covers designed for field conditions during heavy Dooars monsoon plucking rounds.'
		},
		{
			q: 'Does it support Dooars labor wage agreements and deductions?',
			a: 'Yes. Hazira, plucking task rates, over-kilo incentives, ration allowances, and statutory PF/ESI calculations align directly with regional tea association norms.'
		},
		{
			q: 'Which estates in Dooars and Terai currently use GardenSuite?',
			a: 'GardenSuite powers operations across prominent estates including Rheabari, Mogulkata, Debpara, Kurti, Looksan, Subhasini, Atal, Thanjhora, Naxalbari, and Pahargoomiah.'
		}
	];
</script>

<SeoHead
	title="Tea Garden Software Dooars & Terai - Local Support | GardenSuite"
	description="Tea garden software for Dooars and Terai tea estates in Siliguri, Jalpaiguri, and Alipurduar. Local support, face attendance, and leaf weighment."
	canonical="https://gardensuite.in/tea-garden-software-dooars-terai"
	breadcrumbs={[
		{ name: 'Home', path: '/' },
		{ name: 'Tea Garden Software Dooars & Terai', path: '/tea-garden-software-dooars-terai' }
	]}
	schema={[
		softwareSchema({
			name: 'GardenSuite Dooars & Terai Tea Estate Management ERP',
			description:
				'Tea garden software with local on-site support from Bagdogra and Siliguri. Provides face attendance, smart leaf weighing, payroll, and factory records for Dooars and Terai plantations.',
			os: 'Windows, Android, Web'
		}),
		breadcrumbSchema([
			{ name: 'Home', path: '/' },
			{ name: 'Tea Garden Software Dooars & Terai', path: '/tea-garden-software-dooars-terai' }
		]),
		faqSchema(dooarsFaqs)
	]}
/>

<!-- Hero Section -->
<ProductHero
	badgeText="Dooars & Terai Estates"
	headline="Tea Garden Software with Local Support"
	paragraph="Direct on-site implementation from Bagdogra and Siliguri. Rugged offline face attendance, Bluetooth leaf plucking scales, and daily MIS built for North Bengal tea estates."
	{demoHref}
	workflowHref="#workflow"
>
	<div class="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-[#71717A]">
		<span>Headquartered in Bagdogra / Siliguri</span>
		<span>•</span>
		<span>Rapid On-Site Support</span>
		<span>•</span>
		<span>Trusted by 20+ Regional Estates</span>
	</div>
</ProductHero>

<!-- Problem Strip -->
<ProductProblemStrip
	headline="Operational challenges across Dooars and Terai plantations"
	paragraph="Remote garden locations demand rugged hardware and local technicians who arrive when needed."
	problems={dooarsProblems}
/>

<!-- Regional Solution Detail Section -->
<section id="workflow" class="border-b border-[#E4E4E7] bg-white py-20 md:py-28">
	<div class="mx-auto max-w-[1200px] px-6 md:px-12">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="text-3xl font-semibold tracking-[-0.03em] text-[#111111] md:text-4xl">
				The Advantage of Local Engineering
			</h2>
			<p class="mt-4 text-base text-[#52525B] md:text-lg">
				When plucking is at its peak, you cannot afford software downtime. Sarbani Associates provides
				same-day on-site support across North Bengal tea gardens.
			</p>
		</div>

		<div class="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
			<!-- Advantage 1 -->
			<div class="rounded-2xl border border-[#E4E4E7] bg-[#FAFAFA] p-8">
				<div class="text-sm font-semibold tracking-wider text-[#1B5E3B] uppercase">01 / Proximity</div>
				<h3 class="mt-4 text-xl font-semibold text-[#111111]">1 to 3 Hour Response Time</h3>
				<p class="mt-3 text-sm leading-relaxed text-[#52525B]">
					Located in Bagdogra, our support engineers reach Jalpaiguri, Alipurduar, and Terai gardens
					quickly for device setup, scale recalibration, and updates.
				</p>
				<a href="/products/attendance/offline-sync" class="mt-6 inline-flex text-sm font-medium text-[#1B5E3B] hover:underline">
					Learn about office sync →
				</a>
			</div>

			<!-- Advantage 2 -->
			<div class="rounded-2xl border border-[#E4E4E7] bg-[#FAFAFA] p-8">
				<div class="text-sm font-semibold tracking-wider text-[#1B5E3B] uppercase">02 / Plucking Line</div>
				<h3 class="mt-4 text-xl font-semibold text-[#111111]">Fast Weighment in Heavy Rain</h3>
				<p class="mt-3 text-sm leading-relaxed text-[#52525B]">
					Plucking weight connects directly from the hanging hook scale to the worker attendance record
					over Bluetooth. No wet paper registers, no manual transcription.
				</p>
				<a href="/products/attendance/smart-weighing" class="mt-6 inline-flex text-sm font-medium text-[#1B5E3B] hover:underline">
					Explore smart weighing →
				</a>
			</div>

			<!-- Advantage 3 -->
			<div class="rounded-2xl border border-[#E4E4E7] bg-[#FAFAFA] p-8">
				<div class="text-sm font-semibold tracking-wider text-[#1B5E3B] uppercase">03 / Management</div>
				<h3 class="mt-4 text-xl font-semibold text-[#111111]">Daily Estate MIS Online</h3>
				<p class="mt-3 text-sm leading-relaxed text-[#52525B]">
					View green leaf harvested, labor attendance percentage, and factory production cost per kg
					from Siliguri, Kolkata, or wherever you travel.
				</p>
				<a href="/products/mis" class="mt-6 inline-flex text-sm font-medium text-[#1B5E3B] hover:underline">
					See MIS features →
				</a>
			</div>
		</div>

		<!-- Regional Internal Link Banner -->
		<div class="mt-16 rounded-2xl border border-[#E4E4E7] bg-white p-8 shadow-sm">
			<div class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
				<div>
					<h4 class="text-lg font-semibold text-[#111111]">Need assistance with garden payroll or stores?</h4>
					<p class="mt-1 text-sm text-[#52525B]">
						See how GardenSuite automates <a href="/products/payroll" class="text-[#1B5E3B] underline">Wage & PF Calculations</a> and <a href="/products/stores" class="text-[#1B5E3B] underline">Fertilizer & Inventory Stock</a>.
					</p>
				</div>
				<Button href={demoHref} label="Book Free Local Demo" variant="primary" showIcon />
			</div>
		</div>
	</div>
</section>

<!-- Trust Row -->
<ProductTrustRow />

<!-- Rollout Steps -->
<ProductRollout
	headline="Sarbani Associates sets it up with your staff in Dooars & Terai."
	paragraph="Direct on-site deployment from Bagdogra and Siliguri. Fast setup, line calibration, and local language staff training."
	steps={dooarsRollout}
/>

<!-- FAQs -->
<FaqSection faqs={dooarsFaqs} />

<!-- Bottom CTA -->
<section class="border-t border-[#E4E4E7] bg-white py-20 text-center">
	<div class="mx-auto max-w-2xl px-6">
		<h2 class="text-3xl font-semibold tracking-[-0.03em] text-[#111111]">
			Meet Our Team in Siliguri or at Your Garden
		</h2>
		<p class="mt-4 text-base text-[#52525B]">
			Contact Sarbani Associates in Bagdogra for a live demonstration of face attendance and smart leaf
			scales at your estate office.
		</p>
		<ButtonGroup class="mt-8 justify-center">
			<Button href={demoHref} label="Book Free On-Site Demo" variant="primary" showIcon />
			<Button href="mailto:sarbaniassociates@gmail.com" label="Email Sarbani Associates" variant="secondary" />
		</ButtonGroup>
	</div>
</section>
