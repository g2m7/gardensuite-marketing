<script lang="ts">
	import './layout.css';
	import { page } from '$app/stores';
	import GlobalNav from '$lib/components/GlobalNav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	// Pages with dark hero sections need light nav text at scroll top
	const darkHeroRoutes = ['/products/attendance'];
	let darkHero = $derived(darkHeroRoutes.includes($page.url.pathname));
</script>

<GlobalNav {darkHero} />

<div id="main-content">
	{@render children()}
</div>

<Footer />
