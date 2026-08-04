<script lang="ts">
	import { trackEvent } from '$lib/analytics';

	const capabilities = [
		{
			title: 'Face attendance',
			description: 'Worker verification, normal hazira, punch records and overtime.',
			href: '/products/attendance/face-attendance',
			linkLabel: 'Explore face attendance',
			key: 'face-attendance'
		},
		{
			title: 'Smart weighing',
			description: 'Bluetooth leaf weight linked to the verified worker and session.',
			href: '/products/attendance/smart-weighing',
			linkLabel: 'Explore smart weighing',
			key: 'smart-weighing'
		},
		{
			title: 'Offline and sync',
			description: 'Local saving in weak-network areas, with visible sync status.',
			href: '/products/attendance/offline-sync',
			linkLabel: 'Explore offline and sync',
			key: 'offline-sync'
		},
		{
			title: 'Office review',
			description: 'Check records and prepare trusted data for the estate workflow.',
			href: '/products/attendance/offline-sync#office-review',
			linkLabel: 'Explore office review',
			key: 'office-review'
		}
	];

	function trackCapability(capability: string) {
		trackEvent('attendance_capability_click', { capability });
	}
</script>

<section
	class="reveal-on-scroll border-b border-border bg-white py-16 md:py-24"
	aria-labelledby="attendance-capabilities-heading"
>
	<div class="mx-auto max-w-[1344px] px-6 md:px-12">
		<div class="mb-10 max-w-[720px] md:mb-14">
			<h2
				id="attendance-capabilities-heading"
				class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-heading md:text-[44px] lg:text-[52px]"
				style="text-wrap: balance"
			>
				Start with the part you need to understand.
			</h2>
		</div>

		<div class="grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
			{#each capabilities as item}
				<article
					class="border-b border-border bg-white p-5 sm:p-6 sm:odd:border-r lg:min-h-[200px] lg:border-r lg:last:border-r-0"
				>
					<h3 class="text-[17px] font-semibold tracking-[-0.01em] text-heading">
						{item.title}
					</h3>
					<p class="mt-3 text-[14px] leading-[1.6] text-text-secondary">{item.description}</p>
					{#if item.href}
						<a
							href={item.href}
							class="mt-7 inline-flex min-h-11 items-center text-[14px] font-semibold text-green-deep underline-offset-4 hover:underline"
							onclick={() => trackCapability(item.key)}
						>
							{item.linkLabel}
						</a>
					{/if}
				</article>
			{/each}
		</div>
	</div>
</section>
