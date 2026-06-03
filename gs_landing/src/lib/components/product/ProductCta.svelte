<script lang="ts">
	let {
		headline,
		paragraph,
		demoHref = '/#contact',
		buyers = []
	}: {
		headline: string;
		paragraph: string;
		demoHref?: string;
		buyers: Array<{ role: string; benefit: string }>;
	} = $props();
</script>

<section class="reveal-on-scroll w-full bg-white px-6 py-24 md:px-12 md:py-32 border-b border-[#E4E4E7]">
	<div class="mx-auto grid max-w-[1120px] gap-10 md:grid-cols-[0.92fr_1.08fr] md:items-center">
		<div>
			<h2
				class="text-[34px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[48px]"
				style="text-wrap: balance"
			>
				{headline}
			</h2>
			<p class="mt-5 text-[16px] leading-[1.65] text-[#52525B] md:text-[17px]">
				{paragraph}
			</p>
			<div class="mt-8 flex flex-col gap-3 sm:flex-row">
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
				<a
					href="/#contact"
					class="flex w-full items-center justify-center rounded-full border border-[#E4E4E7] bg-white px-6 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition duration-150 hover:border-[#D4D4D8] hover:bg-[#FAFAF7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.97] sm:w-auto"
				>
					<span class="text-sm font-medium text-[#0A0A0A]">Email Us</span>
				</a>
			</div>
			<p class="mt-4 text-[13px] leading-[1.6] text-[#71717A]">
				Many estates keep software details private. We respect confidentiality and share
				region-level experience.
			</p>
		</div>
		<div class="grid gap-4">
			{#each buyers as item}
				<div class="relative rounded-[20px] border border-[#E4E4E7] border-l-4 border-l-[#1B5E3B] bg-[#FAFAF8] p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
					<svg class="absolute top-4 right-4 h-8 w-8 text-[#C8DDB8] opacity-50" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
						<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
					</svg>
					<h3 class="text-[15px] font-semibold text-[#1B5E3B]">{item.role}</h3>
					<p class="mt-3 text-[15px] leading-[1.65] text-[#374151]">{item.benefit}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
