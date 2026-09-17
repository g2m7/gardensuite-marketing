<script lang="ts">
	import ArticleLayout from '$lib/components/article/ArticleLayout.svelte';

	const guideFaqs = [
		{
			q: 'What is the difference between hazira and tikka in a tea estate?',
			a: 'Hazira is the standard daily wage earned by a worker for completing the set daily task, such as the plucking quota or a field weeding task. Tikka refers to piece-rate or extra contract work assigned beyond the base task, paid at agreed rates.'
		},
		{
			q: 'How are over-kilo plucking incentives calculated?',
			a: 'Each garden sets a base daily plucking norm, typically 20 kg to 24 kg depending on season and flushing cycle. Leaf harvested above the norm is paid as an incentive rate per kilogram. The exact rate comes from your regional wage agreement and is confirmed during setup.'
		},
		{
			q: 'How does wet leaf deduction affect net plucking weight?',
			a: 'During heavy rain or heavy dew, green leaf carries surface moisture. Estates apply a wet leaf deduction percentage, commonly 10% to 25% depending on weather, to compute net leaf before incentives and factory intake.'
		},
		{
			q: 'Which statutory deductions apply to tea garden payroll in India?',
			a: 'Estate wage sheets incorporate Provident Fund (PF), Employees State Insurance (ESI) where applicable, Labour Welfare Fund, and store or ration advances, in line with the Plantations Labour Act and state rules.'
		},
		{
			q: 'Can GardenSuite payroll handle weekly and fortnightly payment cycles?',
			a: 'Yes. Attendance and leaf records are reviewed and finalized per pay period, then wage sheets are compiled with the allowances, deductions, and statutory reports your estate uses.'
		}
	];
</script>

<ArticleLayout
	title="How Tea Garden Hazira is Calculated - Estate Guide | GardenSuite"
	metaDescription="Field guide for estate managers and accountants on hazira, base plucking tasks, over-kilo incentives, wet leaf deductions, and PF in Assam and Bengal."
	kicker="Estate Payroll Guide"
	headline="How Tea Garden Hazira is Calculated"
	lede="A practical breakdown of daily task norms, over-kilo plucking incentives, tare deductions, and statutory deductions for tea estates across Assam, Dooars, Terai, and Darjeeling."
	datePublished="2026-09-17"
	readTime={8}
	answer="In Indian tea gardens, hazira is the base daily wage a worker earns for completing the defined task for the day, such as the plucking norm or an allotted cultivation task. Total daily earnings are the base hazira plus over-kilo incentives for leaf above the norm, minus deductions like PF and store advances. A worked example: with a 24 kg norm, a 250 rupee hazira, and a 3 rupee per kilo incentive, a worker who delivers 38 kg of clean leaf earns 250 plus 42, which is 292 rupees gross for the day."
	ctaHeadline="Calculate hazira from records, not from re-entry"
	ctaParagraph="See how GardenSuite turns verified attendance and leaf weight into wage sheets with hazira, over-kilo incentives, PF, ESI, and bonus already applied."
	related={[
		{
			label: 'Tea garden payroll software',
			href: '/products/payroll',
			note: 'Wages, PF, ESI, bonus, hazira, and tikka in one payroll module.'
		},
		{
			label: 'Smart leaf weighing in tea gardens',
			href: '/guides/smart-leaf-weighing-tea-garden',
			note: 'How net leaf weight reaches the wage sheet without handwritten slips.'
		},
		{
			label: 'Rainfall deductions and fine leaf checks',
			href: '/guides/rainfall-deduction-fine-leaf-plucking',
			note: 'How wet leaf and quality rules change the payable kilograms.'
		}
	]}
	faqs={guideFaqs}
	bottomCtaHeadline="See the wage sheet with your garden's rates"
	bottomCtaParagraph="Book a free demo with your task norms and deduction slabs loaded. Sarbani Associates walks your office staff through the full payroll flow. Demo, on-site setup, and staff training are free."
	breadcrumbs={[
		{ name: 'Home', path: '/' },
		{ name: 'Guides', path: '/guides' },
		{
			name: 'How Tea Garden Hazira is Calculated',
			path: '/guides/how-tea-garden-hazira-is-calculated'
		}
	]}
