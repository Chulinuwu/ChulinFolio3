<script lang="ts">
	import { stats } from '$lib/data';
	import { revealOnScroll } from '$lib/actions';

	let current = $state(stats.map(() => 0));

	$effect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						stats.forEach((stat, i) => {
							const start = performance.now();
							const duration = 1500;
							const animate = (now: number) => {
								const elapsed = Math.min(now - start, duration);
								const progress = elapsed / duration;
								const eased = 1 - Math.pow(1 - progress, 3);
								current[i] = Math.round(eased * stat.value);
								if (elapsed < duration) requestAnimationFrame(animate);
							};
							requestAnimationFrame(animate);
						});
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.2 }
		);
		const el = document.querySelector('[data-statsbar]');
		if (el) observer.observe(el);
		return () => observer.disconnect();
	});
</script>

<section class="py-12 sm:py-16" use:revealOnScroll>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div
			data-statsbar
			class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-8 sm:px-10"
		>
			<div class="grid grid-cols-2 sm:flex sm:flex-row sm:items-center sm:justify-around gap-8 sm:gap-0">
				{#each stats as stat, i}
					<div class="flex flex-col items-center text-center">
						<div class="text-3xl sm:text-4xl font-bold text-white">
							{current[i]}{stat.suffix}
						</div>
						<div class="text-sm text-gray-400 mt-1">{stat.label}</div>
					</div>
					{#if i < stats.length - 1}
						<div class="hidden sm:block w-px h-12 bg-white/10"></div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</section>
