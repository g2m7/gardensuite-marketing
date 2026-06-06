<script lang="ts">
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
		buyers = []
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
	} = $props();
</script>

<section
	class="reveal-on-scroll w-full border-b border-[#E4E4E7] bg-white px-6 py-24 md:px-12 md:py-32"
>
	<div class="mx-auto grid max-w-[1120px] gap-10 md:grid-cols-[0.92fr_1.08fr] md:items-center">
		<div>
			{#if tagText}
				<span
					class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
					>{tagText}</span
				>
			{/if}
			<h2
				class="text-[34px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[48px]"
				style="text-wrap: balance"
			>
				{headline}
			</h2>
			<p class="mt-5 text-[16px] leading-[1.65] text-[#52525B] md:text-[17px]">
				{paragraph}
			</p>
			<div class="mt-8 flex">
				<ProductActions primaryHref={demoHref} {primaryLabel} {secondaryHref} {secondaryLabel} />
			</div>
			{#if supportNote}
				<p class="mt-4 text-[13px] leading-[1.6] text-[#71717A]">
					{supportNote}
				</p>
			{/if}
		</div>
		<div class="grid gap-4">
			{#each buyers as item}
				<div
					class="relative rounded-lg border border-l-4 border-[#E4E4E7] border-l-[#1B5E3B] bg-[#FAFAF8] p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
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
					<h3 class="text-[15px] font-semibold text-[#1B5E3B]">{item.role}</h3>
					<p class="mt-3 text-[15px] leading-[1.65] text-[#374151]">{item.benefit}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
