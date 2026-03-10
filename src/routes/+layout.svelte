<script lang="ts">
	import '../app.css';
	import Navbar from '../components/navbar.svelte';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		if (typeof window === 'undefined') return;
		const token = import.meta.env.VITE_TINYBIRD_TOKEN;
		const host = import.meta.env.VITE_TINYBIRD_HOST || 'https://api.europe-west2.gcp.tinybird.co';
		if (!token) return;

		const s = document.createElement('script');
		s.defer = true;
		s.src = 'https://unpkg.com/@tinybirdco/flock.js';
		s.setAttribute('data-token', token);
		s.setAttribute('data-host', host);
		s.setAttribute('web-vitals', 'true');
		document.head.appendChild(s);
	});
</script>

{#if !page.status || page.status < 400}
	<Navbar />
{/if}

{@render children?.()}
