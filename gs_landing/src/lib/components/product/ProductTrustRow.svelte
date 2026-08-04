<script lang="ts">
	let {
		stats = [
			{ value: '20+', label: 'Tea Estates' },
			{ value: '7', label: 'Regions' }
		],
		showOfflineBadge = true,
		footnote = ''
	}: {
		stats?: Array<{ value: string; label: string }>;
		showOfflineBadge?: boolean;
		footnote?: string;
	} = $props();
</script>

<section
	class="relative z-30 w-full border-b border-border bg-white py-8 md:py-10"
	aria-label="Trust indicators"
>
	<div
		class="mx-auto flex max-w-[1344px] flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 md:gap-x-14 md:px-12"
	>
		{#each stats as stat, i}
			{#if i > 0}
				<div class="hidden h-8 w-px bg-[#E4E4E7] md:block"></div>
			{/if}
			<div class="flex flex-col items-center">
				<span class="text-[28px] font-semibold tracking-[-0.03em] text-heading md:text-[34px]"
					>{stat.value}</span
				>
				<span class="mt-0.5 text-[12px] font-medium tracking-[0.04em] text-[#4B5563] uppercase"
					>{stat.label}</span
				>
			</div>
		{/each}

		{#if showOfflineBadge}
			<div class="hidden h-8 w-px bg-[#E4E4E7] md:block"></div>
			<div class="flex flex-col items-center">
				<div class="flex items-center gap-1.5">
					<span class="text-[28px] font-semibold tracking-[-0.03em] text-green-deep md:text-[34px]"
						>Offline</span
					>
				</div>
				<span class="mt-0.5 text-[12px] font-medium tracking-[0.04em] text-[#4B5563] uppercase"
					>Field ready</span
				>
			</div>
		{/if}
	</div>
	{#if footnote}
		<p
			class="mx-auto mt-6 max-w-[900px] border-t border-border px-6 pt-5 text-center text-[13px] leading-[1.6] text-text-secondary md:px-12"
		>
			{footnote}
		</p>
	{/if}
</section>
