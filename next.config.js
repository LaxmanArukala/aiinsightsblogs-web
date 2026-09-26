/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  /*
   * Every article image is the generated /og/[id] card: a 1200x630 PNG, ~120 KiB.
   * With the optimizer off that full-size PNG was served for a 107x56 list
   * thumbnail too, which PageSpeed measured as 621 KiB of waste on one page and
   * a 6.1 s LCP resource load. Optimized, each size is resized once and served
   * as AVIF/WebP, then cached — sharp is installed on the server.
   */
  images: {
    formats: ['image/avif', 'image/webp'],
    // Widths the layout actually asks for: thumbnails, cards, and the article hero.
    imageSizes: [64, 96, 128, 256, 320],
    deviceSizes: [640, 828, 1080, 1200],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
    optimizeCss: true,
  },
};

module.exports = nextConfig;
