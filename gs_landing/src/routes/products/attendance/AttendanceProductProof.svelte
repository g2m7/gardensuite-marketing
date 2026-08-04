<script lang="ts">
	import { trackEvent } from '$lib/analytics';
	import ProductCardFrame from '$lib/components/product/ProductCardFrame.svelte';
	import AttendanceLinkIcon from './AttendanceLinkIcon.svelte';
	import PhoneScreenshot from './PhoneScreenshot.svelte';

	const attendanceLinks = [
		{
			label: 'Face attendance',
			href: '/products/attendance/face-attendance',
			key: 'face',
			icon: 'face' as const
		},
		{
			label: 'Smart weighing',
			href: '/products/attendance/smart-weighing',
			key: 'weighing',
			icon: 'weighing' as const
		},
		{
			label: 'Offline sync',
			href: '/products/attendance/offline-sync',
			key: 'offline',
			icon: 'offline' as const
		}
	];

	const connectedLinks = [
		{
			label: 'Tea garden payroll',
			href: '/products/payroll',
			key: 'payroll',
			icon: 'payroll' as const
		},
		{
			label: 'Daily report',
			href: '/products/mis',
			key: 'mis',
			icon: 'mis' as const
		}
	];

	const linkGroups = [
		{
			heading: 'Attendance products',
			ariaLabel: 'Attendance detail pages',
			links: attendanceLinks
		},
		{
			heading: 'Connected products',
			ariaLabel: 'Connected GardenSuite products',
			links: connectedLinks
		}
	];

	function trackRelatedProduct(product: string) {
		trackEvent('attendance_related_product_click', { product, placement: 'product_proof' });
	}

	function splitLabel(label: string) {
		const lastSpace = label.lastIndexOf(' ');

		return lastSpace === -1
			? { prefix: '', ending: label }
			: { prefix: label.slice(0, lastSpace), ending: label.slice(lastSpace + 1) };
	}
</script>

<section
	id="product-proof"
	class="reveal-on-scroll scroll-mt-20 border-b border-border bg-surface py-16 md:py-24"
	aria-labelledby="attendance-proof-heading"
>
	<div class="mx-auto max-w-[1344px] px-6 md:px-12">
		<div class="mb-10 max-w-[720px] md:mb-14">
			<h2
				id="attendance-proof-heading"
				class="text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-heading md:text-[44px] lg:text-[52px]"
				style="text-wrap: balance"
			>
				Field and office stay connected.
			</h2>
		</div>

		<div class="grid gap-5 lg:grid-cols-2">
			<ProductCardFrame mode="solid" innerClass="p-0">
				<div class="p-7 md:p-8">
					<h3 class="text-[22px] font-semibold tracking-[-0.02em] text-heading">
						GS Face in the field
					</h3>
					<p class="mt-3 max-w-[52ch] text-[15px] leading-[1.6] text-text-secondary">
						Attendance and leaf weight work offline.
					</p>
				</div>
				<div
					class="relative mx-4 mb-4 flex h-[320px] items-start justify-center gap-4 overflow-hidden rounded-xl border border-brand-100 bg-brand-50 pt-7 md:mx-5 md:mb-5 md:h-[380px] md:gap-7 md:pt-9"
				>
					<PhoneScreenshot
						png="/screenshots/11_attendance_active_session.png"
						webp="/screenshots/11_attendance_active_session.webp"
						alt="GardenSuite active attendance session with field work context"
						class="w-[150px] -rotate-2 shadow-[0_10px_28px_rgba(0,0,0,0.10)] md:w-[180px]"
					/>
					<PhoneScreenshot
						png="/screenshots/05_harvest_active_records.png"
						webp="/screenshots/05_harvest_active_records.webp"
						alt="GardenSuite active harvest session with connected scale and saved worker records"
						class="mt-8 w-[150px] rotate-2 shadow-[0_10px_28px_rgba(0,0,0,0.10)] md:w-[180px]"
					/>
				</div>
			</ProductCardFrame>

			<ProductCardFrame mode="solid" innerClass="p-0">
				<div class="p-7 md:p-8">
					<h3 class="text-[22px] font-semibold tracking-[-0.02em] text-heading">
						Daily report in the office
					</h3>
					<p class="mt-3 max-w-[52ch] text-[15px] leading-[1.6] text-text-secondary">
						Review records, sessions and sync status.
					</p>
				</div>
				<div
					class="mx-4 mb-4 flex h-[320px] items-center overflow-hidden rounded-xl border border-border bg-surface p-4 md:mx-5 md:mb-5 md:h-[380px] md:p-6"
				>
					<div
						class="w-full overflow-hidden rounded-xl border border-border bg-white shadow-[0_10px_28px_rgba(0,0,0,0.10)]"
					>
						<div
							class="flex h-8 items-center gap-1.5 border-b border-border bg-[#F4F4F5] px-3"
							aria-hidden="true"
						>
							<span class="h-2.5 w-2.5 rounded-full bg-[#FF5F57]"></span>
							<span class="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]"></span>
							<span class="h-2.5 w-2.5 rounded-full bg-[#28C840]"></span>
						</div>
						<picture>
							<source srcset="/mis-dashboard-1400.webp" type="image/webp" />
							<img
								src="/dashboard.png"
								alt="GardenSuite MIS dashboard for office review"
								width="1400"
								height="757"
								loading="lazy"
								class="h-auto w-full"
							/>
						</picture>
					</div>
				</div>
			</ProductCardFrame>
		</div>

		<div class="mt-12 grid gap-12 border-t border-border pt-9 md:grid-cols-2 md:gap-16 lg:gap-20">
			{#each linkGroups as group}
				<div>
					<h3 class="text-[13px] font-semibold tracking-[0.08em] text-green-deep uppercase">
						{group.heading}
					</h3>
					<nav aria-label={group.ariaLabel} class="mt-5 grid gap-2">
						{#each group.links as link}
							{@const labelParts = splitLabel(link.label)}
							<a
								href={link.href}
								class="group -mx-2 flex min-h-[68px] items-center gap-4 rounded-xl px-2 py-1 text-heading transition-colors duration-200 ease-out hover:bg-white hover:text-green-deep focus-visible:bg-white focus-visible:text-green-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-deep"
								onclick={() => trackRelatedProduct(link.key)}
							>
								<span
									class="flex h-14 w-14 shrink-0 items-center justify-center text-green-deep drop-shadow-[0_1px_2px_rgba(0,0,0,0.10)] transition-transform duration-200 ease-out group-hover:-translate-y-0.5"
								>
									<AttendanceLinkIcon name={link.icon} />
								</span>
								<span class="min-w-0 text-[18px] font-semibold tracking-[-0.01em]">
									{#if labelParts.prefix}{labelParts.prefix}{' '}{/if}<span
										class="whitespace-nowrap"
										>{labelParts.ending}<svg
											class="ml-1 inline-block h-5 w-5 align-[-0.2em] transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="1.8"
											stroke-linecap="round"
											stroke-linejoin="round"
											aria-hidden="true"
										>
											<path d="M7 17 17 7" />
											<path d="M7 7h10v10" />
										</svg></span
									>
								</span>
							</a>
						{/each}
					</nav>
				</div>
			{/each}
		</div>
	</div>
</section>
