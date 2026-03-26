'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contacts } from '@/lib/data';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SOCIAL_ICONS: Record<string, { icon: string; color: string }> = {
  Instagram: {
    icon: 'M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z',
    color: '#E1306C',
  },
  GitHub: {
    icon: 'M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z',
    color: '#ffffff',
  },
  LinkedIn: {
    icon: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z',
    color: '#0A66C2',
  },
  Email: {
    icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm16 2l-8 5-8-5v2l8 5 8-5V6z',
    color: '#ec4899',
  },
  Fastwork: {
    icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    color: '#f59e0b',
  },
  Discord: {
    icon: 'M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z',
    color: '#5865F2',
  },
};

const contactList = Object.values(contacts);

export default function ConnectSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          boxShadow: '0 0 50px rgba(236, 72, 153, 0.35)',
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: imageRef.current, start: 'top 80%', once: true },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      id="connect"
      className="py-16 sm:py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="mb-14 flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            ref={imageRef}
            className="relative rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
          >
            <div className="absolute inset-0 rounded-full bg-pink-500/30 blur-2xl" />
            <Image
              src="/anan.jpg"
              alt="An-An"
              width={112}
              height={112}
              className="relative h-28 w-28 rounded-full border-2 border-pink-400/40 object-cover shadow-lg"
            />
          </motion.div>
          <div className="text-center">
            <motion.p
              className="mb-3 text-sm font-medium uppercase tracking-widest text-pink-400/70"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              Get in Touch
            </motion.p>
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              Let&apos;s Connect
            </h2>
            <motion.p
              className="mx-auto mt-4 max-w-md text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Feel free to reach out for collaborations, freelance work, or just to say hi.
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Banner */}
      <motion.div
        className="mb-14"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src="/banner.webp"
          alt="Illustration by An-An"
          width={1920}
          height={400}
          className="h-48 w-full object-cover object-center opacity-80 transition-opacity duration-300 hover:opacity-100 sm:h-64"
        />
      </motion.div>

      {/* Contact cards with icons */}
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contactList.map((contact, i) => {
            const social = SOCIAL_ICONS[contact.title] || SOCIAL_ICONS.Email;
            return (
              <motion.a
                key={contact.title}
                href={contact.href}
                target={contact.target ?? undefined}
                rel={contact.target === '_blank' ? 'noopener noreferrer' : undefined}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-500"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${social.color}40`;
                  e.currentTarget.style.boxShadow = `0 0 30px ${social.color}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Background glow on hover */}
                <div
                  className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ backgroundColor: social.color }}
                />

                <div className="relative flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110"
                    style={{
                      backgroundColor: `${social.color}12`,
                      border: `1px solid ${social.color}25`,
                    }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill={social.color}
                      className="transition-transform duration-500 group-hover:scale-110"
                    >
                      <path d={social.icon} />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-bold text-white transition-colors duration-300 group-hover:text-white">
                      {contact.title}
                    </p>
                    {contact.handle && (
                      <p
                        className="mt-0.5 text-sm font-medium transition-colors duration-300"
                        style={{ color: social.color }}
                      >
                        {contact.handle}
                      </p>
                    )}
                    {contact.description && (
                      <p className="mt-1 text-sm text-gray-500 transition-colors duration-300 group-hover:text-gray-400">
                        {contact.description}
                      </p>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={social.color} strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
