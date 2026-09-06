<script lang="ts">
	import GsLogoAnimation from '$lib/components/GsLogoAnimation.svelte';
</script>

<footer class="relative overflow-hidden bg-white pt-8 sm:pt-20">
	<div class="relative z-10 mx-auto max-w-[1344px] space-y-16 px-6 pb-8 sm:pb-12 md:px-12">
		<div class="grid gap-12 md:grid-cols-5">
			<div class="space-y-6 md:col-span-2 md:space-y-12">
				<a href="/" aria-label="GardenSuite Home" class="flex items-center gap-2.5">
					<GsLogoAnimation class="h-7 w-auto" />
					<span class="text-[17px] font-medium tracking-[-0.01em] text-[#111111]">GardenSuite</span>
				</a>
				<p class="text-[14px] leading-[1.6] text-balance text-[#4B5563]">
					Complete tea garden management software. Built and supported by Sarbani Associates,
					Bagdogra, Siliguri. Serving tea gardens since 2000.
				</p>
			</div>

			<div class="col-span-3 grid gap-6 sm:grid-cols-4">
				<div class="space-y-4 text-sm">
					<span class="block text-[13px] font-semibold text-[#111111]">Products</span>
					<div class="flex flex-col gap-3">
						<a
							href="/products/attendance"
							class="text-[13px] text-[#52525B] transition-colors duration-150 hover:text-[#1B5E3B]"
							>Face Attendance & Weighing</a
						>
						<a
							href="/products/payroll"
							class="text-[13px] text-[#52525B] transition-colors duration-150 hover:text-[#1B5E3B]"
							>Automated Payroll</a
						>
						<a
							href="/products/factory"
							class="text-[13px] text-[#52525B] transition-colors duration-150 hover:text-[#1B5E3B]"
							>Factory Production</a
						>
						<a
							href="/products/stores"
							class="text-[13px] text-[#52525B] transition-colors duration-150 hover:text-[#1B5E3B]"
							>Store Management</a
						>
						<a
							href="/products/mis"
							class="text-[13px] text-[#52525B] transition-colors duration-150 hover:text-[#1B5E3B]"
							>Daily Report</a
						>
					</div>
				</div>

				<div class="space-y-4 text-sm">
					<span class="block text-[13px] font-semibold text-[#111111]">Regions</span>
					<div class="flex flex-col gap-3">
						<a
							href="/tea-garden-software-assam"
							class="text-[13px] text-[#52525B] transition-colors duration-150 hover:text-[#1B5E3B]"
							>Assam Tea Gardens</a
						>
						<a
							href="/tea-garden-software-dooars-terai"
							class="text-[13px] text-[#52525B] transition-colors duration-150 hover:text-[#1B5E3B]"
							>Dooars & Terai Estates</a
						>
						<a
							href="/tea-garden-software-darjeeling"
							class="text-[13px] text-[#52525B] transition-colors duration-150 hover:text-[#1B5E3B]"
							>Darjeeling Hill Estates</a
						>
					</div>
				</div>

				<div class="space-y-4 text-sm">
					<span class="block text-[13px] font-semibold text-[#111111]">Guides & Resources</span>
					<div class="flex flex-col gap-3">
						<a
							href="/guides/stop-proxy-attendance-tea-garden"
							class="text-[13px] text-[#52525B] transition-colors duration-150 hover:text-[#1B5E3B]"
							>Stop Proxy Attendance</a
						>
						<a
							href="/guides/smart-leaf-weighing-tea-garden"
							class="text-[13px] text-[#52525B] transition-colors duration-150 hover:text-[#1B5E3B]"
							>Smart Leaf Weighing</a
						>
						<a
							href="/tea-estate-glossary"
							class="text-[13px] text-[#52525B] transition-colors duration-150 hover:text-[#1B5E3B]"
							>Tea Operations Glossary</a
						>
					</div>
				</div>

				<div class="space-y-4 text-sm">
					<span class="block text-[13px] font-semibold text-[#111111]">Contact</span>
					<div class="flex flex-col gap-3">
						<a
							href="https://wa.me/919734101330"
							target="_blank"
							rel="noreferrer"
							class="text-[13px] text-[#52525B] transition-colors duration-150 hover:text-[#1B5E3B]"
							>WhatsApp: +91-9734101330</a
						>
						<a
							href="/#contact"
							class="text-[13px] text-[#52525B] transition-colors duration-150 hover:text-[#1B5E3B]"
							>sarbaniassociates@gmail.com</a
						>
						<a
							href="/#contact"
							class="text-[13px] text-[#52525B] transition-colors duration-150 hover:text-[#1B5E3B]"
							>Book Free Demo</a
						>
					</div>
				</div>
			</div>
		</div>

		<div
			aria-hidden="true"
			class="h-px [background-image:linear-gradient(90deg,#111111_1px,transparent_1px)] bg-[length:6px_1px] bg-repeat-x opacity-25"
		></div>

		<div class="flex flex-wrap items-center justify-between gap-4">
			<div class="flex flex-wrap items-center gap-4 text-[13px] text-[#71717A]">
				<span>&copy; {new Date().getFullYear()} Sarbani Associates. All rights reserved.</span>
				<a href="/privacy" class="underline hover:text-[#1B5E3B]">Privacy</a>
				<a href="/terms" class="underline hover:text-[#1B5E3B]">Terms</a>
			</div>
		</div>
	</div>

	<!-- Massive Footer Typography -->
	<div
		class="pointer-events-none relative -mb-[4vw] flex w-full justify-center select-none sm:-mb-[3vw]"
	>
		<!-- Aurora Gradient Strip -->
		<div
			class="absolute -right-10 -bottom-10 -left-10 h-[85%] bg-gradient-to-t from-[#1B5E3B] from-30% via-[#1B5E3B]/60 to-transparent blur-2xl sm:blur-3xl"
		></div>

		<!-- Large white text -->
		<span
			class="relative z-10 text-[24vw] leading-[0.75] font-bold tracking-tighter text-white sm:text-[20vw]"
		>
			sarbaa
		</span>
	</div>
</footer>
