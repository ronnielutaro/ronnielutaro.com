import withMDX from '@next/mdx';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enable static HTML export for Azure Static Web Apps
  images: {
    unoptimized: true, // Required for static export
  },
  // Silence root inference warning when multiple lockfiles exist
  outputFileTracingRoot: process.cwd(),
};

export default withMDX({ extension: /\.mdx?$/ })({
  ...nextConfig,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
});
