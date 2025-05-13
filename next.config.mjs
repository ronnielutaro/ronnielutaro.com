import withPWA from 'next-pwa';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import createMDX from '@next/mdx';
import path from 'path';
import { fileURLToPath } from 'url';

// Use `fileURLToPath` and `path.dirname` to get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Import `samwise.config.json` using an absolute path
import configData from './samwise.config.json' with { type: 'json' };

// Define the configuration for MDX
const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
});

export default withPWA(
  withMDX({
    reactStrictMode: true,
    experimental: {
      mdxRs: true,
    },
    images: {
      domains: ['img.youtube.com'], // Add any other domains as needed
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'img.youtube.com',
          port: '',
          pathname: '/vi/**',
        },
        {
          protocol: 'https',
          hostname: 'ronnielutaro.com',
          port: '',
          pathname: '/images/**',
        },
      ],
    },
    pageExtensions: ['ts', 'tsx', 'mdx'],
  }),
);
