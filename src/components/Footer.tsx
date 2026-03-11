'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { heroData, education } from '@/lib/data';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <motion.footer
      className="relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Cloud art as background spanning entire footer */}
      <div className="absolute inset-0 overflow-hidden">
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
