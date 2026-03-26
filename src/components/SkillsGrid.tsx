'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { skillCategories } from '@/lib/data';

const CATEGORY_CONFIG: Record<string, { icon: string; accent: string; gradient: string }> = {
  Languages: {
    icon: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
    accent: '#ec4899',
    gradient: 'from-pink-500/10 to-pink-500/0',
  },
  Frameworks: {
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    accent: '#a855f7',
    gradient: 'from-purple-500/10 to-purple-500/0',
  },
  'Tools & Cloud': {
    icon: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
    accent: '#f472b6',
    gradient: 'from-pink-400/10 to-pink-400/0',
  },
  'Data & ML': {
    icon: 'M12 20V10M18 20V4M6 20v-4',
    accent: '#c084fc',
    gradient: 'from-violet-400/10 to-violet-400/0',
  },
};

interface Props {
  condensed?: boolean;
}

export default function SkillsGrid({ condensed = false }: Props) {
  const [activeCategory, setActiveCategory] = useState(0);
  const categories = condensed ? skillCategories : skillCategories;

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="mb-14"
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
            Tech Stack
          </motion.p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Skills & Technologies
          </h2>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          className="mb-10 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category, i) => {
            const config = CATEGORY_CONFIG[category.name] || CATEGORY_CONFIG.Languages;
            const isActive = activeCategory === i;
            return (
              <button
                key={category.name}
                onClick={() => setActiveCategory(i)}
                className="relative rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300"
                style={{
                  color: isActive ? config.accent : '#9ca3af',
                  borderColor: isActive ? `${config.accent}40` : 'rgba(255,255,255,0.1)',
                  backgroundColor: isActive ? `${config.accent}10` : 'transparent',
                  border: '1px solid',
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={config.icon} />
                  </svg>
                  {category.name}
                </span>
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `1px solid ${config.accent}40`, backgroundColor: `${config.accent}08` }}
                    layoutId="activeSkillTab"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Active category content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            {(() => {
              const category = categories[activeCategory];
              const config = CATEGORY_CONFIG[category.name] || CATEGORY_CONFIG.Languages;
              return (
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 sm:p-10">
                  {/* Category header */}
                  <div className="mb-8 flex items-center gap-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${config.accent}15`, border: `1px solid ${config.accent}25` }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={config.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={config.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{category.name}</h3>
                      <p className="text-sm text-gray-500">{category.skills.length} technologies</p>
                    </div>
                  </div>

                  {/* Skills grid */}
                  <motion.div
                    className="flex flex-wrap gap-3"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.03 } },
                    }}
                  >
                    {category.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        className="cursor-default rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300 transition-all duration-300 hover:scale-105 hover:text-white"
                        style={{
                          ['--accent' as string]: config.accent,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = `${config.accent}50`;
                          e.currentTarget.style.backgroundColor = `${config.accent}10`;
                          e.currentTarget.style.boxShadow = `0 0 20px ${config.accent}15`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        variants={{
                          hidden: { opacity: 0, scale: 0.8, y: 10 },
                          visible: { opacity: 1, scale: 1, y: 0 },
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              );
            })()}
          </motion.div>
        </AnimatePresence>

        {/* Quick overview - all categories as small badges */}
        <motion.div
          className="mt-8 flex flex-wrap items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {categories.map((category, i) => {
            const config = CATEGORY_CONFIG[category.name] || CATEGORY_CONFIG.Languages;
            if (i === activeCategory) return null;
            return (
              <button
                key={category.name}
                onClick={() => setActiveCategory(i)}
                className="flex items-center gap-2 text-xs text-gray-500 transition-colors duration-300 hover:text-gray-300"
              >
                <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: config.accent }} />
                {category.name}
                <span className="text-white/15">({category.skills.length})</span>
              </button>
            );
          })}
        </motion.div>

        {condensed && (
          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="/experience"
              className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors duration-300 hover:text-pink-400"
            >
              View All Skills
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                &rarr;
              </motion.span>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
