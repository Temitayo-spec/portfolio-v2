'use client';
import { useInView, motion, Variants, HTMLMotionProps } from 'framer-motion';
import { useRef } from 'react';

const MaskText = ({ phrases, tag }: { phrases: string[]; tag: string }) => {
  const animate: Variants = {
    initial: {
      y: '100%',
    },
    open: (i: number) => ({
      y: '0%',
      transition: { duration: 1, delay: 0.1 * i, ease: [0.33, 1, 0.68, 1] },
    }),
  };

  const body = useRef(null);
  const isInView = useInView(body, { once: false, amount: 0.4 });

  const validTag = ['h1', 'h2', 'h3', 'p'].includes(tag) ? tag : 'p';
  const MotionTag = motion[validTag as keyof typeof motion] as React.ComponentType<HTMLMotionProps<'h1' | 'h2' | 'h3' | 'p'>>;

  return (
    <div ref={body}>
      {phrases.map((phrase, index) => (
        <div className="overflow-hidden" key={index}>
          <MotionTag
            variants={animate}
            initial="initial"
            animate={isInView ? 'open' : ''}
            custom={index}
          >
            {phrase}
          </MotionTag>
        </div>
      ))}
    </div>
  );
};

export default MaskText;
