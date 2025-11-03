'use client';
import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

const titleAnimation: Variants = {
  rest: {
    transition: {
      staggerChildren: 0.01,
    },
  },
  hover: {
    transition: {
      staggerChildren: 0.01,
    },
  },
};

const letterAnimation: Variants = {
  rest: {
    y: 0,
  },
  hover: {
    y: -25,
    transition: {
      duration: 0.5,
      ease: [0.6, 0.01, 0.05, 0.95],
      type: 'tween',
    },
  },
};

const letterAnimationTwo: Variants = {
  rest: {
    y: 25,
  },
  hover: {
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, 0.01, 0.05, 0.95],
      type: 'tween',
    },
  },
};

const AnimatedLink = ({
  title,
  secondTitle,
  isLink,
  href,
  onClick,
}: {
  title: string;
  secondTitle?: string;
  isLink: boolean;
  href?: string;
  onClick?: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const containerClasses =
    'relative cursor-pointer flex flex-col overflow-hidden';

  return isLink ? (
    <Link
      href={href as string}
      className={containerClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatedWord
        title={title}
        animations={letterAnimation}
        isHovered={isHovered}
      />
      <span className="absolute top-0">
        <AnimatedWord
          title={secondTitle ?? title}
          animations={letterAnimationTwo}
          isHovered={isHovered}
        />
      </span>
    </Link>
  ) : (
    <p
      className={containerClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatedWord
        title={title}
        animations={letterAnimation}
        isHovered={isHovered}
      />
      <span onClick={onClick} className="absolute top-0">
        <AnimatedWord
          title={secondTitle ?? title}
          animations={letterAnimationTwo}
          isHovered={isHovered}
        />
      </span>
    </p>
  );
};

export default AnimatedLink;

const AnimatedWord = ({
  title,
  animations,
  isHovered,
}: {
  title: string;
  animations: Variants;
  isHovered: boolean;
}) => (
  <motion.span
    className="whitespace-nowrap relative"
    variants={titleAnimation}
    initial="rest"
    animate={isHovered ? 'hover' : 'rest'}
  >
    {title.split('').map((char, i) =>
      char === ' ' ? (
        <span
          className="relative inline-block whitespace-nowrap text-white text-base font-normal md:text-base md:font-medium md:text-white"
          key={i}
        >
          &nbsp;
        </span>
      ) : (
        <motion.span
          className="relative inline-block whitespace-nowrap text-white text-base font-normal md:text-base md:font-medium md:text-white"
          variants={animations}
          key={i}
        >
          {char}
        </motion.span>
      )
    )}
  </motion.span>
);
