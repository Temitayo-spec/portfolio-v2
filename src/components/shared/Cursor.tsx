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
 * Trailing dot cursor. Grows into a labelled disc over elements with
 * `data-cursor="Label"`, and swells slightly over plain links and buttons.
 * Fine pointers only.
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
    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3' });

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

  const size = mode === 'label' ? 92 : mode === 'link' ? 36 : 10;

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[300] flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: mode === 'label' ? 'var(--accent)' : 'var(--ink)',
        mixBlendMode: mode === 'label' ? 'normal' : 'difference',
        transition:
          'width .5s var(--ease-out-expo), height .5s var(--ease-out-expo), background-color .3s',
      }}
    >
      <span
        className="meta whitespace-nowrap text-ink transition-opacity duration-300"
        style={{ opacity: mode === 'label' ? 1 : 0 }}
      >
        {label}
      </span>
    </div>
  );
};

export default Cursor;
