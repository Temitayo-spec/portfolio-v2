import { BriefAboutSection, HeroSection } from '@/components';
import Curve from '@/components/Common/Curve';
import styles from '@/styles/Home.module.scss';

export default function Home() {
  return (
    <Curve backgroundColor='black'>
      <main className={styles.main__wrapper}>
        <HeroSection />
        <BriefAboutSection />
      </main>
    </Curve>
  );
}
