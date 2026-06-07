<script lang="ts">
	import { onMount } from 'svelte';

	let sectionRef: HTMLElement | null = $state(null);
	let activeStep = $state(0);
	let isMobile = $state(true);

	const steps = [
		{
			step: '1',
			title: 'Open the field app',
			desc: 'The supervisor starts from the GardenSuite app home and chooses the harvest workflow for the day.',
			image: '/screenshots/workflow_avd/00_home_entry_points.png',
			alt: 'GardenSuite app home screen with harvest workflow entry points',
			kicker: 'Harvest workflow'
		},
		{
			step: '2',
			title: 'Start the field session',
			desc: 'Select the garden, section, activity, deduction, and task weight before plucking starts.',
			image: '/screenshots/workflow_avd/01_harvest_start_session_ready.png',
			alt: 'GardenSuite harvest start session screen ready for field setup',
			kicker: 'Session ready'
		},
		{
			step: '3',
			title: 'Record leaf weights',
			desc: 'Each worker record is saved in the active session, with leaf weight and daily totals visible to the supervisor.',
			image: '/screenshots/workflow_avd/05_harvest_active_records.png',
			alt: 'GardenSuite active harvest session showing saved worker leaf weight records',
			kicker: 'Active session'
		},
		{
			step: '4',
			title: 'Review the harvest list',
			desc: 'The supervisor can open the reports area and check the day\'s harvest sessions before sending data to the office.',
			image: '/screenshots/workflow_avd/18_reports_harvest_list.png',
			alt: 'GardenSuite reports screen showing harvest session list',
			kicker: 'Daily harvest list'
		},
		{
			step: '5',
			title: 'Check session details',
			desc: 'Open a session to review worker-wise leaf weight, totals, and saved records before payroll uses the data.',
			image: '/screenshots/workflow_avd/20_reports_session_detail.png',
			alt: 'GardenSuite harvest session detail report with worker records and totals',
			kicker: 'Session detail'
		},
		{
			step: '6',
			title: 'Sync to the office',
			desc: 'Saved records upload when network is available, ready for payroll, reports, and office checking.',
			image: '/screenshots/workflow_avd/27_sync_status.png',
			alt: 'GardenSuite sync status screen showing saved records uploaded to the office',
			kicker: 'Office sync'
		}
	];

	onMount(() => {
		const checkMobile = () => {
			isMobile = window.innerWidth < 1024;
		};

		const handleScroll = () => {
			if (isMobile || !sectionRef) return;
			const rect = sectionRef.getBoundingClientRect();
			const totalScroll = rect.height - window.innerHeight;
			if (totalScroll <= 0) return;

			const progress = Math.min(Math.max(-rect.top / totalScroll, 0), 1);
			const index = Math.min(Math.floor(progress * steps.length), steps.length - 1);
			activeStep = index;
		};

		window.addEventListener('resize', checkMobile);
		window.addEventListener('scroll', handleScroll, { passive: true });

		checkMobile();
		handleScroll();

		return () => {
			window.removeEventListener('resize', checkMobile);
			window.removeEventListener('scroll', handleScroll);
		};
	});

	const handleStepClick = (index: number) => {
		if (isMobile) {
			activeStep = index;
			return;
		}
		if (!sectionRef) return;
		const rect = sectionRef.getBoundingClientRect();
		const containerScrollTop = window.scrollY + rect.top;
		const totalScroll = rect.height - window.innerHeight;
		const targetScrollY = containerScrollTop + ((index + 0.3) / steps.length) * totalScroll;
		window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
	};
</script>

<section
	bind:this={sectionRef}
	class="relative w-full border-b border-[#E4E4E7] bg-white lg:h-[420vh]"
	aria-labelledby="workflow-heading"
