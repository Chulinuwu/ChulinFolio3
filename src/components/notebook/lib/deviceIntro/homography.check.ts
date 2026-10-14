import assert from 'node:assert/strict';
import { applyQuadMatrix } from './homography.ts';

const quad = [
	{ x: 100, y: 80 },
	{ x: 900, y: 40 },
	{ x: 950, y: 600 },
	{ x: 60, y: 520 }
] as const;
const box = [
	[0, 0],
	[1440, 0],
	[1440, 900],
	[0, 900]
];
box.forEach(([x, y], i) => {
	const p = applyQuadMatrix(1440, 900, [...quad], x, y);
	assert.ok(
		Math.abs(p.x - quad[i].x) < 1e-3 && Math.abs(p.y - quad[i].y) < 1e-3,
		`corner ${i}: ${JSON.stringify(p)}`
	);
});
const flat = applyQuadMatrix(
	1440,
	900,
	[
		{ x: 0, y: 0 },
		{ x: 1440, y: 0 },
		{ x: 1440, y: 900 },
		{ x: 0, y: 900 }
	],
	700,
	333
);
assert.ok(
	Math.abs(flat.x - 700) < 1e-6 && Math.abs(flat.y - 333) < 1e-6,
	'identity quad maps points to themselves'
);
console.log('homography ok');
