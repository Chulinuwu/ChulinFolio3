<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  
  let mounted = false;
  let mouseX = 0;
  let mouseY = 0;
  let isMouseMoving = false;
  let mouseTimeout: number;

  // Error details from the page store
  $: error = $page.error;
  $: status = $page.status;

  // Error messages based on status code
  const errorMessages: { [key: string]: { title: string; description: string; action: string } } = {
    404: {
      title: 'Page Not Found',
      description: 'The page you\'re looking for seems to have wandered off into the digital void.',
      action: 'Let\'s get you back home'
    },
    500: {
      title: 'Server Error',
      description: 'Something went wrong on our end. Our team has been notified and is working on it.',
      action: 'Try again later'
    },
    403: {
      title: 'Access Denied',
      description: 'You don\'t have permission to access this resource.',
      action: 'Go back to safety'
    },
    default: {
      title: 'Something Went Wrong',
      description: 'An unexpected error occurred. Don\'t worry, it happens to the best of us.',
      action: 'Let\'s try again'
    }
  };

  $: currentError = errorMessages[status] || errorMessages.default;

  onMount(() => {
    mounted = true;

    // Mouse tracking for cursor effect
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseMoving = true;

      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        isMouseMoving = false;
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(mouseTimeout);
    };
  });

  // Go back function
  function goBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  }

  // Reload page
  function reloadPage() {
    window.location.reload();
  }
</script>

<svelte:head>
  <title>Error {status} - An-An Portfolio</title>
  <meta name="description" content="Error {status} - {currentError.title}" />
</svelte:head>

