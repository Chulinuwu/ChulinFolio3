import { HALFTONE } from '../../config/halftone';

// Renders the heading's text with its own computed font, then measures how much of each grid cell the
// letters cover. Cell centres are aligned to the page grid, so the wordmark is made of the page's own dots.
export function sampleCoverage(heading: HTMLElement, origin: DOMRect) {
	const style = getComputedStyle(heading);
	const rect = heading.getBoundingClientRect();
	const raw = (heading.textContent ?? '').trim();
	const text = style.textTransform === 'uppercase' ? raw.toUpperCase() : raw;
	const width = Math.ceil(rect.width);
	const height = Math.ceil(rect.height);
	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext('2d', { willReadFrequently: true });
	if (!ctx || !text || width === 0)
		return { cells: new Float32Array(0), covers: new Float32Array(0), cell: HALFTONE.cell };

	const fontSize = parseFloat(style.fontSize);
	ctx.font = `${style.fontWeight} ${fontSize}px ${style.fontFamily}`;
	ctx.letterSpacing = style.letterSpacing;
	ctx.textBaseline = 'alphabetic';
	const m = ctx.measureText(text);
	ctx.fillText(text, 0, (height + m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2);
	const alpha = ctx.getImageData(0, 0, width, height).data;

	const { gridCell, subsamples, minCover } = HALFTONE;
	const cell = fontSize < HALFTONE.smallBelowPx ? HALFTONE.smallCell : HALFTONE.cell;
	const docLeft = rect.left + window.scrollX;
	const docTop = rect.top + window.scrollY;
	// First cell centre at or after the heading's edge that lines up with the page grid (dots at 24k + 1).
	const startX = ((((1 - docLeft) % gridCell) + gridCell) % gridCell) % cell;
	const startY = ((((1 - docTop) % gridCell) + gridCell) % gridCell) % cell;
	const cells: number[] = [];
	const covers: number[] = [];
	for (let cy = startY; cy < height; cy += cell) {
		for (let cx = startX; cx < width; cx += cell) {
			let hit = 0;
			for (let sy = 0; sy < subsamples; sy++) {
				for (let sx = 0; sx < subsamples; sx++) {
					const x = Math.floor(cx - cell / 2 + ((sx + 0.5) * cell) / subsamples);
					const y = Math.floor(cy - cell / 2 + ((sy + 0.5) * cell) / subsamples);
					if (x >= 0 && y >= 0 && x < width && y < height && alpha[(y * width + x) * 4 + 3] > 127)
						hit++;
				}
			}
			const cover = hit / (subsamples * subsamples);
			if (cover < minCover) continue;
			cells.push(rect.left - origin.left + cx, rect.top - origin.top + cy);
			covers.push(cover);
		}
	}
	return { cells: new Float32Array(cells), covers: new Float32Array(covers), cell };
}
