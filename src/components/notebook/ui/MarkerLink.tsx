'use client';

import { ArrowRightIcon, ArrowUpRightIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { MarkerLinkProps } from '../types/notebook.types';

const CLASSES =
	'group inline-flex items-center gap-1.5 font-hand text-[1.3rem] leading-none text-pink underline decoration-pink/50 decoration-2 underline-offset-[0.28em] transition-colors duration-(--duration-quick) hover:text-pink-deep hover:decoration-pink-deep';

const ARROW =
	'size-4 transition-transform duration-(--duration-fast) ease-(--ease-smooth-out) group-hover:translate-x-1';

export default function MarkerLink({
	href,
	children,
	external = false,
	turn = 'turn-forward',
	className
}: MarkerLinkProps) {
	if (external) {
		return (
			<a
				href={href}
				target={href.startsWith('http') ? '_blank' : undefined}
				rel="noreferrer"
				className={cn(CLASSES, className)}
			>
				{children}
				<ArrowUpRightIcon weight="bold" aria-hidden className={ARROW} />
			</a>
		);
	}
	return (
		<Link href={href} transitionTypes={[turn]} className={cn(CLASSES, className)}>
			{children}
			<ArrowRightIcon weight="bold" aria-hidden className={ARROW} />
		</Link>
	);
}
