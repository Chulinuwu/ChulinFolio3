'use client';

import { experiences } from '@/lib/data';
import { useRevealOnScroll } from '@/lib/hooks';

interface Props {
  condensed?: boolean;
}

export default function ExperienceTimeline({ condensed = false }: Props) {
  const ref = useRevealOnScroll();
  const entries = condensed ? experiences.filter((e) => e.featured) : experiences;

  return (
    <section ref={ref} className="py-12 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="reveal-up relative inline-block text-3xl font-bold text-white sm:text-5xl">
            <span className="animate-gradient bg-gradient-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-pink-400/0 via-pink-400/60 to-pink-400/0" />

          <div className="flex flex-col gap-8">
            {entries.map((entry, i) => (
              <div key={i} className="relative flex items-start gap-6">
                <div className="absolute left-4 top-6 h-4 w-4 -translate-x-1/2 rounded-full bg-pink-400 ring-4 ring-black" />

                <div className="ml-12 w-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-pink-400/30">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-pink-400/20 bg-pink-400/10 px-3 py-1 text-sm text-pink-400">
                      {entry.year}
                    </span>
                  </div>
                  <p className="text-xl font-bold text-white">{entry.role}</p>
                  <p className="mt-1 italic text-gray-300">{entry.company}</p>
                  <p className="mt-2 text-gray-400">{entry.description}</p>
                  {entry.techUsed && entry.techUsed.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {entry.techUsed.map((tech) => (
                        <span key={tech} className="rounded bg-white/10 px-2 py-0.5 text-xs text-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {condensed && (
          <div className="mt-10 text-center">
            <a href="/experience" className="text-pink-400 transition-colors hover:text-pink-300">
              See Full Experience →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
