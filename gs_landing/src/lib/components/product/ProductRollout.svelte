<script lang="ts">
	let {
		tagText = 'Rollout',
		headline = 'Sarbani Associates sets it up with your staff.',
		paragraph,
		steps = [],
		outcomeTitle,
		outcomeItems = [],
		note,
		actionHref = '',
		actionLabel = 'Email Us',
		onAction
	}: {
		tagText?: string;
		headline?: string;
		paragraph: string;
		steps: Array<{ step: string; title: string; desc: string }>;
		outcomeTitle?: string;
		outcomeItems?: Array<{ label: string; text: string }>;
		note?: string;
		actionHref?: string;
		actionLabel?: string;
		onAction?: (event: MouseEvent) => void;
	} = $props();
</script>

<section
	class="reveal-on-scroll w-full border-b border-border bg-surface py-16 md:py-24"
	aria-labelledby="rollout-heading"
>
	<div class="mx-auto max-w-[1344px] px-6 md:px-12">
		<div class="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
			<div class="max-w-[560px]">
				{#if tagText}
					<span
						class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-green-deep uppercase"
						>{tagText}</span
					>
				{/if}
				<h2
					id="rollout-heading"
					class="{tagText
						? 'mt-3 '
						: ''}text-[32px] leading-[1.08] font-semibold tracking-[-0.04em] text-heading md:text-[44px]"
					style="text-wrap: balance"
				>
					{headline}
				</h2>
				<p class="mt-5 text-[16px] leading-[1.65] text-text-secondary md:text-[17px]">
					{paragraph}
				</p>

				{#if note}
					<p
						class="mt-7 border-t border-[#D6D3CB] pt-5 text-[14px] leading-[1.6] text-text-tertiary"
					>
						{note}
					</p>
				{/if}

				{#if actionHref}
					<a
						href={actionHref}
						onclick={onAction}
						class="mt-7 inline-flex min-h-12 items-center justify-center rounded-full border border-border-strong bg-white px-6 text-[14px] font-semibold text-[#0A0A0A] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-colors hover:border-[#1B5E3B] hover:bg-[#F8FAF8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30"
					>
						{actionLabel}
					</a>
				{/if}
			</div>

			<div>
				<div class="grid gap-0 border-y border-[#D6D3CB]">
					{#each steps as item, i}
						<div
							class="grid grid-cols-[44px_1fr] gap-5 py-5 md:grid-cols-[64px_1fr] md:gap-8 md:py-6 {i <
							steps.length - 1
								? 'border-b border-[#D6D3CB]'
								: ''}"
						>
							<span
								class="text-[28px] font-semibold tracking-[-0.03em] text-green-deep/45 md:text-[32px]"
							>
								{item.step}
							</span>
							<div>
								<h3 class="text-[18px] font-semibold tracking-[-0.01em] text-heading">
									{item.title}
								</h3>
								<p class="mt-1.5 max-w-[620px] text-[15px] leading-[1.6] text-text-secondary">
									{item.desc}
								</p>
							</div>
						</div>
					{/each}
				</div>

				{#if outcomeTitle && outcomeItems.length}
					<div
						class="mt-6 rounded-lg border border-[#DDE5DC] bg-white p-5 shadow-[0_6px_18px_rgba(0,0,0,0.06)] md:p-6"
					>
						<h3 class="text-[18px] font-semibold tracking-[-0.01em] text-heading">
							{outcomeTitle}
						</h3>
						<div class="mt-5 grid gap-5 sm:grid-cols-3">
							{#each outcomeItems as item}
								<div>
									<div class="h-1 w-8 rounded-sm bg-[#1B5E3B]"></div>
									<p
										class="mt-3 text-[13px] font-semibold tracking-[0.04em] text-green-deep uppercase"
									>
										{item.label}
									</p>
									<p class="mt-1.5 text-[14px] leading-[1.55] text-text-secondary">{item.text}</p>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
