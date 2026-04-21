<script lang="ts">
	import { onMount } from 'svelte';
	import GsLogoAnimation from '$lib/components/GsLogoAnimation.svelte';

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
				.from('.hero-badge', { opacity: 0, y: 20, duration: 0.6, delay: 0.2 })
				.from('.hero-h1', { opacity: 0, y: 50, duration: 0.9 }, '-=0.3')
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

		// ── Generic reveals ──
		gsap.utils.toArray<HTMLElement>('.gsap-reveal').forEach((el) => {
			gsap.from(el, {
				opacity: 0,
				y: 40,
				duration: 0.7,
				ease: 'power2.out',
				scrollTrigger: { trigger: el, start: 'top 85%' }
			});
		});

		// ── Feature cards stagger ──
		gsap.utils.toArray<HTMLElement>('.feat-card').forEach((card, i) => {
			gsap.from(card, {
				opacity: 0,
				y: 50,
				duration: 0.7,
				delay: i * 0.08,
				ease: 'power2.out',
				scrollTrigger: { trigger: card, start: 'top 85%' }
			});
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
			<div
				class="hero-badge flex items-center gap-2 rounded-full border border-[#DCFCE7] bg-[#F0FDF4] py-1.5 pr-3.5 pl-2.5 shadow-[0_2px_10px_rgba(27,94,59,0.05)]"
			>
				<span
					class="rounded-full bg-[#1B5E3B] px-2 py-0.5 font-['Inter'] text-[11px] leading-[14px] font-bold text-white"
					>TRUSTED</span
				>
				<span class="font-['Inter'] text-[13px] leading-4 font-medium text-[#1B5E3B]"
					>By tea gardens and Sarbani Associates</span
				>
			</div>

			<h1
				class="hero-h1 mt-7 max-w-4xl text-center font-['Plus_Jakarta_Sans'] text-[36px] leading-[1.05] font-extrabold tracking-[-0.04em] text-[#0A0A0A] md:text-[60px] lg:text-[72px]"
				style="text-wrap: balance;"
			>
				Every worker verified.<br class="hidden md:inline" /> Every leaf weighed.<br class="hidden lg:inline" /> Every number ready.
			</h1>

			<p
				class="hero-sub mt-5 max-w-[540px] text-center font-['Inter'] text-[16px] leading-[1.6] text-[#71717A] md:text-[18px]"
			>
				Face recognition attendance, wireless smart scale, offline ERP, and cloud MIS dashboard - one system for the entire tea garden.
			</p>

			<div class="hero-cta mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
				<a
					href={demoHref}
					class="flex w-full items-center justify-center gap-2 rounded-full bg-[#1B5E3B] px-8 py-3.5 shadow-[0_4px_20px_rgba(27,94,59,0.25)] transition duration-150 hover:bg-[#144723] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.97] sm:w-auto"
				>
					<span class="font-['Inter'] text-[14px] leading-[18px] font-semibold text-white"
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
					class="flex w-full items-center justify-center rounded-full border border-[#E4E4E7] bg-white px-8 py-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition duration-150 hover:border-[#D4D4D8] hover:bg-[#FAFAF7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.97] sm:w-auto"
				>
					<span class="font-['Inter'] text-[14px] leading-[18px] font-semibold text-[#0A0A0A]"
						>See How It Works</span
					>
				</a>
			</div>

			<div class="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
				<span
					class="font-['Inter'] text-[12px] font-semibold tracking-[0.04em] text-[#1B5E3B]"
					>20+ tea estates across 7 regions</span
				>
				<span class="hidden h-1 w-1 rounded-full bg-[#C8DDB8] md:block"></span>
				<span
					class="font-['Inter'] text-[12px] font-semibold tracking-[0.04em] text-[#1B5E3B]"
					>Face scan stops buddy punching</span
				>
				<span class="hidden h-1 w-1 rounded-full bg-[#C8DDB8] md:block"></span>
				<span
					class="font-['Inter'] text-[12px] font-semibold tracking-[0.04em] text-[#1B5E3B]"
					>Works offline</span
				>
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
								<span class="font-['Inter'] text-[11px] text-white/30"
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
				class="hero-fg-group pointer-events-none absolute inset-x-0 bottom-0 z-20 opacity-60"
				style="height: 40%; min-height: 200px;"
			>
				<img
					src="/fg.png"
					alt=""
					class="absolute inset-0 h-full w-full object-cover object-bottom"
					style="mask-image: linear-gradient(to bottom, black 75%, transparent 97%); -webkit-mask-image: linear-gradient(to bottom, black 75%, transparent 97%);"
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
	<!-- THE PROBLEM (Obvious.ai / Keytail style)                  -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<section
		class="relative w-full overflow-hidden bg-white pt-32 pb-32 md:pt-44 md:pb-44"
		aria-labelledby="problem-heading"
	>
		<!-- Background depth glows -->
		<div
			class="pointer-events-none absolute top-1/4 -left-[200px] h-[500px] w-[500px] rounded-full bg-[#A1A1AA]/[0.03] blur-[150px]"
		></div>
		<div
			class="pointer-events-none absolute -right-[150px] bottom-1/3 h-[400px] w-[400px] rounded-full bg-[#1B5E3B]/[0.02] blur-[120px]"
		></div>

		<div
			class="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center px-6 text-center md:px-12"
		>
			<span
				class="gsap-reveal mb-6 font-['Inter'] text-[12px] font-semibold tracking-[0.08em] text-[#A1A1AA] uppercase"
				>The Old Way</span
			>
			<h2
				id="problem-heading"
				class="gsap-reveal max-w-[680px] font-['Plus_Jakarta_Sans'] text-[36px] leading-[1.08] font-extrabold tracking-[-0.04em] text-[#0A0A0A] md:text-[44px] lg:text-[48px]"
				style="text-wrap: balance"
			>
				When problems hit,<br class="hidden md:inline" /> paper makes them worse.
			</h2>
			<p
				class="gsap-reveal mt-8 max-w-[520px] font-['Inter'] text-[15px] leading-[1.7] text-[#71717A] md:text-[16px]"
			>
				Labour trouble, bad weather, and factory stoppages already slow the day. Paper registers and
				broken Excel sheets slow it even more.
			</p>

			<!-- Old Way Illustration -->
			<div
				class="gsap-reveal relative mt-20 flex h-[250px] w-full justify-center md:mt-24 md:h-[300px]"
			>
				<div
					class="relative -ml-12 flex h-full w-full max-w-[600px] items-center justify-center md:-ml-0"
					style="perspective: 1000px;"
				>
					<!-- Card 1: Messy Ledger -->
					<div
						class="absolute z-0 flex h-[160px] w-[240px] flex-col rounded border border-[#E4E4E7] bg-[#FAFAF7] p-4 opacity-80 shadow-[0_8px_30px_rgba(0,0,0,0.06)] md:h-[200px] md:w-[280px]"
						style="transform: rotate(-12deg) translate(-20px, 10px);"
					>
						<div class="mb-2 h-1 w-full rounded-full bg-[#D4D4D8] opacity-60"></div>
						<div class="mb-4 h-1 w-3/4 rounded-full bg-[#D4D4D8] opacity-60"></div>
						{#each Array(5) as _}
							<div class="mb-2 flex w-full gap-2">
								<div class="h-3 w-1/4 border-b border-[#E4E4E7]"></div>
								<div class="h-3 w-1/4 border-b border-[#E4E4E7]"></div>
								<div class="h-3 w-1/4 border-b border-[#E4E4E7]"></div>
								<div
									class="flex h-3 w-1/4 items-end border-b border-[#E4E4E7] text-[6px] text-[#A1A1AA]"
								>
									SIGN
								</div>
							</div>
						{/each}
					</div>
					<!-- Card 2: Manual Record -->
					<div
						class="absolute z-10 flex h-[180px] w-[260px] flex-col border border-[#E4E4E7] bg-white p-5 opacity-90 shadow-[0_12px_40px_rgba(0,0,0,0.08)] md:h-[220px] md:w-[300px]"
						style="transform: rotate(6deg) translate(20px, -10px);"
					>
						<!-- scribbles -->
						<div class="mb-6 h-1 w-1/2 rounded bg-[#A1A1AA]/30"></div>
						{#each Array(6) as _}
							<div class="mb-3 flex w-full gap-2">
								<div class="h-1 w-full rounded bg-[#F0F0F0]"></div>
								<div class="h-1 w-[30%] rounded bg-[#D4D4D8]"></div>
							</div>
						{/each}
					</div>
					<!-- Card 3: Cluttered Spreadsheet -->
					<div
						class="absolute z-20 flex h-[150px] w-[240px] flex-col rounded-sm border border-[#D4D4D8] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] md:h-[180px] md:w-[280px]"
						style="transform: rotate(-3deg) translate(25px, 25px);"
					>
						<div
							class="flex w-full flex-1 flex-col gap-px border-b border-[#D4D4D8] bg-[#E4E4E7] p-px"
						>
							{#each Array(5) as _}
								<div class="flex h-[18%] w-full gap-px">
									<div class="flex h-full w-[30%] items-center bg-white px-1">
										<div class="h-1 w-1/2 rounded bg-[#D4D4D8]"></div>
									</div>
									<div class="flex h-full flex-1 items-center bg-white px-1">
										<div class="h-1 w-full rounded bg-[#F0F0F0]"></div>
									</div>
									<div class="flex h-full w-[20%] items-center bg-white px-1">
										<div class="h-1 w-2/3 rounded bg-red-200"></div>
									</div>
								</div>
							{/each}
						</div>
						<div class="flex h-8 w-full items-center justify-end bg-[#FAFAF7] px-3">
							<div class="text-[9px] font-bold tracking-widest text-[#A1A1AA] uppercase">
								Error #REF!
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-20 grid w-full grid-cols-1 gap-5 md:mt-24 md:grid-cols-3">
				<!-- Minimal problem cards -->
				<div
					class="gsap-reveal flex flex-col items-center rounded-3xl border border-[#F0F0F0] bg-gradient-to-br from-white to-[#FAFAF7] p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
				>
					<div
						class="mb-6 flex size-14 items-center justify-center rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
					>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"
							><path
								d="M12 8v4l3 3"
								stroke="#A1A1AA"
								stroke-width="1.5"
								stroke-linecap="round"
							/><circle cx="12" cy="12" r="9" stroke="#A1A1AA" stroke-width="1.5" /></svg
						>
					</div>
					<h3 class="mb-3 font-['Plus_Jakarta_Sans'] text-[18px] font-bold text-[#0A0A0A]">
						Time keeps leaking
					</h3>
					<p class="font-['Inter'] text-[14px] leading-[1.65] text-[#71717A]">
						Attendance, weighing, and payroll take hours when your team should be fixing the day.
					</p>
				</div>
				<div
					class="gsap-reveal flex flex-col items-center rounded-3xl border border-[#F0F0F0] bg-gradient-to-br from-white to-[#FAFAF7] p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
				>
					<div
						class="mb-6 flex size-14 items-center justify-center rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
					>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"
							><path
								d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
								stroke="#A1A1AA"
								stroke-width="1.5"
								stroke-linecap="round"
							/><circle cx="8.5" cy="7" r="4" stroke="#A1A1AA" stroke-width="1.5" /><path
								d="M20 8v6M23 11h-6"
								stroke="#A1A1AA"
								stroke-width="1.5"
								stroke-linecap="round"
							/></svg
						>
					</div>
					<h3 class="mb-3 font-['Plus_Jakarta_Sans'] text-[18px] font-bold text-[#0A0A0A]">
						Buddy punching happens
					</h3>
					<p class="font-['Inter'] text-[14px] leading-[1.65] text-[#71717A]">
						If you cannot verify the worker, you cannot trust the hazira.
					</p>
				</div>
				<div
					class="gsap-reveal flex flex-col items-center rounded-3xl border border-[#F0F0F0] bg-gradient-to-br from-white to-[#FAFAF7] p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
				>
					<div
						class="mb-6 flex size-14 items-center justify-center rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
					>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"
							><rect
								x="4"
								y="4"
								width="16"
								height="16"
								rx="3"
								stroke="#A1A1AA"
								stroke-width="1.5"
							/><path d="M4 10h16M10 10v10" stroke="#A1A1AA" stroke-width="1.5" /></svg
						>
					</div>
					<h3 class="mb-3 font-['Plus_Jakarta_Sans'] text-[18px] font-bold text-[#0A0A0A]">
						Numbers do not match
					</h3>
					<p class="font-['Inter'] text-[14px] leading-[1.65] text-[#71717A]">
						Attendance in one place, weights in another, payroll in Excel. Month end becomes a
						fight.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- PROOF BAND - Named Tea Estates                              -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<section class="relative w-full overflow-hidden bg-[#0F2E0C] py-20 md:py-28" aria-labelledby="proof-heading">
		<!-- Ambient glow -->
		<div class="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1B5E3B]/20 blur-[150px]"></div>

		<div class="relative z-10 mx-auto max-w-[1100px] px-6 md:px-12">
			<div class="mb-14 flex flex-col items-center text-center md:mb-16">
				<span class="gsap-reveal mb-5 font-['Inter'] text-[12px] font-semibold tracking-[0.08em] text-[#4ADE80]/60 uppercase">Real Gardens, Real Results</span>
				<h2 id="proof-heading" class="gsap-reveal max-w-[600px] font-['Plus_Jakarta_Sans'] text-[32px] leading-[1.08] font-extrabold tracking-[-0.04em] text-white md:text-[40px]" style="text-wrap: balance">
					Trusted by 20+ tea estates across 7 regions.
				</h2>
			</div>

			<div class="gsap-reveal grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4 lg:grid-cols-7">
				{#each [
					{ region: 'Darjeeling', estates: ['Simulbarie T.E.', 'Longview T.E.'] },
					{ region: 'Dooars', estates: ['Rheabari T.E.', 'Mogulkata T.E.', 'Rahimpur T.E.'] },
					{ region: 'Terai', estates: ['Atal T.E.', 'Naxalbari T.E.'] },
					{ region: 'Assam', estates: ['Choibari T.E.', 'Chapar T.E.'] },
					{ region: 'Coochbehar', estates: ['Tinbigha T.E.'] },
					{ region: 'Uttar Dinajpur', estates: ['Chandan T.E.'] },
					{ region: 'Jalpaiguri', estates: ['Himalayan Agro'] }
				] as group}
					<div class="flex flex-col gap-2">
						<span class="font-['Inter'] text-[11px] font-bold tracking-[0.06em] text-[#4ADE80]/50 uppercase">{group.region}</span>
						{#each group.estates as estate}
							<span class="font-['Inter'] text-[13px] leading-[1.5] font-medium text-white/70">{estate}</span>
						{/each}
					</div>
				{/each}
			</div>

			<div class="gsap-reveal mt-12 flex justify-center">
				<span class="font-['Inter'] text-[13px] font-medium text-white/40">and more across Eastern India</span>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- FEATURES BENTO                                              -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<section
		id="features"
		class="relative w-full scroll-mt-20 overflow-hidden bg-[#FAFAF7] py-32 md:py-44"
		aria-labelledby="feat-heading"
	>
		<!-- Subtle glow backgrounds -->
		<div
			class="bg-gradient-radial pointer-events-none absolute top-1/3 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full from-[#1B5E3B]/[0.05] to-transparent"
		></div>
		<div
			class="pointer-events-none absolute -right-[100px] bottom-1/4 h-[500px] w-[500px] rounded-full bg-[#C8DDB8]/[0.06] blur-[120px]"
		></div>

		<div class="relative z-10 mx-auto max-w-[1100px] px-6 md:px-12">
			<div class="mb-20 flex flex-col items-center text-center md:mb-28">
				<span
					class="gsap-reveal mb-6 font-['Inter'] text-[12px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
					>The Solution</span
				>
				<h2
					id="feat-heading"
					class="gsap-reveal max-w-[680px] font-['Plus_Jakarta_Sans'] text-[36px] leading-[1.08] font-extrabold tracking-[-0.04em] text-[#0A0A0A] md:text-[44px] lg:text-[48px]"
					style="text-wrap: balance"
				>
					One system.<br class="hidden md:inline" /> No chasing papers.
				</h2>
				<p
					class="gsap-reveal mt-8 max-w-[520px] font-['Inter'] text-[15px] leading-[1.7] text-[#71717A] md:text-[16px]"
				>
					Attendance, weights, payroll, factory, stores, and the daily report all stay connected.
				</p>
			</div>

			<!-- Bento Grid -->
			<div class="grid grid-cols-1 gap-5 md:grid-cols-6">
				<!-- Large Card: Face Attendance -->
				<div
					class="feat-card group relative col-span-1 overflow-hidden rounded-[32px] border border-[#F0F0F0] bg-gradient-to-br from-white to-[#FAFAF7] p-10 shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] md:col-span-4 md:p-12"
				>
					<div
						class="pointer-events-none absolute -top-20 -right-20 h-[400px] w-[400px] rounded-full bg-[#1B5E3B]/[0.04] blur-[80px] transition duration-500 group-hover:bg-[#1B5E3B]/[0.08]"
					></div>

					<div class="relative z-10 flex h-full flex-col items-center gap-10 md:flex-row">
						<div class="flex h-full max-w-[380px] flex-col">
							<div
								class="mb-8 flex size-14 items-center justify-center rounded-2xl border border-[#F0F0F0] bg-[#FAFAF7]"
							>
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"
									><circle cx="12" cy="12" r="9" stroke="#1A5C2E" stroke-width="1.5" /><path
										d="M12 11a2 2 0 100-4 2 2 0 000 4zM16 17v-1a4 4 0 00-8 0v1"
										stroke="#1A5C2E"
										stroke-width="1.5"
										stroke-linecap="round"
									/></svg
								>
							</div>
							<h3
								class="mb-4 font-['Plus_Jakarta_Sans'] text-[24px] leading-tight font-extrabold tracking-[-0.02em] text-[#0A0A0A] md:text-[28px]"
							>
								Face Attendance
							</h3>
							<p class="mb-8 font-['Inter'] text-[15px] leading-[1.65] text-[#71717A]">
								Stop buddy punching, even without internet. Real worker. Real hazira. No duplicate
								entry.
							</p>
							<a
								href="/products/attendance"
								class="mt-auto -ml-1 inline-flex w-fit items-center gap-2 rounded-md px-1 py-0.5 font-['Inter'] text-[14px] font-semibold text-[#0A0A0A] transition duration-200 hover:gap-3 hover:text-[#1A5C2E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30"
							>
								See how it works <svg
									width="14"
									height="14"
									viewBox="0 0 14 14"
									fill="none"
									aria-hidden="true"
									><path
										d="M5 3l4 4-4 4"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/></svg
								>
							</a>
						</div>

						<!-- Code Illustration: Face Scanner -->
						<div class="hidden flex-1 justify-end pr-4 md:flex" style="perspective: 1000px;">
							<div
								class="relative flex aspect-[1080/2400] w-full max-w-[220px] translate-y-4 items-center justify-center"
							>
								<div
									class="relative z-10 h-full w-full transform overflow-hidden rounded-2xl border-[3px] border-[#1A1A1A] bg-[#0A0A0A] shadow-[0_20px_50px_rgba(26,92,46,0.15)] transition-transform duration-700 ease-out group-hover:scale-[1.03] group-hover:-rotate-y-4"
								>
									<img
										src="/img/app/Screenshot_20260418-121621.png"
										alt="Face App Setup"
										class="h-full w-full object-cover"
										width="1080"
										height="2400"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Medium Card: Smart Weighing -->
				<div
					class="feat-card group relative col-span-1 overflow-hidden rounded-[32px] border border-[#F0F0F0] bg-gradient-to-br from-white to-[#FAFAF7] p-10 shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] md:col-span-2"
				>
					<div class="relative z-10 flex h-full flex-col">
						<div
							class="mb-8 flex size-14 items-center justify-center rounded-2xl border border-[#F0F0F0] bg-[#FAFAF7]"
						>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"
								><rect
									x="4"
									y="6"
									width="16"
									height="12"
									rx="3"
									stroke="#1A5C2E"
									stroke-width="1.5"
								/><path
									d="M12 6L12 3"
									stroke="#1A5C2E"
									stroke-width="1.5"
									stroke-linecap="round"
								/></svg
							>
						</div>
						<h3
							class="mb-4 font-['Plus_Jakarta_Sans'] text-[22px] leading-tight font-extrabold tracking-[-0.02em] text-[#0A0A0A]"
						>
							Smart Weighing
						</h3>
						<p class="font-['Inter'] text-[15px] leading-[1.65] text-[#71717A]">
							Scales connect automatically. No manual entry. No stolen weights.
						</p>

						<!-- Code Illustration: Smart Scale -->
						<div
							class="relative mt-8 flex w-full flex-col items-center pt-6"
							style="perspective: 1000px;"
						>
							<!-- Syncing Mobile Hover -->
							<div
								class="relative z-20 mb-6 flex w-28 flex-col items-center gap-1 rounded-lg border border-[#F0F0F0] bg-white pt-4 pb-3 shadow-[0_12px_24px_rgba(26,92,46,0.06)]"
								style="animation: float-slow 4s ease-in-out infinite;"
							>
								<div
									class="font-['Plus_Jakarta_Sans'] text-[20px] font-extrabold tracking-tight text-[#0A0A0A]"
								>
									24.5<span class="ml-0.5 text-[12px] text-[#A1A1AA]">kg</span>
								</div>
								<div
									class="flex items-center gap-1.5 rounded-full border border-[#DCFCE7] bg-[#F0FDF4] px-2 py-0.5"
								>
									<div class="h-1.5 w-1.5 animate-pulse rounded-full bg-[#1B5E3B]"></div>
									<span class="text-[9px] font-bold tracking-wider text-[#1B5E3B] uppercase"
										>Synced</span
									>
								</div>
							</div>
							<!-- Connection Waves -->
							<div
								class="absolute bottom-16 left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 justify-center text-[#1B5E3B] opacity-40"
							>
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="animate-pulse"
									><path
										d="M12 20v.01M8.5 16.5a5 5 0 017 0M5 13a10 10 0 0114 0"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
									/></svg
								>
							</div>
							<!-- Scale Base Platform -->
							<div
								class="relative z-0 flex h-16 w-48 transform items-center justify-center rounded-3xl border border-b-[6px] border-[#E4E4E7] border-b-[#E4E4E7] bg-gradient-to-b from-[#FAFAF7] to-[#F5F5F0] shadow-sm transition-transform duration-500 group-hover:scale-[1.02]"
								style="transform: rotateX(60deg);"
							>
								<div
									class="absolute inset-1.5 rounded-2xl border border-[#E4E4E7]/60 bg-white/40"
								></div>
								<div class="h-2 w-12 rounded-full bg-[#1B5E3B]/10"></div>
							</div>
						</div>
					</div>
				</div>

				<!-- The other 4 cards as squares -->
				<div
					class="feat-card group relative col-span-1 flex flex-col overflow-hidden rounded-[32px] border border-[#F0F0F0] bg-gradient-to-br from-white to-[#FAFAF7] p-10 shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] md:col-span-3"
				>
					<div
						class="relative z-10 mb-6 flex size-14 items-center justify-center rounded-2xl border border-[#F0F0F0] bg-[#FAFAF7]"
					>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"
							><rect
								x="4"
								y="4"
								width="16"
								height="16"
								rx="3"
								stroke="#1A5C2E"
								stroke-width="1.5"
							/><path d="M4 10h16M8 10v10" stroke="#1A5C2E" stroke-width="1.5" /></svg
						>
					</div>
					<h3
						class="relative z-10 mb-3 font-['Plus_Jakarta_Sans'] text-[20px] font-bold tracking-[-0.01em] text-[#0A0A0A]"
					>
						Automated Payroll
					</h3>
					<p class="relative z-10 font-['Inter'] text-[14px] leading-[1.65] text-[#71717A]">
						Hazira, rates, PF, ESI, bonus, and deductions are ready without calculator work.
					</p>

					<!-- Code Illustration: Payroll Matrix -->
					<div
						class="mt-auto flex h-[120px] w-full flex-col pt-10 opacity-80"
						style="perspective: 500px;"
					>
						<div class="relative z-10 flex w-full flex-1 items-end justify-center gap-1.5">
							<div
								class="w-1/6 rounded-t-lg border-t border-r border-l border-[#1A5C2E]/10 bg-[#1A5C2E]/5"
								style="height: 30%"
							></div>
							<div
								class="w-1/6 rounded-t-lg border-t border-r border-l border-[#1A5C2E]/20 bg-[#1A5C2E]/10"
								style="height: 45%"
							></div>
							<div
								class="w-1/6 origin-bottom rounded-t-lg border-t border-r border-l border-[#1A5C2E]/30 bg-[#1A5C2E]/20"
								style="height: 60%; transform: rotateX(10deg);"
							></div>
							<div
								class="relative -top-2 flex w-1/6 origin-bottom justify-center rounded-t-lg border-t border-r border-l border-[#1B5E3B]/80 bg-gradient-to-t from-[#1B5E3B]/30 to-[#1B5E3B]/70 shadow-[0_-4px_12px_rgba(27,94,59,0.1)] transition-transform duration-500 group-hover:scale-y-110"
								style="height: 90%; transform: rotateX(10deg);"
							>
								<div
									class="absolute -top-7 rounded-md border border-[#F0F0F0] bg-white px-2 py-0.5 text-[10px] font-bold tracking-tight whitespace-nowrap text-[#1A5C2E] opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100"
								>
									Ready
								</div>
							</div>
							<div
								class="w-1/6 origin-bottom rounded-t-lg bg-gradient-to-t from-[#1A5C2E] to-[rgba(26,92,46,0.85)] shadow-[0_0_20px_rgba(26,92,46,0.25)]"
								style="height: 110%; transform: rotateX(10deg) translateZ(5px);"
							></div>
						</div>
						<!-- X-Axis to ground the bars -->
						<div
							class="mt-0 flex h-px w-full items-center justify-center gap-6 bg-gradient-to-r from-[#E4E4E7]/0 via-[#E4E4E7] to-[#E4E4E7]/0"
						>
							<div class="h-1 w-1 rounded-full bg-[#D4D4D8]"></div>
							<div class="h-1 w-1 rounded-full bg-[#D4D4D8]"></div>
							<div class="h-1 w-1 rounded-full bg-[#D4D4D8]"></div>
							<div class="h-1 w-1 rounded-full bg-[#D4D4D8]"></div>
						</div>
					</div>
				</div>

				<div
					class="feat-card col-span-1 rounded-[32px] border border-[#F0F0F0] bg-gradient-to-br from-white to-[#FAFAF7] p-10 shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] md:col-span-3"
				>
					<div
						class="relative z-10 mb-6 flex size-14 items-center justify-center rounded-2xl border border-[#F0F0F0] bg-[#FAFAF7]"
					>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"
							><path
								d="M5 19V9l7-5 7 5v10"
								stroke="#1A5C2E"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/><path d="M9 19v-5h6v5" stroke="#1A5C2E" stroke-width="1.5" /></svg
						>
					</div>
					<h3
						class="relative z-10 mb-3 font-['Plus_Jakarta_Sans'] text-[20px] font-bold tracking-[-0.01em] text-[#0A0A0A]"
					>
						Factory Accounts
					</h3>
					<p class="relative z-10 font-['Inter'] text-[14px] leading-[1.65] text-[#71717A]">
						Track daily production and know your exact manufacturing cost.
					</p>

					<!-- Code Illustration: Supply Chain Nodes -->
					<div
						class="relative -mx-10 mt-auto flex h-[120px] w-full flex-col justify-center overflow-hidden border-t border-[#F0F0F0] px-10 pt-10"
					>
						<div
							class="absolute top-1/2 right-10 left-10 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-[#E4E4E7]"
						>
							<div
								class="h-full w-1/3 animate-pulse rounded-full bg-[#1B5E3B]/40"
								style="animation: dash 3s linear infinite;"
							></div>
						</div>

						<div class="relative z-10 flex h-full items-center justify-between">
							<div
								class="flex transform flex-col items-center gap-2 transition-transform duration-300 group-hover:-translate-y-1"
							>
								<div
									class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#E4E4E7] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
								>
									<div class="h-3 w-3 rounded-sm bg-[#A1A1AA]"></div>
								</div>
								<span
									class="rounded bg-white/80 px-1 text-[10px] font-bold tracking-widest text-[#A1A1AA] uppercase"
									>RAW</span
								>
							</div>

							<div
								class="flex transform flex-col items-center gap-2 transition-transform delay-100 duration-300 group-hover:-translate-y-1"
							>
								<div
									class="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#1B5E3B] bg-white shadow-[0_4px_12px_rgba(26,92,46,0.12)]"
								>
									<div
										class="absolute inset-[-4px] animate-ping rounded-full border border-[#1B5E3B]/30"
										style="animation-duration: 3s;"
									></div>
									<div class="h-4 w-4 rounded-sm bg-[#1B5E3B]"></div>
								</div>
								<span
									class="rounded bg-white/80 px-1 text-[10px] font-bold tracking-widest text-[#1B5E3B] uppercase"
									>WIP</span
								>
							</div>

							<div
								class="flex transform flex-col items-center gap-2 transition-transform delay-200 duration-300 group-hover:-translate-y-1"
							>
								<div
									class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#E4E4E7] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
								>
									<div class="h-3 w-3 rounded-full bg-[#A1A1AA]"></div>
								</div>
								<span
									class="rounded bg-white/80 px-1 text-[10px] font-bold tracking-widest text-[#A1A1AA] uppercase"
									>PKG</span
								>
							</div>
						</div>
					</div>

					<style>
						@keyframes dash {
							to {
								stroke-dashoffset: -200;
							}
						}
						@keyframes float-slow {
							0%,
							100% {
								transform: translateY(0);
							}
							50% {
								transform: translateY(-4px);
							}
						}
						@keyframes scan {
							0% {
								transform: translateY(-80px);
							}
							50% {
								transform: translateY(220px);
							}
							100% {
								transform: translateY(-80px);
							}
						}
					</style>
				</div>
			</div>

			<!-- Advanced Dashboard (spanning all 6 cols) -->
			<div
				class="feat-card group relative col-span-1 flex min-h-[360px] flex-col items-center gap-10 overflow-hidden rounded-[32px] border border-[#1A5C2E]/50 bg-gradient-to-br from-[#1A5C2E] to-[#124220] p-10 shadow-[0_12px_40px_rgba(26,92,46,0.15)] transition duration-300 hover:shadow-[0_20px_50px_rgba(26,92,46,0.25)] md:col-span-6 md:flex-row md:items-stretch"
			>
				<!-- Text Content -->
				<div class="relative z-10 flex w-full max-w-md flex-1 flex-col justify-center">
					<div
						class="relative z-10 mb-6 flex size-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10"
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							class="text-white"
							aria-hidden="true"
							><rect
								x="3"
								y="3"
								width="7"
								height="7"
								rx="1.5"
								stroke="currentColor"
								stroke-width="1.5"
							/><rect
								x="14"
								y="3"
								width="7"
								height="7"
								rx="1.5"
								stroke="currentColor"
								stroke-width="1.5"
							/><rect
								x="14"
								y="14"
								width="7"
								height="7"
								rx="1.5"
								stroke="currentColor"
								stroke-width="1.5"
							/><rect
								x="3"
								y="14"
								width="7"
								height="7"
								rx="1.5"
								stroke="currentColor"
								stroke-width="1.5"
							/></svg
						>
					</div>
					<h3
						class="relative z-10 mb-4 font-['Plus_Jakarta_Sans'] text-[28px] font-bold tracking-[-0.01em] text-white"
					>
						Daily Report Dashboard
					</h3>
					<p class="relative z-10 font-['Inter'] text-[15px] leading-[1.65] text-[#A1A1AA]">
						Open the daily report on your phone and see plucking, production, labour, and factory
						numbers fast.
					</p>
				</div>

				<!-- Code Illustration: Dashboard Mockup -->
				<div
					class="relative flex h-[300px] w-full flex-1 translate-y-6 transform flex-col overflow-hidden rounded-xl border border-white/10 bg-[#09090B] shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-out group-hover:-translate-x-2 group-hover:-translate-y-2 md:h-auto md:translate-x-6 md:translate-y-0"
				>
					<!-- Window Header -->
					<div class="flex h-8 w-full items-center gap-2 border-b border-white/10 bg-white/5 px-4">
						<div class="h-2.5 w-2.5 rounded-full bg-[#3F3F46]"></div>
						<div class="h-2.5 w-2.5 rounded-full bg-[#3F3F46]"></div>
						<div class="h-2.5 w-2.5 rounded-full bg-[#3F3F46]"></div>
					</div>

					<div class="flex h-full flex-col gap-4 p-6">
						<!-- Top stats row -->
						<div class="flex gap-4">
							<div
								class="flex h-16 flex-1 flex-col gap-2 rounded-lg border border-white/10 bg-white/5 p-3"
							>
								<div class="h-2 w-1/2 rounded bg-white/20"></div>
								<div class="h-4 w-3/4 rounded bg-white/60"></div>
							</div>
							<div
								class="flex h-16 flex-1 flex-col gap-2 rounded-lg border border-[#1B5E3B]/30 bg-[#1B5E3B]/20 p-3"
							>
								<div class="h-2 w-1/2 rounded bg-[#1B5E3B]"></div>
								<div class="h-4 w-5/6 rounded bg-[#4ADE80]"></div>
							</div>
							<div
								class="flex h-16 flex-1 flex-col gap-2 rounded-lg border border-white/10 bg-white/5 p-3"
							>
								<div class="h-2 w-1/2 rounded bg-white/20"></div>
								<div class="h-4 w-2/3 rounded bg-white/60"></div>
							</div>
						</div>

						<!-- Big chart area -->
						<div
							class="flex w-full flex-1 items-end gap-2 rounded-lg border border-white/10 bg-white/5 p-4"
						>
							{#each [30, 45, 60, 40, 80, 50, 90, 70, 65, 85, 45, 100] as height, i}
								<div
									class="flex-1 rounded-t-sm bg-gradient-to-t from-[#1B5E3B]/40 to-[#4ADE80]/40"
									style="height: {height}%; {i % 3 === 0 ? 'opacity: 1;' : 'opacity: 0.5;'}"
								></div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- WHY GARDENSUITE (Obvious style simple section)              -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<section
		id="about"
		class="relative w-full scroll-mt-20 overflow-hidden bg-white py-32 md:py-44"
		aria-labelledby="why-heading"
	>
		<!-- Background depth -->
		<div
			class="pointer-events-none absolute top-1/3 -right-[200px] h-[500px] w-[500px] rounded-full bg-[#1B5E3B]/[0.02] blur-[140px]"
		></div>
		<div
			class="pointer-events-none absolute bottom-1/4 -left-[150px] h-[400px] w-[400px] rounded-full bg-[#C8DDB8]/[0.04] blur-[120px]"
		></div>

		<div
			class="relative z-10 mx-auto flex max-w-[1100px] flex-col items-start gap-16 px-6 md:flex-row md:gap-24 md:px-12"
		>
			<div class="shrink-0 md:sticky md:top-32 md:w-[45%]">
				<span
					class="gsap-reveal mb-6 inline-block font-['Inter'] text-[12px] font-semibold tracking-[0.08em] text-[#A1A1AA] uppercase"
					>Why Managers Trust GardenSuite</span
				>
				<h2
					id="why-heading"
					class="gsap-reveal font-['Plus_Jakarta_Sans'] text-[36px] leading-[1.08] font-extrabold tracking-[-0.04em] text-[#0A0A0A] md:text-[44px] lg:text-[48px]"
					style="text-wrap: balance"
				>
					Built only for tea gardens.<br /> Backed by Sarbani Associates.
				</h2>
				<p
					class="gsap-reveal mt-8 font-['Inter'] text-[15px] leading-[1.7] text-[#71717A] md:text-[16px]"
				>
					GardenSuite is built and supported by Sarbani Associates. Trusted by 20+ tea estates
					across Assam, Dooars, Terai, Darjeeling, Coochbehar, Uttar Dinajpur, and Jalpaiguri.
				</p>
			</div>
			<div class="flex flex-col gap-6 md:w-[55%]">
				<div
					class="gsap-reveal flex gap-6 rounded-[24px] border border-[#F0F0F0] bg-gradient-to-br from-[#FAFAF7] to-[#F5F5F0] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
				>
					<div
						class="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
					>
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"
							><path
								d="M10 3a7 7 0 100 14 7 7 0 000-14zM10 7v3l2 2"
								stroke="#0A0A0A"
								stroke-width="1.5"
								stroke-linecap="round"
							/></svg
						>
					</div>
					<div>
						<h3 class="mb-2 font-['Plus_Jakarta_Sans'] text-[17px] font-bold text-[#0A0A0A]">
							Tea garden logic built in
						</h3>
						<p class="font-['Inter'] text-[14px] leading-[1.7] text-[#71717A]">
							Hazira, section-wise attendance, plucking weight, payroll, stores, and factory costing
							fit the way gardens already work.
						</p>
					</div>
				</div>
				<div
					class="gsap-reveal flex gap-6 rounded-[24px] border border-[#F0F0F0] bg-gradient-to-br from-[#FAFAF7] to-[#F5F5F0] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
				>
					<div
						class="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
					>
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"
							><path
								d="M4 14V6c0-1.1.9-2 2-2h8a2 2 0 012 2v8"
								stroke="#0A0A0A"
								stroke-width="1.5"
							/><path
								d="M2 14h16M10 14v4"
								stroke="#0A0A0A"
								stroke-width="1.5"
								stroke-linecap="round"
							/></svg
						>
					</div>
					<div>
						<h3 class="mb-2 font-['Plus_Jakarta_Sans'] text-[17px] font-bold text-[#0A0A0A]">
							Works without internet
						</h3>
						<p class="font-['Inter'] text-[14px] leading-[1.7] text-[#71717A]">
							If the line is down, work continues. Data syncs later when the internet returns.
						</p>
					</div>
				</div>
				<div
					class="gsap-reveal flex gap-6 rounded-[24px] border border-[#F0F0F0] bg-gradient-to-br from-[#FAFAF7] to-[#F5F5F0] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
				>
					<div
						class="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
					>
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"
							><path
								d="M10 13l3-3m0 0l-3-3m3 3H7"
								stroke="#0A0A0A"
								stroke-width="1.5"
								stroke-linecap="round"
							/><circle cx="10" cy="10" r="8" stroke="#0A0A0A" stroke-width="1.5" /></svg
						>
					</div>
					<div>
						<h3 class="mb-2 font-['Plus_Jakarta_Sans'] text-[17px] font-bold text-[#0A0A0A]">
							Sarbani Associates comes on site
						</h3>
						<p class="font-['Inter'] text-[14px] leading-[1.7] text-[#71717A]">
							Our team visits your garden, sets up the system, and trains your staff. Demo, setup,
							and training are free.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- FAQ                                                         -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<section
		class="relative w-full overflow-hidden bg-white py-32 md:py-44"
		aria-labelledby="faq-heading"
	>
		<!-- Background depth -->
		<div
			class="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1B5E3B]/[0.02] blur-[140px]"
		></div>

		<div
			class="relative z-10 mx-auto flex max-w-[680px] flex-col items-center gap-16 px-6 md:px-12"
		>
			<h2
				id="faq-heading"
				class="gsap-reveal text-center font-['Plus_Jakarta_Sans'] text-[36px] leading-[1.08] font-extrabold tracking-[-0.04em] text-[#0A0A0A] md:text-[44px]"
				style="text-wrap: balance"
			>
				Common questions
			</h2>

			<div class="flex w-full flex-col">
				{#each faqs as faq, i}
					<div class="gsap-reveal border-b border-[#F0F0F0] last:border-b-0">
						<button
							class="group flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30"
							onclick={() => toggleFaq(i)}
							aria-expanded={openFaq === i}
						>
							<h3
								class="font-['Inter'] text-[16px] leading-[1.4] font-semibold text-[#0A0A0A] transition-colors duration-150 group-hover:text-[#1A5C2E] md:text-[17px]"
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
							<p class="pb-6 font-['Inter'] text-[15px] leading-[1.7] text-[#71717A]">{faq.a}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!-- CTA (Obvious.ai style glassy light container instead of black) -->
	<!-- ═══════════════════════════════════════════════════════════ -->
	<section
		id="contact"
		class="relative w-full scroll-mt-20 overflow-hidden bg-[#FAFAF7] px-6 py-32 md:px-12 md:py-44"
		aria-labelledby="cta-heading"
	>
		<div
			class="relative mx-auto max-w-[1100px] overflow-hidden rounded-[40px] border border-[#E4E4E7]/60 bg-gradient-to-br from-white to-[#FAFAF7] shadow-[0_20px_80px_rgba(0,0,0,0.04)]"
		>
			<!-- Glows inside container -->
			<div class="pointer-events-none absolute inset-0">
				<div
					class="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1B5E3B]/[0.06] blur-[100px]"
				></div>
			</div>

			<div
				class="cta-content relative z-10 flex flex-col items-center px-6 py-28 text-center md:py-36"
			>
				<GsLogoAnimation
					class="mb-10 h-10 w-auto rounded-2xl border border-[#F0F0F0] bg-white p-2 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
				/>
				<h2
					id="cta-heading"
					class="max-w-[680px] font-['Plus_Jakarta_Sans'] text-[36px] leading-[1.08] font-extrabold tracking-[-0.04em] text-[#0A0A0A] md:text-[44px] lg:text-[48px]"
					style="text-wrap: balance"
				>
					See it on your own numbers.
				</h2>
				<p
					class="mt-8 max-w-[480px] text-center font-['Inter'] text-[15px] leading-[1.7] text-[#71717A] md:text-[16px]"
				>
					We will show how GardenSuite handles attendance, weights, payroll, factory, and the daily
					report. Demo, setup, and training are free.
				</p>
				<div class="mt-12 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
					<a
						href={demoHref}
						class="flex items-center justify-center rounded-full bg-[#1A5C2E] px-9 py-3.5 shadow-[0_4px_20px_rgba(26,92,46,0.3)] transition duration-150 hover:bg-[#144723] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.97]"
					>
						<span class="font-['Inter'] text-[15px] leading-none font-semibold text-white"
							>Book Free Demo</span
						>
					</a>
					<a
						href="mailto:contact@gardensuite.in"
						class="flex items-center justify-center rounded-full border border-[#E4E4E7] bg-white px-9 py-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition duration-150 hover:border-[#D4D4D8] hover:bg-[#FAFAF7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 active:scale-[0.97]"
					>
						<span class="font-['Inter'] text-[15px] leading-none font-semibold text-[#0A0A0A]"
							>Email Us</span
						>
					</a>
				</div>
			</div>
		</div>
	</section>
	</main>
</div>
