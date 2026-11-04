'use client';
import { motion } from 'framer-motion';
import { Bandage, Hanko } from './Art';

// Starts moving at once, since the page has already waited for the cover to close.
const snap = [0.6, 0, 0.2, 1] as const;

export const strips = [0, 1, 2, 3, 4];
// 80% of the screen's diagonal measure just clears the farthest corner, so the moon moves from the first frame.
export const moon = 'at 56% 46%';

export const stripStyle = (i: number) => ({
  top: `${i * 20 - 1}vh`,
  height: '22.5vh',
  rotate: `${i % 2 ? 0.7 : -0.7}deg`,
});

// Finished wipes leave the page: iOS Safari tints its bars from fixed elements, even ones parked off-screen.
const gone = { visibility: 'hidden' } as const;

/** Each page opens from a full cover: ink drawing back to a seal, the moon closing, or the bandage unwinding. */
const Wipes = () => (
  <>
    {/* Scaled rather than clipped, so the blot's rough edge stays cheap to animate on phones. */}
    <motion.div
      aria-hidden
      className="only-sumi ink-blot pointer-events-none fixed top-1/2 left-1/2 z-[151]"
      style={{ x: '-50%', y: '-50%' }}
      initial={{ scale: 1 }}
      animate={{ scale: 0, transitionEnd: gone }}
      transition={{ duration: 0.75, ease: snap }}
    />
    <motion.div
      aria-hidden
      className="only-sumi pointer-events-none fixed top-1/2 left-1/2 z-[152] -translate-x-1/2 -translate-y-1/2"
      initial={{ opacity: 1, scale: 1.25 }}
      animate={{ opacity: 0, scale: 1, transitionEnd: gone }}
      transition={{ duration: 0.25, ease: 'easeOut', delay: 0.3 }}
    >
      <Hanko className="size-16 text-[2.25rem]" />
    </motion.div>

    <motion.div
      aria-hidden
      className="only-tsuki pointer-events-none fixed inset-0 z-[150] bg-accent"
      initial={{ clipPath: `circle(80% ${moon})` }}
      animate={{ clipPath: `circle(0% ${moon})`, transitionEnd: gone }}
      transition={{ duration: 0.75, ease: snap, delay: 0.1 }}
    />
    <motion.div
      aria-hidden
      className="only-tsuki pointer-events-none fixed inset-0 z-[151] bg-bg"
      initial={{ clipPath: `circle(80% ${moon})` }}
      animate={{ clipPath: `circle(0% ${moon})`, transitionEnd: gone }}
      transition={{ duration: 0.65, ease: snap }}
    />

    {strips.map((i) => (
      <motion.div
        key={i}
        aria-hidden
        className="only-kiwami pointer-events-none fixed -left-[4vw] z-[151] w-[108vw]"
        style={stripStyle(i)}
        initial={{ x: '0%' }}
        animate={{ x: i % 2 ? '112%' : '-112%', transitionEnd: gone }}
        transition={{ duration: 0.65, ease: snap, delay: i * 0.04 }}
      >
        <Bandage className={`relative h-full text-[7vh] ${i % 2 ? 'pl-[11vw]' : ''}`} />
      </motion.div>
    ))}
  </>
);

export default Wipes;
