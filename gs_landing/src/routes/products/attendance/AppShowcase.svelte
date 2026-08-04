<script lang="ts">
	import { onMount } from 'svelte';
	import ProductCardFrame from '$lib/components/product/ProductCardFrame.svelte';

	let activeTab = $state(0);
	let containerRef: HTMLElement | null = $state(null);
	let isMobile = $state(true);
	let activeLightboxImage = $state<string | null>(null);

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			activeLightboxImage = null;
		}
	}

	const tabs = [
		{
			id: 'attendance',
			label: 'Biometric Attendance',
			title: 'Biometric Attendance',
			subtitle: 'Helps stop proxy attendance',
			desc: 'Verify worker identity directly in the field. The supervisor holds the phone, the app checks the face in less than a second, and saves the attendance hazira offline.',
			bulletPoints: [
				'Instant face comparison done directly on the phone',
				'Quick multi-photo check to ensure the actual worker is present',
				'Works offline with no need for mobile internet in the field'
			],
			img: '/screenshots/13_attendance_result_matched.png',
			alt: 'App result screen showing face matched and verified',
			cropPosition: 'top'
		},
		{
			id: 'weighing',
			label: 'Smart Plucking Scale',
			title: 'Smart Plucking Scale',
			subtitle: 'Automatic leaf weight capture',
			desc: "Connect to wireless Bluetooth hanging scales. The scale sends the kg reading directly to the app, freezing the weight against the worker's face in one step.",
			bulletPoints: [
				'Scale reading is locked beside the worker, not typed from paper',
				'Saves gross weight, tare deduction, and rain slabs',
				'Prevents saving if the weight is missing or entered incorrectly'
			],
			img: '/screenshots/10_harvest_result_scale_connected_save.png',
			alt: 'App result screen showing net leaf weight and save option',
			cropPosition: 'bottom'
		}
	];

	onMount(() => {
		const checkMobile = () => {
			isMobile = window.innerWidth < 1024;
		};

		const handleScroll = () => {
			if (isMobile || !containerRef) return;
			const rect = containerRef.getBoundingClientRect();
			const totalScroll = rect.height - window.innerHeight;
			if (totalScroll <= 0) return;

			// Calculate progress between 0 and 1 while the section is pinned
			const progress = Math.min(Math.max(-rect.top / totalScroll, 0), 1);

			// Map progress to active tab index
			const index = Math.min(Math.floor(progress * tabs.length), tabs.length - 1);
			activeTab = index;
		};

		window.addEventListener('resize', checkMobile);
		window.addEventListener('scroll', handleScroll, { passive: true });

		checkMobile();
		handleScroll(); // Initial evaluation

		return () => {
			window.removeEventListener('resize', checkMobile);
			window.removeEventListener('scroll', handleScroll);
		};
	});

	const scrollToTab = (index: number) => {
		if (!containerRef) return;
		const rect = containerRef.getBoundingClientRect();
		const containerScrollTop = window.scrollY + rect.top;
		const totalScroll = rect.height - window.innerHeight;
		// Scroll to the midpoint of the selected tab's scroll zone
		const targetScrollY = containerScrollTop + ((index + 0.3) / tabs.length) * totalScroll;

		window.scrollTo({
			top: targetScrollY,
			behavior: 'smooth'
		});
	};

	const handleTabClick = (index: number) => {
		if (isMobile) {
			activeTab = index;
		} else {
			scrollToTab(index);
		}
	};
</script>

<svelte:window onkeydown={handleKeyDown} />

<section
	bind:this={containerRef}
	class="relative w-full border-b border-[#E4E4E7] bg-gradient-to-b from-[#F8FAF8] to-white lg:h-[250vh]"
	aria-labelledby="showcase-heading"
