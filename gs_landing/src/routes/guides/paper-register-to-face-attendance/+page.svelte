<script lang="ts">
	import ArticleLayout from '$lib/components/article/ArticleLayout.svelte';

	const guideFaqs = [
		{
			q: 'What data comes over from the paper register at migration?',
			a: 'Worker lists with permanent IDs, section assignments, task norms, and current deduction rules. Old muster history stays in the books; the new system starts recording from the go-live day.'
		},
		{
			q: 'How long is the parallel run?',
			a: 'About a week is usually enough. The office compares both records daily and switches a section off paper when muster, weighing, and review have run clean.'
		},
		{
			q: 'Will workers need to do anything different at muster?',
			a: 'The only change at the line is how hazira is marked: a worker looks at the tablet instead of having a mark written or a token handed over. Sections, timing, and muster practice stay the same.'
		},
		{
			q: 'What happens to months of paper records from before?',
			a: 'They stay as the estate record. Verified attendance starts from go-live, so the first months of the new system sit beside old books rather than replacing them retroactively.'
		},
		{
			q: 'What if supervisors resist the change?',
			a: 'The parallel run is the answer. Supervisors keep their register for a week, see the app record the same day faster, and keep control of the manual fallback path afterwards.'
		}
	];
</script>

<ArticleLayout
	title="Paper Register to Face Attendance - Migration Guide | GardenSuite"
	metaDescription="Migrate a tea garden from paper muster rolls to face attendance: data handover, parallel run, switchover, and first months. Built by Sarbani Associates."
	kicker="Implementation Guide"
	headline="Moving from Paper Register to Face Attendance"
	lede="A migration path for estates leaving the muster book: what to bring over, what to leave behind, and how to switch sections without stopping work."
	datePublished="2026-09-17"
	readTime={7}
	answer="Migration is a sequence, not a switchover day. First, move the identity data: workers, sections, work codes, norms, and deduction rules. Second, enroll workers and train supervisors. Third, run face attendance beside paper for about a week and compare daily. Fourth, switch sections off paper one at a time as their records come clean. Old muster books stay as the estate record; the new system begins recording from its own go-live day."
	ctaHeadline="Plan the migration with your muster books open"
	ctaParagraph="Sarbani Associates builds the migration around your current registers, then stays on site through the parallel run and the first live musters."
	related={[
		{
			label: 'Attendance and weighing rollout checklist',
			href: '/guides/attendance-rollout-checklist-tea-garden',
			note: 'The full rollout sequence this migration fits into.'
		},
		{
			label: 'Worker face enrollment guide',
			href: '/guides/worker-face-enrollment-tea-garden',
			note: 'How to capture the templates the new muster depends on.'
		},
		{
			label: 'How to stop proxy attendance in tea gardens',
			href: '/guides/stop-proxy-attendance-tea-garden',
			note: 'Why the paper register leaks hazira in the first place.'
		}
	]}
	faqs={guideFaqs}
	bottomCtaHeadline="Retire the muster book section by section"
	bottomCtaParagraph="Book a free demo. Sarbani Associates walks your office through the migration, from the first worker list to the last paper register. Demo, on-site setup, and staff training are free."
	breadcrumbs={[
		{ name: 'Home', path: '/' },
		{ name: 'Guides', path: '/guides' },
		{ name: 'Paper Register to Face Attendance', path: '/guides/paper-register-to-face-attendance' }
	]}
>
	<h2 class="guide-h2">1. Decide what moves and what stays</h2>
	<p class="guide-p">
		A paper register holds two different things, and migration treats them differently:
	</p>
	<ul class="guide-list">
		<li>
			<strong>Identity and rules.</strong> Worker lists, sections, work codes, task norms, deduction slabs.
			This data moves into the system, checked line by line against the register.
		</li>
		<li>
			<strong>Historic muster marks.</strong> These stay in the books. The new system records from its
			go-live day onward. Retroactive data entry burns weeks of staff time and changes nothing going forward.
		</li>
	</ul>
	<p class="guide-p">
		Making this split early keeps the migration short. Most estates that stall here are trying to
		re-enter history nobody will ever audit.
	</p>

	<h2 class="guide-h2">2. Move the identity data</h2>
	<p class="guide-p">
		Load workers with their permanent estate IDs and sections, then load the rules the field needs:
		tare, rainfall slabs, fine leaf settings, and task norms. Verify against the muster book section
		by section. Two checks catch most problems:
	</p>
	<ul class="guide-list">
		<li>
			<strong>Same name, different ID.</strong> Duplicate worker IDs across sections. Fix before enrollment,
			not after payroll.
		</li>
		<li>
			<strong>Rules that live in the clerk's head.</strong> Deductions applied differently by different
			sheds. Write down the actual slabs and make them explicit in the system.
		</li>
	</ul>

	<h2 class="guide-h2">3. Enroll and train</h2>
	<p class="guide-p">
		Enrollment and training follow the same practice as any rollout, but migration adds one rule:
		train supervisors on the manual fallback before the parallel run. When they know the app has a
		documented path for camera failures and unrecognized faces, resistance drops fast.
	</p>

	<h2 class="guide-h2">4. The parallel run</h2>
	<p class="guide-p">Run both systems for about a week. The comparison routine is simple:</p>
	<ol class="guide-steps">
		<li>Mark muster on paper as usual.</li>
		<li>Record the same muster in the app.</li>
		<li>At end of day, the office compares worker counts and exceptions.</li>
		<li>
			Note the differences and their cause: enrollment quality, device placement, or an honest
			manual entry.
		</li>
	</ol>
	<p class="guide-p">
		Differences should shrink every day. When a section's two records agree for a couple of days, it
		is ready to switch.
	</p>

	<h2 class="guide-h2">5. Switch, then close the books</h2>
	<p class="guide-p">
		Switch sections off paper one at a time. The register goes into the almirah the day the office
		reviews the app's record for that section without a difference. The first pay cycle on the new
		system is the real test, so keep support close until wages have run once from finalized app
		records.
	</p>
	<p class="guide-p">
		After that, the paper register becomes what it always should have been: a record of last resort,
		not the system.
	</p>
</ArticleLayout>
