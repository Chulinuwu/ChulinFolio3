# Portfolio Redesign — Design Spec

## Overview

Full redesign of ChulinFolio3 personal portfolio. Hybrid page structure (landing + sub-pages), editorial dark aesthetic, Svelte 5 runes migration, Tailwind v4 upgrade, and content expansion from LaTeX resume.

## Goals

- **Recruiter-ready:** Showcase technical depth, achievements, work history
- **Client-converting:** Highlight freelance work, availability, project outcomes
- **Personal brand:** Express multi-disciplinary identity (dev/designer/data scientist/artist)

## Page Structure

```
/ (Landing)
├── Hero (split layout)
├── Stats bar (glassmorphic)
├── Featured Projects (2x2 bento grid)
├── Experience timeline (top 4, condensed)
├── Skills (4 grouped columns + infinite scroll)
├── Achievements (horizontal badge cards)
└── Let's Connect (CTA + socials + availability)

/projects
├── Filter bar (All | Data Science | Web Dev | IoT | Hackathon | Freelance)
└── Bento grid → click → case study modal overlay

/experience
└── Full timeline (all entries) + Education
```

### Navbar Routes (Final)

Replace existing routes (`/`, `/projects`, `/activities`, `/artwork`) with:
- `/` — Home
- `/projects` — Projects (replaces old projects page)
- `/experience` — Experience (replaces `/activities`)
- Drop `/artwork` for now (can add later as a sub-page)

### Case Study Routing

Project details use a **modal overlay** on `/projects`, not a dynamic route. Clicking a project card opens a `CaseStudy.svelte` modal with backdrop blur. URL stays `/projects`. This avoids needing `+page.ts` load functions and keeps the architecture simple for a static portfolio.

### Layout (`+layout.svelte`)

- Navbar lives in `+layout.svelte` (rendered on all pages except error)
- Remove duplicate Navbar from `+page.svelte`
- Migrate: `$app/stores` → `$app/state`, `<slot />` → `{@render children?.()}`
- Keep Tinybird script injection in layout

## Landing Page Sections

### 1. Hero — Split Layout

- **Left:** "Jirameth Wannasiwaporn" large gradient text (pink→purple), subtitle "Developer / Designer / Data Scientist", objective one-liner, two CTAs ("View Projects" solid pink, "Get in Touch" ghost outline)
- **Right:** Profile image with glassmorphic frame, floating badge chips (CEDT, Chula)
- **Background:** Animated gradient mesh (pink→purple→dark), NO particles/sparkles/cursor follower

### 2. Stats Bar

- Horizontal glassmorphic container
- Items: "3+ Internships" | "12+ Projects" | "4 Hackathon Awards" | "Top 7/500+ CTT 2025"
- Animated count-up on scroll-reveal

### 3. Featured Projects (Bento Grid)

- 2x2 asymmetric: 1 large (Aurora AI), 1 tall (Digital Wallet), 2 standard (Smart Home IoT, Police Platform)
- Each tile: name, role tag, tech stack pills, hover → scale(1.02) + glow border
- "View All Projects →" link below

### 4. Experience Timeline (Condensed)

- Vertical timeline, left-aligned
- Show entries where `featured: true` (SCB, AIFUL, BBL, Freelance)
- Each: role, company, date badge, one-line description
- "See Full Experience →" link
- Pink gradient timeline line

### 5. Skills & Tech

- 4 columns: Languages | Frameworks | Tools & Cloud | Data & ML
- Each skill as pill/chip with icon
- Below: infinite scroll tech ticker (existing component, refined)

### 6. Achievements

- Horizontal scrollable cards
- "4th AiHack 2025" | "7th Cyber Top Talent" | "Finalist ITMX Hack" | "4th AiHack 2023"
- Trophy/medal icon per card

### 7. Let's Connect

- Centered CTA: "Let's build something together"
- Social row: GitHub, LinkedIn, Instagram, Discord, Fastwork, Email
- "Currently Available" green dot badge
- Languages: "English (B2) · Japanese (N4)"

## Projects Sub-Page (`/projects`)

- Filter pills: All, Data Science, Web Dev, IoT, Hackathon, Freelance
- Bento grid with mixed-size cards
- Hackathon projects get ribbon badge with placement
- Click → opens CaseStudy modal overlay (Problem, Solution, Tech Stack, Role, Outcome, links)
- All 12+ projects from resume included

## Experience Sub-Page (`/experience`)

- Full timeline with all entries and expanded descriptions
- Each: role, company, date, detailed description, tech used
- Education section at bottom (Chula CEDT, 2022-2026)
- Extracurricular activities (ISD, GDSC)

## Design Tokens

