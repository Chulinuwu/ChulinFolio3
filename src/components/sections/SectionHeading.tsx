import DoodleUnderline from '@/components/hero/DoodleUnderline';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
	title: string;
	kicker?: string;
	className?: string;
	underline?: boolean;
}

export default function SectionHeading({ title, kicker, className, underline = true }: SectionHeadingProps) {
	return (
		<div className={cn('mb-12 flex flex-col gap-1', className)}>
			{kicker && (
				<span className="-rotate-1 font-[family-name:var(--font-hand)] text-xl text-[var(--hd-pink-strong)] italic md:text-2xl">
					{kicker}
				</span>
			)}
			<h2 className="relative inline-block self-start pb-1 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--hd-ink)] md:text-5xl">
				{title}
				{underline && <DoodleUnderline className="absolute -bottom-1 left-0" />}
			</h2>
		</div>
	);
}
