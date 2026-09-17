<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Section label. The only documented kicker style:
	 * text-[13px] font-semibold tracking-[0.08em] uppercase.
	 * Plain uppercase text only - no pill background, no border.
	 *
	 * Props:
	 *   tone    - 'green' (text-green-deep, default) or 'muted' (text-muted)
	 *   class   - Extra Tailwind classes, e.g. margins (merged last)
	 *   children- Label text
	 */
	interface Props {
		tone?: 'green' | 'muted';
		class?: string;
		children?: Snippet;
	}

	let { tone = 'green', class: className = '', children }: Props = $props();

	const tones = {
		green: 'text-green-deep',
		muted: 'text-muted'
	};
</script>

<p class="text-[13px] font-semibold tracking-[0.08em] uppercase {tones[tone]} {className}">
	{@render children?.()}
</p>
