import { WORK_COPY } from '@/components/notebook/config/copy';
import MarkerLink from '@/components/notebook/ui/MarkerLink';
import type { WorkProjectProps } from './types/work.types';

export default function WorkLinks({ project }: WorkProjectProps) {
	if (!project.link && !project.github) return null;
	return (
		<div className="flex flex-wrap gap-x-8 gap-y-3">
			{project.link && (
				<MarkerLink href={project.link} external>
					{WORK_COPY.visit}
				</MarkerLink>
			)}
			{project.github && (
				<MarkerLink href={project.github} external>
					{WORK_COPY.github}
				</MarkerLink>
			)}
		</div>
	);
}
