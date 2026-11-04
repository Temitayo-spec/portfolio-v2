import type { CSSProperties, ReactNode } from 'react';
import Image from 'next/image';
import { site } from '@/src/constants';
import CrowWake from './CrowWake';

const alt = `Illustrated portrait of ${site.shortName}`;

/** Roughens hanko edges, as if stamped on paper. */
export const InkFilters = () => (
  <svg aria-hidden width="0" height="0" className="absolute">
    <filter id="ink-rough">
      <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="3" seed="4" />
      <feDisplacementMap in="SourceGraphic" scale="3" />
    </filter>
  </svg>
);

/** The carved 極 seal, taken from the kanji on the portrait's blindfold. */
export const Hanko = ({ className = '' }: { className?: string }) => (
  <span aria-hidden lang="ja" className={`hanko ${className}`}>
    極
  </span>
);

/** Vertical kanji set beside a page title. */
export const PageKanji = ({ children }: { children: ReactNode }) => (
  <span aria-hidden lang="ja" className="look-only tate jp page-kanji text-accent">
    {children}
  </span>
);

const flock = [
  { left: 4, top: 9, size: 7, dx: -24, dy: -30, beat: 0, tone: '#5a0c18' },
  { left: 15, top: 27, size: 3.6, dx: -18, dy: -22, beat: -0.2, tone: '#5a0c18' },
  { left: 45, top: 6, size: 5.5, dx: 8, dy: -34, beat: -0.45, tone: undefined },
  { left: 40, top: 22, size: 3, dx: 12, dy: -30, beat: -0.1, tone: undefined },
  { left: 54, top: 17, size: 4.4, dx: 18, dy: -30, beat: -0.33, tone: '#5a0c18' },
  { left: 66, top: 7, size: 6, dx: 26, dy: -26, beat: -0.5, tone: '#5a0c18' },
  { left: 80, top: 12, size: 3.2, dx: 30, dy: -26, beat: -0.27, tone: '#5a0c18' },
];

/** Crows over the moon. Hero.tsx scatters them as the page scrolls. */
export const Crows = () => (
  <div aria-hidden className="only-tsuki absolute inset-0">
    <CrowWake />
    {flock.map((crow) => (
      <div
        key={crow.left}
        data-crow
        data-dx={crow.dx}
        data-dy={crow.dy}
        className="crow"
        style={{ left: `${crow.left}%`, top: `${crow.top}%`, width: `${crow.size}vw` }}
      >
        <span style={{ '--beat': `${crow.beat}s`, '--crow': crow.tone } as CSSProperties} />
      </div>
    ))}
  </div>
);

/** A strip of the blindfold carrying the name, for hero and section breaks. */
export const Bandage = ({ className = '', loose = false }: { className?: string; loose?: boolean }) => (
  <div aria-hidden lang="ja" data-bandage={loose ? '' : undefined} className={`bandage ${className}`}>
    {Array.from({ length: 8 }, (_, i) => (
      <span key={i} className="jp flex shrink-0 items-center gap-[1em] pr-[1em] leading-none">
        <span className="text-[#c4122b]">極</span>
        テミタヨ・オラワンレ
      </span>
    ))}
  </div>
);

/** What sits behind the figure in each look. */
export const Backdrop = ({ sizes }: { sizes: string }) => (
  <>
    <Image src="/looks/enso.webp" alt="" fill sizes={sizes} className="only-sumi object-contain" />
  </>
);

/**
 * The cut-out portrait, one treatment per look. These stay lazy on purpose:
 * browsers skip lazy images that are hidden, so visitors only fetch their own.
 */
export const Figure = ({ sizes, lead = false }: { sizes: string; lead?: boolean }) => {
  const shared = { fill: true, sizes, fetchPriority: lead ? 'high' : 'auto' } as const;

  return (
    <>
      <Image {...shared} alt={alt} src="/looks/portrait-ink.webp" className="only-sumi object-contain object-bottom" />
      <Image {...shared} alt={alt} src="/looks/portrait-night.webp" className="only-tsuki object-contain object-bottom" />
      <Image {...shared} alt={alt} src="/looks/portrait-cut.webp" className="only-kiwami object-contain object-bottom" />
    </>
  );
};

/** The whole staged portrait inside a framed panel: mobile hero and the about page. */
export const LookPanel = ({ sizes }: { sizes: string }) => (
  <div className="look-only look-panel absolute inset-0 overflow-hidden bg-bg-soft">
    <div className="only-tsuki moon top-[8%] left-1/2 w-[78%] -translate-x-1/2" />
    <div className="only-kiwami speed-lines" />
    <div className="absolute inset-x-[4%] top-[2%] aspect-square">
      <Backdrop sizes={sizes} />
    </div>
    <div className="absolute inset-x-0 bottom-0 aspect-square">
      <Figure sizes={sizes} />
    </div>
  </div>
);
