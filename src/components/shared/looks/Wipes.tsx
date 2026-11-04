'use client';
import { motion } from 'framer-motion';
import { easeInOutQuart } from '@/src/constants';
import { Bandage, Hanko } from './Art';

const strips = [0, 1, 2, 3, 4];
// 80% of the screen's diagonal measure just clears the farthest corner, so the moon moves from the first frame.
const moon = 'at 56% 46%';

/** Page transitions: ink drawing back to a seal, the moon closing, or the bandage unwinding. */
const Wipes = () => (
  <>
    {/* Scaled rather than clipped, so the blot's rough edge stays cheap to animate on phones. */}
    <motion.div
      aria-hidden
      className="only-sumi ink-blot pointer-events-none fixed top-1/2 left-1/2 z-[151]"
      style={{ x: '-50%', y: '-50%' }}
      initial={{ scale: 1 }}
      animate={{ scale: 0 }}
      transition={{ duration: 0.9, ease: [0.6, 0, 0.2, 1], delay: 0.05 }}
    />
    <motion.div
      aria-hidden
      className="only-sumi pointer-events-none fixed top-1/2 left-1/2 z-[152] -translate-x-1/2 -translate-y-1/2"
      initial={{ opacity: 1, scale: 1.25 }}
      animate={{ opacity: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut', delay: 0.45 }}
    >
      <Hanko className="size-16 text-[2.25rem]" />
    </motion.div>

    <motion.div
      aria-hidden
      className="only-tsuki pointer-events-none fixed inset-0 z-[150] bg-accent"
      initial={{ clipPath: `circle(80% ${moon})` }}
      animate={{ clipPath: `circle(0% ${moon})` }}
      transition={{ duration: 0.95, ease: easeInOutQuart, delay: 0.16 }}
    />
    <motion.div
      aria-hidden
      className="only-tsuki pointer-events-none fixed inset-0 z-[151] bg-bg"
      initial={{ clipPath: `circle(80% ${moon})` }}
      animate={{ clipPath: `circle(0% ${moon})` }}
      transition={{ duration: 0.85, ease: easeInOutQuart }}
    />

    {strips.map((i) => (
      <motion.div
        key={i}
        aria-hidden
        className="only-kiwami pointer-events-none fixed -left-[4vw] z-[151] w-[108vw]"
        style={{ top: `${i * 20 - 1}vh`, height: '22.5vh', rotate: `${i % 2 ? 0.7 : -0.7}deg` }}
        initial={{ x: '0%' }}
        animate={{ x: i % 2 ? '112%' : '-112%' }}
        transition={{ duration: 0.8, ease: easeInOutQuart, delay: i * 0.05 }}
      >
        <Bandage className={`relative h-full text-[7vh] ${i % 2 ? 'pl-[11vw]' : ''}`} />
      </motion.div>
    ))}
  </>
);

export default Wipes;
