import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enable static HTML export for Azure Static Web Apps
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
