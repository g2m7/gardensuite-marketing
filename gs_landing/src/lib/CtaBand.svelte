<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup.svelte';

	const demoHref = '/#contact';
</script>

<section class="flex flex-col items-center w-full py-24 md:py-28 px-6 md:px-14 gap-6 bg-[#0A0A0A]">
	<img src="/gardensuite-icon-white.svg" alt="" class="h-12 w-auto mb-2 opacity-90" aria-hidden="true" width="48" height="48" />
	<h2 class="text-[32px] md:text-[44px] text-center tracking-[-0.05em] leading-[1.05] text-white font-medium" style="text-wrap: balance">
		Ready to modernize your tea garden?
	</h2>
	<p class="text-[15px] text-center leading-[1.5] max-w-[500px] text-[#A3A3A3]">
		Book a free demo and see how GardenSuite can replace paperwork with a single tap. Free on-site setup, free training - no risk. Get running before next season starts.
	</p>
	<ButtonGroup class="pt-4">
		<Button href={demoHref} label="Book Free Demo" variant="primary" size="lg" />
		<Button href="/#contact" label="Email Us" variant="secondary-dark" size="lg" />
	</ButtonGroup>
	<p class="mt-3 text-[12px] text-[#666666]">Reply within 1 working day. Demo scheduling call by the Sarbani team.</p>
</section>
