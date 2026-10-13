import { DEFAULT_IMAGE_SIZE, PROJECT_IMAGE_SIZES } from '../config/images';
import { HOME_COPY } from '../config/copy';
import { displayName } from '../lib/projects';
import FramedImage from '../ui/FramedImage';
import MarkerLink from '../ui/MarkerLink';
import type { ProjectNoteProps } from '../types/notebook.types';

export default function ProjectNote({ project, subtitle, tilt, sizes, priority = false, headingLevel = 'h3' }: ProjectNoteProps) {
	const Heading = headingLevel;
	const size = project.image ? (PROJECT_IMAGE_SIZES[project.image] ?? DEFAULT_IMAGE_SIZE) : DEFAULT_IMAGE_SIZE;

	return (
		<article className="flex flex-col">
			{project.image && (
				<FramedImage
					src={project.image}
					alt={`${displayName(project)}: ${project.description}`}
					width={size.width}
					height={size.height}
					aspect="5 / 4"
					tilt={tilt}
					sizes={sizes}
					priority={priority}
				/>
			)}
			<Heading className="mt-4 font-hand text-[clamp(1.6rem,2vw,2rem)] leading-none text-ink">{displayName(project)}</Heading>
			<p className="mt-1.5 text-[0.98rem] text-ink-soft">{subtitle}</p>
			<MarkerLink href={`/work/${project.slug}`} className="mt-3 self-start">
				{HOME_COPY.viewProject}
				<span className="sr-only">: {displayName(project)}</span>
			</MarkerLink>
		</article>
	);
}
