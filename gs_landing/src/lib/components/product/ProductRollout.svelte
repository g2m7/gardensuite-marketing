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
		<div class="relative">
			<div class="absolute top-8 left-12 hidden h-[calc(100%-80px)] w-px border-l border-dashed border-[#C8DDB8] md:block"></div>
			<div class="grid gap-6 md:gap-8">
				{#each steps as item}
					<div class="relative flex flex-col gap-4 md:flex-row md:gap-6">
						<div class="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-white/60 bg-[#DDEFE4] text-2xl font-bold text-[#1B5E3B] shadow-sm">
							{item.step}
						</div>
						<div class="flex-1 rounded-[20px] border border-[#E4E4E7] bg-white p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
							<h3 class="text-[18px] font-semibold tracking-[-0.01em] text-[#111111]">
								{item.title}
							</h3>
							<p class="mt-2 text-[15px] leading-[1.6] text-[#52525B]">{item.desc}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
