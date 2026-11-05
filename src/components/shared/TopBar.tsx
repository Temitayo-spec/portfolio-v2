import Link from 'next/link';
import { site } from '@/src/constants';
import LocalTime from './LocalTime';

/** Thin meta row at the top of every page. Scrolls away with the content. */
const TopBar = () => (
  <div className="wrapper meta relative z-10 grid items-start pt-7 pl-[4.75rem] md:grid-cols-3 md:pt-9 md:pr-[6rem] md:pl-[5.5rem]">
    <Link href="/" className="wipe-line w-fit">
      {site.name}
    </Link>
    <span className="hidden text-center text-muted md:block">
      {site.location} — <LocalTime />
    </span>
    <span className="hidden text-right text-muted md:block">{site.availability}</span>
  </div>
);

export default TopBar;
