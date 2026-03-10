# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign ChulinFolio3 into a polished, editorial dark portfolio with hybrid page structure, expanded resume content, Svelte 5 runes, and Tailwind v4.

**Architecture:** Hybrid SvelteKit app — landing page with highlights, `/projects` sub-page with bento grid + case study modals, `/experience` sub-page with full timeline. All data centralized in `src/lib/data.ts` with TypeScript interfaces. Components are small, focused Svelte 5 files using runes.

**Tech Stack:** SvelteKit 2, Svelte 5 (runes), Tailwind CSS v4, TypeScript, Vercel deployment

**Spec:** `docs/superpowers/specs/2026-03-11-portfolio-redesign-design.md`

---

## Chunk 1: Infrastructure — Tailwind v4 + Svelte 5 Migration

Foundation work. Nothing visual changes yet — just get the build working on the new stack.

### Task 1: Upgrade Tailwind CSS to v4

**Files:**
- Modify: `package.json`
- Modify: `src/app.css`
- Remove: `tailwind.config.ts`
- Remove: `postcss.config.js`

- [ ] **Step 1: Install Tailwind v4 and remove v3 packages**

```bash
npm uninstall tailwindcss autoprefixer postcss @tailwindcss/forms @tailwindcss/container-queries @tailwindcss/typography
npm install tailwindcss@latest @tailwindcss/vite@latest
npm install @tailwindcss/typography@latest
```

- [ ] **Step 2: Update `vite.config.ts` to use Tailwind v4 vite plugin**

```typescript
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()]
});
```

- [ ] **Step 3: Replace `src/app.css` Tailwind imports**

Replace the top 3 lines:
```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

With:
```css
@import 'tailwindcss';
```

- [ ] **Step 4: Remove old config files**

```bash
rm tailwind.config.ts postcss.config.js
```

- [ ] **Step 5: Run dev server to verify build**

```bash
npm run dev
```
Expected: Dev server starts without errors. Styles may look different due to Tailwind v4 defaults — that's OK, we'll fix in later tasks.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: upgrade Tailwind CSS to v4 with vite plugin"
```

### Task 2: Migrate `+layout.svelte` to Svelte 5

**Files:**
- Modify: `src/routes/+layout.svelte`

- [ ] **Step 1: Migrate layout to runes and $app/state**

Replace entire `src/routes/+layout.svelte` with:

```svelte
<script lang="ts">
	import '../app.css';
	import Navbar from '../components/navbar.svelte';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		if (typeof window === 'undefined') return;
		const token = import.meta.env.VITE_TINYBIRD_TOKEN;
		const host = import.meta.env.VITE_TINYBIRD_HOST || 'https://api.europe-west2.gcp.tinybird.co';
		if (!token) return;

		const s = document.createElement('script');
		s.defer = true;
		s.src = 'https://unpkg.com/@tinybirdco/flock.js';
		s.setAttribute('data-token', token);
		s.setAttribute('data-host', host);
		s.setAttribute('web-vitals', 'true');
		document.head.appendChild(s);
	});
</script>

{#if !page.status || page.status < 400}
	<Navbar />
{/if}

{@render children?.()}
```

- [ ] **Step 2: Verify dev server runs**

```bash
npm run dev
```
Expected: Page loads with navbar, no console errors about `$app/stores`.

- [ ] **Step 3: Commit**

```bash
git add src/routes/+layout.svelte
git commit -m "refactor: migrate +layout.svelte to Svelte 5 runes and \$app/state"
```

### Task 3: Create shared `revealOnScroll` action + placeholder routes

**Files:**
- Create: `src/lib/actions.ts`
- Create: `src/routes/projects/+page.svelte` (placeholder)
- Create: `src/routes/experience/+page.svelte` (placeholder)

- [ ] **Step 1: Create shared Svelte action for scroll-reveal**

```typescript
// src/lib/actions.ts
export function revealOnScroll(node: HTMLElement) {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('revealed');
				}
			});
		},
		{ threshold: 0.1 }
	);
	observer.observe(node);
	return { destroy() { observer.disconnect(); } };
}
```

