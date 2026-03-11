'use client';

import { useEffect, useRef, useState } from 'react';

interface SpotlightProps {
	className?: string;
	size?: number;
	color?: string;
}

export function Spotlight({
	className = '',
	size = 400,
	color = 'rgba(236, 72, 153, 0.08)',
}: SpotlightProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleMouseMove = (e: MouseEvent) => {
			const rect = container.getBoundingClientRect();
			setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
			setIsVisible(true);
		};

		const handleMouseLeave = () => setIsVisible(false);

		container.addEventListener('mousemove', handleMouseMove);
		container.addEventListener('mouseleave', handleMouseLeave);
		return () => {
			container.removeEventListener('mousemove', handleMouseMove);
			container.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, []);

	return (
		<div ref={containerRef} className={`relative ${className}`}>
			<div
				className="pointer-events-none absolute -inset-px transition-opacity duration-300"
				style={{
					opacity: isVisible ? 1 : 0,
					background: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, ${color}, transparent 70%)`,
				}}
			/>
		</div>
	);
}
