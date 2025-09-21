<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { trackNavigation, trackInteraction } from '$lib/analytics';
  
  let mounted = false;
  let activeIndicatorEl: HTMLElement;
  let navEl: HTMLElement;
  let currentPath = '';
  
  const items = [
    {
      href: '/',
      label: 'Home',
      svg: `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M9 21H5a2 2 0 0 1-2-2V9l9-7 9 7v10a2 2 0 0 1-2 2h-4"/>
          <polyline points="9,21 9,13 15,13 15,21"/>
        </svg>
      `
    },
    {
      href: '/projects',
      label: 'My Projects',
      svg: `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="2" y="4" width="20" height="14" rx="3" ry="3"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="18" x2="12" y2="21"/>
          <path d="M7 10h10"/>
          <circle cx="8" cy="13" r="1" fill="currentColor"/>
          <circle cx="12" cy="13" r="1" fill="currentColor"/>
          <circle cx="16" cy="13" r="1" fill="currentColor"/>
        </svg>
      `
    },
    {
      href: '/activities',
      label: 'My Activities',
      svg: `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 12c0 5-4 9-9 9s-9-4-9-9"/>
          <path d="M12 3c5 0 9 4 9 9"/>
          <path d="M12 7v5l3 3"/>
          <path d="M3 12h3"/>
          <path d="M21 12h-3"/>
          <circle cx="18" cy="6" r="2" fill="currentColor"/>
          <circle cx="6" cy="18" r="2" fill="currentColor"/>
        </svg>
      `
    },
    {
      href: '/artwork',
      label: 'My Artwork',
      svg: `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 2l2.5 6h6l-5 4 2 6-5.5-4L6.5 18l2-6-5-4h6z"/>
          <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4"/>
          <circle cx="12" cy="15" r="1" fill="currentColor"/>
          <path d="M9 15h6"/>
        </svg>
      `
    }
  ];

  onMount(() => {
    mounted = true;
    updateActiveIndicator();
    
    currentPath = $page.url.pathname;
  });

  function updateActiveIndicator() {
    if (!mounted || !navEl) return;
    
    const activeLink = navEl.querySelector('[aria-current="page"]') as HTMLElement;
    if (activeLink && activeIndicatorEl) {
      const rect = activeLink.getBoundingClientRect();
      const navRect = navEl.getBoundingClientRect();
      
      // Calculate exact center position including padding
      const itemCenter = rect.left - navRect.left + (rect.width / 2);
      const bubbleCenter = itemCenter - (56 / 2); // 56px is new bubble size
      
      activeIndicatorEl.style.transform = `translateX(${bubbleCenter}px)`;
    }
  }

  // Watch for route changes
  $: if (mounted && $page.url.pathname) {
    const newPath = $page.url.pathname;
    
    if (currentPath && newPath !== currentPath) {
      trackNavigation(currentPath, newPath, 'navigation');
    }
    
    currentPath = newPath;
    setTimeout(updateActiveIndicator, 100);
  }

  function handleNavClick(event: MouseEvent, item: any) {
    trackInteraction('navbar_link', 'click', {
      href: item.href,
      label: item.label,
      fromPath: currentPath,
      toPath: item.href,
      clickCoordinates: {
        x: event.clientX,
        y: event.clientY
      }
    });
  }
</script>

