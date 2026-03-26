'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseGsapScrollOptions {
  animation: (element: HTMLElement, tl: gsap.core.Timeline) => void;
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  once?: boolean;
}

export function useGsapScroll<T extends HTMLElement>(options: UseGsapScrollOptions) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: options.trigger ? el.querySelector(options.trigger) || el : el,
        start: options.start || 'top 80%',
        end: options.end || 'bottom 20%',
        scrub: options.scrub ?? false,
        pin: options.pin ?? false,
        once: options.once ?? true,
      },
    });
    options.animation(el, tl);
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return ref;
}
