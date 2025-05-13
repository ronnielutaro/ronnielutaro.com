import './globals.css';
import './atom-one-dark.css';
import { AUTHOR, SITE_URL, SOCIAL_URLS, DEFAULT_KEYWORDS } from '../config';
import Header from './header';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import ClientComponents from './client';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
  themeColor: 'transparent',
};

export const metadata: Metadata = {
  title: {
    default: `${AUTHOR.name}'s Blog`,
    template: `%s | ${AUTHOR.name}'s Blog`,
  },
  description: AUTHOR.description,
  keywords: [...DEFAULT_KEYWORDS, 'Ronnie Lutaro', 'NextJS'],
  manifest:
    process.env.NODE_ENV === 'production'
      ? '/manifest.prod.json'
      : '/manifest.json',
  openGraph: {
    title: `${AUTHOR.name}'s Blog`,
    description: AUTHOR.description,
    url: SITE_URL,
    siteName: AUTHOR.name,
    images: [
      {
        url: `${SITE_URL}/icon.webp`,
        alt: `${AUTHOR.name} profile picture`,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: SOCIAL_URLS.twitter,
    creator: SOCIAL_URLS.twitter,
    images: [
      {
        url: `${SITE_URL}/icon.webp`,
        alt: `${AUTHOR.name}'s profile picture`,
      },
    ],
  },
  icons: {
    icon: [{ url: '/icons/192x192.png', sizes: '192x192', type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Header />
        {children}
        <ClientComponents />
      </body>
    </html>
  );
}
