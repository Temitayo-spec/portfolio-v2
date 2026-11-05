'use client';
import { useEffect, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { useLenis } from 'lenis/react';
import { gsap } from '@/src/lib/gsap';
import { site, socialLinks } from '@/src/constants';
import SplitReveal from './SplitReveal';
import Mixed from './Mixed';
import Magnetic from './Magnetic';
import LocalTime from './LocalTime';
import Roll from './Roll';
import { Bandage } from './looks/Art';
import { LookOptions } from './looks/LookDraw';

/**
 * Footer revealed from under the page (the page above has a rounded bottom
 * and the footer is fixed behind it). A crimson glow trails the pointer and
 * the giant name rises letter by letter.
 */
const Footer = () => {
  const root = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-footer-char]', {
        yPercent: 130,
        ease: 'expo.out',
        duration: 1.4,
        stagger: 0.05,
        scrollTrigger: { trigger: root.current, start: 'top 35%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = glow.current;
    if (!el) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 1.4, ease: 'power3' });
    const move = (e: PointerEvent) => xTo(e.clientX - window.innerWidth / 2);
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <div
      ref={root}
      className="relative h-[100svh] min-h-[640px]"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      <footer className="fixed bottom-0 left-0 flex h-[100svh] min-h-[640px] w-full flex-col overflow-hidden bg-bg">
        <div
          ref={glow}
          aria-hidden
          className="only-base pointer-events-none absolute -bottom-[30vh] left-1/2 h-[80vh] w-[90vw] -translate-x-1/2 rounded-full opacity-80 blur-[60px]"
          style={{
            background:
              'radial-gradient(closest-side, color-mix(in srgb, var(--accent) 85%, transparent), transparent)',
          }}
        />

        <div aria-hidden className="only-tsuki moon -top-[34vh] -right-[10vw] w-[min(90vh,70vw)]" />
        <div className="max-md:hidden">
          <Bandage className="only-kiwami absolute top-[8vh] -left-[4vw] h-20 w-[108vw] -rotate-[1.4deg] text-3xl" />
        </div>
        <div
          aria-hidden
          className="only-sumi pointer-events-none absolute top-[9vh] -left-[6vw] h-[11vh] w-[112vw] bg-[url('/looks/stroke.webp')] bg-[length:100%_100%] max-md:hidden"
        />

        <div className="wrapper relative mt-auto mb-auto flex flex-col gap-6 pt-20 md:flex-row md:items-end md:justify-between md:gap-10 md:pt-24">
          <div>
            <p className="meta mb-5 flex items-center gap-3 text-muted">
              <span aria-hidden className="size-2 rounded-full bg-accent" />
              Got a project in mind?
            </p>
            <SplitReveal as="h2" by="chars" className="display text-[clamp(3rem,9vw,9rem)]">
              <Mixed text="Let's w*o*rk" />
              <br />
              <Mixed text="t*o*gether" />
            </SplitReveal>
          </div>

          {/* Phones have no room above the caption, so the bandage and stroke run behind the button. */}
          <div className="absolute bottom-9 -left-[4vw] w-[108vw] -rotate-[1.4deg] md:hidden">
            <Bandage className="only-kiwami relative h-14 text-xl" />
          </div>
          <div
            aria-hidden
            className="only-sumi pointer-events-none absolute bottom-6 -left-[6vw] h-20 w-[112vw] bg-[url('/looks/stroke.webp')] bg-[length:100%_100%] md:hidden"
          />

          <Magnetic>
            <a
              href={`mailto:${site.email}`}
              data-cursor="Say hi"
              className="group relative flex size-32 shrink-0 items-center justify-center rounded-full bg-accent text-center md:size-44"
            >
              <span className="meta">
                <Roll>Write me</Roll>
              </span>
            </a>
          </Magnetic>
        </div>

        <div className="wrapper relative grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5 md:grid-cols-4">
          <div className="meta flex flex-col gap-1">
            <span className="text-muted">Email</span>
            <a href={`mailto:${site.email}`} className="wipe-line w-fit break-all">
              {site.email}
            </a>
          </div>
          <div className="meta flex flex-col gap-1">
            <span className="text-muted">Based in</span>
            <span>
              {site.location} · <LocalTime />
            </span>
            <span className="look-only mt-3 text-muted max-md:hidden">This site comes in three looks</span>
            <LookOptions className="look-only -ml-3 max-md:hidden" />
          </div>
          {/* One line of its own on phones, or the column pushes the name off the screen. */}
          <div className="look-only meta col-span-2 flex items-center gap-3 md:hidden">
            <span className="text-muted">Looks</span>
            <LookOptions />
          </div>
          <div className="meta flex flex-col gap-1">
            <span className="text-muted">Socials</span>
            {socialLinks.map((s) => (
              <a key={s.url} href={s.url} target="_blank" rel="noreferrer noopener" className="wipe-line w-fit">
                {s.title}
              </a>
            ))}
          </div>
          <div className="meta flex flex-col items-start gap-1 md:items-end">
            <span className="text-muted">©{new Date().getFullYear()}</span>
            <Link href="/works" className="wipe-line">Works</Link>
            <Link href="/about" className="wipe-line">About</Link>
            <a href={site.resume} target="_blank" rel="noopener" className="wipe-line">CV (PDF)</a>
            <button type="button" onClick={() => lenis?.scrollTo(0, { duration: 2 })} className="group">
              <Roll>Back to top ↑</Roll>
            </button>
          </div>
        </div>

        <p
          aria-label={site.shortName}
          className="display relative mt-4 flex justify-between px-3 pr-[7vw] text-[20vw] leading-[0.74] md:mt-6 md:px-5 md:pr-[7vw]"
        >
          {site.shortName.split('').map((char, i) => (
            // Clip mostly vertically (grown a little), so tall glyphs aren't cut.
            <span key={i} aria-hidden className="block [clip-path:inset(-0.1em_-0.4em)]">
              <span data-footer-char className={`block ${char === 'o' ? 'text-accent' : ''}`}>
                {char}
              </span>
            </span>
          ))}
        </p>
      </footer>
    </div>
  );
};

export default Footer;
