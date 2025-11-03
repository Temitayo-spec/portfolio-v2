'use client';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';
import AnimatedLink from './AnimatedLink';

const Footer = () => {
  return (
    <div
      className="relative h-screen sm:h-screen"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      <div className="fixed bottom-0 h-full sm:h-screen w-full">
        <footer className="bg-[#eeee] flex flex-col rounded-t-[40px] fixed w-full h-full top-0 left-0 justify-between">
          {/* Footer Top */}
          <div className="flex max-md:flex-col w-[90%] my-8 mx-auto">
            {/* Links Container */}
            <div className="flex-1 flex items-center justify-between w-[90%] max-w-[1200px] mx-auto">
              {/* Column 1 - Sitemap */}
              <div className="flex gap-8 md:gap-4">
                <div className="font-bebas-neue text-main-bg">01/</div>
                <div className="flex flex-col">
                  <h3 className="uppercase text-main-bg text-[1.25rem] md:text-[1.3rem] font-bebas-neue mb-8 max-md:mb-4">
                    Sitemap
                  </h3>
                  <Link
                    href="/"
                    className="text-main-bg text-xl max-md:text-[0.875rem] mb-4 max-md:mb-2"
                  >
                    Home
                  </Link>
                  <Link
                    href="/works"
                    className="text-main-bg text-xl max-md:text-[0.875rem] mb-4 max-md:mb-2"
                  >
                    Works
                  </Link>
                  <Link
                    href="/about"
                    className="text-main-bg text-xl max-md:text-[0.875rem] mb-4 max-md:mb-2"
                  >
                    About
                  </Link>
                </div>
              </div>

              {/* Column 2 - Social */}
              <div className="flex gap-8 max-md:gap-4">
                <div className="font-bebas-neue text-main-bg">02/</div>
                <div className="flex flex-col">
                  <h3 className="uppercase text-[1.25rem] md:text-[1.3rem] text-main-bg font-bebas-neue mb-8 max-md:mb-4">
                    Social
                  </h3>
                  <Link
                    href="https://github.com/Temitayo-spec"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-main-bg text-xl max-md:text-[0.875rem] mb-4 max-md:mb-2"
                  >
                    Github
                  </Link>
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://www.linkedin.com/in/temitayo-spec/"
                    className="text-main-bg text-xl max-md:text-[0.875rem] mb-4 max-md:mb-2"
                  >
                    Linkedin
                  </Link>
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://twitter.com/OlawanleTemita1"
                    className="text-main-bg text-xl max-md:text-[0.875rem] mb-4 max-md:mb-2"
                  >
                    Twitter
                  </Link>
                </div>
              </div>
            </div>

            {/* Connect Link */}
            {/* <div className="flex-1 flex justify-end max-md:justify-start h-[33px] max-md:h-3 md:mt-14 font-bebas-neue !text-main-bg text-2xl">
              <AnimatedLink
                title="Let's work together"
                isLink={true}
                href="/contact"
              />
            </div> */}
          </div>

          {/* Footer Bottom */}
          <div>
            {/* Briefing */}
            <div className="flex items-center justify-between w-[90%] mx-auto mb-4 text-main-bg">
              <p className="text-[0.875rem]">FRONTEND DEVELOPER</p>
              <p className="text-[0.875rem]">PORTFOLIO 2024</p>
            </div>

            {/* Big Name Marquee */}
            <div className="overflow-y-hidden pt-16">
              <Marquee>
                {Array.from({ length: 10 }).map((_, i) => (
                  <h1
                    key={i}
                    className="max-w-[1200px] w-[90%] md:w-[95%] mx-auto text-main-bg text-[25rem] max-md:text-[20rem] font-bebas-neue font-normal uppercase tracking-[-0.075rem] flex items-center gap-8 leading-[0.8] overflow-hidden"
                  >
                    Temitayo{' '}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="7"
                      height="8"
                      viewBox="0 0 7 8"
                      fill="none"
                      className="w-40 h-40 max-md:w-12 max-md:h-12"
                    >
                      <circle cx="3.5" cy="4" r="3.5" fill="#212121" />
                    </svg>
                  </h1>
                ))}
              </Marquee>
            </div>
          </div>

          <style jsx>{`
            /* AnimatedLink custom styling */
            .flex-1 a span {
              color: var(--background-color);
              font-size: 2rem;
              font-family: var(--font-bebas-neue);
            }

            .flex-1 a::after {
              position: absolute;
              content: '';
              bottom: 0;
              left: 0;
              height: 3px;
              width: 100%;
              background-color: var(--background-color);
            }

            @media (max-width: 768px) {
              .flex-1 a span {
                font-size: 1.5rem;
              }

              .flex-1 a::after {
                height: 2px;
              }
            }
          `}</style>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
