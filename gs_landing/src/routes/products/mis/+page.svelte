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
	<title>MIS Dashboard - GardenSuite Products</title>
	<meta
		name="description"
		content="GardenSuite MIS Dashboard viewable from any device - monitor your tea estate from anywhere."
	/>
</svelte:head>

<div class="[font-synthesis:none] flex overflow-clip w-full min-h-0 flex-col bg-[#FAFAF7] antialiased text-xs/4">
	<!-- Hero: Product Intro -->
	<section class="flex flex-col items-center w-full pt-20 md:pt-28 pb-16 md:pb-24 px-6 md:px-12 gap-6">
		<div class="flex items-center gap-2">
			<div class="w-1.5 h-1.5 rounded-full bg-[#3D7D2C]"></div>
			<div class="tracking-widest uppercase text-[#6B7280] font-semibold text-[12px]/4">
				MIS Dashboard
			</div>
		</div>
		<h1 class="text-[36px] md:text-[56px] lg:text-[64px] text-center leading-[1.05] tracking-[-0.04em] text-[#0A0A0A] font-medium max-w-4xl text-pretty">
			Your tea garden, right in your pocket.
		</h1>
		<p class="text-[16px] md:text-[18px] text-center leading-[1.7] max-w-[600px] text-[#777777] ">
			Owners and upper management don't need to depend on calls and physical meetings. View daily management information systems directly through a cloud dashboard. 
		</p>
	</section>

	<section class="relative w-full bg-[#F3F6F1] overflow-hidden">
		<div class="flex flex-col items-center w-full max-w-[1100px] mx-auto px-6 md:px-12 pb-20 pt-10">
			<!-- Dashboard Mockup Image -->
			<div class="relative flex flex-col w-full grow shrink basis-[0%] rounded-[20px] overflow-clip border border-solid border-[#0000000F] shadow-[0_20px_80px_rgba(0,0,0,0.07)] bg-white max-h-[500px] md:max-h-[650px] mx-auto animate-on-scroll">
				<img src="/hero-sign-in.png" alt="GardenSuite MIS Dashboard" class="w-full h-auto object-cover object-top" width="1920" height="1080" />
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
