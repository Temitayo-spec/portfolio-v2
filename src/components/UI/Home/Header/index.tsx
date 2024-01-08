import styles from './styles.module.scss';

const Header = () => {
  return (
    <section className={styles.header__wrapper}>
      <div className={styles.header__inner}>
        <div className={styles.flex__one}>
          <div className={styles.logo}>
            <p>TY</p>
          </div>
          <p className={styles.location}>
            currently living in <br /> <span>Lagos, Nigeria</span>
          </p>
        </div>
        <div className={styles.flex__two}>
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="7"
              height="8"
              viewBox="0 0 7 8"
              fill="none"
            >
              <circle cx="3.5" cy="4" r="3.5" fill="#D9D9D9" />
            </svg>{' '}
            menu
          </p>
        </div>
      </div>
    </section>
  );
};

export default Header;
