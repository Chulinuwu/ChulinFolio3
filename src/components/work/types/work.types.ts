import type { Project } from '@/lib/data';
import type { Scene } from '@/components/notebook/types/notebook.types';

export interface WorkProjectProps {
	project: Project;
}

export interface WorkHeroProps {
	project: Project;
	scene: Scene;
}

export interface WorkPagerProps {
	prev: Project;
	next: Project;
}

export interface WorkPagerLinkProps {
	project: Project;
	direction: 'prev' | 'next';
}
