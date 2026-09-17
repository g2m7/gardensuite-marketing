<script lang="ts">
	import ArticleLayout from '$lib/components/article/ArticleLayout.svelte';

	const guideFaqs = [
		{
			q: 'Why do fingerprint biometric devices fail in tea gardens?',
			a: 'Tea pluckers and field laborers frequently have worn, callused fingertips or hands coated in tea sap and mud. Optical fingerprint sensors struggle to read these prints reliably, causing long queues and false rejections during morning muster.'
		},
		{
			q: 'How does offline face recognition help stop proxy hazira?',
			a: 'The app verifies the worker by face on a tablet that works without internet. Because the check needs the live person in front of the camera, a colleague cannot mark attendance on behalf of an absent worker.'
		},
		{
			q: 'What happens when there is no mobile network coverage at the plucking line?',
			a: 'GardenSuite stores the face templates and attendance records on the tablet itself. No internet is needed to verify a worker. Records sync when the tablet connects to office Wi-Fi or a mobile network later.'
		},
		{
			q: 'Can supervisors alter attendance logs after roll-call?',
			a: 'Records carry their capture time, source, and device details, and the office can review status, remarks, and changes. If a correction is needed, it is made through permitted manual attendance and stays visible to the office.'
		},
		{
			q: 'What happens when the camera or the app does not recognize a worker?',
			a: 'The supervisor retries, and if the match stays ambiguous the app rejects it and offers a recorded manual attendance fallback. Workers with changed appearance can be re-enrolled on the device.'
		}
	];
</script>

<ArticleLayout
	title="How to Stop Proxy Attendance in Tea Gardens - Estate Guide | GardenSuite"
	metaDescription="Practical guide for tea garden managers on stopping proxy hazira and muster roll errors using offline face attendance. Built and supported by Sarbani Associates."
	kicker="Field Operations Guide"
	headline="How to Stop Proxy Attendance in Tea Gardens"
	lede="A practical guide for estate managers, directors, and head clerks on moving from manual muster rolls to verified offline face attendance."
	datePublished="2026-09-06"
	dateModified="2026-09-17"
	readTime={7}
	answer="Proxy attendance in tea gardens happens when absent workers receive hazira through register marks made by colleagues, duplicate tokens, or ghost entries in the muster roll. The practical fix in remote sections is offline face attendance on a tablet: the app verifies the live worker by face, saves the record on the device without internet, links the worker to plucking weight at the scale, and syncs reviewed records to the estate office when connectivity returns."
	ctaHeadline="See face attendance with your own muster practice"
	ctaParagraph="Sarbani Associates runs GardenSuite on-site across Assam, Dooars, Terai, and Darjeeling. We configure devices around your sections and work codes, train your staff, and support the rollout."
	related={[
		{
			label: 'Face attendance for tea gardens',
			href: '/products/attendance/face-attendance',
			note: 'How verification, liveness checks, and manual fallback work in the field app.'
		},
		{
			label: 'How mobile attendance reaches the estate office',
			href: '/guides/mobile-attendance-to-estate-office',
			note: 'The full path from a field tablet to office review and payroll.'
		},
		{
			label: 'Tea garden payroll software',
			href: '/products/payroll',
			note: 'How verified attendance and leaf weight feed wage calculation.'
		}
	]}
	faqs={guideFaqs}
	bottomCtaHeadline="Run verified muster at every section"
	bottomCtaParagraph="Book a free demo. Sarbani Associates will show face attendance, smart weighing, and office review with your garden setup. Demo, on-site setup, and staff training are free."
	breadcrumbs={[
		{ name: 'Home', path: '/' },
		{ name: 'Guides', path: '/guides' },
		{
			name: 'Stop Proxy Attendance in Tea Gardens',
			path: '/guides/stop-proxy-attendance-tea-garden'
		}
	]}
