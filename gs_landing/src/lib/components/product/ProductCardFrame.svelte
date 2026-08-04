<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		class: className = '',
		innerClass = '',
		onclick,
		mode = 'scenic'
	}: {
		children: Snippet;
		class?: string;
		innerClass?: string;
		onclick?: (e: MouseEvent) => void;
		mode?: 'scenic' | 'solid';
	} = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	{onclick}
	class="group relative overflow-hidden {mode === 'solid'
		? 'rounded-2xl border border-[#E4E4E7] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.05)]'
		: 'rounded-[28px] border border-white/70 bg-[#DDEFE4] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)] md:p-5'} transition-all duration-300 {onclick
		? 'cursor-zoom-in'
		: ''} {className}"
>
	{#if mode === 'scenic'}
		<!-- Sky background layer -->
		<picture>
			<source srcset="/hero-sky.webp" type="image/webp" />
			<img
				src="/hero-sky.png"
				alt=""
				class="absolute inset-0 z-0 h-full w-full object-cover object-top brightness-[1.08] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-106"
				width="1024"
				height="1024"
				loading="lazy"
			/>
		</picture>

		<!-- Hills/Landscape background layer -->
		<picture>
			<source
				srcset="/bg-960.webp 960w, /bg-1920.webp 1920w"
				sizes="(min-width: 1024px) 1280px, 92vw"
				type="image/webp"
			/>
			<img
				src="/bg.png"
				alt=""
				class="absolute inset-x-0 bottom-0 z-[1] h-[72%] w-full object-cover object-bottom brightness-[1.08] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-2 group-hover:scale-[1.025]"
				style="mask-image: linear-gradient(to bottom, transparent 0%, black 16%); -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 16%);"
				width="1280"
				height="717"
				loading="lazy"
			/>
		</picture>
		<div class="absolute inset-0 z-[2] bg-white/[0.08]"></div>
	{/if}

	<!-- Glassmorphic content inner container -->
	<div
		class="relative z-10 {mode === 'solid'
			? 'bg-white'
			: 'rounded-[22px] border border-white/65 bg-white/[0.08] p-5 shadow-none backdrop-blur-md md:p-8 lg:p-10'} {innerClass}"
	>
		{@render children()}
	</div>
</div>
