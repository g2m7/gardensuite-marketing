<script lang="ts">
	import { onMount } from 'svelte';
	import { initScrollReveal } from '$lib/scroll-reveal';
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { softwareSchema, breadcrumbSchema } from '$lib/seo/schemas';

	// Shared layout components
	import ProductHero from '$lib/components/product/ProductHero.svelte';
	import ProductTrustRow from '$lib/components/product/ProductTrustRow.svelte';
	import ProductProblemStrip from '$lib/components/product/ProductProblemStrip.svelte';
	import ProductRollout from '$lib/components/product/ProductRollout.svelte';

	onMount(() => {
		return initScrollReveal();
	});

	const demoHref = '/#contact';

	const problems = [
		{
			title: 'Information arrives late',
			desc: 'Daily reports are compiled manually and sent via WhatsApp or email. By the time you see them, the day is over.'
		},
		{
			title: 'Data is scattered',
			desc: 'Plucking in one spreadsheet, factory in another, labour in a register. No single view of how the garden is doing today.'
		},
		{
			title: 'Cannot compare',
			desc: 'No easy way to compare this week vs last week, or this section vs that section. Trends stay hidden in piles of paper.'
		}
	];

	const rollout = [
		{ step: '1', title: 'Site Visit', desc: 'Sarbani team visits your garden to understand your workflow.' },
		{ step: '2', title: 'On-site Setup', desc: 'Software installed and configured at the garden.' },
		{ step: '3', title: 'Staff Training', desc: 'Hands-on training for office and field staff.' },
		{ step: '4', title: 'Go-Live Support', desc: 'Support stays on-site until your team is confident.' }
	];
</script>

<SeoHead
	title="Tea Garden MIS Dashboard - Daily Reports Online | GardenSuite"
	description="Daily Report (MIS Dashboard) for tea gardens. See plucking, production, labour, and factory numbers on phone, tablet, or laptop."
	canonical="https://gardensuite.in/products/mis"
	schema={[
		softwareSchema({
			name: 'GardenSuite Daily MIS Report',
			description: 'Daily Report (MIS Dashboard) for tea gardens. Monitor plucking, production, labour, and factory numbers from phone, tablet, or laptop.',
			os: 'Web, Windows, Android'
		}),
		breadcrumbSchema([
			{ name: 'Home', path: '/' },
			{ name: 'Products', path: '/#products' },
			{ name: 'Daily Report', path: '/products/mis' }
		])
	]}
/>

