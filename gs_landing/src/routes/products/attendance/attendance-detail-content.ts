export type DetailFact = {
	label: string;
	text: string;
};

export type DetailStep = {
	number: string;
	title: string;
	description: string;
};

export type DetailCapability = {
	title: string;
	description: string;
};

export type AttendanceDetailConfig = {
	slug: 'face-attendance' | 'smart-weighing' | 'offline-sync';
	pageName: string;
	title: string;
	description: string;
	canonical: string;
	schemaDescription: string;
	featureList: string[];
	kicker: string;
	headline: string;
	lede: string;
	heroImagePng: string;
	heroImageWebp: string;
	heroImageAlt: string;
	facts: DetailFact[];
	problemKicker: string;
	problemHeading: string;
	problemBody: string;
	problemPoints: string[];
	workflowKicker: string;
	workflowHeading: string;
	workflowBody: string;
	steps: DetailStep[];
	proofKicker: string;
	proofHeading: string;
	proofBody: string;
	proofImagePng: string;
	proofImageWebp: string;
	proofImageAlt: string;
	proofImageType?: 'phone' | 'browser';
	capabilitiesKicker: string;
	capabilitiesHeading: string;
	capabilities: DetailCapability[];
	faqs: Array<{ q: string; a: string }>;
	ctaHeading: string;
	ctaBody: string;
};

export const faceAttendanceConfig: AttendanceDetailConfig = {
	slug: 'face-attendance',
	pageName: 'Face Attendance for Tea Gardens',
	title: 'Face Attendance for Tea Gardens - Verified Hazira | GardenSuite',
	description:
		'Face attendance for tea gardens with liveness checks, normal hazira, punch records, overtime, enrollment, and offline saving.',
	canonical: 'https://gardensuite.in/products/attendance/face-attendance',
	schemaDescription:
		'Face attendance software for tea gardens with on-device worker recognition, liveness checks, hazira, punch attendance, enrollment, offline saving, and manual fallback.',
	featureList: [
		'On-device worker face recognition',
		'Liveness and face quality checks',
		'Normal hazira and punch attendance',
		'Overtime and repeated punch records',
		'Offline saving and manual fallback',
		'Worker enrollment and re-enrollment'
	],
	kicker: 'Face attendance for tea gardens',
	headline: 'Face attendance for tea gardens. Verify hazira.',
	lede: 'GS Face checks the worker on an Android phone. Normal attendance, punch work and overtime stay linked to the worker, section and work code.',
	heroImagePng: '/screenshots/13_attendance_result_matched.png',
	heroImageWebp: '/screenshots/13_attendance_result_matched.webp',
	heroImageAlt: 'GardenSuite face attendance result showing a matched worker record',
	facts: [
		{ label: 'On the phone', text: 'Worker recognition runs on the field device.' },
		{ label: 'Face checks', text: 'Quality and liveness checks support the match.' },
		{ label: 'Practical fallback', text: 'Manual attendance records a reason and remarks.' }
	],
	problemKicker: 'The attendance problem',
	problemHeading: 'A name in a register does not confirm the worker.',
	problemBody:
		'Paper hazira and shared attendance devices leave the office with questions. Face attendance adds an identity check before the record is saved.',
	problemPoints: [
		'Proxy attendance can enter payroll before anyone checks the worker.',
		'Punch work, breaks and overtime need more than one daily mark.',
		'Weak internet cannot be allowed to stop field attendance.'
	],
	workflowKicker: 'How face attendance works',
	workflowHeading: 'One worker. One work context. One saved record.',
	workflowBody:
		'The supervisor keeps the same field rhythm while the app records more useful context.',
	steps: [
		{
			number: '01',
			title: 'Prepare the work',
			description: 'Select the section and work code for normal or punch attendance.'
		},
		{
			number: '02',
			title: 'Check the face',
			description: 'The camera checks face quality, liveness and the enrolled worker match.'
		},
		{
			number: '03',
			title: 'Save hazira or punch',
			description: 'The app saves attendance or the next time-in or time-out record.'
		},
		{
			number: '04',
			title: 'Sync for office use',
			description: 'Local records upload when a connection is available for review and payroll use.'
		}
	],
	proofKicker: 'Verified field record',
	proofHeading: 'See the worker, work code and saved attendance together.',
	proofBody:
		'The saved record keeps the verified worker with the section, work code and attendance type. The office can review the same context later.',
	proofImagePng: '/screenshots/11_attendance_active_session.png',
	proofImageWebp: '/screenshots/11_attendance_active_session.webp',
	proofImageAlt:
		'GardenSuite active attendance session showing work context and saved field records',
	capabilitiesKicker: 'Attendance controls',
	capabilitiesHeading: 'Built for normal hazira and repeated punch work.',
	capabilities: [
		{ title: 'Normal attendance', description: 'Save attendance without requiring a leaf weight.' },
		{ title: 'Punch attendance', description: 'Record repeated time-in and time-out punches.' },
		{ title: 'Overtime', description: 'Keep overtime attendance with the worker record.' },
		{
			title: 'Worker enrollment',
			description: 'Capture guided face photos from more than one angle.'
		},
		{
			title: 'Re-enrollment',
			description: 'Replace unclear face data when a worker needs a new capture.'
		},
		{
			title: 'Manual correction',
			description: 'Use a recorded reason when face capture is unavailable.'
		}
	],
	faqs: [
		{
			q: 'Does face attendance work without internet?',
			a: 'Yes. Worker face data and attendance records remain on the authorized phone and sync when connectivity returns.'
		},
		{
			q: 'Does it help stop proxy attendance?',
			a: 'Yes. Face verification and liveness checks help confirm the worker before attendance is saved.'
		},
		{
			q: 'Can it record breaks and overtime?',
			a: 'Yes. Punch attendance supports repeated time-in and time-out records, split work and overtime.'
		},
		{
			q: 'What happens when a face cannot be matched?',
			a: 'The supervisor can retry, re-enroll the worker, or use manual attendance with a recorded reason.'
		}
	],
	ctaHeading: 'See face attendance with your garden workflow.',
	ctaBody:
		'Bring one normal hazira or punch example. The Sarbani team will show worker setup, field capture, fallback and office review.'
};

