<script lang="ts">
	import LocationPage from '$lib/components/location/LocationPage.svelte';

	const dooarsProblems = [
		{
			title: 'Slow technician support',
			desc: 'Software vendors based in Kolkata or Bangalore take days to send support staff to North Bengal gardens when hardware needs calibration.'
		},
		{
			title: 'Monsoon weighment bottlenecks',
			desc: 'Heavy monsoon rains across Dooars and Terai slow down afternoon leaf weighment, leading to soggy leaf disputes and paper damage.'
		},
		{
			title: 'Fragmented division records',
			desc: 'Out-gardens and distant divisions struggle to send daily plucking weights to the main estate office on time.'
		}
	];

	const dooarsRollout = [
		{
			step: '1',
			title: 'Same-Day Garden Visit',
			desc: 'Based in Bagdogra and Siliguri, our engineering team visits your estate within hours.'
		},
		{
			step: '2',
			title: 'Line Calibration',
			desc: 'Hardware scales, Bluetooth links, and face recognition tablets configured for your specific weighing sheds.'
		},
		{
			step: '3',
			title: 'Bilingual Training',
			desc: 'Practical, hands-on training for sirdars, munshis, and clerks in Bengali, Hindi, and Nepali.'
		},
		{
			step: '4',
			title: 'Continuous Local Support',
			desc: 'Fast on-site visits whenever your estate adds new divisions or requires staff retraining.'
		}
	];

	const dooarsFaqs = [
		{
			q: 'Where is the GardenSuite support team located?',
			a: 'Sarbani Associates is headquartered in Bagdogra, Siliguri. Our proximity allows us to reach tea gardens across Terai and Dooars within 1-3 hours for setup, servicing, or urgent assistance.'
		},
		{
			q: 'Can GardenSuite handle leaf weighment in rain and field mud?',
			a: 'Yes. The system uses rugged Bluetooth scales and weather-resistant tablet covers designed for field conditions during heavy Dooars monsoon plucking rounds.'
		},
		{
			q: 'Does it support Dooars labor wage agreements and deductions?',
			a: 'Yes. Hazira, plucking task rates, over-kilo incentives, ration allowances, and statutory PF/ESI calculations align directly with regional tea association norms.'
		},
		{
			q: 'Which estates in Dooars and Terai currently use GardenSuite?',
			a: 'GardenSuite powers operations across prominent estates including Rheabari, Mogulkata, Debpara, Kurti, Looksan, Subhasini, Atal, Thanjhora, Naxalbari, and Pahargoomiah.'
		}
	];
</script>

<LocationPage
	seo={{
		title: 'Tea Garden Software Dooars & Terai - Local Support | GardenSuite',
		description:
			'Tea garden software for Dooars and Terai tea estates in Siliguri, Jalpaiguri, and Alipurduar. Local support, face attendance, and leaf weighment.',
		canonical: 'https://gardensuite.in/tea-garden-software-dooars-terai',
		path: '/tea-garden-software-dooars-terai',
		breadcrumbName: 'Tea Garden Software Dooars & Terai',
		schemaName: 'GardenSuite Dooars & Terai Tea Estate Management ERP',
		schemaDescription:
			'Tea garden software with local on-site support from Bagdogra and Siliguri. Provides face attendance, smart leaf weighing, payroll, and factory records for Dooars and Terai plantations.'
	}}
	hero={{
		badgeText: 'Dooars & Terai Estates',
		headline: 'Tea Garden Software with Local Support',
		paragraph:
			'Direct on-site implementation from Bagdogra and Siliguri. Rugged offline face attendance, Bluetooth leaf plucking scales, and daily MIS built for North Bengal tea estates.',
		points: [
			'Headquartered in Bagdogra / Siliguri',
			'Rapid On-Site Support',
			'Trusted by 20+ Regional Estates'
		]
	}}
	problem={{
		headline: 'Operational challenges across Dooars and Terai plantations',
		paragraph:
			'Remote garden locations demand rugged hardware and local technicians who arrive when needed.',
		problems: dooarsProblems
	}}
	workflow={{
		title: 'The Advantage of Local Engineering',
		intro:
			'When plucking is at its peak, you cannot afford software downtime. Sarbani Associates provides same-day on-site support across North Bengal tea gardens.',
		pillars: [
			{
				label: '01 / Proximity',
				title: '1 to 3 Hour Response Time',
				desc: 'Located in Bagdogra, our support engineers reach Jalpaiguri, Alipurduar, and Terai gardens quickly for device setup, scale recalibration, and updates.',
				href: '/products/attendance/offline-sync',
				linkLabel: 'Learn about office sync →'
			},
			{
				label: '02 / Plucking Line',
				title: 'Fast Weighment in Heavy Rain',
				desc: 'Plucking weight connects directly from the hanging hook scale to the worker attendance record over Bluetooth. No wet paper registers, no manual transcription.',
				href: '/products/attendance/smart-weighing',
				linkLabel: 'Explore smart weighing →'
			},
			{
				label: '03 / Management',
				title: 'Daily Estate MIS Online',
				desc: 'View green leaf harvested, labor attendance percentage, and factory production cost per kg from Siliguri, Kolkata, or wherever you travel.',
				href: '/products/mis',
				linkLabel: 'See MIS features →'
			}
		],
		banner: {
			title: 'Need assistance with garden payroll or stores?',
			intro: 'See how GardenSuite automates ',
			links: [
				{ label: 'Wage & PF Calculations', href: '/products/payroll' },
				{ label: 'Fertilizer & Inventory Stock', href: '/products/stores' }
			],
			ctaLabel: 'Book Free Local Demo'
		}
	}}
	rollout={{
		headline: 'Sarbani Associates sets it up with your staff in Dooars & Terai.',
		paragraph:
			'Direct on-site deployment from Bagdogra and Siliguri. Fast setup, line calibration, and local language staff training.',
		steps: dooarsRollout
	}}
	faqs={dooarsFaqs}
	cta={{
		title: 'Meet Our Team in Siliguri or at Your Garden',
		paragraph:
			'Contact Sarbani Associates in Bagdogra for a live demonstration of face attendance and smart leaf scales at your estate office.',
		buttonLabel: 'Book Free On-Site Demo'
	}}
/>
