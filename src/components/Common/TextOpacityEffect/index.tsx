import { useScroll, motion, MotionValue, useTransform } from 'framer-motion';
import styles from './styles.module.scss';
import { useEffect, useRef } from 'react';

const Words = ({ value }: { value: string }) => {
  const element = useRef(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ['start 0.9', 'start 0.25'],
  });

  const words = value.split(' ');
  return (
    <motion.p className={styles.text} ref={element}>
      {words.map((char, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} range={[start, end]} progress={scrollYProgress}>
            {char}
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
  const characters = (children as string).split('');
  const amount = range[1] - range[0];
  const step = amount / children.length;
  return (
    <span className={styles.word}>
      {characters.map((character, i) => {
        const start = range[0] + step * i;
        const end = range[0] + step * (i + 1);
        return (
          <Character key={i} range={[start, end]} progress={progress}>
            {character}
          </Character>
        );
      })}
    </span>
  );
};

const Character = ({
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
    <span>
      <span className={styles.shadow}>{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};
