export const sideMenuVariants = {
  hidden: {
    scaleY: 0,
    transition: {
      duration: 1.2,
      ease: [0.83, 0, 0.17, 1],
      type: 'tween',
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

export const linkContainer = {
  hidden: {
    transition: {
      duration: 1,
      staggerChildren: 0.02,
    },
  },

  visible: {
    transition: {
      duration: 1,
      staggerChildren: 0.02,
    },
  },
};

export const linkVariants = {
  hidden: {
    bottom: '-140px',
  },
  visible: {
    bottom: 0,

    transition: {
      duration: 1.5,
      ease: [0.83, 0, 0.17, 1],
      type: 'tween',
      delay: 0.7,
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
    title: 'Work',
    url: '/work',
  },
  {
    title: 'Contact',
    url: '/contact',
  },
];

export const socialLinks = [
  {
    title: 'github',
    url: 'https://github.com/Temitayo-spec',
  },
  {
    title: 'twitter',
    url: '/about',
  },
  {
    title: 'linkedin',
    url: '/work',
  },
];
