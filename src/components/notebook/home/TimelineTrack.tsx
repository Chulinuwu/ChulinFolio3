import { cn } from '@/lib/utils';
import { AREA_TONES } from '../config/timeline';
import type { TimelineTrackProps } from '../types/notebook.types';

const pct = (v: number) => `${(v * 100).toFixed(3)}%`;

export default function TimelineTrack({ segments, years }: TimelineTrackProps) {
	return (
		<div aria-hidden className="relative h-full min-h-6">
			{years.map((y) => (
				<span key={y.year} className="absolute inset-y-0 w-px bg-ink-line/15" style={{ left: pct(y.at) }} />
			))}
			{segments.map((s) => (
				<span
					key={s.key}
					data-bar
					data-from={s.from}
					data-to={s.to}
					className={cn('absolute top-1/2 h-2.5 -translate-y-1/2 origin-left rounded-full', AREA_TONES[s.area])}
					style={{ left: pct(s.from), width: pct(s.to - s.from) }}
				/>
			))}
		</div>
	);
}
