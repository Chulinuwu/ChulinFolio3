import type { Scene, SceneId } from '../types/notebook.types';

const SITE = "Chulin's Notebook";

// The single route map: pages, index tabs, metadata, the sitemap and the page-turn direction read from here.
export const SCENES: Record<SceneId, Scene> = {
	home: {
		id: 'home',
		order: 0,
		path: '/',
		label: 'Chulin',
		tabLabel: 'Home',
		title: SITE,
		description:
			'Chulin (Jirameth Wannasiwaporn) builds machine learning models and data pipelines. Her notebook: roles and selected projects.',
		next: 'lab',
		pen: 'pink'
	},
	lab: {
		id: 'lab',
		order: 1,
		path: '/lab',
		label: 'Data Projects',
		tabLabel: 'Data Projects',
		title: `Data Projects | ${SITE}`,
		description:
			'Data science and machine learning projects by Chulin: generative ad workflows, text-to-SQL, Thai-English moderation, analytics and computer vision.',
		next: 'workshop',
		pen: 'blue'
	},
	workshop: {
		id: 'workshop',
		order: 2,
		path: '/workshop',
		label: 'Software Projects',
		tabLabel: 'Software Projects',
		title: `Software Projects | ${SITE}`,
		description:
			'Software and hardware Chulin built, led by Nubsatang, a commerce system for Thai online sellers.',
		next: 'studio',
		pen: 'green'
	},
	studio: {
		id: 'studio',
		order: 3,
		path: '/studio',
		label: 'Experiences',
		tabLabel: 'Experiences',
		title: `Experiences | ${SITE}`,
		description: 'Every school, internship and club Chulin has been part of since 2021.',
		next: 'contact',
		pen: 'violet'
	},
	contact: {
		id: 'contact',
		order: 4,
		path: '/contact',
		label: 'Contact',
		tabLabel: 'Contact',
		title: `Contact | ${SITE}`,
		description:
			'Get in touch with Chulin about data science and AI engineering roles, freelance work and collaborations.',
		next: 'home',
		pen: 'orange'
	}
};

export const TAB_SCENES: SceneId[] = ['home', 'lab', 'workshop', 'studio', 'contact'];
