import ReactLenis from '@studio-freight/react-lenis';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { Footer, Header, SideMenu } from '..';
import NoiseBackground from '../Common/NoiseBackground';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis
      root
      duration={1.2}
      easing={(t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))}
    >
      <RecoilRoot>
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
