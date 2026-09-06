<script lang="ts">
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { articleSchema, breadcrumbSchema, faqSchema } from '$lib/seo/schemas';
	import Button from '$lib/components/Button.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup.svelte';
	import FaqSection from '$lib/components/product/FaqSection.svelte';

	const guideFaqs = [
		{
			q: 'Why do fingerprint biometric devices fail in tea gardens?',
			a: 'Tea pluckers and field laborers frequently have worn, callused fingertips or hands coated in tea sap and mud. Optical fingerprint sensors struggle to read these prints reliably, causing long queues and false rejections during morning muster.'
		},
		{
			q: 'How does offline face recognition help stop proxy hazira?',
			a: 'The camera scans the worker facial geometry in under one second on a standard mobile tablet. Because it requires the live individual in front of the camera, colleagues cannot punch or sign on behalf of absent workers.'
		},
		{
			q: 'What happens when there is no mobile network coverage at the plucking line?',
			a: 'GardenSuite stores the facial verification templates and attendance logs directly on the tablet hardware. No internet connection is needed to verify workers. The records sync when the tablet connects to office Wi-Fi or cellular network later.'
		},
		{
			q: 'Can supervisors alter attendance logs after roll-call?',
			a: 'No. Each face punch records a tamper-proof timestamp and photo verification log. Estate managers and accountants can review the original timestamp in the garden office.'
		}
	];
</script>

<SeoHead
	title="Stop Proxy Attendance in Tea Gardens - Estate Guide | GardenSuite"
	description="Practical guide for tea garden managers on stopping proxy hazira and muster roll errors using offline face recognition. Built by Sarbani Associates."
	canonical="https://gardensuite.in/guides/stop-proxy-attendance-tea-garden"
	breadcrumbs={[
		{ name: 'Home', path: '/' },
		{ name: 'Guides', path: '/#guides' },
		{ name: 'Stop Proxy Attendance in Tea Gardens', path: '/guides/stop-proxy-attendance-tea-garden' }
	]}
	schema={[
		articleSchema({
			title: 'How to Stop Proxy Attendance in Tea Gardens: A Practical Field Guide',
			description:
				'A complete field guide for tea estate managers and owners on eliminating proxy attendance and muster roll fraud using offline mobile face verification.',
			path: '/guides/stop-proxy-attendance-tea-garden',
			datePublished: '2026-09-06',
			dateModified: '2026-09-06'
		}),
		breadcrumbSchema([
			{ name: 'Home', path: '/' },
			{ name: 'Guides', path: '/#guides' },
			{ name: 'Stop Proxy Attendance in Tea Gardens', path: '/guides/stop-proxy-attendance-tea-garden' }
		]),
		faqSchema(guideFaqs)
	]}
/>

<!-- Guide Header -->
<header class="border-b border-[#E4E4E7] bg-white pt-28 pb-16 md:pt-36 md:pb-20">
	<div class="mx-auto max-w-3xl px-6 md:px-8">
		<div class="inline-block rounded-full bg-[#1B5E3B]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#1B5E3B]">
			Field Operations Guide
		</div>
		<h1 class="mt-6 text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl md:text-5xl">
			How to Stop Proxy Attendance in Tea Gardens
		</h1>
		<p class="mt-4 text-base leading-relaxed text-[#52525B] sm:text-lg">
			A practical guide for estate managers, directors, and head clerks on moving away from manual
			muster rolls to verified offline facial recognition.
		</p>
		<div class="mt-6 flex items-center gap-3 text-xs text-[#71717A]">
			<span>By Sarbani Associates</span>
			<span>•</span>
			<span>Updated September 2026</span>
			<span>•</span>
			<span>7 min read</span>
		</div>
	</div>
</header>

