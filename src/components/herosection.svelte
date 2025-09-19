<script lang="ts">
	import { badges, heroData } from '$lib/data';
</script>

<!-- Hero Content Container -->
<div class="relative flex flex-1 flex-col items-center justify-center px-4 py-16 sm:px-8 sm:py-28">
	<!-- Infinite Scrolling Badges -->
	<div class="fade-mask mb-8 w-full py-5 max-w-6xl overflow-hidden sm:mb-12">
		<div class="scroll-animation flex gap-2">
			{#each badges as badge}
				<div
					class="magnetic flex-shrink-0 cursor-pointer whitespace-nowrap rounded-full border border-pink-400/20 bg-gray-900/80 px-3 py-2 text-xs text-white backdrop-blur-sm transition-all duration-300 hover:border-pink-400/50 hover:bg-pink-400/20 hover:text-pink-300 sm:px-4 sm:text-sm"
				>
					{badge}
				</div>
			{/each}

			{#each badges as badge}
				<div
					class="magnetic flex-shrink-0 cursor-pointer whitespace-nowrap rounded-full border border-pink-400/20 bg-gray-900/80 px-3 py-2 text-xs text-white backdrop-blur-sm transition-all duration-300 hover:border-pink-400/50 hover:bg-pink-400/20 hover:text-pink-300 sm:px-4 sm:text-sm"
				>
					{badge}
				</div>
			{/each}
		</div>
	</div>

	<!-- Hero Title with reveal animation -->
	<div class="mb-6 text-center sm:mb-8">
		<h1 class="text-reveal mb-4 text-3xl font-bold text-white sm:text-5xl md:text-7xl">
			<span class="text-white">I'm {heroData.name},</span>
			<br />
			<span class="gradient-text">{heroData.title}</span>
		</h1>
		<p
			class="text-reveal max-w-2xl px-4 text-sm text-gray-300 sm:text-lg md:text-xl"
			style="animation-delay: 0.3s;"
		>
			{heroData.subtitle}
		</p>
	</div>

	<!-- Hero Buttons -->
	<div
		class="text-reveal mb-8 flex flex-col gap-4 sm:mb-16 sm:flex-row"
		style="animation-delay: 0.6s;"
	>
		<a
			href={heroData.buttons.primary.href}
			class="pulse-glow magnetic group relative transform overflow-hidden rounded-2xl bg-pink-500 px-6 py-3 text-center font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-pink-400 sm:px-8 sm:py-4"
		>
			<span class="relative z-10">{heroData.buttons.primary.text}</span>
			<div
				class="absolute inset-0 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
			></div>
		</a>

		<a
			href={heroData.buttons.secondary.href}
			class="magnetic group relative transform rounded-2xl border border-white/30 bg-white/10 px-6 py-3 text-center font-medium text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 sm:px-8 sm:py-4"
		>
			<span class="relative z-10">{heroData.buttons.secondary.text}</span>
			<div
				class="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400/20 to-pink-300/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
			></div>
		</a>
	</div>
</div>
