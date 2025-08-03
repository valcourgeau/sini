/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  distDir: process.env.NODE_ENV === 'production' ? 'out' : '.next',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/sini' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/sini/' : '',
  trailingSlash: true,
}

module.exports = nextConfig 