<script lang="ts">
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { articleSchema, breadcrumbSchema, faqSchema } from '$lib/seo/schemas';
	import Button from '$lib/components/Button.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup.svelte';
	import FaqSection from '$lib/components/product/FaqSection.svelte';

	const guideFaqs = [
		{
			q: 'How does the Bluetooth scale connect to the attendance tablet in the field?',
			a: 'The wireless digital hanging scale pairs automatically over Bluetooth with the supervisor tablet. When a bag of green leaf is hooked to the scale, the stable weight reading transmits directly into the worker record with a single tap.'
		},
		{
			q: 'Can the scale handle wet leaf and tare weight deductions automatically?',
			a: 'Yes. The system automatically subtracts bag tare weight and applies configured rain or surface moisture deductions according to estate policy before recording net weight.'
		},
		{
			q: 'What prevents supervisors or pluckers from faking green leaf weights?',
			a: 'The scale reading is transmitted digitally via Bluetooth rather than typed by hand. Because the weight is locked to the worker biometric face verification at the weighment station, manual inflation is prevented.'
		},
		{
			q: 'How does field plucking weight connect to factory intake?',
			a: 'Total net green leaf recorded across all division weighing points is compiled into a digital dispatch challan that the tea factory babu matches against the factory weighbridge intake.'
		}
	];
</script>

<SeoHead
	title="Smart Leaf Weighing & Bluetooth Scales for Tea Gardens | GardenSuite"
	description="Guide to digital tea leaf weighing with Bluetooth scales linked to worker face attendance. Stop tare fraud and plucking disputes. By Sarbani Associates."
	canonical="https://gardensuite.in/guides/smart-leaf-weighing-tea-garden"
	breadcrumbs={[
		{ name: 'Home', path: '/' },
		{ name: 'Guides', path: '/#guides' },
		{ name: 'Smart Leaf Weighing in Tea Gardens', path: '/guides/smart-leaf-weighing-tea-garden' }
	]}
	schema={[
		articleSchema({
			title: 'Smart Leaf Weighing in Tea Gardens: Linking Bluetooth Scales to Digital Plucking Records',
			description:
				'A technical field guide for tea garden managers on linking wireless hanging scales directly to face attendance records for accurate plucking and payroll.',
			path: '/guides/smart-leaf-weighing-tea-garden',
			datePublished: '2026-09-06',
			dateModified: '2026-09-06'
		}),
		breadcrumbSchema([
			{ name: 'Home', path: '/' },
			{ name: 'Guides', path: '/#guides' },
			{ name: 'Smart Leaf Weighing in Tea Gardens', path: '/guides/smart-leaf-weighing-tea-garden' }
		]),
		faqSchema(guideFaqs)
	]}
/>

<!-- Guide Header -->
<header class="border-b border-[#E4E4E7] bg-white pt-28 pb-16 md:pt-36 md:pb-20">
	<div class="mx-auto max-w-3xl px-6 md:px-8">
		<div class="inline-block rounded-full bg-[#1B5E3B]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#1B5E3B]">
			Plucking Operations Guide
		</div>
		<h1 class="mt-6 text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl md:text-5xl">
			Digital Leaf Weighing: Linking Bluetooth Scales to Plucker Records
		</h1>
		<p class="mt-4 text-base leading-relaxed text-[#52525B] sm:text-lg">
			How tea estates eliminate manual weight cards, tare calculation disputes, and plucking fraud by
			connecting wireless scales directly to verified face attendance.
		</p>
		<div class="mt-6 flex items-center gap-3 text-xs text-[#71717A]">
			<span>By Sarbani Associates</span>
			<span>•</span>
			<span>Updated September 2026</span>
			<span>•</span>
			<span>6 min read</span>
		</div>
	</div>
</header>

