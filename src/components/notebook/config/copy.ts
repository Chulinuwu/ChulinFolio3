export const HOME_COPY = {
	tagline:
		'I build machine learning models and data pipelines, from credit risk scoring to generative AI.',
	meta: ['Data science, machine learning and full-stack software engineering', 'Bangkok, Thailand'],
	experience: 'Experiences',
	selected: 'Selected work',
	now: 'Right now',
	moreHead: 'Other projects',
	viewProject: 'View project'
} as const;

export const HOME_DECK = [
	{ slug: 'nubsatang', subtitle: 'AI commerce SaaS / Founder' },
	{ slug: 'aivertise', subtitle: 'Generative ad workflow / AI Engineer' },
	{ slug: 'aurora-ai', subtitle: 'Predictive analytics / ML Engineer' },
	{ slug: 'ugc-moderation', subtitle: 'Thai-English moderation / MLOps' }
] as const;

export const HOME_CONTACTS = ['email', 'github', 'linkedin'] as const;

export const HOME_EXPERIMENTS = ['decision-sql', 'skillloom', 'network-forecast'] as const;

export const ZONE_COPY = {
	lab: {
		title: 'Data Projects',
		intro: 'Models I built in my own projects and at SCB, Aiful and Visai AI.',
		more: 'Other data projects'
	},
	studio: {
		title: 'Experiences',
		intro: 'Work, activities and education since 2021.'
	},
	workshop: {
		title: 'Software Projects',
		intro: 'A commerce SaaS, a distributed wallet, IoT devices and client websites.',
		more: 'Other software projects',
		visit: 'Visit site'
	},
	contact: {
		title: 'Contact',
		intro: 'Open to data science and AI engineering roles, freelance and collaborations.'
	}
} as const;

export const LAB_CAPTIONS: Record<string, string> = {
	aivertise: 'Turns a campaign PDF into ad layouts, text placement and finished creative.',
	'ugc-moderation': 'Flags Thai-English profanity and sends borderline posts to human review.',
	'aurora-ai': 'Predictive analytics on business data with BigQuery ML and Vertex AI.',
	'plant-disease': 'Classifies leaf disease on an ESP32-CAM and sends alerts by WhatsApp and Gmail.'
};

export const TOUR_COPY = { home: 'Back to home', nextPrefix: 'Next:' } as const;

export const NOT_FOUND_COPY = {
	title: 'No page at this address.',
	body: 'The link may be out of date or mistyped. The tabs on the right lead to every section of the site.',
	note: ['404'],
	cta: 'Go to the home page'
} as const;

export const WORK_COPY = {
	role: 'Role',
	category: 'Section',
	stack: 'Built with',
	story: 'How it works',
	visit: 'Visit site',
	github: 'GitHub',
	prev: 'Previous page',
	next: 'Next page'
} as const;
