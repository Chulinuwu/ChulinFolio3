import { PEN_GRADIENT } from '../../config/pens';

export const PEN_PALETTE = /* glsl */ `
uniform vec3 uPens[${PEN_GRADIENT.length}];

vec3 penAt(float t) {
	float x = clamp(t, 0.0, 1.0) * ${PEN_GRADIENT.length - 1}.0;
	int i = int(min(floor(x), ${PEN_GRADIENT.length - 2}.0));
	vec3 a = uPens[0];
	vec3 b = uPens[1];
	for (int k = 1; k < ${PEN_GRADIENT.length - 1}; k++) {
		if (i == k) {
			a = uPens[k];
			b = uPens[k + 1];
		}
	}
	return mix(a, b, smoothstep(0.0, 1.0, x - float(i)));
}
`;
