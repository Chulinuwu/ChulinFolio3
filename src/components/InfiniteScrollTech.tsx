'use client';

import styles from './InfiniteScrollTech.module.css';

const technologies = [
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Svelte', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg' },
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Go', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg' },
  { name: 'Dart', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg' },
  { name: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg' },
  { name: 'FastAPI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
  { name: 'Vue.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg' },
  { name: 'Angular', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg' },
  { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
];

interface Props {
  speed?: number;
  gap?: number;
  opacity?: number;
  hoverOpacity?: number;
  itemWidth?: number;
  itemHeight?: number;
}

export default function InfiniteScrollTech({
  speed = 25,
  gap = 24,
  opacity = 0.5,
  hoverOpacity = 1,
  itemWidth = 140,
  itemHeight = 56,
}: Props) {
  return (
    <section className={`${styles.container} ${styles.fadeMask}`}>
      <ul
        className={`${styles.techList} ${styles.scrollAnimation}`}
        style={{ gap: `${gap}px`, animationDuration: `${speed}s` }}
      >
        {technologies.map((tech) => (
          <li
            key={tech.name}
            className={styles.techItem}
            style={{
              width: `${itemWidth}px`,
              height: `${itemHeight}px`,
              opacity,
              ['--hover-opacity' as string]: hoverOpacity,
            }}
          >
            <div className={styles.techContent}>
              <img src={tech.logo} alt={tech.name} className={styles.techLogo} loading="lazy" />
              <span className={styles.techName}>{tech.name}</span>
            </div>
          </li>
        ))}

        {technologies.map((tech) => (
          <li
            key={`dup-${tech.name}`}
            aria-hidden="true"
            className={styles.techItem}
            style={{
              width: `${itemWidth}px`,
              height: `${itemHeight}px`,
              opacity,
              ['--hover-opacity' as string]: hoverOpacity,
            }}
          >
            <div className={styles.techContent}>
              <img src={tech.logo} alt={tech.name} className={styles.techLogo} loading="lazy" />
              <span className={styles.techName}>{tech.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
