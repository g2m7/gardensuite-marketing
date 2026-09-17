<script lang="ts">
	import ArticleLayout from '$lib/components/article/ArticleLayout.svelte';

	const guideFaqs = [
		{
			q: 'How does the office send plucking tasks to the field?',
			a: 'The office assigns daily plucking tasks per section in the office system. The task arrives on the field device with the day configuration, so the supervisor sees the target for each section at muster.'
		},
		{
			q: 'What is a pro-rata plucking task?',
			a: 'A pro-rata task adjusts the daily target for the size of the gang, the weather, or a shorter working day, instead of applying one fixed norm to every worker in every condition.'
		},
		{
			q: 'Can different sections have different task norms?',
			a: 'Yes. Sections carry their own task definitions and norms. During peak and lean flush the office can adjust the assignment per section without touching the rest of the estate.'
		},
		{
			q: 'How does the task reach the wage sheet?',
			a: 'The task is saved on the harvest record along with the weight. At the office, the net weight is compared against the task, and the result feeds the hazira and incentive calculation in the wage sheet.'
		},
		{
			q: 'What happens if the task is not set for a section one morning?',
			a: 'The supervisor sees the gap on the device and can call the office to set it before weighment. Records still save offline, and the office can review the day without an assigned task as an exception.'
		}
	];
</script>

<ArticleLayout
	title="Daily Plucking Task Assignment - Office to Field | GardenSuite"
	metaDescription="How tea gardens assign daily plucking tasks per section from office to field devices, with pro-rata tasks and weighing. Built by Sarbani Associates."
	kicker="Plucking Operations Guide"
	headline="Daily Plucking Task Assignment: Office to Field"
	lede="The daily norm decides who earns hazira and what counts as extra. Here is how the assignment travels from the office to the weighing line."
	datePublished="2026-09-17"
	readTime={5}
	answer="Each morning, the office assigns plucking tasks per section in the office system. The tasks arrive on the field device with the day configuration, so supervisors start the session knowing the target for their lines. At weighment, the net weight is compared against the task on the same record, and the difference feeds the hazira and over-kilo incentive calculation. Section norms can differ, and pro-rata adjustments cover gang size and conditions."
	ctaHeadline="Set your next day's tasks in the demo"
	ctaParagraph="Sarbani Associates shows task assignment flowing from the office system to a field device, then into the weighing record and the wage sheet."
	related={[
		{
			label: 'Smart weighing for tea gardens',
			href: '/products/attendance/smart-weighing',
			note: 'How the scale record carries the task and the weight together.'
		},
		{
			label: 'How Tea Garden Hazira is Calculated',
			href: '/guides/how-tea-garden-hazira-is-calculated',
			note: 'How net weight against task becomes hazira and incentives.'
		},
		{
			label: 'Rainfall deductions and fine leaf checks',
			href: '/guides/rainfall-deduction-fine-leaf-plucking',
			note: 'The other plucking rules that ride on the same record.'
		}
	]}
	faqs={guideFaqs}
	bottomCtaHeadline="One number, from the office to the weighing line"
	bottomCtaParagraph="Book a free demo. Sarbani Associates runs task assignment, weighing, and payroll review with your sections and norms. Demo, on-site setup, and staff training are free."
	breadcrumbs={[
		{ name: 'Home', path: '/' },
		{ name: 'Guides', path: '/guides' },
		{ name: 'Daily Plucking Task Assignment', path: '/guides/daily-plucking-task-assignment' }
	]}
>
	<h2 class="guide-h2">1. Why the daily task matters more than it looks</h2>
	<p class="guide-p">
		The plucking task is the daily norm a worker must meet to earn hazira. Everything above it is
		paid as over-kilo incentive. That makes the task number the most argued-about number on the
		estate, and the one most often handled by word of mouth.
	</p>
	<p class="guide-p">
		When the norm lives in the supervisor's memory or on a torn page of a diary, three problems
		follow: the office cannot confirm what was assigned, workers hear different targets from
		different sheds, and incentive disputes start at the weighing point.
	</p>

	<h2 class="guide-h2">2. The assignment flow, morning to evening</h2>
	<ol class="guide-steps">
		<li>
			<strong>Office assigns.</strong> Plucking tasks are set per section in the office system for the
			day, based on flush, weather, and gang strength.
		</li>
		<li>
			<strong>Device receives.</strong> Tasks travel to the field devices with the daily configuration,
			along with sections, work codes, and rules.
		</li>
		<li>
			<strong>Session starts with the target.</strong> The supervisor opens the session for the section
			and the assigned task is on the record from the start.
		</li>
		<li>
			<strong>Weighing compares.</strong> Each scale reading saves against the same record as the task,
			so net weight and target are side by side.
		</li>
		<li>
			<strong>Office reviews the difference.</strong> Summaries show weight against task per section and
			per worker, which feeds hazira and incentive calculation.
		</li>
	</ol>

	<h2 class="guide-h2">3. Section norms and pro-rata adjustments</h2>
	<p class="guide-p">
		One fixed norm across an estate rarely matches reality. Sections differ in leaf availability,
		and days differ in weather and gang strength. The task settings handle this:
	</p>
	<ul class="guide-list">
		<li>
			<strong>Per-section norms.</strong> Each section carries its own task definition.
		</li>
		<li>
			<strong>Pro-rata tasks.</strong> The daily target adjusts for a smaller gang, a shortened day, or
			section conditions, instead of forcing one number onto every line.
		</li>
		<li>
			<strong>Season changes.</strong> Peak and lean flush adjustments are made in the office and reach
			the field with the next configuration, not by word of mouth.
		</li>
	</ul>

	<h2 class="guide-h2">4. What changes on the ground</h2>
	<p class="guide-p">
		Supervisors start the day with the target in hand instead of waiting for a note. Workers are
		told the task at muster and see the result at weighing, on the same record. Office staff stop
		reconstructing who was assigned what, because the assignment has been on the harvest record
		since the session opened. And when the wage sheet is prepared, the task, the weight, and the
		deductions are already together, so the incentive calculation has nothing left to guess.
	</p>
</ArticleLayout>
