<script lang="ts">
	let {
		children,
		maxWidth = 'max-w-[960px]',
		class: className = ''
	}: {
		children?: import('svelte').Snippet;
		maxWidth?: string;
		class?: string;
	} = $props();
</script>

<div
	class="product-hero-showcase relative mx-auto h-[470px] w-full {maxWidth} md:h-[540px] lg:absolute lg:top-1/2 lg:left-0 lg:mt-0 lg:h-[470px] lg:max-w-none lg:-translate-y-1/2 {className}"
>
	<div
		class="product-hero-panel absolute right-0 bottom-0 hidden h-[78%] w-[82%] rounded-[16px] border border-white/[0.10] bg-[#050607] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.025)] lg:block"
	></div>
	<div
		class="absolute right-1 bottom-1 hidden h-[78%] w-[82%] rounded-[16px] border border-white/[0.05] lg:block"
	></div>
	<div class="relative z-10 flex h-full items-end justify-center lg:items-center lg:justify-start">
		{@render children?.()}
	</div>
</div>
