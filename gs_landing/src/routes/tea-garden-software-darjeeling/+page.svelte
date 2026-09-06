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

	const darjeelingProblems = [
		{
			title: 'Steep slopes & zero signal',
			desc: 'Pluckers work on steep hill sections where mobile network coverage is non-existent. Cloud software simply cannot load.'
		},
		{
			title: 'Delicate flush weighment accuracy',
			desc: 'First flush and second flush crop yields require precise gram-level accuracy. Mistakes in field recording directly affect revenue.'
		},
		{
			title: 'Scattered worker outposts',
			desc: 'Workers are spread across distant ridges and high-elevation divisions, making central morning roll-call impractical.'
		}
	];

	const darjeelingRollout = [
		{
			step: '1',
			title: 'Division Survey',
			desc: 'Our team evaluates section boundaries, elevation profiles, and weighment collection points.'
		},
		{
			step: '2',
			title: 'Offline Kit Deployment',
			desc: 'Lightweight handheld tablets with facial verification and portable Bluetooth hanging scales.'
		},
		{
			step: '3',
			title: 'Staff Onboarding',
			desc: 'Friendly training for sardars and clerks in Nepali and Hindi directly at the garden division.'
		},
		{
			step: '4',
			title: 'Factory Data Integration',
			desc: 'Connecting section leaf intake directly to withering trough records and invoice dispatch.'
		}
	];

	const darjeelingFaqs = [
		{
			q: 'Can the attendance app work without cellular data on steep hills?',
			a: 'Yes. Face attendance runs completely offline on the device without requiring SIM cards or Wi-Fi. The data syncs when the supervisor returns to the division shed or estate office.'
		},
		{
			q: 'How does GardenSuite handle high-value specialty tea batches?',
			a: 'The factory module tracks batch-level production from specific garden sections through withering, rolling, and sorting, preserving leaf origin details for premium invoices.'
		},
		{
			q: 'Which Darjeeling estates have used GardenSuite?',
			a: 'Long-standing Darjeeling estates including Simulbarie Tea Estate and Longview Tea Estate have utilized systems developed by Sarbani Associates.'
		},
		{
			q: 'Does it support hill worker wage and plucking task rules?',
			a: 'Yes. Daily task hazira, extra plucking leaf rates, seasonal incentives, and statutory PF calculations conform to Darjeeling hill tea industry guidelines.'
		}
	];
</script>

<SeoHead
	title="Tea Garden ERP Darjeeling - Hill Estate Management | GardenSuite"
	description="Tea garden ERP software for Darjeeling hill tea estates. Steep slope mobile face attendance, rugged leaf weighing, and daily factory batch tracking."
	canonical="https://gardensuite.in/tea-garden-software-darjeeling"
	breadcrumbs={[
		{ name: 'Home', path: '/' },
		{ name: 'Tea Garden ERP Darjeeling', path: '/tea-garden-software-darjeeling' }
	]}
	schema={[
		softwareSchema({
			name: 'GardenSuite Darjeeling Hill Tea Estate Management ERP',
			description:
				'Tea estate ERP designed for Darjeeling hill plantations. Features offline mobile face attendance on steep slopes, Bluetooth hanging scales, and factory batch tracking.',
			os: 'Windows, Android, Web'
		}),
		breadcrumbSchema([
			{ name: 'Home', path: '/' },
			{ name: 'Tea Garden ERP Darjeeling', path: '/tea-garden-software-darjeeling' }
		]),
		faqSchema(darjeelingFaqs)
	]}
/>

<!-- Hero Section -->
<ProductHero
	badgeText="Darjeeling Hill Estates"
	headline="Tea Garden ERP for Darjeeling Hill Estates"
	paragraph="Engineered for high elevation, rugged slopes, and zero-connectivity ridges. Works 100% offline with face recognition attendance, Bluetooth hanging scales, and flush quality tracking."
	{demoHref}
	workflowHref="#workflow"
>
	<div class="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-[#71717A]">
		<span>Built for High Elevation Slopes</span>
		<span>•</span>
		<span>True Offline Face Verification</span>
		<span>•</span>
		<span>Batch Origin Tracking</span>
	</div>
</ProductHero>

<!-- Problem Strip -->
<ProductProblemStrip
	headline="Challenges unique to Darjeeling hill plantations"
	paragraph="High terrain and scattered divisions demand lightweight offline technology that never breaks down."
	problems={darjeelingProblems}
/>

