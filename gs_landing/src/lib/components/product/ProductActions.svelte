<script lang="ts">
	let {
		primaryHref = '/#contact',
		primaryLabel = 'Book Free Demo',
		secondaryHref = '',
		secondaryLabel = 'Email Us'
	}: {
		primaryHref?: string;
		primaryLabel?: string;
		secondaryHref?: string;
		secondaryLabel?: string;
	} = $props();
</script>

<div class="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
	<a
		href={primaryHref}
		class="flex w-full items-center justify-center gap-2 rounded-full bg-[#1B5E3B] px-6 py-4 shadow-[0_4px_20px_rgba(27,94,59,0.25)] transition duration-150 hover:bg-[#144723] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.97] sm:w-auto"
	>
		<span class="text-sm font-medium text-white">{primaryLabel}</span>
		<svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="shrink-0" aria-hidden="true">
			<path
				d="M5 2.5l4.5 4.5L5 11.5"
				stroke="white"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</a>
	{#if secondaryHref}
		<a
			href={secondaryHref}
			class="flex w-full items-center justify-center rounded-full border border-[#E4E4E7] bg-white px-6 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition duration-150 hover:border-[#D4D4D8] hover:bg-[#FAFAF7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.97] sm:w-auto"
		>
			<span class="text-sm font-medium text-[#0A0A0A]">{secondaryLabel}</span>
		</a>
	{/if}
</div>
