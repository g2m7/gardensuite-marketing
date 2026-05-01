<script lang="ts">
	import { onMount } from 'svelte';

	// ─── GSAP + ScrollTrigger ───
	let ready = $state(false);

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		const { default: Lenis } = await import('lenis');
		gsap.registerPlugin(ScrollTrigger);

		// Respect reduced motion
		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReduced) {
			ready = true;
			return;
		}

		// ── Lenis smooth scroll ──
		const lenis = new Lenis({
			lerp: 0.06,
			wheelMultiplier: 0.9,
			touchMultiplier: 1.6
		});

		lenis.on('scroll', ScrollTrigger.update);
		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});
		gsap.ticker.lagSmoothing(0);

		const scrubCfg = { trigger: '.hero-parallax', start: 'top top', end: 'bottom top', scrub: 1.5 };
		const aggEase = 'power4.inOut';

		// ── Hero entrance ──
		const heroSection = document.querySelector('.hero-parallax');
		if (heroSection) {
			const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
			heroTl
				.from('.hero-h1', { opacity: 0, y: 50, duration: 0.9, delay: 0.2 })
				.from('.hero-sub', { opacity: 0, y: 30, duration: 0.7 }, '-=0.5')
				.from('.hero-cta', { opacity: 0, y: 24, duration: 0.6 }, '-=0.4');

			gsap.from('.hero-mockup-inner', {
				y: 60,
				scale: 0.97,
				opacity: 0,
				duration: 1.2,
				delay: 0.6,
				ease: 'power2.out'
			});

			gsap.to('.hero-text-content', {
				y: -98,
				ease: aggEase,
				scrollTrigger: { ...scrubCfg }
			});

			gsap.to('.hero-mockup', {
				y: -150,
				ease: 'power1.inOut',
				scrollTrigger: { ...scrubCfg }
			});

			gsap.to('.hero-fg-group', {
				y: -35,
				ease: aggEase,
				scrollTrigger: { ...scrubCfg }
			});

			gsap.to('.hero-bg-landscape', {
				y: 30,
				ease: aggEase,
				scrollTrigger: { ...scrubCfg }
			});

			gsap.to('.hero-bottom-cover', {
				height: 65,
				ease: aggEase,
				scrollTrigger: { ...scrubCfg }
			});
		}

		// ── Scroll-triggered entrance for sections ──
		const revealEls = document.querySelectorAll('.reveal-on-scroll');
		revealEls.forEach((el) => {
			const obs = new IntersectionObserver(
				(entries) => {
					entries.forEach((e) => {
						if (e.isIntersecting) {
							e.target.classList.add('is-visible');
							obs.unobserve(e.target);
						}
					});
				},
				{ threshold: 0.15 }
			);
			obs.observe(el);
		});

		ready = true;
	});

	// ─── FAQ Accordion ───
	let openFaq = $state<number | null>(null);
	function toggleFaq(i: number) {
		openFaq = openFaq === i ? null : i;
	}
	const demoHref = 'mailto:contact@gardensuite.in?subject=GardenSuite%20Demo%20Request';

	const faqs = [
		{
			q: 'Does it work without internet?',
			a: 'Yes. Attendance, weighing, payroll, stores, and factory work offline at the garden. Data syncs when the internet returns.'
		},
		{
			q: 'How long does setup take?',
			a: 'Usually 1-2 days at your garden. Sarbani Associates handles setup and staff training.'
		},
		{
			q: 'Which regions do you cover?',
			a: 'Assam, Dooars, Terai, Darjeeling, Coochbehar, Uttar Dinajpur, Jalpaiguri.'
		},
		{
			q: 'Can you share client estate names?',
			a: 'Many tea estates prefer to keep internal software private. We respect client confidentiality and share region-level experience during demos.'
		},
		{
			q: 'Can I see the daily report from outside the garden?',
			a: 'Yes. Open it on your phone, tablet, or laptop and check daily numbers from anywhere.'
		},
		{
			q: 'What does it cost?',
			a: 'Cost depends on your garden size and selected modules. We explain pricing clearly after understanding your requirement. Demo, setup, and training are free.'
		}
	];

	const products = [
		{
			title: 'Face Attendance & Smart Weighing',
			desc: 'Worker identity verified by face scan. Wireless scale sends weight directly to the linked worker record. Works offline.',
			href: '/products/attendance',
			badge: 'Attendance',
			icon: 'face',
			featured: true
		},
		{
			title: 'Automated Payroll',
			desc: 'Wages, PF, ESI, bonus, and deductions calculated from real attendance and weight data. Ready in minutes.',
			href: '/products/payroll',
			badge: 'Payroll',
			icon: 'payroll',
			featured: false
		},
		{
			title: 'Factory Accounts',
			desc: 'Track tea production from green leaf to made tea. Know exact factory cost per kg.',
			href: '/products/factory',
			badge: 'Factory',
			icon: 'factory',
			featured: false
		},
		{
			title: 'Store Management',
			desc: 'Track purchase, issue, and stock balance in one place. Know section-wise usage without chasing registers.',
			href: '/products/stores',
			badge: 'Stores',
			icon: 'stores',
			featured: false
		},
		{
			title: 'Daily MIS Report',
			desc: 'Plucking, production, labour, and factory numbers on your phone, tablet, or laptop from anywhere.',
			href: '/products/mis',
			badge: 'Daily Report',
			icon: 'mis',
			featured: false
		}
	];
