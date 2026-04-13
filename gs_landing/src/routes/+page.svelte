<script lang="ts">
  import { onMount } from 'svelte';

  // ─── Scroll Reveal (IntersectionObserver) ───
  let revealElements: HTMLElement[] = [];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });

  // ─── Sticky Nav Scroll State ───
  let scrolled = $state(false);
  
  $effect(() => {
    const handler = () => { scrolled = window.scrollY > 20; };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  });

  // ─── Count-Up Animation ───
  let countTarget: HTMLElement | undefined = $state(undefined);
  let hasAnimated = $state(false);

  $effect(() => {
    if (!countTarget || hasAnimated) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          let current = 0;
          const target = 20;
          const duration = 1200;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            if (countTarget) countTarget.textContent = Math.floor(current) + '+';
          }, 16);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(countTarget);
    return () => observer.disconnect();
  });

  // ─── FAQ Accordion ───
  let openFaq = $state<number | null>(null);
  function toggleFaq(index: number) {
    openFaq = openFaq === index ? null : index;
  }

  const faqs = [
    {
      q: 'Does GardenSuite work without internet?',
      a: 'Yes. The desktop ERP works fully offline. The face attendance app also works offline and syncs data when internet is available.'
    },
    {
      q: 'How long does setup take?',
      a: 'Our team visits your garden and sets up everything in 1-2 days. Training is included at no extra cost.'
    },
    {
      q: 'Which regions do you serve?',
      a: 'We serve tea estates across Assam, Dooars, Terai, Darjeeling, Coochbehar, Uttar Dinajpur, and Jalpaiguri.'
    },
    {
      q: 'Is there a cloud dashboard for owners?',
      a: 'Yes. The MIS web dashboard gives daily updates viewable from any device - phone, tablet, or laptop - so owners can monitor remotely.'
    },
    {
      q: 'How much does GardenSuite cost?',
      a: 'Pricing depends on the number of modules and estate size. Contact us for a free quote - setup and training are always free.'
    }
  ];

  const regions = ['Darjeeling', 'Dooars', 'Terai', 'Assam', 'Coochbehar', 'Jalpaiguri', 'Uttar Dinajpur'];
  const estates = [
    'Simulbarie T.E.', 'Longview T.E.', 'Rheabari T.E.', 'Mogulkata T.E.',
    'Atal T.E.', 'Naxalbari T.E.', 'Choibari T.E.', 'Chapar T.E.',
    'Tinbigha T.E.', 'Chandan T.E.', 'Pahargoomiah T.E.', 'Kamalpur T.E.',
    'Rahimpur T.E.', 'Debpara T.E.', 'Kurti T.E.', 'Looksan T.E.',
    'Subhasini T.E.', 'Doolahat T.E.', 'Thanjhora T.E.', 'Himalayan Agro'
  ];
</script>

<svelte:head>
  <title>GardenSuite - Complete Tea Garden Management Platform</title>
  <meta name="description" content="From face recognition attendance to automated payroll. The complete ERP for tea gardens. Trusted by 20+ estates across Darjeeling, Dooars, Terai, and Assam." />
</svelte:head>

