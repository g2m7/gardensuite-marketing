<script lang="ts">
	const demoHref = 'mailto:contact@gardensuite.in?subject=GardenSuite%20Demo%20Request';
</script>

<section class="flex flex-col items-center w-full py-24 md:py-28 px-6 md:px-14 gap-6 bg-[#0A0A0A]">
	<img src="/gardensuite-icon-white.svg" alt="" class="h-12 w-auto mb-2 opacity-90" aria-hidden="true" width="48" height="48" />
	<h2 class="text-[32px] md:text-[40px] text-center tracking-[-0.02em] leading-[1.15] text-white font-extrabold" style="text-wrap: balance">
		Ready to modernize your tea garden?
	</h2>
	<p class="text-[15px] text-center leading-[1.6] max-w-[500px] text-[#A3A3A3] ">
		Book a free demo and see how GardenSuite can replace paperwork with a single tap. Free setup, free training - no risk.
	</p>
	<div class="flex flex-col sm:flex-row pt-4 gap-4 w-full sm:w-auto">
		<a
			href={demoHref}
			class="flex items-center justify-center rounded-full py-3.5 px-8 bg-[#1B5E3B] hover:bg-[#144723] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5CA84A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] active:scale-[0.97]"
		>
			<span class="font-semibold text-sm text-white">
				Book a Demo
			</span>
		</a>
		<a
			href="mailto:contact@gardensuite.in"
			class="flex items-center justify-center rounded-full py-3.5 px-8 border border-[#333333] hover:bg-[#1A1A1A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5CA84A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] active:scale-[0.97]"
		>
			<span class="font-semibold text-sm text-white">
				Contact Us
			</span>
		</a>
	</div>
</section>
