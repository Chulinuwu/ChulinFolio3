'use client';

import { motion } from 'motion/react';
import { heroData, education } from '@/lib/data';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <motion.footer
      className="border-t border-white/10 py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
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
    </motion.footer>
  );
}
