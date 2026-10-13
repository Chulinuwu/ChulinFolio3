import { experiences } from '@/lib/data';
import { MIN_BAR } from '../config/timeline';
import type { TimelineLayout, TimelineRow, TimelineTrackRow } from '../types/notebook.types';
import { monthRange } from './dates';

// Newest first, the way a CV reads.
export const timelineRows = (today: number): TimelineRow[] =>
	experiences
		.flatMap((e) =>
			e.areas
				? [
						{
							key: `${e.year}-${e.role}`,
							label: e.tag ?? e.company,
							role: e.role,
							dates: e.year,
							areas: e.areas,
							...monthRange(e, today)
						}
					]
				: []
		)
		.sort((a, b) => b.start - a.start);

export function timelineLayout(rows: TimelineRow[]): TimelineLayout {
	const firstYear = Math.floor(Math.min(...rows.map((r) => r.start)) / 12);
	const d0 = firstYear * 12;
	const span = Math.max(...rows.map((r) => r.end)) - d0;
	const at = (k: number) => (k - d0) / span;
	const lastYear = Math.floor((d0 + span - 1) / 12);

	// Successive roles at one company (an internship that became part-time) share a row.
	const byCompany = new Map<string, TimelineTrackRow>();
	for (const r of rows) {
		const row = byCompany.get(r.label) ?? { label: r.label, stints: [], segments: [] };
		const from = at(r.start);
		const width = Math.max(at(r.end) - from, MIN_BAR) / r.areas.length;
		row.stints.push({ key: r.key, role: r.role, dates: r.dates });
		row.segments.push(
			...r.areas.map((area, j) => ({
				key: `${r.key}-${area}`,
				area,
				from: from + j * width,
				to: from + (j + 1) * width
			}))
		);
		byCompany.set(r.label, row);
	}

	return {
		rows: [...byCompany.values()],
		years: Array.from({ length: lastYear - firstYear + 1 }, (_, i) => ({
			year: firstYear + i,
			at: at((firstYear + i) * 12)
		}))
	};
}
