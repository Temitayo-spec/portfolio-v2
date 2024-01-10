import Link from 'next/link';
import styles from './styles.module.scss';
import { AnimatedLink, StaggeredText } from '@/components';
import { useRecoilState } from 'recoil';
import { viewAtom } from '../../../../../atoms/viewAtom';

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
              <Link href="/">Works</Link>
              <Link href="/">About</Link>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.numbering}>02/</div>
            <div className={styles.column__content}>
              <h3>Social</h3>
              <a href="https://github.com/Temitayo-spec">Github</a>
              <a href="">Linkedin</a>
              <a href="">Twitter</a>
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
          <h1>{isInView && <StaggeredText text={'Temitayo'.split('')} />}</h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
