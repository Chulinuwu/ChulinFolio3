import Link from 'next/link';
import { displayName } from '../lib/projects';
import type { ProjectRowProps } from '../types/notebook.types';

export default function ProjectRow({ project, icon: Icon }: ProjectRowProps) {
	return (
		<Link
			href={`/work/${project.slug}`}
			transitionTypes={['turn-forward']}
			className="group border-ink-line/25 flex h-full gap-4 border-b py-4"
		>
			<Icon
				weight="light"
				aria-hidden
				className="text-ink-soft group-hover:text-pink mt-0.5 size-7 shrink-0 transition-colors duration-(--duration-quick)"
			/>
			<span className="min-w-0">
				<span className="text-pink decoration-pink/30 group-hover:decoration-pink block text-[1.05rem] font-semibold underline underline-offset-4">
					{displayName(project)}
				</span>
				<span className="text-ink-soft mt-0.5 block text-[0.95rem] leading-snug">
					{project.description}
				</span>
			</span>
		</Link>
	);
}
