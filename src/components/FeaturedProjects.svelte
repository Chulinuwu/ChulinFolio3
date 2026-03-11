<script lang="ts">
	import { projects } from '$lib/data';
	import { revealOnScroll } from '$lib/actions';
	import ProjectCard from './ProjectCard.svelte';
	import { goto } from '$app/navigation';

	const featured = projects.filter((p) => p.featured);
	const [first, ...rest] = featured;
</script>

<section use:revealOnScroll class="reveal-section py-12 sm:py-20">
	<div class="mx-auto max-w-6xl px-4 sm:px-8">
		<div class="mb-10 text-center">
			<h2 class="text-3xl font-bold sm:text-4xl">
				<span class="gradient-text">Featured Projects</span>
			</h2>
		</div>

		<div
			class="grid grid-cols-1 gap-4 md:gap-5"
			style="grid-template-columns: 1fr; md:grid-template-columns: 1.2fr 0.8fr;"
		>
			<!-- Desktop: asymmetric 2-col layout -->
			<div class="hidden md:grid md:gap-5" style="grid-template-columns: 1.2fr 0.8fr;">
				{#if first}
					<ProjectCard project={first} size="large" onclick={() => goto(`/projects/${first.slug}`)} />
				{/if}
				<div class="flex flex-col gap-4">
					{#each rest as project}
						<ProjectCard project={project} size="tall" onclick={() => goto(`/projects/${project.slug}`)} />
					{/each}
				</div>
			</div>

			<!-- Mobile: single column -->
			<div class="flex flex-col gap-4 md:hidden">
				{#each featured as project}
					<ProjectCard project={project} size="standard" onclick={() => goto(`/projects/${project.slug}`)} />
				{/each}
			</div>
		</div>

		<div class="mt-8 text-center">
			<a
				href="/projects"
				class="text-sm text-gray-400 transition-colors duration-200 hover:text-pink-400"
			>
				View All Projects →
			</a>
		</div>
	</div>
</section>
