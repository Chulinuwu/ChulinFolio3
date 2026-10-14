import {
	BufferAttribute,
	BufferGeometry,
	Camera,
	LinearSRGBColorSpace,
	Points,
	Scene,
	ShaderMaterial,
	Vector2,
	WebGLRenderer
} from 'three';
import { HALFTONE } from '../../config/halftone';
import type { HalftoneFrame } from '../../types/notebook.types';
import { readPenGradient } from '../pens/read';
import { HALFTONE_FRAGMENT, HALFTONE_VERTEX } from './shaders';

export function createHalftoneName(canvas: HTMLCanvasElement) {
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
		uTime: { value: 0 },
		uReveal: { value: 0 },
		uScatter: { value: 0 },
		uPointer: { value: new Vector2(-9999, -9999) },
		uActive: { value: 0 },
		uRadius: { value: HALFTONE.radius },
		uLens: { value: HALFTONE.lens },
		uCell: { value: Number(HALFTONE.cell) },
		uScale: { value: HALFTONE.dotScale },
		uGridDot: { value: HALFTONE.gridDot },
		uDpr: { value: 1 },
		uPens: { value: readPenGradient() }
	};
	const material = new ShaderMaterial({
		uniforms,
		vertexShader: HALFTONE_VERTEX,
		fragmentShader: HALFTONE_FRAGMENT,
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
		layout(width: number, height: number, cells: Float32Array, covers: Float32Array, cell: number) {
			const dpr = Math.min(window.devicePixelRatio || 1, HALFTONE.maxDpr);
			renderer.setPixelRatio(dpr);
			renderer.setSize(width, height, false);
			uniforms.uRes.value.set(width, height);
			uniforms.uDpr.value = dpr;
			uniforms.uCell.value = cell;
			const positions = new Float32Array((cells.length / 2) * 3);
			for (let i = 0; i < cells.length / 2; i++) {
				positions[i * 3] = cells[i * 2];
				positions[i * 3 + 1] = cells[i * 2 + 1];
			}
			const geometry = new BufferGeometry();
			geometry.setAttribute('position', new BufferAttribute(positions, 3));
			geometry.setAttribute('aCover', new BufferAttribute(covers, 1));
			points.geometry.dispose();
			points.geometry = geometry;
		},
		render(frame: HalftoneFrame) {
			uniforms.uTime.value = frame.time;
			uniforms.uReveal.value = frame.reveal;
			uniforms.uScatter.value = frame.scatter;
			uniforms.uPointer.value.set(frame.x, frame.y);
			uniforms.uActive.value = frame.active;
			renderer.render(scene, camera);
		},
		dispose() {
			points.geometry.dispose();
			material.dispose();
			renderer.dispose();
		}
	};
}
