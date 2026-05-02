<script lang="ts">
	let { id }: { id: string } = $props();

	const screenshots = {
		face: '/screenshots/face-attendance_liveness-check_passed.png',
		weigh: '/screenshots/smart-weighing_harvest-capture_enter-weight.png',
		activeWeigh: '/screenshots/smart-weighing_active-session_capture-weight.png',
		kamjari: '/screenshots/kamjari.png',
		kamjari2: '/screenshots/kamjari2.png',
		wages: '/screenshots/wages_summary.png',
		salary: '/screenshots/salary_payment.png',
		dashboard: '/screenshots/dashboard.png'
	};
</script>

{#snippet BrowserFrame(src: string, alt: string, x = '50%', y = '0%', scale = 1)}
	<div
		class="relative w-full overflow-hidden rounded-xl border border-[#D4D4D8] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.16)]"
	>
		<div class="flex h-7 items-center gap-1.5 border-b border-[#E4E4E7] bg-[#F4F4F5] px-3">
			<span class="h-2.5 w-2.5 rounded-full bg-[#FF5F57]"></span>
			<span class="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]"></span>
			<span class="h-2.5 w-2.5 rounded-full bg-[#28C840]"></span>
			<span class="ml-2 h-2 w-28 rounded-full bg-[#D4D4D8]"></span>
		</div>
		<div class="relative aspect-[16/9] overflow-hidden bg-white">
			<img
				src={src}
				{alt}
				class="absolute inset-0 h-full w-full object-cover"
				style={`object-position: ${x} ${y}; transform: scale(${scale}); transform-origin: ${x} ${y};`}
				loading="lazy"
			/>
		</div>
	</div>
{/snippet}

{#snippet PhoneFrame(src: string, alt: string, x = '50%', y = '0%', scale = 1)}
	<div
		class="relative overflow-hidden rounded-[1.55rem] border-[5px] border-[#111111] bg-[#111111] shadow-[0_18px_44px_rgba(15,23,42,0.22)]"
	>
		<div class="absolute top-1 left-1/2 z-10 h-3 w-16 -translate-x-1/2 rounded-b-xl bg-[#111111]"></div>
		<div class="relative aspect-[9/19] overflow-hidden rounded-[1.2rem] bg-white">
			<img
				src={src}
				{alt}
				class="absolute inset-0 h-full w-full object-cover"
				style={`object-position: ${x} ${y}; transform: scale(${scale}); transform-origin: ${x} ${y};`}
				loading="lazy"
			/>
		</div>
	</div>
{/snippet}

{#snippet ReportFallback(kind: 'stores' | 'factory')}
	<div class="w-full max-w-[390px] overflow-hidden rounded-xl border border-[#D4D4D8] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.14)]">
		<div class="flex h-7 items-center gap-1.5 border-b border-[#E4E4E7] bg-[#F4F4F5] px-3">
			<span class="h-2.5 w-2.5 rounded-full bg-[#FF5F57]"></span>
			<span class="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]"></span>
			<span class="h-2.5 w-2.5 rounded-full bg-[#28C840]"></span>
			<span class="ml-2 h-2 w-28 rounded-full bg-[#D4D4D8]"></span>
		</div>

		<div class="bg-[#FAFAF7] p-4">
			<div class="mb-3 flex items-center justify-between">
				<div>
					<div class="h-3 w-28 rounded-full bg-[#111111]"></div>
					<div class="mt-2 h-2 w-44 rounded-full bg-[#D4D4D8]"></div>
				</div>
				<div class="rounded-md bg-[#1B5E3B] px-2 py-1 text-[9px] font-semibold text-white">
					Live
				</div>
			</div>

			{#if kind === 'stores'}
				<div class="grid grid-cols-3 gap-2">
					{#each ['Opening', 'Issued', 'Balance'] as label, i}
						<div class="rounded-lg border border-[#E4E4E7] bg-white p-2 shadow-sm">
							<div class="text-[8px] font-semibold tracking-[0.04em] text-[#71717A] uppercase">{label}</div>
							<div class="mt-1 text-[15px] font-bold text-[#111111]">{['284', '76', '208'][i]}</div>
						</div>
					{/each}
				</div>
				<div class="mt-3 overflow-hidden rounded-lg border border-[#E4E4E7] bg-white text-[9px]">
					<div class="grid grid-cols-[1.4fr_.8fr_.8fr_.8fr] bg-[#F4F4F5] px-2 py-1.5 font-semibold text-[#52525B]">
						<span>Item</span><span class="text-right">In</span><span class="text-right">Issue</span><span class="text-right">Bal.</span>
					</div>
					{#each [['Fertilizer', '500', '120', '380'], ['Diesel', '0', '400', '85'], ['Shears', '100', '12', '88']] as row}
						<div class="grid grid-cols-[1.4fr_.8fr_.8fr_.8fr] border-t border-[#F0F0F0] px-2 py-1.5 text-[#3F3F46]">
							<span class="font-medium text-[#111111]">{row[0]}</span><span class="text-right">{row[1]}</span><span class="text-right">{row[2]}</span><span class="text-right font-semibold text-[#1B5E3B]">{row[3]}</span>
						</div>
					{/each}
				</div>
			{:else}
				<div class="grid grid-cols-3 gap-2">
					{#each ['Green Leaf', 'Made Tea', 'Cost / Kg'] as label, i}
						<div class="rounded-lg border border-[#E4E4E7] bg-white p-2 shadow-sm">
							<div class="text-[8px] font-semibold tracking-[0.04em] text-[#71717A] uppercase">{label}</div>
							<div class="mt-1 text-[14px] font-bold text-[#111111]">{['9,140 kg', '2,120 kg', 'Rs. 50.70'][i]}</div>
						</div>
					{/each}
				</div>
				<div class="mt-3 overflow-hidden rounded-lg border border-[#E4E4E7] bg-white text-[9px]">
					<div class="grid grid-cols-[1.2fr_.9fr_.9fr] bg-[#F4F4F5] px-2 py-1.5 font-semibold text-[#52525B]">
						<span>Process</span><span class="text-right">Output</span><span class="text-right">Status</span>
					</div>
					{#each [['Withering', '8,760 kg', 'Done'], ['Rolling', '6,420 kg', 'Running'], ['Drying', '2,120 kg', 'Done']] as row}
						<div class="grid grid-cols-[1.2fr_.9fr_.9fr] border-t border-[#F0F0F0] px-2 py-1.5 text-[#3F3F46]">
							<span class="font-medium text-[#111111]">{row[0]}</span><span class="text-right">{row[1]}</span><span class="text-right font-semibold text-[#1B5E3B]">{row[2]}</span>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/snippet}

{#if id === 'attendance'}
	<div class="relative flex h-full min-h-[260px] w-full max-w-[430px] items-center justify-center">
		<div class="absolute left-2 top-4 w-[42%] -rotate-6 transition-transform duration-500 group-hover/product:-rotate-10 group-hover/product:-translate-y-1">
			{@render PhoneFrame(screenshots.face, 'Face liveness check passed screen', '50%', '43%', 1.28)}
		</div>
		<div class="absolute right-2 top-10 w-[44%] rotate-3 transition-transform duration-500 group-hover/product:rotate-6 group-hover/product:-translate-y-2">
			{@render PhoneFrame(screenshots.activeWeigh, 'Active smart weighing session screen', '50%', '22%', 1.08)}
		</div>
		<div class="absolute bottom-3 left-1/2 z-20 w-[68%] -translate-x-1/2 rounded-xl border border-[#D4D4D8] bg-white/95 p-3 shadow-[0_14px_34px_rgba(15,23,42,0.18)] backdrop-blur sm:w-[58%]">
			<div class="flex items-center justify-between gap-3">
				<div>
					<div class="text-[9px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">Linked record</div>
					<div class="mt-1 text-[12px] font-bold text-[#111111] sm:text-[13px]">Verified + 35 kg</div>
				</div>
				<div class="h-2.5 w-2.5 rounded-full bg-[#22C55E] shadow-[0_0_0_4px_rgba(34,197,94,0.12)]"></div>
			</div>
		</div>
	</div>
{:else if id === 'mis'}
	<div class="w-full max-w-[610px] transition-transform duration-500 group-hover/product:-translate-y-1">
		{@render BrowserFrame(screenshots.dashboard, 'GardenSuite daily MIS dashboard screenshot', '42%', '0%', 1.04)}
	</div>
{:else if id === 'plucking'}
	<div class="relative w-full max-w-[390px] transition-transform duration-500 group-hover/product:-translate-y-1">
		{@render BrowserFrame(screenshots.kamjari, 'Kamjari plucking report screenshot', '47%', '0%', 1.1)}
		<div class="absolute -right-4 -bottom-5 hidden w-[42%] rotate-3 rounded-lg border border-[#D4D4D8] bg-white p-2 shadow-[0_14px_34px_rgba(15,23,42,0.16)] sm:block">
			<img
				src={screenshots.kamjari2}
				alt="Kamjari report details screenshot"
				class="aspect-[4/3] w-full rounded-md object-cover object-top"
				loading="lazy"
			/>
		</div>
	</div>
{:else if id === 'payroll'}
	<div class="relative w-full max-w-[390px] transition-transform duration-500 group-hover/product:-translate-y-1">
		{@render BrowserFrame(screenshots.wages, 'Wages summary report screenshot', '46%', '0%', 1.02)}
		<div class="absolute -right-4 -bottom-5 hidden w-[42%] rotate-3 rounded-lg border border-[#D4D4D8] bg-white p-2 shadow-[0_14px_34px_rgba(15,23,42,0.16)] sm:block">
			<img
				src={screenshots.salary}
				alt="Salary payment report screenshot"
				class="aspect-[4/3] w-full rounded-md object-cover object-top"
				loading="lazy"
			/>
		</div>
	</div>
{:else if id === 'stores'}
	{@render ReportFallback('stores')}
{:else if id === 'factory'}
	{@render ReportFallback('factory')}
{/if}
