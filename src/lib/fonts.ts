import { Fredoka, Shantell_Sans, Nunito, JetBrains_Mono } from 'next/font/google';

export const display = Fredoka({ subsets: ['latin'], variable: '--font-display' });
export const hand = Shantell_Sans({ subsets: ['latin'], variable: '--font-hand' });
export const body = Nunito({ subsets: ['latin'], variable: '--font-body' });
export const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono-hd' });

export const fontVariables = [display.variable, hand.variable, body.variable, mono.variable];