{#if !$page.status || $page.status < 400}
<nav 
  bind:this={navEl}
  class="liquid-glass-nav fixed left-1/2 transform -translate-x-1/2 z-50 mt-4"
  style="--nav-items: {items.length}"
>
  <!-- Main glass container -->
  <div class="glass-container">
    <!-- Background blur and glass effect -->
    <div class="glass-backdrop"></div>
    
    <!-- Border highlight -->
    <div class="glass-border"></div>
    
    <!-- Active indicator bubble -->
    <div 
      bind:this={activeIndicatorEl}
      class="active-bubble"
    ></div>
    
    <!-- Navigation items -->
    <div class="nav-items">
      {#each items as item, index}
        <a
          href={item.href}
          class="nav-link"
          class:active={$page.url.pathname === item.href}
          aria-label={item.label}
          title={item.label}
          aria-current={$page.url.pathname === item.href ? 'page' : undefined}
          style="--index: {index}"
          on:click={(event) => handleNavClick(event, item)}
        >
          <div class="nav-icon">
            {@html item.svg}
          </div>
          
          <!-- Label text below icon -->
          <div class="nav-label">
            {item.label}
          </div>
          
          <!-- Ripple effect on click -->
          <div class="ripple-effect"></div>
        </a>
      {/each}
    </div>
  </div>
</nav>

{/if}

<style>
  .liquid-glass-nav {
    --glass-blur: 24px;
    --glass-opacity: 0.1;
    --border-opacity: 0.3;
    --active-opacity: 0.2;
    --nav-height: 68px;
    --nav-padding: 6px;
    --item-size: 56px;
    --item-gap: 6px;
  }

  .glass-container {
    position: relative;
    height: var(--nav-height);
    border-radius: 34px;
    padding: var(--nav-padding);
    overflow: hidden;
    transform: translateZ(0); /* Force GPU acceleration */
  }

  /* Glass backdrop with blur */
  .glass-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, var(--glass-opacity));
    backdrop-filter: blur(var(--glass-blur)) saturate(1.2);
    -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(1.2);
    border-radius: inherit;
    
    /* Add subtle texture */
    background-image: 
      radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
  }

  /* Glass border highlight */
  .glass-border {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, var(--border-opacity)) 0%,
      rgba(255, 255, 255, 0.1) 25%,
      rgba(255, 255, 255, 0.05) 50%,
      rgba(255, 255, 255, 0.1) 75%,
      rgba(255, 255, 255, var(--border-opacity)) 100%
    );
    mask: linear-gradient(black, black) content-box, linear-gradient(black, black);
    mask-composite: xor;
    -webkit-mask: linear-gradient(black, black) content-box, linear-gradient(black, black);
    -webkit-mask-composite: xor;
  }

  /* Active indicator bubble */
  .active-bubble {
    position: absolute;
    top: var(--nav-padding);
    left: 1px;
    height: var(--item-size);
    width: var(--item-size);
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      rgba(236, 72, 153, 0.4) 0%,
      rgba(219, 39, 119, 0.3) 25%,
      rgba(244, 114, 182, 0.25) 50%,
      rgba(236, 72, 153, 0.35) 100%
    );
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    box-shadow: 
      0 4px 16px rgba(236, 72, 153, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      inset 0 -1px 0 rgba(236, 72, 153, 0.1);
    
    /* Pink glow effect */
    filter: drop-shadow(0 0 12px rgba(236, 72, 153, 0.3));
    
    /* Animated bubble pattern inside */
    overflow: hidden;
  }

  /* Floating bubbles inside active indicator */
  .active-bubble::before,
  .active-bubble::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    animation: floatBubble 3s ease-in-out infinite;
  }

  .active-bubble::before {
    width: 8px;
    height: 8px;
    top: 12px;
    left: 14px;
    animation-delay: 0s;
  }

  .active-bubble::after {
    width: 5px;
    height: 5px;
    top: 28px;
    right: 16px;
    animation-delay: 1.5s;
  }

  @keyframes floatBubble {
    0%, 100% {
      transform: translateY(0) scale(1);
      opacity: 0.3;
    }
    50% {
      transform: translateY(-4px) scale(1.1);
      opacity: 0.6;
    }
  }

  /* Navigation items container */
  .nav-items {
    position: relative;
    display: flex;
    gap: var(--item-gap);
    height: 100%;
    z-index: 1;
  }

  /* Individual navigation links */
  .nav-link {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: var(--item-size);
    height: var(--item-size);
    border-radius: 50%;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.6);
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    overflow: visible;
    gap: 2px;
    
    /* Micro-interactions */
    transform-origin: center;
    will-change: transform;
  }

  .nav-link:hover {
    color: rgba(255, 255, 255, 0.9);
    transform: scale(1.05);
    
    /* Add subtle glow on hover */
    box-shadow: 0 0 16px rgba(236, 72, 153, 0.2);
  }

  .nav-link:active {
    transform: scale(0.95);
  }

  .nav-link.active {
    color: rgba(255, 255, 255, 1);
  }

  /* Icon container */
  .nav-icon {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
    margin-bottom: 2px;
  }

  .nav-link:hover .nav-icon {
    transform: translateY(-1px);
  }

  /* Label text */
  .nav-label {
    position: absolute;
    bottom: -18px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 9px;
    font-weight: 500;
    white-space: nowrap;
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    letter-spacing: 0.3px;
  }

  .nav-link:hover .nav-label {
    opacity: 0.8;
    bottom: -20px;
  }

  .nav-link.active .nav-label {
    opacity: 1;
    color: rgba(236, 72, 153, 0.9);
    font-weight: 600;
    bottom: -20px;
  }

  /* Ripple effect */
  .ripple-effect {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
    transform: scale(0);
    opacity: 0;
    transition: all 0.3s ease;
  }

  .nav-link:active .ripple-effect {
    transform: scale(1);
    opacity: 1;
    transition: all 0.1s ease;
  }

  /* Responsive adjustments */
  @media (max-width: 640px) {
    .liquid-glass-nav {
      --nav-height: 72px;
      --item-size: 56px;
      --glass-blur: 20px;
      --nav-padding: 8px;
    }

    .nav-label {
      font-size: 8px;
    }
  }

  /* Enhance glass effect for supported browsers */
  @supports (backdrop-filter: blur(1px)) {
    .glass-backdrop {
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(var(--glass-blur)) saturate(1.8) brightness(1.1);
      -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(1.8) brightness(1.1);
    }
  }

  /* Fallback for browsers without backdrop-filter */
  @supports not (backdrop-filter: blur(1px)) {
    .glass-backdrop {
      background: rgba(0, 0, 0, 0.7);
    }
  }

  /* Add subtle animation on mount */
  .liquid-glass-nav {
    animation: fadeInScale 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: translateX(-50%) scale(0.95) translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) scale(1) translateY(0);
    }
  }

  /* Stagger animation for nav items */
  .nav-link {
    animation: slideInUp 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    animation-delay: calc(var(--index) * 0.1s);
    animation-fill-mode: both;
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Focus states for accessibility */
  .nav-link:focus {
    outline: none;
    box-shadow: 
      0 0 0 2px rgba(255, 255, 255, 0.1),
      0 0 16px rgba(255, 255, 255, 0.2);
  }

  .nav-link:focus-visible {
    box-shadow: 
      0 0 0 2px rgba(255, 255, 255, 0.3),
      0 0 16px rgba(255, 255, 255, 0.3);
  }

  /* Reduce motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    .nav-link,
    .active-bubble,
    .ripple-effect {
      transition-duration: 0.1s;
    }
    
    .liquid-glass-nav,
    .nav-link {
      animation: none;
    }
  }

  /* High contrast mode */
  @media (prefers-contrast: high) {
    .glass-backdrop {
      background: rgba(255, 255, 255, 0.2);
    }
    
    .glass-border {
      background: rgba(255, 255, 255, 0.5);
    }
    
    .nav-link {
      color: rgba(255, 255, 255, 0.8);
    }
    
    .nav-link.active {
      color: white;
    }
  }
</style>