- [ ] **Step 2: Create placeholder sub-pages (avoid 404s during development)**

```svelte
<!-- src/routes/projects/+page.svelte -->
<div class="min-h-screen bg-black pt-24 text-white text-center">
	<h1 class="text-4xl font-bold">Projects — Coming Soon</h1>
</div>
```

```svelte
<!-- src/routes/experience/+page.svelte -->
<div class="min-h-screen bg-black pt-24 text-white text-center">
	<h1 class="text-4xl font-bold">Experience — Coming Soon</h1>
</div>
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/actions.ts src/routes/projects/+page.svelte src/routes/experience/+page.svelte
git commit -m "feat: add shared revealOnScroll action and placeholder sub-pages"
```

### Task 3b: Migrate `navbar.svelte` to Svelte 5

**Files:**
- Modify: `src/components/navbar.svelte`

- [ ] **Step 1: Migrate navbar to runes, update routes**

Note: `$lib/analytics` exists at `src/lib/analytics/index.ts` — keep the tracking imports as-is.

Key changes:
- `import { page } from '$app/stores'` → `import { page } from '$app/state'`
- `$page.url.pathname` → `page.url.pathname`
- `$: if (mounted && $page.url.pathname)` → `$effect(() => { ... })`
- `on:click={(event) => handleNavClick(event, item)}` → `onclick={(event) => handleNavClick(event, item)}`
- Update `items` array: replace `/activities` with `/experience`, remove `/artwork`

Route items become:
```typescript
const items = [
  { href: '/', label: 'Home', svg: `...` },
  { href: '/projects', label: 'Projects', svg: `...` },
  { href: '/experience', label: 'Experience', svg: `...` }
];
```

Reactive block becomes:
```typescript
let mounted = $state(false);
let activeIndicatorEl: HTMLElement;
let navEl: HTMLElement;
let currentPath = $state('');

$effect(() => {
  if (mounted && page.url.pathname) {
    const newPath = page.url.pathname;
    if (currentPath && newPath !== currentPath) {
      trackNavigation(currentPath, newPath, 'navigation');
    }
    currentPath = newPath;
    setTimeout(updateActiveIndicator, 100);
  }
});
```

Template changes:
- `class:active={$page.url.pathname === item.href}` → `class:active={page.url.pathname === item.href}`
- `aria-current={$page.url.pathname === item.href ? 'page' : undefined}` → `aria-current={page.url.pathname === item.href ? 'page' : undefined}`
- `on:click` → `onclick`
- `{#if !$page.status || $page.status < 400}` → remove (navbar visibility handled by layout)

- [ ] **Step 2: Verify navbar works**

```bash
npm run dev
```
Expected: Navbar renders with 3 items (Home, Projects, Experience). Active indicator works on `/`.

- [ ] **Step 3: Commit**

```bash
git add src/components/navbar.svelte
git commit -m "refactor: migrate navbar to Svelte 5 runes, update routes"
```

### Task 4: Expand data layer with TypeScript interfaces

**Files:**
- Modify: `src/lib/data.ts`

- [ ] **Step 1: Add TypeScript interfaces and expand all data**

Add at top of `src/lib/data.ts`:

```typescript
export type ProjectCategory = 'data-science' | 'web-dev' | 'iot' | 'hackathon' | 'freelance';

export interface Project {
	slug: string;
	name: string;
	description: string;
	explanation: string;
	role: string;
	category: ProjectCategory;
	techStack: string[];
	link?: string;
	github?: string;
	image?: string;
	featured: boolean;
	placement?: string;
}

export interface Experience {
	year: string;
	role: string;
	company: string;
	description: string;
	techUsed?: string[];
	featured: boolean;
	type: 'internship' | 'freelance' | 'academic' | 'extracurricular';
}

export interface Hackathon {
	name: string;
	placement: string;
	year: string;
	description: string;
	icon: 'trophy' | 'medal' | 'star';
}

export interface SkillCategory {
	name: string;
	skills: string[];
}

export interface Education {
	institution: string;
	degree: string;
	location: string;
	period: string;
}
```

