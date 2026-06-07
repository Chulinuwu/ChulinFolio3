'use client';

import { HandWavingIcon } from '@phosphor-icons/react';
import { Star } from './Doodles';

const LINKS = [
	{ href: '#top', label: 'Home' },
	{ href: '#work', label: 'Work' },
	{ href: '#about', label: 'About' }
];

export default function HandDrawnNav() {
	return (
		<header className="fixed inset-x-0 top-4 z-50 flex justify-center px-6 lg:px-12">
			<nav className="flex h-14 w-full items-center justify-between rounded-full border-2 border-[var(--hd-ink)] bg-[var(--hd-surface)]/90 pr-2 pl-6 shadow-[0_8px_24px_rgba(204,61,99,0.14)] backdrop-blur-sm">
				<a href="#top" className="flex items-center gap-1.5">
					<Star className="h-5 w-5 -rotate-12" />
					<span className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--hd-ink)]">
						An-An
					</span>
				</a>

				<div className="flex items-center gap-1">
					{LINKS.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="hidden rounded-full px-4 py-2 font-[family-name:var(--font-body)] text-sm font-bold text-[var(--hd-ink)] transition-colors hover:bg-[var(--hd-surface-tint)] sm:inline-block"
						>
							{link.label}
						</a>
					))}
					<a
						href="#connect"
						className="inline-flex items-center gap-1.5 rounded-full bg-[var(--hd-pink-strong)] px-4 py-2 font-[family-name:var(--font-display)] text-sm font-semibold text-white transition-transform active:scale-[0.98]"
					>
						<HandWavingIcon weight="bold" className="h-4 w-4" />
						Say hi
					</a>
				</div>
			</nav>
		</header>
	);
}
