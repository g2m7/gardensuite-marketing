<script lang="ts">
	import LegalPage from '$lib/components/LegalPage.svelte';
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { breadcrumbSchema } from '$lib/seo/schemas';

	const canonical = 'https://gardensuite.in/terms';
	const description = 'GardenSuite website and enquiry terms covering demos, quotations, annual software plans, scales, training, support, and acceptable use.';
</script>

<SeoHead
	title="Website Terms - GardenSuite Sales and Support | GardenSuite"
	{description}
	{canonical}
	ogImage="https://gardensuite.in/mis-dashboard-1400.webp"
	schema={[
		{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'GardenSuite Website Terms', url: canonical, description },
		breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Website Terms', path: '/terms' }])
	]}
/>

<LegalPage
	kicker="Website terms"
	title="Terms for GardenSuite enquiries and website use"
	intro="These terms cover gardensuite.in, product enquiries, demos, quotations, and sales discussions with Sarbani Associates. A signed quotation or agreement controls any purchase."
	updated="2 August 2026"
>
	<h2>Website purpose</h2>
	<p>This website explains GardenSuite products for tea gardens. It is general sales information. It is not a final quotation, installation promise, or service contract.</p>

	<h2>Demos and enquiries</h2>
	<p>The first product demo is free. Sarbani Associates will confirm the scope, timing, location, and staff involved before any garden visit.</p>

	<h2>Pricing and payment</h2>
	<p>Annual software plans currently start from Rs. 10,000. Wireless scales, on-site training, and travel are charged separately unless a written quotation says otherwise. Software can be billed annually or quarterly, with a minimum one-year subscription. Current quotations take priority over website copy.</p>

	<h2>Setup and training</h2>
	<p>Remote onboarding is included for Nano and Small plans. On-site training and travel are quoted according to the garden location and work required. Rollout time depends on devices, worker records, staff availability, and the agreed scope.</p>

	<h2>Product operation</h2>
	<p>GardenSuite is designed to work offline for supported garden workflows and sync when internet becomes available. Actual results depend on correct devices, staff use, data quality, and the configured modules.</p>

	<h2>Customer responsibilities</h2>
	<ul>
		<li>Provide accurate worker, rate, garden, and contact information.</li>
		<li>Use supported Android devices, power, and internet where required.</li>
		<li>Protect login details and limit access to authorised staff.</li>
		<li>Use attendance and worker data according to applicable law and internal policy.</li>
	</ul>

	<h2>Intellectual property</h2>
	<p>GardenSuite software, design, documentation, and brand material belong to Sarbani Associates or its licensors. A purchase provides the agreed right to use the product. It does not transfer ownership of the software.</p>

	<h2>Client confidentiality</h2>
	<p>Many estates keep software details private. Sarbani Associates respects this and will not use a client name, logo, quotation, or internal result publicly without permission.</p>

	<h2>Email and WhatsApp</h2>
	<p>Submitting an enquiry allows Sarbani Associates to reply about that enquiry. Product updates by email or WhatsApp are sent only according to the choices recorded on the form or an existing business relationship. You can ask us to stop at any time.</p>

	<h2>Changes and governing law</h2>
	<p>These website terms may be updated when products or sales terms change. Indian law applies. Any signed quotation or agreement may contain more specific terms and will take priority.</p>

	<h2>Contact</h2>
	<p>Questions can be sent to <a href="mailto:sarbaniassociates@gmail.com">sarbaniassociates@gmail.com</a>.</p>
</LegalPage>
