'use client';

import { motion, useReducedMotion } from 'motion/react';
import SectionShell from '@/components/sections/SectionShell';
import SectionHeading from '@/components/sections/SectionHeading';
import RoughFrame from '@/components/hero/RoughFrame';
import { Heart, Sparkle } from '@/components/hero/Doodles';
import { cn } from '@/lib/utils';
import { contacts } from '@/lib/data';
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  InstagramLogoIcon,
  EnvelopeIcon,
  DiscordLogoIcon,
  BriefcaseIcon,
  ArrowUpRightIcon,
} from '@phosphor-icons/react';

type ContactKey = keyof typeof contacts;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PhosphorIcon = React.ComponentType<any>;

const ORDER: { key: ContactKey; Icon: PhosphorIcon; tint: string }[] = [
  { key: 'github',    Icon: GithubLogoIcon,    tint: 'var(--hd-lavender)' },
  { key: 'linkedin',  Icon: LinkedinLogoIcon,  tint: 'var(--hd-sky)'      },
  { key: 'instagram', Icon: InstagramLogoIcon, tint: 'var(--hd-peach)'    },
  { key: 'email',     Icon: EnvelopeIcon,      tint: 'var(--hd-mint)'     },
  { key: 'discord',   Icon: DiscordLogoIcon,   tint: 'var(--hd-butter)'   },
  { key: 'fastwork',  Icon: BriefcaseIcon,     tint: 'var(--hd-pink-soft)'},
];

const TILTS = [-1.2, 1, -0.8, 1.4, -1, 0.6];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Connect() {
  const reduced = useReducedMotion();

  return (
    <SectionShell id="connect">
      <SectionHeading title="Let's connect" kicker="say hi" />

      <p
        className="text-center mb-10 max-w-md mx-auto"
        style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--hd-ink-muted)',
          fontSize: '1rem',
          lineHeight: 1.6,
        }}
      >
        Got a project, a question, or just want to chat. My inbox is always open.
      </p>

      <div className="relative">
        <Sparkle
          className="absolute -top-6 -left-4 opacity-50 hidden sm:block"
          color="var(--hd-pink)"
          size={22}
        />
        <Heart
          className="absolute -bottom-4 -right-3 opacity-40 hidden sm:block"
          color="var(--hd-peach)"
          size={20}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ORDER.map(({ key, Icon, tint }, i) => {
            const contact = contacts[key];
            return (
              <motion.a
                key={key}
                href={contact.href}
                target={contact.target}
                rel={contact.target === '_blank' ? 'noopener noreferrer' : undefined}
                initial={reduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.07, duration: 0.55, ease }}
                className="block h-full"
                style={{ transform: `rotate(${TILTS[i]}deg)` }}
              >
                <RoughFrame
                  className={cn(
                    'h-full rounded-[20px] transition-transform duration-200 hover:-translate-y-1'
                  )}
                >
                  <div className="relative flex h-full flex-col gap-3 p-5">
                    <ArrowUpRightIcon
                      weight="bold"
                      className="absolute top-4 right-4 opacity-40"
                      style={{ color: 'var(--hd-ink-muted)', width: 16, height: 16 }}
                    />

                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: tint }}
                    >
                      <Icon
                        weight="bold"
                        style={{ color: 'var(--hd-ink)', width: 20, height: 20 }}
                      />
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          color: 'var(--hd-ink)',
                          fontSize: '1.05rem',
                          fontWeight: 600,
                        }}
                      >
                        {contact.title}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono-hd)',
                          color: 'var(--hd-pink-strong)',
                          fontSize: '0.8rem',
                        }}
                      >
                        {contact.handle}
                      </span>
                      {contact.description && (
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            color: 'var(--hd-ink-muted)',
                            fontSize: '0.78rem',
                            lineHeight: 1.4,
                          }}
                        >
                          {contact.description}
                        </span>
                      )}
                    </div>
                  </div>
                </RoughFrame>
              </motion.a>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
