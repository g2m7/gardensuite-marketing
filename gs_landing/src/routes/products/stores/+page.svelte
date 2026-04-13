<script lang="ts">
	import { onMount } from 'svelte';

	let scrollY = $state(0);

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

<svelte:window bind:scrollY />

<svelte:head>
	<title>Store Management - GardenSuite Products</title>
	<meta
		name="description"
		content="GardenSuite Store Management module for inventory tracking, purchase orders, and issue management."
	/>
</svelte:head>

<div
	class="[font-synthesis:none] flex overflow-clip w-full min-h-screen flex-col bg-[#FAFAF7] antialiased text-xs/4"
>
	<!-- Navigation -->
	<nav class="flex items-center justify-between w-full py-4.5 px-6 md:px-14 border-b border-[#0000000A] bg-[#FAFAF7]/80 backdrop-blur-xl sticky top-0 z-50">
		<a href="/" class="flex items-center gap-1.5" aria-label="GardenSuite Home">
			<img src="/favicon.png" alt="" class="h-7 w-auto shrink-0" aria-hidden="true" width="28" height="28" />
			<div class="tracking-[-0.01em] inline-block text-[#0A0A0A] font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-bold text-[17px]/5.5">
				GardenSuite
			</div>
			<div class="flex items-center ml-1 rounded-sm py-0.5 px-2 bg-[#F0FDF4]">
				<div class="tracking-[0.04em] inline-block text-[#1B5E3B] font-['Inter',system-ui,sans-serif] font-bold text-[10px]/3">
					V3
				</div>
			</div>
		</a>
		<div class="hidden md:flex items-center gap-8">
			<a href="/#features" class="inline-block text-[#6B7280] font-['Inter',system-ui,sans-serif] font-medium text-sm/4.5 hover:text-black transition-colors">
				Features
			</a>
			<a href="/#clients" class="inline-block text-[#6B7280] font-['Inter',system-ui,sans-serif] font-medium text-sm/4.5 hover:text-black transition-colors">
				Clients
			</a>
			<a href="/#about" class="inline-block text-[#6B7280] font-['Inter',system-ui,sans-serif] font-medium text-sm/4.5 hover:text-black transition-colors">
				About
			</a>
		</div>
		<div class="flex items-center gap-2">
			<a href="/#contact" class="hidden md:inline-block text-[#6B7280] font-['Inter',system-ui,sans-serif] font-medium text-sm/4.5 mr-4 hover:text-black transition-colors">
				Contact
			</a>
			<a href="/#contact" class="flex items-center rounded-[100px] py-2.5 px-5 bg-[#0A0A0A] hover:scale-[1.02] active:scale-[0.98] transition-transform focus-visible:ring-2 focus-visible:ring-[#3D7D2C] focus-visible:ring-offset-2">
				<div class="inline-block text-white font-['Inter',system-ui,sans-serif] font-semibold text-[13px]/4">
					Book a Demo
				</div>
			</a>
		</div>
	</nav>

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

	<!-- CTA Block -->
	<section class="flex flex-col items-center w-full py-24 md:py-28 px-4 md:px-30 gap-6 bg-[#0A0A0A]">
		<img src="/gardensuite-icon-white.svg" alt="" class="h-12 w-auto mb-2 opacity-90" aria-hidden="true" width="48" height="48" />
		<h2 class="text-[32px] md:text-[40px] text-center tracking-[-0.02em] leading-[1.15] text-white font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-extrabold text-pretty">
			Ready to modernize your tea garden?
		</h2>
		<p class="text-[15px] text-center leading-[1.6] max-w-[500px] text-[#A3A3A3] font-['Inter',system-ui,sans-serif]">
			Book a free demo and see how GardenSuite can replace paperwork with a single tap. Free setup, free training - no risk.
		</p>
		<div class="flex pt-4 gap-4">
			<a href="/#contact" class="flex items-center justify-center rounded-[100px] py-3.5 px-8 bg-[#1B5E3B] hover:bg-[#144723] transition-colors focus-visible:ring-2 focus-visible:ring-[#5CA84A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]" aria-label="Book a Demo">
				<span class="inline-block text-white font-['Inter',system-ui,sans-serif] font-semibold text-sm">
					Book a Demo
				</span>
			</a>
			<a href="/#contact" class="flex items-center justify-center rounded-[100px] py-3.5 px-8 border border-[#333333] hover:bg-[#1A1A1A] transition-colors focus-visible:ring-2 focus-visible:ring-[#5CA84A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]" aria-label="Contact Us">
				<span class="inline-block text-white font-['Inter',system-ui,sans-serif] font-semibold text-sm">
					Contact Us
				</span>
			</a>
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
