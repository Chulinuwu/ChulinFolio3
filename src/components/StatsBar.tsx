'use client';

import { Fragment, useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stats } from '@/lib/data';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StatsBar() {
  const [current, setCurrent] = useState(stats.map(() => 0));
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const gsapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!triggered) return;
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
  }, [triggered]);

  useEffect(() => {
    if (!gsapRef.current) return;
    const el = gsapRef.current;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        once: true,
      },
    });
    tl.to(el, {
      boxShadow: '0 0 60px rgba(236, 72, 153, 0.15)',
      scale: 1.02,
      duration: 0.4,
      ease: 'power2.out',
    }).to(el, {
      boxShadow: 'none',
      scale: 1,
      duration: 0.4,
      ease: 'power2.inOut',
    });
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <motion.section
      className="py-12 sm:py-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onViewportEnter={() => setTriggered(true)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          className="rounded-2xl border border-white/10 bg-white/5 px-6 py-8 backdrop-blur-xl sm:px-10"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div ref={gsapRef} className="grid grid-cols-2 gap-8 sm:flex sm:flex-row sm:items-center sm:justify-around sm:gap-0">
            {stats.map((stat, i) => (
              <Fragment key={stat.label}>
                <motion.div
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                >
                  <div className="text-3xl font-bold text-white sm:text-4xl">
                    {current[i]}{stat.suffix}
                  </div>
                  <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
                </motion.div>
                {i < stats.length - 1 && (
                  <div className="hidden h-12 w-px bg-white/10 sm:block" />
                )}
              </Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
