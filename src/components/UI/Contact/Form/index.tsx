import { useState } from 'react';
import styles from './styles.module.scss';
import toast from 'react-hot-toast';

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
  return (
    <form onSubmit={handleSubmit} className={styles.form__wrapper}>
      <div className={styles.form__inner}>
        <input
          type="text"
          name="your_name"
          id="your_name"
          placeholder="Your name"
          value={values.inquirer_name}
          onChange={(e) =>
            setValues({ ...values, inquirer_name: e.target.value })
          }
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Your email"
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />
        <textarea
          placeholder="Tell me about your project or reason for reaching out"
          value={values.message}
          onChange={(e) => setValues({ ...values, message: e.target.value })}
        ></textarea>
        <input
          type="text"
          name="budget"
          id="budget"
          placeholder="What’s your budget?"
          value={values.budget}
          onChange={(e) => setValues({ ...values, budget: e.target.value })}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </form>
  );
};

export default Form;
