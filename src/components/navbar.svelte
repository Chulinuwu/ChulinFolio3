<script lang="ts">
  import { page } from '$app/stores';

  // Use $page auto-subscription in markup
  const items = [
    {
      href: '/',
      label: 'Home',
      svg: `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M3 11.5L12 4l9 7.5" />
          <path d="M5 21h14a1 1 0 0 0 1-1v-7H4v7a1 1 0 0 0 1 1z" />
        </svg>
      `
    },
    {
      href: '/shop',
      label: 'Shop',
      svg: `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M6 2l1.5 4h9L18 2" />
          <path d="M3 6h18v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z" />
        </svg>
      `
    },
    {
      href: '/work',
      label: 'Work',
      svg: `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 3v4M8 3v4" />
        </svg>
      `
    },
    {
      href: '/blog',
      label: 'Blog',
      svg: `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 15V6a2 2 0 0 0-2-2H7L3 6v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z" />
          <path d="M7 10h10M7 14h6" />
        </svg>
      `
    },
    {
      href: '/contact',
      label: 'Contact',
      svg: `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6" />
          <path d="M22 6L12 13 2 6" />
        </svg>
      `
    }
  ];
</script>

<nav class="fixed  left-1/2 bg-black transform rounded-full p-3 mt-3  -translate-x-1/2 z-50">
  <div class="relative flex">
      {#each items as item}
        <a
          href={item.href}
          class="w-12 h-12 flex items-center justify-center rounded-full text-white transition-opacity duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          class:opacity-100={$page.url.pathname === item.href}
          class:opacity-50={$page.url.pathname !== item.href}
          aria-label={item.label}
          title={item.label}
          aria-current={$page.url.pathname === item.href ? 'page' : undefined}
          >
          {@html item.svg}
        </a>
      {/each}

    <!-- decorative backdrop bubble (center) -->
   
  </div>
</nav>

<style>
  :global(a[aria-current="page"]) {
    background-color: rgba(255,255,255,0.08);
  }
</style>
