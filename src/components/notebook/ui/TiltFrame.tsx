'use client';

import { useRef, type PointerEvent } from 'react';
import { TILT_MAX_DEG } from '../config/motion';
import type { ChildrenProps } from '../types/notebook.types';

// Leans its child toward the mouse like a card picked up off the desk; touch and pen are ignored.
export default function TiltFrame({ children }: ChildrenProps) {
	const el = useRef<HTMLDivElement>(null);

	const move = (e: PointerEvent<HTMLDivElement>) => {
		const node = el.current;
		if (!node || e.pointerType !== 'mouse') return;
		const r = node.getBoundingClientRect();
		const x = (e.clientX - r.left) / r.width - 0.5;
		const y = (e.clientY - r.top) / r.height - 0.5;
		node.dataset.tilting = '';
		node.style.setProperty('--tilt-x', `${(-y * TILT_MAX_DEG).toFixed(2)}deg`);
		node.style.setProperty('--tilt-y', `${(x * TILT_MAX_DEG).toFixed(2)}deg`);
	};

	const leave = () => {
		const node = el.current;
		if (!node) return;
		delete node.dataset.tilting;
		node.style.removeProperty('--tilt-x');
		node.style.removeProperty('--tilt-y');
	};

	return (
		<div ref={el} onPointerMove={move} onPointerLeave={leave} className="tilt">
			{children}
		</div>
	);
}
