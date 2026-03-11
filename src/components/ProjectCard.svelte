<script lang="ts">
	import type { Project } from '$lib/data';

	let { project, size = 'standard', onclick }: { project: Project; size?: 'large' | 'tall' | 'standard'; onclick?: () => void } = $props();

	const minHeightClass = {
		large: 'min-h-[400px]',
		tall: 'min-h-[350px]',
		standard: 'min-h-[250px]'
	}[size];
</script>

<div
	role="button"
	tabindex="0"
	onclick={onclick}
	onkeydown={(e) => e.key === 'Enter' && onclick?.()}
	class="relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-pink-400/30 {minHeightClass}"
>
	{#if project.placement}
		<div class="absolute right-[-28px] top-[18px] z-10 rotate-45 bg-linear-to-r from-pink-500 to-pink-400 px-10 py-0.5 text-[10px] font-semibold text-black shadow">
			{project.placement}
		</div>
	{/if}

	<div class="flex flex-col gap-3">
		<div>
			<p class="mb-1 text-xs font-medium text-pink-400">{project.role}</p>
			<h3 class="font-bold text-white text-lg leading-snug">{project.name}</h3>
		</div>

		<p class="text-sm text-gray-400 line-clamp-3">{project.description}</p>

		<div class="flex flex-wrap gap-1.5">
			{#each project.techStack as tech}
				<span class="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-gray-300">{tech}</span>
			{/each}
		</div>
	</div>

	<div class="mt-4 text-xs text-gray-500 transition-colors duration-200 group-hover:text-pink-400">
		View Details →
	</div>
</div>
