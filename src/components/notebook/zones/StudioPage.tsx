import { ZONE_COPY } from '../config/copy';
import { SCENES } from '../config/scenes';
import { experienceGroups } from '../lib/experiences';
import ExperienceCard from './ExperienceCard';
import SubHeading from './SubHeading';
import ZoneSpread from './ZoneSpread';

const copy = ZONE_COPY.studio;

export default function StudioPage() {
	return (
		<ZoneSpread scene={SCENES.studio} title={copy.title} intro={copy.intro}>
			<div className="grid gap-16">
				{experienceGroups().map((g) => (
					<section key={g.id} aria-labelledby={`exp-${g.id}`}>
						<SubHeading id={`exp-${g.id}`}>{g.title}</SubHeading>
						<ul className="border-ink-line/20 mt-2 border-t">
							{g.cards.map((c) => (
								<ExperienceCard key={c.key} card={c} />
							))}
						</ul>
					</section>
				))}
			</div>
		</ZoneSpread>
	);
}
