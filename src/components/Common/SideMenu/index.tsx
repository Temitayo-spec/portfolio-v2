import Link from 'next/link';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { sidebarAtom } from '../../../../atoms/sidebarAtom';
import {
  linkContainer,
  linkVariants,
  links,
  sideMenuVariants,
  socialLinks,
} from './constants';

const SideMenu = () => {
  const { pathname } = useRouter();
  const [isOpen, setIsOpen] = useRecoilState(sidebarAtom);
  return (
    <motion.div
      variants={sideMenuVariants}
      initial="hidden"
      animate={isOpen ? 'visible' : 'hidden'}
      className={styles.sidemenu__wrapper}
    >
      <div className={styles.sidemenu__inner}>
        <motion.ul
          variants={linkContainer}
          initial="hidden"
          animate={isOpen ? 'visible' : 'hidden'}
          className={styles.nav__container}
        >
          {links.map((link, i) => (
            <motion.li variants={linkVariants} key={i}>
              <motion.div
                variants={linkVariants}
                initial="hidden"
                animate={isOpen ? 'visible' : 'hidden'}
              >
                <Link
                  className={pathname === link.url ? styles.active : ''}
                  href={link.url}
                  onClick={() => setIsOpen(false)}
                >
                  {pathname === link.url && <span>--</span>}
                  {link.title}
                </Link>
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>
        <div className={styles.profile__links__container}>
          <motion.ul
            variants={linkContainer}
            initial="hidden"
            animate={isOpen ? 'visible' : 'hidden'}
            className={styles.profile__links}
          >
            {socialLinks.map((link, i) => (
              <motion.li variants={linkVariants} key={i}>
                <motion.div
                  variants={linkVariants}
                  initial="hidden"
                  animate={isOpen ? 'visible' : 'hidden'}
                >
                  <Link
                    href={link.url}
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    {link.title}{' '}
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
                </motion.div>
              </motion.li>
            ))}
          </motion.ul>
          <motion.div
            variants={linkContainer}
            initial="hidden"
            animate={isOpen ? 'visible' : 'hidden'}
            className={styles.email}
          >
            <motion.div>
              <motion.p
                variants={linkVariants}
                initial="hidden"
                animate={isOpen ? 'visible' : 'hidden'}
              >
                email
              </motion.p>
            </motion.div>
            <motion.div>
              <motion.p
                variants={linkVariants}
                initial="hidden"
                animate={isOpen ? 'visible' : 'hidden'}
              >
                olawanletemitayo@gmail.com
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SideMenu;
