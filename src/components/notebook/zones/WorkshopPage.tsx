import { FALLBACK_PROJECT_ICON, PROJECT_ICONS } from '../config/icons';
import { ZONE_COPY } from '../config/copy';
import { SCENES } from '../config/scenes';
import ProjectNote from '../cards/ProjectNote';
import ProjectRow from '../cards/ProjectRow';
import { workshopShowcase } from '../lib/projects';
import FeaturedProject from '../cards/FeaturedProject';
import SubHeading from './SubHeading';
import ZoneSpread from './ZoneSpread';

const TILTS = [0.9, -1.1, 0.6];
const copy = ZONE_COPY.workshop;

export default function WorkshopPage() {
	const { featured, pinned, rest } = workshopShowcase();

	return (
		<ZoneSpread scene={SCENES.workshop} title={copy.title} intro={copy.intro}>
			{featured && <FeaturedProject project={featured} />}
			<section className="mt-20" aria-labelledby="workshop-more">
				<SubHeading id="workshop-more">{copy.more}</SubHeading>
				<div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
					{pinned.map((p, i) => (
						<ProjectNote
							key={p.slug}
							project={p}
							subtitle={p.role}
							tilt={TILTS[i % TILTS.length]}
							sizes="(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 28vw"
							headingLevel="h3"
							priority
						/>
					))}
				</div>
				<ul className="mt-12 grid max-w-[46rem] grid-cols-[minmax(0,1fr)]">
					{rest.map((p) => (
						<li key={p.slug}>
							<ProjectRow project={p} icon={PROJECT_ICONS[p.slug] ?? FALLBACK_PROJECT_ICON} />
						</li>
					))}
				</ul>
			</section>
		</ZoneSpread>
	);
}
