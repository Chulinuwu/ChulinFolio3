import { useEffect, useRef, useState } from 'react';
import { spring } from '@/lib/motion/spring';
import { AVATAR, PHOTO } from '../config/assets';
import { COIN, COIN_OVERHANG } from '../config/coin';
import type { CoinFace } from '../types/notebook.types';
import { useReducedMotion } from './useReducedMotion';

// Drives the WebGL coin: tilt follows the mouse, each face change spins it half a turn forward.
// `live` stays false under reduced motion or when WebGL fails, and the caller shows a plain image instead.
export function useAvatarCoin(face: CoinFace) {
	const frame = useRef<HTMLDivElement>(null);
	const canvas = useRef<HTMLCanvasElement>(null);
	const shown = useRef(face);
	const flip = useRef({ count: 0, from: 0, at: -Infinity });
	const clock = useRef({ now: 0, spin: 0 });
	const [live, setLive] = useState(false);
	const reduce = useReducedMotion();

	// Every face change adds half a turn, so the coin always keeps spinning the same way.
	useEffect(() => {
		if (shown.current === face) return;
		shown.current = face;
		Object.assign(flip.current, {
			from: clock.current.spin,
			count: flip.current.count + 1,
			at: clock.current.now
		});
	}, [face]);

	useEffect(() => {
		const host = frame.current;
		const el = canvas.current;
		if (!host || !el || reduce) return;
		let disposed = false;
		let teardown = () => {};

		import('../lib/avatarCoin/scene')
			.then(({ createAvatarCoin }) => createAvatarCoin(el, AVATAR.src, PHOTO.src))
			.then((coin) => {
				if (disposed) return coin.dispose();
				const target = { x: 0, y: 0 };
				const pose = { time: 0, tiltX: 0, tiltY: 0, spin: 0 };
				const start = performance.now();
				let raf = 0;
				let visible = true;

				const resize = () => coin.resize(host.clientWidth * (1 + COIN_OVERHANG * 2));
				const move = (e: PointerEvent) => {
					if (e.pointerType !== 'mouse') return;
					const r = host.getBoundingClientRect();
					target.x = ((e.clientY - r.top) / r.height - 0.5) * 2 * COIN.maxTilt;
					target.y = ((e.clientX - r.left) / r.width - 0.5) * 2 * COIN.maxTilt;
				};
				const leave = () => Object.assign(target, { x: 0, y: 0 });
				const tick = (now: number) => {
					pose.time = (now - start) / 1000;
					clock.current.now = pose.time;
					const f = flip.current;
					const t = pose.time - f.at;
					pose.spin =
						t < COIN.flip.settleS
							? f.from + (f.count * Math.PI - f.from) * spring(t, COIN.flip.freq, COIN.flip.damping)
							: f.count * Math.PI;
					clock.current.spin = pose.spin;
					pose.tiltX += (target.x - pose.tiltX) * COIN.tiltEase;
					pose.tiltY +=
						(target.y + Math.sin(pose.time * 0.8) * COIN.idleSway - pose.tiltY) * COIN.tiltEase;
					coin.render(pose);
					if (visible) raf = requestAnimationFrame(tick);
				};
				const io = new IntersectionObserver(([entry]) => {
					visible = entry.isIntersecting;
					cancelAnimationFrame(raf);
					if (visible) raf = requestAnimationFrame(tick);
				});

				resize();
				io.observe(host);
				window.addEventListener('resize', resize);
				host.addEventListener('pointermove', move);
				host.addEventListener('pointerleave', leave);
				setLive(true);

				teardown = () => {
					cancelAnimationFrame(raf);
					io.disconnect();
					window.removeEventListener('resize', resize);
					host.removeEventListener('pointermove', move);
					host.removeEventListener('pointerleave', leave);
					coin.dispose();
					setLive(false);
				};
			})
			.catch(() => {});

		return () => {
			disposed = true;
			teardown();
		};
	}, [reduce]);

	return { frame, canvas, live };
}
