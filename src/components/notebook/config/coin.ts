import type { CoinFace } from '../types/notebook.types';

// The avatar as a two-sided coin: her drawing on the front, her photo on the back.
export const COIN = {
	thickness: 0.07,
	segments: 96,
	fov: 30,
	distance: 4.63,
	edgeColor: 0x2f2629,
	maxTilt: 0.38,
	tiltEase: 0.12,
	idleSway: 0.06,
	flip: { freq: 1.1, damping: 0.42, settleS: 2.4 },
	maxDpr: 2
} as const;

export const COIN_LABELS: Record<CoinFace, string> = {
	drawing: 'Show my photo',
	photo: 'Show my drawing'
};

// The canvas overhangs the ring by this much on each side so a tilted coin is never cropped.
export const COIN_OVERHANG = 0.12;
