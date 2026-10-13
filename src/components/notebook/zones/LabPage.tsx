import { FALLBACK_PROJECT_ICON, PROJECT_ICONS } from '../config/icons';
import { LAB_CAPTIONS, ZONE_COPY } from '../config/copy';
import { SCENES } from '../config/scenes';
import ProjectNote from '../cards/ProjectNote';
import ProjectRow from '../cards/ProjectRow';
import { labShowcase } from '../lib/projects';
import SubHeading from './SubHeading';
import ZoneSpread from './ZoneSpread';

const TILTS = [-1, 0.8, 1.2, -0.7];
const copy = ZONE_COPY.lab;

export default function LabPage() {
	const { pinned, rest } = labShowcase();

	return (
		<ZoneSpread scene={SCENES.lab} title={copy.title} intro={copy.intro}>
			<div className="grid grid-cols-[minmax(0,1fr)] gap-x-14 gap-y-14 md:grid-cols-2">
				{pinned.map((p, i) => (
					<ProjectNote
						key={p.slug}
						project={p}
						subtitle={LAB_CAPTIONS[p.slug] ?? p.description}
						tilt={TILTS[i % TILTS.length]}
						sizes="(max-width: 768px) 88vw, 40vw"
						priority
						headingLevel="h2"
					/>
				))}
			</div>
			{rest.length > 0 && (
				<section className="mt-20" aria-labelledby="lab-more">
					<SubHeading id="lab-more">{copy.more}</SubHeading>
					<ul className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-x-12 md:grid-cols-3">
						{rest.map((p) => (
							<li key={p.slug}>
								<ProjectRow project={p} icon={PROJECT_ICONS[p.slug] ?? FALLBACK_PROJECT_ICON} />
							</li>
						))}
					</ul>
				</section>
			)}
		</ZoneSpread>
	);
}
