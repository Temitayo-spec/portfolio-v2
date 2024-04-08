import { StaggeredText } from '@/components';
import styles from './styles.module.scss';
import { ParallaxEffect } from '@/components/Common/ParallaxTexts';

const HeroSection = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        {/* <StaggeredText text={'Frontend Itachi'.split('')} /> */}
        <ParallaxEffect baseVelocity={-1}>
          <h2>Frontend Itachi -</h2>
          <h2>Frontend Itachi -</h2>
          <h2>Frontend Itachi -</h2>
          <h2>Frontend Itachi -</h2>
        </ParallaxEffect>
        <ParallaxEffect baseVelocity={0.5}>
          <h1>
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
          <h1>
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
          <h1>
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
          <h1>
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
        </ParallaxEffect>

        <h3>Scroll down</h3>
      </div>
    </div>
  );
};

export default HeroSection;
