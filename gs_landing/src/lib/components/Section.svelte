<script lang="ts">
	import type { Snippet } from 'svelte';
	import Container from './Container.svelte';
	import Kicker from './Kicker.svelte';

	/**
	 * Vertical page section: Container + consistent vertical rhythm
	 * (py-16 md:py-24), with an optional kicker and h2 title.
	 *
	 * Props:
	 *   tone    - 'plain' (no background set) or 'surface' (bg-surface)
	 *   id      - Anchor id for in-page links (e.g. #workflow)
	 *   kicker  - Optional section label, rendered with Kicker (green tone)
	 *   title   - Optional h2, rendered in the locked type style from DESIGN.md
	 *   class   - Extra Tailwind classes, e.g. borders (merged last)
	 *   children- Section content, rendered inside the Container
	 */
	interface Props {
		tone?: 'plain' | 'surface';
		id?: string;
		kicker?: string;
		title?: string;
		class?: string;
		children?: Snippet;
	}

	let {
		tone = 'plain',
		id = undefined,
		kicker = '',
		title = '',
		class: className = '',
		children
	}: Props = $props();

	const tones = {
		plain: '',
		surface: 'bg-surface'
	};
</script>

<section {id} class="{tones[tone]} py-16 md:py-24 {className}">
	<Container>
		{#if kicker}
			<Kicker class="mb-4">{kicker}</Kicker>
		{/if}
		{#if title}
			<h2
				class="font-display text-[28px] leading-[1.08] font-semibold tracking-[-0.04em] text-heading md:text-[36px]"
			>
				{title}
			</h2>
		{/if}
		{@render children?.()}
	</Container>
</section>
