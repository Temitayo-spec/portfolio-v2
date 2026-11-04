'use client';
import { useEffect } from 'react';
import { useIntroStore } from '@/src/store/intro.store';

/**
 * Crows rest as a still flock. Their wings beat for a few seconds after the
 * intro and while the page scrolls, so nothing on the page loops endlessly.
 */
const CrowWake = () => {
  const introDone = useIntroStore((s) => s.done);

  useEffect(() => {
    if (!introDone) return;
    const root = document.documentElement;
    let sleep: ReturnType<typeof setTimeout>;
    const wake = (ms: number) => {
      root.classList.add('crows-awake');
      clearTimeout(sleep);
      sleep = setTimeout(() => root.classList.remove('crows-awake'), ms);
    };
    const onScroll = () => wake(500);

    wake(4500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(sleep);
      root.classList.remove('crows-awake');
    };
  }, [introDone]);

  return null;
};

export default CrowWake;
