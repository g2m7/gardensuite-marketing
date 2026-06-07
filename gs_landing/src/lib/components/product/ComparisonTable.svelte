<script lang="ts">
	let {
		kicker = 'Comparison',
		headline = 'Paper way vs GardenSuite',
		paragraph = '',
		features = [],
		paperLabel = 'Paper Way',
		gsLabel = 'GardenSuite',
		paperResults = [],
		gsResults = []
	}: {
		kicker?: string;
		headline?: string;
		paragraph?: string;
		features: string[];
		paperLabel?: string;
		gsLabel?: string;
		paperResults?: boolean[];
		gsResults?: boolean[];
	} = $props();
</script>

<section
	class="reveal-on-scroll relative w-full overflow-hidden bg-[#141A16] py-16 md:py-24"
	aria-labelledby="compare-heading"
>
	<div class="relative z-10 mx-auto max-w-[1100px] px-6 md:px-8">
		<div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
			<!-- Left: Heading + description -->
			<div class="max-w-lg">
				<span
					class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#4ADE80] uppercase"
					>{kicker}</span
				>
				<h2
					id="compare-heading"
					class="text-[28px] leading-[1.08] font-semibold tracking-[-0.04em] text-white md:text-[36px]"
					style="text-wrap: balance"
				>
					{headline}
				</h2>
				{#if paragraph}
					<p class="mt-5 text-[16px] leading-[1.65] text-[#9CA3AF] lg:max-w-xs">
						{paragraph}
					</p>
				{/if}
			</div>

			<!-- Right: Comparison table -->
			<div
				class="grid grid-cols-[1.4fr_1fr_1fr] overflow-hidden rounded-2xl ring-1 ring-white/10"
			>
				<!-- Features Column -->
				<div class="bg-[#1A1F1C]">
					<div
						class="flex h-14 items-center px-4 pb-0 text-[11px] font-semibold tracking-[0.06em] text-[#6B7280] uppercase md:px-5"
					>
						Feature
					</div>
					{#each features as feature}
						<div
							class="flex h-12 items-center border-t border-white/[0.06] px-4 text-[13px] font-medium text-[#D1D5DB] md:px-5"
						>
							{feature}
						</div>
					{/each}
				</div>

				<!-- Paper Way -->
				<div class="border-l border-white/[0.06]">
					<div class="flex h-14 items-center justify-center bg-[#DC2626]/10 px-3">
						<span class="text-[12px] font-bold tracking-[0.02em] text-[#FCA5A5]"
							>{paperLabel}</span
						>
					</div>
					{#each paperResults as hasFeature}
						<div
							class="flex h-12 items-center justify-center border-t border-white/[0.06]"
						>
							<span
								class="flex h-5 w-5 items-center justify-center rounded-full {hasFeature
									? 'bg-[#1B5E3B] text-white shadow-[0_0_8px_rgba(27,94,59,0.4)]'
									: 'bg-[#DC2626]/20 text-[#FCA5A5]'}"
							>
								{#if hasFeature}
									<svg width="10" height="10" viewBox="0 0 14 14" fill="none"
										><path
											d="M3 7.5l2.5 2.5L11 4"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/></svg
									>
								{:else}
									<svg width="10" height="10" viewBox="0 0 14 14" fill="none"
										><path
											d="M3.5 10.5l7-7M10.5 10.5l-7-7"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
										/></svg
									>
								{/if}
							</span>
						</div>
					{/each}
				</div>

				<!-- GardenSuite (highlighted) -->
				<div class="relative">
					<div
						class="absolute inset-0 rounded-r-2xl bg-[#1B5E3B]/20 shadow-[0_0_60px_rgba(27,94,59,0.12)]"
					></div>
					<div class="relative z-10">
						<div
							class="flex h-14 items-center justify-center border-b border-[#1B5E3B]/40 bg-[#1B5E3B]/30 px-3"
						>
							<span class="text-[12px] font-bold tracking-[0.02em] text-[#4ADE80]"
								>{gsLabel}</span
							>
						</div>
						{#each gsResults as hasFeature}
							<div
								class="flex h-12 items-center justify-center border-t border-white/[0.06]"
							>
								<span
									class="flex h-5 w-5 items-center justify-center rounded-full {hasFeature
										? 'bg-[#1B5E3B] text-white shadow-[0_0_8px_rgba(27,94,59,0.4)]'
										: 'bg-[#DC2626]/20 text-[#FCA5A5]'}"
								>
									{#if hasFeature}
										<svg width="10" height="10" viewBox="0 0 14 14" fill="none"
											><path
												d="M3 7.5l2.5 2.5L11 4"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
											/></svg
										>
									{:else}
										<svg width="10" height="10" viewBox="0 0 14 14" fill="none"
											><path
												d="M3.5 10.5l7-7M10.5 10.5l-7-7"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
											/></svg
										>
									{/if}
								</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
