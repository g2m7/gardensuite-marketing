<script lang="ts">
	// ─── Carousel state ───
	let scrollContainer: HTMLDivElement;
	let canScrollLeft = $state(false);
	let canScrollRight = $state(true);

	const features = [
		{
			title: 'Face attendance',
			desc: 'that stops proxy punching. Worker identity verified by face scan on mobile before hazira is marked. Works offline.',
			image: '/img/home/face-attendance.png',
			href: '/products/attendance',
			badge: 'Attendance',
			overlay: {
				type: 'status' as const,
				lines: [
					{ label: 'Worker', value: 'Ramesh K.', bold: true },
					{ label: 'Match', value: '98.7%', bold: true },
					{ label: 'Section', value: 'Div. 3 - East' },
					{ label: 'Time', value: '07:42 AM' }
				]
			}
		},
		{
			title: 'Smart weighing',
			desc: 'that links leaf weight to verified workers. Wireless scale sends weight directly to the phone. No register, no errors.',
			image: '/img/home/smart-weighing.png',
			href: '#features',
			badge: 'Weighing',
			overlay: {
				type: 'weight' as const,
				value: '18.4',
				unit: 'kg',
				worker: 'Sunita D.',
				status: 'Synced'
			}
		},
		{
			title: 'Payroll calculated',
			desc: 'from real field data. Wages, PF, ESI, bonus, deductions ready from actual attendance and weight records.',
			image: '/img/home/payroll.png',
			href: '/products/payroll',
			badge: 'Payroll',
			overlay: {
				type: 'payroll' as const,
				items: [
					{ label: 'Gross wages', value: '\u20B92,48,500' },
					{ label: 'PF deducted', value: '\u20B929,820' },
					{ label: 'ESI deducted', value: '\u20B94,473' },
					{ label: 'Net payable', value: '\u20B92,14,207', bold: true }
				]
			}
		},
		{
			title: 'Daily MIS report',
			desc: 'on any device. Plucking, production, labour, and factory numbers on your phone, tablet, or laptop from anywhere.',
			image: '/mis-dashboard.png',
			href: '/products/mis',
			badge: 'Daily Report',
			overlay: {
				type: 'dashboard' as const,
				stats: [
					{ label: 'Green leaf', value: '12,450 kg' },
					{ label: 'Made tea', value: '2,890 kg' },
					{ label: 'Workers', value: '342' }
				]
			}
		}
	];

	function updateScrollState() {
		if (!scrollContainer) return;
		const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
		canScrollLeft = scrollLeft > 4;
		canScrollRight = scrollLeft < scrollWidth - clientWidth - 4;
	}

	function scroll(direction: 'left' | 'right') {
		if (!scrollContainer) return;
		// Scroll by one card width + gap
		const card = scrollContainer.querySelector('.carousel-card') as HTMLElement;
		const scrollAmount = card ? card.offsetWidth + 24 : 500;
		scrollContainer.scrollBy({
			left: direction === 'left' ? -scrollAmount : scrollAmount,
			behavior: 'smooth'
		});
	}
</script>

<section
	id="features"
	class="relative w-full scroll-mt-20 bg-[#FAFAF7] py-24 md:py-32"
	aria-labelledby="features-heading"
