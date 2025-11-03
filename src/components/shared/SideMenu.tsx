'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  linkContainer,
  links,
  linkVariants,
  sideMenuVariants,
  socialLinks,
} from '@/src/constants';
import { useSidebarStore } from '@/src/store/sidebar.store';
import AnimatedLink from './AnimatedLink';

const closeButtonVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 1.2,
    },
  },
};

const SideMenu = () => {
  const pathname = usePathname();
  const { sidebar, setSidebar, toggleSidebar } = useSidebarStore();

  return (
    <motion.div
      variants={sideMenuVariants}
      initial="hidden"
      animate={sidebar ? 'visible' : 'hidden'}
      className="fixed z-100 top-0 left-0 h-full w-full bg-black/40 backdrop-blur-[38px] origin-top"
    >
      <motion.div
        variants={closeButtonVariants}
        initial="hidden"
        animate={sidebar ? 'visible' : 'hidden'}
        onClick={() => setSidebar(false)}
        className="absolute top-8 right-[5%] max-w-[1440px] text-white z-10"
        aria-label="Close menu"
      >
        <AnimatedLink
          title={sidebar ? 'close' : 'menu'}
          isLink={false}
          onClick={() => toggleSidebar()}
        />
      </motion.div>

      <div className="flex justify-between w-[90%] mx-auto max-w-[1440px] mt-[120px] max-md:flex-col">
        <motion.ul
          variants={linkContainer}
          initial="hidden"
          animate={sidebar ? 'visible' : 'hidden'}
          className="flex-[1.33] w-full list-none max-md:flex-1"
        >
          {links.map((link, i) => (
            <div key={i} className="overflow-hidden">
              <motion.li variants={linkVariants}>
                <Link
                  className={`text-white font-bebas-neue text-[8rem] max-md:text-[5.8rem] font-normal leading-[100%] tracking-[-0.16rem] uppercase transition-all duration-1000 ease-[cubic-bezier(0.83,0,0.17,1)] hover:tracking-[1rem] ${
                    pathname === link.url ? 'pointer-events-none' : ''
                  }`}
                  href={link.url}
                  onClick={() => setSidebar(false)}
                >
                  {pathname === link.url && (
                    <span className="tracking-[-0.45rem] mr-6">--</span>
                  )}
                  {link.title}
                </Link>
              </motion.li>
            </div>
          ))}
        </motion.ul>

        <div className="flex-1 max-md:flex-0">
          <motion.ul
            variants={linkContainer}
            initial="hidden"
            animate={sidebar ? 'visible' : 'hidden'}
            className="inline-flex flex-col items-start gap-6 max-w-52 w-full list-none max-md:flex-row max-md:max-w-full max-md:mt-8"
          >
            {socialLinks.map((link, i) => (
              <div key={i} className="overflow-hidden w-full flex-1">
                <motion.li variants={linkVariants} className="w-full">
                  <Link
                    href={link.url}
                    rel="noreferrer noopener"
                    target="_blank"
                    className="w-full flex justify-between text-white font-spline-sans text-base font-normal relative py-[0.2rem] after:absolute after:content-[''] after:h-0.5 after:bg-white after:w-full after:scale-x-0 after:-bottom-px after:transition-transform after:duration-1000 after:ease-[cubic-bezier(0.83,0,0.17,1)] after:origin-right hover:after:scale-x-100 hover:after:origin-left"
                  >
                    {link.title}
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
                </motion.li>
              </div>
            ))}
          </motion.ul>

          <motion.div
            variants={linkContainer}
            initial="hidden"
            animate={sidebar ? 'visible' : 'hidden'}
            className="mt-[9.7rem] max-md:mt-10 font-spline-sans text-white font-normal"
          >
            <motion.div className="overflow-hidden">
              <motion.p
                variants={linkVariants}
                className="text-base no-underline"
              >
                email
              </motion.p>
            </motion.div>
            <motion.div className="overflow-hidden">
              <motion.p
                variants={linkVariants}
                className="text-white text-xl underline"
              >
                <Link
                  href={'mailto:olawanletemitayo@gmail.com'}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  olawanletemitayo@gmail.com
                </Link>
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SideMenu;
