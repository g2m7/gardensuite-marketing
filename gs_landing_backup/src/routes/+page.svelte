<script lang="ts">
	// FAQ toggle state
	const faqOpen = $state<Record<number, boolean>>({});

	function toggleFaq(i: number) {
		faqOpen[i] = !faqOpen[i];
	}

	const faqs = [
		{
			q: 'What is GardenSuite?',
			a: 'GardenSuite is a complete software made specially for tea gardens. It handles everything — from worker attendance and plucking records to payroll, stores, factory accounts and more. It works offline on your computers and also gives you online dashboards to check data from anywhere.'
		},
		{
			q: 'How does the face attendance system work?',
			a: 'Workers stand in front of a mobile phone or tablet with our app. The app recognizes their face and logs their attendance automatically. No cards, no registers, no proxy. For plucking workers, the same app connects to a smart wireless scale — so the worker\'s face is verified and their plucking weight is recorded together, in one step.'
		},
		{
			q: 'Does it work without internet?',
			a: 'Yes. The main software runs on your local computers. It does not need internet to work. Face attendance and the smart scale also work offline at the garden. The data syncs to the cloud dashboard whenever internet is available. So you get full reliability at the garden and easy viewing from anywhere.'
		},
		{
			q: 'What is the MIS Web Dashboard?',
			a: 'It is an online dashboard that shows your daily garden data — plucking, attendance, costs, worker status and more. You can open it from any phone, tablet or computer, from home, office, or while travelling. It updates every day automatically from your garden data.'
		},
		{
			q: 'How long does it take to set up?',
			a: 'The software is installed and customized for your garden. With your master data ready in Excel, you can start getting daily kamjari within 7 days of installation. Our team handles the full setup and training.'
		},
		{
			q: 'What kind of support do you provide?',
			a: 'Remote support from 8 am to 6 pm (AnyDesk / TeamViewer) for same-day resolution. We also provide on-site support from our office in Bagdogra (Siliguri) — we can reach most tea gardens in the region within a few hours by road.'
		},
		{
			q: 'Which tea regions do you serve?',
			a: 'We serve gardens across Assam, Dooars, Terai, Darjeeling and other tea-growing regions in India. Our base in Bagdogra puts us close to the major tea areas.'
		},
		{
			q: 'How much does it cost?',
			a: 'Pricing depends on your garden size and the modules you need. Contact us for a quote — we offer competitive pricing and discounts for multiple estates.'
		}
	];

	const modules = [
		{
			title: 'Kamjari & Payroll',
			desc: 'The heart of daily garden operations. Generate kamjari in minutes, pay workers accurately, and stay compliant with all government formats.',
			features: [
				'Daily kamjari in 10 minutes after data import',
				'Fortnightly wages & monthly salary with payslips',
				'Auto PF returns in government format',
				'Bonus, overtime, leave-with-wages — all automated',
				'Plucking cost analysis per section, per worker',
				'Absent notices, sick & maternity registers',
				'Ration & tea distribution tracking',
				'Loans & advances with auto deduction',
				'RTGS letters for bank payments'
			]
		},
		{
			title: 'Stores Management',
			desc: 'Full control over purchases, issues and stock — from chemicals to spare parts.',
			features: [
				'Purchase register with supplier tracking',
				'Issue register with requisition entry',
				'Stock book and item-at-a-glance reports',
				'Bill tracking and payment marking',
				'Reports by item, supplier, date, purpose'
			]
		},
		{
			title: 'Factory & Bought Leaf',
			desc: 'Track factory production, bought leaf purchases and manufacturing costs.',
			features: [
				'Daily production records',
				'Bought leaf accounting',
				'Manufacturing cost tracking',
				'Green leaf to made tea conversion'
			]
		},
		{
			title: 'Garden Accounts',
			desc: 'Complete financial accounting — cash book, ledgers, SOE, MES and trial balance.',
			features: [
				'Cash book and bank book',
				'Ledger accounts with SOE/MES',
				'Trial balance and financial reports',
				'Integrated with other modules'
			]
		}
	];
</script>

