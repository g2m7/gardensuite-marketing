<script lang="ts">
	/**
	 * Canonical button component extracted from the homepage hero.
	 * Matches the exact homepage CTA styling - use inside <ButtonGroup> for the standard layout.
	 *
	 * Props:
	 *   href      - Target URL (required)
	 *   label     - Button text (required)
	 *   variant   - 'primary' (green), 'secondary' (white outline), 'secondary-dark' (dark bg)
	 *   size      - 'sm' (nav), 'md' (hero default), 'lg' (CTA band)
	 *   showIcon  - Adds a chevron arrow (primary only, default false)
	 *   target    - e.g. '_blank' for external links
	 *   class     - Extra Tailwind classes (merged last, so e.g. 'hidden md:flex' works)
	 *   onclick   - Click handler (e.g. close mobile nav)
	 */
	let {
		href,
		label,
		variant = 'primary',
		size = 'md',
		showIcon = false,
		target = '',
		class: className = '',
		onclick
	}: {
		href: string;
		label: string;
		variant?: 'primary' | 'secondary' | 'secondary-dark';
		size?: 'sm' | 'md' | 'lg';
		showIcon?: boolean;
		target?: string;
		class?: string;
		onclick?: (e: MouseEvent) => void;
	} = $props();

	// Base classes copied exactly from the homepage hero anchor tags.
	// Do not change without verifying visual parity against the homepage.
	const base =
		'flex w-full items-center justify-center rounded-full transition duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.97] sm:w-auto';

	const variants = {
		primary: 'bg-[#1B5E3B] text-white shadow-[0_4px_12px_rgba(0,0,0,0.10)] hover:bg-[#144723]',
		secondary:
			'border border-[#E4E4E7] bg-white text-[#0A0A0A] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-[#D4D4D8] hover:bg-[#FAFAF7]',
		'secondary-dark': 'border border-[#333333] bg-transparent text-white hover:bg-[#1A1A1A]'
	};

	const sizes = {
		sm: 'h-10 px-6 text-[14px] leading-none font-semibold gap-2',
		md: 'px-6 py-4 text-sm font-medium gap-2',
		lg: 'px-8 py-3.5 text-sm font-semibold gap-2'
	};

	let classes = $derived(`${base} ${variants[variant]} ${sizes[size]} ${className}`);
</script>

<a {href} class={classes} {target} {onclick}>
	<span>{label}</span>
	{#if showIcon && variant === 'primary'}
		<svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="shrink-0" aria-hidden="true">
			<path
				d="M5 2.5l4.5 4.5L5 11.5"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	{/if}
</a>
