<script lang="ts">
	let {
		items = [],
		dark = false
	}: {
		items: Array<{ name: string; path: string }>;
		dark?: boolean;
	} = $props();
</script>

<nav
	aria-label="Breadcrumb"
	class="mb-6 flex items-center gap-2 text-[13px] font-medium {dark
		? 'text-white/60'
		: 'text-[#71717A]'}"
>
	{#each items as item, i}
		{#if i > 0}
			<svg
				width="6"
				height="10"
				viewBox="0 0 8 12"
				fill="none"
				class="{dark ? 'text-white/30' : 'text-[#A1A1AA]'} shrink-0"
				aria-hidden="true"
			>
				<path
					d="M1.5 1.5L6.5 6L1.5 10.5"
					stroke="currentColor"
					stroke-width="1.8"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		{/if}
		{#if i === items.length - 1}
			<span class="{dark ? 'text-white' : 'text-[#1B5E3B]'} font-semibold" aria-current="page">
				{item.name}
			</span>
		{:else}
			<a
				href={item.path}
				class="transition-colors duration-150 {dark ? 'hover:text-white' : 'hover:text-[#1B5E3B]'}"
			>
				{item.name}
			</a>
		{/if}
	{/each}
</nav>
