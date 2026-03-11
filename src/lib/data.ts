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

export interface Experience {
	year: string;
	role: string;
	company: string;
	description: string;
	techUsed?: string[];
	featured: boolean;
	type: 'internship' | 'freelance' | 'academic' | 'extracurricular';
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
	nickname: 'An-An',
	title: 'Developer / Designer / Data Scientist',
	subtitle: '3rd Year CEDT, Chulalongkorn University',
	objective: 'Building intelligent, scalable systems at the intersection of AI/ML and modern infrastructure.',
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
		description: 'Begin to learn competitive programming, data structure and algorithm',
		featured: false,
		type: 'academic'
	},
	{
		year: 'Aug 2023 - now',
		role: 'CEDT Student',
		company: 'Computer Engineering and Digital Technology, Chulalongkorn University',
		description: 'Begin academic life',
		featured: false,
		type: 'academic'
	},
	{
		year: 'May 2024 - July 2024',
		role: 'UX/UI Designer and Developer Intern',
		company: 'Bangkok Bank Public Company Limited (BBL)',
		description: 'iFunds project developed by Next.js + Java Quarkus + PostgreSQL',
		techUsed: ['Next.js', 'Java Quarkus', 'PostgreSQL'],
		featured: true,
		type: 'internship'
	},
	{
		year: 'May 2025 - July 2025',
		role: 'Data Scientist & Data Analyst Intern',
		company: 'Aiful Corp, Aira & Aiful Public Company Limited',
		description: 'Developed credit scoring models and performed data analysis to extract insights for business decision making',
		techUsed: ['Pandas', 'Polars', 'AutoGluon', 'PowerBI'],
		featured: true,
		type: 'internship'
	},
	{
		year: 'Aug 2025 - now',
		role: 'Data Scientist Intern',
		company: 'Siam Commercial Bank (SCB)',
		description: 'Working on computer vision models for SCB graphics and conversion rate optimization through advanced ML techniques',
		techUsed: ['Python', 'Stable Diffusion', 'NLP'],
		featured: true,
		type: 'internship'
	},
	{
		year: 'Sep 2024 - now',
		role: 'Information System Development (ISD) Frontend Developer',
		company: 'Computer Engineering and Digital Technology, Chulalongkorn University',
		description: 'SUCU Project development and system implementation',
		techUsed: ['SvelteKit'],
		featured: false,
		type: 'extracurricular'
	},
	{
		year: 'Sep 2024 - now',
		role: 'Google Developer Student Clubs (GDSC) Core Team (Graphic)',
		company: 'Computer Engineering and Digital Technology, Chulalongkorn University',
		description: 'Designing and creating graphics for GDSC events and campaigns',
		featured: false,
		type: 'extracurricular'
	},
	{
		year: 'Aug 2025 - now',
		role: 'Freelance Multi-disciplinary Consultant',
		company: 'Self-employed',
		description: 'Providing consultancy services in graphic design, illustration, web development, UX/UI design, and data science solutions',
		techUsed: ['WordPress', 'PHP', 'Odoo', 'React'],
		featured: true,
		type: 'freelance'
	}
];

