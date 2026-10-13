import {
	AmbientLight,
	CylinderGeometry,
	DirectionalLight,
	Mesh,
	MeshPhysicalMaterial,
	MeshStandardMaterial,
	PerspectiveCamera,
	SRGBColorSpace,
	Scene,
	TextureLoader,
	WebGLRenderer
} from 'three';
import { COIN } from '../../config/coin';
import type { CoinPose } from '../../types/notebook.types';

export async function createAvatarCoin(canvas: HTMLCanvasElement, front: string, back: string) {
	const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
	renderer.setClearColor(0x000000, 0);

	const loader = new TextureLoader();
	const [frontMap, backMap] = await Promise.all([loader.loadAsync(front), loader.loadAsync(back)]);
	for (const map of [frontMap, backMap]) {
		map.colorSpace = SRGBColorSpace;
		map.anisotropy = renderer.capabilities.getMaxAnisotropy();
	}
	// Cylinder caps sample their texture rotated and the bottom cap mirrored; undo both so each face reads upright.
	frontMap.center.set(0.5, 0.5);
	frontMap.rotation = Math.PI / 2;
	backMap.center.set(0.5, 0.5);
	backMap.rotation = Math.PI / 2;
	backMap.repeat.set(-1, 1);

	const face = (map: typeof frontMap) =>
		new MeshPhysicalMaterial({ map, roughness: 0.38, clearcoat: 0.6, clearcoatRoughness: 0.25 });
	const geometry = new CylinderGeometry(1, 1, COIN.thickness, COIN.segments);
	geometry.rotateX(Math.PI / 2);
	const coin = new Mesh(geometry, [
		new MeshStandardMaterial({ color: COIN.edgeColor, roughness: 0.6 }),
		face(frontMap),
		face(backMap)
	]);

	const scene = new Scene();
	scene.add(coin, new AmbientLight(0xffffff, 1.6));
	const key = new DirectionalLight(0xffffff, 1.4);
	key.position.set(-2, 3, 4);
	scene.add(key);

	const camera = new PerspectiveCamera(COIN.fov, 1, 0.1, 20);
	camera.position.set(0, 0, COIN.distance);

	return {
		resize(size: number) {
			renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, COIN.maxDpr));
			renderer.setSize(size, size, false);
		},
		render(pose: CoinPose) {
			coin.rotation.set(
				pose.tiltX,
				pose.tiltY + pose.spin,
				Math.sin(pose.time * 0.6) * COIN.idleSway * 0.3
			);
			renderer.render(scene, camera);
		},
		dispose() {
			geometry.dispose();
			frontMap.dispose();
			backMap.dispose();
			for (const m of coin.material) m.dispose();
			renderer.dispose();
		}
	};
}