>
	<!-- Sticky viewport: pins on desktop, flows on mobile -->
	<div class="relative w-full px-6 py-20 md:px-12 md:py-28 lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:overflow-hidden lg:py-0">
		<div class="mx-auto w-full max-w-[1344px]">

			<!-- Section header -->
			<div class="mb-12 max-w-[560px] lg:mb-0 lg:hidden">
				<span class="mb-3 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase lg:mb-4">
					Process Flow
				</span>
				<h2
					id="workflow-heading"
					class="text-[28px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[36px]"
					style="text-wrap: balance"
				>
					From field app to office sync in six steps.
				</h2>
				<p class="mt-4 text-[16px] leading-[1.65] text-[#374151] md:text-[17px]">
					The field flow stays simple for supervisors. Start the harvest session, save worker records, review the day's work, and sync to the office.
				</p>
			</div>

			<!-- Main grid: steps left, phone right -->
			<div class="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
				<!-- Left: scrollable step list -->
				<div>
					<!-- Desktop-only header above steps -->
					<div class="mb-10 hidden max-w-[480px] lg:block">
						<span class="mb-3 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase lg:mb-4">
							Process Flow
						</span>
						<p
							class="text-[34px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px]"
							style="text-wrap: balance"
							aria-hidden="true"
						>
							From field app to office sync in six steps.
						</p>
						<p class="mt-4 text-[16px] leading-[1.65] text-[#374151] md:text-[17px]">
							The field flow stays simple for supervisors. Start the harvest session, save worker records, review the day's work, and sync to the office.
						</p>
					</div>

					<div class="grid gap-3">
						{#each steps as item, i}
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<div
								role="button"
								tabindex="0"
								class="group cursor-pointer rounded-2xl border p-5 text-left transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
								{activeStep === i
									? 'bg-white border-[#E4E4E7] shadow-[0_2px_12px_rgba(0,0,0,0.06)]'
									: 'bg-transparent border-transparent hover:bg-[#FAFAF7] hover:border-[#E4E4E7]/60'}"
								onclick={() => handleStepClick(i)}
								onkeydown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										handleStepClick(i);
										e.preventDefault();
									}
								}}
							>
								<div class="flex items-center gap-4">
									<!-- Step number pill -->
									<span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold transition-colors duration-300
										{activeStep === i
											? 'bg-[#1B5E3B] text-white'
											: 'bg-[#F1F1F1] text-[#71717A]'}">
										{item.step}
									</span>
									<h3 class="text-[16px] font-semibold tracking-[-0.02em] transition-colors duration-300 md:text-[17px]
										{activeStep === i ? 'text-[#111111]' : 'text-[#71717A]'}">
										{item.title}
									</h3>
								</div>

								{#if activeStep === i}
									<div class="mt-3 animate-fade-in pl-12">
										<p class="text-[14px] leading-[1.6] text-[#4B5563]">{item.desc}</p>
									</div>

									<!-- Mobile: show screenshot inline -->
									<div class="mt-5 flex justify-center lg:hidden">
										<div class="device-frame-phone w-[180px]">
											<div class="device-frame-phone-inner aspect-[9/19.5]">
												<img
													src={item.image}
													alt={item.alt}
													width="412"
													height="915"
													class="h-full w-full object-cover object-top"
													loading="lazy"
												/>
											</div>
										</div>
									</div>
								{/if}
							</div>
						{/each}
					</div>
				</div>

				<!-- Right: sticky phone mockup (desktop only) -->
				<div class="hidden lg:flex lg:items-center lg:justify-center">
					<div class="relative">

						<div class="relative">
							{#each steps as item, i}
								<div
									class="device-frame-phone w-[260px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] xl:w-[280px]
									{activeStep === i
										? 'opacity-100 scale-100'
										: 'opacity-0 scale-95 absolute inset-0 pointer-events-none'}"
								>
									<div class="device-frame-phone-inner aspect-[9/19.5]">
										<img
											src={item.image}
											alt={item.alt}
											width="412"
											height="915"
											class="h-full w-full object-cover object-top"
											loading={i === 0 ? 'eager' : 'lazy'}
										/>
									</div>
								</div>
							{/each}

							<!-- Kicker label below phone -->
							<div class="mt-5 text-center">
								<span class="inline-flex rounded-full border border-[#E4E4E7] bg-[#FAFAF7] px-3 py-1 text-[11px] font-semibold tracking-[0.04em] text-[#374151] transition-all duration-500">
									{steps[activeStep].kicker}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes fade-in {
		0% {
			opacity: 0;
			transform: translateY(4px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.3s ease-out forwards;
	}
</style>
