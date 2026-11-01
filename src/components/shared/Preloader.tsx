'use client';
import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '@/src/lib/gsap';
import { useIntroStore } from '@/src/store/intro.store';
import { site } from '@/src/constants';

const SEEN_KEY = 'intro-seen';

/**
 * First-visit loader: a counter runs to 100 while the name rises, then the
 * panel lifts away and the page intro plays underneath. Skipped for the rest
 * of the session.
 */
const Preloader = () => {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const setDone = useIntroStore((s) => s.setDone);
  const [gone, setGone] = useState(false);

  useLayoutEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === '1';
    } catch {}

    if (seen || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (root.current) root.current.style.display = 'none';
      setDone(true);
      return;
    }

    const ctx = gsap.context(() => {
      const count = { value: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          try {
            sessionStorage.setItem(SEEN_KEY, '1');
          } catch {}
          setGone(true);
        },
      });

      tl.from('[data-pre-char]', {
        yPercent: 130,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.04,
      })
        .to(
          count,
          {
            value: 100,
            duration: 1.8,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (counter.current)
                counter.current.textContent = String(
                  Math.round(count.value)
                ).padStart(3, '0');
            },
          },
          0
        )
        .to('[data-pre-bar]', { scaleX: 1, duration: 1.8, ease: 'power2.inOut' }, 0)
        .to('[data-pre-char]', {
          yPercent: -130,
          duration: 0.7,
          ease: 'expo.in',
          stagger: 0.02,
        })
        .add(() => setDone(true), '-=0.1')
        .to(root.current, {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 1.1,
          ease: 'expo.inOut',
        }, '-=0.15');
    }, root);

    return () => ctx.revert();
  }, [setDone]);

  if (gone) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-bg p-5 md:p-8"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    >
      <div className="meta flex justify-between text-muted">
        <span>{site.name}</span>
        <span>Portfolio ©{new Date().getFullYear()}</span>
      </div>

      <div className="flex justify-center">
        <p className="display flex text-[16vw] md:text-[9vw]">
          {site.shortName.split('').map((char, i) => (
            <span key={i} className="block [clip-path:inset(-0.1em_-0.4em)]">
              <span data-pre-char className={`block ${char === 'o' ? 'serif-swap' : ''}`}>
                {char}
              </span>
            </span>
          ))}
        </p>
      </div>

      <div>
        <div className="mb-4 flex items-end justify-between">
          <span className="meta text-muted">Loading experience</span>
          <span ref={counter} className="font-mono text-5xl tabular-nums md:text-7xl">
            000
          </span>
        </div>
        <div className="h-px w-full bg-line">
          <div data-pre-bar className="h-px w-full origin-left scale-x-0 bg-accent" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
