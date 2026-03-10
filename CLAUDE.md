# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start dev server (Vite)
- `npm run build` — Production build
- `npm run preview` — Preview production build
- `npm run check` — Type-check with svelte-check
- `npm run lint` — Prettier + ESLint check
- `npm run format` — Auto-format with Prettier

## Tech Stack

- **SvelteKit** (Svelte 5) with TypeScript
- **Tailwind CSS v3** with plugins: typography, forms, container-queries
- **Vite 6** bundler
- **Deployed on Vercel** (adapter-auto, Node 20)
- **Analytics**: Tinybird (flock.js via env vars) + Google Analytics (gtag)

## Architecture

This is a personal portfolio site (single-page with sections). There is no backend or API routes.

### Routing

- `src/routes/+page.svelte` — Main landing page (hero, about, experience, skills, tech scroll, contact, footer). This is a large single file containing most of the page layout.
- `src/routes/+layout.svelte` — Global layout: loads `app.css`, renders `Navbar`, injects Tinybird analytics script
- `src/routes/+error.svelte` — Error page
- `src/routes/test/+page.svelte` — Test/dev page

### Components (`src/components/`)

- `herosection.svelte` — Hero banner with name/title/badges
- `aboutme.svelte` — About me section
- `navbar.svelte` — Navigation bar (conditionally hidden on error pages)
- `InfiniteScrollTech.svelte` — Auto-scrolling tech/language ticker
- `letsconnect.svelte` — Contact/social links section

### Data & Lib (`src/lib/`)

- `data.ts` — All static content: experiences, skills, projects, contacts, badges, programming languages. This is the single source of truth for portfolio content.
- `analytics/tracking.ts` — `TrackingService` singleton wrapping Google Analytics gtag events
- `analytics/index.ts` — Re-exports tracking module

### Static Assets

- `src/public/` — Images (profile photos, banners)
- `static/` — Favicon, Chrome DevTools config

## Conventions

- Dark theme (black background, pink-400/purple accent palette)
- Heavy use of CSS animations: scroll-reveal (IntersectionObserver `revealOnScroll` action), floating particles, gradient shifts, sparkles
- Custom animation classes defined in both `src/app.css` and `+page.svelte` `<style>` block
- Supports `prefers-reduced-motion` and `prefers-contrast: high`
- Environment variables: `VITE_TINYBIRD_TOKEN`, `VITE_TINYBIRD_HOST`
- Node engine requirement: ^20 || ^22 (enforced via `.npmrc` engine-strict)
