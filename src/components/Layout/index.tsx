import ReactLenis from '@studio-freight/react-lenis';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { CustomCursor, Header, InitialCover, NoiseBackground, SideMenu } from '..';
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
        <InitialCover />
        <SideMenu />
        <CustomCursor />
        {children}
      </RecoilRoot>
    </ReactLenis>
  );
};

export default Layout;