<!-- ==================== HERO ==================== -->
<section class="relative overflow-hidden">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-32">
		<div class="max-w-3xl">
			<div class="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-sm font-medium px-3 py-1.5 rounded-full mb-6 border border-brand-200">
				<span class="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></span>
				By Sarbani Associates — Trusted by Tea Gardens
			</div>
			<h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal leading-tight tracking-tight">
				Tea Garden Software
				<span class="text-brand-600 block">That Actually Works</span>
			</h1>
			<p class="mt-6 text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl">
				From <strong class="text-charcoal">face attendance</strong> that stops proxy entry,
				to <strong class="text-charcoal">smart scale weighing</strong> linked to each worker,
				to <strong class="text-charcoal">payroll in minutes</strong> —
				GardenSuite handles every part of your tea garden management.
			</p>
			<div class="mt-8 flex flex-wrap gap-4">
				<a href="#contact" class="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-7 py-3.5 rounded-xl shadow-soft transition-all hover:scale-[1.02] text-base">
					Get a Free Demo
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
				</a>
				<a href="#features" class="inline-flex items-center gap-2 border-2 border-brand-600 text-brand-700 hover:bg-brand-50 font-semibold px-7 py-3.5 rounded-xl transition-all text-base">
					See How It Works
				</a>
			</div>
		</div>
	</div>
	<!-- Decorative gradient -->
	<div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-50/50 to-transparent pointer-events-none"></div>
</section>

<!-- ==================== TRUST BAR ==================== -->
<section class="border-y border-border bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
			<div>
				<div class="text-2xl sm:text-3xl font-bold text-brand-600">Face ID</div>
				<div class="text-sm text-text-secondary mt-1">Biometric Attendance</div>
			</div>
			<div>
				<div class="text-2xl sm:text-3xl font-bold text-brand-600">Smart Scale</div>
				<div class="text-sm text-text-secondary mt-1">Wireless Weighing</div>
			</div>
			<div>
				<div class="text-2xl sm:text-3xl font-bold text-brand-600">Offline + Cloud</div>
				<div class="text-sm text-text-secondary mt-1">Best of Both Worlds</div>
			</div>
			<div>
				<div class="text-2xl sm:text-3xl font-bold text-brand-600">10 Min</div>
				<div class="text-sm text-text-secondary mt-1">Daily Kamjari Ready</div>
			</div>
		</div>
	</div>
</section>

<!-- ==================== ATTENDANCE & SMART SCALE (FLAGSHIP) ==================== -->
<section id="attendance" class="py-20 lg:py-28">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center max-w-3xl mx-auto mb-14">
			<div class="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide mb-4">
				Our Flagship Product
			</div>
			<h2 class="text-3xl sm:text-4xl font-bold text-charcoal">
				Face Attendance + Smart Scale
			</h2>
			<p class="mt-4 text-lg text-text-secondary leading-relaxed">
				No more fake attendance. No more wrong weights.
				Every worker is verified by face, and every plucking weight is recorded accurately — together, in one step.
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-8 lg:gap-12">
			<!-- Face Attendance Card -->
			<div class="bg-white rounded-2xl border border-border p-8 shadow-card hover:shadow-soft transition-shadow">
				<div class="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center mb-5">
					<svg class="w-7 h-7 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
					</svg>
				</div>
				<h3 class="text-xl font-bold text-charcoal mb-3">Face Recognition Attendance</h3>
				<p class="text-text-secondary leading-relaxed mb-5">
					Workers simply look at the phone or tablet — their attendance is logged automatically.
					No cards to carry, no registers to fill, no one can mark attendance for someone else.
				</p>
				<ul class="space-y-3">
					{#each [
						'Stops proxy ("buddy punching") completely',
						'Works for both plucking and non-plucking workers',
						'Works offline — no internet needed at the garden',
						'Takes just seconds per worker',
						'No extra hardware — uses a phone or tablet'
					] as item}
						<li class="flex items-start gap-2.5">
							<svg class="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
							</svg>
							<span class="text-sm text-ink">{item}</span>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Smart Scale Card -->
			<div class="bg-white rounded-2xl border border-border p-8 shadow-card hover:shadow-soft transition-shadow">
				<div class="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center mb-5">
					<svg class="w-7 h-7 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
					</svg>
				</div>
				<h3 class="text-xl font-bold text-charcoal mb-3">Smart Wireless Scale</h3>
				<p class="text-text-secondary leading-relaxed mb-5">
					When a plucking worker puts their leaf on the scale, their face is verified at the same time.
					The weight is recorded against their name — instantly and correctly. No manual writing, no errors.
				</p>
				<ul class="space-y-3">
					{#each [
						'Face verified + weight recorded in one step',
						'Wireless — no cables or data loggers needed',
						'Also works with Easy Weigh and similar devices',
						'Accurate weight linked to the correct worker',
						'Plucking data goes straight into kamjari'
					] as item}
						<li class="flex items-start gap-2.5">
							<svg class="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
							</svg>
							<span class="text-sm text-ink">{item}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Bottom callout -->
		<div class="mt-10 bg-brand-50 border border-brand-200 rounded-2xl p-6 sm:p-8 text-center">
			<p class="text-brand-800 font-semibold text-lg">
				Works without internet at the garden. Syncs to the cloud when network is available.
			</p>
			<p class="text-brand-700 text-sm mt-2">
				No network problems, no downtime, no data loss. Your garden runs smoothly, always.
			</p>
		</div>
	</div>
