<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		kicker,
		title,
		intro,
		updated,
		children
	}: { kicker: string; title: string; intro: string; updated: string; children: Snippet } = $props();
</script>

<main class="min-h-screen bg-white pt-28 text-[#111111]">
	<div class="mx-auto max-w-[960px] px-6 py-12 md:px-12 md:py-16">
		<nav aria-label="Breadcrumb" class="text-[13px] text-[#71717A]">
			<a href="/" class="underline hover:text-[#1B5E3B]">Home</a>
			<span aria-hidden="true"> / </span>
			<span>{kicker}</span>
		</nav>
		<p class="mt-12 text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">{kicker}</p>
		<h1 class="mt-4 max-w-[760px] text-[42px] leading-[1.04] font-semibold tracking-[-0.04em] md:text-[56px]">{title}</h1>
		<p class="mt-6 max-w-[760px] text-[18px] leading-[1.65] text-[#52525B]">{intro}</p>
		<p class="mt-4 text-[13px] text-[#71717A]">Last updated: {updated}</p>

		<article class="legal-copy mt-14 border-t border-[#E4E4E7] pt-10">
			{@render children()}
		</article>

		<section class="mt-16 border border-[#D7DED3] bg-[#F4F7F2] p-6 md:p-8" aria-labelledby="legal-contact-heading">
			<p class="text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">Contact</p>
			<h2 id="legal-contact-heading" class="mt-3 text-[28px] font-semibold tracking-[-0.04em]">Ask Sarbani Associates</h2>
			<p class="mt-3 text-[15px] leading-[1.6] text-[#52525B]">GardenSuite is built and supported by Sarbani Associates, Bagdogra, Siliguri.</p>
			<div class="mt-6 flex flex-wrap gap-3">
				<a href="/#contact" class="bg-[#1B5E3B] px-5 py-3 text-[14px] font-semibold text-white hover:bg-[#174E32]">Book Free Demo</a>
				<a href="mailto:sarbaniassociates@gmail.com" class="border border-[#B8C2B4] bg-white px-5 py-3 text-[14px] font-semibold text-[#111111] hover:bg-[#F4F4F5]">Email Us</a>
			</div>
		</section>
	</div>
</main>

<style>
	:global(.legal-copy h2) {
		margin-top: 2.5rem;
		font-size: 1.6rem;
		font-weight: 600;
		letter-spacing: -0.03em;
	}
	:global(.legal-copy h2:first-child) {
		margin-top: 0;
	}
	:global(.legal-copy p),
	:global(.legal-copy li) {
		margin-top: 0.8rem;
		font-size: 0.95rem;
		line-height: 1.7;
		color: #52525b;
	}
	:global(.legal-copy ul) {
		margin-top: 0.75rem;
		padding-left: 1.25rem;
		list-style: disc;
	}
	:global(.legal-copy a) {
		color: #1b5e3b;
		text-decoration: underline;
	}
</style>
