<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		class: className = '',
		innerClass = ''
	}: {
		children: Snippet;
		class?: string;
		innerClass?: string;
	} = $props();
</script>

<div
	class="relative overflow-hidden rounded-[28px] border border-white/70 bg-[#DDEFE4] p-4 shadow-[0_18px_50px_rgba(15,46,12,0.12)] transition-all duration-300 md:p-5 {className}"
>
	<!-- Sky background layer -->
	<picture>
		<source srcset="/hero-sky.webp" type="image/webp" />
		<img
			src="/hero-sky.png"
			alt=""
			class="absolute inset-0 z-0 h-full w-full object-cover object-top brightness-[1.08]"
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
			class="absolute inset-x-0 bottom-0 z-[1] h-[72%] w-full object-cover object-bottom brightness-[1.08]"
			style="mask-image: linear-gradient(to bottom, transparent 0%, black 16%); -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 16%);"
			width="1280"
			height="717"
			loading="lazy"
		/>
	</picture>
	<div class="absolute inset-0 z-[2] bg-white/[0.08]"></div>

	<!-- Glassmorphic content inner container -->
	<div
		class="relative z-10 rounded-[22px] border border-white/65 bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-md p-5 md:p-8 lg:p-10 {innerClass}"
	>
		{@render children()}
	</div>
</div>
