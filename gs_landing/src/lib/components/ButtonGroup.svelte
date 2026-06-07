<script lang="ts">
	let {
		children,
		class: className = ''
	}: {
		children?: import('svelte').Snippet;
		class?: string;
	} = $props();
</script>

<div class="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row {className}">
	{@render children?.()}
</div>
