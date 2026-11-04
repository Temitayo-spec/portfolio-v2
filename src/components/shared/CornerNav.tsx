'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSidebarStore } from '@/src/store/sidebar.store';
import { useIntroStore } from '@/src/store/intro.store';
import Roll from './Roll';
import { Hanko } from './looks/Art';

/**
 * Monogram and menu buttons. They rest in the bottom corners on the first
 * screen and glide to the top corners once the page is scrolled.
 */
const CornerNav = () => {
  const { sidebar, setSidebar, toggleSidebar } = useSidebarStore();
  const introDone = useIntroStore((s) => s.done);
  const [docked, setDocked] = useState(false);

  useEffect(() => {
    const onScroll = () => setDocked(window.scrollY > window.innerHeight * 0.35);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const up = docked || sidebar;
  const position = {
    transform: up ? 'translateY(0)' : 'translateY(calc(100svh - 100% - 2.5rem))',
    opacity: introDone ? 1 : 0,
    transition:
      'transform 1.1s var(--ease-in-out-quart), opacity .8s ease .6s',
  };

  return (
    <>
      <Link
        href="/"
        onClick={() => setSidebar(false)}
        aria-label="Home"
        className="group fixed top-5 left-5 z-[100] flex size-11 items-center justify-center rounded-[10px] border border-line bg-bg/70 backdrop-blur-md transition-colors duration-300 hover:border-accent md:left-8"
        style={position}
      >
        <span className="only-base relative font-sans text-xl leading-none font-medium tracking-tight">
          T<span className="serif-swap text-accent">o</span>
        </span>
        <Hanko className="look-only size-8 text-lg" />
      </Link>

      <button
        type="button"
        onClick={toggleSidebar}
        aria-expanded={sidebar}
        aria-label={sidebar ? 'Close menu' : 'Open menu'}
        className="group fixed top-5 right-5 z-[100] flex h-11 items-center gap-2.5 rounded-[10px] border border-line bg-bg/70 px-4 backdrop-blur-md transition-colors duration-300 hover:border-accent md:right-8"
        style={position}
      >
        <span className="relative block size-2.5">
          <span
            className="absolute inset-0 m-auto block size-2 rounded-full bg-accent transition-transform duration-500"
            style={{ transform: sidebar ? 'scale(0)' : 'scale(1)' }}
          />
          <span
            className="absolute inset-0 m-auto block h-px w-3 bg-accent transition-transform duration-500"
            style={{ transform: sidebar ? 'rotate(45deg)' : 'rotate(0) scaleX(0)' }}
          />
          <span
            className="absolute inset-0 m-auto block h-px w-3 bg-accent transition-transform duration-500"
            style={{ transform: sidebar ? 'rotate(-45deg)' : 'rotate(0) scaleX(0)' }}
          />
        </span>
        <span className="meta">
          <Roll>{sidebar ? 'Close' : 'Menu'}</Roll>
        </span>
      </button>
    </>
  );
};

export default CornerNav;
