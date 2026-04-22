<script lang="ts">
	import GsLogoAnimation from '$lib/components/GsLogoAnimation.svelte';
</script>

<footer
	class="relative mt-auto flex w-full flex-col overflow-hidden border-t border-[#0000000A] bg-[#FAFAF7] pt-24 pb-0"
>
	<div class="relative z-10 mx-auto w-full max-w-[1100px] px-6 md:px-12">
		<!-- Top: Brand + Navigation Grid -->
		<div class="flex flex-col gap-12 md:flex-row md:gap-16 lg:gap-24">
			<!-- Brand Column -->
			<div class="flex shrink-0 flex-col md:w-[280px]">
				<a href="/" aria-label="GardenSuite Home" class="mb-5 flex items-center gap-2.5">
					<GsLogoAnimation class="h-8 w-auto" />
					<span
						class="text-[17px] font-medium tracking-[-0.01em] text-[#111111]"
						>GardenSuite</span
					>
				</a>
				<p class="text-[13px] leading-[1.5] text-[#666666]">
					Complete tea garden management software. Built and supported by Sarbani Associates,
					Bagdogra, Siliguri.
				</p>
				<p class="mt-4 text-[12px] text-[#A1A1AA]">Serving tea gardens since 2000.</p>
			</div>

			<!-- Nav Columns -->
			<div class="grid flex-1 grid-cols-2 gap-8 md:grid-cols-3">
				<!-- Products -->
				<div class="flex flex-col gap-3">
					<span
						class="text-[11px] font-medium tracking-[0.06em] text-[#999999] uppercase"
						>Products</span
					>
					<a
						href="/products/attendance"
						class="text-[13px] font-medium text-[#52525B] transition-colors hover:text-[#1A5C2E]"
						>Face Attendance &amp; Smart Weighing</a
					>
					<a
						href="/products/payroll"
						class="text-[13px] font-medium text-[#52525B] transition-colors hover:text-[#1A5C2E]"
						>Automated Payroll</a
					>
					<a
						href="/products/factory"
						class="text-[13px] font-medium text-[#52525B] transition-colors hover:text-[#1A5C2E]"
						>Factory Accounts</a
					>
					<a
						href="/products/stores"
						class="text-[13px] font-medium text-[#52525B] transition-colors hover:text-[#1A5C2E]"
						>Store Management</a
					>
					<a
						href="/products/mis"
						class="text-[13px] font-medium text-[#52525B] transition-colors hover:text-[#1A5C2E]"
						>Daily Report</a
					>
				</div>

				<!-- Company -->
				<div class="flex flex-col gap-3">
					<span
						class="text-[11px] font-medium tracking-[0.06em] text-[#999999] uppercase"
						>Company</span
					>
					<a
						href="/#about"
						class="text-[13px] font-medium text-[#52525B] transition-colors hover:text-[#1A5C2E]"
						>About</a
					>
					<a
						href="/#features"
						class="text-[13px] font-medium text-[#52525B] transition-colors hover:text-[#1A5C2E]"
						>Features</a
					>
					<a
						href="/#faq-heading"
						class="text-[13px] font-medium text-[#52525B] transition-colors hover:text-[#1A5C2E]"
						>FAQ</a
					>
				</div>

				<!-- Support -->
				<div class="flex flex-col gap-3">
					<span
						class="text-[11px] font-medium tracking-[0.06em] text-[#999999] uppercase"
						>Support</span
					>
					<a
						href="mailto:contact@gardensuite.in"
						class="text-[13px] font-medium text-[#52525B] transition-colors hover:text-[#1A5C2E]"
						>contact@gardensuite.in</a
					>
					<a
						href="/#contact"
						class="text-[13px] font-medium text-[#52525B] transition-colors hover:text-[#1A5C2E]"
						>Book Free Demo</a
					>
				</div>
			</div>
		</div>

		<!-- Divider -->
		<div class="mt-16 h-px w-full bg-[#E4E4E7]/60"></div>

		<!-- Bottom Bar -->
		<div class="flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
			<span class="text-[12px] text-[#A1A1AA]">
				&copy; {new Date().getFullYear()} Sarbani Associates. All rights reserved.
			</span>
			<span class="flex items-center gap-2.5">
				<span class="h-1.5 w-1.5 rounded-full bg-[#1B5E3B]"></span>
				<span class="text-[12px] font-medium text-[#71717A]"
					>Supported by Sarbani Associates, Bagdogra</span
				>
			</span>
		</div>
	</div>

	<!-- Architectural Watermark -->
	<div
		class="pointer-events-none relative mt-[-10vw] flex w-full select-none justify-center overflow-hidden bg-transparent pb-0"
	>
		<div
			class="absolute left-[35%] top-1/2 z-0 h-[35vw] w-[35vw] -translate-y-1/2 rounded-full bg-[#3D7D2C]/[0.05] blur-[120px]"
		></div>
		<div
			class="relative z-10 translate-y-[35%] whitespace-nowrap pr-8 text-[20vw] font-medium leading-[0.7] tracking-[-0.06em] text-[#EBEBE8]"
		>
			Sarbani
		</div>
	</div>
</footer>
