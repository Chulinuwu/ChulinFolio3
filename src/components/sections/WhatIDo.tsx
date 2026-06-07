'use client';

import { motion, useReducedMotion } from 'motion/react';
import { CodeIcon, PaletteIcon, BrainIcon, type Icon } from '@phosphor-icons/react';
import SectionShell from '@/components/sections/SectionShell';
import SectionHeading from '@/components/sections/SectionHeading';
import Polaroid from '@/components/sections/Polaroid';
import RoughFrame from '@/components/hero/RoughFrame';
import { Star, Sparkle } from '@/components/hero/Doodles';

const facets: { icon: Icon; title: string; body: string; tint: string; rotate: string }[] = [
  {
    icon: CodeIcon,
    title: 'Software engineering',
    body: 'Full-stack web apps, APIs and systems. I ship end to end, from idea to deploy.',
    tint: 'var(--hd-sky)',
    rotate: 'rotate-[-1deg]',
  },
  {
    icon: PaletteIcon,
    title: 'Design and illustration',
    body: 'UX/UI, graphics and illustration. I make things people enjoy looking at and using.',
    tint: 'var(--hd-lavender)',
    rotate: 'rotate-[1deg]',
  },
  {
    icon: BrainIcon,
    title: 'Data science and AI',
    body: 'ML, NLP and applied AI with real MLOps. Models that work outside the notebook.',
    tint: 'var(--hd-mint)',
    rotate: 'rotate-[-0.5deg]',
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function WhatIDo() {
  const reduce = useReducedMotion();

  return (
    <SectionShell id="about" className="relative">
      <Star className="absolute top-6 right-8 w-6 h-6 opacity-60 hidden md:block" color="var(--hd-pink)" />
      <Sparkle className="absolute bottom-10 left-4 w-5 h-5 opacity-50 hidden md:block" color="var(--hd-peach)" />

      <SectionHeading title="What I do" kicker="a little about me" />

      <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        {/* left: real photo as a taped polaroid + blurb */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease }}
          className="mx-auto w-full max-w-xs"
        >
          <motion.div
            whileHover={reduce ? undefined : { rotate: 0, y: -6 }}
            transition={{ type: 'spring', stiffness: 200, damping: 16 }}
            className="origin-top rotate-[-3deg]"
          >
            <Polaroid src="/anan.jpg" alt="An-An (Jirameth Wannasiwaporn)" caption="that's me!" />
          </motion.div>
          <p className="mt-7 text-sm leading-relaxed text-[var(--hd-ink-muted)]">
            I am Jirameth (An-An). I build clever systems and draw cute things in between, somewhere
            between software, design and AI.
          </p>
        </motion.div>

        {/* right: three things i do */}
        <div className="flex flex-col gap-5">
          {facets.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                className={f.rotate}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              >
                <RoughFrame
                  radius={20}
                  strokeWidth={2.5}
                  roughness={1.6}
                  className="rounded-[20px] transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4 p-6">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                      style={{ background: f.tint }}
                    >
                      <Icon weight="bold" size={24} color="var(--hd-ink)" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-[family-name:var(--font-display)] text-lg leading-snug text-[var(--hd-ink)]">
                        {f.title}
                      </h3>
                      <p className="font-[family-name:var(--font-body)] text-sm leading-relaxed text-[var(--hd-ink-muted)]">
                        {f.body}
                      </p>
                    </div>
                  </div>
                </RoughFrame>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
