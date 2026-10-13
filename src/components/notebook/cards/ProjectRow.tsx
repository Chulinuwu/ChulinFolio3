import Link from 'next/link';
import { displayName } from '../lib/projects';
import type { ProjectRowProps } from '../types/notebook.types';

export default function ProjectRow({ project, icon: Icon }: ProjectRowProps) {
	return (
		<Link href={`/work/${project.slug}`} transitionTypes={['turn-forward']} className="group flex h-full gap-4 border-b border-ink-line/25 py-4">
			<Icon weight="light" aria-hidden className="mt-0.5 size-7 shrink-0 text-ink-soft transition-colors duration-(--duration-quick) group-hover:text-pink" />
			<span className="min-w-0">
				<span className="block text-[1.05rem] font-semibold text-pink underline decoration-pink/30 underline-offset-4 group-hover:decoration-pink">
					{displayName(project)}
				</span>
				<span className="mt-0.5 block text-[0.95rem] leading-snug text-ink-soft">{project.description}</span>
			</span>
		</Link>
	);
}
