import { cn } from '@/lib/utils';
import type { HandNoteProps } from '../types/notebook.types';

// Margin annotations are decoration for sighted readers; the same words never carry content alone.
export default function HandNote({ lines, rotate, className }: HandNoteProps) {
	return (
		<p aria-hidden style={{ rotate: `${rotate}deg` }} className={cn('font-hand text-[1.15rem] leading-[1.15] text-ink-soft', className)}>
			{lines.map((line) => (
				<span key={line} className="block">
					{line}
				</span>
			))}
		</p>
	);
}
