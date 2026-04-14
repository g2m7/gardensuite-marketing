<script lang="ts">
  import { onMount } from 'svelte';

  // ─── GSAP + ScrollTrigger ───
  let ready = $state(false);

  onMount(async () => {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { ready = true; return; }

    // ── Hero parallax cutout ──
    const heroSection = document.querySelector('.hero-parallax');
    if (heroSection) {
      // Text entrance
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' }});
      heroTl
        .from('.hero-badge', { opacity: 0, y: 20, duration: 0.6, delay: 0.2 })
        .from('.hero-h1', { opacity: 0, y: 50, duration: 0.9 }, '-=0.3')
        .from('.hero-sub', { opacity: 0, y: 30, duration: 0.7 }, '-=0.5')
        .from('.hero-cta', { opacity: 0, y: 24, duration: 0.6 }, '-=0.4');

      // Mockup entrance: scale up from behind the hills
      gsap.from('.hero-mockup', {
        scale: 0.85,
        opacity: 0,
        duration: 1.2,
        delay: 0.4,
        ease: 'power2.out',
      });

      // Hills entrance: fade in from below
      gsap.from('.hero-hills', {
        y: 80,
        opacity: 0,
        duration: 1.4,
        delay: 0.3,
        ease: 'power3.out',
      });

      // ── Scroll-driven parallax ──
      // Hero text fades out + moves up on scroll
      gsap.to('.hero-text-content', {
        y: -120,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-parallax',
          start: 'top top',
          end: '40% top',
          scrub: true,
        }
      });

      // Mockup: rises up faster (the reveal effect)
      gsap.to('.hero-mockup', {
        y: -400,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-parallax',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Hills: move up slower (foreground depth)
      gsap.to('.hero-hills', {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-parallax',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }

    // ── Problem/Solution pinned section ──
    // Pin the left "question" while right panels scroll
    if (window.innerWidth >= 768) {
      ScrollTrigger.create({
        trigger: '.ps-section',
        start: 'top top',
        end: 'bottom bottom',
        pin: '.ps-left',
        pinSpacing: false,
      });
    }

    // Animate each problem card in
    gsap.utils.toArray<HTMLElement>('.ps-card').forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        x: 60,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: card, start: 'top 80%' }
      });
    });

    // Solution reveal
    gsap.from('.solution-reveal', {
      opacity: 0,
      y: 60,
      scale: 0.96,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.solution-reveal', start: 'top 75%' }
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

    // ── Scrollytelling for "Why" section ──
    gsap.utils.toArray<HTMLElement>('.why-item').forEach((item) => {
      gsap.fromTo(item,
        { opacity: 0.15, x: -20 },
        {
          opacity: 1, x: 0,
          scrollTrigger: {
            trigger: item,
            start: 'top 75%',
            end: 'top 40%',
            scrub: true,
          }
        }
      );
    });

    // ── Trust count-up ──
    const countEl = document.querySelector('.count-up') as HTMLElement;
    if (countEl) {
      ScrollTrigger.create({
        trigger: countEl,
        start: 'top 80%',
        onEnter: () => {
          let n = 0;
          const timer = setInterval(() => {
            n += 1;
            if (n >= 20) { n = 20; clearInterval(timer); }
            countEl.textContent = n + '+';
          }, 50);
        },
        once: true,
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

    // ── CTA section ──
    gsap.from('.cta-content', {
      opacity: 0,
      y: 50,
      scale: 0.97,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.cta-content', start: 'top 80%' }
    });

    ready = true;
  });

  // ─── Sticky Nav ───
  let scrolled = $state(false);
  $effect(() => {
    const handler = () => { scrolled = window.scrollY > 20; };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  });

  // ─── FAQ Accordion ───
  let openFaq = $state<number | null>(null);
  function toggleFaq(i: number) { openFaq = openFaq === i ? null : i; }

  const faqs = [
    { q: 'Does it work without internet?', a: 'Yes. Full offline ERP + face attendance app. Syncs when connected.' },
    { q: 'How long does setup take?', a: 'Our team visits your garden, sets everything up in 1-2 days. Training included free.' },
    { q: 'Which regions do you cover?', a: 'Assam, Dooars, Terai, Darjeeling, Coochbehar, Uttar Dinajpur, Jalpaiguri.' },
    { q: 'Is there a cloud dashboard?', a: 'Yes. Daily MIS updates viewable from phone, tablet, or laptop.' },
    { q: 'What does it cost?', a: 'Depends on modules and estate size. Setup and training are always free. Contact us for a quote.' },
  ];

  const estates = [
    'Simulbarie T.E.', 'Longview T.E.', 'Rheabari T.E.', 'Mogulkata T.E.',
    'Atal T.E.', 'Naxalbari T.E.', 'Choibari T.E.', 'Chapar T.E.',
    'Tinbigha T.E.', 'Chandan T.E.', 'Pahargoomiah T.E.', 'Kamalpur T.E.',
    'Rahimpur T.E.', 'Debpara T.E.', 'Kurti T.E.', 'Looksan T.E.',
    'Subhasini T.E.', 'Doolahat T.E.', 'Thanjhora T.E.', 'Himalayan Agro',
  ];
  const regions = ['Darjeeling', 'Dooars', 'Terai', 'Assam', 'Coochbehar', 'Jalpaiguri', 'Uttar Dinajpur'];
</script>

<svelte:head>
  <title>GardenSuite - Complete Tea Garden Management</title>
  <meta name="description" content="Face recognition attendance, automated payroll, and full ERP for tea gardens. Trusted by 20+ estates." />
</svelte:head>

<div class="flex overflow-clip w-full min-h-screen flex-col bg-[#FAFAF7] antialiased">

  <!-- ═══ Nav ═══ -->
  <nav
    class="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between w-full py-4 px-6 md:px-14 transition-all duration-300 {scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-[#0000000A] shadow-[0_1px_3px_rgba(0,0,0,0.04)]' : ''}"
    aria-label="Main navigation"
  >
    <a href="/" class="flex items-center gap-1.5" aria-label="GardenSuite Home">
      <img src="/favicon.png" alt="" class="h-7 w-auto shrink-0" aria-hidden="true" />
      <span class="tracking-[-0.01em] font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-bold text-[17px] leading-[22px] transition-colors duration-300 {scrolled ? 'text-[#0A0A0A]' : 'text-white'}">GardenSuite</span>
      <span class="ml-0.5 rounded-sm py-0.5 px-2 font-['Inter'] font-bold text-[10px] leading-3 tracking-[0.04em] transition-colors duration-300 {scrolled ? 'bg-[#F0FDF4] text-[#1B5E3B]' : 'bg-white/15 text-white/90'}">V3</span>
    </a>
    <div class="hidden md:flex items-center gap-1">
      <div class="group relative">
        <button class="inline-flex items-center justify-center rounded-md px-4 py-2 text-[14px] font-['Inter'] font-medium transition-colors duration-150 hover:bg-[#0000000A] hover:text-[#0A0A0A] focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 focus:outline-none {scrolled ? 'text-[#71717A]' : 'text-white/70 hover:text-white hover:bg-white/10'}" aria-label="Products menu">
          Products
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="ml-1 opacity-60 transition-transform duration-200 group-hover:rotate-180" aria-hidden="true"><path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="pointer-events-none absolute left-1/2 top-full mt-1 w-[620px] -translate-x-1/2 opacity-0 invisible translate-y-1 scale-[0.97] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 ease-out origin-top border border-[#0000000F] shadow-[0_10px_30px_rgba(0,0,0,0.08)] bg-white rounded-xl p-3 z-50 flex gap-3">
          <div class="w-1/3 rounded-lg bg-gradient-to-b from-[#F0FDF4] to-[#DCFCE7] p-4 flex flex-col justify-between">
            <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#1A5C2E" class="w-8 h-8 mb-2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
            <div class="mt-4">
              <span class="block font-['Plus_Jakarta_Sans'] font-bold text-[#1A5C2E] text-base leading-tight">GardenSuite<br/>V3</span>
              <span class="block text-xs text-[#1A5C2E]/80 mt-1.5 leading-relaxed font-['Inter']">Complete ecosystem for modern tea gardens.</span>
            </div>
          </div>
          <div class="w-2/3 grid grid-cols-2 gap-1">
            <a href="/products/attendance" class="block p-3 rounded-lg hover:bg-[#FAFAF7] transition-colors group/item col-span-2"><div class="text-[13px] font-bold text-[#18181B] font-['Plus_Jakarta_Sans'] group-hover/item:text-[#1A5C2E] transition-colors">Face Attendance &amp; Smart Weighing</div><div class="text-xs text-[#71717A] mt-1 leading-relaxed font-['Inter']">Offline biometric + bluetooth weighing scales.</div></a>
            <a href="/products/payroll" class="block p-3 rounded-lg hover:bg-[#FAFAF7] transition-colors group/item"><div class="text-[13px] font-bold text-[#18181B] font-['Plus_Jakarta_Sans'] group-hover/item:text-[#1A5C2E] transition-colors">Automated Payroll</div><div class="text-xs text-[#71717A] mt-1 leading-relaxed font-['Inter']">Wages, deductions, PF - auto-calculated.</div></a>
            <a href="/products/factory" class="block p-3 rounded-lg hover:bg-[#FAFAF7] transition-colors group/item"><div class="text-[13px] font-bold text-[#18181B] font-['Plus_Jakarta_Sans'] group-hover/item:text-[#1A5C2E] transition-colors">Factory Accounts</div><div class="text-xs text-[#71717A] mt-1 leading-relaxed font-['Inter']">Production and manufacturing costs.</div></a>
            <a href="/products/stores" class="block p-3 rounded-lg hover:bg-[#FAFAF7] transition-colors group/item"><div class="text-[13px] font-bold text-[#18181B] font-['Plus_Jakarta_Sans'] group-hover/item:text-[#1A5C2E] transition-colors">Store Management</div><div class="text-xs text-[#71717A] mt-1 leading-relaxed font-['Inter']">Inventory and purchase orders.</div></a>
            <a href="/products/mis" class="block p-3 rounded-lg hover:bg-[#FAFAF7] transition-colors group/item"><div class="text-[13px] font-bold text-[#18181B] font-['Plus_Jakarta_Sans'] group-hover/item:text-[#1A5C2E] transition-colors">MIS Dashboard</div><div class="text-xs text-[#71717A] mt-1 leading-relaxed font-['Inter']">Cloud updates on any device.</div></a>
          </div>
        </div>
      </div>
      <a href="#features" class="inline-flex items-center justify-center rounded-md px-4 py-2 text-[14px] font-['Inter'] font-medium transition-colors duration-150 {scrolled ? 'text-[#71717A] hover:bg-[#0000000A] hover:text-[#0A0A0A]' : 'text-white/70 hover:text-white hover:bg-white/10'}">Features</a>
      <a href="#clients" class="inline-flex items-center justify-center rounded-md px-4 py-2 text-[14px] font-['Inter'] font-medium transition-colors duration-150 {scrolled ? 'text-[#71717A] hover:bg-[#0000000A] hover:text-[#0A0A0A]' : 'text-white/70 hover:text-white hover:bg-white/10'}">Clients</a>
      <a href="#about" class="inline-flex items-center justify-center rounded-md px-4 py-2 text-[14px] font-['Inter'] font-medium transition-colors duration-150 {scrolled ? 'text-[#71717A] hover:bg-[#0000000A] hover:text-[#0A0A0A]' : 'text-white/70 hover:text-white hover:bg-white/10'}">About</a>
    </div>
    <div class="flex items-center gap-2">
      <a href="#contact" class="hidden md:inline-block font-['Inter'] font-medium text-sm mr-4 transition-colors {scrolled ? 'text-[#71717A] hover:text-[#0A0A0A]' : 'text-white/70 hover:text-white'}">Contact</a>
      <a href="#contact" class="flex items-center rounded-full py-2.5 px-5 bg-[#1B5E3B] hover:bg-[#144723] active:scale-[0.97] transition-all duration-150 shadow-[0_2px_8px_rgba(27,94,59,0.25)]">
        <span class="text-white font-['Inter'] font-semibold text-[13px] leading-4">Book a Demo</span>
      </a>
    </div>
  </nav>


  <!-- ═══════════════════════════════════════════════════════════ -->
  <!-- HERO - Parallax Cutout                                      -->
  <!-- ═══════════════════════════════════════════════════════════ -->
  <section class="hero-parallax w-full relative h-[100svh] min-h-[700px] overflow-hidden" aria-label="Hero">

    <!-- LAYER 0: Dark atmospheric sky -->
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div class="absolute inset-0 bg-gradient-to-b from-[#0C1F12] via-[#142A1B] to-[#1B3A24]"></div>
      <!-- Subtle radial glow in center-top -->
      <div class="absolute top-[10%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#22C55E]/[0.06] rounded-full blur-[120px]"></div>
      <!-- Atmospheric haze at horizon -->
      <div class="absolute bottom-[30%] left-0 right-0 h-[300px] bg-gradient-to-t from-[#1B5E3B]/[0.08] to-transparent"></div>
    </div>

    <!-- LAYER 1: Product mockup (middle z, scrolls up faster) -->
    <!-- Positioned low so it starts mostly behind the hills and reveals on scroll -->
    <div class="hero-mockup absolute z-10 left-1/2 -translate-x-1/2 bottom-[-35%] md:bottom-[-30%] w-[85%] max-w-[900px]">
      <div class="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_20px_80px_rgba(0,0,0,0.5)] bg-[#1a1a1a]">
        <!-- Browser chrome bar -->
        <div class="flex items-center gap-2 px-4 py-2.5 bg-[#1a1a1a] border-b border-white/[0.06]">
          <div class="flex gap-1.5">
            <div class="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-[#28C840]"></div>
          </div>
          <div class="flex-1 flex justify-center">
            <div class="flex items-center gap-1.5 rounded-md bg-white/[0.06] px-3 py-1 min-w-[240px]">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 6h8M6 2v8" stroke="white" stroke-opacity="0.3" stroke-width="1.2" stroke-linecap="round"/></svg>
              <span class="text-white/30 font-['Inter'] text-[11px]">gardensuite.in/dashboard</span>
            </div>
          </div>
        </div>
        <img src="/hero-sign-in.png" alt="GardenSuite Dashboard" class="w-full h-auto object-cover object-top" width="1400" height="900" loading="eager" fetchpriority="high" />
      </div>
    </div>

    <!-- LAYER 2: Tea garden hills cutout (foreground, highest z) -->
    <div class="hero-hills absolute z-20 bottom-0 left-0 right-0 w-full pointer-events-none" style="height: 65%;">
      <img
        src="/hero-hills.png"
        alt=""
        aria-hidden="true"
        class="w-full h-full object-cover object-center"
        style="-webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 8%, rgba(0,0,0,0.5) 18%, rgba(0,0,0,0.85) 28%, black 38%, black 100%); mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 8%, rgba(0,0,0,0.5) 18%, rgba(0,0,0,0.85) 28%, black 38%, black 100%);"
      />
      <!-- Bottom gradient blending into next section -->
      <div class="absolute bottom-0 left-0 right-0 h-[160px] bg-gradient-to-t from-[#FAFAF7] via-[#FAFAF7]/90 to-transparent"></div>
    </div>

    <!-- LAYER 3: Hero text content (highest z, above everything) -->
    <div class="hero-text-content absolute z-30 inset-x-0 top-0 flex flex-col items-center pt-20 md:pt-24 lg:pt-28 px-6">
      <div class="hero-badge flex items-center rounded-full pr-3.5 pl-2.5 gap-2 bg-white/[0.08] backdrop-blur-md border border-white/[0.12] py-1.5">
        <span class="rounded-full py-0.5 px-2 bg-[#22C55E] text-white font-['Inter'] font-bold text-[11px] leading-[14px]">NEW</span>
        <span class="text-white/80 font-['Inter'] font-medium text-[13px] leading-4">Version 3 is here</span>
      </div>

      <h1 class="hero-h1 mt-6 text-[40px] md:text-[64px] lg:text-[76px] text-center leading-[1.02] tracking-[-0.04em] text-white font-['Plus_Jakarta_Sans'] font-extrabold max-w-4xl" style="text-wrap: balance; text-shadow: 0 2px 40px rgba(0,0,0,0.3);">
        Tea garden management, reimagined.
      </h1>

      <p class="hero-sub mt-5 text-[16px] md:text-[18px] text-center leading-[1.6] max-w-[520px] text-white/60 font-['Inter']">
        Face attendance. Smart weighing. Automated payroll. One platform for your entire estate.
      </p>

      <div class="hero-cta flex items-center mt-8 gap-3">
        <a href="#contact" class="flex items-center rounded-full py-3.5 px-8 gap-2 bg-white hover:bg-[#F0FDF4] active:scale-[0.97] transition-all duration-150 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          <span class="text-[#0A0A0A] font-['Inter'] font-semibold text-[14px] leading-[18px]">Book a Demo</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="shrink-0" aria-hidden="true"><path d="M5 2.5l4.5 4.5L5 11.5" stroke="#0A0A0A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </a>
        <a href="#features" class="flex items-center rounded-full py-3.5 px-8 bg-white/[0.08] backdrop-blur-sm border border-white/[0.15] hover:bg-white/[0.15] hover:border-white/[0.25] active:scale-[0.97] transition-all duration-150">
          <span class="text-white font-['Inter'] font-semibold text-[14px] leading-[18px]">See Features</span>
        </a>
      </div>
    </div>

    <!-- Scroll indicator - visible above hills -->
    <div class="absolute z-30 bottom-[38%] md:bottom-[40%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
      <div class="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center pt-1.5">
        <div class="w-1 h-2 rounded-full bg-white/50 animate-bounce"></div>
      </div>
    </div>

  </section>


  <!-- ═══════════════════════════════════════════════════════════ -->
  <!-- PROBLEM ↔ SOLUTION  (Asymmetric pinned scroll)             -->
  <!-- ═══════════════════════════════════════════════════════════ -->
  <section class="ps-section w-full bg-white" aria-labelledby="problem-heading">
    <div class="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
      <div class="flex flex-col md:flex-row gap-12 md:gap-20 py-28 md:py-0 md:min-h-[200vh]">

        <!-- Left: Pinned question (sticky on desktop) -->
        <div class="ps-left flex flex-col justify-center md:w-[45%] shrink-0 md:h-screen md:pt-0 pt-0">
          <span class="tracking-[0.1em] uppercase text-[#A1A1AA] font-['Inter'] font-semibold text-[12px] mb-5">The old way</span>
          <h2 id="problem-heading" class="text-[36px] md:text-[52px] tracking-[-0.03em] leading-[1.08] text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-extrabold" style="text-wrap: balance">
            Paper registers.<br/>Guesswork.<br/>Hours wasted.
          </h2>
          <p class="mt-6 text-[16px] leading-[1.65] text-[#71717A] font-['Inter'] max-w-[380px]">
            Most tea gardens still rely on manual muster rolls, paper chits, and disconnected spreadsheets.
          </p>
        </div>

        <!-- Right: Scrolling problem cards -->
        <div class="flex flex-col md:w-[55%] gap-8 md:py-[25vh]">
          <div class="ps-card flex flex-col rounded-2xl p-8 bg-[#FAFAF7] border border-[#F0F0F0]">
            <div class="flex items-center gap-3 mb-4">
              <div class="flex items-center justify-center rounded-xl bg-[#FEF2F2] size-11">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 4v6l4 2" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round"/><circle cx="10" cy="10" r="8" stroke="#DC2626" stroke-width="1.5"/></svg>
              </div>
              <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-bold text-[20px] leading-tight">Hours lost daily</h3>
            </div>
            <p class="text-[15px] leading-[1.6] text-[#71717A] font-['Inter']">Manual attendance, weighing, and payroll calculations consume entire working days every week.</p>
          </div>

          <div class="ps-card flex flex-col rounded-2xl p-8 bg-[#FAFAF7] border border-[#F0F0F0]">
            <div class="flex items-center gap-3 mb-4">
              <div class="flex items-center justify-center rounded-xl bg-[#FEF2F2] size-11">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M6 14l8-8M14 14L6 6" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round"/></svg>
              </div>
              <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-bold text-[20px] leading-tight">Proxy attendance</h3>
            </div>
            <p class="text-[15px] leading-[1.6] text-[#71717A] font-['Inter']">No way to verify who showed up. Buddy punching costs you money every month.</p>
          </div>

          <div class="ps-card flex flex-col rounded-2xl p-8 bg-[#FAFAF7] border border-[#F0F0F0]">
            <div class="flex items-center gap-3 mb-4">
              <div class="flex items-center justify-center rounded-xl bg-[#FEF2F2] size-11">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="3" y="3" width="14" height="14" rx="2" stroke="#DC2626" stroke-width="1.5"/><path d="M7 7h6M7 10h4" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round"/></svg>
              </div>
              <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-bold text-[20px] leading-tight">Scattered records</h3>
            </div>
            <p class="text-[15px] leading-[1.6] text-[#71717A] font-['Inter']">Attendance in one register, weights in another, payroll in Excel. Nothing connects.</p>
          </div>

          <!-- THE PIVOT: Solution card -->
          <div class="solution-reveal flex flex-col rounded-2xl p-8 bg-[#0A0A0A] border border-[#222] text-white">
            <span class="tracking-[0.1em] uppercase text-[#22C55E] font-['Inter'] font-semibold text-[12px] mb-3">The new way</span>
            <h3 class="font-['Plus_Jakarta_Sans'] font-extrabold text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.02em] mb-4" style="text-wrap: balance">
              One platform replaces it all.
            </h3>
            <p class="text-[15px] leading-[1.6] text-[#A1A1AA] font-['Inter'] max-w-[400px]">
              GardenSuite connects attendance, weighing, payroll, stores, factory, and accounts into one system.
            </p>
            <a href="#features" class="mt-6 inline-flex items-center gap-2 text-[#22C55E] font-['Inter'] font-semibold text-[14px] hover:gap-3 transition-all duration-200">
              See all modules
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M5 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>


  <!-- ═══════════════════════════════════════════════════════════ -->
  <!-- FEATURES                                                    -->
  <!-- ═══════════════════════════════════════════════════════════ -->
  <section id="features" class="w-full bg-[#FAFAF7] scroll-mt-20 relative overflow-hidden" aria-labelledby="feat-heading">
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1B5E3B]/[0.03] rounded-full blur-[100px] pointer-events-none"></div>
    <div class="absolute bottom-20 left-0 w-[400px] h-[400px] bg-[#22C55E]/[0.025] rounded-full blur-[80px] pointer-events-none"></div>
    <div class="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-28 md:py-36 relative z-10">
      <div class="flex flex-col items-center mb-16 md:mb-20">
        <span class="gsap-reveal tracking-[0.1em] uppercase text-[#A1A1AA] font-['Inter'] font-semibold text-[12px] mb-4">Six Modules</span>
        <h2 id="feat-heading" class="gsap-reveal text-[36px] md:text-[52px] text-center tracking-[-0.03em] leading-[1.08] text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-extrabold" style="text-wrap: balance">
          Everything your estate needs.
        </h2>
      </div>

      <!-- Bento: Hero card + 2 stacked -->
      <div class="flex flex-col md:flex-row gap-5 mb-5">
        <div class="feat-card md:w-[50%] shrink-0 flex flex-col rounded-2xl p-8 md:p-10 bg-gradient-to-br from-[#1B5E3B] to-[#0F3622] border border-[#2D7A4F]/30 shadow-[0_4px_20px_rgba(27,94,59,0.2)] transition-all duration-300 hover:shadow-[0_16px_50px_rgba(27,94,59,0.3)] hover:-translate-y-0.5 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-[200px] h-[200px] bg-[#22C55E]/10 rounded-full blur-[60px] pointer-events-none"></div>
          <div class="flex items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm size-12 mb-5 relative z-10">
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="7" r="4" stroke="#FFFFFF" stroke-width="1.5"/><path d="M3 18c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/></svg>
          </div>
          <h3 class="text-white font-['Plus_Jakarta_Sans'] font-bold text-[20px] leading-tight mb-3 relative z-10">Face Attendance</h3>
          <p class="text-[15px] leading-[1.6] text-white/70 font-['Inter'] mb-6 relative z-10">Biometric face recognition. Works completely offline. Verified identity in under 2 seconds.</p>
          <a href="/products/attendance" class="mt-auto inline-flex items-center gap-1.5 text-[#86EFAC] font-['Inter'] font-semibold text-[14px] hover:gap-2.5 transition-all duration-200 relative z-10">
            See how it works <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M5 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
        <div class="flex flex-col gap-5 grow">
          <div class="feat-card flex flex-col rounded-2xl p-7 bg-white border border-[#F0F0F0] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 grow">
            <div class="flex items-center justify-center rounded-xl bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] size-11 mb-4">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="3" y="6" width="14" height="10" rx="2" stroke="#1A5C2E" stroke-width="1.5"/><path d="M7 6V4a3 3 0 016 0v2" stroke="#1A5C2E" stroke-width="1.5"/></svg>
            </div>
            <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-bold text-[17px] mb-2">Smart Weighing</h3>
            <p class="text-[15px] leading-[1.6] text-[#71717A] font-['Inter']">Bluetooth scale auto-links leaf weight to verified workers.</p>
          </div>
          <div class="feat-card flex flex-col rounded-2xl p-7 bg-white border border-[#F0F0F0] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 grow">
            <div class="flex items-center justify-center rounded-xl bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] size-11 mb-4">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="3" y="3" width="14" height="14" rx="2" stroke="#1A5C2E" stroke-width="1.5"/><path d="M3 8h14M7 8v9" stroke="#1A5C2E" stroke-width="1.5"/></svg>
            </div>
            <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-bold text-[17px] mb-2">Automated Payroll</h3>
            <p class="text-[15px] leading-[1.6] text-[#71717A] font-['Inter']">Wages, deductions, PF, ESI, bonus - all auto-calculated.</p>
          </div>
        </div>
      </div>

      <!-- Bottom 3 cards -->
      <div class="flex flex-col md:flex-row gap-5">
        <div class="feat-card flex flex-col grow basis-0 rounded-2xl p-7 bg-white border border-[#F0F0F0] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-0.5">
          <div class="flex items-center justify-center rounded-xl bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] size-11 mb-4">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 16V8l6-4 6 4v8" stroke="#1A5C2E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 16v-4h4v4" stroke="#1A5C2E" stroke-width="1.5"/></svg>
          </div>
          <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-bold text-[17px] mb-2">Factory Accounts</h3>
          <p class="text-[15px] leading-[1.6] text-[#71717A] font-['Inter']">Production tracking and manufacturing cost analysis.</p>
        </div>
        <div class="feat-card flex flex-col grow basis-0 rounded-2xl p-7 bg-white border border-[#F0F0F0] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-0.5">
          <div class="flex items-center justify-center rounded-xl bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] size-11 mb-4">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="3" y="3" width="14" height="14" rx="2" stroke="#1A5C2E" stroke-width="1.5"/><path d="M3 10h14M10 3v14" stroke="#1A5C2E" stroke-width="1.5"/></svg>
          </div>
          <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-bold text-[17px] mb-2">Store Management</h3>
          <p class="text-[15px] leading-[1.6] text-[#71717A] font-['Inter']">Inventory, purchase orders, and issue tracking.</p>
        </div>
        <div class="feat-card flex flex-col grow basis-0 rounded-2xl p-7 bg-white border border-[#F0F0F0] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-0.5">
          <div class="flex items-center justify-center rounded-xl bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] size-11 mb-4">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M6 17a4 4 0 010-8 6 6 0 0112 1 3.5 3.5 0 01-1.5 6.5H6z" stroke="#1A5C2E" stroke-width="1.5"/></svg>
          </div>
          <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-bold text-[17px] mb-2">MIS Dashboard</h3>
          <p class="text-[15px] leading-[1.6] text-[#71717A] font-['Inter']">Daily cloud updates on any device.</p>
        </div>
      </div>
    </div>
  </section>


  <!-- ═══════════════════════════════════════════════════════════ -->
  <!-- WHY GARDENSUITE (Scrollytelling)                            -->
  <!-- ═══════════════════════════════════════════════════════════ -->
  <section id="about" class="w-full bg-white scroll-mt-20" aria-labelledby="why-heading">
    <div class="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-start py-28 md:py-36 gap-12 md:gap-24">
      <div class="md:w-[40%] shrink-0 md:sticky md:top-28">
        <span class="gsap-reveal tracking-[0.1em] uppercase text-[#A1A1AA] font-['Inter'] font-semibold text-[12px] inline-block mb-5">Why GardenSuite</span>
        <h2 id="why-heading" class="gsap-reveal text-[36px] md:text-[44px] tracking-[-0.03em] leading-[1.08] text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-extrabold" style="text-wrap: balance">
          Built for tea gardens.<br/> Not adapted from something else.
        </h2>
      </div>
      <div class="flex flex-col md:w-[60%] gap-0">
        <div class="why-item flex items-start gap-5 py-10 border-b border-[#F0F0F0]">
          <span class="shrink-0 font-['Plus_Jakarta_Sans'] font-bold text-[14px] text-[#1B5E3B] mt-0.5" style="font-variant-numeric: tabular-nums">01</span>
          <div>
            <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-bold text-[18px] mb-2">Offline first</h3>
            <p class="text-[15px] leading-[1.65] text-[#71717A] font-['Inter']">Full ERP without internet. Syncs automatically when connected.</p>
          </div>
        </div>
        <div class="why-item flex items-start gap-5 py-10 border-b border-[#F0F0F0]">
          <span class="shrink-0 font-['Plus_Jakarta_Sans'] font-bold text-[14px] text-[#1B5E3B] mt-0.5" style="font-variant-numeric: tabular-nums">02</span>
          <div>
            <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-bold text-[18px] mb-2">Cloud dashboard</h3>
            <p class="text-[15px] leading-[1.65] text-[#71717A] font-['Inter']">Daily MIS updates viewable from any device. Owners stay informed remotely.</p>
          </div>
        </div>
        <div class="why-item flex items-start gap-5 py-10 border-b border-[#F0F0F0]">
          <span class="shrink-0 font-['Plus_Jakarta_Sans'] font-bold text-[14px] text-[#1B5E3B] mt-0.5" style="font-variant-numeric: tabular-nums">03</span>
          <div>
            <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-bold text-[18px] mb-2">25 years of tea</h3>
            <p class="text-[15px] leading-[1.65] text-[#71717A] font-['Inter']">We understand hazira calculations, section-wise attendance, factory costing. No generic ERP does.</p>
          </div>
        </div>
        <div class="why-item flex items-start gap-5 py-10">
          <span class="shrink-0 font-['Plus_Jakarta_Sans'] font-bold text-[14px] text-[#1B5E3B] mt-0.5" style="font-variant-numeric: tabular-nums">04</span>
          <div>
            <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-bold text-[18px] mb-2">Free setup &amp; training</h3>
            <p class="text-[15px] leading-[1.65] text-[#71717A] font-['Inter']">Our team visits the garden, sets up everything, trains your staff on site.</p>
          </div>
        </div>
      </div>
    </div>
  </section>


  <!-- ═══════════════════════════════════════════════════════════ -->
  <!-- TRUSTED (Count + Marquee)                                   -->
  <!-- ═══════════════════════════════════════════════════════════ -->
  <section id="clients" class="w-full bg-[#FAFAF7] scroll-mt-20 overflow-hidden" aria-labelledby="trust-heading">
    <div class="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-center py-28 md:py-36 gap-10">
      <div class="flex flex-col items-center gap-4">
        <span class="count-up text-[64px] md:text-[80px] font-['Plus_Jakarta_Sans'] font-extrabold text-[#0A0A0A] tracking-[-0.04em] leading-none" style="font-variant-numeric: tabular-nums">0+</span>
        <h2 id="trust-heading" class="text-[17px] md:text-[19px] text-center text-[#71717A] font-['Inter'] font-medium">
          tea estates rely on GardenSuite every day
        </h2>
      </div>

      <!-- Marquee -->
      <div class="relative w-full flex flex-col gap-3.5 mt-6">
        <div class="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-[#FAFAF7] to-transparent z-10 pointer-events-none"></div>
        <div class="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-[#FAFAF7] to-transparent z-10 pointer-events-none"></div>
        <div class="flex w-fit animate-marquee hover:[animation-play-state:paused] gap-3.5">
          {#each Array(2) as _, i}
            <div class="flex gap-3.5 min-w-max" aria-hidden={i === 1}>
              {#each regions as region}
                <div class="flex items-center rounded-full py-2.5 px-6 bg-white border border-[#E4E4E7] shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all duration-200 hover:scale-[1.03] cursor-default">
                  <span class="text-[#3F3F46] font-['Inter'] text-sm font-semibold">{region}</span>
                </div>
              {/each}
            </div>
          {/each}
        </div>
        <div class="flex w-fit animate-marquee-reverse hover:[animation-play-state:paused] gap-3">
          {#each Array(2) as _, i}
            <div class="flex gap-3 min-w-max" aria-hidden={i === 1}>
              {#each estates as estate}
                <div class="flex items-center rounded-lg py-2.5 px-5 bg-white border border-[#F0F0F0] text-[#71717A] font-['Inter'] text-[13px] font-medium hover:text-[#18181B] hover:border-[#D4D4D8] transition-all duration-200 cursor-default shadow-[0_1px_2px_rgba(0,0,0,0.02)]">{estate}</div>
              {/each}
            </div>
          {/each}
        </div>
      </div>

      <p class="gsap-reveal text-[#A1A1AA] font-['Inter'] text-[14px] mt-4 font-medium">
        Darjeeling to Assam - serving tea estates since 2000.
      </p>
    </div>
  </section>


  <!-- ═══════════════════════════════════════════════════════════ -->
  <!-- FAQ                                                         -->
  <!-- ═══════════════════════════════════════════════════════════ -->
  <section class="w-full bg-white" aria-labelledby="faq-heading">
    <div class="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-center py-28 md:py-36 gap-14">
      <h2 id="faq-heading" class="gsap-reveal text-[36px] md:text-[44px] text-center tracking-[-0.03em] leading-[1.08] text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-extrabold" style="text-wrap: balance">
        Common questions.
      </h2>

      <div class="flex flex-col w-full max-w-[720px]">
        {#each faqs as faq, i}
          <div class="gsap-reveal border-b border-[#E4E4E7] last:border-b-0">
            <button
              class="w-full flex justify-between items-center py-5 gap-4 text-left cursor-pointer group focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 focus:outline-none"
              onclick={() => toggleFaq(i)}
              aria-expanded={openFaq === i}
            >
              <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-bold text-[16px] md:text-[17px] leading-[22px] group-hover:text-[#1A5C2E] transition-colors duration-150">{faq.q}</h3>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" class="shrink-0 text-[#A1A1AA] transition-transform duration-300 {openFaq === i ? 'rotate-45' : ''}" aria-hidden="true"><path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </button>
            <div class="overflow-hidden transition-all duration-300 ease-out" style="max-height: {openFaq === i ? '160px' : '0px'}; opacity: {openFaq === i ? '1' : '0'}">
              <p class="text-[15px] leading-[1.6] text-[#71717A] font-['Inter'] pb-5">{faq.a}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>


  <!-- ═══════════════════════════════════════════════════════════ -->
  <!-- CTA                                                         -->
  <!-- ═══════════════════════════════════════════════════════════ -->
  <section id="contact" class="w-full bg-[#0A0A0A] scroll-mt-20 relative overflow-hidden" aria-labelledby="cta-heading">
    <div class="absolute inset-0 pointer-events-none"><div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#1B5E3B]/[0.08] rounded-full blur-[120px]"></div></div>
    <div class="cta-content max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-center py-28 md:py-36 gap-7 relative z-10">
      <img src="/gardensuite-icon-white.svg" alt="" class="h-12 w-auto mb-2 opacity-80" aria-hidden="true" />
      <h2 id="cta-heading" class="text-[36px] md:text-[48px] text-center tracking-[-0.03em] leading-[1.08] text-white font-['Plus_Jakarta_Sans'] font-extrabold" style="text-wrap: balance">
        Ready to modernize<br class="hidden md:inline" /> your tea garden?
      </h2>
      <p class="text-[16px] text-center leading-[1.6] max-w-[480px] text-[#A1A1AA] font-['Inter']">
        Free demo. Free setup. Free training. No risk.
      </p>
      <div class="flex flex-wrap justify-center pt-3 gap-4">
        <a href="#contact" class="flex items-center rounded-full py-3.5 px-8 bg-[#1B5E3B] hover:bg-[#144723] active:scale-[0.97] transition-all duration-150">
          <span class="text-white font-['Inter'] font-semibold text-[15px]">Book a Demo</span>
        </a>
        <a href="mailto:contact@gardensuite.in" class="flex items-center rounded-full py-3.5 px-8 border border-[#333] hover:bg-[#1A1A1A] hover:border-[#555] active:scale-[0.97] transition-all duration-150">
          <span class="text-white font-['Inter'] font-semibold text-[15px]">Contact Us</span>
        </a>
      </div>
    </div>
  </section>
</div>
