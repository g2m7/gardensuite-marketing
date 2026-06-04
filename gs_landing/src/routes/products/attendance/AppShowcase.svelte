<script lang="ts">
	import { onMount } from 'svelte';

	let activeTab = $state(0);
	let containerRef: HTMLElement | null = $state(null);
	let isMobile = $state(true);

	const tabs = [
		{
			id: "attendance",
			label: "Biometric Attendance",
			title: "Biometric Attendance",
			subtitle: "Helps stop proxy attendance",
			desc: "Verify worker identity directly in the field. The supervisor holds the camera, the app verifies the face in less than a second, and stamps the log offline.",
			bulletPoints: [
				"On-device face match using fast local AI detection",
				"3-image burst consensus check to verify identity",
				"Works 100% offline with zero dependency on cellular network"
			],
			leftImg: "/screenshots/12_attendance_capture_capturing.png",
			leftAlt: "App camera screen capturing worker face",
			rightImg: "/screenshots/13_attendance_result_matched.png",
			rightAlt: "App result screen showing face matched and verified"
		},
		{
			id: "weighing",
			label: "Smart Plucking Scale",
			title: "Smart Plucking Scale",
			subtitle: "Automatic leaf weight capture",
			desc: "Connect to wireless Bluetooth hanging scales. The scale sends the kg reading directly to the app, freezing the weight against the worker's face in one step.",
			bulletPoints: [
				"Scale reading is locked beside the worker, not typed from paper",
				"Saves gross weight, tare deduction, and rain slabs",
				"Blocks saving if weight is missing or invalid to ensure clean data"
			],
			leftImg: "/screenshots/07_harvest_capture_ready.png",
			leftAlt: "App camera view with live Bluetooth scale reading on top",
			rightImg: "/screenshots/10_harvest_result_scale_connected_save.png",
			rightAlt: "App result screen showing net leaf weight and save option"
		},
		{
			id: "punch",
			label: "Kamjari & Punches",
			title: "Kamjari & Punches",
			subtitle: "Clock-in & clock-out for general work",
			desc: "For general garden work and tasks that do not require weighing (kamjari), supervisors can record simple clock-in and clock-out logs with face verification.",
			bulletPoints: [
				"Records the specific garden section and task work code",
				"Stamps precise local timestamp on clock-in and clock-out",
				"Shares the same fast offline face matching flow"
			],
			leftImg: "/screenshots/15_punch_capture_ready.png",
			leftAlt: "Punch capture screen ready for worker face scan",
			rightImg: "/screenshots/16_punch_result_clock_in.png",
			rightAlt: "Punch success screen showing clock-in saved offline"
		},
		{
			id: "enrollment",
			label: "Field Enrollment",
			title: "Field Enrollment",
			subtitle: "Register workers directly in the field",
			desc: "No computer setup needed. Register new workers or update face templates right in the garden. Capture multiple angles and generate embeddings locally.",
			bulletPoints: [
				"Search or select the worker profile from the active garden list",
				"Guided 3-angle capture (front, left, right) ensures quality templates",
				"On-device embedding generation creates secure, encrypted face keys"
			],
			leftImg: "/screenshots/24_register_worker_ready.png",
			leftAlt: "Worker profile ready for face enrollment",
			rightImg: "/screenshots/26_register_review.png",
			rightAlt: "Review screen showing captured face angles before saving"
		},
		{
			id: "reports",
			label: "Reports & Cloud Sync",
			title: "Reports & Cloud Sync",
			subtitle: "Track progress and sync with office",
			desc: "Supervisors can review plucking records, search worker summaries, and check active session totals in the field. Sync to the central database in one tap.",
			bulletPoints: [
				"Review daily session list, totals, and net leaf weight collected",
				"Export session logs to Excel formatted for ERP integration",
				"Synchronize all offline records with central cloud dashboard when online"
			],
			leftImg: "/screenshots/18_reports_harvest_list.png",
			leftAlt: "App report screen showing active harvest session list",
			rightImg: "/screenshots/27_sync_status.png",
			rightAlt: "Sync status screen showing database sync progress"
		}
	];

	onMount(() => {
		const checkMobile = () => {
			isMobile = window.innerWidth < 1024;
		};

		const handleScroll = () => {
			if (isMobile || !containerRef) return;
			const rect = containerRef.getBoundingClientRect();
			const totalScroll = rect.height - window.innerHeight;
			if (totalScroll <= 0) return;
			
			// Calculate progress between 0 and 1 while the section is pinned
			const progress = Math.min(Math.max(-rect.top / totalScroll, 0), 1);
			
			// Map progress to active tab index
			const index = Math.min(Math.floor(progress * tabs.length), tabs.length - 1);
			activeTab = index;
		};

		window.addEventListener('resize', checkMobile);
		window.addEventListener('scroll', handleScroll, { passive: true });
		
		checkMobile();
		handleScroll(); // Initial evaluation

		return () => {
			window.removeEventListener('resize', checkMobile);
			window.removeEventListener('scroll', handleScroll);
		};
	});

	const scrollToTab = (index: number) => {
		if (!containerRef) return;
		const rect = containerRef.getBoundingClientRect();
		const containerScrollTop = window.scrollY + rect.top;
		const totalScroll = rect.height - window.innerHeight;
		// Scroll to the midpoint of the selected tab's scroll zone
		const targetScrollY = containerScrollTop + ((index + 0.3) / tabs.length) * totalScroll;
		
		window.scrollTo({
			top: targetScrollY,
			behavior: 'smooth'
		});
	};

	const handleTabClick = (index: number) => {
		if (isMobile) {
			activeTab = index;
		} else {
			scrollToTab(index);
		}
	};
