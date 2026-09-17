<script lang="ts">
	import LocationPage from '$lib/components/location/LocationPage.svelte';

	const darjeelingProblems = [
		{
			title: 'Steep slopes & zero signal',
			desc: 'Pluckers work on steep hill sections where mobile network coverage is non-existent. Cloud software simply cannot load.'
		},
		{
			title: 'Delicate flush weighment accuracy',
			desc: 'First flush and second flush crop yields require precise gram-level accuracy. Mistakes in field recording directly affect revenue.'
		},
		{
			title: 'Scattered worker outposts',
			desc: 'Workers are spread across distant ridges and high-elevation divisions, making central morning roll-call impractical.'
		}
	];

	const darjeelingRollout = [
		{
			step: '1',
			title: 'Division Survey',
			desc: 'Our team evaluates section boundaries, elevation profiles, and weighment collection points.'
		},
		{
			step: '2',
			title: 'Offline Kit Deployment',
			desc: 'Lightweight handheld tablets with facial verification and portable Bluetooth hanging scales.'
		},
		{
			step: '3',
			title: 'Staff Onboarding',
			desc: 'Friendly training for sardars and clerks in Nepali and Hindi directly at the garden division.'
		},
		{
			step: '4',
			title: 'Factory Data Integration',
			desc: 'Connecting section leaf intake directly to withering trough records and invoice dispatch.'
		}
	];

	const darjeelingFaqs = [
		{
			q: 'Can the attendance app work without cellular data on steep hills?',
			a: 'Yes. Face attendance runs completely offline on the device without requiring SIM cards or Wi-Fi. The data syncs when the supervisor returns to the division shed or estate office.'
		},
		{
			q: 'How does GardenSuite handle high-value specialty tea batches?',
			a: 'The factory module tracks batch-level production from specific garden sections through withering, rolling, and sorting, preserving leaf origin details for premium invoices.'
		},
		{
			q: 'Which Darjeeling estates have used GardenSuite?',
			a: 'Long-standing Darjeeling estates including Simulbarie Tea Estate and Longview Tea Estate have utilized systems developed by Sarbani Associates.'
		},
		{
			q: 'Does it support hill worker wage and plucking task rules?',
			a: 'Yes. Daily task hazira, extra plucking leaf rates, seasonal incentives, and statutory PF calculations conform to Darjeeling hill tea industry guidelines.'
		}
	];
</script>

<LocationPage
	seo={{
		title: 'Tea Garden ERP Darjeeling - Hill Estate Management | GardenSuite',
		description:
			'Tea garden ERP software for Darjeeling hill tea estates. Steep slope mobile face attendance, rugged leaf weighing, and daily factory batch tracking.',
		canonical: 'https://gardensuite.in/tea-garden-software-darjeeling',
		path: '/tea-garden-software-darjeeling',
		breadcrumbName: 'Tea Garden ERP Darjeeling',
		schemaName: 'GardenSuite Darjeeling Hill Tea Estate Management ERP',
		schemaDescription:
			'Tea estate ERP designed for Darjeeling hill plantations. Features offline mobile face attendance on steep slopes, Bluetooth hanging scales, and factory batch tracking.'
	}}
	hero={{
		badgeText: 'Darjeeling Hill Estates',
		headline: 'Tea Garden ERP for Darjeeling Hill Estates',
		paragraph:
			'Engineered for high elevation, rugged slopes, and zero-connectivity ridges. Works 100% offline with face recognition attendance, Bluetooth hanging scales, and flush quality tracking.',
		points: [
			'Built for High Elevation Slopes',
			'True Offline Face Verification',
			'Batch Origin Tracking'
		]
	}}
	problem={{
		headline: 'Challenges unique to Darjeeling hill plantations',
		paragraph:
			'High terrain and scattered divisions demand lightweight offline technology that never breaks down.',
		problems: darjeelingProblems
	}}
	workflow={{
		title: 'Hill Terrain Capabilities',
		intro:
			'Whether plucking on steep ridge faces or managing delicate orthodox factory rolls, GardenSuite simplifies hill operations.',
		pillars: [
			{
				label: '01 / Rugged Mobility',
				title: 'Slope Attendance Without Network',
				desc: 'Supervisors take attendance directly on the hill trails. Biometric face matching verifies identity instantly without carrying paper registers across ridges.',
				href: '/products/attendance/face-attendance',
				linkLabel: 'Read face attendance details →'
			},
			{
				label: '02 / Accurate Weighing',
				title: 'Bluetooth Hanging Scales',
				desc: 'Portable digital hanging scales transmit leaf weight directly to the supervisor tablet. Eliminates disputes over daily fine leaf deductions and incentives.',
				href: '/products/attendance/smart-weighing',
				linkLabel: 'Read smart weighing details →'
			},
			{
				label: '03 / Quality Control',
				title: 'Factory Production Tracking',
				desc: 'Track green leaf intake from high-elevation divisions directly to orthodox made tea outturn, grading percentages, and dispatch invoices.',
				href: '/products/factory',
				linkLabel: 'Explore factory features →'
			}
		],
		banner: {
			title: 'Looking for daily executive oversight?',
			intro: 'Check daily plucking weights and manufacturing progress on our ',
			links: [{ label: 'Daily MIS Dashboard', href: '/products/mis' }],
			ctaLabel: 'Book Darjeeling Demo'
		}
	}}
	rollout={{
		headline: 'Sarbani Associates sets it up with your staff in Darjeeling.',
		paragraph:
			'Customized for hill terrain operations. Division survey, rugged offline tablet deployment, and hands-on staff training.',
		steps: darjeelingRollout
	}}
	faqs={darjeelingFaqs}
	cta={{
		title: 'Request an On-Site Demo in Darjeeling',
		paragraph:
			'Sarbani Associates provides hands-on setup and training customized for hill terrain operations.',
		buttonLabel: 'Schedule Free On-Site Demo'
	}}
/>
