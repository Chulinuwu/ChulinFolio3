// Closed-form damped spring: a pure function of elapsed time, so any frame (or scroll
// position) can be evaluated without simulating the frames before it.
export function spring(tau: number, freq = 3, damping = 0.6) {
	if (tau <= 0) return 0;
	const w = 2 * Math.PI * freq;
	const wd = w * Math.sqrt(1 - damping * damping);
	return 1 - Math.exp(-damping * w * tau) * (Math.cos(wd * tau) + ((damping * w) / wd) * Math.sin(wd * tau));
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const progress = (t: number, start: number, duration: number) => clamp01((t - start) / duration);
