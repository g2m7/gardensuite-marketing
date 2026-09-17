<script lang="ts">
	import ArticleLayout from '$lib/components/article/ArticleLayout.svelte';
	import MediaPlaceholder from '$lib/components/article/MediaPlaceholder.svelte';

	const guideFaqs = [
		{
			q: 'How does the Bluetooth scale connect to the attendance tablet in the field?',
			a: 'The wireless hanging scale pairs with the supervisor tablet over Bluetooth. When a bag of green leaf is hooked to the scale, the stable weight reading transfers into the worker record with a single tap.'
		},
		{
			q: 'Can the scale handle tare and wet leaf deductions automatically?',
			a: 'Yes. The app subtracts the configured bag or basket tare and applies the estate rain or moisture deduction slabs before it records net weight.'
		},
		{
			q: 'What prevents supervisors or pluckers from faking green leaf weights?',
			a: 'The weight arrives digitally from the scale instead of being typed by hand, and the reading is locked to the verified worker record. A supervisor can still use manual weight entry as a fallback, and the office can see which records were captured which way.'
		},
		{
			q: 'How does field plucking weight connect to factory intake?',
			a: 'Net leaf recorded across division weighing points is summarized for office review and export. The office can compare dispatched leaf against factory weighbridge intake, and the exact downstream connection is confirmed during setup.'
		},
		{
			q: 'What happens if the scale or Bluetooth fails mid-day?',
			a: 'The supervisor records weight manually for that session and keeps the line moving. The record is marked manual, so the office can review it with the rest of the day.'
		}
	];
</script>

<ArticleLayout
	title="Smart Leaf Weighing and Bluetooth Scales for Tea Gardens | GardenSuite"
	metaDescription="Guide to tea leaf weighing with Bluetooth scales linked to worker face attendance. Stop tare disputes and plucking weight errors. By Sarbani Associates."
	kicker="Plucking Operations Guide"
	headline="Digital Leaf Weighing: Linking the Scale to the Worker"
	lede="How tea estates remove handwritten weight slips, tare disputes, and plucking weight doubts by connecting a wireless scale to verified face attendance."
	datePublished="2026-09-06"
	dateModified="2026-09-17"
	readTime={6}
	answer="Smart leaf weighing in tea gardens connects a Bluetooth hanging scale to the field tablet. The worker is verified by face, the bag is hooked to the scale, and the stable reading transfers into that worker's record. The app subtracts bag tare and applies configured rain deductions, then saves the net weight against the worker and work session. No handwritten slips, and the weight cannot drift between the field and the office."
	ctaHeadline="See the scale, the app, and the record together"
	ctaParagraph="Sarbani Associates brings the scale and field app to your weighing shed for a live demonstration, calibrates the hardware, and trains your weighment staff on site."
	related={[
		{
			label: 'Smart weighing for tea gardens',
			href: '/products/attendance/smart-weighing',
			note: 'Product detail: weight freeze, tare, rainfall slabs, fine leaf, and manual fallback.'
		},
		{
			label: 'How Tea Garden Hazira is Calculated',
			href: '/guides/how-tea-garden-hazira-is-calculated',
			note: 'Where net leaf weight lands in over-kilo incentives and wage sheets.'
		},
		{
			label: 'Rainfall deductions and fine leaf checks',
			href: '/guides/rainfall-deduction-fine-leaf-plucking',
			note: 'How wet leaf and quality rules are applied to plucking records.'
		}
	]}
	faqs={guideFaqs}
	bottomCtaHeadline="Put the scale and the worker on the same record"
	bottomCtaParagraph="Book a free demo with your estate's task and deduction rules loaded. Sarbani Associates shows the full flow from morning muster to office review. Demo, on-site setup, and staff training are free."
	breadcrumbs={[
		{ name: 'Home', path: '/' },
		{ name: 'Guides', path: '/guides' },
		{ name: 'Smart Leaf Weighing in Tea Gardens', path: '/guides/smart-leaf-weighing-tea-garden' }
	]}
