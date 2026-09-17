<script lang="ts">
	import ArticleLayout from '$lib/components/article/ArticleLayout.svelte';

	const guideFaqs = [
		{
			q: 'What is punch attendance in a tea garden?',
			a: 'Punch attendance records repeated time-in and time-out marks for a worker during a day. It covers breaks, split shifts, and work that starts and stops, such as factory hours or overtime.'
		},
		{
			q: 'How does the app handle overtime work?',
			a: 'Overtime is captured as punch records tied to the verified worker, with time-in and time-out stamps. The office reviews the punches when preparing the wage sheet, and overtime rates follow your wage settlement.'
		},
		{
			q: 'Can a worker record a punch without a face check?',
			a: 'Punches run through the same face verification as hazira. If the camera or match fails, the supervisor records manual attendance with a remark, and the office sees which records were manual.'
		},
		{
			q: 'How do split shifts work in the records?',
			a: 'Each time-in and time-out is its own punch record within the day. The office view shows the full sequence per worker, so split shifts are visible as they actually happened instead of reconstructed later.'
		},
		{
			q: 'Do punch records reach payroll?',
			a: 'Reviewed and finalized punch records prepare for export along with hazira and weight data. Overtime rates and their calculation follow your estate wage settlement and are confirmed during setup.'
		}
	];
</script>

<ArticleLayout
	title="Punch Attendance, Split Shifts and Overtime Guide | GardenSuite"
	metaDescription="How punch attendance captures split shifts, breaks, and overtime at tea gardens, and how the office reviews them. Built for estates by Sarbani Associates."
	kicker="Field Operations Guide"
	headline="Punch Attendance, Split Shifts and Overtime in Tea Gardens"
	lede="Hazira answers who worked. Punches answer when and how long. Here is how repeated time records work in the field and what the office does with them."
	datePublished="2026-09-17"
	readTime={6}
	answer="Punch attendance records a verified time-in and time-out each time a worker enters or leaves work. Repeated punches across the day capture breaks, split shifts, and overtime as they actually happen, each tied to the face-verified worker. The office reviews the punch sequence per worker, checks exceptions, and includes reviewed punches in the finalized record that prepares for payroll."
	ctaHeadline="See punch work recorded in one live shift"
	ctaParagraph="Sarbani Associates demonstrates punch attendance through a real split shift, including the manual fallback path supervisors use when the camera fails."
	related={[
		{
			label: 'Face attendance for tea gardens',
			href: '/products/attendance/face-attendance',
			note: 'Product detail on verification, punch work, and overtime records.'
		},
		{
			label: 'How mobile attendance reaches the estate office',
			href: '/guides/mobile-attendance-to-estate-office',
			note: 'Where punch records go after the field captures them.'
		},
		{
			label: 'Tea garden payroll software',
			href: '/products/payroll',
			note: 'How reviewed attendance and punches feed wage calculation.'
		}
	]}
	faqs={guideFaqs}
	bottomCtaHeadline="Record hours the way the shift actually ran"
	bottomCtaParagraph="Book a free demo. Sarbani Associates shows hazira, punch, and weighing records in one system, with your overtime practice loaded. Demo, on-site setup, and staff training are free."
	breadcrumbs={[
		{ name: 'Home', path: '/' },
		{ name: 'Guides', path: '/guides' },
		{
			name: 'Punch Attendance, Split Shifts and Overtime',
			path: '/guides/punch-attendance-split-shifts-overtime'
		}
	]}
>
	<h2 class="guide-h2">1. Why hazira alone cannot answer every hour</h2>
	<p class="guide-p">
		Hazira is a daily mark. It says the worker completed the day's task, and it feeds the base wage.
		But a lot of estate work does not fit a single daily mark:
	</p>
	<ul class="guide-list">
		<li>Factory shifts that run past field hours.</li>
		<li>Workers who come in the morning, leave, and return after lunch.</li>
		<li>Overtime called for withering, drainage, or urgent dispatch work.</li>
		<li>Sunday or weekend plucking with special rates.</li>
	</ul>
	<p class="guide-p">
		Paper handles this with marginal notes, and marginal notes are where wage disputes are born.
		Punch records replace the notes with time-stamped entries.
	</p>

	<h2 class="guide-h2">2. How punches are captured in the field</h2>
	<p class="guide-p">
		A punch uses the same face verification as hazira. The worker looks at the tablet, the match is
		confirmed, and the app records whether this is a time-in or a time-out:
	</p>
	<ul class="guide-list">
		<li>
			<strong>Repeated punches.</strong> A worker can punch in and out several times a day. Each punch
			is its own record with its own timestamp.
		</li>
		<li>
			<strong>Session-linked or standalone.</strong> Punches can attach to a work session or stand alone,
			depending on the estate's practice.
		</li>
		<li>
			<strong>GPS context.</strong> Punches carry their capture location, so the office can see where
			each entry was made.
		</li>
	</ul>
	<p class="guide-p">
		If the camera or the match fails, the supervisor records manual attendance with a remark,
		exactly as at muster. The record always shows its source.
	</p>

	<h2 class="guide-h2">3. What the office sees</h2>
	<p class="guide-p">
		Synced punches land in the office views with the rest of the day's records. The review answers
		three questions:
	</p>
	<ul class="guide-list">
		<li>
			<strong>Sequence.</strong> The full time-in and time-out chain per worker, so split shifts are visible
			at a glance.
		</li>
		<li>
			<strong>Exceptions.</strong> Missing time-outs, unusual gaps, or a worker with punches in two places.
		</li>
		<li>
			<strong>Source.</strong> Which punches were face-verified and which were manual, so overtime pay
			rests on clear records.
		</li>
	</ul>

	<h2 class="guide-h2">4. From punches to overtime pay</h2>
	<p class="guide-p">
		Finalized punch records prepare for the estate workflow along with hazira and weight data. The
		office exports the reviewed data in the formats it uses, and overtime calculation follows your
		regional wage settlement. Because each overtime claim carries verified time stamps instead of a
		note, the conversation at payroll is about the wage agreement, not about who remembers what.
	</p>
</ArticleLayout>