>
	<h2 class="guide-h2">1. The building blocks of tea garden wages</h2>
	<p class="guide-p">
		Tea garden pay does not run on a simple hourly shift. It combines wage settlements agreed at the
		industry level with productivity incentives tied to field output. A plucker's daily pay packet
		typically has four parts:
	</p>
	<ul class="guide-list">
		<li>
			<strong>Base task hazira:</strong> the standard daily wage credited when the worker meets the morning
			muster and completes the designated task, often a 20 kg to 24 kg leaf norm depending on region and
			season.
		</li>
		<li>
			<strong>Over-kilo incentive:</strong> a per-kilogram payment for all green leaf plucked beyond the
			base task.
		</li>
		<li>
			<strong>Tikka or double hazira:</strong> compensation for extra tasks such as afternoon work, spraying,
			drainage, or weekend plucking.
		</li>
		<li>
			<strong>Statutory deductions:</strong> PF, ESI where applicable, welfare fund, and recoveries such
			as store or ration advances.
		</li>
	</ul>

	<h2 class="guide-h2">2. The plucking hazira formula</h2>
	<p class="guide-p">
		During the plucking season, leaf payment drives most of the labour bill. The calculation follows
		the same three steps whether it is done on paper or in software:
	</p>
	<div class="guide-note">
		<p class="font-semibold text-heading">Step 1. Net leaf</p>
		<p class="mt-1">
			Gross scale weight - bag or basket tare - wet leaf deduction = net leaf in kg
		</p>
		<p class="mt-3 font-semibold text-heading">Step 2. Incentive kilograms</p>
		<p class="mt-1">Net leaf - base task norm = incentive kilograms</p>
		<p class="mt-3 font-semibold text-heading">Step 3. Gross daily pay</p>
		<p class="mt-1">
			Base hazira rate + (incentive kilograms × extra kilo rate) + allowances = gross daily pay
		</p>
	</div>
	<p class="guide-p">
		For example, a garden running a 24 kg norm at a 250 rupee hazira and 3 rupees per extra kilo
		pays a worker who brings 38 kg of clean leaf: 250 for hazira, plus 14 incentive kilograms at 3
		rupees, which is 292 rupees gross. Rates differ by region and wage settlement, so confirm your
		estate's norms before comparing.
	</p>

	<h2 class="guide-h2">3. Wet leaf deductions and tare</h2>
	<p class="guide-p">
		Green leaf picked in morning fog or monsoon rain carries surface water. If that water is paid as
		leaf, the estate overpays incentives and the factory receives less usable leaf than the register
		claims.
	</p>
	<p class="guide-p">
		Estates handle this with wet leaf deduction slabs, often 10% to 20% depending on conditions. On
		manual scales the deduction is decided by the weighing clerk and written on a slip, which is
		exactly where disputes start. A recorded slab applied by the app removes the argument, because
		every worker sees the same rule on the same day.
	</p>

	<h2 class="guide-h2">4. Where manual hazira calculation breaks down</h2>
	<p class="guide-p">
		Paper muster books and kamdari registers carry the system, and the monthly payroll pays for it:
	</p>
	<div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
		<div class="rounded-xl border border-border bg-white p-5 shadow-card">
			<h3 class="text-[15px] font-semibold text-heading">Clerical bottleneck</h3>
			<p class="mt-1 text-sm leading-relaxed text-text-secondary">
				Office staff spend days every month copying handwritten weighment slips into spreadsheets,
				which delays wages and invites calculation errors.
			</p>
		</div>
		<div class="rounded-xl border border-border bg-white p-5 shadow-card">
			<h3 class="text-[15px] font-semibold text-heading">Proxy hazira leaks</h3>
			<p class="mt-1 text-sm leading-relaxed text-text-secondary">
				Colleagues answering roll-call for absent workers, or leaf shifted between baskets, turns
				into unearned hazira and incentive payments.
			</p>
		</div>
	</div>

	<h2 class="guide-h2">5. Automating hazira with GardenSuite</h2>
	<p class="guide-p">GardenSuite closes the gap between the field and the wage sheet:</p>
	<ul class="guide-list">
		<li>
			<strong>Verified attendance:</strong> face checks at muster help stop proxy hazira, and every record
			carries its section, work code, and time.
		</li>
		<li>
			<strong>Linked weighing:</strong> the Bluetooth scale writes net leaf weight, after tare and rain
			slabs, against the verified worker.
		</li>
		<li>
			<strong>Office review first:</strong> records sync to the office where staff check status, corrections,
			and totals before anything is finalized.
		</li>
		<li>
			<strong>Payroll from reviewed data:</strong> finalized attendance and weight feed wage sheets with
			hazira, incentives, PF, ESI, and bonus calculated. The exact downstream connection is confirmed
			during setup.
		</li>
	</ul>
</ArticleLayout>
