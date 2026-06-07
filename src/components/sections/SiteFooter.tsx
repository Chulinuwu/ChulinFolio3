'use client';

import { GithubLogoIcon, LinkedinLogoIcon, InstagramLogoIcon, DiscordLogoIcon } from '@phosphor-icons/react';
import { contacts } from '@/lib/data';
import { Star } from '@/components/hero/Doodles';

const NAV = [
	{ href: '#top', label: 'Home' },
	{ href: '#work', label: 'Work' },
	{ href: '#about', label: 'About' },
	{ href: '#connect', label: 'Say hi' }
];

const SOCIALS = [
	{ ...contacts.github, Icon: GithubLogoIcon },
	{ ...contacts.linkedin, Icon: LinkedinLogoIcon },
	{ ...contacts.instagram, Icon: InstagramLogoIcon },
	{ ...contacts.discord, Icon: DiscordLogoIcon }
];

export default function SiteFooter() {
	return (
		<footer className="relative w-full overflow-hidden border-t-2 border-dashed border-[var(--hd-pink-soft)] bg-[var(--hd-surface-tint)]/50 px-6 py-12 lg:px-12">
			<Star className="absolute top-6 right-12 h-6 w-6 -rotate-12 opacity-60" />
			<div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 text-center">
				<a href="#top" className="flex items-center gap-1.5">
					<Star className="h-5 w-5 -rotate-12" />
					<span className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--hd-ink)]">
						An-An
					</span>
				</a>

				<nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
					{NAV.map((item) => (
						<a
							key={item.href}
							href={item.href}
							className="font-[family-name:var(--font-body)] text-sm font-bold text-[var(--hd-ink)] transition-colors hover:text-[var(--hd-pink-strong)]"
						>
							{item.label}
						</a>
					))}
				</nav>

				<div className="flex items-center gap-3">
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
				</div>

				<p className="font-[family-name:var(--font-mono-hd)] text-xs text-[var(--hd-ink-muted)]">
					© 2026 Jirameth Wannasiwaporn
				</p>
			</div>
		</footer>
	);
}
