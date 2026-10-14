// The hero wordmark as a halftone of the notebook grid: dots inside the letters swell, the rest stay page dots.
export const HALFTONE = {
	// Fractions of the page grid, so halftone dots always include the page grid's own dots.
	cell: 12,
	smallCell: 6,
	smallBelowPx: 200,
	gridCell: 24,
	subsamples: 4,
	minCover: 0.04,
	dotScale: 1.08,
	gridDot: 2.4,
	revealS: 1.8,
	radius: 170,
	lens: 0.3,
	pointerEase: 0.14,
	activeEase: 0.08,
	scatterSpan: 0.75,
	minFontPx: 64,
	maxDpr: 2,
	ink: [47 / 255, 38 / 255, 41 / 255],
	pink: [204 / 255, 61 / 255, 99 / 255]
} as const;
