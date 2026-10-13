export type ProjectCategory = 'data-science' | 'web-dev' | 'iot' | 'hackathon' | 'freelance';

export interface Project {
	slug: string;
	name: string;
	description: string;
	explanation: string;
	role: string;
	category: ProjectCategory;
	categories?: ProjectCategory[];
	techStack: string[];
	link?: string;
	github?: string;
	image?: string;
	featured: boolean;
	placement?: string;
}

export type ExperienceArea = 'data' | 'software' | 'design';

export interface Experience {
	year: string;
	role: string;
	company: string;
	short: string;
	focus?: string;
	areas?: ExperienceArea[];
	tag?: string;
	description: string;
	techUsed?: string[];
	featured: boolean;
	type: 'internship' | 'part-time' | 'freelance' | 'academic' | 'extracurricular';
}

export interface Hackathon {
	name: string;
	placement: string;
	year: string;
	description: string;
	icon: 'trophy' | 'medal' | 'star';
}

export interface SkillCategory {
	name: string;
	skills: string[];
}

export interface Education {
	institution: string;
	degree: string;
	location: string;
	period: string;
}

export const badges = [
	'Consultant',
	'Web Design',
	'UX & UI design',
	'Data Analysis',
	'Data Science',
	'System Design',
	'Illustration'
];

export const heroData = {
	name: 'Jirameth Wannasiwaporn',
	nickname: 'Chulin',
	title: 'Data Scientist / AI Engineer',
	subtitle: '3rd Year CEDT, Chulalongkorn University',
	objective:
		'Building intelligent, scalable systems at the intersection of AI/ML and modern infrastructure.',
	buttons: {
		primary: { text: 'View Projects', href: '/projects' },
		secondary: { text: 'Get in Touch', href: '#connect' }
	}
};

export const experiences: Experience[] = [
	{
		year: 'Apr 2021',
		role: 'POSN 1-2 Computer Student',
		company: 'Burapha University',
		short: 'Burapha University',
		description: 'Competitive programming, data structures and algorithms',
		featured: false,
		type: 'academic'
	},
	{
		year: 'Aug 2023 - now',
		role: 'CEDT Student',
		company: 'Computer Engineering and Digital Technology, Chulalongkorn University',
		short: 'CEDT, Chulalongkorn University',
		description: 'B.Eng. in Computer Engineering and Digital Technology',
		featured: false,
		type: 'academic'
	},
	{
		year: 'May 2024 - July 2024',
		role: 'UX/UI Designer and Developer Intern',
		company: 'Bangkok Bank Public Company Limited (BBL)',
		short: 'Bangkok Bank',
		focus: 'UX/UI design and development',
		areas: ['software', 'design'],
		description: 'iFunds project developed by Next.js + Java Quarkus + PostgreSQL',
		techUsed: ['Next.js', 'Java Quarkus', 'PostgreSQL'],
		featured: true,
		type: 'internship'
	},
	{
		year: 'May 2025 - July 2025',
		role: 'Data Scientist & Data Analyst Intern',
		company: 'Aiful Corp, Aira & Aiful Public Company Limited',
		short: 'Aiful',
		focus: 'Credit risk modeling',
		areas: ['data'],
		description:
			'National Credit Bureau (NCB) data analysis and credit risk assessment model development for business decision making',
		techUsed: ['Pandas', 'Polars', 'AutoGluon', 'Scikit-learn', 'PowerBI'],
		featured: true,
		type: 'internship'
	},
	{
		year: 'Sep 2025 - Apr 2026',
		role: 'Data Scientist Intern',
		company: 'Siam Commercial Bank (SCB)',
		short: 'SCB',
		focus: 'Generative ad workflows and MLOps',
		areas: ['data'],
		description:
			'Built AI/ML workflows for advertisement generation, evaluation and improvement using NLP and generative models across data science, ML engineering and MLOps',
		techUsed: ['Python', 'NLP', 'Generative AI', 'MLOps'],
		featured: true,
		type: 'internship'
	},
	{
		year: 'July 2026 - now',
		role: 'Data Scientist (Part-time)',
		company: 'Visai AI Co., Ltd.',
		short: 'Visai AI',
		focus: 'Thai legal NLP',
		areas: ['data'],
		description:
			'Developing legal NLP systems for Thai legal documents including extraction, classification and retrieval workflows, with data pipelines and model evaluation',
		techUsed: ['Python', 'NLP', 'Transformers'],
		featured: true,
		type: 'part-time'
	},
	{
		year: 'May 2026 - July 2026',
		role: 'Data Scientist Intern',
		company: 'Visai AI Co., Ltd.',
		short: 'Visai AI',
		focus: 'Thai legal NLP',
		areas: ['data'],
		description:
			'Developing legal NLP systems for Thai legal documents including extraction, classification and retrieval workflows, with data pipelines and model evaluation',
		techUsed: ['Python', 'NLP', 'Transformers'],
		featured: true,
		type: 'internship'
	},
	{
		year: 'Sep 2024 - Sep 2025',
		role: 'Information System Development (ISD) Frontend Developer',
		company: 'Computer Engineering and Digital Technology, Chulalongkorn University',
		short: 'CEDT, Chulalongkorn University',
		description: 'SUCU Project development and system implementation',
		techUsed: ['SvelteKit'],
		featured: false,
		type: 'extracurricular'
	},
	{
		year: 'Sep 2024 - Sep 2025',
		role: 'Google Developer Student Clubs (GDSC) Core Team (Graphic)',
		company: 'Computer Engineering and Digital Technology, Chulalongkorn University',
		short: 'CEDT, Chulalongkorn University',
		description: 'Designing and creating graphics for GDSC events and campaigns',
		featured: false,
		type: 'extracurricular'
	},
	{
		year: '2021 - now',
		role: 'Freelance Full-stack Developer & AI Engineer',
		company: 'Self-employed',
		short: 'Self-employed',
		areas: ['software'],
		tag: 'Freelance',
		description:
			'Delivered end-to-end software engineering, data science and AI solutions across product design, backend services, frontend interfaces, deployment and data workflows',
		techUsed: ['Next.js', 'FastAPI', 'Odoo', 'React', 'Supabase'],
		featured: true,
		type: 'freelance'
	}
];

