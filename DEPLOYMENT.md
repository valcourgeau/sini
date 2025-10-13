# Deployment Guide

This project supports deployment to both **GitHub Pages** and **Vercel**. Each deployment target has its own configuration optimized for the specific platform.

## Deployment Options

### 1. GitHub Pages (Static Export)
- **URL**: `https://yourusername.github.io/sini/`
- **Type**: Static site generation
- **Build**: Uses `DEPLOY_TARGET=github-pages`
- **Features**: 
  - Static export with basePath `/sini`
  - Unoptimized images for compatibility
  - ESLint and TypeScript errors ignored during build

### 2. Vercel (Full Next.js)
- **URL**: `https://your-project.vercel.app/`
- **Type**: Full Next.js application with server-side features
- **Build**: Uses `DEPLOY_TARGET=vercel`
- **Features**:
  - Full Next.js functionality
  - Optimized images
  - Server-side rendering
  - API routes support
  - Edge functions

## Build Scripts

### Available Scripts

```bash
# Development
npm run dev                    # Start development server

# Building
npm run build                  # Default build (same as Vercel)
npm run build:github-pages     # Build for GitHub Pages (static export)
npm run build:vercel          # Build for Vercel (full Next.js)

# Deployment
npm run deploy:github-pages    # Build and deploy to GitHub Pages
npm run deploy:vercel         # Deploy to Vercel (requires Vercel CLI)
```

## GitHub Pages Deployment

### Automatic Deployment
The GitHub Pages deployment is handled automatically by GitHub Actions:

1. **Workflow**: `.github/workflows/github-pages.yml`
2. **Trigger**: Push to `main` branch
3. **Build**: Uses `DEPLOY_TARGET=github-pages`
4. **Output**: Static files in `out/` directory

### Manual Deployment
```bash
npm run deploy:github-pages
```

## Vercel Deployment

### First-time Setup
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy to Vercel:
   ```bash
   vercel
   ```

### Production Deployment
```bash
npm run deploy:vercel
```

### Automatic Deployment
Connect your GitHub repository to Vercel for automatic deployments:
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will automatically detect Next.js and use the `vercel.json` configuration

## Configuration Files

### `vercel.json`
- Configures Vercel-specific settings
- Sets build command to `npm run build:vercel`
- Includes security headers
- Configures rewrites for compatibility

### `next.config.js`
- Environment-aware configuration
- Uses `DEPLOY_TARGET` environment variable
- Different settings for GitHub Pages vs Vercel

## Environment Variables

### Build-time Variables
- `DEPLOY_TARGET`: Controls build behavior
  - `github-pages`: Static export with basePath
  - `vercel`: Full Next.js build

## Troubleshooting

### GitHub Pages Issues
- Ensure `basePath` is set to `/sini` in your repository settings
- Check that the workflow file is in `.github/workflows/`
- Verify the `out/` directory is being generated correctly

### Vercel Issues
- Ensure `vercel.json` is in the root directory
- Check that the build command is correct
- Verify environment variables are set properly

## Switching Between Deployments

To switch your primary deployment:

1. **For GitHub Pages**: Use `npm run build:github-pages`
2. **For Vercel**: Use `npm run build:vercel` or just `npm run build`

The configuration automatically adapts based on the `DEPLOY_TARGET` environment variable.

## Best Practices

1. **Development**: Always use `npm run dev` for local development
2. **Testing**: Test both build outputs before deploying
3. **CI/CD**: Use the appropriate build script in your CI/CD pipeline
4. **Environment**: Set `DEPLOY_TARGET` explicitly in production builds
