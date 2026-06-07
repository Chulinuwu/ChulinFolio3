import { cn } from '@/lib/utils';

interface SectionShellProps {
	id?: string;
	children: React.ReactNode;
	className?: string;
	tinted?: boolean;
}

export default function SectionShell({ id, children, className, tinted }: SectionShellProps) {
	return (
		<section
			id={id}
			className={cn(
				'relative w-full px-6 py-20 lg:px-12 lg:py-28',
				tinted && 'bg-[var(--hd-surface-tint)]/50',
				className
			)}
		>
			<div className="mx-auto w-full max-w-[1200px]">{children}</div>
		</section>
	);
}
