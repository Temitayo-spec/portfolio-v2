import styles from '@/styles/Works.module.scss';
import { motion } from 'framer-motion';
import Curve from '@/components/Common/Curve';
import WorksRow from '@/components/UI/Works/WorksRow';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { client } from '../../sanity/lib/client';
import { WorkRowProps } from '../../interfaces';
import { useRecoilState } from 'recoil';
import { viewAtom } from '../../atoms/viewAtom';
import { useEffect, useRef } from 'react';
import { Footer } from '@/components';

export const revalidate = 60;

const headingContainer = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      ease: [0.83, 0, 0.17, 1],
    },
  },
};

const textVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.83, 0, 0.17, 1],
    },
  },
};

const lineVariants = {
  hidden: {
    scaleX: 0,
  },
  visible: {
    scaleX: 1,
    transformOrigin: 'left',
    transition: {
      duration: 1.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const Works = ({ works }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
    <Curve backgroundColor="black">
      <div ref={componentRef} className={styles.works__wrapper}>
        <div className={styles.works__inner}>
          <motion.div
            variants={headingContainer}
            initial="hidden"
            whileInView="visible"
            className={styles.works__header}
          >
            <motion.p variants={textVariants}>Featured works</motion.p>
            <motion.div
              variants={lineVariants}
              className={styles.line__drawer}
            />
          </motion.div>
          {works.map((work, i) => (
            <WorksRow work={work} key={i} />
          ))}
        </div>
      </div>
      <Footer />
    </Curve>
  );
};

export default Works;

export const getStaticProps = (async () => {
  const query = `*[_type == "works"]{
  ...,
  roles[]->,
    clients_collaborators[]->
} | order(_createdAt)`;

  const res = await client.fetch(query);
  // Fetch data from external API

  const works: WorkRowProps[] = await res;

  // Pass data to the page via props
  return { props: { works }, revalidate: 60 };
}) satisfies GetStaticProps<{ works: WorkRowProps[] }>;
