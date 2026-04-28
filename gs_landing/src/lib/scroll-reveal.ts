/**
 * Shared IntersectionObserver for scroll-reveal animations.
 * Adds `is-visible` to elements with `reveal-on-scroll` when they enter viewport.
 */
export function initScrollReveal() {
	const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.15 }
	);

	document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
		if (prefersReduced) {
			el.classList.add('is-visible');
		} else {
			observer.observe(el);
		}
	});

	return () => observer.disconnect();
}