</script>

<svelte:head>
	<title>GardenSuite - Tea Garden Software That Stops Paper Chaos</title>
	<meta
		name="description"
		content="Run attendance, leaf weights, payroll, factory, and daily reports from one simple tea garden system. Works offline."
	/>
</svelte:head>

<div class="flex min-h-screen w-full flex-col overflow-clip bg-[#FAFAF7] antialiased">
	<main id="main-content">
		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- HERO (unchanged)                                           -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="hero-parallax relative w-full" aria-label="Hero">
			<img
				src="/hero-sky.png"
				alt=""
				class="hero-sky-ext pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-top opacity-80 brightness-[1.4] saturate-[0.6]"
				width="1920"
				height="1080"
			/>

			<div
				class="hero-text-content relative z-20 flex flex-col items-center px-6 pt-32 md:pt-36 lg:pt-40"
			>
				<h1
					class="hero-h1 mx-auto max-w-5xl text-center text-[3rem] leading-[0.9] font-medium tracking-[-0.05em] text-[#111111] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem]"
				>
					Run your tea garden.<br />Not your paperwork.
				</h1>

				<p
					class="hero-sub mx-auto mt-8 max-w-xl text-center text-lg leading-[1.25] tracking-[-0.01em] text-[#666666] sm:text-2xl"
					style="text-wrap: balance;"
				>
					Stop proxy attendance, catch stolen weights, and finish payroll in hours - not days. One system for your whole tea estate.
				</p>

				<div
					class="hero-cta mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
				>
					<a
						href={demoHref}
						class="flex w-full items-center justify-center gap-2 rounded-full bg-[#1B5E3B] px-6 py-4 shadow-[0_4px_20px_rgba(27,94,59,0.25)] transition duration-150 hover:bg-[#144723] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.97] sm:w-auto"
					>
						<span class="text-sm font-medium text-white">Book Free Demo</span>
						<svg
							width="14"
							height="14"
							viewBox="0 0 14 14"
							fill="none"
							class="shrink-0"
							aria-hidden="true"
							><path
								d="M5 2.5l4.5 4.5L5 11.5"
								stroke="white"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/></svg
						>
					</a>
					<a
						href="#products"
						class="flex w-full items-center justify-center rounded-full border border-[#E4E4E7] bg-white px-6 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition duration-150 hover:border-[#D4D4D8] hover:bg-[#FAFAF7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.97] sm:w-auto"
					>
						<span class="text-sm font-medium text-[#0A0A0A]">See How It Works</span>
					</a>
				</div>
				<p class="mt-4 text-center text-[14px] font-medium text-[#52525B]">
					Built and supported by Sarbani Associates, serving tea gardens since 2000.
				</p>
			</div>

			<div
				class="hero-visuals relative -mt-6 h-[540px] w-full overflow-visible md:-mt-4 md:h-[720px] lg:h-[840px]"
			>
				<img
					src="/bg.png"
					alt=""
					class="hero-bg-landscape pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover object-top"
					style="mask-image: linear-gradient(to bottom, transparent 0%, black 40%); -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 40%);"
					width="1920"
					height="1080"
				/>

				<div
					class="pointer-events-none absolute top-[30%] left-1/2 z-[1] h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-white/40 blur-[100px]"
				></div>

				<div
					class="hero-mockup absolute top-[20%] left-1/2 z-10 w-[90%] max-w-[1344px] -translate-x-1/2 md:top-[16%]"
				>
					<div
						class="hero-mockup-inner relative overflow-hidden rounded-xl border border-white/40 bg-[#1a1a1a] shadow-[0_30px_100px_rgba(0,0,0,0.18)] md:rounded-2xl"
					>
						<div
							class="flex items-center gap-2 border-b border-white/[0.06] bg-[#1a1a1a] px-4 py-2.5"
						>
							<div class="flex gap-1.5">
								<div class="h-2.5 w-2.5 rounded-full bg-[#FF5F57]"></div>
								<div class="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]"></div>
								<div class="h-2.5 w-2.5 rounded-full bg-[#28C840]"></div>
							</div>
							<div class="flex flex-1 justify-center">
								<div
									class="flex min-w-[240px] items-center gap-1.5 rounded-md bg-white/[0.06] px-3 py-1"
								>
									<svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true"
										><path
											d="M2 6h8M6 2v8"
											stroke="white"
											stroke-opacity="0.3"
											stroke-width="1.2"
											stroke-linecap="round"
										/></svg
									>
									<span class="text-[11px] text-white/30">gardensuite.in/dashboard</span>
								</div>
							</div>
						</div>
						<img
							src="/mis-dashboard.png"
							alt="GardenSuite daily report dashboard"
							class="h-auto w-full object-cover object-top"
							width="1400"
							height="900"
							loading="eager"
							fetchpriority="high"
						/>
					</div>
				</div>

				<div
					class="hero-bottom-cover pointer-events-none absolute inset-x-0 bottom-0 z-[2] bg-white"
					style="height: 0px;"
				></div>

				<div
					class="hero-fg-group pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[90%] md:h-[80%]"
					style="min-height: 400px; padding-bottom: 60px; margin-bottom: -60px;"
				>
					<img
						src="/fg.png"
						alt=""
						class="absolute bottom-[60px] left-1/2 h-full min-w-[120%] -translate-x-1/2 object-cover object-bottom md:min-w-full"
						width="1920"
						height="1080"
					/>
					<img
						src="/cloud-border.png"
						alt=""
						class="hero-cloud-border absolute inset-x-0 bottom-0 z-10 w-full translate-y-[10%] brightness-[1.15] saturate-0"
						width="1920"
						height="400"
					/>
					<div class="absolute inset-x-0 bottom-0 z-[9] h-[60px] bg-white"></div>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- TRUST ROW (compact, above fold)                            -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section
			class="relative z-30 w-full border-b border-[#F0F0F0] bg-white py-5 md:py-6"
			aria-label="Trust indicators"
		>
			<div
				class="mx-auto flex max-w-[1344px] flex-wrap items-center justify-center gap-x-6 gap-y-3 px-6 md:gap-x-10 md:px-12"
			>
				<div class="flex items-center gap-2">
					<span class="text-[20px] font-semibold tracking-[-0.02em] text-[#111111] md:text-[24px]">20+</span>
					<span class="text-[13px] text-[#71717A]">Tea Estates</span>
				</div>
				<div class="hidden h-5 w-px bg-[#E4E4E7] md:block"></div>
				<div class="flex items-center gap-2">
					<span class="text-[20px] font-semibold tracking-[-0.02em] text-[#111111] md:text-[24px]">7</span>
					<span class="text-[13px] text-[#71717A]">Regions</span>
				</div>
				<div class="hidden h-5 w-px bg-[#E4E4E7] md:block"></div>
				<div class="flex items-center gap-2">
					<span class="text-[13px] font-medium text-[#3F3F46]">Since 2000</span>
				</div>
				<div class="hidden h-5 w-px bg-[#E4E4E7] md:block"></div>
				<div class="flex items-center gap-2">
					<div class="h-1.5 w-1.5 rounded-full bg-[#1B5E3B]"></div>
					<span class="text-[13px] font-medium text-[#3F3F46]">Offline at the garden</span>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- PROBLEM STRIP                                              -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section
			class="reveal-on-scroll relative w-full border-b border-[#F0F0F0] bg-white py-20 md:py-28"
			aria-labelledby="problem-heading"
		>
			<div class="mx-auto max-w-[1344px] px-6 md:px-12">
				<div class="mb-12 max-w-[520px]">
					<span
						class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
						>The problem</span
					>
					<h2
						id="problem-heading"
						class="text-[32px] leading-[1.1] font-semibold tracking-[-0.04em] text-[#111111] md:text-[40px]"
						style="text-wrap: balance"
					>
						Running a tea garden on paper is expensive.
					</h2>
				</div>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
					{#each [
						{
							icon: 'register',
							title: 'Registers get lost',
							desc: 'Paper muster rolls, weight chits, and stock registers vanish or arrive late. Decisions wait for data that never comes.'
						},
						{
							icon: 'punch',
							title: 'Proxy attendance costs money',
							desc: 'Proxy attendance and inflated weights can go undetected. You may pay for workers who did not show up and leaf that was never plucked.'
						},
						{
							icon: 'payroll',
							title: 'Payroll takes days',
							desc: 'Manual calculation of hazira, PF, ESI, and bonus across hundreds of workers every month. Errors compound. Disputes follow.'
						}
					] as item}
						<div class="group rounded-2xl border border-[#F0F0F0] bg-white p-6 transition-all duration-200 hover:border-[#E4E4E7] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] md:p-8">
							<div class="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#DC2626]/8">
								{#if item.icon === 'register'}
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
										<path d="M4 4h12v13H4z" stroke="#DC2626" stroke-width="1.5" stroke-linejoin="round" />
										<path d="M8 2v4M12 2v4" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round" />
										<path d="M4 8h12" stroke="#DC2626" stroke-width="1.5" />
										<path d="M7 11h2M11 11h2M7 14h2M11 14h2" stroke="#DC2626" stroke-width="1.2" stroke-linecap="round" />
									</svg>
								{:else if item.icon === 'punch'}
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
										<circle cx="10" cy="7" r="3.5" stroke="#DC2626" stroke-width="1.5" />
										<path d="M3 17c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round" />
										<path d="M15 4l2 2M17 4l-2 2" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round" />
									</svg>
								{:else}
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
										<path d="M3 5h14v11H3z" stroke="#DC2626" stroke-width="1.5" stroke-linejoin="round" />
										<path d="M3 9h14" stroke="#DC2626" stroke-width="1.5" />
										<path d="M7 5V3M13 5V3" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round" />
										<path d="M8 13h4" stroke="#DC2626" stroke-width="1.2" stroke-linecap="round" />
									</svg>
								{/if}
							</div>
							<h3 class="mb-2 text-[17px] font-semibold tracking-[-0.01em] text-[#111111]">{item.title}</h3>
							<p class="text-[14px] leading-[1.6] text-[#52525B]">{item.desc}</p>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- PRODUCT GRID                                               -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section
			id="products"
			class="reveal-on-scroll relative w-full scroll-mt-20 bg-[#FAFAF7] py-24 md:py-32"
			aria-labelledby="products-heading"
		>
			<div class="mx-auto max-w-[1344px] px-6 md:px-12">
				<div class="mb-14 max-w-[560px]">
					<span
						class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
						>The solution</span
					>
					<h2
						id="products-heading"
						class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px] lg:text-[52px]"
						style="text-wrap: balance"
					>
						5 modules. One connected system.
					</h2>
					<p class="mt-5 text-[17px] leading-[1.6] text-[#52525B]">
						Face attendance, leaf weight, payroll, factory, stores, and daily reports stay connected. No repeated entry from paper registers.
					</p>
				</div>

				<!-- Featured card (Attendance) -->
				{#each products as product, i}
					{#if product.featured}
						<a
							href={product.href}
							class="group/product mb-6 block overflow-hidden rounded-2xl border border-[#E4E4E7] bg-white transition-all duration-200 hover:border-[#D4D4D8] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] md:mb-8"
						>
							<div class="grid grid-cols-1 md:grid-cols-2">
								<div class="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] md:aspect-auto md:min-h-[320px]">
									<img
										src="/img/home/face-attendance.png"
										alt="Face attendance and smart weighing feature"
										class="absolute inset-0 h-full w-full object-cover object-center opacity-20 saturate-[0.4] brightness-[1.1] transition-transform duration-300 group-hover/product:scale-[1.02]"
										width="800"
										height="600"
										loading="eager"
									/>
									<div class="absolute top-6 left-6 z-10">
										<span class="rounded-full bg-[#1B5E3B] px-3 py-1 text-[11px] font-semibold tracking-[0.04em] text-white uppercase">
											{product.badge}
										</span>
									</div>
									<!-- Floating overlay card -->
									<div class="absolute bottom-6 left-6 z-10 w-[240px] rounded-xl border border-white/60 bg-white/95 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-md">
										<div class="mb-2 flex items-center gap-2">
											<div class="flex h-6 w-6 items-center justify-center rounded-full bg-[#1B5E3B]/10">
												<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 6.5l2 2 4-4" stroke="#1B5E3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
											</div>
											<span class="text-[12px] font-semibold text-[#1B5E3B]">Face Verified</span>
										</div>
										<div class="flex justify-between border-t border-[#F0F0F0] py-1.5 text-[12px]">
											<span class="text-[#71717A]">Worker</span>
											<span class="font-semibold text-[#111]">Ramesh K.</span>
										</div>
										<div class="flex justify-between border-t border-[#F0F0F0] py-1.5 text-[12px]">
											<span class="text-[#71717A]">Match</span>
											<span class="font-semibold text-[#111]">98.7%</span>
										</div>
										<div class="flex justify-between border-t border-[#F0F0F0] py-1.5 text-[12px]">
											<span class="text-[#71717A]">Section</span>
											<span class="text-[#3F3F46]">Div. 3 - East</span>
										</div>
									</div>
								</div>
								<div class="flex flex-col justify-center p-8 md:p-10">
									<h3 class="text-[22px] font-semibold tracking-[-0.02em] text-[#111111] md:text-[26px]">{product.title}</h3>
									<p class="mt-3 text-[15px] leading-[1.6] text-[#52525B] md:text-[16px]">{product.desc}</p>
									<span class="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#1B5E3B] transition-colors group-hover/product:gap-2.5">
										Learn more
										<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M5 2.5l4.5 4.5L5 11.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
									</span>
								</div>
							</div>
						</a>
					{/if}
				{/each}

				<!-- 2x2 Grid (remaining 4 products) -->
				<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
					{#each products as product}
						{#if !product.featured}
							<a
								href={product.href}
								class="group/product flex flex-col overflow-hidden rounded-2xl border border-[#E4E4E7] bg-white transition-all duration-200 hover:border-[#D4D4D8] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
							>
								<div class="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7]">
									{#if product.icon === 'payroll'}
										<img
											src="/img/home/payroll.png"
											alt="Automated payroll feature"
											class="absolute inset-0 h-full w-full object-cover object-center opacity-20 saturate-[0.4] brightness-[1.1] transition-transform duration-300 group-hover/product:scale-[1.02]"
											width="800"
											height="600"
											loading="lazy"
										/>
										<!-- Payroll overlay -->
										<div class="absolute right-6 bottom-6 z-10 w-[200px] rounded-xl border border-white/60 bg-white/95 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-md">
											<div class="mb-2 text-[12px] font-semibold tracking-[0.04em] text-[#71717A] uppercase">Month Summary</div>
											<div class="flex justify-between border-t border-[#F0F0F0] py-1.5 text-[12px]">
												<span class="text-[#71717A]">Gross wages</span>
												<span class="text-[#3F3F46]">&#8377;2,48,500</span>
											</div>
											<div class="flex justify-between border-t border-[#F0F0F0] py-1.5 text-[12px]">
												<span class="text-[#71717A]">PF deducted</span>
												<span class="text-[#3F3F46]">&#8377;29,820</span>
											</div>
											<div class="flex justify-between border-t border-[#F0F0F0] py-1.5 text-[12px]">
												<span class="text-[#71717A]">Net payable</span>
												<span class="font-semibold text-[#111]">&#8377;2,14,207</span>
											</div>
										</div>
									{:else if product.icon === 'factory'}
										<div class="absolute inset-0 h-full w-full bg-[#1B5E3B]/5 transition-transform duration-300 group-hover/product:scale-[1.02]"></div>
										<div class="absolute right-5 bottom-5 left-5 z-10 rounded-xl border border-white/60 bg-white/95 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-md">
											<div class="mb-2 text-[11px] font-semibold tracking-[0.06em] text-[#1B5E3B] uppercase">Cost Per Kg</div>
											{#each [{ label: 'Green leaf', value: '₹32.50' }, { label: 'Manufacturing', value: '₹12.80' }, { label: 'Power & fuel', value: '₹5.40' }] as row}
												<div class="flex items-center justify-between border-t border-[#F0F0F0] py-1 text-[12px]">
													<span class="text-[#71717A]">{row.label}</span>
													<span class="font-semibold tabular-nums text-[#3F3F46]" style="font-variant-numeric: tabular-nums">{row.value}</span>
												</div>
											{/each}
											<div class="flex items-center justify-between border-t-2 border-[#E4E4E7] pt-1.5 text-[12px]">
												<span class="font-semibold text-[#111]">Total</span>
												<span class="font-bold tabular-nums text-[#1B5E3B]" style="font-variant-numeric: tabular-nums">₹62.00</span>
											</div>
										</div>
									{:else if product.icon === 'stores'}
										<div class="absolute inset-0 h-full w-full bg-[#1B5E3B]/5 transition-transform duration-300 group-hover/product:scale-[1.02]"></div>
										<div class="absolute right-5 bottom-5 left-5 z-10 rounded-xl border border-white/60 bg-white/95 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-md">
											<div class="mb-2 text-[11px] font-semibold tracking-[0.06em] text-[#1B5E3B] uppercase">Stock Levels</div>
											{#each [{ label: 'NPK Fertilizer', value: '2,450 kg', ok: true }, { label: 'Diesel', value: '1,200 L', ok: true }, { label: 'Pruning Shears', value: '18 pcs', ok: false }] as row}
												<div class="flex items-center justify-between border-t border-[#F0F0F0] py-1 text-[12px]">
													<div class="flex items-center gap-1.5">
														<div class="h-1.5 w-1.5 rounded-full {row.ok ? 'bg-[#1B5E3B]' : 'bg-[#D97706]'}"></div>
														<span class="text-[#71717A]">{row.label}</span>
													</div>
													<span class="font-semibold tabular-nums text-[#3F3F46]" style="font-variant-numeric: tabular-nums">{row.value}</span>
												</div>
											{/each}
										</div>
									{:else}
										<img
											src="/mis-dashboard.png"
											alt="Daily MIS report feature"
											class="absolute inset-0 h-full w-full object-cover object-center opacity-20 saturate-[0.4] brightness-[1.1] transition-transform duration-300 group-hover/product:scale-[1.02]"
											width="800"
											height="600"
											loading="lazy"
										/>
										<!-- Dashboard overlay -->
										<div class="absolute right-6 top-6 z-10 rounded-xl border border-[#FDE68A] bg-[#FEF9C3]/95 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-sm">
											<div class="mb-2 flex items-center justify-between gap-6">
												<span class="text-[13px] font-semibold text-[#92400E]">Today's Numbers</span>
												<span class="text-[11px] font-medium text-[#B45309]">Live</span>
											</div>
											{#each [{ label: 'Green leaf', value: '12,450 kg' }, { label: 'Made tea', value: '2,890 kg' }, { label: 'Workers', value: '342' }] as stat}
												<div class="flex items-center justify-between gap-8 py-1 text-[12px]">
													<span class="text-[#92400E]/70">{stat.label}</span>
													<span class="font-semibold text-[#78350F]" style="font-variant-numeric: tabular-nums">{stat.value}</span>
												</div>
											{/each}
										</div>
									{/if}
									<div class="absolute top-5 left-5 z-10">
										<span class="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-[0.04em] text-[#1B5E3B] uppercase shadow-sm backdrop-blur-sm">
											{product.badge}
										</span>
									</div>
								</div>
								<div class="flex flex-1 flex-col p-6 md:p-7">
									<h3 class="text-[17px] font-semibold tracking-[-0.01em] text-[#111111]">{product.title}</h3>
									<p class="mt-2 flex-1 text-[14px] leading-[1.6] text-[#52525B]">{product.desc}</p>
									<span class="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#1B5E3B] transition-colors group-hover/product:gap-2.5">
										Learn more
										<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M5 2.5l4.5 4.5L5 11.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
									</span>
								</div>
							</a>
						{/if}
					{/each}
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- BEFORE / AFTER COMPARISON                                  -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section
			class="reveal-on-scroll relative w-full bg-white py-20 md:py-28"
			aria-labelledby="compare-heading"
		>
			<div class="mx-auto max-w-[900px] px-6 md:px-12">
				<div class="mb-10 text-center">
					<h2
						id="compare-heading"
						class="text-[32px] leading-[1.1] font-semibold tracking-[-0.04em] text-[#111111] md:text-[40px]"
						style="text-wrap: balance"
					>
						Paper way vs GardenSuite way
					</h2>
				</div>
				<div class="overflow-hidden rounded-2xl border border-[#E4E4E7]">
					<div class="grid grid-cols-2">
						<div class="border-r border-[#E4E4E7] bg-[#FEF2F2] px-5 py-3 text-center text-[13px] font-semibold tracking-[0.04em] text-[#991B1B] uppercase">Paper Way</div>
						<div class="bg-[#F0FDF4] px-5 py-3 text-center text-[13px] font-semibold tracking-[0.04em] text-[#166534] uppercase">GardenSuite Way</div>
					</div>
					{#each [
						{ paper: 'Muster rolls and paper chits', gs: 'Face scan and smart scale' },
						{ paper: 'Hand-calculated wages', gs: 'Auto-calculated payroll' },
						{ paper: 'Factory cost in ledgers', gs: 'Connected production data' },
						{ paper: 'Stock guesswork', gs: 'Live store balances' },
						{ paper: 'Phone-call reporting', gs: 'Cloud daily report on any device' }
					] as row}
						<div class="grid grid-cols-2 border-t border-[#F0F0F0]">
							<div class="flex items-center gap-2.5 border-r border-[#F0F0F0] px-5 py-3.5">
								<svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="shrink-0" aria-hidden="true"><path d="M3.5 10.5l7-7M10.5 10.5l-7-7" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round"/></svg>
								<span class="text-[14px] text-[#52525B]">{row.paper}</span>
							</div>
							<div class="flex items-center gap-2.5 px-5 py-3.5">
								<svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="shrink-0" aria-hidden="true"><path d="M3 7.5l2.5 2.5L11 4" stroke="#1B5E3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
								<span class="text-[14px] font-medium text-[#111111]">{row.gs}</span>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- CONFIDENTIAL PROOF                                          -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="reveal-on-scroll relative w-full bg-[#FAFAF7] py-20 md:py-24" aria-labelledby="confidential-proof-heading">
			<div class="mx-auto max-w-[1344px] px-6 md:px-12">
				<div class="mb-10 max-w-[820px]">
					<span class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">
						Trusted across regions
					</span>
					<h2
						id="confidential-proof-heading"
						class="text-[32px] leading-[1.12] font-semibold tracking-[-0.03em] text-[#111111] md:text-[40px]"
						style="text-wrap: balance"
					>
						Trusted across tea-growing regions, with client privacy respected.
					</h2>
					<p class="mt-4 text-[16px] leading-[1.65] text-[#52525B]">
						GardenSuite is used across Assam, Dooars, Terai, Darjeeling, Coochbehar, Uttar Dinajpur, and Jalpaiguri. Many estates prefer to keep internal software private, so we share region-level experience instead of public client names.
					</p>
				</div>

				<div class="grid grid-cols-1 gap-5 md:grid-cols-3">
					<div class="rounded-2xl border border-[#E4E4E7] bg-white p-6">
						<div class="text-[11px] font-semibold tracking-[0.06em] text-[#1B5E3B] uppercase">Dooars estate</div>
						<p class="mt-2 text-[14px] leading-[1.6] text-[#52525B]">Face attendance and payroll for large worker teams, with offline daily operations.</p>
					</div>
					<div class="rounded-2xl border border-[#E4E4E7] bg-white p-6">
						<div class="text-[11px] font-semibold tracking-[0.06em] text-[#1B5E3B] uppercase">Terai estate</div>
						<p class="mt-2 text-[14px] leading-[1.6] text-[#52525B]">Smart weighing linked to worker identity, with daily MIS visibility for management.</p>
					</div>
					<div class="rounded-2xl border border-[#E4E4E7] bg-white p-6">
						<div class="text-[11px] font-semibold tracking-[0.06em] text-[#1B5E3B] uppercase">Assam estate</div>
						<p class="mt-2 text-[14px] leading-[1.6] text-[#52525B]">Payroll, factory, and store records connected in one system for faster monthly closing.</p>
					</div>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- DIFFERENTIATOR (Tailark features/four style)               -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section
			id="about"
			class="reveal-on-scroll relative w-full scroll-mt-20 bg-white py-24 md:py-32"
			aria-labelledby="trust-heading"
		>
			<div class="mx-auto max-w-[1344px] px-6 md:px-12">
				<!-- Top: Sarbani trust band -->
				<div class="mb-16 grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
					<div>
						<span
							class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
							>Why trust Sarbani Associates</span
						>
						<h2
							id="trust-heading"
							class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px] lg:text-[52px]"
							style="text-wrap: balance"
						>
							Local team. On-site setup. 25+ years.
						</h2>
						<p class="mt-5 max-w-[480px] text-[17px] leading-[1.6] text-[#52525B]">
							GardenSuite is not a generic ERP (office software). It is purpose-built for tea garden operations. Sarbani Associates visits your garden, sets up the system, trains your staff, and stays until you are confident.
						</p>
						<!-- Sarbani timeline -->
						<div class="mt-8 flex flex-col gap-3">
							{#each [
								{ year: '2000', event: 'GardenSuite v1 launched' },
								{ year: '2018', event: 'Face attendance app introduced' },
								{ year: '2026', event: 'v3 with cloud daily report' }
							] as milestone}
								<div class="flex items-center gap-3">
									<span class="shrink-0 rounded-md bg-[#1B5E3B]/10 px-2 py-0.5 text-[12px] font-semibold tabular-nums text-[#1B5E3B]" style="font-variant-numeric: tabular-nums">{milestone.year}</span>
									<span class="text-[14px] text-[#52525B]">{milestone.event}</span>
								</div>
							{/each}
							<p class="mt-2 text-[13px] text-[#71717A]">Based in Bagdogra, Siliguri - in your region.</p>
						</div>
					</div>
					<div class="relative">
						<div class="overflow-hidden rounded-2xl border border-[#E4E4E7] bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7]">
							<img
								src="/mis-dashboard.png"
								alt="GardenSuite dashboard showing daily garden operations"
								class="h-auto w-full object-cover object-top"
								width="800"
								height="500"
								loading="lazy"
							/>
						</div>
						<div class="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[#1B5E3B]/5 blur-[60px]"></div>
					</div>
				</div>

				<!-- Bottom: 3 mini-feature cards (Tailark style) -->
				<div class="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
					{#each [
						{
							title: 'Knows tea garden rules',
							desc: 'Hazira, tikka, doubling, plucking rates, PF, ESI - not generic payroll. Built for how your garden already runs.',
							icon: 'workflow'
						},
						{
							title: 'All 5 modules connected',
							desc: 'Face data flows to payroll. Leaf weight flows to factory. Store issues flow to cost reports. No re-entry.',
							icon: 'offline'
						},
						{
							title: 'On-site setup and training',
							desc: 'We visit your garden, install the system, train your staff in person, and stay on call for support.',
							icon: 'support'
						}
					] as item}
						<div class="rounded-2xl border border-[#E4E4E7] bg-white p-6 transition-all duration-200 hover:border-[#D4D4D8] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] md:p-8">
							<div
								class="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1B5E3B]/8"
							>
								{#if item.icon === 'workflow'}
									<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
										<path d="M3 7h4v4H3zM15 7h4v4h-4z" stroke="#1B5E3B" stroke-width="1.5" stroke-linejoin="round" />
										<path d="M7 9h8M11 7v4" stroke="#1B5E3B" stroke-width="1.5" stroke-linecap="round" />
										<path d="M3 17h16" stroke="#1B5E3B" stroke-width="1.5" stroke-linecap="round" />
									</svg>
								{:else if item.icon === 'offline'}
									<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
										<path d="M5 11l3 3 8-8" stroke="#1B5E3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
										<path d="M2 11a9 9 0 0118 0" stroke="#1B5E3B" stroke-width="1.5" stroke-linecap="round" />
										<path d="M5 15a7 7 0 0112 0" stroke="#1B5E3B" stroke-width="1.5" stroke-linecap="round" opacity="0.4" />
									</svg>
								{:else}
									<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
										<path d="M11 3v4M11 15v4M3 11h4M15 11h4" stroke="#1B5E3B" stroke-width="1.5" stroke-linecap="round" />
										<circle cx="11" cy="11" r="3" stroke="#1B5E3B" stroke-width="1.5" />
									</svg>
								{/if}
							</div>
							<h3 class="text-[17px] leading-[1.35] font-semibold text-[#111111]">{item.title}</h3>
							<p class="mt-2 text-[14px] leading-[1.6] text-[#52525B]">{item.desc}</p>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- FAQ                                                        -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="reveal-on-scroll relative w-full bg-[#FAFAF7] py-24 md:py-32" aria-labelledby="faq-heading">
			<div class="mx-auto flex max-w-[680px] flex-col items-center gap-12 px-6 md:px-12">
				<h2
					id="faq-heading"
					class="scroll-mt-20 text-center text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px]"
					style="text-wrap: balance"
				>
					Common questions
				</h2>

				<div class="flex w-full flex-col">
					{#each faqs as faq, i}
						<div class="border-b border-[#F0F0F0] last:border-b-0">
							<button
								class="group flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30"
								onclick={() => toggleFaq(i)}
								aria-expanded={openFaq === i}
							>
								<h3
									class="text-[17px] leading-[1.4] font-semibold text-[#111111] transition-colors duration-150 group-hover:text-[#1B5E3B] md:text-[18px]"
								>
									{faq.q}
								</h3>
								<svg
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none"
									class="shrink-0 text-[#A1A1AA] transition-transform duration-300 {openFaq === i
										? 'rotate-45'
										: ''}"
									aria-hidden="true"
									><path
										d="M10 4v12M4 10h12"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
									/></svg
								>
							</button>
							<div
								class="overflow-hidden transition-all duration-300 ease-out"
								style="max-height: {openFaq === i ? '160px' : '0px'}; opacity: {openFaq === i
									? '1'
									: '0'}"
							>
								<p class="pb-6 text-[16px] leading-[1.6] text-[#52525B]">{faq.a}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- CTA                                                        -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section
			id="contact"
			class="reveal-on-scroll relative w-full scroll-mt-20 bg-white px-6 py-24 md:px-12 md:py-32"
			aria-labelledby="cta-heading"
		>
			<div class="mx-auto flex max-w-[640px] flex-col items-center text-center">
				<h2
					id="cta-heading"
					class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px] lg:text-[52px]"
					style="text-wrap: balance"
				>
					See GardenSuite with your own garden data.
				</h2>
				<p class="mt-6 max-w-[480px] text-[17px] leading-[1.6] text-[#52525B]">
					We will show how attendance, leaf weight, payroll, factory, stores, and daily reports work together at your garden. Demo, on-site setup, and training are free.
				</p>
				<!-- Buyer-role microcopy -->
				<div class="mt-6 flex flex-col gap-1.5">
					<p class="text-[14px] text-[#52525B]"><span class="font-semibold text-[#111111]">Owner:</span> Check daily numbers from anywhere</p>
					<p class="text-[14px] text-[#52525B]"><span class="font-semibold text-[#111111]">Manager:</span> Control attendance and output</p>
					<p class="text-[14px] text-[#52525B]"><span class="font-semibold text-[#111111]">Office staff:</span> Finish payroll faster</p>
				</div>
				<div class="mt-10 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
					<a
						href={demoHref}
						class="flex items-center justify-center rounded-full bg-[#1B5E3B] px-8 py-3.5 shadow-[0_2px_12px_rgba(27,94,59,0.2)] transition duration-150 hover:bg-[#144723] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.97]"
					>
						<span class="text-[15px] leading-none font-semibold text-white">Book Free Demo</span>
					</a>
					<a
						href="mailto:contact@gardensuite.in"
						class="flex items-center justify-center rounded-full border border-[#E4E4E7] bg-white px-8 py-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition duration-150 hover:border-[#D4D4D8] hover:bg-[#FAFAF7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.97]"
					>
						<span class="text-[15px] leading-none font-semibold text-[#111111]">Email Us</span>
					</a>
				</div>
				<p class="mt-4 text-[13px] text-[#71717A]">Reply within 1 working day. Demo scheduling call by the Sarbani team.</p>
			</div>
		</section>
	</main>
</div>

<style>
	:global(.reveal-on-scroll) {
		opacity: 0;
		transform: translateY(24px);
		transition: opacity 0.7s ease-out, transform 0.7s ease-out;
	}
	:global(.reveal-on-scroll.is-visible) {
		opacity: 1;
		transform: translateY(0);
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.reveal-on-scroll) {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
</style>
