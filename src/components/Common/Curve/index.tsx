import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { text, curve, translate } from './anim';
import styles from './styles.module.scss';

const routes = {
  '/': 'Home',
  '/about': 'About',
  '/contact': 'Contact',
};

const anim = (variants: {
  initial: { opacity: number } | { top: string } | { d: any };
  enter:
    | {
        opacity: number;
        top: number;
        transition: { duration: number; delay: number; ease: number[] };
        transitionEnd: { top: string };
      }
    | {
        top: string;
        transition: { duration: number; delay: number; ease: number[] };
        transitionEnd: { top: string };
      }
    | {
        d: any;
        transition: { duration: number; delay: number; ease: number[] };
      };
  exit:
    | {
        opacity: number;
        top: string;
        transition: { duration: number; delay: number; ease: number[] };
      }
    | { top: string; transition: { duration: number; ease: number[] } }
    | { d: any; transition: { duration: number; ease: number[] } };
}) => {
  return {
    variants,
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
  };
};

export default function Curve({
  children,
  backgroundColor,
}: {
  children: React.ReactNode;
  backgroundColor: string;
}) {
  const router = useRouter();
  const [dimensions, setDimensions] = useState({
    width: null,
    height: null,
  });

  useEffect(() => {
    function resize() {
      setDimensions({
        width: window.innerWidth as any,
        height: window.innerHeight as any,
      });
    }
    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      className={`${styles.page} ${styles.curve}`}
      style={{ backgroundColor }}
    >
      <div
        style={{ opacity: dimensions.width == null ? 1 : 0 }}
        className={styles.background}
      />
      <motion.p className={styles.route} {...anim(text)}>
        {(routes as any)[router.route]}
      </motion.p>
      {dimensions.width != null && <SVG {...dimensions as any} />}
      {children}
    </div>
  );
}

const SVG = ({ height, width }: { height: number; width: number }) => {
  const initialPath = `
        M0 300 
        Q${width / 2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width / 2} ${height + 600} 0 ${height + 300}
        L0 0
    `;

  const targetPath = `
        M0 300
        Q${width / 2} 0 ${width} 300
        L${width} ${height}
        Q${width / 2} ${height} 0 ${height}
        L0 0
    `;

  return (
    <motion.svg className={styles.svg} {...anim(translate)}>
      <motion.path {...anim(curve(initialPath, targetPath))} />
    </motion.svg>
  );
};
