'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ScrollTrigger } from '@/src/lib/gsap';
import type { Artist, Music, Track } from '@/src/lib/spotify';
import SplitReveal from './SplitReveal';
import Mixed from './Mixed';

// Spotify's design rules shape all of this: its logo beside anything of theirs, a link back,
// cover art untouched (not resized by us, cropped, animated or covered) and titles as written.

const SpotifyLogo = () => <span role="img" aria-label="Spotify" className="spotify-logo shrink-0" />;

const Cover = ({ src, size }: { src: string | null; size: string }) =>
  src && <Image unoptimized src={src} alt="" width={96} height={96} className={`spotify-art shrink-0 rounded-[4px] object-contain lg:rounded-lg ${size}`} />;

const SpotifyLink = ({ href }: { href: string }) => (
  <a href={href} target="_blank" rel="noreferrer noopener" className="meta wipe-line w-fit">
    Listen on Spotify ↗
  </a>
);

/** The track playing now, or the last one played. Shows nothing when Spotify has nothing to say. */
export const NowPlaying = () => {
  const [track, setTrack] = useState<Track | null>(null);
  const shown = Boolean(track);

  useEffect(() => {
    const load = async () => {
      if (document.hidden) return;
      try {
        const res = await fetch('/api/now-playing', { cache: 'no-store' });
        const latest: Track | null = res.ok ? await res.json() : null;
        // A blip at Spotify shouldn't make the strip vanish and the page jump.
        if (latest) setTrack(latest);
      } catch {}
    };

    load();
    const timer = setInterval(load, 30000);
    document.addEventListener('visibilitychange', load);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', load);
    };
  }, []);

  // This arrives after the page is measured, and it moves what's below it.
  useEffect(() => {
    if (shown) ScrollTrigger.refresh();
  }, [shown]);

  if (!track) return null;

  // On wide screens the pinned figure runs behind this column, so the strip brings its own ground.
  return (
    <div className="border-b border-line py-4 md:mt-4 md:rounded-[10px] md:border md:bg-bg/70 md:p-4 md:backdrop-blur-md">
      <a
        href={track.url}
        target="_blank"
        rel="noreferrer noopener"
        data-cursor="Listen ↗"
        className="group flex items-center gap-4"
      >
        <Cover src={track.art} size="size-14" />
        <span className="min-w-0">
          <span className="meta flex items-center gap-2 text-muted">
            {track.playing && <span aria-hidden className="size-1.5 rounded-full bg-accent motion-safe:animate-pulse" />}
            {track.playing ? 'Listening to' : 'Last played'}
          </span>
          <span className="mt-1.5 block text-[15px] leading-tight tracking-tight break-words transition-colors duration-300 group-hover:text-accent">
            {track.title}
          </span>
          <span className="mt-0.5 block text-sm leading-tight break-words text-muted">{track.artists}</span>
        </span>
      </a>
      <div className="mt-4 flex items-center justify-between gap-4">
        <SpotifyLink href={track.url} />
        <SpotifyLogo />
      </div>
    </div>
  );
};

const Row = ({ index, item }: { index: number; item: Track | Artist }) => {
  const [title, detail] = 'title' in item ? [item.title, item.artists] : [item.name, null];

  return (
    <li className="border-t border-line">
      <a
        href={item.url}
        target="_blank"
        rel="noreferrer noopener"
        data-cursor="Listen ↗"
        className="group flex items-center gap-4 py-3"
      >
        <span className="meta w-5 shrink-0 text-accent">0{index + 1}</span>
        <Cover src={item.art} size="size-12" />
        <span className="min-w-0">
          <span className="block text-[15px] leading-tight tracking-tight break-words transition-colors duration-300 group-hover:text-accent">
            {title}
          </span>
          {detail && <span className="mt-0.5 block text-sm leading-tight break-words text-muted">{detail}</span>}
        </span>
      </a>
    </li>
  );
};

/** Top tracks and artists of the last four weeks. No reveal here: the art has to stay still. */
export const OnRepeat = ({ tracks, artists }: Music) => (
  <section className="wrapper mt-[14vh]">
    <div className="mb-8 flex items-end justify-between">
      <SplitReveal as="h2" by="chars" className="display text-[clamp(3rem,9vw,9rem)]">
        <Mixed text="*O*n repeat" />
      </SplitReveal>
      <p className="meta hidden text-muted md:block">The last four weeks</p>
    </div>
    <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
      <div>
        <p className="meta mb-3 text-muted">Tracks</p>
        <ol>
          {tracks.map((track, i) => (
            <Row key={track.url} index={i} item={track} />
          ))}
        </ol>
      </div>
      <div>
        <p className="meta mb-3 text-muted">Artists</p>
        <ol>
          {artists.map((artist, i) => (
            <Row key={artist.url} index={i} item={artist} />
          ))}
        </ol>
      </div>
    </div>
    <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-5">
      <SpotifyLink href={tracks[0].url} />
      <SpotifyLogo />
    </div>
  </section>
);
