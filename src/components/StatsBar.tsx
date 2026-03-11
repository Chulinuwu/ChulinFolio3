'use client';

import { Fragment, useState, useEffect, useRef } from 'react';
import { stats } from '@/lib/data';

export default function StatsBar() {
  const [current, setCurrent] = useState(stats.map(() => 0));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stats.forEach((stat, i) => {
              const start = performance.now();
              const duration = 1500;
              const animate = (now: number) => {
                const elapsed = Math.min(now - start, duration);
                const progress = elapsed / duration;
                const eased = 1 - Math.pow(1 - progress, 3);
                setCurrent((prev) => {
                  const next = [...prev];
                  next[i] = Math.round(eased * stat.value);
                  return next;
                });
                if (elapsed < duration) requestAnimationFrame(animate);
              };
              requestAnimationFrame(animate);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="rounded-2xl border border-white/10 bg-white/5 px-6 py-8 backdrop-blur-xl sm:px-10"
        >
          <div className="grid grid-cols-2 gap-8 sm:flex sm:flex-row sm:items-center sm:justify-around sm:gap-0">
            {stats.map((stat, i) => (
              <Fragment key={stat.label}>
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl font-bold text-white sm:text-4xl">
                    {current[i]}{stat.suffix}
                  </div>
                  <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
                </div>
                {i < stats.length - 1 && (
                  <div className="hidden h-12 w-px bg-white/10 sm:block" />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
