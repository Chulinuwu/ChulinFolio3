import { WORK_COPY } from '@/components/notebook/config/copy';
import { SCENES } from '@/components/notebook/config/scenes';
import { primaryZoneOf } from '@/components/notebook/lib/projects';
import type { WorkProjectProps } from './types/work.types';

export default function WorkFacts({ project }: WorkProjectProps) {
	const rows = [
		{ label: WORK_COPY.role, value: project.role },
		{ label: WORK_COPY.category, value: SCENES[primaryZoneOf(project)].label },
		{ label: WORK_COPY.stack, value: project.techStack.join(' / ') }
	];
	return (
		<div>
			<dl className="grid gap-0">
				{rows.map((r) => (
					<div key={r.label} className="grid grid-cols-[8rem_minmax(0,1fr)] items-baseline gap-4 border-b border-ink-line/25 py-3">
						<dt className="text-[0.9rem] text-ink-muted">{r.label}</dt>
						<dd className="text-[1rem] text-ink">{r.value}</dd>
					</div>
				))}
			</dl>
			<h2 className="mt-10 font-hand text-[1.9rem] leading-none text-ink">{WORK_COPY.story}</h2>
			<p className="mt-3 max-w-[40rem] text-[1.05rem] leading-relaxed text-ink-soft">{project.explanation}</p>
		</div>
	);
}
