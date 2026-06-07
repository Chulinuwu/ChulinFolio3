# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start dev server (Next.js, Turbopack)
- `npm run build` — Production build
- `npm run start` — Serve the production build
- `npm run lint` — next lint
- `npm run format` — Auto-format with Prettier
- Type-check: `npx tsc --noEmit` (there is no `check` script)

## Tech Stack

- **Next.js 16** (App Router) + **React 19** with TypeScript
- **Tailwind CSS v4** (CSS-based config via `@import 'tailwindcss'` in `src/app.css`, no `tailwind.config`)
- **Turbopack** bundler
- **Animation**: `motion` (motion/react)
- **3D / canvas (optional)**: `@react-three/fiber`, `three` (available, not used by the current home)
- **Icons**: `@phosphor-icons/react` (v2.1, exported names end with `Icon`, e.g. `ArrowRightIcon`)
- **Hand-drawn borders**: `roughjs`
- **Deployed on Vercel**, Node ^20 || ^22 (enforced via `.npmrc` engine-strict)

## Architecture

Personal portfolio. Single-page site at `/` (hand-drawn, light pastel theme). No backend or API routes.

### Routing (`src/app/`)

- `layout.tsx` — Root layout. Loads `app.css`, sets the four hand-drawn fonts (via `src/lib/fonts.ts`) and the `hd-scope` light theme on `<body>`.
- `page.tsx` — Home. Renders `HandDrawnNav` + hero + all sections + `SiteFooter`.
- `hero-preview/page.tsx` — Standalone hero preview route (kept for isolated iteration).
- `not-found.tsx` — 404 page.

### Components

- `src/components/hero/` — Hero building blocks and shared primitives:
  - `HeroPreview.tsx` (the hero), `HandDrawnNav.tsx` (floating pill nav)
  - `RoughFrame.tsx` (rough.js hand-drawn border box; stroke renders on top of content; optional solid `fill` becomes the wrap background)
  - `DoodleUnderline.tsx`, `Doodles.tsx` (`Star`, `Sparkle`, `Heart`)
- `src/components/sections/` — One file per home section:
  - `SectionShell.tsx` (id + padding + centered max-w-1200 container), `SectionHeading.tsx` (kicker + title + doodle underline)
  - `WhatIDo`, `Journey`, `SelectedWork` (client, filterable), `Wins`, `Toolbox`, `Connect`, `SiteFooter`
- `src/components/ui/` — shadcn-style primitives (currently unused by the home).

### Data & Lib (`src/lib/`)

- `data.ts` — Single source of truth for all portfolio content: `heroData`, `experiences`, `projects`, `hackathons`, `skillCategories`, `contacts`, `education`, `stats`, `badges`. Keep in sync with the resume.
- `fonts.ts` — `next/font` setup: Fredoka (`--font-display`), Shantell Sans (`--font-hand`), Nunito (`--font-body`), JetBrains Mono (`--font-mono-hd`); plus `fontVariables`.
- `utils.ts` — `cn()` (clsx + tailwind-merge).

### Static Assets

- `public/` — Images: `Chulinpic.png` (mascot avatar, transparent), `cloud.webp`, `projects/`, `logo/`. (`src/public/` is a legacy mirror.)

## Design System (hand-drawn, light)

Tokens are CSS variables under `.hd-scope` in `src/app.css`:

- Surfaces: `--hd-cream` (page), `--hd-surface` (#fff cards), `--hd-surface-tint`
- Text: `--hd-ink`, `--hd-ink-muted`
- Pink accent (the ONLY color for interactive elements: buttons, links, active, focus): `--hd-pink-strong` (#cc3d63, white text AA-safe), `--hd-pink`, `--hd-pink-soft`
- Decorative-only pastels (never on interactive elements): `--hd-peach`, `--hd-butter`, `--hd-mint`, `--hd-sky`, `--hd-lavender`
- `body:has(.hd-scope)` is set to cream so the whole viewport stays light.

Conventions:
- Cards = `RoughFrame` with an inner padded div; slight tilt (-3deg..3deg); hover lift; pink-tinted shadow `0_10px_30px_rgba(204,61,99,0.15)`; radius ~20px; pill buttons.
- Scroll reveals use `motion/react` `whileInView`. IMPORTANT: keep the `whileInView` target unconditional (always the visible state) and gate only `initial` on `useReducedMotion()`. A conditional `whileInView` (`reduce ? {} : ...`) leaves elements stuck at opacity 0 under `prefers-reduced-motion`.
- Any file importing `@phosphor-icons/react` or `motion/react` must start with `'use client'`.
- No em-dash or en-dash anywhere; hyphen only. No emoji in output.
