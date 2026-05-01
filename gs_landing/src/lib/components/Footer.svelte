<script lang="ts">
	import GsLogoAnimation from '$lib/components/GsLogoAnimation.svelte';
</script>

<footer class="bg-white py-8 sm:py-20">
	<div class="mx-auto max-w-[1344px] space-y-16 px-6 md:px-12">
		<div class="grid gap-12 md:grid-cols-5">
			<div class="space-y-6 md:col-span-2 md:space-y-12">
				<a href="/" aria-label="GardenSuite Home" class="flex items-center gap-2.5">
					<GsLogoAnimation class="h-7 w-auto" />
					<span class="text-[17px] font-medium tracking-[-0.01em] text-[#111111]">GardenSuite</span>
				</a>
				<p class="text-balance text-[14px] leading-[1.6] text-[#4B5563]">
					Complete tea garden management software. Built and supported by Sarbani Associates, Bagdogra, Siliguri. Serving tea gardens since 2000.
				</p>
			</div>

			<div class="col-span-3 grid gap-6 sm:grid-cols-3">
				<div class="space-y-4 text-sm">
					<span class="block text-[13px] font-semibold text-[#111111]">Products</span>
					<div class="flex flex-col gap-3">
						<a href="/products/attendance" class="text-[13px] text-[#52525B] transition-colors duration-150 hover:text-[#1B5E3B]">Face Attendance and Smart Weighing</a>
						<a href="/products/payroll" class="text-[13px] text-[#52525B] transition-colors duration-150 hover:text-[#1B5E3B]">Automated Payroll</a>
						<a href="/products/factory" class="text-[13px] text-[#52525B] transition-colors duration-150 hover:text-[#1B5E3B]">Factory Accounts</a>
						<a href="/products/stores" class="text-[13px] text-[#52525B] transition-colors duration-150 hover:text-[#1B5E3B]">Store Management</a>
						<a href="/products/mis" class="text-[13px] text-[#52525B] transition-colors duration-150 hover:text-[#1B5E3B]">Daily Report</a>
					</div>
				</div>

				<div class="space-y-4 text-sm">
					<span class="block text-[13px] font-semibold text-[#111111]">Company</span>
					<div class="flex flex-col gap-3">
						<a href="/#about" class="text-[13px] text-[#52525B] transition-colors duration-150 hover:text-[#1B5E3B]">About</a>
						<a href="/#features" class="text-[13px] text-[#52525B] transition-colors duration-150 hover:text-[#1B5E3B]">Features</a>
						<a href="/#faq-heading" class="text-[13px] text-[#52525B] transition-colors duration-150 hover:text-[#1B5E3B]">FAQ</a>
					</div>
				</div>

				<div class="space-y-4 text-sm">
					<span class="block text-[13px] font-semibold text-[#111111]">Contact</span>
					<div class="flex flex-col gap-3">
						<a href="https://wa.me/919734101330" target="_blank" rel="noreferrer" class="text-[13px] text-[#52525B] transition-colors duration-150 hover:text-[#1B5E3B]">WhatsApp: +91-9734101330</a>
						<a href="mailto:contact@gardensuite.in" class="text-[13px] text-[#52525B] transition-colors duration-150 hover:text-[#1B5E3B]">contact@gardensuite.in</a>
						<a href="/#contact" class="text-[13px] text-[#52525B] transition-colors duration-150 hover:text-[#1B5E3B]">Book Free Demo</a>
					</div>
				</div>
			</div>
		</div>

		<div aria-hidden="true" class="h-px bg-[length:6px_1px] bg-repeat-x opacity-25 [background-image:linear-gradient(90deg,#111111_1px,transparent_1px)]"></div>

		<div class="flex flex-col gap-6">
			<div class="flex flex-wrap items-center justify-between gap-4">
				<span class="text-[13px] text-[#71717A]">&copy; {new Date().getFullYear()} Sarbani Associates. All rights reserved.</span>
				<span class="flex items-center gap-2">
					<span class="relative flex h-2 w-2">
						<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1B5E3B]/30"></span>
						<span class="relative inline-flex h-2 w-2 rounded-full bg-[#1B5E3B]"></span>
					</span>
					<span class="text-[13px] text-[#52525B]">All Systems Online</span>
				</span>
			</div>

			<div class="rounded-2xl border border-[#E4E4E7] bg-[#FAFAF7] px-6 py-5">
				<div class="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
					<div class="flex items-center gap-3">
						<span class="text-[15px] font-semibold tracking-[-0.01em] text-[#111111]">Sarbani Associates</span>
						<span class="text-[13px] text-[#71717A]">Bagdogra, Siliguri</span>
					</div>
					<p class="text-[13px] leading-[1.5] text-[#4B5563]">
						Tea garden software, built on-site. Serving estates in Assam, Dooars, Terai, Darjeeling, Coochbehar, Uttar Dinajpur, and Jalpaiguri since 2000.
					</p>
				</div>
			</div>
		</div>
	</div>
</footer>
