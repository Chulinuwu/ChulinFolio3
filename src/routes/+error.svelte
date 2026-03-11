<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let mounted = $state(false);

	const errorMessages: Record<number | string, { title: string; description: string }> = {
		404: {
			title: 'Page Not Found',
			description: "The page you're looking for seems to have wandered off into the digital void."
		},
		500: {
			title: 'Server Error',
			description: 'Something went wrong on our end. Our team has been notified.'
		},
		403: {
			title: 'Access Denied',
			description: "You don't have permission to access this resource."
		},
		default: {
			title: 'Something Went Wrong',
			description: "An unexpected error occurred. Don't worry, it happens to the best of us."
		}
	};

	const currentError = $derived(errorMessages[page.status] || errorMessages.default);

	onMount(() => {
		mounted = true;
	});

	function goBack() {
		if (window.history.length > 1) {
			window.history.back();
		} else {
			window.location.href = '/';
		}
	}
</script>

<svelte:head>
	<title>Error {page.status} - An-An Portfolio</title>
</svelte:head>

<div class="error-page">
	<div class="background-effects">
		<div class="gradient-orb orb-1"></div>
		<div class="gradient-orb orb-2"></div>
	</div>

	<div class="content-container">
		<div class="error-code">
			<span class="glitch-text" data-text={page.status}>{page.status}</span>
		</div>

		<div class="glass-card">
			<h1 class="error-title">{currentError.title}</h1>
			<p class="error-description">{currentError.description}</p>

			<div class="action-buttons">
				<button class="primary-button" onclick={() => (window.location.href = '/')}>
					Go Home
				</button>
				<button class="secondary-button" onclick={goBack}>
					Go Back
				</button>
				{#if page.status >= 500}
					<button class="secondary-button" onclick={() => window.location.reload()}>
						Try Again
					</button>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.error-page {
		min-height: 100vh;
		background: radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 50%, #0f0f0f 100%);
		color: white;
		overflow: hidden;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.background-effects {
		position: absolute;
		inset: 0;
		overflow: hidden;
	}

	.gradient-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(40px);
		opacity: 0.6;
		animation: float 6s ease-in-out infinite;
	}

	.orb-1 {
		width: 300px;
		height: 300px;
		background: linear-gradient(45deg, #ec4899, #f472b6);
		top: 20%;
		left: 10%;
	}

	.orb-2 {
		width: 200px;
		height: 200px;
		background: linear-gradient(45deg, #8b5cf6, #a855f7);
		top: 60%;
		right: 20%;
		animation-delay: 2s;
	}

	.content-container {
		position: relative;
		z-index: 10;
		text-align: center;
		max-width: 600px;
		width: 100%;
	}

	.error-code {
		margin-bottom: 3rem;
	}

	.glitch-text {
		font-size: clamp(4rem, 15vw, 10rem);
		font-weight: 900;
		background: linear-gradient(45deg, #ec4899, #f472b6, #a855f7);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		position: relative;
		display: inline-block;
		animation: glitch 2s ease-in-out infinite;
	}

	.glass-card {
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 24px;
		padding: 3rem 2rem;
		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
	}

	.error-title {
		font-size: clamp(1.5rem, 4vw, 2.5rem);
		font-weight: 700;
		margin-bottom: 1rem;
		background: linear-gradient(45deg, #ffffff, #f472b6);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.error-description {
		font-size: 1.125rem;
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.6;
		margin-bottom: 2rem;
	}

	.action-buttons {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.primary-button,
	.secondary-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 12px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		font-size: 1rem;
	}

	.primary-button {
		background: linear-gradient(45deg, #ec4899, #f472b6);
		color: white;
		box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4);
	}

	.primary-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(236, 72, 153, 0.6);
	}

	.secondary-button {
		background: rgba(255, 255, 255, 0.1);
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.secondary-button:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: translateY(-2px);
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-20px);
		}
	}

	@keyframes glitch {
		0%,
		90%,
		100% {
			transform: translate(0);
		}
		10% {
			transform: translate(-2px, 1px);
		}
		20% {
			transform: translate(2px, -1px);
		}
	}

	@media (max-width: 768px) {
		.action-buttons {
			flex-direction: column;
			align-items: center;
		}
		.primary-button,
		.secondary-button {
			width: 200px;
			justify-content: center;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.gradient-orb,
		.glitch-text {
			animation: none;
		}
	}
</style>
