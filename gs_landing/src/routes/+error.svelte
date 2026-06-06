<script lang="ts">
	import { page } from '$app/stores';
	import GsLogoAnimation from '$lib/components/GsLogoAnimation.svelte';

	let status = $derived($page.status);
	let message = $derived($page.error?.message || 'Something went wrong');

	// Friendly messages per status code
	let heading = $derived(
		status === 404
			? 'Page not found'
			: status === 500
				? 'Server error'
				: status === 503
					? 'Service unavailable'
					: status === 403
						? 'Access denied'
						: 'Something went wrong'
	);

	let description = $derived(
		status === 404
			? "The page you are looking for does not exist or has been moved. Let us help you find your way back."
			: status === 500
				? "Our server ran into a problem. Please try again in a few moments."
				: status === 503
					? "We are performing maintenance. Please check back shortly."
					: status === 403
						? "You do not have permission to view this page."
						: "An unexpected error occurred. Please try again."
	);

	// Floating leaf animation state
	let mounted = $state(false);

	import { onMount } from 'svelte';
	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>{status} - {heading} | GardenSuite</title>
	<meta name="description" content="{heading} - GardenSuite Tea Garden Management Software" />
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<section
	class="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-white px-6 py-24 md:px-12"
>
	<!-- Background pattern -->
	<div
		class="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#F8FAF8] via-white to-[#F8FAF8]"
	></div>

	<!-- Subtle dot grid -->
	<div class="dot-grid-light pointer-events-none absolute inset-0 opacity-40"></div>

	<!-- Floating tea leaves (decorative) -->
	{#if mounted}
		<div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
			<!-- Leaf 1 -->
			<svg
				class="error-leaf error-leaf-1 absolute"
				width="32"
				height="32"
				viewBox="0 0 24 24"
				fill="none"
			>
				<path
					d="M12 2C6.5 2 2 6.5 2 12c0 3.5 2 6.5 5 8 1-4 4-8 9-10 2-1 4-1.5 6-1.5C21 4.5 17 2 12 2z"
					fill="#1B5E3B"
					opacity="0.06"
				/>
			</svg>
			<!-- Leaf 2 -->
			<svg
				class="error-leaf error-leaf-2 absolute"
				width="48"
				height="48"
				viewBox="0 0 24 24"
				fill="none"
			>
				<path
					d="M12 2C6.5 2 2 6.5 2 12c0 3.5 2 6.5 5 8 1-4 4-8 9-10 2-1 4-1.5 6-1.5C21 4.5 17 2 12 2z"
					fill="#1B5E3B"
					opacity="0.04"
				/>
			</svg>
			<!-- Leaf 3 -->
			<svg
				class="error-leaf error-leaf-3 absolute"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
			>
				<path
					d="M12 2C6.5 2 2 6.5 2 12c0 3.5 2 6.5 5 8 1-4 4-8 9-10 2-1 4-1.5 6-1.5C21 4.5 17 2 12 2z"
					fill="#1B5E3B"
					opacity="0.05"
				/>
			</svg>
		</div>
	{/if}

	<!-- Content -->
	<div class="relative z-10 mx-auto flex max-w-lg flex-col items-center text-center">
		<!-- Animated logo -->
		<div
			class="mb-8 transition-all duration-700 ease-out {mounted
				? 'translate-y-0 opacity-100'
				: 'translate-y-6 opacity-0'}"
		>
			<GsLogoAnimation class="h-16 w-16 md:h-20 md:w-20" />
		</div>

		<!-- Error code -->
		<div
			class="mb-6 transition-all delay-100 duration-700 ease-out {mounted
				? 'translate-y-0 opacity-100'
				: 'translate-y-6 opacity-0'}"
		>
			<span
				class="inline-flex items-center rounded-full border border-[#E4E4E7] bg-[#F8FAF8] px-4 py-1.5 text-[13px] font-semibold tracking-[0.08em] uppercase text-[#1B5E3B]"
			>
				Error {status}
			</span>
		</div>

		<!-- Heading -->
		<h1
			class="mb-5 font-display text-[28px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[36px] transition-all delay-150 duration-700 ease-out {mounted
				? 'translate-y-0 opacity-100'
				: 'translate-y-6 opacity-0'}"
		>
			{heading}
		</h1>

		<!-- Description -->
		<p
			class="mb-10 max-w-md text-[16px] leading-[1.65] text-[#4B5563] transition-all delay-200 duration-700 ease-out {mounted
				? 'translate-y-0 opacity-100'
				: 'translate-y-6 opacity-0'}"
		>
			{description}
		</p>

		<!-- CTAs -->
		<div
			class="flex flex-col items-center gap-3 sm:flex-row transition-all delay-[250ms] duration-700 ease-out {mounted
				? 'translate-y-0 opacity-100'
				: 'translate-y-6 opacity-0'}"
		>
			<!-- Primary: Go Home -->
			<a
				href="/"
				class="group inline-flex items-center justify-center rounded-full bg-[#1B5E3B] px-6 py-3.5 shadow-[0_4px_20px_rgba(27,94,59,0.25)] transition-all duration-150 hover:bg-[#144723] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.97]"
			>
				<span class="text-[14px] leading-none font-medium text-white">Go to Homepage</span>
				<svg
					width="14"
					height="14"
					viewBox="0 0 14 14"
					fill="none"
					class="ml-2 transition-transform duration-200 group-hover:translate-x-0.5"
					aria-hidden="true"
				>
					<path
						d="M5.25 3.5L8.75 7L5.25 10.5"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="text-white"
					/>
				</svg>
			</a>

			<!-- Secondary: Contact -->
			<a
				href="/#contact"
				class="inline-flex items-center justify-center rounded-full border border-[#E4E4E7] bg-white px-6 py-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-150 hover:border-[#D4D4D8] hover:bg-[#FAFAF7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.97]"
			>
				<span class="text-[14px] leading-none font-medium text-[#0A0A0A]">Contact Support</span>
			</a>
		</div>

		<!-- Server message (dev detail, subtle) -->
		{#if message && message !== heading}
			<p
				class="mt-8 max-w-sm text-[12px] leading-[1.5] text-[#A1A1AA] transition-all delay-300 duration-700 ease-out {mounted
					? 'translate-y-0 opacity-100'
					: 'translate-y-6 opacity-0'}"
			>
				{message}
			</p>
		{/if}
	</div>
