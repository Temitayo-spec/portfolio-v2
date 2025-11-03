import { Variants } from 'framer-motion';

export const sideMenuVariants: Variants = {
  hidden: {
    scaleY: 0,
    transition: {
      duration: 1.2,
      ease: [0.83, 0, 0.17, 1],
      type: 'tween',
      delay: 0.5, // Delay menu close until links exit
    },
  },
  visible: {
    scaleY: 1,
    transition: {
      duration: 1.2,
      ease: [0.83, 0, 0.17, 1],
      type: 'tween',
    },
  },
};

export const linkContainer: Variants = {
  hidden: {
    transition: {
      duration: 0.8,
      staggerChildren: 0.05,
      staggerDirection: -1, // Reverse stagger on exit (bottom to top)
    },
  },
  visible: {
    transition: {
      duration: 0.8,
      delayChildren: 0.5, // Wait for menu to open before animating links
      staggerChildren: 0.08, // Slightly longer stagger for better sequencing
    },
  },
};

export const linkVariants: Variants = {
  hidden: {
    y: 140, // Use y transform instead of bottom for smoother animation
    transition: {
      duration: 0.6,
      ease: [0.83, 0, 0.17, 1],
      type: 'tween',
    },
  },
  visible: {
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.83, 0, 0.17, 1],
      type: 'tween',
    },
  },
};

export const links = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'About',
    url: '/about',
  },
  {
    title: 'Works',
    url: '/works',
  },
  {
    title: 'Contact',
    url: '/contact',
  },
] as const;

export const socialLinks = [
  {
    title: 'github',
    url: 'https://github.com/Temitayo-spec',
  },
  {
    title: 'twitter',
    url: 'https://twitter.com/OlawanleTemita1',
  },
  {
    title: 'linkedin',
    url: 'https://www.linkedin.com/in/temitayo-spec/',
  },
] as const;
