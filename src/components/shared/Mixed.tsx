import { Fragment } from 'react';

/**
 * Renders text where letters wrapped in asterisks switch to the serif italic,
 * e.g. "W*O*RKS" sets the O in Instrument Serif.
 */
const Mixed = ({ text }: { text: string }) => {
  const parts = text.split(/(\*[^*]+\*)/g);

  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('*') && part.endsWith('*') ? (
          <span key={i} className="serif-swap">
            {part.slice(1, -1)}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
};

export const plain = (text: string) => text.replace(/\*/g, '');

export default Mixed;