</section>

<style>
	/* Floating leaf animations */
	.error-leaf {
		will-change: transform, opacity;
	}

	.error-leaf-1 {
		top: 15%;
		left: 10%;
		animation: leafFloat1 12s ease-in-out infinite;
	}

	.error-leaf-2 {
		top: 25%;
		right: 8%;
		animation: leafFloat2 16s ease-in-out infinite;
	}

	.error-leaf-3 {
		bottom: 20%;
		left: 20%;
		animation: leafFloat3 14s ease-in-out infinite;
	}

	@keyframes leafFloat1 {
		0%,
		100% {
			transform: translateY(0) rotate(0deg);
			opacity: 0.6;
		}
		25% {
			transform: translateY(-20px) rotate(15deg);
			opacity: 0.8;
		}
		50% {
			transform: translateY(-8px) rotate(-10deg);
			opacity: 0.5;
		}
		75% {
			transform: translateY(-25px) rotate(8deg);
			opacity: 0.7;
		}
	}

	@keyframes leafFloat2 {
		0%,
		100% {
			transform: translateY(0) rotate(0deg) scale(1);
			opacity: 0.5;
		}
		33% {
			transform: translateY(-30px) rotate(-20deg) scale(1.05);
			opacity: 0.7;
		}
		66% {
			transform: translateY(-12px) rotate(12deg) scale(0.95);
			opacity: 0.4;
		}
	}

	@keyframes leafFloat3 {
		0%,
		100% {
			transform: translateY(0) rotate(5deg);
			opacity: 0.5;
		}
		50% {
			transform: translateY(-18px) rotate(-15deg);
			opacity: 0.7;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.error-leaf {
			animation: none !important;
			opacity: 0.5;
		}
	}
</style>
