import { cn } from '@/lib/utils';
import { AREA_TONES } from '../config/timeline';
import type { ExperienceCardProps } from '../types/notebook.types';

export default function ExperienceCard({ card }: ExperienceCardProps) {
	return (
		<li className="reveal border-ink-line/20 grid gap-x-10 gap-y-2 border-b py-5 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
			<p className="text-ink flex items-baseline gap-2.5 text-[1rem] leading-snug font-semibold">
				<span
					aria-hidden
					className={cn(
						'size-2 shrink-0 translate-y-[-1px] rounded-full',
						card.area ? AREA_TONES[card.area] : 'bg-ink-line/40'
					)}
				/>
				{card.org}
			</p>
			<div>
				<ul className="grid gap-1">
					{card.stints.map((s) => (
						<li key={s.key} className="flex flex-wrap items-baseline justify-between gap-x-6">
							<span className="text-ink text-[0.98rem] font-medium">{s.role}</span>
							<span className="text-ink-muted text-[0.85rem] tabular-nums">{s.dates}</span>
						</li>
					))}
				</ul>
				{card.descriptions.map((d) => (
					<p key={d} className="text-ink-soft mt-2 max-w-[62ch] text-[0.92rem] leading-relaxed">
						{d}
					</p>
				))}
			</div>
		</li>
	);
}
