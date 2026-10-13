import { FALLBACK_PROJECT_ICON, PROJECT_ICONS } from '../config/icons';
import { HOME_COPY, HOME_EXPERIMENTS } from '../config/copy';
import PencilLine from '../ink/PencilLine';
import { requireProject } from '../lib/projects';
import ProjectRow from '../cards/ProjectRow';

export default function Experiments() {
	return (
		<section aria-labelledby="more-experiments">
			<h2
				id="more-experiments"
				className="font-hand text-ink text-[clamp(1.9rem,2.6vw,2.4rem)] leading-none"
			>
				{HOME_COPY.moreHead}
			</h2>
			<PencilLine width={220} seed={31} className="max-w-[220px]" />
			<ul className="reveal-group mt-6 grid grid-cols-[minmax(0,1fr)] gap-x-12 md:grid-cols-3">
				{HOME_EXPERIMENTS.map((slug) => (
					<li key={slug} className="reveal">
						<ProjectRow
							project={requireProject(slug)}
							icon={PROJECT_ICONS[slug] ?? FALLBACK_PROJECT_ICON}
						/>
					</li>
				))}
			</ul>
		</section>
	);
}
