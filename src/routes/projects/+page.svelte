<script lang="ts">
	import { projects, type ProjectCategory } from '$lib/data';
	import ProjectCard from '../../components/ProjectCard.svelte';
	import Footer from '../../components/Footer.svelte';
	import { revealOnScroll } from '$lib/actions';

	let activeFilter = $state<ProjectCategory | 'all'>('all');

	const categories: { label: string; value: ProjectCategory | 'all' }[] = [
		{ label: 'All', value: 'all' },
		{ label: 'Data Science', value: 'data-science' },
		{ label: 'Web Dev', value: 'web-dev' },
		{ label: 'IoT', value: 'iot' },
		{ label: 'Hackathon', value: 'hackathon' },
		{ label: 'Freelance', value: 'freelance' }
	];

	const filtered = $derived(
		activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter)
	);

	let selectedProject = $state<typeof projects[number] | null>(null);
</script>

<div class="min-h-screen bg-black pt-24 text-white">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8" use:revealOnScroll>
		<div class="mb-12 text-center">
			<h1 class="text-4xl font-bold sm:text-5xl">
				<span class="bg-linear-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent">
					Projects
				</span>
			</h1>
			<p class="mx-auto mt-4 max-w-xl text-gray-400">
				A collection of things I've built — from AI platforms to IoT systems.
			</p>
		</div>

		<!-- Filter bar -->
		<div class="mb-8 flex flex-wrap justify-center gap-2">
			{#each categories as cat}
				<button
					onclick={() => (activeFilter = cat.value)}
					class="rounded-full border px-4 py-2 text-sm transition-all duration-200 {activeFilter === cat.value
						? 'border-pink-400/60 bg-pink-400/20 text-pink-300'
						: 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white'}"
				>
					{cat.label}
				</button>
			{/each}
		</div>

		<!-- Project grid -->
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each filtered as project (project.slug)}
				<ProjectCard {project} size="standard" onclick={() => (selectedProject = project)} />
			{/each}
		</div>

		{#if filtered.length === 0}
			<p class="py-20 text-center text-gray-500">No projects in this category yet.</p>
		{/if}
	</div>

	<!-- Case study modal -->
	{#if selectedProject}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
			onclick={() => (selectedProject = null)}
			onkeydown={(e) => e.key === 'Escape' && (selectedProject = null)}
			role="dialog"
			aria-modal="true"
			aria-label={selectedProject.name}
		>
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="relative max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-gray-950 p-8"
				onclick={(e) => e.stopPropagation()}
			>
				<button
					onclick={() => (selectedProject = null)}
					class="absolute right-4 top-4 text-gray-400 transition-colors hover:text-white"
					aria-label="Close"
				>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
					</svg>
				</button>

				<span class="mb-2 inline-block rounded-full border border-pink-400/20 bg-pink-400/10 px-3 py-1 text-xs text-pink-400">
					{selectedProject.category}
				</span>
				<h2 class="mt-2 text-2xl font-bold text-white">{selectedProject.name}</h2>
				<p class="mt-1 text-sm text-pink-400">{selectedProject.role}</p>
				<p class="mt-4 leading-relaxed text-gray-300">{selectedProject.explanation}</p>

				<div class="mt-6 flex flex-wrap gap-2">
					{#each selectedProject.techStack as tech}
						<span class="rounded bg-white/10 px-2 py-1 text-xs text-gray-300">{tech}</span>
					{/each}
				</div>

				<div class="mt-6 flex gap-3">
					{#if selectedProject.link}
						<a href={selectedProject.link} target="_blank" rel="noopener noreferrer"
							class="rounded-xl bg-pink-500 px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-pink-400">
							Live Demo
						</a>
					{/if}
					{#if selectedProject.github}
						<a href={selectedProject.github} target="_blank" rel="noopener noreferrer"
							class="rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/40">
							GitHub
						</a>
					{/if}
				</div>
			</div>
		</div>
	{/if}

	<Footer />
</div>
