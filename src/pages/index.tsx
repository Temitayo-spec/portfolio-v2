import { BriefAboutSection, HeroSection } from '@/components';
import styles from '@/styles/Home.module.scss';

export default function Home() {
  return (
    <main className={styles.main__wrapper}>
      <HeroSection />
      <BriefAboutSection />
    </main>
  );
}
