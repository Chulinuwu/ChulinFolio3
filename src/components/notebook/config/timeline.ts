import type { ExperienceArea } from '@/lib/data';

// One spring sweeps left to right across the years; each bar fills as the sweep passes its months.
export const TIMELINE_MOTION = { freq: 0.5, damping: 0.95, settleS: 3.2 } as const;

// Shortest bar as a fraction of the track, so a one-month role still reads as a mark.
export const MIN_BAR = 0.04;

export const AREAS: ExperienceArea[] = ['data', 'software', 'design'];

export const AREA_LABELS: Record<ExperienceArea, string> = {
	data: 'data science',
	software: 'software',
	design: 'design'
};

export const AREA_TONES: Record<ExperienceArea, string> = {
	data: 'bg-area-data',
	software: 'bg-area-software',
	design: 'bg-area-design'
};
