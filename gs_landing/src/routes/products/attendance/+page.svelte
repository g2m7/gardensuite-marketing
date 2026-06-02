<script lang="ts">
	import { onMount } from 'svelte';
	import { initScrollReveal } from '$lib/scroll-reveal';
	import ScaleWorkflow from './ScaleWorkflow.svelte';
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { softwareSchema, breadcrumbSchema } from '$lib/seo/schemas';

	onMount(() => {
		return initScrollReveal();
	});

	const demoHref = '/#contact';

	const problems = [
		{
			title: 'Proxy attendance',
			desc: 'Workers may mark attendance for others. The office may pay for people who did not report.'
		},
		{
			title: 'Loose weight chits',
			desc: 'Leaf weight written on paper can be delayed, changed, or entered against the wrong worker.'
		},
		{
			title: 'Payroll doubts',
			desc: 'When attendance and leaf weight are separate, payroll staff spend extra time checking records.'
		}
	];

	const proofRows = [
		['Face check', 'Worker identity verified before attendance'],
		['Weight capture', 'Bluetooth scale sends kg to the same record'],
		['Offline save', 'Field data is stored even without internet'],
		['Office sync', 'Payroll and reports use the captured data']
	];

	const rollout = [
		['1', 'Garden visit', 'Sarbani Associates checks your section, worker, and weighing workflow.'],
		[
			'2',
			'Setup',
			'Face app, scale, and GardenSuite office software are configured for your garden.'
		],
		[
			'3',
			'Training',
			'Supervisors and office staff learn the daily flow using real worker records.'
		],
		['4', 'Support', 'The Sarbani team supports your staff until the process is steady.']
	];

	const buyers = [
		['Manager', 'Know who reported today and how much leaf was collected.'],
		['Owner', 'Check daily attendance and plucking numbers from outside the garden.'],
		['Office staff', 'Use the same attendance and weight data for payroll.']
	];
</script>

<SeoHead
	title="Tea Garden Attendance System - Face & Weighing | GardenSuite"
	description="Face attendance and Bluetooth smart weighing for tea gardens. Verify workers, record leaf weight, work offline, and sync data for payroll."
	canonical="https://gardensuite.in/products/attendance"
	ogImage="https://gardensuite.in/og/face-attendance-weight-price-v4.jpg"
	schema={[
		softwareSchema({
			name: 'GardenSuite Face Attendance & Smart Weighing',
			description: 'Face attendance and Bluetooth smart weighing software for tea gardens. Verifies workers, records leaf weight, works offline, and syncs data for payroll.',
			os: 'Android, Windows'
		}),
		breadcrumbSchema([
			{ name: 'Home', path: '/' },
			{ name: 'Products', path: '/#products' },
			{ name: 'Face Attendance & Smart Weighing', path: '/products/attendance' }
		])
	]}
/>

