<script lang="ts">
	import { onMount } from 'svelte';
	import { trackEvent } from '$lib/analytics';
	import { initScrollReveal } from '$lib/scroll-reveal';
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { breadcrumbSchema, faqSchema, softwareSchema } from '$lib/seo/schemas';
	import FaqSection from '$lib/components/product/FaqSection.svelte';
	import ProductCta from '$lib/components/product/ProductCta.svelte';
	import ProductRollout from '$lib/components/product/ProductRollout.svelte';
	import ProductTrustRow from '$lib/components/product/ProductTrustRow.svelte';
	import AttendanceProductHero from './AttendanceProductHero.svelte';
	import AttendanceProductProof from './AttendanceProductProof.svelte';
	import AttendanceWorkflow from './AttendanceWorkflow.svelte';

	onMount(() => initScrollReveal());

	const emailHref =
		'mailto:sarbaniassociates@gmail.com?subject=GardenSuite%20Attendance%20and%20Smart%20Weighing';

	const rollout = [
		{
			step: '01',
			title: 'Day 1: Process mapping',
			desc: 'Confirm the attendance, weighing and office flow.'
		},
		{
			step: '02',
			title: 'Day 2: Staff training',
			desc: 'Prepare devices and train field and office staff.'
		},
		{
			step: '03',
			title: 'Day 3: Live operations support',
			desc: 'Stay with the team as regular field work begins.'
		}
	];

	const attendanceFaqs = [
		{
			q: 'Will it work without internet?',
			a: 'Yes. The field app saves records locally and syncs when a connection is available.'
		},
		{
			q: 'Does it help stop proxy attendance?',
			a: 'Face verification and liveness checks help confirm the worker before saving attendance.'
		},
		{
			q: 'What if the scale cannot connect?',
			a: 'Supported fallback options keep field work moving. The exact setup is confirmed during rollout.'
		},
		{
			q: 'Can we see our own workflow?',
			a: "Yes. The demo can focus on your garden's attendance, plucking and office process."
		}
	];

	function trackRolloutEmail() {
		trackEvent('attendance_cta_click', { placement: 'rollout', action: 'email' });
	}

	function trackFinalDemo() {
		trackEvent('attendance_cta_click', { placement: 'final', action: 'book_demo' });
	}

	function trackFinalEmail() {
		trackEvent('attendance_cta_click', { placement: 'final', action: 'email' });
	}

	function trackFaq(index: number) {
		trackEvent('attendance_faq_open', { question_index: index + 1 });
	}
</script>

<SeoHead
	title="Tea Garden Attendance System - Face & Weighing | GardenSuite"
	description="Face attendance and Bluetooth smart weighing for tea gardens. Verify workers, record leaf weight, work offline, and sync data for payroll."
	canonical="https://gardensuite.in/products/attendance"
	ogImage="https://gardensuite.in/og/attendance-media-placeholder.webp"
	schema={[
		softwareSchema({
			name: 'GardenSuite Face Attendance & Smart Weighing',
			description:
				'Face attendance and Bluetooth smart weighing software for tea gardens. Verifies workers, records leaf weight, works offline, and syncs data for payroll.',
			os: 'Android, Windows, Web',
			featureList: [
				'Face attendance for tea garden workers',
				'Bluetooth leaf weight capture',
				'Offline field record saving',
				'Office review and payroll data sync'
			]
		}),
		breadcrumbSchema([
			{ name: 'Home', path: '/' },
			{ name: 'Products', path: '/#products' },
			{ name: 'Face Attendance & Smart Weighing', path: '/products/attendance' }
		]),
		faqSchema(attendanceFaqs)
	]}
/>

<div class="flex min-h-screen w-full flex-col overflow-clip bg-white antialiased">
	<main>
		<AttendanceProductHero />

		<ProductTrustRow
			stats={[
				{ value: '20+', label: 'Tea estates' },
				{ value: '7', label: 'Tea-growing regions' },
				{ value: 'Since 2000', label: 'Tea garden software' },
				{ value: 'On-site', label: 'Setup and staff training' }
			]}
			showOfflineBadge={false}
			footnote="Built and supported by Sarbani Associates, Bagdogra, Siliguri. Many estates keep software details private, so we share region-level experience."
		/>

		<AttendanceWorkflow />
		<AttendanceProductProof />

		<ProductRollout
			tagText="Supported rollout"
			headline="Your team is not left to set it up alone."
			paragraph="Sarbani Associates maps the process, sets up devices and trains field and office staff at the garden."
			steps={rollout}
			actionHref={emailHref}
			actionLabel="Email Us"
			onAction={trackRolloutEmail}
		/>

		<FaqSection
			heading="What buyers ask first."
			subheading="Short answers about field use and rollout."
			contactHref="/#contact"
			categoryLabel="Face Attendance & Smart Weighing"
			faqs={attendanceFaqs}
			onOpen={trackFaq}
		/>

		<ProductCta
			tagText="See the working flow"
			headline="Bring one garden workflow to the demo."
			paragraph="We will show how worker verification, leaf weight, offline capture and office review fit together."
			demoHref="/#contact"
			secondaryHref={emailHref}
			supportNote="Many estates keep software details private. We respect confidentiality and share region-level experience."
			expectationLine="Reply within 1 working day. Demo scheduling comes from the Sarbani team."
			buyers={[]}
			onPrimaryClick={trackFinalDemo}
			onSecondaryClick={trackFinalEmail}
		/>
	</main>
</div>

<style>
	:global(.reveal-on-scroll.reveal-ready) {
		opacity: 0;
		transform: translateY(24px);
		transition:
			opacity 0.7s ease-out,
			transform 0.7s ease-out;
	}

	:global(.reveal-on-scroll.reveal-ready.is-visible) {
		opacity: 1;
		transform: translateY(0);
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.reveal-on-scroll.reveal-ready) {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
</style>