Update `heroData`:
```typescript
export const heroData = {
	name: 'Jirameth Wannasiwaporn',
	nickname: 'An-An',
	title: 'Developer / Designer / Data Scientist',
	subtitle: '3rd Year CEDT, Chulalongkorn University',
	objective: 'Building intelligent, scalable systems at the intersection of AI/ML and modern infrastructure.',
	buttons: {
		primary: { text: 'View Projects', href: '/projects' },
		secondary: { text: 'Get in Touch', href: '#connect' }
	}
};
```

Expand `projects` array to include all 12+ projects from resume with proper `Project` interface fields. Each project needs: `slug`, `name`, `description`, `explanation`, `role`, `category`, `techStack`, `featured`, and optional `link`, `github`, `image`, `placement`.

Add `hackathons` array:
```typescript
export const hackathons: Hackathon[] = [
	{ name: 'AiHack 2025 by AIFUL', placement: '4th Place', year: '2025', description: 'Loan repayment prediction model using AutoGluon', icon: 'trophy' },
	{ name: 'Cyber Top Talent 2025', placement: '7th / 500+ teams', year: '2025', description: 'Reverse engineering, web exploitation, cryptography', icon: 'medal' },
	{ name: 'ITMX Hack to the Max 2025', placement: 'Finalist (Top 15/200+)', year: '2025', description: 'Thailand Deferred Payment architecture', icon: 'star' },
	{ name: 'AiHack 2023 by AIFUL', placement: '4th Place', year: '2023', description: 'Loan repayment success prediction', icon: 'trophy' }
];
```

Add `skillCategories`:
```typescript
export const skillCategories: SkillCategory[] = [
	{ name: 'Languages', skills: ['C', 'C++', 'Python', 'Java', 'JavaScript', 'TypeScript', 'Dart', 'Go'] },
	{ name: 'Frameworks', skills: ['React', 'Next.js', 'Svelte', 'Vue', 'React-Native', 'Flutter', 'Astro', 'Express', 'FastAPI', 'Flask', 'Quarkus', 'Streamlit', 'ThreeJS'] },
	{ name: 'Tools & Cloud', skills: ['Docker', 'GCP', 'AWS', 'Git', 'Figma', 'PowerBI', 'Postman', 'Blender', 'MongoDB', 'PostgreSQL', 'MySQL'] },
	{ name: 'Data & ML', skills: ['AutoGluon', 'Scikit-learn', 'Transformers', 'Pandas', 'Polars', 'Spark', 'Kafka'] }
];
```

Add `education`:
```typescript
export const education: Education = {
	institution: 'Chulalongkorn University',
	degree: 'B.Eng. Computer Engineering and Digital Technology (CEDT)',
	location: 'Bangkok, Thailand',
	period: '2022 — 2026 (Expected)'
};
```

Add `stats`:
```typescript
export const stats = [
	{ label: 'Internships', value: 3, suffix: '+' },
	{ label: 'Projects', value: 12, suffix: '+' },
	{ label: 'Hackathon Awards', value: 4, suffix: '' },
	{ label: 'CTT 2025', value: 7, suffix: 'th / 500+' }
];
```

Update `experiences` array: add `featured`, `type`, `techUsed` fields to each entry. Mark SCB, AIFUL, BBL, Freelance as `featured: true`.

**Keep:** `badges` array (used by Hero component), `contacts` object (used by ConnectSection).

**Remove these old exports** (replaced by new typed equivalents):
- `floatingElements` — no longer used (particles removed)
- `skills` — replaced by `skillCategories`
- `tools` — absorbed into `skillCategories`
- `programmingLanguages` — replaced by `skillCategories.Languages` + InfiniteScrollTech data

**Update `heroData`** to match spec (see updated definition above). Old `heroData` has stale name/buttons.

- [ ] **Step 2: Run type check**

