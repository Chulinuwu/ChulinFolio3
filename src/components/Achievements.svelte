<script lang="ts">
	import { hackathons } from '$lib/data';
	import { revealOnScroll } from '$lib/actions';

	const iconPaths: Record<string, string> = {
		trophy: 'M6 9H4.5a2.5 2.5 0 0 1 0-5H6m12 5h1.5a2.5 2.5 0 0 0 0-5H18M9 21h6m-3-3v3M7 4h10v7a5 5 0 0 1-10 0V4z',
		medal: 'M12 15l-3 6 3-2 3 2-3-6m0 0a6 6 0 1 0 0-12 6 6 0 0 0 0 12z',
		star: 'M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z'
	};
</script>

<section class="py-12 sm:py-20" use:revealOnScroll>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="text-3xl font-bold sm:text-5xl">
				<span class="bg-linear-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent">
					Achievements
				</span>
			</h2>
		</div>

		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each hackathons as hack}
				<div class="achievement-card rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-pink-400/30">
					<div class="mb-3 flex items-center gap-3">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="text-pink-400">
							<path d={iconPaths[hack.icon]} />
						</svg>
						<span class="rounded-full border border-pink-400/20 bg-pink-400/10 px-2 py-0.5 text-xs text-pink-400">{hack.year}</span>
					</div>
					<p class="text-lg font-bold text-pink-400">{hack.placement}</p>
					<p class="mt-1 font-semibold text-white">{hack.name}</p>
					<p class="mt-2 text-sm text-gray-400">{hack.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.achievement-card:hover {
		transform: translateY(-2px);
	}

	@media (prefers-reduced-motion: reduce) {
		.achievement-card:hover {
			transform: none;
		}
	}
</style>
