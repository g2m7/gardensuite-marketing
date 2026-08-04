<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { env } from '$env/dynamic/public';
	import { trackEvent } from '$lib/analytics';

	const measurementId = env.PUBLIC_GA_MEASUREMENT_ID?.trim() || '';
	let preference = $state<'accepted' | 'declined' | null>(null);
	let loaded = false;

	function loadAnalytics() {
		if (!measurementId || loaded || typeof document === 'undefined') return;
		loaded = true;
		window.dataLayer = window.dataLayer || [];
		window.gtag = function (...args: unknown[]) {
			window.dataLayer?.push(args);
		};
		window.gtag('js', new Date());
		window.gtag('config', measurementId, {
			anonymize_ip: true,
			page_path: $page.url.pathname + $page.url.search
		});

		const script = document.createElement('script');
		script.async = true;
		script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
		document.head.appendChild(script);
	}

	function setPreference(value: 'accepted' | 'declined') {
		preference = value;
		localStorage.setItem('gardensuite_analytics_consent', value);
		if (value === 'accepted') loadAnalytics();
	}

	onMount(() => {
		if (!measurementId) return;
		const saved = localStorage.getItem('gardensuite_analytics_consent');
		preference = saved === 'accepted' || saved === 'declined' ? saved : null;
		if (preference === 'accepted') loadAnalytics();

		const clickHandler = (event: MouseEvent) => {
			const target = event.target instanceof Element ? event.target.closest('a,button') : null;
			if (!target) return;
			const href = target instanceof HTMLAnchorElement ? target.href : '';
			if (href.includes('wa.me/')) trackEvent('whatsapp_click', { page_path: location.pathname });
			else if (href.startsWith('mailto:'))
				trackEvent('email_click', { page_path: location.pathname });
			else if (href.includes('#contact'))
				trackEvent('contact_cta_click', { page_path: location.pathname });
		};
		document.addEventListener('click', clickHandler);
		return () => document.removeEventListener('click', clickHandler);
	});
</script>

{#if measurementId && preference === null}
	<div
		class="fixed right-4 bottom-4 left-4 z-[100] border border-[#D4D4D8] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.10)] sm:right-6 sm:left-auto sm:max-w-[440px]"
		role="dialog"
		aria-label="Analytics choice"
	>
		<p class="text-[15px] font-semibold text-[#111111]">Website analytics</p>
		<p class="mt-2 text-[13px] leading-[1.6] text-[#52525B]">
			Allow anonymous analytics so Sarbani Associates can measure page visits and enquiry clicks.
			<a href="/privacy" class="underline hover:text-[#1B5E3B]">Privacy details</a>.
		</p>
		<div class="mt-4 flex gap-3">
			<button
				type="button"
				onclick={() => setPreference('accepted')}
				class="bg-[#1B5E3B] px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-[#174E32]"
			>
				Allow analytics
			</button>
			<button
				type="button"
				onclick={() => setPreference('declined')}
				class="border border-[#D4D4D8] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#111111] hover:bg-[#F4F4F5]"
			>
				Not now
			</button>
		</div>
	</div>
{/if}