</script>

<section
	bind:this={containerRef}
	class="relative w-full bg-[#F8FAF8] border-b border-[#E4E4E7] lg:h-[450vh]"
	aria-labelledby="showcase-heading"
>
	<!-- Sticky viewport panel: acts as sticky on desktop, static flow on mobile -->
	<div class="relative w-full py-20 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden lg:py-0">
		<div class="mx-auto w-full max-w-[1344px] px-6 md:px-12">
			<!-- Title Header -->
			<div class="max-w-[720px] mb-12 lg:mb-16">
				<span
					class="mb-3 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase lg:mb-4"
					>The Field Application</span
				>
				<h2
					id="showcase-heading"
					class="text-[34px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px] lg:text-[52px]"
					style="text-wrap: balance"
				>
					Inside the GardenSuite Face App
				</h2>
				<p class="mt-4 text-[16px] leading-[1.65] text-[#52525B] md:text-[17px] lg:mt-5">
					An offline-first Android application designed for tea garden supervisors. It handles attendance, weighing, and enrollment directly in the field, with zero reliance on constant internet.
				</p>
			</div>

			<!-- Main Showcase Grid -->
			<div class="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
				<!-- Left side: Interactive Tab Accordion List -->
				<div class="grid gap-4">
					{#each tabs as tab, i}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<div
							role="tab"
							tabindex="0"
							aria-selected={activeTab === i}
							class="cursor-pointer rounded-[24px] border p-6 transition-all duration-300 text-left {activeTab === i ? 'bg-white border-white shadow-[0_16px_40px_rgba(27,94,59,0.06)] border-l-4 border-l-[#1B5E3B]' : 'bg-[#FAFAF8]/50 border-transparent hover:bg-[#FAFAF8] hover:border-[#E4E4E7]'}"
							onclick={() => handleTabClick(i)}
							onkeydown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									handleTabClick(i);
									e.preventDefault();
								}
							}}
						>
							<div class="flex items-center justify-between">
								<h3 class="text-[18px] font-semibold tracking-[-0.02em] {activeTab === i ? 'text-[#1B5E3B]' : 'text-[#3F3F46]'}" >
									{tab.label}
								</h3>
								<span class="text-[12px] font-mono text-[#A1A1AA]">0{i + 1}</span>
							</div>
							
							{#if activeTab === i}
								<div class="mt-4 animate-fade-in">
									<h4 class="text-[15px] font-semibold text-[#111111]">{tab.subtitle}</h4>
									<p class="mt-2 text-[14px] leading-[1.6] text-[#52525B]">{tab.desc}</p>
									<ul class="mt-4 grid gap-2">
										{#each tab.bulletPoints as point}
											<li class="flex items-start gap-2.5 text-[13px] leading-[1.5] text-[#3F3F46]">
												<svg class="h-4 w-4 mt-0.5 shrink-0 text-[#1B5E3B]" viewBox="0 0 20 20" fill="currentColor">
													<path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
												</svg>
												<span>{point}</span>
											</li>
										{/each}
									</ul>
								</div>
							{/if}
						</div>
					{/each}
				</div>

				<!-- Right side: Visual Phone Showcase Mockups (overlay absolute cards with aspect ratio container to prevent shifts) -->
				<div class="relative flex items-center justify-center rounded-[32px] border border-white/60 bg-[#E8F2EC] p-6 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)] min-h-[460px] md:p-12 lg:min-h-[580px]">
					<div class="absolute inset-0 bg-gradient-to-b from-[#F3F8F5] to-[#DCECE3] opacity-80 rounded-[32px]"></div>
					<div class="dot-grid-light absolute inset-0 opacity-30 rounded-[32px]"></div>

					<div class="relative z-10 w-full max-w-[440px] aspect-[1/1.15] mx-auto">
						{#each tabs as tab, i}
							<!-- Left phone -->
							<div
								class="device-frame-phone absolute left-0 top-4 w-[47%] shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
								{activeTab === i ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}"
							>
								<div class="device-frame-phone-inner aspect-[9/19.5]">
									<img
										src={tab.leftImg}
										alt={tab.leftAlt}
										width="1080"
										height="2400"
										class="h-full w-full object-cover object-top"
										loading="eager"
									/>
								</div>
							</div>

							<!-- Right phone, offset bottom -->
							<div
								class="device-frame-phone absolute right-0 bottom-4 w-[47%] shadow-[0_25px_60px_rgba(0,0,0,0.2)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
								{activeTab === i ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}"
							>
								<div class="device-frame-phone-inner aspect-[9/19.5]">
									<img
										src={tab.rightImg}
										alt={tab.rightAlt}
										width="1080"
										height="2400"
										class="h-full w-full object-cover object-top"
										loading="eager"
									/>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes fade-in {
		0% {
			opacity: 0;
			transform: translateY(4px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.3s ease-out forwards;
	}
</style>