export const smartWeighingConfig: AttendanceDetailConfig = {
	slug: 'smart-weighing',
	pageName: 'Smart Weighing for Tea Gardens',
	title: 'Smart Weighing for Tea Gardens - Linked Leaf Weight | GardenSuite',
	description:
		'Smart weighing for tea gardens. Capture Bluetooth scale weight, apply tasks and deductions, save offline, and link plucking records to workers.',
	canonical: 'https://gardensuite.in/products/attendance/smart-weighing',
	schemaDescription:
		'Smart weighing software for tea gardens with Bluetooth scale capture, worker face verification, task and deduction rules, offline saving, and harvest session records.',
	featureList: [
		'Bluetooth hanging scale connection',
		'Weight frozen at worker recognition',
		'Manual weight fallback',
		'Bag and rainfall deductions',
		'Plucking task and fine-leaf checks',
		'Offline harvest session records'
	],
	kicker: 'Smart weighing for tea gardens',
	headline: 'Smart weighing for tea gardens. Link every kg.',
	lede: 'The Bluetooth scale sends leaf weight to GS Face. Worker, section, work code, task, deductions and net weight stay together in the harvest record.',
	heroImagePng: '/screenshots/10_harvest_result_scale_connected_save.png',
	heroImageWebp: '/screenshots/10_harvest_result_scale_connected_save.webp',
	heroImageAlt: 'GardenSuite smart weighing result linking the scale reading to a worker',
	facts: [
		{ label: 'Bluetooth scale', text: 'Live weight reaches the field phone.' },
		{ label: 'Worker linked', text: 'The current weight stays with the face-verified worker.' },
		{
			label: 'Manual fallback',
			text: 'The supervisor can enter weight when the scale is unavailable.'
		}
	],
	problemKicker: 'The weighing problem',
	problemHeading: 'A weight chit can lose the worker behind the number.',
	problemBody:
		'When identity and plucking weight are recorded separately, the office has more work to check the correct worker, section, task and deduction.',
	problemPoints: [
		'Leaf weight can be delayed or entered against the wrong worker.',
		'Bag, rainfall and task rules may be applied differently in the field.',
		'Separate attendance and weighing records create repeated office checking.'
	],
	workflowKicker: 'How smart weighing works',
	workflowHeading: 'Face, scale and harvest session work as one flow.',
	workflowBody:
		'The supervisor captures the worker and leaf weight without rebuilding the record later.',
	steps: [
		{
			number: '01',
			title: 'Start the harvest session',
			description: 'Select section, plucking activity, task and rainfall rule.'
		},
		{
			number: '02',
			title: 'Read the scale',
			description: 'The Bluetooth scale sends the current leaf weight to the phone.'
		},
		{
			number: '03',
			title: 'Verify the worker',
			description: 'GS Face checks the worker and freezes the weight for review.'
		},
		{
			number: '04',
			title: 'Save net weight',
			description: 'Gross weight, deductions, net weight and work context save together.'
		}
	],
	proofKicker: 'Linked harvest record',
	proofHeading: 'The worker and net weight stay in one harvest record.',
	proofBody:
		'The field record keeps worker identity, scale reading, allowed deductions, net weight and harvest session context together for office review.',
	proofImagePng: '/screenshots/05_harvest_active_records.png',
	proofImageWebp: '/screenshots/05_harvest_active_records.webp',
	proofImageAlt: 'GardenSuite active harvest session with connected scale and saved worker records',
	capabilitiesKicker: 'Plucking controls',
	capabilitiesHeading: 'More than a number from a hanging scale.',
	capabilities: [
		{
			title: 'Weight freeze',
			description: 'Hold the current scale reading when the worker is recognized.'
		},
		{
			title: 'Bag deduction',
			description: 'Apply the configured fixed or percentage bag deduction.'
		},
		{
			title: 'Rainfall slabs',
			description: 'Use the selected rainfall deduction rule for the session.'
		},
		{
			title: 'Daily task',
			description: 'Bring the section and activity task target into the field session.'
		},
		{
			title: 'Fine-leaf checks',
			description: 'Capture fine-leaf count and sample size when required.'
		},
		{
			title: 'Session totals',
			description: 'Review workers, records and total harvested weight before sync.'
		}
	],
	faqs: [
		{
			q: 'Which scale does GardenSuite use?',
			a: 'GS Face connects to supported Bluetooth hanging scales. The exact scale and device fit is checked during setup.'
		},
		{
			q: 'What if the scale cannot connect?',
			a: 'The supervisor can reconnect the paired scale or use approved manual weight entry to keep field work moving.'
		},
		{
			q: 'Can it apply bag and rainfall deductions?',
			a: 'Yes. The active harvest session can apply the configured bag and rainfall deduction rules.'
		},
		{
			q: 'Does weighing work offline?',
			a: 'Yes. Harvest records save on the phone and remain pending until they sync successfully.'
		}
	],
	ctaHeading: 'See your plucking and weighing flow in the demo.',
	ctaBody:
		'Bring one task, deduction and scale example. The Sarbani team will show the connected worker record from field capture to office review.'
};

