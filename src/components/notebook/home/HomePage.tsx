import { nowKey } from '../lib/dates';
import { timelineLayout, timelineRows } from '../lib/timeline';
import Experiments from './Experiments';
import FeaturedWork from './FeaturedWork';
import IdentityPanel from './IdentityPanel';
import NowPanel from './NowPanel';
import RoleTimeline from './RoleTimeline';

export default function HomePage() {
	return (
		<main className="mx-auto max-w-[1400px] pt-5 pr-14 pb-12 pl-5 md:pr-28 md:pl-12">
			<section
				aria-label="About"
				className="mt-8 grid grid-cols-[minmax(0,1fr)] items-end gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)]"
			>
				<IdentityPanel />
				<NowPanel />
			</section>
			<div className="mt-16">
				<FeaturedWork />
			</div>
			<div className="mt-20">
				<RoleTimeline layout={timelineLayout(timelineRows(nowKey(new Date())))} />
			</div>
			<div className="mt-20">
				<Experiments />
			</div>
		</main>
	);
}
