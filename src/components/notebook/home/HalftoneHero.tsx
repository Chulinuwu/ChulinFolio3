'use client';

import { cn } from '@/lib/utils';
import { useHalftoneName } from '../hooks/useHalftoneName';
import type { HalftoneHeroProps } from '../types/notebook.types';
import RiseText from '../ui/RiseText';

export default function HalftoneHero({ name, before, after }: HalftoneHeroProps) {
	const { section, heading, canvas, live } = useHalftoneName();

	return (
		<section
			ref={section}
			aria-label="About"
			className="relative flex min-h-[calc(100svh-2rem)] flex-col justify-between gap-10 pt-6 pb-10"
		>
			<canvas ref={canvas} aria-hidden className="pointer-events-none absolute inset-0 size-full" />
			{before}
			<h1
				ref={heading}
				className={cn(
					'font-body text-ink relative self-start text-[clamp(4.5rem,23vw,22rem)] leading-[0.82] font-black tracking-[-0.045em] whitespace-nowrap uppercase transition-colors duration-(--duration-slow)',
					live && 'text-transparent'
				)}
			>
				<RiseText text={name} delayMs={150} />
			</h1>
			{after}
		</section>
	);
}
