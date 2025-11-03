import React from 'react';
import Form from '../../shared/ContactForm';

const ContactSection = () => {
  return (
    <section className="relative z-1 bg-main-bg flex flex-col justify-center w-full pt-28 md:pt-30 md:h-full">
      <div className="wrapper flex flex-col py-20 md:py-0 md:mb-8">
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
          contact
        </p>

        <Form />
      </div>
    </section>
  );
};

export default ContactSection;
