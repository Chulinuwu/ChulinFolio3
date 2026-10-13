import { experiences } from '@/lib/data';
import { EXPERIENCE_GROUPS } from '../config/experience';
import type { ExperienceCard, ExperienceGroup } from '../types/notebook.types';
import { startKey } from './dates';

// Newest first; roles at the same organisation in a group share one card.
export const experienceGroups = (): ExperienceGroup[] =>
	EXPERIENCE_GROUPS.map(({ id, title, types }) => {
		const cards = new Map<string, ExperienceCard>();
		for (const e of experiences
			.filter((x) => types.includes(x.type))
			.sort((a, b) => startKey(b) - startKey(a))) {
			const org = e.tag ?? e.company;
			const card = cards.get(org) ?? {
				key: `${id}-${org}`,
				org,
				descriptions: [],
				area: e.areas?.[0],
				stints: []
			};
			card.stints.push({ key: `${e.year}-${e.role}`, role: e.role, dates: e.year });
			if (!card.descriptions.includes(e.description)) card.descriptions.push(e.description);
			cards.set(org, card);
		}
		return { id, title, cards: [...cards.values()] };
	});

export const currentRoles = () =>
	experiences.filter((e) => e.type !== 'academic' && / - now$/.test(e.year));
