<script lang="ts">
	import PhoneScreenshot from './PhoneScreenshot.svelte';

	const steps = [
		{
			number: '01',
			title: 'Verify the worker',
			description: 'GS Face checks the worker before the record is saved.',
			png: '/screenshots/13_attendance_result_matched.png',
			webp: '/screenshots/13_attendance_result_matched.webp',
			alt: 'Matched worker result in the GardenSuite Face app'
		},
		{
			number: '02',
			title: 'Capture the work',
			description: 'Save attendance or take leaf weight from the connected scale.',
			png: '/screenshots/10_harvest_result_scale_connected_save.png',
			webp: '/screenshots/10_harvest_result_scale_connected_save.webp',
			alt: 'Connected scale result saved with the worker in GardenSuite Face'
		},
		{
			number: '03',
			title: 'Review in the office',
			description: 'Offline records sync for checking, finalization and estate use.',
			png: '/screenshots/27_sync_status.png',
			webp: '/screenshots/27_sync_status.webp',
			alt: 'GardenSuite sync status showing uploaded and pending field records'
		}
	];
</script>

<section
	id="workflow"
	class="reveal-on-scroll scroll-mt-20 border-b border-border bg-white py-16 md:py-24"
	aria-labelledby="attendance-workflow-heading"
>
	<div class="mx-auto max-w-[1344px] px-6 md:px-12">
		<div class="mx-auto mb-10 max-w-[720px] text-center md:mb-14">
			<h2
				id="attendance-workflow-heading"
				class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-heading md:text-[44px] lg:text-[52px]"
				style="text-wrap: balance"
			>
				Face, work and weight stay together.
			</h2>
			<p
				class="mx-auto mt-5 max-w-[620px] text-[16px] leading-[1.65] text-text-secondary md:text-[17px]"
			>
				Paper separates identity, attendance and leaf weight. Three clear steps keep them together.
			</p>
		</div>

		<div class="grid gap-5 md:grid-cols-3">
			{#each steps as item}
				<article
					class="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_12px_36px_rgba(0,0,0,0.05)]"
				>
					<div
						class="relative flex h-[230px] items-start justify-center overflow-hidden border-b border-brand-100 bg-brand-50 pt-6 md:h-[270px] md:pt-8"
					>
						<PhoneScreenshot
							png={item.png}
							webp={item.webp}
							alt={item.alt}
							class="w-[150px] shadow-[0_18px_48px_rgba(0,0,0,0.18)] md:w-[174px]"
						/>
					</div>
					<div class="p-6 md:p-7">
						<span class="text-[13px] font-semibold tracking-[0.08em] text-green-deep uppercase"
							>Step {item.number}</span
						>
						<h3 class="mt-3 text-[22px] font-semibold tracking-[-0.02em] text-heading">
							{item.title}
						</h3>
						<p class="mt-3 text-[15px] leading-[1.6] text-text-secondary">{item.description}</p>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
