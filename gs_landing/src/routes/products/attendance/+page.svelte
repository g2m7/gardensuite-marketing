<script lang="ts">
	import { onMount } from 'svelte';
	import { initScrollReveal } from '$lib/scroll-reveal';
	import AppShowcase from './AppShowcase.svelte';
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { softwareSchema, breadcrumbSchema } from '$lib/seo/schemas';

	// Shared layout components
	import ProductHero from '$lib/components/product/ProductHero.svelte';
	import ProductTrustRow from '$lib/components/product/ProductTrustRow.svelte';
	import ProductProblemStrip from '$lib/components/product/ProductProblemStrip.svelte';
	import ProductSolutionMockup from '$lib/components/product/ProductSolutionMockup.svelte';
	import ProductRollout from '$lib/components/product/ProductRollout.svelte';

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
		<ProductHero
			badgeText="Attendance & Weighing"
			headline="Verify the worker before weight reaches payroll."
			paragraph="Face attendance checks the worker. The Bluetooth hanging scale records leaf weight against the same worker. Both work offline at the garden and sync when internet returns."
			{demoHref}
			workflowHref="#workflow"
		>
			<!-- Centered mockup visual inside hero slot -->
			<div class="relative mx-auto mt-16 w-full max-w-[960px] rounded-[28px] border border-white/60 bg-[#DDEFE4] p-5 shadow-[0_24px_62px_rgba(15,46,12,0.1)] md:p-8 lg:p-10">
				<div class="absolute inset-0 z-0 bg-gradient-to-b from-[#F8FAF8] to-[#E8F3ED] opacity-90 rounded-[28px]"></div>
				<div class="dot-grid-light absolute inset-0 z-0 opacity-40 rounded-[28px]"></div>
				
				<div class="relative z-10 grid items-center gap-8 md:grid-cols-2">
					<div class="flex justify-center">
						<div class="device-frame-phone w-full max-w-[270px]">
							<div class="device-frame-phone-inner aspect-[9/19.5]">
								<img
									src="/screenshots/13_attendance_result_matched.png"
									alt="GardenSuite face attendance app showing verified worker result"
									width="1080"
									height="2400"
									class="h-full w-full object-cover object-top"
									fetchpriority="high"
								/>
							</div>
						</div>
					</div>
					
					<div class="flex flex-col items-center justify-center p-2">
						<div class="w-full max-w-[340px] rounded-2xl border border-white/85 bg-white/95 p-6 shadow-[0_14px_34px_rgba(15,23,42,0.06)] md:p-8">
							<div class="flex items-center justify-center rounded-xl bg-[#F8FAF8] p-5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
								<img
									src="/bluetooth-scale.svg"
									alt="Bluetooth hanging scale used with GardenSuite smart weighing"
									width="512"
									height="512"
									class="h-auto w-full max-w-[180px]"
									fetchpriority="high"
								/>
							</div>
							<h3 class="mt-6 text-center text-[16px] font-semibold text-[#111111] tracking-tight">
								Wireless leaf weight capture
							</h3>
							<p class="mt-2 text-center text-[13px] leading-[1.55] text-[#52525B]">
								Scale sends kg values directly to the verified worker record via Bluetooth.
							</p>
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
