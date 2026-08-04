<script lang="ts">
	import type { Snippet } from 'svelte';
	import ProductActions from './ProductActions.svelte';

	let {
		tagText = 'Talk to Sarbani Associates',
		headline,
		paragraph,
		demoHref = '/#contact',
		primaryLabel = 'Book Free Demo',
		secondaryHref = '/#contact',
		secondaryLabel = 'Email Us',
		supportNote = 'Many estates keep software details private. We respect confidentiality and share region-level experience.',
		buyers = [],
		expectationLine = '',
		media,
		onPrimaryClick,
		onSecondaryClick
	}: {
		tagText?: string;
		headline: string;
		paragraph: string;
		demoHref?: string;
		primaryLabel?: string;
		secondaryHref?: string;
		secondaryLabel?: string;
		supportNote?: string;
		buyers: Array<{ role: string; benefit: string }>;
		expectationLine?: string;
		media?: Snippet;
		onPrimaryClick?: (event: MouseEvent) => void;
		onSecondaryClick?: (event: MouseEvent) => void;
	} = $props();
</script>

<section
	class="reveal-on-scroll w-full border-b border-border bg-white px-6 py-16 md:px-12 md:py-28"
>
	<div
		class="mx-auto grid max-w-[1120px] gap-10 {media || buyers.length
			? 'md:grid-cols-[0.92fr_1.08fr] md:items-center'
			: ''}"
	>
		<div>
			{#if tagText}
				<span
					class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-green-deep uppercase"
					>{tagText}</span
				>
			{/if}
			<h2
				class="text-[34px] leading-[1.08] font-semibold tracking-[-0.04em] text-heading md:text-[48px]"
				style="text-wrap: balance"
			>
				{headline}
			</h2>
			<p class="mt-5 text-[16px] leading-[1.65] text-text-secondary md:text-[17px]">
				{paragraph}
			</p>
			<div class="mt-8 flex">
				<ProductActions
					primaryHref={demoHref}
					{primaryLabel}
					{secondaryHref}
					{secondaryLabel}
					{onPrimaryClick}
					{onSecondaryClick}
				/>
			</div>
			{#if supportNote}
				<p class="mt-4 text-[13px] leading-[1.6] text-muted">
					{supportNote}
				</p>
			{/if}
			{#if expectationLine}
				<p class="mt-3 text-[13px] leading-[1.6] text-text-secondary">{expectationLine}</p>
			{/if}
		</div>
		{#if media}
			<div class="min-h-[280px]">
				{@render media()}
			</div>
		{:else if buyers.length}
			<div class="grid gap-4">
				{#each buyers as item}
					<div
						class="relative rounded-lg border border-border bg-[#FAFAF8] p-6 shadow-sm transition-shadow duration-300 hover:shadow-[0_6px_18px_rgba(0,0,0,0.06)]"
					>
						<svg
							class="absolute top-4 right-4 h-8 w-8 text-[#C8DDB8] opacity-50"
							viewBox="0 0 24 24"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
							/>
						</svg>
						<h3 class="text-[15px] font-semibold text-green-deep">{item.role}</h3>
						<p class="mt-3 text-[15px] leading-[1.65] text-[#374151]">{item.benefit}</p>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>
