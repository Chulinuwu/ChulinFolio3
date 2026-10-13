import NextTabCard from '../cards/NextTabCard';
import PageHeading from '../ui/PageHeading';
import type { ZoneSpreadProps } from '../types/notebook.types';

export default function ZoneSpread({ scene, title, intro, children }: ZoneSpreadProps) {
	return (
		<main
			aria-label={scene.label}
			className="mx-auto max-w-[1320px] pt-5 pr-14 pb-12 pl-5 md:pr-28 md:pl-12"
		>
			<div className="mt-8">
				<PageHeading text={title} />
				<p className="enter font-hand text-ink-soft mt-3 text-[clamp(1.4rem,2vw,1.9rem)] [--enter-delay:350ms]">
					{intro}
				</p>
			</div>
			<div className="mt-12">{children}</div>
			<div className="mt-20">
				<NextTabCard from={scene.id} />
			</div>
		</main>
	);
}
