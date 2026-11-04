import { Toaster } from 'sonner';
import SmoothScroll from '@/src/components/shared/SmoothScroll';
import Preloader from '@/src/components/shared/Preloader';
import Cursor from '@/src/components/shared/Cursor';
import CornerNav from '@/src/components/shared/CornerNav';
import Menu from '@/src/components/shared/Menu';
import LookDraw from '@/src/components/shared/looks/LookDraw';
import Cover from '@/src/components/shared/looks/Cover';
import { InkFilters } from '@/src/components/shared/looks/Art';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <CornerNav />
      <Menu />
      <InkFilters />
      <div aria-hidden className="edge-guard top-0" />
      <div aria-hidden className="edge-guard bottom-0" />
      <LookDraw />
      <Cover />
      <Toaster theme="dark" position="bottom-center" />
      {children}
    </>
  );
}
