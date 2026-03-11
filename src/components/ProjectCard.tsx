'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import type { Project } from '@/lib/data';

interface Props {
  project: Project;
  variant?: 'wide' | 'standard';
  onClick?: () => void;
}

export default function ProjectCard({ project, variant = 'standard', onClick }: Props) {
  const hasImage = !!project.image;
  const isWide = variant === 'wide';

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      className={`group relative flex cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors duration-300 hover:border-pink-400/30 ${
        isWide ? 'h-[280px] flex-row' : 'h-[280px] flex-col'
      }`}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
    >
      {project.placement && (
        <div className="absolute right-[-28px] top-[18px] z-20 rotate-45 bg-gradient-to-r from-pink-500 to-pink-400 px-10 py-0.5 text-[10px] font-semibold text-black shadow">
          {project.placement}
        </div>
      )}

      {hasImage && isWide ? (
        <>
          {/* Wide: image on left, text on right */}
          <div className="relative h-full w-1/2 shrink-0 overflow-hidden">
            <Image
              src={project.image!}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between p-5">
            <div className="flex flex-col gap-2">
              <div>
                <p className="mb-1 text-xs font-medium text-pink-400">{project.role}</p>
                <h3 className="text-xl font-bold leading-snug text-white">{project.name}</h3>
              </div>
              <p className="text-sm text-gray-400 line-clamp-3">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span key={tech} className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500 transition-colors duration-200 group-hover:text-pink-400">
              View Details →
            </div>
          </div>
        </>
      ) : hasImage ? (
        <>
          {/* Standard with image: full bleed background */}
          <Image
            src={project.image!}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
          <div className="relative z-10 mt-auto flex flex-col gap-2 p-5">
            <div>
              <p className="mb-1 text-xs font-medium text-pink-400">{project.role}</p>
              <h3 className="text-lg font-bold leading-snug text-white">{project.name}</h3>
            </div>
            <p className="text-sm text-gray-300 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span key={tech} className="rounded-full bg-white/15 px-2 py-0.5 text-[11px] text-white/80 backdrop-blur-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* No image */
        <div className="flex flex-1 flex-col justify-between p-5">
          <div className="flex flex-col gap-2">
            <div>
              <p className="mb-1 text-xs font-medium text-pink-400">{project.role}</p>
              <h3 className="text-lg font-bold leading-snug text-white">{project.name}</h3>
            </div>
            <p className="text-sm text-gray-400 line-clamp-3">{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span key={tech} className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-gray-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-500 transition-colors duration-200 group-hover:text-pink-400">
            View Details →
          </div>
        </div>
      )}
    </motion.div>
  );
}
