import { DEFAULT_IMAGE_SIZE, PROJECT_IMAGE_SIZES } from '../config/images';
import { HOME_COPY, ZONE_COPY } from '../config/copy';
import { DECK } from '../config/deck';
import { displayName } from '../lib/projects';
import FramedImage from '../ui/FramedImage';
import MarkerLink from '../ui/MarkerLink';
import TiltFrame from '../ui/TiltFrame';
import type { DeckCardProps } from '../types/notebook.types';

const pad = (n: number) => String(n).padStart(2, '0');

export default function DeckCard({ project, subtitle, pen, index, total }: DeckCardProps) {
	const size = project.image
		? (PROJECT_IMAGE_SIZES[project.image] ?? DEFAULT_IMAGE_SIZE)
		: DEFAULT_IMAGE_SIZE;
	const [headline, details] = project.description.split(': ');

	return (
		<article
			data-pen={pen}
			className="overflow-hidden rounded-b-(--radius-frame) border-[1.5px] border-(--pen) bg-white"
		>
			<header
				style={{ height: `${DECK.bandRem}rem` }}
				className="flex items-center justify-between gap-6 bg-(--pen) px-6 text-white md:px-10"
			>
				<p className="flex min-w-0 items-baseline gap-4">
					<span className="text-[0.8rem] font-semibold tracking-[0.08em] text-white/75 tabular-nums">
						{pad(index + 1)} / {pad(total)}
					</span>
					<span className="truncate text-[1rem] font-semibold">{displayName(project)}</span>
				</p>
				<p className="hidden shrink-0 text-[0.9rem] text-white/85 sm:block">{subtitle}</p>
			</header>
			<div className="grid min-h-[min(62svh,40rem)] grid-cols-[minmax(0,1fr)] items-center gap-x-12 gap-y-8 p-6 md:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
				<div className="flex h-full flex-col justify-between gap-8">
					<div>
						<h3 className="font-hand text-ink text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.95]">
							{displayName(project)}
						</h3>
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
			</div>
		</article>
	);
}
