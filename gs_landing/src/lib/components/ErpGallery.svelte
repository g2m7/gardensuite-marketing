<script lang="ts">
	import { onMount } from 'svelte';

	interface GalleryItem {
		src: string;
		alt: string;
		caption: string;
	}

	interface Props {
		items: GalleryItem[];
		title?: string;
		subtitle?: string;
	}

	let { items, title = 'See the Actual Software', subtitle = '' }: Props = $props();

	let scrollContainer: HTMLDivElement;
	let canScrollLeft = $state(false);
	let canScrollRight = $state(true);
	let activeSlide = $state(0);

	let lightboxOpen = $state(false);
	let lightboxIndex = $state(0);
	let dialogEl: HTMLDialogElement;

	function updateScrollState() {
		if (!scrollContainer) return;
		const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
		canScrollLeft = scrollLeft > 4;
		canScrollRight = scrollLeft < scrollWidth - clientWidth - 4;

		const cardWidth = scrollContainer.firstElementChild
			? (scrollContainer.firstElementChild as HTMLElement).offsetWidth + 20
			: 1;
		activeSlide = Math.round(scrollLeft / cardWidth);
	}

	function scrollTo(direction: 'left' | 'right') {
		if (!scrollContainer) return;
		const cardWidth = scrollContainer.firstElementChild
			? (scrollContainer.firstElementChild as HTMLElement).offsetWidth + 20
			: 400;
		scrollContainer.scrollBy({
			left: direction === 'left' ? -cardWidth : cardWidth,
			behavior: 'smooth'
		});
	}

	function scrollToSlide(index: number) {
		if (!scrollContainer) return;
		const children = scrollContainer.children;
		if (children[index]) {
			(children[index] as HTMLElement).scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'start'
			});
		}
	}

	function openLightbox(index: number) {
		lightboxIndex = index;
		lightboxOpen = true;
		dialogEl?.showModal();
	}

	function closeLightbox() {
		lightboxOpen = false;
		dialogEl?.close();
	}

	function handleLightboxKey(e: KeyboardEvent) {
		if (!lightboxOpen) return;
		if (e.key === 'ArrowRight') lightboxIndex = (lightboxIndex + 1) % items.length;
		else if (e.key === 'ArrowLeft')
			lightboxIndex = (lightboxIndex - 1 + items.length) % items.length;
		else if (e.key === 'Escape') closeLightbox();
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === dialogEl) closeLightbox();
	}

	onMount(() => {
		updateScrollState();
		return () => {
			if (lightboxOpen) closeLightbox();
		};
	});
</script>

<svelte:window on:keydown={handleLightboxKey} />

<section
	class="erp-carousel reveal-on-scroll relative w-full overflow-hidden py-20 md:py-28"
	aria-labelledby="erp-gallery-heading"
