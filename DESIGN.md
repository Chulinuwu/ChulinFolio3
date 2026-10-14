---
name: Chulin's Notebook
description: A data scientist's research notebook on a plain white page, written in graphite and one pink marker.
colors:
  page: "#ffffff"
  ink: "#2f2629"
  ink-soft: "#5a4d51"
  ink-muted: "#75666b"
  ink-line: "rgb(47 38 41 / 0.82)"
  grid: "rgb(60 80 120 / 0.22)"
  pink: "#cc3d63"
  pink-deep: "#ad2f51"
  pink-wash: "#fdebf0"
typography:
  display:
    fontFamily: "The Girl Next Door, Segoe Print, cursive"
    fontSize: "clamp(4rem, 7vw, 6.4rem)"
    fontWeight: 400
    lineHeight: 0.9
  headline:
    fontFamily: "The Girl Next Door, Segoe Print, cursive"
    fontSize: "clamp(3.2rem, 6.4vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.01em"
  title:
    fontFamily: "The Girl Next Door, Segoe Print, cursive"
    fontSize: "clamp(1.8rem, 2.4vw, 2.3rem)"
    fontWeight: 400
    lineHeight: 1
  title-small:
    fontFamily: "The Girl Next Door, Segoe Print, cursive"
    fontSize: "1.6rem"
    fontWeight: 400
    lineHeight: 1
  marker:
    fontFamily: "The Girl Next Door, Segoe Print, cursive"
    fontSize: "1.3rem"
    fontWeight: 400
    lineHeight: 1
  margin-note:
    fontFamily: "The Girl Next Door, Segoe Print, cursive"
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 1.15
  body:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  body-strong:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 600
    lineHeight: 1.375
  label:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.375
  caption:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  focus: "4px"
  frame: "6px"
  tab: "14px"
spacing:
  row: "16px"
  block: "40px"
  zone: "48px"
  section: "80px"
  gutter-start: "48px"
  gutter-tabs: "112px"
  grid-cell: "24px"
components:
  index-tab:
    backgroundColor: "{colors.page}"
    textColor: "{colors.pink}"
    typography: "{typography.marker}"
    rounded: "{rounded.tab}"
    padding: "24px 12px"
  index-tab-hover:
    backgroundColor: "{colors.pink-wash}"
    textColor: "{colors.pink}"
  index-tab-active:
    backgroundColor: "{colors.pink}"
    textColor: "{colors.page}"
  marker-link:
    textColor: "{colors.pink}"
    typography: "{typography.marker}"
  marker-link-hover:
    textColor: "{colors.pink-deep}"
  framed-image:
    backgroundColor: "{colors.page}"
    rounded: "{rounded.frame}"
  ruled-row:
    textColor: "{colors.ink-soft}"
    typography: "{typography.body}"
    padding: "16px 0"
---

# Design System: Chulin's Notebook

## Overview

**Creative North Star: "The Open Research Notebook"**

The site is one white notebook page, open to today. Data and drawing share the same sheet: a ledger of real roles with date tracks shares the page with the owner's own avatar drawing, real product screenshots sit in thin ink frames, and headings are lettered by hand. The paper costume is gone. There is no tape, no torn edges, no texture, no shadow. The only notebook cue in the ground is a faint dot grid (1.1px dots on a 24px cell); everything else is ink on white.

Density is calm and editorial. Content runs in two unequal columns on wide screens and stacks to one on phones, with generous air between zones. Graphite carries all reading; a single pink marker carries everything you can click. Hand lettering is the voice of the page (names, headings, links, margin notes) while lists, facts and prose stay in a clean humanist sans so the data reads as data.

Navigation is a set of flat index tabs fixed to the right edge. Moving between tabs turns the page sideways in the direction of the tab order; nothing else on the site performs. Home opens on a photoreal MacBook Pro (WebGL, studio lighting) resting on the dot grid, its screen showing the live page; it leans toward the mouse, and scrolling flies the camera into the screen until the page fills the window and the laptop fades away. The ground itself is alive: the dot grid is a WebGL point field whose dots part around the mouse, warm to pink near it and ripple outward on a press. The hero name is a heavy uppercase wordmark printed as a halftone of the grid itself: inside the letters the page dots swell in a wave, a pink lens magnifies them under the mouse, and scrolling lets them shrink back into plain grid dots. Selected work is a deck of large sticky cards that stack as you scroll. Headings arrive letter by letter with the pencil underline drawing in after them; content is uncovered by the scroll; framed images lean toward the mouse. Reduced motion renders every final state and keeps the static CSS grid.

**Key Characteristics:**
- White page, dot-grid ground, graphite ink, one pink marker.
- Hand lettering for voice, Figtree for data and prose.
- Thin 1.5px ink frames with a slight tilt; flat, no shadows.
- Seeded wobbly pencil underlines that render identically every visit.
- Lists as ruled rows, never as boxed cards.
- Right-edge index tabs and directional page turns.

## Colors

A near-monochrome warm graphite scale on white, punctuated by a single rose-pink marker.

