<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	let workerCount = $state(350);
	let dailyWage = $state(250);
	let proxyPercent = $state(3.0);
	let leafErrorKg = $state(1.0);
	let greenLeafPrice = $state(18);

	// Working days in a typical estate month
	const workingDays = 26;
	// Typical plucking season length (March to November)
	const seasonMonths = 9;

	// Calculations
	let monthlyGhostHaziras = $derived(
		Math.round(workerCount * (proxyPercent / 100) * workingDays)
	);

	let monthlyWageLeakage = $derived(monthlyGhostHaziras * dailyWage);
	let monthlyPfEsiLeakage = $derived(Math.round(monthlyWageLeakage * 0.15));

	let monthlyLeafDiscrepancy = $derived(
		Math.round(workerCount * leafErrorKg * greenLeafPrice * workingDays * 0.5)
	);

	let totalMonthlyLeakage = $derived(
		monthlyWageLeakage + monthlyPfEsiLeakage + monthlyLeafDiscrepancy
	);

	let totalSeasonLeakage = $derived(totalMonthlyLeakage * seasonMonths);

	const inrFormatter = new Intl.NumberFormat('en-IN', {
		style: 'currency',
		currency: 'INR',
		maximumFractionDigits: 0
	});
</script>

<section
	id="calculator"
	class="reveal-on-scroll scroll-mt-20 border-b border-[#E4E4E7] bg-[#F4F4F5]/60 py-16 md:py-24"
	aria-labelledby="calculator-heading"
