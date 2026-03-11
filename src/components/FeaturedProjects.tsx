'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { projects } from '@/lib/data';
import { TypingText } from '@/components/ui/typing-text';
import ProjectCard from './ProjectCard';

// Bento pattern: which card indices span 2 columns
// With 8 cards in a 3-col grid, cards 0 and 4 span wide
const WIDE_INDICES = new Set([0, 4]);

export default function FeaturedProjects() {
  const router = useRouter();
  const featured = projects.filter((p) => p.featured);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.section
      className="py-12 sm:py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            <TypingText text="Featured Projects" speed={60} className="gradient-text" cursorClassName="bg-pink-400" />
          </h2>
        </motion.div>

        {/* Desktop bento grid */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-4">
          {featured.map((project, i) => {
            const isWide = WIDE_INDICES.has(i);
            return (
              <motion.div
                key={project.slug}
                className={`relative ${isWide ? 'md:col-span-2' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <AnimatePresence>
                  {hoveredIndex === i && (
                    <motion.span
                      className="absolute -inset-1 -z-10 rounded-3xl bg-pink-500/15 blur-sm"
                      layoutId="projectGlow"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
                <ProjectCard
                  project={project}
                  variant={isWide ? 'wide' : 'standard'}
                  onClick={() => router.push(`/projects/${project.slug}`)}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: single column */}
        <div className="flex flex-col gap-4 md:hidden">
          {featured.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <ProjectCard
                project={project}
                variant="standard"
                onClick={() => router.push(`/projects/${project.slug}`)}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="/projects"
            className="text-sm text-gray-400 transition-colors duration-200 hover:text-pink-400"
          >
            View All Projects →
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
