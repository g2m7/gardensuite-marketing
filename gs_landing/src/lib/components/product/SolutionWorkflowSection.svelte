<script lang="ts">
	/**
	 * Solution + Workflow section extracted from the homepage.
	 * Two-column layout: left side has tagline, headline, paragraph(s), optional CTA;
	 * right side shows a dark card with a numbered workflow steps mockup.
	 *
	 * Props:
	 *   tagText            - Small green kicker label above the headline (default: 'The solution')
	 *   headline           - Main h2 heading (required)
	 *   paragraph          - First large paragraph (required)
	 *   paragraph2         - Optional second smaller paragraph
	 *   ctaText + ctaHref  - Optional rounded-rect CTA link below the text
	 *   cardHeaderTag      - Small label inside the mockup card (default: 'Today')
	 *   cardHeaderTitle    - Title inside the mockup card (required)
	 *   steps              - Array of workflow steps {label, meta} shown in numbered rows
	 *   features           - Optional 4-column feature grid below the main columns
	 *   showBackgroundImages - Show landscape photos behind the dark card (homepage only)
	 */
	let {
		tagText = 'The solution',
		headline,
		paragraph,
		paragraph2 = '',
		ctaText = '',
		ctaHref = '',
		cardHeaderTag = 'Today',
		cardHeaderTitle,
		steps,
		features = [],
		showBackgroundImages = false
	}: {
		tagText?: string;
		headline: string;
		paragraph: string;
		paragraph2?: string;
		ctaText?: string;
		ctaHref?: string;
		cardHeaderTag?: string;
		cardHeaderTitle: string;
		steps: Array<{ label: string; meta: string }>;
		features?: Array<{ title: string; desc: string }>;
		showBackgroundImages?: boolean;
	} = $props();
</script>

<section
	class="reveal-on-scroll relative w-full scroll-mt-20 border-b border-[#E4E4E7] bg-white py-20 md:py-28"
	aria-labelledby="solution-heading"
>
	<div class="mx-auto max-w-[1344px] px-6 md:px-12">
		<div class="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
			<div class="max-w-xl">
				{#if tagText}
					<span
						class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
						>{tagText}</span
					>
				{/if}
				<h2
					id="solution-heading"
					class="text-[28px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[36px]"
					style="text-wrap: balance"
				>
					{headline}
				</h2>
				<p class="mt-6 text-[20px] leading-[1.6] tracking-[-0.01em] text-[#18181B]">
					{paragraph}
				</p>
				{#if paragraph2}
					<p class="mt-6 text-[16px] leading-[1.65] text-[#4B5563]">
						{paragraph2}
					</p>
				{/if}
				{#if ctaText && ctaHref}
					<a
						href={ctaHref}
						class="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#D4D4D8] bg-white px-5 text-[15px] font-semibold text-[#111111] shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition hover:border-[#1B5E3B]/30 hover:bg-[#F8FAF8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.98]"
					>
						{ctaText}
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
							<path
								d="M6 3.5 10.5 8 6 12.5"
								stroke="currentColor"
								stroke-width="1.8"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</a>
				{/if}
			</div>

			<div
				class="relative overflow-hidden rounded-2xl border border-[#0F2E0C]/15 bg-[#0B1712] p-4 shadow-[0_30px_90px_rgba(15,46,12,0.18)] md:p-5"
			>
				{#if showBackgroundImages}
					<picture>
						<source srcset="/hero-sky.webp" type="image/webp" />
						<img
							src="/hero-sky.png"
							alt=""
							class="absolute inset-0 z-0 h-full w-full object-cover brightness-[1.15]"
							width="1024"
							height="1024"
							loading="lazy"
						/>
					</picture>
					<picture>
						<source
							srcset="/bg-960.webp 960w, /bg-1920.webp 1920w"
							sizes="(min-width: 1024px) 640px, 90vw"
							type="image/webp"
						/>
						<img
							src="/bg.png"
							alt=""
							class="absolute inset-x-0 bottom-0 z-[1] h-[60%] w-full object-cover object-top brightness-[1.15]"
							style="mask-image: linear-gradient(to bottom, transparent 0%, black 30%); -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 30%);"
							width="960"
							height="538"
							loading="lazy"
						/>
					</picture>
				{:else}
					<div
						class="dot-grid absolute inset-0 z-0 opacity-10 rounded-xl"
					></div>
				{/if}

				<div
					class="relative z-10 rounded-xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-sm md:p-8"
				>
					<div
						class="mx-auto max-w-[420px] rounded-3xl border border-white/30 bg-white/95 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:p-6"
					>
						<div
							class="mb-5 flex items-center justify-between border-b border-[#E4E4E7] pb-4"
						>
							<div>
								{#if cardHeaderTag}
									<div
										class="text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
									>
										{cardHeaderTag}
									</div>
								{/if}
								<div
									class="mt-1 text-[22px] font-semibold tracking-[-0.02em] text-[#111111]"
								>
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
							{#each steps as step, i}
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
											{step.label}
										</div>
										<div class="mt-0.5 truncate text-[13px] text-[#4B5563]">
											{step.meta}
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>

		{#if features.length > 0}
			<div class="mt-14 grid gap-8 border-t border-[#E4E4E7] pt-10 sm:grid-cols-2 lg:grid-cols-4">
				{#each features as point}
					<div>
						<h3 class="text-[17px] font-semibold text-[#111111]">{point.title}</h3>
						<p class="mt-2 text-[15px] leading-[1.6] text-[#4B5563]">{point.desc}</p>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>
