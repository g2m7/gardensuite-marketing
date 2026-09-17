<script lang="ts">
	import ArticleLayout from '$lib/components/article/ArticleLayout.svelte';
	import MediaPlaceholder from '$lib/components/article/MediaPlaceholder.svelte';

	const guideFaqs = [
		{
			q: 'Does face attendance work without internet?',
			a: 'Yes. Face verification runs on the device itself. Attendance records save locally and sync to the office when connectivity returns.'
		},
		{
			q: 'What happens if the app does not recognize a worker?',
			a: 'The supervisor retries. If the match stays ambiguous, the app rejects it and the supervisor can record manual attendance with a remark. Workers whose appearance has changed can be re-enrolled on the device.'
		},
		{
			q: 'Can face attendance be fooled by a photo?',
			a: 'The app runs liveness and face quality checks before it accepts a match, which helps prevent spoofing. No system is perfect, which is why ambiguous matches are rejected instead of guessed.'
		},
		{
			q: 'Does face attendance replace the muster roll?',
			a: 'It replaces the marking of hazira. The app keeps a record for every verified and manual entry, and the office reviews, corrects, and finalizes it before it moves toward payroll.'
		},
		{
			q: 'How long does morning muster take with face attendance?',
			a: 'A line moves as fast as workers can step up to the tablet. Actual times depend on your sections and lines, which is why we recommend the parallel run before switching off paper.'
		}
	];
</script>

<ArticleLayout
	title="How Face Attendance Works in a Tea Garden - Guide | GardenSuite"
	metaDescription="How face attendance works at a tea garden: muster verification, liveness checks, manual fallback, and office review. Built for estates by Sarbani Associates."
	kicker="Field Operations Guide"
	headline="How Face Attendance Works in a Tea Garden"
	lede="The full flow from morning muster to a verified record: what the worker sees, what the supervisor sees, and what the office checks."
	datePublished="2026-09-17"
	readTime={6}
	answer="At muster, the worker looks at the tablet camera. The app checks face quality and liveness on the device, then matches the face against enrolled templates saved locally. A confirmed match marks hazira with the worker, section, work code, and time attached. If the match is ambiguous, the app rejects it and the supervisor retries or records manual attendance with a reason. Everything saves on the tablet without internet and syncs to the estate office later for review."
	ctaHeadline="Run your own muster through the demo"
	ctaParagraph="Sarbani Associates configures the field app with your sections, work codes, and muster practice, then trains your supervisors on site."
	related={[
		{
			label: 'Face attendance for tea gardens',
			href: '/products/attendance/face-attendance',
			note: 'Product detail on verification, punch work, and enrollment.'
		},
		{
			label: 'How to stop proxy attendance in tea gardens',
			href: '/guides/stop-proxy-attendance-tea-garden',
			note: 'Why muster leaks hazira and how verification helps stop it.'
		},
		{
			label: 'Tea garden attendance without internet',
			href: '/guides/tea-garden-attendance-without-internet',
			note: 'What happens to records in dead zones and how sync recovers them.'
		}
	]}
	faqs={guideFaqs}
	bottomCtaHeadline="See face attendance at your muster point"
	bottomCtaParagraph="Book a free demo. Sarbani Associates brings the field app to your garden, runs it through one full muster, and trains your staff. Demo, on-site setup, and staff training are free."
	breadcrumbs={[
		{ name: 'Home', path: '/' },
		{ name: 'Guides', path: '/guides' },
		{
			name: 'How Face Attendance Works in a Tea Garden',
			path: '/guides/how-face-attendance-works-tea-garden'
		}
	]}
>
	{#snippet media()}
		<MediaPlaceholder
			type="video"
			aspect="16 / 9"
			internal
			label="MEDIA PLACEHOLDER A: one full morning muster recorded on the field app, approved demo data only."
			caption="A full muster captured on the field app. Added here once an approved recording with sanitized demo data is ready."
		/>
	{/snippet}

	<h2 class="guide-h2">1. Before muster: the device is prepared</h2>
	<p class="guide-p">
		Face attendance starts before any worker arrives. Each supervisor's tablet is configured with
		the sections, work codes, and rules for their lines. Worker lists and face templates are
		refreshed on the device, and the day's plucking tasks arrive from the office. When a supervisor
		walks to the line, the tablet already knows who it should expect.
	</p>

	<h2 class="guide-h2">2. At muster: the verification flow</h2>
	<p class="guide-p">Each verification follows the same short sequence:</p>
	<ol class="guide-steps">
		<li>
			<strong>The worker looks at the camera.</strong> No fingers, no tokens, no contact with the device.
		</li>
		<li>
			<strong>Face quality and liveness checks run first.</strong> The app checks that a live person is
			in front of the camera, not a photo or a screen, and that the face is captured well enough to match.
		</li>
		<li>
			<strong>The match happens on the device.</strong> The app compares the capture against templates
			stored on the tablet. No internet is needed.
		</li>
		<li>
			<strong>A confirmed match saves the record.</strong> Worker, section, work code, and time are written
			together. If the estate uses punch work, the record also carries the punch type.
		</li>
	</ol>
	<p class="guide-p">
		Once one worker is done, the next steps up. The line keeps moving because nothing in the flow
		depends on a network.
	</p>

	<h2 class="guide-h2">3. When verification does not go through</h2>
	<p class="guide-p">
		Face attendance is only trustworthy if it is honest about failure. Three situations come up in
		real gardens, and each has a documented path:
	</p>
	<ul class="guide-list">
		<li>
			<strong>Ambiguous match.</strong> If two workers are close matches or the capture is poor, the app
			rejects the result instead of picking the closest guess. The supervisor retries.
		</li>
		<li>
			<strong>Changed appearance.</strong> A worker with a new beard, spectacles, or illness can be re-enrolled
			on the device with fresh photos. Re-enrollment is a normal maintenance task, not an emergency.
		</li>
		<li>
			<strong>Camera or device problem.</strong> The supervisor records manual attendance with a remark.
			The record is marked manual, so the office can review it with everything else.
		</li>
	</ul>
	<p class="guide-p">
		The fallback keeps the line moving, and the record always shows which path it took. That is what
		helps stop proxy attendance: the app never silently accepts an uncertain face.
	</p>

	<h2 class="guide-h2">4. After muster: what the record holds</h2>
	<p class="guide-p">Every attendance record carries its context, not just a mark:</p>
	<ul class="guide-list">
		<li>Worker identity, verified by face or recorded as manual with a remark.</li>
		<li>Section, work code, and session the record belongs to.</li>
		<li>Time of capture, and punch details for repeated time-in or time-out work.</li>
		<li>Device and user who captured it, so the office can trace any record to its source.</li>
	</ul>

	<h2 class="guide-h2">5. In the office: review and finalize</h2>
	<p class="guide-p">
		When tablets connect to the office network, records upload. The office opens the attendance
		views to check the day: worker-wise summaries, raw records, sessions, and sync status. Staff can
		see which records are accepted, which failed, and which were manual, then make permitted
		corrections and finalize the day for the estate workflow.
	</p>
	<p class="guide-p">
		That final review is the difference between a register and a system. The field captures what
		happened; the office confirms it before payroll sees it.
	</p>
</ArticleLayout>
