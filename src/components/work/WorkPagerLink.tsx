'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { WORK_COPY } from '@/components/notebook/config/copy';
import { displayName } from '@/components/notebook/lib/projects';
import type { WorkPagerLinkProps } from './types/work.types';

export default function WorkPagerLink({ project, direction }: WorkPagerLinkProps) {
	const next = direction === 'next';
	const Arrow = next ? ArrowRightIcon : ArrowLeftIcon;
	return (
		<Link
			href={`/work/${project.slug}`}
			rel={direction}
			transitionTypes={[next ? 'turn-forward' : 'turn-back']}
			className={cn('group flex items-center gap-4 py-4', next && 'flex-row-reverse text-right')}
		>
			<Arrow weight="bold" aria-hidden className="size-6 shrink-0 text-pink" />
			<span className="min-w-0">
				<span className="sr-only">{next ? WORK_COPY.next : WORK_COPY.prev}: </span>
				<span className="block truncate font-hand text-[1.6rem] leading-tight text-ink group-hover:text-pink">{displayName(project)}</span>
			</span>
		</Link>
	);
}
