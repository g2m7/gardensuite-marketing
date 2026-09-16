<script lang="ts">
	import { onMount } from 'svelte';
	import GsLogoAnimation from '$lib/components/GsLogoAnimation.svelte';

	let { onComplete = () => {} }: { onComplete?: () => void } = $props();

	let preloaderEl = $state<HTMLElement | null>(null);
	let barEl = $state<HTMLElement | null>(null);
	let brandEl = $state<HTMLElement | null>(null);
	let visible = $state(true);

	onMount(async () => {
		// Respect reduced motion or skip if already seen this session
		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		let alreadySeen = false;
		try {
			alreadySeen = sessionStorage.getItem('gs_preloader_shown') === 'true';
		} catch {
			alreadySeen = false;
		}

		if (prefersReduced || alreadySeen) {
			visible = false;
			onComplete();
			return;
		}

		try {
			const { gsap } = await import('gsap');

			if (!preloaderEl || !barEl || !brandEl) {
				visible = false;
				onComplete();
				return;
			}

			// Failsafe timer (maximum 1.2s total before force dismissal)
			const timeout = setTimeout(() => {
				if (visible) {
					visible = false;
					try {
						sessionStorage.setItem('gs_preloader_shown', 'true');
					} catch {}
					onComplete();
				}
			}, 1200);

			const tl = gsap.timeline({
				onComplete: () => {
					clearTimeout(timeout);
					visible = false;
					try {
						sessionStorage.setItem('gs_preloader_shown', 'true');
					} catch {}
					onComplete();
				}
			});

			// Progress stroke sweeps left-to-right
			tl.fromTo(
				barEl,
				{ scaleX: 0, transformOrigin: 'left' },
				{ scaleX: 1, duration: 0.42, ease: 'power2.inOut' }
			)
				// Brand logo gently floats up and fades
				.to(brandEl, { opacity: 0, y: -10, duration: 0.22, ease: 'power2.in' }, '+=0.04')
				// Curtain lifts up into the hero section
				.to(
					preloaderEl,
					{
						yPercent: -100,
						duration: 0.65,
						ease: 'power4.inOut'
					},
					'-=0.08'
				);
		} catch {
			visible = false;
			onComplete();
		}
	});
</script>

<noscript>
	<style>
		.cinematic-preloader {
			display: none !important;
		}
	</style>
</noscript>

{#if visible}
	<div
		bind:this={preloaderEl}
		class="cinematic-preloader fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0d1410] text-white select-none pointer-events-auto"
		aria-hidden="true"
	>
		<div bind:this={brandEl} class="flex flex-col items-center gap-3.5">
			<div class="h-14 w-14">
				<GsLogoAnimation class="h-full w-full" />
			</div>
			<div class="flex flex-col items-center gap-1">
				<span class="text-[13px] font-semibold tracking-[0.24em] text-white/90 uppercase">
					GardenSuite
				</span>
				<span class="text-[10px] tracking-[0.1em] text-white/40 uppercase">
					Sarbani Associates
				</span>
			</div>
		</div>

		<div class="mt-7 h-[2px] w-36 overflow-hidden rounded-full bg-white/10">
			<div bind:this={barEl} class="h-full w-full origin-left rounded-full bg-[#4f703b]"></div>
		</div>
	</div>
{/if}

<style>
	:global(.skip-preloader .cinematic-preloader) {
		display: none !important;
	}
</style>
