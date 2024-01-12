import ReactLenis from '@studio-freight/react-lenis';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { Footer, Header, SideMenu } from '..';
import NoiseBackground from '../Common/NoiseBackground';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useRouter();
  return pathname.includes('/studio') || pathname === '/studio' ? (
    <RecoilRoot>
      <Header />
      <SideMenu />
      {children}
    </RecoilRoot>
  ) : (
    <ReactLenis
      root
      duration={1.2}
      easing={(t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))}
    >
      <RecoilRoot>
        <Toaster />
        <NoiseBackground />
        <Header />
        <SideMenu />
        {children}
        <Footer />
      </RecoilRoot>
    </ReactLenis>
  );
};

export default Layout;
