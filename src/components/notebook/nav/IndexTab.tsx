import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { IndexTabProps } from '../types/notebook.types';

export default function IndexTab({ scene, active, turn }: IndexTabProps) {
	return (
		<Link
			href={scene.path}
			transitionTypes={[turn]}
			aria-current={active ? 'page' : undefined}
			data-pen={scene.pen}
			className={cn(
				'flex flex-col items-center gap-[clamp(0.4rem,1vh,0.75rem)] rounded-l-(--radius-tab) border-[1.5px] border-r-0 py-[clamp(0.5rem,1.6vh,1rem)] pr-2 pl-2 transition-[translate,background-color,color,padding] duration-(--duration-fast) ease-(--ease-smooth-out) md:pr-3',
				active
					? 'translate-x-0 border-(--pen) bg-(--pen) pl-3 text-white md:pl-4'
					: 'border-ink-line translate-x-1.5 bg-white text-(--pen) hover:translate-x-0 hover:bg-(--pen)/10 focus-visible:translate-x-0 md:pl-3'
			)}
		>
			<span
				className={cn(
					'text-[0.68rem] font-semibold tracking-[0.08em] tabular-nums md:text-[0.72rem]',
					active ? 'text-white/85' : 'text-ink-muted'
				)}
			>
				{String(scene.order + 1).padStart(2, '0')}
			</span>
			<span className="font-hand text-[clamp(0.95rem,2vh,1.3rem)] leading-none whitespace-nowrap [writing-mode:vertical-rl]">
				{scene.tabLabel}
			</span>
		</Link>
	);
}
