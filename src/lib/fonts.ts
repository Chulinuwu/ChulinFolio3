import { Figtree, The_Girl_Next_Door } from 'next/font/google';

// next/font downloads both faces at build time and serves them from this origin.
const hand = The_Girl_Next_Door({ subsets: ['latin'], weight: '400', variable: '--font-girl-next-door' });
const body = Figtree({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-figtree' });

export const fontVariables = [hand.variable, body.variable];