export const projects: Project[] = [
	{
		slug: 'aurora-ai',
		name: 'Aurora Analytic AI',
		description: 'Analytics platform that adds predictive models and charts to business data.',
		explanation:
			'A full-stack analytics platform built on SvelteKit with Vertex AI and BigQuery ML for predictive modeling. Integrates Supabase for real-time data storage and Node.js APIs for orchestration of AI inference pipelines.',
		role: 'Full-stack Developer & ML Engineer',
		category: 'data-science',
		techStack: ['SvelteKit', 'Node.js', 'Vertex AI', 'BigQuery ML', 'Supabase'],
		link: 'https://aurora-analytic-ai.vercel.app/',
		image: '/projects/aurora.webp',
		featured: true
	},
	{
		slug: 'aivertise',
		name: 'Aivertise',
		description:
			'Workflow that turns a campaign brief into ad layouts, background direction, text placement and finished creative.',
		explanation:
			'Built an autonomous workflow that ingests campaign PDFs and context, then generates ad layout specifications, background direction, text placement and production-ready creative outputs. Integrated CTR and persona-analysis signals to inform future ad direction, with FastAPI and Vue services for ingestion, specification generation, creative orchestration and review.',
		role: 'AI Engineer',
		category: 'data-science',
		techStack: ['FastAPI', 'Vue', 'Generative AI', 'NLP'],
		image: '/projects/aivertise.webp',
		featured: true
	},
	{
		slug: 'ugc-moderation',
		name: 'Thai-English UGC Moderation System',
		description:
			'Severity-based profanity and inappropriate-content detection for high-volume user content.',
		explanation:
			'Built a Thai-English profanity and inappropriate-content detection system for high-volume user-generated content. Moderation is graded by severity: highly unsafe content is banned automatically and borderline cases go to admin review. Batch processing, monitoring and retraining workflows orchestrated by Airflow.',
		role: 'ML Systems & MLOps Engineer',
		category: 'data-science',
		techStack: ['Transformers', 'Airflow', 'NLP', 'MLOps'],
		image: '/projects/ugc.webp',
		featured: false
	},
	{
		slug: 'digital-wallet',
		name: 'Digital Wallet System',
		description:
			'Distributed digital wallet with consensus-based fault tolerance and saga transactions.',
		explanation:
			'Implements a distributed wallet backend using Raft consensus for leader election and replication, RocksDB for local state persistence and Cassandra for shared storage. Sagas coordinate transactions that span services.',
		role: 'Backend & Distributed Systems Developer',
		category: 'web-dev',
		techStack: ['Raft', 'RocksDB', 'Cassandra', 'Saga'],
		image: '/projects/digital-wallet.webp',
		featured: true
	},
	{
		slug: 'smart-home',
		name: 'Smart Home System',
		description: 'Home monitoring with live sensor data and remote control of appliances.',
		explanation:
			'Built on ESP32 and Raspberry Pi communicating over MQTT, storing time-series sensor data in InfluxDB. Includes live dashboards, alerts and remote actuator control.',
		role: 'IoT & Embedded Systems Developer',
		category: 'iot',
		techStack: ['ESP32', 'Raspberry Pi', 'MQTT', 'InfluxDB'],
		github: 'https://github.com/Chulinuwu/Smart_Farm_Plant_Monitoring_System',
		image: '/projects/smarthome.webp',
		featured: true
	},
	{
		slug: 'police-platform',
		name: 'Police Alerts Platform',
		description: 'Public-facing alerts and information platform for a regional police department.',
		explanation:
			'Freelance project delivering a WordPress-based alerts platform for Don Hualor Chonburi Police. Custom PHP templates and HTML, CSS and JavaScript run the alert feed and the announcement editor.',
		role: 'Freelance Full-stack Developer',
		category: 'freelance',
		techStack: ['WordPress', 'PHP', 'HTML', 'CSS', 'JavaScript'],
		link: 'https://donhualor-chonburi-police.com/',
		image: '/projects/police.webp',
		featured: true
	},
	{
		slug: 'plant-disease',
		name: 'AI Plant Disease Detection',
		description:
			'Detects plant leaf disease in real time with an image model running on an ESP32-CAM.',
		explanation:
			'Runs a deep learning image classification model on ESP32-CAM for real-time leaf disease detection. C++ firmware communicates results to a SvelteKit dashboard, integrating cloud alerts via WhatsApp and Gmail.',
		role: 'ML Engineer & Embedded Developer',
		category: 'iot',
		categories: ['iot', 'data-science'],
		techStack: ['Python', 'Deep Learning', 'C++', 'SvelteKit', 'ESP32-CAM'],
		github: 'https://github.com/Chulinuwu/Smart_Farm_Plant_Monitoring_System',
		image: '/projects/plant.webp',
		featured: false
	},
	{
		slug: 'citation-prediction',
		name: 'AI Paper Citation Prediction',
		description: 'Model that predicts how often an academic paper will be cited.',
		explanation:
			'Trained AutoGluon ensemble models on paper metadata and abstract features to predict future citation counts. Includes feature engineering, hyperparameter tuning and evaluation against baseline models.',
		role: 'Data Scientist',
		category: 'data-science',
		techStack: ['AutoGluon', 'Python'],
		github: 'https://github.com/Chulinuwu/ArticlePopularityPrediction',
		featured: false
	},
	{
		slug: 'nubsatang',
		name: 'Nubsatang (นับสตางค์)',
		description:
			'Commerce system for Thai online sellers: AI chatbot, storefront, orders, stock and finances in one place.',
		explanation:
			'Nubsatang pulls the whole back office of a Thai online shop into one platform. A 24/7 AI chatbot takes orders, answers customers and verifies payment slips, backed by a customizable web storefront, inventory and order management, a financial dashboard and LINE OA plus shipping-label integration. Built and run as a configurable SaaS with no commission fees, free to start.',
		role: 'Founder & Full-stack Engineer',
		category: 'web-dev',
		techStack: ['Next.js', 'Cloudflare', 'Redis', 'Supabase', 'LINE OA', 'AI'],
		link: 'https://nubsatang.com/',
		image: '/projects/nubsatang.webp',
		featured: true
	},
	{
		slug: 'uniclub',
		name: 'UniClub',
		description: 'Platform for university students to discover and manage campus clubs.',
		explanation:
			'React frontend with Node.js backend enabling students to browse clubs, submit memberships and manage profiles. Includes a back-office system for club administrators to track members and post announcements.',
		role: 'Full-stack Developer',
		category: 'web-dev',
		techStack: ['React', 'Node.js'],
		github: 'https://github.com/Chulinuwu/UniClubFrontend',
		link: 'https://uni-club-frontend-pey5.vercel.app/',
		featured: false
	},
	{
		slug: 'erp-system',
		name: 'Inventory Management ERP',
		description: 'Custom ERP module for inventory and supply chain management.',
		explanation:
			'Freelance Odoo ERP customization with Python modules for inventory tracking, purchase orders and reporting. Deployed via Docker for client on-premise infrastructure.',
		role: 'Freelance ERP Developer',
		category: 'freelance',
		techStack: ['Odoo', 'Python', 'Docker'],
		featured: false
	},
	{
		slug: 'chula-macaron',
		name: 'Chula Macaron',
		description: 'Mobile app for Chula students to report campus facility issues.',
		explanation:
			'React Native app allowing students to photograph and report damaged facilities on campus. Submissions route to relevant departments with location tagging and status tracking.',
		role: 'UX/UI and Frontend Developer',
		category: 'web-dev',
		techStack: ['React-Native'],
		github: 'https://github.com/xXpeira12/ChulaMacaron',
		featured: false
	},
	{
		slug: 'dog-vs-monkey',
		name: 'Dog vs Monkey Game',
		description: 'Space shooter game where a dog throws bananas at incoming monkeys.',
		explanation:
			'JavaFX desktop game with sprite animation, collision detection and progressive difficulty. Player controls a dog character in a space environment, throwing bananas to defeat waves of monkeys.',
		role: 'Game Developer',
		category: 'web-dev',
		techStack: ['JavaFX'],
		github: 'https://github.com/amphikapha/Dog-VS-Monkey',
		featured: false
	},
	{
		slug: 'qr-generator',
		name: 'QR Code Generator',
		description: 'Web app that turns a URL into a QR code.',
		explanation:
			'Svelte single-page app that takes a URL and renders a downloadable QR code, deployed on Vercel.',
		role: 'Frontend Developer',
		category: 'web-dev',
		techStack: ['Svelte'],
		link: 'https://q-rcode-gen.vercel.app/',
		featured: false
	},
	{
		slug: 'decision-sql',
		name: 'Decision SQL',
		description:
			'Thai and English text-to-SQL where a small model chooses between typed query plans and never writes SQL itself.',
		explanation:
			'A small language model (LiquidAI d1-3B) answers a fixed set of multiple-choice questions about each Thai or English question. Code turns those answers into candidate query plans, compiles each one into parameterized read-only PostgreSQL and asks the model to rank them. Answers show the result rows, the SQL, the chosen interpretation and the alternatives. It covers the public Olist e-commerce dataset and a synthetic utility-meter workspace with anomaly and period-change analysis. The decision examples are published as the Text2SQL-Decisions dataset on Hugging Face.',
		role: 'ML Engineer',
		category: 'data-science',
		techStack: ['TypeScript', 'PostgreSQL', 'LiquidAI d1-3B', 'Hugging Face'],
		github: 'https://github.com/Chulinuwu/decisionmodel-text-to-sql',
		featured: false
	},
	{
		slug: 'network-forecast',
		name: 'Network Throughput Forecasting',
		description:
			'LSTM model that forecasts next-second network throughput from the previous 30 seconds of traffic.',
		explanation:
			'Packet captures from a Kaggle network traffic dataset are summed into one-second throughput and log-transformed to tame spikes. A 30-second sliding window feeds a stacked bidirectional LSTM (64 then 32 units). The model trains on mean absolute error so traffic bursts do not dominate the fit.',
		role: 'Data Scientist',
		category: 'data-science',
		techStack: ['Python', 'LSTM', 'Jupyter'],
		github: 'https://github.com/Chulinuwu/Network_perf_ml',
		featured: false
	},
	{
		slug: 'skillloom',
		name: 'Skillloom',
		description:
			'Private, local-first second brain for AI coding agents, shared across Claude Code, Codex and a Tailnet.',
		explanation:
			'Skillloom keeps one self-hosted state layer for AI coding agents across machines. A Brain stores notes, sources, decisions and workflow evidence, which agents read through authenticated interfaces. A workflow becomes an executable Agent Skill only after verification, validation and a signed release, so a remembered note stays data. It is published on npm as @chulinxz/skillloom.',
		role: 'Author',
		category: 'web-dev',
		techStack: ['TypeScript', 'Node.js', 'MCP', 'Tailscale'],
		github: 'https://github.com/Chulinuwu/skillloom',
		link: 'https://www.npmjs.com/package/@chulinxz/skillloom',
		featured: false
	},
	{
		slug: 'agent-transfer',
		name: 'agent-transfer',
		description:
			'Moves sessions and configuration between Claude Code and Codex CLI in both directions.',
		explanation:
			'Reads a session or configuration from one coding agent, converts it to a neutral intermediate representation and writes it out for the other. It carries conversations, CLAUDE.md and AGENTS.md instructions, MCP server settings and skills folders. It is plain Node.js with no dependencies. Nothing is written until --apply is passed.',
		role: 'Author',
		category: 'web-dev',
		techStack: ['Node.js'],
		github: 'https://github.com/Chulinuwu/Agent-transfer',
		featured: false
	},
	{
		slug: 'programmable-payment',
		name: 'Programmable Payment PoC',
		description:
			'Payment programs whose rules and checklists decide when a transaction goes through.',
		explanation:
			'A FastAPI backend with a rules engine and a file-backed JSON datastore manages payment programs, transactions, merchants and per-transaction checklists. A Streamlit demo and a SvelteKit guided UI walk through creating a program, triggering a transaction and completing its checklist.',
		role: 'Full-stack Developer',
		category: 'web-dev',
		techStack: ['Python', 'FastAPI', 'Streamlit', 'SvelteKit'],
		github: 'https://github.com/Chulinuwu/programmable_event',
		featured: false
	}
];

