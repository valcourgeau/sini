/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Only use static export for GitHub Pages deployment
  output: process.env.DEPLOY_TARGET === 'github-pages' ? 'export' : undefined,
  distDir: process.env.DEPLOY_TARGET === 'github-pages' ? 'out' : '.next',
  outputFileTracingRoot: __dirname,
  images: {
    // Only unoptimize for GitHub Pages static export
    unoptimized: process.env.DEPLOY_TARGET === 'github-pages',
    qualities: [25, 50, 75, 100],
  },
  // Only apply basePath for GitHub Pages deployment
  basePath: process.env.DEPLOY_TARGET === 'github-pages' ? '/sini' : '',
  assetPrefix: process.env.DEPLOY_TARGET === 'github-pages' ? '/sini/' : '',
  trailingSlash: true,
  // Disable ESLint during build for GitHub Pages deployment only
  eslint: {
    ignoreDuringBuilds: process.env.DEPLOY_TARGET === 'github-pages',
  },
  // Disable TypeScript type checking during build for GitHub Pages deployment only
  typescript: {
    ignoreBuildErrors: process.env.DEPLOY_TARGET === 'github-pages',
  },
}

module.exports = nextConfig 