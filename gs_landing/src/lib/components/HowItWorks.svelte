<script lang="ts">
	import { onMount } from 'svelte';

	// ─── Step definitions (add more steps here) ───
	type Step = {
		number: string;
		title: string;
		desc: string;
		icon: 'face' | 'scale' | 'sync' | 'payroll' | 'report';
		card: {
			type: 'verification' | 'weight' | 'sync' | 'payroll' | 'dashboard';
			data: Record<string, unknown>;
		};
	};

	const steps: Step[] = [
		{
			number: '01',
			title: 'Face Captured',
			desc: 'Worker stands in front of the mobile camera. Face is matched against the registered profile - no ID card, no register, no buddy punching.',
			icon: 'face',
			card: {
				type: 'verification',
				data: {
					worker: 'Ramesh K.',
					match: '98.7%',
					section: 'Div. 3 - East',
					time: '07:42 AM',
					status: 'Verified'
				}
			}
		},
		{
			number: '02',
			title: 'Leaf Weighed',
			desc: 'Wireless smart scale captures the plucking weight and links it directly to the verified worker. One step, zero register work.',
			icon: 'scale',
			card: {
				type: 'weight',
				data: {
					value: '18.4',
					unit: 'kg',
					worker: 'Sunita D.',
					round: 'Round 2',
					status: 'Synced'
				}
			}
		},
		{
			number: '03',
			title: 'Records Sync',
			desc: 'Attendance and weight data link automatically across the system. No double entry, no mismatch between field and office.',
			icon: 'sync',
			card: {
				type: 'sync',
				data: {
					attendance: '342 marked',
					weights: '289 captured',
					synced: '100%',
					lastSync: '2 min ago'
				}
			}
		},
		{
			number: '04',
			title: 'Payroll Ready',
			desc: 'Wages, PF, ESI, bonus, and deductions calculated from real field data. Payslips generated, bank files exported.',
			icon: 'payroll',
			card: {
				type: 'payroll',
				data: {
					gross: '\u20B92,48,500',
					pf: '\u20B929,820',
					esi: '\u20B94,473',
					net: '\u20B92,14,207'
				}
			}
		},
		{
			number: '05',
			title: 'Owner Sees Report',
			desc: 'Daily MIS on your phone, tablet, or laptop from anywhere. Plucking, production, labour, and factory numbers - all live.',
			icon: 'report',
			card: {
				type: 'dashboard',
				data: {
					greenLeaf: '12,450 kg',
					madeTea: '2,890 kg',
					workers: '342',
					status: 'Live'
				}
			}
		}
	];

	// ─── Scroll-triggered entrance ───
	let sectionEl: HTMLElement;
	let visibleSteps = $state<Set<number>>(new Set());
	let animReady = $state(false);

	onMount(() => {
		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReduced) {
			// Show all steps immediately
			visibleSteps = new Set(steps.map((_, i) => i));
			return;
		}

		animReady = true;

		const stepEls = sectionEl?.querySelectorAll('[data-step-index]');
		if (!stepEls?.length) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						const idx = Number((e.target as HTMLElement).dataset.stepIndex);
						visibleSteps = new Set([...visibleSteps, idx]);
						observer.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
		);

		stepEls.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	});
</script>

<section
	bind:this={sectionEl}
	id="how-it-works"
	class="hiw-section relative w-full scroll-mt-20 overflow-hidden bg-white py-24 md:py-32"
	aria-labelledby="hiw-heading"
