import type { Metadata } from 'next';
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import './look-fonts.css';
import './looks.css';
import { SanityLive } from '../sanity/lib/live';
import { site } from '../constants';
import { lookBoot } from '../lib/looks';

const interTight = Inter_Tight({
  variable: '--font-inter-tight',
  subsets: ['latin'],
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
});

const title = `${site.name} — ${site.role}`;

const shareImage = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: `${site.name}, ${site.role} in ${site.location}. A blindfolded figure in a cap stands before a red moon, with the name set large across the image.`,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.tagline,
  openGraph: {
    title,
    description: site.tagline,
    url: '/',
    siteName: site.name,
    type: 'website',
    images: [shareImage],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: site.tagline,
    images: [shareImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-look="base" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: lookBoot }} />
      </head>
      <body
        className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <SanityLive />
        {children}
      </body>
    </html>
  );
}
