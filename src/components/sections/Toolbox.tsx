'use client';

import { motion, useReducedMotion } from 'motion/react';
import SectionShell from '@/components/sections/SectionShell';
import SectionHeading from '@/components/sections/SectionHeading';
import { Star, Sparkle } from '@/components/hero/Doodles';
import { cn } from '@/lib/utils';
import { skillCategories } from '@/lib/data';

const TILTS = [-2, 1, -1, 2, 0];

function Chip({ label, index }: { label: string; index: number }) {
  const shouldReduce = useReducedMotion();
  const tilt = TILTS[index % 5];

  return (
    <motion.span
      initial={shouldReduce ? false : { opacity: 0, y: 10, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        delay: (index % 8) * 0.04,
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ rotate: tilt }}
      className={cn(
        'inline-flex items-center rounded-full border-2 border-[var(--hd-ink)]',
        'px-3 py-1.5 font-[family-name:var(--font-mono-hd)] text-sm text-[var(--hd-ink)]',
        'transition-transform hover:scale-105 cursor-default select-none',
        'bg-[var(--hd-surface)]',
      )}
    >
      {label}
    </motion.span>
  );
}

export default function Toolbox() {
  const shouldReduce = useReducedMotion();

  return (
    <SectionShell id="toolbox" tinted>
      <div className="relative">
        <span className="absolute -top-4 right-8 opacity-30 text-[var(--hd-pink)]">
          <Star size={28} />
        </span>
        <span className="absolute bottom-0 left-4 opacity-20 text-[var(--hd-lavender)]">
          <Sparkle size={22} />
        </span>

        <SectionHeading title="My toolbox" kicker="things i use" />

        <div className="mt-10 space-y-10">
          {skillCategories.map((category, ci) => {
            let chipOffset = skillCategories
              .slice(0, ci)
              .reduce((sum, c) => sum + c.skills.length, 0);

            return (
              <div key={category.name}>
                <motion.p
                  initial={shouldReduce ? false : { opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-3 font-[family-name:var(--font-hand)] italic text-sm text-[var(--hd-ink-muted)]"
                >
                  {category.name}
                </motion.p>
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, si) => (
                    <Chip key={skill} label={skill} index={chipOffset + si} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
