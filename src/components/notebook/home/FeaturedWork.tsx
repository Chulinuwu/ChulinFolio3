import DeckCard from '../cards/DeckCard';
import { HOME_COPY, HOME_DECK } from '../config/copy';
import { DECK } from '../config/deck';
import PencilLine from '../ink/PencilLine';
import { requireProject } from '../lib/projects';

export default function FeaturedWork() {
	return (
		<section aria-labelledby="selected-work">
			<h2
				id="selected-work"
				className="font-hand text-ink text-[clamp(1.9rem,2.6vw,2.4rem)] leading-none"
			>
				{HOME_COPY.selected}
			</h2>
			<PencilLine width={220} seed={13} className="mt-1 max-w-[220px]" />
			<ol className="mt-10 grid gap-10 md:gap-[12svh]">
				{HOME_DECK.map((f, i) => (
					<li
						key={f.slug}
						className="md:sticky"
						style={{ top: `${DECK.topRem + i * DECK.stepRem}rem` }}
					>
						<DeckCard
							project={requireProject(f.slug)}
							subtitle={f.subtitle}
							index={i}
							total={HOME_DECK.length}
						/>
					</li>
				))}
			</ol>
		</section>
	);
}
