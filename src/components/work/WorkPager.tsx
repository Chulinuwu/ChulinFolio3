import WorkPagerLink from './WorkPagerLink';
import type { WorkPagerProps } from './types/work.types';

export default function WorkPager({ prev, next }: WorkPagerProps) {
	return (
		<nav aria-label="More projects" className="grid grid-cols-[minmax(0,1fr)] border-t-[1.5px] border-ink-line sm:grid-cols-2">
			<WorkPagerLink project={prev} direction="prev" />
			<WorkPagerLink project={next} direction="next" />
		</nav>
	);
}
