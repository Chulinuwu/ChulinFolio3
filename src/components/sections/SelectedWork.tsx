'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import SectionShell from '@/components/sections/SectionShell';
import SectionHeading from '@/components/sections/SectionHeading';
import RoughFrame from '@/components/hero/RoughFrame';
import { Sparkle, Heart } from '@/components/hero/Doodles';
import { cn } from '@/lib/utils';
import { projects } from '@/lib/data';
import { GithubLogoIcon, ArrowUpRightIcon } from '@phosphor-icons/react';

const FEATURED_SLUG = 'nubsatang';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'data-science', label: 'Data & AI' },
  { key: 'web-dev', label: 'Web' },
  { key: 'iot', label: 'IoT' },
  { key: 'freelance', label: 'Freelance' },
  { key: 'hackathon', label: 'Hackathons' },
] as const;

const CATEGORY_LABELS: Record<string, string> = {
  'data-science': 'Data & AI',
  'web-dev': 'Web',
  iot: 'IoT',
  freelance: 'Freelance',
  hackathon: 'Hackathon',
};

const TILTS = ['rotate-[-1deg]', 'rotate-[1deg]', 'rotate-[-0.5deg]', 'rotate-[0.5deg]'];
const ease = [0.16, 1, 0.3, 1] as const;

function ProjectCard({
  project,
  index,
  featured,
}: {
  project: (typeof projects)[number];
  index: number;
  featured: boolean;
}) {
  const reduced = useReducedMotion();
  const tilt = TILTS[index % TILTS.length];
  const pills = project.techStack.slice(0, featured ? 6 : 4);

  return (
    <motion.div
      layout
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: 16 }}
      transition={{ duration: 0.45, ease }}
      className={cn('transition-transform hover:-translate-y-1', tilt, featured && 'md:col-span-2 lg:col-span-3')}
    >
      <RoughFrame
        radius={20}
        className={cn('h-full rounded-[20px]', featured && 'bg-[var(--hd-pink-soft)]/20')}
      >
        <div className={cn('relative flex h-full flex-col gap-3 p-6', featured && 'gap-4 p-7')}>
          {featured ? (
            <Heart className="absolute right-5 top-5 h-7 w-7 rotate-6" />
          ) : (
            <Sparkle className="absolute right-5 top-5 h-4 w-4 opacity-50" color="var(--hd-lavender)" />
          )}

          <span className="font-[family-name:var(--font-mono-hd)] text-[11px] text-[var(--hd-ink-muted)]">
            {featured ? 'featured project' : CATEGORY_LABELS[project.category]}
          </span>

          <div className="flex flex-col gap-0.5">
            <h3
              className={cn(
                'font-[family-name:var(--font-display)] leading-tight text-[var(--hd-ink)]',
                featured ? 'text-2xl' : 'text-lg',
              )}
            >
              {project.name}
            </h3>
            <p className="font-[family-name:var(--font-hand)] text-xs text-[var(--hd-pink-strong)] italic">
              {project.role}
            </p>
          </div>

          <p
            className={cn(
              'font-[family-name:var(--font-body)] text-sm leading-relaxed text-[var(--hd-ink-muted)]',
              !featured && 'line-clamp-3',
            )}
          >
            {project.description}
          </p>

          <div className="mt-auto flex flex-col gap-3 pt-1">
            <div className="flex flex-wrap gap-1.5">
              {pills.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[var(--hd-ink)] px-2 py-0.5 font-[family-name:var(--font-mono-hd)] text-[10px] text-[var(--hd-ink-muted)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {featured && project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--hd-pink-strong)] px-4 py-2 font-[family-name:var(--font-display)] text-sm font-semibold text-white transition-transform active:scale-[0.98]"
              >
                Visit nubsatang.com
                <ArrowUpRightIcon weight="bold" size={15} />
              </a>
            ) : (
              (project.link || project.github) && (
                <div className="flex gap-2">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${project.name}`}
                      className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[var(--hd-ink)] text-[var(--hd-ink)] transition-colors hover:border-[var(--hd-pink-strong)] hover:bg-[var(--hd-pink-strong)] hover:text-white"
                    >
                      <ArrowUpRightIcon weight="bold" size={14} />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`GitHub for ${project.name}`}
                      className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[var(--hd-ink)] text-[var(--hd-ink)] transition-colors hover:border-[var(--hd-pink-strong)] hover:bg-[var(--hd-pink-strong)] hover:text-white"
                    >
                      <GithubLogoIcon weight="bold" size={14} />
                    </a>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </RoughFrame>
    </motion.div>
  );
}

export default function SelectedWork() {
  const [active, setActive] = useState<string>('all');
  const reduced = useReducedMotion();

  const ordered = useMemo(() => {
    const list =
      active === 'all'
        ? projects
        : projects.filter((p) => p.category === active || p.categories?.includes(active as never));
    const i = list.findIndex((p) => p.slug === FEATURED_SLUG);
    return i > 0 ? [list[i], ...list.slice(0, i), ...list.slice(i + 1)] : list;
  }, [active]);

  return (
    <SectionShell id="work">
      <SectionHeading title="Selected work" kicker="things i have built" />

      <div className="mt-6 mb-8 flex flex-wrap gap-2">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={cn(
              'rounded-full border-2 px-4 py-1.5 font-[family-name:var(--font-display)] text-sm transition-colors',
              active === key
                ? 'border-[var(--hd-pink-strong)] bg-[var(--hd-pink-strong)] text-white'
                : 'border-[var(--hd-ink)] bg-[var(--hd-surface)] text-[var(--hd-ink)] hover:border-[var(--hd-pink-strong)] hover:text-[var(--hd-pink-strong)]',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <motion.div
        layout={!reduced}
        className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {ordered.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              featured={project.slug === FEATURED_SLUG}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionShell>
  );
}
