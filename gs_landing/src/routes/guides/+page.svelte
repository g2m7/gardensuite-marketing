<script lang="ts">
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { breadcrumbSchema } from '$lib/seo/schemas';
	import Breadcrumbs from '$lib/components/product/Breadcrumbs.svelte';
	import Button from '$lib/components/Button.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup.svelte';

	interface Guide {
		title: string;
		kicker: string;
		description: string;
		href: string;
		readTime: number;
	}

	const guides: Guide[] = [
		{
			title: 'How to Stop Proxy Attendance in Tea Gardens',
			kicker: 'Field Operations',
			description:
				'Why paper muster rolls leak hazira, why fingerprint machines fail in the field, and how offline face attendance helps stop proxy attendance.',
			href: '/guides/stop-proxy-attendance-tea-garden',
			readTime: 7
		},
		{
			title: 'How Face Attendance Works in a Tea Garden',
			kicker: 'Field Operations',
			description:
				'The full verification flow: face quality, liveness checks, retries, manual fallback, and what the office sees after sync.',
			href: '/guides/how-face-attendance-works-tea-garden',
			readTime: 6
		},
		{
			title: 'Smart Leaf Weighing in Tea Gardens',
			kicker: 'Plucking Operations',
			description:
				'How a Bluetooth scale and verified worker identity put net leaf weight on the same record, without handwritten slips.',
			href: '/guides/smart-leaf-weighing-tea-garden',
			readTime: 6
		},
		{
			title: 'Tea Garden Attendance Without Internet',
			kicker: 'Reliability',
			description:
				'What the field app does with no network: local saving, pending and failed record states, and sync when connectivity returns.',
			href: '/guides/tea-garden-attendance-without-internet',
			readTime: 6
		},
		{
			title: 'How Mobile Attendance Reaches the Estate Office',
			kicker: 'Field to Office',
			description:
				'The sync path step by step: capture, upload, office review, correction, finalization, and export for payroll.',
			href: '/guides/mobile-attendance-to-estate-office',
			readTime: 6
		},
		{
			title: 'Worker Face Enrollment Guide for Tea Gardens',
			kicker: 'Implementation',
			description:
				'How to enroll and re-enroll workers, handle photo quality, and keep face templates healthy across the estate.',
			href: '/guides/worker-face-enrollment-tea-garden',
			readTime: 6
		},
		{
			title: 'Attendance and Weighing Rollout Checklist',
			kicker: 'Implementation',
			description:
				'A section-by-section checklist for rolling out face attendance and smart weighing without stopping garden work.',
			href: '/guides/attendance-rollout-checklist-tea-garden',
			readTime: 7
		},
		{
			title: 'Paper Register to Face Attendance',
			kicker: 'Implementation',
			description:
				'A migration guide for moving from muster books to verified attendance, including the parallel run and data handover.',
			href: '/guides/paper-register-to-face-attendance',
			readTime: 7
		},
		{
			title: 'Punch Attendance, Split Shifts and Overtime',
			kicker: 'Field Operations',
			description:
				'How repeated time-in and time-out records cover breaks, split shifts, factory hours, and overtime work.',
			href: '/guides/punch-attendance-split-shifts-overtime',
			readTime: 6
		},
		{
			title: 'Rainfall Deductions and Fine Leaf Checks',
			kicker: 'Plucking Operations',
			description:
				'How wet leaf slabs and fine leaf counts are applied to plucking records, and why recording them together ends disputes.',
			href: '/guides/rainfall-deduction-fine-leaf-plucking',
			readTime: 6
		},
		{
			title: 'Daily Plucking Task Assignment',
			kicker: 'Plucking Operations',
			description:
				'How the office sends section targets to field devices each morning, and how pro-rata tasks are applied.',
			href: '/guides/daily-plucking-task-assignment',
			readTime: 5
		},
		{
			title: 'How Tea Garden Hazira is Calculated',
			kicker: 'Payroll',
			description:
				'Base task norms, over-kilo incentives, wet leaf deductions, and statutory deductions, with a worked example.',
			href: '/guides/how-tea-garden-hazira-is-calculated',
			readTime: 8
		}
	];
</script>

<SeoHead
	title="Tea Garden Guides - Field, Payroll and Weighing | GardenSuite"
	description="Practical guides for tea garden owners and managers: face attendance, smart weighing, offline records, payroll, and rollout. By Sarbani Associates."
	canonical="https://gardensuite.in/guides"
	breadcrumbs={[
		{ name: 'Home', path: '/' },
		{ name: 'Guides', path: '/guides' }
	]}
	schema={[
		breadcrumbSchema([
			{ name: 'Home', path: '/' },
			{ name: 'Guides', path: '/guides' }
		])
	]}
/>

<!-- Header -->
<header class="border-b border-border bg-white pt-28 pb-14 md:pt-36 md:pb-16">
	<div class="mx-auto max-w-4xl px-6 md:px-8">
		<Breadcrumbs
			items={[
				{ name: 'Home', path: '/' },
				{ name: 'Guides', path: '/guides' }
			]}
		/>
		<p class="text-[13px] font-semibold tracking-[0.08em] text-green-deep uppercase">Guides</p>
		<h1
			class="mt-4 text-3xl leading-[1.08] font-semibold tracking-[-0.03em] text-heading sm:text-4xl md:text-[44px]"
			style="text-wrap: balance"
		>
			Tea Garden Operations Guides
		</h1>
		<p class="mt-5 max-w-2xl text-[17px] leading-[1.6] text-text-secondary">
			Plain-language guides for estate owners, managers, and office staff. Written from tea garden
			work, not software jargon. Built and supported by Sarbani Associates, Bagdogra, Siliguri.
		</p>
	</div>
</header>

<!-- Guide list -->
<section class="bg-white py-14 md:py-16">
	<div class="mx-auto max-w-4xl px-6 md:px-8">
		<div class="grid gap-4">
			{#each guides as guide (guide.href)}
				<a
					href={guide.href}
					class="group block rounded-2xl border border-border bg-white p-6 transition-colors hover:border-border-strong md:p-7"
				>
					<div class="flex flex-wrap items-center justify-between gap-2">
						<p class="text-[13px] font-semibold tracking-[0.08em] text-green-deep uppercase">
							{guide.kicker}
						</p>
						<p class="text-xs text-muted">{guide.readTime} min read</p>
					</div>
					<h2
						class="mt-3 text-xl font-semibold tracking-[-0.01em] text-heading group-hover:text-green-deep md:text-2xl"
					>
						{guide.title}
					</h2>
					<p class="mt-2 text-[16px] leading-[1.65] text-text-secondary">{guide.description}</p>
				</a>
			{/each}
		</div>

		<!-- Glossary link -->
		<div class="mt-10 rounded-2xl border border-border bg-surface p-8 text-center">
			<h2 class="text-xl font-semibold tracking-[-0.02em] text-heading md:text-2xl">
				Looking for a term instead?
			</h2>
			<p class="mx-auto mt-2 max-w-xl text-[16px] leading-[1.65] text-text-secondary">
				The <a href="/tea-estate-glossary" class="font-semibold text-green-deep hover:underline"
					>tea estate glossary</a
				> explains hazira, tikka, fine leaf, outturn, and other estate terms in one place.
			</p>
			<ButtonGroup class="mt-6 justify-center">
				<Button href="/#contact" label="Book Free Demo" variant="primary" showIcon />
				<Button href="/tea-estate-glossary" label="Open Glossary" variant="secondary" />
			</ButtonGroup>
		</div>
	</div>
</section>