>
	<div class="mx-auto max-w-[1200px] px-6 md:px-12">
		<div class="mx-auto max-w-3xl text-center">
			<span class="text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">
				2027 Season Budgeting Tool
			</span>
			<h2
				id="calculator-heading"
				class="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#111111] md:text-4xl"
				style="text-wrap: balance"
			>
				Calculate Unearned Wage & Leaf Weight Leakage
			</h2>
			<p class="mt-4 text-base text-[#52525B] md:text-lg">
				In tea estates, even a 2% to 4% proxy attendance rate or 1 kg leaf tare discrepancy adds up to
				lakhs in unearned hazira payments and statutory PF before season close.
			</p>
		</div>

		<div class="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
			<!-- Inputs Column -->
			<div class="rounded-2xl border border-[#E4E4E7] bg-white p-6 shadow-sm lg:col-span-7 md:p-8">
				<h3 class="text-lg font-semibold text-[#111111]">Estate Workforce & Wage Parameters</h3>
				<p class="mt-1 text-sm text-[#71717A]">
					Adjust the sliders to reflect your garden workforce and local wage rates.
				</p>

				<div class="mt-8 space-y-6">
					<!-- Worker Count -->
					<div>
						<div class="flex items-center justify-between text-sm">
							<label for="worker-count" class="font-medium text-[#18181B]">Total Plucking & Field Laborers</label>
							<span class="font-semibold text-[#1B5E3B] tabular-nums">{workerCount} workers</span>
						</div>
						<input
							id="worker-count"
							type="range"
							min="50"
							max="1500"
							step="25"
							bind:value={workerCount}
							class="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#E4E4E7] accent-[#1B5E3B]"
						/>
						<div class="mt-1 flex justify-between text-xs text-[#71717A]">
							<span>50</span>
							<span>500</span>
							<span>1,000</span>
							<span>1,500</span>
						</div>
					</div>

					<!-- Daily Wage Rate -->
					<div>
						<div class="flex items-center justify-between text-sm">
							<label for="daily-wage" class="font-medium text-[#18181B]">Daily Hazira Rate (Base Wage)</label>
							<span class="font-semibold text-[#1B5E3B] tabular-nums">₹{dailyWage} / day</span>
						</div>
						<input
							id="daily-wage"
							type="range"
							min="180"
							max="350"
							step="5"
							bind:value={dailyWage}
							class="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#E4E4E7] accent-[#1B5E3B]"
						/>
						<div class="mt-1 flex justify-between text-xs text-[#71717A]">
							<span>₹180 (W.B.)</span>
							<span>₹250 (Assam)</span>
							<span>₹350</span>
						</div>
					</div>

					<!-- Proxy Attendance Rate -->
					<div>
						<div class="flex items-center justify-between text-sm">
							<label for="proxy-rate" class="font-medium text-[#18181B]">Estimated Proxy / Ghost Hazira Rate</label>
							<span class="font-semibold text-[#B91C1C] tabular-nums">{proxyPercent}%</span>
						</div>
						<input
							id="proxy-rate"
							type="range"
							min="0.5"
							max="8.0"
							step="0.5"
							bind:value={proxyPercent}
							class="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#E4E4E7] accent-[#B91C1C]"
						/>
						<div class="mt-1 flex justify-between text-xs text-[#71717A]">
							<span>0.5% (Tight roll-call)</span>
							<span>3% (Typical manual line)</span>
							<span>8%</span>
						</div>
					</div>

					<!-- Tare & Weighment Dispute Allowance -->
					<div>
						<div class="flex items-center justify-between text-sm">
							<label for="leaf-error" class="font-medium text-[#18181B]">Average Daily Leaf Weight Discrepancy per Plucker</label>
							<span class="font-semibold text-[#1B5E3B] tabular-nums">{leafErrorKg} kg / day</span>
						</div>
						<input
							id="leaf-error"
							type="range"
							min="0"
							max="3.0"
							step="0.25"
							bind:value={leafErrorKg}
							class="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#E4E4E7] accent-[#1B5E3B]"
						/>
						<div class="mt-1 flex justify-between text-xs text-[#71717A]">
							<span>0 kg (Digital scale)</span>
							<span>1.0 kg (Manual slip errors)</span>
							<span>3.0 kg</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Results Summary Column -->
			<div class="flex flex-col justify-between rounded-2xl border border-[#1B5E3B]/30 bg-white p-6 shadow-md lg:col-span-5 md:p-8">
				<div>
					<div class="flex items-center justify-between border-b border-[#E4E4E7] pb-4">
						<span class="text-xs font-semibold tracking-wider text-[#71717A] uppercase">Estimated Leakage</span>
						<span class="rounded bg-[#1B5E3B]/10 px-2 py-0.5 text-xs font-medium text-[#1B5E3B]">
							{seasonMonths}-Month Season
						</span>
					</div>

					<!-- Big Number: Season Total -->
					<div class="mt-6">
						<div class="text-xs font-medium text-[#52525B]">Total Recoverable Cost per Season:</div>
						<div class="mt-2 text-3xl font-bold tracking-tight text-[#111111] tabular-nums md:text-4xl">
							{inrFormatter.format(totalSeasonLeakage)}
						</div>
						<div class="mt-1 text-xs text-[#71717A]">
							({inrFormatter.format(totalMonthlyLeakage)} per active plucking month)
						</div>
					</div>

					<!-- Itemized Breakdown -->
					<div class="mt-6 space-y-3 rounded-xl bg-[#FAFAFA] p-4 text-xs text-[#52525B]">
						<div class="flex justify-between">
							<span>Unearned Hazira Wages:</span>
							<span class="font-semibold text-[#111111] tabular-nums">{inrFormatter.format(monthlyWageLeakage)}/mo</span>
						</div>
						<div class="flex justify-between">
							<span>Statutory PF & ESI on Proxy:</span>
							<span class="font-semibold text-[#111111] tabular-nums">{inrFormatter.format(monthlyPfEsiLeakage)}/mo</span>
						</div>
						<div class="flex justify-between">
							<span>Leaf Tare & Weight Discrepancies:</span>
							<span class="font-semibold text-[#111111] tabular-nums">{inrFormatter.format(monthlyLeafDiscrepancy)}/mo</span>
						</div>
						<div class="flex justify-between border-t border-[#E4E4E7] pt-2 font-medium text-[#111111]">
							<span>Unverified Haziras Eliminated:</span>
							<span class="tabular-nums font-bold text-[#B91C1C]">{monthlyGhostHaziras} haziras/mo</span>
						</div>
					</div>
				</div>

				<!-- Action Hook -->
				<div class="mt-8 border-t border-[#E4E4E7] pt-6">
					<p class="text-xs text-[#52525B]">
						Test GardenSuite on 1 division before committing your 2027 season capital budget.
					</p>
					<div class="mt-4">
						<Button
							href="/#contact"
							label="Book Autumn On-Site Trial"
							variant="primary"
							showIcon
							class="w-full justify-center"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
