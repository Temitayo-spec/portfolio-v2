'use client';
import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/src/lib/gsap';
import { useIntroStore } from '@/src/store/intro.store';
import { site, yearsOfExperience } from '@/src/constants';
import { published } from '@/src/lib/packages';
import TopBar from '../../shared/TopBar';
import SplitReveal from '../../shared/SplitReveal';
import Mixed from '../../shared/Mixed';
import Magnetic from '../../shared/Magnetic';
import LocalTime from '../../shared/LocalTime';
import Roll from '../../shared/Roll';
import { NowPlaying } from '../../shared/Spotify';
import { Backdrop, Bandage, Crows, Figure, Hanko, LookPanel } from '../../shared/looks/Art';

const HeroSection = ({ projectCount }: { projectCount: number }) => {
  const root = useRef<HTMLElement>(null);
  const introDone = useIntroStore((s) => s.done);

  // Scroll parallax on the name and portrait.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('[data-wordmark]', {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: { trigger: '[data-first-screen]', start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('[data-portrait-inner]', {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: true },
      });
      gsap.from('[data-info-row]', {
        opacity: 0,
        y: 24,
        stagger: 0.07,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '[data-info]', start: 'top 75%', once: true },
      });

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // Looks: the moon sinks, the crows scatter and the blindfold comes off the name.
      const firstScreen = { trigger: '[data-first-screen]', start: 'top top', end: 'bottom top', scrub: true };
      gsap.to('[data-moon]', { yPercent: 16, ease: 'none', scrollTrigger: firstScreen });
      gsap.utils.toArray<HTMLElement>('[data-crow]').forEach((crow) => {
        gsap.to(crow, {
          x: `${crow.dataset.dx}vw`,
          y: `${crow.dataset.dy}vh`,
          ease: 'power1.in',
          scrollTrigger: firstScreen,
        });
      });
      gsap.to('[data-bandage]', { xPercent: 70, rotate: 7, ease: 'power1.in', scrollTrigger: firstScreen });
    }, root);
    return () => ctx.revert();
  }, []);

  // Intro once the preloader lifts.
  useLayoutEffect(() => {
    if (!introDone) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'expo.inOut' } })
        .fromTo('[data-portrait]', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6 })
        .fromTo('[data-portrait-inner]', { scale: 1.35 }, { scale: 1, duration: 1.8 }, 0)
        .fromTo('[data-moon-rise]', { y: '24vh', opacity: 0 }, { y: 0, opacity: 1, duration: 1.8, ease: 'expo.out' }, 0.1);
    }, root);
    return () => ctx.revert();
  }, [introDone]);

  const rows = [
    ['Services', site.services],
    ['Stack', site.stack],
    ['Experience', `${yearsOfExperience()}+ years`],
    ['Projects shipped', `${projectCount}+`],
    ['npm packages', String(published.length)],
    ['Based in', site.location],
    ['Local time', <LocalTime key="t" />],
    ['Availability', site.availability],
  ] as const;

  return (
    <section ref={root} className="relative">
      {/* Portrait stays pinned while the name scrolls off and the info rows arrive. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="sticky top-0 h-[100svh] overflow-x-clip">
          <div data-moon-rise className="only-tsuki absolute inset-0">
            <div data-moon className="moon top-[3%] left-[37%] w-[min(88vh,62vw)] -translate-x-1/2" />
          </div>
          <div className="only-kiwami speed-lines" />
          <div className="only-sumi absolute top-[3%] left-[59%] aspect-square h-[76svh] -translate-x-1/2">
            <Backdrop />
          </div>
          <div
            data-portrait
            className="look-only look-stage absolute bottom-0 aspect-square -translate-x-1/2"
            style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          >
            <div data-portrait-inner className="absolute inset-0">
              <Figure sizes="110vh" lead />
            </div>
          </div>
          <Crows />
        </div>
      </div>

      <div data-first-screen className="relative flex min-h-[88svh] flex-col md:min-h-[100svh]">
        {/* Phones have no pinned stage, so the first screen carries each look's art. */}
        <div aria-hidden className="look-only absolute inset-0 overflow-x-clip md:hidden">
          <div className="only-tsuki moon bottom-[calc(50vw+2.5rem)] left-1/2 w-[min(84vw,calc(88svh-50vw-13.5rem))] -translate-x-1/2" />
          <div className="only-kiwami speed-lines" />
          <div className="only-sumi absolute bottom-[calc(30vw+3.5rem)] left-1/2 aspect-square w-[min(72vw,38svh)] -translate-x-1/2">
            <Backdrop />
          </div>
        </div>
        <TopBar />

        <SplitReveal
          on="intro"
          delay={0.55}
          className="hero-caption hero-tagline relative mx-5 mt-[7vh] max-w-[22rem] text-[15px] leading-snug text-muted md:text-base"
        >
          {site.tagline}
        </SplitReveal>

        {/* Signed like a hanging scroll: the name in a column, closed with the seal. */}
        <div aria-hidden className="look-only hero-sign absolute top-[max(9vh,5.5rem)] right-5 z-10 hidden flex-col items-center gap-[0.5em] md:right-8 md:flex">
          <span lang="ja" className="tate jp leading-[1.08]">
            テミタヨ・オラワンレ
          </span>
          <Hanko className="size-[1.7em] text-[0.95em]" />
        </div>

                <h1 data-wordmark aria-label={site.name} className="name relative mt-auto pb-10 md:pb-5">
          <SplitReveal on="intro" by="chars" delay={0.35} stagger={0.035} duration={1.4} className="display name-first text-[20.5vw] whitespace-nowrap">
            <Mixed text="Temitay*o*" />
          </SplitReveal>
          <SplitReveal on="intro" by="chars" delay={0.55} stagger={0.035} duration={1.4} className="display name-last text-[20.5vw] whitespace-nowrap">
            <Mixed text="*O*lawanle" />
          </SplitReveal>
          <Bandage loose className="only-kiwami absolute top-[calc(50%-1.25rem)] -left-[6vw] h-[max(3.2vw,1.25rem)] w-[118vw] -translate-y-1/2 -rotate-[1.8deg] text-[max(1.5vw,0.625rem)] md:top-[calc(50%-0.625rem)]" />
        </h1>
      </div>

      {/* Mobile keeps the portrait in flow. */}
      <div className="wrapper md:hidden">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
          <LookPanel sizes="100vw" />
        </div>
      </div>

      <div className="wrapper relative grid grid-cols-12 gap-y-10 py-16 md:min-h-[100svh] md:py-[14vh]">
        <p className="meta col-span-12 md:col-span-3">(01) About</p>

        <div data-info className="col-span-12 md:col-span-5 md:col-start-8 md:self-end">
          <dl>
            {rows.map(([label, value]) => (
              <div key={label} data-info-row className="flex items-baseline justify-between gap-6 border-b border-line py-3.5 first:border-t">
                <dt className="meta text-muted">{label}</dt>
                <dd className="meta text-right">{value}</dd>
              </div>
            ))}
          </dl>
          <NowPlaying />

          <div data-info-row className="mt-10 flex flex-wrap items-center gap-6">
            <Magnetic>
              <Link
                href="/works"
                className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-4"
              >
                <span className="meta">
                  <Roll>View works</Roll>
                </span>
                <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </Link>
            </Magnetic>
            <Link href="/about" className="meta wipe-line text-muted hover:text-ink">
              More about me
            </Link>
            <a href={site.resume} target="_blank" rel="noopener" className="meta wipe-line text-muted hover:text-ink">
              CV (PDF) ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
