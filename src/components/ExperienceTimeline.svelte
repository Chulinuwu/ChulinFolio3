<script lang="ts">
	import { experiences, type Experience } from '$lib/data';
	import { revealOnScroll } from '$lib/actions';

	let { condensed = false }: { condensed?: boolean } = $props();

	const entries = $derived(condensed ? experiences.filter((e) => e.featured) : experiences);
</script>

<section class="py-12 sm:py-20" use:revealOnScroll>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="reveal-up relative inline-block text-3xl font-bold text-white sm:text-5xl">
				<span class="animate-gradient bg-linear-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent">
					Experience
				</span>
			</h2>
		</div>

		<div class="relative">
			<div class="absolute left-4 top-0 h-full w-0.5 bg-linear-to-b from-pink-400/0 via-pink-400/60 to-pink-400/0"></div>

			<div class="flex flex-col gap-8">
				{#each entries as entry}
					<div class="relative flex items-start gap-6">
						<div class="absolute left-4 top-6 h-4 w-4 -translate-x-1/2 rounded-full bg-pink-400 ring-4 ring-black"></div>

						<div class="ml-12 w-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-pink-400/30">
							<div class="mb-2 flex flex-wrap items-center gap-3">
								<span class="rounded-full border border-pink-400/20 bg-pink-400/10 px-3 py-1 text-sm text-pink-400">
									{entry.year}
								</span>
							</div>
							<p class="text-xl font-bold text-white">{entry.role}</p>
							<p class="mt-1 italic text-gray-300">{entry.company}</p>
							<p class="mt-2 text-gray-400">{entry.description}</p>
							{#if entry.techUsed && entry.techUsed.length > 0}
								<div class="mt-3 flex flex-wrap gap-2">
									{#each entry.techUsed as tech}
										<span class="rounded bg-white/10 px-2 py-0.5 text-xs text-gray-300">{tech}</span>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>

		{#if condensed}
			<div class="mt-10 text-center">
				<a href="/experience" class="text-pink-400 transition-colors hover:text-pink-300">
					See Full Experience →
				</a>
			</div>
		{/if}
	</div>
</section>
