<script lang="ts">
	let {
		tagText = 'Before vs After',
		headline = 'What changes with GardenSuite'
	}: {
		tagText?: string;
		headline?: string;
	} = $props();

	const comparisons = [
		{
			old: 'Paper register passed around the field',
			icon_old:
				'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z',
			new: "Face checked on the supervisor's phone",
			icon_new:
				'M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 17.5c0-2.485 4.03-4.5 8-4.5 1.085 0 2.14.131 3.092.372M18.5 18.5l2.5 2.5M17.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z'
		},
		{
			old: 'Leaf weight written on paper chit',
			icon_old:
				'M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z',
			new: 'Scale sends kg directly to the app',
			icon_new:
				'M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z'
		},
		{
			old: 'Separate attendance and weight books',
			icon_old:
				'M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25',
			new: 'One record covers attendance, weight, and payroll',
			icon_new: 'M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
		},
		{
			old: 'Data entered at office next day',
			icon_old: 'M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
			new: 'Syncs automatically when internet is found',
			icon_new:
				'M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5'
		},
		{
			old: 'Payroll staff cross-checks register entries',
			icon_old:
				'M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Z',
			new: 'Payroll uses verified field records directly',
			icon_new:
				'M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z'
		}
	];
</script>

<section
	class="reveal-on-scroll relative w-full border-b border-[#E4E4E7] bg-[#F8FAF8] py-20 md:py-28"
	aria-labelledby="before-after-heading"
>
	<div class="mx-auto max-w-[1344px] px-6 md:px-12">
		<!-- Header -->
		<div class="mb-14 text-center">
			<span
				class="mb-4 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase"
				>{tagText}</span
			>
			<h2
				id="before-after-heading"
				class="mx-auto max-w-2xl text-[28px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[36px] lg:text-[44px]"
				style="text-wrap: balance"
			>
				{headline}
			</h2>
		</div>

		<!-- Comparison Grid -->
		<div class="grid gap-4 md:gap-5">
			{#each comparisons as item, i}
				<div class="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6">
					<!-- Old Way -->
					<div
						class="flex items-center gap-4 rounded-2xl border border-[#FECACA]/60 bg-[#FEF2F2] px-5 py-4 md:px-6 md:py-5"
					>
						<div class="shrink-0 text-[#B91C1C]/70">
							<svg
								width="22"
								height="22"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d={item.icon_old} />
							</svg>
						</div>
						<p class="text-[15px] leading-[1.5] font-medium text-[#7F1D1D]">{item.old}</p>
					</div>

					<!-- Arrow -->
					<div class="flex items-center justify-center">
						<div
							class="flex h-8 w-8 items-center justify-center rounded-full bg-[#1B5E3B] text-white shadow-[0_4px_12px_rgba(27,94,59,0.2)]"
						>
							<!-- Right arrow (desktop) -->
							<svg
								class="hidden md:block"
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M5 12h14m-5-5 5 5-5 5" />
							</svg>
							<!-- Down arrow (mobile) -->
							<svg
								class="block md:hidden"
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M12 5v14m-5-5 5 5 5-5" />
							</svg>
						</div>
					</div>

					<!-- New Way -->
					<div
						class="flex items-center gap-4 rounded-2xl border border-[#BBF7D0]/60 bg-[#F0FDF4] px-5 py-4 md:px-6 md:py-5"
					>
						<div class="shrink-0 text-[#1B5E3B]/70">
							<svg
								width="22"
								height="22"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d={item.icon_new} />
							</svg>
						</div>
						<p class="text-[15px] leading-[1.5] font-medium text-[#14532D]">{item.new}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
