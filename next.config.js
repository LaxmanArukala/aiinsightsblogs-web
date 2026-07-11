/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
    optimizeCss: true,
  },
};

module.exports = nextConfig;
