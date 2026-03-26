'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experiences } from '@/lib/data';

const ExperienceGlobe = dynamic(() => import('./ExperienceGlobe'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-48 w-48 animate-pulse rounded-full border border-pink-400/10 bg-pink-400/5" />
    </div>
  ),
});

const COMPANY_LOGOS: Record<string, string> = {
  'Bangkok Bank Public Company Limited (BBL)': '/logo/bbl.png',
  'Aiful Corp, Aira & Aiful Public Company Limited': '/logo/airaaiful.png',
  'Siam Commercial Bank (SCB)': '/logo/scb.png',
};

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props {
  condensed?: boolean;
}

const SCENE_COLORS = [
  { bg: 'radial-gradient(ellipse at 20% 50%, rgba(236,72,153,0.08) 0%, transparent 70%)', accent: '#ec4899' },
  { bg: 'radial-gradient(ellipse at 80% 30%, rgba(168,85,247,0.08) 0%, transparent 70%)', accent: '#a855f7' },
  { bg: 'radial-gradient(ellipse at 50% 80%, rgba(244,114,182,0.06) 0%, transparent 70%)', accent: '#f472b6' },
  { bg: 'radial-gradient(ellipse at 30% 20%, rgba(192,38,211,0.07) 0%, transparent 70%)', accent: '#c026d3' },
  { bg: 'radial-gradient(ellipse at 70% 60%, rgba(236,72,153,0.08) 0%, transparent 70%)', accent: '#ec4899' },
  { bg: 'radial-gradient(ellipse at 40% 40%, rgba(168,85,247,0.06) 0%, transparent 70%)', accent: '#a855f7' },
  { bg: 'radial-gradient(ellipse at 60% 70%, rgba(244,114,182,0.07) 0%, transparent 70%)', accent: '#f472b6' },
];

