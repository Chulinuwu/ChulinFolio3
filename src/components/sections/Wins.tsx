'use client';

import { motion, useReducedMotion } from 'motion/react';
import SectionShell from '@/components/sections/SectionShell';
import SectionHeading from '@/components/sections/SectionHeading';
import RoughFrame from '@/components/hero/RoughFrame';
import { Star, Sparkle } from '@/components/hero/Doodles';
import { cn } from '@/lib/utils';
import { hackathons } from '@/lib/data';
import { TrophyIcon, MedalIcon, StarIcon } from '@phosphor-icons/react';

const iconMap = {
  trophy: TrophyIcon,
  medal: MedalIcon,
  star: StarIcon,
};

const tints = ['var(--hd-butter)', 'var(--hd-peach)', 'var(--hd-mint)', 'var(--hd-lavender)'];
const tilts = ['rotate-[-1.5deg]', 'rotate-[1deg]', 'rotate-[-0.8deg]', 'rotate-[1.2deg]'];

export default function Wins() {
  const reduced = useReducedMotion();

  return (
    <SectionShell id="wins">
      <SectionHeading title="Wins and hackathons" kicker="some highlights" />

      <div className="relative">
        <div className="absolute -top-4 right-8 opacity-40 pointer-events-none">
          <Sparkle className="h-8 w-8" />
        </div>
        <div className="absolute bottom-0 left-4 opacity-30 pointer-events-none">
          <Star className="h-6 w-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {hackathons.map((item, i) => {
            const Icon = iconMap[item.icon] ?? TrophyIcon;
            const tint = tints[i % tints.length];
            const tilt = tilts[i % tilts.length];

            return (
              <motion.div
                key={i}
                initial={reduced ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={cn('group h-full', tilt)}
              >
                <RoughFrame
                  className={cn(
                    'h-full rounded-[20px] p-5 flex flex-col gap-3',
                    'hover:-translate-y-1 transition-transform duration-200'
                  )}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: tint }}
                  >
                    <Icon weight="bold" size={20} style={{ color: 'var(--hd-ink)' }} />
                  </div>

                  <div>
                    <p
                      className="text-lg leading-tight font-semibold"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--hd-pink-strong)' }}
                    >
                      {item.placement}
                    </p>
                    <p
                      className="text-base font-semibold leading-snug mt-0.5"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--hd-ink)' }}
                    >
                      {item.name}
                    </p>
                  </div>

                  <p
                    className="text-xs tracking-wide"
                    style={{ fontFamily: 'var(--font-mono-hd)', color: 'var(--hd-ink-muted)' }}
                  >
                    {item.year}
                  </p>

                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--hd-ink-muted)' }}
                  >
                    {item.description}
                  </p>
                </RoughFrame>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