export const offlineSyncConfig: AttendanceDetailConfig = {
	slug: 'offline-sync',
	pageName: 'Offline Attendance and Office Sync',
	title: 'Offline Tea Garden Attendance - Sync and Review | GardenSuite',
	description:
		'Offline tea garden attendance saves field records locally, retries uploads, and gives office staff clear review, finalization, and export controls.',
	canonical: 'https://gardensuite.in/products/attendance/offline-sync',
	schemaDescription:
		'Offline tea garden attendance and office sync software with local field saving, pending and failed states, retry, office review, finalization, and attendance export.',
	featureList: [
		'Offline local field record saving',
		'Pending, synced, and failed status',
		'Retry-safe record upload',
		'Employee summary and raw attendance views',
		'Session, map, and sync review',
		'Finalization and attendance export'
	],
	kicker: 'Offline tea garden attendance',
	headline: 'Offline tea garden attendance. Save first, sync later.',
	lede: 'GS Face keeps attendance and harvest records on the phone when the network is weak. GardenSuite shows what arrived, what failed and what is ready for office use.',
	heroImagePng: '/screenshots/27_sync_status.png',
	heroImageWebp: '/screenshots/27_sync_status.webp',
	heroImageAlt: 'GardenSuite sync status showing uploaded and pending field records',
	facts: [
		{ label: 'Local first', text: 'Field records save before a network upload is required.' },
		{ label: 'Visible status', text: 'Pending, synced and failed records stay clear.' },
		{ label: 'Office control', text: 'Staff review and finalize records before downstream use.' }
	],
	problemKicker: 'The connectivity problem',
	problemHeading: 'A weak network should delay upload, not stop field work.',
	problemBody:
		'Internet can change by section and time of day. The field team needs a local record while the office needs clear proof of what reached the central system.',
	problemPoints: [
		'Internet-dependent attendance can stop when the field loses connectivity.',
		'Staff need to know which records are pending, rejected or ready to retry.',
		'Office users need a review step before data moves into the estate workflow.'
	],
	workflowKicker: 'How offline sync works',
	workflowHeading: 'Capture first. Synchronize when the network returns.',
	workflowBody:
		'The record keeps its worker, work, section, time, location and device context throughout the flow.',
	steps: [
		{
			number: '01',
			title: 'Save on the phone',
			description: 'Attendance, harvest, session and weather records save locally.'
		},
		{
			number: '02',
			title: 'Upload when connected',
			description: 'The device sends authenticated record batches when internet is available.'
		},
		{
			number: '03',
			title: 'Review the response',
			description: 'Accepted, rejected and failed records show clear status for follow-up.'
		},
		{
			number: '04',
			title: 'Finalize in the office',
			description: 'Office staff check records before finalization, export or downstream pull.'
		}
	],
	proofKicker: 'Clear office review',
	proofHeading: 'See what arrived, what failed and what needs review.',
	proofBody:
		'Employee summaries, raw records, sessions and sync status help staff check the source behind each total before final office use.',
	proofImagePng: '/dashboard.png',
	proofImageWebp: '/mis-dashboard-1400.webp',
	proofImageAlt: 'GardenSuite MIS dashboard used for office review of garden records',
	proofImageType: 'browser',
	capabilitiesKicker: 'Office review',
	capabilitiesHeading: 'Clear status from local save to final office use.',
	capabilities: [
		{
			title: 'Pending queue',
			description: 'Keep unsent local records visible on the field phone.'
		},
		{
			title: 'Failed record retry',
			description: 'Review the failure and retry records that can be sent again.'
		},
		{
			title: 'Employee summary',
			description: 'See worker-level punch and harvest totals for a date range.'
		},
		{
			title: 'Raw data',
			description: 'Check the detailed attendance and harvest record behind a total.'
		},
		{
			title: 'Sessions and map',
			description: 'Review session context, device details and captured coordinates.'
		},
		{
			title: 'Finalize and export',
			description: 'Prepare reviewed records for export or downstream estate use.'
		}
	],
	faqs: [
		{
			q: 'Can supervisors keep working without internet?',
			a: 'Yes. Field records save locally. They remain pending until the phone can reach the configured GardenSuite system.'
		},
		{
			q: 'Can staff see which records failed?',
			a: 'Yes. Sync status separates uploaded, pending and failed records and provides details for retry and support.'
		},
		{
			q: 'What can the office review?',
			a: 'Office staff can review employee summaries, raw punch and harvest records, maps, sessions, source and sync status.'
		},
		{
			q: 'Can attendance be exported?',
			a: 'Yes. Supported attendance views can export CSV or Excel, including an ERP-import CSV for the raw mobile workflow.'
		}
	],
	ctaHeading: 'See the field-to-office sync with your own example.',
	ctaBody:
		'Bring one weak-network section or office review question. The Sarbani team will show local saving, retry, review and finalization.'
};
