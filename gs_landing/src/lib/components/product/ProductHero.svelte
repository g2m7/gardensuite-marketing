<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup.svelte';

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
		<h1
			class="mx-auto max-w-4xl text-center text-[2.5rem] leading-[1.0] font-semibold tracking-[-0.04em] text-[#111111] sm:text-[3.25rem] md:text-[4.25rem] lg:text-[4.75rem] flex flex-col items-center"
			style="text-wrap: balance"
		>
			{#if badgeText}
				<span
					class="mb-6 inline-block rounded-full bg-[#1B5E3B]/10 border border-[#1B5E3B]/20 px-3.5 py-1 text-[11px] font-semibold tracking-[0.05em] text-[#1B5E3B] uppercase font-sans font-medium"
				>
					{badgeText}
				</span>
			{/if}
			<span>{headline}</span>
		</h1>
		<p
			class="mx-auto mt-6 max-w-2xl text-center text-base leading-[1.6] text-[#52525B] sm:text-lg md:text-xl"
			style="text-wrap: balance"
		>
			{paragraph}
		</p>

		<ButtonGroup class="mt-8">
			<Button href={demoHref} label="Book Free Demo" variant="primary" showIcon />
			{#if workflowHref}
				<Button href={workflowHref} label="See Workflow" variant="secondary" />
			{/if}
		</ButtonGroup>

		{@render children?.()}
	</div>
</section>
