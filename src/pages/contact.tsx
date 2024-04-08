import styles from '@/styles/Contact.module.scss';
import { useRecoilState } from 'recoil';
import { viewAtom } from '../../atoms/viewAtom';
import { useEffect, useRef } from 'react';
import Curve from '@/components/Common/Curve';
import { motion } from 'framer-motion';
import { Footer, Form, Header } from '@/components';

const headingContainer = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      ease: [0.83, 0, 0.17, 1],
    },
  },
};

const textVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.83, 0, 0.17, 1],
    },
  },
};

const lineVariants = {
  hidden: {
    scaleX: 0,
  },
  visible: {
    scaleX: 1,
    transformOrigin: 'left',
    transition: {
      duration: 1.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const Contact = () => {
  const [, setIsInView] = useRecoilState(viewAtom);

  const componentRef = useRef(null) as unknown as any;

  const handleScroll = () => {
    const triggerTop = window.innerHeight / 2; // Adjust as needed
    const triggerBottom = window.innerHeight;

    const rect = componentRef.current.getBoundingClientRect();
    const elementTop = rect.top;
    const elementBottom = rect.bottom;

    if (elementTop < triggerBottom && elementBottom > triggerTop) {
      setIsInView(false);
    } else {
      setIsInView(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <Curve backgroundColor="black">
      <Header />

      <div ref={componentRef} className={styles.contact__wrapper}>
        <div className={styles.contact__inner}>
          <motion.div
            variants={headingContainer}
            initial="hidden"
            whileInView="visible"
            className={styles.contact__header}
          >
            <motion.p variants={textVariants}>Contact me</motion.p>
            <motion.div
              variants={lineVariants}
              className={styles.line__drawer}
            />
          </motion.div>
          <Form />
        </div>
      </div>
      <Footer />
    </Curve>
  );
};

export default Contact;
