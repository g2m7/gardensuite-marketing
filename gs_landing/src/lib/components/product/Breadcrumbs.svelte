<script lang="ts">
	let {
		items = [],
		dark = false
	}: {
		items: Array<{ name: string; path: string }>;
		dark?: boolean;
	} = $props();
</script>

{#if items.length > 3}
	<nav aria-label="Breadcrumb" class="mb-6 flex text-[13px] font-medium sm:hidden">
		<a
			href={items[items.length - 2].path}
			class="inline-flex min-h-11 items-center gap-2 {dark
				? 'text-white/80 hover:text-white'
				: 'text-green-deep'}"
		>
			<span aria-hidden="true">&#8592;</span>
			Back to {items[items.length - 2].name}
		</a>
		<span class="sr-only" aria-current="page">{items[items.length - 1].name}</span>
	</nav>
{/if}

<nav
	aria-label="Breadcrumb"
	class="mb-6 {items.length > 3
		? 'hidden sm:flex'
		: 'flex'} items-center gap-2 text-[13px] font-medium {dark ? 'text-white/60' : 'text-muted'}"
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
			<span class="{dark ? 'text-white' : 'text-green-deep'} font-semibold" aria-current="page">
				{item.name}
			</span>
		{:else}
			<a
				href={item.path}
				class="inline-flex min-h-11 items-center transition-colors duration-150 {dark
					? 'hover:text-white'
					: 'hover:text-green-deep'}"
			>
				{item.name}
			</a>
		{/if}
	{/each}
</nav>
