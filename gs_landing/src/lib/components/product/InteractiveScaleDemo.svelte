<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let step = $state(0); // 0 = Face Verified, 1 = Bluetooth Weighing, 2 = Record Saved
	let currentWeight = $state(0.0);
	let isStable = $state(false);
	let isWeighing = $state(false);

	let timer: ReturnType<typeof setTimeout> | null = null;
	let weightInterval: ReturnType<typeof setInterval> | null = null;
	let prefersReducedMotion = false;

	const stepsInfo = [
		{
			num: '01',
			title: 'Face verified',
			detail: 'Worker identified at plucking point'
		},
		{
			num: '02',
			title: 'Weight locked',
			detail: 'Bluetooth scale locks net weight'
		},
		{
			num: '03',
			title: 'Record saved',
			detail: 'Linked to muster roll with zero paper'
		}
	];

	function startSequence() {
		if (prefersReducedMotion) {
			step = 2;
			currentWeight = 18.4;
			isStable = true;
			isWeighing = false;
			return;
		}

		// Phase 0: Worker Verified (Phone shows face match, scale ready)
		step = 0;
		currentWeight = 0.0;
		isStable = false;
		isWeighing = false;

		timer = setTimeout(() => {
			// Phase 1: Weighing begins
			step = 1;
			isWeighing = true;
			isStable = false;
			currentWeight = 0.0;

			const targetWeight = 18.4;
			const duration = 1400; // ms
			const startTime = Date.now();

			if (weightInterval) clearInterval(weightInterval);

			weightInterval = setInterval(() => {
				const elapsed = Date.now() - startTime;
				const progress = Math.min(elapsed / duration, 1);
				// Ease out cubic
				const eased = 1 - Math.pow(1 - progress, 3);
				currentWeight = Math.round(eased * targetWeight * 10) / 10;

				if (progress >= 1) {
					if (weightInterval) clearInterval(weightInterval);
					currentWeight = targetWeight;
					isStable = true;
					isWeighing = false;

					// Move to Phase 2: Record saved
					timer = setTimeout(() => {
						step = 2;

						// Wait and loop
						timer = setTimeout(() => {
							startSequence();
						}, 3200);
					}, 1000);
				}
			}, 40);
		}, 2400);
	}

	onMount(() => {
		prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		startSequence();
	});

	onDestroy(() => {
		if (timer) clearTimeout(timer);
		if (weightInterval) clearInterval(weightInterval);
	});
</script>

<div
	class="w-full max-w-[960px] overflow-hidden rounded-3xl border border-[#E4E4E7] bg-[#FAFAF7] shadow-[0_6px_18px_rgba(0,0,0,0.06)]"
	role="region"
	aria-label="Face verification and smart weighing live demonstration"
