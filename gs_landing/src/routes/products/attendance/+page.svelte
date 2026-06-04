<script lang="ts">
	import { onMount } from 'svelte';
	import { initScrollReveal } from '$lib/scroll-reveal';
	import AppShowcase from './AppShowcase.svelte';
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { softwareSchema, breadcrumbSchema } from '$lib/seo/schemas';

	// Shared layout components
	import ProductTrustRow from '$lib/components/product/ProductTrustRow.svelte';
	import ProductProblemStrip from '$lib/components/product/ProductProblemStrip.svelte';
	import ProductSolutionMockup from '$lib/components/product/ProductSolutionMockup.svelte';
	import ProductRollout from '$lib/components/product/ProductRollout.svelte';
	import ProductCardFrame from '$lib/components/product/ProductCardFrame.svelte';

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
				<span class="mb-6 inline-block rounded-full bg-white/10 border border-white/20 px-3.5 py-1 text-[11px] font-semibold tracking-[0.05em] text-white uppercase backdrop-blur">
					Attendance & Weighing
				</span>
				<h1 class="mx-auto max-w-4xl text-center text-[2.5rem] leading-[1.0] font-semibold tracking-[-0.04em] text-white sm:text-[3.25rem] md:text-[4.25rem] lg:text-[4.75rem]" style="text-wrap: balance">
					Verify the worker before weight reaches payroll.
				</h1>
				<p class="mx-auto mt-6 max-w-2xl text-center text-base leading-[1.6] text-white/85 sm:text-lg md:text-xl" style="text-wrap: balance">
					Face attendance checks the worker. The Bluetooth hanging scale records leaf weight against the same worker. Both work offline at the garden and sync when internet returns.
				</p>
				
				<div class="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
					<a href={demoHref} class="flex w-full items-center justify-center gap-2 rounded-full bg-[#1B5E3B] px-6 py-4 shadow-[0_4px_20px_rgba(27,94,59,0.3)] transition duration-150 hover:bg-[#144723] focus:outline-none active:scale-[0.97] sm:w-auto">
						<span class="text-sm font-semibold text-white">Book Free Demo</span>
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="shrink-0"><path d="M5 2.5l4.5 4.5L5 11.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
					</a>
					<a href="#workflow" class="flex w-full items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition duration-150 hover:bg-white/20 hover:border-white/30 focus:outline-none active:scale-[0.97] sm:w-auto text-white backdrop-blur">
						<span class="text-sm font-semibold">See Workflow</span>
					</a>
				</div>
			</div>

			<!-- Play/Pause Control -->
			<button
				onclick={togglePlay}
				class="absolute bottom-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white shadow-sm hover:bg-white/20 active:scale-95 transition-all backdrop-blur focus:outline-none"
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

		<ProductTrustRow 
			stats={[
				{ value: '20+', label: 'Tea Estates' },
				{ value: '7', label: 'Regions' },
				{ value: 'Since 2000', label: 'In Tea Gardens' }
			]}
			showOfflineBadge={true}
		/>

		<ProductProblemStrip
			tagText="The problem"
			headline="Attendance and leaf weight should not depend on paper."
			paragraph="Manual field registers create delay, errors, and disputes before payroll can be verified."
			{problems}
		/>

		<ProductSolutionMockup
			tagText="The solution"
			headline="One field entry feeds attendance, leaf weight, payroll, and reports."
			paragraph="The supervisor does not need separate registers for attendance and weighing. The worker is verified, the kg is captured, and the record is ready for the office."
			cardHeaderTag="Today"
			cardHeaderTitle="Field capture"
			steps={proofRows}
		/>

		<div id="workflow">
			<AppShowcase />
		</div>

		<ProductRollout
			tagText="Rollout"
			headline="Sarbani Associates sets it up with your staff."
			paragraph="GardenSuite is not handed over as a self-service app. The Sarbani team visits, installs, trains, and supports the garden."
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