<div class="flex min-h-screen w-full flex-col overflow-clip bg-[#FAFAF7] antialiased">
	<main>
		<section
			class="relative w-full border-b border-[#F0F0F0] bg-white pt-24 pb-16 md:pt-36 md:pb-24"
		>
			<div
				class="mx-auto grid max-w-[1344px] items-center gap-12 px-6 md:grid-cols-[0.92fr_1.08fr] md:px-12"
			>
				<div>
					<h1
						class="mt-5 max-w-[640px] text-[36px] leading-[1.04] font-semibold tracking-[-0.04em] text-[#111111] md:text-[56px] lg:text-[64px]"
						style="text-wrap: balance"
					>
						Verify the worker before weight reaches payroll.
					</h1>
					<p
						class="mt-5 max-w-[560px] text-[16px] leading-[1.6] text-[#52525B] md:mt-6 md:text-[18px]"
					>
						Face attendance checks the worker. The Bluetooth hanging scale records leaf weight
						against the same worker. Both work offline at the garden and sync when internet returns.
					</p>
					<div class="mt-6 grid grid-cols-[0.72fr_1fr] items-end gap-3 sm:hidden">
						<figure
							class="rounded-lg border border-[#E4E4E7] bg-[#FAFAF7] p-2 shadow-[0_12px_36px_rgba(0,0,0,0.06)]"
						>
							<img
								src="/screenshots/face-attendance_liveness-check_passed.png"
								alt="GardenSuite face attendance app showing liveness check passed"
								width="1080"
								height="2400"
								class="aspect-[9/13] w-full rounded-md object-cover object-top"
								fetchpriority="high"
							/>
						</figure>
						<figure
							class="rounded-lg border border-[#E4E4E7] bg-white p-3 shadow-[0_12px_36px_rgba(0,0,0,0.06)]"
						>
							<img
								src="/bluetooth-scale.svg"
								alt="Bluetooth hanging scale used with GardenSuite smart weighing"
								width="512"
								height="512"
								class="mx-auto w-full max-w-[150px]"
								fetchpriority="high"
							/>
						</figure>
					</div>
					<div class="mt-8 flex flex-col gap-3 sm:flex-row">
						<a
							href={demoHref}
							class="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1B5E3B] px-6 text-[15px] font-semibold text-white shadow-[0_2px_12px_rgba(27,94,59,0.18)] transition duration-150 hover:bg-[#144723] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.98]"
						>
							Book Free Demo
						</a>
						<a
							href="#workflow"
							class="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#D4D4D8] bg-white px-6 text-[15px] font-semibold text-[#111111] transition duration-150 hover:border-[#A1A1AA] hover:bg-[#FAFAF7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.98]"
						>
							See Workflow
						</a>
					</div>
					<div class="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[13px] text-[#52525B]">
						<span><strong class="font-semibold text-[#111111]">20+</strong> tea estates</span>
						<span
							><strong class="font-semibold text-[#111111]">Since 2000</strong> in tea gardens</span
						>
						<span
							><strong class="font-semibold text-[#111111]">Sarbani Associates</strong> support</span
						>
					</div>
				</div>

				<div class="relative hidden sm:block">
					<div class="grid items-center gap-5 sm:grid-cols-[0.95fr_1.05fr]">
						<figure
							class="rounded-lg border border-[#E4E4E7] bg-[#FAFAF7] p-3 shadow-[0_18px_55px_rgba(0,0,0,0.07)]"
						>
							<img
								src="/screenshots/face-attendance_liveness-check_passed.png"
								alt="GardenSuite face attendance app showing liveness check passed"
								width="1080"
								height="2400"
								class="aspect-[9/20] w-full rounded-md object-cover object-top"
								fetchpriority="high"
							/>
						</figure>
						<figure
							class="rounded-lg border border-[#E4E4E7] bg-white p-8 shadow-[0_18px_55px_rgba(0,0,0,0.07)]"
						>
							<img
								src="/bluetooth-scale.svg"
								alt="Bluetooth hanging scale used with GardenSuite smart weighing"
								width="512"
								height="512"
								class="mx-auto w-full max-w-[300px]"
								fetchpriority="high"
							/>
							<figcaption class="mt-5 text-center text-[14px] font-semibold text-[#111111]">
								Leaf weight linked to verified worker
							</figcaption>
						</figure>
					</div>
				</div>
			</div>
		</section>

		<section class="w-full border-b border-[#F0F0F0] bg-white py-14 md:py-18">
			<div class="mx-auto max-w-[1344px] px-6 md:px-12">
				<div class="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start">
					<div>
						<h2
							class="mt-3 text-[30px] leading-[1.1] font-semibold tracking-[-0.04em] text-[#111111] md:text-[42px]"
							style="text-wrap: balance"
						>
							Attendance and leaf weight should not depend on paper.
						</h2>
					</div>
					<div class="grid gap-4 md:grid-cols-3">
						{#each problems as item}
							<article class="rounded-xl border border-[#FECACA] bg-[#FEF2F2] p-5">
								<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#DC2626]/10">
									<svg
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										aria-hidden="true"
									>
										<path
											d="M12 8v5M12 17h.01M10.3 4.6 2.9 17.4A2 2 0 0 0 4.6 20h14.8a2 2 0 0 0 1.7-2.6L13.7 4.6a2 2 0 0 0-3.4 0Z"
											stroke="#DC2626"
											stroke-width="1.8"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</div>
								<h3 class="text-[17px] font-semibold tracking-[-0.01em] text-[#7F1D1D]">
									{item.title}
								</h3>
								<p class="mt-2 text-[14px] leading-[1.6] text-[#991B1B]">{item.desc}</p>
							</article>
						{/each}
					</div>
				</div>
			</div>
		</section>

		<section
			class="reveal-on-scroll w-full bg-[#FAFAF7] py-18 md:py-24"
			aria-labelledby="proof-heading"
		>
			<div
				class="mx-auto grid max-w-[1344px] gap-10 px-6 md:grid-cols-[0.95fr_1.05fr] md:items-center md:px-12"
			>
				<div>
					<h2
						id="proof-heading"
						class="mt-3 text-[32px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px]"
						style="text-wrap: balance"
					>
						One field entry feeds attendance, leaf weight, payroll, and reports.
					</h2>
					<p class="mt-5 max-w-[560px] text-[17px] leading-[1.65] text-[#52525B]">
						The supervisor does not need separate registers for attendance and weighing. The worker
						is verified, the kg is captured, and the record is ready for the office.
					</p>
				</div>
				<div class="rounded-xl border border-[#D4E8D4] bg-[#F8FAF8] p-6 md:p-8">
					<div class="relative">
						{#each proofRows as row, i}
							<div class="relative flex gap-4 pb-8 last:pb-0">
								<div class="flex flex-col items-center">
									<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1B5E3B] text-sm font-bold text-white">
										{i + 1}
									</div>
									{#if i < proofRows.length - 1}
										<div class="mt-2 w-px flex-1 bg-[#C8DDB8]"></div>
									{/if}
								</div>
								<div class="pb-2">
									<h3 class="text-[15px] font-semibold text-[#111111]">{row[0]}</h3>
									<p class="mt-1 text-[14px] leading-[1.6] text-[#52525B]">{row[1]}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</section>

		<div id="workflow">
			<ScaleWorkflow />
		</div>

		<section class="reveal-on-scroll w-full border-y border-[#F0F0F0] bg-white py-14 md:py-18">
			<div class="mx-auto grid max-w-[1344px] gap-8 px-6 md:grid-cols-4 md:items-center md:px-12">
				<div class="md:col-span-1">
					<h2
						class="mt-3 text-[28px] leading-[1.12] font-semibold tracking-[-0.04em] text-[#111111]"
					>
						Field data the office can use.
					</h2>
				</div>
				<div class="grid gap-4 md:col-span-3 md:grid-cols-3">
					{#each ['Attendance is tied to face verification', 'Leaf kg is tied to the same worker', 'Payroll starts from captured records'] as item}
						<div class="rounded-xl border border-[#C8DDB8] bg-[#F1F6EB] p-5">
							<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#1B5E3B]">
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									aria-hidden="true"
								>
									<path
										d="m5 13 4 4L19 7"
										stroke="white"
										stroke-width="2.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
							<p class="text-[15px] leading-[1.45] font-semibold text-[#0F2E0C]">{item}</p>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<section
			class="reveal-on-scroll w-full bg-[#FAFAF7] py-18 md:py-24"
			aria-labelledby="rollout-heading"
		>
			<div class="mx-auto max-w-[1344px] px-6 md:px-12">
				<div class="mb-10 max-w-[620px]">
					<h2
						id="rollout-heading"
						class="mt-3 text-[32px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px]"
						style="text-wrap: balance"
					>
						Sarbani Associates sets it up with your staff.
					</h2>
					<p class="mt-5 text-[17px] leading-[1.65] text-[#52525B]">
						GardenSuite is not handed over as a self-service app. The Sarbani team visits, installs,
						trains, and supports the garden.
					</p>
				</div>
				<div class="relative">
					<div class="absolute top-8 left-8 hidden h-[calc(100%-64px)] w-px bg-[#C8DDB8] md:block"></div>
					<div class="grid gap-6 md:gap-8">
						{#each rollout as item}
							<div class="relative flex gap-5 md:gap-6">
								<div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#1B5E3B] text-xl font-bold text-white shadow-[0_4px_12px_rgba(27,94,59,0.2)]">
									{item[0]}
								</div>
								<div class="rounded-xl border border-[#E4E4E7] bg-white p-5 shadow-sm md:p-6">
									<h3 class="text-[18px] font-semibold tracking-[-0.01em] text-[#111111]">
										{item[1]}
									</h3>
									<p class="mt-2 text-[15px] leading-[1.6] text-[#52525B]">{item[2]}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</section>

		<section class="reveal-on-scroll w-full bg-white px-6 py-20 md:px-12 md:py-28">
			<div class="mx-auto grid max-w-[1120px] gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
				<div>
					<h2
						class="text-[34px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[48px]"
						style="text-wrap: balance"
					>
						See face attendance and weighing at your garden.
					</h2>
					<p class="mt-5 text-[17px] leading-[1.65] text-[#52525B]">
						We will show the worker scan, scale capture, offline save, and sync flow. Demo, setup,
						and training are handled by Sarbani Associates.
					</p>
					<div class="mt-8 flex flex-col gap-3 sm:flex-row">
						<a
							href={demoHref}
							class="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1B5E3B] px-6 text-[15px] font-semibold text-white shadow-[0_2px_12px_rgba(27,94,59,0.18)] transition duration-150 hover:bg-[#144723] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.98]"
						>
							Book Free Demo
						</a>
						<a
							href="/#contact"
							class="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#D4D4D8] bg-white px-6 text-[15px] font-semibold text-[#111111] transition duration-150 hover:border-[#A1A1AA] hover:bg-[#FAFAF7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.98]"
						>
							Email Us
						</a>
					</div>
					<p class="mt-4 text-[13px] leading-[1.6] text-[#71717A]">
						Many estates keep software details private. We respect confidentiality and share
						region-level experience.
					</p>
				</div>
				<div class="grid gap-4">
					{#each buyers as item, i}
						<div class="relative rounded-xl border-l-4 border-[#1B5E3B] bg-[#F8FAF8] p-6">
							<svg class="absolute top-4 right-4 h-8 w-8 text-[#C8DDB8]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
								<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
							</svg>
							<h3 class="text-[15px] font-semibold text-[#1B5E3B]">{item[0]}</h3>
							<p class="mt-3 text-[15px] leading-[1.65] text-[#374151]">{item[1]}</p>
						</div>
					{/each}
				</div>
			</div>
		</section>
	</main>
</div>

<style>
	:global(.reveal-on-scroll) {
		opacity: 1;
		transform: none;
	}
	:global(.reveal-on-scroll.is-visible) {
		opacity: 1;
		transform: none;
	}
</style>
