// Badge data
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
	name: 'An-An',
	title: 'Developer / Designer',
	subtitle: '3rd Year Computer Engineering and Digital Technology (CEDT), Chulalongkorn University',
	buttons: {
		primary: { text: 'My projects', href: './work' },
		secondary: { text: 'Contact me', href: './contact' }
	}
};

// Projects data from old code
export const projects = [
	{
		name: 'Real-time AI Leaf Disease Detection',
		description: 'A real-time system for detecting plant leaf diseases using deep learning.',
		explanation:
			'This project uses ESP32 for communication, Svelte for the frontend, and Python Flask for the backend. It integrates with Blynk Cloud, Google Sheets, and sends alerts through WhatsApp via Twilio and Gmail.',
		role: 'Full-stack Developer',
		link: 'https://github.com/Chulinuwu/Smart_Farm_Plant_Monitoring_System',
		image: '/img/project1.jpg'
	},
	{
		name: 'QR Code Generator',
		description: 'A web app that generates QR codes from entered links.',
		explanation:
			'Developed using Svelte, this app allows users to input a URL and generate a corresponding QR code.',
		role: 'Full-stack Developer',
		link: 'https://q-rcode-gen.vercel.app/',
		image: '/img/project2.jpg'
	},
	{
		name: 'UniClub',
		description: 'A platform for university students to search and manage their favorite clubs.',
		explanation:
			'This project allows students to find and manage clubs at their university. The platform also provides a back-office management system for clubs.',
		role: 'Full-stack Developer',
		link: 'https://uni-club-frontend-pey5.vercel.app/',
		image: '/img/project3.jpg'
	},
	{
		name: 'ChulaMacaron',
		description: 'A system for Chula students to report broken buildings.',
		explanation:
			'Developed using React Native, this system allows students to submit pictures and details about broken buildings on campus, enabling the relevant departments to take action.',
		role: 'UX/UI and Frontend Developer',
		link: 'https://github.com/xXpeira12/ChulaMacaron',
		image: '/img/project4.jpg'
	},
	{
		name: 'Dog vs Monkey Game',
		description: 'A space shooter game where you control a dog throwing bananas at monkeys.',
		explanation:
			'Developed using JavaFX, this game allows the player to control a dog and throw bananas at monkeys in a space-themed environment.',
		role: 'Developer',
		link: 'https://github.com/amphikapha/Dog-VS-Monkey',
		image: '/img/project5.jpg'
	},
	{
		name: 'ChatwithGPT',
		description: 'A web app for real-time communication with generative models.',
		explanation:
			'Built with FastAPI and Svelte, this app allows users to communicate with generative models in real time, with a base model acting as a Pekora VTuber.',
		role: 'Full-stack Developer',
		link: 'https://github.com/Chulinuwu/ChatwithGPT',
		image: '/img/project6.jpg'
	}
];

