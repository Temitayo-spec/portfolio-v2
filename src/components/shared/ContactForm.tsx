'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { site } from '@/src/constants';
import Roll from './Roll';

const budgets = ['< $1k', '$1k – $5k', '$5k – $10k', '$10k+'];

const Field = ({
  label,
  index,
  children,
}: {
  label: string;
  index: string;
  children: React.ReactNode;
}) => (
  <label className="group block border-b border-line py-5 transition-colors focus-within:border-accent">
    <span className="meta mb-3 flex gap-3 text-muted">
      <span className="text-accent">{index}</span>
      {label}
    </span>
    {children}
  </label>
);

const inputClasses =
  'w-full bg-transparent text-[clamp(1.25rem,2vw,1.75rem)] tracking-tight text-ink outline-none placeholder:text-muted/50';

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    inquirer_name: '',
    email: '',
    message: '',
    budget: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { inquirer_name, email, message } = values;

    if (!inquirer_name || !email || !message) {
      toast.error('Please fill in your name, email and message.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/sendmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(`sendmail responded ${res.status}`);

      toast.success('Sent successfully! I will get back to you soon.');
      setValues({ inquirer_name: '', email: '', message: '', budget: '' });
    } catch {
      toast.error(`Couldn't send that. Email me directly at ${site.email}.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Field index="01" label="What's your name?">
        <input
          type="text"
          name="your_name"
          placeholder="Jane Doe"
          value={values.inquirer_name}
          onChange={(e) => setValues({ ...values, inquirer_name: e.target.value })}
          className={inputClasses}
        />
      </Field>

      <Field index="02" label="Your email">
        <input
          type="email"
          name="email"
          placeholder="jane@company.com"
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          className={inputClasses}
        />
      </Field>

      <Field index="03" label="Tell me about your project">
        <textarea
          name="message"
          rows={4}
          placeholder="Goals, timeline, links…"
          value={values.message}
          onChange={(e) => setValues({ ...values, message: e.target.value })}
          className={`${inputClasses} resize-none`}
        />
      </Field>

      <fieldset className="border-b border-line py-5">
        <legend className="meta mb-4 flex gap-3 text-muted">
          <span className="text-accent">04</span>
          Budget
        </legend>
        <div className="flex flex-wrap gap-2">
          {budgets.map((budget) => {
            const selected = values.budget === budget;
            return (
              <button
                key={budget}
                type="button"
                aria-pressed={selected}
                onClick={() => setValues({ ...values, budget: selected ? '' : budget })}
                className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                  selected ? 'border-accent bg-accent text-ink' : 'border-line hover:border-ink'
                }`}
              >
                {budget}
              </button>
            );
          })}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={loading}
        className="group mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-5 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="meta">
          <Roll>{loading ? 'Sending…' : 'Send message'}</Roll>
        </span>
        <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
      </button>
    </form>
  );
};

export default Form;
