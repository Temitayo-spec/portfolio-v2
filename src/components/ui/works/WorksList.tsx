'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Work } from '@/src/lib/works';
import { gsap } from '@/src/lib/gsap';
import { easeOutExpo, workTypes } from '@/src/constants';
import Roll from '../../shared/Roll';
import WorkCover from '../../shared/WorkCover';

const pad = (n: number) => String(n).padStart(2, '0');

const Details = ({ work }: { work: Work }) => (
  <motion.div
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: 'auto', opacity: 1 }}
    exit={{ height: 0, opacity: 0 }}
    transition={{ duration: 0.7, ease: easeOutExpo }}
    className="overflow-hidden"
  >
    <div className="grid grid-cols-12 gap-y-6 pt-2 pb-10">
      <p className="col-span-12 max-w-xl text-[15px] leading-relaxed text-muted md:col-span-6 md:col-start-2">
        {work.description}
      </p>
      <div className="meta col-span-6 flex flex-col gap-1 md:col-span-3">
        <span className="text-muted">Clients & collaborators</span>
        {work.collaborators.map((c) => (
          <span key={c}>{c}</span>
        ))}
        {work.stack.length > 0 && (
          <>
            <span className="mt-3 text-muted">Stack</span>
            <span>{work.stack.join(' / ')}</span>
          </>
        )}
      </div>
      {work.link && (
        <div className="col-span-6 flex items-start justify-end md:col-span-2">
          <a
            href={work.link}
            target="_blank"
            rel="noreferrer noopener"
            className="group meta inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3"
          >
            <Roll>Visit site ↗</Roll>
          </a>
        </div>
      )}
    </div>
  </motion.div>
);

const ListView = ({ works }: { works: Work[] }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const preview = useRef<HTMLDivElement>(null);

  // The preview card trails the pointer while it is over the list.
  useEffect(() => {
    const el = preview.current;
    if (!el || !window.matchMedia('(pointer: fine)').matches) return;
    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3' });
    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <div onPointerLeave={() => setHovered(null)}>
      <div className="meta hidden grid-cols-12 border-b border-line pb-3 text-muted md:grid">
        <span className="col-span-1">#</span>
        <span className="col-span-6">Project</span>
        <span className="col-span-3">Role</span>
        <span className="col-span-2 text-right">Year</span>
      </div>

      <ul>
        {works.map((work, i) => {
          const isOpen = open === work.id;
          const dimmed = hovered !== null && hovered !== i && !isOpen;
          return (
            <li key={work.id} data-work-row className="border-b border-line">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : work.id)}
                onPointerEnter={() => setHovered(i)}
                aria-expanded={isOpen}
                data-cursor={isOpen ? 'Close' : 'Open'}
                className="grid w-full grid-cols-12 items-baseline gap-y-1 py-5 text-left transition-opacity duration-500 md:py-6"
                style={{ opacity: dimmed ? 0.3 : 1 }}
              >
                <span
                  className="meta col-span-2 transition-colors duration-300 md:col-span-1"
                  style={{ color: hovered === i || isOpen ? 'var(--accent)' : 'var(--muted)' }}
                >
                  {pad(i + 1)}
                </span>
                <span
                  className="display col-span-10 text-[clamp(2.25rem,4.6vw,5rem)] transition-transform duration-700 ease-out-expo md:col-span-6"
                  style={{ transform: hovered === i ? 'translateX(1.25rem)' : 'none' }}
                >
                  {work.title}
                </span>
                <span className="meta col-span-8 col-start-3 text-muted md:col-span-3 md:col-start-auto">
                  <span className={work.type === 'mobile' ? 'text-accent' : ''}>{workTypes[work.type]}</span>
                  {work.roles.length > 0 && ` · ${work.roles.join(' / ')}`}
                </span>
                <span className="meta col-span-2 flex items-center justify-end gap-3 text-muted">
                  {work.year}
                  <span
                    aria-hidden
                    className="inline-block text-ink transition-transform duration-500"
                    style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
                  >
                    +
                  </span>
                </span>
              </button>
              <AnimatePresence initial={false}>{isOpen && <Details work={work} />}</AnimatePresence>
            </li>
          );
        })}
      </ul>

      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-50 hidden aspect-[16/10] w-[22rem] overflow-hidden rounded-xl transition-[opacity,scale] duration-500 ease-out-expo md:block"
        style={{
          opacity: hovered === null || open ? 0 : 1,
          scale: hovered === null || open ? 0.6 : 1,
        }}
      >
        {works.map((work, i) => (
          <div
            key={work.id}
            className="absolute inset-0 transition-[opacity,scale] duration-700 ease-out-expo"
            style={{ opacity: hovered === i ? 1 : 0, scale: hovered === i ? 1 : 1.15 }}
          >
            <WorkCover work={work} sizes="22rem" />
          </div>
        ))}
      </div>
    </div>
  );
};

const GridView = ({ works }: { works: Work[] }) => (
  <ul className="grid gap-x-6 gap-y-14 md:grid-cols-2">
    {works.map((work, i) => (
      <li key={work.id} data-work-row className={i % 2 === 1 ? 'md:mt-24' : ''}>
        <a
          href={work.link ?? undefined}
          target="_blank"
          rel="noreferrer noopener"
          data-cursor={work.link ? 'Visit ↗' : undefined}
          className="group block"
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-bg-soft">
            <div className="absolute inset-0 transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105">
              <WorkCover work={work} sizes="(min-width: 768px) 50vw, 100vw" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between gap-4">
            <h3 className="display text-[clamp(2rem,3.6vw,3.5rem)]">{work.title}</h3>
            <span className="meta text-accent">{pad(i + 1)}</span>
          </div>
          <p className="meta mt-2 text-muted">
            {workTypes[work.type]} · {work.roles.join(' / ')} · {work.year}
          </p>
        </a>
      </li>
    ))}
  </ul>
);

const WorksList = ({ works, grid }: { works: Work[]; grid: boolean }) => {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-work-row]', {
        opacity: 0,
        y: 40,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.06,
        scrollTrigger: { trigger: root.current, start: 'top 85%', once: true },
      });
    }, root);
    return () => ctx.revert();
  }, [grid]);

  return <div ref={root}>{grid ? <GridView works={works} /> : <ListView works={works} />}</div>;
};

export default WorksList;
