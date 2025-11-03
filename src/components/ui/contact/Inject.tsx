'use client';
import { motion, Variants } from 'framer-motion';
import Header from '../../shared/Header';
import Form from '../../shared/ContactForm';
import Footer from '../../shared/Footer';

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

const textVariants:Variants = {
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

const ContactInject = () => {
  return (
    <>
      <Header />

      <div className="bg-main-bg relative z-1 w-full flex flex-col h-full rounded-b-[20px] pb-12 md:rounded-b-[40px]">
        <div className="flex flex-col wrapper">
          <motion.div
            variants={headingContainer}
            initial="hidden"
            whileInView="visible"
            className="overflow-y-hidden"
          >
            <motion.p variants={textVariants} className="text-white font-spline-sans text-base font-normal my-4">Contact me</motion.p>
            <motion.div
              variants={lineVariants}
              className="bg-[#D9D9D9] h-px w-full"
            />
          </motion.div>
          <Form />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactInject;