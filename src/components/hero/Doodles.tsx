import { cn } from '@/lib/utils';

type DoodleProps = { className?: string; color?: string; size?: number; style?: React.CSSProperties };

function sizeStyle(size?: number, style?: React.CSSProperties): React.CSSProperties | undefined {
	if (!size && !style) return undefined;
	return { ...(size ? { width: size, height: size } : null), ...style };
}

export function Star({ className, color = 'var(--hd-butter)', size, style }: DoodleProps) {
	return (
		<svg viewBox="0 0 24 24" fill="none" className={cn('h-6 w-6', className)} style={sizeStyle(size, style)} aria-hidden>
			<path
				d="M12 2.5l2.6 5.6 6.1.7-4.5 4.1 1.2 6-5.4-3-5.4 3 1.2-6L2.8 8.8l6.1-.7z"
				fill={color}
				stroke="var(--hd-ink)"
				strokeWidth={1.4}
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export function Sparkle({ className, color = 'var(--hd-pink)', size, style }: DoodleProps) {
	return (
		<svg viewBox="0 0 24 24" fill="none" className={cn('h-5 w-5', className)} style={sizeStyle(size, style)} aria-hidden>
			<path
				d="M12 2c.6 4.8 2.4 6.6 7.2 7.2-4.8.6-6.6 2.4-7.2 7.2-.6-4.8-2.4-6.6-7.2-7.2C9.6 8.6 11.4 6.8 12 2z"
				fill={color}
				stroke="var(--hd-ink)"
				strokeWidth={1.2}
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export function Heart({ className, color = 'var(--hd-pink-soft)', size, style }: DoodleProps) {
	return (
		<svg viewBox="0 0 24 24" fill="none" className={cn('h-5 w-5', className)} style={sizeStyle(size, style)} aria-hidden>
			<path
				d="M12 20s-7-4.4-7-9.3C5 7.9 7 6 9.4 6c1.5 0 2.7.8 2.6 2 0-1.2 1.1-2 2.6-2C17 6 19 7.9 19 10.7 19 15.6 12 20 12 20z"
				fill={color}
				stroke="var(--hd-ink)"
				strokeWidth={1.4}
				strokeLinejoin="round"
			/>
		</svg>
	);
}
