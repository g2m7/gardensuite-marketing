<script lang="ts">
	import { onMount } from 'svelte';
	import { initScrollReveal } from '$lib/scroll-reveal';
	import AttendanceProductHero from './AttendanceProductHero.svelte';
	import ScaleWorkflow from './ScaleWorkflow.svelte';
	import ComparisonTable from '$lib/components/product/ComparisonTable.svelte';
	import FaqSection from '$lib/components/product/FaqSection.svelte';
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { softwareSchema, breadcrumbSchema } from '$lib/seo/schemas';
	import SolutionWorkflowSection from '$lib/components/product/SolutionWorkflowSection.svelte';
	import Button from '$lib/components/Button.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup.svelte';
	import LeadCapture from '$lib/components/LeadCapture.svelte';

	// Shared layout components
	import ProductTrustRow from '$lib/components/product/ProductTrustRow.svelte';
	import ProductProblemStrip from '$lib/components/product/ProductProblemStrip.svelte';
	import ProductRollout from '$lib/components/product/ProductRollout.svelte';


	let videoRef = $state<HTMLVideoElement | null>(null);
	let isPlaying = $state(true);

	function togglePlay() {
		if (!videoRef) return;
		if (isPlaying) {
			videoRef.pause();
			isPlaying = false;
		} else {
			videoRef.play().catch(() => {});
			isPlaying = true;
		}
	}

	onMount(() => {
		return initScrollReveal();
	});

	const demoHref = '/#contact';

	const problems = [
		{
			title: 'Proxy attendance',
			desc: 'Workers may mark attendance for others. The office may pay for people who did not report.'
		},
		{
			title: 'Loose weight chits',
			desc: 'Leaf weight written on paper can be delayed, changed, or entered against the wrong worker.'
		},
		{
			title: 'Payroll doubts',
			desc: 'When attendance and leaf weight are separate, payroll staff spend extra time checking records.'
		}
	];

	const proofRows = [
		{ title: 'Face check', desc: 'Worker identity verified before attendance' },
		{ title: 'Weight capture', desc: 'Bluetooth scale sends kg to the same record' },
		{ title: 'Offline save', desc: 'Field data is stored even without internet' },
		{ title: 'Office sync', desc: 'Payroll and reports use the captured data' }
	];

	const rollout = [
		{ step: '1', title: 'Garden visit', desc: 'Sarbani Associates checks your section, worker, and weighing workflow.' },
		{
			step: '2',
			title: 'Setup',
			desc: 'Face app, scale, and GardenSuite office software are configured for your garden.'
		},
		{
			step: '3',
			title: 'Training',
			desc: 'Supervisors and office staff learn the daily flow using real worker records.'
		},
		{ step: '4', title: 'Support', desc: 'The Sarbani team supports your staff until the process is steady.' }
	];

	const attendanceFaqs = [
		{
			q: 'Does face attendance work without internet?',
			a: 'Yes. The app stores face data and attendance records on the phone. Everything syncs to the office when network is available.'
		},
		{
			q: 'What phone does the supervisor need?',
			a: 'Any Android phone with a front camera. The app works on mid-range phones commonly available in the market.'
		},
		{
			q: 'How does the Bluetooth scale connect?',
			a: 'The hanging scale pairs once via Bluetooth. After that, it sends the leaf weight directly to the active worker record on the phone.'
		},
		{
			q: 'Can workers be registered in the field?',
			a: 'Yes. New workers can be enrolled directly in the garden by capturing face photos from different angles. No office computer needed.'
		},
		{
			q: 'How does attendance data reach payroll?',
			a: 'Once synced, attendance and leaf weight records flow directly into the GardenSuite payroll module. No re-entry from paper registers.'
		},
		{
			q: 'What if a worker\'s face is not recognized?',
			a: 'The app shows the closest match with a confidence score. The supervisor can retry or manually confirm. Poor lighting or angle changes can be handled by re-enrolling photos.'
		}
	];
</script>

<SeoHead
	title="Tea Garden Attendance System - Face & Weighing | GardenSuite"
	description="Face attendance and Bluetooth smart weighing for tea gardens. Verify workers, record leaf weight, work offline, and sync data for payroll."
	canonical="https://gardensuite.in/products/attendance"
	ogImage="https://gardensuite.in/og/face-attendance-weight-price-v4.jpg"
	schema={[
		softwareSchema({
			name: 'GardenSuite Face Attendance & Smart Weighing',
			description: 'Face attendance and Bluetooth smart weighing software for tea gardens. Verifies workers, records leaf weight, works offline, and syncs data for payroll.',
			os: 'Android, Windows'
		}),
		breadcrumbSchema([
			{ name: 'Home', path: '/' },
			{ name: 'Products', path: '/#products' },
			{ name: 'Face Attendance & Smart Weighing', path: '/products/attendance' }
		])
	]}
/>

