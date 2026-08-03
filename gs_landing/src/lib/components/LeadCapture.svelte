<script lang="ts">
	import { trackEvent } from '$lib/analytics';

	let {
		title = 'Get the GardenSuite attendance guide',
		subtitle = 'See the face attendance and smart weighing workflow in one short guide.',
		buttonText = 'Email me the guide',
		tag = 'attendance-page',
		source = 'attendance-page',
		campaign = 'attendance-guide'
	}: {
		title?: string;
		subtitle?: string;
		buttonText?: string;
		tag?: string;
		source?: string;
		campaign?: string;
	} = $props();

	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let garden = $state('');
	let website = $state('');
	let emailConsent = $state(false);
	let whatsappConsent = $state(false);
	let status = $state<'idle' | 'sending' | 'success' | 'error'>('idle');
	let message = $state('');

	async function submit() {
		status = 'sending';
		message = '';
		try {
			const response = await fetch('/api/subscribe', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name,
					email,
					phone,
					garden,
					website,
					emailConsent,
					whatsappConsent,
					tag,
					source,
					campaign
				})
			});
			const result = (await response.json().catch(() => ({}))) as { message?: string };
			if (!response.ok) throw new Error(result.message || 'Could not save your request.');
			status = 'success';
			message = result.message || 'Thank you. Your guide is ready.';
			trackEvent('generate_lead', { form_name: 'attendance_guide', source });
		} catch (error) {
			status = 'error';
			message = error instanceof Error ? error.message : 'Could not save your request.';
		}
	}
</script>

<section class="bg-[#F4F7F2] px-6 py-16 md:px-12 md:py-20" aria-labelledby="lead-capture-heading">
	<div class="mx-auto grid max-w-[1120px] gap-10 border border-[#D7DED3] bg-white p-6 md:grid-cols-[0.9fr_1.1fr] md:p-10 lg:p-14">
		<div>
			<p class="text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">Product guide</p>
			<h2 id="lead-capture-heading" class="mt-4 text-[32px] leading-[1.1] font-semibold tracking-[-0.04em] text-[#111111] md:text-[40px]">
				{title}
			</h2>
			<p class="mt-4 text-[16px] leading-[1.65] text-[#52525B]">{subtitle}</p>
			<p class="mt-5 text-[13px] leading-[1.6] text-[#71717A]">
				Built and supported by Sarbani Associates, Bagdogra, Siliguri.
			</p>
		</div>

		{#if status === 'success'}
			<div class="flex flex-col justify-center border-l-4 border-[#1B5E3B] bg-[#F0F7F0] p-6">
				<p class="text-[18px] font-semibold text-[#111111]">{message}</p>
				<a
					href="/brochures/GardenSuite_Face_Attendance_Smart_Weighing_Brochure.pdf"
					target="_blank"
					rel="noreferrer"
					class="mt-5 w-fit bg-[#1B5E3B] px-5 py-3 text-[14px] font-semibold text-white hover:bg-[#174E32]"
				>
					Open the guide
				</a>
			</div>
		{:else}
			<form class="grid gap-3.5" onsubmit={(event) => { event.preventDefault(); submit(); }}>
				<input class="border border-[#D1D5DB] bg-white px-4 py-3 text-[14px] outline-none focus:border-[#1B5E3B]" placeholder="Your name" aria-label="Your name" autocomplete="name" required bind:value={name} />
				<input class="border border-[#D1D5DB] bg-white px-4 py-3 text-[14px] outline-none focus:border-[#1B5E3B]" type="email" placeholder="Work email" aria-label="Work email" autocomplete="email" required bind:value={email} />
				<div class="grid gap-3.5 sm:grid-cols-2">
					<input class="border border-[#D1D5DB] bg-white px-4 py-3 text-[14px] outline-none focus:border-[#1B5E3B]" type="tel" placeholder="Phone number" aria-label="Phone number" autocomplete="tel" bind:value={phone} />
					<input class="border border-[#D1D5DB] bg-white px-4 py-3 text-[14px] outline-none focus:border-[#1B5E3B]" placeholder="Garden name" aria-label="Garden name" bind:value={garden} />
				</div>
				<input class="hidden" tabindex="-1" autocomplete="off" aria-hidden="true" bind:value={website} />
				<label class="flex items-start gap-3 text-[13px] leading-[1.5] text-[#3F3F46]">
					<input class="mt-1 h-4 w-4 accent-[#1B5E3B]" type="checkbox" required bind:checked={emailConsent} />
					<span>Email me the guide and useful GardenSuite product updates. I can unsubscribe at any time.</span>
				</label>
				<label class="flex items-start gap-3 text-[13px] leading-[1.5] text-[#3F3F46]">
					<input class="mt-1 h-4 w-4 accent-[#1B5E3B]" type="checkbox" bind:checked={whatsappConsent} />
					<span>You may also contact me on WhatsApp about GardenSuite.</span>
				</label>
				<button type="submit" disabled={status === 'sending'} class="mt-1 bg-[#1B5E3B] px-6 py-3.5 text-[14px] font-semibold text-white hover:bg-[#174E32] disabled:cursor-wait disabled:opacity-70">
					{status === 'sending' ? 'Saving...' : buttonText}
				</button>
				{#if message}
					<p class="bg-[#FEF2F2] px-3 py-2 text-[13px] text-[#991B1B]" role="status">{message}</p>
				{/if}
				<p class="text-[12px] leading-[1.5] text-[#71717A]">
					See our <a href="/privacy" class="underline hover:text-[#1B5E3B]">Privacy Policy</a> and <a href="/terms" class="underline hover:text-[#1B5E3B]">Terms</a>.
				</p>
			</form>
		{/if}
	</div>
</section>
