'use client';
import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import my_photo from '@/public/images/my_photo.jpeg';
import { gsap } from '@/src/lib/gsap';
import { useIntroStore } from '@/src/store/intro.store';
import { site, yearsOfExperience } from '@/src/constants';
import type { Music } from '@/src/lib/spotify';
import PageShell from '../../shared/PageShell';
import TopBar from '../../shared/TopBar';
import { LookPanel, PageKanji } from '../../shared/looks/Art';
import SplitReveal from '../../shared/SplitReveal';
import ScrubText from '../../shared/ScrubText';
import Mixed from '../../shared/Mixed';
import Magnetic from '../../shared/Magnetic';
import Roll from '../../shared/Roll';
import { OnRepeat } from '../../shared/Spotify';

const sections = [
  {
    title: 'Experience',
    body: `I'm a mobile and full-stack engineer with ${yearsOfExperience()}+ years of shipping production products in fintech, Web3 and consumer apps. I build React Native apps end to end, together with the backends, admin tools and release pipelines behind them. I'm the founding engineer of LinkPay, a Nigerian payments app that has processed over ₦1 billion, and the lead mobile engineer on Ark.`,
  },
  {
    title: 'Development philosophy',
    body: 'I believe in the power of code to transform ideas into reality. Every line of code I write is a deliberate step towards creating robust, user-friendly, and visually appealing products. Where money moves, correctness comes first: integer amounts, idempotent writes, and a ledger only the server can touch.',
  },
  {
    title: 'Collaborative approach',
    body: 'Having collaborated with cross-functional teams, I understand the importance of effective communication and teamwork in the development process. Whether working with designers, backend developers, or project managers, I thrive in an environment where collaboration is key, ensuring that the final product meets both technical requirements and user expectations.',
  },
  {
    title: 'Continuous learning',
    body: 'In the fast-moving world of mobile and web development, continuous learning is essential. I actively seek opportunities to expand my skill set, stay informed about emerging technologies, and contribute to the vibrant developer community.',
  },
];

// From the resume, newest first.
const experience = [
  {
    company: 'LinkPay',
    role: 'Founding Engineer',
    dates: 'Apr 2026 – Present',
    summary: 'Built and run a Nigerian payments app end to end: the Expo app, the backend and the admin console. Over ₦1 billion processed.',
  },
  {
    company: 'Ark',
    role: 'Lead Mobile Engineer',
    dates: 'Jul 2026 – Present',
    summary: "Architected World Street's money, trading, games and social app, and built its money flows, live streaming and release system.",
  },
  {
    company: 'Sheire (Lyla Labs)',
    role: 'Frontend Engineer',
    dates: 'Aug 2026 – Present',
    summary: 'Built the employer web app and admin console for hiring verified household staff in Lagos.',
  },
  {
    company: 'Utkast',
    role: 'Mobile Engineer',
    dates: 'Aug – Oct 2026',
    summary: 'Built the AI meeting notes app for iOS and Android, with live transcription and workspace-wide search.',
  },
  {
    company: 'Afrostylists',
    role: 'Full-Stack Engineer, contract',
    dates: 'Feb – Apr 2026',
    summary: 'Built and launched a marketplace for Afro hair specialists, with Stripe Connect deposits and stylist payouts.',
  },
  {
    company: 'Deserialize',
    role: 'Frontend Developer, contract',
    dates: 'Apr 2025 – Jan 2026',
    summary: 'Built the frontend of a multi-chain bridge that processed $20M+ in its first 90 days, and the Decane mobile wallet.',
  },
  {
    company: 'Flybirdie',
    role: 'Frontend Engineer, contract',
    dates: 'Jul 2024 – Mar 2025',
    summary: 'Built the web app, admin dashboard and Telegram bot for a Web3 gaming platform.',
  },
  {
    company: 'JayTech Design Studios',
    role: 'Software Engineer',
    dates: 'Aug 2023 – Aug 2026',
    summary: 'Delivered 10+ production websites for consulting, nonprofit, cybersecurity and healthcare clients.',
  },
  {
    company: 'Earlier',
    role: 'Frontend & Full-Stack Engineer',
    dates: '2021 – 2023',
    summary: 'Production web apps for education, nonprofit and business organisations, from blogs to event and voting systems.',
  },
];

