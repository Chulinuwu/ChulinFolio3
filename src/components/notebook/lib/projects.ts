import { projects, type Project } from '@/lib/data';
import { CATEGORY_ZONES, FEATURED_WORKSHOP_SLUG } from '../config/zones';
import type { ZoneId } from '../types/notebook.types';

const zonesOf = (project: Project): ZoneId[] => {
	const zones = (project.categories ?? [project.category]).map((c) => CATEGORY_ZONES[c]);
	return [...new Set(zones.filter((z): z is ZoneId => z !== null))];
};

export const primaryZoneOf = (project: Project): ZoneId =>
	CATEGORY_ZONES[project.category] ?? zonesOf(project)[0] ?? 'workshop';

const projectsIn = (zone: ZoneId) => projects.filter((p) => zonesOf(p).includes(zone));

const byVisualWeight = (a: Project, b: Project) =>
	Number(Boolean(b.image)) - Number(Boolean(a.image)) || Number(b.featured) - Number(a.featured);

export const labShowcase = () => {
	const all = [...projectsIn('lab')].sort(byVisualWeight);
	return { pinned: all.filter((p) => p.image), rest: all.filter((p) => !p.image) };
};

// A project filed under both zones is shown once, in the lab, where its data work lives.
export const workshopShowcase = () => {
	const all = projectsIn('workshop')
		.filter((p) => !zonesOf(p).includes('lab'))
		.sort(byVisualWeight);
	return {
		featured: all.find((p) => p.slug === FEATURED_WORKSHOP_SLUG),
		pinned: all.filter((p) => p.slug !== FEATURED_WORKSHOP_SLUG && p.image),
		rest: all.filter((p) => p.slug !== FEATURED_WORKSHOP_SLUG && !p.image)
	};
};

export const findProject = (slug: string) => projects.find((p) => p.slug === slug);

export const requireProject = (slug: string) => {
	const project = findProject(slug);
	if (!project) throw new Error(`data.ts has no project "${slug}"`);
	return project;
};

export const neighborsOf = (slug: string) => {
	const i = projects.findIndex((p) => p.slug === slug);
	const n = projects.length;
	return { prev: projects[(i - 1 + n) % n], next: projects[(i + 1) % n] };
};

export const displayName = (project: Project) => project.name.replace(/\s*\(.*\)\s*$/, '');
