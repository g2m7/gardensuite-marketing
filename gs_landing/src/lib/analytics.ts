type AnalyticsParameter = string | number | boolean;

declare global {
	interface Window {
		dataLayer?: unknown[];
		gtag?: (...args: unknown[]) => void;
	}
}

export function trackEvent(name: string, parameters: Record<string, AnalyticsParameter> = {}) {
	if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
	window.gtag('event', name, parameters);
}
