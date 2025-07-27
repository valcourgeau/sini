/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/sini' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/sini/' : '',
}

module.exports = nextConfig 