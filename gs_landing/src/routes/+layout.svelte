<script lang="ts">
	import './layout.css';
	import { page } from '$app/stores';
	import GlobalNav from '$lib/components/GlobalNav.svelte';
	import CtaBand from '$lib/CtaBand.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	let isHomepage = $derived($page.url.pathname === '/');
</script>

<GlobalNav />

<div id="main-content">
	{@render children()}
</div>

{#if !isHomepage}
	<CtaBand />
{/if}

<Footer />