<!-- Article Content -->
<article class="bg-white py-16">
	<div class="mx-auto max-w-3xl px-6 text-[#27272A] md:px-8">
		<!-- Direct Answer Box (AEO target) -->
		<div class="rounded-2xl border-l-4 border-[#1B5E3B] bg-[#F4FBF7] p-6 text-base leading-relaxed text-[#1B5E3B]">
			<p class="font-semibold text-[#111111]">Direct Summary:</p>
			<p class="mt-1 text-[#27272A]">
				Smart leaf weighing in tea gardens connects digital hanging scales to mobile tablets via Bluetooth.
				When a worker presents their harvested green leaf bag, their identity is verified via facial
				recognition. The scale transmits the weight reading directly to the tablet, automatically deducts
				bag tare and configured wet leaf deductions, and saves the net plucking weight. This eliminates
				handwritten plucking slips, stops weight tampering, and flows directly into daily wage and
				incentive calculation.
			</p>
		</div>

		<!-- Section 1 -->
		<h2 class="mt-12 text-2xl font-bold text-[#111111]">1. The Vulnerability of Manual Leaf Weighment</h2>
		<p class="mt-4 text-base leading-relaxed">
			On most Indian tea estates across Assam, Dooars, and Terai, plucking weight is measured twice daily
			(midday and late afternoon) at field weighing stations or collection sheds.
		</p>
		<p class="mt-4 text-base leading-relaxed">
			Under manual operations, supervisors face multiple challenges:
		</p>
		<ul class="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed">
			<li><strong>Spring dial inaccuracies:</strong> Mechanical spring balances drift over time or are misread from an angle in dim shedding light.</li>
			<li><strong>Handwritten card errors:</strong> Raindrops, mud, and fast handwriting lead to transcription errors when copying weights to the master roll.</li>
			<li><strong>Tare weight manipulation:</strong> Disagreements over wet leaf deductions or varying empty basket weights trigger friction between pluckers and babus.</li>
			<li><strong>Ghost weight:</strong> Recording leaf weight under a favored worker ID to artificially increase their over-kilo plucking incentive pay.</li>
		</ul>

		<!-- Section 2 -->
		<h2 class="mt-12 text-2xl font-bold text-[#111111]">2. The Smart Wireless Weighing Architecture</h2>
		<p class="mt-4 text-base leading-relaxed">
			By pairing a heavy-duty industrial Bluetooth hanging scale with an offline mobile tablet, the
			weighment process becomes instantaneous and tamper-proof:
		</p>
		<div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
			<div class="rounded-xl border border-[#E4E4E7] p-5">
				<h3 class="font-semibold text-[#111111]">1. Verified Identity</h3>
				<p class="mt-1 text-sm text-[#52525B]">
					The plucker steps in front of the tablet camera. Facial verification confirms their identity and pulls up their daily record.
				</p>
			</div>
			<div class="rounded-xl border border-[#E4E4E7] p-5">
				<h3 class="font-semibold text-[#111111]">2. Instant Bluetooth Capture</h3>
				<p class="mt-1 text-sm text-[#52525B]">
					The bag is hooked to the digital scale. Stable gross weight transmits directly into the software over wireless Bluetooth.
				</p>
			</div>
			<div class="rounded-xl border border-[#E4E4E7] p-5">
				<h3 class="font-semibold text-[#111111]">3. Automatic Deductions</h3>
				<p class="mt-1 text-sm text-[#52525B]">
					Standard bag tare weight and rain allowance deductions are applied programmatically based on pre-set estate configurations.
				</p>
			</div>
			<div class="rounded-xl border border-[#E4E4E7] p-5">
				<h3 class="font-semibold text-[#111111]">4. Immediate Receipt & Sync</h3>
				<p class="mt-1 text-sm text-[#52525B]">
					Net weight is spoken or displayed to the worker, logged to the local database, and ready for end-of-day office sync.
				</p>
			</div>
		</div>

		<!-- Section 3 -->
		<h2 class="mt-12 text-2xl font-bold text-[#111111]">3. Financial Benefits for Estate Management</h2>
		<p class="mt-4 text-base leading-relaxed">
			Accurate digital weighment directly protects tea estate profitability:
		</p>
		<ul class="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed">
			<li>
				<strong>Eliminating Plucking Incentive Fraud:</strong> Over-kilo plucking incentives (extra leaf harvested beyond the standard daily task) represent a significant portion of peak-season wage expenditure. Digital weighing ensures incentives are paid only for actual leaf harvested.
			</li>
			<li>
				<strong>Precise Factory Reconciliation:</strong> Green leaf dispatched from garden sections matches the factory intake weighbridge within fractions of a percent, pinpointing in-transit shrinkage or unauthorized diversion.
			</li>
			<li>
				<strong>Zero Evening Data Entry:</strong> Garden office clerks no longer spend 3 to 4 hours every evening typing handwritten weighment slips into spreadsheets.
			</li>
		</ul>

		<!-- Product Callout -->
		<div class="mt-12 rounded-2xl border border-[#1B5E3B]/20 bg-[#F4FBF7] p-8 text-center">
			<h3 class="text-xl font-semibold text-[#111111]">
				Equip Your Garden with GardenSuite Smart Scales
			</h3>
			<p class="mx-auto mt-2 max-w-xl text-sm text-[#52525B]">
				GardenSuite integrates rugged Bluetooth digital hanging scales directly with our offline face attendance tablet. Complete hardware calibration and on-site training provided by Sarbani Associates.
			</p>
			<ButtonGroup class="mt-6 justify-center">
				<Button href="/products/attendance/smart-weighing" label="View Smart Weighing Details" variant="primary" />
				<Button href="/#contact" label="Request Field Demonstration" variant="secondary" />
			</ButtonGroup>
		</div>
	</div>
</article>

<!-- FAQs Section -->
<FaqSection faqs={guideFaqs} />
