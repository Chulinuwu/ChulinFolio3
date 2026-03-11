'use client';

import { motion } from 'motion/react';
import { experiences } from '@/lib/data';
import { TypingText } from '@/components/ui/typing-text';

interface Props {
  condensed?: boolean;
}

export default function ExperienceTimeline({ condensed = false }: Props) {
  const entries = condensed ? experiences.filter((e) => e.featured) : experiences;

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
          <h2 className="relative inline-block text-3xl font-bold text-white sm:text-5xl">
            <TypingText text="Experience" speed={60} className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent" cursorClassName="bg-pink-400" />
          </h2>
        </motion.div>

        <div className="relative">
          <motion.div
            className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-pink-400/0 via-pink-400/60 to-pink-400/0"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ transformOrigin: 'top' }}
          />

          <div className="flex flex-col gap-8">
            {entries.map((entry, i) => (
              <motion.div
                key={i}
                className="relative flex items-start gap-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <motion.div
                  className="absolute left-4 top-6 h-4 w-4 -translate-x-1/2 rounded-full bg-pink-400 ring-4 ring-black"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.15 + 0.2, type: 'spring' }}
                />

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
              </motion.div>
            ))}
          </div>
        </div>

        {condensed && (
          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a href="/experience" className="text-pink-400 transition-colors hover:text-pink-300">
              See Full Experience →
            </a>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
