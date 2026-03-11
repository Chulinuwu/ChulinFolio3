'use client';

import { useRouter } from 'next/navigation';
import { projects } from '@/lib/data';
import ProjectCard from './ProjectCard';

export default function FeaturedProjects() {
  const router = useRouter();
  const featured = projects.filter((p) => p.featured);
  const [first, ...rest] = featured;

  return (
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="gradient-text">Featured Projects</span>
          </h2>
        </div>

        {/* Desktop: asymmetric 2-col layout */}
        <div className="hidden md:grid md:gap-5" style={{ gridTemplateColumns: '1.2fr 0.8fr' }}>
          {first && (
            <ProjectCard
              project={first}
              size="large"
              onClick={() => router.push(`/projects/${first.slug}`)}
            />
          )}
          <div className="flex flex-col gap-4">
            {rest.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                size="tall"
                onClick={() => router.push(`/projects/${project.slug}`)}
              />
            ))}
          </div>
        </div>

        {/* Mobile: single column */}
        <div className="flex flex-col gap-4 md:hidden">
          {featured.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              size="standard"
              onClick={() => router.push(`/projects/${project.slug}`)}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/projects"
            className="text-sm text-gray-400 transition-colors duration-200 hover:text-pink-400"
          >
            View All Projects →
          </a>
        </div>
      </div>
    </section>
  );
}
