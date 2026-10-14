import { useLayoutEffect, useRef } from 'react';
import { clamp01 } from '@/lib/motion/spring';
import { INTRO } from '../config/intro';
import { quadMatrix } from '../lib/deviceIntro/homography';

// Once the zoom has finished in this visit, later client navigations to home skip it.
let played = false;

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

// Flies the camera from a 3/4 view of the MacBook into its screen as the page scrolls. Each frame the
// live page is mapped onto the projected screen corners with a matrix3d, so it stays real, clickable HTML.
// When the zoom completes the spacer above the page is removed and the scroll shifted by the same amount.
export function useDeviceIntro() {
	const screen = useRef<HTMLDivElement>(null);
	const canvas = useRef<HTMLCanvasElement>(null);

	useLayoutEffect(() => {
		const root = document.documentElement;
		const page = screen.current;
		const el = canvas.current;
		if (!page || !el || played || !window.matchMedia(INTRO.media).matches) {
			root.dataset.intro = 'done';
			return () => void delete root.dataset.intro;
		}

		const distance =
			Math.round((window.innerHeight * INTRO.distance) / INTRO.gridCell) * INTRO.gridCell;
		root.style.setProperty('--intro-d', `${distance}px`);
		root.dataset.intro = 'on';
		let disposed = false;
		let teardown = () => {};

		import('../lib/deviceIntro/scene').then(({ createDeviceScene }) => {
			if (disposed) return;
			const scene = createDeviceScene(
				el,
				getComputedStyle(root).getPropertyValue('--font-girl-next-door') || 'cursive'
			);
			const tilt = { x: 0, y: 0, tx: 0, ty: 0 };
			const start = performance.now();
			let eased = 0;
			let raf = 0;

			const resize = () => scene.resize(page.clientWidth, window.innerHeight);
			const move = (e: PointerEvent) => {
				tilt.tx = e.clientY / window.innerHeight - 0.5;
				tilt.ty = e.clientX / window.innerWidth - 0.5;
			};
			const finish = () => {
				played = true;
				root.dataset.intro = 'done';
				page.style.transform = '';
				window.scrollTo(0, Math.max(0, window.scrollY - distance));
			};
			const tick = (now: number) => {
				const p = clamp01(window.scrollY / distance);
				eased += (easeInOut(p) - eased) * INTRO.ease;
				if (p >= 1 && eased > 0.998) return finish();
				tilt.x += (tilt.tx - tilt.x) * INTRO.ease;
				tilt.y += (tilt.ty - tilt.y) * INTRO.ease;
				const quad = scene.pose({
					progress: eased,
					tiltX: tilt.x,
					tiltY: tilt.y,
					time: (now - start) / 1000
				});
				page.style.transform = `translateY(${window.scrollY - distance}px) ${quadMatrix(page.clientWidth, window.innerHeight, quad)}`;
				el.style.opacity = String(
					1 - clamp01((eased - INTRO.fade[0]) / (INTRO.fade[1] - INTRO.fade[0]))
				);
				raf = requestAnimationFrame(tick);
			};

			resize();
			if (window.scrollY >= distance) finish();
			else {
				window.addEventListener('resize', resize);
				window.addEventListener('pointermove', move, { passive: true });
				raf = requestAnimationFrame(tick);
			}
			teardown = () => {
				cancelAnimationFrame(raf);
				window.removeEventListener('resize', resize);
				window.removeEventListener('pointermove', move);
				scene.dispose();
			};
		});

		return () => {
			disposed = true;
			teardown();
			page.style.transform = '';
			delete root.dataset.intro;
			root.style.removeProperty('--intro-d');
		};
	}, []);

	return { screen, canvas };
}
