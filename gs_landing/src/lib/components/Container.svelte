<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Horizontal page wrapper. Centers content and applies the standard
	 * responsive side padding (px-6 on mobile, px-12 from md up).
	 *
	 * Props:
	 *   size    - 'full' (max-w-[1344px], the standard section container)
	 *             or 'narrow' (max-w-2xl, for prose and centered copy)
	 *   class   - Extra Tailwind classes (merged last)
	 *   children- Section content
	 */
	interface Props {
		size?: 'full' | 'narrow';
		class?: string;
		children?: Snippet;
	}

	let { size = 'full', class: className = '', children }: Props = $props();

	const sizes = {
		full: 'max-w-[1344px]',
		narrow: 'max-w-2xl'
	};
</script>

<div class="mx-auto px-6 md:px-12 {sizes[size]} {className}">
	{@render children?.()}
</div>