</section>

<!-- ==================== MIS WEB DASHBOARD ==================== -->
<section id="dashboard" class="py-20 lg:py-28 bg-surface">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid lg:grid-cols-2 gap-12 items-center">
			<div>
				<div class="inline-flex items-center gap-2 bg-white text-brand-700 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide mb-4 border border-brand-200">
					New
				</div>
				<h2 class="text-3xl sm:text-4xl font-bold text-charcoal">
					Check Your Garden From Anywhere
				</h2>
				<p class="mt-4 text-lg text-text-secondary leading-relaxed">
					Our MIS Web Dashboard puts your daily garden data in your pocket.
					Open it on your phone, tablet or laptop — from home, office, or while travelling.
				</p>
				<ul class="mt-6 space-y-4">
					{#each [
						{ title: 'Daily Updates', desc: 'Attendance, plucking, costs — updated every day automatically' },
						{ title: 'Any Device', desc: 'Phone, tablet, laptop — works on everything with a browser' },
						{ title: 'Cloud Based', desc: 'No setup needed. Just log in and see your data' },
						{ title: 'Safe & Secure', desc: 'Only authorized people can see the data. Fully protected.' }
					] as item}
						<li class="flex items-start gap-3">
							<div class="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
								<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
								</svg>
							</div>
							<div>
								<span class="font-semibold text-charcoal">{item.title}</span>
								<span class="text-text-secondary"> — {item.desc}</span>
							</div>
						</li>
					{/each}
				</ul>
			</div>
			<!-- Dashboard visual placeholder -->
			<div class="bg-white rounded-2xl border border-border shadow-card p-6">
				<div class="bg-brand-50 rounded-xl p-4 mb-4">
					<div class="flex items-center justify-between mb-3">
						<span class="text-sm font-semibold text-brand-700">GardenSuite Dashboard</span>
						<span class="text-xs text-brand-600 bg-white px-2 py-1 rounded-md">Live</span>
					</div>
					<div class="grid grid-cols-3 gap-3">
						<div class="bg-white rounded-lg p-3 text-center">
							<div class="text-lg font-bold text-brand-600">847</div>
							<div class="text-xs text-text-secondary">Workers Today</div>
						</div>
						<div class="bg-white rounded-lg p-3 text-center">
							<div class="text-lg font-bold text-brand-600">12.4T</div>
							<div class="text-xs text-text-secondary">Leaf Plucked</div>
						</div>
						<div class="bg-white rounded-lg p-3 text-center">
							<div class="text-lg font-bold text-brand-600">₹8.2</div>
							<div class="text-xs text-text-secondary">Per Kg Cost</div>
						</div>
					</div>
				</div>
				<div class="space-y-2">
					<div class="flex items-center justify-between text-sm py-2 border-b border-border">
						<span class="text-text-secondary">Section A — Plucking</span>
						<span class="font-medium text-charcoal">2,340 kg</span>
					</div>
					<div class="flex items-center justify-between text-sm py-2 border-b border-border">
						<span class="text-text-secondary">Section B — Plucking</span>
						<span class="font-medium text-charcoal">1,890 kg</span>
					</div>
					<div class="flex items-center justify-between text-sm py-2 border-b border-border">
						<span class="text-text-secondary">Section C — Pruning</span>
						<span class="font-medium text-charcoal">214 workers</span>
					</div>
					<div class="flex items-center justify-between text-sm py-2">
						<span class="text-text-secondary">Attendance Rate</span>
						<span class="font-medium text-brand-600">94.2%</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ==================== BEST OF BOTH WORLDS ==================== -->
