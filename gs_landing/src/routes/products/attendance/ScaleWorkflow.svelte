<script lang="ts">
	const steps = [
		{
			step: '1',
			title: 'Start the field session',
			desc: 'The supervisor selects section, activity, deduction, and task weight before plucking starts.',
			image: '/screenshots/smart-weighing_new-session_setup.png',
			alt: 'GardenSuite smart weighing setup screen for starting a field session',
			color: '#1B5E3B'
		},
		{
			step: '2',
			title: 'Capture leaf weight',
			desc: 'The hanging scale sends the kg to the phone. The supervisor can check the value before moving ahead.',
			image: '/bluetooth-scale.svg',
			alt: 'Bluetooth hanging scale for GardenSuite smart weighing',
			color: '#00695C'
		},
		{
			step: '3',
			title: 'Verify the worker',
			desc: 'The worker looks at the camera. Face attendance confirms the worker before the record is saved.',
			image: '/screenshots/face-attendance_liveness-check_passed.png',
			alt: 'GardenSuite face attendance screen showing liveness check passed',
			color: '#2E7D32'
		},
		{
			step: '4',
			title: 'Sync to the office',
			desc: 'The record is saved offline and later syncs to GardenSuite office software for payroll and reports.',
			image: '/screenshots/smart-weighing_active-session_capture-weight.png',
			alt: 'GardenSuite active session screen after smart weighing capture',
			color: '#558B2F'
		}
	];
</script>

<section
	class="reveal-on-scroll relative w-full overflow-hidden bg-[#FAFAF7] py-18 md:py-24"
	aria-labelledby="workflow-heading"
>
	<div class="mx-auto max-w-[1344px] px-6 md:px-12">
		<div class="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-end">
			<div>
				<h2
					id="workflow-heading"
					class="text-[32px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px]"
					style="text-wrap: balance"
				>
					From leaf bag to payroll record in one flow.
				</h2>
				<p class="mt-5 max-w-[580px] text-[17px] leading-[1.65] text-[#52525B]">
					The app keeps the field flow simple for supervisors. Select the session, capture the kg,
					verify the worker, and send the same record to the office when internet is available.
				</p>
			</div>

			<div
				class="rounded-xl border border-[#E4E4E7] bg-white p-5 shadow-[0_18px_55px_rgba(0,0,0,0.06)] md:p-6"
			>
				<div class="grid items-center gap-6 sm:grid-cols-[180px_1fr]">
					<img
						src="/bluetooth-scale.svg"
						alt="Bluetooth hanging scale for GardenSuite smart weighing"
						width="512"
						height="512"
						class="mx-auto w-full max-w-[180px]"
						loading="lazy"
					/>
					<div>
						<p class="text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">
							Hardware linked to app
						</p>
						<p
							class="mt-3 text-[18px] leading-[1.45] font-semibold tracking-[-0.02em] text-[#111111]"
						>
							Weight is captured beside the worker, not typed later from paper.
						</p>
						<p class="mt-3 text-[14px] leading-[1.6] text-[#52525B]">
							This helps the office use the same field record for leaf weight, payroll, and daily
							reports.
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-12 grid gap-5 md:grid-cols-4">
			{#each steps as item, i}
				<article class="group relative rounded-xl border border-[#E4E4E7] bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md">
					<div class="mb-4 flex items-center justify-between">
						<div class="flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white shadow-sm" style="background-color: {item.color};">
							{item.step}
						</div>
						{#if i < steps.length - 1}
							<svg class="hidden h-5 w-5 text-[#C8DDB8] md:block" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
								<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
							</svg>
						{/if}
					</div>
					<div class="overflow-hidden rounded-lg border border-[#F0F0F0] bg-[#FAFAF7]">
						{#if item.image === '/bluetooth-scale.svg'}
							<div class="flex aspect-[9/14] items-center justify-center bg-white p-6">
								<img
									src={item.image}
									alt={item.alt}
									width="512"
									height="512"
									class="w-full max-w-[180px]"
									loading="lazy"
								/>
							</div>
						{:else}
							<img
								src={item.image}
								alt={item.alt}
								width="1080"
								height="2400"
								class="aspect-[9/14] w-full object-cover object-top"
								loading="lazy"
							/>
						{/if}
					</div>
					<div class="pt-5">
						<h3 class="text-[17px] font-semibold tracking-[-0.01em] text-[#111111]">
							{item.title}
						</h3>
						<p class="mt-2 text-[14px] leading-[1.6] text-[#52525B]">{item.desc}</p>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
