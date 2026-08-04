<script lang="ts">
	let {
		heading = 'FAQs',
		subheading = 'Your questions answered',
		contactNote = "Can't find what you're looking for?",
		contactHref = '#contact',
		categoryLabel = 'General',
		faqs = [],
		onOpen
	}: {
		heading?: string;
		subheading?: string;
		contactNote?: string;
		contactHref?: string;
		categoryLabel?: string;
		faqs: Array<{ q: string; a: string }>;
		onOpen?: (index: number) => void;
	} = $props();

	let openFaq = $state<number | null>(null);

	function toggleFaq(i: number) {
		const willOpen = openFaq !== i;
		openFaq = willOpen ? i : null;
		if (willOpen) onOpen?.(i);
	}
</script>

<section
	class="reveal-on-scroll relative w-full overflow-hidden bg-surface py-16 md:py-24 lg:py-28"
	aria-labelledby="faq-heading"
>
	<div class="mx-auto max-w-[1344px] px-6 md:px-12">
		<div class="grid border border-border bg-white md:grid-cols-5 md:divide-x md:divide-[#E4E4E7]">
			<!-- Left panel -->
			<div class="p-6 md:col-span-2 md:p-10 lg:p-12">
				<h2
					id="faq-heading"
					class="scroll-mt-20 text-[28px] leading-[1.08] font-semibold tracking-[-0.04em] text-heading md:text-[36px]"
					style="text-wrap: balance"
				>
					{heading}
				</h2>
				<p class="mt-5 text-[17px] leading-[1.6] text-[#374151]">{subheading}</p>
				<p class="mt-6 hidden text-[16px] text-[#4B5563] md:block">
					{contactNote} <br />
					<a
						href={contactHref}
						class="mt-2 inline-block font-medium text-green-deep hover:underline"
						>contact our team</a
					>
				</p>
			</div>

			<!-- Right panel: accordion -->
			<div class="space-y-4 p-6 md:col-span-3 md:p-10 lg:p-12">
				<h3 class="text-[20px] font-semibold text-heading md:pl-6">{categoryLabel}</h3>
				<div class="space-y-0">
					{#each faqs as faq, i}
						{@const isOpen = openFaq === i}
						{@const nextOpen = i < faqs.length - 1 && openFaq === i + 1}
						<div
							class="border-b px-6 py-1 transition-all duration-200 {isOpen || nextOpen
								? 'border-transparent'
								: 'border-[#F0F0F0]'} {isOpen
								? 'rounded-lg bg-[#F8FAF8] shadow-[0_2px_12px_rgba(0,0,0,0.04)] ring-1 ring-[#E4E4E7]'
								: ''}"
						>
							<h3>
								<button
									id={`faq-trigger-${i}`}
									class="group flex min-h-12 w-full cursor-pointer items-start justify-between gap-4 py-4 text-left transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30"
									onclick={() => toggleFaq(i)}
									aria-expanded={isOpen}
									aria-controls={`faq-panel-${i}`}
								>
									<span class="text-[17px] font-medium text-heading">{faq.q}</span>
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										class="mt-0.5 shrink-0 text-[#A1A1AA] transition-transform duration-200 {isOpen
											? 'rotate-180'
											: ''}"
										aria-hidden="true"
									>
										<path
											d="m6 9 6 6 6-6"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</button>
							</h3>
							<div
								id={`faq-panel-${i}`}
								role="region"
								aria-labelledby={`faq-trigger-${i}`}
								class="grid transition-all duration-200 ease-out {isOpen
									? 'grid-rows-[1fr] opacity-100'
									: 'grid-rows-[0fr] opacity-0'}"
							>
								<div class="overflow-hidden">
									<p class="pb-4 text-[16px] leading-[1.6] text-[#4B5563]">{faq.a}</p>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
		<p class="mt-6 text-center text-[14px] text-[#4B5563] md:hidden">
			{contactNote}
			<a href={contactHref} class="font-medium text-green-deep hover:underline">contact our team</a>
		</p>
	</div>
</section>
