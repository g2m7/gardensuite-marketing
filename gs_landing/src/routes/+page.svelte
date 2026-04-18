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
    if (prefersReduced) { ready = true; return; }

    // ── Lenis smooth scroll (keytail-style lerped interpolation) ──
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 2,
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
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' }});
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
        ease: 'power2.out',
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
          scrub: true,
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
          scrub: true,
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
          scrub: true,
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
          scrub: true,
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

  // ─── Sticky Nav ───
  let navProgress = $state(0);
  let navScrollEndRatio = 0.3; // Tweak this variable: 0.3 = 30% of hero height
  let targetNavWidth = $state(0);
  let startNavWidth = $state(1400);
  let startNavPadding = $state(40);

  $effect(() => {
    const measureWidth = () => {
      // Find the main content container to dynamically match the nav width accurately
      const container = document.querySelector('.ps-section > div') as HTMLElement;
      if (container) {
        const style = window.getComputedStyle(container);
        const pl = parseFloat(style.paddingLeft);
        const pr = parseFloat(style.paddingRight);
        targetNavWidth = container.clientWidth - pl - pr;
      } else {
        targetNavWidth = Math.min(window.innerWidth - 48, 1100);
      }
      startNavWidth = Math.min(window.innerWidth, 1400);
      startNavPadding = window.innerWidth >= 768 ? 40 : 24;
    };

    const handler = () => {
      const hero = document.querySelector('.hero-parallax') as HTMLElement;
      const hHeight = hero ? hero.offsetHeight : 500;
      const endScroll = hHeight * navScrollEndRatio;
      
      let p = window.scrollY / endScroll;
      if (p < 0) p = 0;
      if (p > 1) p = 1;
      navProgress = p;
    };

    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', measureWidth, { passive: true });
    
    measureWidth();
    handler(); // Run once on init
    
    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', measureWidth);
    };
  });

  let currentNavWidth = $derived(startNavWidth - (startNavWidth - targetNavWidth) * navProgress);
  let currentNavPadding = $derived(startNavPadding - (startNavPadding - 16) * navProgress);

  let navStyles = $derived(`
    background-color: rgba(255, 255, 255, ${navProgress * 0.85});
    backdrop-filter: blur(${navProgress * 24}px);
    -webkit-backdrop-filter: blur(${navProgress * 24}px);
    width: ${currentNavWidth}px;
    top: ${navProgress * 16}px;
    border-radius: ${navProgress * 36}px;
    padding-left: ${currentNavPadding}px;
    padding-right: ${currentNavPadding}px;
    box-shadow: 0 ${navProgress * 8}px ${navProgress * 30}px rgba(0, 0, 0, ${navProgress * 0.08});
    border-color: rgba(0, 0, 0, ${navProgress * 0.08});
  `);



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


</script>

<svelte:head>
  <title>GardenSuite - Complete Tea Garden Management</title>
  <meta name="description" content="Face recognition attendance, automated payroll, and full ERP for tea gardens." />
</svelte:head>

