import withPWA from 'next-pwa';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import createMDX from '@next/mdx';

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
};

const withBoth = (config) =>
  withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  })(withMDX(config));

// Export configuration
export default withBoth(nextConfig);
