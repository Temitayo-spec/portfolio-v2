import Link from 'next/link';
import styles from './styles.module.scss';
import { AnimatedLink, StaggeredText } from '@/components';
import { useRecoilState } from 'recoil';
import { viewAtom } from '../../../../atoms/viewAtom';
import { AnimatePresence, motion } from 'framer-motion';

const fadeVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const Footer = () => {
  const [isInView] = useRecoilState(viewAtom);
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
          <AnimatePresence mode="wait">
            {isInView && (
              <motion.h1
                variants={fadeVariant}
                initial="hidden"
                animate={isInView ? 'visible' : ''}
              >
                <StaggeredText text={'Temitayo'.split('')} />
              </motion.h1>
            )}
          </AnimatePresence>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
