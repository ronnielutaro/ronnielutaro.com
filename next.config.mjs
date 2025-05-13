import withPWA from 'next-pwa';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import createMDX from '@next/mdx';
import path from 'path';
import { fileURLToPath } from 'url';
import configData from '../samwise.config.json';

// Use `fileURLToPath` and `path.dirname` to get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define the configuration for MDX
const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
});

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    mdxRs: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      },
    ],
  },
  async headers() {
    return [
      // Cache /blog for 1 minute + stale-while-revalidate
      {
        source: '/blog',
        headers: [
          {
            key: 'cache-control',
            value: 'public, max-age=60, stale-while-revalidate=600',
          },
        ],
      },
      // Cache a single /images/me.WEBP specifically
      {
        source: '/images/me.WEBP',
        headers: [
          {
            key: 'cache-control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/me-sketch2.png',
        headers: [
          {
            key: 'cache-control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache *all* images in /images/projects/ for 1 year (immutable)
      {
        source: '/images/projects/(.*)',
        headers: [
          {
            key: 'cache-control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Similarly, cache *all* images in /images/photography/ for 1 year (immutable)
      {
        source: '/images/photography/(.*)',
        headers: [
          {
            key: 'cache-control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'), // Use the updated `__dirname`
    };
    return config;
  },
};

export const PRODUCTION_URL = configData.PRODUCTION_URL;

export const SITE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : PRODUCTION_URL;

export const AUTHOR = {
  ...configData.AUTHOR,
  url: `${PRODUCTION_URL}/about`,
};

export const SOCIAL_URLS = configData.SOCIAL_URLS;
export const GA_MEASUREMENT_ID = configData.GA_MEASUREMENT_ID;
export const DEFAULT_KEYWORDS = configData.DEFAULT_KEYWORDS;
export const USE_LOGO_IN_NAVBAR = configData.USE_LOGO_IN_NAVBAR;
export const USE_LOGO_FOR_HEADSHOT = configData.USE_LOGO_FOR_HEADSHOT;
export const USE_ARCHIVE = configData.USE_ARCHIVE;

export default withPWA(withMDX(nextConfig));
