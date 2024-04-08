import Link from 'next/link';
import styles from './styles.module.scss';
import { AnimatedLink } from '@/components';
import { ParallaxEffect } from '../ParallaxTexts';

const Footer = () => {
  return (
    <footer className={styles.footer__wrapper}>
      <div className={styles.footer__top}>
        <div className={styles.links__container}>
          <div className={styles.column}>
            <div className={styles.numbering}>01/</div>
            <div className={styles.column__content}>
              <h3>Sitemap</h3>
              <Link href="/">Home</Link>
              <Link href="/works">Works</Link>
              <Link href="/about">About</Link>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.numbering}>02/</div>
            <div className={styles.column__content}>
              <h3>Social</h3>
              <Link
                href="https://github.com/Temitayo-spec"
                rel="noopener noreferrer"
                target="_blank"
              >
                Github
              </Link>
              <Link
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.linkedin.com/in/temitayo-spec/"
              >
                Linkedin
              </Link>
              <Link
                rel="noopener noreferrer"
                target="_blank"
                href="https://twitter.com/OlawanleTemita1"
              >
                Twitter
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.connect__link}>
          <AnimatedLink
            title="Let's work together"
            isLink={true}
            href="/contact"
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.briefing}>
          <p>FRONTEND DEVELOPER</p>
          <p>PORTFOLIO 2024</p>
        </div>
        <div className={styles.big__name}>
          <ParallaxEffect baseVelocity={1}>
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
                  <circle cx="3.5" cy="4" r="3.5" fill="#212121" />
                </svg>
              </h1>
            ))}
          </ParallaxEffect>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
