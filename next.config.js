/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  distDir: process.env.NODE_ENV === 'production' ? 'out' : '.next',
  outputFileTracingRoot: __dirname,
  images: {
    unoptimized: true,
    qualities: [25, 50, 75, 100],
  },
  basePath: process.env.NODE_ENV === 'production' ? '/sini' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/sini/' : '',
  trailingSlash: true,
  // Disable ESLint during build for GitHub Pages deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript type checking during build for GitHub Pages deployment
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig 