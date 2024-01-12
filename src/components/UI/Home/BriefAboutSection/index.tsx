import Link from 'next/link';
import styles from './styles.module.scss';
import { useInView, useAnimation } from 'framer-motion';
import { useRef, useEffect, useState, MutableRefObject } from 'react';
import { useRecoilState } from 'recoil';
import { viewAtom } from '../../../../../atoms/viewAtom';
import Words from '@/components/Common/TextOpacityEffect';

const BriefAboutSection = () => {
  const [, setIsInView] = useRecoilState(viewAtom);

  const componentRef = useRef(null) as unknown as any;

  const handleScroll = () => {
    const triggerTop = window.innerHeight / 2; // Adjust as needed
    const triggerBottom = window.innerHeight;

    const rect = componentRef.current.getBoundingClientRect();
    const elementTop = rect.top;
    const elementBottom = rect.bottom;

    if (elementTop < triggerBottom && elementBottom > triggerTop) {
      setIsInView(false);
    } else {
      setIsInView(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <div ref={componentRef} className={styles.wrapper}>
        <div className={styles.inner}>
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
            info
          </p>
          <h3>
            <Words
              value="Combining aesthetics and usefulness, I create solid user interfaces in an artistic way. I love to spend time improving the aesthetics of digital products without forgetting about usability."
            />
          </h3>
          <Link href="/about">
            explore{' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M12.0249 4.94168L17.0832 10L12.0249 15.0583"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.9165 10L16.9415 10"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BriefAboutSection;
