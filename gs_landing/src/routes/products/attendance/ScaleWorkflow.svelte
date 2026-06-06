<script lang="ts">
	import { onMount } from 'svelte';

	let workflowSection: HTMLElement;

	const steps = [
		{
			step: '1',
			title: 'Open the field app',
			desc: 'The supervisor starts from the GardenSuite app home and chooses the harvest workflow for field work.',
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
			kicker: 'Active session records'
		},
		{
			step: '4',
			title: 'Review the harvest list',
			desc: 'The supervisor can open the reports area and check the day’s harvest sessions before sending data to the office.',
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
		let cleanup = () => {};

		const setupAnimation = async () => {
			if (!workflowSection) return;

			const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			if (prefersReduced) {
				workflowSection.style.setProperty('--workflow-progress', '1');
				workflowSection.classList.add('workflow-ready');
				return;
			}

			const { gsap } = await import('gsap');
			const { ScrollTrigger } = await import('gsap/ScrollTrigger');
			gsap.registerPlugin(ScrollTrigger);

			const ctx = gsap.context(() => {
				gsap.set(workflowSection, { '--workflow-progress': 0 });

				workflowSection.classList.add('workflow-ready');

				gsap.to(workflowSection, {
					'--workflow-progress': 1,
					ease: 'none',
					scrollTrigger: {
						trigger: '.workflow-timeline',
						start: 'top 58%',
						end: 'bottom 58%',
						scrub: 0.65
					}
				});
			}, workflowSection);

			cleanup = () => ctx.revert();
		};

		setupAnimation();

		return () => cleanup();
	});
</script>

<section
	id="workflow"
	bind:this={workflowSection}
	class="relative w-full scroll-mt-24 overflow-hidden border-b border-[#E4E4E7] bg-white px-6 py-20 md:scroll-mt-28 md:px-12 md:py-28"
	aria-labelledby="workflow-heading"
>
	<div
		class="workflow-panel mx-auto max-w-[1240px]"
	>
		<div class="workflow-intro mx-auto max-w-3xl text-center">
			<span
				class="mb-4 inline-flex text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
				>Process Flow</span
			>
			<h2
				id="workflow-heading"
				class="text-[28px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[36px]"
				style="text-wrap: balance"
			>
				From field app to office sync in six steps.
			</h2>
			<p
				class="mx-auto mt-5 max-w-[640px] text-[16px] leading-[1.65] text-[#374151]"
			>
				The field flow stays simple for supervisors. Start the harvest session, save worker
				records, review the day’s work, and sync the same data to the office.
			</p>
		</div>

		<div class="workflow-timeline relative mt-14 md:mt-18">
			<div
				class="absolute top-0 bottom-0 left-4 w-px bg-[#DDEFE4] md:left-1/2 md:-translate-x-1/2"
				aria-hidden="true"
			></div>
			<div
				class="workflow-line-fill absolute top-0 bottom-0 left-4 w-px origin-top bg-[#1B5E3B] md:left-1/2 md:-translate-x-1/2"
				aria-hidden="true"
			></div>

			<div class="grid gap-10 md:gap-0">
				{#each steps as item, i}
					{@const visualFirst = i % 2 === 1}
					<article
						class="workflow-step relative grid gap-5 pl-12 md:grid-cols-[1fr_72px_1fr] md:items-center md:gap-8 md:py-7 md:pl-0"
						data-visual-first={visualFirst}
					>
						<div
							class="workflow-dot absolute top-2 left-4 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-white bg-[#1B5E3B] shadow-[0_0_0_1px_rgba(27,94,59,0.22)] md:top-1/2 md:left-1/2 md:-translate-y-1/2"
							aria-hidden="true"
						>
							<span
								class="workflow-dot-ring absolute inset-[-8px] rounded-full border border-[#1B5E3B]/20"
							></span>
						</div>

						<div class="workflow-copy {visualFirst ? 'md:order-3' : 'md:order-1'}">
							<div class="max-w-[360px] {visualFirst ? 'md:ml-0' : 'md:ml-auto'}">
								<span
									class="inline-flex rounded-full border border-[#1B5E3B]/15 bg-[#1B5E3B]/5 px-3 py-1 text-[11px] font-semibold tracking-[0.04em] text-[#1B5E3B]"
									>Step {item.step}</span
								>
								<h3
									class="mt-4 text-[22px] leading-[1.16] font-semibold tracking-[-0.02em] text-[#111111] md:text-[26px]"
								>
									{item.title}
								</h3>
								<p class="mt-3 text-[15px] leading-[1.65] text-[#4B5563]">
									{item.desc}
								</p>
							</div>
						</div>

						<div class="hidden md:order-2 md:block" aria-hidden="true"></div>

						<div class={visualFirst ? 'md:order-1' : 'md:order-3'}>
							<div
								class="workflow-card relative max-w-[380px] overflow-hidden rounded-xl border border-[#E4E4E7] bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover {visualFirst
									? 'md:ml-auto'
									: 'md:ml-0'}"
							>
								<div
									class="flex items-center justify-between border-b border-[#E4E4E7] bg-[#FAFAF7] px-4 py-3"
								>
									<span class="text-[12px] font-semibold tracking-[0.04em] text-[#1B5E3B]">
										{item.kicker}
									</span>
									<span class="h-2 w-2 rounded-full bg-[#1B5E3B]"></span>
								</div>
								<div
									class="workflow-card-panel flex min-h-[210px] items-center justify-center bg-[#F8F7F3] p-5 md:min-h-[250px]"
								>
									<div class="workflow-phone device-frame-phone w-[150px] md:w-[178px]">
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
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>

		<div
			class="workflow-note mx-auto mt-12 max-w-[720px] border-t border-[#E4E4E7] pt-7 text-center"
		>
			<p class="text-[15px] leading-[1.65] text-[#4B5563]">
				The same saved records help the office use leaf weight, attendance, payroll, and daily
				reports without repeated entry from paper registers.
			</p>
		</div>
	</div>
</section>

<style>
	.workflow-line-fill {
		transform: scaleY(var(--workflow-progress, 0));
	}

	@media (prefers-reduced-motion: reduce) {
		.workflow-line-fill {
			transform: scaleY(1);
		}
	}
</style>
