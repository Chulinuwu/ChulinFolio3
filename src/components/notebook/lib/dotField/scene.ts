import {
	BufferAttribute,
	BufferGeometry,
	Camera,
	LinearSRGBColorSpace,
	Points,
	Scene,
	ShaderMaterial,
	Vector2,
	Vector3,
	WebGLRenderer
} from 'three';
import { FIELD } from '../../config/field';
import type { DotFieldFrame } from '../../types/notebook.types';
import { readPenGradient } from '../pens/read';
import { FIELD_FRAGMENT, FIELD_VERTEX } from './shaders';

function gridGeometry(width: number, height: number) {
	const cols = Math.ceil(width / FIELD.cell) + 1;
	const rows = Math.ceil(height / FIELD.cell) + 2;
	const positions = new Float32Array(cols * rows * 3);
	let i = 0;
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			// The CSS grid draws each dot 1px in from its cell corner.
			positions[i++] = c * FIELD.cell + 1;
			positions[i++] = r * FIELD.cell + 1;
			positions[i++] = 0;
		}
	}
	const geometry = new BufferGeometry();
	geometry.setAttribute('position', new BufferAttribute(positions, 3));
	return geometry;
}

export function createDotField(canvas: HTMLCanvasElement) {
	const renderer = new WebGLRenderer({
		canvas,
		alpha: true,
		antialias: false,
		premultipliedAlpha: true
	});
	renderer.outputColorSpace = LinearSRGBColorSpace;
	renderer.setClearColor(0x000000, 0);

	const uniforms = {
		uRes: { value: new Vector2(1, 1) },
		uPointer: { value: new Vector2(-9999, -9999) },
		uActive: { value: 0 },
		uScroll: { value: 0 },
		uTime: { value: 0 },
		uVel: { value: 0 },
		uRipple: { value: new Vector3(0, 0, -99) },
		uDpr: { value: 1 },
		uRadius: { value: FIELD.radius },
		uPush: { value: FIELD.push },
		uSize: { value: FIELD.dotSize },
		uGrow: { value: FIELD.heatGrow },
		uWave: {
			value: [FIELD.ripple.speed, FIELD.ripple.width, FIELD.ripple.decay, FIELD.ripple.life]
		},
		uGrid: { value: new Vector3(...FIELD.grid.rgb) },
		uGridAlpha: { value: FIELD.grid.alpha },
		uPens: { value: readPenGradient() }
	};
	const material = new ShaderMaterial({
		uniforms,
		vertexShader: FIELD_VERTEX,
		fragmentShader: FIELD_FRAGMENT,
		transparent: true,
		depthTest: false,
		premultipliedAlpha: true
	});
	const points = new Points(new BufferGeometry(), material);
	points.frustumCulled = false;
	const scene = new Scene();
	scene.add(points);
	const camera = new Camera();

	return {
		resize(width: number, height: number) {
			const dpr = Math.min(window.devicePixelRatio || 1, FIELD.maxDpr);
			renderer.setPixelRatio(dpr);
			renderer.setSize(width, height, false);
			uniforms.uRes.value.set(width, height);
			uniforms.uDpr.value = dpr;
			points.geometry.dispose();
			points.geometry = gridGeometry(width, height);
		},
		render(state: DotFieldFrame) {
			uniforms.uTime.value = state.time;
			uniforms.uPointer.value.set(state.x, state.y);
			uniforms.uActive.value = state.active;
			uniforms.uVel.value = state.velocity;
			uniforms.uScroll.value = state.scroll % FIELD.cell;
			renderer.render(scene, camera);
		},
		ripple(x: number, y: number, time: number) {
			uniforms.uRipple.value.set(x, y, time);
		},
		dispose() {
			points.geometry.dispose();
			material.dispose();
			renderer.dispose();
		}
	};
}

export type DotFieldScene = ReturnType<typeof createDotField>;
