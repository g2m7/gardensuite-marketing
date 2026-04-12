<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<!-- Header -->
<header class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-2">
				<img src="/gardensuite-icon-source.png" alt="GardenSuite" class="h-9 w-9 rounded-lg" />
				<span class="text-xl font-bold text-brand-700 tracking-tight">GardenSuite</span>
			</a>

			<!-- Desktop Nav -->
			<nav class="hidden md:flex items-center gap-8">
				<a href="#features" class="text-sm font-medium text-ink hover:text-brand-600 transition-colors">Features</a>
				<a href="#attendance" class="text-sm font-medium text-ink hover:text-brand-600 transition-colors">Attendance</a>
				<a href="#dashboard" class="text-sm font-medium text-ink hover:text-brand-600 transition-colors">Dashboard</a>
				<a href="#modules" class="text-sm font-medium text-ink hover:text-brand-600 transition-colors">Modules</a>
				<a href="#faq" class="text-sm font-medium text-ink hover:text-brand-600 transition-colors">FAQ</a>
			</nav>

			<!-- CTA -->
			<div class="flex items-center gap-3">
				<a href="#contact" class="hidden sm:inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-soft transition-all hover:scale-[1.02]">
					Get a Demo
				</a>
				<!-- Mobile menu button -->
				<button
					class="md:hidden p-2 text-ink hover:text-brand-600"
					onclick={() => {
						const menu = document.getElementById('mobile-menu');
						if (menu) menu.classList.toggle('hidden');
					}}
					aria-label="Toggle menu"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				</button>
			</div>
		</div>

		<!-- Mobile Nav -->
		<nav id="mobile-menu" class="hidden md:hidden pb-4 border-t border-border pt-3">
			<div class="flex flex-col gap-3">
				<a href="#features" class="text-sm font-medium text-ink hover:text-brand-600 py-1">Features</a>
				<a href="#attendance" class="text-sm font-medium text-ink hover:text-brand-600 py-1">Attendance</a>
				<a href="#dashboard" class="text-sm font-medium text-ink hover:text-brand-600 py-1">Dashboard</a>
				<a href="#modules" class="text-sm font-medium text-ink hover:text-brand-600 py-1">Modules</a>
				<a href="#faq" class="text-sm font-medium text-ink hover:text-brand-600 py-1">FAQ</a>
				<a href="#contact" class="inline-flex items-center justify-center bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-soft">Get a Demo</a>
			</div>
		</nav>
	</div>
</header>

{@render children()}

<!-- Footer -->
<footer class="bg-charcoal text-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
			<!-- Brand -->
			<div class="md:col-span-2">
				<div class="flex items-center gap-2 mb-4">
					<img src="/gardensuite-icon-white.svg" alt="GardenSuite" class="h-8 w-8" />
					<span class="text-lg font-bold tracking-tight">GardenSuite</span>
				</div>
				<p class="text-gray-400 text-sm leading-relaxed max-w-md">
					Complete tea garden management software by Sarbani Associates.
					From plucking to payroll, everything in one place.
				</p>
			</div>
			<!-- Links -->
			<div>
				<h4 class="font-semibold text-sm mb-3 text-gray-300">Product</h4>
				<ul class="space-y-2 text-sm text-gray-400">
					<li><a href="#attendance" class="hover:text-white transition-colors">Face Attendance</a></li>
					<li><a href="#dashboard" class="hover:text-white transition-colors">MIS Dashboard</a></li>
					<li><a href="#modules" class="hover:text-white transition-colors">All Modules</a></li>
					<li><a href="#features" class="hover:text-white transition-colors">Features</a></li>
				</ul>
			</div>
			<div>
				<h4 class="font-semibold text-sm mb-3 text-gray-300">Company</h4>
				<ul class="space-y-2 text-sm text-gray-400">
					<li><a href="#contact" class="hover:text-white transition-colors">Contact Us</a></li>
					<li><a href="#faq" class="hover:text-white transition-colors">FAQ</a></li>
					<li>Bagdogra, Siliguri</li>
					<li>West Bengal, India</li>
				</ul>
			</div>
		</div>
		<div class="mt-10 pt-6 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-3">
			<p class="text-sm text-gray-400">&copy; {new Date().getFullYear()} Sarbani Associates. All rights reserved.</p>
			<p class="text-sm text-gray-500">GardenSuite is a product of Sarbani Associates</p>
		</div>
	</div>
</footer>
