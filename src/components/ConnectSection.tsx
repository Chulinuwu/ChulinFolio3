'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { contacts } from '@/lib/data';
import { TypingText } from '@/components/ui/typing-text';

const contactList = Object.values(contacts);

export default function ConnectSection() {
  return (
    <motion.section
      id="connect"
      className="py-12 sm:py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="relative"
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
            <h2 className="text-3xl font-bold sm:text-5xl">
              <TypingText text="Let's Connect" speed={60} className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent" cursorClassName="bg-pink-400" />
            </h2>
            <motion.p
              className="mx-auto mt-4 max-w-xl text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Feel free to reach out for collaborations, freelance work, or just to say hi.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          className="mb-10 overflow-hidden rounded-2xl border border-white/10"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/banner.webp"
            alt="Illustration by An-An"
            width={1200}
            height={208}
            className="h-40 w-full object-cover object-center opacity-80 transition-opacity duration-300 hover:opacity-100 sm:h-52"
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contactList.map((contact, i) => (
            <motion.a
              key={contact.title}
              href={contact.href}
              target={contact.target ?? undefined}
              rel={contact.target === '_blank' ? 'noopener noreferrer' : undefined}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-pink-400/30 hover:bg-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <p className="font-bold text-white">{contact.title}</p>
              {contact.handle && (
                <p className="mt-1 text-sm text-pink-400">{contact.handle}</p>
              )}
              {contact.description && (
                <p className="mt-1 text-sm text-gray-400">{contact.description}</p>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