>
	<!-- Top Step Indicators -->
	<div class="border-b border-[#E4E4E7] bg-white px-4 py-4 sm:px-8">
		<div class="grid grid-cols-3 gap-2 sm:gap-6">
			{#each stepsInfo as item, i}
				<div class="flex items-center gap-2 sm:gap-3">
					<div
						class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors duration-300 {step ===
						i
							? 'bg-[#1B5E3B] text-white'
							: step > i
								? 'bg-[#1B5E3B]/15 text-[#1B5E3B]'
								: 'bg-[#F4F4F5] text-[#71717A]'}"
					>
						{item.num}
					</div>
					<div class="min-w-0">
						<div
							class="truncate text-xs font-semibold sm:text-sm {step === i
								? 'text-[#111111]'
								: 'text-[#71717A]'}"
						>
							{item.title}
						</div>
						<div class="hidden truncate text-[11px] text-[#71717A] sm:block">
							{item.detail}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Main Showcase Stage: Scale + Phone in Same Frame -->
	<div class="p-6 sm:p-8 md:p-10">
		<div class="flex flex-col items-center justify-between gap-8 md:flex-row md:items-center md:gap-4">
			<!-- Left: The Hanging Bluetooth Scale SVG -->
			<div class="flex flex-1 flex-col items-center justify-center">
				<div class="relative w-full max-w-[280px] sm:max-w-[320px]">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 650"
						width="100%"
						height="auto"
						role="img"
						aria-label="Bluetooth Hanging Scale weighing tea leaf"
						class="overflow-visible"
					>
						<defs>
							<linearGradient id="scale-metal" x1="0%" y1="0%" x2="100%" y2="0%">
								<stop offset="0%" stop-color="#90979d" />
								<stop offset="50%" stop-color="#b0b7bd" />
								<stop offset="100%" stop-color="#676d72" />
							</linearGradient>
						</defs>

						<!-- Top hanging handle -->
						<rect
							x="94"
							y="18"
							width="324"
							height="86"
							rx="44"
							ry="44"
							fill="none"
							stroke="#676d72"
							stroke-width="14"
						/>
						<rect
							x="112"
							y="32"
							width="288"
							height="58"
							rx="30"
							ry="30"
							fill="#ffffff"
							stroke="#90979d"
							stroke-width="5"
						/>

						<!-- Connector neck between handle and body -->
						<path
							d="M234 104 H278 L272 132 H240 Z"
							fill="#90979d"
							stroke="#676d72"
							stroke-width="4"
						/>
						<rect
							x="223"
							y="124"
							width="66"
							height="22"
							rx="7"
							fill="#90979d"
							stroke="#676d72"
							stroke-width="4"
						/>

						<!-- Main outer shell -->
						<path
							d="M58 150 C36 154 21 174 25 204 L46 344 C51 375 74 393 106 393 H406 C438 393 461 375 466 344 L487 204 C491 174 476 154 454 150 C365 140 147 140 58 150 Z"
							fill="#f2f4f8"
							stroke="#d7dce6"
							stroke-width="8"
						/>

						<!-- Bezel -->
						<path
							d="M73 166 C54 169 43 184 47 210 L64 336 C68 359 85 372 111 372 H401 C427 372 444 359 448 336 L465 210 C469 184 458 169 439 166 C356 158 156 158 73 166 Z"
							fill="#0b5faa"
							stroke="#074983"
							stroke-width="4"
						/>

						<!-- Inner panel -->
						<path
							d="M95 181 C81 184 73 196 76 217 L89 314 C93 335 108 346 128 346 H384 C404 346 419 335 423 314 L436 217 C439 196 431 184 417 181 C345 175 167 175 95 181 Z"
							fill="#e8ecf3"
							stroke="#2d4266"
							stroke-width="3"
						/>

						<!-- Top badge -->
						<rect
							x="212"
							y="170"
							width="88"
							height="28"
							rx="5"
							fill="#f7f8fb"
							stroke="#aab3c2"
							stroke-width="2"
						/>
						<text
							x="256"
							y="187"
							text-anchor="middle"
							font-family="system-ui, sans-serif"
							font-size="8"
							font-weight="600"
							fill="#22324f"
							letter-spacing="0.3px"
						>
							BLUETOOTH SCALE
						</text>

						<!-- LCD Screen Frame & Display -->
						<text
							x="136"
							y="206"
							font-family="system-ui, sans-serif"
							font-size="8"
							font-weight="600"
							fill="#22324f"
						>
							Weight
						</text>
						<rect x="136" y="212" width="240" height="49" rx="6" fill="#212938" />
						<rect
							x="142"
							y="217"
							width="228"
							height="39"
							rx="4"
							fill="#1a2332"
							stroke="#748092"
							stroke-width="1"
						/>

						<!-- LCD Readout Digits -->
						<text
							x="256"
							y="245"
							text-anchor="middle"
							font-family="'Inter', monospace"
							font-size="25"
							font-weight="600"
							fill={isStable ? '#4ADE80' : isWeighing ? '#FBBF24' : '#94A3B8'}
							letter-spacing="1px"
						>
							{currentWeight.toFixed(2)} kg
						</text>

						<!-- LCD Annunciators -->
						{#if isStable}
							<circle cx="156" cy="228" r="3" fill="#4ADE80" />
							<text
								x="163"
								y="231"
								font-family="system-ui, sans-serif"
								font-size="7"
								font-weight="600"
								fill="#4ADE80"
							>
								STABLE
							</text>
						{:else if isWeighing}
							<circle cx="156" cy="228" r="3" fill="#FBBF24" />
							<text
								x="163"
								y="231"
								font-family="system-ui, sans-serif"
								font-size="7"
								font-weight="600"
								fill="#FBBF24"
							>
								WEIGH
							</text>
						{:else}
							<text
								x="154"
								y="231"
								font-family="system-ui, sans-serif"
								font-size="7"
								font-weight="600"
								fill="#94A3B8"
							>
								TARED
							</text>
						{/if}

						<text
							x="354"
							y="231"
							font-family="system-ui, sans-serif"
							font-size="7"
							font-weight="600"
							fill={step > 0 ? '#4ADE80' : '#64748B'}
						>
							BLE
						</text>

						<!-- Buttons -->
						<g>
							<ellipse
								cx="158"
								cy="289"
								rx="27"
								ry="11"
								fill="#f5f7fb"
								stroke="#9daabc"
								stroke-width="1.5"
							/>
							<text
								x="158"
								y="292"
								text-anchor="middle"
								font-family="system-ui, sans-serif"
								font-size="8"
								font-weight="600"
								fill="#22324f"
							>
								TARE
							</text>

							<ellipse
								cx="223"
								cy="289"
								rx="27"
								ry="11"
								fill="#f5f7fb"
								stroke="#9daabc"
								stroke-width="1.5"
							/>
							<text
								x="223"
								y="292"
								text-anchor="middle"
								font-family="system-ui, sans-serif"
								font-size="8"
								font-weight="600"
								fill="#22324f"
							>
								MODE
							</text>

							<ellipse
								cx="288"
								cy="289"
								rx="27"
								ry="11"
								fill="#f5f7fb"
								stroke="#9daabc"
								stroke-width="1.5"
							/>
							<text
								x="288"
								y="286"
								text-anchor="middle"
								font-family="system-ui, sans-serif"
								font-size="8"
								font-weight="600"
								fill="#22324f"
							>
								M+
							</text>
							<text
								x="288"
								y="294"
								text-anchor="middle"
								font-family="system-ui, sans-serif"
								font-size="8"
								font-weight="600"
								fill="#22324f"
							>
								▲
							</text>

							<ellipse
								cx="353"
								cy="289"
								rx="27"
								ry="11"
								fill="#f5f7fb"
								stroke="#9daabc"
								stroke-width="1.5"
							/>
							<text
								x="353"
								y="286"
								text-anchor="middle"
								font-family="system-ui, sans-serif"
								font-size="8"
								font-weight="600"
								fill="#22324f"
							>
								M-
							</text>
							<text
								x="353"
								y="294"
								text-anchor="middle"
								font-family="system-ui, sans-serif"
								font-size="8"
								font-weight="600"
								fill="#22324f"
							>
								▼
							</text>
						</g>

						<!-- Bottom rod and ring -->
						<rect
							x="243"
							y="390"
							width="26"
							height="86"
							rx="9"
							fill="#90979d"
							stroke="#676d72"
							stroke-width="4"
						/>
						<circle cx="256" cy="418" r="5" fill="#676d72" />
						<circle cx="256" cy="481" r="14" fill="#c2c9cd" stroke="#676d72" stroke-width="4" />
						<circle cx="256" cy="481" r="5" fill="#f2f4f8" />

						<!-- Hanging Hook & Green Leaf Sack -->
						<g
							class="transition-transform duration-500 ease-out"
							style="transform: translateY({isWeighing || isStable ? '8px' : '0px'})"
						>
							<!-- Steel Hook -->
							<path
								d="M256 495 C256 525 240 540 230 540 C220 540 216 530 222 522 C226 515 236 518 238 506 C240 495 256 495 256 495 Z"
								fill="#90979d"
								stroke="#676d72"
								stroke-width="2.5"
							/>
							<!-- Ropes to plucking net -->
							<line
								x1="228"
								y1="538"
								x2="175"
								y2="585"
								stroke="#64748B"
								stroke-width="2"
								stroke-dasharray="3 2"
							/>
							<line
								x1="228"
								y1="538"
								x2="285"
								y2="585"
								stroke="#64748B"
								stroke-width="2"
								stroke-dasharray="3 2"
							/>

							<!-- Tea Plucking Tarpaulin Bag -->
							<path
								d="M165 585 C165 578 295 578 295 585 C305 615 285 645 230 645 C175 645 155 615 165 585 Z"
								fill="#1B5E3B"
								fill-opacity="0.9"
								stroke="#14462C"
								stroke-width="2"
							/>
							<!-- Fresh plucked tea leaves peeking out -->
							<path d="M210 580 C206 570 218 564 224 572 C228 564 240 568 236 578 Z" fill="#4ADE80" />
							<path d="M192 582 C188 574 200 568 205 578 Z" fill="#22C55E" />
							<path d="M242 582 C248 573 258 577 254 584 Z" fill="#86EFAC" />
						</g>
					</svg>
				</div>
			</div>

			<!-- Center: Bluetooth Wireless Pulse Line -->
			<div class="flex flex-col items-center justify-center px-2 py-4">
				<div class="relative flex items-center justify-center">
					<!-- Concentric wireless waves -->
					<div
						class="absolute h-14 w-14 rounded-full border border-[#1B5E3B]/20 transition-all duration-700 {step >
						0
							? 'scale-125 opacity-100'
							: 'scale-90 opacity-0'}"
					></div>
					<div
						class="flex h-10 w-10 items-center justify-center rounded-full border border-[#1B5E3B]/20 bg-white text-[#1B5E3B] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
					>
						<!-- Bluetooth Icon -->
						<svg
							class="h-5 w-5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
						>
							<path d="m7 7 10 10-5 5V2l5 5L7 17" />
						</svg>
					</div>
				</div>

				<div class="mt-3 text-center">
					<div class="text-[11px] font-semibold tracking-wider text-[#1B5E3B] uppercase">
						{#if step === 0}
							Bluetooth Ready
						{:else if step === 1}
							{isStable ? '18.40 kg Locked' : 'Weighing Leaf'}
						{:else}
							Weight Transmitted
						{/if}
					</div>
					<div class="text-[10px] text-[#71717A]">Direct wireless link</div>
				</div>
			</div>

			<!-- Right: Real Mobile App Phone Screenshot -->
			<div class="flex flex-1 flex-col items-center justify-center">
				<div
					class="device-frame-phone w-[210px] sm:w-[230px] md:w-[245px] shadow-[0_10px_28px_rgba(0,0,0,0.10)]"
				>
					<div class="device-frame-phone-inner relative aspect-[412/915] overflow-hidden bg-black">
						<!-- Screen A: Worker Face Matched -->
						<div
							class="absolute inset-0 transition-opacity duration-700 ease-in-out {step === 0
								? 'z-10 opacity-100'
								: 'z-0 opacity-0'}"
						>
							<picture>
								<source srcset="/screenshots/13_attendance_result_matched.webp" type="image/webp" />
								<img
									src="/screenshots/13_attendance_result_matched.png"
									alt="Kamala Devi face verified in GardenSuite Face"
									width="412"
									height="915"
									loading="lazy"
									class="h-full w-full object-cover object-top"
								/>
							</picture>
						</div>

						<!-- Screen B: Connected Scale Weight Locked & Ready to Save -->
						<div
							class="absolute inset-0 transition-opacity duration-700 ease-in-out {step > 0
								? 'z-10 opacity-100'
								: 'z-0 opacity-0'}"
						>
							<picture>
								<source
									srcset="/screenshots/10_harvest_result_scale_connected_save.webp"
									type="image/webp"
								/>
								<img
									src="/screenshots/10_harvest_result_scale_connected_save.png"
									alt="Connected Bluetooth scale weight 18.40 kg recorded with worker in GardenSuite Face"
									width="412"
									height="915"
									loading="lazy"
									class="h-full w-full object-cover object-top"
								/>
							</picture>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Bottom Summary Caption -->
	<div class="border-t border-[#E4E4E7] bg-white px-6 py-4 text-center">
		<p class="text-[13px] leading-[1.6] text-[#71717A] sm:text-[14px]">
			Face verifies worker identity. Bluetooth scale locks leaf weight. Recorded in one step with
			zero paper.
		</p>
	</div>
</div>
