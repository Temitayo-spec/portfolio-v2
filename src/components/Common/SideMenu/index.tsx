import Link from 'next/link';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';

const SideMenu = () => {
  const { pathname } = useRouter();
  console.log(pathname);
  return (
    <div className={styles.sidemenu__wrapper}>
      <div className={styles.sidemenu__inner}>
        <ul className={styles.nav__container}>
          <li>
            <Link className={pathname === '/' ? styles.active : ''} href="/">
              {pathname === '/' && <span>--</span>}
              Home
            </Link>
          </li>
          <li>
            <Link
              className={pathname === '/about' ? styles.active : ''}
              href="/"
            >
              {pathname === '/about' && <span>--</span>}
              About
            </Link>
          </li>
          <li>
            <Link
              className={pathname === '/work' ? styles.active : ''}
              href="/work"
            >
              {pathname === '/work' && <span>--</span>}
              Work
            </Link>
          </li>
          <li>
            <Link
              className={pathname === '/contact' ? styles.active : ''}
              href="/contact"
            >
              {pathname === '/contact' && <span>--</span>}
              Contact
            </Link>
          </li>
        </ul>
        <div className={styles.profile__links__container}>
          <ul className={styles.profile__links}>
            <li>
              <Link href="https://github.com/Temitayo-spec">
                github{' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    d="M11.456 3.16165L1.35906 3.16165L1.35908 0.500023L16 0.5L16 15.1409L13.3384 15.1409L13.3384 5.044L1.88235 16.5L0 14.6176L11.456 3.16165Z"
                    fill="white"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link href="/">
                twitter{' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    d="M11.456 3.16165L1.35906 3.16165L1.35908 0.500023L16 0.5L16 15.1409L13.3384 15.1409L13.3384 5.044L1.88235 16.5L0 14.6176L11.456 3.16165Z"
                    fill="white"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link href="/">
                linkedin{' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    d="M11.456 3.16165L1.35906 3.16165L1.35908 0.500023L16 0.5L16 15.1409L13.3384 15.1409L13.3384 5.044L1.88235 16.5L0 14.6176L11.456 3.16165Z"
                    fill="white"
                  />
                </svg>
              </Link>
            </li>
          </ul>
          <div className={styles.email}>
            <p>email</p>
            <p>olawanletemitayo@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
