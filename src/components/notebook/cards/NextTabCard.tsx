'use client';

import { ArrowRightIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { TOUR_COPY } from '../config/copy';
import { SCENES } from '../config/scenes';
import { turnBetween } from '../lib/scenes';
import type { NextTabCardProps } from '../types/notebook.types';

export default function NextTabCard({ from }: NextTabCardProps) {
	const here = SCENES[from];
	const next = SCENES[here.next];
	const home = next.id === 'home';

	return (
		<Link
			href={next.path}
			transitionTypes={[turnBetween(here, next)]}
			className="group flex items-center justify-between gap-6 border-t-[1.5px] border-ink-line pt-5"
		>
			<span>
				<span className="block font-hand text-[clamp(1.8rem,2.6vw,2.4rem)] leading-none text-ink transition-colors duration-(--duration-quick) group-hover:text-pink">
					{home ? TOUR_COPY.home : `${TOUR_COPY.nextPrefix} ${next.label}`}
				</span>
			</span>
			<ArrowRightIcon
				weight="bold"
				aria-hidden
				className="size-7 shrink-0 text-pink transition-transform duration-(--duration-fast) ease-(--ease-smooth-out) group-hover:translate-x-1.5"
			/>
		</Link>
	);
}