| Token | Value |
|-------|-------|
| Background | `#000000`, card surfaces `#0a0a0a` |
| Primary accent | `#ec4899` (pink) → `#a855f7` (purple) gradients |
| Text heading | `#ffffff` |
| Text body | `#9ca3af` (gray-400) |
| Text hover | `#d1d5db` (gray-300) |
| Glass effect | `bg-white/5 backdrop-blur-xl border border-white/10` |
| Typography | System font stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif`), headings 4xl-6xl, body base-lg |
| Border radius | `rounded-2xl` for cards, `rounded-full` for pills |

## Animations

- Scroll-reveal: fade-up with IntersectionObserver
- Hover: scale(1.02) on cards, glow border
- Gradient shift on headings
- Count-up on stats bar
- **Removed:** particles, sparkles, cursor follower, floating geometric shapes
- Respects `prefers-reduced-motion`

## Responsive Behavior

- **Mobile (< 640px):** Single column. Hero stacks vertically (image above text). Bento grid → single column. Stats bar wraps 2x2. Skills → 2 columns. Achievements horizontal scroll.
- **Tablet (640-1024px):** Hero split 50/50. Bento grid 2 columns. Skills 2 columns.
- **Desktop (> 1024px):** Full split hero. 2x2 bento. Skills 4 columns.

## Technical Migration

### Svelte 5 Runes

- `let x = 0` → `let x = $state(0)` for reactive state
- `$: derived = ...` → `const derived = $derived(...)`
- `$: if (condition) { ... }` → `$effect(() => { ... })`
- `onMount(() => { ... })` stays (still valid in Svelte 5)
- `on:click={fn}` → `onclick={fn}`
- `<slot />` → `{@render children?.()}`
- `export let prop` → `let { prop } = $props()`
- `bind:this` stays (still valid)

### SvelteKit

- `import { page } from '$app/stores'` → `import { page } from '$app/state'`
- `$page.status` → `page.status`
- `$page.url.pathname` → `page.url.pathname`

### Tailwind v4

- Upgrade `tailwindcss` to v4
- Remove `tailwind.config.ts` and `postcss.config.js`
- Replace `@import 'tailwindcss/base'; @import 'tailwindcss/components'; @import 'tailwindcss/utilities';` with `@import 'tailwindcss';`
- Move any theme extensions to `@theme { }` block in `app.css`
- **Drop `@tailwindcss/forms`** — no form elements used in the project
- **`@tailwindcss/typography`** — install `@tailwindcss/typography` v4-compatible version (`@tailwindcss/typography@next` or latest)
- **`@tailwindcss/container-queries`** — built into Tailwind v4 natively, remove the package
- Remove `autoprefixer` dev dependency (Tailwind v4 handles this)

## Data Layer (`src/lib/data.ts`)

### TypeScript Interfaces

```typescript
type ProjectCategory = 'data-science' | 'web-dev' | 'iot' | 'hackathon' | 'freelance';

interface Project {
  slug: string;
  name: string;
  description: string;       // short, for card
  explanation: string;        // detailed, for case study
  role: string;
  category: ProjectCategory;
  techStack: string[];
  link?: string;              // live site
  github?: string;
  image?: string;
  featured: boolean;          // appears on landing page
  placement?: string;         // e.g. "4th Place", "Finalist"
}

interface Experience {
  year: string;
  role: string;
  company: string;
  description: string;
  techUsed?: string[];
  featured: boolean;          // appears on landing condensed view
  type: 'internship' | 'freelance' | 'academic' | 'extracurricular';
}

interface Hackathon {
  name: string;
  placement: string;          // "4th Place", "7th Place", "Finalist"
  year: string;
  description: string;
  icon: 'trophy' | 'medal' | 'star';
}

interface SkillCategory {
  name: string;
  skills: string[];
}

interface Education {
  institution: string;
  degree: string;
  location: string;
  period: string;
}
```

### Data Updates

- `heroData` — update name to "Jirameth Wannasiwaporn", subtitle to "Developer / Designer / Data Scientist", buttons to "View Projects" (`/projects`) and "Get in Touch" (`#connect`)
- `projects[]` — expand to all 12+ projects with `category`, `techStack`, `featured`, `slug`, `placement` fields
- `experiences[]` — all entries with `featured`, `type`, `techUsed` fields
- `hackathons[]` — separate array for achievement cards
- `skillCategories[]` — 4 groups: Languages (C, C++, Python, Java, JS, TS, Dart, Go), Frameworks (Express, Quarkus, React, React-Native, Flutter, Astro, Next.js, Svelte, Vue, Streamlit, Flask, FastAPI, ThreeJS), Tools & Cloud (VS Code, IntelliJ, Postman, Figma, PowerBI, Blender, Docker, GCP, AWS, MongoDB, PostgreSQL, MySQL, Git), Data & ML (Transformers, AutoGluon, Pandas, Polars, Spark, Kafka, Scikit-learn)
- `contacts{}` — keep existing (no phone on public site)
- `education` — Chula CEDT, 2022-2026
- `floatingElements` — remove from data.ts (no longer used)

## New Routes

- `/projects/+page.svelte` — Projects grid with filters + CaseStudy modal
- `/experience/+page.svelte` — Full experience timeline + education

## Cleanup

- Remove `src/routes/copy.svelte` (dev artifact)
- Remove `src/routes/test/+page.svelte` (dev page)
- Remove `floatingElements` export from `data.ts`
- Remove duplicate Navbar render from `+page.svelte` (lives in layout only)

## Components (New/Modified)

| Component | Status | Purpose |
|-----------|--------|---------|
| `Hero.svelte` | New | Split layout hero |
| `StatsBar.svelte` | New | Glassmorphic stats counter |
| `FeaturedProjects.svelte` | New | 2x2 bento grid for landing |
| `ExperienceTimeline.svelte` | New | Reusable timeline (condensed + full modes) |
| `SkillsGrid.svelte` | New | 4-column grouped skills |
| `Achievements.svelte` | New | Horizontal scrollable award cards |
| `ConnectSection.svelte` | New | Contact CTA + socials (replaces letsconnect.svelte) |
| `ProjectCard.svelte` | New | Reusable bento card |
| `CaseStudy.svelte` | New | Modal overlay for project details |
| `FilterBar.svelte` | New | Category filter pills |
| `Footer.svelte` | New | Extracted from +page.svelte |
| `navbar.svelte` | Modified | Updated routes, Svelte 5 migration |
| `InfiniteScrollTech.svelte` | Modified | Svelte 5 migration, refined |
| `herosection.svelte` | Remove | Replaced by Hero.svelte |
| `aboutme.svelte` | Remove | Content absorbed into Hero + landing sections |
| `letsconnect.svelte` | Remove | Replaced by ConnectSection.svelte |
