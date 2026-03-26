'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroData, education } from '@/lib/data';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const year = new Date().getFullYear();

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current.querySelector('img'),
          { backgroundPositionY: '0%' },
          {
            backgroundPositionY: '-20%',
            ease: 'none',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          bgRef.current.querySelector('img'),
          { y: '0%' },
          {
            y: '-10%',
            ease: 'none',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }
    }, footerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <motion.footer
      ref={footerRef}
      className="relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Cloud art as background spanning entire footer */}
      <div ref={bgRef} className="absolute inset-0 overflow-hidden">
        <Image
          src="/cloud.webp"
          alt=""
          fill
          className="object-cover object-top opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/60" />
      </div>

      <div className="relative z-10 px-4 pb-8 pt-32 sm:px-6 sm:pt-40 lg:px-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <div>
            <p className="font-semibold text-white">{heroData.name}</p>
            <p className="text-sm text-gray-500">
              {education.degree} · {education.institution} · {education.period}
            </p>
          </div>
          <p className="text-sm text-gray-500">
            © {year} {heroData.name} #Chulinxz
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
