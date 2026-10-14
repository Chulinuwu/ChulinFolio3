import { cn } from '@/lib/utils';
import { pencilPath } from '../lib/wobble';
import type { PencilLineProps } from '../types/notebook.types';

const HEIGHT = 10;

// A hand-ruled underline in the section's pen: geometry from a seeded wobble, so it is stable across renders.
export default function PencilLine({ width, seed, draw = false, className }: PencilLineProps) {
	const d = pencilPath(
		[
			{ x: 2, y: HEIGHT / 2 + 1 },
			{ x: width - 2, y: HEIGHT / 2 - 1 }
		],
		seed,
		1,
		24
	);
	return (
		<svg
			aria-hidden
			viewBox={`0 0 ${width} ${HEIGHT}`}
			preserveAspectRatio="none"
			className={cn('block h-2.5 w-full overflow-visible', draw && 'pencil-draw', className)}
		>
			<path
				d={d}
				pathLength={draw ? 1 : undefined}
				fill="none"
				strokeLinecap="round"
				strokeWidth={3.4}
				className="stroke-(--pen)/80"
				vectorEffect="non-scaling-stroke"
			/>
		</svg>
	);
}
