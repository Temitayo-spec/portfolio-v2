import { BriefAboutSection, Header, HeroSection } from '@/components';
import styles from '@/styles/Home.module.scss';

export default function Home() {
  return (
    <main className={styles.main__wrapper}>
      <Header />
      <HeroSection />
      <BriefAboutSection />
    </main>
  );
}
