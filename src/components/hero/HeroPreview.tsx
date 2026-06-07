'use client';

import { motion, type Variants } from 'motion/react';
import {
	ArrowRightIcon as ArrowRight,
	HandWavingIcon as HandWaving,
	GithubLogoIcon as GithubLogo,
	LinkedinLogoIcon as LinkedinLogo,
	InstagramLogoIcon as InstagramLogo,
	DiscordLogoIcon as DiscordLogo
} from '@phosphor-icons/react';
import { contacts } from '@/lib/data';
import { cn } from '@/lib/utils';
import DoodleUnderline from './DoodleUnderline';
import { Star, Sparkle } from './Doodles';
import HeroAvatar from './HeroAvatar';

const DISCIPLINES = ['software engineering', 'data science', 'ai development'];

const SOCIALS = [
	{ ...contacts.github, Icon: GithubLogo },
	{ ...contacts.linkedin, Icon: LinkedinLogo },
	{ ...contacts.instagram, Icon: InstagramLogo },
	{ ...contacts.discord, Icon: DiscordLogo }
] as const;

const container: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const item: Variants = {
	hidden: { opacity: 0, y: 24 },
	show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function HeroPreview() {

	return (
		<section className="relative flex min-h-[100dvh] w-full flex-col justify-center overflow-hidden px-6 pt-28 pb-16 lg:px-12 lg:pt-24">
			<DecorBlobs />

			<motion.div
				variants={container}
				initial="hidden"
				animate="show"
				className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_1.15fr]"
			>
				<div className="flex flex-col gap-6">
					<motion.h1 variants={item} className="flex flex-col gap-1">
						<span className="-rotate-1 pb-1 font-[family-name:var(--font-hand)] text-2xl leading-[1.2] text-[var(--hd-pink-strong)] italic md:text-3xl">
							hey there, i&apos;m
						</span>
						<span className="relative inline-block self-start pb-1 font-[family-name:var(--font-display)] text-6xl leading-[1] font-semibold tracking-tight text-[var(--hd-ink)] md:text-7xl xl:text-8xl">
							An-An
							<DoodleUnderline className="absolute -bottom-1 left-0" />
						</span>
					</motion.h1>

					<motion.div variants={item} className="flex flex-wrap items-center gap-2">
						<span className="font-[family-name:var(--font-hand)] text-xl text-[var(--hd-pink-strong)] italic md:text-2xl">
							I do
						</span>
						{DISCIPLINES.map((d, i) => (
							<span key={d} className="flex items-center gap-2">
								<span className="font-[family-name:var(--font-hand)] text-xl text-[var(--hd-ink)] italic md:text-2xl">
									{d}
								</span>
								{i < DISCIPLINES.length - 1 && <Sparkle className="h-4 w-4" />}
							</span>
						))}
					</motion.div>

					<motion.p
						variants={item}
						className="max-w-[42ch] text-lg leading-relaxed text-[var(--hd-ink-muted)] xl:text-xl"
					>
						I build cute, clever and scalable things across the web, design and data.
					</motion.p>

					<motion.div variants={item} className="flex flex-wrap items-center gap-3 pt-1">
						<a
							href="#work"
							className="group inline-flex items-center gap-2 rounded-full bg-[var(--hd-pink-strong)] px-6 py-3 font-[family-name:var(--font-display)] text-base font-bold text-white shadow-[0_10px_30px_rgba(204,61,99,0.35)] transition-transform active:scale-[0.98]"
						>
							See my work
							<ArrowRight
								weight="bold"
								className="h-4 w-4 transition-transform group-hover:translate-x-1"
							/>
						</a>
						<a
							href="#connect"
							className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--hd-ink)] bg-[var(--hd-surface)] px-6 py-3 font-[family-name:var(--font-display)] text-base font-bold text-[var(--hd-ink)] transition-transform active:scale-[0.98]"
						>
							<HandWaving weight="bold" className="h-4 w-4" />
							Say hi
						</a>
					</motion.div>

					<motion.div variants={item} className="flex items-center gap-3 pt-2">
						<span className="font-[family-name:var(--font-display)] text-sm text-[var(--hd-ink-muted)]">
							Let&apos;s connect
						</span>
						{SOCIALS.map(({ href, title, Icon }) => (
							<a
								key={title}
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={title}
								className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[var(--hd-ink)] text-[var(--hd-ink)] transition-colors hover:bg-[var(--hd-pink-soft)]"
							>
								<Icon weight="bold" className="h-5 w-5" />
							</a>
						))}
					</motion.div>
				</div>

				<motion.div variants={item} className="lg:-mr-8 xl:-mr-16">
					<HeroAvatar />
				</motion.div>
			</motion.div>
		</section>
	);
}

function DecorBlobs() {
	return (
		<div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
			<div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[var(--hd-pink-soft)] opacity-40 blur-3xl" />
			<div className="absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-[var(--hd-lavender)] opacity-40 blur-3xl" />
			<div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-[var(--hd-butter)] opacity-30 blur-3xl" />
			<Star className={cn('absolute top-24 right-1/3 h-8 w-8 -rotate-12')} />
			<Sparkle className="absolute bottom-40 left-1/2 h-7 w-7" color="var(--hd-lavender)" />
		</div>
	);
}
