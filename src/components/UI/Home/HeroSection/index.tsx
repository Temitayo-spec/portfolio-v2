import { StaggeredText } from '@/components';
import styles from './styles.module.scss';

const HeroSection = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h1>
          <StaggeredText text={'Frontend Itachi'.split('')} />
        </h1>
        <h1>
          <StaggeredText text={'Temitayo'.split('')} />
        </h1>
        <h3>Scroll down</h3>
      </div>
    </div>
  );
};

export default HeroSection;