<!-- Article Content -->
<article class="bg-white py-16">
	<div class="mx-auto max-w-3xl px-6 text-[#27272A] md:px-8">
		<!-- Direct Answer Box (AEO / Featured Snippet target) -->
		<div class="rounded-2xl border-l-4 border-[#1B5E3B] bg-[#F4FBF7] p-6 text-base leading-relaxed text-[#1B5E3B]">
			<p class="font-semibold text-[#111111]">Direct Summary:</p>
			<p class="mt-1 text-[#27272A]">
				Proxy attendance in tea gardens occurs when absent workers receive daily hazira through manual
				register manipulation, duplicate tokens, or colleagues calling roll-call on their behalf. To
				prevent proxy attendance in remote tea plantations without reliable cellular coverage, estates
				deploy rugged mobile tablets with offline facial recognition. Facial geometry verifies the worker
				in under one second, links directly to plucking leaf scales, and syncs tamper-proof logs to the
				central payroll office.
			</p>
		</div>

		<!-- Section 1 -->
		<h2 class="mt-12 text-2xl font-bold text-[#111111]">1. The Hidden Cost of Proxy Attendance on Tea Estates</h2>
		<p class="mt-4 text-base leading-relaxed">
			In typical tea plantations across Assam, Dooars, and Terai, morning muster involves hundreds of
			pluckers assembling before sunrise across multiple out-garden divisions. Supervisors (munshis and
			sirdars) rely on physical registers or metal tokens to record hazira.
		</p>
		<p class="mt-4 text-base leading-relaxed">
			This manual workflow introduces three recurring vulnerabilities:
		</p>
		<ul class="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed">
			<li><strong>Buddy punching:</strong> One worker answering or presenting tokens for an absent relative or neighbor.</li>
			<li><strong>Muster roll discrepancies:</strong> Manual marks scribbled in ledger books that cannot be audited against physical attendance at the field lines.</li>
			<li><strong>Ghost worker payments:</strong> Continued payroll disbursement for workers who have migrated, left the garden, or taken unauthorized leave.</li>
		</ul>

		<!-- Section 2 -->
		<h2 class="mt-12 text-2xl font-bold text-[#111111]">2. Why Fingerprint Scanners Fail in Tea Garden Conditions</h2>
		<p class="mt-4 text-base leading-relaxed">
			Many tea estates have attempted to introduce traditional optical fingerprint biometric devices, only
			to abandon them within months. The reasons are inherent to agricultural field work:
		</p>
		<div class="mt-6 rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] p-6">
			<ul class="space-y-4 text-sm text-[#52525B]">
				<li>
					<strong class="text-[#111111]">Sap and Mud Residue:</strong> Pluckers work with green leaf that coats hands in natural resin, soil, and moisture, blinding optical sensors.
				</li>
				<li>
					<strong class="text-[#111111]">Worn Fingerprints:</strong> Decades of manual labor flatten fingerprint ridges, resulting in high false rejection rates.
				</li>
				<li>
					<strong class="text-[#111111]">Queue Delays:</strong> When a sensor fails 3 or 4 times per worker, morning muster stretches from 15 minutes to over an hour, delaying plucking.
				</li>
			</ul>
		</div>

		<!-- Section 3 -->
		<h2 class="mt-12 text-2xl font-bold text-[#111111]">3. The Solution: Offline Mobile Face Recognition</h2>
		<p class="mt-4 text-base leading-relaxed">
			Modern computer vision solves these environmental constraints. By utilizing mobile tablets equipped
			with dedicated offline facial recognition, tea gardens gain several practical advantages:
		</p>
		<ol class="mt-4 list-decimal space-y-3 pl-6 text-base leading-relaxed">
			<li>
				<strong>Hands-Free Scanning:</strong> Workers simply glance at the tablet screen. Plucking sap or mud on hands has zero impact on verification.
			</li>
			<li>
				<strong>Speed:</strong> Verification takes less than one second per person, processing a line of 200 workers in under 10 minutes.
			</li>
			<li>
				<strong>100% Offline Capability:</strong> Biometric facial templates reside locally on the hardware. Verification requires no active internet connection or SIM card.
			</li>
			<li>
				<strong>Automatic Link to Weighing:</strong> Once verified, the worker ID is instantly passed to the digital plucking scale during midday and evening weighment.
			</li>
		</ol>

		<!-- Section 4 -->
		<h2 class="mt-12 text-2xl font-bold text-[#111111]">4. Implementation Checklist for Estate Managers</h2>
		<p class="mt-4 text-base leading-relaxed">
			When rolling out biometric face attendance on your estate, follow this 4-step sequence:
		</p>
		<div class="mt-6 space-y-4">
			<div class="rounded-xl border border-[#E4E4E7] p-5">
				<h3 class="font-semibold text-[#111111]">Step A: Worker Photo Enrolment</h3>
				<p class="mt-1 text-sm text-[#52525B]">
					Capture 2 clear reference photos per worker during weekly wage disbursement. Store records under their permanent estate worker ID and PF account number.
				</p>
			</div>
			<div class="rounded-xl border border-[#E4E4E7] p-5">
				<h3 class="font-semibold text-[#111111]">Step B: Division-Level Tablet Assignment</h3>
				<p class="mt-1 text-sm text-[#52525B]">
					Provide each section supervisor or munshi with a rugged tablet configured for their specific line list.
				</p>
			</div>
			<div class="rounded-xl border border-[#E4E4E7] p-5">
				<h3 class="font-semibold text-[#111111]">Step C: Parallel Roll-Call Run (1 Week)</h3>
				<p class="mt-1 text-sm text-[#52525B]">
					Run face attendance alongside manual registers for 5-7 days so sirdars become comfortable and workers understand the screen feedback.
				</p>
			</div>
			<div class="rounded-xl border border-[#E4E4E7] p-5">
				<h3 class="font-semibold text-[#111111]">Step D: Central Office Sync & Audit</h3>
				<p class="mt-1 text-sm text-[#52525B]">
					At the end of morning muster, sync tablets at the division office or main garden Wi-Fi. The head clerk verifies total attendance before field deployment.
				</p>
			</div>
		</div>

		<!-- Internal Link & Product Mention -->
		<div class="mt-12 rounded-2xl border border-[#1B5E3B]/20 bg-[#F4FBF7] p-8 text-center">
			<h3 class="text-xl font-semibold text-[#111111]">
				Explore GardenSuite Face Attendance
			</h3>
			<p class="mx-auto mt-2 max-w-xl text-sm text-[#52525B]">
				GardenSuite provides field-tested offline face recognition tablets engineered specifically for tea
				plantations. Supported by Sarbani Associates with complete on-site setup and staff training.
			</p>
			<ButtonGroup class="mt-6 justify-center">
				<Button href="/products/attendance/face-attendance" label="See Face Attendance Features" variant="primary" />
				<Button href="/#contact" label="Book On-Site Demo" variant="secondary" />
			</ButtonGroup>
		</div>
	</div>
</article>

<!-- FAQs Section -->
<FaqSection faqs={guideFaqs} />
