import { SCENES } from '../config/scenes';
import type { Scene, TurnDirection } from '../types/notebook.types';
import { findProject, primaryZoneOf } from './projects';

const WORK_PREFIX = '/work/';

// Work pages belong to the tab of the zone their project lives in.
export function sceneForPath(pathname: string): Scene {
	if (pathname.startsWith(WORK_PREFIX)) {
		const project = findProject(pathname.slice(WORK_PREFIX.length));
		return project ? SCENES[primaryZoneOf(project)] : SCENES.home;
	}
	return Object.values(SCENES).find((s) => s.path === pathname) ?? SCENES.home;
}

export const turnBetween = (from: Scene, to: Scene): TurnDirection =>
	to.order >= from.order ? 'turn-forward' : 'turn-back';

export const sceneMetadata = (scene: Scene) => ({
	title: scene.title,
	description: scene.description
});