const stack = [
  ['Mobile', ['React Native', 'Expo', 'EAS Build & Update', 'Expo Router', 'Swift extensions', 'App Store & Google Play']],
  ['Frontend', ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'NativeWind', 'TanStack Query', 'Zustand', 'Framer Motion', 'GSAP']],
  ['Backend', ['Node.js', 'Bun', 'Express', 'Fastify', 'Hono', 'MongoDB', 'PostgreSQL', 'Prisma', 'Redis', 'Socket.IO']],
  ['Payments & Web3', ['Ledgers & reconciliation', 'Webhooks', 'KYC', 'Stripe Connect', 'viem', 'Solana', 'TON', 'Privy']],
  ['Tooling', ['Docker', 'Cloudflare Workers', 'GitHub Actions', 'Sentry', 'Jest', 'Vitest', 'Turborepo', 'MCP servers']],
] as const;

const AboutInject = ({ music }: { music: Music | null }) => {
  const root = useRef<HTMLDivElement>(null);
  const introDone = useIntroStore((s) => s.done);

  useLayoutEffect(() => {
    if (!introDone) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'expo.inOut' } })
        .fromTo('[data-about-photo]', { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5 }, 0.2)
        .fromTo('[data-about-photo] img', { scale: 1.3 }, { scale: 1, duration: 1.8 }, 0.2);

      gsap.utils.toArray<HTMLElement>('[data-exp-row]').forEach((row) => {
        gsap.from(row, {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: row, start: 'top 92%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-stack-row]').forEach((row) => {
        gsap.from(row.querySelectorAll('[data-chip]'), {
          opacity: 0,
          y: 16,
          stagger: 0.04,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: { trigger: row, start: 'top 88%', once: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [introDone]);

  return (
    <PageShell>
      <div ref={root}>
        <TopBar />
        <PageKanji>自己紹介</PageKanji>

        <section className="wrapper grid grid-cols-12 gap-y-10 pt-[16vh] md:pt-[20vh]">
          <div className="col-span-12 md:col-span-8">
            <SplitReveal on="intro" className="meta mb-6 text-muted">
              (About)
            </SplitReveal>
            <SplitReveal as="h1" on="intro" by="chars" stagger={0.02} className="display text-[clamp(3.5rem,11.5vw,12rem)]">
              <Mixed text="Temitay*o*" />
              <br />
              <Mixed text="*O*lawanle" />
            </SplitReveal>
            <SplitReveal on="intro" delay={0.4} className="meta mt-8">
              {`${site.role} — ${site.location}`}
            </SplitReveal>
            <Magnetic>
              <a
                href={site.resume}
                target="_blank"
                rel="noopener"
                className="group meta mt-8 inline-flex items-center gap-3 rounded-full border border-line px-6 py-4 transition-colors duration-300 hover:border-accent"
              >
                <Roll>Download CV</Roll>
                <span aria-hidden className="transition-transform duration-500 group-hover:translate-y-0.5">↓</span>
              </a>
            </Magnetic>
          </div>

          <div
            data-about-photo
            className="relative col-span-12 aspect-[4/5] overflow-hidden rounded-xl md:col-span-4 md:mt-24"
            style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          >
            <div className="only-base">
              <Image
                src={my_photo}
                alt={`Illustrated portrait of ${site.shortName}`}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover grayscale contrast-125"
              />
              <div
                aria-hidden
                className="absolute inset-0 mix-blend-multiply"
                style={{ background: 'linear-gradient(to top, #ff3b4e 0%, #b3182c 45%, #3a060c 100%)' }}
              />
            </div>
            <LookPanel sizes="(min-width: 768px) 33vw, 100vw" />
          </div>
        </section>

        <section className="wrapper py-[14vh] md:py-[18vh]">
          <ScrubText as="h2" className="display text-[clamp(2.25rem,6vw,6.75rem)] leading-[0.92]">
            <Mixed text="Greetings! I'm Temitayo, an engineer who builds mobile apps and the web products around them, end to end." />
          </ScrubText>
        </section>

        <section className="wrapper">
          {sections.map((section, i) => (
            <div key={section.title} className="grid grid-cols-12 gap-y-4 border-t border-line py-10 md:py-14">
              <p className="meta col-span-12 md:col-span-4">
                <span className="text-accent">0{i + 1}</span> <span className="ml-3">{section.title}</span>
              </p>
              <SplitReveal className="col-span-12 text-[clamp(1.125rem,1.7vw,1.6rem)] leading-[1.35] tracking-tight md:col-span-7 md:col-start-6">
                {section.body}
              </SplitReveal>
            </div>
          ))}
        </section>

        <section className="wrapper mt-[10vh]">
          <div className="mb-8 flex items-end justify-between">
            <SplitReveal as="h2" by="chars" className="display text-[clamp(3rem,9vw,9rem)]">
              <Mixed text="J*o*urney" />
            </SplitReveal>
            <a href={site.resume} target="_blank" rel="noopener" className="meta wipe-line hidden text-muted hover:text-ink md:block">
              Full CV (PDF) ↓
            </a>
          </div>
          <ol>
            {experience.map((job) => (
              <li
                key={job.company}
                data-exp-row
                className="group grid grid-cols-12 items-baseline gap-x-4 gap-y-2 border-t border-line py-6 md:py-7"
              >
                <p className="meta col-span-12 text-muted md:col-span-2">{job.dates}</p>
                <h3 className="col-span-12 text-[clamp(1.5rem,2.6vw,2.5rem)] leading-none tracking-tight transition-colors duration-300 group-hover:text-accent md:col-span-4">
                  {job.company}
                </h3>
                <p className="meta col-span-12 md:col-span-2">{job.role}</p>
                <p className="col-span-12 text-[15px] leading-relaxed text-muted md:col-span-4">{job.summary}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="wrapper mt-[14vh]">
          <div className="mb-8 flex items-end justify-between">
            <SplitReveal as="h2" by="chars" className="display text-[clamp(3rem,9vw,9rem)]">
              <Mixed text="T*o*olkit" />
            </SplitReveal>
            <p className="meta hidden text-muted md:block">What I build with</p>
          </div>
          {stack.map(([label, items]) => (
            <div key={label} data-stack-row className="grid grid-cols-12 items-center gap-y-3 border-t border-line py-5">
              <p className="meta col-span-12 text-muted md:col-span-4">{label}</p>
              <ul className="col-span-12 flex flex-wrap gap-2 md:col-span-8">
                {items.map((item) => (
                  <li
                    key={item}
                    data-chip
                    className="rounded-full border border-line px-4 py-2 text-sm transition-colors duration-300 hover:border-accent hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {music && <OnRepeat {...music} />}

        <section className="wrapper mt-[16vh] grid grid-cols-12 items-end gap-y-8 pb-[6vh]">
          <div className="col-span-12 md:col-span-8">
            <SplitReveal as="h2" by="chars" className="display text-[clamp(2.75rem,7vw,7.5rem)]">
              <Mixed text="Let's build s*o*mething" />
              <br />
              <Mixed text="amazing" />
            </SplitReveal>
            <SplitReveal className="mt-6 max-w-lg text-[15px] leading-relaxed text-muted">
              Whether you have an app or a product in mind, or you&apos;re
              looking for an engineer to join your team, I&apos;m excited about
              turning ideas into apps and experiences people love to use.
            </SplitReveal>
          </div>
          <div className="col-span-12 md:col-span-4 md:justify-self-end">
            <Magnetic>
              <Link href="/contact" className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-5">
                <span className="meta">
                  <Roll>Get in touch</Roll>
                </span>
                <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </Link>
            </Magnetic>
          </div>
        </section>
      </div>
    </PageShell>
  );
};

export default AboutInject;
