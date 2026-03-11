'use client';

import Image from 'next/image';
import { contacts } from '@/lib/data';
import { useRevealOnScroll } from '@/lib/hooks';

const contactList = Object.values(contacts);

export default function ConnectSection() {
  const ref = useRevealOnScroll();

  return (
    <section id="connect" ref={ref} className="py-12 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-pink-500/30 blur-2xl" />
            <Image
              src="/anan.jpg"
              alt="An-An"
              width={112}
              height={112}
              className="relative h-28 w-28 rounded-full border-2 border-pink-400/40 object-cover shadow-lg"
            />
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-5xl">
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent">
                Let's Connect
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-400">
              Feel free to reach out for collaborations, freelance work, or just to say hi.
            </p>
          </div>
        </div>

        <div className="mb-10 overflow-hidden rounded-2xl border border-white/10">
          <Image
            src="/banner.webp"
            alt="Illustration by An-An"
            width={1200}
            height={208}
            className="h-40 w-full object-cover object-center opacity-80 transition-opacity duration-300 hover:opacity-100 sm:h-52"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contactList.map((contact) => (
            <a
              key={contact.title}
              href={contact.href}
              target={contact.target ?? undefined}
              rel={contact.target === '_blank' ? 'noopener noreferrer' : undefined}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-pink-400/30 hover:bg-white/10"
            >
              <p className="font-bold text-white">{contact.title}</p>
              {contact.handle && (
                <p className="mt-1 text-sm text-pink-400">{contact.handle}</p>
              )}
              {contact.description && (
                <p className="mt-1 text-sm text-gray-400">{contact.description}</p>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
