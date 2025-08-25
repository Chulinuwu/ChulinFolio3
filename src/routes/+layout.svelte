<script lang="ts">
	import { error } from '@sveltejs/kit';
	import '../app.css';
	let { children } = $props();
	import Navbar from "../components/navbar.svelte";
</script>

{#if !error} 
	<Navbar />
{/if}
{@render children()}