export const projects: Project[] = [
	{
		slug: 'aurora-ai',
		name: 'Aurora Analytic AI',
		description: 'AI-powered analytics platform for business intelligence and data visualization.',
		explanation: 'A full-stack analytics platform built on SvelteKit with Vertex AI and BigQuery ML for predictive modeling. Integrates Supabase for real-time data storage and Node.js APIs for orchestration of AI inference pipelines.',
		role: 'Full-stack Developer & ML Engineer',
		category: 'data-science',
		techStack: ['SvelteKit', 'Node.js', 'Vertex AI', 'BigQuery ML', 'Supabase'],
		link: 'https://aurora-analytic-ai.vercel.app/',
		image: '/projects/aurora.png',
		featured: true
	},
	{
		slug: 'digital-wallet',
		name: 'Digital Wallet System',
		description: 'Distributed digital wallet with consensus-based fault tolerance and saga transactions.',
		explanation: 'Implements a distributed wallet backend using Raft consensus for leader election and replication, RocksDB for local state persistence, and Cassandra for scalable storage. Saga pattern handles cross-service transactions safely.',
		role: 'Backend & Distributed Systems Developer',
		category: 'web-dev',
		techStack: ['Raft', 'RocksDB', 'Cassandra', 'Saga'],
		image: '/projects/digital_wallet.png',
		featured: true
	},
	{
		slug: 'smart-home',
		name: 'Smart Home System',
		description: 'IoT-based smart home monitoring with real-time sensor data and remote control.',
		explanation: 'Built on ESP32 and Raspberry Pi communicating over MQTT, storing time-series sensor data in InfluxDB. Features real-time dashboards, alert systems, and remote actuator control for a full home automation stack.',
		role: 'IoT & Embedded Systems Developer',
		category: 'iot',
		techStack: ['ESP32', 'Raspberry Pi', 'MQTT', 'InfluxDB'],
		github: 'https://github.com/Chulinuwu/Smart_Farm_Plant_Monitoring_System',
		featured: true
	},
	{
		slug: 'police-platform',
		name: 'Police Alerts Platform',
		description: 'Public-facing alerts and information platform for a regional police department.',
		explanation: 'Freelance project delivering a WordPress-based alerts platform for Don Hualor Chonburi Police. Custom PHP templates, HTML/CSS/JS for interactive alert feeds and public announcement management.',
		role: 'Freelance Full-stack Developer',
		category: 'freelance',
		techStack: ['WordPress', 'PHP', 'HTML', 'CSS', 'JavaScript'],
		link: 'https://donhualor-chonburi-police.com/',
		featured: true
	},
	{
		slug: 'plant-disease',
		name: 'AI Plant Disease Detection',
		description: 'Real-time plant disease detection system using computer vision on edge hardware.',
		explanation: 'Runs a deep learning image classification model on ESP32-CAM for real-time leaf disease detection. C++ firmware communicates results to a SvelteKit dashboard, integrating cloud alerts via WhatsApp and Gmail.',
		role: 'ML Engineer & Embedded Developer',
		category: 'iot',
		categories: ['iot', 'data-science'],
		techStack: ['Python', 'Deep Learning', 'C++', 'SvelteKit', 'ESP32-CAM'],
		github: 'https://github.com/Chulinuwu/Smart_Farm_Plant_Monitoring_System',
		featured: false
	},
	{
		slug: 'citation-prediction',
		name: 'AI Paper Citation Prediction',
		description: 'ML model predicting the citation popularity of academic papers.',
		explanation: 'Trained AutoGluon ensemble models on paper metadata and abstract features to predict future citation counts. Includes feature engineering, hyperparameter tuning, and evaluation against baseline models.',
		role: 'Data Scientist',
		category: 'data-science',
		techStack: ['AutoGluon', 'Python'],
		github: 'https://github.com/Chulinuwu/ArticlePopularityPrediction',
		featured: false
	},
	{
		slug: 'line-chatbot',
		name: 'LINE Chatbot Order Management',
		description: 'LINE chatbot for automating order intake and management for small businesses.',
		explanation: 'Integrates LINE Messaging API with a Node.js backend to handle order creation, status updates, and customer notifications. Supports rich menu interactions and webhook event processing.',
		role: 'Backend Developer',
		category: 'web-dev',
		techStack: ['LINE API', 'Node.js'],
		featured: false
	},
	{
		slug: 'virtual-idol',
		name: 'AI Virtual Idol Chatbot',
		description: 'Conversational AI chatbot with a VTuber persona powered by open-source LLMs.',
		explanation: 'Combines Llama 3.2 with OpenAI API for persona-driven conversation, served via FastAPI backend and Svelte frontend. Includes character memory, response streaming, and customizable personality prompts.',
		role: 'Full-stack Developer & ML Engineer',
		category: 'data-science',
		techStack: ['Llama 3.2', 'OpenAI API', 'FastAPI', 'Svelte'],
		featured: false
	},
	{
		slug: 'uniclub',
		name: 'UniClub',
		description: 'Platform for university students to discover and manage campus clubs.',
		explanation: 'React frontend with Node.js backend enabling students to browse clubs, submit memberships, and manage profiles. Includes a back-office system for club administrators to track members and post announcements.',
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
		explanation: 'Freelance Odoo ERP customization with Python modules for inventory tracking, purchase orders, and reporting. Deployed via Docker for client on-premise infrastructure.',
		role: 'Freelance ERP Developer',
		category: 'freelance',
		techStack: ['Odoo', 'Python', 'Docker'],
		featured: false
	},
	{
		slug: 'chula-macaron',
		name: 'Chula Macaron',
		description: 'Mobile app for Chula students to report campus facility issues.',
		explanation: 'React Native app allowing students to photograph and report damaged facilities on campus. Submissions route to relevant departments with location tagging and status tracking.',
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
		explanation: 'JavaFX desktop game with sprite animation, collision detection, and progressive difficulty. Player controls a dog character in a space environment, throwing bananas to defeat waves of monkeys.',
		role: 'Game Developer',
		category: 'web-dev',
		techStack: ['JavaFX'],
		github: 'https://github.com/amphikapha/Dog-VS-Monkey',
		featured: false
	},
	{
		slug: 'qr-generator',
		name: 'QR Code Generator',
		description: 'Lightweight web app to generate QR codes from any URL.',
		explanation: 'Svelte single-page app that takes a user-entered URL and renders a downloadable QR code. Fast, minimal, and deployed on Vercel.',
		role: 'Frontend Developer',
		category: 'web-dev',
		techStack: ['Svelte'],
		link: 'https://q-rcode-gen.vercel.app/',
		featured: false
	},
	{
		slug: 'chatwithgpt',
		name: 'ChatwithGPT',
		description: 'Real-time web chat interface with OpenAI GPT and a custom VTuber persona.',
		explanation: 'FastAPI backend streams OpenAI API responses to a Svelte frontend. Ships with a Pekora VTuber base persona and supports custom system prompts for character switching.',
		role: 'Full-stack Developer',
		category: 'data-science',
		techStack: ['FastAPI', 'Svelte', 'OpenAI API'],
		github: 'https://github.com/Chulinuwu/ChatwithGPT',
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
		skills: ['React', 'Next.js', 'Svelte', 'Vue', 'React-Native', 'Flutter', 'Astro', 'Express', 'FastAPI', 'Flask', 'Quarkus', 'Streamlit', 'ThreeJS']
	},
	{
		name: 'Tools & Cloud',
		skills: ['Docker', 'GCP', 'AWS', 'Git', 'Figma', 'PowerBI', 'Postman', 'Blender', 'MongoDB', 'PostgreSQL', 'MySQL']
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
	fastwork: {
		href: 'https://fastwork.co/user/chulinxz',
		target: '_blank',
		title: 'Fastwork',
		handle: '@chulinxz',
		description: 'Freelance Services'
	},
	discord: {
		href: 'https://discord.com/users/chulinx',
		target: '_blank',
		title: 'Discord',
		handle: '@chulinx',
		description: ''
	}
};
