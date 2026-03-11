'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface HoverGlowGridProps {
	children: React.ReactNode[];
	className?: string;
}

export function HoverGlowGrid({ children, className = '' }: HoverGlowGridProps) {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<div className={className}>
			{children.map((child, idx) => (
				<div
					key={idx}
					className="relative"
					onMouseEnter={() => setHoveredIndex(idx)}
					onMouseLeave={() => setHoveredIndex(null)}
				>
					<AnimatePresence>
						{hoveredIndex === idx && (
							<motion.span
								className="absolute inset-0 -z-10 rounded-2xl bg-pink-500/10"
								layoutId="hoverGlow"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1, transition: { duration: 0.15 } }}
								exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.1 } }}
							/>
						)}
					</AnimatePresence>
					{child}
				</div>
			))}
		</div>
	);
}
