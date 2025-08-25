<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from '../components/navbar.svelte';
	import Chulinpic_bg from '../public/Chulinpicwithbg.png';
	import InfiniteScrollTech from '../components/InfiniteScrollTech.svelte';
	import anan from '../public/anan.jpg';

	// Scroll to top function for button
	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	let mouseX = 0;
	let mouseY = 0;
	let isMouseMoving = false;
	let mouseTimeout: number;
	let scrollY = 0;
	let mounted = false;
	let windowWidth = 0;
	let windowHeight = 0;

	// Badge data
	const badges = [
		'Consultant',
		'Web Design',
		'UX & UI design',
		'Data Analysis',
		'Data Science',
		'System Design',
		'Illustration'
	];

	// Hero section data
	const heroData = {
		name: 'An-An',
		title: 'Developer / Designer',
		subtitle:
			'3rd Year Computer Engineering and Digital Technology (CEDT), Chulalongkorn University',
		buttons: {
			primary: { text: 'My projects', href: './work' },
			secondary: { text: 'Contact me', href: './contact' }
		}
	};

	// Projects data from old code
	const projects = [
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
	const experiences = [
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
			role: 'Data Scientist Intern (Capstone Project)',
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
	const skills = [
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
	const programmingLanguages = [
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
	const tools = [
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

	// Interactive features data
	const floatingElements = [
		{ shape: 'circle', delay: 0, size: 'w-4 h-4', color: 'bg-pink-400' },
		{ shape: 'triangle', delay: 500, size: 'w-6 h-6', color: 'bg-pink-300' },
		{ shape: 'square', delay: 1000, size: 'w-5 h-5', color: 'bg-pink-500' },
		{ shape: 'circle', delay: 1500, size: 'w-3 h-3', color: 'bg-pink-200' },
		{ shape: 'diamond', delay: 2000, size: 'w-4 h-4', color: 'bg-pink-600' }
	];

	onMount(() => {
		mounted = true;

		// Window size tracking
		const updateWindowSize = () => {
			windowWidth = window.innerWidth;
			windowHeight = window.innerHeight;
		};

		updateWindowSize();

		// Mouse tracking
		const handleMouseMove = (e: MouseEvent) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
			isMouseMoving = true;

			clearTimeout(mouseTimeout);
			mouseTimeout = setTimeout(() => {
				isMouseMoving = false;
			}, 100);
		};

		// Scroll tracking
		const handleScroll = () => {
			scrollY = window.scrollY;
		};

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', updateWindowSize);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', updateWindowSize);
			clearTimeout(mouseTimeout);
		};
	});

	// Utility function for intersection observer animation
	function revealOnScroll(node: HTMLElement) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('revealed');
					}
				});
			},
			{ threshold: 0.1 }
		);

		observer.observe(node);

		return {
			destroy() {
				observer.disconnect();
			}
		};
	}
</script>

<svelte:window bind:scrollY />

