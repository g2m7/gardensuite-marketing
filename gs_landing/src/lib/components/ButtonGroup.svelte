<script lang="ts">
	/**
	 * Button layout wrapper copied exactly from the homepage hero CTA row.
	 * Stacks buttons vertically on mobile, side-by-side on desktop.
	 * Always wrap pairs of <Button> components inside this.
	 *
	 * Props:
	 *   class - Extra Tailwind classes (e.g. 'mt-8' for spacing)
	 */
	let {
		children,
		class: className = ''
	}: {
		children?: import('svelte').Snippet;
		class?: string;
	} = $props();
</script>

<!-- Exact wrapper classes from the homepage hero. -->
<div class="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row {className}">
	{@render children?.()}
</div>