### Primary
- **Marker Pink** (`pink`): every interactive element: links, the active index tab, inactive tab labels, arrow icons, focus rings, the caret.
- **Pressed Marker** (`pink-deep`): hover state of marker links (text and underline).
- **Highlighter Wash** (`pink-wash`): text selection and the hover fill of inactive index tabs. Never a large surface.

### Neutral
- **Notebook White** (`page`): the page and every framed surface. There is no second surface color.
- **Graphite** (`ink`): headings, names, strong data labels, data science timeline bars.
- **Soft Graphite** (`ink-soft`): body prose, row descriptions, margin notes, timeline year labels, row icons at rest.
- **Faded Graphite** (`ink-muted`): captions, fact labels, footer, breadcrumb separators, de-emphasized years.
- **Area colors** (`area-data`, `area-software`, `area-design`): only in the experience ledger bars, dots and legend. Never on anything clickable, so the One Marker Rule holds.
- **Ink Line** (`ink-line`): frame borders, tab borders, timeline axis, pencil underlines, heavy dividers. At 25% opacity it becomes the hairline between list rows.
- **Grid Dot** (`grid`): the dot grid on the body background only.

### Named Rules
**The One Marker Rule.** If it is clickable it is pink, and nothing clickable is any other color. Pink outside interaction is limited to selection and the caret.

**The Graphite Rule.** All non-interactive UI is drawn from the ink scale on white. Color beyond pink and graphite comes only from content: screenshots and illustrations. No yellow anywhere in UI chrome.

## Typography

**Display Font:** The Girl Next Door (with Segoe Print, cursive)
**Body Font:** Figtree (with system-ui, sans-serif), weights 400, 500, 600

**Character:** A loose, single-weight handwriting paired with a friendly geometric-humanist sans. The hand is the author speaking; the sans is the record.

### Hierarchy
- **Display** (400, clamp(4rem, 7vw, 6.4rem), 0.9): the owner's name on the home page only.
- **Headline** (400, clamp(3.2rem, 6.4vw, 6rem), 0.95, -0.01em): the page title of each tab, case study and 404, always with a pencil underline.
- **Title** (400, clamp(1.8rem, 2.4vw, 2.3rem), 1): section headings inside a page, with a shorter pencil underline. Project names in notes run at clamp(1.6rem, 2vw, 2rem); the featured project at clamp(2.4rem, 3.6vw, 3.4rem).
- **Title Small** (400, 1.6rem, 1): compact side-column headings on the home page (the Right now panel) and pager project names.
- **Marker** (400, 1.3rem, 1): marker links and index tab labels (tabs 1.05rem on phones, 1.3rem from md).
- **Margin Note** (400, 1.15rem, 1.15): rotated handwritten asides in Soft Graphite.
- **Body** (400, 1rem, 1.625): prose and row descriptions in Soft Graphite; case-study prose capped at 40rem.
- **Body Strong** (600, 1.05rem): names of roles and project rows.
- **Label** (400, 0.9rem): fact labels and the skills line under the name; **Caption** (0.8rem) for small legends. Both in Faded Graphite. Years use tabular numerals.

### Named Rules
**The Two Voices Rule.** Handwriting for headings, names, links, tabs and margin notes; Figtree for anything a reader scans as data (lists, facts, dates, tech stacks, prose). Never set the hand below 1.05rem, and never set a paragraph in it.

**The Mute Margin Rule.** Margin notes are decoration: they are hidden from assistive tech and never carry content that is not also stated in plain text.

## Layout

A single centered page column (max 1400px on home, 1320px on tab and case-study pages) with asymmetric gutters: 20px start and 56px end on phones, 48px start and 112px end from md, so content always clears the fixed right-edge tabs. Inside, pages split into two unequal columns from lg (1.2fr / 1fr on home, 1.3fr / 1fr or 1.4fr / 1fr elsewhere) and collapse to one column below; on phones the identity column moves above the timeline.

Spacing rhythm: 16px row padding, 24 to 40px between blocks, 48px from page heading to content, 80px between major sections, 64px column gaps. Project notes sit in 2 or 3 column grids; ruled-row lists sit in 3 columns from md. Breakpoints follow Tailwind defaults (sm 640, md 768, lg 1024, xl 1280); margin notes appear only from md or xl.

Every tab page shares one spread: hand-lettered page heading with intro, content, then a "next tab" turn link above a heavy ink rule. There is no footer.

## Elevation & Depth

Flat. There are no shadows anywhere. Depth is suggested only by small rotations (frames tilt between -1.2deg and 1.2deg, the avatar up to 3deg, margin notes -5 to -10deg) and by line weight: 1.5px ink lines for frames and section rules, 25%-opacity hairlines for rows.

### Named Rules
**The Flat Page Rule.** Nothing lifts off the paper. No box-shadow, no drop shadow, no blur on resting UI; hierarchy comes from type, rotation and rule weight.

## Shapes

