import { DEFAULT_IMAGE_SIZE, PROJECT_IMAGE_SIZES } from '../config/images';
import { HOME_COPY, ZONE_COPY } from '../config/copy';
import { displayName } from '../lib/projects';
import FramedImage from '../ui/FramedImage';
import TiltFrame from '../ui/TiltFrame';
import MarkerLink from '../ui/MarkerLink';
import type { FeaturedProjectProps } from '../types/notebook.types';

export default function FeaturedProject({ project }: FeaturedProjectProps) {
	const [headline, details] = project.description.split(': ');
	const size = project.image
		? (PROJECT_IMAGE_SIZES[project.image] ?? DEFAULT_IMAGE_SIZE)
		: DEFAULT_IMAGE_SIZE;

	return (
		<article className="reveal grid grid-cols-[minmax(0,1fr)] items-center gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
			{project.image && (
				<TiltFrame>
					<FramedImage
						src={project.image}
						alt={`${displayName(project)} landing page`}
						width={size.width}
						height={size.height}
						tilt={-0.8}
						sizes="(max-width: 1024px) 88vw, 52vw"
						priority
						parallax
					/>
				</TiltFrame>
			)}
			<div>
				<h2 className="font-hand text-ink text-[clamp(2.4rem,3.6vw,3.4rem)] leading-none">
					{displayName(project)}
				</h2>
				<p className="text-ink-muted mt-2 text-[0.92rem]">{project.role}</p>
				<p className="text-ink mt-4 text-[1.1rem] font-medium">{headline}</p>
				{details && <p className="text-ink-soft mt-2 text-[1rem] leading-relaxed">{details}</p>}
				<div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
					{project.link && (
						<MarkerLink href={project.link} external>
							{ZONE_COPY.workshop.visit}
						</MarkerLink>
					)}
					<MarkerLink href={`/work/${project.slug}`}>
						{HOME_COPY.viewProject}
						<span className="sr-only">: {displayName(project)}</span>
					</MarkerLink>
				</div>
			</div>
		</article>
	);
}
