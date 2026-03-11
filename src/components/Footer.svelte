<script lang="ts">
	import { heroData, education } from '$lib/data';

	const year = new Date().getFullYear();
</script>

<footer class="border-t border-white/10 py-8">
	<div class="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
		<div>
			<p class="font-semibold text-white">{heroData.name}</p>
			<p class="text-sm text-gray-500">{education.degree} · {education.institution} · {education.period}</p>
		</div>
		<p class="text-sm text-gray-500">© {year} {heroData.name}</p>
	</div>
</footer>
