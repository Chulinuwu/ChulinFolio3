import type { PlotPoint } from '../types/notebook.types';

// Deterministic PRNG so the hand wobble is identical on server and client and between visits.
export function seeded(seed: number) {
	let a = seed | 0;
	return () => {
		a = (a + 0x6d2b79f5) | 0;
		let t = Math.imul(a ^ (a >>> 15), 1 | a);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

const fmt = (v: number) => Number(v.toFixed(2));

// A hand-drawn polyline: each straight segment is subdivided and nudged off its line by a small amount,
// then joined with quadratic curves so the stroke reads as pencil, not a vector rule.
export function pencilPath(points: PlotPoint[], seed: number, amplitude = 1.2, step = 18) {
	const rand = seeded(seed);
	const out: PlotPoint[] = [points[0]];
	for (let i = 1; i < points.length; i++) {
		const a = points[i - 1];
		const b = points[i];
		const length = Math.hypot(b.x - a.x, b.y - a.y);
		const pieces = Math.max(1, Math.round(length / step));
		const nx = -(b.y - a.y) / (length || 1);
		const ny = (b.x - a.x) / (length || 1);
		for (let k = 1; k <= pieces; k++) {
			const t = k / pieces;
			const off = k === pieces ? 0 : (rand() - 0.5) * 2 * amplitude;
			out.push({ x: a.x + (b.x - a.x) * t + nx * off, y: a.y + (b.y - a.y) * t + ny * off });
		}
	}
	let d = `M${fmt(out[0].x)} ${fmt(out[0].y)}`;
	for (let i = 1; i < out.length; i++) {
		const p = out[i - 1];
		const q = out[i];
		d += ` Q${fmt(p.x)} ${fmt(p.y)} ${fmt((p.x + q.x) / 2)} ${fmt((p.y + q.y) / 2)}`;
	}
	const end = out[out.length - 1];
	return `${d} L${fmt(end.x)} ${fmt(end.y)}`;
}
