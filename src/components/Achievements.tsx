'use client';

import { motion } from 'motion/react';
import { hackathons } from '@/lib/data';
import { TypingText } from '@/components/ui/typing-text';
import styles from './Achievements.module.css';

const iconPaths: Record<string, string> = {
  trophy: 'M6 9H4.5a2.5 2.5 0 0 1 0-5H6m12 5h1.5a2.5 2.5 0 0 0 0-5H18M9 21h6m-3-3v3M7 4h10v7a5 5 0 0 1-10 0V4z',
  medal: 'M12 15l-3 6 3-2 3 2-3-6m0 0a6 6 0 1 0 0-12 6 6 0 0 0 0 12z',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z',
};

export default function Achievements() {
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
            <TypingText text="Achievements" speed={60} className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent" cursorClassName="bg-pink-400" />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {hackathons.map((hack, i) => (
            <motion.div
              key={i}
              className={`${styles.card} rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-pink-400/30`}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="mb-3 flex items-center gap-3">
                <motion.svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-pink-400"
                  initial={{ rotate: -20, opacity: 0 }}
                  whileInView={{ rotate: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.2, type: 'spring' }}
                >
                  <path d={iconPaths[hack.icon]} />
                </motion.svg>
                <span className="rounded-full border border-pink-400/20 bg-pink-400/10 px-2 py-0.5 text-xs text-pink-400">
                  {hack.year}
                </span>
              </div>
              <p className="text-lg font-bold text-pink-400">{hack.placement}</p>
              <p className="mt-1 font-semibold text-white">{hack.name}</p>
              <p className="mt-2 text-sm text-gray-400">{hack.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
