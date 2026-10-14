import { Color, SRGBColorSpace, Vector3 } from 'three';
import { PEN_GRADIENT } from '../../config/pens';

// Reads the pen tokens from app.css so WebGL and CSS share one palette; shaders take raw sRGB.
export function readPenGradient() {
	const style = getComputedStyle(document.documentElement);
	return PEN_GRADIENT.map((pen) => {
		const { r, g, b } = new Color(style.getPropertyValue(`--color-pen-${pen}`).trim()).getRGB(
			{ r: 0, g: 0, b: 0 },
			SRGBColorSpace
		);
		return new Vector3(r, g, b);
	});
}
