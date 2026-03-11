<script lang="ts">
	import Hero from '../components/Hero.svelte';
	import StatsBar from '../components/StatsBar.svelte';
	import FeaturedProjects from '../components/FeaturedProjects.svelte';
	import ExperienceTimeline from '../components/ExperienceTimeline.svelte';
	import SkillsGrid from '../components/SkillsGrid.svelte';
	import InfiniteScrollTech from '../components/InfiniteScrollTech.svelte';
	import Achievements from '../components/Achievements.svelte';
	import ConnectSection from '../components/ConnectSection.svelte';
	import Footer from '../components/Footer.svelte';
</script>

<div class="min-h-screen bg-black text-white">
	<Hero />
	<StatsBar />
	<FeaturedProjects />
	<ExperienceTimeline condensed />
	<SkillsGrid condensed />
	<div class="py-8">
		<InfiniteScrollTech />
	</div>
	<Achievements />
	<ConnectSection />
	<Footer />
</div>
