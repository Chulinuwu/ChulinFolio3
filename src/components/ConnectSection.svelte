<script lang="ts">
	import { contacts } from '$lib/data';
	import { revealOnScroll } from '$lib/actions';
	import anan from '../public/anan.jpg';
	import banner from '../public/banner.webp';

	const contactList = Object.values(contacts);
</script>

<section id="connect" class="py-12 sm:py-20" use:revealOnScroll>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Personal photo + heading -->
		<div class="mb-12 flex flex-col items-center gap-6">
			<div class="relative">
				<div class="absolute inset-0 rounded-full bg-pink-500/30 blur-2xl"></div>
				<img
					src={anan}
					alt="An-An"
					class="relative h-28 w-28 rounded-full border-2 border-pink-400/40 object-cover shadow-lg"
				/>
			</div>
			<div class="text-center">
				<h2 class="text-3xl font-bold sm:text-5xl">
					<span class="bg-linear-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent">
						Let's Connect
					</span>
				</h2>
				<p class="mx-auto mt-4 max-w-xl text-gray-400">
					Feel free to reach out for collaborations, freelance work, or just to say hi.
				</p>
			</div>
		</div>

		<!-- Illustration showcase -->
		<div class="mb-10 overflow-hidden rounded-2xl border border-white/10">
			<img
				src={banner}
				alt="Illustration by An-An"
				class="h-40 w-full object-cover object-center opacity-80 transition-opacity duration-300 hover:opacity-100 sm:h-52"
			/>
		</div>

		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each contactList as contact}
				<a
					href={contact.href}
					target={contact.target ?? undefined}
					rel={contact.target === '_blank' ? 'noopener noreferrer' : undefined}
					class="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-pink-400/30 hover:bg-white/10"
				>
					<p class="font-bold text-white">{contact.title}</p>
					{#if contact.handle}
						<p class="mt-1 text-sm text-pink-400">{contact.handle}</p>
					{/if}
					{#if contact.description}
						<p class="mt-1 text-sm text-gray-400">{contact.description}</p>
					{/if}
				</a>
			{/each}
		</div>
	</div>
</section>