export default function ExperienceTimeline({ condensed = false }: Props) {
  const entries = condensed ? experiences.filter((e) => e.featured) : experiences;
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const totalScenes = entries.length;
    const scrollPerScene = window.innerHeight * 1.2;

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: () => `+=${scrollPerScene * totalScenes}`,
      pin: true,
      pinSpacing: true,
      scrub: 0.8,
      onUpdate: (self) => {
        const p = self.progress;
        setProgress(p);
        const idx = Math.min(Math.floor(p * totalScenes), totalScenes - 1);
        setActiveIndex(idx);
      },
      onRefresh: () => {
        // Remove overflow:hidden from GSAP pin-spacer wrapper
        const spacer = containerRef.current?.parentElement;
        if (spacer?.classList.contains('pin-spacer')) {
          spacer.style.overflow = 'visible';
        }
      },
    });

    return () => st.kill();
  }, [entries.length]);

  const sceneProgress = (progress * entries.length) % 1;

  return (
    <section className="relative overflow-visible">
      <div
        ref={containerRef}
        className="relative h-screen bg-black"
      >
        {/* Subtle diagonal accent lines only */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          key={activeIndex}
        >
          <motion.div
            className="absolute h-[200vh] w-px origin-top"
            style={{
              left: '15%',
              top: '-20%',
              transform: 'rotate(15deg)',
              background: `linear-gradient(to bottom, transparent, ${SCENE_COLORS[activeIndex % SCENE_COLORS.length].accent}15, transparent)`,
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </motion.div>

        {/* 3D Globe on the right */}
        <div
          className="pointer-events-none absolute -right-[5%] -top-[10%] hidden h-[120%] w-[60%] lg:block"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 100%)',
            overflow: 'visible',
          }}
        >
          <ExperienceGlobe activeIndex={activeIndex} progress={progress} />
          {/* Location + Coordinates overlay */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="absolute bottom-[15%] right-[8%] flex flex-col items-end gap-1.5"
              initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Location name */}
              <div className="flex items-center gap-2">
                <motion.div
                  className="h-1.5 w-1.5 rounded-full bg-pink-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <span className="text-xs font-medium tracking-wider text-pink-400/80">
                  {(['Silom, Bangkok', 'Sathorn, Bangkok', 'Chatuchak, Bangkok', 'Remote, Bangkok'])[activeIndex % 4]}
                </span>
              </div>
              {/* Coordinates */}
              <motion.div
                className="font-mono text-[10px] tracking-widest text-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {(['13.7262\u00b0N 100.5237\u00b0E', '13.7213\u00b0N 100.5292\u00b0E', '13.7999\u00b0N 100.5533\u00b0E', '13.7563\u00b0N 100.5018\u00b0E'])[activeIndex % 4]}
              </motion.div>
              {/* Altitude line */}
              <div className="mt-1 flex items-center gap-2">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-400/30" />
                <span className="text-[9px] tracking-wider text-white/15">TH</span>
              </div>
            </motion.div>
          </AnimatePresence>
          {/* Scene number small */}
          <motion.div
            className="absolute right-[10%] top-[15%]"
            key={`num-${activeIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.06 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[12vw] font-black leading-none text-white">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
          </motion.div>
        </div>

        {/* Main content area */}
        <div className="relative z-10 flex h-full flex-col justify-center px-8 sm:px-16 lg:px-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="max-w-3xl"
              initial="enter"
              animate="active"
              exit="exit"
              variants={{
                enter: {},
                active: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                exit: {},
              }}
            >
              {/* Year badge */}
              <motion.div
                className="mb-4 flex items-center gap-3"
                variants={{
                  enter: { opacity: 0, y: 20, filter: 'blur(8px)' },
                  active: { opacity: 1, y: 0, filter: 'blur(0px)' },
                  exit: { opacity: 0, y: -15, filter: 'blur(4px)' },
                }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span
                  className="rounded-full border px-4 py-1.5 text-sm font-medium"
                  style={{
                    borderColor: `${SCENE_COLORS[activeIndex % SCENE_COLORS.length].accent}40`,
                    color: SCENE_COLORS[activeIndex % SCENE_COLORS.length].accent,
                    backgroundColor: `${SCENE_COLORS[activeIndex % SCENE_COLORS.length].accent}10`,
                  }}
                >
                  {entries[activeIndex].year}
                </span>
                {entries[activeIndex].type && (
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
                    {entries[activeIndex].type}
                  </span>
                )}
              </motion.div>

              {/* Giant role title */}
              <motion.h3
                className="mb-2 text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl"
                variants={{
                  enter: { opacity: 0, y: 40, filter: 'blur(12px)' },
                  active: { opacity: 1, y: 0, filter: 'blur(0px)' },
                  exit: { opacity: 0, y: -30, filter: 'blur(8px)' },
                }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {entries[activeIndex].role}
              </motion.h3>

              {/* Company with logo */}
              <motion.div
                className="mb-6 flex items-center gap-4"
                variants={{
                  enter: { opacity: 0, y: 30, filter: 'blur(6px)' },
                  active: { opacity: 1, y: 0, filter: 'blur(0px)' },
                  exit: { opacity: 0, y: -20, filter: 'blur(4px)' },
                }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {COMPANY_LOGOS[entries[activeIndex].company] && (
                  <div className="flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
                    <Image
                      src={COMPANY_LOGOS[entries[activeIndex].company]}
                      alt={entries[activeIndex].company}
                      width={48}
                      height={48}
                      className="h-12 w-12 object-contain"
                    />
                  </div>
                )}
                <p
                  className="text-lg font-medium italic sm:text-xl"
                  style={{ color: `${SCENE_COLORS[activeIndex % SCENE_COLORS.length].accent}99` }}
                >
                  {entries[activeIndex].company}
                </p>
              </motion.div>

              {/* Description */}
              <motion.p
                className="mb-8 max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg"
                variants={{
                  enter: { opacity: 0, y: 25 },
                  active: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -15 },
                }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {entries[activeIndex].description}
              </motion.p>

              {/* Tech stack with staggered reveal */}
              {entries[activeIndex].techUsed && entries[activeIndex].techUsed.length > 0 && (
                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={{
                    enter: {},
                    active: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } },
                    exit: {},
                  }}
                >
                  {entries[activeIndex].techUsed.map((tech) => (
                    <motion.span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300 backdrop-blur-sm transition-colors duration-300 hover:border-pink-400/40 hover:text-white"
                      variants={{
                        enter: { opacity: 0, scale: 0.8, y: 10 },
                        active: { opacity: 1, scale: 1, y: 0 },
                        exit: { opacity: 0, scale: 0.9 },
                      }}
                      transition={{ duration: 0.4, ease: 'backOut' }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom progress bar */}
        <div className="absolute bottom-10 left-8 right-8 z-20 sm:left-16 sm:right-16 lg:left-24 lg:right-24">
          <div className="flex items-center gap-4">
            {/* Scene markers */}
            <div className="flex flex-1 items-center gap-1">
              {entries.map((entry, i) => (
                <div key={i} className="group relative flex-1">
                  {/* Track */}
                  <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: SCENE_COLORS[i % SCENE_COLORS.length].accent,
                        width: i < activeIndex ? '100%' : i === activeIndex ? `${sceneProgress * 100}%` : '0%',
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  {/* Label on hover */}
                  <div
                    className={`absolute -top-8 left-0 whitespace-nowrap text-xs transition-opacity duration-300 ${
                      i === activeIndex ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                    }`}
                    style={{ color: i === activeIndex ? SCENE_COLORS[i % SCENE_COLORS.length].accent : '#9ca3af' }}
                  >
                    {entry.company.split('(')[0].trim().split(',')[0].trim()}
                  </div>
                </div>
              ))}
            </div>

            {/* Counter */}
            <div className="flex items-baseline gap-1 tabular-nums">
              <span className="text-lg font-bold text-white">{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="text-xs text-gray-500">/</span>
              <span className="text-xs text-gray-500">{String(entries.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        {/* Scroll hint (first scene only) */}
        <AnimatePresence>
          {activeIndex === 0 && sceneProgress < 0.1 && (
            <motion.div
              className="absolute bottom-28 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs tracking-widest text-gray-500 uppercase">Scroll</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(236,72,153,0.4)" strokeWidth="2">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA at the end */}
        {condensed && activeIndex === entries.length - 1 && sceneProgress > 0.7 && (
          <motion.div
            className="absolute bottom-28 right-8 z-20 sm:right-16 lg:right-24"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a
              href="/experience"
              className="group flex items-center gap-3 rounded-full border border-pink-400/30 bg-pink-400/5 px-6 py-3 text-sm font-medium text-pink-400 backdrop-blur-sm transition-all duration-500 hover:border-pink-400/50 hover:bg-pink-400/10"
            >
              See Full Journey
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >
                &rarr;
              </motion.span>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
