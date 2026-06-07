'use client';

import { useEffect, useRef } from 'react';
import rough from 'roughjs';
import { cn } from '@/lib/utils';

interface RoughFrameProps {
	children: React.ReactNode;
	radius?: number;
	stroke?: string;
	fill?: string;
	strokeWidth?: number;
	roughness?: number;
	className?: string;
	style?: React.CSSProperties;
}

function roundedRectPath(x: number, y: number, w: number, h: number, r: number): string {
	const rr = Math.min(r, w / 2, h / 2);
	return [
		`M${x + rr},${y}`,
		`H${x + w - rr}`,
		`Q${x + w},${y} ${x + w},${y + rr}`,
		`V${y + h - rr}`,
		`Q${x + w},${y + h} ${x + w - rr},${y + h}`,
		`H${x + rr}`,
		`Q${x},${y + h} ${x},${y + h - rr}`,
		`V${y + rr}`,
		`Q${x},${y} ${x + rr},${y}`,
		'Z'
	].join(' ');
}

export default function RoughFrame({
	children,
	radius = 20,
	stroke = '#3f2e34',
	fill,
	strokeWidth = 2.5,
	roughness = 1.6,
	className,
	style
}: RoughFrameProps) {
	const wrap = useRef<HTMLDivElement>(null);
	const svgRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		const el = wrap.current;
		const svg = svgRef.current;
		if (!el || !svg) return;

		const draw = () => {
			const { width, height } = el.getBoundingClientRect();
			if (!width || !height) return;
			svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
			svg.replaceChildren();
			const pad = strokeWidth + 2;
			const d = roundedRectPath(pad, pad, width - pad * 2, height - pad * 2, radius);
			const node = rough.svg(svg).path(d, { stroke, strokeWidth, roughness, bowing: 1.2 });
			svg.appendChild(node);
		};

		const ro = new ResizeObserver(draw);
		ro.observe(el);
		draw();
		return () => ro.disconnect();
	}, [radius, stroke, strokeWidth, roughness]);

	return (
		<div
			ref={wrap}
			className={cn('relative', className)}
			style={{ ...(fill ? { backgroundColor: fill, borderRadius: radius } : null), ...style }}
		>
			{children}
			<svg
				ref={svgRef}
				className="pointer-events-none absolute inset-0 z-10 h-full w-full"
				preserveAspectRatio="none"
				aria-hidden
			/>
		</div>
	);
}
