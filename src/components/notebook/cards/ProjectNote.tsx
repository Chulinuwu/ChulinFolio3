import { DEFAULT_IMAGE_SIZE, PROJECT_IMAGE_SIZES } from '../config/images';
import { HOME_COPY } from '../config/copy';
import { displayName } from '../lib/projects';
import FramedImage from '../ui/FramedImage';
import TiltFrame from '../ui/TiltFrame';
import MarkerLink from '../ui/MarkerLink';
import type { ProjectNoteProps } from '../types/notebook.types';

export default function ProjectNote({
	project,
	subtitle,
	tilt,
	sizes,
	priority = false,
	headingLevel = 'h3'
}: ProjectNoteProps) {
	const Heading = headingLevel;
	const size = project.image
		? (PROJECT_IMAGE_SIZES[project.image] ?? DEFAULT_IMAGE_SIZE)
		: DEFAULT_IMAGE_SIZE;

	return (
		<article className="reveal flex flex-col">
			{project.image && (
				<TiltFrame>
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
				</TiltFrame>
			)}
			<Heading className="font-hand text-ink mt-4 text-[clamp(1.6rem,2vw,2rem)] leading-none">
				{displayName(project)}
			</Heading>
			<p className="text-ink-soft mt-1.5 text-[0.98rem]">{subtitle}</p>
			<MarkerLink href={`/work/${project.slug}`} className="mt-3 self-start">
				{HOME_COPY.viewProject}
				<span className="sr-only">: {displayName(project)}</span>
			</MarkerLink>
		</article>
	);
}
