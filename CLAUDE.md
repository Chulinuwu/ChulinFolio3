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
- **Motion**: `ui/DotField` swaps the CSS dot grid for a three.js point field (dots part around the mouse, ripple on press; loaded lazily, skipped under reduced motion, CSS grid stays as fallback). `lib/halftoneName` + `hooks/useHalftoneName` turn the hero heading into a WebGL halftone sampled per grid cell (cell 12px, 6px below 200px font; skipped under reduced motion or without WebGL, leaving the plain heavy heading). `ui/RiseText` + `PencilLine draw` animate headings; `.enter` staggers first-screen blocks; `.reveal` uses CSS scroll-driven `view()` timelines; `ui/TiltFrame` tilts framed images toward the mouse. `home/AvatarCoin` is a three.js two-sided coin (drawing front, `public/notebook/photo.webp` back) that tilts with the mouse and flips on its button; under reduced motion or without WebGL it swaps a plain image. The dot field also swells into a travelling wave while scrolling. Closed-form springs in `src/lib/motion/spring.ts`, React `<ViewTransition>` page turns, tokens in `src/app.css`. No animation library.
- **Icons**: `@phosphor-icons/react` (v2.1, exported names end with `Icon`). Server-side icon maps import from `@phosphor-icons/react/dist/ssr`.
- **Deployed on Vercel**, Node ^20 || ^22 (enforced via `.npmrc` engine-strict)

## Architecture

Personal portfolio, "Chulin's Notebook": her research notebook with the paper costume removed. Statically rendered routes, no backend or API routes. The full visual system lives in `DESIGN.md`; product truth in `PRODUCT.md`.

### Routing (`src/app/`)

One route map, `SCENES` in `src/components/notebook/config/scenes.ts` (path, order, tab label, title, description, next tab). Pages, index tabs, metadata, page-turn direction and `sitemap.ts` all read it.

- `layout.tsx` - Root layout: fonts, global CSS, the fixed right-edge index tabs.
- `page.tsx` - First page, wrapped in `home/DeviceIntro`: on md+ screens without reduced motion it opens on a WebGL MacBook Pro (`public/models/macbook.glb`, CC BY 4.0 by akshatmittal, credited at the bottom of the Contact page; meshopt-compressed) whose screen is the live page, projected each frame with a matrix3d from `lib/deviceIntro/homography` (self-check: `node --experimental-strip-types src/components/notebook/lib/deviceIntro/homography.check.ts`); polaroids of projects and her photo float around it (`INTRO_CARDS`, `lib/deviceIntro/props`) over a soft contact shadow; scrolling flies the camera into the screen while the cards scatter (`hooks/useDeviceIntro`, `lib/deviceIntro/scene`), then a spacer is removed and the page scrolls normally. Skipped on revisits within the session. Inside: full-height `HalftoneHero` (heavy Figtree 900 wordmark rendered as a halftone of the page dot grid: dots swell into the letters in a wave, a pink lens follows the mouse, they shrink back into the grid on scroll; avatar coin, name and `NowPanel` above, tagline below); `FeaturedWork` as a sticky stacked deck of `DeckCard`s (`HOME_DECK`, Nubsatang first); the experience ledger (`RoleTimeline`); other projects; `ContactFinale`.
- `lab/` (Data Projects), `workshop/` (Software Projects), `studio/` (Experiences: work, activities and education cards grouped by `config/experience.ts`), `contact/` - Zone pages built on `zones/ZoneSpread`, each ending with a next-tab link.
- `work/[slug]/page.tsx` - Case pages (`generateStaticParams`, `generateMetadata`, `notFound()`), built from `src/components/work/`.
- `not-found.tsx` - Her avatar with a handwritten note.
- `sitemap.ts` - Every scene path plus every work page. Base URL from `config/site.ts`.

Every page is wrapped in `ui/PageTurn` (`<ViewTransition>` keyed by `turn-forward` / `turn-back` link types); untyped navigations (browser back) swap instantly, reduced motion zeroes the durations.

### Components (`src/components/notebook/`)

- `home/` - First-page sections, including `RoleTimeline` (ledger of roles with date tracks, `useTimelineDraw` grows the bars). `zones/` - Zone pages and their rows. `cards/` - Featured project spotlight (Nubsatang on home and Software Projects), project note (framed image + title + link), project row, next-tab link.
- `ink/` - The only SVG: `PencilLine` (ruled underline).
- `nav/` - `IndexTabs` / `IndexTab` (active from `usePathname`); the pink name above the tabs links home.
- `ui/` - `FramedImage`, `MarkerLink`, `HandNote`, `PageHeading`, `PageTurn`.
- `hooks/` - `useTimelineDraw`, `useInView`, media query hooks. `lib/` - pure helpers (timeline rows and geometry, wobble, dates, selectors over `data.ts`, scene lookup).
- `config/` - All module constants (scenes, copy, timeline, icons, images, assets, zones, site). `types/notebook.types.ts` - all props and shared types.

### Data & Lib (`src/lib/`)

- `data.ts` - Single source of truth for portfolio content. Keep in sync with the resume.
- `motion/spring.ts` - `spring`, `lerp`, `progress`, `clamp01`.
- `fonts.ts` - The Girl Next Door (hand) and Figtree (body), served by next/font from this origin. `utils.ts` - `cn()`.

### Static Assets

- `public/notebook/avatar.png` - Her own avatar drawing, cut from `docs/character/reference-avatar.png`. `public/notebook/photo.webp` - her real photo (square crop of the old `anan.jpg`), the back of the avatar coin.
- `public/projects/` - Project images referenced by `projects[].image` (Nubsatang is a real screenshot; the rest are illustrated thumbnails). Provenance is embedded or in `.json` sidecars.

## Design System

See `DESIGN.md` for tokens and rules. Short version: white ground with a faint dot grid, ink lines, five gel pens (`--color-pen-*`, one per section via `data-pen` and `var(--pen)`: tabs, heading underlines, deck cards; the halftone name and dot field run them as a gradient from `config/pens.ts`), handwriting only for the name, page titles, sub-headings and links (no slogans or margin notes; the 404 note is the only one); Figtree for everything read. Inline links are always pink `#cc3d63`. Thin ink frames on images (rotation at most 1.5deg), no shadows, no paper texture, no yellow.

Conventions:
- Motion: one timeline draw-on (spring, from a visible default once JS arms it) and one page turn (transitions.dev tokens). Reduced motion renders final states.
- Files importing `@phosphor-icons/react` start with `'use client'`; icon maps used by server components import the `dist/ssr` entry. One component per file; types in `types/`, constants in `config/`; no casts or `any`; SVG only in `ink/`.
- No kickers or eyebrow labels, no em-dash or en-dash anywhere; hyphen only. No emoji in output.