<div class="flex min-h-screen w-full flex-col overflow-clip bg-white antialiased">
	<main>
		<section class="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center border-b border-black bg-black overflow-hidden" aria-label="Hero">
			<!-- Full-screen video background -->
			<video
				bind:this={videoRef}
				src="/timeline.mp4"
				autoplay
				loop
				muted
				playsinline
				preload="metadata"
				class="absolute inset-0 z-0 h-full w-full object-cover opacity-50 brightness-[0.35]"
			>
				Your browser does not support the video tag.
			</video>

			<!-- Subtle grid pattern & color overlay for depth -->
			<div class="absolute inset-0 z-[1] bg-gradient-to-b from-black/30 via-transparent to-black/80"></div>
			<div class="dot-grid-dark absolute inset-0 z-[2] opacity-35"></div>

			<!-- Content Container -->
			<div class="relative z-10 mx-auto flex max-w-[1344px] flex-col items-center px-6 text-center md:px-12">
				<span class="mb-6 inline-block text-[13px] font-semibold tracking-[0.08em] text-white/70 uppercase">
					Attendance & Weighing
				</span>
				<h1 class="mx-auto max-w-4xl text-center text-[2.5rem] leading-[1.0] font-semibold tracking-[-0.04em] text-white sm:text-[3.25rem] md:text-[4.25rem] lg:text-[4.75rem]" style="text-wrap: balance">
					Verify the worker before weight reaches payroll.
				</h1>
				<p class="mx-auto mt-6 max-w-2xl text-center text-base leading-[1.6] text-white/85 sm:text-lg md:text-xl" style="text-wrap: balance">
					Face attendance checks the worker. The Bluetooth hanging scale records leaf weight against the same worker. Both work offline at the garden and sync when internet returns.
				</p>
				
				<ButtonGroup class="mt-8">
					<Button href={demoHref} label="Book Free Demo" variant="primary" showIcon />
					<Button href="#workflow" label="See Workflow" variant="secondary" />
				</ButtonGroup>
			</div>

			<!-- Play/Pause Control -->
			<button
				onclick={togglePlay}
				class="absolute bottom-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 border border-white/30 text-white shadow-sm hover:bg-white/25 active:scale-95 transition-all focus:outline-none"
				aria-label={isPlaying ? "Pause background video" : "Play background video"}
			>
				{#if isPlaying}
					<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
						<path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clip-rule="evenodd" />
					</svg>
				{:else}
					<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="ml-0.5">
						<path fill-rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd" />
					</svg>
				{/if}
			</button>
		</section>

		<AttendanceProductHero />

		<ProductTrustRow 
			stats={[
				{ value: 'Android', label: 'Field App' },
				{ value: 'Offline', label: 'Works Without Internet' },
				{ value: 'Since 2022', label: 'In Tea Gardens' }
			]}
			showOfflineBadge={false}
		/>

		<ProductProblemStrip
			tagText="The problem"
			headline="Attendance and leaf weight should not depend on paper."
			paragraph="Manual field registers create delay, errors, and disputes before payroll can be verified."
			{problems}
		/>

		<SolutionWorkflowSection
			tagText="The solution"
			headline="One field entry feeds attendance, leaf weight, payroll, and reports."
			paragraph="The supervisor does not need separate registers for attendance and weighing. The worker is verified, the kg is captured, and the record is ready for the office."
			paragraph2="Built by Sarbani Associates for tea estates, installed on-site, and made to work even when internet is not available."
			ctaText="Book Free Demo"
			ctaHref="/#contact"
			cardHeaderTag="Today"
			cardHeaderTitle="Field capture"
			steps={[
				{ label: 'Face check', meta: 'Worker identity verified before attendance' },
				{ label: 'Weight capture', meta: 'Bluetooth scale sends kg to the same record' },
				{ label: 'Offline save', meta: 'Field data is stored even without internet' },
				{ label: 'Office sync', meta: 'Payroll and reports use the captured data' }
			]}
			features={[
				{ title: 'Face verified', desc: 'Worker identity checked before attendance is recorded.' },
				{ title: 'Weight linked', desc: 'Bluetooth scale sends kg to the same worker record.' },
				{ title: 'Works offline', desc: 'Field data saved on the phone without internet.' },
				{ title: 'Ready for payroll', desc: 'Attendance and weight flow straight to office reports.' }
			]}
			showBackgroundImages={true}
		/>

		<div id="workflow">
			<ScaleWorkflow />
		</div>

		<ComparisonTable
			kicker="Why switch"
			headline="Paper registers vs GardenSuite"
			paragraph="The daily field workflow changes when attendance and leaf weight are captured digitally instead of paper."
			features={['Worker identity check', 'Leaf weight recording', 'Proxy attendance risk', 'Data reaches office', 'Offline capability', 'Payroll preparation']}
			paperLabel="Paper"
			paperResults={[false, false, false, false, true, false]}
			gsResults={[true, true, true, true, true, true]}
		/>

		<ProductRollout
			tagText="Rollout"
			headline="Sarbani Associates sets it up with your staff."
			paragraph="GardenSuite is not handed over as a self-service app. The Sarbani team visits, installs, trains, and supports the garden."
			steps={rollout}
		/>

		<LeadCapture
			title="Get the face attendance and weighing guide"
			subtitle="See how worker face, hazira, leaf weight, offline capture, and payroll records stay linked."
			buttonText="Email me the guide"
			tag="attendance-page"
			source="attendance-page"
			campaign="attendance-guide"
		/>

		<FaqSection
			heading="FAQs"
			subheading="About the face app and smart scale"
			contactHref="/#contact"
			categoryLabel="Face Attendance & Weighing"
			faqs={attendanceFaqs}
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
