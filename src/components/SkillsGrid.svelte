<script lang="ts">
	import { skillCategories } from '$lib/data';
	import { revealOnScroll } from '$lib/actions';

	let { condensed = false }: { condensed?: boolean } = $props();

	const categories = $derived(condensed ? skillCategories.slice(0, 2) : skillCategories);
</script>

<section class="py-12 sm:py-20" use:revealOnScroll>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="text-3xl font-bold sm:text-5xl">
				<span class="bg-linear-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent">
					Skills & Technologies
				</span>
			</h2>
		</div>

		<div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
			{#each categories as category}
				<div class="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-pink-400/30">
					<h3 class="mb-4 text-lg font-semibold text-white">{category.name}</h3>
					<div class="flex flex-wrap gap-2">
						{#each category.skills as skill}
							<span class="rounded bg-white/10 px-2 py-1 text-xs text-gray-300">{skill}</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		{#if condensed}
			<div class="mt-8 text-center">
				<a href="/experience" class="text-pink-400 transition-colors hover:text-pink-300">
					View All Skills →
				</a>
			</div>
		{/if}
	</div>
</section>
