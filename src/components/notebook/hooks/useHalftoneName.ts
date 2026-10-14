import { useEffect, useRef, useState } from 'react';
import { clamp01 } from '@/lib/motion/spring';
import { HALFTONE } from '../config/halftone';
import { useReducedMotion } from './useReducedMotion';

// Mounts the halftone wordmark over its section. `live` turns true once dots are on screen,
// which is the caller's cue to hide the plain heading text (it stays in the DOM for readers).
export function useHalftoneName() {
	const section = useRef<HTMLElement>(null);
	const heading = useRef<HTMLHeadingElement>(null);
	const canvas = useRef<HTMLCanvasElement>(null);
	const [live, setLive] = useState(false);
	const reduce = useReducedMotion();

	useEffect(() => {
		const host = section.current;
		const title = heading.current;
		const el = canvas.current;
		if (!host || !title || !el || reduce) return;
		if (parseFloat(getComputedStyle(title).fontSize) < HALFTONE.minFontPx) return;
		let disposed = false;
		let teardown = () => {};

		Promise.all([
			import('../lib/halftoneName/scene'),
			import('../lib/halftoneName/sample'),
			document.fonts.ready
		])
			.then(([{ createHalftoneName }, { sampleCoverage, pageOffset }]) => {
				if (disposed) return;
				const scene = createHalftoneName(el);
				const target = { x: -9999, y: -9999, on: 0 };
				const frame = { time: 0, reveal: 0, scatter: 0, x: -9999, y: -9999, active: 0 };
				const start = performance.now();
				let raf = 0;
				let visible = true;

				const layout = () => {
					const { cells, covers, cell } = sampleCoverage(title);
					scene.layout(host.offsetWidth, host.offsetHeight, cells, covers, cell);
				};
				const move = (e: PointerEvent) => {
					if (e.pointerType !== 'mouse') return;
					const box = host.getBoundingClientRect();
					Object.assign(target, { x: e.clientX - box.left, y: e.clientY - box.top, on: 1 });
				};
				const leave = () => (target.on = 0);
				const tick = (now: number) => {
					frame.time = (now - start) / 1000;
					frame.reveal = clamp01(frame.time / HALFTONE.revealS);
					frame.scatter = clamp01(
						(window.scrollY - pageOffset(host).top) / (host.offsetHeight * HALFTONE.scatterSpan)
					);
					if (frame.active < 0.01) Object.assign(frame, { x: target.x, y: target.y });
					frame.x += (target.x - frame.x) * HALFTONE.pointerEase;
					frame.y += (target.y - frame.y) * HALFTONE.pointerEase;
					frame.active += (target.on - frame.active) * HALFTONE.activeEase;
					scene.render(frame);
					if (visible) raf = requestAnimationFrame(tick);
				};
				const io = new IntersectionObserver(([entry]) => {
					visible = entry.isIntersecting;
					cancelAnimationFrame(raf);
					if (visible) raf = requestAnimationFrame(tick);
				});

				layout();
				io.observe(host);
				window.addEventListener('resize', layout);
				host.addEventListener('pointermove', move);
				host.addEventListener('pointerleave', leave);
				setLive(true);

				teardown = () => {
					cancelAnimationFrame(raf);
					io.disconnect();
					window.removeEventListener('resize', layout);
					host.removeEventListener('pointermove', move);
					host.removeEventListener('pointerleave', leave);
					scene.dispose();
					setLive(false);
				};
			})
			.catch(() => {});

		return () => {
			disposed = true;
			teardown();
		};
	}, [reduce]);

	return { section, heading, canvas, live };
}
