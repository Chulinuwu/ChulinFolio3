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
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 21H5a2 2 0 0 1-2-2V9l9-7 9 7v10a2 2 0 0 1-2 2h-4"/>
        <polyline points="9,21 9,13 15,13 15,21"/>
      </svg>
    )
  },
  {
    href: '/projects',
    label: 'Projects',
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="14" rx="3" ry="3"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="18" x2="12" y2="21"/>
        <path d="M7 10h10"/>
        <circle cx="8" cy="13" r="1" fill="currentColor"/>
        <circle cx="12" cy="13" r="1" fill="currentColor"/>
        <circle cx="16" cy="13" r="1" fill="currentColor"/>
      </svg>
    )
  },
  {
    href: '/experience',
    label: 'Experience',
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12c0 5-4 9-9 9s-9-4-9-9"/>
        <path d="M12 3c5 0 9 4 9 9"/>
        <path d="M12 7v5l3 3"/>
        <path d="M3 12h3"/>
        <path d="M21 12h-3"/>
        <circle cx="18" cy="6" r="2" fill="currentColor"/>
        <circle cx="6" cy="18" r="2" fill="currentColor"/>
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
