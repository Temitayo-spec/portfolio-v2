import styles from './styles.module.scss';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const InitialCover = () => {
  const animate = {
    initial: {
      y: '100%',
    },
    open: (i: number) => ({
      y: '0%',
      transition: { duration: 2, delay: 0.1 * i, ease: [0.76, 0, 0.24, 1] },
    }),
    exit: (i: number) => ({
      y: '-100%',
      transition: { duration: 2, delay: 0.1 * i, ease: [0.76, 0, 0.24, 1] },
    }),
  };

  const bgVariant = {
    hidden: {
      scaleY: 1,
    },
    visible: {
      scaleY: 0,
      transformOrigin: 'top',
      height: 0,
      transition: { duration: 2, delay: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const ref = useRef(null);
  const [triggerExit, setTriggerExit] = useState(false);

  useEffect(() => {
    // Trigger exit animation after a delay
    const exitTimeout = setTimeout(() => {
      setTriggerExit(true);
    }, 2500); // Change the delay as needed

    return () => clearTimeout(exitTimeout);
  }, []);

  return (
    <motion.div
      variants={bgVariant}
      initial="hidden"
      animate={triggerExit ? 'visible' : ''}
      className={styles.cover__wrapper}
    >
      <motion.div className={styles.cover__inner} ref={ref}>
        {'Welcome!'.split('').map((char, i) => (
          <motion.span
            key={i}
            variants={animate}
            initial="initial"
            animate={triggerExit ? 'exit' : 'open'}
            custom={i}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default InitialCover;
