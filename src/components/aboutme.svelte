<script lang="ts">
	import anan from '../public/anan.jpg';
</script>

<div class="container mx-auto px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
	<div class="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
		<!-- Profile Image -->
		<div class="reveal-left order-2 flex justify-center lg:order-1">
			<div class="relative">
				<div
					class="h-80 w-64 rotate-3 transform overflow-hidden rounded-3xl border-2 border-pink-400/30 shadow-2xl transition-all duration-500 hover:rotate-1 sm:h-96 sm:w-80"
				>
					<!-- Placeholder for profile image -->
					<div
						class="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-400 to-pink-600 text-lg font-medium text-black"
					>
						<img src={anan} alt="Profile" class="h-full w-full object-cover" />
					</div>
				</div>
				<!-- Decorative elements -->
				<div
					class="absolute -right-4 -top-4 h-8 w-8 animate-bounce rounded-full bg-pink-400"
					style="animation-delay: 0.5s;"
				></div>
				<div
					class="absolute -bottom-4 -left-4 h-6 w-6 animate-pulse rounded-full bg-pink-300"
				></div>
			</div>
		</div>

		<!-- About Content -->
		<div class="reveal-right order-1 lg:order-2">
			<div class="rounded-2xl border border-pink-400/20 bg-gray-900/20 p-6 backdrop-blur-md sm:p-8">
				<h2 class="mb-6 text-3xl font-bold text-white sm:text-4xl">
					<span class="border-l-4 border-pink-400 pl-4">About Me</span>
				</h2>

				<p class="mb-8 text-base leading-relaxed text-gray-300 sm:text-lg">
					An-An is a Computer Engineering student at Chulalongkorn University with a passion for
					merging creativity and technology. As a versatile developer transitioning into data
					science, I specialize in creating innovative solutions that bridge the gap between design,
					development, and data-driven insights. From building user-centered interfaces to
					developing credit scoring models and ML systems for financial institutions, I bring a
					unique multi-disciplinary approach to every project. My experience spans from competitive
					programming foundations to real-world applications in fintech and system architecture,
					always driven by curiosity and the desire to solve complex problems through elegant,
					impactful solutions.
				</p>
				<div class="grid grid-cols-2 gap-4">
					<div
						class="rounded-lg border border-pink-400/30 bg-gradient-to-br from-pink-500/20 to-pink-400/20 p-4 text-center"
					>
						<div class="text-2xl font-bold text-pink-400">40+</div>
						<div class="text-sm text-gray-400">Projects</div>
					</div>
					<div
						class="rounded-lg border border-pink-400/30 bg-gradient-to-br from-pink-500/20 to-pink-400/20 p-4 text-center"
					>
						<div class="text-2xl font-bold text-pink-400">6+</div>
						<div class="text-sm text-gray-400">Years Experience</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
