'use client';
import { useScroll, motion, MotionValue, useTransform } from 'framer-motion';
import { useRef, useMemo } from 'react';

const Words = ({ value, className }: { value: string; className?: string }) => {
  const element = useRef(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ['start 0.9', 'start 0.25'],
  });

  const words = useMemo(() => value.split(' '), [value]);

  return (
    <motion.p className={`flex flex-wrap ${className || ''}`} ref={element}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} range={[start, end]} progress={scrollYProgress}>
            {word}
          </Word>
        );
      })}
    </motion.p>
  );
};

export default Words;

const Word = ({
  children,
  range,
  progress,
}: {
  children: string;
  range: number[];
  progress: MotionValue<number>;
}) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span
      className="mr-1 md:mr-2 relative inline-block"
      style={{ transform: 'translate3d(0, 0, 0)' }}
    >
      <span className="absolute opacity-10 pointer-events-none">
        {children}
      </span>
      <motion.span
        style={{ opacity, willChange: 'opacity' }}
        className="relative"
      >
        {children}
      </motion.span>
    </span>
  );
};
