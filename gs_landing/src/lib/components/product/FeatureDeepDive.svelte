<script lang="ts">
	let {
		tagText,
		headline,
		description,
		bullets = [],
		screenshot,
		screenshotAlt = '',
		secondaryScreenshot = '',
		secondaryScreenshotAlt = '',
		layout = 'right',
		bgClass = 'bg-white'
	}: {
		tagText: string;
		headline: string;
		description: string;
		bullets: string[];
		screenshot: string;
		screenshotAlt: string;
		secondaryScreenshot?: string;
		secondaryScreenshotAlt?: string;
		layout?: 'left' | 'right';
		bgClass?: string;
	} = $props();
</script>

<section
	class="reveal-on-scroll relative w-full border-b border-[#E4E4E7] py-20 md:py-28 {bgClass}"
>
	<div class="mx-auto max-w-[1344px] px-6 md:px-12">
		<div
			class="grid items-center gap-12 md:gap-16 lg:grid-cols-2 {layout === 'left'
				? 'lg:[direction:rtl]'
				: ''}"
		>
			<!-- Text Content -->
			<div class={layout === 'left' ? 'lg:[direction:ltr]' : ''}>
				<span
					class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
					>{tagText}</span
				>
				<h2
					class="text-[28px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[36px] lg:text-[44px]"
					style="text-wrap: balance"
				>
					{headline}
				</h2>
				<p class="mt-5 max-w-[580px] text-[16px] leading-[1.65] text-[#52525B] md:text-[17px]">
					{description}
				</p>

				{#if bullets.length > 0}
					<ul class="mt-8 grid gap-3.5">
						{#each bullets as point}
							<li class="flex items-start gap-3 text-[15px] leading-[1.55] text-[#3F3F46]">
								<svg
									class="mt-0.5 h-5 w-5 shrink-0 text-[#1B5E3B]"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
										clip-rule="evenodd"
									/>
								</svg>
								<span>{point}</span>
							</li>
						{/each}
					</ul>
				{/if}
			</div>

			<!-- Phone Mockup Visual -->
			<div class="flex items-center justify-center {layout === 'left' ? 'lg:[direction:ltr]' : ''}">
				<div class="relative flex items-center justify-center gap-6">
					<!-- Primary Screenshot -->
					<div
						class="relative rounded-[28px] border border-[#E4E4E7] bg-[#F8FAF8] p-6 shadow-[0_16px_48px_rgba(0,0,0,0.06)] md:p-8"
					>
						<div
							class="device-frame-phone w-[160px] shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:w-[200px]"
						>
							<div class="device-frame-phone-inner aspect-[9/19.5]">
								<img
									src={screenshot}
									alt={screenshotAlt}
									width="1080"
									height="2400"
									class="h-full w-full object-cover object-top"
									loading="lazy"
								/>
							</div>
						</div>
					</div>

					<!-- Secondary Screenshot (optional, slightly offset) -->
					{#if secondaryScreenshot}
						<div
							class="relative hidden -translate-y-6 rounded-[28px] border border-[#E4E4E7] bg-[#F8FAF8] p-5 shadow-[0_12px_36px_rgba(0,0,0,0.04)] md:block md:p-6"
						>
							<div
								class="device-frame-phone w-[130px] shadow-[0_15px_45px_rgba(0,0,0,0.12)] md:w-[150px]"
							>
								<div class="device-frame-phone-inner aspect-[9/19.5]">
									<img
										src={secondaryScreenshot}
										alt={secondaryScreenshotAlt}
										width="1080"
										height="2400"
										class="h-full w-full object-cover object-top"
										loading="lazy"
									/>
								</div>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>
