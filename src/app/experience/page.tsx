'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import SkillsGrid from '@/components/SkillsGrid';
import Achievements from '@/components/Achievements';
import InfiniteScrollTech from '@/components/InfiniteScrollTech';
import Footer from '@/components/Footer';
import { education } from '@/lib/data';
import { TypingText } from '@/components/ui/typing-text';
import ParticleBackground from '@/components/ParticleBackground';

export default function ExperiencePage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-black text-white">
      <ParticleBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
      {/* Hero banner with art background */}
      <div className="relative h-[320px] overflow-hidden sm:h-[380px]">
        <Image
          src="/pic1.webp"
          alt="Illustration artwork"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />

        <div className="relative z-10 flex h-full flex-col items-center justify-end gap-4 px-4 pb-10 sm:flex-row sm:justify-center sm:gap-8 sm:pb-12">
          <motion.div
            className="relative shrink-0"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <div className="absolute inset-0 rounded-2xl bg-pink-500/30 blur-xl" />
            <Image
              src="/anan.jpg"
              alt="An-An"
              width={128}
              height={128}
              className="relative h-24 w-24 rounded-2xl border-2 border-pink-400/40 object-cover shadow-lg sm:h-32 sm:w-32"
            />
          </motion.div>
          <motion.div
            className="text-center sm:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold sm:text-5xl">
              <TypingText
                text="Experience"
                speed={70}
                delay={400}
                className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent"
                cursorClassName="bg-pink-400"
              />
            </h1>
            <p className="mt-3 max-w-xl text-sm text-gray-300 sm:text-base">
              {education.degree} at {education.institution} · {education.period}
            </p>
          </motion.div>
        </div>
      </div>

      <ExperienceTimeline />
      <SkillsGrid />
      <div className="py-8">
        <InfiniteScrollTech />
      </div>
      <Achievements />
      <div className="mt-auto">
        <Footer />
      </div>
      </div>
    </div>
  );
}
