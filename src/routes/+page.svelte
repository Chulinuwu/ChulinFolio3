<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from '../components/navbar.svelte';
	import Chulinpic_bg from '../public/Chulinpicwithbg.png';
	import InfiniteScrollTech from '../components/InfiniteScrollTech.svelte';

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
			name: 'Web Design (UX/UI)',
			icon: '🎨',
			description: 'UX/UI designer for various projects using Figma'
		},
		{
			name: 'Web Development',
			icon: '💻',
			description:
				'Full-Stack Developer for some projects. But mostly is Front-end Developer include UX/UI designer. proficient in Typescript'
		},
		{
			name: 'Mobile Apps',
			icon: '📱',
			description: 'Used to do some apps with React-Native + expo, also some Flutter apps'
		},
		{
			name: 'Drawing',
			icon: '✏️',
			description:
				'Drawing is my hobby, also receive commission. you can check my art in other section'
		},
		{
			name: 'AI/ML',
			icon: '🤖',
			description: 'Just Beginner with ML and AI, know some basic, techniques for data analysis'
		},
		{
			name: 'Data Analysis',
			icon: '📊',
			description: 'Analyzing data and creating insights for decision making'
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
								Profile Image
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
							to developing machine learning models for financial institutions, I bring a unique
							multi-disciplinary approach to every project. My experience spans from competitive
							programming foundations to real-world applications in fintech and computer vision,
							always driven by curiosity and the desire to solve complex problems through elegant,
							impactful solutions.
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
	<div class="w-full bg-black py-12 sm:py-20" use:revealOnScroll>
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<h2 class="reveal-up mb-12 text-center text-3xl font-bold text-pink-400 sm:text-4xl">
				What I'm Doing
			</h2>
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each skills as skill, index}
					<div
						class="reveal-up transform rounded-xl border border-pink-400/20 bg-gray-900/30 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-pink-400/40 hover:bg-gray-900/50"
						style="animation-delay: {index * 0.1}s;"
					>
						<div class="mb-4 text-3xl">{skill.icon}</div>
						<h3 class="mb-3 text-lg font-semibold text-white">{skill.name}</h3>
						<p class="text-sm text-gray-400">{skill.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Contact Section -->
	<div class="w-full bg-black py-12 sm:py-20" use:revealOnScroll>
		<div class="container mx-auto px-4 text-center sm:px-6 lg:px-8">
			<h2 class="reveal-up mb-8 text-3xl font-bold text-white sm:text-4xl">Let's Connect!</h2>
			<p class="reveal-up mb-12 text-lg text-gray-300" style="animation-delay: 0.2s;">
				Ready to collaborate? Let's create something amazing together.
			</p>

			<div class="mx-auto mb-12 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
				<!-- Instagram -->
				<a
					href="https://www.instagram.com/vyovyo___"
					target="_blank"
					class="reveal-up group transform rounded-xl border border-pink-400/20 bg-gray-900/30 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-pink-400/50 hover:bg-pink-500/20"
				>
					<div class="mb-3 text-3xl">📷</div>
					<div class="text-sm font-medium text-white">Instagram</div>
					<div class="mt-1 text-xs text-gray-400">@vyovyo___</div>
				</a>

				<!-- GitHub -->
				<a
					href="https://github.com/Chulinuwu/"
					target="_blank"
					class="reveal-up group transform rounded-xl border border-pink-400/20 bg-gray-900/30 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-gray-400/50 hover:bg-gray-500/20"
					style="animation-delay: 0.1s;"
				>
					<div class="mb-3 text-3xl">💻</div>
					<div class="text-sm font-medium text-white">GitHub</div>
					<div class="mt-1 text-xs text-gray-400">@Chulinuwu</div>
				</a>

				<!-- Gmail -->
				<a
					href="mailto:ananzxzoxd@gmail.com"
					class="reveal-up group transform rounded-xl border border-pink-400/20 bg-gray-900/30 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-red-400/50 hover:bg-red-500/20"
					style="animation-delay: 0.2s;"
				>
					<div class="mb-3 text-3xl">📧</div>
					<div class="text-sm font-medium text-white">Gmail</div>
					<div class="mt-1 text-xs text-gray-400">ananzxzoxd</div>
				</a>

				<!-- Discord -->
				<a
					href="#"
					class="reveal-up group transform rounded-xl border border-pink-400/20 bg-gray-900/30 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-indigo-400/50 hover:bg-indigo-500/20"
					style="animation-delay: 0.3s;"
				>
					<div class="mb-3 text-3xl">🎮</div>
					<div class="text-sm font-medium text-white">Discord</div>
					<div class="mt-1 text-xs text-gray-400">Let's chat!</div>
				</a>
			</div>

			<!-- CTA Buttons -->
			<div
				class="reveal-up flex flex-col justify-center gap-4 sm:flex-row"
				style="animation-delay: 0.4s;"
			>
				<a
					href="./contact"
					class="pulse-glow transform rounded-2xl bg-pink-500 px-8 py-4 font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-pink-400"
				>
					Start a Project
				</a>
				<a
					href="./work"
					class="transform rounded-2xl border border-white/30 bg-white/10 px-8 py-4 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20"
				>
					View My Work
				</a>
			</div>
		</div>
	</div>

	<!-- Footer -->
	<div class="border-t border-pink-400/20 bg-black py-8">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center text-sm text-gray-400">
				<p>&copy; 2024 An-An. Made with ❤️ using Svelte & TailwindCSS</p>
				<p class="mt-2">Always learning, always creating.</p>
			</div>
		</div>
	</div>
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
