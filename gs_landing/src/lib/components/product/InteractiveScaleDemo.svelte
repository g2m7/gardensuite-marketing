<script lang="ts">
	import { onMount } from 'svelte';

	type State = 'tared' | 'weighing' | 'locked';
	let status: State = $state('tared');
	let weight = $state(0.0);

	function tare() {
		status = 'tared';
		weight = 0.0;
	}

	function weighNext() {
		status = 'weighing';
		weight = 0.0;

		let interval = setInterval(() => {
			weight += Math.random() * 2;
			if (weight > 18) {
				weight = 18.4;
				clearInterval(interval);
				status = 'locked';
			}
		}, 100);
	}

	let cloudSync = $state(false);

	function toggleSync() {
		cloudSync = !cloudSync;
	}
</script>

<div
	class="w-full max-w-md overflow-hidden rounded-2xl border border-[#E4E4E7] bg-[#FAFAF7] shadow-soft"
>
	<div class="p-6">
		<div class="mb-6 flex items-center justify-between">
			<div class="text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">
				Smart Scale
			</div>
			<div class="flex items-center gap-2">
				<div
					class="h-2.5 w-2.5 rounded-full {status === 'locked'
						? 'bg-[#1B5E3B]'
						: status === 'weighing'
							? 'bg-[#FEBC2E]'
							: 'bg-[#E4E4E7]'}"
				></div>
				<span class="text-xs font-medium text-[#71717A]">
					{status === 'locked'
						? 'Stabilized & Locked'
						: status === 'weighing'
							? 'Weighing...'
							: 'Tared'}
				</span>
			</div>
		</div>

		<!-- LCD Screen -->
		<div
			class="mb-6 flex flex-col items-center justify-center rounded-xl border-2 border-[#E4E4E7] bg-[#F8F7F3] p-6 shadow-inner"
		>
			<div class="font-mono text-5xl font-semibold tracking-tight text-[#111111] tabular-nums">
				{weight.toFixed(2)} <span class="text-2xl text-[#71717A]">kg</span>
			</div>
		</div>

		<!-- Worker Info (Only when locked) -->
		{#if status === 'locked'}
			<div
				class="mb-6 flex items-center gap-4 rounded-xl border border-[#E4E4E7] bg-white p-4 shadow-sm transition-all duration-500"
			>
				<div class="flex h-12 w-12 items-center justify-center rounded-full bg-[#F4F4F5] text-lg">
					👩🏽
				</div>
				<div>
					<div class="text-sm font-semibold text-[#111111]">Kamala Devi</div>
					<div class="text-xs text-[#71717A]">ID: #4082 - Section 4B - Plucking Gang 2</div>
				</div>
			</div>
			<div
				class="animate-in fade-in slide-in-from-bottom-2 mb-6 flex items-center justify-between rounded-lg bg-[#F4F4F5] p-3 text-sm font-medium text-[#111111] duration-500"
			>
				<span>18.40 kg green leaf record immediately credited into the worker's muster roll</span>
				<svg class="h-5 w-5 text-[#1B5E3B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 13l4 4L19 7"
					/>
				</svg>
			</div>
		{/if}

		<!-- Controls -->
		<div class="flex gap-3">
			<button
				onclick={tare}
				class="rounded-lg border border-[#E4E4E7] bg-white px-6 py-3 text-sm font-semibold text-[#111111] transition-colors hover:bg-[#F4F4F5]"
			>
				Tare Scale
			</button>
			<button
				onclick={weighNext}
				disabled={status === 'weighing'}
				class="flex-1 rounded-lg bg-[#111111] py-3 text-sm font-semibold text-white transition-colors hover:bg-black/90 disabled:opacity-50"
			>
				Weigh Next Bag
			</button>
		</div>
	</div>

	<!-- Network Status -->
	<div class="border-t border-[#E4E4E7] bg-[#F4F4F5] p-3 text-center">
		<button
			onclick={toggleSync}
			class="flex w-full items-center justify-center gap-2 text-xs font-medium text-[#71717A]"
		>
			<div class="h-2.5 w-2.5 rounded-full {cloudSync ? 'bg-[#1B5E3B]' : 'bg-[#71717A]'}"></div>
			{cloudSync ? 'Cloud Sync Complete' : 'Local Estate Server (Offline Buffer)'}
		</button>
	</div>
</div>
