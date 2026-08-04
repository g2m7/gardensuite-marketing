<script lang="ts">
	import { onMount } from 'svelte';

	let sectionRef: HTMLElement | null = $state(null);
	let scrollerRef: HTMLDivElement | null = $state(null);
	let trackRef: HTMLDivElement | null = $state(null);

	const steps = [
		{
			step: '1',
			title: 'Open app',
			desc: 'Choose Harvest from the field app.',
			image: '/screenshots/workflow_avd/00_home_entry_points.png',
			alt: 'GardenSuite app home screen with harvest workflow entry points',
			kicker: 'Harvest workflow',
			zoom: 1.55,
			focus: 'center 18%'
		},
		{
			step: '2',
			title: 'Start session',
			desc: 'Select garden, section, and task.',
			image: '/screenshots/workflow_avd/01_harvest_start_session_ready.png',
			alt: 'GardenSuite harvest start session screen ready for field setup',
			kicker: 'Session ready',
			zoom: 1.5,
			focus: 'center 20%'
		},
		{
			step: '3',
			title: 'Record weights',
			desc: 'Save worker leaf weight in the session.',
			image: '/screenshots/workflow_avd/05_harvest_active_records.png',
			alt: 'GardenSuite active harvest session showing saved worker leaf weight records',
			kicker: 'Active session',
			zoom: 1.6,
			focus: 'center 72%'
		},
		{
			step: '4',
			title: 'Review list',
			desc: 'Check the day\'s harvest sessions.',
			image: '/screenshots/workflow_avd/18_reports_harvest_list.png',
			alt: 'GardenSuite reports screen showing harvest session list',
			kicker: 'Daily harvest list',
			zoom: 1.45,
			focus: 'center 42%'
		},
		{
			step: '5',
			title: 'Check details',
			desc: 'Review worker-wise kg and totals.',
			image: '/screenshots/workflow_avd/20_reports_session_detail.png',
			alt: 'GardenSuite harvest session detail report with worker records and totals',
			kicker: 'Session detail',
			zoom: 1.5,
			focus: 'center 34%'
		},
		{
			step: '6',
			title: 'Sync office',
			desc: 'Upload saved records when network returns.',
			image: '/screenshots/workflow_avd/27_sync_status.png',
			alt: 'GardenSuite sync status screen showing saved records uploaded to the office',
			kicker: 'Office sync',
			zoom: 1.45,
			focus: 'center 22%'
		}
	];

	onMount(() => {
		const handleScroll = () => {
			if (!sectionRef || !scrollerRef || !trackRef) return;
			if (window.innerWidth < 1024) return;
			const rect = sectionRef.getBoundingClientRect();
			const totalScroll = rect.height - window.innerHeight;
			if (totalScroll <= 0) return;

			const progress = Math.min(Math.max(-rect.top / totalScroll, 0), 1);
			const containerLeft = scrollerRef.getBoundingClientRect().left;
			const maxTranslate = Math.max(trackRef.scrollWidth - window.innerWidth + containerLeft, 0);
			trackRef.style.transform = `translate3d(${-progress * maxTranslate}px, 0, 0)`;
		};

		const handleResize = () => {
			if (!trackRef) return;
			if (window.innerWidth < 1024) {
				trackRef.style.transform = '';
				return;
			}
			handleScroll();
		};

		let frame = 0;
		const updateFrame = () => {
			handleScroll();
			frame = window.requestAnimationFrame(updateFrame);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleResize);

		handleScroll();
		frame = window.requestAnimationFrame(updateFrame);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleResize);
			window.cancelAnimationFrame(frame);
		};
	});
</script>

<section
	bind:this={sectionRef}
	class="relative w-full border-b border-[#E4E4E7] bg-white py-20 md:py-28 lg:h-[500vh] lg:py-0"
	aria-labelledby="workflow-heading"
>
	<div class="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:overflow-hidden">
		<div class="mx-auto w-full max-w-[1344px] px-6 md:px-12">
			<div class="grid min-h-[calc(100vh-150px)] content-center gap-10 lg:gap-14">
				<div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div class="max-w-[620px]">
						<span class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">
							Process Flow
						</span>
						<h2
							id="workflow-heading"
							class="text-[34px] leading-[1.02] font-semibold tracking-[-0.04em] text-[#111111] md:text-[46px] lg:text-[56px]"
							style="text-wrap: balance"
						>
							Field app to office.
						</h2>
					</div>

					<div class="hidden items-center gap-2 md:flex" aria-hidden="true">
						{#each steps as item, i}
							<div class="h-1.5 w-4 rounded-full bg-[#D8DED9]"></div>
						{/each}
					</div>
				</div>

				<div bind:this={scrollerRef} class="overflow-x-auto lg:overflow-visible">
					<div
						bind:this={trackRef}
						class="workflow-track flex w-max gap-8 pr-[calc(50vw-140px)] md:gap-12 md:pr-[calc(50vw-180px)] lg:gap-16 lg:pr-[calc(50vw-200px)]"
					>
						{#each steps as item}
							<article class="workflow-slide w-[280px] shrink-0 md:w-[360px] lg:w-[400px]">
								<div class="relative flex h-[330px] items-center justify-center overflow-hidden rounded-lg border border-[#E4E4E7] bg-[#F8FAF8] md:h-[360px] lg:h-[380px]">
									<picture>
										<source srcset="/hero-sky.webp" type="image/webp" />
										<img
											src="/hero-sky.png"
											alt=""
											class="absolute inset-0 z-0 h-full w-full object-cover brightness-[1.12]"
											width="1024"
											height="1024"
											loading="lazy"
										/>
									</picture>
									<picture>
										<source
											srcset="/bg-960.webp 960w, /bg-1920.webp 1920w"
											sizes="(min-width: 1024px) 460px, 80vw"
											type="image/webp"
										/>
										<img
											src="/bg.png"
											alt=""
											class="absolute inset-x-0 bottom-0 z-[1] h-[54%] w-full object-cover object-top brightness-[1.12]"
											style="mask-image: linear-gradient(to bottom, transparent 0%, black 28%); -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 28%);"
											width="960"
											height="538"
											loading="lazy"
										/>
									</picture>

									<div class="device-frame-phone relative z-10 w-[142px] md:w-[160px] lg:w-[168px]">
										<div class="device-frame-phone-inner aspect-[9/19.5]">
											<img
												src={item.image}
												alt={item.alt}
												width="412"
												height="915"
												class="h-full w-full object-cover"
												style="transform: scale({item.zoom}); transform-origin: {item.focus};"
												loading={item.step === '1' ? 'eager' : 'lazy'}
											/>
										</div>
									</div>
								</div>

								<div class="mt-5">
									<div class="text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">
										{item.step.padStart(2, '0')} / {item.kicker}
									</div>
									<h3 class="mt-3 text-[28px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[32px]">
										{item.title}
									</h3>
									<p class="mt-2 max-w-[300px] text-[15px] leading-[1.55] text-[#4B5563]">
										{item.desc}
									</p>
								</div>
							</article>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@media (prefers-reduced-motion: reduce) {
		.workflow-track {
			transition: none;
		}
	}
</style>
