'use client';
import { useLayoutEffect } from 'react';
import { ScrollTrigger } from '@/src/lib/gsap';

/** Flags the passage where Tsuki inverts. The class only has an effect in that look. */
const Inversion = ({ trigger }: { trigger: string }) => {
  useLayoutEffect(() => {
    const st = ScrollTrigger.create({
      trigger,
      start: 'top 45%',
      end: 'bottom 55%',
      toggleClass: { targets: document.documentElement, className: 'is-inverted' },
    });
    return () => {
      st.kill();
      document.documentElement.classList.remove('is-inverted');
    };
  }, [trigger]);

  return null;
};

export default Inversion;
