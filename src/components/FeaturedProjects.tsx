'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { projects, type Project } from '@/lib/data';

const CATEGORY_ACCENTS: Record<string, string> = {
  'data-science': '#ec4899',
  'web-dev': '#a855f7',
  iot: '#f472b6',
  freelance: '#c084fc',
};

export default function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.p
            className="mb-3 text-sm font-medium uppercase tracking-widest text-pink-400/70"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Selected Work
          </motion.p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
        </motion.div>

        {/* Projects - alternating layout */}
        <div className="flex flex-col gap-20 lg:gap-28">
          {featured.map((project, i) => {
            const accent = CATEGORY_ACCENTS[project.category] || '#ec4899';
            const isEven = i % 2 === 0;

            return (
              <motion.div
                key={project.slug}
                className={`group flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16 ${!isEven ? 'lg:flex-row-reverse' : ''}`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Image side */}
                <motion.div
                  className="relative lg:w-[55%]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                >
                  {project.image ? (
                    <div className="relative overflow-hidden rounded-2xl">
                      {/* Glow behind image */}
                      <motion.div
                        className="absolute -inset-4 rounded-3xl opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
                        style={{ background: `radial-gradient(ellipse, ${accent}20, transparent 70%)` }}
                      />
                      {/* Border glow on hover */}
                      <div
                        className="relative overflow-hidden rounded-2xl border border-white/10 transition-colors duration-500 group-hover:border-white/20"
                      >
                        <Image
                          src={project.image}
                          alt={project.name}
                          width={800}
                          height={500}
                          className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Bottom gradient */}
                        <div
                          className="absolute inset-x-0 bottom-0 h-1/3"
                          style={{ background: `linear-gradient(to top, ${accent}10, transparent)` }}
                        />
                        {/* Number overlay */}
                        <div className="absolute left-5 top-5">
                          <span
                            className="text-sm font-bold"
                            style={{ color: `${accent}60` }}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl border border-white/10"
                      style={{ background: `linear-gradient(135deg, ${accent}06, ${accent}02)` }}
                    >
                      {/* Abstract decoration */}
                      <div
                        className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20 blur-3xl"
                        style={{ backgroundColor: accent }}
                      />
                      <div
                        className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full opacity-10 blur-3xl"
                        style={{ backgroundColor: accent }}
                      />
                      <div className="relative text-center">
                        <div
                          className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl"
                          style={{ backgroundColor: `${accent}12`, border: `1px solid ${accent}25` }}
                        >
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                          </svg>
                        </div>
                        <p className="text-sm text-white/30">{project.category.replace('-', ' ')}</p>
                      </div>
                      {/* Number */}
                      <div className="absolute left-5 top-5">
                        <span className="text-sm font-bold" style={{ color: `${accent}40` }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Content side */}
                <div className="flex flex-col lg:w-[45%]">
                  {/* Category */}
                  <motion.span
                    className="mb-3 w-fit rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wider"
                    style={{ borderColor: `${accent}35`, color: accent, backgroundColor: `${accent}08` }}
                    initial={{ opacity: 0, x: isEven ? -15 : 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    {project.category.replace('-', ' ')}
                  </motion.span>

                  {/* Role */}
                  <motion.p
                    className="mb-1 text-sm"
                    style={{ color: `${accent}80` }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.35 }}
                  >
                    {project.role}
                  </motion.p>

                  {/* Name */}
                  <motion.h3
                    className="mb-4 text-3xl font-bold text-white sm:text-4xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {project.name}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    className="mb-6 leading-relaxed text-gray-400"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {project.description}
                  </motion.p>

                  {/* Tech pills */}
                  <motion.div
                    className="mb-8 flex flex-wrap gap-2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.04, delayChildren: 0.4 } },
                    }}
                  >
                    {project.techStack.map((tech) => (
                      <motion.span
                        key={tech}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-gray-400 transition-all duration-300 hover:border-pink-400/30 hover:text-white"
                        variants={{
                          hidden: { opacity: 0, y: 8 },
                          visible: { opacity: 1, y: 0 },
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Actions */}
                  <motion.div
                    className="flex gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="rounded-full px-5 py-2 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      style={{
                        backgroundColor: accent,
                        boxShadow: hoveredIndex === i ? `0 0 25px ${accent}40` : 'none',
                      }}
                    >
                      View Details
                    </button>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm text-white transition-all duration-300 hover:border-white/30 hover:bg-white/10"
                      >
                        GitHub
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm text-white transition-all duration-300 hover:border-white/30 hover:bg-white/10"
                      >
                        Live Demo
                      </a>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View all link */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors duration-300 hover:text-pink-400"
          >
            View All Projects
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              &rarr;
            </motion.span>
          </a>
        </motion.div>
      </div>

      {/* Detail modal */}
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
          >
            <motion.div
              className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-gray-950 p-8"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 text-gray-400 transition-colors hover:text-white"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {selectedProject.image && (
                <div className="relative -mx-8 -mt-8 mb-6 h-48 overflow-hidden rounded-t-2xl">
                  <Image src={selectedProject.image} alt={selectedProject.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
                </div>
              )}

              <span
                className="mb-2 inline-block rounded-full border px-3 py-1 text-xs"
                style={{
                  borderColor: `${CATEGORY_ACCENTS[selectedProject.category]}30`,
                  color: CATEGORY_ACCENTS[selectedProject.category],
                }}
              >
                {selectedProject.category}
              </span>
              <h2 className="mt-2 text-2xl font-bold text-white">{selectedProject.name}</h2>
              <p className="mt-1 text-sm" style={{ color: CATEGORY_ACCENTS[selectedProject.category] }}>{selectedProject.role}</p>
              <p className="mt-4 leading-relaxed text-gray-300">{selectedProject.explanation}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech) => (
                  <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">{tech}</span>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                {selectedProject.link && (
                  <a href={selectedProject.link} target="_blank" rel="noopener noreferrer"
                    className="rounded-xl px-5 py-2.5 text-sm font-semibold text-black"
                    style={{ backgroundColor: CATEGORY_ACCENTS[selectedProject.category] }}>
                    Live Demo
                  </a>
                )}
                {selectedProject.github && (
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer"
                    className="rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:border-white/40">
                    GitHub
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
