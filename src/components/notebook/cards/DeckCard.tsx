import { DEFAULT_IMAGE_SIZE, PROJECT_IMAGE_SIZES } from '../config/images';
import { HOME_COPY, ZONE_COPY } from '../config/copy';
import { displayName } from '../lib/projects';
import FramedImage from '../ui/FramedImage';
import MarkerLink from '../ui/MarkerLink';
import TiltFrame from '../ui/TiltFrame';
import type { DeckCardProps } from '../types/notebook.types';

const pad = (n: number) => String(n).padStart(2, '0');

export default function DeckCard({ project, subtitle, index, total }: DeckCardProps) {
	const size = project.image
		? (PROJECT_IMAGE_SIZES[project.image] ?? DEFAULT_IMAGE_SIZE)
		: DEFAULT_IMAGE_SIZE;
	const [headline, details] = project.description.split(': ');

	return (
		<article className="border-ink-line grid min-h-[min(72svh,44rem)] grid-cols-[minmax(0,1fr)] items-center gap-x-12 gap-y-8 rounded-[22px] border-[1.5px] bg-white p-6 md:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
			<div className="flex h-full flex-col justify-between gap-8">
				<p className="text-ink-muted text-[0.9rem] font-semibold tracking-[0.08em] tabular-nums">
					{pad(index + 1)} / {pad(total)}
				</p>
				<div>
					<h3 className="font-hand text-ink text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.95]">
						{displayName(project)}
					</h3>
					<p className="text-ink-muted mt-3 text-[0.95rem]">{subtitle}</p>
					<p className="text-ink mt-5 max-w-[42ch] text-[1.05rem] leading-relaxed">{headline}</p>
					{details && (
						<p className="text-ink-soft mt-2 max-w-[42ch] text-[0.98rem] leading-relaxed">
							{details}
						</p>
					)}
				</div>
				<div className="flex flex-wrap items-center gap-x-8 gap-y-3">
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
			{project.image && (
				<TiltFrame>
					<FramedImage
						src={project.image}
						alt={`${displayName(project)}: ${project.description}`}
						width={size.width}
						height={size.height}
						aspect="16 / 11"
						tilt={0}
						sizes="(max-width: 1024px) 88vw, 50vw"
						priority={index === 0}
						parallax
					/>
				</TiltFrame>
			)}
		</article>
	);
}
