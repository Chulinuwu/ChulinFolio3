<script lang="ts">
    import Navbar from "../components/navbar.svelte";
    import Chulinpic_bg from "../public/Chulinpicwithbg.png";

    // Badge data - แก้ไขตรงนี้ได้เลย
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
            primary: { text: "My project", href: "./work" },
            secondary: { text: "Contact me", href: "./shop" }
        }
    };
</script>

<style>
    @keyframes scroll-left {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }
    
    .scroll-animation {
        animation: scroll-left 20s linear infinite;
    }
    
    .scroll-animation:hover {
        animation-play-state: paused;
    }
    
    /* Gradient mask for fade effect */
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
</style>

<div>
    <!-- Hero Section -->
    <div class="bg-black w-full min-h-screen h-auto  flex flex-col">
        <Navbar />
        
        <!-- Hero Content Container -->
        <div class="flex-1 flex flex-col items-center justify-center px-8 py-28">
            
            <!-- Infinite Scrolling Badges -->
            <div class="w-full max-w-4xl mb-12 overflow-hidden fade-mask">
                <div class="flex gap-2 scroll-animation">
                    <!-- Original badges -->
                    {#each badges as badge}
                        <div class="flex-shrink-0 px-4 py-2 bg-gray-800 border border-white/10 rounded-full text-white text-sm whitespace-nowrap">
                            {badge}
                        </div>
                    {/each}
                    
                    <!-- Duplicate badges for seamless loop -->
                    {#each badges as badge}
                        <div class="flex-shrink-0 px-4 py-2 bg-gray-800 border border-white/10 rounded-full text-white text-sm whitespace-nowrap">
                            {badge}
                        </div>
                    {/each}
                </div>
            </div>
            
            <!-- Hero Title -->
            <div class="text-center mb-8">
                <h1 class="text-5xl md:text-7xl font-bold text-white mb-4">
                    <span class="text-pink-400">I'm {heroData.name},</span>
                    <br>
                    <span>{heroData.title}</span>
                </h1>
                <p class="text-lg md:text-xl text-gray-300 max-w-2xl">
                    {heroData.subtitle}
                </p>
            </div>
            
            <!-- Hero Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
                <!-- Primary Button -->
                <a 
                    href={heroData.buttons.primary.href}
                    class="group relative px-8 py-4 bg-pink-300 hover:bg-pink-400 text-black font-medium rounded-2xl transition-all duration-300 transform hover:scale-105"
                >
                    <span class="relative z-10">{heroData.buttons.primary.text}</span>
                </a>
                
                <!-- Secondary Button -->
                <a 
                    href={heroData.buttons.secondary.href}
                    class="group relative px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium rounded-2xl transition-all duration-300 transform hover:scale-105"
                >
                    <span class="relative z-10">{heroData.buttons.secondary.text}</span>
                </a>
            </div>
            
        </div>
        
        <!-- Profile Image (Optional) -->
        <div class="flex justify-center ">
            <div class="w-full  rounded-2xl overflow-hidden">
                <!-- เพิ่มรูปภาพตรงนี้ -->
                <img 
                    src={Chulinpic_bg}
                    alt="Profile"
                    class="w-full h-full object-cover object-top"
                />
            </div>
        </div>
        
    </div>
    
    <!-- Second Section -->
    <div class="bg-gray-400 w-full h-screen flex items-center justify-center">
        <h2 class="text-4xl font-bold text-gray-800">Second Section</h2>
    </div>
    
</div>