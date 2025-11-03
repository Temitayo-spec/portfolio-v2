'use client';
import Image from 'next/image';
import my_photo from '@/public/images/my_photo.jpeg';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import RevealCover, { imageVariants } from '../../shared/RevealCover';

const HeroSection = () => {
  return (
    <div className="w-full pt-10 mt-auto bg-main-bg relative z-1">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden md:top-[200px]">
          <RevealCover />
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative w-[200px] h-[50vh] md:w-[400px] md:h-[60vh]"
          >
            <Image src={my_photo} alt="image" fill className="object-cover" />
          </motion.div>
        </div>

        <Marquee>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="mr-2">
              <h2 className="text-[5rem] max-md:text-[2rem] tracking-[-0.045rem] md:tracking-[-0.0675rem] text-white font-bebas-neue font-normal uppercase mt-8 flex items-center gap-2">
                Frontend Itachi <span>-</span>
              </h2>
            </div>
          ))}
        </Marquee>

        <Marquee speed={50} direction="right">
          {Array.from({ length: 4 }).map((_, i) => (
            <h1
              key={i}
              className="text-white font-bebas-neue leading-none uppercase tracking-[-0.045rem] text-[27rem] max-md:text-[8rem] flex items-center gap-20 max-md:gap-8 md:mt-8 overflow-hidden"
            >
              Temitayo{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="7"
                height="8"
                viewBox="0 0 7 8"
                fill="none"
                className="w-16 h-16 max-md:w-4 max-md:h-4"
              >
                <circle cx="3.5" cy="4" r="3.5" fill="#D9D9D9" />
              </svg>
            </h1>
          ))}
        </Marquee>

        <h3 className="text-white font-bebas-neue ml-auto relative text-[2rem] max-md:text-base mr-12 max-md:mr-8 md:mt-2 after:absolute after:content-[''] after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:z-3">
          Scroll down
        </h3>
      </div>
    </div>
  );
};

export default HeroSection;
