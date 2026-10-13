import type { ExperienceGroupConfig } from '../types/notebook.types';

export const EXPERIENCE_GROUPS: ExperienceGroupConfig[] = [
	{ id: 'work', title: 'Work', types: ['part-time', 'internship', 'freelance'] },
	{ id: 'activities', title: 'Activities', types: ['extracurricular'] },
	{ id: 'education', title: 'Education', types: ['academic'] }
];
