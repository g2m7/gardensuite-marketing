<script lang="ts">
	let { name }: { name: 'face' | 'weighing' | 'offline' | 'payroll' | 'mis' } = $props();
</script>

<svg
	class="h-8 w-8"
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.6"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	{#if name === 'face'}
		<path
			d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"
		/>
		<circle cx="12" cy="10" r="3" />
		<path d="M7.5 18c.9-2.3 2.4-3.5 4.5-3.5s3.6 1.2 4.5 3.5" />
	{:else if name === 'weighing'}
		<path d="M5 8h14l1.5 12h-17L5 8Z" />
		<path d="M8 8a4 4 0 0 1 8 0" />
		<path d="M12 11v3l2 1" />
		<circle cx="12" cy="14" r="4" />
	{:else if name === 'offline'}
		<path d="M6.7 18H6a4 4 0 0 1-.5-8 6.5 6.5 0 0 1 11.8-2.2A4.5 4.5 0 0 1 18 18h-.7" />
		<path d="m9 16 3-3 3 3M12 13v7" />
		<path d="m4 4 16 16" />
	{:else if name === 'payroll'}
		<rect x="3" y="6" width="18" height="12" rx="2" />
		<circle cx="12" cy="12" r="2.5" />
		<path d="M7 9H6v1M17 15h1v-1" />
	{:else}
		<rect x="3" y="3" width="18" height="18" rx="2" />
		<path d="M8 16v-3M12 16V8M16 16v-5" />
		<path d="M7 18h10" />
	{/if}
</svg>
