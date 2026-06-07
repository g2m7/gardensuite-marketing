<script lang="ts">
	const rows = [
		{
			feature: 'Worker identity check',
			paper: 'Manual headcount or call-out',
			gardensuite: 'Face verified on the phone',
			paperStatus: 'weak',
			gsStatus: 'strong'
		},
		{
			feature: 'Leaf weight recording',
			paper: 'Handwritten chit, entered later',
			gardensuite: 'Bluetooth scale sends kg directly',
			paperStatus: 'weak',
			gsStatus: 'strong'
		},
		{
			feature: 'Proxy attendance risk',
			paper: 'Difficult to detect',
			gardensuite: 'Face match helps stop it',
			paperStatus: 'weak',
			gsStatus: 'strong'
		},
		{
			feature: 'Data reaches office',
			paper: 'End of day or next morning',
			gardensuite: 'Syncs when internet is available',
			paperStatus: 'neutral',
			gsStatus: 'strong'
		},
		{
			feature: 'Offline capability',
			paper: 'Always works (it is paper)',
			gardensuite: 'Works fully offline, syncs later',
			paperStatus: 'strong',
			gsStatus: 'strong'
		},
		{
			feature: 'Payroll preparation',
			paper: 'Re-enter from registers',
			gardensuite: 'Data flows directly to payroll',
			paperStatus: 'weak',
			gsStatus: 'strong'
		}
	];
</script>

<section
	class="relative w-full border-b border-[#E4E4E7] bg-gradient-to-b from-[#F8FAF8] to-white px-6 py-20 md:px-12 md:py-28"
	aria-labelledby="comparison-heading"
>
	<div class="mx-auto max-w-[1344px]">
		<div class="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
			<!-- Left side -->
			<div class="lg:sticky lg:top-28">
				<span
					class="mb-3 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase lg:mb-4"
				>
					Why switch
				</span>
				<h2
					id="comparison-heading"
					class="text-[28px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[36px] lg:text-[44px]"
					style="text-wrap: balance"
				>
					Paper registers vs GardenSuite
				</h2>
				<p class="mt-4 text-[16px] leading-[1.65] text-[#374151] md:text-[17px] lg:mt-5">
					The daily field workflow changes when attendance and leaf weight are captured
					digitally instead of paper.
				</p>
			</div>

			<!-- Right side - Comparison table -->
			<div class="rounded-2xl border border-[#E4E4E7] bg-white p-6 md:p-8">
				<!-- Table header -->
				<div class="mb-2 flex items-center border-b border-[#E4E4E7] pb-4">
					<div
						class="flex-1 text-[13px] font-semibold tracking-[0.04em] text-[#71717A] uppercase"
					>
						Feature
					</div>
					<div
						class="w-[100px] text-center text-[13px] font-semibold tracking-[0.04em] text-[#71717A] uppercase md:w-[160px]"
					>
						Paper
					</div>
					<div
						class="w-[100px] text-center text-[13px] font-semibold tracking-[0.04em] text-[#1B5E3B] uppercase md:w-[160px]"
					>
						GardenSuite
					</div>
				</div>

				<!-- Table rows -->
				{#each rows as row, i}
					<div
						class="flex items-center border-b border-[#E4E4E7]/60 py-4 {i === rows.length - 1 ? 'border-b-0' : ''}"
					>
						<div class="flex-1">
							<span class="text-[15px] font-medium text-[#111111]">{row.feature}</span>
						</div>
						<div class="w-[100px] text-center md:w-[160px]">
							<span class="text-[11px] leading-[1.5] text-[#71717A] md:text-[13px]">
								{row.paper}
							</span>
						</div>
						<div class="w-[100px] text-center md:w-[160px]">
							<span class="text-[11px] leading-[1.5] font-medium text-[#111111] md:text-[13px]">
								{#if row.gsStatus === 'strong'}
									<svg
										class="mr-1 inline-block h-3.5 w-3.5 text-[#1B5E3B]"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											fill-rule="evenodd"
											d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
											clip-rule="evenodd"
										/>
									</svg>
								{/if}
								{row.gardensuite}
							</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
