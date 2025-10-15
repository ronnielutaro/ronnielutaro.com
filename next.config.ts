
import withExportImageOptimizer from 'next-image-export-optimizer';
import withMDX from '@next/mdx';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enable static HTML export for Azure Static Web Apps
  // Silence root inference warning when multiple lockfiles exist
  outputFileTracingRoot: process.cwd(),
};

export default withExportImageOptimizer(
  withMDX({ extension: /\.mdx?$/ })({
    ...nextConfig,
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  })
);
