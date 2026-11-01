import type { Work } from './works';

/**
 * Projects that aren't in Sanity yet, mostly from the resume. They are merged
 * with the Sanity works (Sanity wins on a matching title) and sorted by `date`.
 * Covers come from public/works/<slug>.jpg, or `phone` for mobile apps.
 */
export type Project = Pick<Work, 'title' | 'description' | 'roles' | 'stack' | 'link' | 'type'> & {
  /** Latest activity as YYYY-MM, used for sorting. */
  date: string;
  collaborators?: string[];
  phone?: NonNullable<Work['phone']>;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: 'LinkPay',
    type: 'mobile',
    date: '2026-11',
    featured: true,
    roles: ['Founding Engineer'],
    description:
      'A Nigerian payments app for iOS and Android that has processed over ₦1 billion. I built it end to end and run it in production: the Expo app, the Bun and MongoDB backend, the admin console with live support chat, a partner API with a typed SDK, and an MCP server that lets AI assistants draft transfers the account holder approves in the app.',
    stack: ['Expo', 'React Native', 'Bun', 'Express', 'MongoDB', 'Next.js'],
    link: null,
    phone: { image: '/works/linkpay-icon.png', background: '#27394D' },
  },
  {
    title: 'Ark',
    type: 'mobile',
    date: '2026-11',
    featured: true,
    roles: ['Lead Mobile Engineer'],
    collaborators: ['World Street'],
    description:
      "World Street's app for money, trading, games and social. I architected it on Expo and React Native's New Architecture, built the crypto and naira money flows, live streaming with an iOS broadcast extension in Swift, and the release system behind its store builds and over-the-air updates.",
    stack: ['Expo', 'React Native', 'Privy', 'LiveKit', 'Swift', 'Bun'],
    link: null,
    phone: { image: '/works/ark-icon.png', background: '#0A0B0D' },
  },
  {
    title: 'Utkast',
    type: 'mobile',
    date: '2026-10',
    featured: true,
    roles: ['Mobile Engineer'],
    description:
      'AI meeting notes for iOS and Android: live transcription with Deepgram, meeting summaries, notes and tasks, a people and company directory, and search across the whole workspace, on a typed API client generated from OpenAPI.',
    stack: ['Expo', 'React Native', 'Deepgram', 'OpenAPI', 'Jest'],
    link: null,
    phone: { image: '/works/utkast-logo.png', background: '#EFEAE1', wordmark: true },
  },
  {
    title: 'Ark Store',
    type: 'web',
    date: '2026-09',
    featured: true,
    roles: ['Full-Stack Engineer'],
    collaborators: ['World Street'],
    description:
      'An app store for Android, Windows and macOS. Every build has its APK, Authenticode or macOS code signature verified before it is published. It ships with a native Android client, a publishing CLI and a Tauri desktop app.',
    stack: ['Next.js', 'React Native', 'Tauri', 'Bun', 'Fastify'],
    link: 'https://www.arkstore.xyz',
  },
  {
    title: 'VividBuild',
    type: 'mobile',
    date: '2026-09',
    featured: true,
    roles: ['Mobile Engineer'],
    description:
      "The iOS and Android client for an AI app builder: a streamed build chat, live previews of what's being built, and publishing from your phone.",
    stack: ['Expo', 'Expo Router', 'React Native'],
    link: null,
    phone: { image: '/works/vividbuild-icon.png', background: '#0A0B0D' },
  },
  {
    title: 'Sheire',
    type: 'web',
    date: '2026-11',
    roles: ['Frontend Engineer'],
    collaborators: ['Lyla Labs'],
    description:
      'A platform for hiring verified household staff in Lagos. I built the employer web app and the admin console, deployed on Cloudflare Workers from a Turborepo monorepo and wired to the platform API through shared Zod contracts and a typed SDK.',
    stack: ['Next.js', 'Cloudflare Workers', 'Turborepo', 'Zod'],
    link: null,
  },
  {
    title: 'Portcullis',
    type: 'backend',
    date: '2026-10',
    roles: ['Creator'],
    description:
      "A self-hosted remote gate for Expo apps: pause the app or require an update, per store, without shipping a build. The server can never put words or links on users' screens. The client is on npm as expo-portcullis.",
    stack: ['Go', 'Expo', 'TypeScript'],
    link: 'https://github.com/Temitayo-spec/portcullis',
  },
  {
    title: 'naira-sim',
    type: 'backend',
    date: '2026-10',
    roles: ['Creator'],
    description:
      "A stand-in Nigerian payments provider that misbehaves on purpose: stuck transfers, duplicate webhooks, late reversals. Point a backend at it to see how it copes. It speaks Paystack's transfer API and never moves real money.",
    stack: ['Go', 'Docker'],
    link: 'https://github.com/Temitayo-spec/naira-sim',
  },
  {
    title: 'Debt Sync',
    type: 'mobile',
    date: '2026-08',
    roles: ['Mobile Developer'],
    description:
      'Split shared expenses with a group: create or join a group, add expenses for members or guests, keep to a budget and settle up.',
    stack: ['Expo', 'React Native', 'Zustand', 'SQLite'],
    link: 'https://github.com/Temitayo-spec/Debt-Sync',
    phone: { background: '#1C1917' },
  },
  {
    title: 'Anchor',
    type: 'web',
    date: '2026-07',
    roles: ['Full-Stack Engineer'],
    description:
      'Matches patients with therapists, with appointments and real-time messaging. I built the API and its Next.js frontend.',
    stack: ['Express', 'Bun', 'Prisma', 'PostgreSQL', 'Socket.IO', 'Next.js'],
    link: null,
  },
  {
    title: 'Sochil',
    type: 'backend',
    date: '2026-07',
    roles: ['Backend Engineer'],
    description:
      'The commerce API behind a drinkware store: carts, checkout, Stripe payments, orders and stock.',
    stack: ['Bun', 'Fastify', 'MongoDB', 'Stripe'],
    link: null,
  },
  {
    title: 'Cerebral Lemon',
    type: 'web',
    date: '2026-06',
    roles: ['Web Developer'],
    collaborators: ['JayTech Design Studios'],
    description:
      'The website for Cerebral Lemon, built with JayTech Design Studios on Next.js and Sanity.',
    stack: ['Next.js', 'Sanity', 'GSAP'],
    link: 'https://www.cerebrallemon.com',
  },
  {
    title: 'FocusPair',
    type: 'mobile',
    date: '2026-05',
    roles: ['Mobile Developer'],
    description:
      'A focus app that turns deep-work sessions into a game, with achievements, streaks and progress you can see.',
    stack: ['Expo', 'React Native', 'NativeWind', 'Zustand'],
    link: 'https://github.com/Temitayo-spec/FocusPair',
    phone: { background: '#000000' },
  },
  {
    title: 'Decane',
    type: 'mobile',
    date: '2026-01',
    featured: true,
    roles: ['Mobile Engineer'],
    collaborators: ['Deserialize'],
    description:
      'A multi-chain mobile wallet for EVM and Solana with smart accounts and biometric security, plus the push-notification service that tells you when funds arrive while the app is closed.',
    stack: ['Expo', 'React Native', 'viem', 'Solana', 'Hono'],
    link: 'https://www.decane.app',
    phone: { image: '/works/decane-icon.png', background: '#0D0D0D' },
  },
  {
    title: 'Dextopus',
    type: 'web',
    date: '2026-01',
    featured: true,
    roles: ['Frontend Developer'],
    collaborators: ['Deserialize'],
    description:
      'A multi-chain crypto bridge across EVM, Solana and TON that processed over $20M in its first 90 days. I built the whole frontend on my own: multi-wallet connections and live tracking of transfers across on-chain and off-chain systems.',
    stack: ['Next.js', 'TypeScript', 'viem', 'Solana', 'TON'],
    link: 'https://www.dextopus.com',
  },
  {
    title: 'Flybirdie',
    type: 'web',
    date: '2025-03',
    roles: ['Frontend Engineer'],
    description:
      'A Web3 gaming platform. I built the core web app, the admin dashboard and the full Telegram bot interface on 30+ API endpoints, then led a UI revamp that brought the web and Telegram experiences together.',
    stack: ['React', 'TypeScript', 'Telegram'],
    link: null,
  },
];
