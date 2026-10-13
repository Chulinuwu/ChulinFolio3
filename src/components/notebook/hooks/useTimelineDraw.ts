import { useEffect, useRef } from 'react';
import { clamp01, spring } from '@/lib/motion/spring';
import { TIMELINE_MOTION } from '../config/timeline';
import { useInView } from './useInView';
import { useReducedMotion } from './useReducedMotion';

// Bars start collapsed by CSS once armed; a spring sweeps across the years and grows each bar over
// its own months. Reduced motion jumps straight to the finished timeline.
export function useTimelineDraw() {
	const root = useRef<HTMLDivElement>(null);
	const reduce = useReducedMotion();
	const seen = useInView(root);

	useEffect(() => {
		const el = root.current;
		if (!el) return;
		const finish = () => el.setAttribute('data-drawn', '');
		if (reduce) return finish();
		el.setAttribute('data-armed', '');
		if (!seen) return;
		const bars = Array.from(el.querySelectorAll<HTMLElement>('[data-bar]')).map((bar) => ({
			bar,
			from: Number(bar.dataset.from),
			to: Number(bar.dataset.to)
		}));

		let raf = 0;
		const start = performance.now();
		const tick = (now: number) => {
			const t = (now - start) / 1000;
			const sweep = spring(t, TIMELINE_MOTION.freq, TIMELINE_MOTION.damping);
			bars.forEach((b) => (b.bar.style.scale = `${clamp01((sweep - b.from) / (b.to - b.from))} 1`));
			if (t < TIMELINE_MOTION.settleS) {
				raf = requestAnimationFrame(tick);
				return;
			}
			bars.forEach((b) => (b.bar.style.scale = ''));
			finish();
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [seen, reduce]);

	return root;
}