>
	<div class="mx-auto max-w-[1344px] px-6 md:px-12">
		<!-- Section header -->
		<div class="mb-20 max-w-[640px] md:mb-28">
			<span
				class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
				>How It Works</span
			>
			<h2
				id="hiw-heading"
				class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px] lg:text-[52px]"
				style="text-wrap: balance"
			>
				From face capture to payment. Five steps, zero paperwork.
			</h2>
			<p class="mt-6 max-w-[520px] text-[17px] leading-[1.6] text-[#52525B]">
				Every step is connected. Data flows from the field to the office without anyone typing the
				same number twice.
			</p>
		</div>

		<!-- Steps timeline -->
		<div class="hiw-timeline relative">
			<!-- Vertical connecting line (desktop) -->
			<div
				class="hiw-line absolute top-0 left-[39px] hidden h-full w-px bg-gradient-to-b from-[#E4E4E7] via-[#1B5E3B]/20 to-[#E4E4E7] md:block"
				aria-hidden="true"
			></div>

			{#each steps as step, i}
				<div
					data-step-index={i}
					class="hiw-step group relative flex flex-col gap-8 pb-20 last:pb-0 md:flex-row md:gap-16 md:pb-28
						{animReady && !visibleSteps.has(i) ? 'hiw-hidden' : ''}
						{animReady && visibleSteps.has(i) ? 'hiw-animate-in' : ''}"
					style="--step-delay: {i * 120}ms"
				>
					<!-- Left: Number + Text -->
					<div class="relative flex gap-5 md:w-[45%] md:gap-8">
						<!-- Step number circle -->
						<div class="hiw-number relative z-10 flex shrink-0 flex-col items-center">
							<div
								class="flex h-[78px] w-[78px] items-center justify-center rounded-2xl border border-[#E4E4E7] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 group-hover:border-[#1B5E3B]/30 group-hover:shadow-[0_4px_16px_rgba(27,94,59,0.1)]"
							>
								<span
									class="text-[28px] font-semibold tracking-[-0.04em] text-[#D4D4D8] transition-colors duration-300 group-hover:text-[#1B5E3B]"
									style="font-variant-numeric: tabular-nums">{step.number}</span
								>
							</div>
						</div>

						<!-- Step text -->
						<div class="flex flex-col justify-center pt-1">
							<!-- Icon badge -->
							<div class="mb-3 flex items-center gap-2">
								<div
									class="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1B5E3B]/8"
								>
									{#if step.icon === 'face'}
										<svg
											width="14"
											height="14"
											viewBox="0 0 14 14"
											fill="none"
											aria-hidden="true"
											><circle
												cx="7"
												cy="5"
												r="2.5"
												stroke="#1B5E3B"
												stroke-width="1.2"
											/><path
												d="M2.5 12.5c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4"
												stroke="#1B5E3B"
												stroke-width="1.2"
												stroke-linecap="round"
											/></svg
										>
									{:else if step.icon === 'scale'}
										<svg
											width="14"
											height="14"
											viewBox="0 0 14 14"
											fill="none"
											aria-hidden="true"
											><path
												d="M2 10.5l3-6h4l3 6"
												stroke="#1B5E3B"
												stroke-width="1.2"
												stroke-linecap="round"
												stroke-linejoin="round"
											/><path
												d="M7 4.5V2M5 2h4"
												stroke="#1B5E3B"
												stroke-width="1.2"
												stroke-linecap="round"
											/><path
												d="M1.5 12h11"
												stroke="#1B5E3B"
												stroke-width="1.2"
												stroke-linecap="round"
											/></svg
										>
									{:else if step.icon === 'sync'}
										<svg
											width="14"
											height="14"
											viewBox="0 0 14 14"
											fill="none"
											aria-hidden="true"
											><path
												d="M11.5 5.5A4.5 4.5 0 003 4.5M2.5 8.5A4.5 4.5 0 0011 9.5"
												stroke="#1B5E3B"
												stroke-width="1.2"
												stroke-linecap="round"
											/><path
												d="M10 4l1.5 1.5L13 4M4 10l-1.5-1.5L1 10"
												stroke="#1B5E3B"
												stroke-width="1.2"
												stroke-linecap="round"
												stroke-linejoin="round"
											/></svg
										>
									{:else if step.icon === 'payroll'}
										<svg
											width="14"
											height="14"
											viewBox="0 0 14 14"
											fill="none"
											aria-hidden="true"
											><rect
												x="2"
												y="3"
												width="10"
												height="8"
												rx="1.5"
												stroke="#1B5E3B"
												stroke-width="1.2"
											/><path
												d="M2 6h10"
												stroke="#1B5E3B"
												stroke-width="1.2"
											/><path
												d="M5 8.5h4"
												stroke="#1B5E3B"
												stroke-width="1.2"
												stroke-linecap="round"
											/></svg
										>
									{:else if step.icon === 'report'}
										<svg
											width="14"
											height="14"
											viewBox="0 0 14 14"
											fill="none"
											aria-hidden="true"
											><rect
												x="2"
												y="1.5"
												width="10"
												height="11"
												rx="1.5"
												stroke="#1B5E3B"
												stroke-width="1.2"
											/><path
												d="M5 5h4M5 7.5h4M5 10h2"
												stroke="#1B5E3B"
												stroke-width="1.2"
												stroke-linecap="round"
											/></svg
										>
									{/if}
								</div>
								<span class="text-[11px] font-semibold tracking-[0.06em] text-[#1B5E3B]/60 uppercase"
									>Step {step.number}</span
								>
							</div>
							<h3
								class="text-[22px] leading-[1.2] font-semibold tracking-[-0.02em] text-[#111111] md:text-[26px]"
							>
								{step.title}
							</h3>
							<p class="mt-3 max-w-[380px] text-[15px] leading-[1.6] text-[#52525B]">
								{step.desc}
							</p>
						</div>
					</div>

					<!-- Right: Floating UI card -->
					<div class="hiw-card-container flex items-center justify-center md:w-[55%]">
						<div
							class="hiw-card relative w-full max-w-[440px] overflow-hidden rounded-2xl border border-[#E4E4E7] bg-[#FAFAF7] p-1 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 group-hover:border-[#D4D4D8] group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
						>
							<div class="rounded-xl bg-white p-5">
								{#if step.card.type === 'verification'}
									<!-- Face verification card -->
									<div class="flex items-center gap-3 border-b border-[#F0F0F0] pb-4">
										<div
											class="flex h-10 w-10 items-center justify-center rounded-full bg-[#ECFDF5]"
										>
											<svg
												width="20"
												height="20"
												viewBox="0 0 20 20"
												fill="none"
												aria-hidden="true"
												><path
													d="M6.5 10.5l2 2 5-5"
													stroke="#059669"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"
												/></svg
											>
										</div>
										<div>
											<div class="text-[14px] font-semibold text-[#111]">
												Identity Confirmed
											</div>
											<div class="text-[12px] text-[#71717A]">{step.card.data.status}</div>
										</div>
									</div>
									<div class="mt-3 space-y-2">
										{#each [{ l: 'Worker', v: step.card.data.worker, bold: true }, { l: 'Match', v: step.card.data.match, bold: true }, { l: 'Section', v: step.card.data.section }, { l: 'Time', v: step.card.data.time }] as row}
											<div
												class="flex items-center justify-between py-1 text-[13px]"
											>
												<span class="text-[#71717A]">{row.l}</span>
												<span
													class={row.bold
														? 'font-semibold text-[#111]'
														: 'text-[#3F3F46]'}>{row.v}</span
												>
											</div>
										{/each}
									</div>
								{:else if step.card.type === 'weight'}
									<!-- Weight capture card -->
									<div class="text-center">
										<div
											class="text-[11px] font-semibold tracking-[0.06em] text-[#71717A] uppercase"
										>
											Plucking Weight
										</div>
										<div
											class="mt-2 text-[48px] font-semibold leading-none tracking-[-0.04em] text-[#111]"
											style="font-variant-numeric: tabular-nums"
										>
											{step.card.data.value}<span
												class="ml-1 text-[18px] font-medium text-[#A1A1AA]"
												>{step.card.data.unit}</span
											>
										</div>
										<div class="mt-3 text-[13px] text-[#52525B]">
											{step.card.data.worker} - {step.card.data.round}
										</div>
										<div
											class="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF5] px-3 py-1 text-[12px] font-semibold text-[#059669]"
										>
											<svg
												width="6"
												height="6"
												viewBox="0 0 6 6"
												fill="none"
												aria-hidden="true"
												><circle cx="3" cy="3" r="3" fill="#059669" /></svg
											>
											{step.card.data.status}
										</div>
									</div>
								{:else if step.card.type === 'sync'}
									<!-- Sync status card -->
									<div class="flex items-center gap-3 border-b border-[#F0F0F0] pb-4">
										<div class="relative flex h-10 w-10 items-center justify-center">
											<div
												class="absolute inset-0 rounded-full border-2 border-[#1B5E3B]/20"
											></div>
											<div
												class="absolute inset-0 rounded-full border-2 border-[#1B5E3B] border-r-transparent"
												style="animation: hiw-spin 2s linear infinite"
											></div>
											<svg
												width="16"
												height="16"
												viewBox="0 0 16 16"
												fill="none"
												aria-hidden="true"
												><path
													d="M13 6A5 5 0 003.5 5M3 10a5 5 0 009.5 1"
													stroke="#1B5E3B"
													stroke-width="1.5"
													stroke-linecap="round"
												/></svg
											>
										</div>
										<div>
											<div class="text-[14px] font-semibold text-[#111]">All Data Linked</div>
											<div class="text-[12px] text-[#71717A]">{step.card.data.lastSync}</div>
										</div>
									</div>
									<div class="mt-3 space-y-2">
										{#each [{ l: 'Attendance', v: step.card.data.attendance }, { l: 'Weights', v: step.card.data.weights }, { l: 'Sync rate', v: step.card.data.synced, bold: true }] as row}
											<div
												class="flex items-center justify-between py-1 text-[13px]"
											>
												<span class="text-[#71717A]">{row.l}</span>
												<span
													class={row.bold
														? 'font-semibold text-[#1B5E3B]'
														: 'text-[#3F3F46]'}
													style="font-variant-numeric: tabular-nums"
													>{row.v}</span
												>
											</div>
										{/each}
									</div>
								{:else if step.card.type === 'payroll'}
									<!-- Payroll summary card -->
									<div
										class="mb-3 text-[12px] font-semibold tracking-[0.06em] text-[#71717A] uppercase"
									>
										Monthly Payroll
									</div>
									<div class="space-y-0">
										{#each [{ l: 'Gross wages', v: step.card.data.gross }, { l: 'PF deducted', v: step.card.data.pf }, { l: 'ESI deducted', v: step.card.data.esi }] as row}
											<div
												class="flex items-center justify-between border-t border-[#F0F0F0] py-2.5 text-[13px]"
											>
												<span class="text-[#71717A]">{row.l}</span>
												<span
													class="text-[#3F3F46]"
													style="font-variant-numeric: tabular-nums"
													>{row.v}</span
												>
											</div>
										{/each}
										<div
											class="flex items-center justify-between border-t-2 border-[#1B5E3B]/10 py-2.5 text-[14px]"
										>
											<span class="font-semibold text-[#111]">Net payable</span>
											<span
												class="font-semibold text-[#1B5E3B]"
												style="font-variant-numeric: tabular-nums"
												>{step.card.data.net}</span
											>
										</div>
									</div>
								{:else if step.card.type === 'dashboard'}
									<!-- Dashboard report card -->
									<div class="mb-3 flex items-center justify-between">
										<span class="text-[12px] font-semibold tracking-[0.06em] text-[#71717A] uppercase"
											>Daily Report</span
										>
										<span
											class="flex items-center gap-1.5 rounded-full bg-[#FEF3C7] px-2.5 py-0.5 text-[11px] font-semibold text-[#B45309]"
										>
											<span class="hiw-pulse-dot relative flex h-1.5 w-1.5">
												<span
													class="absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75"
													style="animation: hiw-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite"
												></span>
												<span
													class="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#F59E0B]"
												></span>
											</span>
											{step.card.data.status}
										</span>
									</div>
									<div class="grid grid-cols-3 gap-3">
										{#each [{ l: 'Green leaf', v: step.card.data.greenLeaf }, { l: 'Made tea', v: step.card.data.madeTea }, { l: 'Workers', v: step.card.data.workers }] as stat}
											<div class="rounded-xl bg-[#FAFAF7] p-3 text-center">
												<div
													class="text-[18px] font-semibold tracking-[-0.02em] text-[#111]"
													style="font-variant-numeric: tabular-nums"
												>
													{stat.v}
												</div>
												<div class="mt-1 text-[11px] text-[#71717A]">{stat.l}</div>
											</div>
										{/each}
									</div>
								{/if}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	/* ─── Entrance animations ─── */
	/* Steps are visible by default (no-JS safe) */
	.hiw-step {
		opacity: 1;
		transform: translateY(0);
	}

	/* Hide before animation triggers (JS applied) */
	.hiw-hidden {
		opacity: 0;
		transform: translateY(32px);
	}

	/* Animate in when visible */
	.hiw-animate-in {
		opacity: 1;
		transform: translateY(0);
		transition:
			opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
		transition-delay: var(--step-delay, 0ms);
	}

	/* ─── Card hover lift ─── */
	.hiw-card {
		transform: translateY(0);
		transition:
			transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.3s ease,
			border-color 0.3s ease;
	}

	.hiw-step:hover .hiw-card {
		transform: translateY(-4px);
	}

	/* ─── Sync spinner ─── */
	@keyframes hiw-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	/* ─── Live pulse dot ─── */
	@keyframes hiw-ping {
		75%,
		100% {
			transform: scale(2.5);
			opacity: 0;
		}
	}

	/* ─── Reduced motion ─── */
	@media (prefers-reduced-motion: reduce) {
		.hiw-step,
		.hiw-hidden,
		.hiw-animate-in {
			opacity: 1;
			transform: none;
			transition: none;
		}
		.hiw-card {
			transition: none;
		}
		.hiw-step:hover .hiw-card {
			transform: none;
		}
	}
</style>
