'use client';

import { useState } from 'react';
import { projects, type ProjectCategory, type Project } from '@/lib/data';
import ProjectCard from '@/components/ProjectCard';
import Footer from '@/components/Footer';

const categories: { label: string; value: ProjectCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Data Science', value: 'data-science' },
  { label: 'Web Dev', value: 'web-dev' },
  { label: 'IoT', value: 'iot' },
  { label: 'Hackathon', value: 'hackathon' },
  { label: 'Freelance', value: 'freelance' }
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'all'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered =
    activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-black pt-24 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            A collection of things I&apos;ve built — from AI platforms to IoT systems.
          </p>
        </div>

        {/* Filter bar */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`rounded-full border px-4 py-2 text-sm transition-all duration-200 ${
                activeFilter === cat.value
                  ? 'border-pink-400/60 bg-pink-400/20 text-pink-300'
                  : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              variant="standard"
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-gray-500">No projects in this category yet.</p>
        )}
      </div>

      {/* Case study modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedProject(null)}
          onKeyDown={(e) => e.key === 'Escape' && setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.name}
        >
          <div
            className="relative max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-gray-950 p-8"
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

            <span className="mb-2 inline-block rounded-full border border-pink-400/20 bg-pink-400/10 px-3 py-1 text-xs text-pink-400">
              {selectedProject.category}
            </span>
            <h2 className="mt-2 text-2xl font-bold text-white">{selectedProject.name}</h2>
            <p className="mt-1 text-sm text-pink-400">{selectedProject.role}</p>
            <p className="mt-4 leading-relaxed text-gray-300">{selectedProject.explanation}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {selectedProject.techStack.map((tech) => (
                <span key={tech} className="rounded bg-white/10 px-2 py-1 text-xs text-gray-300">
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
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
