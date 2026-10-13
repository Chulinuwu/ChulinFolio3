import { displayName } from '@/components/notebook/lib/projects';
import PageHeading from '@/components/notebook/ui/PageHeading';
import Breadcrumb from './Breadcrumb';
import type { WorkHeroProps } from './types/work.types';

export default function WorkHero({ project, scene }: WorkHeroProps) {
	return (
		<header>
			<div className="mt-2">
				<Breadcrumb trail={[{ label: scene.label, href: scene.path }, { label: displayName(project) }]} />
			</div>
			<div className="mt-6">
				<PageHeading>{displayName(project)}</PageHeading>
			</div>
			<p className="mt-5 max-w-[40rem] text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed text-ink">{project.description}</p>
		</header>
	);
}
