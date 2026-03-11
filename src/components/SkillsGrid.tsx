'use client';

import { motion } from 'motion/react';
import { skillCategories } from '@/lib/data';
import { TypingText } from '@/components/ui/typing-text';

interface Props {
  condensed?: boolean;
}

const categoryIcons: Record<string, string> = {
  Languages: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
  Frameworks: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  'Tools & Cloud': 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
  'Data & ML': 'M12 20V10M18 20V4M6 20v-4',
};

export default function SkillsGrid({ condensed = false }: Props) {
  const categories = condensed ? skillCategories : skillCategories;

  return (
    <motion.section
      className="py-12 sm:py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold sm:text-5xl">
            <TypingText text="Skills & Technologies" speed={50} className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent" cursorClassName="bg-pink-400" />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, i) => (
            <motion.div
              key={category.name}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-pink-400/30"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-400/10">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-pink-400"
                  >
                    <path d={categoryIcons[category.name] || categoryIcons.Languages} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">{category.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, j) => (
                  <motion.span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300 transition-colors duration-200 hover:border-pink-400/30 hover:text-pink-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 + j * 0.03 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {condensed && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a href="/experience" className="text-pink-400 transition-colors hover:text-pink-300">
              View All Skills →
            </a>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
