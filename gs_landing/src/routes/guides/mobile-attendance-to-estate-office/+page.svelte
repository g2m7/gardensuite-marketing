<script lang="ts">
	import ArticleLayout from '$lib/components/article/ArticleLayout.svelte';
	import MediaPlaceholder from '$lib/components/article/MediaPlaceholder.svelte';
	import ProductCardFrame from '$lib/components/product/ProductCardFrame.svelte';

	const guideFaqs = [
		{
			q: 'When do field records reach the estate office?',
			a: 'When the tablet connects to office Wi-Fi or a network area, usually at end of day. Records captured during the day stay on the device until then, so the office sees them after sync rather than live.'
		},
		{
			q: 'Can the office correct a wrong attendance record?',
			a: 'Yes. Office staff can add permitted manual attendance and corrections during review. Corrections stay visible with their source and status so the audit trail remains clear.'
		},
		{
			q: 'What does finalization mean?',
			a: 'Finalization marks a reviewed day or period as settled for the estate workflow. Once finalized, the records are the agreed base for exports and downstream wage preparation.'
		},
		{
			q: 'How do attendance records reach payroll?',
			a: 'Reviewed and finalized records prepare for export in formats the estate workflow supports, such as Excel, CSV, PDF, or ERP-import paths where supported. The exact connection to your payroll setup is confirmed during implementation.'
		},
		{
			q: 'Who reviews the records: the office or the manager?',
			a: 'Office staff run the daily review of summaries, raw records, and sync status. Managers and owners can see the numbers through the office system and the daily report dashboard once data is synced.'
		}
	];
</script>

<ArticleLayout
	title="How Mobile Attendance Reaches the Estate Office | GardenSuite"
	metaDescription="The path from field tablet to estate office: sync, review, correction, finalization, and export for payroll. Built for tea gardens by Sarbani Associates."
	kicker="Field to Office Guide"
	headline="How Mobile Attendance Reaches the Estate Office"
	lede="The journey of a record, step by step: capture at the line, upload over the garden network, office review, and the handover to payroll."
	datePublished="2026-09-17"
	readTime={6}
	answer="A record travels in four stages. First, the field app saves attendance or weight locally with its worker, section, and session. Second, the tablet uploads the record when it connects to the garden network. Third, the office reviews the day in the attendance views: summaries, raw records, sessions, and sync status, with corrections made where permitted. Fourth, the reviewed day is finalized and prepared for export toward the estate workflow and payroll."
	ctaHeadline="Watch one day of records travel the full path"
	ctaParagraph="Sarbani Associates runs the demo with a real day of capture, from morning muster to office review, so your staff see exactly where each record goes."
	related={[
		{
			label: 'Offline attendance and office sync',
			href: '/products/attendance/offline-sync',
			note: 'Product detail on record states, retries, and office views.'
		},
		{
			label: 'Tea garden payroll software',
			href: '/products/payroll',
			note: 'How reviewed attendance and leaf weight feed wage calculation.'
		},
		{
			label: 'Daily Report (MIS dashboard)',
			href: '/products/mis',
			note: 'The owner-level view once office data is compiled.'
		}
	]}
	faqs={guideFaqs}
	bottomCtaHeadline="Connect your field to your office"
	bottomCtaParagraph="Book a free demo. Sarbani Associates shows the full capture-to-office flow with your sections and work codes. Demo, on-site setup, and staff training are free."
	breadcrumbs={[
		{ name: 'Home', path: '/' },
		{ name: 'Guides', path: '/guides' },
		{
			name: 'How Mobile Attendance Reaches the Estate Office',
			path: '/guides/mobile-attendance-to-estate-office'
		}
	]}
>
	{#snippet media()}
		<ProductCardFrame mode="solid" innerClass="p-6 md:p-8">
			{#snippet children()}
				<p class="text-[13px] font-semibold tracking-[0.08em] text-green-deep uppercase">
					Office review workspace
				</p>
				<h2 class="mt-3 text-2xl font-semibold tracking-[-0.02em] text-heading md:text-3xl">
					What the office opens the morning after
				</h2>
				<p class="mt-3 max-w-xl text-[16px] leading-[1.65] text-text-secondary">
					Employee Summary, Raw Data, Map, and Sessions: the four views office staff check before
					finalizing a day.
				</p>
				<div class="mt-6">
					<MediaPlaceholder
						type="image"
						aspect="16 / 9"
						internal
						label="MEDIA PLACEHOLDER D: anonymized desktop attendance workspace in Employee Summary or Raw Data view, approved demo data only."
						caption="The office attendance workspace. Added once an approved anonymized capture is ready."
					/>
				</div>
			{/snippet}
		</ProductCardFrame>
	{/snippet}

	<h2 class="guide-h2">1. Capture at the line: the record is born with its context</h2>
	<p class="guide-p">
		Every record is written once, at the point of work, with everything attached to it. A verified
		face match marks attendance with the worker, section, work code, session, and time. A scale
		reading writes weight against the same worker. Because the context is captured with the record,
		the office never has to ask the field which line, which task, or which day a mark belonged to.
	</p>

	<h2 class="guide-h2">2. Upload: the device finds the network</h2>
	<p class="guide-p">
		Until the tablet reaches connectivity, records sit on the device in pending state. At end of day
		or whenever the device enters coverage, pending records upload to the office system. The field
		app shows the result of each upload: accepted, failed, or rejected. Failed records can be
		retried from the device, and rejected ones carry their reason into the office views.
	</p>
	<p class="guide-p">
		This is a deliberate trade. The estate gets records that survive dead zones, and in return the
		office sees the day after sync rather than during it. For most gardens that trade is obvious;
		for any estate with out-divisions, it is the only trade that keeps records alive.
	</p>

	<h2 class="guide-h2">3. Review: the office reads the day</h2>
	<p class="guide-p">
		Uploaded records land in the office attendance workspace. Staff check the day from four views:
	</p>
	<ul class="guide-list">
		<li>
			<strong>Employee Summary.</strong> Worker-wise attendance and harvest totals.
		</li>
		<li>
			<strong>Raw Data.</strong> Every record with its detail, source, and status.
		</li>
		<li>
			<strong>Map.</strong> Where records were captured, using start and end points.
		</li>
		<li>
			<strong>Sessions.</strong> Work sessions with their section, task, and timing.
		</li>
	</ul>
	<p class="guide-p">
		Exceptions surface here: manual entries, failed uploads, unusual totals. Permitted corrections
		are made at this stage, and every correction stays visible.
	</p>

	<h2 class="guide-h2">4. Finalize and hand over</h2>
	<p class="guide-p">
		Once the office agrees the day is right, records are finalized. Finalized data is the agreed
		base for the estate workflow. From there, staff prepare exports in the formats the estate uses,
		such as Excel, CSV, PDF, or ERP-import paths where supported, and the numbers move toward wages
		and reporting. The daily report dashboard then shows owners and managers the compiled picture
		from anywhere.
	</p>
	<p class="guide-p">
		One capture, one review, one agreed number. That is the whole job of the path from field to
		office.
	</p>
</ArticleLayout>