export const hackathons: Hackathon[] = [
	{
		name: 'AiHack 2025',
		placement: '3rd Runner Up',
		year: '2025',
		description: 'Loan repayment prediction model using AutoGluon',
		icon: 'trophy'
	},
	{
		name: 'Cyber Top Talent 2025',
		placement: '7th / 500+ teams',
		year: '2025',
		description: 'Reverse engineering, web exploitation, cryptography',
		icon: 'medal'
	},
	{
		name: 'ITMX Hack to the Max 2025',
		placement: 'Finalist (Top 15/200+)',
		year: '2025',
		description: 'Thailand Deferred Payment architecture',
		icon: 'star'
	},
	{
		name: 'AiHack 2023',
		placement: '3rd Runner Up',
		year: '2023',
		description: 'Loan repayment success prediction',
		icon: 'trophy'
	}
];

export const skillCategories: SkillCategory[] = [
	{
		name: 'Languages',
		skills: ['C', 'C++', 'Python', 'Java', 'JavaScript', 'TypeScript', 'Dart', 'Go']
	},
	{
		name: 'Frameworks',
		skills: [
			'React',
			'Next.js',
			'Svelte',
			'Vue',
			'React-Native',
			'Flutter',
			'Astro',
			'Express',
			'FastAPI',
			'Flask',
			'Quarkus',
			'Streamlit',
			'ThreeJS'
		]
	},
	{
		name: 'Tools & Cloud',
		skills: [
			'Docker',
			'GCP',
			'AWS',
			'Git',
			'Figma',
			'PowerBI',
			'Postman',
			'Blender',
			'MongoDB',
			'PostgreSQL',
			'MySQL'
		]
	},
	{
		name: 'Data & ML',
		skills: ['AutoGluon', 'Scikit-learn', 'Transformers', 'Pandas', 'Polars', 'Spark', 'Kafka']
	}
];

