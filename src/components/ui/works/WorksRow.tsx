'use client';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { WorksResult } from '@/sanity.types';
import Words from '../../shared/TextOpacityEffect';

const lineVariants: Variants = {
  hidden: {
    scaleX: 0,
  },
  visible: {
    scaleX: 1,
    transformOrigin: 'left',
    transition: {
      duration: 1.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const WorksRow = ({ work }: { work: WorksResult[number] }) => {
  const {
    clients_collaborators,
    roles,
    brief_discussion,
    project_title,
    project__link,
  } = work;

  return (
    <div>
      <div className="flex flex-col">
        <h1 className="text-white font-bebas-neue text-[8rem] max-md:text-[4rem] font-normal leading-[100%] tracking-[-0.16rem] uppercase">
          <Words value={project_title as string} />
        </h1>

        <div className="flex items-center md:flex-col md:items-end md:gap-2">
          {/* Item One */}
          <div className="flex items-center justify-between flex-3 gap-2 max-md:flex-col md:justify-between md:gap-4 max-md:items-start">
            <p className="max-w-104 text-white font-spline-sans text-base max-md:text-[0.875rem] font-normal leading-[120%] tracking-[-0.02rem] md:tracking-[-0.01rem]">
              {brief_discussion}
            </p>

            <div className="flex flex-col gap-2">
              <p className="text-white font-spline-sans text-base max-md:text-[0.875rem] font-normal underline">
                Client & Collaborators
              </p>
              {clients_collaborators?.map((client, i) => (
                <p
                  key={i}
                  className="text-white font-spline-sans text-base max-md:text-[0.875rem] font-normal"
                >
                  {client.title}
                </p>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col items-end max-md:not-odd:mt-auto gap-2">
            <p className="text-white font-spline-sans text-base max-md:text-[0.875rem] font-normal underline">
              Role
            </p>
            {roles?.map((role, i) => (
              <p
                key={i}
                className="text-white font-spline-sans text-base max-md:text-[0.875rem] max-md:text-right"
              >
                {role.role_list}
              </p>
            ))}
          </div>
        </div>

        <Link
          href={project__link ?? ''}
          rel="noopener noreferrer"
          target="_blank"
          className="text-white font-spline-sans text-base font-normal underline uppercase mt-6"
        >
          Visit Site
        </Link>
      </div>

      <motion.div
        variants={lineVariants}
        initial="hidden"
        whileInView="visible"
        className="bg-[#D9D9D9] h-px w-full my-4"
      />
    </div>
  );
};

export default WorksRow;
