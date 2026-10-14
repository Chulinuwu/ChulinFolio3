// The home page opens on a MacBook whose screen is the live site; scrolling flies the camera into the screen.
export const INTRO = {
	// Scroll distance of the zoom, as a fraction of the viewport height, rounded to whole grid cells.
	distance: 1.5,
	gridCell: 24,
	ease: 0.1,
	media: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
	model: '/models/macbook.glb',
	fov: 30,
	// Opening camera: orbit angles around the laptop and distance in metres.
	start: { yaw: -0.5, pitch: 0.32, distance: 0.95, target: [0, 0.07, -0.02] },
	tilt: 0.16,
	float: 0.004,
	// The display panel's corners in model space (metres), inset to the glass inside the bezel.
	screen: {
		topLeft: [-0.14815, 0.1886, -0.18805],
		topRight: [0.14831, 0.1886, -0.18805],
		bottomRight: [0.14831, 0.0156, -0.12545],
		bottomLeft: [-0.14815, 0.0156, -0.12545]
	},
	// Last stretch of the zoom where the screen eases onto the exact window rectangle,
	// and the window over which the laptop fades out just before it.
	settleFrom: 0.88,
	fade: [0.72, 0.9]
} as const;

export const INTRO_COPY = {
	credit: 'MacBook Pro 3D model on the home page by akshatmittal, CC BY 4.0',
	creditHref:
		'https://sketchfab.com/3d-models/2021-macbook-pro-14-m1-pro-m1-max-f6b0b940fb6a4286b18a674ef32af2d3'
} as const;

// Polaroids floating around the laptop: real project shots and her photo, in metres around the model.
export const INTRO_CARDS = [
	{
		src: '/projects/nubsatang.webp',
		label: 'Nubsatang',
		position: [-0.27, 0.19, -0.12],
		rotation: [0.05, 0.45, 0.07]
	},
	{
		src: '/projects/aivertise.webp',
		label: 'Aivertise',
		position: [0.27, 0.22, -0.18],
		rotation: [0.08, -0.25, -0.06]
	},
	{
		src: '/notebook/photo.webp',
		label: 'Chulin',
		position: [-0.25, 0.045, 0.08],
		rotation: [-0.12, 0.55, -0.05]
	},
	{
		src: '/projects/aurora.webp',
		label: 'Aurora Analytic AI',
		position: [0.29, 0.03, 0.05],
		rotation: [-0.08, -0.4, 0.05]
	},
	{
		src: '/projects/ugc.webp',
		label: 'UGC Moderation',
		position: [0.0, 0.3, -0.32],
		rotation: [0.1, 0.1, -0.04]
	}
] as const;

export const CARD = {
	width: 0.11,
	px: 512,
	pad: 22,
	labelPx: 46,
	labelBand: 92,
	shadowPx: 28,
	float: 0.006,
	scatter: 1.6
} as const;
