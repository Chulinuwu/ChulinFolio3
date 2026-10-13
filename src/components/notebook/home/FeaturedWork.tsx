import FeaturedProject from '../cards/FeaturedProject';
import ProjectNote from '../cards/ProjectNote';
import { HOME_FEATURES, HOME_SPOTLIGHT } from '../config/copy';
import { requireProject } from '../lib/projects';

const TILTS = [-1.2, 0.8, -0.6];

export default function FeaturedWork() {
	return (
		<section aria-label="Selected work">
			<FeaturedProject project={requireProject(HOME_SPOTLIGHT)} />
			<div className="mt-20 grid grid-cols-[minmax(0,1fr)] gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
				{HOME_FEATURES.map((f, i) => (
					<ProjectNote
						key={f.slug}
						project={requireProject(f.slug)}
						subtitle={f.subtitle}
						tilt={TILTS[i % TILTS.length]}
						sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 28vw"
					/>
				))}
			</div>
		</section>
	);
}