// Experience data
export const experiences = [
	{
		year: 'Apr 2021',
		role: 'POSN 1-2 Computer Student',
		company: 'Burapha University',
		description: 'Begin to learn competitive programming, data structure and algorithm'
	},
	{
		year: 'Aug 2023 - now',
		role: 'CEDT Student',
		company: 'Computer Engineering and Digital Technology, Chulalongkorn University',
		description: 'Begin academic life'
	},
	{
		year: 'May 2024 - July 2024',
		role: 'UX/UI Designer and Developer Intern',
		company: 'Bangkok Bank Public Company Limited (BBL)',
		description: 'iFunds project developed by Next.js + Java Quarkus + PostgreSQL'
	},
	{
		year: 'May 2025 - July 2025',
		role: 'Data Scientist & Data Analyst Intern',
		company: 'Aiful Corp, Aira & Aiful Public Company Limited',
		description:
			'Developed credit scoring models and performed data analysis to extract insights for business decision making'
	},
	{
		year: 'Aug 2025 - now',
		role: 'Data Scientist Intern',
		company: 'Siam Commercial Bank (SCB)',
		description:
			'Working on computer vision models for SCB graphics and conversion rate optimization through advanced ML techniques'
	},
	{
		year: 'Sep 2024 - now',
		role: 'Information System Development (ISD) Frontend Developer',
		company: 'Computer Engineering and Digital Technology, Chulalongkorn University',
		description: 'SUCU Project development and system implementation'
	},
	{
		year: 'Sep 2024 - now',
		role: 'Google Developer Student Clubs (GDSC) Core Team (Graphic)',
		company: 'Computer Engineering and Digital Technology, Chulalongkorn University',
		description: 'Designing and creating graphics for GDSC events and campaigns'
	},
	{
		year: 'Aug 2025 - now',
		role: 'Freelance Multi-disciplinary Consultant',
		company: 'Self-employed',
		description:
			'Providing consultancy services in graphic design, illustration, web development, UX/UI design, and data science solutions'
	}
];
// Skills data
export const skills = [
	{
		name: 'Data Science & ML',
		icon: '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/></svg>',
		description:
			'Developing credit scoring models, data analysis, and machine learning solutions for financial institutions using Python and various ML frameworks.'
	},
	{
		name: 'Full-Stack Development',
		icon: '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>',
		description:
			'End-to-end web development using TypeScript, React, Svelte, Next.js for frontend and Node.js, FastAPI, Java Quarkus for backend systems.'
	},
	{
		name: 'UX/UI Design',
		icon: '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" clip-rule="evenodd"/></svg>',
		description:
			'Designing user-centered interfaces and experiences using Figma. From wireframes to high-fidelity prototypes for web and mobile applications.'
	},
	{
		name: 'Cybersecurity & CTF',
		icon: '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>',
		description:
			'Security analysis and penetration testing skills developed through CTF competitions. Passed ISC2 in Cybersecurity (CC) exam with knowledge in security fundamentals. ( No membership )'
	},
	{
		name: 'System Architecture',
		icon: '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/></svg>',
		description:
			'Designing scalable system architectures and integrating ML models into production environments. Experience with Docker, cloud services, and microservices.'
	},
	{
		name: 'Digital Illustration',
		icon: '<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/></svg>',
		description:
			'Creating digital artwork and illustrations using Procreate and other digital tools. Available for commission work and graphic design projects.'
	}
];

// Programming languages for infinite scroll
export const programmingLanguages = [
	{ name: 'TypeScript', icon: '⚡' },
	{ name: 'Python', icon: '🐍' },
	{ name: 'JavaScript', icon: '🟨' },
	{ name: 'Java', icon: '☕' },
	{ name: 'C++', icon: '🔧' },
	{ name: 'React', icon: '⚛️' },
	{ name: 'Svelte', icon: '🧡' },
	{ name: 'Node.js', icon: '🟢' },
	{ name: 'Go', icon: '🚀' },
	{ name: 'Dart', icon: '🎯' },
	{ name: 'Flutter', icon: '💙' },
	{ name: 'FastAPI', icon: '🏃‍♂️' }
];

// Tools data
export const tools = [
	{
		name: 'Figma',
		description: 'Web-based design tool for UI/UX design and collaboration',
		icon: '🎨'
	},
	{ name: 'VS Code', description: 'Popular source code editor by Microsoft', icon: '💻' },
	{
		name: 'IntelliJ',
		description: 'Integrated development environment for Java and other languages',
		icon: '🧠'
	},
	{
		name: 'Notion',
		description: 'Productivity tool for note-taking and project management',
		icon: '📝'
	},
	{ name: 'Linear', description: 'Tool for tracking issues and project management', icon: '📈' },
	{ name: 'Procreate', description: 'Powerful digital painting app for iPad', icon: '🎨' }
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
		handle: '',
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
		handle: '',
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

// Interactive features data
export const floatingElements = [
	{ shape: 'circle', delay: 0, size: 'w-4 h-4', color: 'bg-pink-400' },
	{ shape: 'triangle', delay: 500, size: 'w-6 h-6', color: 'bg-pink-300' },
	{ shape: 'square', delay: 1000, size: 'w-5 h-5', color: 'bg-pink-500' },
	{ shape: 'circle', delay: 1500, size: 'w-3 h-3', color: 'bg-pink-200' },
	{ shape: 'diamond', delay: 2000, size: 'w-4 h-4', color: 'bg-pink-600' }
];
