import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '@/lib/data';
import { SCENES } from '@/components/notebook/config/scenes';
import {
	displayName,
	findProject,
	neighborsOf,
	primaryZoneOf
} from '@/components/notebook/lib/projects';
import PageTurn from '@/components/notebook/ui/PageTurn';
import WorkFacts from '@/components/work/WorkFacts';
import WorkHero from '@/components/work/WorkHero';
import WorkLinks from '@/components/work/WorkLinks';
import WorkPager from '@/components/work/WorkPager';
import WorkVisual from '@/components/work/WorkVisual';

export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: PageProps<'/work/[slug]'>): Promise<Metadata> {
	const project = findProject((await params).slug);
	if (!project) return {};
	return { title: `${displayName(project)} | Chulin's Notebook`, description: project.description };
}

export default async function WorkPage({ params }: PageProps<'/work/[slug]'>) {
	const project = findProject((await params).slug);
	if (!project) notFound();
	const scene = SCENES[primaryZoneOf(project)];
	const { prev, next } = neighborsOf(project.slug);

	return (
		<PageTurn>
			<main className="mx-auto grid max-w-[1320px] grid-cols-[minmax(0,1fr)] gap-16 pt-5 pr-14 pb-12 pl-5 md:pr-28 md:pl-12">
				<div className="grid grid-cols-[minmax(0,1fr)] items-start gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
					<div className="grid grid-cols-[minmax(0,1fr)] gap-8">
						<WorkHero project={project} scene={scene} />
						<WorkLinks project={project} />
						<WorkFacts project={project} />
					</div>
					<div className="lg:sticky lg:top-24 lg:mt-40">
						<WorkVisual project={project} />
					</div>
				</div>
				<WorkPager prev={prev} next={next} />
			</main>
		</PageTurn>
	);
}
