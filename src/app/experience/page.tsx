'use client';

import Image from 'next/image';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import SkillsGrid from '@/components/SkillsGrid';
import Achievements from '@/components/Achievements';
import InfiniteScrollTech from '@/components/InfiniteScrollTech';
import Footer from '@/components/Footer';
import { education } from '@/lib/data';
import { useRevealOnScroll } from '@/lib/hooks';

export default function ExperiencePage() {
  const revealRef = useRevealOnScroll();

  return (
    <div className="min-h-screen bg-black pt-24 text-white">
      <div ref={revealRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with photo */}
        <div className="mb-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-2xl bg-pink-500/20 blur-xl" />
            <Image
              src="/anan.jpg"
              alt="An-An"
              width={160}
              height={160}
              className="relative h-32 w-32 rounded-2xl border border-white/10 object-cover shadow-lg sm:h-40 sm:w-40"
            />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-bold sm:text-5xl">
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent">
                Experience
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-gray-400">
              {education.degree} at {education.institution} · {education.period}
            </p>
          </div>
        </div>

        {/* Art showcase strip */}
        <div className="mb-12 overflow-hidden rounded-2xl border border-white/10">
          <Image
            src="/pic1.webp"
            alt="Illustration artwork by An-An"
            width={1200}
            height={256}
            className="h-48 w-full object-cover object-top opacity-70 transition-opacity duration-300 hover:opacity-100 sm:h-64"
          />
        </div>
      </div>

      <ExperienceTimeline />
      <SkillsGrid />
      <div className="py-8">
        <InfiniteScrollTech />
      </div>
      <Achievements />
      <Footer />
    </div>
  );
}
