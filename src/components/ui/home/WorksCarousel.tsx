'use client';
import { useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLenis } from 'lenis/react';
import type { Work } from '@/src/lib/works';
import { gsap, ScrollTrigger } from '@/src/lib/gsap';
import Mixed from '../../shared/Mixed';
import SplitReveal from '../../shared/SplitReveal';
import Roll from '../../shared/Roll';
import WorkCover from '../../shared/WorkCover';
import { workTypes } from '@/src/constants';

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Scroll-driven 3D ring. Cards sit on the inside of a cylinder; scrolling the
 * pinned stage turns the ring so each project rotates to the front in turn.
 */
const WorksCarousel = ({ works, total }: { works: Work[]; total: number }) => {
  const stage = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLAnchorElement | null)[]>([]);
  const shades = useRef<(HTMLDivElement | null)[]>([]);
  const progressBar = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const lenis = useLenis();
  const n = works.length;

  useLayoutEffect(() => {
    if (n < 2) return;
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const step = 360 / Math.max(n, 6);
      let radius = 0;

      const layout = () => {
        const card = cards.current[0];
        if (!card || !ring.current || !stage.current) return;
        const chord = card.offsetWidth * 1.08;
        radius = chord / 2 / Math.tan((step * Math.PI) / 360);
        stage.current.style.perspective = `${radius * 2}px`;
        cards.current.forEach((el, i) => {
          if (el) el.style.transform = `rotateY(${-i * step}deg) translateZ(${-radius}px)`;
        });
      };

      const render = (rotation: number) => {
        if (!ring.current) return;
        ring.current.style.transform = `translateZ(${radius}px) rotateY(${rotation}deg)`;
        cards.current.forEach((el, i) => {
          if (!el) return;
          let angle = (rotation - i * step) % 360;
          if (angle > 180) angle -= 360;
          if (angle < -180) angle += 360;
          const distance = Math.abs(angle);
          el.style.visibility = distance > 100 ? 'hidden' : 'visible';
          const shade = shades.current[i];
          if (shade) shade.style.opacity = String(Math.min(distance / step, 1) * 0.65);
        });
      };

      layout();
      render(0);

      const state = { rotation: 0 };
      const tween = gsap.to(state, {
        rotation: (n - 1) * step,
        ease: 'none',
        onUpdate: () => render(state.rotation),
        scrollTrigger: {
          trigger: stage.current,
          start: 'top top',
          end: () => `+=${(n - 1) * window.innerHeight * 0.6}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onRefresh: layout,
          onUpdate: (self) => {
            setActive(Math.round(self.progress * (n - 1)));
            if (progressBar.current) progressBar.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
      trigger.current = tween.scrollTrigger ?? null;

      return () => {
        trigger.current = null;
      };
    });

    return () => mm.revert();
  }, [n]);

  // Clicking a side card turns the ring to it; clicking the front card opens the site.
  const onCardClick = (e: React.MouseEvent, i: number, work: Work) => {
    if (i === active && work.link) return;
    e.preventDefault();
    const st = trigger.current;
    if (!st) return;
    lenis?.scrollTo(st.start + (st.end - st.start) * (i / (n - 1)), { duration: 1.2 });
  };

  const current = works[active];

  return (
    <section id="works" className="relative">
      <div className="wrapper flex items-end justify-between pt-10">
        <p className="meta">(03) Selected work</p>
        <p className="meta text-muted">{pad(n)} of {pad(total)} projects</p>
      </div>

      <SplitReveal as="h2" by="chars" className="display relative mt-4 text-center text-[27vw] leading-[0.78] md:-mb-[6vw]">
        <Mixed text="W*o*rks" />
      </SplitReveal>

      {/* Desktop: pinned 3D ring */}
      <div ref={stage} className="relative hidden h-[100svh] overflow-hidden md:block">
        <div className="absolute inset-x-0 top-[7vh] z-10 flex flex-col items-center gap-2">
          {/* Clipped with a grown inset rather than overflow, so glyph edges aren't cut. */}
          <div className="relative h-[clamp(2.5rem,4.4vw,4.75rem)] w-full text-center [clip-path:inset(-0.12em_0)]">
            {works.map((work, i) => (
              <p
                key={work.id}
                aria-hidden={i !== active}
                className="display absolute inset-x-0 truncate px-8 text-[clamp(2.5rem,4.4vw,4.75rem)] leading-none transition-transform duration-700 ease-out-expo"
                style={{ transform: `translateY(${(i - active) * 130}%)` }}
              >
                {work.title}
              </p>
            ))}
          </div>
          <p className="meta text-muted">
            {current && `${workTypes[current.type]} · ${current.roles.join(' / ')}`}
          </p>
        </div>

        <div className="absolute inset-0 top-[6vh] flex items-center justify-center [transform-style:preserve-3d]">
          <div
            ref={ring}
            className="relative aspect-[16/10] w-[min(50vw,880px)] [transform-style:preserve-3d]"
          >
            {works.map((work, i) => (
              <a
                key={work.id}
                ref={(el) => {
                  cards.current[i] = el;
                }}
                href={work.link ?? '#'}
                target="_blank"
                rel="noreferrer noopener"
                onClick={(e) => onCardClick(e, i, work)}
                data-cursor={i === active ? 'Visit ↗' : 'View'}
                className="absolute inset-0 overflow-hidden rounded-[14px] bg-bg-soft [backface-visibility:hidden]"
              >
                <WorkCover work={work} sizes="50vw" />
                <div className="meta absolute inset-x-0 top-0 flex justify-between p-4">
                  <span className="rounded-full bg-bg/70 px-2.5 py-1 backdrop-blur">{pad(i + 1)}</span>
                  <span className="rounded-full bg-bg/70 px-2.5 py-1 backdrop-blur">
                    {workTypes[work.type]} · {work.year}
                  </span>
                </div>
                <div
                  ref={(el) => {
                    shades.current[i] = el;
                  }}
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-bg"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="wrapper absolute inset-x-0 bottom-[5vh] z-10 grid grid-cols-3 items-end">
          <p className="font-mono text-sm tabular-nums">
            <span className="text-accent">{pad(active + 1)}</span>
            <span className="text-muted"> / {pad(n)}</span>
          </p>
          <div className="h-px w-full bg-line">
            <div ref={progressBar} className="h-px w-full origin-left scale-x-0 bg-accent" />
          </div>
          <Link href="/works" className="group meta justify-self-end">
            <Roll>All works →</Roll>
          </Link>
        </div>
      </div>

      {/* Mobile: stacked cards */}
      <div className="wrapper flex flex-col gap-12 py-12 md:hidden">
        {works.map((work, i) => (
          <a key={work.id} href={work.link ?? '#'} target="_blank" rel="noreferrer noopener" className="block">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-bg-soft">
              <WorkCover work={work} sizes="100vw" />
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <h3 className="display text-[11vw]">{work.title}</h3>
              <span className="meta text-accent">{pad(i + 1)}</span>
            </div>
            <p className="meta mt-2 text-muted">
              {workTypes[work.type]} · {work.roles.join(' / ')} · {work.year}
            </p>
          </a>
        ))}
        <Link href="/works" className="meta self-start rounded-full bg-accent px-6 py-4">
          All works →
        </Link>
      </div>
    </section>
  );
};

export default WorksCarousel;
