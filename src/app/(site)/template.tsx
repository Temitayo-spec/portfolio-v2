'use client';
import { motion, MotionConfig } from 'framer-motion';
import { easeInOutQuart } from '@/src/constants';
import Wipes from '@/src/components/shared/looks/Wipes';

/** Re-mounts on every navigation: a crimson panel then a dark one lift off the new page. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    // With "reduce motion" on, the panels skip straight to scaleY: 0.
    <MotionConfig reducedMotion="user">
      <motion.div
        aria-hidden
        className="only-base pointer-events-none fixed inset-0 z-[150] origin-top bg-accent"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.9, ease: easeInOutQuart, delay: 0.1 }}
      />
      <motion.div
        aria-hidden
        className="only-base pointer-events-none fixed inset-0 z-[151] origin-top bg-bg"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.9, ease: easeInOutQuart }}
      />
      <Wipes />
      {children}
    </MotionConfig>
  );
}
