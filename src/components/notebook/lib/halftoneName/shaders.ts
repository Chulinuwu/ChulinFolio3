export const HALFTONE_VERTEX = /* glsl */ `
attribute float aCover;
uniform vec2 uRes;
uniform float uTime;
uniform float uReveal;
uniform float uScatter;
uniform vec2 uPointer;
uniform float uActive;
uniform float uRadius;
uniform float uLens;
uniform float uCell;
uniform float uScale;
uniform float uGridDot;
uniform float uDpr;
varying float vHeat;

float easeOutBack(float t) {
	float c = 1.7;
	float u = t - 1.0;
	return 1.0 + (c + 1.0) * u * u * u + c * u * u;
}

void main() {
	vec2 p = position.xy;
	// The wave of dots sweeps in from the left, each column overshooting slightly as it lands.
	float t = clamp(uReveal * 1.5 - p.x / uRes.x * 0.5, 0.0, 1.0);
	float grow = t <= 0.0 ? 0.0 : easeOutBack(t);

	float dist = length(p - uPointer);
	float heat = (1.0 - smoothstep(0.0, uRadius, dist)) * uActive;
	float breathe = 1.0 + 0.05 * sin(uTime * 1.8 + p.x * 0.015 + p.y * 0.01);

	float full = uCell * uScale * sqrt(aCover) * breathe * (1.0 + heat * uLens);
	float size = mix(uGridDot, full, grow);
	size = mix(size, uGridDot, uScatter);

	vHeat = heat;
	gl_Position = vec4(p.x / uRes.x * 2.0 - 1.0, 1.0 - p.y / uRes.y * 2.0, 0.0, 1.0);
	gl_PointSize = size * uDpr;
}
`;

export const HALFTONE_FRAGMENT = /* glsl */ `
uniform vec3 uInk;
uniform vec3 uPink;
varying float vHeat;

void main() {
	float r = length(gl_PointCoord - 0.5);
	float a = 1.0 - smoothstep(0.44, 0.5, r);
	gl_FragColor = vec4(mix(uInk, uPink, smoothstep(0.05, 0.6, vHeat)) * a, a);
}
`;
