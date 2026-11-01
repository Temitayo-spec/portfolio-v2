'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ReactLenis, useLenis, type LenisRef } from 'lenis/react';
import { gsap, ScrollTrigger } from '@/src/lib/gsap';

/** Lenis smooth scroll driven by GSAP's ticker so ScrollTrigger stays in sync. */
const SmoothScroll = () => {
  const lenisRef = useRef<LenisRef>(null);
  const pathname = usePathname();

  useLenis(ScrollTrigger.update);

  useEffect(() => {
    // Lenis is created after the first render, so look it up on every frame.
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, []);

  useEffect(() => {
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true, force: true });
    // New page content changes the document height, so measure again.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.1 }} />
  );
};

export default SmoothScroll;