export const education: Education = {
	institution: 'Chulalongkorn University',
	degree: 'B.Eng. CEDT',
	location: 'Bangkok Thailand',
	period: '2023-2026'
};

export const stats = [
	{ label: 'Years of Experience', value: 3, suffix: '+' },
	{ label: 'Projects Delivered', value: 15, suffix: '+' },
	{ label: 'Tech Stacks', value: 20, suffix: '+' },
	{ label: 'Clients & Orgs Served', value: 8, suffix: '+' }
];

export const contacts = {
	instagram: {
		href: 'https://www.instagram.com/vyovyo___',
		target: '_blank',
		title: 'Instagram',
		handle: '@vyovyo___',
		description: 'Visual Stories & My Journey'
	},
	github: {
		href: 'https://github.com/Chulinuwu/',
		target: '_blank',
		title: 'GitHub',
		handle: '@Chulinuwu',
		description: 'Code & projects'
	},
	linkedin: {
		href: 'https://www.linkedin.com/in/jiramethwa/',
		target: '_blank',
		title: 'LinkedIn',
		handle: '@jiramethwa',
		description: 'Professional Network'
	},
	email: {
		href: 'mailto:jirameth.wa@gmail.com',
		target: undefined,
		title: 'Email',
		handle: 'jirameth.wa@gmail.com',
		description: ''
	},
	discord: {
		href: 'https://discord.com/users/chulinx',
		target: '_blank',
		title: 'Discord',
		handle: '@chulinx',
		description: ''
	}
};
