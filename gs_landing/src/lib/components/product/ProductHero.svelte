<script lang="ts">
	let {
		badgeText,
		headline,
		paragraph,
		demoHref = '/#contact',
		workflowHref = '',
		children
	} = $props();
</script>

<section
	class="relative w-full border-b border-[#E4E4E7] bg-white pt-28 pb-16 md:pt-36 md:pb-24"
	aria-label="Hero"
>
	<div class="mx-auto flex max-w-[1344px] flex-col items-center px-6 md:px-12">
		{#if badgeText}
			<span
				class="mb-6 inline-block rounded-full bg-[#1B5E3B]/10 border border-[#1B5E3B]/20 px-3.5 py-1 text-[11px] font-semibold tracking-[0.05em] text-[#1B5E3B] uppercase"
			>
				{badgeText}
			</span>
		{/if}
		<h1
			class="mx-auto max-w-4xl text-center text-[2.5rem] leading-[1.0] font-semibold tracking-[-0.04em] text-[#111111] sm:text-[3.25rem] md:text-[4.25rem] lg:text-[4.75rem]"
			style="text-wrap: balance"
		>
			{headline}
		</h1>
		<p
			class="mx-auto mt-6 max-w-2xl text-center text-base leading-[1.6] text-[#52525B] sm:text-lg md:text-xl"
			style="text-wrap: balance"
		>
			{paragraph}
		</p>

		<div class="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
			<a
				href={demoHref}
				class="flex w-full items-center justify-center gap-2 rounded-full bg-[#1B5E3B] px-6 py-4 shadow-[0_4px_20px_rgba(27,94,59,0.25)] transition duration-150 hover:bg-[#144723] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.97] sm:w-auto"
			>
				<span class="text-sm font-medium text-white">Book Free Demo</span>
				<svg
					width="14"
					height="14"
					viewBox="0 0 14 14"
					fill="none"
					class="shrink-0"
					aria-hidden="true"
					><path
						d="M5 2.5l4.5 4.5L5 11.5"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/></svg
				>
			</a>
			{#if workflowHref}
				<a
					href={workflowHref}
					class="flex w-full items-center justify-center rounded-full border border-[#E4E4E7] bg-white px-6 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition duration-150 hover:border-[#D4D4D8] hover:bg-[#FAFAF7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.97] sm:w-auto"
				>
					<span class="text-sm font-medium text-[#0A0A0A]">See Workflow</span>
				</a>
			{/if}
		</div>

		{@render children?.()}
	</div>
</section>
