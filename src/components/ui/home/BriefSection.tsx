'use client';
import Link from 'next/link';
import Words from '../../shared/TextOpacityEffect';

const BriefAboutSection = () => {

  return (
    <div className="relative z-1 bg-main-bg flex flex-col justify-center w-full md:pt-20 md:h-full">
      <div className="wrapper flex flex-col py-20 max-md:py-0 max-md:mb-8">
        <p className="text-white text-base leading-[120%] tracking-[-0.02rem] mb-8 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="7"
            height="8"
            viewBox="0 0 7 8"
            fill="none"
          >
            <circle cx="3.5" cy="4" r="3.5" fill="#D9D9D9" />
          </svg>
          info
        </p>

        <h3 className="text-[5rem] max-md:text-[2rem]">
          <Words
            value="Combining aesthetics and usefulness, I create solid user interfaces in an artistic way. I love to spend time improving the aesthetics of digital products without forgetting about usability."
            className="font-bebas-neue leading-[100%] tracking-[-0.0245rem] md:tracking-[-0.145rem] uppercase text-[5rem] max-md:text-[2rem]"
          />
        </h3>

        <Link
          href="/about"
          className="flex items-center ml-auto gap-2 md:gap-4 mt-8 text-white font-bebas-neue"
        >
          explore
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M12.0249 4.94168L17.0832 10L12.0249 15.0583"
              stroke="white"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.9165 10L16.9415 10"
              stroke="white"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BriefAboutSection;
