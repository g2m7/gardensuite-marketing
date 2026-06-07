<script lang="ts">
	let {
		heading = 'FAQs',
		subheading = 'Your questions answered',
		contactNote = "Can't find what you're looking for?",
		contactHref = '#contact',
		categoryLabel = 'General',
		faqs = []
	}: {
		heading?: string;
		subheading?: string;
		contactNote?: string;
		contactHref?: string;
		categoryLabel?: string;
		faqs: Array<{ q: string; a: string }>;
	} = $props();

	let openFaq = $state<number | null>(null);

	function toggleFaq(i: number) {
		openFaq = openFaq === i ? null : i;
	}
</script>

<section
	class="reveal-on-scroll relative w-full overflow-hidden bg-gradient-to-b from-white to-[#F8FAF8] py-24 md:py-32"
	aria-labelledby="faq-heading"
>
	<div class="mx-auto max-w-[1344px] px-6 md:px-12">
		<div class="grid border border-[#E4E4E7] bg-white md:grid-cols-5 md:divide-x md:divide-[#E4E4E7]">
			<!-- Left panel -->
			<div class="p-8 md:col-span-2 md:p-10 lg:p-12">
				<h2
					id="faq-heading"
					class="scroll-mt-20 text-[28px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[36px]"
					style="text-wrap: balance"
				>
					{heading}
				</h2>
				<p class="mt-5 text-[17px] leading-[1.6] text-[#374151]">{subheading}</p>
				<p class="mt-6 hidden text-[16px] text-[#4B5563] md:block">
					{contactNote} <br />
					<a href={contactHref} class="mt-2 inline-block font-medium text-[#1B5E3B] hover:underline"
						>contact our team</a
					>
				</p>
			</div>

			<!-- Right panel: accordion -->
			<div class="space-y-4 p-8 md:col-span-3 md:p-10 lg:p-12">
				<h3 class="pl-6 text-[20px] font-semibold text-[#111111]">{categoryLabel}</h3>
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
							<button
								class="group flex w-full cursor-pointer items-start justify-between gap-4 py-4 text-left transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B5E3B]/30"
								onclick={() => toggleFaq(i)}
								aria-expanded={isOpen}
							>
								<h3 class="text-[17px] font-medium text-[#111111]">{faq.q}</h3>
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
							<div
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
		<p class="mt-8 text-center text-[14px] text-[#4B5563] md:hidden">
			{contactNote}
			<a href={contactHref} class="font-medium text-[#1B5E3B] hover:underline">contact our team</a>
		</p>
	</div>
</section>
