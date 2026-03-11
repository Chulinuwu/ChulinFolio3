'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { projects, type Project } from '@/lib/data';
import { TypingText } from '@/components/ui/typing-text';
import ProjectCard from './ProjectCard';

const WIDE_INDICES = new Set([0, 4]);

export default function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
                  onClick={() => setSelectedProject(project)}
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
                onClick={() => setSelectedProject(project)}
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

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selectedProject.name}
          >
            <motion.div
              className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-gray-950 p-8"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 text-gray-400 transition-colors hover:text-white"
                aria-label="Close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {selectedProject.image && (
                <div className="relative -mx-8 -mt-8 mb-6 h-48 overflow-hidden rounded-t-2xl">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
                </div>
              )}

              <span className="mb-2 inline-block rounded-full border border-pink-400/20 bg-pink-400/10 px-3 py-1 text-xs text-pink-400">
                {selectedProject.category}
              </span>
              <h2 className="mt-2 text-2xl font-bold text-white">{selectedProject.name}</h2>
              <p className="mt-1 text-sm text-pink-400">{selectedProject.role}</p>
              <p className="mt-4 leading-relaxed text-gray-300">{selectedProject.explanation}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech) => (
                  <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-pink-500 px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-pink-400"
                  >
                    Live Demo
                  </a>
                )}
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/40"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
