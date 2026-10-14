import {
	Group,
	Mesh,
	MeshBasicMaterial,
	PMREMGenerator,
	PerspectiveCamera,
	Scene,
	SRGBColorSpace,
	ACESFilmicToneMapping,
	Vector3,
	WebGLRenderer
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { CARD, INTRO } from '../../config/intro';
import { createCards, createContactShadow } from './props';
import type { DevicePose, Quad } from '../../types/notebook.types';

const v = (p: readonly number[]) => new Vector3(p[0], p[1], p[2]);
const smooth = (t: number) => t * t * (3 - 2 * t);

export function createDeviceScene(canvas: HTMLCanvasElement, handFont: string) {
	const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
	renderer.outputColorSpace = SRGBColorSpace;
	renderer.toneMapping = ACESFilmicToneMapping;
	renderer.setClearColor(0x000000, 0);

	const scene = new Scene();
	const pmrem = new PMREMGenerator(renderer);
	const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
	scene.environment = environment;

	const device = new Group();
	device.add(createContactShadow());
	scene.add(device);
	const floating = new Group();
	scene.add(floating);
	let cards: Awaited<ReturnType<typeof createCards>>['cards'] = [];
	createCards(handFont, renderer.capabilities.getMaxAnisotropy()).then((built) => {
		floating.add(built.group);
		cards = built.cards;
	});
	const camera = new PerspectiveCamera(INTRO.fov, 1, 0.01, 10);

	const corners = [
		INTRO.screen.topLeft,
		INTRO.screen.topRight,
		INTRO.screen.bottomRight,
		INTRO.screen.bottomLeft
	].map(v);
	const center = corners.reduce((sum, c) => sum.add(c), new Vector3()).multiplyScalar(0.25);
	const screenUp = corners[0].clone().sub(corners[3]).normalize();
	const screenRight = corners[1].clone().sub(corners[0]);
	const screenHeight = corners[0].distanceTo(corners[3]);
	const normal = screenRight.clone().normalize().cross(screenUp).normalize();
	const startTarget = v(INTRO.start.target);
	const { yaw, pitch, distance } = INTRO.start;
	const startPos = startTarget
		.clone()
		.add(
			new Vector3(
				Math.sin(yaw) * Math.cos(pitch),
				Math.sin(pitch),
				Math.cos(yaw) * Math.cos(pitch)
			).multiplyScalar(distance)
		);
	const worldUp = new Vector3(0, 1, 0);
	let width = 1;
	let height = 1;

	let loaded = false;
	const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
	const ready = loader.loadAsync(INTRO.model).then((gltf) => {
		device.add(gltf.scene);
		loaded = true;
	});

	const project = (p: Vector3) => {
		const n = p.clone().project(camera);
		return { x: ((n.x + 1) / 2) * width, y: ((1 - n.y) / 2) * height };
	};

	return {
		ready,
		resize(w: number, h: number) {
			width = w;
			height = h;
			renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
			renderer.setSize(w, h, false);
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
		},
		// Places camera and laptop for the given zoom progress and returns where the screen corners land on the page.
		pose({ progress, tiltX, tiltY, time }: DevicePose): Quad {
			const calm = 1 - progress;
			const fit =
				Math.max(screenHeight, screenRight.length() / camera.aspect) /
				2 /
				Math.tan((INTRO.fov * Math.PI) / 360);
			const endPos = center.clone().add(normal.clone().multiplyScalar(fit * 0.999));
			device.rotation.set(tiltX * INTRO.tilt * calm, tiltY * INTRO.tilt * calm, 0);
			device.position.y = Math.sin(time * 1.2) * INTRO.float * calm;
			device.updateMatrixWorld();
			// Cards sit at a different depth, so they swing further with the mouse, then fly outward as the camera dives in.
			floating.rotation.set(tiltX * INTRO.tilt * 1.6 * calm, tiltY * INTRO.tilt * 1.6 * calm, 0);
			cards.forEach(({ mesh, base }, i) => {
				mesh.position.copy(base).multiplyScalar(1 + progress * CARD.scatter);
				mesh.position.y += Math.sin(time * 0.9 + i * 1.7) * CARD.float;
				if (mesh.material instanceof MeshBasicMaterial)
					mesh.material.opacity = Math.max(0, 1 - progress * 2.2);
			});

			camera.position.lerpVectors(startPos, endPos, progress);
			camera.up.lerpVectors(worldUp, screenUp, progress).normalize();
			camera.lookAt(startTarget.clone().lerp(center, progress));
			camera.updateMatrixWorld();

			const projected = corners.map((c) => project(device.localToWorld(c.clone())));
			const rect = [
				{ x: 0, y: 0 },
				{ x: width, y: 0 },
				{ x: width, y: height },
				{ x: 0, y: height }
			];
			const s =
				progress <= INTRO.settleFrom
					? 0
					: smooth((progress - INTRO.settleFrom) / (1 - INTRO.settleFrom));
			const [a, b, c, d] = projected.map((p, i) => ({
				x: p.x + (rect[i].x - p.x) * s,
				y: p.y + (rect[i].y - p.y) * s
			}));
			if (loaded) renderer.render(scene, camera);
			return [a, b, c, d];
		},
		dispose() {
			environment.dispose();
			pmrem.dispose();
			device.traverse((o) => {
				if (o instanceof Mesh) o.geometry.dispose();
			});
			renderer.dispose();
		}
	};
}
