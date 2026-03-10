export function revealOnScroll(node: HTMLElement) {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('revealed');
				}
			});
		},
		{ threshold: 0.1 }
	);
	observer.observe(node);
	return {
		destroy() {
			observer.disconnect();
		}
	};
}
