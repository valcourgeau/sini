/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/sini' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Disable server-side features since GitHub Pages only supports static sites
  experimental: {
    appDir: true,
  },
  // Ensure all relative paths work correctly with GitHub Pages
  assetPrefix: process.env.NODE_ENV === 'production' ? '/sini' : '',
}

module.exports = nextConfig