<!-- Regional Solution Detail Section -->
<section id="workflow" class="border-b border-[#E4E4E7] bg-white py-20 md:py-28">
	<div class="mx-auto max-w-[1200px] px-6 md:px-12">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="text-3xl font-semibold tracking-[-0.03em] text-[#111111] md:text-4xl">
				Hill Terrain Capabilities
			</h2>
			<p class="mt-4 text-base text-[#52525B] md:text-lg">
				Whether plucking on steep ridge faces or managing delicate orthodox factory rolls,
				GardenSuite simplifies hill operations.
			</p>
		</div>

		<div class="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
			<!-- Pillar 1 -->
			<div class="rounded-2xl border border-[#E4E4E7] bg-[#FAFAFA] p-8">
				<div class="text-sm font-semibold tracking-wider text-[#1B5E3B] uppercase">01 / Rugged Mobility</div>
				<h3 class="mt-4 text-xl font-semibold text-[#111111]">Slope Attendance Without Network</h3>
				<p class="mt-3 text-sm leading-relaxed text-[#52525B]">
					Supervisors take attendance directly on the hill trails. Biometric face matching verifies identity
					instantly without carrying paper registers across ridges.
				</p>
				<a href="/products/attendance/face-attendance" class="mt-6 inline-flex text-sm font-medium text-[#1B5E3B] hover:underline">
					Read face attendance details →
				</a>
			</div>

			<!-- Pillar 2 -->
			<div class="rounded-2xl border border-[#E4E4E7] bg-[#FAFAFA] p-8">
				<div class="text-sm font-semibold tracking-wider text-[#1B5E3B] uppercase">02 / Accurate Weighing</div>
				<h3 class="mt-4 text-xl font-semibold text-[#111111]">Bluetooth Hanging Scales</h3>
				<p class="mt-3 text-sm leading-relaxed text-[#52525B]">
					Portable digital hanging scales transmit leaf weight directly to the supervisor tablet.
					Eliminates disputes over daily fine leaf deductions and incentives.
				</p>
				<a href="/products/attendance/smart-weighing" class="mt-6 inline-flex text-sm font-medium text-[#1B5E3B] hover:underline">
					Read smart weighing details →
				</a>
			</div>

			<!-- Pillar 3 -->
			<div class="rounded-2xl border border-[#E4E4E7] bg-[#FAFAFA] p-8">
				<div class="text-sm font-semibold tracking-wider text-[#1B5E3B] uppercase">03 / Quality Control</div>
				<h3 class="mt-4 text-xl font-semibold text-[#111111]">Factory Production Tracking</h3>
				<p class="mt-3 text-sm leading-relaxed text-[#52525B]">
					Track green leaf intake from high-elevation divisions directly to orthodox made tea outturn,
					grading percentages, and dispatch invoices.
				</p>
				<a href="/products/factory" class="mt-6 inline-flex text-sm font-medium text-[#1B5E3B] hover:underline">
					Explore factory features →
				</a>
			</div>
		</div>

		<!-- Regional Internal Link Banner -->
		<div class="mt-16 rounded-2xl border border-[#E4E4E7] bg-white p-8 shadow-sm">
			<div class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
				<div>
					<h4 class="text-lg font-semibold text-[#111111]">Looking for daily executive oversight?</h4>
					<p class="mt-1 text-sm text-[#52525B]">
						Check daily plucking weights and manufacturing progress on our <a href="/products/mis" class="text-[#1B5E3B] underline">Daily MIS Dashboard</a>.
					</p>
				</div>
				<Button href={demoHref} label="Book Darjeeling Demo" variant="primary" showIcon />
			</div>
		</div>
	</div>
</section>

<!-- Trust Row -->
<ProductTrustRow />

<!-- Rollout Steps -->
<ProductRollout
	headline="Sarbani Associates sets it up with your staff in Darjeeling."
	paragraph="Customized for hill terrain operations. Division survey, rugged offline tablet deployment, and hands-on staff training."
	steps={darjeelingRollout}
/>

<!-- FAQs -->
<FaqSection faqs={darjeelingFaqs} />

<!-- Bottom CTA -->
<section class="border-t border-[#E4E4E7] bg-white py-20 text-center">
	<div class="mx-auto max-w-2xl px-6">
		<h2 class="text-3xl font-semibold tracking-[-0.03em] text-[#111111]">
			Request an On-Site Demo in Darjeeling
		</h2>
		<p class="mt-4 text-base text-[#52525B]">
			Sarbani Associates provides hands-on setup and training customized for hill terrain operations.
		</p>
		<ButtonGroup class="mt-8 justify-center">
			<Button href={demoHref} label="Schedule Free On-Site Demo" variant="primary" showIcon />
			<Button href="mailto:sarbaniassociates@gmail.com" label="Email Sarbani Associates" variant="secondary" />
		</ButtonGroup>
	</div>
</section>
