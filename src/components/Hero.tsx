'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { heroData, badges } from '@/lib/data';
import { TypingText } from '@/components/ui/typing-text';
import { Spotlight } from '@/components/ui/spotlight';

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Spotlight cursor effect */}
      <Spotlight className="absolute inset-0 z-20" size={600} color="rgba(236, 72, 153, 0.06)" />

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-900/25 blur-[150px]" />
        <div className="absolute left-1/3 top-[20%] h-[300px] w-[300px] rounded-full bg-pink-600/10 blur-[120px]" />
      </div>

      {/* Text content with animations */}
      <div className="relative z-10 flex flex-col items-center gap-5 px-4 pt-28 text-center sm:pt-32">
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          <TypingText
            text={heroData.name}
            speed={70}
            delay={300}
            className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent"
            cursorClassName="bg-pink-400"
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-xl font-semibold text-white/90 sm:text-2xl"
        >
          {heroData.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-sm text-gray-400"
        >
          {heroData.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="max-w-lg text-base leading-relaxed text-gray-300"
        >
          {heroData.objective}
        </motion.p>

        {/* Badge chips with staggered animation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05, delayChildren: 1.2 } },
          }}
          className="flex flex-wrap justify-center gap-2"
        >
          {badges.map((badge) => (
            <motion.span
              key={badge}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(244, 114, 182, 0.7)' }}
              className="whitespace-nowrap rounded-full border border-pink-400/40 bg-pink-400/10 px-3 py-1.5 text-xs text-pink-300 backdrop-blur-sm sm:text-sm"
            >
              {badge}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="flex flex-col gap-4 pt-2 sm:flex-row"
        >
          <motion.a
            href={heroData.buttons.primary.href}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden rounded-2xl bg-pink-500 px-8 py-3.5 text-center font-semibold text-black transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]"
          >
            {heroData.buttons.primary.text}
          </motion.a>
          <motion.a
            href={heroData.buttons.secondary.href}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-2xl border border-white/20 bg-white/5 px-8 py-3.5 text-center font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:border-white/40 hover:bg-white/10"
          >
            {heroData.buttons.secondary.text}
          </motion.a>
        </motion.div>
      </div>

      {/* Full-width character image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 -mt-4"
      >
        <Image
          src="/Chulinpicwithbg.png"
          alt={heroData.name}
          width={1920}
          height={1080}
          className="w-full object-cover object-top"
          priority
        />
        <div className="absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-black to-transparent" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 2 }, y: { repeat: Infinity, duration: 1.5 } }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