<div class="relative overflow-hidden bg-black">
	<!-- Cursor follower -->
	{#if mounted}
		<div
			class="pointer-events-none fixed z-50 h-4 w-4 rounded-full bg-pink-400 mix-blend-difference transition-all duration-100"
			style="left: {mouseX - 8}px; top: {mouseY - 8}px; opacity: {isMouseMoving ? 1 : 0}"
		></div>
	{/if}

	<!-- Background Stars/Particles -->
	<div class="pointer-events-none fixed inset-0 overflow-hidden">
		{#each Array(80) as _, i}
			<div
				class="sparkle absolute h-1 w-1 rounded-full bg-pink-300"
				style="left: {Math.random() * 100}%; top: {Math.random() *
					100}%; animation-delay: {Math.random() * 3}s"
			></div>
		{/each}
	</div>

	<!-- Hero Section -->
	<div class="relative flex h-auto min-h-screen w-full flex-col bg-black">
		<!-- Floating geometric shapes -->
		{#each floatingElements as element, i}
			<div
				class="floating-element absolute {element.size} {element.color} pointer-events-none opacity-30"
				style="
                    left: {20 + i * 15}%; 
                    top: {30 + (i % 2) * 20}%;
                    animation-delay: {element.delay}ms;
                    {element.shape === 'circle' ? 'border-radius: 50%;' : ''}
                    {element.shape === 'triangle'
					? 'clip-path: polygon(50% 0%, 0% 100%, 100% 100%);'
					: ''}
                    {element.shape === 'diamond' ? 'transform: rotate(45deg);' : ''}
                "
			></div>
		{/each}

		<Navbar />

		<!-- Hero Content Container -->
		<div
			class="relative flex flex-1 flex-col items-center justify-center px-4 py-16 sm:px-8 sm:py-28"
		>
			<!-- Infinite Scrolling Badges -->
			<div class="fade-mask mb-8 w-full max-w-6xl overflow-hidden sm:mb-12">
				<div class="scroll-animation flex gap-2">
					{#each badges as badge}
						<div
							class="magnetic flex-shrink-0 cursor-pointer whitespace-nowrap rounded-full border border-pink-400/20 bg-gray-900/80 px-3 py-2 text-xs text-white backdrop-blur-sm transition-all duration-300 hover:border-pink-400/50 hover:bg-pink-400/20 hover:text-pink-300 sm:px-4 sm:text-sm"
						>
							{badge}
						</div>
					{/each}

					{#each badges as badge}
						<div
							class="magnetic flex-shrink-0 cursor-pointer whitespace-nowrap rounded-full border border-pink-400/20 bg-gray-900/80 px-3 py-2 text-xs text-white backdrop-blur-sm transition-all duration-300 hover:border-pink-400/50 hover:bg-pink-400/20 hover:text-pink-300 sm:px-4 sm:text-sm"
						>
							{badge}
						</div>
					{/each}
				</div>
			</div>

			<!-- Hero Title with reveal animation -->
			<div class="mb-6 text-center sm:mb-8">
				<h1 class="text-reveal mb-4 text-3xl font-bold text-white sm:text-5xl md:text-7xl">
					<span class="text-white">I'm {heroData.name},</span>
					<br />
					<span class="gradient-text">{heroData.title}</span>
				</h1>
				<p
					class="text-reveal max-w-2xl px-4 text-sm text-gray-300 sm:text-lg md:text-xl"
					style="animation-delay: 0.3s;"
				>
					{heroData.subtitle}
				</p>
			</div>

			<!-- Hero Buttons -->
			<div
				class="text-reveal mb-8 flex flex-col gap-4 sm:mb-16 sm:flex-row"
				style="animation-delay: 0.6s;"
			>
				<a
					href={heroData.buttons.primary.href}
					class="pulse-glow magnetic group relative transform overflow-hidden rounded-2xl bg-pink-500 px-6 py-3 text-center font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-pink-400 sm:px-8 sm:py-4"
				>
					<span class="relative z-10">{heroData.buttons.primary.text}</span>
					<div
						class="absolute inset-0 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					></div>
				</a>

				<a
					href={heroData.buttons.secondary.href}
					class="magnetic group relative transform rounded-2xl border border-white/30 bg-white/10 px-6 py-3 text-center font-medium text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 sm:px-8 sm:py-4"
				>
					<span class="relative z-10">{heroData.buttons.secondary.text}</span>
					<div
						class="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400/20 to-pink-300/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					></div>
				</a>
			</div>
		</div>

		<!-- Profile Image with parallax effect -->
		<div class="flex w-full min-w-full justify-center px-4">
			<div class="group relative h-full w-full min-w-full max-w-4xl overflow-hidden rounded-2xl">
				<img
					src={Chulinpic_bg}
					alt="Profile"
					class=" object-cover object-top transition-transform duration-700 group-hover:scale-105"
				/>
				<!-- Overlay effect -->
				<div
					class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
				></div>
			</div>
		</div>
	</div>

	<!-- About Section -->
	<div
		class="relative flex min-h-screen w-full items-center overflow-hidden bg-black"
		use:revealOnScroll
	>
		<!-- Background grid -->
		<div class="absolute inset-0 opacity-5">
			<div
				class="absolute inset-0"
				style="background-image: linear-gradient(rgba(244, 114, 182, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(244, 114, 182, 0.1) 1px, transparent 1px); background-size: 50px 50px;"
			></div>
		</div>

		<div class="container mx-auto px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
			<div class="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
				<!-- Profile Image -->
				<div class="reveal-left order-2 flex justify-center lg:order-1">
					<div class="relative">
						<div
							class="h-80 w-64 rotate-3 transform overflow-hidden rounded-3xl border-2 border-pink-400/30 shadow-2xl transition-all duration-500 hover:rotate-1 sm:h-96 sm:w-80"
						>
							<!-- Placeholder for profile image -->
							<div
								class="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-400 to-pink-600 text-lg font-medium text-black"
							>
								<img src={anan} alt="Profile" class="h-full w-full object-cover" />
							</div>
						</div>
						<!-- Decorative elements -->
						<div
							class="absolute -right-4 -top-4 h-8 w-8 animate-bounce rounded-full bg-pink-400"
							style="animation-delay: 0.5s;"
						></div>
						<div
							class="absolute -bottom-4 -left-4 h-6 w-6 animate-pulse rounded-full bg-pink-300"
						></div>
					</div>
				</div>

				<!-- About Content -->
				<div class="reveal-right order-1 lg:order-2">
					<div
						class="rounded-2xl border border-pink-400/20 bg-gray-900/20 p-6 backdrop-blur-md sm:p-8"
					>
						<h2 class="mb-6 text-3xl font-bold text-white sm:text-4xl">
							<span class="border-l-4 border-pink-400 pl-4">About Me</span>
						</h2>

						<p class="mb-8 text-base leading-relaxed text-gray-300 sm:text-lg">
							An-An is a Computer Engineering student at Chulalongkorn University with a passion for
							merging creativity and technology. As a versatile developer transitioning into data
							science, I specialize in creating innovative solutions that bridge the gap between
							design, development, and data-driven insights. From building user-centered interfaces
							to developing credit scoring models and ML systems for financial institutions, I bring
							a unique multi-disciplinary approach to every project. My experience spans from
							competitive programming foundations to real-world applications in fintech and system
							architecture, always driven by curiosity and the desire to solve complex problems
							through elegant, impactful solutions.
						</p>
						<div class="grid grid-cols-2 gap-4">
							<div
								class="rounded-lg border border-pink-400/30 bg-gradient-to-br from-pink-500/20 to-pink-400/20 p-4 text-center"
							>
								<div class="text-2xl font-bold text-pink-400">40+</div>
								<div class="text-sm text-gray-400">Projects</div>
							</div>
							<div
								class="rounded-lg border border-pink-400/30 bg-gradient-to-br from-pink-500/20 to-pink-400/20 p-4 text-center"
							>
								<div class="text-2xl font-bold text-pink-400">6+</div>
								<div class="text-sm text-gray-400">Years Experience</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Experience Section -->
	<div class="relative w-full overflow-hidden bg-black py-12 sm:py-20" use:revealOnScroll>
		<!-- Animated Background Particles -->
		<div class="pointer-events-none absolute inset-0">
			{#each Array(20) as _, i}
				<div
					class="floating-particle absolute h-1 w-1 rounded-full bg-pink-400/20"
					style="
                    left: {Math.random() * 100}%; 
                    top: {Math.random() * 100}%;
                    animation-delay: {Math.random() * 4}s;
                    animation-duration: {4 + Math.random() * 3}s;
                "
				></div>
			{/each}
		</div>

		<!-- Background Grid Pattern -->
		<div class="absolute inset-0 opacity-5">
			<div
				class="h-full w-full"
				style="
                background-image: 
                    radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0);
                background-size: 40px 40px;
            "
			></div>
		</div>

		<div class="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
			<!-- Enhanced Title with Glow Effect -->
			<div class="mb-16 text-center">
				<h2
					class="reveal-up relative inline-block text-3xl font-bold text-white sm:text-5xl lg:text-6xl"
				>
					<span
						class="animate-gradient relative z-10 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent"
					>
						Experience
					</span>
					<!-- Glow effect behind text -->
					<div
						class="absolute inset-0 animate-pulse bg-gradient-to-r from-pink-400 via-purple-400 to-pink-300 opacity-30 blur-xl"
					></div>
				</h2>
				<!-- Decorative line -->
				<div
					class="mx-auto mt-6 h-1 w-24 bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-60"
				></div>
			</div>

			<div class="mx-auto max-w-5xl">
				<!-- Enhanced Timeline with Progressive Reveal -->
				<div class="relative">
					<!-- Animated Timeline Line with Gradient -->
					<div
						class="timeline-reveal absolute bottom-0 left-0 top-0 ml-3 w-0.5 bg-gradient-to-b from-pink-400/0 via-pink-400/60 to-pink-400/0"
					></div>

					<!-- Timeline Items -->
					{#each experiences as experience, index}
						<div class="reveal-up group relative mb-12" style="animation-delay: {index * 0.15}s;">
							<!-- Timeline Node with Pulse Animation -->
							<div class="absolute left-0 z-20 flex items-center justify-center">
								<div class="relative">
									<!-- Outer Pulse Ring -->
									<div
										class="absolute -inset-1 h-8 w-8 animate-ping rounded-full bg-pink-400/30 group-hover:bg-pink-400/50"
									></div>
									<!-- Main Node -->
									<div
										class="relative h-6 w-6 rounded-full border-2 border-black bg-gradient-to-br from-pink-400 to-purple-500 shadow-lg transition-transform duration-300 group-hover:scale-110"
									>
										<div
											class="absolute inset-1 rounded-full bg-black/50 transition-colors duration-300 group-hover:bg-black/30"
										></div>
										<!-- Inner Glow -->
										<div
											class="absolute inset-0 rounded-full bg-pink-400/40 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"
										></div>
									</div>
								</div>
							</div>

							<!-- Experience Card with Advanced Effects -->
							<div class="group ml-12">
								<div class="relative">
									<!-- Card Background with Multiple Layers -->
									<div
										class="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-900/40 to-gray-800/60 backdrop-blur-md"
									></div>
									<div
										class="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-400/5 to-purple-400/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
									></div>
									<div
										class="absolute inset-px rounded-2xl bg-gradient-to-br from-pink-400/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
									></div>

									<!-- Animated Border -->
									<div
										class="absolute inset-0 rounded-2xl border border-gray-700/50 transition-colors duration-300 group-hover:border-pink-400/30"
									></div>

									<!-- Content -->
									<div
										class="relative transform p-6 transition-all duration-500 group-hover:scale-[1.02] sm:p-8"
									>
										<!-- Year Badge with Glow -->
										<div class="mb-4 inline-block">
											<span
												class="relative rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-1.5 text-sm font-semibold text-pink-400 backdrop-blur-sm transition-all duration-300 group-hover:border-pink-400/40 group-hover:bg-pink-400/20"
											>
												{experience.year}
												<!-- Badge glow effect -->
												<div
													class="absolute inset-0 rounded-full bg-pink-400/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
												></div>
											</span>
										</div>

										<!-- Role with Gradient Text -->
										<h3
											class="mb-3 text-xl font-bold text-white transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-pink-300 group-hover:to-white group-hover:bg-clip-text group-hover:text-transparent sm:text-2xl lg:text-3xl"
										>
											{experience.role}
										</h3>

										<!-- Company with Icon -->
										<div class="mb-4 flex items-center gap-2">
											<div class="h-2 w-2 rounded-full bg-pink-400 group-hover:animate-pulse"></div>
											<p
												class="text-base italic text-gray-300 transition-colors duration-300 group-hover:text-gray-200 sm:text-lg"
											>
												{experience.company}
											</p>
										</div>

										<!-- Description with Enhanced Typography -->
										<p
											class="text-base leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300 sm:text-lg"
										>
											{experience.description}
										</p>

										<!-- Decorative Corner Elements -->
										<div
											class="absolute right-4 top-4 h-3 w-3 border-r-2 border-t-2 border-pink-400/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
										></div>
										<div
											class="absolute bottom-4 left-6 h-3 w-3 border-b-2 border-l-2 border-pink-400/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
										></div>
									</div>

									<!-- Spotlight Effect -->
									<div
										class="bg-gradient-radial pointer-events-none absolute inset-0 rounded-2xl from-pink-400/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
									></div>
								</div>
							</div>

							<!-- Connection Line to Next Item -->
							{#if index < experiences.length - 1}
								<div
									class="absolute left-3 top-6 h-16 w-px bg-gradient-to-b from-pink-400/40 to-transparent opacity-60"
								></div>
							{/if}
						</div>
					{/each}
				</div>
			</div>

			<!-- Floating Action Elements -->
			<div class="animate-float absolute right-10 top-20 opacity-20">
				<div class="h-4 w-4 rotate-45 border-2 border-pink-400"></div>
			</div>
			<div class="animate-float absolute bottom-20 left-10 opacity-20" style="animation-delay: 2s;">
				<div class="h-3 w-3 rounded-full bg-pink-400"></div>
			</div>
		</div>
	</div>

	<div class="w-full bg-black py-12 sm:py-20" use:revealOnScroll>
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<h2 class="reveal-up mb-12 text-center text-3xl font-bold text-pink-400 sm:text-4xl">
				Technologies I Use
			</h2>

			<!-- Second row - different speed for variety -->

			<InfiniteScrollTech itemWidth={150} itemHeight={60} opacity={0.7} />
		</div>
	</div>

	<!-- Skills Section -->
	<div class="relative w-full overflow-hidden bg-black py-12 sm:py-20" use:revealOnScroll>
		<!-- Dynamic Background with Moving Orbs -->
		<div class="absolute inset-0 overflow-hidden">
			{#each Array(6) as _, i}
				<div
					class="animate-float-slow absolute rounded-full bg-gradient-to-r from-pink-400/20 to-purple-400/20 blur-3xl"
					style="
                    width: {150 + Math.random() * 200}px;
                    height: {150 + Math.random() * 200}px;
                    left: {Math.random() * 100}%;
                    top: {Math.random() * 100}%;
                    animation-delay: {i * 2}s;
                    animation-duration: {8 + Math.random() * 4}s;
                "
				></div>
			{/each}
		</div>

		<!-- Geometric Pattern Overlay -->
		<div class="absolute inset-0 opacity-5">
			<svg class="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
				<defs>
					<pattern id="hexPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
						<polygon
							points="10,1 19,6 19,14 10,19 1,14 1,6"
							fill="none"
							stroke="currentColor"
							stroke-width="0.5"
						/>
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#hexPattern)" />
			</svg>
		</div>

		<div class="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
			<!-- Creative Title with Multiple Effects -->
			<div class="relative mb-16 text-center">
				<!-- Background Text Shadow -->
				<h2
					class="absolute inset-0 scale-110 transform text-3xl font-bold text-pink-400/10 blur-sm sm:text-5xl lg:text-6xl"
				>
					What I'm Doing
				</h2>
				<!-- Main Title -->
				<h2 class="reveal-up relative text-3xl font-bold sm:text-5xl lg:text-6xl">
					<span
						class="animate-gradient-x bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
					>
						What I'm
					</span>
					<span class="relative ml-4 text-white">
						Doing
						<!-- Decorative underline -->
						<div
							class="animate-scale-x absolute -bottom-2 left-0 right-0 h-1 scale-x-0 transform bg-gradient-to-r from-transparent via-pink-400 to-transparent"
						></div>
					</span>
				</h2>

				<!-- Floating Icons Around Title -->
				<div class="absolute -left-8 -top-8 animate-bounce text-pink-400/30">
					<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
						<path
							fill-rule="evenodd"
							d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
				<div class="absolute -right-12 -top-4 animate-pulse text-purple-400/30">
					<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
						<path
							fill-rule="evenodd"
							d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
				<div
					class="animate-spin-slow absolute -bottom-8 left-1/2 -translate-x-1/2 transform text-blue-400/30"
				>
					<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
						<path
							fill-rule="evenodd"
							d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
			</div>

			<!-- Creative Grid Layout -->
			<div class="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each skills as skill, index}
					<div class="reveal-up group relative" style="animation-delay: {index * 0.15}s;">
						<!-- Card Background with Morphing Border -->
						<div
							class="absolute inset-0 scale-95 transform rounded-2xl bg-gradient-to-br from-pink-400/5 to-purple-400/5 blur-xl transition-transform duration-700 group-hover:scale-100"
						></div>

						<!-- Main Card -->
						<div class="relative h-full">
							<!-- Animated Border -->
							<div
								class="absolute inset-0 rounded-2xl border border-gray-700/30 transition-all duration-500 group-hover:border-pink-400/50"
							></div>
							<div
								class="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-br from-pink-400/20 via-transparent to-purple-400/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
							></div>

							<!-- Card Content -->
							<div
								class="relative flex h-full transform flex-col items-center rounded-2xl bg-gray-900/20 p-8 text-center backdrop-blur-md transition-all duration-500 group-hover:translate-y-[-4px]"
							>
								<!-- Icon Container with Advanced Effects -->
								<div class="relative mb-6">
									<!-- Icon Glow Ring -->
									<div
										class="absolute inset-0 scale-150 animate-pulse rounded-full bg-gradient-to-r from-pink-400 to-purple-400 opacity-0 blur-xl group-hover:opacity-30"
									></div>

									<!-- Icon Background -->
									<div
										class="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 transition-transform duration-500 group-hover:rotate-12"
									>
										<div
											class="absolute inset-1 rounded-xl bg-gradient-to-br from-pink-400/10 to-purple-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
										></div>
										<div
											class="relative z-10 transform text-3xl transition-transform duration-300 group-hover:scale-110"
										>
											{@html skill.icon}
										</div>
									</div>

									<!-- Floating Sparkles -->
									<div
										class="absolute -right-2 -top-2 h-3 w-3 animate-ping rounded-full bg-pink-400 opacity-0 group-hover:opacity-100"
									></div>
									<div
										class="absolute -bottom-2 -left-2 h-2 w-2 animate-pulse rounded-full bg-purple-400 opacity-0 group-hover:opacity-100"
										style="animation-delay: 0.3s;"
									></div>
								</div>

								<!-- Title with Gradient Effect -->
								<h3
									class="mb-4 text-xl font-bold text-white transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-pink-300 group-hover:to-white group-hover:bg-clip-text group-hover:text-transparent"
								>
									{skill.name}
								</h3>

								<!-- Description with Animation -->
								<p
									class="flex-1 text-sm leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300"
								>
									{skill.description}
								</p>

								<!-- Interactive Bottom Element -->
								<div class="mt-6 w-full">
									<div
										class="h-1 rounded-full bg-gradient-to-r from-transparent via-gray-600 to-transparent transition-all duration-500 group-hover:via-pink-400"
									></div>
									<div class="mt-2 flex justify-center space-x-1">
										{#each Array(3) as _, i}
											<div
												class="h-1.5 w-1.5 rounded-full bg-gray-600 transition-colors duration-300 group-hover:bg-pink-400"
												style="transition-delay: {i * 0.1}s;"
											></div>
										{/each}
									</div>
								</div>
							</div>
						</div>

						<!-- Hover Spotlight Effect -->
						<div
							class="bg-gradient-radial pointer-events-none absolute inset-0 rounded-2xl from-pink-400/5 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
						></div>

						<!-- Card Number Badge -->
						<div
							class="absolute -right-3 -top-3 flex h-8 w-8 scale-0 transform items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-purple-500 text-sm font-bold text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
						>
							{(index + 1).toString().padStart(2, '0')}
						</div>
					</div>
				{/each}
			</div>

			<!-- Bottom Decorative Elements -->
			<div class="mt-16 flex items-center justify-center space-x-8">
				<div class="h-2 w-2 animate-pulse rounded-full bg-pink-400"></div>
				<div class="h-px w-16 bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
				<div class="animate-spin-slow h-3 w-3 rounded-full border-2 border-pink-400"></div>
				<div class="h-px w-16 bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
				<div
					class="h-2 w-2 animate-pulse rounded-full bg-pink-400"
					style="animation-delay: 1s;"
				></div>
			</div>
		</div>
	</div>

	<!-- Contact Section -->
	<div class="relative w-full overflow-hidden bg-black py-12 sm:py-20" use:revealOnScroll>
		<!-- Background Effects -->
		<div class="absolute inset-0">
			<!-- Radial Gradients -->
			<div
				class="absolute left-20 top-20 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl"
			></div>
			<div
				class="absolute bottom-20 right-20 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r from-blue-600/15 to-purple-600/15 blur-3xl"
				style="animation-delay: 2s;"
			></div>

			<!-- Floating Network Connections -->
			<svg class="absolute inset-0 h-full w-full opacity-5" viewBox="0 0 1000 800">
				<defs>
					<pattern id="network" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
						<circle cx="50" cy="50" r="2" fill="currentColor" class="text-white" />
						<line
							x1="50"
							y1="0"
							x2="50"
							y2="100"
							stroke="currentColor"
							stroke-width="0.5"
							class="text-white/20"
						/>
						<line
							x1="0"
							y1="50"
							x2="100"
							y2="50"
							stroke="currentColor"
							stroke-width="0.5"
							class="text-white/20"
						/>
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#network)" />
			</svg>
		</div>

		<div class="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
			<!-- Enhanced Title -->
			<div class="mb-16">
				<div class="relative inline-block">
					<h2 class="reveal-up mb-4 text-4xl font-bold text-white sm:text-6xl lg:text-7xl">
						Let's <span
							class="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
							>Connect</span
						>
					</h2>
					<!-- Decorative Elements -->
					<div
						class="absolute -right-8 -top-4 h-3 w-3 animate-ping rounded-full bg-pink-400 opacity-75"
					></div>
					<div
						class="absolute -bottom-2 -left-6 h-2 w-2 animate-pulse rounded-full bg-purple-400"
					></div>
				</div>
				<p
					class="reveal-up mx-auto max-w-2xl text-lg leading-relaxed text-gray-300"
					style="animation-delay: 0.2s;"
				>
					Ready to collaborate and build something extraordinary? Let's turn ideas into reality.
				</p>
			</div>

			<!-- Enhanced Contact Grid with Unique Layouts -->
			<div class="mx-auto mb-16 max-w-6xl">
				<!-- First Row - Different Heights -->
				<div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
					<!-- Instagram - Tall Card -->
					<a
						href="https://www.instagram.com/vyovyo___"
						target="_blank"
						class="reveal-up group relative overflow-hidden rounded-3xl border border-pink-400/20 bg-gradient-to-br from-pink-900/20 to-orange-900/20 backdrop-blur-md transition-all duration-500 hover:scale-105 hover:border-pink-400/50 md:row-span-2"
					>
						<div
							class="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-orange-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						></div>
						<div
							class="relative flex h-full min-h-[200px] flex-col items-center justify-between p-8 text-center"
						>
							<div
								class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-orange-500 transition-transform duration-300 group-hover:rotate-12"
							>
								<svg class="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
									/>
								</svg>
							</div>
							<h3
								class="mb-2 text-xl font-bold text-white transition-colors group-hover:text-pink-300"
							>
								Instagram
							</h3>
							<p class="font-medium text-pink-300">@vyovyo___</p>

							<div class="mt-4 text-sm text-gray-400">Visual Stories & Behind the Scenes</div>
						</div>
					</a>

					<!-- GitHub & LinkedIn - Stacked -->
					<div class="space-y-6">
						<!-- GitHub -->
						<a
							href="https://github.com/Chulinuwu/"
							target="_blank"
							class="reveal-up group block overflow-hidden rounded-2xl border border-gray-400/20 bg-gradient-to-br from-gray-900/40 to-gray-800/60 backdrop-blur-md transition-all duration-500 hover:scale-105 hover:border-gray-300/50"
							style="animation-delay: 0.1s;"
						>
							<div
								class="absolute inset-0 bg-gradient-to-br from-gray-600/10 to-gray-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
							></div>
							<div class="relative flex items-center space-x-4 p-6">
								<div
									class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 transition-transform duration-300 group-hover:rotate-12"
								>
									<svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
										<path
											d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
										/>
									</svg>
								</div>
								<div class="text-left">
									<h3
										class="text-lg font-bold text-white transition-colors group-hover:text-gray-300"
									>
										GitHub
									</h3>
									<p class="text-sm text-gray-300">@Chulinuwu</p>
								</div>
							</div>
						</a>

						<!-- LinkedIn -->
						<a
							href="https://www.linkedin.com/in/jiramethwa/"
							target="_blank"
							class="reveal-up group block overflow-hidden rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-900/40 to-blue-800/60 backdrop-blur-md transition-all duration-500 hover:scale-105 hover:border-blue-400/50"
							style="animation-delay: 0.2s;"
						>
							<div
								class="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
							></div>
							<div class="relative flex items-center space-x-4 p-6">
								<div
									class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 transition-transform duration-300 group-hover:rotate-12"
								>
									<svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
										<path
											d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
										/>
									</svg>
								</div>
								<div class="text-left">
									<h3
										class="text-lg font-bold text-white transition-colors group-hover:text-blue-300"
									>
										LinkedIn
									</h3>
									<p class="text-sm text-blue-300">Professional Network</p>
								</div>
							</div>
						</a>
					</div>

					<!-- Email & Fastwork - Stacked -->
					<div class="space-y-6">
						<!-- Gmail -->
						<a
							href="mailto:jirameth.wa@gmail.com"
							class="reveal-up group block overflow-hidden rounded-2xl border border-red-400/20 bg-gradient-to-br from-red-900/40 to-orange-900/40 backdrop-blur-md transition-all duration-500 hover:scale-105 hover:border-red-400/50"
							style="animation-delay: 0.3s;"
						>
							<div
								class="absolute inset-0 bg-gradient-to-br from-red-600/10 to-orange-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
							></div>
							<div class="relative flex items-center space-x-4 p-6">
								<div
									class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-500 transition-transform duration-300 group-hover:rotate-12"
								>
									<svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
										<path
											d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.715l9.649 7.285 9.649-7.285h.715A1.636 1.636 0 0 1 24 5.457z"
										/>
									</svg>
								</div>
								<div class="text-left">
									<h3
										class="text-lg font-bold text-white transition-colors group-hover:text-red-300"
									>
										Email
									</h3>
									<p class="text-sm text-red-300">jirameth.wa@gmail.com</p>
								</div>
							</div>
						</a>

						<!-- Fastwork -->
						<a
							href="https://fastwork.co/user/chulinxz"
							target="_blank"
							class="reveal-up group block overflow-hidden rounded-2xl border border-green-400/20 bg-gradient-to-br from-green-900/40 to-emerald-900/40 backdrop-blur-md transition-all duration-500 hover:scale-105 hover:border-green-400/50"
							style="animation-delay: 0.4s;"
						>
							<div
								class="absolute inset-0 bg-gradient-to-br from-green-600/10 to-emerald-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
							></div>
							<div class="relative flex items-center space-x-4 p-6">
								<div
									class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 transition-transform duration-300 group-hover:rotate-12"
								>
									<svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
										<path
											d="M19.5 3.09L22.91 6.5c1.18 1.18 1.18 3.08 0 4.26L19.5 14.17 9.83 4.5c1.18-1.18 3.08-1.18 4.26 0L19.5 3.09zM1.39 4.22c-.39.39-.39 1.02 0 1.41L6.17 10.4 10.4 6.17 4.22 1.39c-.39-.39-1.02-.39-1.41 0L1.39 4.22zM6.17 13.6L1.39 18.39c-.39.39-.39 1.02 0 1.41L2.8 21.2c.39.39 1.02.39 1.41 0L9.83 16.58 6.17 13.6z"
										/>
									</svg>
								</div>
								<div class="text-left">
									<h3
										class="text-lg font-bold text-white transition-colors group-hover:text-green-300"
									>
										Fastwork
									</h3>
									<p class="text-sm text-green-300">Freelance Services</p>
								</div>
							</div>
						</a>
					</div>
				</div>

				<!-- Discord - Full Width Bottom -->
				<a
					href="https://discord.com/users/chulinx"
					target="_blank"
					class="reveal-up group block overflow-hidden rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:border-indigo-400/50"
					style="animation-delay: 0.5s;"
				>
					<div
						class="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					></div>
					<div class="relative flex items-center justify-center space-x-6 p-8">
						<div
							class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 transition-transform duration-300 group-hover:rotate-12"
						>
							<svg class="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
								<path
									d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9554 2.4189-2.1568 2.4189Z"
								/>
							</svg>
						</div>
						<div class="text-center">
							<h3
								class="mb-2 text-2xl font-bold text-white transition-colors group-hover:text-indigo-300"
							>
								Discord
							</h3>
							<p class="text-indigo-300">@chulinx</p>
						</div>
					</div>
				</a>
			</div>

			<!-- Enhanced CTA Buttons -->
			<div
				class="reveal-up flex flex-col justify-center gap-6 sm:flex-row"
				style="animation-delay: 0.6s;"
			>
				<a
					href="./contact"
					class="group relative transform overflow-hidden rounded-3xl bg-gradient-to-r from-pink-500 to-purple-500 px-10 py-5 font-bold text-black transition-all duration-300 hover:scale-105"
				>
					<div
						class="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					></div>
					<span class="relative z-10 flex items-center justify-center space-x-2">
						<span>Start a Project</span>
						<svg
							class="h-5 w-5 transform transition-transform group-hover:translate-x-1"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fill-rule="evenodd"
								d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</span>
				</a>

				<a
					href="./work"
					class="group transform rounded-3xl border-2 border-white/20 px-10 py-5 font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-white/10"
				>
					<span class="flex items-center justify-center space-x-2">
						<span>View My Work</span>
						<svg
							class="h-5 w-5 transform transition-transform group-hover:translate-x-1"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
							/>
						</svg>
					</span>
				</a>
			</div>
		</div>
	</div>

<!-- Creative Footer -->
<div class="relative bg-black border-t border-pink-400/20 overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden">
        <!-- Moving particles -->
        {#each Array(12) as _, i}
            <div 
                class="absolute w-1 h-1 bg-pink-400/20 rounded-full animate-float-particle"
                style="
                    left: {Math.random() * 100}%;
                    top: {Math.random() * 100}%;
                    animation-delay: {i * 0.5}s;
                    animation-duration: {3 + Math.random() * 2}s;
                "
            ></div>
        {/each}
        
        <!-- Subtle grid pattern -->
        <div class="absolute inset-0 opacity-5">
            <div 
                class="w-full h-full"
                style="background-image: radial-gradient(circle at 2px 2px, rgba(244, 114, 182, 0.15) 1px, transparent 0); background-size: 30px 30px;"
            ></div>
        </div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <!-- Main Footer Content -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            
            <!-- Left: Branding -->
            <div class="text-center md:text-left">
                <div class="inline-block relative group mb-4">
                    <h3 class="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                        Chulinxz
                    </h3>
                    <div class="absolute -inset-2 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <p class="text-gray-400 text-sm leading-relaxed">
                    Multi-disciplinary developer & designer<br/>
                    turning ideas into reality through<br/>
                    <span class="text-pink-300">code, design & data</span>
                </p>
            </div>

            <!-- Right: Status & Fun -->
            <div class="text-center md:text-right">
                <div class="inline-block p-4 bg-gray-800/30 rounded-2xl backdrop-blur-sm border border-pink-400/10 mb-4">
                    <div class="flex items-center justify-center md:justify-end space-x-2 mb-2">
                        <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span class="text-green-300 text-sm font-medium">Currently Available</span>
                    </div>
                    <p class="text-gray-400 text-xs">
                        Open for freelance projects & collaborations
                    </p>
                </div>
                
                <!-- Coffee Counter (Fun Element) -->
                <div class="text-gray-400 text-xs">
                    ☕ Powered by <span class="text-pink-300 font-mono" id="coffee-counter">∞</span> cups of coffee
                </div>
            </div>
        </div>

        <!-- Divider with Animation -->
        <div class="relative my-8">
            <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gradient-to-r from-transparent via-pink-400/30 to-transparent"></div>
            </div>
            <div class="relative flex justify-center">
                <div class="bg-black px-4">
                    <div class="flex space-x-2">
                        <div class="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                        <div class="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
                        <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style="animation-delay: 0.4s;"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Section -->
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            <!-- Left: Copyright -->
            <div class="text-center md:text-left">
                <p class="text-gray-400 text-sm">
                    © {new Date().getFullYear()} Chulinxz • Made with 
                    <span class="text-pink-400 animate-pulse">❤️</span> 
                    in Bangkok, Thailand
                </p>
                <p class="text-gray-500 text-xs mt-1">
                    Always learning, always creating, always evolving
                </p>
            </div>

            <!-- Right: Social Icons Mini -->
            <div class="flex space-x-4">
                <!-- svelte-ignore a11y_consider_explicit_label -->
                <a href="https://github.com/Chulinuwu/" target="_blank" 
                   class="w-8 h-8 bg-gray-800/50 rounded-full flex items-center justify-center hover:bg-gray-700/50 transition-colors group">
                    <svg class="w-4 h-4 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                </a>
                
                <!-- svelte-ignore a11y_consider_explicit_label -->
                <a href="https://www.linkedin.com/in/jiramethwa/" target="_blank"
                   class="w-8 h-8 bg-gray-800/50 rounded-full flex items-center justify-center hover:bg-blue-600/50 transition-colors group">
                    <svg class="w-4 h-4 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                </a>

				<!-- svelte-ignore a11y_consider_explicit_label -->
				<a href="mailto:jirameth.wa@gmail.com"
				   class="w-8 h-8 bg-gray-800/50 rounded-full flex items-center justify-center hover:bg-red-600/50 transition-colors group">
					<svg class="w-4 h-4 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
						<path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.715l9.649 7.285 9.649-7.285h.715A1.636 1.636 0 0 1 24 5.457z"/>
					</svg>
				</a>
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<button on:click={scrollToTop}
						class="w-8 h-8 bg-pink-600/50 rounded-full flex items-center justify-center hover:bg-pink-600/70 transition-colors group ml-2">
					<svg class="w-4 h-4 text-white group-hover:transform group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
					</svg>
				</button>
			</div>
		</div>

        <!-- Easter Egg: Konami Code -->
        <div class="absolute bottom-2 left-2 text-xs text-gray-600 opacity-50 hover:opacity-100 transition-opacity">
            <span title="Try: ↑↑↓↓←→←→BA">🎮</span>
        </div>
    </div>
</div>

<!-- JavaScript for Interactive Elements -->
<script>
    // Coffee counter animation
    let coffeeCount = 0;
    const coffeeElement = document.getElementById('coffee-counter');
    
    if (coffeeElement) {
        setInterval(() => {
            coffeeCount = (coffeeCount + 1) % 999;
            if (coffeeElement) {
                coffeeElement.textContent = coffeeCount.toString().padStart(3, '0');
            }
        }, 2000);
    }

    // Konami Code Easter Egg
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.length === konamiSequence.length && 
            konamiCode.every((key, index) => key === konamiSequence[index])) {
            // Easter egg activated!
            document.body.style.transform = 'rotate(360deg)';
            document.body.style.transition = 'transform 2s ease-in-out';
            setTimeout(() => {
                document.body.style.transform = '';
                document.body.style.transition = '';
                alert('🎉 You found the secret! Thanks for being curious!');
            }, 2000);
            konamiCode = [];
        }
    });
</script>


</div>

<style>
	@keyframes scroll-left {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}

	@keyframes scroll-right {
		0% {
			transform: translateX(-50%);
		}
		100% {
			transform: translateX(0);
		}
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0px) rotate(0deg);
		}
		50% {
			transform: translateY(-10px) rotate(5deg);
		}
	}

	@keyframes pulse-glow {
		0%,
		100% {
			box-shadow: 0 0 20px rgba(236, 72, 153, 0.3);
		}
		50% {
			box-shadow: 0 0 40px rgba(236, 72, 153, 0.6);
		}
	}

	@keyframes gradient-shift {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	@keyframes sparkle {
		0%,
		100% {
			opacity: 0;
			transform: scale(0);
		}
		50% {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes reveal-up {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes reveal-left {
		from {
			opacity: 0;
			transform: translateX(-30px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes reveal-right {
		from {
			opacity: 0;
			transform: translateX(30px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.scroll-animation {
		animation: scroll-left 20s linear infinite;
	}

	.scroll-animation-right {
		animation: scroll-left 25s linear infinite;
	}

	.scroll-animation-left {
		animation: scroll-right 25s linear infinite;
	}

	.scroll-animation:hover,
	.scroll-animation-right:hover,
	.scroll-animation-left:hover {
		animation-play-state: paused;
	}

	.fade-mask {
		mask-image: linear-gradient(
			to right,
			rgba(0, 0, 0, 0) 0%,
			rgb(0, 0, 0) 12.5%,
			rgb(0, 0, 0) 87.5%,
			rgba(0, 0, 0, 0) 100%
		);
		-webkit-mask-image: linear-gradient(
			to right,
			rgba(0, 0, 0, 0) 0%,
			rgb(0, 0, 0) 12.5%,
			rgb(0, 0, 0) 87.5%,
			rgba(0, 0, 0, 0) 100%
		);
	}

	.floating-element {
		animation: float 4s ease-in-out infinite;
	}

	.gradient-text {
		background: linear-gradient(-45deg, #ec4899, #f472b6, #f9a8d4, #fce7f3);
		background-size: 400% 400%;
		animation: gradient-shift 3s ease infinite;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.pulse-glow {
		animation: pulse-glow 2s ease-in-out infinite;
	}

	.sparkle {
		animation: sparkle 2s ease-in-out infinite;
	}

	.magnetic {
		transition: transform 0.2s ease;
	}

	.magnetic:hover {
		transform: translateY(-2px);
	}

	.text-reveal {
		opacity: 0;
		transform: translateY(30px);
		animation: reveal-up 0.8s ease forwards;
	}

	.reveal-up {
		opacity: 0;
		animation: reveal-up 0.8s ease forwards;
	}

	.reveal-left {
		opacity: 0;
		animation: reveal-left 0.8s ease forwards;
	}

	.reveal-right {
		opacity: 0;
		animation: reveal-right 0.8s ease forwards;
	}

	/* Intersection Observer reveal */
	.reveal-up:not(.revealed) {
		opacity: 0;
		transform: translateY(30px);
	}

	.reveal-left:not(.revealed) {
		opacity: 0;
		transform: translateX(-30px);
	}

	.reveal-right:not(.revealed) {
		opacity: 0;
		transform: translateX(30px);
	}

	.revealed {
		opacity: 1 !important;
		transform: translate(0, 0) !important;
		transition: all 0.8s ease !important;
	}

	/* Mobile optimizations */
	@media (max-width: 640px) {
		.floating-element {
			opacity: 0.1;
		}

		.sparkle {
			display: none;
		}

		.magnetic:hover {
			transform: none;
		}
	}

	/* Custom scrollbar */
	:global(html) {
		scroll-behavior: smooth;
	}

	:global(body) {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
		background-color: #000;
		color: #fff;
	}

	/* Line clamp utility */
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* Enhanced hover effects */
	.group:hover .group-hover\:scale-110 {
		transform: scale(1.1);
	}

	/* Backdrop blur support */
	.backdrop-blur-sm {
		backdrop-filter: blur(4px);
	}

	.backdrop-blur-md {
		backdrop-filter: blur(12px);
	}

	/* Enhanced shadows */
	.shadow-glow {
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
	}

	.shadow-glow-lg {
		box-shadow: 0 0 40px rgba(0, 0, 0, 0.4);
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		* {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}

		.scroll-animation,
		.scroll-animation-right,
		.scroll-animation-left {
			animation: none;
		}

		.floating-element {
			animation: none;
		}

		.sparkle {
			animation: none;
		}
	}

	/* High contrast mode */
	@media (prefers-contrast: high) {
		.gradient-text {
			-webkit-text-fill-color: unset;
			background: unset;
			color: #ec4899;
		}

		.bg-gray-900\/30 {
			background-color: rgba(17, 24, 39, 0.5) !important;
		}

		.border-pink-400\/20 {
			border-color: rgba(244, 114, 182, 0.4) !important;
		}
	}
</style>
