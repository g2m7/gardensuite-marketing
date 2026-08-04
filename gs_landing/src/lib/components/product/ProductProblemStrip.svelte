<script lang="ts">
	let {
		tagText = 'The problem',
		headline,
		paragraph,
		problems = []
	}: {
		tagText?: string;
		headline: string;
		paragraph: string;
		problems: Array<{ title: string; desc: string }>;
	} = $props();
</script>

<section
	class="reveal-on-scroll relative w-full border-b border-[#E4E4E7] bg-white py-20 md:py-28"
	aria-labelledby="problem-heading"
>
	<div class="mx-auto grid max-w-[1344px] gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-12">
		<div class="max-w-xl">
			{#if tagText}
				<span
					class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#B91C1C] uppercase"
					>{tagText}</span
				>
			{/if}
			<h2
				id="problem-heading"
				class="text-[28px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[36px]"
				style="text-wrap: balance"
			>
				{headline}
			</h2>
			<p class="mt-5 max-w-lg text-[16px] leading-[1.65] text-[#374151]">
				{paragraph}
			</p>
		</div>

		<div class="space-y-10 md:pt-8">
			{#each problems as item}
				<div class="flex gap-5">
					<div
						class="relative mt-1 shrink-0 text-[#DC2626] drop-shadow-[0_1px_2px_rgba(0,0,0,0.10)]"
					>
						<svg
							width="28"
							height="28"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
							<line x1="12" y1="9" x2="12" y2="13" />
							<line x1="12" y1="17" x2="12.01" y2="17" />
						</svg>
						<span class="absolute -top-1 -right-1.5">
							<svg
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#DC2626"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg
							>
						</span>
					</div>
					<div>
						<h3 class="text-[19px] leading-[1.3] font-semibold text-[#111111]">
							{item.title}
						</h3>
						<p class="mt-2 max-w-[560px] text-[15px] leading-[1.6] text-[#4B5563]">
							{item.desc}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
