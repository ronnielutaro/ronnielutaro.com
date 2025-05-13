import withPWA from 'next-pwa';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import createMDX from '@next/mdx';
import path from 'path';
import { fileURLToPath } from 'url';

// Use `fileURLToPath` and `path.dirname` to get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Import `samwise.config.json` using an absolute path
import configData from './samwise.config.json' assert { type: 'json' }; // Use a relative path for ES Modules

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
      {
        source: '/blog',
        headers: [
          {
            key: 'cache-control',
            value: 'public, max-age=60, stale-while-revalidate=600',
          },
        ],
      },
    ];
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
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
