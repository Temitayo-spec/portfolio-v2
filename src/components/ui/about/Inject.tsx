'use client';
import { motion, Variants } from 'framer-motion';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import { MaskedTextReveal } from '../../shared/MaskedTextReveal';

const headingContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      ease: [0.83, 0, 0.17, 1],
    },
  },
};

const textVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.83, 0, 0.17, 1],
    },
  },
};

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

const AboutInject = () => {
  return (
    <>
      <Header />
      <div className="bg-main-bg relative z-1 w-full flex flex-col h-full rounded-b-[40px] max-md:rounded-b-[20px] pb-12">
        <div className="flex flex-col wrapper">
          <motion.div
            variants={headingContainer}
            initial="hidden"
            whileInView="visible"
            className="overflow-y-hidden"
          >
            <motion.p
              variants={textVariants}
              className="text-white font-spline-sans text-base font-normal my-4"
            >
              About me
            </motion.p>
            <motion.div
              variants={lineVariants}
              className="bg-[#D9D9D9] h-px w-full"
            />
          </motion.div>

          <section>
            <div className="mt-6">
              <h1 className="text-white font-bebas-neue text-[8rem] max-md:text-[7rem] font-normal leading-[100%] tracking-[-0.16rem] uppercase">
                Temitayo Olawanle
              </h1>
              <p className="text-white font-spline-sans text-base font-normal">
                Fullstack Web Developer
              </p>
            </div>

            <div className="mt-6">
              <p className="text-white font-bebas-neue text-[2.5rem] max-md:text-[1.5rem] font-normal leading-[100%] tracking-[-0.05rem] max-md:tracking-[-0.01rem]">
                <MaskedTextReveal
                  text="Greetings! I'm Temitayo, a frontend developer with a deep
                passion for crafting seamless and interactive web experiences.
                With a strong foundation in frontend technologies and a keen eye
                for detail, I specialize in bringing designs to life through
                clean and efficient code."
                />
              </p>

              <Heading title="Experience" />

              <p className="text-white font-bebas-neue text-[2.5rem] max-md:text-[1.5rem] font-normal leading-[100%] tracking-[-0.05rem] max-md:tracking-[-0.01rem]">
                <MaskedTextReveal
                  text="As a frontend developer, I have accumulated 3 years of hands-on
                experience, working on a variety of projects that showcase my
                commitment to delivering high-quality and performant solutions.
                My journey in web development has allowed me to work on projects
                ranging from dynamic single-page applications to responsive
                websites, providing users with an engaging digital experience."
                />
              </p>

              <Heading title="Development Philosophy" />

              <p className="text-white font-bebas-neue text-[2.5rem] max-md:text-[1.5rem] font-normal leading-[100%] tracking-[-0.05rem] max-md:tracking-[-0.01rem]">
                <MaskedTextReveal
                  text="I believe in the power of code to transform ideas into reality.
                Every line of code I write is a deliberate step towards creating
                robust, user-friendly, and visually appealing applications. I am
                dedicated to staying current with the ever-evolving landscape of
                frontend technologies, ensuring that the solutions I build are
                not only cutting-edge but also sustainable."
                />
              </p>

              <Heading title="Tech Stack" />

              <p className="text-white font-bebas-neue text-[2.5rem] max-md:text-[1.5rem] font-normal leading-[100%] tracking-[-0.05rem] max-md:tracking-[-0.01rem]">
                <MaskedTextReveal text="Proficient in a versatile tech stack, my skills include:" />{' '}
                <br />
                <MaskedTextReveal
                  text="Languages: JavaScript (ES6+), Typescript"
                  delay={0.2}
                />{' '}
                <br />
                <MaskedTextReveal
                  text="Frameworks: React.js/Next.js, React Native, Styled
                Components, TailwindCSS, Sanity.io, Framer motion, Gsap, SASS,
                Firebase, Node.js, GraphhQL"
                  delay={0.4}
                />
                <br />
                <MaskedTextReveal
                  text="State Management: Redux/Redux Toolkit, Recoil, Zustand,
                Context API"
                  delay={0.6}
                />
                <br />
                <MaskedTextReveal
                  text="Testing: Jest, React Testing Library"
                  delay={0.8}
                />
                <br />
                <MaskedTextReveal
                  text="Version Control: Git/GitHub"
                  delay={1}
                />
              </p>

              <Heading title="Collaborative Approach" />

              <p className="text-white font-bebas-neue text-[2.5rem] max-md:text-[1.5rem] font-normal leading-[100%] tracking-[-0.05rem] max-md:tracking-[-0.01rem]">
                <MaskedTextReveal
                  text="Having collaborated with cross-functional teams, I understand
                the importance of effective communication and teamwork in the
                development process. Whether working with designers, backend
                developers, or project managers, I thrive in an environment
                where collaboration is key, ensuring that the final product
                meets both technical requirements and user expectations."
                />
              </p>

              <Heading title="Continuous Learning" />

              <p className="text-white font-bebas-neue text-[2.5rem] max-md:text-[1.5rem] font-normal leading-[100%] tracking-[-0.05rem] max-md:tracking-[-0.01rem]">
                <MaskedTextReveal
                  text="In the dynamic world of frontend development, continuous
                learning is essential. I actively seek opportunities to expand
                my skill set, stay informed about emerging technologies, and
                contribute to the vibrant developer community."
                />
              </p>

              <Heading title="Let's Build Something Amazing" />

              <p className="text-white font-bebas-neue text-[2.5rem] max-md:text-[1.5rem] font-normal leading-[100%] tracking-[-0.05rem] max-md:tracking-[-0.01rem]">
                <MaskedTextReveal
                  text="Whether you have a specific project in mind or you're
                looking for a frontend developer to join your team, I am excited
                about the prospect of turning ideas into functional and visually
                appealing digital experiences. Let's connect, collaborate,
                and create something extraordinary!"
                />
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutInject;

const Heading = ({ title }: { title: string }) => {
  return (
    <motion.div
      variants={headingContainer}
      initial="hidden"
      whileInView="visible"
      className="overflow-y-hidden my-12 mb-8"
    >
      <motion.p
        variants={textVariants}
        className="text-white font-spline-sans text-base font-normal my-4"
      >
        {title}
      </motion.p>
      <motion.div
        variants={lineVariants}
        className="bg-[#D9D9D9] h-px w-full"
      />
    </motion.div>
  );
};
