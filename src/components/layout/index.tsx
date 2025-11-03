import React, { FC } from 'react';
import { ReactLenis } from 'lenis/react';
import { Toaster } from 'sonner';
import SideMenu from '../shared/SideMenu';

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <ReactLenis root />
      <Toaster richColors />
      <SideMenu />
      {children}
    </>
  );
};

export default Layout;
