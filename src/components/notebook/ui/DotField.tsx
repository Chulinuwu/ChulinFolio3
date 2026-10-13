'use client';

import { useEffect, useRef } from 'react';
import { FIELD } from '../config/field';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Swaps the CSS dot grid for a live one that parts around the pointer and ripples on press.
// Loads three.js after first paint; any failure leaves the CSS grid in place.
export default function DotField() {
	const canvas = useRef<HTMLCanvasElement>(null);
	const reduce = useReducedMotion();

	useEffect(() => {
		const el = canvas.current;
		if (!el || reduce) return;
		let disposed = false;
		let teardown = () => {};

		import('../lib/dotField/scene')
			.then(({ createDotField }) => {
				if (disposed) return;
				const field = createDotField(el);
				const root = document.documentElement;
				const target = { x: -9999, y: -9999, on: 0 };
				const frame = {
					time: 0,
					x: -9999,
					y: -9999,
					active: 0,
					scroll: window.scrollY,
					velocity: 0
				};
				const start = performance.now();
				let raf = 0;
				let rippleAt = -Infinity;
				let last = '';

				const resize = () => {
					field.resize(window.innerWidth, window.innerHeight);
					last = '';
				};
				const move = (e: PointerEvent) => {
					if (e.pointerType !== 'mouse') return;
					if (frame.active < 0.01) Object.assign(frame, { x: e.clientX, y: e.clientY });
					Object.assign(target, { x: e.clientX, y: e.clientY, on: 1 });
				};
				const leave = () => (target.on = 0);
				const press = (e: PointerEvent) => {
					rippleAt = frame.time;
					field.ripple(e.clientX, e.clientY, frame.time);
				};
				const tick = (now: number) => {
					frame.time = (now - start) / 1000;
					frame.x += (target.x - frame.x) * FIELD.pointerEase;
					frame.y += (target.y - frame.y) * FIELD.pointerEase;
					frame.active += (target.on - frame.active) * FIELD.activeEase;
					const swell = Math.max(
						-FIELD.swell.max,
						Math.min(FIELD.swell.max, (window.scrollY - frame.scroll) * FIELD.swell.gain)
					);
					frame.velocity += (swell - frame.velocity) * FIELD.swell.ease;
					frame.scroll = window.scrollY;
					// Skip the draw when nothing on screen would change, so an idle page costs nothing.
					const key = `${frame.x.toFixed(1)}|${frame.y.toFixed(1)}|${frame.active.toFixed(3)}|${frame.scroll}|${frame.velocity.toFixed(2)}`;
					if (key !== last || frame.time - rippleAt < FIELD.ripple.life) field.render(frame);
					last = key;
					raf = requestAnimationFrame(tick);
				};

				resize();
				window.addEventListener('resize', resize);
				window.addEventListener('pointermove', move, { passive: true });
				window.addEventListener('pointerdown', press, { passive: true });
				document.addEventListener('pointerleave', leave);
				raf = requestAnimationFrame(tick);
				root.dataset.field = 'live';

				teardown = () => {
					cancelAnimationFrame(raf);
					window.removeEventListener('resize', resize);
					window.removeEventListener('pointermove', move);
					window.removeEventListener('pointerdown', press);
					document.removeEventListener('pointerleave', leave);
					delete root.dataset.field;
					field.dispose();
				};
			})
			.catch(() => {});

		return () => {
			disposed = true;
			teardown();
		};
	}, [reduce]);

	return (
		<canvas
			ref={canvas}
			aria-hidden
			className="pointer-events-none fixed inset-0 -z-10 size-full"
		/>
	);
}
