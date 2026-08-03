import { json, type RequestHandler } from '@sveltejs/kit';
import { cleanText, saveLeadToBrevo, validEmail } from '$lib/server/brevo';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json().catch(() => null);
	if (!data || typeof data !== 'object') {
		return json({ message: 'Please fill the form and try again.' }, { status: 400 });
	}

	if (cleanText(data.website, 200)) {
		return json({ message: 'Thank you. Please check your email.' });
	}

	const name = cleanText(data.name, 100);
	const email = cleanText(data.email, 254).toLowerCase();
	const phone = cleanText(data.phone, 40);
	const garden = cleanText(data.garden, 160);
	const source = cleanText(data.source, 100) || 'website';
	const campaign = cleanText(data.campaign, 100) || 'attendance-guide';
	const tag = cleanText(data.tag, 60) || 'attendance-page';
	const emailConsent = data.emailConsent === true;
	const whatsappConsent = data.whatsappConsent === true;

	if (!name) return json({ message: 'Please enter your name.' }, { status: 400 });
	if (!validEmail(email)) {
		return json({ message: 'Please enter a valid email address.' }, { status: 400 });
	}
	if (!emailConsent) {
		return json({ message: 'Please confirm that we may email the guide and product updates.' }, { status: 400 });
	}

	try {
		await saveLeadToBrevo({
			email,
			name,
			phone,
			garden,
			source,
			campaign,
			tags: ['gardensuite', 'brochure-download', tag],
			consent: {
				contact: true,
				emailMarketing: true,
				whatsappMarketing: whatsappConsent
			}
		});

		return json({ message: 'Thank you. Your guide is ready.' });
	} catch (error) {
		console.error('Brevo brochure subscription failed:', error);
		return json(
			{ message: 'Could not save your request right now. Please email Sarbani Associates.' },
			{ status: 502 }
		);
	}
};
