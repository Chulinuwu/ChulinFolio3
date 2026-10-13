import { useEffect, useState, type RefObject } from 'react';

export function useInView(ref: RefObject<Element | null>, rootMargin = '0px 0px -12% 0px') {
	const [seen, setSeen] = useState(false);
	useEffect(() => {
		const el = ref.current;
		if (!el || seen) return;
		const io = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) setSeen(true);
		}, { rootMargin });
		io.observe(el);
		return () => io.disconnect();
	}, [ref, rootMargin, seen]);
	return seen;
}