>
	<!-- Dark background with tea garden imagery -->
	<div class="absolute inset-0 bg-[#0B1712]">
		<picture>
			<source srcset="/bg-960.webp 960w, /bg-1920.webp 1920w" sizes="100vw" type="image/webp" />
			<img
				src="/bg.png"
				alt=""
				class="absolute inset-0 h-full w-full object-cover opacity-30"
				style="filter: blur(3px) brightness(0.7) saturate(0.6);"
				width="1920"
				height="1075"
				loading="lazy"
			/>
		</picture>
		<div
			class="absolute inset-0 bg-gradient-to-b from-[#0B1712]/80 via-[#0B1712]/50 to-[#0B1712]/90"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-[1344px] px-6 md:px-12">
		<!-- Header -->
		<div class="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
			<div>
				{#if title}
					<span
						class="mb-3 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#4ADE80] uppercase"
					>
						Real software
					</span>
					<h2
						id="erp-gallery-heading"
						class="text-[28px] leading-[1.08] font-semibold tracking-[-0.04em] text-white md:text-[36px]"
						style="text-wrap: balance"
					>
						{title}
					</h2>
				{/if}
				{#if subtitle}
					<p class="mt-4 max-w-[480px] text-[15px] leading-[1.65] text-[#9CA3AF]">
						{subtitle}
					</p>
				{/if}
			</div>

			<!-- Navigation arrows -->
			<div class="flex items-center gap-2">
				<button
					type="button"
					class="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/70 backdrop-blur-sm transition-colors duration-150 hover:bg-white/[0.12] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4ADE80]/50 disabled:cursor-not-allowed disabled:opacity-30"
					aria-label="Previous screenshot"
					disabled={!canScrollLeft}
					onclick={() => scrollTo('left')}
				>
					<svg
						width="18"
						height="18"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
						aria-hidden="true"
						><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg
					>
				</button>
				<button
					type="button"
					class="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/70 backdrop-blur-sm transition-colors duration-150 hover:bg-white/[0.12] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4ADE80]/50 disabled:cursor-not-allowed disabled:opacity-30"
					aria-label="Next screenshot"
					disabled={!canScrollRight}
					onclick={() => scrollTo('right')}
				>
					<svg
						width="18"
						height="18"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
						aria-hidden="true"
						><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg
					>
				</button>
			</div>
		</div>
	</div>

	<!-- Carousel track -->
	<div
		class="erp-carousel__track relative z-10"
		bind:this={scrollContainer}
		onscroll={updateScrollState}
		role="region"
		aria-label="Screenshot gallery"
	>
		{#each items as item, i}
			<button
				type="button"
				class="erp-carousel__card group"
				aria-label="View {item.caption} screenshot"
				onclick={() => openLightbox(i)}
			>
				<!-- Frosted glass outer frame -->
				<div
					class="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.04] p-3 shadow-[0_10px_28px_rgba(0,0,0,0.10)] backdrop-blur-sm transition-transform duration-300 group-hover:scale-[1.02] md:p-4"
				>
					<!-- Inner elevated card with screenshot -->
					<div
						class="relative overflow-hidden rounded-xl border border-white/20 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.10)]"
					>
						<div class="relative aspect-[16/10] w-full overflow-hidden bg-[#F4F4F5]">
							<img
								src={item.src}
								alt={item.alt}
								width="560"
								height="350"
								loading="lazy"
								class="h-full w-full object-cover object-top"
							/>
							<!-- Hover overlay with zoom icon -->
							<div
								class="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/15"
							>
								<div
									class="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-opacity duration-200 group-hover:opacity-100"
								>
									<svg
										class="h-5 w-5 text-[#111111]"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
										/>
									</svg>
								</div>
							</div>
						</div>
						<!-- Caption bar -->
						<div class="flex items-center gap-3 border-t border-[#E4E4E7] bg-white px-4 py-3">
							<div
								class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#1B5E3B]/10"
							>
								<svg
									class="h-3.5 w-3.5 text-[#1B5E3B]"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									/>
								</svg>
							</div>
							<p class="min-w-0 truncate text-[13px] leading-[1.4] font-medium text-[#3F3F46]">
								{item.caption}
							</p>
						</div>
					</div>
				</div>
			</button>
		{/each}
	</div>

	<!-- Dot indicators -->
	<div class="relative z-10 mt-8 flex items-center justify-center gap-1.5">
		{#each items as _, i}
			<button
				type="button"
				class="h-1.5 rounded-full transition-all duration-200 {activeSlide === i
					? 'w-6 bg-[#4ADE80]'
					: 'w-1.5 bg-white/25 hover:bg-white/40'}"
				aria-label="Go to screenshot {i + 1}"
				onclick={() => scrollToSlide(i)}
			></button>
		{/each}
	</div>
</section>

<!-- Lightbox -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialogEl}
	class="erp-lightbox"
	aria-label="Screenshot viewer"
	onclick={handleBackdropClick}
>
	{#if lightboxOpen}
		<div class="erp-lightbox__inner" role="document">
			<div class="erp-lightbox__header">
				<div class="flex items-center gap-3">
					<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#1B5E3B]/20">
						<svg
							class="h-3.5 w-3.5 text-[#4ADE80]"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
					</div>
					<p class="text-[15px] font-medium text-[#fafafa]">{items[lightboxIndex].caption}</p>
				</div>
				<div class="flex items-center gap-2">
					<span class="text-[13px] text-[#71717A] tabular-nums"
						>{lightboxIndex + 1} / {items.length}</span
					>
					<button
						type="button"
						class="erp-lightbox__nav"
						aria-label="Previous screenshot"
						onclick={() => {
							lightboxIndex = (lightboxIndex - 1 + items.length) % items.length;
						}}
					>
						<svg
							width="18"
							height="18"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							aria-hidden="true"
							><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg
						>
					</button>
					<button
						type="button"
						class="erp-lightbox__nav"
						aria-label="Next screenshot"
						onclick={() => {
							lightboxIndex = (lightboxIndex + 1) % items.length;
						}}
					>
						<svg
							width="18"
							height="18"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							aria-hidden="true"
							><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg
						>
					</button>
					<button
						type="button"
						class="erp-lightbox__close"
						aria-label="Close viewer"
						onclick={closeLightbox}
					>
						<svg
							width="18"
							height="18"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							aria-hidden="true"
							><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg
						>
					</button>
				</div>
			</div>
			<div class="erp-lightbox__body">
				<img
					src={items[lightboxIndex].src}
					alt={items[lightboxIndex].alt}
					class="erp-lightbox__img"
					width="1152"
					height="720"
				/>
			</div>
		</div>
	{/if}
</dialog>

<style>
	/* ── Carousel Track ── */
	.erp-carousel__track {
		display: flex;
		gap: 20px;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		-webkit-overflow-scrolling: touch;
		padding: 0 max(24px, calc((100vw - 1344px) / 2 + 48px));
		scrollbar-width: none;
	}

	.erp-carousel__track::-webkit-scrollbar {
		display: none;
	}

	/* ── Carousel Card ── */
	.erp-carousel__card {
		flex: 0 0 min(420px, 80vw);
		scroll-snap-align: start;
		cursor: pointer;
		background: none;
		border: none;
		padding: 0;
		text-align: left;
	}

	/* ── Lightbox ── */
	.erp-lightbox {
		position: fixed;
		inset: 0;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		margin: 0;
		width: 100%;
		max-width: 100%;
		height: 100%;
		max-height: 100%;
		border: none;
		background: transparent;
	}

	.erp-lightbox:not([open]) {
		display: none;
	}

	.erp-lightbox::backdrop {
		background: rgba(0, 0, 0, 0.88);
	}

	.erp-lightbox__inner {
		display: flex;
		flex-direction: column;
		max-width: 1100px;
		width: 100%;
		max-height: 90vh;
		gap: 0.75rem;
	}

	.erp-lightbox__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.erp-lightbox__nav {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.12);
		background: rgba(255, 255, 255, 0.06);
		color: #e4e4e7;
		cursor: pointer;
		transition:
			background-color 0.15s,
			border-color 0.15s;
	}

	.erp-lightbox__nav:hover {
		background: rgba(255, 255, 255, 0.12);
		border-color: rgba(255, 255, 255, 0.2);
	}

	.erp-lightbox__nav:focus-visible {
		outline: 2px solid rgba(74, 222, 128, 0.5);
		outline-offset: 2px;
	}

	.erp-lightbox__close {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.12);
		background: rgba(255, 255, 255, 0.06);
		color: #e4e4e7;
		cursor: pointer;
		margin-left: 0.25rem;
		transition:
			background-color 0.15s,
			border-color 0.15s;
	}

	.erp-lightbox__close:hover {
		background: rgba(239, 68, 68, 0.25);
		border-color: rgba(239, 68, 68, 0.4);
	}

	.erp-lightbox__close:focus-visible {
		outline: 2px solid rgba(74, 222, 128, 0.5);
		outline-offset: 2px;
	}

	.erp-lightbox__body {
		overflow: auto;
		border-radius: 16px;
		background: #18181b;
		border: 1px solid rgba(255, 255, 255, 0.06);
	}

	.erp-lightbox__img {
		display: block;
		width: 100%;
		height: auto;
		object-fit: contain;
	}

	@media (prefers-reduced-motion: reduce) {
		.erp-carousel__track {
			scroll-behavior: auto;
		}
		.erp-carousel__card :global(.group-hover\:scale-\[1\.02\]) {
			transform: none;
		}
	}
</style>
