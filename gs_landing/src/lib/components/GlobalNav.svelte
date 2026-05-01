<script lang="ts">
	import GsLogoAnimation from '$lib/components/GsLogoAnimation.svelte';

	let { scrollAnimated = true } = $props();

	let mobileNavOpen = $state(false);
	let productsOpen = $state(false);
	let mobileProductsOpen = $state(false);

	const demoHref = 'mailto:contact@gardensuite.in?subject=GardenSuite%20Demo%20Request';

	function toggleMobileNav() {
		mobileNavOpen = !mobileNavOpen;
		if (!mobileNavOpen) mobileProductsOpen = false;
		document.body.style.overflow = mobileNavOpen ? 'hidden' : '';
	}

	function toggleProducts() {
		productsOpen = !productsOpen;
	}

	function closeProducts() {
		productsOpen = false;
	}

	function handleProductsKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') closeProducts();
	}

	function handleClickOutside(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (!target.closest('.products-dropdown-container')) {
			closeProducts();
		}
	}

	let navProgress = $state(0);

	$effect(() => {
		const handler = () => {
			let p = window.scrollY / 100;
			if (p < 0) p = 0;
			if (p > 1) p = 1;
			navProgress = p;
		};

		window.addEventListener('scroll', handler, { passive: true });
		handler();

		return () => {
			window.removeEventListener('scroll', handler);
		};
	});

	let navStyles = $derived(`
		background-color: rgba(255, 255, 255, ${scrollAnimated ? navProgress : 0.8});
		backdrop-filter: blur(${scrollAnimated ? navProgress * 24 : 12}px);
		-webkit-backdrop-filter: blur(${scrollAnimated ? navProgress * 24 : 12}px);
		border-bottom: 1px solid rgba(0, 0, 0, ${scrollAnimated ? navProgress * 0.05 : 0.05});
	`);
</script>

