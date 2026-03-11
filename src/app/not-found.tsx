'use client';

import { useRouter } from 'next/navigation';
import styles from './not-found.module.css';

export default function NotFound() {
  const router = useRouter();

  function goBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  }

  return (
    <div className={styles.errorPage}>
      <div className={styles.backgroundEffects}>
        <div className={`${styles.gradientOrb} ${styles.orb1}`} />
        <div className={`${styles.gradientOrb} ${styles.orb2}`} />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.errorCode}>
          <span className={styles.glitchText}>404</span>
        </div>

        <div className={styles.glassCard}>
          <h1 className={styles.errorTitle}>Page Not Found</h1>
          <p className={styles.errorDescription}>
            The page you&apos;re looking for seems to have wandered off into the digital void.
          </p>

          <div className={styles.actionButtons}>
            <button className={styles.primaryButton} onClick={() => router.push('/')}>
              Go Home
            </button>
            <button className={styles.secondaryButton} onClick={goBack}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
