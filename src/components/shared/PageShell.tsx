import { ReactNode } from 'react';
import Footer from './Footer';

/** Page content above the footer. Its rounded bottom edge lifts off the fixed footer as you scroll. */
const PageShell = ({ children }: { children: ReactNode }) => (
  <>
    <main className="relative z-10 rounded-b-[28px] border-b border-line bg-bg pb-10 md:rounded-b-[56px] md:pb-16">
      {children}
    </main>
    <Footer />
  </>
);

export default PageShell;
