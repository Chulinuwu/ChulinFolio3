// The live dot grid. Cell and dot size match the CSS grid in app.css, so swapping one for the other is invisible.
export const FIELD = {
	cell: 24,
	dotSize: 2.6,
	radius: 150,
	push: 22,
	heatGrow: 1.4,
	pointerEase: 0.16,
	activeEase: 0.08,
	maxDpr: 2,
	swell: { gain: 0.35, max: 14, ease: 0.1 },
	ripple: { speed: 700, width: 46, push: 10, decay: 1.6, life: 2.5 },
	grid: { rgb: [60 / 255, 80 / 255, 120 / 255], alpha: 0.22 },
	pink: [204 / 255, 61 / 255, 99 / 255]
} as const;
