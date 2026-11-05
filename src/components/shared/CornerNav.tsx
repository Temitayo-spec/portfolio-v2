'use client';
import Link from 'next/link';
import { useSidebarStore } from '@/src/store/sidebar.store';
import { useIntroStore } from '@/src/store/intro.store';
import Roll from './Roll';
import { Hanko } from './looks/Art';

/** The seal goes home and the round button opens the menu. Both stay in the top corners. */
const CornerNav = () => {
  const { sidebar, setSidebar, toggleSidebar } = useSidebarStore();
  const introDone = useIntroStore((s) => s.done);
  const shown = { opacity: introDone ? 1 : 0 };

  return (
    <>
      <Link
        href="/"
        onClick={() => setSidebar(false)}
        aria-label="Home"
        className="fixed top-4 left-5 z-[100] flex size-11 items-center justify-center transition-[opacity,rotate] duration-500 hover:-rotate-6 md:top-5 md:left-8"
        style={shown}
      >
        <Hanko className="size-10 text-xl" />
      </Link>

      <button
        type="button"
        onClick={toggleSidebar}
        aria-expanded={sidebar}
        aria-label={sidebar ? 'Close menu' : 'Open menu'}
        className="group fixed top-3.5 right-5 z-[100] flex size-12 items-center justify-center rounded-full bg-accent transition-[opacity,scale] duration-500 hover:scale-105 md:top-4 md:right-8 md:size-14"
        style={shown}
      >
        <span className="meta">
          <Roll>{sidebar ? 'Close' : 'Menu'}</Roll>
        </span>
      </button>
    </>
  );
};

export default CornerNav;
