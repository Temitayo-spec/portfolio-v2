import Link from 'next/link';
import styles from './styles.module.scss';

const Footer = () => {
  return (
    <footer className={styles.wrapper}>
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
          <Link href="/contact">Let&apos;s work together</Link>
        </div>
      </div>
      <div className={styles.big__name}>
        <h1>Temitayo</h1>
      </div>
    </footer>
  );
};

export default Footer;
