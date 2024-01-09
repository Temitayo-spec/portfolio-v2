import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './styles.module.scss';

const StaggeredText = ({ text }: { text: string[] }) => {
  const animate = {
    initial: {
      y: '100%',
    },
    open: (i: number) => ({
      y: '0%',
      transition: { duration: 1, delay: 0.1 * i, ease: [0.33, 1, 0.68, 1] },
    }),
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  return (
    <span className={styles.text} ref={ref}>
      {text.map((char, i) => (
        <motion.span
          key={i}
          variants={animate}
          initial="initial"
          animate={isInView ? 'open' : ''}
          custom={i}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

export default StaggeredText;