<section class="py-20 lg:py-28 bg-brand-600">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<h2 class="text-3xl sm:text-4xl font-bold text-white">
			Best of Both Worlds
		</h2>
		<p class="mt-4 text-lg text-brand-100 max-w-2xl mx-auto">
			Your garden software works offline so nothing stops.
			Your dashboard works online so you can check from anywhere.
		</p>
		<div class="mt-12 grid md:grid-cols-3 gap-8">
			<div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
				<div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
					<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
				</div>
				<h3 class="text-lg font-bold text-white mb-2">Offline at the Garden</h3>
				<p class="text-brand-100 text-sm leading-relaxed">
					The software runs on your local computers. No internet needed.
					No network problems, no downtime. Attendance, weighing, kamjari — everything works, always.
				</p>
			</div>
			<div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
				<div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
					<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
					</svg>
				</div>
				<h3 class="text-lg font-bold text-white mb-2">Cloud When You Need It</h3>
				<p class="text-brand-100 text-sm leading-relaxed">
					Data uploads to the cloud whenever internet is available.
					View your MIS dashboard from anywhere — phone, tablet or computer. No extra setup.
				</p>
			</div>
			<div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
				<div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
					<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
					</svg>
				</div>
				<h3 class="text-lg font-bold text-white mb-2">Secure & Reliable</h3>
				<p class="text-brand-100 text-sm leading-relaxed">
					Face attendance stops all fakery. Password-protected data stops tampering.
					Auto daily backup keeps your records safe. Your data stays yours.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- ==================== FEATURES ==================== -->
