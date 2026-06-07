<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup.svelte';

	let {
		primaryHref = '/#contact',
		primaryLabel = 'Book Free Demo',
		secondaryHref = '',
		secondaryLabel = 'Email Us'
	}: {
		primaryHref?: string;
		primaryLabel?: string;
		secondaryHref?: string;
		secondaryLabel?: string;
	} = $props();
</script>

<ButtonGroup>
	<Button href={primaryHref} label={primaryLabel} variant="primary" showIcon />
	{#if secondaryHref}
		<Button href={secondaryHref} label={secondaryLabel} variant="secondary" />
	{/if}
</ButtonGroup>
