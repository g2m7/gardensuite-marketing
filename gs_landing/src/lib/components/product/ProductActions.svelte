<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup.svelte';

	let {
		primaryHref = '/#contact',
		primaryLabel = 'Book Free Demo',
		secondaryHref = '',
		secondaryLabel = 'Email Us',
		onPrimaryClick,
		onSecondaryClick
	}: {
		primaryHref?: string;
		primaryLabel?: string;
		secondaryHref?: string;
		secondaryLabel?: string;
		onPrimaryClick?: (event: MouseEvent) => void;
		onSecondaryClick?: (event: MouseEvent) => void;
	} = $props();
</script>

<ButtonGroup>
	<Button
		href={primaryHref}
		label={primaryLabel}
		variant="primary"
		showIcon
		onclick={onPrimaryClick}
	/>
	{#if secondaryHref}
		<Button
			href={secondaryHref}
			label={secondaryLabel}
			variant="secondary"
			onclick={onSecondaryClick}
		/>
	{/if}
</ButtonGroup>
