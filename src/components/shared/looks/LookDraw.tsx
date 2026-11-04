'use client';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { ScrollTrigger } from '@/src/lib/gsap';
import { looks, lookKey, type Look } from '@/src/lib/looks';
import { useIntroStore } from '@/src/store/intro.store';
import { useSidebarStore } from '@/src/store/sidebar.store';

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-look'] });
  return () => observer.disconnect();
};

const useLook = () =>
  useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.look,
    () => undefined
  );

const choose = (look: Look) => {
  document.documentElement.dataset.look = look;
  try {
    localStorage.setItem(lookKey, look);
  } catch {}
  // Each look has its own type, so measured scroll ranges change with it.
  document.fonts.ready.then(() => ScrollTrigger.refresh());
};

/** The three looks as buttons, for the draw chip and the footer. */
export const LookOptions = ({ className = '' }: { className?: string }) => {
  const current = useLook();

  return (
    <div role="group" aria-label="Site look" className={`flex flex-wrap gap-0.5 ${className}`}>
      {looks.map((look) => (
        <button
          key={look.id}
          type="button"
          aria-pressed={current === look.id}
          aria-label={`${look.label}: ${look.meaning}`}
          onClick={() => choose(look.id)}
          className={`flex h-9 min-w-11 items-center justify-center gap-1.5 rounded-full px-3 transition-colors duration-300 ${
            current === look.id ? 'bg-accent' : 'text-muted hover:text-ink'
          }`}
        >
          <span lang="ja" className="text-[0.8125rem] leading-none tracking-normal whitespace-nowrap">
            {look.mark}
          </span>
          {look.label}
        </button>
      ))}
    </div>
  );
};

/** Tells visitors which look they drew and offers the others. Leaves once the page is scrolled. */
const LookDraw = () => {
  const current = useLook();
  const introDone = useIntroStore((s) => s.done);
  const sidebar = useSidebarStore((s) => s.sidebar);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.35);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const drawn = looks.find((look) => look.id === current);
  if (!drawn) return null;

  const shown = introDone && !scrolled && !sidebar;

  return (
    <div
      className={`meta fixed bottom-20 left-1/2 z-[140] flex w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 flex-wrap items-center justify-center gap-0.5 rounded-[22px] border border-line bg-bg/85 p-1 backdrop-blur-md transition-[opacity,visibility] duration-500 md:bottom-5 ${
        shown ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      {open && <LookOptions className="justify-center" />}
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex h-9 items-center gap-2 rounded-full px-3 whitespace-nowrap"
      >
        <span lang="ja" className="text-[0.8125rem] leading-none tracking-normal text-accent">
          {drawn.mark}
        </span>
        {open ? 'Close' : `You drew ${drawn.label}`}
        {!open && <span className="text-muted">See the others</span>}
      </button>
    </div>
  );
};

export default LookDraw;
