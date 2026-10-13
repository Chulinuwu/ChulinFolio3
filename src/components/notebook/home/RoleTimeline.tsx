'use client';

import { cn } from '@/lib/utils';
import { HOME_COPY } from '../config/copy';
import PencilLine from '../ink/PencilLine';
import { AREA_LABELS, AREA_TONES, AREAS } from '../config/timeline';
import { useTimelineDraw } from '../hooks/useTimelineDraw';
import type { RoleTimelineProps } from '../types/notebook.types';
import TimelineTrack from './TimelineTrack';

const TRACK_COLS =
	'grid grid-cols-[minmax(0,1fr)_minmax(7.5rem,42%)] gap-x-6 lg:grid-cols-[minmax(0,1fr)_56%] lg:gap-x-10';

export default function RoleTimeline({ layout }: RoleTimelineProps) {
	const root = useTimelineDraw();

	return (
		<section aria-labelledby="where-worked">
			<h2
				id="where-worked"
				className="font-hand text-ink text-[clamp(1.9rem,2.6vw,2.4rem)] leading-none"
			>
				{HOME_COPY.experience}
			</h2>
			<PencilLine width={200} seed={21} className="mt-1 max-w-[200px]" />
			<div ref={root} data-chart className="mt-6">
				<div
					aria-hidden
					className={cn(TRACK_COLS, 'text-ink-muted pb-1 text-[0.72rem] tabular-nums')}
				>
					<span />
					<div className="relative h-4">
						{layout.years.map((y) => (
							<span
								key={y.year}
								className="absolute -translate-x-1/2"
								style={{ left: `${(y.at * 100).toFixed(3)}%` }}
							>
								{String(y.year).slice(2)}
							</span>
						))}
					</div>
				</div>
				<ul className="divide-ink-line/20 border-ink-line/20 divide-y border-y">
					{layout.rows.map((r) => (
						<li key={r.label} className={cn(TRACK_COLS, 'reveal py-2.5')}>
							<div>
								<p className="text-ink flex items-baseline gap-2.5 text-[0.95rem] leading-snug font-medium">
									<span
										aria-hidden
										className={cn(
											'size-2 shrink-0 translate-y-[-1px] rounded-full',
											AREA_TONES[r.segments[0].area]
										)}
									/>
									{r.label}
								</p>
								{r.stints.map((s) => (
									<p key={s.key} className="text-ink-muted mt-0.5 pl-[1.125rem] text-[0.8rem]">
										{s.role} / {s.dates}
									</p>
								))}
							</div>
							<TimelineTrack segments={r.segments} years={layout.years} />
						</li>
					))}
				</ul>
			</div>
			<ul aria-hidden className="text-ink-soft mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[0.78rem]">
				{AREAS.map((a) => (
					<li key={a} className="flex items-center gap-2">
						<span className={cn('h-2 w-5 rounded-full', AREA_TONES[a])} />
						{AREA_LABELS[a]}
					</li>
				))}
			</ul>
		</section>
	);
}
