# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primary: peers and the creative community (designers, creative developers, the Awwwards and Codrops audience) who judge a portfolio as a piece of work in itself. Secondary, inferred: recruiters for data science / AI roles and freelance clients who land here through links.

## Product Purpose
The personal portfolio of Chulin (Jirameth Wannasiwaporn), a data scientist and AI engineer (NLP, generative AI, MLOps) who also draws. Positioned as a working professional, not a student. The site is itself the showcase: success is a visitor remembering the person, not a list of skills.

## Positioning
Data science and art in one person. Chulin trains and ships models (SCB, Visai AI, Aiful, Aivertise, UGC moderation) and also draws, designs and illustrates (GDSC graphic core team, the hand-drawn mascot). A pure engineer or a pure illustrator could not truthfully claim both.

## Operating Context
Visitors browse on desktop from galleries and social links, often on mobile from X / Instagram. They explore rather than scan; time on site and memorability matter more than conversion.

## Capabilities and Constraints
- Next.js 16 App Router, React 19, Tailwind v4, @react-three/fiber + three for WebGL, Vercel.
- All content lives in `src/lib/data.ts` and must stay in sync with the resume. Routes: `/`, `/lab`, `/studio`, `/workshop`, `/contact`, `/work/[slug]`.
- No backend. Contact is links only (email, GitHub, LinkedIn, Instagram, Discord). Fastwork is intentionally removed.
- Undecided: the final visual world (the current island/sticker world is being questioned as reading AI-made).

## Brand Commitments
- Name: Chulin (nickname), Jirameth Wannasiwaporn (full). No role title on the site: the work (NLP, generative AI, MLOps) speaks for itself.
- Mascot: the owner's own avatar character (maroon shoulder-length hair, one low side ponytail with a black bow, deadpan sleepy eyes, headphones, oversized sweater). Reference: `docs/character/reference-avatar.png`, rules in `docs/character/README.md`.
- Pink `#cc3d63` is the only interactive accent. No yellow tones.
- No emoji, no em or en dashes, no curly quotes in any copy.

## Evidence on Hand
Real projects, internships, hackathon placements and contacts in `src/lib/data.ts`. Real product screenshot: `public/projects/nubsatang.webp`. No testimonials, client logos or metrics exist; do not fabricate them.

## Product Principles
1. The work is the interface: the site should feel made by its owner, never templated or generated.
2. Show the data side and the art side together, not as separate sections fighting for attention.
3. Craft over quantity: fewer, stronger moments.
4. Every motion must mean something (navigation, reveal, feedback).

## Accessibility & Inclusion
WCAG AA contrast, full keyboard navigation, reduced-motion support for every animation.
