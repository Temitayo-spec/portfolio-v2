import Link from 'next/link';
import { site } from '@/src/constants';
import LocalTime from './LocalTime';

/** Thin meta row at the top of every page. Scrolls away with the content. */
const TopBar = () => (
  <div className="wrapper meta relative z-10 grid grid-cols-2 items-start pt-6 md:grid-cols-3 md:pt-8">
    <Link href="/" className="wipe-line w-fit">
      {site.name}
    </Link>
    <span className="hidden text-center text-muted md:block">
      {site.location} — <LocalTime />
    </span>
    <span className="text-right text-muted">
      Portfolio ©{new Date().getFullYear()}
    </span>
  </div>
);

export default TopBar;
