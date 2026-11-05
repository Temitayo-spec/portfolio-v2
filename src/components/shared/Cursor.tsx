'use client';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { gsap } from '@/src/lib/gsap';

const FINE_POINTER = '(pointer: fine)';

const subscribe = (onChange: () => void) => {
  const query = window.matchMedia(FINE_POINTER);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};

/**
 * Dot cursor. Grows into a labelled disc over elements with `data-cursor="Label"`,
 * and opens into a ring over plain links and buttons. Fine pointers only.
 * Drawn in two tones from the look's own colours, so one of them always stands out
 * from what's behind it, in every look and over the art.
 */
const Cursor = () => {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [mode, setMode] = useState<'idle' | 'link' | 'label'>('idle');
  const enabled = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(FINE_POINTER).matches,
    () => false
  );

  useEffect(() => {
    const el = dot.current;
    if (!enabled || !el) return;

    document.documentElement.classList.add('has-cursor');
    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });
    // Stays close: the real arrow is hidden, so this is where clicks seem to land.
    const xTo = gsap.quickTo(el, 'x', { duration: 0.12, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.12, ease: 'power3' });

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      gsap.to(el, { opacity: 1, duration: 0.3, overwrite: 'auto' });

      const target = (e.target as HTMLElement).closest<HTMLElement>(
        '[data-cursor], a, button, input, textarea'
      );
      if (target?.dataset.cursor) {
        setMode('label');
        setLabel(target.dataset.cursor);
      } else if (target?.matches('a, button')) {
        setMode('link');
      } else {
        setMode('idle');
      }
    };
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.3 });

    window.addEventListener('pointermove', move);
    document.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;

  const size = mode === 'label' ? 92 : mode === 'link' ? 44 : 14;

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[300] flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: mode === 'label' ? 'var(--accent)' : mode === 'link' ? 'transparent' : 'var(--ink)',
        boxShadow:
          mode === 'link'
            ? '0 0 0 1px var(--bg), inset 0 0 0 2px var(--ink), inset 0 0 0 3px var(--bg)'
            : '0 0 0 2px var(--bg)',
        transition:
          'width .5s var(--ease-out-expo), height .5s var(--ease-out-expo), background-color .3s, box-shadow .3s',
      }}
    >
      <span
        className="meta whitespace-nowrap transition-opacity duration-300"
        style={{ color: 'var(--on-accent, var(--ink))', opacity: mode === 'label' ? 1 : 0 }}
      >
        {label}
      </span>
    </div>
  );
};

export default Cursor;