<div class="error-page">
  <!-- Custom cursor -->
  {#if mounted}
    <div
      class="custom-cursor"
      style="left: {mouseX - 8}px; top: {mouseY - 8}px; opacity: {isMouseMoving ? 1 : 0}"
    ></div>
  {/if}

  <!-- Background effects -->
  <div class="background-effects">
    <!-- Animated gradient orbs -->
    <div class="gradient-orb orb-1"></div>
    <div class="gradient-orb orb-2"></div>
    <div class="gradient-orb orb-3"></div>
    
    <!-- Floating particles -->
    {#each Array(50) as _, i}
      <div
        class="particle"
        style="
          left: {Math.random() * 100}%;
          top: {Math.random() * 100}%;
          animation-delay: {Math.random() * 3}s;
          animation-duration: {3 + Math.random() * 2}s;
        "
      ></div>
    {/each}

    <!-- Grid pattern -->
    <div class="grid-pattern"></div>
  </div>

  <!-- Main content -->
  <div class="content-container">
    <!-- Error code with glitch effect -->
    <div class="error-code">
      <span class="glitch-text" data-text="{status}">{status}</span>
    </div>

    <!-- Glass card with error details -->
    <div class="glass-card">
      <!-- Icon based on error type -->


      <!-- Error title and description -->
      <div class="error-content">
        <h1 class="error-title">{currentError.title}</h1>
        <p class="error-description">{currentError.description}</p>
      </div>

      <!-- Action buttons -->
      <div class="action-buttons">
        <button class="primary-button" on:click={() => window.location.href = '/'}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9.5L12 2l9 7.5v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-11z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
          Go Home
        </button>
        
        <button class="secondary-button" on:click={goBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5"/>
            <path d="M12 19l-7-7 7-7"/>
          </svg>
          Go Back
        </button>

        {#if status === 500 || status >= 500}
          <button class="secondary-button" on:click={reloadPage}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M23 4v6h-6"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            Try Again
          </button>
        {/if}
      </div>
    </div>

    <!-- Fun interactive elements -->
    <div class="fun-elements">
      <div class="floating-element element-1">🌟</div>
      <div class="floating-element element-2">✨</div>
      <div class="floating-element element-3">💫</div>
      <div class="floating-element element-4">🎨</div>
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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  }

  /* Custom cursor */
  .custom-cursor {
    position: fixed;
    width: 16px;
    height: 16px;
    background: rgba(236, 72, 153, 0.8);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: all 0.1s ease;
    mix-blend-mode: difference;
  }

  /* Background effects */
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
    animation-delay: 0s;
  }

  .orb-2 {
    width: 200px;
    height: 200px;
    background: linear-gradient(45deg, #8b5cf6, #a855f7);
    top: 60%;
    right: 20%;
    animation-delay: 2s;
  }

  .orb-3 {
    width: 250px;
    height: 250px;
    background: linear-gradient(45deg, #06b6d4, #0ea5e9);
    bottom: 10%;
    left: 30%;
    animation-delay: 4s;
  }

  .particle {
    position: absolute;
    width: 2px;
    height: 2px;
    background: rgba(236, 72, 153, 0.6);
    border-radius: 50%;
    animation: sparkle 3s linear infinite;
  }

  .grid-pattern {
    position: absolute;
    inset: 0;
    opacity: 0.05;
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
  }

  /* Content container */
  .content-container {
    position: relative;
    z-index: 10;
    text-align: center;
    max-width: 600px;
    width: 100%;
  }

  /* Error code with glitch effect */
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

  .glitch-text::before,
  .glitch-text::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.8;
  }

  .glitch-text::before {
    color: #ff0080;
    animation: glitch-1 2s ease-in-out infinite;
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
  }

  .glitch-text::after {
    color: #00ff80;
    animation: glitch-2 2s ease-in-out infinite;
    clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
  }

  /* Glass card */
  .glass-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    padding: 3rem 2rem;
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    animation: slideInUp 0.8s ease forwards;
  }

  .error-icon {
    color: rgba(236, 72, 153, 0.8);
    margin-bottom: 2rem;
    animation: bounce 2s ease-in-out infinite;
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

  .error-details {
    margin: 1.5rem 0;
    text-align: left;
  }

  .error-details summary {
    cursor: pointer;
    color: rgba(236, 72, 153, 0.9);
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .error-message {
    display: block;
    background: rgba(0, 0, 0, 0.3);
    padding: 1rem;
    border-radius: 8px;
    font-family: 'Courier New', monospace;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.7);
    margin-top: 0.5rem;
    overflow-x: auto;
  }

  /* Action buttons */
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
    text-decoration: none;
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
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .secondary-button:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  /* Fun floating elements */
  .fun-elements {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .floating-element {
    position: absolute;
    font-size: 2rem;
    opacity: 0.3;
    animation: floatAround 8s ease-in-out infinite;
  }

  .element-1 { top: 20%; left: 10%; animation-delay: 0s; }
  .element-2 { top: 30%; right: 15%; animation-delay: 2s; }
  .element-3 { bottom: 30%; left: 20%; animation-delay: 4s; }
  .element-4 { bottom: 20%; right: 10%; animation-delay: 6s; }

  /* Animations */
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(10deg); }
  }

  @keyframes sparkle {
    0%, 100% { opacity: 0; transform: scale(0); }
    50% { opacity: 1; transform: scale(1); }
  }

  @keyframes glitch {
    0%, 90%, 100% { transform: translate(0); }
    10% { transform: translate(-2px, 1px); }
    20% { transform: translate(2px, -1px); }
    30% { transform: translate(-1px, 2px); }
    40% { transform: translate(1px, -2px); }
    50% { transform: translate(-2px, 1px); }
    60% { transform: translate(2px, -1px); }
    70% { transform: translate(-1px, 2px); }
    80% { transform: translate(1px, -2px); }
  }

  @keyframes glitch-1 {
    0%, 90%, 100% { transform: translate(0); }
    10% { transform: translate(-1px, 0); }
    20% { transform: translate(1px, 0); }
  }

  @keyframes glitch-2 {
    0%, 90%, 100% { transform: translate(0); }
    10% { transform: translate(1px, 0); }
    20% { transform: translate(-1px, 0); }
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @keyframes floatAround {
    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
    25% { transform: translateY(-20px) rotate(90deg); opacity: 0.6; }
    50% { transform: translateY(-10px) rotate(180deg); opacity: 0.4; }
    75% { transform: translateY(-30px) rotate(270deg); opacity: 0.8; }
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .error-page {
      padding: 1rem;
    }

    .glass-card {
      padding: 2rem 1.5rem;
    }

    .action-buttons {
      flex-direction: column;
      align-items: center;
    }

    .primary-button,
    .secondary-button {
      width: 200px;
      justify-content: center;
    }

    .floating-element {
      font-size: 1.5rem;
    }
  }

  /* Accessibility */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
    }
  }

  /* High contrast mode */
  @media (prefers-contrast: high) {
    .glass-card {
      background: rgba(0, 0, 0, 0.8);
      border: 2px solid rgba(255, 255, 255, 0.5);
    }
    
    .error-description {
      color: white;
    }
  }
</style>