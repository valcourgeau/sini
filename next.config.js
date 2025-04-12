/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/sini' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/sini/' : '',
}

module.exports = nextConfig 