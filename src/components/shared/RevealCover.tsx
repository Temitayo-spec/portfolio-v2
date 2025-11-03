import { motion, Variants } from 'framer-motion';

const variant: Variants = {
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

export const imageVariants: Variants = {
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
      className="block absolute top-0 left-0 w-full h-full bg-main-bg z-10 rounded-none"
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    />
  );
};

export default RevealCover;
