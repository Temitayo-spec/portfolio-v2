import { ReactNode } from 'react';

/**
 * Text that rolls up to a second copy on hover. The parent needs the `group`
 * class, or the roll reacts to its own hover.
 */
const Roll = ({
  children,
  hover,
  className = '',
}: {
  children: ReactNode;
  hover?: ReactNode;
  className?: string;
}) => (
  <span className={`roll ${className}`}>
    <span>{children}</span>
    <span aria-hidden>{hover ?? children}</span>
  </span>
);

export default Roll;
