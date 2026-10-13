import { DEFAULT_IMAGE_SIZE, PROJECT_IMAGE_SIZES } from '@/components/notebook/config/images';
import { displayName } from '@/components/notebook/lib/projects';
import FramedImage from '@/components/notebook/ui/FramedImage';
import type { WorkProjectProps } from './types/work.types';

export default function WorkVisual({ project }: WorkProjectProps) {
	if (!project.image) return null;
	const size = PROJECT_IMAGE_SIZES[project.image] ?? DEFAULT_IMAGE_SIZE;
	return (
		<FramedImage
			src={project.image}
			alt={`${displayName(project)}: ${project.description}`}
			width={size.width}
			height={size.height}
			tilt={1}
			sizes="(max-width: 1024px) 88vw, 44vw"
			priority
		/>
	);
}
