const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ });

const nextConfig = {
  output: 'export', // Enable static HTML export for Azure Static Web Apps
  images: {
    loader: 'custom',
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  // Silence root inference warning when multiple lockfiles exist
  outputFileTracingRoot: process.cwd(),
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  env: {
    storePicturesInWEBP: 'true',
    generateAndUseBlurImages: 'true',
  },
};

module.exports = withMDX(nextConfig);
