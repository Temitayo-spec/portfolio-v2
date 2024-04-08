import { useRecoilState } from 'recoil';
import styles from './styles.module.scss';
import { AnimatedLink, MaskText } from '@/components';
import { sidebarAtom } from '../../../../atoms/sidebarAtom';

const Header = () => {
  const locationPhrase = ['currently living in', 'Lagos, Nigeria'];

  const [isOpen, setIsOpen] = useRecoilState(sidebarAtom);
  return (
    <section className={`${styles.header__wrapper}`}>
      <div className={styles.header__inner}>
        <div className={styles.flex__one}>
          <div className={styles.logo}>
            <div onClick={() => setIsOpen(false)}>
              <AnimatedLink
                title="Ty"
                secondTitle="Temitayo"
                isLink={true}
                href="/"
              />
            </div>
          </div>
          <div className={styles.location}>
            <MaskText phrases={locationPhrase} tag="p" />
          </div>
        </div>
        <div className={styles.flex__two}>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="7"
              height="8"
              viewBox="0 0 7 8"
              fill="none"
            >
              <circle cx="3.5" cy="4" r="3.5" fill="#D9D9D9" />
            </svg>{' '}
            <AnimatedLink
              title={isOpen ? 'close' : 'menu'}
              isLink={false}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
