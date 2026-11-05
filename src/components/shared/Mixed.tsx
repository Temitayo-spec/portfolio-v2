import { Fragment } from 'react';

const swap = (word: string) =>
  word.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith('*') && part.endsWith('*') ? (
      <span key={i} className="letter-mark">
        {part.slice(1, -1)}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );

/**
 * Renders text where letters wrapped in asterisks are picked out, e.g. "W*o*rks"
 * marks the O. The span cuts its word in two
 * for text splitting, so those words are held together to stop a line breaking inside them.
 */
const Mixed = ({ text }: { text: string }) => (
  <>
    {text.split(/(\s+)/g).map((word, i) =>
      word.includes('*') ? (
        <span key={i} className="whitespace-nowrap">
          {swap(word)}
        </span>
      ) : (
        <Fragment key={i}>{word}</Fragment>
      )
    )}
  </>
);

export const plain = (text: string) => text.replace(/\*/g, '');

export default Mixed;
