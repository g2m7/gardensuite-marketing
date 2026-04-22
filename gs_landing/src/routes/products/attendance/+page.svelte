<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
					}
				});
			},
			{ threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
		);

		document.querySelectorAll('.animate-on-scroll').forEach((el) => {
			observer.observe(el);
		});

		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>Face Attendance &amp; Smart Scale - GardenSuite Products</title>
	<meta
		name="description"
		content="See how GardenSuite's face recognition attendance and Bluetooth smart scale work together. From field to cloud in real time."
	/>
</svelte:head>

<div
	class="[font-synthesis:none] flex overflow-clip w-full min-h-0 flex-col bg-[#FAFAF7] antialiased text-xs/4"
>

	<!-- Hero: Product Intro -->
	<section class="flex flex-col items-center w-full pt-20 md:pt-28 pb-16 md:pb-24 px-6 md:px-12 gap-6">
		<div class="flex items-center gap-2">
			<div class="w-1.5 h-1.5 rounded-full bg-[#3D7D2C]"></div>
			<div class="tracking-widest uppercase text-[#6B7280] font-semibold text-[12px]/4">
				Our Products
			</div>
		</div>
		<h1 class="text-[36px] md:text-[56px] lg:text-[64px] text-center leading-[1.05] tracking-[-0.04em] text-[#0A0A0A] font-extrabold max-w-4xl text-pretty">
			See how face recognition and smart weighing work together.
		</h1>
		<p class="text-[16px] md:text-[18px] text-center leading-[1.7] max-w-[600px] text-[#777777] ">
			From the moment a worker arrives to when their green leaf is weighed - every step is verified, recorded, and synced automatically.
		</p>
	</section>

	<!-- ============================================ -->
	<!-- STORY 01: The Arrival (Text Left, Phone Right) -->
	<!-- ============================================ -->
	<section class="relative w-full bg-[#F3F6F1] overflow-hidden">
		<!-- Decorative vertical line - desktop only -->
		<div class="hidden lg:block absolute left-[80px] top-0 w-px h-full bg-[#D4E0D0]" aria-hidden="true"></div>

		<div class="flex flex-col lg:flex-row items-center w-full max-w-[1100px] mx-auto px-6 md:px-12 lg:px-0 py-20 md:py-28 lg:py-0 lg:min-h-[700px] gap-12 lg:gap-0">
			<!-- Text Content -->
			<div class="flex flex-col lg:pl-28 lg:w-[480px] gap-7 animate-on-scroll lg:py-24">
				<!-- Step indicator -->
				<div class="flex items-center gap-4">
					<div class="w-10 h-10 rounded-full border-2 border-[#3D7D2C] flex items-center justify-center shrink-0">
						<span class="text-sm font-semibold text-[#3D7D2C] font-variant-numeric-tabular-nums">01</span>
					</div>
					<div class="w-10 h-px bg-[#3D7D2C]"></div>
					<span class="tracking-[0.15em] uppercase text-[#7A917A] font-medium text-[11px]">The Arrival</span>
				</div>

				<h2 class="text-[32px] md:text-[44px] leading-[1.1] tracking-[-0.03em] text-[#1A2E16] font-extrabold">
					A worker looks at the camera. That's it.
				</h2>

				<p class="text-[16px] leading-[1.7] text-[#5A6B58] max-w-[420px]">
					No registers. No buddy punching. The app identifies workers in under 2 seconds using face recognition - even without internet.
				</p>

				<!-- Feature bullets -->
				<ul class="flex flex-col gap-3 mt-2" role="list">
					<li class="flex items-center gap-2.5">
						<div class="w-1.5 h-1.5 rounded-full bg-[#3D7D2C] shrink-0"></div>
						<span class="text-[14px] text-[#3D5638] font-medium">Works fully offline - no internet needed</span>
					</li>
					<li class="flex items-center gap-2.5">
						<div class="w-1.5 h-1.5 rounded-full bg-[#3D7D2C] shrink-0"></div>
						<span class="text-[14px] text-[#3D5638] font-medium">Identifies workers in under 2 seconds</span>
					</li>
					<li class="flex items-center gap-2.5">
						<div class="w-1.5 h-1.5 rounded-full bg-[#3D7D2C] shrink-0"></div>
						<span class="text-[14px] text-[#3D5638] font-medium">Stops proxy punching completely</span>
					</li>
				</ul>
			</div>

			<!-- Phone Mockup - Scanning State -->
			<div class="flex flex-1 items-center justify-center relative lg:py-16">
				<div class="animate-on-scroll" style="transition-delay: 150ms;">
					<!-- Phone frame -->
					<div class="flex flex-col w-[280px] md:w-[300px] h-[560px] md:h-[600px] bg-[#1A2E16] rounded-[36px] p-3.5 shadow-[0_40px_80px_rgba(26,46,22,0.3),0_0_0_1px_rgba(61,125,44,0.2)]">
						<!-- Status bar -->
						<div class="flex justify-between px-4 pt-2 pb-1">
							<span class="text-[11px] text-white/50 ">9:41</span>
							<div class="w-4 h-2.5 border border-white/40 rounded-[2px]"></div>
						</div>
						<!-- Viewfinder -->
						<div class="flex flex-1 flex-col items-center justify-center bg-[#243D1E] rounded-[24px] mx-0 my-1 gap-5">
							<!-- Scanning circle -->
							<div class="w-[120px] h-[120px] md:w-[140px] md:h-[140px] rounded-full border-[3px] border-[#5CA84A] flex items-center justify-center animate-pulse-slow">
								<div class="w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full border-2 border-dashed border-[#5CA84A]/40 flex items-center justify-center">
									<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(92,168,74,0.7)" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
								</div>
							</div>
							<span class="text-[14px] text-white/50 ">Scanning face&#8230;</span>
							<!-- Dots -->
							<div class="flex gap-1.5">
								<div class="w-2 h-2 rounded-full bg-[#5CA84A]"></div>
								<div class="w-2 h-2 rounded-full bg-[#5CA84A]/40"></div>
								<div class="w-2 h-2 rounded-full bg-[#5CA84A]/20"></div>
							</div>
						</div>
					</div>
				</div>

				<!-- Floating stat card -->
				<div class="hidden md:flex absolute bottom-20 left-4 lg:left-8 flex-col py-3.5 px-5 bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-[#E8EDE6] gap-1 animate-on-scroll" style="transition-delay: 350ms;">
					<span class="text-[10px] tracking-[0.1em] uppercase text-[#7A917A] font-medium">Response Time</span>
					<span class="text-[28px] font-bold text-[#1A2E16] font-variant-numeric-tabular-nums">&lt;&nbsp;2s</span>
				</div>
			</div>
		</div>
	</section>

	<!-- ============================================== -->
	<!-- STORY 02: Confirmed (Phone Left, Text Right) -->
	<!-- ============================================== -->
	<section class="relative w-full bg-white overflow-hidden">
		<!-- Decorative vertical line - right side -->
		<div class="hidden lg:block absolute right-[80px] top-0 w-px h-full bg-[#E8EDE6]" aria-hidden="true"></div>

		<div class="flex flex-col-reverse lg:flex-row items-center w-full max-w-[1100px] mx-auto px-6 md:px-12 lg:px-0 py-20 md:py-28 lg:py-0 lg:min-h-[700px] gap-12 lg:gap-0">
			<!-- Phone Mockup - Confirmed State -->
			<div class="flex flex-1 items-center justify-center relative lg:py-16">
				<div class="animate-on-scroll" style="transition-delay: 100ms;">
					<div class="flex flex-col w-[280px] md:w-[300px] h-[560px] md:h-[600px] bg-[#1A2E16] rounded-[36px] p-3.5 shadow-[0_40px_80px_rgba(26,46,22,0.25)]">
						<div class="flex justify-between px-4 pt-2 pb-1">
							<span class="text-[11px] text-white/50 ">9:41</span>
							<div class="w-4 h-2.5 border border-white/40 rounded-[2px]"></div>
						</div>
						<!-- Success screen -->
						<div class="flex flex-1 flex-col items-center justify-center bg-[#243D1E] rounded-[24px] mx-0 my-1 gap-6">
							<!-- Check circle -->
							<div class="w-20 h-20 rounded-full bg-[#3D7D2C] flex items-center justify-center shadow-[0_0_40px_rgba(61,125,44,0.4)]">
								<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2.5" aria-hidden="true"><path d="M5 13l4 4L19 7"/></svg>
							</div>
							<div class="flex flex-col items-center gap-1.5">
								<span class="text-[18px] font-semibold text-white ">Ramesh Kumar</span>
								<span class="text-[13px] text-white/50 ">Section A - Plucking</span>
							</div>
							<!-- Logged badge -->
							<div class="flex flex-col items-center bg-[#3D7D2C]/20 border border-[#5CA84A]/30 rounded-xl py-3.5 px-7 gap-1">
								<span class="text-[10px] font-semibold tracking-[0.12em] text-[#5CA84A] ">ATTENDANCE LOGGED</span>
								<span class="text-[20px] font-bold text-white font-variant-numeric-tabular-nums">09:41 AM</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Floating chip: top right -->
				<div class="hidden md:flex absolute top-24 right-16 lg:right-24 items-center gap-2.5 py-3 px-4.5 bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-[#E8EDE6] animate-on-scroll" style="transition-delay: 300ms;">
					<div class="w-2 h-2 rounded-full bg-[#3D7D2C]"></div>
					<span class="text-[13px] text-[#3D5638] font-medium">Auto-synced to ERP</span>
				</div>

				<!-- Floating chip: bottom left -->
				<div class="hidden md:flex absolute bottom-28 left-8 lg:left-16 flex-col py-3.5 px-5 bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-[#E8EDE6] gap-0.5 animate-on-scroll" style="transition-delay: 450ms;">
					<span class="text-[10px] tracking-[0.1em] uppercase text-[#7A917A] font-medium">Accuracy</span>
					<span class="text-[24px] font-bold text-[#1A2E16] font-variant-numeric-tabular-nums">99.7%</span>
				</div>
			</div>

			<!-- Text Content -->
			<div class="flex flex-col lg:pr-28 lg:w-[480px] gap-7 animate-on-scroll lg:py-24">
				<div class="flex items-center gap-4">
					<div class="w-10 h-10 rounded-full border-2 border-[#0369A1] flex items-center justify-center shrink-0">
						<span class="text-sm font-semibold text-[#0369A1] font-variant-numeric-tabular-nums">02</span>
					</div>
					<div class="w-10 h-px bg-[#0369A1]"></div>
					<span class="tracking-[0.15em] uppercase text-[#0369A1]/70 font-medium text-[11px]">Confirmed</span>
				</div>

				<h2 class="text-[32px] md:text-[44px] leading-[1.1] tracking-[-0.03em] text-[#1A2E16] font-extrabold">
					Identity verified. Attendance logged.
				</h2>

				<p class="text-[16px] leading-[1.7] text-[#5A6B58] max-w-[420px]">
					Name, section, and time - all recorded automatically. No manual entry needed. Data syncs to the desktop ERP the moment it goes online.
				</p>

				<ul class="flex flex-col gap-3 mt-2" role="list">
					<li class="flex items-center gap-2.5">
						<div class="w-1.5 h-1.5 rounded-full bg-[#0369A1] shrink-0"></div>
						<span class="text-[14px] text-[#0369A1]/80 font-medium">Auto-records name, time, and section</span>
					</li>
					<li class="flex items-center gap-2.5">
						<div class="w-1.5 h-1.5 rounded-full bg-[#0369A1] shrink-0"></div>
						<span class="text-[14px] text-[#0369A1]/80 font-medium">Syncs to ERP automatically when connected</span>
					</li>
					<li class="flex items-center gap-2.5">
						<div class="w-1.5 h-1.5 rounded-full bg-[#0369A1] shrink-0"></div>
						<span class="text-[14px] text-[#0369A1]/80 font-medium">Zero manual data entry mistakes</span>
					</li>
				</ul>
			</div>
		</div>
	</section>

	<!-- =============================================== -->
	<!-- STORY 03: The Weigh-In (Text Left, Scale Right) -->
	<!-- =============================================== -->
	<section class="relative w-full bg-[#F3F6F1] overflow-hidden">
		<div class="hidden lg:block absolute left-[80px] top-0 w-px h-full bg-[#D4E0D0]" aria-hidden="true"></div>

		<div class="flex flex-col lg:flex-row items-center w-full max-w-[1100px] mx-auto px-6 md:px-12 lg:px-0 py-20 md:py-28 lg:py-0 lg:min-h-[750px] gap-12 lg:gap-0">
			<!-- Text Content -->
			<div class="flex flex-col lg:pl-28 lg:w-[480px] gap-7 animate-on-scroll lg:py-24">
				<div class="flex items-center gap-4">
					<div class="w-10 h-10 rounded-full border-2 border-[#D97706] flex items-center justify-center shrink-0">
						<span class="text-sm font-semibold text-[#D97706] font-variant-numeric-tabular-nums">03</span>
					</div>
					<div class="w-10 h-px bg-[#D97706]"></div>
					<span class="tracking-[0.15em] uppercase text-[#D97706]/70 font-medium text-[11px]">The Weigh-In</span>
				</div>

				<h2 class="text-[32px] md:text-[44px] leading-[1.1] tracking-[-0.03em] text-[#1A2E16] font-extrabold">
					Green leaf meets smart scale.
				</h2>

				<p class="text-[16px] leading-[1.7] text-[#5A6B58] max-w-[420px]">
					The Bluetooth-connected wireless scale sends weight directly to the app. Each reading is linked to the verified worker face - no paper chits, no confusion, no errors.
				</p>

				<ul class="flex flex-col gap-3 mt-2" role="list">
					<li class="flex items-center gap-2.5">
						<div class="w-1.5 h-1.5 rounded-full bg-[#D97706] shrink-0"></div>
						<span class="text-[14px] text-[#D97706]/80 font-medium">Wireless Bluetooth connection</span>
					</li>
					<li class="flex items-center gap-2.5">
						<div class="w-1.5 h-1.5 rounded-full bg-[#D97706] shrink-0"></div>
						<span class="text-[14px] text-[#D97706]/80 font-medium">Weight linked to verified face ID</span>
					</li>
					<li class="flex items-center gap-2.5">
						<div class="w-1.5 h-1.5 rounded-full bg-[#D97706] shrink-0"></div>
						<span class="text-[14px] text-[#D97706]/80 font-medium">Eliminates paper chit weighing</span>
					</li>
				</ul>
			</div>

			<!-- Scale + Receipt Mockup -->
			<div class="flex flex-1 items-center justify-center relative lg:py-16">
				<!-- Scale Display Card -->
				<div class="animate-on-scroll" style="transition-delay: 150ms;">
					<div class="flex flex-col items-center w-[260px] md:w-[280px] bg-white rounded-2xl border-2 border-[#E8EDE6] shadow-[0_40px_80px_rgba(26,46,22,0.15)] py-8 px-6 gap-4">
						<!-- Connected badge -->
						<div class="flex items-center gap-1.5 py-1.5 px-3.5 bg-[#EDF5EB] rounded-full">
							<div class="w-1.5 h-1.5 rounded-full bg-[#3D7D2C] animate-pulse"></div>
							<span class="text-[11px] font-semibold text-[#3D7D2C] ">CONNECTED</span>
						</div>
						<!-- Weight -->
						<div class="flex flex-col items-center gap-1 mt-4">
							<span class="text-[64px] md:text-[72px] font-bold text-[#1A2E16] tracking-[-2px] leading-none font-variant-numeric-tabular-nums">4.23</span>
							<span class="text-[14px] text-[#7A917A] ">kg green leaf</span>
						</div>
						<!-- Arrow -->
						<div class="flex flex-col items-center gap-0 mt-4">
							<div class="w-px h-7 bg-[#D4E0D0]"></div>
							<svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1l4 4 4-4" stroke="#D4E0D0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
						</div>
					</div>
				</div>

				<!-- Receipt Card - offset below right -->
				<div class="hidden md:flex absolute bottom-16 right-8 lg:right-16 items-center gap-3 py-3.5 px-5 bg-white rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-[#E8EDE6] animate-on-scroll" style="transition-delay: 400ms;">
					<div class="w-9 h-9 rounded-full bg-[#EDF5EB] flex items-center justify-center shrink-0">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3D7D2C" stroke-width="2" aria-hidden="true"><path d="M5 13l4 4L19 7"/></svg>
					</div>
					<div class="flex flex-col gap-0.5">
						<span class="text-[14px] font-semibold text-[#1A2E16] ">Ramesh Kumar</span>
						<span class="text-[12px] text-[#7A917A] ">4.23 kg recorded</span>
					</div>
				</div>

				<!-- Bluetooth signal lines - decorative -->
				<div class="hidden lg:flex absolute top-32 left-20 flex-col gap-1 opacity-30" aria-hidden="true">
					<div class="w-10 h-px bg-[#3D7D2C]"></div>
					<div class="w-7 h-px bg-[#3D7D2C]"></div>
					<div class="w-4 h-px bg-[#3D7D2C]"></div>
				</div>
			</div>
		</div>
	</section>

	<!-- ==================================== -->
	<!-- STORY 04: The Sync (Full-Width, Dark) -->
	<!-- ==================================== -->
	<section class="relative w-full bg-[#1A2E16] overflow-hidden py-20 md:py-28">
		<div class="flex flex-col items-center w-full max-w-[1100px] mx-auto px-6 md:px-12 gap-14">
			<!-- Header -->
			<div class="flex flex-col items-center gap-5 animate-on-scroll">
				<div class="flex items-center gap-4">
					<div class="w-10 h-10 rounded-full border-2 border-[#7C3AED] flex items-center justify-center shrink-0">
						<span class="text-sm font-semibold text-[#7C3AED] font-variant-numeric-tabular-nums">04</span>
					</div>
					<div class="w-10 h-px bg-[#7C3AED]"></div>
					<span class="tracking-[0.15em] uppercase text-[#7C3AED] font-medium text-[11px]">The Sync</span>
				</div>
				<h2 class="text-[32px] md:text-[48px] text-center leading-[1.1] tracking-[-0.03em] text-white font-extrabold">
					From field to cloud in real time.
				</h2>
				<p class="text-[16px] text-center text-white/50 ">
					Every piece of data flows through the system automatically
				</p>
			</div>

			<!-- Flow Diagram -->
			<div class="flex flex-col md:flex-row items-center gap-6 md:gap-0 justify-center w-full animate-on-scroll" style="transition-delay: 200ms;">
				<!-- Step 1: Face App -->
				<div class="flex flex-col items-center gap-4 w-[180px]">
					<div class="w-[72px] h-[72px] rounded-[20px] bg-[#5CA84A]/15 border border-[#5CA84A]/30 flex items-center justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5CA84A" stroke-width="1.5" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="18" r="1"/></svg>
					</div>
					<span class="text-[15px] font-semibold text-white ">Face App</span>
					<span class="text-[12px] text-white/40 ">Attendance</span>
				</div>

				<!-- Arrow -->
				<div class="flex items-center w-16 justify-center rotate-90 md:rotate-0">
					<div class="w-10 h-px bg-[#5CA84A]/40"></div>
					<div class="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-[#5CA84A]/40"></div>
				</div>

				<!-- Step 2: Smart Scale -->
				<div class="flex flex-col items-center gap-4 w-[180px]">
					<div class="w-[72px] h-[72px] rounded-[20px] bg-[#5CA84A]/15 border border-[#5CA84A]/30 flex items-center justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5CA84A" stroke-width="1.5" aria-hidden="true"><path d="M6 2h12l2 8H4L6 2z"/><path d="M4 10v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10"/><line x1="12" y1="14" x2="12" y2="18"/></svg>
					</div>
					<span class="text-[15px] font-semibold text-white ">Smart Scale</span>
					<span class="text-[12px] text-white/40 ">Weighing</span>
				</div>

				<!-- Arrow -->
				<div class="flex items-center w-16 justify-center rotate-90 md:rotate-0">
					<div class="w-10 h-px bg-[#5CA84A]/40"></div>
					<div class="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-[#5CA84A]/40"></div>
				</div>

				<!-- Step 3: Desktop ERP -->
				<div class="flex flex-col items-center gap-4 w-[180px]">
					<div class="w-[72px] h-[72px] rounded-[20px] bg-[#5CA84A]/15 border border-[#5CA84A]/30 flex items-center justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5CA84A" stroke-width="1.5" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
					</div>
					<span class="text-[15px] font-semibold text-white ">Desktop ERP</span>
					<span class="text-[12px] text-white/40 ">Processing</span>
				</div>

				<!-- Arrow -->
				<div class="flex items-center w-16 justify-center rotate-90 md:rotate-0">
					<div class="w-10 h-px bg-[#5CA84A]/40"></div>
					<div class="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-[#5CA84A]/40"></div>
				</div>

				<!-- Step 4: Cloud MIS -->
				<div class="flex flex-col items-center gap-4 w-[180px]">
					<div class="w-[72px] h-[72px] rounded-[20px] bg-[#5CA84A]/25 border border-[#5CA84A]/50 flex items-center justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5CA84A" stroke-width="1.5" aria-hidden="true"><path d="M18 10a6 6 0 0 0-12 0 4 4 0 0 0 0 8h12a4 4 0 0 0 0-8z"/></svg>
					</div>
					<span class="text-[15px] font-semibold text-white ">Cloud MIS</span>
					<span class="text-[12px] text-white/40 ">Dashboard</span>
				</div>
			</div>
		</div>
	</section>

</div>

<style>
	@keyframes pulse-slow {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.7; }
	}
	.animate-pulse-slow {
		animation: pulse-slow 2.5s ease-in-out infinite;
	}

	@media (prefers-reduced-motion: reduce) {
		.animate-pulse-slow {
			animation: none;
		}
	}
</style>
