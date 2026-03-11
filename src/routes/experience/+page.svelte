<script lang="ts">
	import ExperienceTimeline from '../../components/ExperienceTimeline.svelte';
	import SkillsGrid from '../../components/SkillsGrid.svelte';
	import Achievements from '../../components/Achievements.svelte';
	import InfiniteScrollTech from '../../components/InfiniteScrollTech.svelte';
	import Footer from '../../components/Footer.svelte';
	import { education } from '$lib/data';
	import { revealOnScroll } from '$lib/actions';
	import pic1 from '../../public/pic1.webp';
	import anan from '../../public/anan.jpg';
</script>

<div class="min-h-screen bg-black pt-24 text-white">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8" use:revealOnScroll>
		<!-- Header with photo -->
		<div class="mb-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
			<div class="relative shrink-0">
				<div class="absolute inset-0 rounded-2xl bg-pink-500/20 blur-xl"></div>
				<img
					src={anan}
					alt="An-An"
					class="relative h-32 w-32 rounded-2xl border border-white/10 object-cover shadow-lg sm:h-40 sm:w-40"
				/>
			</div>
			<div class="text-center sm:text-left">
				<h1 class="text-4xl font-bold sm:text-5xl">
					<span class="bg-linear-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent">
						Experience
					</span>
				</h1>
				<p class="mt-4 max-w-xl text-gray-400">
					{education.degree} at {education.institution} · {education.period}
				</p>
			</div>
		</div>

		<!-- Art showcase strip -->
		<div class="mb-12 overflow-hidden rounded-2xl border border-white/10">
			<img
				src={pic1}
				alt="Illustration artwork by An-An"
				class="h-48 w-full object-cover object-top opacity-70 transition-opacity duration-300 hover:opacity-100 sm:h-64"
			/>
		</div>
	</div>

	<ExperienceTimeline />
	<SkillsGrid />
	<div class="py-8">
		<InfiniteScrollTech />
	</div>
	<Achievements />
	<Footer />
</div>
