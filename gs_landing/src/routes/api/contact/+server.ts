import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const DEFAULT_TO = 'sarbaniassociates@gmail.com';
const DEFAULT_SENDER_NAME = 'GardenSuite';

function clean(value: unknown): string {
	return typeof value === 'string' ? value.trim().slice(0, 1000) : '';
}

function escapeHtml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json().catch(() => null);

	if (!data || typeof data !== 'object') {
		return json({ message: 'Please fill the form and try again.' }, { status: 400 });
	}

	const need = clean(data.need) || 'GardenSuite enquiry';
	const name = clean(data.name);
	const phone = clean(data.phone);
	const email = clean(data.email);
	const garden = clean(data.garden);
	const message = clean(data.message);

	if (!name) {
		return json({ message: 'Please enter your name.' }, { status: 400 });
	}

	if (!phone && !email) {
		return json({ message: 'Please enter a phone number or email address.' }, { status: 400 });
	}

	const brevoApiKey = env.BREVO_API_KEY;
	const mailTo = env.CONTACT_TO || DEFAULT_TO;
	const senderEmail = env.BREVO_SENDER_EMAIL;
	const senderName = env.BREVO_SENDER_NAME || DEFAULT_SENDER_NAME;

	if (!brevoApiKey || !senderEmail) {
		console.error('Contact form email is not configured. Missing BREVO_API_KEY or BREVO_SENDER_EMAIL.');
		return json(
			{ message: 'Email sending is not configured yet. Please use WhatsApp for now.' },
			{ status: 503 }
		);
	}

	const lines = [
		`Need: ${need}`,
		`Name: ${name}`,
		phone ? `Phone: ${phone}` : '',
		email ? `Email: ${email}` : '',
		garden ? `Garden: ${garden}` : '',
		message ? `Message: ${message}` : ''
	].filter(Boolean);

	const htmlRows = lines
		.map((line) => {
			const [label, ...rest] = line.split(':');
			return `<tr><td style="padding:8px 12px;font-weight:700;border-bottom:1px solid #e5e7eb;">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${escapeHtml(rest.join(':').trim())}</td></tr>`;
		})
		.join('');

	try {
		const response = await fetch('https://api.brevo.com/v3/smtp/email', {
			method: 'POST',
			headers: {
				accept: 'application/json',
				'api-key': brevoApiKey,
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				sender: {
					name: senderName,
					email: senderEmail
				},
				to: [
					{
						email: mailTo
					}
				],
				replyTo: email
					? {
							email,
							name: name || undefined
						}
					: undefined,
				subject: `GardenSuite - ${need}`,
				htmlContent: `<h2 style="font-family:Arial,sans-serif;">New GardenSuite enquiry</h2><table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">${htmlRows}</table>`
			})
		});

		if (!response.ok) {
			const details = await response.text().catch(() => '');
			console.error('Brevo email failed:', response.status, details);
			throw new Error('Brevo rejected the enquiry email.');
		}

		return json({ message: 'Enquiry sent. We will contact you soon.' });
	} catch (error) {
		console.error('Contact form email failed:', error);
		return json(
			{ message: 'Could not send the enquiry right now. Please use WhatsApp for now.' },
			{ status: 502 }
		);
	}
};
