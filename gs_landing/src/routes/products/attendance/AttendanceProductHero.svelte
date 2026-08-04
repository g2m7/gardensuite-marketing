<script lang="ts">
	import { trackEvent } from '$lib/analytics';
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
	class="relative w-full overflow-hidden border-b border-border bg-white pt-28 md:pt-32"
	aria-labelledby="attendance-hero-heading"
>
	<div class="mx-auto max-w-[1344px] px-6 md:px-12">
		<div
			class="grid items-start gap-12 pb-16 md:gap-14 md:pb-20 xl:grid-cols-[1.25fr_0.75fr] xl:items-center xl:gap-12 xl:pb-24"
		>
			<div class="max-w-[760px]">
				<h1
					id="attendance-hero-heading"
					class="text-[2.75rem] leading-[0.98] font-medium tracking-[-0.05em] text-heading sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem]"
					style="text-wrap: balance"
				>
					Tea garden attendance system linked to leaf weight.
				</h1>
				<p class="mt-7 max-w-[620px] text-[18px] leading-[1.55] text-text-secondary sm:text-[20px]">
					GS Face verifies workers and records scale weight offline. Data syncs when internet
					returns.
				</p>
				<div class="mt-8">
					<ButtonGroup class="sm:justify-start">
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
					On-site support by Sarbani Associates, Bagdogra, Siliguri.
				</p>
			</div>

			<div
				class="relative flex min-h-[560px] w-full items-center justify-center sm:min-h-[680px] md:min-h-[720px] xl:ml-auto xl:min-h-[760px] xl:max-w-[450px]"
				aria-label="GardenSuite Face scanning a worker for attendance"
			>
				<div class="hero-phone-enter absolute inset-0 flex items-center justify-center">
					<div class="hero-phone-float">
						<PhoneScreenshot
							png="/screenshots/12_attendance_capture_capturing.png"
							webp="/screenshots/12_attendance_capture_capturing.webp"
							alt="GardenSuite Face scanning a tea garden worker for attendance"
							eager
							class="w-[228px] shadow-[0_10px_28px_rgba(0,0,0,0.10)] sm:w-[280px] md:w-[300px] xl:w-[320px]"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes hero-phone-enter {
		from {
			opacity: 0;
			transform: translateY(28px) scale(0.97);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes hero-phone-float {
		0%,
		100% {
			transform: translateY(32px);
		}
		50% {
			transform: translateY(24px);
		}
	}

	.hero-phone-enter {
		animation: hero-phone-enter 850ms cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	.hero-phone-float {
		transform: translateY(32px);
		animation: hero-phone-float 5s cubic-bezier(0.45, 0, 0.55, 1) 900ms infinite;
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-phone-enter,
		.hero-phone-float {
			animation: none;
		}
	}
</style>
