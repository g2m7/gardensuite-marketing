import { env } from '$env/dynamic/private';

const BREVO_API_URL = 'https://api.brevo.com/v3';

export type LeadConsent = {
	contact: boolean;
	emailMarketing: boolean;
	whatsappMarketing: boolean;
};

export type BrevoLead = {
	email?: string;
	name: string;
	phone?: string;
	garden?: string;
	location?: string;
	source: string;
	campaign: string;
	tags: string[];
	consent: LeadConsent;
};

export function cleanText(value: unknown, maxLength = 1000): string {
	return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

export function validEmail(value: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function normalizeIndianPhone(value: string): string {
	const digits = value.replace(/\D/g, '');
	const local = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits;
	return /^[6-9]\d{9}$/.test(local) ? `91${local}` : '';
}

export async function saveLeadToBrevo(lead: BrevoLead): Promise<void> {
	const apiKey = env.BREVO_API_KEY;
	if (!apiKey) throw new Error('BREVO_API_KEY is not configured.');

	const email = cleanText(lead.email, 254).toLowerCase();
	const phone = normalizeIndianPhone(cleanText(lead.phone, 40));
	if (!email && !phone) throw new Error('A valid email or Indian mobile number is required.');
	if (email && !validEmail(email)) throw new Error('The email address is not valid.');

	const today = new Date().toISOString().slice(0, 10);
	const attributes: Record<string, string | boolean> = {
		FIRSTNAME: cleanText(lead.name, 100),
		GARDEN: cleanText(lead.garden, 160),
		LOCATION: cleanText(lead.location, 160),
		SOURCE: cleanText(lead.source, 100),
		CAMPAIGN: cleanText(lead.campaign, 100),
		CONTACT_CONSENT: lead.consent.contact,
		EMAIL_CONSENT: lead.consent.emailMarketing,
		WHATSAPP_CONSENT: lead.consent.whatsappMarketing,
		CONSENT_DATE: today,
		CONSENT_SOURCE: cleanText(lead.source, 100),
		LEGAL_BASIS:
			lead.consent.emailMarketing || lead.consent.whatsappMarketing
				? 'explicit-form-consent'
				: 'enquiry-response-only',
		GARDENSUITE_TAGS: lead.tags.map((tag) => cleanText(tag, 60)).filter(Boolean).join(',')
	};

	if (phone) {
		attributes.SMS = phone;
		attributes.WHATSAPP = phone;
	}

	for (const [key, value] of Object.entries(attributes)) {
		if (value === '') delete attributes[key];
	}

	const listId = Number(env.BREVO_LIST_ID);
	const listIds = lead.consent.emailMarketing && Number.isInteger(listId) && listId > 0 ? [listId] : undefined;
	const response = await fetch(`${BREVO_API_URL}/contacts`, {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'api-key': apiKey,
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			email: email || undefined,
			attributes,
			listIds,
			updateEnabled: true
		})
	});

	if (!response.ok) {
		const details = await response.text().catch(() => '');
		throw new Error(`Brevo contact save failed (${response.status}): ${details.slice(0, 300)}`);
	}
}
