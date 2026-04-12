import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	try {
		return await resolve(event);
	} catch (e) {
		if (e instanceof URIError) {
			return new Response('Bad Request', { status: 400 });
		}
		throw e;
	}
};
