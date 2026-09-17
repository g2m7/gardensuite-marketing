<script lang="ts">
	import ArticleLayout from '$lib/components/article/ArticleLayout.svelte';

	const guideFaqs = [
		{
			q: 'How long does a full rollout take?',
			a: 'Most estates can go live section by section within a few weeks. The pace depends on how many sections you start with and how quickly enrollment and training finish. Sarbani Associates gives you a dated schedule after the site visit.'
		},
		{
			q: 'Can the garden keep paper registers running alongside?',
			a: 'Yes, and we recommend it for the first week. The parallel run lets supervisors compare both systems daily and switch only when the office trusts the new records.'
		},
		{
			q: 'What hardware does the rollout need?',
			a: 'Field sections run the face attendance app on Android tablets with Bluetooth hanging scales for weighing. The office runs the GardenSuite office system on standard Windows computers. Exact requirements are confirmed at the site visit.'
		},
		{
			q: 'Who trains the staff?',
			a: 'Sarbani Associates trains supervisors, weighing staff, and office clerks on site, in simple language, and stays available during the first weeks of live use.'
		},
		{
			q: 'What if a section is not ready on the schedule?',
			a: 'The checklist is per section, so one late section does not hold the estate. Bring sections live in an order that matches their readiness rather than forcing one big switchover date.'
		}
	];
</script>

<ArticleLayout
	title="Tea Garden Attendance Rollout Checklist - Estates | GardenSuite"
	metaDescription="Rollout checklist for face attendance and smart weighing at tea gardens: site visit, device setup, enrollment, parallel run, and go-live. By Sarbani Associates."
	kicker="Implementation Guide"
	headline="Attendance and Weighing Rollout Checklist for Tea Gardens"
	lede="A section-by-section sequence for bringing face attendance and smart weighing live without stopping garden work."
	datePublished="2026-09-17"
	readTime={7}
	answer="Roll out in this order: site visit and workflow review, master data and device setup, worker enrollment, staff training, a one-week parallel run beside paper, then go-live section by section with office review from day one. Keep the muster practice unchanged in the field; change only how hazira and weight are captured. Each section moves on its own schedule, so one late line never holds the estate."
	ctaHeadline="Get a dated rollout plan for your estate"
	ctaParagraph="After a site visit, Sarbani Associates puts your rollout into a dated schedule with named sections, devices, and staff, then runs it with you."
	related={[
		{
			label: 'Paper register to face attendance',
			href: '/guides/paper-register-to-face-attendance',
			note: 'The migration details behind the parallel run and handover.'
		},
		{
			label: 'Worker face enrollment guide',
			href: '/guides/worker-face-enrollment-tea-garden',
			note: 'Capture practice, quality checks, and re-enrollment routine.'
		},
		{
			label: 'Face Attendance and Smart Weighing',
			href: '/products/attendance',
			note: 'The connected field-to-office system being rolled out.'
		}
	]}
	faqs={guideFaqs}
	bottomCtaHeadline="Roll out with support on the ground"
	bottomCtaParagraph="Book a free demo. Sarbani Associates runs the rollout beside your staff, from first site visit to go-live support. Demo, on-site setup, and staff training are free."
	breadcrumbs={[
		{ name: 'Home', path: '/' },
		{ name: 'Guides', path: '/guides' },
		{
			name: 'Attendance and Weighing Rollout Checklist for Tea Gardens',
			path: '/guides/attendance-rollout-checklist-tea-garden'
		}
	]}
>
	<h2 class="guide-h2">1. Site visit and workflow review</h2>
	<p class="guide-p">
		Start on the ground, not on a call. Walk the sections, watch one full muster and one weighment,
		and record the estate's actual practice:
	</p>
	<ul class="guide-list">
		<li>Which sections run muster where, and at what time.</li>
		<li>Weighment points, scale condition, and bag tare practice.</li>
		<li>Current task norms, deduction slabs, and fine leaf rules.</li>
		<li>Office workflow: who reviews attendance, who prepares wages.</li>
		<li>Connectivity at muster points, weighing sheds, and the office.</li>
	</ul>
	<p class="guide-p">
		The rollout plan comes from this list. Skipping the visit is the most common cause of a rollout
		that fights the garden's routine.
	</p>

	<h2 class="guide-h2">2. Master data and device setup</h2>
	<p class="guide-p">
		Before the first device reaches a line, load and check the records the field depends on:
	</p>
	<ol class="guide-steps">
		<li>Workers with their permanent estate IDs, sections, and roles.</li>
		<li>Sections, work codes, and task definitions.</li>
		<li>Rules: tare weights, rainfall slabs, fine leaf settings, task norms.</li>
		<li>Device users and permissions for each supervisor.</li>
		<li>Bluetooth scales paired and their tare configuration checked.</li>
	</ol>
	<p class="guide-p">
		Check this data against the muster book section by section. Every name fixed here is a dispute
		that never happens at payroll.
	</p>

	<h2 class="guide-h2">3. Enrollment and training</h2>
	<p class="guide-p">
		Capture enrollment photos section by section, following the capture practice in the enrollment
		guide. Then train the people who will run the system:
	</p>
	<ul class="guide-list">
		<li>
			<strong>Supervisors:</strong> muster, punch work, weighing, session handling, and the manual fallback.
		</li>
		<li>
			<strong>Weighing staff:</strong> scale pairing, tare, deductions, and what to do when Bluetooth
			drops.
		</li>
		<li>
			<strong>Office staff:</strong> review views, corrections, finalization, and exports.
		</li>
	</ul>
	<p class="guide-p">
		Keep the training in simple language and on the actual devices. A printed manual is no
		substitute for the first supervised muster.
	</p>

	<h2 class="guide-h2">4. The parallel run</h2>
	<p class="guide-p">
		Run face attendance beside the paper register for about a week. Supervisors get comfortable, and
		the office can compare both records daily. Expect a short list of fixes in week one: a few
		re-enrollments, a device placement change, a tare correction. That is the parallel run doing its
		job.
	</p>

	<h2 class="guide-h2">5. Go-live and the first month</h2>
	<p class="guide-p">
		Switch a section off paper when its muster, weighing, and office review have run clean through
		the parallel run. During the first month:
	</p>
	<ul class="guide-list">
		<li>Check sync status at end of day from every device.</li>
		<li>Review the office views daily until corrections become rare.</li>
		<li>Handle re-enrollments as they surface, not in a batch at month end.</li>
		<li>Keep Sarbani Associates support contact close for the first pay cycle.</li>
	</ul>
	<p class="guide-p">
		Section by section, the paper register retires itself. No big-bang date, no line stopped for a
		software change.
	</p>
</ArticleLayout>
