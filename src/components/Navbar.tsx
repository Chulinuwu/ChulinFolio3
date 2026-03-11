'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const items = [
  {
    href: '/',
    label: 'Home',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    )
  },
  {
    href: '/projects',
    label: 'Projects',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
      </svg>
    )
  },
  {
    href: '/experience',
    label: 'Experience',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
        <path d="M8 14h.01" />
        <path d="M12 14h.01" />
        <path d="M16 14h.01" />
        <path d="M8 18h.01" />
        <path d="M12 18h.01" />
        <path d="M16 18h.01" />
      </svg>
    )
  }
];

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const activeIndicatorRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !navRef.current) return;
    const activeLink = navRef.current.querySelector('[aria-current="page"]') as HTMLElement;
    if (activeLink && activeIndicatorRef.current) {
      const rect = activeLink.getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();
      const itemCenter = rect.left - navRect.left + rect.width / 2;
      const bubbleCenter = itemCenter - 56 / 2;
      activeIndicatorRef.current.style.transform = `translateX(${bubbleCenter}px)`;
    }
  }, [mounted, pathname]);

  return (
    <nav
      ref={navRef}
      className={styles.liquidGlassNav}
    >
      <div className={styles.glassContainer}>
        <div className={styles.glassBackdrop} />
        <div className={styles.glassBorder} />
        <div ref={activeIndicatorRef} className={styles.activeBubble} />
        <div className={styles.navItems}>
          {items.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink}${isActive ? ` ${styles.active}` : ''}`}
                aria-label={item.label}
                title={item.label}
                aria-current={isActive ? 'page' : undefined}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.navIcon}>{item.svg}</div>
                <div className={styles.navLabel}>{item.label}</div>
                <div className={styles.rippleEffect} />
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
