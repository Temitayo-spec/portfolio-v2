'use client';
import { ElementType, ReactNode, useLayoutEffect, useRef } from 'react';
import { gsap, SplitText } from '@/src/lib/gsap';
import { useIntroStore } from '@/src/store/intro.store';

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Animate lines as whole blocks, or every character inside its line. */
  by?: 'lines' | 'chars';
  /** Play once the preloader leaves, or when scrolled into view. */
  on?: 'intro' | 'view';
  delay?: number;
  stagger?: number;
  duration?: number;
  start?: string;
};

/**
 * Masked text reveal: each line sits in an overflow mask and its contents
 * slide up into place. Re-splits on resize so lines stay correct.
 */
const SplitReveal = ({
  as: Tag = 'div',
  children,
  className = '',
  by = 'lines',
  on = 'view',
  delay = 0,
  stagger,
  duration = 1.2,
  start = 'top 88%',
}: Props) => {
  const ref = useRef<HTMLElement>(null);
  const introDone = useIntroStore((s) => s.done);
  const ready = on === 'view' || introDone;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !ready) return;

    // GSAP ignores the CSS reduced-motion rule, so skip the reveal and just show the text.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { visibility: 'visible' });
      return;
    }

    const split = SplitText.create(el, {
      // Words keep each word's characters together so lines never break mid-word.
      type: by === 'chars' ? 'lines,words,chars' : 'lines',
      mask: 'lines',
      linesClass: 'split-line',
      autoSplit: true,
      onSplit(self) {
        gsap.set(el, { visibility: 'visible' });
        const targets = by === 'chars' ? self.chars : self.lines;
        return gsap.from(targets, {
          // Far enough to sit below the grown mask (see globals.css).
          yPercent: 130,
          duration,
          delay,
          ease: 'expo.out',
          stagger: stagger ?? (by === 'chars' ? 0.025 : 0.09),
          scrollTrigger:
            on === 'view' ? { trigger: el, start, once: true } : undefined,
        });
      },
    });

    return () => split.revert();
  }, [ready, by, on, delay, stagger, duration, start]);

  return (
    <Tag ref={ref} className={`split-pending ${className}`}>
      {children}
    </Tag>
  );
};

export default SplitReveal;
