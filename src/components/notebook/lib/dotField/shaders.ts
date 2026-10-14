import { PEN_PALETTE } from '../pens/glsl';

export const FIELD_VERTEX = /* glsl */ `
${PEN_PALETTE}
uniform vec2 uRes;
uniform vec2 uPointer;
uniform float uActive;
uniform float uScroll;
uniform float uTime;
uniform vec3 uRipple;
uniform float uDpr;
uniform float uRadius;
uniform float uPush;
uniform float uSize;
uniform float uGrow;
uniform vec4 uWave;
uniform float uVel;
varying float vHeat;
varying vec3 vTint;

void main() {
	vec2 p = position.xy;
	p.y -= uScroll;
	// Scrolling sends a travelling wave across the sheet; at rest the grid lies flat.
	float swell = sin(p.x * 0.011 + p.y * 0.004 - uTime * 3.0);
	p.y += swell * uVel;

	vec2 d = p - uPointer;
	float dist = length(d) + 1e-4;
	float near = (1.0 - smoothstep(0.0, uRadius, dist)) * uActive;
	p += d / dist * near * near * uPush;

	float ring = 0.0;
	float rt = uTime - uRipple.z;
	if (rt > 0.0 && rt < uWave.w) {
		vec2 rd = p - uRipple.xy;
		float rl = length(rd) + 1e-4;
		ring = exp(-pow((rl - rt * uWave.x) / uWave.y, 2.0)) * exp(-rt * uWave.z);
		p += rd / rl * ring * 10.0;
	}

	vTint = penAt(p.x / uRes.x);
	vHeat = clamp(max(max(near, ring), abs(swell * uVel) * 0.05), 0.0, 1.0);
	gl_Position = vec4(p.x / uRes.x * 2.0 - 1.0, 1.0 - p.y / uRes.y * 2.0, 0.0, 1.0);
	gl_PointSize = uSize * (1.0 + vHeat * uGrow) * uDpr;
}
`;

export const FIELD_FRAGMENT = /* glsl */ `
uniform vec3 uGrid;
uniform float uGridAlpha;
varying float vHeat;
varying vec3 vTint;

void main() {
	float r = length(gl_PointCoord - 0.5);
	float shape = 1.0 - smoothstep(0.36, 0.5, r);
	float t = smoothstep(0.12, 0.85, vHeat);
	float alpha = shape * mix(uGridAlpha, 0.85, t);
	gl_FragColor = vec4(mix(uGrid, vTint, t) * alpha, alpha);
}
`;
