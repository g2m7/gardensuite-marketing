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
			title: 'Map your process',
			desc: 'Confirm attendance and weighing.'
		},
		{
			step: '02',
			title: 'Train your staff',
			desc: 'Prepare devices and staff.'
		},
		{
			step: '03',
			title: 'Start field work',
			desc: 'Support the first live day.'
		}
	];

	const attendanceFaqs = [
		{
			q: 'Works without internet?',
			a: 'Yes. Records save offline and sync later.'
		},
		{
			q: 'Does it help stop proxy attendance?',
			a: 'Face and liveness checks verify the worker.'
		},
		{
			q: 'What if the scale disconnects?',
			a: 'Fallback options keep work moving. We confirm them during setup.'
		},
		{
			q: 'Can you show our workflow?',
			a: 'Yes. The demo follows your garden process.'
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
			footnote="Built by Sarbani Associates. Estate software details stay private."
		/>

		<AttendanceWorkflow />
		<AttendanceProductProof />

		<ProductRollout
			tagText=""
			headline="We set it up with your team."
			paragraph="Sarbani Associates sets up devices and trains staff on site."
			steps={rollout}
			actionHref={emailHref}
			actionLabel="Email Us"
			onAction={trackRolloutEmail}
		/>

		<FaqSection
			heading="Common questions."
			subheading=""
			contactNote=""
			contactHref="/#contact"
			categoryLabel=""
			faqs={attendanceFaqs}
			onOpen={trackFaq}
		/>

		<ProductCta
			tagText=""
			headline="See your workflow in the demo."
			paragraph="See face, weight and office review working together."
			demoHref="/#contact"
			secondaryHref={emailHref}
			supportNote=""
			expectationLine="Reply within 1 working day."
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
