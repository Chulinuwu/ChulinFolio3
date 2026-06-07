'use client';

import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

export default function DoodleUnderline({
	className,
	color = 'var(--hd-pink-strong)',
	delay = 0.35
}: {
	className?: string;
	color?: string;
	delay?: number;
}) {
	const reduce = useReducedMotion();
	return (
		<svg
			viewBox="0 0 300 18"
			fill="none"
			preserveAspectRatio="none"
			className={cn('h-[0.4em] w-full', className)}
			aria-hidden
		>
			<motion.path
				d="M4 12 C 60 4, 110 16, 160 9 S 250 5, 296 11"
				stroke={color}
				strokeWidth={6}
				strokeLinecap="round"
				initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
				whileInView={{ pathLength: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.7, ease: 'easeInOut', delay }}
			/>
		</svg>
	);
}