>
	<div class="mx-auto max-w-[1344px] px-6 md:px-12">
		<!-- Header row: heading + nav arrows -->
		<div class="mb-10 flex items-end justify-between gap-8 md:mb-14">
			<h2
				id="features-heading"
				class="max-w-[520px] text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px] lg:text-[52px]"
				style="text-wrap: balance"
			>
				Everything your tea garden needs
			</h2>

			<div class="hidden shrink-0 items-center gap-2 sm:flex" aria-label="Carousel navigation">
				<button
					onclick={() => scroll('left')}
					disabled={!canScrollLeft}
					class="flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E4E7] bg-white transition-all duration-150 hover:border-[#D4D4D8] hover:bg-[#FAFAF7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 disabled:cursor-not-allowed disabled:opacity-30"
					aria-label="Scroll to previous feature"
				>
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
						<path d="M10 4L6 8l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
				<button
					onclick={() => scroll('right')}
					disabled={!canScrollRight}
					class="flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E4E7] bg-white transition-all duration-150 hover:border-[#D4D4D8] hover:bg-[#FAFAF7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 disabled:cursor-not-allowed disabled:opacity-30"
					aria-label="Scroll to next feature"
				>
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
						<path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
			</div>
		</div>

		<!-- Carousel track -->
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div
			bind:this={scrollContainer}
			onscroll={updateScrollState}
			class="carousel-track -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-4 md:-mx-0 md:px-0"
			role="group"
			aria-label="Features carousel"
			tabindex="0"
		>
			{#each features as feature, i}
				<div class="carousel-card flex w-[85%] shrink-0 snap-start flex-col sm:w-[calc(50%-12px)]">
					<!-- Card image with overlay -->
					<div class="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#E8E8E8] bg-[#E8E5DE]">
						<img
							src={feature.image}
							alt={`${feature.badge} feature preview`}
							class="absolute inset-0 h-full w-full object-cover object-center opacity-20 saturate-[0.4] brightness-[1.1]"
							width="800"
							height="600"
							loading={i < 2 ? 'eager' : 'lazy'}
						/>

						<!-- Subtle gradient overlay for depth -->
						<div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.04] to-transparent" aria-hidden="true"></div>

						<!-- Badge -->
						<div class="absolute top-5 left-5 z-10">
							<span class="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-[0.04em] text-[#1B5E3B] uppercase shadow-sm backdrop-blur-sm">
								{feature.badge}
							</span>
						</div>

						<!-- Floating UI overlay cards -->
						{#if feature.overlay.type === 'status'}
							<div class="absolute bottom-6 left-6 z-10 w-[240px] rounded-xl border border-white/60 bg-white/95 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-md sm:w-[260px]">
								<div class="mb-2 flex items-center gap-2">
									<div class="flex h-6 w-6 items-center justify-center rounded-full bg-[#1B5E3B]/10">
										<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M3 6.5l2 2 4-4" stroke="#1B5E3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
									</div>
									<span class="text-[12px] font-semibold text-[#1B5E3B]">Face Verified</span>
								</div>
								{#each feature.overlay.lines as line}
									<div class="flex justify-between border-t border-[#F0F0F0] py-1.5 text-[12px]">
										<span class="text-[#71717A]">{line.label}</span>
										<span class={line.bold ? 'font-semibold text-[#111]' : 'text-[#3F3F46]'}>{line.value}</span>
									</div>
								{/each}
							</div>
						{:else if feature.overlay.type === 'weight'}
							<div class="absolute right-6 bottom-6 z-10 w-[200px] rounded-xl border border-white/60 bg-white/95 p-5 text-center shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-md">
								<div class="text-[11px] font-semibold tracking-[0.04em] text-[#71717A] uppercase">Leaf Weight</div>
								<div class="mt-1 text-[36px] font-semibold leading-none tracking-[-0.04em] text-[#111]" style="font-variant-numeric: tabular-nums">{feature.overlay.value}<span class="ml-1 text-[16px] font-medium text-[#71717A]">{feature.overlay.unit}</span></div>
								<div class="mt-2 text-[12px] text-[#52525B]">{feature.overlay.worker}</div>
								<div class="mt-2 inline-flex items-center gap-1 rounded-full bg-[#1B5E3B]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#1B5E3B]">
									<svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true"><circle cx="4" cy="4" r="3" fill="#1B5E3B"/></svg>
									{feature.overlay.status}
								</div>
							</div>
						{:else if feature.overlay.type === 'payroll'}
							<div class="absolute right-6 bottom-6 z-10 w-[220px] rounded-xl border border-white/60 bg-white/95 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-md">
								<div class="mb-2 text-[12px] font-semibold tracking-[0.04em] text-[#71717A] uppercase">Month Summary</div>
								{#each feature.overlay.items as item}
									<div class="flex justify-between border-t border-[#F0F0F0] py-1.5 text-[12px]" style="font-variant-numeric: tabular-nums">
										<span class="text-[#71717A]">{item.label}</span>
										<span class={item.bold ? 'font-semibold text-[#111]' : 'text-[#3F3F46]'}>{item.value}</span>
									</div>
								{/each}
							</div>
						{:else if feature.overlay.type === 'dashboard'}
							<div class="absolute right-6 top-16 z-10 rounded-xl border border-[#FDE68A] bg-[#FEF9C3]/95 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-sm">
								<div class="mb-2 flex items-center justify-between gap-6">
									<span class="text-[13px] font-semibold text-[#92400E]">Today's Numbers</span>
									<span class="text-[11px] font-medium text-[#B45309]">Live</span>
								</div>
								{#each feature.overlay.stats as stat}
									<div class="flex items-center justify-between gap-8 py-1 text-[12px]">
										<span class="text-[#92400E]/70">{stat.label}</span>
										<span class="font-semibold text-[#78350F]" style="font-variant-numeric: tabular-nums">{stat.value}</span>
									</div>
								{/each}
							</div>
						{/if}
					</div>

					<!-- Text below card -->
					<div class="mt-5 px-1">
						<p class="text-[16px] leading-[1.6] text-[#3F3F46] md:text-[17px]">
							<span class="font-semibold text-[#111111]">{feature.title}</span>
							{' '}{feature.desc}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	/* Hide scrollbar but keep functionality */
	.carousel-track {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.carousel-track::-webkit-scrollbar {
		display: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.carousel-track {
			scroll-behavior: auto;
		}
	}
</style>
