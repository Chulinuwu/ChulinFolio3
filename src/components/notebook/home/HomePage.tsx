import { heroData } from '@/lib/data';
import { HOME_COPY } from '../config/copy';
import { nowKey } from '../lib/dates';
import { timelineLayout, timelineRows } from '../lib/timeline';
import ContactFinale from './ContactFinale';
import Experiments from './Experiments';
import FeaturedWork from './FeaturedWork';
import IdentityPanel from './IdentityPanel';
import NowPanel from './NowPanel';
import HalftoneHero from './HalftoneHero';
import RoleTimeline from './RoleTimeline';

export default function HomePage() {
	return (
		<main className="mx-auto max-w-[1400px] pt-5 pr-14 pb-12 pl-5 md:pr-28 md:pl-12">
			<HalftoneHero
				name={heroData.nickname}
				before={
					<div className="relative flex flex-wrap items-start justify-between gap-x-16 gap-y-8">
						<IdentityPanel />
						<NowPanel />
					</div>
				}
				after={
					<p className="enter text-ink relative max-w-[30ch] text-[clamp(1.4rem,2.4vw,2.2rem)] leading-tight font-medium text-pretty [--enter-delay:500ms]">
						{HOME_COPY.tagline}
					</p>
				}
			/>
			<div className="mt-24">
				<FeaturedWork />
			</div>
			<div className="mt-20">
				<RoleTimeline layout={timelineLayout(timelineRows(nowKey(new Date())))} />
			</div>
			<div className="mt-20">
				<Experiments />
			</div>
			<div className="mt-28">
				<ContactFinale />
			</div>
		</main>
	);
}
