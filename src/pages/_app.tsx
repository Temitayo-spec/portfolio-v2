import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { ReactLenis } from '@studio-freight/react-lenis';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactLenis
      root
      duration={1.2}
      easing={(t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))}
    >
      <Component {...pageProps} />
    </ReactLenis>
  );
}
