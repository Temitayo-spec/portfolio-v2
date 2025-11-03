import { WorksResult } from '@/sanity.types';
import Link from 'next/link';
import { FC } from 'react';
import WorksRow from '../works/WorksRow';

const WorksSection: FC<{ projects: WorksResult }> = ({ projects }) => {
  return (
    <section className="relative z-1 bg-main-bg flex flex-col justify-center w-full pt-16 md:pt-30 md:h-full">
      <div className="wrapper flex flex-col md:mb-8">
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
          projects
        </p>

        <div>
          {projects.map((project, i) => (
            <WorksRow work={project} key={i} />
          ))}
        </div>

        <Link
          href="/works"
          className="flex items-center ml-auto gap-2 md:gap-4 mt-8 text-white uppercase font-bebas-neue"
        >
          See all projects
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
    </section>
  );
};

export default WorksSection;
