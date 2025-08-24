<script lang="ts">
    import { onMount } from 'svelte';
    import Navbar from "../components/navbar.svelte";
    import Chulinpic_bg from "../public/Chulinpicwithbg.png";

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
        "Consultant",
        "Web Design", 
        "UX & UI design",
        "Data Analysis",
        "Data Science",
        "System Design",
        "Illustration"
    ];
    
    // Hero section data
    const heroData = {
        name: "An-An",
        title: "Developer / Designer",
        subtitle: "3rd Year Computer Engineering and Digital Technology (CEDT), Chulalongkorn University",
        buttons: {
            primary: { text: "My projects", href: "./work" },
            secondary: { text: "Contact me", href: "./contact" }
        }
    };

    // Projects data from old code
    const projects = [
        {
            name: "Real-time AI Leaf Disease Detection",
            description: "A real-time system for detecting plant leaf diseases using deep learning.",
            explanation: "This project uses ESP32 for communication, Svelte for the frontend, and Python Flask for the backend. It integrates with Blynk Cloud, Google Sheets, and sends alerts through WhatsApp via Twilio and Gmail.",
            role: "Full-stack Developer",
            link: "https://github.com/Chulinuwu/Smart_Farm_Plant_Monitoring_System",
            image: "/img/project1.jpg",
        },
        {
            name: "QR Code Generator",
            description: "A web app that generates QR codes from entered links.",
            explanation: "Developed using Svelte, this app allows users to input a URL and generate a corresponding QR code.",
            role: "Full-stack Developer",
            link: "https://q-rcode-gen.vercel.app/",
            image: "/img/project2.jpg",
        },
        {
            name: "UniClub",
            description: "A platform for university students to search and manage their favorite clubs.",
            explanation: "This project allows students to find and manage clubs at their university. The platform also provides a back-office management system for clubs.",
            role: "Full-stack Developer",
            link: "https://uni-club-frontend-pey5.vercel.app/",
            image: "/img/project3.jpg",
        },
        {
            name: "ChulaMacaron",
            description: "A system for Chula students to report broken buildings.",
            explanation: "Developed using React Native, this system allows students to submit pictures and details about broken buildings on campus, enabling the relevant departments to take action.",
            role: "UX/UI and Frontend Developer",
            link: "https://github.com/xXpeira12/ChulaMacaron",
            image: "/img/project4.jpg",
        },
        {
            name: "Dog vs Monkey Game",
            description: "A space shooter game where you control a dog throwing bananas at monkeys.",
            explanation: "Developed using JavaFX, this game allows the player to control a dog and throw bananas at monkeys in a space-themed environment.",
            role: "Developer",
            link: "https://github.com/amphikapha/Dog-VS-Monkey",
            image: "/img/project5.jpg",
        },
        {
            name: "ChatwithGPT",
            description: "A web app for real-time communication with generative models.",
            explanation: "Built with FastAPI and Svelte, this app allows users to communicate with generative models in real time, with a base model acting as a Pekora VTuber.",
            role: "Full-stack Developer",
            link: "https://github.com/Chulinuwu/ChatwithGPT",
            image: "/img/project6.jpg",
        }
    ];

    // Experience data
    const experiences = [
        {
            year: "Apr 2021",
            role: "POSN 1-2 Computer Student",
            company: "Burapha University",
            description: "Begin to learn competitive programming, data structure and algorithm"
        },
        {
            year: "Aug 2023 - now",
            role: "CEDT Student", 
            company: "Computer Engineering and Digital Technology, Chulalongkorn University",
            description: "Begin academic life"
        },
        {
            year: "May 2024 - July",
            role: "BBL Internship as UX/UI Designer and Frontend Developer",
            company: "Bangkok Bank Public Company Limited (BBL)",
            description: "iFunds project developed by Nextjs + Java Quarkus + PostgreSQL"
        },
        {
            year: "Sep 2024 - now",
            role: "Information System Development (ISD) Frontend Developer",
            company: "Computer Engineering and Digital Technology, Chulalongkorn University",
            description: "SUCU Project"
        },
        {
            year: "Sep 2024 - now",
            role: "Google Developer Student Clubs (GDSC) Core team (Graphic)",
            company: "Computer Engineering and Digital Technology, Chulalongkorn University", 
            description: "Designing and creating graphic for GDSC"
        }
    ];

    // Skills data
    const skills = [
        { name: "Web Design (UX/UI)", icon: "🎨", description: "UX/UI designer for various projects using Figma" },
        { name: "Web Development", icon: "💻", description: "Full-Stack Developer for some projects. But mostly is Front-end Developer include UX/UI designer. proficient in Typescript" },
        { name: "Mobile Apps", icon: "📱", description: "Used to do some apps with React-Native + expo, also some Flutter apps" },
        { name: "Drawing", icon: "✏️", description: "Drawing is my hobby, also receive commission. you can check my art in other section" },
        { name: "AI/ML", icon: "🤖", description: "Just Beginner with ML and AI, know some basic, techniques for data analysis" },
        { name: "Data Analysis", icon: "📊", description: "Analyzing data and creating insights for decision making" }
    ];

    // Programming languages for infinite scroll
    const programmingLanguages = [
        { name: "TypeScript", icon: "⚡" },
        { name: "Python", icon: "🐍" },
        { name: "JavaScript", icon: "🟨" },
        { name: "Java", icon: "☕" },
        { name: "C++", icon: "🔧" },
        { name: "React", icon: "⚛️" },
        { name: "Svelte", icon: "🧡" },
        { name: "Node.js", icon: "🟢" },
        { name: "Go", icon: "🚀" },
        { name: "Dart", icon: "🎯" },
        { name: "Flutter", icon: "💙" },
        { name: "FastAPI", icon: "🏃‍♂️" }
    ];

    // Tools data  
    const tools = [
        { name: "Figma", description: "Web-based design tool for UI/UX design and collaboration", icon: "🎨" },
        { name: "VS Code", description: "Popular source code editor by Microsoft", icon: "💻" },
        { name: "IntelliJ", description: "Integrated development environment for Java and other languages", icon: "🧠" },
        { name: "Notion", description: "Productivity tool for note-taking and project management", icon: "📝" },
        { name: "Linear", description: "Tool for tracking issues and project management", icon: "📈" },
        { name: "Procreate", description: "Powerful digital painting app for iPad", icon: "🎨" }
    ];

    // Interactive features data
    const floatingElements = [
        { shape: "circle", delay: 0, size: "w-4 h-4", color: "bg-pink-400" },
        { shape: "triangle", delay: 500, size: "w-6 h-6", color: "bg-pink-300" },
        { shape: "square", delay: 1000, size: "w-5 h-5", color: "bg-pink-500" },
        { shape: "circle", delay: 1500, size: "w-3 h-3", color: "bg-pink-200" },
        { shape: "diamond", delay: 2000, size: "w-4 h-4", color: "bg-pink-600" },
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
            class="fixed w-4 h-4 bg-pink-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-100"
            style="left: {mouseX - 8}px; top: {mouseY - 8}px; opacity: {isMouseMoving ? 1 : 0}"
        ></div>
    {/if}

    <!-- Background Stars/Particles -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
        {#each Array(80) as _, i}
            <div 
                class="absolute w-1 h-1 bg-pink-300 rounded-full sparkle"
                style="left: {Math.random() * 100}%; top: {Math.random() * 100}%; animation-delay: {Math.random() * 3}s"
            ></div>
        {/each}
    </div>

    <!-- Hero Section -->
    <div class="bg-black w-full min-h-screen h-auto flex flex-col relative">
        <!-- Floating geometric shapes -->
        {#each floatingElements as element, i}
            <div 
                class="absolute floating-element {element.size} {element.color} opacity-30 pointer-events-none"
                style="
                    left: {20 + i * 15}%; 
                    top: {30 + (i % 2) * 20}%;
                    animation-delay: {element.delay}ms;
                    {element.shape === 'circle' ? 'border-radius: 50%;' : ''}
                    {element.shape === 'triangle' ? 'clip-path: polygon(50% 0%, 0% 100%, 100% 100%);' : ''}
                    {element.shape === 'diamond' ? 'transform: rotate(45deg);' : ''}
                "
            ></div>
        {/each}

        <Navbar />
        
        <!-- Hero Content Container -->
        <div class="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-16 sm:py-28 relative">
            
            <!-- Infinite Scrolling Badges -->
            <div class="w-full max-w-6xl mb-8 sm:mb-12 overflow-hidden fade-mask">
                <div class="flex gap-2 scroll-animation">
                    {#each badges as badge}
                        <div class="flex-shrink-0 px-3 sm:px-4 py-2 bg-gray-900/80 backdrop-blur-sm border border-pink-400/20 rounded-full text-white text-xs sm:text-sm whitespace-nowrap hover:bg-pink-400/20 hover:border-pink-400/50 hover:text-pink-300 transition-all duration-300 cursor-pointer magnetic">
                            {badge}
                        </div>
                    {/each}
                    
                    {#each badges as badge}
                        <div class="flex-shrink-0 px-3 sm:px-4 py-2 bg-gray-900/80 backdrop-blur-sm border border-pink-400/20 rounded-full text-white text-xs sm:text-sm whitespace-nowrap hover:bg-pink-400/20 hover:border-pink-400/50 hover:text-pink-300 transition-all duration-300 cursor-pointer magnetic">
                            {badge}
                        </div>
                    {/each}
                </div>
            </div>
            
            <!-- Hero Title with reveal animation -->
            <div class="text-center mb-6 sm:mb-8">
                <h1 class="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-4 text-reveal">
                    <span class="text-white">I'm {heroData.name},</span>
                    <br>
                    <span class="gradient-text">{heroData.title}</span>
                </h1>
                <p class="text-sm sm:text-lg md:text-xl text-gray-300 max-w-2xl px-4 text-reveal" style="animation-delay: 0.3s;">
                    {heroData.subtitle}
                </p>
            </div>
            
            <!-- Hero Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 text-reveal mb-8 sm:mb-16" style="animation-delay: 0.6s;">
                <a 
                    href={heroData.buttons.primary.href}
                    class="group relative px-6 sm:px-8 py-3 sm:py-4 bg-pink-500 hover:bg-pink-400 text-black font-medium rounded-2xl transition-all duration-300 transform hover:scale-105 pulse-glow magnetic overflow-hidden text-center"
                >
                    <span class="relative z-10">{heroData.buttons.primary.text}</span>
                    <div class="absolute inset-0 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                
                <a 
                    href={heroData.buttons.secondary.href}
                    class="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium rounded-2xl transition-all duration-300 transform hover:scale-105 magnetic backdrop-blur-sm text-center"
                >
                    <span class="relative z-10">{heroData.buttons.secondary.text}</span>
                    <div class="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-pink-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </a>
            </div>
            
        </div>
        
        <!-- Profile Image with parallax effect -->
        <div class="flex justify-center px-4 w-full min-w-full" >
            <div class="w-full max-w-4xl min-w-full h-full rounded-2xl overflow-hidden relative group">
                <img 
                    src={Chulinpic_bg}
                    alt="Profile"
                    class=" object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <!-- Overlay effect -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
        </div>
        
    </div>

    <!-- About Section -->
    <div class="bg-black w-full min-h-screen flex items-center relative overflow-hidden" use:revealOnScroll>
        <!-- Background grid -->
        <div class="absolute inset-0 opacity-5">
            <div class="absolute inset-0" style="background-image: linear-gradient(rgba(244, 114, 182, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(244, 114, 182, 0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
        </div>
        
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                
                <!-- Profile Image -->
                <div class="order-2 lg:order-1 flex justify-center reveal-left">
                    <div class="relative">
                        <div class="w-64 h-80 sm:w-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-1 transition-all duration-500 border-2 border-pink-400/30">
                            <!-- Placeholder for profile image -->
                            <div class="w-full h-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-black text-lg font-medium">
                                Profile Image
                            </div>
                        </div>
                        <!-- Decorative elements -->
                        <div class="absolute -top-4 -right-4 w-8 h-8 bg-pink-400 rounded-full animate-bounce" style="animation-delay: 0.5s;"></div>
                        <div class="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-300 rounded-full animate-pulse"></div>
                    </div>
                </div>

                <!-- About Content -->
                <div class="order-1 lg:order-2 reveal-right">
                    <div class="bg-gray-900/20 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-pink-400/20">
                        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">
                            <span class="border-l-4 border-pink-400 pl-4">About Me</span>
                        </h2>
                        <p class="text-base sm:text-lg text-gray-300 leading-relaxed mb-8">
                            An-An is a current student in Computer Engineering who loves coding, drawing, and designing. 
                            I'm interested in creating new innovations and possess strong leadership skills, 
                            along with the ability to effectively solve problems on the spot.
                        </p>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="text-center p-4 bg-gradient-to-br from-pink-500/20 to-pink-400/20 rounded-lg border border-pink-400/30">
                                <div class="text-2xl font-bold text-pink-400">7+</div>
                                <div class="text-sm text-gray-400">Projects</div>
                            </div>
                            <div class="text-center p-4 bg-gradient-to-br from-pink-500/20 to-pink-400/20 rounded-lg border border-pink-400/30">
                                <div class="text-2xl font-bold text-pink-400">3+</div>
                                <div class="text-sm text-gray-400">Years Experience</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- Experience Section -->
    <div class="bg-black w-full py-12 sm:py-20" use:revealOnScroll>
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl sm:text-4xl font-bold text-white text-center mb-12 reveal-up">Experience</h2>
            <div class="max-w-4xl mx-auto">
                <div class="relative border-l-2 border-pink-400/30">
                    {#each experiences as experience, index}
                        <div class="mb-8 ml-6 reveal-up" style="animation-delay: {index * 0.2}s;">
                            <span class="absolute w-6 h-6 bg-pink-400 rounded-full -left-3.5 shadow-lg flex items-center justify-center border-4 border-black">
                                <div class="w-2 h-2 bg-black rounded-full"></div>
                            </span>
                            <div class="bg-gray-900/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 hover:bg-gray-900/50 transition-all duration-300 transform hover:scale-105 border border-pink-400/20">
                                <p class="text-sm font-medium text-pink-400 mb-1">{experience.year}</p>
                                <h3 class="text-lg sm:text-xl font-semibold text-white mb-1">{experience.role}</h3>
                                <p class="italic text-gray-300 mb-2 text-sm sm:text-base">{experience.company}</p>
                                <p class="text-gray-400 text-sm sm:text-base">{experience.description}</p>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>

    <!-- Skills Section -->
    <div class="bg-black w-full py-12 sm:py-20" use:revealOnScroll>
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl sm:text-4xl font-bold text-pink-400 text-center mb-12 reveal-up">What I'm Doing</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each skills as skill, index}
                    <div class="bg-gray-900/30 backdrop-blur-sm border border-pink-400/20 rounded-xl p-6 text-center hover:bg-gray-900/50 hover:border-pink-400/40 transition-all duration-300 transform hover:scale-105 reveal-up" style="animation-delay: {index * 0.1}s;">
                        <div class="text-3xl mb-4">{skill.icon}</div>
                        <h3 class="text-lg font-semibold mb-3 text-white">{skill.name}</h3>
                        <p class="text-gray-400 text-sm">{skill.description}</p>
                    </div>
                {/each}
            </div>
        </div>
    </div>

    <!-- Contact Section -->
    <div class="bg-black w-full py-12 sm:py-20" use:revealOnScroll>
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-3xl sm:text-4xl font-bold text-white mb-8 reveal-up">Let's Connect!</h2>
            <p class="text-gray-300 mb-12 text-lg reveal-up" style="animation-delay: 0.2s;">Ready to collaborate? Let's create something amazing together.</p>
            
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
                
                <!-- Instagram -->
                <a href="https://www.instagram.com/vyovyo___" target="_blank" 
                   class="group bg-gray-900/30 backdrop-blur-sm border border-pink-400/20 rounded-xl p-6 hover:bg-pink-500/20 hover:border-pink-400/50 transition-all duration-300 transform hover:scale-105 reveal-up">
                    <div class="text-3xl mb-3">📷</div>
                    <div class="text-white font-medium text-sm">Instagram</div>
                    <div class="text-gray-400 text-xs mt-1">@vyovyo___</div>
                </a>

                <!-- GitHub -->
                <a href="https://github.com/Chulinuwu/" target="_blank"
                   class="group bg-gray-900/30 backdrop-blur-sm border border-pink-400/20 rounded-xl p-6 hover:bg-gray-500/20 hover:border-gray-400/50 transition-all duration-300 transform hover:scale-105 reveal-up" style="animation-delay: 0.1s;">
                    <div class="text-3xl mb-3">💻</div>
                    <div class="text-white font-medium text-sm">GitHub</div>
                    <div class="text-gray-400 text-xs mt-1">@Chulinuwu</div>
                </a>

                <!-- Gmail -->
                <a href="mailto:ananzxzoxd@gmail.com"
                   class="group bg-gray-900/30 backdrop-blur-sm border border-pink-400/20 rounded-xl p-6 hover:bg-red-500/20 hover:border-red-400/50 transition-all duration-300 transform hover:scale-105 reveal-up" style="animation-delay: 0.2s;">
                    <div class="text-3xl mb-3">📧</div>
                    <div class="text-white font-medium text-sm">Gmail</div>
                    <div class="text-gray-400 text-xs mt-1">ananzxzoxd</div>
                </a>

                <!-- Discord -->
                <a href="#" 
                   class="group bg-gray-900/30 backdrop-blur-sm border border-pink-400/20 rounded-xl p-6 hover:bg-indigo-500/20 hover:border-indigo-400/50 transition-all duration-300 transform hover:scale-105 reveal-up" style="animation-delay: 0.3s;">
                    <div class="text-3xl mb-3">🎮</div>
                    <div class="text-white font-medium text-sm">Discord</div>
                    <div class="text-gray-400 text-xs mt-1">Let's chat!</div>
                </a>

            </div>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center reveal-up" style="animation-delay: 0.4s;">
                <a href="./contact" class="px-8 py-4 bg-pink-500 hover:bg-pink-400 text-black font-medium rounded-2xl transition-all duration-300 transform hover:scale-105 pulse-glow">
                    Start a Project
                </a>
                <a href="./work" class="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium rounded-2xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                    View My Work
                </a>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <div class="bg-black border-t border-pink-400/20 py-8">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center text-gray-400 text-sm">
                <p>&copy; 2024 An-An. Made with ❤️ using Svelte & TailwindCSS</p>
                <p class="mt-2">Always learning, always creating.</p>
            </div>
        </div>
    </div>
    
</div>

<style>
    @keyframes scroll-left {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }

    @keyframes scroll-right {
        0% { transform: translateX(-50%); }
        100% { transform: translateX(0); }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(5deg); }
    }
    
    @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.3); }
        50% { box-shadow: 0 0 40px rgba(236, 72, 153, 0.6); }
    }
    
    @keyframes gradient-shift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    @keyframes sparkle {
        0%, 100% { opacity: 0; transform: scale(0); }
        50% { opacity: 1; transform: scale(1); }
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