```bash
npm run check
```
Expected: No type errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/data.ts
git commit -m "feat: expand data layer with TypeScript interfaces and full resume content"
```

---

## Chunk 2: Landing Page Components

Build all new components for the landing page. Each component is self-contained.

### Task 5: Create Hero component

**Files:**
- Create: `src/components/Hero.svelte`

- [ ] **Step 1: Create Hero.svelte**

Split layout hero with gradient text, CTAs, profile image, badge chips. Uses `heroData` and `badges` from data.ts. All Svelte 5 syntax. Responsive: stacks vertically on mobile.

Key structure:
```svelte
<script lang="ts">
	import { heroData, badges } from '$lib/data';
	import Chulinpic_bg from '../public/Chulinpicwithbg.png';
</script>

<section class="relative min-h-screen flex items-center">
	<!-- gradient mesh background -->
	<div class="absolute inset-0 overflow-hidden">
		<div class="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-pink-500/20 blur-[120px]"></div>
		<div class="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-purple-500/15 blur-[100px]"></div>
	</div>

	<div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
			<!-- Left: Text -->
			<div>
				<h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold">
					<span class="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent">
						{heroData.name}
					</span>
				</h1>
				<p class="mt-4 text-xl text-gray-300">{heroData.title}</p>
				<p class="mt-2 text-base text-gray-400">{heroData.subtitle}</p>
				<p class="mt-6 text-lg text-gray-400 leading-relaxed">{heroData.objective}</p>

				<!-- Badge chips -->
				<div class="mt-6 flex flex-wrap gap-2">
					{#each badges as badge}
						<span class="px-3 py-1 rounded-full text-sm border border-pink-400/20 bg-pink-400/10 text-pink-300">
							{badge}
						</span>
					{/each}
				</div>

				<!-- CTAs -->
				<div class="mt-8 flex gap-4">
					<a href={heroData.buttons.primary.href}
						class="px-6 py-3 rounded-full bg-pink-500 text-white font-medium hover:bg-pink-400 transition-colors">
						{heroData.buttons.primary.text}
					</a>
					<a href={heroData.buttons.secondary.href}
						class="px-6 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors">
						{heroData.buttons.secondary.text}
					</a>
				</div>
			</div>

			<!-- Right: Profile image -->
			<div class="flex justify-center lg:justify-end">
				<div class="relative">
					<div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-400/20 to-purple-400/20 blur-xl"></div>
					<div class="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl">
						<img src={Chulinpic_bg} alt="Jirameth Wannasiwaporn" class="w-full max-w-md object-cover" />
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
```

- [ ] **Step 2: Verify component renders**

Import in `+page.svelte` temporarily, check dev server.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.svelte
git commit -m "feat: add Hero component with split layout"
```

### Task 6: Create StatsBar component

**Files:**
- Create: `src/components/StatsBar.svelte`

- [ ] **Step 1: Create StatsBar.svelte**

Glassmorphic horizontal bar with animated count-up using `$effect` and IntersectionObserver. Uses `stats` from data.ts.

Key features:
- Each stat animates from 0 to target value when scrolled into view
- Glassmorphic container: `bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl`
- Responsive: 2x2 grid on mobile, horizontal on desktop

- [ ] **Step 2: Commit**

```bash
git add src/components/StatsBar.svelte
git commit -m "feat: add StatsBar component with count-up animation"
```

### Task 7: Create FeaturedProjects bento grid

**Files:**
- Create: `src/components/ProjectCard.svelte`
- Create: `src/components/FeaturedProjects.svelte`

- [ ] **Step 1: Create ProjectCard.svelte**

Reusable card component. Props via `$props()`: `project: Project`, `size: 'large' | 'tall' | 'standard'`. Shows name, role tag, tech stack pills. Hover: scale(1.02) + pink glow border. Hackathon projects show placement ribbon.

- [ ] **Step 2: Create FeaturedProjects.svelte**

Filters `projects.filter(p => p.featured)` and renders in 2x2 asymmetric CSS grid:
```css
.bento-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  grid-template-rows: auto auto;
  gap: 1.5rem;
}
```
First card spans full height of first column (large), second column has two stacked cards. Link to `/projects` below.

Mobile: single column stack.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectCard.svelte src/components/FeaturedProjects.svelte
git commit -m "feat: add FeaturedProjects bento grid and ProjectCard component"
```

### Task 8: Create ExperienceTimeline component

**Files:**
- Create: `src/components/ExperienceTimeline.svelte`

- [ ] **Step 1: Create ExperienceTimeline.svelte**

Props: `let { condensed = false } = $props()`. When `condensed: true`, filters to `experiences.filter(e => e.featured)` and shows "See Full Experience →" link. When `false`, shows all entries.

Vertical timeline with pink gradient line on left. Each entry: date badge, role (bold), company (italic), description, optional tech pills. Scroll-reveal animation.

- [ ] **Step 2: Commit**

```bash
git add src/components/ExperienceTimeline.svelte
git commit -m "feat: add ExperienceTimeline component with condensed mode"
```

### Task 9: Create SkillsGrid component

**Files:**
- Create: `src/components/SkillsGrid.svelte`

- [ ] **Step 1: Create SkillsGrid.svelte**

4-column grid using `skillCategories` from data.ts. Each category: heading + list of skill pills. Responsive: 2 cols on tablet, 1 col on mobile. Below the grid, render `<InfiniteScrollTech />`.

- [ ] **Step 2: Commit**

```bash
git add src/components/SkillsGrid.svelte
git commit -m "feat: add SkillsGrid component with categorized skills"
```

### Task 10: Create Achievements component

**Files:**
- Create: `src/components/Achievements.svelte`

- [ ] **Step 1: Create Achievements.svelte**

Horizontal scrollable row of achievement cards using `hackathons` from data.ts. Each card: icon (trophy/medal/star SVG), placement text, event name, year. Glassmorphic card style. `overflow-x-auto` with snap scrolling.

- [ ] **Step 2: Commit**

```bash
git add src/components/Achievements.svelte
git commit -m "feat: add Achievements horizontal scroll component"
```

### Task 11: Create ConnectSection component

**Files:**
- Create: `src/components/ConnectSection.svelte`

- [ ] **Step 1: Create ConnectSection.svelte**

Centered CTA section with `id="connect"` (anchor target from hero). Title: "Let's build something together". Social icon row from `contacts` data. "Currently Available" badge with green dot. Language line: "English (B2) · Japanese (N4)".

- [ ] **Step 2: Commit**

```bash
git add src/components/ConnectSection.svelte
git commit -m "feat: add ConnectSection component"
```

### Task 12: Create Footer component

**Files:**
- Create: `src/components/Footer.svelte`

- [ ] **Step 1: Create Footer.svelte**

Extract footer from current `+page.svelte`. Simplified: branding left ("Chulinxz" gradient text, tagline), social icons right, copyright bottom. Remove coffee counter and konami code easter egg. Clean, minimal. Use Svelte 5 syntax.

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.svelte
git commit -m "feat: add Footer component"
```

### Task 13: Migrate InfiniteScrollTech to Svelte 5

**Files:**
- Modify: `src/components/InfiniteScrollTech.svelte`

- [ ] **Step 1: Migrate to runes**

- `export let` → `$props()`
- `on:` events → native event handlers
- Any `$:` → `$derived` or `$effect`

- [ ] **Step 2: Move scroll animation CSS into component's scoped `<style>` block**

The following classes from `app.css` are used ONLY by InfiniteScrollTech and will be removed in Task 17. Move them into the component's `<style>`:

```css
@keyframes scroll-left {
	0% { transform: translateX(0); }
	100% { transform: translateX(-50%); }
}
@keyframes scroll-right {
	0% { transform: translateX(-50%); }
	100% { transform: translateX(0); }
}
.scroll-animation { animation: scroll-left 20s linear infinite; }
.scroll-animation-right { animation: scroll-left 25s linear infinite; }
.scroll-animation-left { animation: scroll-right 25s linear infinite; }
.scroll-animation:hover, .scroll-animation-right:hover, .scroll-animation-left:hover {
	animation-play-state: paused;
}
.fade-mask {
	mask-image: linear-gradient(to right, rgba(0,0,0,0) 0%, rgb(0,0,0) 12.5%, rgb(0,0,0) 87.5%, rgba(0,0,0,0) 100%);
	-webkit-mask-image: linear-gradient(to right, rgba(0,0,0,0) 0%, rgb(0,0,0) 12.5%, rgb(0,0,0) 87.5%, rgba(0,0,0,0) 100%);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/InfiniteScrollTech.svelte
git commit -m "refactor: migrate InfiniteScrollTech to Svelte 5 runes, scope CSS"
```

---

## Chunk 3: Assemble Landing Page + Sub-Pages

Wire everything together.

### Task 14: Rewrite landing page (`+page.svelte`)

**Files:**
- Modify: `src/routes/+page.svelte`

- [ ] **Step 1: Replace entire +page.svelte**

Remove all existing content. Import and compose new components:

```svelte
<script lang="ts">
	import Hero from '../components/Hero.svelte';
	import StatsBar from '../components/StatsBar.svelte';
	import FeaturedProjects from '../components/FeaturedProjects.svelte';
	import ExperienceTimeline from '../components/ExperienceTimeline.svelte';
	import SkillsGrid from '../components/SkillsGrid.svelte';
	import Achievements from '../components/Achievements.svelte';
	import ConnectSection from '../components/ConnectSection.svelte';
	import Footer from '../components/Footer.svelte';
</script>

<div class="bg-black">
	<Hero />
	<StatsBar />
	<FeaturedProjects />
	<ExperienceTimeline condensed={true} />
	<SkillsGrid />
	<Achievements />
	<ConnectSection />
	<Footer />
</div>
```

No duplicate Navbar (already in layout). No inline styles block (animations moved to app.css or component-scoped). No particles/sparkles/cursor follower.

- [ ] **Step 2: Verify full landing page renders**

```bash
npm run dev
```
Expected: All sections render in order. Scroll-reveal animations work. No console errors.

- [ ] **Step 3: Commit**

```bash
git add src/routes/+page.svelte
git commit -m "feat: rewrite landing page with new component composition"
```

### Task 15: Create Projects sub-page

**Files:**
- Create: `src/routes/projects/+page.svelte`
- Create: `src/components/FilterBar.svelte`
- Create: `src/components/CaseStudy.svelte`

- [ ] **Step 1: Create FilterBar.svelte**

Props: `let { categories, active, onSelect } = $props()`. Renders horizontal pill buttons. Active pill gets pink fill. Uses `onclick` to call `onSelect(category)`.

- [ ] **Step 2: Create CaseStudy.svelte**

Modal overlay component. Props: `let { project, onClose } = $props()`. Backdrop with `bg-black/80 backdrop-blur-sm`. Content card with: project name, role, category badge, description (full explanation), tech stack pills, links (GitHub, Live site), placement ribbon if applicable. Close button and click-outside-to-close.

- [ ] **Step 3: Create projects/+page.svelte**

```svelte
<script lang="ts">
	import { projects } from '$lib/data';
	import type { Project, ProjectCategory } from '$lib/data';
	import ProjectCard from '../../components/ProjectCard.svelte';
	import FilterBar from '../../components/FilterBar.svelte';
	import CaseStudy from '../../components/CaseStudy.svelte';
	import Footer from '../../components/Footer.svelte';

	const categories = ['all', 'data-science', 'web-dev', 'iot', 'hackathon', 'freelance'] as const;
	let activeFilter = $state<string>('all');
	let selectedProject = $state<Project | null>(null);

	const filtered = $derived(
		activeFilter === 'all' ? projects : projects.filter(p => p.category === activeFilter)
	);
</script>

<div class="min-h-screen bg-black pt-24 pb-12">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<h1 class="text-4xl sm:text-5xl font-bold text-white mb-8">Projects</h1>
		<FilterBar {categories} active={activeFilter} onSelect={(c) => activeFilter = c} />
		<div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each filtered as project}
				<ProjectCard {project} size="standard" onclick={() => selectedProject = project} />
			{/each}
		</div>
	</div>
	<Footer />
</div>

{#if selectedProject}
	<CaseStudy project={selectedProject} onClose={() => selectedProject = null} />
{/if}
```

- [ ] **Step 4: Verify projects page works**

Navigate to `/projects` in dev server. Check: filter pills work, cards render, clicking opens modal, closing modal works.

- [ ] **Step 5: Commit**

```bash
git add src/routes/projects/+page.svelte src/components/FilterBar.svelte src/components/CaseStudy.svelte
git commit -m "feat: add Projects sub-page with filters and case study modal"
```

### Task 16: Create Experience sub-page

**Files:**
- Create: `src/routes/experience/+page.svelte`

- [ ] **Step 1: Create experience/+page.svelte**

```svelte
<script lang="ts">
	import ExperienceTimeline from '../../components/ExperienceTimeline.svelte';
	import Footer from '../../components/Footer.svelte';
	import { education } from '$lib/data';
</script>

<div class="min-h-screen bg-black pt-24 pb-12">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<h1 class="text-4xl sm:text-5xl font-bold text-white mb-12">Experience</h1>
		<ExperienceTimeline condensed={false} />

		<!-- Education -->
		<div class="mt-20">
			<h2 class="text-3xl font-bold text-white mb-8">Education</h2>
			<div class="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl p-8">
				<h3 class="text-xl font-bold text-white">{education.institution}</h3>
				<p class="mt-2 text-pink-300">{education.degree}</p>
				<p class="mt-1 text-gray-400">{education.location} · {education.period}</p>
			</div>
		</div>
	</div>
	<Footer />
</div>
```

- [ ] **Step 2: Verify experience page**

Navigate to `/experience`. Full timeline renders. Education section shows.

- [ ] **Step 3: Commit**

```bash
git add src/routes/experience/+page.svelte
git commit -m "feat: add Experience sub-page with full timeline and education"
```

---

## Chunk 4: Cleanup + Polish

### Task 17: Update `app.css` for Tailwind v4

**Files:**
- Modify: `src/app.css`

- [ ] **Step 1: Clean up app.css**

Keep only: Tailwind import, `@theme` block if needed, scroll-reveal animation keyframes, reduced-motion/high-contrast media queries. Remove all old animation classes that are now component-scoped or no longer used (particles, sparkles, floating-element, etc.).

Minimal `app.css`:
```css
@import 'tailwindcss';

/* Scroll reveal */
@keyframes reveal-up {
	from { opacity: 0; transform: translateY(30px); }
	to { opacity: 1; transform: translateY(0); }
}

.reveal-up { opacity: 0; animation: reveal-up 0.8s ease forwards; }
.revealed { opacity: 1 !important; transform: translate(0, 0) !important; transition: all 0.8s ease !important; }

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
	* { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
}

html { scroll-behavior: smooth; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; background-color: #000; color: #fff; }
```

- [ ] **Step 2: Commit**

```bash
git add src/app.css
git commit -m "refactor: clean up app.css for Tailwind v4"
```

### Task 17b: Migrate `+error.svelte` to Svelte 5

**Files:**
- Modify: `src/routes/+error.svelte`

- [ ] **Step 1: Migrate error page to runes**

Key changes:
- `import { page } from '$app/stores'` → `import { page } from '$app/state'`
- `$: error = $page.error` → `const error = $derived(page.error)`
- `$: status = $page.status` → `const status = $derived(page.status)`
- `$: currentError = ...` → `const currentError = $derived(...)`
- `on:click` → `onclick`
- `let mounted = false` → `let mounted = $state(false)`
- `let mouseX = 0` etc. → `let mouseX = $state(0)` etc.

- [ ] **Step 2: Verify error page**

Navigate to a non-existent route (e.g. `/nonexistent`) to trigger the error page.

- [ ] **Step 3: Commit**

```bash
git add src/routes/+error.svelte
git commit -m "refactor: migrate +error.svelte to Svelte 5 runes"
```

### Task 17c: Add SEO meta tags to all pages

**Files:**
- Modify: `src/routes/+page.svelte`
- Modify: `src/routes/projects/+page.svelte`
- Modify: `src/routes/experience/+page.svelte`

- [ ] **Step 1: Add `<svelte:head>` to each page**

Landing page:
```svelte
<svelte:head>
	<title>Jirameth Wannasiwaporn — Developer / Designer / Data Scientist</title>
	<meta name="description" content="Portfolio of Jirameth Wannasiwaporn (An-An) — Full-stack developer, UX/UI designer, and data scientist at Chulalongkorn University." />
</svelte:head>
```

Projects page:
```svelte
<svelte:head>
	<title>Projects — Jirameth Wannasiwaporn</title>
	<meta name="description" content="Featured projects in data science, web development, IoT, and hackathons by Jirameth Wannasiwaporn." />
</svelte:head>
```

Experience page:
```svelte
<svelte:head>
	<title>Experience — Jirameth Wannasiwaporn</title>
	<meta name="description" content="Work experience, internships, and education of Jirameth Wannasiwaporn." />
</svelte:head>
```

- [ ] **Step 2: Commit**

```bash
git add src/routes/+page.svelte src/routes/projects/+page.svelte src/routes/experience/+page.svelte
git commit -m "feat: add SEO meta tags to all pages"
```

### Task 18: Remove old files

**Files:**
- Remove: `src/routes/copy.svelte`
- Remove: `src/routes/test/+page.svelte`
- Remove: `src/components/herosection.svelte`
- Remove: `src/components/aboutme.svelte`
- Remove: `src/components/letsconnect.svelte`

- [ ] **Step 1: Delete deprecated files**

```bash
rm src/routes/copy.svelte
rm src/routes/test/+page.svelte
rm src/components/herosection.svelte
rm src/components/aboutme.svelte
rm src/components/letsconnect.svelte
```

- [ ] **Step 2: Verify no broken imports**

```bash
npm run check
```
Expected: No errors about missing modules.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove deprecated components and dev pages"
```

### Task 19: Final build verification

- [ ] **Step 1: Run type check**

```bash
npm run check
```
Expected: Clean, no errors.

- [ ] **Step 2: Run lint**

```bash
npm run lint
```
Expected: Clean or only pre-existing warnings.

- [ ] **Step 3: Run production build**

```bash
npm run build
```
Expected: Build succeeds, no errors.

- [ ] **Step 4: Preview production build**

```bash
npm run preview
```
Expected: All pages render correctly. Navigation works between `/`, `/projects`, `/experience`.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: final build verification pass"
```

---

## Chunk Summary

| Chunk | Tasks | Purpose |
|-------|-------|---------|
| 1: Infrastructure | 1-4 (incl. 3, 3b) | Tailwind v4, Svelte 5 migration, shared actions, placeholder routes, data layer |
| 2: Components | 5-13 | All new/modified landing page components (with scoped CSS migration) |
| 3: Assembly | 14-16 | Wire landing page + create sub-pages |
| 4: Cleanup | 17-19 (incl. 17b, 17c) | CSS cleanup, error page migration, SEO meta tags, remove old files, final build |

**Total:** 22 tasks, ~60 steps

**Design tools:** Use `@ui-ux-pro-max` skill and stitch.ai / 21st.dev MCP tools during component creation (Tasks 5-12) for high-quality visual output and component inspiration.

**Notes:**
- Images live in `src/public/` (non-standard but project convention). Import with relative paths from components: `../public/filename.png`
- `src/lib/analytics/` module exists and works — keep all tracking imports as-is
- `/projects` and `/experience` have placeholder pages from Task 3 to avoid 404s during development
- `revealOnScroll` shared action in `src/lib/actions.ts` — import in any component that needs scroll-reveal
