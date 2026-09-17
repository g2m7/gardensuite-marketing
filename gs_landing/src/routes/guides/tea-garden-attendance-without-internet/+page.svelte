<script lang="ts">
	import ArticleLayout from '$lib/components/article/ArticleLayout.svelte';

	const guideFaqs = [
		{
			q: 'Can attendance and weighing run in a section with no mobile network?',
			a: 'Yes. The field app saves every record on the tablet itself. Verification, weighing, and session work all continue offline. Records upload when the device reaches office Wi-Fi or a network area.'
		},
		{
			q: 'How do I know which records have not synced yet?',
			a: 'The field app shows pending, synced, and failed states for each record. The supervisor can open the sync view at any point and see what is waiting and what failed.'
		},
		{
			q: 'What happens to a record that fails to sync?',
			a: 'Failed records stay on the device with their error state. The supervisor can retry, and if a record is rejected, the office can see the reason through the sync status views.'
		},
		{
			q: 'Does offline mode change the rules for deductions and tasks?',
			a: 'No. Tare, rainfall slabs, tasks, and work codes are stored on the device, so the same rules apply whether or not the garden has signal.'
		},
		{
			q: 'What if a tablet is lost or damaged in the field?',
			a: 'Records saved but not yet synced stay only on that device, which is why end-of-day sync is part of the routine. Face template backups can be exported in a password-protected encrypted file for authorized restore.'
		}
	];
</script>

<ArticleLayout
	title="Tea Garden Attendance Without Internet - Offline Guide | GardenSuite"
	metaDescription="How tea garden attendance and weighing keep working with no internet: local saving, record states, retries, and sync. Built for estates by Sarbani Associates."
	kicker="Reliability Guide"
	headline="Tea Garden Attendance Without Internet"
	lede="What the field app does in dead zones, how pending and failed records are handled, and what happens when connectivity returns."
	datePublished="2026-09-17"
	readTime={6}
	answer="The field app never depends on the network during work. Workers, tasks, work codes, and rules are refreshed on the device before the day starts. During muster and weighing, every record saves to the tablet's local storage and shows its state: pending, synced, or failed. When the device comes back into coverage, pending records upload and the office reviews them. Work in the section never has to stop for signal."
	ctaHeadline="Test offline mode on your worst section"
	ctaParagraph="Give Sarbani Associates your weakest coverage line and we will run the demo there. Offline reliability is proven in the field, not in a brochure."
	related={[
		{
			label: 'Offline attendance and office sync',
			href: '/products/attendance/offline-sync',
			note: 'Product detail on local saving, retries, and office review.'
		},
		{
			label: 'How mobile attendance reaches the estate office',
			href: '/guides/mobile-attendance-to-estate-office',
			note: 'The full sync path from tablet to office, step by step.'
		},
		{
			label: 'Daily Report (MIS dashboard)',
			href: '/products/mis',
			note: 'What owners and managers see once office data is synced.'
		}
	]}
	faqs={guideFaqs}
	bottomCtaHeadline="Software that works where your sections are"
	bottomCtaParagraph="Book a free demo. Sarbani Associates sets up the field app, smart scale, and office review around your garden's actual coverage. Demo, on-site setup, and staff training are free."
	breadcrumbs={[
		{ name: 'Home', path: '/' },
		{ name: 'Guides', path: '/guides' },
		{
			name: 'Tea Garden Attendance Without Internet',
			path: '/guides/tea-garden-attendance-without-internet'
		}
	]}
>
	<h2 class="guide-h2">1. Why connectivity decides everything in the field</h2>
	<p class="guide-p">
		Most estate software fails at the same point: it assumes the internet is there. Out-garden
		divisions, valley lines, and weighing sheds often have none. A cloud app that cannot reach its
		server either stops the line or pushes staff back to paper registers, and then the records have
		to be re-entered later.
	</p>
	<p class="guide-p">
		GardenSuite takes the opposite approach. The device holds what the field needs, and the network
		is only used when it happens to be available.
	</p>

	<h2 class="guide-h2">2. Before the day: data moves to the device</h2>
	<p class="guide-p">Before workers arrive, the tablet is refreshed with what the field needs:</p>
	<ul class="guide-list">
		<li>Workers and their face templates for the sections assigned to the device.</li>
		<li>Sections, work codes, and tasks for the day.</li>
		<li>Estate rules: tare, rainfall deduction slabs, fine leaf settings, task norms.</li>
		<li>Configuration updates from the office.</li>
	</ul>
	<p class="guide-p">
		Once this is on the device, the section is self-sufficient for the whole day.
	</p>

	<h2 class="guide-h2">3. During the day: records save locally</h2>
	<p class="guide-p">
		Every capture writes straight to the tablet's local storage: attendance, punch work, harvest
		weights, session details, GPS context. The record immediately shows a state:
	</p>
	<ul class="guide-list">
		<li>
			<strong>Pending.</strong> Saved on the device, waiting for connectivity.
		</li>
		<li>
			<strong>Synced.</strong> Uploaded to the office system.
		</li>
		<li>
			<strong>Failed.</strong> The upload was rejected or interrupted. The record stays on the device
			with its error state so it can be retried.
		</li>
	</ul>
	<p class="guide-p">
		The supervisor can open the sync view at any point in the day and know exactly where the estate
		stands. Nothing is lost because a signal dropped at noon.
	</p>

	<h2 class="guide-h2">4. When internet returns: sync and retry</h2>
	<p class="guide-p">
		When the device reaches office Wi-Fi or a coverage area, pending records upload. The supervisor
		then reviews what came back:
	</p>
	<ol class="guide-steps">
		<li>Check which records uploaded and which were rejected or failed.</li>
		<li>Retry failed records where the cause is clear.</li>
		<li>Confirm recent records and session summaries on the device.</li>
		<li>Leave anything unresolved visible to the office rather than deleting it.</li>
	</ol>
	<p class="guide-p">
		The office side shows the same truth from the other direction: sync status, recent activity, and
		every record's source and status. Nothing disappears quietly.
	</p>

	<h2 class="guide-h2">5. What this changes for the estate</h2>
	<p class="guide-p">
		Office staff stop reconciling paper against spreadsheets. Managers stop waiting for slips from
		out-divisions. And coverage stops being a reason for a section to run blind, because the day's
		records are already sitting on the tablet the whole time.
	</p>
</ArticleLayout>
