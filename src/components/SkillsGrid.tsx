'use client';

import { skillCategories } from '@/lib/data';
import { useRevealOnScroll } from '@/lib/hooks';

interface Props {
  condensed?: boolean;
}

export default function SkillsGrid({ condensed = false }: Props) {
  const ref = useRevealOnScroll();
  const categories = condensed ? skillCategories.slice(0, 2) : skillCategories;

  return (
    <section ref={ref} className="py-12 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold sm:text-5xl">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-pink-400/30"
            >
              <h3 className="mb-4 text-lg font-semibold text-white">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="rounded bg-white/10 px-2 py-1 text-xs text-gray-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {condensed && (
          <div className="mt-8 text-center">
            <a href="/experience" className="text-pink-400 transition-colors hover:text-pink-300">
              View All Skills →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
