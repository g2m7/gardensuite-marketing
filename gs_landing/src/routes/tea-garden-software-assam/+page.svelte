<script lang="ts">
	import LocationPage from '$lib/components/location/LocationPage.svelte';

	const assamProblems = [
		{
			title: 'Large morning muster queues',
			desc: 'Hundreds of workers waiting in line for manual roll-call creates delays. Proxy punching leads to unverified hazira payments.'
		},
		{
			title: 'Unstable field internet',
			desc: 'Cloud-only software fails when mobile signals drop in remote garden divisions. Work stops when connectivity is lost.'
		},
		{
			title: 'Leaf weight disputes at weighment',
			desc: 'Handwritten plucking slips often cause arguments over weight entries and daily leaf deduction incentives.'
		}
	];

	const assamRollout = [
		{
			step: '1',
			title: 'Estate Assessment',
			desc: 'Sarbani team reviews your garden division layout, weighment points, and office workflow.'
		},
		{
			step: '2',
			title: 'Hardware & App Setup',
			desc: 'We configure rugged offline tablets, face recognition units, and Bluetooth plucking scales on-site.'
		},
		{
			step: '3',
			title: 'Staff Training',
			desc: 'Hands-on training for munshis, sirdars, factory babus, and garden office clerks.'
		},
		{
			step: '4',
			title: 'Go-Live & Support',
			desc: 'Technicians remain at the garden during initial roll-call and leaf weighment to ensure smooth adoption.'
		}
	];

	const assamFaqs = [
		{
			q: 'Does GardenSuite work during monsoon rain and network blackouts in Assam?',
			a: 'Yes. Attendance capture, leaf weighment, and factory records run fully offline on tablets and office computers. Data syncs automatically whenever an internet connection is available.'
		},
		{
			q: 'Which tea districts in Assam are covered by GardenSuite?',
			a: 'GardenSuite supports tea estates across Upper Assam (Dibrugarh, Tinsukia, Sibsagar, Jorhat, Golaghat), Central Assam (Sonitpur, Nagaon), and the Barak Valley (Cachar, Karimganj).'
		},
		{
			q: 'Does it calculate Assam tea garden wages and statutory PF?',
			a: 'Yes. The payroll module calculates daily hazira, overtime, Sunday plucking rates, incentive slabs, and statutory PF/ESI deductions in line with Assam tea industry wage agreements.'
		},
		{
			q: 'Can estate owners based in Guwahati or Kolkata monitor daily reports?',
			a: 'Yes. Once the garden office syncs at the end of the day, owners and directors can access the MIS dashboard securely from any mobile phone, tablet, or laptop.'
		}
	];
</script>

<LocationPage
	seo={{
		title: 'Tea Garden Software Assam - Attendance, Payroll & Scale | GardenSuite',
		description:
			'Tea garden software for Assam tea estates in Dibrugarh, Tinsukia, Jorhat and Golaghat. Face attendance, wireless leaf weighing, and daily reports.',
		canonical: 'https://gardensuite.in/tea-garden-software-assam',
		path: '/tea-garden-software-assam',
		breadcrumbName: 'Tea Garden Software Assam',
		schemaName: 'GardenSuite Assam Tea Estate Management ERP',
		schemaDescription:
			'Tea garden management ERP software configured for Assam tea estates. Handles biometric face hazira, Bluetooth plucking scales, statutory payroll, and mobile MIS reporting.'
	}}
	hero={{
		badgeText: 'Assam Tea Estates',
		headline: 'Complete Tea Garden Software for Assam',
		paragraph:
			'Designed for large tea plantations across Dibrugarh, Tinsukia, Jorhat, and Golaghat. Works offline at the garden lines with face attendance, Bluetooth leaf scales, and mobile daily reports.',
		points: [
			'Serving Upper & Central Assam',
			'Full Offline Operation',
			'On-Site Setup by Sarbani Associates'
		]
	}}
	problem={{
		headline: 'Common operational challenges in Assam tea plantations',
		paragraph:
			'Managing hundreds of workers across remote divisions requires software built for garden realities.',
		problems: assamProblems
	}}
	workflow={{
		title: 'Built for Assam Field Operations',
		intro:
			'From morning muster in remote out-gardens to evening leaf dispatch at the factory gate, GardenSuite keeps data linked, verified, and accessible.',
		pillars: [
			{
				label: '01 / Attendance',
				title: 'Face Attendance at the Lines',
				desc: 'Munshis take roll-call on rugged mobile tablets using facial recognition. Helps stop proxy hazira even when internet towers are miles away.',
				href: '/products/attendance/face-attendance',
				linkLabel: 'Read face attendance details →'
			},
			{
				label: '02 / Weighing',
				title: 'Wireless Plucking Scales',
				desc: 'Connects Bluetooth hanging scales directly to the attendance record. Plucking leaf weight is recorded instantly without handwritten errors.',
				href: '/products/attendance/smart-weighing',
				linkLabel: 'Read smart weighing details →'
			},
			{
				label: '03 / Executive MIS',
				title: 'Daily Mobile Reports',
				desc: 'Owners and directors receive daily green leaf intake, made tea production, and labor turnout summaries on phone or laptop every evening.',
				href: '/products/mis',
				linkLabel: 'View MIS dashboard preview →'
			}
		],
		banner: {
			title: 'Looking for complete estate modules?',
			intro: 'Explore our dedicated modules for ',
			links: [
				{ label: 'Worker Payroll', href: '/products/payroll' },
				{ label: 'Factory Production', href: '/products/factory' },
				{ label: 'Store Inventory', href: '/products/stores' }
			],
			ctaLabel: 'Book Assam Demo'
		}
	}}
	rollout={{
		headline: 'Sarbani Associates sets it up with your staff in Assam.',
		paragraph:
			'From initial division survey to hardware calibration and bilingual staff training, we ensure smooth adoption at your garden.',
		steps: assamRollout
	}}
	faqs={assamFaqs}
	cta={{
		title: 'Request an On-Site Demo in Assam',
		paragraph:
			'Sarbani Associates provides personal on-site setup and training across tea estates in Upper, Central, and South Assam.',
		buttonLabel: 'Schedule Free On-Site Demo'
	}}
/>
