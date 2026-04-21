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
	<title>Factory Accounts - GardenSuite Products</title>
	<meta
		name="description"
		content="GardenSuite Factory Accounts module for processing, production, and manufacturing cost tracking."
	/>
</svelte:head>

<div class="[font-synthesis:none] flex overflow-clip w-full min-h-0 flex-col bg-[#FAFAF7] antialiased text-xs/4">
	<!-- Hero: Product Intro -->
	<section class="flex flex-col items-center w-full pt-20 md:pt-28 pb-16 md:pb-24 px-6 md:px-12 gap-6">
		<div class="flex items-center gap-2">
			<div class="w-1.5 h-1.5 rounded-full bg-[#3D7D2C]"></div>
			<div class="tracking-widest uppercase text-[#6B7280] font-['Inter',system-ui,sans-serif] font-semibold text-[12px]/4">
				Factory Accounts
			</div>
		</div>
		<h1 class="text-[36px] md:text-[56px] lg:text-[64px] text-center leading-[1.05] tracking-[-0.04em] text-[#0A0A0A] font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-extrabold max-w-4xl text-pretty">
			Master your factory production data.
		</h1>
		<p class="text-[16px] md:text-[18px] text-center leading-[1.7] max-w-[600px] text-[#777777] font-['Inter',system-ui,sans-serif]">
			Track green leaf inflow, manufacturing steps, power consumption, and dispatch effortlessly. Gain crystal clear insights into your manufacturing costs.
		</p>
	</section>

	<section class="relative w-full bg-[#F3F6F1] overflow-hidden py-20 md:py-28">
		<div class="flex flex-col items-center w-full max-w-[1100px] mx-auto px-6 md:px-12 gap-14">
			<div class="flex flex-col items-center gap-5 animate-on-scroll">
				<h2 class="text-[32px] md:text-[48px] text-center leading-[1.1] tracking-[-0.03em] text-[#1A2E16] font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-extrabold">
					From green leaf to invoiced tea.
				</h2>
				<p class="text-[16px] text-center text-[#5A6B58] font-['Inter',system-ui,sans-serif] max-w-2xl">
					Manage withering, rolling, fermentation, drying, sizing, sorting, and dispatch all within the ERP platform. Fully offline reliable, with automatic cloud reporting.
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
