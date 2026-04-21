<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
					}
				});
			},
			{ threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
		);

		document.querySelectorAll('.animate-on-scroll').forEach((el) => {
			observer.observe(el);
		});

		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>Store Management - GardenSuite Products</title>
	<meta
		name="description"
		content="GardenSuite Store Management module for inventory tracking, purchase orders, and issue management."
	/>
</svelte:head>

<div class="[font-synthesis:none] flex overflow-clip w-full min-h-0 flex-col bg-[#FAFAF7] antialiased text-xs/4">
	<!-- Hero: Product Intro -->
	<section class="flex flex-col items-center w-full pt-20 md:pt-28 pb-16 md:pb-24 px-4 md:px-20 gap-6">
		<div class="flex items-center gap-2">
			<div class="w-1.5 h-1.5 rounded-full bg-[#3D7D2C]"></div>
			<div class="tracking-widest uppercase text-[#6B7280] font-['Inter',system-ui,sans-serif] font-semibold text-[12px]/4">
				Store Management
			</div>
		</div>
		<h1 class="text-[36px] md:text-[56px] lg:text-[64px] text-center leading-[1.05] tracking-[-0.04em] text-[#0A0A0A] font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-extrabold max-w-4xl text-pretty">
			Keep your estate's inventory under control.
		</h1>
		<p class="text-[16px] md:text-[18px] text-center leading-[1.7] max-w-[600px] text-[#777777] font-['Inter',system-ui,sans-serif]">
			Every single bag of fertilizer, spare machine part, and fuel drop is tracked through the unified GardenSuite platform. Say no to stockouts and mismanagement.
		</p>
	</section>

	<section class="relative w-full bg-[#1A2E16] overflow-hidden py-20 md:py-28">
		<div class="flex flex-col items-center w-full max-w-[1400px] mx-auto px-6 md:px-14 gap-14">
			<div class="flex flex-col items-center gap-5 animate-on-scroll">
				<h2 class="text-[32px] md:text-[48px] text-center leading-[1.1] tracking-[-0.03em] text-white font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-extrabold">
					Never lose track of a single asset.
				</h2>
				<p class="text-[16px] text-center text-white/50 font-['Inter',system-ui,sans-serif] max-w-2xl">
					Manage incoming purchase orders securely, assign items to specific sections of the tea garden accurately, and instantly calculate costs associated with various field and factory activities.
				</p>
			</div>
		</div>
	</section>
</div>

<style>
	.animate-on-scroll {
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.8s ease-out, transform 0.8s ease-out;
	}
	:global(.animate-on-scroll.is-visible) {
		opacity: 1;
		transform: translateY(0);
	}
	@media (prefers-reduced-motion: reduce) {
		.animate-on-scroll {
			transition: none;
			opacity: 1;
			transform: none;
		}
	}
</style>
