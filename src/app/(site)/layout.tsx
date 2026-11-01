import { Toaster } from 'sonner';
import SmoothScroll from '@/src/components/shared/SmoothScroll';
import Preloader from '@/src/components/shared/Preloader';
import Cursor from '@/src/components/shared/Cursor';
import CornerNav from '@/src/components/shared/CornerNav';
import Menu from '@/src/components/shared/Menu';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <CornerNav />
      <Menu />
      <Toaster theme="dark" position="bottom-center" />
      {children}
    </>
  );
}
