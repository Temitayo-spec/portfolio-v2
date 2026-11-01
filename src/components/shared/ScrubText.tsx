'use client';
import { ElementType, ReactNode, useLayoutEffect, useRef } from 'react';
import { gsap, SplitText } from '@/src/lib/gsap';

/**
 * Characters start ghosted and light up one by one as the block scrolls
 * through the viewport.
 */
const ScrubText = ({
  as: Tag = 'p',
  children,
  className = '',
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const split = SplitText.create(el, {
      type: 'words,chars',
      autoSplit: true,
      onSplit(self) {
        return gsap.fromTo(
          self.chars,
          { opacity: 0.12 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.08,
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
              end: 'bottom 45%',
              scrub: true,
            },
          }
        );
      },
    });

    return () => split.revert();
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};

export default ScrubText;