<div class="flex overflow-clip w-full min-h-screen flex-col bg-[#FAFAF7] antialiased">

  <!-- ═══ Nav ═══ -->
  <nav
    class="fixed z-[60] flex items-center justify-between left-1/2 -translate-x-1/2 py-4 border border-solid"
    style={navStyles}
    aria-label="Main navigation"
  >
    <a href="/" class="flex items-center gap-2" aria-label="GardenSuite Home">
      <GsLogoAnimation class="h-7 w-auto shrink-0" />
      <span class="tracking-[-0.01em] font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-bold text-[18px] leading-[22px] text-[#0A0A0A]">GardenSuite</span>
    </a>
    <div class="hidden md:flex items-center gap-1">
      <div class="group relative">
        <button class="inline-flex h-10 items-center justify-center rounded-full px-4 text-[14px] font-['Inter'] font-semibold transition-colors duration-150 text-[#18181B] hover:bg-[#0000000A] hover:text-[#0A0A0A] focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 focus:outline-none" aria-label="Products menu">
          Products
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="ml-1.5 opacity-60 transition-transform duration-200 group-hover:rotate-180" aria-hidden="true"><path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
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
      <a href="#features" class="inline-flex h-10 items-center justify-center rounded-full px-4 text-[14px] font-['Inter'] font-semibold transition-colors duration-150 text-[#18181B] hover:bg-[#0000000A] hover:text-[#0A0A0A]">Features</a>
      <a href="#about" class="inline-flex h-10 items-center justify-center rounded-full px-4 text-[14px] font-['Inter'] font-semibold transition-colors duration-150 text-[#18181B] hover:bg-[#0000000A] hover:text-[#0A0A0A]">About</a>
    </div>
    <div class="flex items-center gap-2">
      <a href="#contact" class="hidden md:inline-flex h-10 items-center text-[14px] font-['Inter'] font-semibold mr-4 text-[#18181B] hover:text-[#0A0A0A] transition-colors focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 focus:outline-none rounded-md px-2">Contact</a>
      <a href="#contact" class="flex h-10 items-center justify-center rounded-full px-6 bg-[#1B5E3B] hover:bg-[#144723] active:scale-[0.97] transition shadow-[0_2px_8px_rgba(27,94,59,0.25)] focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 focus:outline-none">
        <span class="text-white font-['Inter'] font-semibold text-[14px] leading-none">Book a Demo</span>
      </a>
    </div>
  </nav>


  <!-- ═══════════════════════════════════════════════════════════ -->
  <!-- HERO - Clean editorial (keytail-style)                      -->
  <!-- ═══════════════════════════════════════════════════════════ -->
  <section class="hero-parallax w-full relative overflow-hidden" aria-label="Hero">

    <!-- Sky extension: covers the ENTIRE hero section from the very top (behind nav) -->
    <img src="/hero-sky.png" alt="" class="hero-sky-ext absolute inset-0 w-full h-full object-cover object-top brightness-[1.4] saturate-[0.6] opacity-80 z-0 pointer-events-none" width="1920" height="1080" />

    <!-- Text content -->
    <div class="hero-text-content relative z-20 flex flex-col items-center pt-28 md:pt-32 lg:pt-36 px-6 relative">
      <div class="hero-badge flex items-center rounded-full pr-3.5 pl-2.5 gap-2 bg-[#F0FDF4] border border-[#DCFCE7] py-1.5 shadow-[0_2px_10px_rgba(27,94,59,0.05)]">
        <span class="rounded-full py-0.5 px-2 bg-[#1B5E3B] text-white font-['Inter'] font-bold text-[11px] leading-[14px]">NEW</span>
        <span class="text-[#1B5E3B] font-['Inter'] font-medium text-[13px] leading-4">Version 3 is here</span>
      </div>

      <h1 class="hero-h1 mt-7 text-[40px] md:text-[64px] lg:text-[76px] text-center leading-[1.02] tracking-[-0.04em] text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-extrabold max-w-4xl" style="text-wrap: balance;">
        Tea garden management, reimagined.
      </h1>

      <p class="hero-sub mt-5 text-[16px] md:text-[18px] text-center leading-[1.6] max-w-[520px] text-[#71717A] font-['Inter']">
        Face attendance. Smart weighing. Automated payroll. One platform for your entire estate.
      </p>

      <div class="hero-cta flex items-center mt-8 gap-3">
        <a href="#contact" class="flex items-center rounded-full py-3.5 px-8 gap-2 bg-[#1B5E3B] hover:bg-[#144723] active:scale-[0.97] transition duration-150 shadow-[0_4px_20px_rgba(27,94,59,0.25)] focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 focus:outline-none">
          <span class="text-white font-['Inter'] font-semibold text-[14px] leading-[18px]">Book a Demo</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="shrink-0" aria-hidden="true"><path d="M5 2.5l4.5 4.5L5 11.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </a>
        <a href="#features" class="flex items-center rounded-full py-3.5 px-8 border border-[#E4E4E7] bg-white hover:bg-[#FAFAF7] hover:border-[#D4D4D8] active:scale-[0.97] transition duration-150 shadow-[0_1px_3px_rgba(0,0,0,0.04)] focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 focus:outline-none">
          <span class="text-[#0A0A0A] font-['Inter'] font-semibold text-[14px] leading-[18px]">See Features</span>
        </a>
      </div>
    </div>

    <!-- Visuals container: Keytail-style 3D parallax sandwich -->
    <div class="hero-visuals relative w-full h-[540px] md:h-[720px] lg:h-[840px] overflow-visible mt-6 md:mt-10">


      <!-- Layer 1: Background landscape (bg.png) -->
      <!-- Top-masked so bg.png's own sky fades away, letting the sky extension show through above -->
      <img src="/bg.png" alt="" class="hero-bg-landscape absolute inset-0 w-full h-full object-cover object-top z-[1] pointer-events-none" style="mask-image: linear-gradient(to bottom, transparent 0%, black 40%); -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 40%);" width="1920" height="1080" />

      <!-- Subtle ambient glow behind the dashboard for contrast/readability -->
      <div class="absolute top-[30%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-white/50 rounded-full blur-[120px] pointer-events-none z-[1]"></div>

      <!-- Layer 2: Product dashboard mockup -->
      <!-- Absolutely positioned so it floats in the middle of the composition -->
      <div class="hero-mockup absolute z-10 left-1/2 -translate-x-1/2 top-[8%] md:top-[6%] w-[90%] max-w-[1100px]">
        <div class="hero-mockup-inner relative rounded-xl md:rounded-2xl overflow-hidden border border-white/40 shadow-[0_30px_100px_rgba(0,0,0,0.18)] bg-[#1a1a1a]">
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
          <img src="/mis-dashboard.png" alt="GardenSuite MIS Dashboard" class="w-full h-auto object-cover object-top" width="1400" height="900" loading="eager" fetchpriority="high" />
        </div>
      </div>

      <!-- Layer 3: Foreground hills -->
      <!-- Moves with parallax; fg.png is bottom-masked so the hills dissolve naturally -->
      <div class="hero-fg-group absolute inset-x-0 bottom-0 z-20 pointer-events-none" style="height: 55%; min-height: 280px;">
        <img src="/fg.png" alt="" class="absolute inset-0 w-full h-full object-cover object-bottom" style="mask-image: linear-gradient(to bottom, black 75%, transparent 97%); -webkit-mask-image: linear-gradient(to bottom, black 75%, transparent 97%);" width="1920" height="1080" />
      </div>

      <!-- Static bottom fade: tall gradient that stays fixed at the bottom of hero-visuals -->
      <!-- Creates the Keytail-style dissolve from landscape into white page background -->
      <div class="absolute inset-x-0 bottom-0 z-[25] pointer-events-none h-[100px] md:h-[160px] bg-gradient-to-b from-transparent via-white/90 to-white"></div>

    </div>

  </section>


  <!-- ═══════════════════════════════════════════════════════════ -->
  <!-- THE PROBLEM (Obvious.ai / Keytail style)                  -->
  <!-- ═══════════════════════════════════════════════════════════ -->
  <section class="w-full bg-white relative pt-32 pb-32 md:pt-44 md:pb-44 overflow-hidden" aria-labelledby="problem-heading">
    <!-- Background depth glows -->
    <div class="absolute top-1/4 -left-[200px] w-[500px] h-[500px] bg-[#A1A1AA]/[0.03] rounded-full blur-[150px] pointer-events-none"></div>
    <div class="absolute bottom-1/3 -right-[150px] w-[400px] h-[400px] bg-[#1B5E3B]/[0.02] rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-[1100px] mx-auto px-6 md:px-12 flex flex-col items-center text-center relative z-10">
      <span class="gsap-reveal tracking-[0.08em] uppercase text-[#A1A1AA] font-['Inter'] font-semibold text-[12px] mb-6">The Old Way</span>
      <h2 id="problem-heading" class="gsap-reveal text-[36px] md:text-[44px] lg:text-[48px] tracking-[-0.04em] leading-[1.08] text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-extrabold max-w-[680px]" style="text-wrap: balance">
        Paper registers.<br class="hidden md:inline" /> Guesswork. Hours wasted.
      </h2>
      <p class="gsap-reveal mt-8 text-[15px] md:text-[16px] leading-[1.7] text-[#71717A] font-['Inter'] max-w-[520px]">
        Most tea gardens still rely on manual muster rolls, paper chits, and disconnected spreadsheets. It costs you money every single day.
      </p>

      <!-- Old Way Illustration -->
      <div class="gsap-reveal mt-20 md:mt-24 w-full flex justify-center relative h-[250px] md:h-[300px]">
        <div class="relative w-full max-w-[600px] h-full flex items-center justify-center -ml-12 md:-ml-0" style="perspective: 1000px;">
          <!-- Card 1: Messy Ledger -->
          <div class="absolute z-0 w-[240px] md:w-[280px] h-[160px] md:h-[200px] bg-[#FAFAF7] border border-[#E4E4E7] shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded flex flex-col p-4 opacity-80" style="transform: rotate(-12deg) translate(-20px, 10px);">
            <div class="w-full h-1 bg-[#D4D4D8] mb-2 rounded-full opacity-60"></div>
            <div class="w-3/4 h-1 bg-[#D4D4D8] mb-4 rounded-full opacity-60"></div>
            {#each Array(5) as _}
              <div class="w-full flex gap-2 mb-2">
                <div class="w-1/4 h-3 border-b border-[#E4E4E7]"></div>
                <div class="w-1/4 h-3 border-b border-[#E4E4E7]"></div>
                <div class="w-1/4 h-3 border-b border-[#E4E4E7]"></div>
                <div class="w-1/4 h-3 border-b border-[#E4E4E7] text-[6px] text-[#A1A1AA] flex items-end">SIGN</div>
              </div>
            {/each}
          </div>
          <!-- Card 2: Manual Record -->
          <div class="absolute z-10 w-[260px] md:w-[300px] h-[180px] md:h-[220px] bg-white border border-[#E4E4E7] shadow-[0_12px_40px_rgba(0,0,0,0.08)] flex flex-col p-5 opacity-90" style="transform: rotate(6deg) translate(20px, -10px);">
             <!-- scribbles -->
             <div class="w-1/2 h-1 bg-[#A1A1AA]/30 rounded mb-6"></div>
             {#each Array(6) as _}
              <div class="flex gap-2 mb-3 w-full">
                <div class="h-1 bg-[#F0F0F0] rounded w-full"></div>
                <div class="h-1 bg-[#D4D4D8] rounded w-[30%]"></div>
              </div>
             {/each}
          </div>
          <!-- Card 3: Cluttered Spreadsheet -->
          <div class="absolute z-20 w-[240px] md:w-[280px] h-[150px] md:h-[180px] bg-white border border-[#D4D4D8] shadow-[0_20px_50px_rgba(0,0,0,0.12)] rounded-sm flex flex-col" style="transform: rotate(-3deg) translate(25px, 25px);">
            <div class="flex-1 w-full flex flex-col gap-px bg-[#E4E4E7] p-px border-b border-[#D4D4D8]">
               {#each Array(5) as _}
                 <div class="flex gap-px w-full h-[18%]">
                    <div class="w-[30%] h-full bg-white flex items-center px-1"><div class="w-1/2 h-1 bg-[#D4D4D8] rounded"></div></div>
                    <div class="flex-1 h-full bg-white flex items-center px-1"><div class="w-full h-1 bg-[#F0F0F0] rounded"></div></div>
                    <div class="w-[20%] h-full bg-white flex items-center px-1"><div class="w-2/3 h-1 bg-red-200 rounded"></div></div>
                 </div>
               {/each}
            </div>
            <div class="h-8 w-full bg-[#FAFAF7] flex items-center justify-end px-3">
              <div class="text-[9px] text-[#A1A1AA] font-bold tracking-widest uppercase">Error #REF!</div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
        <!-- Minimal problem cards -->
        <div class="gsap-reveal flex flex-col items-center text-center p-8 rounded-3xl bg-gradient-to-br from-white to-[#FAFAF7] border border-[#F0F0F0] shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div class="flex items-center justify-center rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)] size-14 mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 8v4l3 3" stroke="#A1A1AA" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="12" r="9" stroke="#A1A1AA" stroke-width="1.5"/></svg>
          </div>
          <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-bold text-[18px] mb-3">Hours lost daily</h3>
          <p class="text-[14px] leading-[1.65] text-[#71717A] font-['Inter']">Manual attendance, weighing, and payroll calculations consume entire working days.</p>
        </div>
        <div class="gsap-reveal flex flex-col items-center text-center p-8 rounded-3xl bg-gradient-to-br from-white to-[#FAFAF7] border border-[#F0F0F0] shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div class="flex items-center justify-center rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)] size-14 mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#A1A1AA" stroke-width="1.5" stroke-linecap="round"/><circle cx="8.5" cy="7" r="4" stroke="#A1A1AA" stroke-width="1.5"/><path d="M20 8v6M23 11h-6" stroke="#A1A1AA" stroke-width="1.5" stroke-linecap="round"/></svg>
          </div>
          <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-bold text-[18px] mb-3">Proxy attendance</h3>
          <p class="text-[14px] leading-[1.65] text-[#71717A] font-['Inter']">No way to verify who showed up. Buddy punching silently drains your margins.</p>
        </div>
        <div class="gsap-reveal flex flex-col items-center text-center p-8 rounded-3xl bg-gradient-to-br from-white to-[#FAFAF7] border border-[#F0F0F0] shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div class="flex items-center justify-center rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)] size-14 mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3" stroke="#A1A1AA" stroke-width="1.5"/><path d="M4 10h16M10 10v10" stroke="#A1A1AA" stroke-width="1.5"/></svg>
          </div>
          <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-bold text-[18px] mb-3">Scattered records</h3>
          <p class="text-[14px] leading-[1.65] text-[#71717A] font-['Inter']">Attendance in one register, weights in another, payroll in Excel. Nothing connects.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════════════════════════ -->
  <!-- FEATURES BENTO (Obvious.ai style)                           -->
  <!-- ═══════════════════════════════════════════════════════════ -->
  <section id="features" class="w-full bg-[#FAFAF7] relative py-32 md:py-44 overflow-hidden scroll-mt-20" aria-labelledby="feat-heading">
    <!-- Subtle glow backgrounds -->
    <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#1B5E3B]/[0.05] to-transparent rounded-full pointer-events-none"></div>
    <div class="absolute bottom-1/4 -right-[100px] w-[500px] h-[500px] bg-[#C8DDB8]/[0.06] rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-[1100px] mx-auto px-6 md:px-12 relative z-10">
      <div class="flex flex-col items-center text-center mb-20 md:mb-28">
        <span class="gsap-reveal tracking-[0.08em] uppercase text-[#1B5E3B] font-['Inter'] font-semibold text-[12px] mb-6">The Solution</span>
        <h2 id="feat-heading" class="gsap-reveal text-[36px] md:text-[44px] lg:text-[48px] tracking-[-0.04em] leading-[1.08] text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-extrabold max-w-[680px]" style="text-wrap: balance">
          One platform replaces it all.
        </h2>
        <p class="gsap-reveal mt-8 text-[15px] md:text-[16px] leading-[1.7] text-[#71717A] font-['Inter'] max-w-[520px]">
          Six tightly integrated modules. Built specifically for the unique workflows of the tea industry.
        </p>
      </div>

      <!-- Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-6 gap-5">
        
        <!-- Large Card: Face Attendance -->
        <div class="feat-card col-span-1 md:col-span-4 rounded-[32px] p-10 md:p-12 bg-gradient-to-br from-white to-[#FAFAF7] border border-[#F0F0F0] shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 relative overflow-hidden group">
          <div class="absolute -right-20 -top-20 w-[400px] h-[400px] bg-[#1B5E3B]/[0.04] rounded-full blur-[80px] pointer-events-none transition duration-500 group-hover:bg-[#1B5E3B]/[0.08]"></div>
          
          <div class="flex flex-col md:flex-row h-full z-10 relative items-center gap-10">
            <div class="flex flex-col h-full max-w-[380px]">
              <div class="flex items-center justify-center rounded-2xl bg-[#FAFAF7] border border-[#F0F0F0] size-14 mb-8">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="#1A5C2E" stroke-width="1.5"/><path d="M12 11a2 2 0 100-4 2 2 0 000 4zM16 17v-1a4 4 0 00-8 0v1" stroke="#1A5C2E" stroke-width="1.5" stroke-linecap="round"/></svg>
              </div>
              <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-extrabold text-[24px] md:text-[28px] leading-tight mb-4 tracking-[-0.02em]">Face Attendance</h3>
              <p class="text-[15px] leading-[1.65] text-[#71717A] font-['Inter'] mb-8">Biometric face recognition that works completely offline. Verified identity in under 2 seconds, eliminating buddy punching instantly.</p>
              <a href="/products/attendance" class="mt-auto w-fit inline-flex items-center gap-2 text-[#0A0A0A] font-['Inter'] font-semibold text-[14px] hover:gap-3 hover:text-[#1A5C2E] transition duration-200 focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 focus:outline-none rounded-md px-1 py-0.5 -ml-1">
                See how it works <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M5 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </a>
            </div>
            
            <!-- Code Illustration: Face Scanner -->
            <div class="hidden md:flex flex-1 justify-end pr-4" style="perspective: 1000px;">
              <div class="relative w-full max-w-[220px] aspect-[3/4] flex items-center justify-center pt-8">
                <!-- Scanning card -->
                <div class="relative z-10 w-full h-full rounded-2xl bg-white/70 backdrop-blur-md border border-white shadow-[0_20px_50px_rgba(26,92,46,0.06)] flex flex-col items-center justify-center overflow-hidden transform group-hover:scale-105 group-hover:-rotate-y-3 transition-transform duration-700 ease-out">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" class="text-[#1B5E3B] opacity-50 mb-4"><path d="M9 3H5a2 2 0 0 0-2 2v4m18-4a2 2 0 0 0-2-2h-4m4 18a2 2 0 0 0 2-2v-4M3 15v4a2 2 0 0 0 2 2h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M8 21v-2a4 4 0 0 1 8 0v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                  <div class="flex flex-col gap-2 w-[60%] opacity-30 mt-2">
                    <div class="h-1.5 w-full bg-[#1B5E3B] rounded-full"></div>
                    <div class="h-1.5 w-2/3 bg-[#1B5E3B] rounded-full mx-auto"></div>
                  </div>
                  <!-- Scanner line -->
                  <div class="absolute top-0 left-0 w-full h-[60px] bg-gradient-to-b from-transparent to-[#1B5E3B]/10 border-b border-[#1B5E3B]/60" style="animation: scan 2.5s ease-in-out infinite;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Medium Card: Smart Weighing -->
        <div class="feat-card col-span-1 md:col-span-2 rounded-[32px] p-10 bg-gradient-to-br from-white to-[#FAFAF7] border border-[#F0F0F0] shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 relative overflow-hidden group">
          <div class="flex flex-col h-full z-10 relative">
            <div class="flex items-center justify-center rounded-2xl bg-[#FAFAF7] border border-[#F0F0F0] size-14 mb-8">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="6" width="16" height="12" rx="3" stroke="#1A5C2E" stroke-width="1.5"/><path d="M12 6L12 3" stroke="#1A5C2E" stroke-width="1.5" stroke-linecap="round"/></svg>
            </div>
            <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-extrabold text-[22px] leading-tight mb-4 tracking-[-0.02em]">Smart Weighing</h3>
            <p class="text-[15px] leading-[1.65] text-[#71717A] font-['Inter']">Bluetooth scale automatically links the exact leaf weight to the verified worker.</p>
            
            <!-- Code Illustration: Smart Scale -->
            <div class="relative mt-8 pt-6 flex flex-col items-center w-full" style="perspective: 1000px;">
              <!-- Syncing Mobile Hover -->
              <div class="relative z-20 w-28 pb-3 pt-4 rounded-lg bg-white border border-[#F0F0F0] shadow-[0_12px_24px_rgba(26,92,46,0.06)] flex flex-col items-center gap-1 mb-6" style="animation: float-slow 4s ease-in-out infinite;">
                <div class="text-[20px] font-extrabold text-[#0A0A0A] font-['Plus_Jakarta_Sans'] tracking-tight">24.5<span class="text-[12px] text-[#A1A1AA] ml-0.5">kg</span></div>
                <div class="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#F0FDF4] border border-[#DCFCE7]">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#1B5E3B] animate-pulse"></div>
                  <span class="text-[9px] font-bold text-[#1B5E3B] uppercase tracking-wider">Synced</span>
                </div>
              </div>
              <!-- Connection Waves -->
              <div class="absolute z-10 bottom-16 left-1/2 -translate-x-1/2 flex justify-center w-8 h-8 opacity-40 text-[#1B5E3B]">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="animate-pulse"><path d="M12 20v.01M8.5 16.5a5 5 0 017 0M5 13a10 10 0 0114 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
              </div>
              <!-- Scale Base Platform -->
              <div class="relative z-0 w-48 h-16 bg-gradient-to-b from-[#FAFAF7] to-[#F5F5F0] border border-[#E4E4E7] border-b-[6px] border-b-[#E4E4E7] rounded-3xl shadow-sm flex items-center justify-center transform transition-transform duration-500 group-hover:scale-[1.02]" style="transform: rotateX(60deg);">
                <div class="absolute inset-1.5 border border-[#E4E4E7]/60 rounded-2xl bg-white/40"></div>
                <div class="w-12 h-2 rounded-full bg-[#1B5E3B]/10"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- The other 4 cards as squares -->
        <div class="feat-card col-span-1 md:col-span-3 rounded-[32px] p-10 bg-gradient-to-br from-white to-[#FAFAF7] border border-[#F0F0F0] shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 relative overflow-hidden group flex flex-col">
          <div class="flex items-center justify-center rounded-2xl bg-[#FAFAF7] border border-[#F0F0F0] size-14 mb-6 relative z-10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3" stroke="#1A5C2E" stroke-width="1.5"/><path d="M4 10h16M8 10v10" stroke="#1A5C2E" stroke-width="1.5"/></svg>
          </div>
          <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-bold text-[20px] mb-3 tracking-[-0.01em] relative z-10">Automated Payroll</h3>
          <p class="text-[14px] leading-[1.65] text-[#71717A] font-['Inter'] relative z-10">Wages, deductions, PF, ESI, bonus - all instantly calculated with zero errors.</p>
          
          <!-- Code Illustration: Payroll Matrix -->
          <div class="mt-auto pt-10 flex flex-col w-full h-[120px] opacity-80" style="perspective: 500px;">
            <div class="flex-1 flex items-end justify-center gap-1.5 w-full relative z-10">
              <div class="w-1/6 bg-[#1A5C2E]/5 rounded-t-lg border-t border-l border-r border-[#1A5C2E]/10" style="height: 30%"></div>
              <div class="w-1/6 bg-[#1A5C2E]/10 rounded-t-lg border-t border-l border-r border-[#1A5C2E]/20" style="height: 45%"></div>
              <div class="w-1/6 bg-[#1A5C2E]/20 rounded-t-lg border-t border-l border-r border-[#1A5C2E]/30 origin-bottom" style="height: 60%; transform: rotateX(10deg);"></div>
              <div class="w-1/6 bg-gradient-to-t from-[#1B5E3B]/30 to-[#1B5E3B]/70 rounded-t-lg border-t border-l border-r border-[#1B5E3B]/80 relative flex justify-center -top-2 origin-bottom transition-transform duration-500 group-hover:scale-y-110 shadow-[0_-4px_12px_rgba(27,94,59,0.1)]" style="height: 90%; transform: rotateX(10deg);">
                <div class="absolute -top-7 bg-white px-2 py-0.5 rounded-md border border-[#F0F0F0] shadow-sm text-[10px] font-bold text-[#1A5C2E] tracking-tight whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">Ready</div>
              </div>
              <div class="w-1/6 bg-gradient-to-t from-[#1A5C2E] to-[rgba(26,92,46,0.85)] rounded-t-lg shadow-[0_0_20px_rgba(26,92,46,0.25)] origin-bottom" style="height: 110%; transform: rotateX(10deg) translateZ(5px);"></div>
            </div>
            <!-- X-Axis to ground the bars -->
            <div class="w-full h-px bg-gradient-to-r from-[#E4E4E7]/0 via-[#E4E4E7] to-[#E4E4E7]/0 mt-0 flex items-center justify-center gap-6">
              <div class="w-1 h-1 rounded-full bg-[#D4D4D8]"></div>
              <div class="w-1 h-1 rounded-full bg-[#D4D4D8]"></div>
              <div class="w-1 h-1 rounded-full bg-[#D4D4D8]"></div>
              <div class="w-1 h-1 rounded-full bg-[#D4D4D8]"></div>
            </div>
          </div>
        </div>

        <div class="feat-card col-span-1 md:col-span-3 rounded-[32px] p-10 bg-gradient-to-br from-white to-[#FAFAF7] border border-[#F0F0F0] shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1">
          <div class="flex items-center justify-center rounded-2xl bg-[#FAFAF7] border border-[#F0F0F0] size-14 mb-6 relative z-10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19V9l7-5 7 5v10" stroke="#1A5C2E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 19v-5h6v5" stroke="#1A5C2E" stroke-width="1.5"/></svg>
          </div>
          <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-bold text-[20px] mb-3 tracking-[-0.01em] relative z-10">Factory Accounts</h3>
          <p class="text-[14px] leading-[1.65] text-[#71717A] font-['Inter'] relative z-10">Deep production tracking and manufacturing cost analysis, end-to-end.</p>
          
          <!-- Code Illustration: Supply Chain Nodes -->
          <div class="mt-auto pt-10 flex flex-col w-full h-[120px] relative justify-center border-t border-[#F0F0F0] overflow-hidden -mx-10 px-10">
            <div class="absolute top-1/2 left-10 right-10 h-1 bg-[#E4E4E7] -translate-y-1/2 rounded-full overflow-hidden">
               <div class="h-full w-1/3 bg-[#1B5E3B]/40 rounded-full animate-pulse" style="animation: dash 3s linear infinite;"></div>
            </div>
            
            <div class="flex items-center justify-between h-full relative z-10">
              <div class="flex flex-col items-center gap-2 transform transition-transform duration-300 group-hover:-translate-y-1">
                <div class="w-10 h-10 rounded-full bg-white border-2 border-[#E4E4E7] shadow-[0_4px_12px_rgba(0,0,0,0.04)] flex items-center justify-center">
                   <div class="w-3 h-3 bg-[#A1A1AA] rounded-sm"></div>
                </div>
                <span class="text-[10px] text-[#A1A1AA] font-bold uppercase tracking-widest bg-white/80 rounded px-1">RAW</span>
              </div>
              
              <div class="flex flex-col items-center gap-2 transform transition-transform duration-300 group-hover:-translate-y-1 delay-100">
                <div class="w-12 h-12 rounded-full bg-white border-2 border-[#1B5E3B] shadow-[0_4px_12px_rgba(26,92,46,0.12)] flex items-center justify-center relative">
                   <div class="absolute inset-[-4px] rounded-full border border-[#1B5E3B]/30 animate-ping" style="animation-duration: 3s;"></div>
                   <div class="w-4 h-4 bg-[#1B5E3B] rounded-sm"></div>
                </div>
                <span class="text-[10px] text-[#1B5E3B] font-bold uppercase tracking-widest bg-white/80 rounded px-1">WIP</span>
              </div>

              <div class="flex flex-col items-center gap-2 transform transition-transform duration-300 group-hover:-translate-y-1 delay-200">
                <div class="w-10 h-10 rounded-full bg-white border-2 border-[#E4E4E7] shadow-[0_4px_12px_rgba(0,0,0,0.04)] flex items-center justify-center">
                   <div class="w-3 h-3 rounded-full bg-[#A1A1AA]"></div>
                </div>
                <span class="text-[10px] text-[#A1A1AA] font-bold uppercase tracking-widest bg-white/80 rounded px-1">PKG</span>
              </div>
            </div>
          </div>
          
          <style>
            @keyframes dash {
              to { stroke-dashoffset: -200; }
            }
            @keyframes float-slow {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-4px); }
            }
            @keyframes scan {
              0% { transform: translateY(-80px); }
              50% { transform: translateY(220px); }
              100% { transform: translateY(-80px); }
            }
          </style>
        </div>

      </div>

      <!-- Advanced Dashboard (spanning all 6 cols) -->
      <div class="feat-card col-span-1 md:col-span-6 rounded-[32px] p-10 bg-gradient-to-br from-[#1A5C2E] to-[#124220] border border-[#1A5C2E]/50 shadow-[0_12px_40px_rgba(26,92,46,0.15)] transition duration-300 hover:shadow-[0_20px_50px_rgba(26,92,46,0.25)] relative overflow-hidden group flex flex-col md:flex-row items-center md:items-stretch gap-10 min-h-[360px]">
        
        <!-- Text Content -->
        <div class="flex-1 relative z-10 flex flex-col justify-center max-w-md w-full">
          <div class="flex items-center justify-center rounded-2xl bg-white/10 border border-white/20 size-14 mb-6 relative z-10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="text-white" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/></svg>
          </div>
          <h3 class="text-white font-['Plus_Jakarta_Sans'] font-bold text-[28px] mb-4 tracking-[-0.01em] relative z-10">Advanced MIS Dashboard</h3>
          <p class="text-[15px] leading-[1.65] text-[#A1A1AA] font-['Inter'] relative z-10">Get a bird's-eye view of your entire operation, directly from your cloud portal. Daily pluck tracking, crop comparisons, and operational intelligence.</p>
        </div>

        <!-- Code Illustration: Dashboard Mockup -->
        <div class="flex-1 w-full relative h-[300px] md:h-auto overflow-hidden rounded-xl bg-[#09090B] border border-white/10 flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.5)] transform translate-y-6 md:translate-y-0 md:translate-x-6 group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-700 ease-out">
          <!-- Window Header -->
          <div class="w-full h-8 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
            <div class="w-2.5 h-2.5 rounded-full bg-[#3F3F46]"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-[#3F3F46]"></div>
            <div class="w-2.5 h-2.5 rounded-full bg-[#3F3F46]"></div>
          </div>
          
          <div class="p-6 h-full flex flex-col gap-4">
            <!-- Top stats row -->
            <div class="flex gap-4">
               <div class="h-16 flex-1 bg-white/5 rounded-lg border border-white/10 p-3 flex flex-col gap-2">
                 <div class="h-2 w-1/2 bg-white/20 rounded"></div>
                 <div class="h-4 w-3/4 bg-white/60 rounded"></div>
               </div>
               <div class="h-16 flex-1 bg-[#1B5E3B]/20 rounded-lg border border-[#1B5E3B]/30 p-3 flex flex-col gap-2">
                 <div class="h-2 w-1/2 bg-[#1B5E3B] rounded"></div>
                 <div class="h-4 w-5/6 bg-[#4ADE80] rounded"></div>
               </div>
               <div class="h-16 flex-1 bg-white/5 rounded-lg border border-white/10 p-3 flex flex-col gap-2">
                 <div class="h-2 w-1/2 bg-white/20 rounded"></div>
                 <div class="h-4 w-2/3 bg-white/60 rounded"></div>
               </div>
            </div>

            <!-- Big chart area -->
            <div class="flex-1 w-full bg-white/5 rounded-lg border border-white/10 flex items-end p-4 gap-2">
               {#each [30, 45, 60, 40, 80, 50, 90, 70, 65, 85, 45, 100] as height, i}
                 <div class="flex-1 bg-gradient-to-t from-[#1B5E3B]/40 to-[#4ADE80]/40 rounded-t-sm" style="height: {height}%; {i % 3 === 0 ? 'opacity: 1;' : 'opacity: 0.5;'}"></div>
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
  <section id="about" class="w-full bg-white scroll-mt-20 py-32 md:py-44 relative overflow-hidden" aria-labelledby="why-heading">
    <!-- Background depth -->
    <div class="absolute top-1/3 -right-[200px] w-[500px] h-[500px] bg-[#1B5E3B]/[0.02] rounded-full blur-[140px] pointer-events-none"></div>
    <div class="absolute bottom-1/4 -left-[150px] w-[400px] h-[400px] bg-[#C8DDB8]/[0.04] rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-[1100px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start gap-16 md:gap-24 relative z-10">
      <div class="md:w-[45%] shrink-0 md:sticky md:top-32">
        <span class="gsap-reveal tracking-[0.08em] uppercase text-[#A1A1AA] font-['Inter'] font-semibold text-[12px] inline-block mb-6">Why GardenSuite</span>
        <h2 id="why-heading" class="gsap-reveal text-[36px] md:text-[44px] lg:text-[48px] tracking-[-0.04em] leading-[1.08] text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-extrabold" style="text-wrap: balance">
          Built for tea gardens.<br/> Not adapted from something else.
        </h2>
        <p class="gsap-reveal mt-8 text-[15px] md:text-[16px] leading-[1.7] text-[#71717A] font-['Inter']">
          We understand hazira calculations, section-wise attendance, and factory costing because we've been doing this for over 25 years.
        </p>
      </div>
      <div class="flex flex-col md:w-[55%] gap-6">
        <div class="gsap-reveal flex gap-6 p-8 rounded-[24px] bg-gradient-to-br from-[#FAFAF7] to-[#F5F5F0] border border-[#F0F0F0] shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div class="flex items-center justify-center rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)] size-12 shrink-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 3a7 7 0 100 14 7 7 0 000-14zM10 7v3l2 2" stroke="#0A0A0A" stroke-width="1.5" stroke-linecap="round"/></svg>
          </div>
          <div>
            <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-bold text-[17px] mb-2">Offline first</h3>
            <p class="text-[14px] leading-[1.7] text-[#71717A] font-['Inter']">Full ERP works perfectly without internet. Syncs automatically in the background when connected.</p>
          </div>
        </div>
        <div class="gsap-reveal flex gap-6 p-8 rounded-[24px] bg-gradient-to-br from-[#FAFAF7] to-[#F5F5F0] border border-[#F0F0F0] shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div class="flex items-center justify-center rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)] size-12 shrink-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 14V6c0-1.1.9-2 2-2h8a2 2 0 012 2v8" stroke="#0A0A0A" stroke-width="1.5"/><path d="M2 14h16M10 14v4" stroke="#0A0A0A" stroke-width="1.5" stroke-linecap="round"/></svg>
          </div>
          <div>
            <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-bold text-[17px] mb-2">Cloud dashboard</h3>
            <p class="text-[14px] leading-[1.7] text-[#71717A] font-['Inter']">Daily MIS updates viewable from any device. Owners stay perfectly informed remotely.</p>
          </div>
        </div>
        <div class="gsap-reveal flex gap-6 p-8 rounded-[24px] bg-gradient-to-br from-[#FAFAF7] to-[#F5F5F0] border border-[#F0F0F0] shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div class="flex items-center justify-center rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)] size-12 shrink-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 13l3-3m0 0l-3-3m3 3H7" stroke="#0A0A0A" stroke-width="1.5" stroke-linecap="round"/><circle cx="10" cy="10" r="8" stroke="#0A0A0A" stroke-width="1.5"/></svg>
          </div>
          <div>
            <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-bold text-[17px] mb-2">Free setup &amp; training</h3>
            <p class="text-[14px] leading-[1.7] text-[#71717A] font-['Inter']">Our team visits the garden, configures everything, and trains your staff on site. Zero implementation fees.</p>
          </div>
        </div>
      </div>
    </div>
  </section>



  <!-- ═══════════════════════════════════════════════════════════ -->
  <!-- FAQ                                                         -->
  <!-- ═══════════════════════════════════════════════════════════ -->
  <section class="w-full bg-white py-32 md:py-44 relative overflow-hidden" aria-labelledby="faq-heading">
    <!-- Background depth -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1B5E3B]/[0.02] rounded-full blur-[140px] pointer-events-none"></div>

    <div class="max-w-[680px] mx-auto px-6 md:px-12 flex flex-col items-center gap-16 relative z-10">
      <h2 id="faq-heading" class="gsap-reveal text-[36px] md:text-[44px] text-center tracking-[-0.04em] leading-[1.08] text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-extrabold" style="text-wrap: balance">
        Common questions
      </h2>

      <div class="flex flex-col w-full">
        {#each faqs as faq, i}
          <div class="gsap-reveal border-b border-[#F0F0F0] last:border-b-0">
            <button
              class="w-full flex justify-between items-center py-6 gap-4 text-left cursor-pointer group focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 focus:outline-none"
              onclick={() => toggleFaq(i)}
              aria-expanded={openFaq === i}
            >
              <h3 class="text-[#0A0A0A] font-['Inter'] font-semibold text-[16px] md:text-[17px] leading-[1.4] transition-colors duration-150 group-hover:text-[#1A5C2E]">{faq.q}</h3>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="shrink-0 text-[#A1A1AA] transition-transform duration-300 {openFaq === i ? 'rotate-45' : ''}" aria-hidden="true"><path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </button>
            <div class="overflow-hidden transition-all duration-300 ease-out" style="max-height: {openFaq === i ? '160px' : '0px'}; opacity: {openFaq === i ? '1' : '0'}">
              <p class="text-[15px] leading-[1.7] text-[#71717A] font-['Inter'] pb-6">{faq.a}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════════════════════════ -->
  <!-- CTA (Obvious.ai style glassy light container instead of black) -->
  <!-- ═══════════════════════════════════════════════════════════ -->
  <section id="contact" class="w-full bg-[#FAFAF7] relative py-32 md:py-44 px-6 md:px-12 overflow-hidden scroll-mt-20" aria-labelledby="cta-heading">
    <div class="max-w-[1100px] mx-auto rounded-[40px] bg-gradient-to-br from-white to-[#FAFAF7] border border-[#E4E4E7]/60 shadow-[0_20px_80px_rgba(0,0,0,0.04)] relative overflow-hidden">
      <!-- Glows inside container -->
      <div class="absolute inset-0 pointer-events-none"><div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1B5E3B]/[0.06] rounded-full blur-[100px]"></div></div>
      
      <div class="cta-content flex flex-col items-center text-center py-28 md:py-36 px-6 relative z-10">
        <GsLogoAnimation class="h-10 w-auto mb-10 bg-white border border-[#F0F0F0] rounded-2xl p-2 shadow-[0_4px_20px_rgba(0,0,0,0.03)]" />
        <h2 id="cta-heading" class="text-[36px] md:text-[44px] lg:text-[48px] tracking-[-0.04em] leading-[1.08] text-[#0A0A0A] font-['Plus_Jakarta_Sans'] font-extrabold max-w-[680px]" style="text-wrap: balance">
          Ready to modernize<br class="hidden md:inline" /> your tea garden?
        </h2>
        <p class="text-[15px] md:text-[16px] text-center leading-[1.7] mt-8 max-w-[480px] text-[#71717A] font-['Inter']">
          Free demo. Free setup. Free training. Experience the GardenSuite difference with no risk.
        </p>
        <div class="flex flex-col sm:flex-row justify-center mt-12 gap-4 w-full sm:w-auto">
          <a href="#contact" class="flex items-center justify-center rounded-full py-3.5 px-9 bg-[#1A5C2E] hover:bg-[#144723] active:scale-[0.97] transition duration-150 shadow-[0_4px_20px_rgba(26,92,46,0.3)] focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 focus:outline-none">
            <span class="text-white font-['Inter'] font-semibold text-[15px] leading-none">Book a Demo</span>
          </a>
          <a href="mailto:contact@gardensuite.in" class="flex items-center justify-center rounded-full py-3.5 px-9 border border-[#E4E4E7] bg-white hover:bg-[#FAFAF7] hover:border-[#D4D4D8] active:scale-[0.97] transition duration-150 shadow-[0_2px_8px_rgba(0,0,0,0.02)] focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 focus:outline-none">
            <span class="text-[#0A0A0A] font-['Inter'] font-semibold text-[15px] leading-none">Contact Us</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</div>
