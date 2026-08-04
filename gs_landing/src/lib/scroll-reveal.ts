/**
 * Shared IntersectionObserver for scroll-reveal animations.
 * Adds `is-visible` to elements with `reveal-on-scroll` when they enter viewport.
 */
export function initScrollReveal() {
	const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal-on-scroll'));

	if (prefersReduced) {
		elements.forEach((el) => el.classList.add('is-visible'));
		return () => {};
	}

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

	elements.forEach((el) => {
		el.classList.add('reveal-ready');
		observer.observe(el);
	});

	return () => observer.disconnect();
}