>
	{#snippet media()}
		<MediaPlaceholder
			type="image"
			aspect="16 / 9"
			internal
			label="MEDIA PLACEHOLDER B: real connected-scale result screen with the weight frozen against a verified worker, sanitized demo data."
			caption="A scale reading saved against a verified worker record. Added once an approved sanitized capture is ready."
		/>
	{/snippet}

	<h2 class="guide-h2">1. Where manual leaf weighment goes wrong</h2>
	<p class="guide-p">
		On most estates, plucking weight is taken twice a day at field weighing stations or collection
		sheds. The flow is familiar: hang the bag, read the dial, write a slip, copy the slip into the
		register at the office.
	</p>
	<p class="guide-p">Each hand in that chain adds risk:</p>
	<ul class="guide-list">
		<li>
			<strong>Spring dial drift:</strong> mechanical balances go out of calibration and get read at an
			angle in shed light.
		</li>
		<li>
			<strong>Slip errors:</strong> rain, mud, and rushed handwriting create transcription errors when
			weights are copied.
		</li>
		<li>
			<strong>Tare arguments:</strong> wet leaf deductions and different basket weights cause friction
			between pluckers and weighing staff.
		</li>
		<li>
			<strong>Ghost weight:</strong> leaf recorded under a favoured worker ID inflates over-kilo incentives.
		</li>
	</ul>
	<p class="guide-p">
		By the time the office compiles payroll, the original reading has passed through four sets of
		hands. Nobody can trace where a number changed.
	</p>

	<h2 class="guide-h2">2. How the smart weighing workflow works</h2>
	<p class="guide-p">
		Pair a rugged Bluetooth hanging scale with the field tablet and the reading never leaves the
		record:
	</p>
	<div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
		<div class="rounded-xl border border-border bg-white p-5 shadow-card">
			<h3 class="text-[15px] font-semibold text-heading">1. Verified worker</h3>
			<p class="mt-1 text-sm leading-relaxed text-text-secondary">
				The plucker steps in front of the tablet. Face verification confirms identity and opens
				their daily record.
			</p>
		</div>
		<div class="rounded-xl border border-border bg-white p-5 shadow-card">
			<h3 class="text-[15px] font-semibold text-heading">2. Bluetooth weight capture</h3>
			<p class="mt-1 text-sm leading-relaxed text-text-secondary">
				The bag is hooked to the scale. The stable gross weight transfers straight into the app over
				wireless.
			</p>
		</div>
		<div class="rounded-xl border border-border bg-white p-5 shadow-card">
			<h3 class="text-[15px] font-semibold text-heading">3. Automatic deductions</h3>
			<p class="mt-1 text-sm leading-relaxed text-text-secondary">
				Configured bag tare and rain or moisture deduction slabs are applied before net weight is
				saved.
			</p>
		</div>
		<div class="rounded-xl border border-border bg-white p-5 shadow-card">
			<h3 class="text-[15px] font-semibold text-heading">4. Saved record and sync</h3>
			<p class="mt-1 text-sm leading-relaxed text-text-secondary">
				Net weight is shown to the worker, saved on the device, and ready for end-of-day office
				sync.
			</p>
		</div>
	</div>
	<p class="guide-p">
		The scale reading, the worker, the section, and the session stay linked in one record. If the
		scale or Bluetooth fails, the supervisor records weight manually and the record is marked manual
		for office review.
	</p>

	<h2 class="guide-h2">3. What the estate gains</h2>
	<ul class="guide-list">
		<li>
			<strong>Incentives paid on actual leaf.</strong> Over-kilo plucking incentives are a large share
			of peak-season wages. Digital weighing ties every extra kilo to a real, verified reading.
		</li>
		<li>
			<strong>Clean factory reconciliation.</strong> Net leaf recorded at the divisions can be matched
			against factory intake, so shrinkage or diversion is visible instead of guessed at.
		</li>
		<li>
			<strong>Less evening data entry.</strong> Office clerks review synced records instead of typing
			handwritten slips into spreadsheets.
		</li>
		<li>
			<strong>Fewer weight disputes.</strong> Deduction slabs and tare are configured once, applied the
			same way for every worker, and shown on the record.
		</li>
	</ul>
</ArticleLayout>