>
	<h2 class="guide-h2">1. The hidden cost of proxy attendance on tea estates</h2>
	<p class="guide-p">
		On most estates across Assam, Dooars, and Terai, morning muster still runs on paper. Pluckers
		assemble before sunrise, and munshis or sirdars mark hazira in a physical register or hand out
		metal tokens.
	</p>
	<p class="guide-p">Three problems repeat with this workflow:</p>
	<ul class="guide-list">
		<li>
			<strong>Buddy punching:</strong> one worker answers roll-call or drops a token for an absent relative
			or neighbour.
		</li>
		<li>
			<strong>Muster roll gaps:</strong> marks in a ledger cannot be checked against the people actually
			standing at the field line.
		</li>
		<li>
			<strong>Ghost workers:</strong> wages continue for workers who have left the garden or are on unrecorded
			leave.
		</li>
	</ul>
	<p class="guide-p">
		Every one of these ends in the same place: paid hazira for work that was not done, and a payroll
		office that cannot prove who worked.
	</p>

	<h2 class="guide-h2">2. Why fingerprint machines fail in garden conditions</h2>
	<p class="guide-p">
		Many estates have already tried fingerprint devices and abandoned them within a season. The
		reasons are built into field work:
	</p>
	<div class="guide-note">
		<ul class="guide-list" style="margin-top: 0">
			<li>
				<strong>Sap and mud:</strong> plucking coats hands in leaf resin and soil, which blinds optical
				sensors.
			</li>
			<li>
				<strong>Worn fingerprints:</strong> years of manual labour flatten fingerprint ridges, so rejections
				climb.
			</li>
			<li>
				<strong>Queue delays:</strong> when a sensor fails a few times per worker, muster stretches and
				plucking starts late.
			</li>
		</ul>
	</div>
	<p class="guide-p">
		A device that rejects the honest worker and accepts the patient fraudster protects nobody.
	</p>

	<h2 class="guide-h2">3. The fix: offline face attendance on a tablet</h2>
	<p class="guide-p">
		Face recognition answers the conditions above because it needs the live person, not their
		fingertip:
	</p>
	<ol class="guide-steps">
		<li>
			<strong>Glance and verify.</strong> The worker looks at the tablet camera. Face quality and liveness
			checks run on the device, so sap and mud on hands do not matter.
		</li>
		<li>
			<strong>Ambiguous matches are rejected.</strong> If the app is not confident, it asks for a retry
			or the supervisor records manual attendance with a reason. Nothing is guessed.
		</li>
		<li>
			<strong>Works without internet.</strong> Templates and records live on the tablet. Muster runs in
			dead zones.
		</li>
		<li>
			<strong>Links to weighing.</strong> The verified worker stays attached to the scale reading at weighment,
			so attendance and leaf weight land in the same record.
		</li>
	</ol>
	<p class="guide-p">Together these checks help stop proxy attendance without slowing the line.</p>

	<h2 class="guide-h2">4. Implementation checklist for estate managers</h2>
	<p class="guide-p">When you roll out face attendance, keep the sequence simple:</p>
	<div class="mt-6 space-y-4">
		<div class="rounded-xl border border-border bg-white p-5 shadow-card">
			<h3 class="text-[15px] font-semibold text-heading">Step A: worker enrollment</h3>
			<p class="mt-1 text-sm leading-relaxed text-text-secondary">
				Capture clear reference photos for each worker during wage disbursement or a quieter hour.
				Save records under the permanent worker ID so muster, payroll, and PF records agree.
			</p>
		</div>
		<div class="rounded-xl border border-border bg-white p-5 shadow-card">
			<h3 class="text-[15px] font-semibold text-heading">Step B: division-level device setup</h3>
			<p class="mt-1 text-sm leading-relaxed text-text-secondary">
				Give each supervisor a tablet configured with the correct sections, work codes, and rules
				for their lines.
			</p>
		</div>
		<div class="rounded-xl border border-border bg-white p-5 shadow-card">
			<h3 class="text-[15px] font-semibold text-heading">Step C: parallel roll-call run</h3>
			<p class="mt-1 text-sm leading-relaxed text-text-secondary">
				Run face attendance beside the paper register for about a week. Sirdars get comfortable, and
				workers learn the screen feedback.
			</p>
		</div>
		<div class="rounded-xl border border-border bg-white p-5 shadow-card">
			<h3 class="text-[15px] font-semibold text-heading">Step D: office review and audit</h3>
			<p class="mt-1 text-sm leading-relaxed text-text-secondary">
				After muster, sync at the division office or main garden network. The head clerk reviews
				summary, status, and exceptions before the day is finalized.
			</p>
		</div>
	</div>
</ArticleLayout>
