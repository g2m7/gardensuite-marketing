<script lang="ts">
	import ArticleLayout from '$lib/components/article/ArticleLayout.svelte';

	const guideFaqs = [
		{
			q: 'How do rainfall deductions work in the field app?',
			a: 'The estate configures deduction slabs for rain and moisture conditions. During weighing, the supervisor selects the slab for the day and the app applies the same deduction percentage to every worker net weight.'
		},
		{
			q: 'What is fine leaf count?',
			a: 'Fine leaf is the share of tender shoots in a sample of harvested leaf, checked against a sample size the estate sets. A higher fine leaf share usually means better made tea quality.'
		},
		{
			q: 'Does the app decide the deduction percentage by itself?',
			a: 'No. The estate sets the slabs, and the supervisor applies the slab that matches the day. The record shows which slab was used, so workers and office see the same rule.'
		},
		{
			q: 'What happens if a worker disputes a wet leaf deduction?',
			a: 'The record shows the gross weight, the tare, and the slab applied. Because the same slab went onto every worker that day, the dispute is about conditions, not about one clerk arithmetic.'
		},
		{
			q: 'Can different sections use different deduction slabs?',
			a: 'Yes. Slabs are configured per estate and can differ by section requirements. The task and slab settings arrive on the field device with the day configuration.'
		}
	];
</script>

<ArticleLayout
	title="Rainfall Deductions and Fine Leaf Checks - Tea Guide | GardenSuite"
	metaDescription="How rainfall and wet leaf deduction slabs plus fine leaf checks are applied to plucking records at tea gardens. Built for estates by Sarbani Associates."
	kicker="Plucking Operations Guide"
	headline="Rainfall Deductions and Fine Leaf Checks in Plucking Records"
	lede="Two small rules decide whether a plucking day is paid fairly: what the rain took, and what the leaf is worth. Here is how both are recorded."
	datePublished="2026-09-17"
	readTime={6}
	answer="Rainfall deductions and fine leaf checks are configured once as estate rules. At weighing, the supervisor applies the day's rainfall or moisture slab, and the app deducts it from the gross weight before saving net weight against the verified worker. Fine leaf is checked as a sample count when the estate requires it and is saved with the harvest record. Both values travel with the record to the office, so deductions are applied the same way for every worker and every dispute ends at the record instead of the register."
	ctaHeadline="Load your deduction slabs and test a full day"
	ctaParagraph="Sarbani Associates sets your tare, rainfall, and fine leaf rules into the system, then runs one complete weighing day with your staff."
	related={[
		{
			label: 'Smart weighing for tea gardens',
			href: '/products/attendance/smart-weighing',
			note: 'Product detail on scale capture, tare, and deductions.'
		},
		{
			label: 'How Tea Garden Hazira is Calculated',
			href: '/guides/how-tea-garden-hazira-is-calculated',
			note: 'Where net leaf weight lands in incentives and wage sheets.'
		},
		{
			label: 'Daily plucking task assignment',
			href: '/guides/daily-plucking-task-assignment',
			note: 'How section targets and rules reach the field device each morning.'
		}
	]}
	faqs={guideFaqs}
	bottomCtaHeadline="Put the rules on the record, not in the argument"
	bottomCtaParagraph="Book a free demo. Sarbani Associates shows rainfall deductions and fine leaf checks working on real weighing data. Demo, on-site setup, and staff training are free."
	breadcrumbs={[
		{ name: 'Home', path: '/' },
		{ name: 'Guides', path: '/guides' },
		{
			name: 'Rainfall Deductions and Fine Leaf Checks',
			path: '/guides/rainfall-deduction-fine-leaf-plucking'
		}
	]}
>
	<h2 class="guide-h2">1. The two numbers every plucking day argues about</h2>
	<p class="guide-p">
		On a wet day, two questions decide what a plucker is paid and what the factory receives:
	</p>
	<ul class="guide-list">
		<li>
			<strong>How much of the weight is water?</strong> Rain on leaf, or dew from an early pick, adds
			weight that is not leaf.
		</li>
		<li>
			<strong>How much of the leaf is fine?</strong> Tender shoots are worth more in the factory than
			coarse leaf, and some estates check the share in a sample.
		</li>
	</ul>
	<p class="guide-p">
		Paper handles both with a clerk's judgment written on a slip. The judgment is often correct. The
		problem is that nobody can trace it later.
	</p>

	<h2 class="guide-h2">2. Rainfall deductions as configured slabs</h2>
	<p class="guide-p">
		The estate defines deduction slabs in advance: which percentage applies in which conditions.
		During weighing, the supervisor selects the slab that matches the day:
	</p>
	<ol class="guide-steps">
		<li>Gross weight arrives from the scale, linked to the verified worker.</li>
		<li>Bag or basket tare is subtracted as configured.</li>
		<li>The day's rainfall or moisture slab is applied as a percentage.</li>
		<li>Net weight is saved on the record, showing the gross weight and the slab used.</li>
	</ol>
	<p class="guide-p">
		Every worker that day goes through the same rule. When the office or the factory reviews the
		record, the deduction is a line item with a source, not a memory.
	</p>

	<h2 class="guide-h2">3. Fine leaf checks on the record</h2>
	<p class="guide-p">
		Where the estate requires it, the supervisor checks fine leaf as a sample count at the
		configured sample size. The result saves with the harvest record, next to the weight:
	</p>
	<ul class="guide-list">
		<li>
			<strong>Quality follows the section.</strong> Fine leaf counts per section show which lines pluck
			tender and which lines strip.
		</li>
		<li>
			<strong>Payment rules stay honest.</strong> Where the estate ties quality to rates, the check sits
			on the same record as the weight that earned the rate.
		</li>
		<li>
			<strong>The factory sees what it will receive.</strong> A day's fine leaf profile reaches the office
			with the leaf, instead of being guessed at the withering trough.
		</li>
	</ul>

	<h2 class="guide-h2">4. Why recording both ends the dispute</h2>
	<p class="guide-p">
		The wet leaf argument is rarely about bad faith. It is about a number that exists only in one
		person's memory. When gross weight, tare, slab, and fine leaf all sit on the record, the plucker
		can be shown the same lines the office sees. Disputes move from "he wrote less" to "this was the
		day's slab", and the second conversation is short.
	</p>
</ArticleLayout>