<div class="flex min-h-screen w-full flex-col overflow-clip bg-white antialiased">
	<main>
		<ProductHero
			badgeText="Daily Report"
			headline="Your tea garden report, in your hand."
			paragraph="Owners and managers do not need to wait for phone calls and meetings. See daily plucking, production, labour, and factory numbers from anywhere."
			{demoHref}
		>
			<!-- Hero mockup element inside the slot -->
			<div class="relative mx-auto mt-16 w-full max-w-[960px] rounded-[28px] border border-white/60 bg-[#DDEFE4] p-5 shadow-[0_24px_62px_rgba(15,46,12,0.1)] md:p-8">
				<div class="absolute inset-0 z-0 bg-gradient-to-b from-[#F8FAF8] to-[#E8F3ED] opacity-90 rounded-[28px]"></div>
				<div class="dot-grid-light absolute inset-0 z-0 opacity-40 rounded-[28px]"></div>
				
				<div class="relative z-10 overflow-hidden rounded-2xl border border-[#E4E4E7] bg-[#1a1a1a] shadow-[0_20px_80px_rgba(0,0,0,0.15)]">
					<!-- Browser titlebar mockup -->
					<div class="flex items-center gap-2 border-b border-white/[0.06] bg-[#1a1a1a] px-4 py-2.5">
						<div class="flex gap-1.5">
							<div class="h-2.5 w-2.5 rounded-full bg-[#FF5F57]"></div>
							<div class="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]"></div>
							<div class="h-2.5 w-2.5 rounded-full bg-[#28C840]"></div>
						</div>
						<div class="flex flex-1 justify-center">
							<div class="flex min-w-[240px] items-center gap-1.5 rounded-md bg-white/[0.06] px-3 py-1">
								<svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
									<path d="M2 6h8M6 2v8" stroke="white" stroke-opacity="0.3" stroke-width="1.2" stroke-linecap="round"/>
								</svg>
								<span class="text-[11px] text-white/30">gardensuite.in/dashboard</span>
							</div>
						</div>
					</div>
					<img
						src="/mis-dashboard.png"
						alt="GardenSuite daily report dashboard"
						class="h-auto w-full object-cover object-top"
						width="1400"
						height="757"
						loading="eager"
						fetchpriority="high"
					/>
				</div>
			</div>
		</ProductHero>

		<ProductTrustRow 
			stats={[
				{ value: '20+', label: 'Tea Estates' },
				{ value: '7', label: 'Regions' },
				{ value: 'Since 2000', label: 'In Tea Gardens' }
			]}
			showOfflineBadge={true}
		/>

		<ProductProblemStrip
			tagText="The old way"
			headline="Decisions wait for phone calls and physical meetings."
			paragraph="Daily reports are compiled manually and sent via WhatsApp or email. By the time you see them, the day is over and data is scattered."
			{problems}
		/>

		<!-- Story 1: One Dashboard -->
		<section class="reveal-on-scroll relative w-full bg-[#FAFAF7] border-b border-[#E4E4E7] py-24 md:py-32">
			<div class="mx-auto max-w-[1344px] px-6 md:px-12">
				<div class="mb-14 text-center">
					<span
						class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
						>What you see</span
					>
					<h2
						class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px]"
						style="text-wrap: balance"
					>
						Every number. One dashboard.
					</h2>
					<p class="mx-auto mt-5 max-w-[560px] text-[17px] leading-[1.6] text-[#52525B]">
						Data from attendance, weighing, payroll, factory, and stores flows into one cloud
						dashboard. Updated daily. Accessible from any device.
					</p>
				</div>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
					{#each [{ title: 'Plucking & Leaf Intake', desc: 'Section-wise green leaf weights, worker count, and per-worker yield. Compare day over day and week over week.', icon: 'leaf' }, { title: 'Factory Production', desc: 'Made tea output, grade-wise breakdown, manufacturing cost, and withering-to-drying status. Live batch tracking.', icon: 'factory' }, { title: 'Labour & Payroll', desc: 'Attendance summary, wage breakdown, overtime, and advance positions. Know your daily and monthly labour cost.', icon: 'labour' }] as item}
						<div
							class="rounded-[24px] border border-white/70 bg-white p-6 shadow-[0_12px_36px_rgba(0,0,0,0.04)] hover:shadow-card-hover hover:border-[#E4E4E7] transition-all duration-300 md:p-8"
						>
							<div
								class="mb-5 flex h-12 w-12 items-center justify-center rounded-[18px] bg-[#1B5E3B]/10 text-[#1B5E3B]"
							>
								{#if item.icon === 'leaf'}
									<svg
										width="22"
										height="22"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="1.5"
										aria-hidden="true"
										><path d="M12 2a10 10 0 0 0 0 20 10 10 0 0 0 0-20z" /><path
											d="M12 2c-2.8 2.8-4 6.5-4 10s1.2 7.2 4 10"
										/><path d="M12 2c2.8 2.8 4 6.5 4 10s-1.2 7.2-4 10" /></svg
									>
								{:else if item.icon === 'factory'}
									<svg
										width="22"
										height="22"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="1.5"
										aria-hidden="true"
										><path d="M3 21h18M5 21V9l4 3V7l4 3V5l4 3v13" stroke-linejoin="round" /><path
											d="M9 14h1M13 14h1M9 17h1M13 17h1"
											stroke-linecap="round"
										/></svg
									>
								{:else}
									<svg
										width="22"
										height="22"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="1.5"
										aria-hidden="true"
										><circle cx="12" cy="8" r="4" /><path
											d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"
										/></svg
									>
								{/if}
							</div>
							<h3 class="text-[17px] font-semibold tracking-[-0.01em] text-[#111111]">
								{item.title}
							</h3>
							<p class="mt-2 text-[14px] leading-[1.65] text-[#52525B]">{item.desc}</p>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- Story 2: Access Anywhere -->
		<section class="reveal-on-scroll relative w-full bg-white border-b border-[#E4E4E7] py-24 md:py-32">
			<div
				class="mx-auto grid max-w-[1344px] items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-12"
			>
				<div>
					<span
						class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
						>Access anywhere</span
					>
					<h2
						class="text-[32px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[40px]"
						style="text-wrap: balance"
					>
						Check your garden from Kolkata, Siliguri, or anywhere.
					</h2>
					<p class="mt-5 text-[17px] leading-[1.6] text-[#52525B]">
						The MIS dashboard runs online. Open it on phone, tablet, or laptop. Your garden numbers
						stay one tap away.
					</p>
					<ul class="mt-6 flex flex-col gap-3" role="list">
						{#each ['Works on phone, tablet, and laptop', 'Cloud-hosted - no software to install', 'Data syncs automatically from the garden'] as bullet}
							<li class="flex items-center gap-2.5">
								<div
									class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1B5E3B]/10 text-[#1B5E3B]"
								>
									<svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
										><path
											d="M2 5l2 2 4-4"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/></svg
									>
								</div>
								<span class="text-[14px] font-medium text-[#3F3F46]">{bullet}</span>
							</li>
						{/each}
					</ul>
				</div>

				<div class="relative flex justify-center">
					<div
						class="w-full max-w-[500px] overflow-hidden rounded-[20px] border border-[#E4E4E7] bg-[#1a1a1a] shadow-[0_30px_100px_rgba(0,0,0,0.18)]"
					>
						<div class="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
							<div class="flex gap-1.5">
								<div class="h-2.5 w-2.5 rounded-full bg-[#FF5F57]"></div>
								<div class="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]"></div>
								<div class="h-2.5 w-2.5 rounded-full bg-[#28C840]"></div>
							</div>
							<div class="flex flex-1 justify-center">
								<div
									class="flex min-w-[240px] items-center gap-1.5 rounded-md bg-white/[0.06] px-3 py-1"
								>
									<svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true"
										><path
											d="M2 6h8M6 2v8"
											stroke="white"
											stroke-opacity="0.3"
											stroke-width="1.2"
											stroke-linecap="round"
										/></svg
									>
									<span class="text-[11px] text-white/30">gardensuite.in/dashboard</span>
								</div>
							</div>
						</div>
						<img
							src="/mis-dashboard.png"
							alt="GardenSuite dashboard showing daily report"
							class="h-auto w-full object-cover object-top"
							width="1400"
							height="900"
						/>
					</div>
				</div>
			</div>
		</section>

		<!-- Key Metrics Row -->
		<section class="reveal-on-scroll relative w-full border-b border-[#E4E4E7] bg-white py-16">
			<div
				class="mx-auto flex max-w-[1344px] flex-col items-center gap-8 px-6 md:flex-row md:justify-between md:gap-12 md:px-12"
			>
				<div class="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-14">
					<div class="flex flex-col items-center gap-1">
						<span class="text-[32px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[36px]"
							>5</span
						>
						<span class="text-[13px] font-semibold tracking-[0.04em] text-[#71717A] uppercase"
							>Data Sources</span
						>
					</div>
					<div class="hidden h-8 w-px bg-[#E4E4E7] md:block"></div>
					<div class="flex flex-col items-center gap-1">
						<span class="text-[32px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[36px]"
							>Daily</span
						>
						<span class="text-[13px] font-semibold tracking-[0.04em] text-[#71717A] uppercase"
							>Updated</span
						>
					</div>
					<div class="hidden h-8 w-px bg-[#E4E4E7] md:block"></div>
					<div class="flex flex-col items-center gap-1">
						<span class="text-[32px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[36px]"
							>Any</span
						>
						<span class="text-[13px] font-semibold tracking-[0.04em] text-[#71717A] uppercase"
							>Device</span
						>
					</div>
				</div>
				<div class="flex flex-col items-center gap-1 md:items-end">
					<span class="text-[14px] font-semibold text-[#3F3F46]"
						>All modules feed into one dashboard</span
					>
					<span class="text-[13px] text-[#71717A]">Attendance, payroll, factory, stores</span>
				</div>
			</div>
		</section>

		<ProductRollout
			tagText="How rollout works"
			headline="From first call to running live."
			paragraph="Our team sets up the cloud integrations and trains dashboard users. We support your managers on phone and tablet."
			steps={rollout}
		/>
	</main>
</div>

<style>
	:global(.reveal-on-scroll) {
		opacity: 0;
		transform: translateY(24px);
		transition:
			opacity 0.7s ease-out,
			transform 0.7s ease-out;
	}
	:global(.reveal-on-scroll.is-visible) {
		opacity: 1;
		transform: translateY(0);
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.reveal-on-scroll) {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
</style>