>
	<!-- Sticky viewport panel: acts as sticky on desktop, static flow on mobile -->
	<div
		class="relative w-full py-20 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden lg:py-0"
	>
		<div class="mx-auto w-full max-w-[1344px] px-6 md:px-12">
			<!-- Title Header -->
			<div class="mb-12 max-w-[720px] lg:mb-16">
				<span
					class="mb-3 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase lg:mb-4"
					>The Field Application</span
				>
				<h2
					id="showcase-heading"
					class="text-[34px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px] lg:text-[52px]"
					style="text-wrap: balance"
				>
					Inside the GardenSuite Face App
				</h2>
				<p class="mt-4 text-[16px] leading-[1.65] text-[#374151] md:text-[17px] lg:mt-5">
					An offline Android app built for tea garden supervisors. It marks attendance, captures
					leaf weight, and registers workers directly in the field - even without a mobile network.
				</p>
			</div>

			<!-- Main Showcase Grid -->
			<div class="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
				<!-- Left side: Interactive Tab Accordion List -->
				<div class="grid gap-4">
					{#each tabs as tab, i}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<div
							role="tab"
							tabindex="0"
							aria-selected={activeTab === i}
							class="group cursor-pointer rounded-2xl border p-6 text-left transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] {activeTab ===
							i
								? 'border-[#E4E4E7] bg-white shadow-card-hover'
								: 'border-[#E4E4E7] bg-white/50 hover:-translate-y-0.5 hover:bg-[#FAFAF7]'}"
							onclick={() => handleTabClick(i)}
							onkeydown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									handleTabClick(i);
									e.preventDefault();
								}
							}}
						>
							<div class="flex items-center justify-between">
								<h3
									class="text-[18px] font-semibold tracking-[-0.02em] transition-colors duration-300 {activeTab ===
									i
										? 'text-[#1B5E3B]'
										: 'text-[#111111]'}"
								>
									{tab.label}
								</h3>
								<span
									class="font-mono text-[12px] transition-colors duration-300 {activeTab === i
										? 'text-[#1B5E3B]'
										: 'text-[#A1A1AA]'}">0{i + 1}</span
								>
							</div>

							{#if activeTab === i}
								<div class="animate-fade-in mt-4">
									<h4 class="text-[15px] font-semibold text-[#111111]">{tab.subtitle}</h4>
									<p class="mt-2 text-[14px] leading-[1.6] text-[#4B5563]">{tab.desc}</p>
									<ul class="mt-4 grid gap-2">
										{#each tab.bulletPoints as point}
											<li class="flex items-start gap-2.5 text-[13px] leading-[1.5] text-[#4B5563]">
												<svg
													class="mt-0.5 h-4 w-4 shrink-0 text-[#1B5E3B]"
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
								</div>
							{/if}
						</div>
					{/each}
				</div>

				<!-- Right side: Visual Phone Showcase Mockup (Single Zoomed & Cut) -->
				<ProductCardFrame
					onclick={() => (activeLightboxImage = tabs[activeTab].img)}
					class="group/card w-full transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
					innerClass="!p-0 !overflow-hidden relative flex items-center justify-center h-[440px] md:h-[500px] lg:h-[540px]"
				>
					<div class="relative h-full w-full">
						{#each tabs as tab, i}
							<div
								class="device-frame-phone absolute left-1/2 w-[240px] -translate-x-1/2 shadow-[0_10px_28px_rgba(0,0,0,0.10)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:-translate-y-1 md:w-[280px]
								{tab.cropPosition === 'top' ? 'top-8 md:top-12' : 'bottom-8 md:bottom-12'}
								{activeTab === i
									? 'pointer-events-auto scale-100 opacity-100'
									: 'pointer-events-none scale-95 opacity-0'}"
							>
								<div class="device-frame-phone-inner aspect-[9/19.5]">
									<img
										src={tab.img}
										alt={tab.alt}
										width="1080"
										height="2400"
										class="h-full w-full object-cover object-top"
										loading="eager"
									/>
								</div>
							</div>
						{/each}
					</div>

					<!-- View Large card corner hover overlay -->
					<div
						class="pointer-events-none absolute top-4 right-4 z-20 hidden items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-[10px] font-semibold tracking-wider text-white uppercase opacity-0 shadow-[0_4px_12px_rgba(0,0,0,0.08)] backdrop-blur-md transition-opacity duration-300 group-hover/card:opacity-100 lg:flex"
					>
						<svg
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
						>
							<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
						</svg>
						View Large
					</div>

					<!-- Discoverability float-zoom indicator overlay -->
					<div
						class="pointer-events-none absolute right-4 bottom-4 z-20 flex items-center gap-1.5 rounded-full border border-white/40 bg-white/40 px-2.5 py-1 text-[#1B5E3B]/80 shadow-sm backdrop-blur-sm transition-opacity duration-300 group-hover/card:opacity-0 lg:hidden"
					>
						<svg
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
						>
							<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
						</svg>
						<span class="text-[9px] font-semibold tracking-wider uppercase">Tap to Zoom</span>
					</div>
				</ProductCardFrame>
			</div>
		</div>
	</div>

	{#if activeLightboxImage}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm transition-all duration-300"
			onclick={() => (activeLightboxImage = null)}
		>
			<!-- Close button -->
			<button
				class="absolute top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:bg-white/20 active:scale-95"
				onclick={() => (activeLightboxImage = null)}
				aria-label="Close image preview"
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
				>
					<path d="M18 6 6 18M6 6l12 12" />
				</svg>
			</button>

			<!-- Lightbox Content -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="relative max-h-[85vh] max-w-[90vw] scale-100 overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B0C] p-2 shadow-[0_10px_28px_rgba(0,0,0,0.10)]"
				onclick={(e) => e.stopPropagation()}
			>
				<img
					src={activeLightboxImage}
					alt="Zoomed screenshot of the app"
					class="max-h-[80vh] max-w-[85vw] rounded-lg object-contain shadow-inner"
				/>
			</div>
		</div>
	{/if}
</section>

<style>
	@keyframes fade-in {
		0% {
			opacity: 0;
			transform: translateY(4px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.3s ease-out forwards;
	}
</style>
