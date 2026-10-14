import {
	CanvasTexture,
	Group,
	Mesh,
	MeshBasicMaterial,
	PlaneGeometry,
	SRGBColorSpace
} from 'three';
import { CARD, INTRO_CARDS } from '../../config/intro';

const loadImage = (src: string) =>
	new Promise<HTMLImageElement>((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = reject;
		img.src = src;
	});

// A polaroid drawn to a canvas: white card, cover-cropped photo, ink edge, a handwritten caption and a
// soft shadow baked into the transparent margin so it reads as paper above the page.
function drawCard(img: HTMLImageElement, label: string, handFont: string) {
	const { px, pad, labelBand, labelPx, shadowPx } = CARD;
	const w = px;
	const h = px + labelBand;
	const canvas = document.createElement('canvas');
	canvas.width = w + shadowPx * 2;
	canvas.height = h + shadowPx * 2;
	const ctx = canvas.getContext('2d');
	if (!ctx) return canvas;
	ctx.translate(shadowPx, shadowPx);
	ctx.shadowColor = 'rgba(47, 38, 41, 0.22)';
	ctx.shadowBlur = shadowPx;
	ctx.shadowOffsetY = shadowPx / 3;
	ctx.fillStyle = '#ffffff';
	ctx.fillRect(0, 0, w, h);
	ctx.shadowColor = 'transparent';

	const inner = w - pad * 2;
	const scale = Math.max(inner / img.width, inner / img.height);
	const sw = inner / scale;
	const sh = inner / scale;
	ctx.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, pad, pad, inner, inner);
	ctx.strokeStyle = 'rgba(47, 38, 41, 0.82)';
	ctx.lineWidth = 3;
	ctx.strokeRect(1.5, 1.5, w - 3, h - 3);
	ctx.fillStyle = '#2f2629';
	ctx.font = `${labelPx}px ${handFont}`;
	ctx.textBaseline = 'middle';
	ctx.fillText(label, pad + 4, px + labelBand / 2 - 6, inner);
	return canvas;
}

export async function createCards(handFont: string, maxAnisotropy: number) {
	const group = new Group();
	const cards = await Promise.all(
		INTRO_CARDS.map(async (spec) => {
			const canvas = drawCard(await loadImage(spec.src), spec.label, handFont);
			const map = new CanvasTexture(canvas);
			map.colorSpace = SRGBColorSpace;
			map.anisotropy = maxAnisotropy;
			const height = (CARD.width * canvas.height) / canvas.width;
			const mesh = new Mesh(
				new PlaneGeometry(CARD.width, height),
				new MeshBasicMaterial({ map, transparent: true, toneMapped: false })
			);
			mesh.position.set(spec.position[0], spec.position[1], spec.position[2]);
			mesh.rotation.set(spec.rotation[0], spec.rotation[1], spec.rotation[2]);
			group.add(mesh);
			return { mesh, base: mesh.position.clone() };
		})
	);
	return { group, cards };
}

// A soft oval of shade under the laptop so it rests on the page.
export function createContactShadow() {
	const canvas = document.createElement('canvas');
	canvas.width = 256;
	canvas.height = 256;
	const ctx = canvas.getContext('2d');
	if (ctx) {
		const g = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
		g.addColorStop(0, 'rgba(47, 38, 41, 0.38)');
		g.addColorStop(0.55, 'rgba(47, 38, 41, 0.12)');
		g.addColorStop(1, 'rgba(47, 38, 41, 0)');
		ctx.fillStyle = g;
		ctx.fillRect(0, 0, 256, 256);
	}
	const map = new CanvasTexture(canvas);
	const mesh = new Mesh(
		new PlaneGeometry(0.46, 0.4),
		new MeshBasicMaterial({ map, transparent: true, depthWrite: false })
	);
	mesh.rotation.x = -Math.PI / 2;
	mesh.position.set(0, -0.013, -0.02);
	return mesh;
}