<section id="features" class="py-20 lg:py-28">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center max-w-3xl mx-auto mb-14">
			<h2 class="text-3xl sm:text-4xl font-bold text-charcoal">
				Everything a Tea Garden Needs
			</h2>
			<p class="mt-4 text-lg text-text-secondary">
				One software, every task — from field to factory to accounts.
			</p>
		</div>

		<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each [
				{ icon: 'face', title: 'Face Attendance', desc: 'Biometric face recognition for all workers. No proxy, no mistakes.' },
				{ icon: 'scale', title: 'Smart Weighing', desc: 'Wireless scale links weight to the worker\'s face. Plucking data recorded accurately.' },
				{ icon: 'doc', title: 'Instant Kamjari', desc: 'Daily kamjari generated in 10 minutes after importing attendance and weighing data.' },
				{ icon: 'money', title: 'Auto Payroll', desc: 'Wages, salary, PF, bonus, overtime — all calculated automatically in correct formats.' },
				{ icon: 'report', title: 'MIS Reports', desc: 'Cost analysis, plucking reports, section-wise productivity — everything for better decisions.' },
				{ icon: 'cloud', title: 'Cloud Dashboard', desc: 'View daily garden data from any device, anywhere. Updated automatically every day.' },
				{ icon: 'store', title: 'Stores Control', desc: 'Purchase register, issue register, stock tracking — full control of your stores.' },
				{ icon: 'shield', title: 'Data Security', desc: 'Password-protected users, edit controls, auto daily backup. Your data is always safe.' },
				{ icon: 'lan', title: 'Multi-User LAN', desc: 'Run on multiple computers connected by LAN. Different access levels for different users.' }
			] as feature}
				<div class="bg-white rounded-xl border border-border p-6 shadow-card hover:shadow-soft transition-shadow">
					<div class="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center mb-4">
						<svg class="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							{#if feature.icon === 'face'}
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
							{:else if feature.icon === 'scale'}
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
							{:else if feature.icon === 'doc'}
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							{:else if feature.icon === 'money'}
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
							{:else if feature.icon === 'report'}
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
							{:else if feature.icon === 'cloud'}
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
							{:else if feature.icon === 'store'}
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
							{:else if feature.icon === 'shield'}
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
							{:else if feature.icon === 'lan'}
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
							{/if}
						</svg>
					</div>
					<h3 class="font-bold text-charcoal mb-1.5">{feature.title}</h3>
					<p class="text-sm text-text-secondary leading-relaxed">{feature.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ==================== MODULES ==================== -->
<section id="modules" class="py-20 lg:py-28 bg-surface">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center max-w-3xl mx-auto mb-14">
			<h2 class="text-3xl sm:text-4xl font-bold text-charcoal">
				Complete Modules for Every Task
			</h2>
			<p class="mt-4 text-lg text-text-secondary">
				Use all modules together or pick the ones you need. Each one works on its own too.
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-8">
			{#each modules as mod}
				<div class="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-card">
					<h3 class="text-xl font-bold text-brand-700 mb-2">{mod.title}</h3>
					<p class="text-text-secondary mb-5 leading-relaxed">{mod.desc}</p>
					<ul class="space-y-2.5">
						{#each mod.features as f}
							<li class="flex items-start gap-2.5">
								<svg class="w-4 h-4 text-brand-500 mt-1 shrink-0" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
								</svg>
								<span class="text-sm text-ink">{f}</span>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ==================== WHY GARDENSUITE ==================== -->
<section class="py-20 lg:py-28">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center max-w-3xl mx-auto mb-14">
			<h2 class="text-3xl sm:text-4xl font-bold text-charcoal">
				Why GardenSuite?
			</h2>
			<p class="mt-4 text-lg text-text-secondary">
				Built for tea gardens, not boardrooms. Simple, powerful and reliable.
			</p>
		</div>

		<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each [
				{
					title: 'Made for Tea Gardens',
					desc: 'This is not a general business tool adapted for tea. Every feature — from plucking averages to boidar-wise reports — is built specifically for how tea gardens actually work.'
				},
				{
					title: 'Stops Attendance Fraud',
					desc: 'Face recognition means no worker can mark attendance for another. The smart scale links weight to the verified worker. Accurate data from the ground up.'
				},
				{
					title: 'Works Without Internet',
					desc: 'Your garden may not always have good network. That\'s fine. The software works fully offline. Data syncs to the cloud when connection is available.'
				},
				{
					title: 'Quick Setup',
					desc: 'Get your first kamjari within 7 days of installation. We handle customization, master data setup, testing and training. You just start using it.'
				},
				{
					title: 'Fast Support',
					desc: 'Remote support 8 am to 6 pm for same-day fixes. On-site support from our Bagdogra office — close to all major tea growing areas.'
				},
				{
					title: 'Customized for You',
					desc: 'Every garden works a little differently. We customize the software during installation to match your specific needs, wage structures and workflows.'
				}
			] as reason}
				<div class="text-center">
					<h3 class="text-lg font-bold text-charcoal mb-2">{reason.title}</h3>
					<p class="text-sm text-text-secondary leading-relaxed">{reason.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ==================== FAQ ==================== -->
<section id="faq" class="py-20 lg:py-28 bg-surface">
	<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-14">
			<h2 class="text-3xl sm:text-4xl font-bold text-charcoal">
				Common Questions
			</h2>
		</div>

		<div class="space-y-3">
			{#each faqs as faq, i}
				<div class="bg-white rounded-xl border border-border overflow-hidden">
					<button
						class="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
						onclick={() => toggleFaq(i)}
					>
						<span class="font-semibold text-charcoal">{faq.q}</span>
						<svg
							class="w-5 h-5 text-brand-500 shrink-0 transition-transform {faqOpen[i] ? 'rotate-180' : ''}"
							fill="none" stroke="currentColor" viewBox="0 0 24 24"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</button>
					{#if faqOpen[i]}
						<div class="px-6 pb-4 text-text-secondary leading-relaxed">
							{faq.a}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ==================== CTA / CONTACT ==================== -->
<section id="contact" class="py-20 lg:py-28">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="bg-brand-600 rounded-3xl px-6 sm:px-12 py-12 sm:py-16 text-center relative overflow-hidden">
			<!-- Decorative -->
			<div class="absolute top-0 right-0 w-64 h-64 bg-brand-500 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
			<div class="absolute bottom-0 left-0 w-48 h-48 bg-brand-700 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50"></div>

			<div class="relative z-10 max-w-2xl mx-auto">
				<h2 class="text-3xl sm:text-4xl font-bold text-white">
					Ready to Run Your Garden Better?
				</h2>
				<p class="mt-4 text-lg text-brand-100">
					Get a free demo and see how GardenSuite can save you time, stop attendance issues, and give you full control of your garden data.
				</p>

				<div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
					<a href="mailto:info@gardensuite.in" class="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-50 transition-colors text-base w-full sm:w-auto justify-center">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
						Email Us
					</a>
					<a href="tel:+919876543210" class="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors text-base w-full sm:w-auto justify-center">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
						</svg>
						Call Us
					</a>
				</div>

				<p class="mt-6 text-sm text-brand-200">
					A product of <strong>Sarbani Associates</strong> &middot; Bagdogra, Siliguri
				</p>
			</div>
		</div>
	</div>
</section>
