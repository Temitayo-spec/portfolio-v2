'use client';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { gsap } from '@/src/lib/gsap';
import { links } from '@/src/constants';
import { Bandage, Hanko } from './Art';
import { moon, strips, stripStyle } from './Wipes';

const routes = new Set<string>(links.map((link) => link.url));

/** How the cover closes over the page in each look. The new page's Wipes open from the same frame. */
const close = (scope: HTMLElement, look?: string) => {
  const q = gsap.utils.selector(scope);
  const tl = gsap.timeline({ defaults: { ease: 'power3.inOut', duration: 0.42 } });
  const shut = { clipPath: `circle(80% ${moon})` };
  const open = { clipPath: `circle(0% ${moon})` };

  if (look === 'sumi') {
    tl.fromTo(q('[data-blot]'), { xPercent: -50, yPercent: -50, scale: 0 }, { scale: 1, duration: 0.45, ease: 'power3.in' })
      .fromTo(q('[data-seal]'), { opacity: 0, scale: 1.9 }, { opacity: 1, scale: 1.25, duration: 0.2, ease: 'power2.in' }, 0.22);
  } else if (look === 'tsuki') {
    tl.fromTo(q('[data-moon-cover]'), open, shut).fromTo(q('[data-night-cover]'), open, shut, 0.08);
  } else if (look === 'kiwami') {
    q('[data-strip]').forEach((strip, i) => {
      // Each strip keeps travelling the same way as it leaves, so the bandage winds through the screen.
      tl.fromTo(strip, { xPercent: i % 2 ? -112 : 112 }, { xPercent: 0 }, i * 0.03);
    });
  } else {
    tl.fromTo(q('[data-panel]'), { scaleY: 0 }, { scaleY: 1, stagger: 0.1 });
  }

  return tl;
};

/**
 * The first half of a page change. Clicks on internal links are held while the
 * cover closes over the old page, so it never cuts away. Back and forward can't
 * be held, so they open the new page without it.
 */
const Cover = () => {
  const root = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const closing = useRef<gsap.core.Timeline | null>(null);
  const stalled = useRef<ReturnType<typeof setTimeout>>(undefined);

  // The new page is in and sits under an identical full cover, so this one can simply go.
  useLayoutEffect(() => {
    clearTimeout(stalled.current);
    closing.current?.kill();
    closing.current = null;
    gsap.set(root.current, { visibility: 'hidden' });
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = root.current;
      if (!el || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const link = (e.target as Element).closest?.('a[href]');
      if (!(link instanceof HTMLAnchorElement) || (link.target && link.target !== '_self')) return;

      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname === location.pathname || !routes.has(url.pathname)) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // Held here, in capture, so next/link sees it as handled and leaves the navigation to us.
      e.preventDefault();
      if (closing.current) return;

      const to = url.pathname + url.search;
      router.prefetch(to);
      gsap.set(el, { visibility: 'visible' });
      closing.current = close(el, document.documentElement.dataset.look).eventCallback('onComplete', () => {
        router.push(to);
        // A failed or very slow route shouldn't leave the screen covered.
        stalled.current = setTimeout(() => location.assign(to), 6000);
      });
    };

    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      clearTimeout(stalled.current);
    };
  }, [router]);

  return (
    <div ref={root} aria-hidden className="fixed inset-0 z-[153] overflow-hidden" style={{ visibility: 'hidden' }}>
      <div data-panel className="only-base absolute inset-0 origin-bottom bg-accent" />
      <div data-panel className="only-base absolute inset-0 origin-bottom bg-bg" />

      <div data-blot className="only-sumi ink-blot absolute top-1/2 left-1/2" />
      <div data-seal className="only-sumi absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Hanko className="size-16 text-[2.25rem]" />
      </div>

      <div data-moon-cover className="only-tsuki absolute inset-0 bg-accent" />
      <div data-night-cover className="only-tsuki absolute inset-0 bg-bg" />

      {strips.map((i) => (
        <div key={i} data-strip className="only-kiwami absolute -left-[4vw] w-[108vw]" style={stripStyle(i)}>
          <Bandage className={`relative h-full text-[7vh] ${i % 2 ? 'pl-[11vw]' : ''}`} />
        </div>
      ))}
    </div>
  );
};

export default Cover;
