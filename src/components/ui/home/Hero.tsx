'use client';
import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import my_photo from '@/public/images/my_photo.jpeg';
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
import { Backdrop, Bandage, Crows, Figure, Hanko, LookPanel } from '../../shared/looks/Art';

/** Crimson duotone of the avatar: greyscale image multiplied by a red gradient. */
const Portrait = () => (
  <>
    <div data-portrait-inner className="absolute inset-[-6%]">
      <Image
        src={my_photo}
        alt={`Illustrated portrait of ${site.shortName}`}
        fill
        sizes="(min-width: 768px) 30vw, 100vw"
        className="object-cover object-[46%_50%] grayscale contrast-125"
      />
    </div>
    <div
      aria-hidden
      className="absolute inset-0 mix-blend-multiply"
      style={{ background: 'linear-gradient(to top, #ff3b4e 0%, #b3182c 45%, #3a060c 100%)' }}
    />
    <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg to-transparent" />
  </>
);

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
      gsap.to('[data-star]', {
        rotate: 270,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
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
        .fromTo('[data-hero-line]', { scaleX: 0 }, { scaleX: 1, duration: 1.6 }, 0.3)
        .fromTo('[data-star]', { scale: 0 }, { scale: 1, duration: 1.4, ease: 'expo.out' }, 0.8)
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
          <div
            data-portrait
            className="only-base absolute top-0 left-[27%] h-full w-[30vw] overflow-hidden"
            style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          >
            <Portrait />
          </div>

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
        <div aria-hidden className="look-only absolute inset-0 overflow-hidden md:hidden">
          <div className="only-tsuki moon top-[45%] left-1/2 w-[94vw] -translate-x-1/2" />
          <div className="only-kiwami speed-lines" />
          <div className="only-sumi absolute top-[41.5%] right-[7vw] aspect-square w-[43vw]">
            <Backdrop />
          </div>
        </div>
        <TopBar />

        <div className="wrapper relative mt-[18vh] grid grid-cols-12 items-start gap-y-6 md:mt-[22vh]">
          <div className="col-span-6 md:col-span-3">
            <SplitReveal on="intro" delay={0.4} className="hero-caption meta w-fit">
              (Hello)
            </SplitReveal>
            <span data-hero-line className="mt-4 block h-px w-8 origin-left bg-accent" />
          </div>
          <svg
            data-star
            viewBox="0 0 24 24"
            className="only-base col-span-6 size-7 justify-self-end text-accent md:col-span-1 md:col-start-7 md:size-9"
            aria-hidden
          >
            <path
              fill="currentColor"
              d="M12 0l1.6 8.1L20.5 3.5l-4.6 6.9L24 12l-8.1 1.6 4.6 6.9-6.9-4.6L12 24l-1.6-8.1-6.9 4.6 4.6-6.9L0 12l8.1-1.6L3.5 3.5l6.9 4.6z"
            />
          </svg>
          <SplitReveal
            on="intro"
            delay={0.55}
            className="hero-caption hero-tagline col-span-12 max-w-[22rem] text-[15px] leading-snug text-muted md:col-span-4 md:col-start-9 md:text-base"
          >
            {site.tagline}
          </SplitReveal>
        </div>

        {/* Signed like a hanging scroll: the name in a column, closed with the seal. */}
        <div aria-hidden className="look-only hero-sign absolute top-[9vh] right-5 z-10 hidden flex-col items-center gap-[0.5em] md:right-8 md:flex">
          <span lang="ja" className="tate jp leading-[1.08]">
            テミタヨ・オラワンレ
          </span>
          <Hanko className="size-[1.7em] text-[0.95em]" />
        </div>

        <span data-hero-line className="wrapper mt-8 block origin-left md:mt-10">
          <span className="block h-px w-full bg-line" />
        </span>

        {/* Bottom padding on mobile keeps the name clear of the corner buttons. */}
        <h1 data-wordmark aria-label={site.name} className="relative mt-auto pb-24 md:pb-6">
          <SplitReveal on="intro" by="chars" delay={0.35} stagger={0.035} duration={1.4} className="display px-3 text-[20.5vw] whitespace-nowrap md:px-5">
            <Mixed text="Temitay*o*" />
          </SplitReveal>
          <SplitReveal
            on="intro"
            by="chars"
            delay={0.55}
            stagger={0.035}
            duration={1.4}
            className="display px-3 text-right text-[20.5vw] whitespace-nowrap text-accent md:px-5"
          >
            <Mixed text="*O*lawanle" />
          </SplitReveal>
          <Bandage loose className="only-kiwami absolute top-[25%] -left-[6vw] h-[max(3.2vw,1.25rem)] md:top-[33%] w-[118vw] -rotate-[1.8deg] text-[max(1.5vw,0.625rem)]" />
        </h1>
      </div>

      {/* Mobile keeps the portrait in flow. */}
      <div className="wrapper md:hidden">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
          <div className="only-base">
            <Portrait />
          </div>
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
