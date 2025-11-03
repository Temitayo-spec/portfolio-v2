'use client';
import { useState } from 'react';
import { toast } from 'sonner';

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    inquirer_name: '',
    email: '',
    message: '',
    budget: '',
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const { inquirer_name, email, message } = values;

    const sendMail = async () => {
      if (!inquirer_name || !email || !message) {
        toast.error('Fill necessary fields!');
        return;
      }
      setLoading(true);

      const res = await fetch('/api/sendmail', {
        method: 'POST',
        body: JSON.stringify(values),
      });

      if (res && res.status === 200) {
        setLoading(false);
        toast.success('Sent succesfully!');
        setValues({
          inquirer_name: '',
          email: '',
          message: '',
          budget: '',
        });
      }
    };

    sendMail();
  };

  const inputClasses =
    "max-w-[48.9375rem] w-full p-7 max-md:p-6 border-b-[1.5px] border-b-[#D9D9D9] bg-[#353535] text-white font-spline-sans text-xl max-md:text-base font-normal leading-[100%] tracking-[0.0125rem] outline-none placeholder:text-white placeholder:text-xl placeholder:max-md:text-base placeholder:font-normal placeholder:leading-[100%] placeholder:tracking-[0.0125rem]";

  return (
    <form onSubmit={handleSubmit} className="my-4 mb-16">
      <div className="flex flex-col">
        <input
          type="text"
          name="your_name"
          id="your_name"
          placeholder="Your name"
          value={values.inquirer_name}
          onChange={(e) =>
            setValues({ ...values, inquirer_name: e.target.value })
          }
          className={inputClasses}
        />

        <input
          type="email"
          name="email"
          id="email"
          placeholder="Your email"
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          className={inputClasses}
        />

        <textarea
          placeholder="Tell me about your project or reason for reaching out"
          value={values.message}
          onChange={(e) => setValues({ ...values, message: e.target.value })}
          className={`${inputClasses} h-40 resize-none`}
        />

        <input
          type="text"
          name="budget"
          id="budget"
          placeholder="What's your budget?"
          value={values.budget}
          onChange={(e) => setValues({ ...values, budget: e.target.value })}
          className={inputClasses}
        />

        <button
          type="submit"
          disabled={loading}
          className="flex max-w-96.75 py-[1.84375rem] max-md:py-[1.4rem] px-2 justify-center items-center gap-2 bg-[#353535] mt-6 border-none text-white font-spline-sans text-lg max-md:text-base font-normal cursor-pointer transition-all duration-400 ease-in-out hover:bg-white hover:text-[#353535] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </form>
  );
};

export default Form;
