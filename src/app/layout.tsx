import type { Metadata } from 'next';
import '@/app.css';
import Navbar from '@/components/Navbar';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'An-An | Portfolio',
  description: 'Developer / Designer / Data Scientist — Building intelligent, scalable systems',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("dark font-sans", geist.variable)}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
