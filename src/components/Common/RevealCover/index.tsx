'use client';
import { motion } from 'framer-motion';
const variant = {
  hidden: {
    height: '100%',
  },
  visible: {
    height: '0%',
    transition: {
      duration: 1.6,
      ease: [0.6, 0.05, -0.01, 0.9],
      delay: 0.2,
    },
  },
};

export const imageVariants = {
  hidden: {
    scale: 1.4,
  },
  visible: {
    scale: 1,
    transition: {
      duration: 1.6,
      ease: [0.6, 0.05, -0.01, 0.9],
      delay: 0.2,
    },
  },
};

const RevealCover = () => {
  return (
    <motion.div
      className="reveal_cover"
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    ></motion.div>
  );
};

export default RevealCover;
