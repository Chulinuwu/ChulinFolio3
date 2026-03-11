'use client';

import type { Project } from '@/lib/data';

const minHeightMap = {
  large: 'min-h-[400px]',
  tall: 'min-h-[350px]',
  standard: 'min-h-[250px]',
} as const;

interface Props {
  project: Project;
  size?: 'large' | 'tall' | 'standard';
  onClick?: () => void;
}

export default function ProjectCard({ project, size = 'standard', onClick }: Props) {
  const minHeightClass = minHeightMap[size];

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      className={`relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-pink-400/30 ${minHeightClass}`}
    >
      {project.placement && (
        <div className="absolute right-[-28px] top-[18px] z-10 rotate-45 bg-gradient-to-r from-pink-500 to-pink-400 px-10 py-0.5 text-[10px] font-semibold text-black shadow">
          {project.placement}
        </div>
      )}

      <div className="flex flex-col gap-3">
        <div>
          <p className="mb-1 text-xs font-medium text-pink-400">{project.role}</p>
          <h3 className="font-bold text-white text-lg leading-snug">{project.name}</h3>
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

      <div className="mt-4 text-xs text-gray-500 transition-colors duration-200 group-hover:text-pink-400">
        View Details →
      </div>
    </div>
  );
}
