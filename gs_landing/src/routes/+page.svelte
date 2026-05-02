<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

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
			fabVisible = true;
			return;
		}

		// ── FAB: show after scrolling past hero ──
		const heroEl = document.querySelector('.hero-parallax');
		if (heroEl) {
			ScrollTrigger.create({
				trigger: heroEl,
				start: 'bottom 80%',
				onEnter: () => (fabVisible = true),
				onLeaveBack: () => (fabVisible = false)
			});
		} else {
			fabVisible = true;
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

	// ─── Contact Form ───
	const WA_NUMBER = '919734101330';
	let contactPanelOpen = $state(false);
	let fabVisible = $state(false);
	let formNeed = $state('Book a demo');
	let formName = $state('');
	let formPhone = $state('');
	let formEmail = $state('');
	let formGarden = $state('');
	let formMessage = $state('');

	function buildWaLink(): string {
		const lines = [
			"Hi, I'd like to discuss GardenSuite.",
			formNeed ? `Need: ${formNeed}` : '',
			formName ? `Name: ${formName}` : '',
			formPhone ? `Phone: ${formPhone}` : '',
			formEmail ? `Email: ${formEmail}` : '',
			formGarden ? `Garden: ${formGarden}` : '',
			formMessage ? `Details: ${formMessage}` : ''
		].filter(Boolean);
		return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
	}

	function buildMailtoHref(): string {
		const subject = encodeURIComponent(`GardenSuite - ${formNeed || 'Contact Request'}`);
		const lines = [
			formNeed ? `Need: ${formNeed}` : '',
			formName ? `Name: ${formName}` : '',
			formPhone ? `Phone: ${formPhone}` : '',
			formEmail ? `Email: ${formEmail}` : '',
			formGarden ? `Garden: ${formGarden}` : '',
			formMessage ? `Details: ${formMessage}` : ''
		].filter(Boolean);
		const body = encodeURIComponent(lines.join('\n'));
		return `mailto:contact@gardensuite.in?subject=${subject}&body=${body}`;
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

<div class="flex min-h-screen w-full flex-col overflow-clip bg-white antialiased">
	<main id="main-content">
		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- HERO (unchanged)                                           -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="hero-parallax relative w-full" aria-label="Hero">
			<picture>
				<source srcset="/hero-sky.webp" type="image/webp" />
				<img
					src="/hero-sky.png"
					alt=""
					class="hero-sky-ext pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-top opacity-80 brightness-[1.4] saturate-[0.6]"
					width="1024"
					height="1024"
					loading="eager"
					fetchpriority="high"
				/>
			</picture>

			<div
				class="hero-text-content relative z-20 flex flex-col items-center px-6 pt-32 md:pt-36 lg:pt-40"
			>
				<h1
					class="hero-h1 mx-auto max-w-5xl text-center text-[3rem] leading-[0.9] font-medium tracking-[-0.05em] text-[#111111] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem]"
				>
					Run your tea garden.<br />Not your paperwork.
				</h1>

				<p
					class="hero-sub mx-auto mt-8 max-w-xl text-center text-lg leading-[1.25] tracking-[-0.01em] text-[#4B5563] sm:text-2xl"
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
				<p class="mt-4 text-center text-[14px] font-medium text-[#374151]">
					Built and supported by Sarbani Associates, serving tea gardens since 2000.
				</p>
			</div>

			<div
				class="hero-visuals relative -mt-6 h-[540px] w-full overflow-visible md:-mt-4 md:h-[720px] lg:h-[840px]"
			>
				<picture>
					<source
						srcset="/bg-960.webp 960w, /bg-1920.webp 1920w"
						sizes="100vw"
						type="image/webp"
					/>
					<img
						src="/bg.png"
						alt=""
						class="hero-bg-landscape pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover object-top"
						style="mask-image: linear-gradient(to bottom, transparent 0%, black 40%); -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 40%);"
						width="1920"
						height="1075"
						loading="eager"
						fetchpriority="high"
					/>
				</picture>

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
						<picture>
							<source
								srcset="/mis-dashboard-900.webp 900w, /mis-dashboard-1400.webp 1400w"
								sizes="(min-width: 1024px) 1200px, 90vw"
								type="image/webp"
							/>
							<img
								src="/mis-dashboard.png"
								alt="GardenSuite daily report dashboard"
								class="h-auto w-full object-cover object-top"
								width="1400"
								height="757"
								loading="eager"
								fetchpriority="high"
							/>
						</picture>
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
					<picture>
						<source
							srcset="/fg-960.webp 960w, /fg-1920.webp 1920w"
							sizes="120vw"
							type="image/webp"
						/>
						<img
							src="/fg.png"
							alt=""
							class="absolute bottom-[60px] left-1/2 h-full min-w-[120%] -translate-x-1/2 object-cover object-bottom md:min-w-full"
							width="1920"
							height="1075"
							loading="eager"
							fetchpriority="high"
						/>
					</picture>
					<picture>
						<source srcset="/cloud-border.webp" type="image/webp" />
						<img
							src="/cloud-border.png"
							alt=""
							class="hero-cloud-border absolute inset-x-0 bottom-0 z-10 w-full translate-y-[10%] brightness-[1.15] saturate-0"
							width="1800"
							height="411"
							loading="eager"
						/>
					</picture>
					<div class="absolute inset-x-0 bottom-0 z-[9] h-[60px] bg-white"></div>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- TRUST ROW (compact, above fold)                            -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section
			class="relative z-30 w-full border-b border-[#E4E4E7] bg-white py-8 md:py-10"
			aria-label="Trust indicators"
		>
			<div
				class="mx-auto flex max-w-[1344px] flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 md:gap-x-14 md:px-12"
			>
				<div class="flex flex-col items-center">
					<span class="text-[28px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[34px]">20+</span>
					<span class="mt-0.5 text-[12px] font-medium uppercase tracking-[0.04em] text-[#4B5563]">Tea Estates</span>
				</div>
				<div class="hidden h-8 w-px bg-[#E4E4E7] md:block"></div>
				<div class="flex flex-col items-center">
					<span class="text-[28px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[34px]">7</span>
					<span class="mt-0.5 text-[12px] font-medium uppercase tracking-[0.04em] text-[#4B5563]">Regions</span>
				</div>
				<div class="hidden h-8 w-px bg-[#E4E4E7] md:block"></div>
				<div class="flex flex-col items-center">
					<span class="text-[28px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[34px]">25</span>
					<span class="mt-0.5 text-[12px] font-medium uppercase tracking-[0.04em] text-[#4B5563]">Years</span>
				</div>
				<div class="hidden h-8 w-px bg-[#E4E4E7] md:block"></div>
				<div class="flex flex-col items-center">
					<div class="flex items-center gap-1.5">
						<span class="text-[28px] font-semibold tracking-[-0.03em] text-[#1B5E3B] md:text-[34px]">100%</span>
					</div>
					<span class="mt-0.5 text-[12px] font-medium uppercase tracking-[0.04em] text-[#4B5563]">Offline Ready</span>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- PROBLEM STRIP                                              -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section
			class="reveal-on-scroll relative w-full border-b border-[#E4E4E7] bg-white py-20 md:py-28"
			aria-labelledby="problem-heading"
		>
			<div class="mx-auto grid max-w-[1344px] gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-12">
				<div class="max-w-xl">
					<span
						class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#B91C1C] uppercase"
							>The problem</span
					>
					<h2
						id="problem-heading"
						class="text-[28px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[36px]"
						style="text-wrap: balance"
					>
						Paper work hides real daily losses.
					</h2>
					<p class="mt-5 max-w-lg text-[16px] leading-[1.65] text-[#374151]">
						Manual records create delay, leakage, and disputes before management can react.
					</p>
				</div>

				<div class="space-y-10 md:pt-8">
					{#each [
						{
							title: 'Registers get lost or delayed',
							desc: 'Muster rolls, weight chits, and stock notes vanish or arrive late. Decisions wait because data is incomplete.',
							icon: 'register'
						},
						{
							title: 'Proxy attendance and inflated weight',
							desc: 'Without verified identity and linked weighing, you may pay for workers who did not report and leaf that was not plucked.',
							icon: 'proxy'
						},
						{
							title: 'Monthly payroll takes too long',
							desc: 'Manual hazira, PF, ESI, and bonus calculations across large teams increase errors, delay payout, and trigger avoidable disputes.',
							icon: 'payroll'
						}
					] as item}
						<div class="flex gap-5">
							<div class="relative mt-1 shrink-0 text-[#DC2626] drop-shadow-[0_2px_4px_rgba(220,38,38,0.2)]">
								{#if item.icon === 'register'}
									<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
								{:else if item.icon === 'proxy'}
									<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
								{:else}
									<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
								{/if}
								<span class="absolute -right-1.5 -top-1">
									<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
								</span>
							</div>
							<div>
								<h3 class="text-[19px] font-semibold leading-[1.3] text-[#111111]">{item.title}</h3>
								<p class="mt-2 max-w-[560px] text-[15px] leading-[1.6] text-[#4B5563]">{item.desc}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- SOLUTION BRIDGE                                            -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section
			id="solution"
			class="reveal-on-scroll relative w-full scroll-mt-20 border-b border-[#E4E4E7] bg-white py-20 md:py-28"
			aria-labelledby="solution-heading"
		>
			<div class="mx-auto max-w-[1344px] px-6 md:px-12">
				<div class="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
					<div class="max-w-xl">
						<span
							class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
							>The solution</span
						>
						<h2
							id="solution-heading"
							class="text-[28px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[36px]"
							style="text-wrap: balance"
						>
							One system for the whole tea garden.
						</h2>
						<p class="mt-6 text-[20px] leading-[1.6] tracking-[-0.01em] text-[#18181B]">
							GardenSuite connects face attendance, smart weighing, payroll, factory, stores, and daily MIS so your office does not repeat the same data in different registers.
						</p>
						<p class="mt-6 text-[16px] leading-[1.65] text-[#4B5563]">
							Built by Sarbani Associates for tea estates, installed on-site, and made to work even when internet is not available.
						</p>
						<a
							href="#products"
							class="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#D4D4D8] bg-white px-5 text-[15px] font-semibold text-[#111111] shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition hover:border-[#1B5E3B]/30 hover:bg-[#F8FAF8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.98]"
						>
							See products
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
								<path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</a>
					</div>

					<div class="relative overflow-hidden rounded-2xl border border-[#0F2E0C]/15 bg-[#0B1712] p-4 shadow-[0_30px_90px_rgba(15,46,12,0.18)] md:p-5">
						<picture>
							<source srcset="/hero-sky.webp" type="image/webp" />
							<img src="/hero-sky.png" alt="" class="absolute inset-0 z-0 h-full w-full object-cover brightness-[1.15]" width="1024" height="1024" loading="lazy" />
						</picture>
						<picture>
							<source srcset="/bg-960.webp 960w, /bg-1920.webp 1920w" sizes="(min-width: 1024px) 640px, 90vw" type="image/webp" />
							<img src="/bg.png" alt="" class="absolute inset-x-0 bottom-0 z-[1] h-[60%] w-full object-cover object-top brightness-[1.15]" style="mask-image: linear-gradient(to bottom, transparent 0%, black 30%); -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 30%);" width="960" height="538" loading="lazy" />
						</picture>
						<div class="relative z-10 rounded-xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-sm md:p-8">
							<div class="mx-auto max-w-[420px] rounded-3xl border border-white/30 bg-white/95 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:p-6">
								<div class="mb-5 flex items-center justify-between border-b border-[#E4E4E7] pb-4">
									<div>
										<div class="text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">Today</div>
										<div class="mt-1 text-[22px] font-semibold tracking-[-0.02em] text-[#111111]">Garden workflow</div>
									</div>
									<div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#1B5E3B] text-white">
										<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
											<path d="M4 10.5 8 14l8-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
										</svg>
									</div>
								</div>
								<div class="space-y-3">
									{#each [
										{ label: 'Worker face verified', meta: 'Attendance locked' },
										{ label: 'Leaf weight captured', meta: 'Wireless scale synced' },
										{ label: 'Payroll updated', meta: 'Hazira and plucking ready' },
										{ label: 'Factory stock updated', meta: 'Green leaf to made tea' },
										{ label: 'MIS report synced', meta: 'Owner view from anywhere' }
									] as step, i}
										<div class="flex items-center gap-3 rounded-2xl border border-[#E4E4E7] bg-[#FAFAF7] px-4 py-3">
											<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1B5E3B]/10 text-[12px] font-semibold text-[#1B5E3B]">{i + 1}</div>
											<div class="min-w-0 flex-1">
												<div class="truncate text-[15px] font-semibold text-[#111111]">{step.label}</div>
												<div class="mt-0.5 truncate text-[13px] text-[#4B5563]">{step.meta}</div>
											</div>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="mt-14 grid gap-8 border-t border-[#E4E4E7] pt-10 sm:grid-cols-2 lg:grid-cols-4">
					{#each [
						{ title: 'Offline first', desc: 'Works at the garden without internet.' },
						{ title: 'Connected data', desc: 'Attendance, weight, payroll, factory, and stores in one flow.' },
						{ title: 'Less leakage', desc: 'Reduces proxy attendance and inflated weights.' },
						{ title: 'Sarbani support', desc: 'Setup and training by the local team.' }
					] as point}
						<div>
							<h3 class="text-[17px] font-semibold text-[#111111]">{point.title}</h3>
							<p class="mt-2 text-[15px] leading-[1.6] text-[#4B5563]">{point.desc}</p>
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
			class="reveal-on-scroll relative w-full scroll-mt-20 overflow-hidden bg-gradient-to-b from-[#F8FAF8] to-white py-24 md:py-32"
			aria-labelledby="products-heading"
		>
			<div class="mx-auto max-w-[1344px] px-6 md:px-12">
				<div class="mb-14 max-w-3xl">
						<span
							class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
							>Products</span
						>
					<h2
						id="products-heading"
						class="text-[28px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[36px]"
						style="text-wrap: balance"
					>
						One product. Five connected modules.
					</h2>
					<p class="mt-5 text-[16px] leading-[1.65] text-[#374151]">
						Face attendance, leaf weight, payroll, factory, stores, and daily reports. Every module shares data so your office does not repeat entries from paper registers.
					</p>
				</div>

				<!-- Featured card (Attendance) -->
				{#each products as product, i}
					{#if product.featured}
						<a
							href={product.href}
							class="group/product relative mb-6 block overflow-hidden rounded-2xl border border-[#0F2E0C]/15 bg-[#0B1712] p-4 shadow-[0_30px_90px_rgba(15,46,12,0.18)] transition-all duration-300 hover:border-white/20 hover:shadow-[0_40px_100px_rgba(15,46,12,0.25)] md:mb-8 md:p-5"
						>
							<picture>
								<source srcset="/hero-sky.webp" type="image/webp" />
								<img src="/hero-sky.png" alt="" class="absolute inset-0 z-0 h-full w-full object-cover brightness-[1.15] transition-transform duration-700 group-hover/product:scale-105" width="1024" height="1024" loading="lazy" />
							</picture>
							<picture>
								<source srcset="/bg-960.webp 960w, /bg-1920.webp 1920w" sizes="(min-width: 1024px) 1280px, 90vw" type="image/webp" />
								<img src="/bg.png" alt="" class="absolute inset-x-0 bottom-0 z-[1] h-[60%] w-full object-cover object-top brightness-[1.15] transition-transform duration-700 group-hover/product:scale-105" style="mask-image: linear-gradient(to bottom, transparent 0%, black 30%); -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 30%);" width="1280" height="717" loading="lazy" />
							</picture>
							<div class="relative z-10 rounded-xl border border-white/15 bg-white/[0.04] p-3 backdrop-blur-sm md:p-5">
								<div class="overflow-hidden rounded-2xl border border-white/30 bg-white/95 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
									<div class="grid grid-cols-1 md:grid-cols-2">
								<div class="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] p-6 md:aspect-auto md:min-h-[320px]">
									<div class="absolute top-5 left-5 z-10">
										<span class="rounded-full bg-[#1B5E3B] px-3 py-1 text-[11px] font-semibold tracking-[0.04em] text-white uppercase shadow-sm">
											{product.badge}
										</span>
									</div>
									<!-- Centered overlay card -->
									<div class="relative z-10 w-full max-w-[280px] rounded-xl border border-white/60 bg-white/95 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300 group-hover/product:scale-[1.03] group-hover/product:shadow-[0_16px_48px_rgba(0,0,0,0.12)]">
										<div class="mb-2 flex items-center gap-2">
											<div class="flex h-6 w-6 items-center justify-center rounded-full bg-[#1B5E3B]/10">
												<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 6.5l2 2 4-4" stroke="#1B5E3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
											</div>
											<span class="text-[12px] font-semibold text-[#1B5E3B]">Face Verified</span>
										</div>
										<div class="flex justify-between border-t border-[#F0F0F0] py-1.5 text-[12px]">
											<span class="text-[#4B5563]">Worker</span>
											<span class="font-semibold text-[#111]">Ramesh K.</span>
										</div>
										<div class="flex justify-between border-t border-[#F0F0F0] py-1.5 text-[12px]">
											<span class="text-[#4B5563]">Match</span>
											<span class="font-semibold text-[#111]">98.7%</span>
										</div>
										<div class="flex justify-between border-t border-[#F0F0F0] py-1.5 text-[12px]">
											<span class="text-[#4B5563]">Section</span>
											<span class="text-[#374151]">Div. 3 - East</span>
										</div>
									</div>
								</div>
								<div class="flex flex-col justify-center p-8 md:p-10">
									<h3 class="text-[19px] font-semibold tracking-[-0.02em] text-[#111111]">{product.title}</h3>
									<p class="mt-3 text-[15px] leading-[1.6] text-[#374151] md:text-[16px]">{product.desc}</p>
									<span class="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#1B5E3B] transition-colors group-hover/product:gap-2.5">
										Learn more
										<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M5 2.5l4.5 4.5L5 11.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
									</span>
								</div>
							</div>
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
								class="group/product relative flex flex-col overflow-hidden rounded-2xl border border-[#0F2E0C]/15 bg-[#0B1712] p-4 shadow-[0_30px_90px_rgba(15,46,12,0.18)] transition-all duration-300 hover:border-white/20 hover:shadow-[0_40px_100px_rgba(15,46,12,0.25)] md:p-5"
							>
								<picture>
									<source srcset="/hero-sky.webp" type="image/webp" />
									<img src="/hero-sky.png" alt="" class="absolute inset-0 z-0 h-full w-full object-cover brightness-[1.15] transition-transform duration-700 group-hover/product:scale-105" width="1024" height="1024" loading="lazy" />
								</picture>
								<picture>
									<source srcset="/bg-960.webp 960w, /bg-1920.webp 1920w" sizes="(min-width: 1024px) 640px, 90vw" type="image/webp" />
									<img src="/bg.png" alt="" class="absolute inset-x-0 bottom-0 z-[1] h-[60%] w-full object-cover object-top brightness-[1.15] transition-transform duration-700 group-hover/product:scale-105" style="mask-image: linear-gradient(to bottom, transparent 0%, black 30%); -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 30%);" width="960" height="538" loading="lazy" />
								</picture>
								<div class="relative z-10 flex flex-1 flex-col rounded-xl border border-white/15 bg-white/[0.04] p-3 backdrop-blur-sm md:p-4">
									<div class="flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/30 bg-white/95 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
										<div class="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] p-6">
									{#if product.icon === 'payroll'}
										<!-- Payroll overlay -->
										<div class="relative z-10 w-full max-w-[240px] rounded-xl border border-white/60 bg-white/95 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300 group-hover/product:scale-[1.03] group-hover/product:shadow-[0_16px_48px_rgba(0,0,0,0.12)]">
											<div class="mb-2 text-[12px] font-semibold tracking-[0.04em] text-[#4B5563] uppercase">Month Summary</div>
											<div class="flex justify-between border-t border-[#F0F0F0] py-1.5 text-[12px]">
												<span class="text-[#4B5563]">Gross wages</span>
												<span class="text-[#374151]">&#8377;2,48,500</span>
											</div>
											<div class="flex justify-between border-t border-[#F0F0F0] py-1.5 text-[12px]">
												<span class="text-[#4B5563]">PF deducted</span>
												<span class="text-[#374151]">&#8377;29,820</span>
											</div>
											<div class="flex justify-between border-t border-[#F0F0F0] py-1.5 text-[12px]">
												<span class="text-[#4B5563]">Net payable</span>
												<span class="font-semibold text-[#111]">&#8377;2,14,207</span>
											</div>
										</div>
									{:else if product.icon === 'factory'}
										<div class="relative z-10 w-full max-w-[240px] rounded-xl border border-white/60 bg-white/95 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300 group-hover/product:scale-[1.03] group-hover/product:shadow-[0_16px_48px_rgba(0,0,0,0.12)]">
											<div class="mb-2 text-[11px] font-semibold tracking-[0.06em] text-[#1B5E3B] uppercase">Cost Per Kg</div>
											{#each [{ label: 'Green leaf', value: '₹32.50' }, { label: 'Manufacturing', value: '₹12.80' }, { label: 'Power & fuel', value: '₹5.40' }] as row}
												<div class="flex items-center justify-between border-t border-[#F0F0F0] py-1 text-[12px]">
													<span class="text-[#4B5563]">{row.label}</span>
													<span class="font-semibold tabular-nums text-[#374151]" style="font-variant-numeric: tabular-nums">{row.value}</span>
												</div>
											{/each}
											<div class="flex items-center justify-between border-t-2 border-[#E4E4E7] pt-1.5 text-[12px]">
												<span class="font-semibold text-[#111]">Total</span>
												<span class="font-bold tabular-nums text-[#1B5E3B]" style="font-variant-numeric: tabular-nums">₹62.00</span>
											</div>
										</div>
									{:else if product.icon === 'stores'}
										<div class="relative z-10 w-full max-w-[240px] rounded-xl border border-white/60 bg-white/95 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300 group-hover/product:scale-[1.03] group-hover/product:shadow-[0_16px_48px_rgba(0,0,0,0.12)]">
											<div class="mb-2 text-[11px] font-semibold tracking-[0.06em] text-[#1B5E3B] uppercase">Stock Levels</div>
											{#each [{ label: 'NPK Fertilizer', value: '2,450 kg', ok: true }, { label: 'Diesel', value: '1,200 L', ok: true }, { label: 'Pruning Shears', value: '18 pcs', ok: false }] as row}
												<div class="flex items-center justify-between border-t border-[#F0F0F0] py-1 text-[12px]">
													<div class="flex items-center gap-1.5">
														<div class="h-1.5 w-1.5 rounded-full {row.ok ? 'bg-[#1B5E3B]' : 'bg-[#D97706]'}"></div>
														<span class="text-[#4B5563]">{row.label}</span>
													</div>
													<span class="font-semibold tabular-nums text-[#374151]" style="font-variant-numeric: tabular-nums">{row.value}</span>
												</div>
											{/each}
										</div>
									{:else}
										<!-- Dashboard overlay -->
										<div class="relative z-10 w-full max-w-[240px] rounded-xl border border-[#FDE68A] bg-[#FEF9C3]/95 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all duration-300 group-hover/product:scale-[1.03] group-hover/product:shadow-[0_16px_48px_rgba(0,0,0,0.12)]">
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
									<p class="mt-2 flex-1 text-[14px] leading-[1.6] text-[#374151]">{product.desc}</p>
									<span class="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#1B5E3B] transition-colors group-hover/product:gap-2.5">
										Learn more
										<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M5 2.5l4.5 4.5L5 11.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
									</span>
								</div>
									</div>
								</div>
							</a>
						{/if}
					{/each}
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- GS vs PAPER - FULL WIDTH COMPARISON (Tailark Comparator)   -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section
			class="reveal-on-scroll relative w-full overflow-hidden bg-[#141A16] py-16 md:py-24"
			aria-labelledby="compare-heading"
		>
			<div class="relative z-10 mx-auto max-w-[1100px] px-6 md:px-8">
				<div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
					<!-- Left: Heading + description -->
					<div class="max-w-lg">
						<span
							class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#4ADE80] uppercase"
						>Comparison</span>
						<h2
						id="compare-heading"
						class="text-[28px] leading-[1.08] font-semibold tracking-[-0.04em] text-white md:text-[36px]"
							style="text-wrap: balance"
						>Paper way vs GardenSuite</h2>
						<p class="mt-5 text-[16px] leading-[1.65] text-[#9CA3AF] lg:max-w-xs">
							Stop relying on muster rolls, paper chits, and phone-call reporting. One connected system for your whole tea estate.
						</p>
					</div>

					<!-- Right: Comparison table -->
					<div class="grid grid-cols-[1.4fr_1fr_1fr] overflow-hidden rounded-2xl ring-1 ring-white/10">
						<!-- Features Column -->
						<div class="bg-[#1A1F1C]">
							<div class="flex h-14 items-center px-4 pb-0 text-[11px] font-semibold tracking-[0.06em] text-[#6B7280] uppercase md:px-5">
								Feature
							</div>
							{#each ['Face scan attendance', 'Smart wireless scale', 'Auto-calculated payroll', 'Connected factory data', 'Live store balances', 'Cloud daily reports', 'Offline at the garden', 'On-site setup & training'] as feature, i}
								<div class="flex h-12 items-center border-t border-white/[0.06] px-4 text-[13px] font-medium text-[#D1D5DB] md:px-5">
									{feature}
								</div>
							{/each}
						</div>

						<!-- Paper Way -->
						<div class="border-l border-white/[0.06]">
							<div class="flex h-14 items-center justify-center bg-[#DC2626]/10 px-3">
								<span class="text-[12px] font-bold tracking-[0.02em] text-[#FCA5A5]">Paper Way</span>
							</div>
							{#each [false, false, false, false, false, false, false, false] as hasFeature, i}
								<div class="flex h-12 items-center justify-center border-t border-white/[0.06]">
									<span class="flex h-5 w-5 items-center justify-center rounded-full bg-[#DC2626]/20 text-[#FCA5A5]">
										<svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M3.5 10.5l7-7M10.5 10.5l-7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
									</span>
								</div>
							{/each}
						</div>

						<!-- GardenSuite (highlighted) -->
						<div class="relative">
							<div class="absolute inset-0 rounded-r-2xl bg-[#1B5E3B]/20 shadow-[0_0_60px_rgba(27,94,59,0.12)]"></div>
							<div class="relative z-10">
								<div class="flex h-14 items-center justify-center border-b border-[#1B5E3B]/40 bg-[#1B5E3B]/30 px-3">
									<span class="text-[12px] font-bold tracking-[0.02em] text-[#4ADE80]">GardenSuite</span>
								</div>
								{#each [true, true, true, true, true, true, true, true] as hasFeature, i}
									<div class="flex h-12 items-center justify-center border-t border-white/[0.06]">
										<span class="flex h-5 w-5 items-center justify-center rounded-full bg-[#1B5E3B] text-white shadow-[0_0_8px_rgba(27,94,59,0.4)]">
											<svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M3 7.5l2.5 2.5L11 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
										</span>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- CONFIDENTIAL PROOF (Bento)                                  -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section
			id="proof"
			class="reveal-on-scroll relative w-full scroll-mt-20 overflow-hidden bg-gradient-to-b from-[#F8FAF8] to-white py-20 md:py-24"
			aria-labelledby="confidential-proof-heading"
		>
			<div class="mx-auto max-w-[1344px] px-6 md:px-12">
				<div class="mb-10 max-w-4xl">
					<span class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">
						Trusted across regions
					</span>
					<h2
						id="confidential-proof-heading"
						class="text-[28px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[36px]"
						style="text-wrap: balance"
					>
						Proof from the field, not just brochure claims.
					</h2>
					<p class="mt-4 text-[16px] leading-[1.65] text-[#374151]">
						GardenSuite is used across Assam, Dooars, Terai, Darjeeling, Coochbehar, Uttar Dinajpur, and Jalpaiguri. Client estate privacy is respected, so names are shared during demo only.
					</p>
				</div>

				<div class="grid overflow-hidden rounded-3xl border border-[#E4E4E7] bg-white md:grid-cols-3">
					<div class="border-b border-[#E4E4E7] p-7 md:border-r md:border-b">
						<div class="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4D4D8] bg-[#F8FAF8]">
							<svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
								<path d="M8 12.5a7 7 0 1 1 14 0" stroke="#A1A1AA" stroke-width="2" stroke-linecap="round" />
								<path d="M4.5 12.5C6.2 7.5 10.2 5 15 5s8.8 2.5 10.5 7.5" stroke="#6366F1" stroke-width="2" stroke-linecap="round" />
								<path d="M5 15h20" stroke="#6366F1" stroke-width="2" />
							</svg>
						</div>
						<h3 class="text-[24px] leading-[1.2] font-semibold tracking-[-0.02em] text-[#111111]">Face identity linked with plucking weight.</h3>
						<p class="mt-4 text-[16px] leading-[1.6] text-[#4B5563]">One step capture at the garden gate. Less manual correction and less dispute at payroll time.</p>
					</div>

					<div class="border-b border-[#E4E4E7] p-7 md:border-r md:border-b">
						<div class="mb-8 h-24 rounded-xl bg-gradient-to-r from-[#C7D2FE] via-[#818CF8] to-[#4F46E5] opacity-40"></div>
						<h3 class="text-[24px] leading-[1.2] font-semibold tracking-[-0.02em] text-[#111111]">Daily MIS visibility for owners and managers.</h3>
						<p class="mt-4 text-[16px] leading-[1.6] text-[#4B5563]">Check plucking, production, labour, and factory trends from phone, tablet, or laptop.</p>
					</div>

					<div class="border-b border-[#E4E4E7] p-7 md:border-b">
						<div class="mb-6 flex items-end justify-between">
							<div class="text-[34px] font-semibold tracking-[-0.02em] text-[#111111]">20+</div>
							<div class="text-[26px] font-semibold text-[#A1A1AA]">7</div>
						</div>
						<div class="mb-4 h-2 rounded-full bg-[#F4F4F5]">
							<div class="h-full w-[72%] rounded-full bg-gradient-to-r from-[#10B981] to-[#6366F1]"></div>
						</div>
						<p class="text-[14px] text-[#4B5563]"><span class="font-semibold text-[#111111]">20+ tea estates</span> in <span class="font-semibold text-[#111111]">7 regions</span>, supported by Sarbani Associates.</p>
					</div>

					<div class="border-b border-[#E4E4E7] p-7 md:border-r md:border-b-0">
						<div class="rounded-2xl border border-[#E4E4E7] bg-[#FAFAF7] p-5">
							<div class="mb-2 flex items-center justify-between text-[16px]">
								<span class="text-[#52525B]">Offline runtime</span>
								<span class="font-semibold text-[#111111]">99.9%</span>
							</div>
							<div class="grid grid-cols-8 gap-1.5">
								{#each Array(32) as _, i}
									<div class="h-8 rounded-sm {i % 7 === 0 ? 'bg-[#D4D4D8]' : 'bg-[#10B981]/80'}"></div>
								{/each}
							</div>
						</div>
						<h3 class="mt-6 text-[26px] leading-[1.2] font-semibold tracking-[-0.02em] text-[#111111]">Service reliability at garden level.</h3>
						<p class="mt-3 text-[16px] leading-[1.6] text-[#4B5563]">Attendance, weighing, payroll, and stores continue even when internet drops.</p>
					</div>

					<div class="border-b border-[#E4E4E7] p-7 md:border-r md:border-b-0">
						<div class="relative mb-6 pl-6">
							<div class="absolute top-1 left-2 h-[122px] border-l border-dashed border-[#A1A1AA]"></div>
							<div class="space-y-3">
								<div class="text-[15px] text-[#52525B]"><span class="font-semibold text-[#111111]">Day 1</span> Site visit and process mapping</div>
								<div class="rounded-xl border border-[#E4E4E7] bg-white p-3">
									<div class="text-[15px] font-semibold text-[#111111]">Day 2 Staff training completed</div>
									<div class="text-[14px] text-[#52525B]">Payroll and reporting handover done.</div>
								</div>
								<div class="text-[15px] text-[#52525B]"><span class="font-semibold text-[#111111]">Day 3</span> Live operations support</div>
							</div>
						</div>
						<h3 class="text-[24px] leading-[1.2] font-semibold tracking-[-0.02em] text-[#111111]">Fast rollout with on-site training.</h3>
						<p class="mt-3 text-[16px] leading-[1.6] text-[#4B5563]">Sarbani Associates team stays on-site until your office and field team are confident.</p>
					</div>

					<div class="p-7">
						<div class="mb-6 rounded-2xl border border-[#E4E4E7] bg-[#FAFAF7] p-5">
							<div class="mb-3 flex items-center gap-2">
								<div class="h-7 w-7 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#A78BFA]"></div>
								<div class="text-[14px] font-semibold text-[#111111]">Support desk - 12 min ago</div>
							</div>
							<p class="rounded-xl border border-[#E4E4E7] bg-white px-4 py-3 text-[15px] leading-[1.5] text-[#18181B]">
								Manager update received. Payroll totals reconciled for this week. Reports synced.
							</p>
						</div>
						<h3 class="text-[24px] leading-[1.2] font-semibold tracking-[-0.02em] text-[#111111]">Local communication and support flow.</h3>
						<p class="mt-3 text-[16px] leading-[1.6] text-[#4B5563]">Direct support from Sarbani Associates in your region, not a remote ticket queue only.</p>
					</div>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- DIFFERENTIATOR (Tailark description list style)             -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section
			id="about"
			class="reveal-on-scroll relative w-full scroll-mt-20 overflow-hidden bg-[#F8F7F3] py-24 md:py-32"
			aria-labelledby="trust-heading"
		>
			<div class="mx-auto max-w-[1344px] px-6 md:px-12">
				<div class="max-w-3xl">
						<span
							class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
							>Why GardenSuite</span
						>
						<h2
							id="trust-heading"
							class="text-[28px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[36px]"
							style="text-wrap: balance"
						>
							Installed, trained, and supported by Sarbani Associates.
						</h2>
						<p class="mt-5 text-[16px] leading-[1.65] text-[#374151]">
							Tea garden operations are different. GardenSuite handles field attendance, plucking weight, payroll, factory, and stores in one connected flow while Sarbani Associates handles rollout on-site.
						</p>
				</div>

				<div class="mt-20 grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
					{#each [
						{
							title: 'Tea garden payroll logic',
							desc: 'Hazira, tikka, plucking rates, PF, ESI, and bonus calculations match tea estate workflow.',
							icon: 'payroll'
						},
						{
							title: 'Offline operations',
							desc: 'Attendance, weighing, payroll, factory, and stores continue at the garden without internet.',
							icon: 'offline'
						},
						{
							title: 'Face verified attendance',
							desc: 'Worker identity is verified by face scan to reduce proxy attendance and disputes.',
							icon: 'face'
						},
						{
							title: 'Smart wireless weighing',
							desc: 'Leaf weight is linked directly to verified worker records in one step.',
							icon: 'weigh'
						},
						{
							title: 'Live MIS for management',
							desc: 'Owners and managers track daily plucking, production, labour, and factory numbers anywhere.',
							icon: 'dashboard'
						},
						{
							title: 'On-site setup and support',
							desc: 'Sarbani Associates installs, trains staff on-site, and supports your team after go-live.',
							icon: 'support'
						}
					] as item}
						<div class="group flex gap-5 rounded-2xl p-4 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:-translate-y-1 hover:bg-white/60">
							<div class="mt-1 shrink-0 text-[#1B5E3B] drop-shadow-[0_2px_4px_rgba(27,94,59,0.25)]">
								{#if item.icon === 'payroll'}
									<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M12 9v4M9 11h6"/></svg>
								{:else if item.icon === 'offline'}
									<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></svg>
								{:else if item.icon === 'face'}
									<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"/><path d="M12 14c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z"/></svg>
								{:else if item.icon === 'weigh'}
									<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5"/><path d="m15 15 6 6M4 4l5 5"/></svg>
								{:else if item.icon === 'dashboard'}
									<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
								{:else}
									<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
								{/if}
							</div>
							<div>
								<h3 class="text-[19px] font-semibold leading-[1.3] text-[#111111]">{item.title}</h3>
								<p class="mt-2 text-[15px] leading-[1.6] text-[#4B5563]">{item.desc}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- FAQ (Tailark faqs/three, divided card)                     -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section class="reveal-on-scroll relative w-full overflow-hidden bg-gradient-to-b from-white to-[#F8FAF8] py-24 md:py-32" aria-labelledby="faq-heading">
			<div class="mx-auto max-w-[1344px] px-6 md:px-12">
				<div class="grid border border-[#E4E4E7] bg-white md:grid-cols-5 md:divide-x md:divide-[#E4E4E7]">
					<div class="p-8 md:col-span-2 md:p-10 lg:p-12">
						<h2
						id="faq-heading"
						class="scroll-mt-20 text-[28px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[36px]"
							style="text-wrap: balance"
						>
							FAQs
						</h2>
						<p class="mt-5 text-[17px] leading-[1.6] text-[#374151]">
							Your questions answered
						</p>
						<p class="mt-6 hidden text-[16px] text-[#4B5563] md:block">
							Can't find what you're looking for? <br/>
							<a href="mailto:contact@gardensuite.in" class="mt-2 inline-block font-medium text-[#1B5E3B] hover:underline">contact our team</a>
						</p>
					</div>

					<div class="space-y-4 p-8 md:col-span-3 md:p-10 lg:p-12">
						<h3 class="pl-6 text-[20px] font-semibold text-[#111111]">General</h3>
						<div class="space-y-0">
							{#each faqs as faq, i}
								{@const isOpen = openFaq === i}
								{@const nextOpen = i < faqs.length - 1 && openFaq === i + 1}
								<div
									class="border-b px-6 py-1 transition-all duration-200 {isOpen || nextOpen ? 'border-transparent' : 'border-[#F0F0F0]'} {isOpen
										? 'rounded-lg bg-[#F8FAF8] shadow-[0_2px_12px_rgba(0,0,0,0.04)] ring-1 ring-[#E4E4E7]'
										: ''}"
								>
									<button
										class="group flex w-full cursor-pointer items-start justify-between gap-4 py-4 text-left transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30"
										onclick={() => toggleFaq(i)}
										aria-expanded={isOpen}
									>
										<h3 class="text-[17px] font-medium text-[#111111]">
											{faq.q}
										</h3>
										<svg
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											class="mt-0.5 shrink-0 text-[#A1A1AA] transition-transform duration-200 {isOpen ? 'rotate-180' : ''}"
											aria-hidden="true"
										><path
												d="m6 9 6 6 6-6"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
											/></svg
										>
									</button>
									<div
										class="grid transition-all duration-200 ease-out {isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}"
									>
										<div class="overflow-hidden">
											<p class="pb-4 text-[16px] leading-[1.6] text-[#4B5563]">{faq.a}</p>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
				<p class="mt-8 text-center text-[14px] text-[#4B5563] md:hidden">
					Can't find what you're looking for? <a href="mailto:contact@gardensuite.in" class="font-medium text-[#1B5E3B] hover:underline">contact our team</a>
				</p>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════════════════ -->
		<!-- CTA                                                        -->
		<!-- ═══════════════════════════════════════════════════════════ -->
		<section
			id="contact"
			class="reveal-on-scroll w-full bg-[#141A16]"
			aria-labelledby="cta-heading"
		>
			<div class="grid min-h-[90vh] md:grid-cols-2">
				<div class="mx-auto flex w-full max-w-[672px] flex-col justify-center px-6 py-24 md:px-12 lg:px-16">
					<div class="mb-6 w-fit text-[12px] font-semibold tracking-[0.06em] text-[#6EA66B] uppercase">Talk to Sarbani Associates</div>
					<h2
						id="cta-heading"
						class="text-[28px] leading-[1.08] font-semibold tracking-[-0.04em] text-white md:text-[36px]"
						style="text-wrap: balance"
					>
						Ask a question, check fit, or book a demo.
					</h2>
					<p class="mt-5 text-[16px] leading-[1.65] text-[#9CA3AF]">
						Some visitors are ready for a demo. Others need pricing, module fit, setup details, or a simple first conversation. Use whichever route is comfortable.
					</p>
					<div class="mt-8 grid gap-4">
						{#each [
							{ title: 'For owners', desc: 'Ask about MIS, control, and outside-garden visibility.' },
							{ title: 'For managers', desc: 'Discuss attendance, plucking, weighing, and daily reports.' },
							{ title: 'For office staff', desc: 'Check payroll, factory, stores, and monthly closing flow.' }
						] as audience}
							<div class="flex items-start gap-3.5">
								<div class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1B5E3B]/20">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6EA66B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>
								</div>
								<div>
									<div class="text-[15px] font-semibold text-white">{audience.title}</div>
									<p class="mt-0.5 text-[13px] leading-[1.5] text-[#8B9590]">{audience.desc}</p>
								</div>
							</div>
						{/each}
					</div>
					<p class="mt-8 text-[13px] leading-[1.6] text-[#6B7280]">
						Reply within 1 working day. Demo scheduling and first answers come from the Sarbani Associates team.
					</p>
				</div>

				<div class="border-l border-[#E4E4E7] flex flex-col justify-center bg-[#F8F7F3] px-6 py-24 md:px-12 lg:px-16">
					<div class="mx-auto w-full max-w-[480px]">
						<h3 class="text-[22px] font-semibold text-[#111827]">Talk to our team</h3>
						<p class="mt-2 text-[14px] leading-[1.6] text-[#6B7280]">
							Fill out the form and we'll be in touch within 24 hours.
						</p>
						<form
							class="mt-6 flex flex-col gap-3.5"
							onsubmit={(e) => e.preventDefault()}
						>
							<input
								type="text"
								placeholder="Your name"
								aria-label="Your name"
								bind:value={formName}
								class="w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-3 text-[14px] text-[#111827] placeholder-[#9CA3AF] outline-none transition focus:border-[#1B5E3B] focus:ring-2 focus:ring-[#1B5E3B]/15"
							/>
							<input
								type="tel"
								placeholder="Phone number"
								aria-label="Phone number"
								bind:value={formPhone}
								class="w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-3 text-[14px] text-[#111827] placeholder-[#9CA3AF] outline-none transition focus:border-[#1B5E3B] focus:ring-2 focus:ring-[#1B5E3B]/15"
							/>
							<input
								type="email"
								placeholder="Email address"
								aria-label="Email address"
								bind:value={formEmail}
								class="w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-3 text-[14px] text-[#111827] placeholder-[#9CA3AF] outline-none transition focus:border-[#1B5E3B] focus:ring-2 focus:ring-[#1B5E3B]/15"
							/>
							<input
								type="text"
								placeholder="Garden name"
								aria-label="Garden name"
								bind:value={formGarden}
								class="w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-3 text-[14px] text-[#111827] placeholder-[#9CA3AF] outline-none transition focus:border-[#1B5E3B] focus:ring-2 focus:ring-[#1B5E3B]/15"
							/>
							<textarea
								placeholder="Question or message"
								aria-label="Question or message"
								bind:value={formMessage}
								rows="3"
								class="w-full resize-none rounded-lg border border-[#D1D5DB] bg-white px-4 py-3 text-[14px] text-[#111827] placeholder-[#9CA3AF] outline-none transition focus:border-[#1B5E3B] focus:ring-2 focus:ring-[#1B5E3B]/15"
							></textarea>
							<div class="mt-1 flex flex-col gap-2.5 sm:flex-row">
								<a
									href={buildWaLink()}
									target="_blank"
									rel="noreferrer"
									class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3.5 transition duration-150 hover:bg-[#1EBE57] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/30 active:scale-[0.97]"
								>
									<svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
									<span class="text-[14px] font-semibold text-white">WhatsApp</span>
								</a>
								<a
									href={buildMailtoHref()}
									class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#1B5E3B] px-6 py-3.5 transition duration-150 hover:bg-[#237A4E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.97]"
								>
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>
									<span class="text-[14px] font-semibold text-white">Email</span>
								</a>
							</div>
						</form>
						<p class="mt-4 text-center text-[12px] text-[#9CA3AF]">
							By submitting, you agree to our <a href="/terms" class="underline text-[#6B7280] hover:text-[#1B5E3B] transition">Terms</a> and <a href="/privacy" class="underline text-[#6B7280] hover:text-[#1B5E3B] transition">Privacy Policy</a>.
						</p>
					</div>
				</div>
			</div>
		</section>
		</main>

		<div class="fixed right-5 bottom-5 z-[80] transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] md:right-7 md:bottom-7 {fabVisible ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0 pointer-events-none'}">
			{#if contactPanelOpen}
				<div
					class="absolute bottom-0 right-0 w-[min(calc(100vw-2.5rem),360px)] overflow-hidden rounded-3xl bg-[#141A16] shadow-[0_24px_80px_rgba(0,0,0,0.45)] pb-16"
					transition:fly={{ y: 16, duration: 220, easing: (t: number) => 1 - Math.pow(1 - t, 4) }}
				>
					<div class="p-5 pb-3">
						<div>
							<div class="text-[12px] font-semibold tracking-[0.08em] text-white/50 uppercase">GardenSuite contact</div>
							<h2 class="mt-2 text-[22px] leading-[1.15] font-semibold tracking-[-0.02em] text-white">
								Ask Sarbani Associates
							</h2>
							<p class="mt-2 text-[14px] leading-[1.5] text-white/60">
								Get a demo, pricing answer, setup details, or product help.
							</p>
						</div>
					</div>
					<div class="grid gap-2 p-3 pt-1">
						<a
							href={buildWaLink()}
							target="_blank"
							rel="noreferrer"
							class="flex items-center gap-3 rounded-2xl bg-white/[0.06] p-4 transition-colors duration-150 hover:bg-white/[0.12] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
						>
							<span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white">
								<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
							</span>
							<span>
								<span class="block text-[15px] font-semibold text-white">WhatsApp</span>
								<span class="mt-0.5 block text-[13px] text-white/50">Fastest for demo and quick questions</span>
							</span>
						</a>
						<a
							href={buildMailtoHref()}
							class="flex items-center gap-3 rounded-2xl bg-white/[0.06] p-4 transition-colors duration-150 hover:bg-white/[0.12] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
						>
							<span class="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.12] text-white">
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4 12 13 2 4"/></svg>
							</span>
							<span>
								<span class="block text-[15px] font-semibold text-white">Email</span>
								<span class="mt-0.5 block text-[13px] text-white/50">Best for detailed requirements</span>
							</span>
						</a>
						<a
							href="#contact"
							class="flex items-center gap-3 rounded-2xl bg-white/[0.06] p-4 transition-colors duration-150 hover:bg-white/[0.12] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
							onclick={() => (contactPanelOpen = false)}
						>
							<span class="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08] text-white">
								<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 5h12M4 10h12M4 15h7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
							</span>
							<span>
								<span class="block text-[15px] font-semibold text-white">Use contact form</span>
								<span class="mt-0.5 block text-[13px] text-white/50">Choose demo, pricing, support, or question</span>
							</span>
						</a>
					</div>
				</div>
			{/if}
			<button
				type="button"
				class="group relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#141A16] text-white transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/15 active:scale-[0.97] {contactPanelOpen ? 'shadow-none' : 'hover:bg-[#1a2420] shadow-[0_16px_44px_rgba(0,0,0,0.35)]'}"
				aria-label={contactPanelOpen ? 'Close contact options' : 'Open contact options'}
				aria-expanded={contactPanelOpen}
				onclick={() => (contactPanelOpen = !contactPanelOpen)}
			>
				<span class="absolute inset-0 rounded-full border border-white/10 transition-opacity duration-200 {contactPanelOpen ? 'opacity-0' : 'opacity-100'}"></span>
				<div class="relative flex h-full w-full items-center justify-center">
					<svg
						width="27"
						height="27"
						viewBox="0 0 24 24"
						fill="none"
						aria-hidden="true"
						class="absolute transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] {contactPanelOpen ? 'scale-50 opacity-0 -rotate-90' : 'scale-100 opacity-100 rotate-0'}"
					>
						<path
							d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"
							stroke="currentColor"
							stroke-width="1.8"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						aria-hidden="true"
						class="absolute transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] {contactPanelOpen ? 'scale-100 opacity-100 rotate-0' : 'scale-50 opacity-0 rotate-90'}"
					>
						<path
							d="M6 6l12 12M18 6 6 18"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
						/>
					</svg>
				</div>
			</button>
		</div>
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
