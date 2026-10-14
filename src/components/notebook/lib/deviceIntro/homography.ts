import type { Quad } from '../../types/notebook.types';

// CSS matrix3d that maps an element's w x h box onto any four points (top-left, top-right,
// bottom-right, bottom-left), i.e. the projective map from a rectangle to a quadrilateral (Heckbert).
export function quadMatrix(w: number, h: number, [p0, p1, p2, p3]: Quad) {
	const dx1 = p1.x - p2.x;
	const dx2 = p3.x - p2.x;
	const dx3 = p0.x - p1.x + p2.x - p3.x;
	const dy1 = p1.y - p2.y;
	const dy2 = p3.y - p2.y;
	const dy3 = p0.y - p1.y + p2.y - p3.y;
	const det = dx1 * dy2 - dx2 * dy1;
	const g = det === 0 ? 0 : (dx3 * dy2 - dx2 * dy3) / det;
	const k = det === 0 ? 0 : (dx1 * dy3 - dx3 * dy1) / det;
	const a = p1.x - p0.x + g * p1.x;
	const b = p3.x - p0.x + k * p3.x;
	const d = p1.y - p0.y + g * p1.y;
	const e = p3.y - p0.y + k * p3.y;
	const m = [a / w, d / w, 0, g / w, b / h, e / h, 0, k / h, 0, 0, 1, 0, p0.x, p0.y, 0, 1];
	return `matrix3d(${m.map((v) => v.toFixed(12)).join(',')})`;
}

export function applyQuadMatrix(w: number, h: number, quad: Quad, x: number, y: number) {
	const m = quadMatrix(w, h, quad).slice(9, -1).split(',').map(Number);
	const z = m[3] * x + m[7] * y + m[15];
	return { x: (m[0] * x + m[4] * y + m[12]) / z, y: (m[1] * x + m[5] * y + m[13]) / z };
}
