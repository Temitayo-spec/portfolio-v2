import styles from './styles.module.scss';
import { ParallaxEffect } from '@/components/Common/ParallaxTexts';
import Image from 'next/image';
import my_photo from '../../../../../public/my_photo.png';
import RevealCover, { imageVariants } from '@/components/Common/RevealCover';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.absolute_img}>
          <RevealCover />
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Image src={my_photo} alt="image" fill />
          </motion.div>
        </div>
        {/* <StaggeredText text={'Frontend Itachi'.split('')} /> */}
        <ParallaxEffect baseVelocity={-1}>
          <h2>Frontend Itachi -</h2>
          <h2>Frontend Itachi -</h2>
          <h2>Frontend Itachi -</h2>
          <h2>Frontend Itachi -</h2>
        </ParallaxEffect>
        <ParallaxEffect baseVelocity={0.5}>
          {Array.from({ length: 4 }).map((_, i) => (
            <h1 key={i}>
              Temitayo{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="7"
                height="8"
                viewBox="0 0 7 8"
                fill="none"
              >
                <circle cx="3.5" cy="4" r="3.5" fill="#D9D9D9" />
              </svg>
            </h1>
          ))}
        </ParallaxEffect>

        <h3>Scroll down</h3>
      </div>
    </div>
  );
};

export default HeroSection;
