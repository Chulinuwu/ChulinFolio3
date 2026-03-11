'use client';

import Image from 'next/image';
import { heroData, badges } from '@/lib/data';

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-900/25 blur-[150px]" />
        <div className="absolute left-1/3 top-[20%] h-[300px] w-[300px] rounded-full bg-pink-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-5 px-4 pt-28 text-center sm:pt-32">
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
            {heroData.name}
          </span>
        </h1>

        <p className="text-xl font-semibold text-white/90 sm:text-2xl">{heroData.title}</p>
        <p className="text-sm text-gray-400">{heroData.subtitle}</p>

        <p className="max-w-lg text-base leading-relaxed text-gray-300">{heroData.objective}</p>

        <div className="flex flex-wrap justify-center gap-2">
          {badges.map((badge) => (
            <span
              key={badge}
              className="whitespace-nowrap rounded-full border border-pink-400/40 bg-pink-400/10 px-3 py-1.5 text-xs text-pink-300 backdrop-blur-sm transition-colors duration-200 hover:border-pink-400/70 hover:bg-pink-400/20 sm:text-sm"
            >
              {badge}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-4 pt-2 sm:flex-row">
          <a
            href={heroData.buttons.primary.href}
            className="group relative overflow-hidden rounded-2xl bg-pink-500 px-8 py-3.5 text-center font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-pink-400 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]"
          >
            {heroData.buttons.primary.text}
          </a>
          <a
            href={heroData.buttons.secondary.href}
            className="rounded-2xl border border-white/20 bg-white/5 px-8 py-3.5 text-center font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-white/10"
          >
            {heroData.buttons.secondary.text}
          </a>
        </div>
      </div>

      <div className="relative z-10 -mt-4">
        <Image
          src="/Chulinpicwithbg.png"
          alt={heroData.name}
          width={1920}
          height={1080}
          className="w-full object-cover object-top"
          priority
        />
        <div className="absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-black to-transparent" />
      </div>
    </section>
  );
}
