'use client';

import { motion, useReducedMotion } from 'motion/react';
import SectionShell from '@/components/sections/SectionShell';
import SectionHeading from '@/components/sections/SectionHeading';
import RoughFrame from '@/components/hero/RoughFrame';
import { Star, Sparkle } from '@/components/hero/Doodles';
import { cn } from '@/lib/utils';
import { experiences } from '@/lib/data';

const ease = [0.16, 1, 0.3, 1] as const;

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

// oldest first: parse the start of the `year` range into a sortable year*12+month key
function startKey(year: string): number {
  const start = year.split('-')[0].toLowerCase();
  const y = Number(start.match(/\d{4}/)?.[0] ?? 0);
  const m = MONTHS.findIndex((mo) => start.includes(mo));
  return y * 12 + (m < 0 ? 0 : m);
}

const TYPE_COLORS: Record<string, string> = {
  internship: 'var(--hd-sky)',
  freelance: 'var(--hd-peach)',
  academic: 'var(--hd-lavender)',
  extracurricular: 'var(--hd-mint)',
};

const DOT_TINTS = [
  'var(--hd-pink-soft)',
  'var(--hd-sky)',
  'var(--hd-butter)',
  'var(--hd-mint)',
  'var(--hd-lavender)',
  'var(--hd-peach)',
];

export default function Journey() {
  const reduce = useReducedMotion();
  const items = [...experiences].sort((a, b) => startKey(a.year) - startKey(b.year));

  return (
    <SectionShell id="journey" tinted className="relative overflow-hidden">
      <Star
        className="absolute top-4 right-6 w-6 h-6 opacity-50 hidden md:block"
        color="var(--hd-pink)"
      />
      <Sparkle
        className="absolute bottom-8 left-3 w-5 h-5 opacity-40 hidden md:block"
        color="var(--hd-butter)"
      />

      <SectionHeading title="My journey" kicker="where i have been" />

      <div className="mt-10 relative">
        {/* vertical timeline line */}
        <div className="absolute left-3 top-0 bottom-0 w-0 border-l-2 border-dashed border-[var(--hd-pink-soft)] md:left-4" />

        <ol className="flex flex-col gap-8">
          {items.map((exp, i) => {
            const tilt = i % 2 === 0 ? 'rotate-[-1deg]' : 'rotate-[1deg]';
            const dotColor = DOT_TINTS[i % DOT_TINTS.length];
            const badgeColor = TYPE_COLORS[exp.type] ?? 'var(--hd-lavender)';
            const pills = exp.techUsed?.slice(0, 5) ?? [];

            return (
              <motion.li
                key={i}
                className="relative pl-10 md:pl-14"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease, delay: i * 0.06 }}
              >
                {/* dot */}
                <span
                  className="absolute left-0 top-4 w-7 h-7 rounded-full border-2 border-[var(--hd-surface)] md:left-0.5"
                  style={{ background: dotColor }}
                />

                <RoughFrame
                  radius={20}
                  strokeWidth={2}
                  roughness={1.5}
                  className={cn(
                    tilt,
                    'transition-transform duration-200 hover:-translate-y-0.5',
                    'rounded-[20px]'
                  )}
                >
                  <div className="p-5 flex flex-col gap-2">
                    {/* year + type badge */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-[family-name:var(--font-mono-hd)] text-[var(--hd-pink-strong)] tracking-wide">
                        {exp.year}
                      </span>
                      <span
                        className="text-[10px] font-[family-name:var(--font-body)] px-2 py-0.5 rounded-full capitalize"
                        style={{ background: badgeColor, color: 'var(--hd-ink)' }}
                      >
                        {exp.type}
                      </span>
                    </div>

                    {/* role */}
                    <h3 className="text-base leading-snug text-[var(--hd-ink)] font-[family-name:var(--font-display)]">
                      {exp.role}
                    </h3>

                    {/* company */}
                    <p className="text-sm text-[var(--hd-ink-muted)] font-[family-name:var(--font-body)] leading-snug">
                      {exp.company}
                    </p>

                    {/* description */}
                    <p className="text-xs text-[var(--hd-ink-muted)] font-[family-name:var(--font-body)] leading-relaxed">
                      {exp.description}
                    </p>

                    {/* tech pills */}
                    {pills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {pills.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-[family-name:var(--font-mono-hd)] px-2 py-0.5 rounded-full border border-[var(--hd-pink-soft)] text-[var(--hd-ink-muted)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </RoughFrame>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </SectionShell>
  );
}
