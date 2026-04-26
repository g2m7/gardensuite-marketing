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

		// ── Lenis smooth scroll (keytail-style lerped interpolation) ──
		const lenis = new Lenis({
			lerp: 0.1,
			wheelMultiplier: 1,
			touchMultiplier: 2
		});

		// Sync Lenis with GSAP — single shared RAF frame, zero jitter
		lenis.on('scroll', ScrollTrigger.update);
		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});
		gsap.ticker.lagSmoothing(0);

		// ── Hero entrance ──
		const heroSection = document.querySelector('.hero-parallax');
		if (heroSection) {
			// Text entrance stagger
			const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
			heroTl
				.from('.hero-h1', { opacity: 0, y: 50, duration: 0.9, delay: 0.2 })
				.from('.hero-sub', { opacity: 0, y: 30, duration: 0.7 }, '-=0.5')
				.from('.hero-cta', { opacity: 0, y: 24, duration: 0.6 }, '-=0.4');

			// Mockup entrance: slide up with subtle scale
			gsap.from('.hero-mockup-inner', {
				y: 60,
				scale: 0.97,
				opacity: 0,
				duration: 1.2,
				delay: 0.6,
				ease: 'power2.out'
			});

			// ── Scroll-driven parallax (3D sandwich depth) ──
			// Text moves up at the same speed as the mockup
			gsap.to('.hero-text-content', {
				y: -98,
				ease: 'none',
				scrollTrigger: {
					trigger: '.hero-parallax',
					start: 'top top',
					end: 'bottom top',
					scrub: true
				}
			});

			// Dashboard rises from behind the foreground hills
			gsap.to('.hero-mockup', {
				y: -150,
				ease: 'none',
				scrollTrigger: {
					trigger: '.hero-parallax',
					start: 'top top',
					end: 'bottom top',
					scrub: true
				}
			});

			// Foreground hills + clouds rise SLOWLY — stays closer to viewer, mockup escapes behind it
			gsap.to('.hero-fg-group', {
				y: -90,
				ease: 'none',
				scrollTrigger: {
					trigger: '.hero-parallax',
					start: 'top top',
					end: 'bottom top',
					scrub: true
				}
			});

			// Background layer moves DOWN slowly to deepen parallax effect
			gsap.to('.hero-bg-landscape', {
				y: 60,
				ease: 'none',
				scrollTrigger: {
					trigger: '.hero-parallax',
					start: 'top top',
					end: 'bottom top',
					scrub: true
				}
			});
		}

		// ── Why Stats scroll-triggered entrance ──
		const statsEl = document.querySelector('.why-stats');
		if (statsEl) {
			const statsObs = new IntersectionObserver(
				(entries) => {
					entries.forEach((e) => {
						if (e.isIntersecting) {
							e.target.classList.add('is-visible');
							statsObs.unobserve(e.target);
						}
					});
				},
				{ threshold: 0.3 }
			);
			statsObs.observe(statsEl);
		}

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
			q: 'Can I see the daily report from outside the garden?',
			a: 'Yes. Open it on your phone, tablet, or laptop and check daily numbers from anywhere.'
		},
		{
			q: 'What does it cost?',
			a: 'Cost depends on your estate size and modules. Demo, setup, and training are free.'
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
	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- HERO - Clean editorial (keytail-style)                      -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<main id="main-content">
	<section class="hero-parallax relative w-full overflow-hidden" aria-label="Hero">
		<!-- Sky extension: covers the ENTIRE hero section from the very top (behind nav) -->
		<img
			src="/hero-sky.png"
			alt=""
			class="hero-sky-ext pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-top opacity-80 brightness-[1.4] saturate-[0.6]"
			width="1920"
			height="1080"
		/>

		<!-- Text content -->
		<div
			class="hero-text-content relative z-20 flex flex-col items-center px-6 pt-28 md:pt-32 lg:pt-36"
		>


			<h1
				class="hero-h1 mx-auto max-w-5xl text-center text-[3rem] font-medium leading-[0.9] tracking-[-0.05em] text-[#111111] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem]"
			>
				Run your tea garden.<br />Not your paperwork.
			</h1>

			<p
				class="hero-sub mx-auto mt-8 max-w-xl text-center text-lg leading-[1.25] tracking-[-0.01em] text-[#666666] sm:text-2xl"
				style="text-wrap: balance;"
			>
				Offline software for face attendance, smart weighing, payroll, factory, stores, and daily reporting.
			</p>

			<div class="hero-cta mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
				<a
					href={demoHref}
					class="flex w-full items-center justify-center gap-2 rounded-full bg-[#1B5E3B] px-6 py-4 shadow-[0_4px_20px_rgba(27,94,59,0.25)] transition duration-150 hover:bg-[#144723] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.97] sm:w-auto"
				>
					<span class="text-sm font-medium text-white"
						>Book Free Demo</span
					>
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
					href="#features"
					class="flex w-full items-center justify-center rounded-full border border-[#E4E4E7] bg-white px-6 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition duration-150 hover:border-[#D4D4D8] hover:bg-[#FAFAF7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.97] sm:w-auto"
				>
					<span class="text-sm font-medium text-[#0A0A0A]"
						>See How It Works</span
					>
				</a>
			</div>


		</div>

		<!-- Visuals container: Keytail-style 3D parallax sandwich -->
		<div
			class="hero-visuals relative mt-6 h-[540px] w-full overflow-visible md:mt-10 md:h-[720px] lg:h-[840px]"
		>
			<!-- Layer 1: Background landscape (bg.png) -->
			<!-- Top-masked so bg.png's own sky fades away, letting the sky extension show through above -->
			<img
				src="/bg.png"
				alt=""
				class="hero-bg-landscape pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover object-top"
				style="mask-image: linear-gradient(to bottom, transparent 0%, black 40%); -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 40%);"
				width="1920"
				height="1080"
			/>

			<!-- Subtle ambient glow behind the dashboard for contrast/readability -->
			<div
				class="pointer-events-none absolute top-[30%] left-1/2 z-[1] h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-white/40 blur-[100px]"
			></div>

			<!-- Layer 2: Product dashboard mockup -->
			<!-- Absolutely positioned so it floats in the middle of the composition -->
			<div
				class="hero-mockup absolute top-[8%] left-1/2 z-10 w-[90%] max-w-[1100px] -translate-x-1/2 md:top-[6%]"
			>
				<div
					class="hero-mockup-inner relative overflow-hidden rounded-xl border border-white/40 bg-[#1a1a1a] shadow-[0_30px_100px_rgba(0,0,0,0.18)] md:rounded-2xl"
				>
					<!-- Browser chrome bar -->
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
								<span class="text-[11px] text-white/30"
									>gardensuite.in/dashboard</span
								>
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

			<!-- Layer 3: Foreground hills -->
			<!-- Moves with parallax; fg.png is bottom-masked so the hills dissolve naturally -->
			<div
				class="hero-fg-group pointer-events-none absolute inset-x-0 bottom-0 z-20"
				style="height: 80%; min-height: 400px;"
			>
				<img
					src="/fg.png"
					alt=""
					class="absolute inset-0 h-full w-full object-cover object-bottom"
					width="1920"
					height="1080"
				/>
			</div>

			<!-- Static bottom fade: tall gradient that stays fixed at the bottom of hero-visuals -->
			<!-- Creates the Keytail-style dissolve from landscape into white page background -->
			<div
				class="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-[100px] bg-gradient-to-b from-transparent via-white/90 to-white md:h-[160px]"
			></div>
		</div>
	</section>
	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- PROOF STRIP                                                -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<section class="relative w-full border-b border-[#F0F0F0] bg-white py-12 md:py-16" aria-label="Trust indicators">
		<div class="mx-auto flex max-w-[1100px] flex-col items-center gap-8 px-6 md:flex-row md:justify-between md:gap-12 md:px-12">
			<div class="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-14">
				<div class="flex flex-col items-center gap-1">
					<span class="text-[32px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[36px]">20+</span>
					<span class="text-[13px] font-semibold tracking-[0.04em] text-[#71717A] uppercase">Tea Estates</span>
				</div>
				<div class="hidden h-8 w-px bg-[#E4E4E7] md:block"></div>
				<div class="flex flex-col items-center gap-1">
					<span class="text-[32px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[36px]">7</span>
					<span class="text-[13px] font-semibold tracking-[0.04em] text-[#71717A] uppercase">Regions</span>
				</div>
				<div class="hidden h-8 w-px bg-[#E4E4E7] md:block"></div>
				<div class="flex flex-col items-center gap-1">
					<span class="text-[32px] font-semibold tracking-[-0.03em] text-[#111111] md:text-[36px]">25+</span>
					<span class="text-[13px] font-semibold tracking-[0.04em] text-[#71717A] uppercase">Years</span>
				</div>
			</div>
			<div class="flex flex-col items-center gap-1 md:items-end">
				<span class="text-[14px] font-semibold text-[#3F3F46]">Built &amp; supported by Sarbani Associates</span>
				<span class="text-[13px] text-[#71717A]">Bagdogra, Siliguri</span>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- CONNECTED WORKFLOW                                         -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<section
		id="workflow"
		class="relative w-full scroll-mt-20 bg-white py-24 md:py-32"
		aria-labelledby="workflow-heading"
	>
		<div class="mx-auto max-w-[1100px] px-6 md:px-12">
			<div class="mb-16 max-w-[640px]">
				<h2
					id="workflow-heading"
					class="text-[40px] leading-[1.05] font-semibold tracking-[-0.04em] text-[#111111] md:text-[52px]"
					style="text-wrap: balance"
				>
					From face scan to daily report. Every step connected.
				</h2>
				<p class="mt-6 max-w-[520px] text-[17px] leading-[1.6] text-[#52525B]">
					GardenSuite links attendance, weighing, payroll, and reporting. Data flows from the field to the office without manual re-entry.
				</p>
			</div>

			<div class="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#F0F0F0] bg-[#F0F0F0] sm:grid-cols-2 lg:grid-cols-5">
				{#each [
					{ step: '01', title: 'Face verified', desc: 'Worker identity confirmed by face scan on mobile before hazira is marked.' },
					{ step: '02', title: 'Leaf weighed', desc: 'Smart scale sends weight directly to the linked worker record.' },
					{ step: '03', title: 'Records sync', desc: 'Attendance and weight data linked automatically. No register work.' },
					{ step: '04', title: 'Payroll ready', desc: 'Wages, PF, ESI, bonus calculated from real field data.' },
					{ step: '05', title: 'Owner sees report', desc: 'Daily MIS on phone, tablet, or laptop from anywhere.' }
				] as item}
					<div class="flex flex-col bg-white p-6 md:p-8">
						<span class="mb-4 text-[13px] font-semibold tracking-[0.06em] text-[#1B5E3B]">{item.step}</span>
						<h3 class="mb-2 text-[17px] font-semibold tracking-[-0.01em] text-[#111111]">{item.title}</h3>
						<p class="text-[14px] leading-[1.5] text-[#52525B]">{item.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- MODULE: FACE ATTENDANCE                                    -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<section
		id="features"
		class="relative w-full scroll-mt-20 bg-[#FAFAF7] py-24 md:py-32"
		aria-labelledby="mod-attendance-heading"
	>
		<div class="mx-auto max-w-[1100px] px-6 md:px-12">
			<div class="flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-16 lg:gap-20">
				<div class="flex-1">
					<span class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">Attendance</span>
					<h2
						id="mod-attendance-heading"
						class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px]"
						style="text-wrap: balance"
					>
						Face attendance stops proxy punching.
					</h2>
					<p class="mt-6 max-w-[440px] text-[17px] leading-[1.6] text-[#52525B]">
						The worker's face is scanned on a mobile phone before hazira is marked. If the face does not match, the attendance does not go through. Works without internet.
					</p>
					<ul class="mt-8 flex flex-col gap-3">
						{#each ['No buddy punching - real face, real hazira', 'Offline face matching on the phone', 'Section-wise attendance for field and factory'] as point}
							<li class="flex items-start gap-3 text-[15px] leading-[1.5] text-[#3F3F46]">
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="mt-0.5 shrink-0" aria-hidden="true"><path d="M3 8.5l3.5 3L13 5" stroke="#1B5E3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
								{point}
							</li>
						{/each}
					</ul>
					<a
						href="/products/attendance"
						class="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-[#111111] transition-colors duration-150 hover:text-[#1B5E3B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30"
					>
						Learn more
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M5 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
					</a>
				</div>
				<div class="w-full flex-1">
					<div class="overflow-hidden rounded-2xl border border-[#F0F0F0] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
						<img
							src="/img/home/face-attendance.png"
							alt="Supervisor using face scan on mobile to verify tea garden worker identity"
							class="h-auto w-full object-cover"
							width="1024"
							height="1024"
							loading="lazy"
						/>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- MODULE: SMART WEIGHING                                     -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<section
		class="relative w-full bg-white py-24 md:py-32"
		aria-labelledby="mod-weighing-heading"
	>
		<div class="mx-auto max-w-[1100px] px-6 md:px-12">
			<div class="flex flex-col-reverse items-center gap-12 md:flex-row md:items-start md:gap-16 lg:gap-20">
				<div class="w-full flex-1">
					<div class="overflow-hidden rounded-2xl border border-[#F0F0F0] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
						<img
							src="/img/home/smart-weighing.png"
							alt="Digital hanging scale weighing tea leaves with wireless sync to smartphone"
							class="h-auto w-full object-cover"
							width="1024"
							height="1024"
							loading="lazy"
						/>
					</div>
				</div>
				<div class="flex-1">
					<span class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">Weighing</span>
					<h2
						id="mod-weighing-heading"
						class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px]"
						style="text-wrap: balance"
					>
						Smart scale sends weight to the worker record.
					</h2>
					<p class="mt-6 max-w-[440px] text-[17px] leading-[1.6] text-[#52525B]">
						The wireless scale weighs the leaf bag and sends the number directly to the worker's record on the phone. No writing, no errors, no stolen weights.
					</p>
					<ul class="mt-8 flex flex-col gap-3">
						{#each ['Bluetooth connection to the phone', 'Weight linked to verified worker automatically', 'No manual register entry needed'] as point}
							<li class="flex items-start gap-3 text-[15px] leading-[1.5] text-[#3F3F46]">
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="mt-0.5 shrink-0" aria-hidden="true"><path d="M3 8.5l3.5 3L13 5" stroke="#1B5E3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
								{point}
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</section>
	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- MODULE: PAYROLL                                            -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<section
		class="relative w-full bg-[#FAFAF7] py-24 md:py-32"
		aria-labelledby="mod-payroll-heading"
	>
		<div class="mx-auto max-w-[1100px] px-6 md:px-12">
			<div class="flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-16 lg:gap-20">
				<div class="flex-1">
					<span class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">Payroll</span>
					<h2
						id="mod-payroll-heading"
						class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px]"
						style="text-wrap: balance"
					>
						Payroll calculated from real field data.
					</h2>
					<p class="mt-6 max-w-[440px] text-[17px] leading-[1.6] text-[#52525B]">
						Wages, PF, ESI, bonus, and deductions are ready from actual attendance and weight records. No calculator, no Excel rework at month end.
					</p>
					<ul class="mt-8 flex flex-col gap-3">
						{#each ['Hazira-based wage calculation', 'PF, ESI, bonus rules built in', 'Month-end payroll without rework'] as point}
							<li class="flex items-start gap-3 text-[15px] leading-[1.5] text-[#3F3F46]">
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="mt-0.5 shrink-0" aria-hidden="true"><path d="M3 8.5l3.5 3L13 5" stroke="#1B5E3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
								{point}
							</li>
						{/each}
					</ul>
					<a
						href="/products/payroll"
						class="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-[#111111] transition-colors duration-150 hover:text-[#1B5E3B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30"
					>
						Learn more
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M5 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
					</a>
				</div>
				<div class="w-full flex-1">
					<div class="overflow-hidden rounded-2xl border border-[#F0F0F0] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
						<img
							src="/img/home/payroll.png"
							alt="Automated payroll calculation connecting attendance and leaf weight records"
							class="h-auto w-full object-cover"
							width="1024"
							height="1024"
							loading="lazy"
						/>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- MODULE: DAILY MIS & FACTORY                                -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<section
		class="relative w-full bg-white py-24 md:py-32"
		aria-labelledby="mod-mis-heading"
	>
		<div class="mx-auto max-w-[1100px] px-6 md:px-12">
			<div class="flex flex-col-reverse items-center gap-12 md:flex-row md:items-start md:gap-16 lg:gap-20">
				<div class="w-full flex-1">
					<div class="overflow-hidden rounded-2xl border border-white/40 bg-[#1a1a1a] shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
						<!-- Browser chrome bar -->
						<div class="flex items-center gap-2 border-b border-white/[0.06] bg-[#1a1a1a] px-4 py-2.5">
							<div class="flex gap-1.5">
								<div class="h-2.5 w-2.5 rounded-full bg-[#FF5F57]"></div>
								<div class="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]"></div>
								<div class="h-2.5 w-2.5 rounded-full bg-[#28C840]"></div>
							</div>
							<div class="flex flex-1 justify-center">
								<div class="flex min-w-[200px] items-center gap-1.5 rounded-md bg-white/[0.06] px-3 py-1">
									<span class="text-[11px] text-white/30">gardensuite.in/dashboard</span>
								</div>
							</div>
						</div>
						<img
							src="/mis-dashboard.png"
							alt="GardenSuite daily MIS report dashboard showing plucking, production, and labour data"
							class="h-auto w-full object-cover object-top"
							width="1400"
							height="900"
							loading="lazy"
						/>
					</div>
				</div>
				<div class="flex-1">
					<span class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">Daily Report</span>
					<h2
						id="mod-mis-heading"
						class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px]"
						style="text-wrap: balance"
					>
						Daily report on any device.
					</h2>
					<p class="mt-6 max-w-[440px] text-[17px] leading-[1.6] text-[#52525B]">
						Open the daily MIS on your phone, tablet, or laptop. See plucking, production, labour, and factory numbers without calling the garden.
					</p>
					<ul class="mt-8 flex flex-col gap-3">
						{#each ['Updated daily with field and factory data', 'Works on phone, tablet, or laptop', 'Factory, stores, and field data in one view'] as point}
							<li class="flex items-start gap-3 text-[15px] leading-[1.5] text-[#3F3F46]">
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="mt-0.5 shrink-0" aria-hidden="true"><path d="M3 8.5l3.5 3L13 5" stroke="#1B5E3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
								{point}
							</li>
						{/each}
					</ul>
					<a
						href="/products/mis"
						class="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-[#111111] transition-colors duration-150 hover:text-[#1B5E3B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30"
					>
						Learn more
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M5 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- TRUST / WHY GARDENSUITE                                    -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<section
		id="about"
		class="relative w-full scroll-mt-20 bg-[#FAFAF7] py-24 md:py-32"
		aria-labelledby="trust-heading"
	>
		<div class="mx-auto max-w-[1100px] px-6 md:px-12">
			<div class="mb-12 max-w-[640px]">
				<span class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">Why GardenSuite</span>
				<h2
					id="trust-heading"
					class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px] lg:text-[52px]"
					style="text-wrap: balance"
				>
					Installed, trained, and supported on site.
				</h2>
			</div>

			<!-- Stats row with animated entrance -->
			<div class="why-stats mb-14 grid grid-cols-1 gap-6 sm:grid-cols-3 md:gap-10">
				{#each [
					{
						value: '25+',
						label: 'Years serving tea gardens',
						icon: 'calendar'
					},
					{
						value: '7',
						label: 'Regions covered',
						icon: 'map'
					},
					{
						value: '20+',
						label: 'Tea estates running GardenSuite',
						icon: 'building'
					}
				] as stat, i}
					<div
						class="why-stat-item flex items-center gap-4"
						style="--delay: {i * 120}ms"
					>
						<div class="why-stat-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1B5E3B]/8">
							{#if stat.icon === 'calendar'}
								<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
									<rect x="3" y="5" width="16" height="14" rx="2.5" stroke="#1B5E3B" stroke-width="1.5"/>
									<path d="M3 9.5h16" stroke="#1B5E3B" stroke-width="1.5"/>
									<path d="M7.5 3v3M14.5 3v3" stroke="#1B5E3B" stroke-width="1.5" stroke-linecap="round"/>
									<circle cx="11" cy="14" r="1.25" fill="#1B5E3B"/>
								</svg>
							{:else if stat.icon === 'map'}
								<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
									<path d="M11 2C7.14 2 4 5.14 4 9c0 5.25 7 11 7 11s7-5.75 7-11c0-3.86-3.14-7-7-7z" stroke="#1B5E3B" stroke-width="1.5" stroke-linejoin="round"/>
									<circle cx="11" cy="9" r="2.5" stroke="#1B5E3B" stroke-width="1.5"/>
								</svg>
							{:else}
								<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
									<path d="M3 19V7.5a2 2 0 012-2h4.5V4a1.5 1.5 0 011.5-1.5h0A1.5 1.5 0 0112.5 4v1.5H17a2 2 0 012 2V19" stroke="#1B5E3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M3 19h16" stroke="#1B5E3B" stroke-width="1.5" stroke-linecap="round"/>
									<rect x="7" y="9" width="2.5" height="2.5" rx="0.5" fill="#1B5E3B"/>
									<rect x="12.5" y="9" width="2.5" height="2.5" rx="0.5" fill="#1B5E3B"/>
									<rect x="7" y="13.5" width="2.5" height="2.5" rx="0.5" fill="#1B5E3B"/>
									<rect x="12.5" y="13.5" width="2.5" height="2.5" rx="0.5" fill="#1B5E3B"/>
								</svg>
							{/if}
						</div>
						<div>
							<div class="text-[28px] font-semibold tracking-[-0.04em] text-[#111111] md:text-[32px]" style="font-variant-numeric: tabular-nums">{stat.value}</div>
							<div class="text-[13px] font-medium leading-[1.4] text-[#71717A]">{stat.label}</div>
						</div>
					</div>
				{/each}
			</div>

			<div class="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#E4E4E7] bg-[#E4E4E7] md:grid-cols-3">
				{#each [
					{
						title: 'Tea garden workflow built in',
						desc: 'Hazira, plucking, payroll, stores, and factory - the way gardens already run.'
					},
					{
						title: 'Runs offline at the garden',
						desc: 'Attendance, weighing, and payroll continue even when the internet drops.'
					},
					{
						title: 'Setup and support on site',
						desc: 'Sarbani Associates installs, trains staff, and supports rollout at the garden.'
					}
				] as item}
					<div class="bg-white p-6 md:p-8">
						<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#1B5E3B]/8">
							<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
								<path d="M9 2.5l5 2.2v3.3c0 3.2-1.9 5.7-5 7.5-3.1-1.8-5-4.3-5-7.5V4.7L9 2.5z" stroke="#1B5E3B" stroke-width="1.5" stroke-linejoin="round"/>
								<path d="M6.4 8.9l1.7 1.7 3.5-3.7" stroke="#1B5E3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</div>
						<h3 class="text-[17px] font-semibold leading-[1.35] text-[#111111]">{item.title}</h3>
						<p class="mt-2 text-[14px] leading-[1.55] text-[#52525B]">{item.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- FAQ                                                        -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<section
		class="relative w-full bg-white py-24 md:py-32"
		aria-labelledby="faq-heading"
	>
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
		class="relative w-full scroll-mt-20 bg-[#FAFAF7] px-6 py-24 md:px-12 md:py-32"
		aria-labelledby="cta-heading"
	>
		<div class="mx-auto flex max-w-[640px] flex-col items-center text-center">
			<h2
				id="cta-heading"
				class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px] lg:text-[52px]"
				style="text-wrap: balance"
			>
				See it on your own numbers.
			</h2>
			<p class="mt-6 max-w-[480px] text-[17px] leading-[1.6] text-[#52525B]">
				We will show how GardenSuite handles attendance, weights, payroll, factory, and the daily report at your garden. Demo, setup, and training are free.
			</p>
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
		</div>
	</section>
	</main>
</div>
