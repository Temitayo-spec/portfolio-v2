import Link from 'next/link';
import styles from './styles.module.scss';

const BriefAboutSection = () => {
  return (
    <div className={styles.wrapper}>
      <p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="7"
          height="8"
          viewBox="0 0 7 8"
          fill="none"
        >
          <circle cx="3.5" cy="4" r="3.5" fill="#D9D9D9" />
        </svg>{' '}
        info
      </p>
      <h3>
        Combining aesthetics and usefulness, I create solid user interfaces in
        an artistic way. I love to spend time improving the aesthetics of
        digital products without forgetting about usability.
      </h3>
      <Link href="/about">
        explore{' '}
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
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2.9165 10L16.9415 10"
            stroke="white"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
};

export default BriefAboutSection;
