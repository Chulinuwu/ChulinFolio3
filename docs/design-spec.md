# ChulinFolio - Hand-drawn Redesign Spec

Status: draft for approval. Build has not started.

## 1. Design Read

Developer-designer-datascientist portfolio for recruiters and freelance clients, with a
hand-drawn / illustrated, full-cute language, leaning toward native CSS + Tailwind v4 +
handwritten display fonts + a pink-forward pastel light theme + sketch-style decorations
(rough.js borders + a small doodle set). Reference: vereis.com.

The hand-drawn direction is proof of skill: the owner does illustration and graphic design
(GDSC graphic designer, Procreate, Blender), so the aesthetic doubles as a portfolio piece.

## 2. Dials

- DESIGN_VARIANCE: 8 (asymmetric, tilted sticker compositions)
- MOTION_INTENSITY: 6 (playful wobble, float, scroll reveal, hand-drawn line draw)
- VISUAL_DENSITY: 4 (airy, breathing room)

## 3. Theme Lock

- Light theme only for v1. No section inverts. (Dark toggle is out of scope for v1.)
- One accent for interactive elements: PINK. Used identically for CTAs, links, focus rings
  across every section.
- The rainbow pastel set is DECORATIVE ONLY (sticker tints, doodles, section washes). It is
  never used for buttons, links, or focus states. This keeps interactive consistency and
  contrast while allowing the scrapbook look.

## 4. Color Tokens

Base / surface:
- `--cream` page background: `#FFF6F3`
- `--surface` cards: `#FFFFFF`
- `--surface-tint` soft panels: `#FFEFEF`

Ink / text (warm, never pure black):
- `--ink` primary: `#3F2E34`
- `--ink-muted`: `#8C757D`

Pink accent scale (interactive):
- `--pink-soft`: `#FFBABA` (tints, badges, washes)
- `--pink`: `#FF8FA3` (default accent, sticker fills with dark ink)
- `--pink-strong`: `#E85D75` (button fill with white text, passes WCAG AA 4.5:1)

Rainbow decorative set (locked, decoration only):
- peach `#FFD3B6`, butter `#FFF2A6`, mint `#B8E8D0`, sky `#AEDFF2`, lavender `#D9C2FF`

Shadows: tinted pink, never pure black. `0 10px 30px rgba(255,150,170,0.18)`.

## 5. Typography

- Display (handwritten): Shantell Sans (variable) via `next/font/google`.
- Body: Nunito via `next/font/google`.
- Mono (tags, dates, counts): JetBrains Mono via `next/font/google`.
- Emphasis inside headlines = italic/bold of the SAME family + hand-drawn underline.
- Italic descender clearance: `leading-[1.1]` min + `pb-1` on any italic display word with y/g/j/p/q.

## 6. Shape System (locked)

- Cards / panels: radius 20px (`rounded-[20px]`).
- Buttons: full pill.
- Inputs: 12px.
- Stickers tilt between -3deg and 3deg only.

## 7. Sections (the story of "what I did")

1. Hero (Asymmetric Split): handwritten greeting + 3-role line + 2 CTAs on the left;
   mascot (`Chulinpic.png`) framed in a rounded pastel sky window (cloud.webp + doodle stars)
   on the right, with a gentle float. Plus one small "now" sticker (interning at Visai AI).
   - headline (<=2 lines): "Ahoy~!! I'm An-An"
   - subtext (<=20 words): "Developer, designer and data scientist. I build cute, clever, scalable things."
   - CTAs: primary "See my work" (pink-strong pill, white text); secondary "Say hi" (outline).
2. What I do (asymmetric bento, 3 cells, NOT 3 equal columns): Build / Design / Data, each a
   tilted sticker with a rough.js border and one doodle icon.
3. Journey (hand-drawn winding path): internship + study milestones as path stops with real
   logos (bbl, aiful, airaaiful, scb) and Visai AI. Tells the growth from dev/design into data
   science. Vertical stack on mobile.
4. Selected work (masonry sticker grid + filter pills): featured projects as sticker cards with
   tilt + rough border, category filter (data-science / web-dev / iot / freelance / hackathon).
5. Wins (scroll-snap row): hackathons as hand-drawn trophy/medal stickers.
6. Toolbox (the single page marquee): skills/tech as scrapbook sticker chips scrolling once.
7. Let's connect: contact channels as cute cards. Single contact intent label "Say hi" reused.
8. Footer: handwritten signature + doodles.

Layout-family discipline: 8 sections, at least 5 distinct layout families (split, bento,
path-timeline, masonry, scroll-snap row, marquee, card row). No family repeats.

## 8. Motion (motion/react, each motivated)

- Hero entrance fade/rise (hierarchy). Mascot idle float (personality).
- Scroll-reveal stagger per section via `whileInView` (storytelling).
- Sticker hover wobble + tilt (feedback). Button `:active` scale 0.98 (tactile).
- Hand-drawn underline draws in on in-view (hierarchy).
- One marquee only (Toolbox). All gated by `useReducedMotion()`.

## 9. Decorations (brief override: hand-drawn is justified)

- rough.js (`roughjs`) for sketchy card borders + underlines, rendered in isolated client leaves.
- Small doodle SVG set: squiggle underline, star, sparkle, arrow, heart, cloud (reuse cloud.webp).
- Icons: `@phosphor-icons/react` (bold/duotone), single family. Retire `lucide-react`.

## 10. Asset Needs

- Mascot: `Chulinpic.png` (has alpha). Verify clean transparent edge; if the dark silhouette
  bleeds on pastel, request a background-removed cutout. Framed in a panel either way.
- Project images present: aurora.png, digital_wallet.png. MISSING for: nubsatang, aivertise,
  ugc-moderation, plant-disease, citation, virtual-idol, uniclub, erp, chula-macaron,
  dog-vs-monkey, qr, chatwithgpt. Plan: `picsum.photos/seed/{slug}` placeholders, replace later,
  or generate. Flagged, not silently shipped.

## 11. Architecture / File Plan

- Tokens: CSS variables in the global stylesheet + Tailwind v4 `@theme`. Fonts in `layout.tsx`
  via `next/font`.
- Delete dead SvelteKit leftovers after confirming no `.tsx` dependency: all `*.svelte`,
  `src/routes/`, `src/app.html`, `src/app.d.ts`, and svelte-only files in `src/lib`.
- Rebuild as `.tsx` (one component per file): Navbar, Hero, WhatIDo, Journey, SelectedWork,
  Wins, Toolbox, Connect, Footer. Primitives: SketchCard, DoodleUnderline, StickerTag,
  RoughBorder, Marquee.
- `data.ts` stays the single source of truth (already synced to the latest resume).
- Update `CLAUDE.md` to reflect Next.js reality (currently says SvelteKit).

## 12. Pre-Flight Commitments

- Zero em-dashes anywhere visible. Hyphen only.
- One accent (pink) for all interactive; rainbow decorative only.
- One radius system; one theme (light).
- Hero fits initial viewport, CTA visible without scroll, subtext <=20 words.
- No scroll cues, no version labels, no decorative status dots, no locale/time strips.
- Eyebrow count <= ceil(sections/3).
- WCAG AA contrast on every button and form control.
- `min-h-[100dvh]` for hero, never `h-screen`. Reduced-motion honored above dial 3.
