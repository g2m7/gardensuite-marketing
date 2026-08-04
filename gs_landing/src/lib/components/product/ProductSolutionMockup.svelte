<script lang="ts">
	let {
		tagText = 'The solution',
		headline,
		paragraph,
		cardHeaderTag = 'Today',
		cardHeaderTitle = 'Field capture',
		steps = []
	}: {
		tagText?: string;
		headline: string;
		paragraph: string;
		cardHeaderTag?: string;
		cardHeaderTitle?: string;
		steps: Array<{ title: string; desc: string }>;
	} = $props();
</script>

<section
	class="reveal-on-scroll relative w-full border-b border-[#E4E4E7] bg-white py-20 md:py-28"
	aria-labelledby="solution-heading"
>
	<div
		class="mx-auto grid max-w-[1344px] gap-12 px-6 md:px-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20"
	>
		<div class="max-w-xl">
			{#if tagText}
				<span
					class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
					>{tagText}</span
				>
			{/if}
			<h2
				id="solution-heading"
				class="text-[28px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[36px] lg:text-[44px]"
				style="text-wrap: balance"
			>
				{headline}
			</h2>
			<p class="mt-5 text-[16px] leading-[1.65] text-[#52525B] md:text-[17px]">
				{paragraph}
			</p>
		</div>
		<div
			class="relative overflow-hidden rounded-2xl border border-[#0F2E0C]/15 bg-[#0B1712] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.10)] md:p-5"
		>
			<div class="dot-grid absolute inset-0 z-0 rounded-xl opacity-10"></div>
			<div
				class="relative z-10 rounded-xl border border-white/15 bg-white/[0.04] p-5 backdrop-blur-sm md:p-8"
			>
				<div
					class="mx-auto max-w-[420px] rounded-3xl border border-white/30 bg-white/95 p-5 shadow-[0_10px_28px_rgba(0,0,0,0.10)] md:p-6"
				>
					<div class="mb-5 flex items-center justify-between border-b border-[#E4E4E7] pb-4">
						<div>
							{#if cardHeaderTag}
								<div class="text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">
									{cardHeaderTag}
								</div>
							{/if}
							<div class="mt-1 text-[22px] font-semibold tracking-[-0.02em] text-[#111111]">
								{cardHeaderTitle}
							</div>
						</div>
						<div
							class="flex h-10 w-10 items-center justify-center rounded-full bg-[#1B5E3B] text-white"
						>
							<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
								<path
									d="M4 10.5 8 14l8-8"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</div>
					</div>
					<div class="space-y-3">
						{#each steps as row, i}
							<div
								class="flex items-center gap-3 rounded-2xl border border-[#E4E4E7] bg-[#FAFAF7] px-4 py-3"
							>
								<div
									class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1B5E3B]/10 text-[12px] font-semibold text-[#1B5E3B]"
								>
									{i + 1}
								</div>
								<div class="min-w-0 flex-1">
									<div class="truncate text-[15px] font-semibold text-[#111111]">
										{row.title}
									</div>
									<div class="mt-0.5 text-[13px] leading-[1.4] text-[#4B5563]">
										{row.desc}
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