<div role="presentation" onclick={handleClickOutside} onkeydown={handleProductsKeydown}>
	<!-- Skip Link -->
	<a
		href="#main-content"
		class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-[#1B5E3B] focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
	>
		Skip to main content
	</a>

	<!-- Desktop Nav -->
	<nav
		class="{scrollAnimated ? 'fixed' : 'sticky'} top-0 z-[60] flex w-full items-center justify-between px-6 py-4 transition-colors md:px-14"
		style={navStyles}
		aria-label="Main navigation"
	>
		<a href="/" class="flex items-center gap-2" aria-label="GardenSuite Home">
			<GsLogoAnimation class="h-7 w-auto shrink-0" />
			<span
				class="text-[18px] leading-[22px] font-medium tracking-[-0.01em] text-[#0A0A0A]"
			>
				GardenSuite
			</span>
		</a>
		{@render desktopLinks()}
		{@render desktopCta()}
		{@render mobileHamburger()}
	</nav>

	<!-- Mobile Nav Sheet -->
	{#if mobileNavOpen}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="fixed inset-0 z-[55] bg-black/20 backdrop-blur-sm md:hidden"
			onclick={toggleMobileNav}
		></div>
		<div
			class="fixed inset-x-0 top-0 z-[58] flex flex-col bg-white/95 px-6 pt-20 pb-8 shadow-[0_20px_60px_rgba(0,0,0,0.1)] backdrop-blur-xl md:hidden"
			style="overscroll-behavior: contain;"
		>
			<nav class="flex flex-col gap-1" aria-label="Mobile navigation">
				<button
					class="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[16px] font-semibold text-[#18181B] transition-colors hover:bg-[#FAFAF7]"
					onclick={() => (mobileProductsOpen = !mobileProductsOpen)}
					aria-expanded={mobileProductsOpen}
				>
					Products
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						class="transition-transform duration-200 {mobileProductsOpen
							? 'rotate-180'
							: ''}"
						aria-hidden="true"
						><path
							d="M4 6l4 4 4-4"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/></svg
					>
				</button>
				{#if mobileProductsOpen}
					<div class="flex flex-col gap-0.5 pb-2 pl-4">
						<a
							href="/products/attendance"
							class="rounded-lg px-4 py-2.5 text-[14px] font-medium text-[#52525B] transition-colors hover:bg-[#FAFAF7] hover:text-[#1A5C2E]"
							onclick={toggleMobileNav}>Face Attendance &amp; Smart Weighing</a
						>
						<a
							href="/products/payroll"
							class="rounded-lg px-4 py-2.5 text-[14px] font-medium text-[#52525B] transition-colors hover:bg-[#FAFAF7] hover:text-[#1A5C2E]"
							onclick={toggleMobileNav}>Automated Payroll</a
						>
						<a
							href="/products/factory"
							class="rounded-lg px-4 py-2.5 text-[14px] font-medium text-[#52525B] transition-colors hover:bg-[#FAFAF7] hover:text-[#1A5C2E]"
							onclick={toggleMobileNav}>Factory Accounts</a
						>
						<a
							href="/products/stores"
							class="rounded-lg px-4 py-2.5 text-[14px] font-medium text-[#52525B] transition-colors hover:bg-[#FAFAF7] hover:text-[#1A5C2E]"
							onclick={toggleMobileNav}>Store Management</a
						>
						<a
							href="/products/mis"
							class="rounded-lg px-4 py-2.5 text-[14px] font-medium text-[#52525B] transition-colors hover:bg-[#FAFAF7] hover:text-[#1A5C2E]"
							onclick={toggleMobileNav}>Daily Report</a
						>
					</div>
				{/if}
				<a
					href="/#features"
					class="rounded-xl px-4 py-3 text-[16px] font-semibold text-[#18181B] transition-colors hover:bg-[#FAFAF7]"
					onclick={toggleMobileNav}>Features</a
				>
				<a
					href="/#about"
					class="rounded-xl px-4 py-3 text-[16px] font-semibold text-[#18181B] transition-colors hover:bg-[#FAFAF7]"
					onclick={toggleMobileNav}>About</a
				>
				<a
					href="/#contact"
					class="rounded-xl px-4 py-3 text-[16px] font-semibold text-[#18181B] transition-colors hover:bg-[#FAFAF7]"
					onclick={toggleMobileNav}>Contact</a
				>
			</nav>
			<a
				href={demoHref}
				class="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-[#1B5E3B] shadow-[0_4px_20px_rgba(27,94,59,0.25)] transition hover:bg-[#144723] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.97]"
				onclick={toggleMobileNav}
			>
				<span class="text-[15px] leading-none font-semibold text-white"
					>Book Free Demo</span
				>
			</a>
		</div>
	{/if}
</div>

{#snippet desktopLinks()}
	<div class="hidden items-center gap-1 md:flex">
		<!-- Products Dropdown -->
		<div role="presentation" class="products-dropdown-container relative" onkeydown={handleProductsKeydown}>
			<button
				class="inline-flex h-10 items-center justify-center rounded-full px-4 text-[14px] font-semibold text-[#18181B] transition-colors duration-150 hover:bg-[#0000000A] hover:text-[#0A0A0A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30"
				aria-label="Products menu"
				aria-expanded={productsOpen}
				aria-haspopup="true"
				onclick={toggleProducts}
			>
				Products
				<svg
					width="12"
					height="12"
					viewBox="0 0 12 12"
					fill="none"
					class="ml-1.5 opacity-60 transition-transform duration-200 {productsOpen
						? 'rotate-180'
						: ''}"
					aria-hidden="true"
					><path
						d="M3 4.5l3 3 3-3"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/></svg
				>
			</button>
			<div
				class="absolute top-full left-1/2 z-50 mt-1 flex w-[620px] origin-top -translate-x-1/2 gap-3 rounded-xl border border-[#0000000F] bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-200 ease-out {productsOpen
					? 'pointer-events-auto visible translate-y-0 scale-100 opacity-100'
					: 'pointer-events-none invisible translate-y-1 scale-[0.97] opacity-0'}"
			>
				<div
					class="flex w-1/3 flex-col justify-between rounded-lg bg-gradient-to-b from-[#F0FDF4] to-[#DCFCE7] p-4"
				>
					<svg
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="#1A5C2E"
						class="mb-2 h-8 w-8"
						aria-hidden="true"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
						/></svg
					>
					<div class="mt-4">
						<span
							class="block text-base leading-tight font-medium text-[#1A5C2E]"
							>GardenSuite<br />V3</span
						>
						<span
							class="mt-1.5 block text-xs leading-relaxed text-[#1A5C2E]/80"
							>One simple system for tea gardens.</span
						>
					</div>
				</div>
				<div class="grid w-2/3 grid-cols-2 gap-1">
					<a
						href="/products/attendance"
						class="group/item col-span-2 block rounded-lg p-3 transition-colors hover:bg-[#FAFAF7]"
						onclick={closeProducts}
						><div
							class="text-[13px] font-medium text-[#18181B] transition-colors group-hover/item:text-[#1A5C2E]"
						>
							Face Attendance &amp; Smart Weighing
						</div>
						<div class="mt-1 text-xs leading-relaxed text-[#71717A]">
							Stop proxy attendance and stolen weights.
						</div></a
					>
					<a
						href="/products/payroll"
						class="group/item block rounded-lg p-3 transition-colors hover:bg-[#FAFAF7]"
						onclick={closeProducts}
						><div
							class="text-[13px] font-medium text-[#18181B] transition-colors group-hover/item:text-[#1A5C2E]"
						>
							Automated Payroll
						</div>
						<div class="mt-1 text-xs leading-relaxed text-[#71717A]">
							Hazira, PF, bonus, and wages auto-ready.
						</div></a
					>
					<a
						href="/products/factory"
						class="group/item block rounded-lg p-3 transition-colors hover:bg-[#FAFAF7]"
						onclick={closeProducts}
						><div
							class="text-[13px] font-medium text-[#18181B] transition-colors group-hover/item:text-[#1A5C2E]"
						>
							Factory Accounts
						</div>
						<div class="mt-1 text-xs leading-relaxed text-[#71717A]">
							Track output and exact factory cost.
						</div></a
					>
					<a
						href="/products/stores"
						class="group/item block rounded-lg p-3 transition-colors hover:bg-[#FAFAF7]"
						onclick={closeProducts}
						><div
							class="text-[13px] font-medium text-[#18181B] transition-colors group-hover/item:text-[#1A5C2E]"
						>
							Store Management
						</div>
						<div class="mt-1 text-xs leading-relaxed text-[#71717A]">
							Know stock without chasing registers.
						</div></a
					>
					<a
						href="/products/mis"
						class="group/item block rounded-lg p-3 transition-colors hover:bg-[#FAFAF7]"
						onclick={closeProducts}
						><div
							class="text-[13px] font-medium text-[#18181B] transition-colors group-hover/item:text-[#1A5C2E]"
						>
							Daily Report
						</div>
						<div class="mt-1 text-xs leading-relaxed text-[#71717A]">
							See daily numbers on any device.
						</div></a
					>
				</div>
			</div>
		</div>
		<a
			href="/#features"
			class="inline-flex h-10 items-center justify-center rounded-full px-4 text-[14px] font-semibold text-[#18181B] transition-colors duration-150 hover:bg-[#0000000A] hover:text-[#0A0A0A]"
			>Features</a
		>
		<a
			href="/#about"
			class="inline-flex h-10 items-center justify-center rounded-full px-4 text-[14px] font-semibold text-[#18181B] transition-colors duration-150 hover:bg-[#0000000A] hover:text-[#0A0A0A]"
			>About</a
		>
	</div>
{/snippet}

{#snippet desktopCta()}
	<div class="flex items-center gap-2">
		<a
			href="/#contact"
			class="mr-4 hidden h-10 items-center rounded-md px-2 text-[14px] font-semibold text-[#18181B] transition-colors hover:text-[#0A0A0A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 md:inline-flex"
			>Contact</a
		>
		<a
			href={demoHref}
			class="hidden h-10 items-center justify-center rounded-full bg-[#1B5E3B] px-6 shadow-[0_2px_8px_rgba(27,94,59,0.25)] transition hover:bg-[#144723] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.97] md:flex"
		>
			<span class="text-[14px] leading-none font-semibold text-white"
				>Book Free Demo</span
			>
		</a>
	</div>
{/snippet}

{#snippet mobileHamburger()}
	<button
		class="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[#0000000A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 md:hidden"
		aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
		aria-expanded={mobileNavOpen}
		onclick={toggleMobileNav}
	>
		{#if mobileNavOpen}
			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				aria-hidden="true"
				><path
					d="M5 5l10 10M15 5L5 15"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
				/></svg
			>
		{:else}
			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				aria-hidden="true"
				><path
					d="M3 6h14M3 10h14M3 14h14"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
				/></svg
			>
		{/if}
	</button>
{/snippet}
