<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * The compliant card recipe used by the guide pages:
	 * rounded-xl border border-border bg-white shadow-card.
	 * No opacity backgrounds, no backdrop blur, no arbitrary radius or shadows.
	 *
	 * Props:
	 *   padding - 'sm' (p-5), 'md' (p-6, default) or 'lg' (p-8)
	 *   hover   - Adds a quiet hover lift (border + shadow swap only)
	 *   class   - Extra Tailwind classes, e.g. margins (merged last)
	 *   children- Card content
	 */
	interface Props {
		padding?: 'sm' | 'md' | 'lg';
		hover?: boolean;
		class?: string;
		children?: Snippet;
	}

	let { padding = 'md', hover = false, class: className = '', children }: Props = $props();

	const paddings = {
		sm: 'p-5',
		md: 'p-6',
		lg: 'p-8'
	};
</script>

<div
	class="rounded-xl border border-border bg-white shadow-card {paddings[padding]}
		{hover ? 'transition-shadow hover:border-border-strong hover:shadow-card-hover' : ''}
		{className}"
>
	{@render children?.()}
</div>
