<script lang="ts">
	import ArticleLayout from '$lib/components/article/ArticleLayout.svelte';
	import MediaPlaceholder from '$lib/components/article/MediaPlaceholder.svelte';

	const guideFaqs = [
		{
			q: 'How many photos does worker enrollment need?',
			a: 'A small set of clear, well-lit reference photos captured during enrollment is enough. The app checks face quality at capture time, so poor photos are rejected immediately instead of causing failed matches later.'
		},
		{
			q: 'When should a worker be re-enrolled?',
			a: 'When their appearance has changed enough to cause ambiguous or failed matches: new beard, spectacles, illness, or an old set of photos. Re-enrollment replaces the old templates with fresh ones and is a normal maintenance task.'
		},
		{
			q: 'What happens to a worker who leaves and returns to the estate?',
			a: 'The record can be re-enrolled under the same worker ID so muster history and payroll identity stay consistent. If the worker has been away a long time, capture fresh photos at return.'
		},
		{
			q: 'Can face templates be backed up?',
			a: 'Yes. Face-template backups can be exported in a password-protected encrypted file for authorized restore, so a damaged or replaced device does not force re-enrolling the whole workforce.'
		},
		{
			q: 'Who runs enrollment at the garden?',
			a: 'Supervisors or office staff capture enrollment photos on the field device, usually during wage disbursement or a quiet hour. Sarbani Associates trains your staff and stays available during the first weeks.'
		}
	];
</script>

<ArticleLayout
	title="Worker Face Enrollment Guide for Tea Gardens | GardenSuite"
	metaDescription="How to enroll and re-enroll tea garden workers for face attendance: capture, quality checks, worker IDs, backups, and re-enrollment. By Sarbani Associates."
	kicker="Implementation Guide"
	headline="Worker Face Enrollment Guide for Tea Gardens"
	lede="Enrollment is the foundation of face attendance. Here is how to capture good templates, keep them healthy, and re-enroll without disrupting the garden."
	datePublished="2026-09-17"
	readTime={6}
	answer="Enrollment captures a small set of clear reference photos for each worker and saves them under the permanent worker ID. The app runs face quality checks at capture, so weak photos are rejected on the spot. Re-enrollment with fresh photos handles changed appearance, returning workers, and ambiguous matches. Templates stay on the field device, and password-protected encrypted backups allow authorized restore when a device is replaced."
	ctaHeadline="Enroll your first sections with our team beside you"
	ctaParagraph="Sarbani Associates runs enrollment sessions at your garden, trains the staff who will re-enroll later, and hands over a clear maintenance routine."
	related={[
		{
			label: 'Face attendance for tea gardens',
			href: '/products/attendance/face-attendance',
			note: 'Product detail on verification, retries, and manual fallback.'
		},
		{
			label: 'Attendance and weighing rollout checklist',
			href: '/guides/attendance-rollout-checklist-tea-garden',
			note: 'Where enrollment fits in the full rollout sequence.'
		},
		{
			label: 'Paper register to face attendance',
			href: '/guides/paper-register-to-face-attendance',
			note: 'How to move worker data off the muster book and into the system.'
		}
	]}
	faqs={guideFaqs}
	bottomCtaHeadline="Get enrollment right the first time"
	bottomCtaParagraph="Book a free demo. Sarbani Associates plans your enrollment schedule around muster, wage days, and garden work. Demo, on-site setup, and staff training are free."
	breadcrumbs={[
		{ name: 'Home', path: '/' },
		{ name: 'Guides', path: '/guides' },
		{
			name: 'Worker Face Enrollment Guide for Tea Gardens',
			path: '/guides/worker-face-enrollment-tea-garden'
		}
	]}
>
	{#snippet media()}
		<MediaPlaceholder
			type="image"
			aspect="16 / 9"
			internal
			label="MEDIA PLACEHOLDER C: enrollment capture screen showing face quality checks during worker photo capture, sanitized demo data."
			caption="The enrollment screen with face quality checks running. Added once an approved sanitized capture is ready."
		/>
	{/snippet}

	<h2 class="guide-h2">1. What enrollment actually stores</h2>
	<p class="guide-p">
		Enrollment does not file away a photograph for humans to look at. It creates face templates:
		mathematical descriptions of the worker's face that the app can compare at muster speed. The
		templates save on the field device under the worker's permanent estate ID, which keeps muster,
		payroll, and PF records pointed at the same person.
	</p>
	<p class="guide-p">
		Good templates are the difference between a fast, quiet muster and a line of rejections. That is
		why the capture stage matters more than any setting.
	</p>

	<h2 class="guide-h2">2. Capturing a good enrollment</h2>
	<p class="guide-p">Follow the same practice at every session:</p>
	<ol class="guide-steps">
		<li>
			<strong>Pick the moment.</strong> Wage disbursement days or a quiet mid-morning slot work well.
			Avoid dusk and harsh backlight.
		</li>
		<li>
			<strong>Face the light.</strong> The worker should face a light source, not stand against one.
		</li>
		<li>
			<strong>Remove coverings on request.</strong> Caps and cloths that hide the face come off for the
			capture; what is normal daily wear for modesty stays.
		</li>
		<li>
			<strong>Let the app judge quality.</strong> Face quality checks reject poor captures immediately.
			Retake instead of saving a weak photo.
		</li>
		<li>
			<strong>Confirm the record.</strong> Check the name, worker ID, and section against the muster book
			before you close the entry.
		</li>
	</ol>

	<h2 class="guide-h2">3. Re-enrollment: the normal maintenance task</h2>
	<p class="guide-p">
		Faces change, devices fail, and templates age. Re-enrollment keeps the system honest without
		punishing anyone:
	</p>
	<ul class="guide-list">
		<li>
			<strong>Changed appearance.</strong> New beard, spectacles, or long illness. Capture fresh photos
			and the ambiguous matches stop.
		</li>
		<li>
			<strong>Returning workers.</strong> Re-enroll under the same worker ID so history stays consistent.
		</li>
		<li>
			<strong>Poor original capture.</strong> If a worker fails repeatedly at muster, the fastest fix
			is a fresh enrollment, not repeated retries.
		</li>
	</ul>
	<p class="guide-p">
		Re-enrollment is done on the device by the supervisor or office staff. There is no need to send
		anything away or to re-enroll the whole workforce.
	</p>

	<h2 class="guide-h2">4. Backups and device changes</h2>
	<p class="guide-p">
		Face-template backups can be exported in a password-protected encrypted file for authorized
		restore. When a tablet is damaged or replaced, the estate restores templates instead of
		enrolling hundreds of workers again. Keep backup files with the same care as wage records:
		restricted access, recorded who holds the password.
	</p>
	<p class="guide-p">
		Enrollment takes some hours once, and pays back every morning after. Treat it as part of the
		garden's routine data work, not a one-time project.
	</p>
</ArticleLayout>
