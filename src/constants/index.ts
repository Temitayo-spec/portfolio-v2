export const site = {
  name: 'Temitayo Olawanle',
  shortName: 'Temitayo',
  url: 'https://temitayoo.vercel.app',
  role: 'Mobile & Full-Stack Engineer',
  tagline:
    'I build mobile apps and the web products around them, end to end, and sweat every pixel and frame.',
  email: 'olawanletemitayo@gmail.com',
  location: 'Lagos, Nigeria',
  timeZone: 'Africa/Lagos',
  timeZoneLabel: 'WAT',
  // Years of experience are counted from this year.
  careerStart: 2021,
  availability: 'Open to new projects',
  services: 'Mobile apps / Web apps / Backends',
  stack: 'React Native / Expo / Next.js / Node',
  resume: '/Olawanle_Temitayo_Resume.pdf',
} as const;

export const yearsOfExperience = () =>
  new Date().getFullYear() - site.careerStart;

// Project types, as labels for the works filter and cards.
export const workTypes = {
  mobile: 'Mobile app',
  web: 'Web',
  backend: 'Backend & tools',
} as const;

export const links = [
  { title: 'Home', url: '/', jp: 'ホーム' },
  { title: 'Works', url: '/works', jp: '作品' },
  { title: 'About', url: '/about', jp: '自己紹介' },
  { title: 'Contact', url: '/contact', jp: '連絡先' },
] as const;

export const socialLinks = [
  { title: 'GitHub', url: 'https://github.com/Temitayo-spec' },
  { title: 'LinkedIn', url: 'https://www.linkedin.com/in/temitayo-spec/' },
  { title: 'Twitter / X', url: 'https://twitter.com/OlawanleTemita1' },
] as const;

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeInOutQuart = [0.76, 0, 0.24, 1] as const;
