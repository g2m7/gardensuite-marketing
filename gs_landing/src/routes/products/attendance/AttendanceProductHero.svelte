<script lang="ts">
	import { trackEvent } from '$lib/analytics';
	import Breadcrumbs from '$lib/components/product/Breadcrumbs.svelte';
	import Button from '$lib/components/Button.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup.svelte';
	import PhoneScreenshot from './PhoneScreenshot.svelte';

	function trackDemo() {
		trackEvent('attendance_cta_click', { placement: 'hero', action: 'book_demo' });
	}

	function trackWorkflow() {
		trackEvent('attendance_workflow_click', { placement: 'hero' });
	}
</script>

<section
	class="relative w-full overflow-hidden border-b border-border bg-white pt-28 md:pt-36"
	aria-labelledby="attendance-hero-heading"
>
	<div class="mx-auto max-w-[1344px] px-6 md:px-12">
		<Breadcrumbs
			items={[
				{ name: 'Home', path: '/' },
				{ name: 'Products', path: '/#products' },
				{ name: 'Face Attendance & Smart Weighing', path: '/products/attendance' }
			]}
		/>

		<div class="grid items-center gap-12 pb-16 md:pb-24 lg:grid-cols-[0.96fr_1.04fr] lg:gap-16">
			<div class="max-w-[660px]">
				<span
					class="mb-5 inline-block text-[13px] font-semibold tracking-[0.08em] text-green-deep uppercase"
				>
					Tea garden attendance and smart weighing
				</span>
				<h1
					id="attendance-hero-heading"
					class="text-[2.75rem] leading-[0.98] font-medium tracking-[-0.05em] text-heading sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem]"
					style="text-wrap: balance"
				>
					Tea garden attendance system. Verify workers and leaf weight together.
				</h1>
				<p class="mt-7 max-w-[620px] text-[18px] leading-[1.55] text-text-secondary sm:text-[20px]">
					GS Face checks the worker, reads the Bluetooth scale and saves the field record offline.
					The office receives it when internet returns.
				</p>
				<div class="mt-8">
					<ButtonGroup>
						<Button
							href="/#contact"
							label="Book Free Demo"
							variant="primary"
							showIcon
							onclick={trackDemo}
						/>
						<Button
							href="#workflow"
							label="See how it works"
							variant="secondary"
							onclick={trackWorkflow}
						/>
					</ButtonGroup>
				</div>
				<p class="mt-5 max-w-[600px] text-[13px] leading-[1.6] text-muted">
					Built and supported on-site by Sarbani Associates, Bagdogra, Siliguri.
				</p>
			</div>

			<div
				class="relative mx-auto h-[430px] w-full max-w-[610px] overflow-hidden rounded-3xl border border-brand-100 bg-brand-50 sm:h-[520px] lg:h-[570px]"
				aria-label="GardenSuite Face attendance, smart weighing and sync screens"
			>
				<div
					class="absolute inset-x-0 top-7 text-center text-[12px] font-semibold tracking-[0.08em] text-green-deep uppercase"
				>
					Actual GS Face screens
				</div>

				<PhoneScreenshot
					png="/screenshots/13_attendance_result_matched.png"
					webp="/screenshots/13_attendance_result_matched.webp"
					alt="GardenSuite face attendance result showing a matched worker record"
					eager
					class="absolute top-[94px] left-[7%] w-[126px] -rotate-3 shadow-[0_22px_55px_rgba(0,0,0,0.16)] sm:top-[120px] sm:left-[8%] sm:w-[168px]"
				/>

				<PhoneScreenshot
					png="/screenshots/10_harvest_result_scale_connected_save.png"
					webp="/screenshots/10_harvest_result_scale_connected_save.webp"
					alt="GardenSuite smart weighing result linking scale weight to a worker"
					eager
					class="absolute top-[58px] left-1/2 z-10 w-[180px] -translate-x-1/2 shadow-[0_28px_70px_rgba(0,0,0,0.22)] sm:top-[72px] sm:w-[232px]"
				/>

				<PhoneScreenshot
					png="/screenshots/27_sync_status.png"
					webp="/screenshots/27_sync_status.webp"
					alt="GardenSuite sync screen showing uploaded and pending field records"
					eager={false}
					class="absolute top-[102px] right-[7%] w-[126px] rotate-3 shadow-[0_22px_55px_rgba(0,0,0,0.16)] sm:top-[132px] sm:right-[8%] sm:w-[168px]"
				/>
			</div>
		</div>
	</div>
</section>
