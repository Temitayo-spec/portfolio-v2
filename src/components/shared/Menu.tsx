'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { easeInOutQuart, easeOutExpo, links, site, socialLinks } from '@/src/constants';
import { useSidebarStore } from '@/src/store/sidebar.store';
import LocalTime from './LocalTime';

/**
 * Full-screen menu. The panel wipes up from the bottom, then each link rises
 * out of its mask. Hovering a link rolls it into red.
 */
const Menu = () => {
  const pathname = usePathname();
  const { sidebar, setSidebar } = useSidebarStore();
  const lenis = useLenis();

  useEffect(() => {
    if (sidebar) lenis?.stop();
    else lenis?.start();
  }, [sidebar, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSidebar(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setSidebar]);

  return (
    <AnimatePresence>
      {sidebar && (
        <motion.nav
          key="menu"
          aria-label="Main"
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-bg px-5 pt-24 pb-6 md:px-8 md:pb-8"
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{
            clipPath: 'inset(0% 0% 100% 0%)',
            transition: { duration: 0.9, ease: easeInOutQuart, delay: 0.25 },
          }}
          transition={{ duration: 1, ease: easeInOutQuart }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[60vh] opacity-60"
            style={{
              background:
                'radial-gradient(60% 80% at 50% 110%, color-mix(in srgb, var(--accent) 55%, transparent), transparent 70%)',
            }}
          />

          <ul className="relative my-auto flex flex-col items-center">
            {links.map((link, i) => {
              const active = pathname === link.url;
              return (
                <li key={link.url} className="[clip-path:inset(-14%_-20%)]">
                  <motion.div
                    initial={{ y: '130%' }}
                    animate={{ y: '0%', transition: { duration: 1.1, ease: easeOutExpo, delay: 0.45 + i * 0.07 } }}
                    exit={{ y: '-130%', transition: { duration: 0.5, ease: easeInOutQuart, delay: i * 0.03 } }}
                  >
                    <Link
                      href={link.url}
                      onClick={() => setSidebar(false)}
                      aria-current={active ? 'page' : undefined}
                      className="group relative flex items-start gap-3 py-1"
                    >
                      <span className="only-base meta mt-[1.2em] text-muted transition-colors group-hover:text-accent">
                        0{i + 1}
                      </span>
                      <span aria-hidden lang="ja" className="look-only tate jp absolute top-1/2 right-full mr-2 -translate-y-1/2 text-[0.625rem] leading-none text-accent md:mr-3 md:text-lg">
                        {link.jp}
                      </span>
                      <span className="roll display text-[clamp(3.25rem,10vw,9.5rem)]">
                        <span className={active ? 'text-accent' : ''}>{link.title}</span>
                        <span aria-hidden className="text-accent">
                          {link.title}
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                </li>
              );
            })}
          </ul>

          <motion.div
            className="relative grid grid-cols-2 gap-y-4 border-t border-line pt-5 md:grid-cols-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.8, ease: easeOutExpo } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <div className="meta col-span-2 flex flex-col gap-1 md:col-span-1">
              <span className="text-muted">Email</span>
              <a href={`mailto:${site.email}`} className="wipe-line w-fit">
                {site.email}
              </a>
            </div>
            <div className="meta flex flex-col gap-1">
              <span className="text-muted">Socials</span>
              <div className="flex flex-wrap gap-x-4">
                {socialLinks.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer noopener" className="wipe-line">
                    {s.title}
                  </a>
                ))}
              </div>
            </div>
            <div className="meta flex flex-col gap-1">
              <span className="text-muted">Based in</span>
              <span>{site.location}</span>
              <a href={site.resume} target="_blank" rel="noopener" className="wipe-line mt-2 w-fit">
                CV (PDF) ↓
              </a>
            </div>
            <div className="meta flex flex-col gap-1 md:items-end">
              <span className="text-muted">Local time</span>
              <LocalTime />
            </div>
          </motion.div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Menu;