<div class="flex overflow-clip w-full min-h-screen flex-col bg-[#FAFAF7] antialiased">
  <!-- ════════════════════════════════════════════════════════════════ -->
  <!-- Navigation (Sticky + Glassmorphism on scroll)                  -->
  <!-- ════════════════════════════════════════════════════════════════ -->
  <nav
    class="sticky top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-14 transition-all duration-300 {scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-[#0000000A] shadow-[0_1px_3px_rgba(0,0,0,0.04)]' : ''}"
    aria-label="Main navigation"
  >
    <a href="/" class="flex items-center gap-1.5" aria-label="GardenSuite Home">
      <img src="/favicon.png" alt="" class="h-7 w-auto shrink-0" aria-hidden="true" />
      <span class="tracking-[-0.01em] text-[#0A0A0A] font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-bold text-[17px] leading-[22px]">
        GardenSuite
      </span>
      <span class="ml-0.5 rounded-sm py-0.5 px-2 bg-[#F0FDF4] text-[#1B5E3B] font-['Inter',system-ui,sans-serif] font-bold text-[10px] leading-3 tracking-[0.04em]">
        V3
      </span>
    </a>

    <div class="hidden md:flex relative z-50 items-center gap-1">
      <!-- Mega Menu Dropdown -->
      <div class="group relative">
        <button
          class="inline-flex items-center justify-center rounded-md px-4 py-2 text-[14px] font-['Inter',system-ui,sans-serif] font-medium transition-colors duration-150 hover:bg-[#0000000A] hover:text-[#0A0A0A] text-[#71717A] focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 focus:outline-none"
          aria-label="Products menu"
        >
          Products
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-1 opacity-60 transition-transform duration-200 ease-out group-hover:rotate-180" aria-hidden="true"><path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        
        <div class="pointer-events-none absolute left-1/2 top-full mt-1 w-[650px] -translate-x-1/2 opacity-0 invisible translate-y-1 scale-[0.97] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 ease-out origin-top border border-[#0000000F] shadow-[0_10px_30px_rgba(0,0,0,0.08)] bg-white rounded-xl p-3 z-50 flex gap-3">
          <div class="w-1/3 rounded-lg overflow-hidden bg-gradient-to-b from-[#F0FDF4] to-[#DCFCE7] p-4 flex flex-col justify-between group/card relative">
            <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#1A5C2E" class="w-8 h-8 mb-2 z-10 transition-transform duration-200 group-hover/card:scale-110" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            <div class="z-10 mt-4">
              <span class="block font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-bold text-[#1A5C2E] text-base leading-tight">GardenSuite<br/>V3</span>
              <span class="block text-xs text-[#1A5C2E] mt-1.5 opacity-80 leading-relaxed font-['Inter',system-ui,sans-serif]">The complete ecosystem for modern tea gardens.</span>
            </div>
          </div>
          <div class="w-2/3 grid grid-cols-2 gap-1">
            <a href="/products/attendance" class="block p-3 rounded-lg hover:bg-[#FAFAF7] transition-colors duration-150 group/item focus:bg-[#FAFAF7] focus:outline-none col-span-2">
              <div class="text-[13px] font-bold text-[#18181B] font-['Plus_Jakarta_Sans',system-ui,sans-serif] group-hover/item:text-[#1A5C2E] transition-colors duration-150">Face Attendance &amp; Smart Weighing</div>
              <div class="text-xs text-[#71717A] mt-1 line-clamp-2 leading-relaxed font-['Inter',system-ui,sans-serif]">Offline biometric face recognition + Auto-linked bluetooth green leaf weighing scales.</div>
            </a>
            <a href="/products/payroll" class="block p-3 rounded-lg hover:bg-[#FAFAF7] transition-colors duration-150 group/item focus:bg-[#FAFAF7] focus:outline-none">
              <div class="text-[13px] font-bold text-[#18181B] font-['Plus_Jakarta_Sans',system-ui,sans-serif] group-hover/item:text-[#1A5C2E] transition-colors duration-150">Automated Payroll</div>
              <div class="text-xs text-[#71717A] mt-1 line-clamp-2 leading-relaxed font-['Inter',system-ui,sans-serif]">Auto-calculates wages, deductions, and PF.</div>
            </a>
            <a href="/products/factory" class="block p-3 rounded-lg hover:bg-[#FAFAF7] transition-colors duration-150 group/item focus:bg-[#FAFAF7] focus:outline-none">
              <div class="text-[13px] font-bold text-[#18181B] font-['Plus_Jakarta_Sans',system-ui,sans-serif] group-hover/item:text-[#1A5C2E] transition-colors duration-150">Factory Accounts</div>
              <div class="text-xs text-[#71717A] mt-1 line-clamp-2 leading-relaxed font-['Inter',system-ui,sans-serif]">Track production and manufacturing costs.</div>
            </a>
            <a href="/products/stores" class="block p-3 rounded-lg hover:bg-[#FAFAF7] transition-colors duration-150 group/item focus:bg-[#FAFAF7] focus:outline-none">
              <div class="text-[13px] font-bold text-[#18181B] font-['Plus_Jakarta_Sans',system-ui,sans-serif] group-hover/item:text-[#1A5C2E] transition-colors duration-150">Store Management</div>
              <div class="text-xs text-[#71717A] mt-1 line-clamp-2 leading-relaxed font-['Inter',system-ui,sans-serif]">Inventory tracking and purchase orders.</div>
            </a>
            <a href="/products/mis" class="block p-3 rounded-lg hover:bg-[#FAFAF7] transition-colors duration-150 group/item focus:bg-[#FAFAF7] focus:outline-none">
              <div class="text-[13px] font-bold text-[#18181B] font-['Plus_Jakarta_Sans',system-ui,sans-serif] group-hover/item:text-[#1A5C2E] transition-colors duration-150">MIS Dashboard</div>
              <div class="text-xs text-[#71717A] mt-1 line-clamp-2 leading-relaxed font-['Inter',system-ui,sans-serif]">Daily cloud updates viewable from any device.</div>
            </a>
          </div>
        </div>
      </div>

      <a href="#features" class="inline-flex items-center justify-center rounded-md px-4 py-2 text-[14px] font-['Inter',system-ui,sans-serif] font-medium transition-colors duration-150 hover:bg-[#0000000A] hover:text-[#0A0A0A] text-[#71717A] focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 focus:outline-none">
        Features
      </a>
      <a href="#clients" class="inline-flex items-center justify-center rounded-md px-4 py-2 text-[14px] font-['Inter',system-ui,sans-serif] font-medium transition-colors duration-150 hover:bg-[#0000000A] hover:text-[#0A0A0A] text-[#71717A] focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 focus:outline-none">
        Clients
      </a>
      <a href="#about" class="inline-flex items-center justify-center rounded-md px-4 py-2 text-[14px] font-['Inter',system-ui,sans-serif] font-medium transition-colors duration-150 hover:bg-[#0000000A] hover:text-[#0A0A0A] text-[#71717A] focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 focus:outline-none">
        About
      </a>
    </div>

    <div class="flex items-center gap-2">
      <a href="#contact" class="hidden md:inline-block text-[#71717A] font-['Inter',system-ui,sans-serif] font-medium text-sm leading-[18px] mr-4 cursor-pointer hover:text-[#0A0A0A] transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 focus:outline-none rounded-md px-2 py-1">
        Contact
      </a>
      <a href="#contact" class="flex items-center rounded-full py-2.5 px-5 bg-[#0A0A0A] cursor-pointer hover:bg-[#1A1A1A] active:scale-[0.97] transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 focus:outline-none">
        <span class="text-white font-['Inter',system-ui,sans-serif] font-semibold text-[13px] leading-4">
          Book a Demo
        </span>
      </a>
    </div>
  </nav>

  <!-- ════════════════════════════════════════════════════════════════ -->
  <!-- Hero                                                            -->
  <!-- ════════════════════════════════════════════════════════════════ -->
  <section class="w-full bg-[#FAFAF7]" aria-label="Hero">
    <div class="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-center pt-20 md:pt-24 pb-12 gap-7">
      <!-- Badge -->
      <div class="reveal flex items-center rounded-full pr-3.5 pl-2.5 gap-2 bg-[#F0FDF4] border border-[#DCFCE7] py-1.5 cursor-pointer hover:bg-[#E6FCEF] transition-colors duration-150">
        <span class="flex items-center rounded-full py-0.5 px-2 bg-[#1B5E3B]">
          <span class="text-white font-['Inter',system-ui,sans-serif] font-bold text-[11px] leading-[14px]">NEW</span>
        </span>
        <span class="text-[#15803D] font-['Inter',system-ui,sans-serif] font-medium text-[13px] leading-4">
          Version 3 with advanced face recognition is here
        </span>
      </div>

      <!-- Heading -->
      <h1 class="reveal text-[44px] md:text-[64px] lg:text-[80px] text-center leading-[1.02] tracking-[-0.04em] text-[#0A0A0A] font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-extrabold max-w-4xl">
        The complete tea garden management platform.
      </h1>

      <!-- Subtitle -->
      <p class="reveal text-[17px] md:text-[18px] text-center leading-[1.65] max-w-[620px] text-[#71717A] font-['Inter',system-ui,sans-serif]">
        From face recognition attendance to automated payroll.
        Trusted by 20+ estates across Darjeeling, Dooars, Terai, and Assam.
      </p>

      <!-- CTAs -->
      <div class="reveal flex items-center pt-2 gap-3">
        <a href="#contact" class="flex items-center rounded-full py-3.5 px-8 gap-2 bg-[#0A0A0A] cursor-pointer hover:bg-[#1A1A1A] active:scale-[0.97] transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 focus:outline-none">
          <span class="text-white font-['Inter',system-ui,sans-serif] font-semibold text-[15px] leading-[18px]">
            Book a Demo
          </span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="shrink-0" aria-hidden="true">
            <path d="M5 2.5l4.5 4.5L5 11.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
        <a href="#features" class="flex items-center rounded-full py-3.5 px-8 border-[1.5px] border-[#D1D5DB] cursor-pointer hover:bg-[#00000005] hover:border-[#A1A1AA] active:scale-[0.97] transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 focus:outline-none">
          <span class="text-[#374151] font-['Inter',system-ui,sans-serif] font-semibold text-[15px] leading-[18px]">
            See Features
          </span>
        </a>
      </div>

      <!-- Trust indicators -->
      <div class="reveal flex items-center justify-center pt-4 gap-6 opacity-80">
        <div class="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="shrink-0" aria-hidden="true"><circle cx="7" cy="7" r="3" fill="#22C55E" opacity="0.25"/><circle cx="7" cy="7" r="2" fill="#22C55E"/></svg>
          <span class="text-[#A1A1AA] font-['Inter',system-ui,sans-serif] font-medium text-[13px] leading-4">Works offline</span>
        </div>
        <div class="rounded-full bg-[#E5E7EB] shrink-0 size-1 hidden md:block"></div>
        <div class="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="shrink-0" aria-hidden="true"><circle cx="7" cy="7" r="3" fill="#22C55E" opacity="0.25"/><circle cx="7" cy="7" r="2" fill="#22C55E"/></svg>
          <span class="text-[#A1A1AA] font-['Inter',system-ui,sans-serif] font-medium text-[13px] leading-4">Syncs to cloud</span>
        </div>
        <div class="rounded-full bg-[#E5E7EB] shrink-0 size-1 hidden md:block"></div>
        <div class="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="shrink-0" aria-hidden="true"><circle cx="7" cy="7" r="3" fill="#22C55E" opacity="0.25"/><circle cx="7" cy="7" r="2" fill="#22C55E"/></svg>
          <span class="text-[#A1A1AA] font-['Inter',system-ui,sans-serif] font-medium text-[13px] leading-4">Free setup</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Hero Image -->
  <section class="w-full bg-[#FAFAF7]" aria-label="Dashboard preview">
    <div class="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pb-24">
      <div class="reveal relative flex flex-col w-full rounded-2xl overflow-clip border border-[#0000000A] shadow-[0_20px_80px_rgba(0,0,0,0.06)] bg-white max-h-[500px] md:max-h-[650px] transition-transform duration-500 hover:shadow-[0_24px_90px_rgba(0,0,0,0.09)]">
        <img src="/hero-sign-in.png" alt="GardenSuite MIS Dashboard showing daily attendance summary and garden analytics" class="w-full h-auto object-cover object-top" width="1400" height="900" />
        <div class="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
      </div>
    </div>
  </section>

  <!-- ════════════════════════════════════════════════════════════════ -->
  <!-- The Problem                                                     -->
  <!-- ════════════════════════════════════════════════════════════════ -->
  <section class="w-full bg-white" aria-labelledby="problem-heading">
    <div class="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-center py-28 md:py-32 gap-14">
      <!-- Header -->
      <div class="flex flex-col items-center max-w-[640px] gap-5">
        <div class="reveal flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-[#EF4444]"></span>
          <span class="tracking-[0.08em] uppercase text-[#71717A] font-['Inter',system-ui,sans-serif] font-semibold text-[13px] leading-4">
            The Problem
          </span>
        </div>
        <h2 id="problem-heading" class="reveal text-[32px] md:text-[44px] text-center tracking-[-0.03em] leading-[1.1] text-[#0A0A0A] font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-extrabold">
          Tea gardens still run on paper registers and guesswork.
        </h2>
        <p class="reveal text-[16px] text-center leading-[1.7] text-[#71717A] font-['Inter',system-ui,sans-serif]">
          Most estates juggle handwritten muster rolls, paper chits for weighing, manual payroll calculations, and disconnected records across departments. The result?
        </p>
      </div>

      <!-- Problem cards (red left-border accent, not red background) -->
      <div class="flex flex-col md:flex-row w-full gap-5 reveal-stagger">
        <div class="reveal flex flex-col grow shrink basis-0 rounded-xl gap-3.5 bg-white border border-[#F0F0F0] border-l-[3px] border-l-[#EF4444] p-7 shadow-card transition-all duration-250 hover:shadow-card-hover hover:-translate-y-0.5">
          <div class="flex items-center justify-center rounded-lg bg-[#FEF2F2] shrink-0 size-10">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="shrink-0" aria-hidden="true">
              <path d="M10 4v6l4 2" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round" />
              <circle cx="10" cy="10" r="8" stroke="#DC2626" stroke-width="1.5" />
            </svg>
          </div>
          <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-bold text-[17px] leading-[22px]">
            Hours Lost Daily
          </h3>
          <p class="text-[15px] leading-[1.6] text-[#71717A] font-['Inter',system-ui,sans-serif]">
            Manual attendance, weighing, and payroll calculations consume entire working days every week.
          </p>
        </div>

        <div class="reveal flex flex-col grow shrink basis-0 rounded-xl gap-3.5 bg-white border border-[#F0F0F0] border-l-[3px] border-l-[#EF4444] p-7 shadow-card transition-all duration-250 hover:shadow-card-hover hover:-translate-y-0.5">
          <div class="flex items-center justify-center rounded-lg bg-[#FEF2F2] shrink-0 size-10">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="shrink-0" aria-hidden="true">
              <path d="M6 14l8-8M14 14L6 6" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </div>
          <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-bold text-[17px] leading-[22px]">
            Proxy Attendance
          </h3>
          <p class="text-[15px] leading-[1.6] text-[#71717A] font-['Inter',system-ui,sans-serif]">
            No way to verify who actually showed up. Buddy punching and fake entries cost you money every month.
          </p>
        </div>

        <div class="reveal flex flex-col grow shrink basis-0 rounded-xl gap-3.5 bg-white border border-[#F0F0F0] border-l-[3px] border-l-[#EF4444] p-7 shadow-card transition-all duration-250 hover:shadow-card-hover hover:-translate-y-0.5">
          <div class="flex items-center justify-center rounded-lg bg-[#FEF2F2] shrink-0 size-10">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="shrink-0" aria-hidden="true">
              <rect x="3" y="3" width="14" height="14" rx="2" stroke="#DC2626" stroke-width="1.5" />
              <path d="M7 7h6M7 10h4" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </div>
          <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-bold text-[17px] leading-[22px]">
            Scattered Records
          </h3>
          <p class="text-[15px] leading-[1.6] text-[#71717A] font-['Inter',system-ui,sans-serif]">
            Attendance in one register, weights in another, payroll in Excel. Nothing talks to each other.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- ════════════════════════════════════════════════════════════════ -->
  <!-- The Solution (Transition Pivot)                                 -->
  <!-- ════════════════════════════════════════════════════════════════ -->
  <section class="w-full bg-[#FAFAF7]" aria-labelledby="solution-heading">
    <div class="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-center pt-28 md:pt-32 pb-6 gap-5">
      <div class="reveal flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-[#1B5E3B]"></span>
        <span class="tracking-[0.08em] uppercase text-[#71717A] font-['Inter',system-ui,sans-serif] font-semibold text-[13px] leading-4">
          The Solution
        </span>
      </div>
      <h2 id="solution-heading" class="reveal text-[32px] md:text-[48px] text-center tracking-[-0.03em] leading-[1.1] text-[#0A0A0A] font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-extrabold pb-2">
        One platform replaces it all.
      </h2>
      <p class="reveal text-[16px] md:text-[17px] text-center leading-[1.7] max-w-[620px] text-[#71717A] font-['Inter',system-ui,sans-serif]">
        GardenSuite connects attendance, weighing, payroll, stores, factory, and accounts into a single system your entire estate can use.
      </p>
      <!-- Decorative divider -->
      <div class="reveal w-12 h-px bg-[#D4D4D8] mt-6"></div>
    </div>
  </section>

  <!-- ════════════════════════════════════════════════════════════════ -->
  <!-- Features (Bento Grid)                                           -->
  <!-- ════════════════════════════════════════════════════════════════ -->
  <section id="features" class="w-full bg-[#FAFAF7] scroll-mt-20" aria-labelledby="features-heading">
    <div class="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col py-20 md:py-28 gap-14">
      <!-- Row 1: Hero feature (wide) + 2 standard -->
      <div class="flex flex-col md:flex-row w-full gap-5 reveal-stagger">
        <!-- Face Attendance - Hero Card (wider) -->
        <div class="reveal flex flex-col md:w-[45%] shrink-0 rounded-2xl gap-5 bg-white border border-[#F0F0F0] p-8 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
          <div class="flex items-center justify-center rounded-xl bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] shrink-0 size-12">
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none" class="shrink-0" aria-hidden="true">
              <circle cx="10" cy="7" r="4" stroke="#1A5C2E" stroke-width="1.5" />
              <path d="M3 18c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="#1A5C2E" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </div>
          <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-bold text-[18px] leading-[24px]">
            Face Attendance
          </h3>
          <p class="text-[15px] leading-[1.6] text-[#71717A] font-['Inter',system-ui,sans-serif]">
            Biometric face recognition that works completely offline. No proxy punching, no buddy punching - ever. Verified identity in under 2 seconds.
          </p>
          <a href="/products/attendance" class="inline-flex items-center gap-1 text-[#1A5C2E] font-['Inter',system-ui,sans-serif] font-semibold text-[14px] leading-[18px] cursor-pointer hover:gap-2 transition-all duration-200 mt-auto pt-2 focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 focus:outline-none">
            See how it works
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="shrink-0" aria-hidden="true"><path d="M5 3l4.5 4-4.5 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>

        <!-- Smart Weighing + Payroll -->
        <div class="flex flex-col grow gap-5">
          <div class="reveal flex flex-col rounded-2xl gap-4 bg-white border border-[#F0F0F0] p-7 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
            <div class="flex items-center justify-center rounded-xl bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] shrink-0 size-11">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="shrink-0" aria-hidden="true">
                <rect x="3" y="6" width="14" height="10" rx="2" stroke="#1A5C2E" stroke-width="1.5" />
                <path d="M7 6V4a3 3 0 016 0v2" stroke="#1A5C2E" stroke-width="1.5" />
              </svg>
            </div>
            <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-bold text-[17px] leading-[22px]">Smart Weighing</h3>
            <p class="text-[15px] leading-[1.6] text-[#71717A] font-['Inter',system-ui,sans-serif]">
              Bluetooth weighing scale auto-links green leaf weight to verified workers.
            </p>
            <a href="/products/attendance" class="inline-flex items-center gap-1 text-[#1A5C2E] font-['Inter',system-ui,sans-serif] font-semibold text-[13px] leading-4 cursor-pointer hover:gap-2 transition-all duration-200 mt-auto pt-1 focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 focus:outline-none">
              Learn more
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="shrink-0" aria-hidden="true"><path d="M5 3l4.5 4-4.5 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </div>
          <div class="reveal flex flex-col rounded-2xl gap-4 bg-white border border-[#F0F0F0] p-7 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
            <div class="flex items-center justify-center rounded-xl bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] shrink-0 size-11">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="shrink-0" aria-hidden="true">
                <rect x="3" y="3" width="14" height="14" rx="2" stroke="#1A5C2E" stroke-width="1.5" />
                <path d="M3 8h14M7 8v9" stroke="#1A5C2E" stroke-width="1.5" />
              </svg>
            </div>
            <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-bold text-[17px] leading-[22px]">Automated Payroll</h3>
            <p class="text-[15px] leading-[1.6] text-[#71717A] font-['Inter',system-ui,sans-serif]">
              Auto-calculates wages, deductions and PF. Generates payslips, PF, ESI, bonus accounts.
            </p>
          </div>
        </div>
      </div>

      <!-- Row 2: 3 standard cards -->
      <div class="flex flex-col md:flex-row w-full gap-5 reveal-stagger">
        <div class="reveal flex flex-col grow shrink basis-0 rounded-2xl gap-4 bg-white border border-[#F0F0F0] p-7 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
          <div class="flex items-center justify-center rounded-xl bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] shrink-0 size-11">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="shrink-0" aria-hidden="true">
              <path d="M4 16V8l6-4 6 4v8" stroke="#1A5C2E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M8 16v-4h4v4" stroke="#1A5C2E" stroke-width="1.5" />
            </svg>
          </div>
          <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-bold text-[17px] leading-[22px]">Factory Accounts</h3>
          <p class="text-[15px] leading-[1.6] text-[#71717A] font-['Inter',system-ui,sans-serif]">
            Track production, manufacturing costs, and factory output seamlessly.
          </p>
        </div>

        <div class="reveal flex flex-col grow shrink basis-0 rounded-2xl gap-4 bg-white border border-[#F0F0F0] p-7 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
          <div class="flex items-center justify-center rounded-xl bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] shrink-0 size-11">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="shrink-0" aria-hidden="true">
              <rect x="3" y="3" width="14" height="14" rx="2" stroke="#1A5C2E" stroke-width="1.5" />
              <path d="M3 10h14M10 3v14" stroke="#1A5C2E" stroke-width="1.5" />
            </svg>
          </div>
          <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-bold text-[17px] leading-[22px]">Store Management</h3>
          <p class="text-[15px] leading-[1.6] text-[#71717A] font-['Inter',system-ui,sans-serif]">
            Inventory tracking, purchase orders, and issue management for garden stores.
          </p>
        </div>

        <div class="reveal flex flex-col grow shrink basis-0 rounded-2xl gap-4 bg-white border border-[#F0F0F0] p-7 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
          <div class="flex items-center justify-center rounded-xl bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] shrink-0 size-11">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="shrink-0" aria-hidden="true">
              <path d="M6 17a4 4 0 010-8 6 6 0 0112 1 3.5 3.5 0 01-1.5 6.5H6z" stroke="#1A5C2E" stroke-width="1.5" />
            </svg>
          </div>
          <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-bold text-[17px] leading-[22px]">MIS Dashboard</h3>
          <p class="text-[15px] leading-[1.6] text-[#71717A] font-['Inter',system-ui,sans-serif]">
            Daily cloud updates viewable from any device. Monitor your estate remotely.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- ════════════════════════════════════════════════════════════════ -->
  <!-- Why GardenSuite                                                 -->
  <!-- ════════════════════════════════════════════════════════════════ -->
  <section id="about" class="w-full bg-white scroll-mt-20" aria-labelledby="why-heading">
    <div class="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-start py-28 md:py-32 gap-12 md:gap-20">
      <div class="flex flex-col grow shrink basis-0 gap-5">
        <div class="reveal flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-[#1B5E3B]"></span>
          <span class="tracking-[0.08em] uppercase text-[#71717A] font-['Inter',system-ui,sans-serif] font-semibold text-[13px] leading-4">
            Why GardenSuite
          </span>
        </div>
        <h2 id="why-heading" class="reveal text-[32px] md:text-[40px] tracking-[-0.03em] leading-[1.1] text-[#0A0A0A] font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-extrabold">
          Built for tea gardens. Not adapted from something else.
        </h2>
        <p class="reveal text-[16px] leading-[1.7] text-[#71717A] font-['Inter',system-ui,sans-serif]">
          25 years of working with tea estates across North-East India. We understand hazira calculations, section-wise attendance, factory costing, and the unique workflows no generic ERP handles.
        </p>
      </div>
      <div class="flex flex-col grow shrink basis-0 gap-0 pt-2">
        <!-- Value prop 1 -->
        <div class="reveal flex items-start gap-5 py-7 border-b border-[#F0F0F0]">
          <span class="shrink-0 font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-bold text-[14px] text-[#1B5E3B] tracking-tight mt-0.5 tabular-nums" style="font-variant-numeric: tabular-nums">01</span>
          <div class="flex flex-col gap-1.5">
            <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-bold text-[17px] leading-[22px]">
              Offline First
            </h3>
            <p class="text-[15px] leading-[1.65] text-[#71717A] font-['Inter',system-ui,sans-serif]">
              Full ERP functionality without internet. Syncs automatically when connected.
            </p>
          </div>
        </div>
        <!-- Value prop 2 -->
        <div class="reveal flex items-start gap-5 py-7 border-b border-[#F0F0F0]">
          <span class="shrink-0 font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-bold text-[14px] text-[#1B5E3B] tracking-tight mt-0.5" style="font-variant-numeric: tabular-nums">02</span>
          <div class="flex flex-col gap-1.5">
            <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-bold text-[17px] leading-[22px]">
              Cloud Dashboard
            </h3>
            <p class="text-[15px] leading-[1.65] text-[#71717A] font-['Inter',system-ui,sans-serif]">
              Daily MIS updates viewable from any device. Garden owners stay informed remotely.
            </p>
          </div>
        </div>
        <!-- Value prop 3 -->
        <div class="reveal flex items-start gap-5 py-7">
          <span class="shrink-0 font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-bold text-[14px] text-[#1B5E3B] tracking-tight mt-0.5" style="font-variant-numeric: tabular-nums">03</span>
          <div class="flex flex-col gap-1.5">
            <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-bold text-[17px] leading-[22px]">
              Free Setup and Training
            </h3>
            <p class="text-[15px] leading-[1.65] text-[#71717A] font-['Inter',system-ui,sans-serif]">
              Our team visits the garden, sets up everything, and trains your staff on site.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ════════════════════════════════════════════════════════════════ -->
  <!-- Trusted Across Regions                                          -->
  <!-- ════════════════════════════════════════════════════════════════ -->
  <section id="clients" class="w-full bg-[#FAFAF7] scroll-mt-20 overflow-hidden" aria-labelledby="clients-heading">
    <div class="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-center py-24 md:py-28 gap-10">
      <!-- Header with animated count -->
      <div class="flex flex-col items-center gap-5 z-10">
        <div class="reveal flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-[#1B5E3B]"></span>
          <span class="tracking-[0.08em] uppercase text-[#71717A] font-['Inter',system-ui,sans-serif] font-semibold text-[13px] leading-4">
            Trusted Across Regions
          </span>
        </div>
        <div class="reveal flex flex-col items-center gap-3">
          <div class="flex items-baseline gap-3">
            <span bind:this={countTarget} class="text-[56px] md:text-[72px] font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-extrabold text-[#0A0A0A] tracking-[-0.04em] leading-none" style="font-variant-numeric: tabular-nums">0+</span>
          </div>
          <h2 id="clients-heading" class="text-[18px] md:text-[20px] text-center text-[#71717A] font-['Inter',system-ui,sans-serif] font-medium">
            tea estates rely on GardenSuite every day
          </h2>
        </div>
      </div>
      
      <!-- Marquee -->
      <div class="relative w-full flex flex-col gap-4 mt-4">
        <div class="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-[#FAFAF7] to-transparent z-10 pointer-events-none"></div>
        <div class="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-[#FAFAF7] to-transparent z-10 pointer-events-none"></div>

        <!-- Row 1: Regions -->
        <div class="flex w-fit animate-marquee hover:[animation-play-state:paused] gap-3.5">
          {#each Array(2) as _, i}
            <div class="flex gap-3.5 min-w-max" aria-hidden={i === 1}>
              {#each regions as region}
                <div class="flex items-center rounded-full py-2.5 px-6 bg-white border border-[#E4E4E7] shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] cursor-default">
                  <span class="text-[#3F3F46] font-['Inter',system-ui,sans-serif] text-sm font-semibold">{region}</span>
                </div>
              {/each}
            </div>
          {/each}
        </div>

        <!-- Row 2: Estates -->
        <div class="flex w-fit animate-marquee-reverse hover:[animation-play-state:paused] gap-3">
          {#each Array(2) as _, i}
            <div class="flex gap-3 min-w-max" aria-hidden={i === 1}>
              {#each estates as estate}
                <div class="flex items-center rounded-lg py-2.5 px-5 bg-white border border-[#F0F0F0] text-[#71717A] font-['Inter',system-ui,sans-serif] text-[13px] font-medium hover:text-[#18181B] hover:border-[#D4D4D8] transition-all duration-200 cursor-default shadow-[0_1px_2px_rgba(0,0,0,0.02)]">{estate}</div>
              {/each}
            </div>
          {/each}
        </div>
      </div>
      
      <p class="reveal text-[#A1A1AA] font-['Inter',system-ui,sans-serif] text-[14px] mt-4 font-medium">
        From Darjeeling to Assam - serving tea estates since 2000.
      </p>
    </div>
  </section>

  <!-- ════════════════════════════════════════════════════════════════ -->
  <!-- FAQ (Accordion)                                                 -->
  <!-- ════════════════════════════════════════════════════════════════ -->
  <section class="w-full bg-white" aria-labelledby="faq-heading">
    <div class="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-center py-28 md:py-32 gap-14">
      <div class="flex flex-col items-center gap-5">
        <div class="reveal flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-[#1B5E3B]"></span>
          <span class="tracking-[0.08em] uppercase text-[#71717A] font-['Inter',system-ui,sans-serif] font-semibold text-[13px] leading-4">
            Frequently Asked
          </span>
        </div>
        <h2 id="faq-heading" class="reveal text-[32px] md:text-[44px] text-center tracking-[-0.03em] leading-[1.1] text-[#0A0A0A] font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-extrabold">
          Common questions, clear answers.
        </h2>
      </div>

      <div class="flex flex-col w-full max-w-[780px]">
        {#each faqs as faq, i}
          <div class="reveal border-b border-[#E4E4E7] last:border-b-0">
            <button
              class="w-full flex justify-between items-center py-6 gap-4 text-left cursor-pointer group focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30 focus:outline-none rounded-sm"
              onclick={() => toggleFaq(i)}
              aria-expanded={openFaq === i}
              aria-controls="faq-answer-{i}"
            >
              <h3 class="text-[#0A0A0A] font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-bold text-[16px] md:text-[17px] leading-[22px] group-hover:text-[#1A5C2E] transition-colors duration-150">
                {faq.q}
              </h3>
              <svg
                width="20" height="20" viewBox="0 0 20 20" fill="none"
                class="shrink-0 text-[#A1A1AA] transition-transform duration-300 ease-out"
                class:rotate-45={openFaq === i}
                aria-hidden="true"
              >
                <path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </button>
            <div
              id="faq-answer-{i}"
              class="overflow-hidden transition-all duration-300 ease-out"
              style="max-height: {openFaq === i ? '200px' : '0px'}; opacity: {openFaq === i ? '1' : '0'}"
            >
              <p class="text-[15px] leading-[1.65] text-[#71717A] font-['Inter',system-ui,sans-serif] pb-6">
                {faq.a}
              </p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- ════════════════════════════════════════════════════════════════ -->
  <!-- CTA (Final Conversion)                                          -->
  <!-- ════════════════════════════════════════════════════════════════ -->
  <section id="contact" class="w-full bg-[#0A0A0A] scroll-mt-20 relative overflow-hidden" aria-labelledby="cta-heading">
    <!-- Green radial glow -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#1B5E3B]/[0.08] rounded-full blur-[120px]"></div>
    </div>

    <div class="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-center py-24 md:py-28 gap-7 relative z-10">
      <img src="/gardensuite-icon-white.svg" alt="" class="h-12 w-auto mb-2 opacity-80" aria-hidden="true" />
      <h2 id="cta-heading" class="reveal text-[32px] md:text-[44px] text-center tracking-[-0.03em] leading-[1.1] text-white font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-extrabold">
        Ready to modernize your tea garden?
      </h2>
      <p class="reveal text-[16px] text-center leading-[1.65] max-w-[580px] text-[#A1A1AA] font-['Inter',system-ui,sans-serif]">
        Book a free demo and see how GardenSuite can replace paperwork with a single tap. Free setup, free training - no risk.
      </p>
      <div class="reveal flex flex-wrap justify-center pt-4 gap-4">
        <a href="#contact" class="flex items-center justify-center rounded-full py-3.5 px-8 bg-[#1B5E3B] cursor-pointer hover:bg-[#144723] active:scale-[0.97] transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[#22C55E]/40 focus:outline-none">
          <span class="text-white font-['Inter',system-ui,sans-serif] font-semibold text-[15px] leading-[18px]">
            Book a Demo
          </span>
        </a>
        <a href="mailto:contact@gardensuite.in" class="flex items-center justify-center rounded-full py-3.5 px-8 border border-[#333333] cursor-pointer hover:bg-[#1A1A1A] hover:border-[#555] active:scale-[0.97] transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[#22C55E]/40 focus:outline-none">
          <span class="text-white font-['Inter',system-ui,sans-serif] font-semibold text-[15px] leading-[18px]">
            Contact Us
          </span>
        </a>
      </div>
    </div>
  </section>
</div>