Mostly square-cornered ink drawing. Framed images use a barely softened 6px corner; index tabs are 14px rounded on the outer (left) side only and open into the page edge; focus rings round to 4px. Underlines under headings are not straight rules but seeded pencil strokes: a polyline subdivided every 24px, nudged by up to 1px, joined with quadratic curves, 1.6px Ink Line with non-scaling stroke. The same wobble generator draws the timeline bars.

## Components

### Index Tabs (navigation)
Flat file-folder tabs fixed to the right page edge, labels set vertically in the hand.
- **Shape:** 1.5px border with no right edge, outer corners rounded (14px).
- **Inactive:** white fill, Ink Line border, pink label, nudged 4px outward; on hover or focus it slides flush and fills with Highlighter Wash.
- **Active:** solid Marker Pink with white label, flush to the edge.
- **Home link:** the owner's name in pink hand lettering above the stack.
- **Motion:** translate and color at 250ms smooth-out. The tab stack is excluded from page turns so it stays put while pages slide.

### Marker Links (primary action)
The site's only button-like control: a hand-lettered pink link with a 2px pink underline at 50% and a bold arrow.
- **Rest:** Marker Pink text, underline offset 0.28em.
- **Hover:** text and underline deepen to Pressed Marker (150ms); the arrow slides 4px right (250ms smooth-out).
- **External:** same style with an up-right arrow, opens in a new tab.

### Framed Images (cards)
- **Corner Style:** 6px.
- **Border:** 1.5px Ink Line on white, overflow clipped.
- **Tilt:** a fixed per-position rotation between -1.2deg and 1.2deg, never animated.
- **Shadow Strategy:** none (see Elevation).
- Grid notes crop to 5 / 4; featured and case-study images keep their natural ratio.

### Project Notes
A framed image, a hand-lettered project name, a one-line Soft Graphite subtitle, and a "View project" marker link. No container around them; the frame is the card.

### Ruled Rows
Lists of projects, contacts, journal entries and facts. Each row is 16px tall padding with a 25% Ink Line hairline beneath, a light-weight 28px ink icon at rest (pink on hover for links), and a Body Strong name over a Body description. Linked names are pink with a 30 to 40% pink underline that saturates on hover. Year columns use fixed widths (5.5 to 8rem) and tabular numerals.

### Role Timeline (signature)
A ledger of real roles from `data.ts` (every experience with `areas`), newest first, between hairline rules. Each row holds the full company name in Figtree 500, a muted line with the dates as written in the data and the area, and a track column (36%) spanning the first role's year to today with faint year rules and two-digit year labels above. A 10px round bar marks the role's months, colored by area: Cobalt `area-data` #2f6db5 for data science, Teal `area-software` #23927a for software, Plum `area-design` #8a52a8 for design, with a matching dot before each company name; a role in two areas splits its bar. When it enters the viewport a spring sweeps left to right and grows each bar over its own months. Default, no-JS and reduced-motion renders are the finished ledger.

### Next Tab Turn
A full-width link above a 1.5px Ink Line rule naming the next tab in title-size hand lettering, with a pink 28px arrow that slides 6px on hover. It walks the tab order and returns home from the last tab.

### Page Turn (motion)
Route changes typed as forward or back slide the outgoing page 24px out and the incoming page 24px in from the tab's direction, with a 3px blur fade (old: 150ms fade, 250ms slide; new: 250ms fade after 80ms, 400ms slide; all cubic-bezier(0.22, 1, 0.36, 1)). Untyped navigation such as browser back swaps instantly. Reduced motion zeroes every transition.

## Do's and Don'ts

### Do:
- **Do** make every interactive element Marker Pink (#cc3d63) and leave everything else in the graphite scale.
- **Do** put new headings in the hand with a seeded pencil underline, and new lists, facts and prose in Figtree.
- **Do** present real screenshots in a 1.5px Ink Line frame with a 6px corner and a tilt within 1.2deg.
- **Do** separate list items with 25% Ink Line hairlines and 16px row padding.
- **Do** keep the asymmetric end gutter (56px phone, 112px md and up) so content never sits under the index tabs.
- **Do** take every duration and easing from the motion scale (150, 250, 400ms; cubic-bezier(0.22, 1, 0.36, 1)) and give every animation a reduced-motion end state that shows the finished content.
- **Do** keep the pencil wobble seeded so lines render identically on server, client and every visit.

### Don't:
- **Don't** add shadows, textures, tape, torn edges or any other paper costume; the dot grid is the only notebook cue.
- **Don't** introduce a second accent color, or any yellow, in UI chrome.
- **Don't** set paragraphs, data or anything below 1.05rem in the handwriting face.
- **Don't** wrap lists in filled or bordered cards; rows are ruled, not boxed.
- **Don't** add slogans, taglines or margin notes to pages; the site states facts and does not sell. The 404 page note is the only handwritten aside.
- **Don't** animate frames, tilts or decoration; motion belongs to navigation, the timeline draw-on and hover feedback only.
- **Don't** use em dashes, en dashes, curly quotes or emoji in any copy.
