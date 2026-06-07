<script lang="ts">
	let {
		tagText = 'Rollout',
		headline = 'Sarbani Associates sets it up with your staff.',
		paragraph,
		steps = []
	}: {
		tagText?: string;
		headline?: string;
		paragraph: string;
		steps: Array<{ step: string; title: string; desc: string }>;
	} = $props();
</script>

<section
	class="reveal-on-scroll w-full bg-[#F8F7F3] border-b border-[#E4E4E7] py-24 md:py-32"
	aria-labelledby="rollout-heading"
>
	<div class="mx-auto max-w-[1344px] px-6 md:px-12">
		<div class="mb-14 max-w-[620px]">
			{#if tagText}
				<span
					class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
					>{tagText}</span
				>
			{/if}
			<h2
				id="rollout-heading"
				class="mt-3 text-[32px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px]"
				style="text-wrap: balance"
			>
				{headline}
			</h2>
			<p class="mt-5 text-[16px] leading-[1.65] text-[#52525B] md:text-[17px]">
				{paragraph}
			</p>
		</div>

		<!-- Steps as clean rows with dividers, no cards -->
		<div class="grid gap-0">
			{#each steps as item, i}
				<div class="flex items-start gap-5 py-7 md:gap-8 md:py-9 {i < steps.length - 1 ? 'border-b border-[#D6D3CB]' : ''}">
					<span class="mt-0.5 shrink-0 text-[28px] font-semibold tracking-[-0.03em] text-[#1B5E3B]/40 md:text-[32px] md:w-12 text-right">
						{item.step}
					</span>
					<div>
						<h3 class="text-[18px] font-semibold tracking-[-0.01em] text-[#111111]">
							{item.title}
						</h3>
						<p class="mt-1.5 max-w-[520px] text-[15px] leading-[1.6] text-[#52525B]">{item.desc}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
