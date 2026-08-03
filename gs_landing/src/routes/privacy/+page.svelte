<script lang="ts">
	import LegalPage from '$lib/components/LegalPage.svelte';
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { breadcrumbSchema } from '$lib/seo/schemas';

	const canonical = 'https://gardensuite.in/privacy';
	const description = 'GardenSuite privacy policy for enquiry forms, email updates, WhatsApp contact, Brevo records, and website analytics.';
</script>

<SeoHead
	title="Privacy Policy - GardenSuite Contact Data | GardenSuite"
	{description}
	{canonical}
	ogImage="https://gardensuite.in/mis-dashboard-1400.webp"
	schema={[
		{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'GardenSuite Privacy Policy', url: canonical, description },
		breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy' }])
	]}
/>

<LegalPage
	kicker="Privacy policy"
	title="How GardenSuite handles your contact details"
	intro="This policy explains what Sarbani Associates collects through gardensuite.in, why it is used, and how you can ask us to stop or remove it."
	updated="2 August 2026"
>
	<h2>Who handles the data</h2>
	<p>GardenSuite is built and supported by Sarbani Associates, Bagdogra, Siliguri. Sarbani Associates is responsible for contact details submitted through this website.</p>

	<h2>What we collect</h2>
	<ul>
		<li>Name, work email, phone number, garden name, and your message.</li>
		<li>The page or campaign that brought you to the enquiry form.</li>
		<li>Your separate choices for email updates and WhatsApp contact.</li>
		<li>Basic website activity, only when analytics is configured and you allow it.</li>
	</ul>

	<h2>Why we use it</h2>
	<p>We use enquiry details to reply, arrange a demo, prepare a quotation, or support an existing GardenSuite discussion. We use marketing details only for the channels you select.</p>

	<h2>Email and WhatsApp choices</h2>
	<p>Permission to reply to an enquiry is separate from permission to send product updates. Email and WhatsApp update boxes are optional. You can unsubscribe from email or ask us to stop WhatsApp messages at any time.</p>

	<h2>Services that process data</h2>
	<p>Brevo stores website contacts and sends transactional or marketing email. Google Analytics may measure page visits and enquiry clicks after you allow analytics. These services process data under their own security and privacy terms.</p>

	<h2>How long we keep it</h2>
	<p>We keep active enquiry and customer records while they are needed for sales, support, accounts, or legal records. Marketing contacts are reviewed regularly. Bounced, unsubscribed, or no-longer-needed contacts are suppressed or removed.</p>

	<h2>What we do not do</h2>
	<p>We do not sell contact details. We do not share the consolidated tea estate lead database outside Sarbani Associates.</p>

	<h2>Your choices</h2>
	<p>You can ask what contact data we hold, correct it, withdraw marketing permission, or request removal where records are not required for an active contract or legal duty.</p>

	<h2>Contact us</h2>
	<p>Email <a href="mailto:sarbaniassociates@gmail.com">sarbaniassociates@gmail.com</a> with the subject “Privacy request”. Please include the email address or phone number used in your enquiry.</p>
</LegalPage>
